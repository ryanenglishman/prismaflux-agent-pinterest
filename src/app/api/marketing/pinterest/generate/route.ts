import { NextRequest, NextResponse } from "next/server";
import { getTokens } from "@/lib/kv/tokens";
import { listPosts, updatePostRunStatus } from "@/lib/kv/posts";
import { runPinterestPipeline } from "@/lib/marketing/pinterest/pipeline";
import {
  isTokenExpiringSoon,
  isRefreshTokenExpired,
  refreshAccessToken,
} from "@/lib/auth/pinterest-oauth";
import { saveTokens } from "@/lib/kv/tokens";

export const maxDuration = 60;

// GET: called by Vercel Cron (daily)
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Non autorise" }, { status: 401 });
  }

  // Get tokens from KV (cron has no cookie)
  let tokens = await getTokens();

  // Fallback to env var for backward compatibility
  if (!tokens && process.env.PINTEREST_ACCESS_TOKEN) {
    const boardId = process.env.PINTEREST_BOARD_ID;
    if (boardId) {
      const result = await runPinterestPipeline({
        accessToken: process.env.PINTEREST_ACCESS_TOKEN,
        boardId,
        postName: "Legacy env-var pipeline",
      });
      return NextResponse.json(result, {
        status: result.success ? 200 : 500,
      });
    }
  }

  if (!tokens) {
    return NextResponse.json(
      { error: "Non connecte a Pinterest. Connectez-vous via le dashboard." },
      { status: 401 },
    );
  }

  // Refresh token if needed
  if (isRefreshTokenExpired(tokens)) {
    return NextResponse.json(
      { error: "Refresh token expire. Reconnectez votre compte Pinterest." },
      { status: 401 },
    );
  }

  if (isTokenExpiringSoon(tokens)) {
    try {
      tokens = await refreshAccessToken(tokens.refreshToken);
      await saveTokens(tokens);
    } catch (err) {
      return NextResponse.json(
        {
          error: `Echec refresh token: ${err instanceof Error ? err.message : String(err)}`,
        },
        { status: 401 },
      );
    }
  }

  // Get all enabled posts
  const posts = await listPosts();
  const enabledPosts = posts.filter((p) => p.enabled);

  if (enabledPosts.length === 0) {
    return NextResponse.json({
      success: true,
      message: "Aucun post programme actif",
      postsRun: 0,
    });
  }

  // Run pipeline for each enabled post
  const results = [];
  for (const post of enabledPosts) {
    const result = await runPinterestPipeline({
      accessToken: tokens.accessToken,
      boardId: post.boardId,
      theme: post.theme,
      customInstructions: post.customInstructions,
      link: post.link,
      postName: post.name,
    });

    await updatePostRunStatus(
      post.id,
      result.success ? "success" : "error",
      result.error || null,
      result.pin?.pinId || null,
    );

    results.push({ postId: post.id, postName: post.name, ...result });
  }

  const allSuccess = results.every((r) => r.success);
  return NextResponse.json(
    { success: allSuccess, postsRun: results.length, results },
    { status: allSuccess ? 200 : 500 },
  );
}

// POST: manual trigger (protected)
export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Non autorise" }, { status: 401 });
  }

  // Reuse the same logic as GET
  return GET(request);
}

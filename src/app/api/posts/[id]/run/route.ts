import { NextRequest, NextResponse } from "next/server";
import { getPost, updatePostRunStatus } from "@/lib/kv/posts";
import { getSession } from "@/lib/auth/session";
import { getTokens } from "@/lib/kv/tokens";
import { runPinterestPipeline } from "@/lib/marketing/pinterest/pipeline";

export const maxDuration = 60;

// POST: manually run a specific scheduled post
export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const post = await getPost(id);
  if (!post) {
    return NextResponse.json({ error: "Post non trouve" }, { status: 404 });
  }

  // Get access token from session or KV
  const session = await getSession();
  let accessToken = session.pinterestTokens?.accessToken;

  if (!accessToken) {
    const kvTokens = await getTokens();
    accessToken = kvTokens?.accessToken;
  }

  // Fallback to env var
  if (!accessToken) {
    accessToken = process.env.PINTEREST_ACCESS_TOKEN;
  }

  if (!accessToken) {
    return NextResponse.json(
      { error: "Non connecte a Pinterest" },
      { status: 401 },
    );
  }

  const result = await runPinterestPipeline({
    accessToken,
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

  return NextResponse.json(result, {
    status: result.success ? 200 : 500,
  });
}

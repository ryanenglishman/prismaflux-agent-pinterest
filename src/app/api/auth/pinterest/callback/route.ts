import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { exchangeCodeForTokens } from "@/lib/auth/pinterest-oauth";
import { saveTokens } from "@/lib/kv/tokens";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");

  if (!code) {
    return NextResponse.json(
      { error: "Code d'autorisation manquant" },
      { status: 400 },
    );
  }

  const session = await getSession();

  if (!state || state !== session.oauthState) {
    return NextResponse.json(
      { error: "State CSRF invalide" },
      { status: 400 },
    );
  }
  session.oauthState = undefined;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3002";
  const redirectUri = `${baseUrl}/api/auth/pinterest/callback`;

  try {
    const tokens = await exchangeCodeForTokens(code, redirectUri);

    // Store in session cookie (for dashboard)
    session.pinterestTokens = tokens;
    await session.save();

    // Store in KV (for cron - no cookie available)
    await saveTokens(tokens);

    return NextResponse.redirect(`${baseUrl}/?connected=true`);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.redirect(
      `${baseUrl}/?error=${encodeURIComponent(message)}`,
    );
  }
}

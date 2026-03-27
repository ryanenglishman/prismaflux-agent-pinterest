import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { getTokens } from "@/lib/kv/tokens";

export async function GET() {
  const session = await getSession();
  let tokens = session.pinterestTokens;

  // Fallback to KV if no session cookie
  if (!tokens) {
    tokens = (await getTokens()) ?? undefined;
  }

  if (!tokens) {
    return NextResponse.json({ connected: false });
  }

  const now = Date.now();
  const daysUntilExpiry = Math.floor(
    (tokens.expiresAt - now) / (1000 * 60 * 60 * 24),
  );
  const refreshExpired = tokens.refreshExpiresAt < now;

  return NextResponse.json({
    connected: true,
    username: tokens.username || null,
    expiresAt: tokens.expiresAt,
    daysUntilExpiry: Math.max(0, daysUntilExpiry),
    refreshExpired,
    needsReauth: refreshExpired || daysUntilExpiry < 0,
  });
}

import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { getSession } from "@/lib/auth/session";
import { buildAuthUrl } from "@/lib/auth/pinterest-oauth";

export async function GET() {
  if (!process.env.PINTEREST_CLIENT_ID) {
    return NextResponse.json(
      { error: "PINTEREST_CLIENT_ID manquant" },
      { status: 500 },
    );
  }

  const session = await getSession();
  const state = nanoid(32);
  session.oauthState = state;
  await session.save();

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3002";
  const redirectUri = `${baseUrl}/api/auth/pinterest/callback`;
  const authUrl = buildAuthUrl(redirectUri, state);

  return NextResponse.redirect(authUrl);
}

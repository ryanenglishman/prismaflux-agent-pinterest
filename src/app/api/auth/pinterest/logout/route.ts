import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { deleteTokens } from "@/lib/kv/tokens";

export async function POST() {
  const session = await getSession();
  session.pinterestTokens = undefined;
  session.oauthState = undefined;
  await session.save();

  await deleteTokens();

  return NextResponse.json({ success: true });
}

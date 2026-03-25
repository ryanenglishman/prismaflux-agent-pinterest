import { getIronSession, type SessionOptions } from "iron-session";
import { cookies } from "next/headers";
import type { PinterestTokens } from "@/lib/marketing/pinterest/types";

export interface SessionData {
  pinterestTokens?: PinterestTokens;
  oauthState?: string;
}

export const sessionOptions: SessionOptions = {
  password:
    process.env.SESSION_SECRET ||
    "dev-secret-must-be-at-least-32-characters-long!",
  cookieName: "prismaflux-pinterest-session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax" as const,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
};

export async function getSession() {
  const cookieStore = await cookies();
  return getIronSession<SessionData>(cookieStore, sessionOptions);
}

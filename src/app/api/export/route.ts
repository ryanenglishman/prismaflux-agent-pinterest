import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/guard";
import { generateSocialExports } from "@/lib/marketing/pinterest/social-export";

export async function POST(request: NextRequest) {
  const token = await requireAuth();
  if (!token) {
    return NextResponse.json({ error: "Non autorise" }, { status: 401 });
  }

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ error: "OPENAI_API_KEY manquant" }, { status: 500 });
  }

  const body = await request.json();
  const { imagePrompt, theme, title, description } = body;

  if (!title || !description) {
    return NextResponse.json({ error: "title et description requis" }, { status: 400 });
  }

  const exports = await generateSocialExports(
    imagePrompt || "",
    theme || "automobile IA",
    title,
    description,
  );

  return NextResponse.json(exports);
}

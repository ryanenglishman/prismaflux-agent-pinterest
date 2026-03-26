import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/guard";
import { listPrompts } from "@/lib/kv/prompts";

export async function GET() {
  const token = await requireAuth();
  if (!token) {
    return NextResponse.json({ error: "Non autorise" }, { status: 401 });
  }

  const prompts = await listPrompts();
  return NextResponse.json({ prompts });
}

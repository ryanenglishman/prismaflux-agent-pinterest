import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/guard";
import { listPreviews } from "@/lib/kv/previews";

export async function GET() {
  const token = await requireAuth();
  if (!token) {
    return NextResponse.json({ error: "Non autorise" }, { status: 401 });
  }

  const previews = await listPreviews();
  return NextResponse.json({ previews });
}

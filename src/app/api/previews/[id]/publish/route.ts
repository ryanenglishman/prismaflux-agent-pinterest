import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/guard";
import { getPreview, updatePreviewStatus } from "@/lib/kv/previews";
import { createPin, buildPinPayload } from "@/lib/marketing/pinterest/pinterest-client";
import { savePrompt } from "@/lib/kv/prompts";
import { nanoid } from "nanoid";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const token = await requireAuth();
  if (!token) {
    return NextResponse.json({ error: "Non autorise" }, { status: 401 });
  }

  const { id } = await params;
  const preview = await getPreview(id);
  if (!preview) {
    return NextResponse.json({ error: "Preview non trouve" }, { status: 404 });
  }

  if (preview.status !== "approved") {
    return NextResponse.json(
      { error: "Le preview doit etre approuve avant publication" },
      { status: 400 },
    );
  }

  const body = await request.json().catch(() => ({}));
  const boardIds: string[] = body.boardIds || [body.boardId];
  const link = body.link || "https://auto-prismaflux.com";

  if (!boardIds.length) {
    return NextResponse.json({ error: "Au moins un tableau requis" }, { status: 400 });
  }

  const pins = [];
  const errors = [];

  for (const boardId of boardIds) {
    try {
      const payload = buildPinPayload(
        preview.imageBase64,
        preview.imageContentType,
        preview.content.title,
        preview.content.description,
        preview.content.altText,
        boardId,
        link,
      );
      const pin = await createPin(payload, token);
      pins.push({ boardId, ...pin });
    } catch (err) {
      errors.push({
        boardId,
        error: err instanceof Error ? err.message : String(err),
      });
    }
  }

  if (pins.length > 0) {
    await updatePreviewStatus(id, "published");

    // Auto-save prompt to library
    await savePrompt({
      id: `pr_${nanoid(10)}`,
      imagePrompt: preview.prompt.imagePrompt,
      theme: preview.prompt.theme,
      style: preview.prompt.style,
      title: preview.content.title,
      description: preview.content.description,
      performance: "unknown",
      usedCount: 1,
      pinId: pins[0].pinId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }

  return NextResponse.json({
    success: pins.length > 0,
    pins,
    errors: errors.length > 0 ? errors : undefined,
  });
}

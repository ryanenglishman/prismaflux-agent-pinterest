import { NextRequest, NextResponse } from "next/server";
import { getPost, savePost, deletePost } from "@/lib/kv/posts";
import { requireAuth } from "@/lib/auth/guard";
import type { ScheduledPost } from "@/lib/marketing/pinterest/types";

// GET: get a single post (auth required)
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const token = await requireAuth();
  if (!token) {
    return NextResponse.json({ error: "Non autorise" }, { status: 401 });
  }

  const { id } = await params;
  const post = await getPost(id);
  if (!post) {
    return NextResponse.json({ error: "Post non trouve" }, { status: 404 });
  }
  return NextResponse.json({ post });
}

// PUT: update a post (auth required)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const token = await requireAuth();
  if (!token) {
    return NextResponse.json({ error: "Non autorise" }, { status: 401 });
  }

  const { id } = await params;
  const existing = await getPost(id);
  if (!existing) {
    return NextResponse.json({ error: "Post non trouve" }, { status: 404 });
  }

  const body = (await request.json()) as Partial<ScheduledPost>;

  // Sanitize inputs
  const updated: ScheduledPost = {
    ...existing,
    name: body.name?.trim().slice(0, 100) ?? existing.name,
    boardId: body.boardId?.trim() ?? existing.boardId,
    boardName: body.boardName?.trim() ?? existing.boardName,
    cronExpression: body.cronExpression ?? existing.cronExpression,
    timezone: body.timezone ?? existing.timezone,
    enabled: body.enabled ?? existing.enabled,
    theme: body.theme !== undefined ? body.theme : existing.theme,
    customInstructions:
      body.customInstructions !== undefined
        ? body.customInstructions?.trim().slice(0, 1000) ?? null
        : existing.customInstructions,
    link: body.link?.trim().slice(0, 500) ?? existing.link,
    updatedAt: new Date().toISOString(),
  };

  await savePost(updated);
  return NextResponse.json({ post: updated });
}

// DELETE: delete a post (auth required)
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const token = await requireAuth();
  if (!token) {
    return NextResponse.json({ error: "Non autorise" }, { status: 401 });
  }

  const { id } = await params;
  await deletePost(id);
  return NextResponse.json({ success: true });
}

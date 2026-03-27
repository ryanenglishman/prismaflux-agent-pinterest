import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { listPosts, savePost } from "@/lib/kv/posts";
import { requireAuth } from "@/lib/auth/guard";
import type { ScheduledPost } from "@/lib/marketing/pinterest/types";

// GET: list all scheduled posts (auth required)
export async function GET() {
  const token = await requireAuth();
  if (!token) {
    return NextResponse.json(
      { error: "Non autorise. Connectez Pinterest." },
      { status: 401 },
    );
  }

  const posts = await listPosts();
  return NextResponse.json({ posts });
}

// POST: create a new scheduled post (auth required)
export async function POST(request: NextRequest) {
  const token = await requireAuth();
  if (!token) {
    return NextResponse.json(
      { error: "Non autorise. Connectez Pinterest." },
      { status: 401 },
    );
  }

  const body = (await request.json()) as Partial<ScheduledPost>;

  // Accept either multi-board (boardIds[]) or single board (boardId)
  const boardIds = body.boardIds?.length ? body.boardIds : body.boardId ? [body.boardId.trim()] : [];
  const boardNames = body.boardNames?.length ? body.boardNames : body.boardName ? [body.boardName.trim()] : [];

  if (!body.name?.trim() || boardIds.length === 0) {
    return NextResponse.json(
      { error: "Champs requis: name, au moins un tableau" },
      { status: 400 },
    );
  }

  // Validate and sanitize inputs
  const name = body.name.trim().slice(0, 100);
  const customInstructions = body.customInstructions
    ? body.customInstructions.trim().slice(0, 1000)
    : null;
  const link = body.link?.trim().slice(0, 500) || "https://auto-prismaflux.com";

  const now = new Date().toISOString();
  const post: ScheduledPost = {
    id: `sp_${nanoid(10)}`,
    name,
    boardId: boardIds[0],
    boardName: boardNames[0] || "",
    boardIds,
    boardNames,
    cronExpression: body.cronExpression || "0 16 * * *",
    timezone: body.timezone || "Europe/Brussels",
    enabled: body.enabled ?? true,
    theme: body.theme ?? null,
    customInstructions,
    link,
    lastRunAt: null,
    lastRunStatus: null,
    lastRunError: null,
    lastPinId: null,
    createdAt: now,
    updatedAt: now,
  };

  await savePost(post);
  return NextResponse.json({ post }, { status: 201 });
}

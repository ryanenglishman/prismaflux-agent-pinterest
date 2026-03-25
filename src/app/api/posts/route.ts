import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { listPosts, savePost } from "@/lib/kv/posts";
import type { ScheduledPost } from "@/lib/marketing/pinterest/types";

// GET: list all scheduled posts
export async function GET() {
  const posts = await listPosts();
  return NextResponse.json({ posts });
}

// POST: create a new scheduled post
export async function POST(request: NextRequest) {
  const body = (await request.json()) as Partial<ScheduledPost>;

  if (!body.name || !body.boardId || !body.boardName) {
    return NextResponse.json(
      { error: "Champs requis: name, boardId, boardName" },
      { status: 400 },
    );
  }

  const now = new Date().toISOString();
  const post: ScheduledPost = {
    id: `sp_${nanoid(10)}`,
    name: body.name,
    boardId: body.boardId,
    boardName: body.boardName,
    cronExpression: body.cronExpression || "0 16 * * *",
    timezone: body.timezone || "Europe/Brussels",
    enabled: body.enabled ?? true,
    theme: body.theme ?? null,
    customInstructions: body.customInstructions ?? null,
    link: body.link || "https://auto-prismaflux.com",
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

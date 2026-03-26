import { getRedis } from "./client";
import type { ScheduledPost } from "@/lib/marketing/pinterest/types";

const POSTS_INDEX_KEY = "posts:index";
const postKey = (id: string) => `posts:${id}`;

function parsePost(data: unknown): ScheduledPost | null {
  try {
    const parsed =
      typeof data === "string" ? JSON.parse(data) : (data as ScheduledPost);
    if (parsed && typeof parsed === "object" && "id" in parsed && "name" in parsed) {
      return parsed as ScheduledPost;
    }
    return null;
  } catch {
    return null;
  }
}

export async function listPosts(): Promise<ScheduledPost[]> {
  const redis = getRedis();
  if (!redis) return [];

  const ids = await redis.smembers(POSTS_INDEX_KEY);
  if (!ids || ids.length === 0) return [];

  const posts: ScheduledPost[] = [];
  for (const id of ids) {
    try {
      const data = await redis.get(postKey(id as string));
      const post = parsePost(data);
      if (post) {
        posts.push(post);
      }
    } catch {
      // Skip corrupted entries
    }
  }

  return posts.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export async function getPost(id: string): Promise<ScheduledPost | null> {
  const redis = getRedis();
  if (!redis) return null;

  try {
    const data = await redis.get(postKey(id));
    return parsePost(data);
  } catch {
    return null;
  }
}

export async function savePost(post: ScheduledPost): Promise<void> {
  const redis = getRedis();
  if (!redis) return;

  // Atomic-ish: set data first, then add to index
  await redis.set(postKey(post.id), JSON.stringify(post));
  await redis.sadd(POSTS_INDEX_KEY, post.id);
}

export async function deletePost(id: string): Promise<void> {
  const redis = getRedis();
  if (!redis) return;

  // Remove from index first, then delete data
  await redis.srem(POSTS_INDEX_KEY, id);
  await redis.del(postKey(id));
}

export async function updatePostRunStatus(
  id: string,
  status: "success" | "error",
  error: string | null,
  pinId: string | null,
): Promise<void> {
  const post = await getPost(id);
  if (!post) return;

  post.lastRunAt = new Date().toISOString();
  post.lastRunStatus = status;
  post.lastRunError = error;
  post.lastPinId = pinId;
  post.updatedAt = new Date().toISOString();

  await savePost(post);
}

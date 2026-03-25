import { getRedis } from "./client";
import type { ScheduledPost } from "@/lib/marketing/pinterest/types";

const POSTS_INDEX_KEY = "posts:index";
const postKey = (id: string) => `posts:${id}`;

export async function listPosts(): Promise<ScheduledPost[]> {
  const redis = getRedis();
  if (!redis) return [];

  const ids = await redis.smembers(POSTS_INDEX_KEY);
  if (!ids || ids.length === 0) return [];

  const posts: ScheduledPost[] = [];
  for (const id of ids) {
    const data = await redis.get<string>(postKey(id as string));
    if (data) {
      const post =
        typeof data === "string"
          ? (JSON.parse(data) as ScheduledPost)
          : (data as unknown as ScheduledPost);
      posts.push(post);
    }
  }

  return posts.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export async function getPost(id: string): Promise<ScheduledPost | null> {
  const redis = getRedis();
  if (!redis) return null;

  const data = await redis.get<string>(postKey(id));
  if (!data) return null;

  return typeof data === "string"
    ? (JSON.parse(data) as ScheduledPost)
    : (data as unknown as ScheduledPost);
}

export async function savePost(post: ScheduledPost): Promise<void> {
  const redis = getRedis();
  if (!redis) return;

  await redis.set(postKey(post.id), JSON.stringify(post));
  await redis.sadd(POSTS_INDEX_KEY, post.id);
}

export async function deletePost(id: string): Promise<void> {
  const redis = getRedis();
  if (!redis) return;

  await redis.del(postKey(id));
  await redis.srem(POSTS_INDEX_KEY, id);
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

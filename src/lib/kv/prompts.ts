import { getRedis } from "./client";
import type { SavedPrompt } from "@/lib/marketing/pinterest/types";

const PROMPTS_INDEX_KEY = "prompts:index";
const promptKey = (id: string) => `prompts:${id}`;

export async function savePrompt(prompt: SavedPrompt): Promise<void> {
  const redis = getRedis();
  if (!redis) return;
  await redis.set(promptKey(prompt.id), JSON.stringify(prompt));
  await redis.sadd(PROMPTS_INDEX_KEY, prompt.id);
}

export async function listPrompts(): Promise<SavedPrompt[]> {
  const redis = getRedis();
  if (!redis) return [];
  const ids = await redis.smembers(PROMPTS_INDEX_KEY);
  if (!ids || ids.length === 0) return [];
  const prompts: SavedPrompt[] = [];
  for (const id of ids) {
    try {
      const data = await redis.get(promptKey(id as string));
      if (data) {
        const parsed = typeof data === "string" ? JSON.parse(data) : data;
        if (parsed && typeof parsed === "object" && "id" in parsed) {
          prompts.push(parsed as SavedPrompt);
        }
      }
    } catch { /* skip */ }
  }
  return prompts.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export async function getPrompt(id: string): Promise<SavedPrompt | null> {
  const redis = getRedis();
  if (!redis) return null;
  try {
    const data = await redis.get(promptKey(id));
    if (!data) return null;
    return typeof data === "string" ? JSON.parse(data) : (data as unknown as SavedPrompt);
  } catch {
    return null;
  }
}

export async function deletePrompt(id: string): Promise<void> {
  const redis = getRedis();
  if (!redis) return;
  await redis.srem(PROMPTS_INDEX_KEY, id);
  await redis.del(promptKey(id));
}

export async function incrementPromptUsage(id: string): Promise<void> {
  const prompt = await getPrompt(id);
  if (!prompt) return;
  prompt.usedCount += 1;
  prompt.updatedAt = new Date().toISOString();
  await savePrompt(prompt);
}

import { getRedis } from "./client";
import type { PinterestTokens } from "@/lib/marketing/pinterest/types";

const TOKENS_KEY = "pinterest:tokens";

export async function saveTokens(tokens: PinterestTokens): Promise<void> {
  const redis = getRedis();
  if (!redis) return;
  await redis.set(TOKENS_KEY, JSON.stringify(tokens));
}

export async function getTokens(): Promise<PinterestTokens | null> {
  const redis = getRedis();
  if (!redis) return null;

  const data = await redis.get<string>(TOKENS_KEY);
  if (!data) return null;

  return typeof data === "string"
    ? (JSON.parse(data) as PinterestTokens)
    : (data as unknown as PinterestTokens);
}

export async function deleteTokens(): Promise<void> {
  const redis = getRedis();
  if (!redis) return;
  await redis.del(TOKENS_KEY);
}

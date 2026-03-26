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

  try {
    const data = await redis.get(TOKENS_KEY);
    if (!data) return null;

    const parsed =
      typeof data === "string" ? JSON.parse(data) : (data as PinterestTokens);

    if (
      parsed &&
      typeof parsed === "object" &&
      "accessToken" in parsed &&
      "refreshToken" in parsed
    ) {
      return parsed as PinterestTokens;
    }
    return null;
  } catch {
    return null;
  }
}

export async function deleteTokens(): Promise<void> {
  const redis = getRedis();
  if (!redis) return;
  await redis.del(TOKENS_KEY);
}

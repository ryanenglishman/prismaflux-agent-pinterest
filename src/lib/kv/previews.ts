import { getRedis } from "./client";
import type { PreviewData } from "@/lib/marketing/pinterest/types";

const PREVIEWS_INDEX_KEY = "previews:index";
const previewKey = (id: string) => `previews:${id}`;

export async function savePreviews(previews: PreviewData[]): Promise<void> {
  const redis = getRedis();
  if (!redis) return;
  for (const p of previews) {
    await redis.set(previewKey(p.id), JSON.stringify(p));
    await redis.sadd(PREVIEWS_INDEX_KEY, p.id);
  }
}

export async function getPreview(id: string): Promise<PreviewData | null> {
  const redis = getRedis();
  if (!redis) return null;
  try {
    const data = await redis.get(previewKey(id));
    if (!data) return null;
    return typeof data === "string" ? JSON.parse(data) : (data as unknown as PreviewData);
  } catch {
    return null;
  }
}

export async function listPreviews(): Promise<PreviewData[]> {
  const redis = getRedis();
  if (!redis) return [];
  const ids = await redis.smembers(PREVIEWS_INDEX_KEY);
  if (!ids || ids.length === 0) return [];
  const previews: PreviewData[] = [];
  for (const id of ids) {
    try {
      const data = await redis.get(previewKey(id as string));
      if (data) {
        const parsed = typeof data === "string" ? JSON.parse(data) : data;
        if (parsed && typeof parsed === "object" && "id" in parsed) {
          previews.push(parsed as PreviewData);
        }
      }
    } catch { /* skip */ }
  }
  return previews.sort(
    (a, b) => new Date(a.scheduledFor).getTime() - new Date(b.scheduledFor).getTime(),
  );
}

export async function updatePreviewStatus(
  id: string,
  status: PreviewData["status"],
): Promise<void> {
  const preview = await getPreview(id);
  if (!preview) return;
  preview.status = status;
  const redis = getRedis();
  if (!redis) return;
  await redis.set(previewKey(id), JSON.stringify(preview));
}

export async function deletePreview(id: string): Promise<void> {
  const redis = getRedis();
  if (!redis) return;
  await redis.srem(PREVIEWS_INDEX_KEY, id);
  await redis.del(previewKey(id));
}

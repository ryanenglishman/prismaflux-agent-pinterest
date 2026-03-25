import type { PinterestCreatePinPayload, PinterestPinResult } from "./types";

const PINTEREST_API_BASE = "https://api.pinterest.com/v5";

export async function createPin(
  payload: PinterestCreatePinPayload,
  accessToken: string,
): Promise<PinterestPinResult> {
  const response = await fetch(`${PINTEREST_API_BASE}/pins`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    if (response.status === 401) {
      throw new Error(
        `Pinterest: token expire ou invalide. Reconnectez votre compte. (${errorBody})`,
      );
    }
    if (response.status === 429) {
      const retryAfter = response.headers.get("retry-after");
      throw new Error(
        `Pinterest: rate limit atteint. Retry apres ${retryAfter || "?"} secondes.`,
      );
    }
    throw new Error(
      `Pinterest API erreur ${response.status}: ${errorBody}`,
    );
  }

  const data = (await response.json()) as { id: string; created_at: string };
  return {
    pinId: data.id,
    createdAt: data.created_at,
  };
}

export async function fetchBoards(
  accessToken: string,
): Promise<Array<{ id: string; name: string; description: string; pin_count: number }>> {
  const response = await fetch(`${PINTEREST_API_BASE}/boards`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Pinterest API ${response.status}: ${body}`);
  }

  const data = (await response.json()) as {
    items: Array<{
      id: string;
      name: string;
      description: string;
      pin_count: number;
    }>;
  };

  return data.items;
}

export function buildPinPayload(
  base64Data: string,
  contentType: "image/png" | "image/jpeg" | "image/webp",
  title: string,
  description: string,
  altText: string,
  boardId: string,
  link?: string,
): PinterestCreatePinPayload {
  return {
    board_id: boardId,
    title,
    description,
    alt_text: altText,
    ...(link && { link }),
    media_source: {
      source_type: "image_base64",
      data: base64Data,
      content_type: contentType,
    },
  };
}

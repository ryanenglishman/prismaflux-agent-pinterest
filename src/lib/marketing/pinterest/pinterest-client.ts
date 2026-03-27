import type { PinterestCreatePinPayload, PinterestPinResult } from "./types";

const PINTEREST_API_BASE = "https://api.pinterest.com/v5";

export async function createPin(
  payload: PinterestCreatePinPayload,
  accessToken: string,
  retries = 1,
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
        `Token Pinterest expire ou invalide. Reconnectez votre compte.`,
      );
    }
    if (response.status === 429) {
      const retryAfter = parseInt(
        response.headers.get("retry-after") || "5",
        10,
      );
      if (retries > 0) {
        await new Promise((r) => setTimeout(r, retryAfter * 1000));
        return createPin(payload, accessToken, retries - 1);
      }
      throw new Error(
        `Pinterest: rate limit atteint apres retry.`,
      );
    }
    // Retry once on 5xx (server errors)
    if (response.status >= 500 && retries > 0) {
      await new Promise((r) => setTimeout(r, 2000));
      return createPin(payload, accessToken, retries - 1);
    }
    throw new Error(
      `Pinterest API erreur ${response.status}: ${errorBody.slice(0, 200)}`,
    );
  }

  const data = (await response.json()) as { id: string; created_at: string };
  if (!data.id) {
    throw new Error("Pinterest API: reponse sans ID de pin");
  }
  return {
    pinId: data.id,
    createdAt: data.created_at,
  };
}

export async function fetchBoards(
  accessToken: string,
): Promise<Array<{ id: string; name: string; description: string; pin_count: number }>> {
  const allItems: Array<{
    id: string;
    name: string;
    description: string;
    pin_count: number;
  }> = [];

  let bookmark: string | null = null;
  const maxPages = 5;

  for (let page = 0; page < maxPages; page++) {
    const url = new URL(`${PINTEREST_API_BASE}/boards`);
    url.searchParams.set("page_size", "100");
    if (bookmark) url.searchParams.set("bookmark", bookmark);

    const response = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!response.ok) {
      const body = await response.text();
      throw new Error(`Pinterest API ${response.status}: ${body.slice(0, 200)}`);
    }

    const data = (await response.json()) as {
      items: Array<{
        id: string;
        name: string;
        description: string;
        pin_count: number;
      }>;
      bookmark?: string;
    };

    allItems.push(...(data.items || []));
    bookmark = data.bookmark || null;
    if (!bookmark) break;
  }

  return allItems;
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

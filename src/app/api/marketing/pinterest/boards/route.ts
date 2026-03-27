import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { getTokens } from "@/lib/kv/tokens";
import { fetchBoards } from "@/lib/marketing/pinterest/pinterest-client";

export async function GET() {
  // Try session first, then KV, then env fallback
  const session = await getSession();
  let accessToken = session.pinterestTokens?.accessToken;

  if (!accessToken) {
    const kvTokens = await getTokens();
    accessToken = kvTokens?.accessToken;
  }

  if (!accessToken) {
    accessToken = process.env.PINTEREST_ACCESS_TOKEN;
  }

  if (!accessToken) {
    return NextResponse.json(
      { error: "Non connecte a Pinterest" },
      { status: 401 },
    );
  }

  try {
    const items = await fetchBoards(accessToken);
    const boards = items.map((b) => ({
      id: b.id,
      name: b.name,
      description: b.description,
      pinCount: b.pin_count,
    }));

    return NextResponse.json({ boards });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 500 },
    );
  }
}

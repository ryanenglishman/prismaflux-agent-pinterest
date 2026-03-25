import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { getTokens } from "@/lib/kv/tokens";
import { runPinterestPipeline } from "@/lib/marketing/pinterest/pipeline";

export const maxDuration = 60;

export async function POST() {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: "OPENAI_API_KEY manquant" },
      { status: 500 },
    );
  }

  // Get access token for dry-run (needed for board context but won't post)
  const session = await getSession();
  let accessToken = session.pinterestTokens?.accessToken;
  if (!accessToken) {
    const kvTokens = await getTokens();
    accessToken = kvTokens?.accessToken;
  }
  if (!accessToken) {
    accessToken = process.env.PINTEREST_ACCESS_TOKEN;
  }

  const result = await runPinterestPipeline({
    accessToken: accessToken || "dry-run-no-token",
    boardId: "dry-run",
    dryRun: true,
    postName: "Test dry-run",
  });

  return NextResponse.json(
    {
      ...result,
      note: "Mode test : l'image n'a PAS ete publiee sur Pinterest. Le post LinkedIn est pret a copier.",
    },
    { status: result.success ? 200 : 500 },
  );
}

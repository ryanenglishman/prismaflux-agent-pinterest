import { NextRequest, NextResponse } from "next/server";
import { runPinterestPipeline } from "@/lib/marketing/pinterest/pipeline";

// GET: called by Vercel Cron (daily at 18h)
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Non autorise" }, { status: 401 });
  }

  const result = await runPinterestPipeline();
  return NextResponse.json(result, {
    status: result.success ? 200 : 500,
  });
}

// POST: manual trigger for testing
export async function POST() {
  const result = await runPinterestPipeline();
  return NextResponse.json(result, {
    status: result.success ? 200 : 500,
  });
}

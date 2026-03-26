import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/guard";
import { getTimeSuggestions, getPublishRecommendation } from "@/lib/marketing/pinterest/time-optimizer";

export async function GET(request: NextRequest) {
  const token = await requireAuth();
  if (!token) {
    return NextResponse.json({ error: "Non autorise" }, { status: 401 });
  }

  const dayParam = request.nextUrl.searchParams.get("day");
  const scheduledHour = request.nextUrl.searchParams.get("scheduledHour");
  const dayOfWeek = dayParam ? parseInt(dayParam, 10) : new Date().getDay();

  const suggestions = getTimeSuggestions(dayOfWeek);
  const recommendation = getPublishRecommendation(
    dayOfWeek,
    scheduledHour ? parseInt(scheduledHour, 10) : undefined,
  );

  return NextResponse.json({ suggestions, recommendation });
}

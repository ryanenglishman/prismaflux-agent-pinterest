import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/guard";

const PINTEREST_API_BASE = "https://api.pinterest.com/v5";

export async function GET(request: NextRequest) {
  const token = await requireAuth();
  if (!token) {
    return NextResponse.json({ error: "Non autorise" }, { status: 401 });
  }

  const pinId = request.nextUrl.searchParams.get("pinId");
  if (!pinId) {
    return NextResponse.json({ error: "pinId requis" }, { status: 400 });
  }

  try {
    const endDate = new Date().toISOString().split("T")[0];
    const startDate = new Date(Date.now() - 30 * 86400000).toISOString().split("T")[0];

    const url = new URL(`${PINTEREST_API_BASE}/pins/${pinId}/analytics`);
    url.searchParams.set("start_date", startDate);
    url.searchParams.set("end_date", endDate);
    url.searchParams.set("metric_types", "IMPRESSION,SAVE,PIN_CLICK,OUTBOUND_CLICK");

    const res = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      const body = await res.text();
      if (res.status === 403) {
        return NextResponse.json({
          error: "Scope analytics:read requis. Reconnectez Pinterest.",
        }, { status: 403 });
      }
      return NextResponse.json({
        error: `Pinterest API ${res.status}: ${body.slice(0, 200)}`,
      }, { status: res.status });
    }

    const data = await res.json();

    // Aggregate totals from daily data
    let impressions = 0;
    let saves = 0;
    let clicks = 0;
    let outboundClicks = 0;

    const allMetrics = data.all || {};
    const daily = allMetrics.daily_metrics || [];

    for (const day of daily) {
      impressions += day.data_status === "READY" ? (day.metrics?.IMPRESSION || 0) : 0;
      saves += day.data_status === "READY" ? (day.metrics?.SAVE || 0) : 0;
      clicks += day.data_status === "READY" ? (day.metrics?.PIN_CLICK || 0) : 0;
      outboundClicks += day.data_status === "READY" ? (day.metrics?.OUTBOUND_CLICK || 0) : 0;
    }

    return NextResponse.json({
      pinId,
      impressions,
      saves,
      clicks,
      outboundClicks,
      comments: 0,
      date: endDate,
    });
  } catch (err) {
    return NextResponse.json({
      error: err instanceof Error ? err.message : String(err),
    }, { status: 500 });
  }
}

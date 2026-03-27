import { NextResponse } from "next/server";
import { listPosts } from "@/lib/kv/posts";
import { listPrompts } from "@/lib/kv/prompts";

// Public endpoint — no auth required (this is the public stats page)
export async function GET() {
  const posts = await listPosts();
  const prompts = await listPrompts();

  const publishedPosts = posts.filter((p) => p.lastRunStatus === "success");
  const totalPosts = publishedPosts.length;

  // Aggregate analytics from prompts (which store performance data)
  let totalImpressions = 0;
  let totalSaves = 0;
  let totalClicks = 0;

  for (const p of prompts) {
    totalImpressions += p.impressions || 0;
    totalSaves += p.saves || 0;
    totalClicks += p.clicks || 0;
  }

  const avgEngagementRate =
    totalImpressions > 0
      ? ((totalSaves + totalClicks) / totalImpressions) * 100
      : 0;

  // Weekly posts count (last 4 weeks)
  const now = Date.now();
  const weeklyPosts = [0, 0, 0, 0];
  for (const p of publishedPosts) {
    if (!p.lastRunAt) continue;
    const age = now - new Date(p.lastRunAt).getTime();
    const weeksAgo = Math.floor(age / (7 * 86400000));
    if (weeksAgo < 4) weeklyPosts[3 - weeksAgo]++;
  }

  // Monthly growth
  const thisMonthPosts = publishedPosts.filter((p) => {
    if (!p.lastRunAt) return false;
    const d = new Date(p.lastRunAt);
    const now2 = new Date();
    return d.getMonth() === now2.getMonth() && d.getFullYear() === now2.getFullYear();
  }).length;

  const lastMonthPosts = publishedPosts.filter((p) => {
    if (!p.lastRunAt) return false;
    const d = new Date(p.lastRunAt);
    const now2 = new Date();
    const lastMonth = now2.getMonth() === 0 ? 11 : now2.getMonth() - 1;
    const lastMonthYear = now2.getMonth() === 0 ? now2.getFullYear() - 1 : now2.getFullYear();
    return d.getMonth() === lastMonth && d.getFullYear() === lastMonthYear;
  }).length;

  const monthlyGrowth =
    lastMonthPosts > 0
      ? ((thisMonthPosts - lastMonthPosts) / lastMonthPosts) * 100
      : thisMonthPosts > 0
        ? 100
        : 0;

  // Top posts by engagement
  const topPosts = prompts
    .filter((p) => (p.impressions || 0) > 0)
    .sort((a, b) => ((b.saves || 0) + (b.clicks || 0)) - ((a.saves || 0) + (a.clicks || 0)))
    .slice(0, 5)
    .map((p) => ({
      title: p.title,
      impressions: p.impressions || 0,
      saves: p.saves || 0,
      clicks: p.clicks || 0,
      date: new Date(p.createdAt).toLocaleDateString("fr-FR"),
    }));

  return NextResponse.json({
    totalPosts,
    totalImpressions,
    totalSaves,
    totalClicks,
    avgEngagementRate,
    weeklyPosts,
    monthlyGrowth,
    topPosts,
  });
}

"use client";

import { useState, useEffect } from "react";

interface StatsData {
  totalPosts: number;
  totalImpressions: number;
  totalSaves: number;
  totalClicks: number;
  avgEngagementRate: number;
  topPosts: Array<{
    title: string;
    impressions: number;
    saves: number;
    clicks: number;
    date: string;
  }>;
  weeklyPosts: number[];
  monthlyGrowth: number;
}

const MONTHS = ["Jan", "Fev", "Mar", "Avr", "Mai", "Jun", "Jul", "Aou", "Sep", "Oct", "Nov", "Dec"];

export default function PublicStatsPage() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [dark, setDark] = useState(true);

  useEffect(() => {
    fetch("/api/stats")
      .then((r) => r.json())
      .then((d) => setStats(d))
      .catch(() =>
        setStats({
          totalPosts: 0,
          totalImpressions: 0,
          totalSaves: 0,
          totalClicks: 0,
          avgEngagementRate: 0,
          topPosts: [],
          weeklyPosts: [0, 0, 0, 0],
          monthlyGrowth: 0,
        }),
      );
  }, []);

  const bg = dark ? "#0a0a0f" : "#f4f4f5";
  const cardBg = dark ? "#18181b" : "#ffffff";
  const border = dark ? "#27272a" : "#e4e4e7";
  const text = dark ? "#e4e4e7" : "#18181b";
  const muted = dark ? "#71717a" : "#a1a1aa";
  const accent = "#eab308";

  const fmt = (n: number) =>
    n >= 1000000
      ? `${(n / 1000000).toFixed(1)}M`
      : n >= 1000
        ? `${(n / 1000).toFixed(1)}K`
        : String(n);

  if (!stats) {
    return (
      <div style={{ minHeight: "100vh", background: bg, color: text, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "system-ui" }}>
        Chargement...
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: bg, color: text, fontFamily: "system-ui, -apple-system, sans-serif" }}>
      {/* Header */}
      <header style={{ padding: "24px 32px", borderBottom: `1px solid ${border}`, display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: `linear-gradient(135deg, ${accent}, #f59e0b)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 700, color: "#0a0a0f" }}>
          P
        </div>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: 18, fontWeight: 600, margin: 0 }}>PrismaFlux — Performance Pinterest</h1>
          <p style={{ fontSize: 13, color: muted, margin: 0 }}>Statistiques de publication automatisee</p>
        </div>
        <button
          onClick={() => setDark(!dark)}
          style={{ background: cardBg, border: `1px solid ${border}`, borderRadius: 8, padding: "6px 14px", color: text, fontSize: 13, cursor: "pointer" }}
        >
          {dark ? "Mode clair" : "Mode sombre"}
        </button>
      </header>

      <main style={{ maxWidth: 960, margin: "0 auto", padding: "32px 24px" }}>
        {/* KPI Cards — cliquables pour expand */}
        <div
          onClick={() => setExpanded(!expanded)}
          style={{ cursor: "pointer", marginBottom: 32 }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 }}>
            <KpiCard label="Posts publies" value={fmt(stats.totalPosts)} color="#22c55e" bg={cardBg} border={border} />
            <KpiCard label="Impressions" value={fmt(stats.totalImpressions)} color="#3b82f6" bg={cardBg} border={border} />
            <KpiCard label="Saves" value={fmt(stats.totalSaves)} color="#ec4899" bg={cardBg} border={border} />
            <KpiCard label="Clics" value={fmt(stats.totalClicks)} color={accent} bg={cardBg} border={border} />
          </div>

          <p style={{ fontSize: 12, color: muted, textAlign: "center", marginTop: 8 }}>
            {expanded ? "Cliquer pour reduire" : "Cliquer pour voir les details"}
          </p>
        </div>

        {/* Expanded details */}
        {expanded && (
          <>
            {/* Engagement Rate */}
            <div style={{ background: cardBg, borderRadius: 12, border: `1px solid ${border}`, padding: 20, marginBottom: 24 }}>
              <h3 style={{ fontSize: 13, fontWeight: 600, color: muted, textTransform: "uppercase", letterSpacing: 1, margin: "0 0 12px" }}>
                Taux d&apos;engagement moyen
              </h3>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                <span style={{ fontSize: 42, fontWeight: 700, color: accent }}>
                  {stats.avgEngagementRate.toFixed(1)}%
                </span>
                <span style={{ fontSize: 14, color: stats.monthlyGrowth >= 0 ? "#22c55e" : "#ef4444" }}>
                  {stats.monthlyGrowth >= 0 ? "+" : ""}{stats.monthlyGrowth.toFixed(1)}% ce mois
                </span>
              </div>
            </div>

            {/* Weekly posts bar chart */}
            <div style={{ background: cardBg, borderRadius: 12, border: `1px solid ${border}`, padding: 20, marginBottom: 24 }}>
              <h3 style={{ fontSize: 13, fontWeight: 600, color: muted, textTransform: "uppercase", letterSpacing: 1, margin: "0 0 16px" }}>
                Posts par semaine
              </h3>
              <div style={{ display: "flex", gap: 8, alignItems: "flex-end", height: 120 }}>
                {stats.weeklyPosts.map((count, i) => {
                  const max = Math.max(...stats.weeklyPosts, 1);
                  const h = Math.max(8, (count / max) * 100);
                  return (
                    <div key={i} style={{ flex: 1, textAlign: "center" }}>
                      <div style={{ background: accent, borderRadius: 4, height: h, marginBottom: 6, opacity: 0.8 + (i / stats.weeklyPosts.length) * 0.2 }} />
                      <span style={{ fontSize: 11, color: muted }}>S{i + 1}</span>
                      <br />
                      <span style={{ fontSize: 13, fontWeight: 600 }}>{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Heatmap heures */}
            <div style={{ background: cardBg, borderRadius: 12, border: `1px solid ${border}`, padding: 20, marginBottom: 24 }}>
              <h3 style={{ fontSize: 13, fontWeight: 600, color: muted, textTransform: "uppercase", letterSpacing: 1, margin: "0 0 16px" }}>
                Heures de publication
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 4 }}>
                {Array.from({ length: 24 }, (_, h) => {
                  const intensity = h >= 8 && h <= 21 ? Math.random() * 0.8 + 0.2 : 0.1;
                  return (
                    <div
                      key={h}
                      title={`${h}h`}
                      style={{
                        height: 28,
                        borderRadius: 4,
                        background: accent,
                        opacity: intensity,
                      }}
                    />
                  );
                })}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: muted, marginTop: 4 }}>
                <span>0h</span>
                <span>6h</span>
                <span>12h</span>
                <span>18h</span>
                <span>23h</span>
              </div>
            </div>

            {/* Top posts */}
            {stats.topPosts.length > 0 && (
              <div style={{ background: cardBg, borderRadius: 12, border: `1px solid ${border}`, padding: 20 }}>
                <h3 style={{ fontSize: 13, fontWeight: 600, color: muted, textTransform: "uppercase", letterSpacing: 1, margin: "0 0 12px" }}>
                  Top posts du mois
                </h3>
                {stats.topPosts.map((post, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, padding: "10px 0", borderTop: i > 0 ? `1px solid ${border}` : "none" }}>
                    <span style={{ width: 28, height: 28, borderRadius: 8, background: accent, color: "#0a0a0f", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14, flexShrink: 0 }}>
                      {i + 1}
                    </span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ margin: 0, fontSize: 14, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{post.title}</p>
                      <p style={{ margin: 0, fontSize: 12, color: muted }}>{post.date}</p>
                    </div>
                    <div style={{ display: "flex", gap: 16, fontSize: 12, flexShrink: 0 }}>
                      <span><span style={{ color: "#3b82f6" }}>{fmt(post.impressions)}</span> vues</span>
                      <span><span style={{ color: "#ec4899" }}>{fmt(post.saves)}</span> saves</span>
                      <span><span style={{ color: accent }}>{fmt(post.clicks)}</span> clics</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Footer */}
        <footer style={{ textAlign: "center", padding: "40px 0 20px", color: muted, fontSize: 12 }}>
          Propulse par PrismaFlux — Agent Pinterest IA
        </footer>
      </main>
    </div>
  );
}

function KpiCard({ label, value, color, bg, border }: { label: string; value: string; color: string; bg: string; border: string }) {
  return (
    <div style={{ background: bg, borderRadius: 12, border: `1px solid ${border}`, padding: "16px 20px" }}>
      <p style={{ fontSize: 12, color: "#71717a", margin: "0 0 4px" }}>{label}</p>
      <p style={{ fontSize: 24, fontWeight: 700, margin: 0, color }}>{value}</p>
    </div>
  );
}

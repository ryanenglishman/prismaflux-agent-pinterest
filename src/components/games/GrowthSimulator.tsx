"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, Users, Euro, Info, Zap } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  SECTORS,
  LOCATIONS,
  LEVERS,
  calculateGrowth,
} from "@/lib/constants/growth-formulas";

export function GrowthSimulator() {
  const [sector, setSector] = useState("service");
  const [location, setLocation] = useState("province-liege");
  const [budget, setBudget] = useState(1500);
  const [activeLevers, setActiveLevers] = useState<string[]>(["seo"]);

  const toggleLever = (id: string) => {
    setActiveLevers((prev) =>
      prev.includes(id) ? prev.filter((l) => l !== id) : [...prev, id]
    );
  };

  const monthlyData = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) =>
      calculateGrowth({ budget, sector, location, levers: activeLevers, month: i + 1 })
    );
  }, [budget, sector, location, activeLevers]);

  const month12 = monthlyData[11] || { traffic: 0, leads: 0, revenue: 0 };
  const totalRevenue = monthlyData.reduce((sum, m) => sum + m.revenue, 0);
  const totalInvestment = budget * 12;
  const roi = totalInvestment > 0 ? Math.round((totalRevenue / totalInvestment) * 100) : 0;

  const maxTraffic = Math.max(...monthlyData.map((m) => m.traffic), 1);

  // Generate SVG curve path
  const chartW = 560;
  const chartH = 180;
  const points = monthlyData.map((m, i) => ({
    x: (i / 11) * chartW,
    y: chartH - (m.traffic / maxTraffic) * (chartH - 20),
  }));
  const curvePath = points.length > 0
    ? `M ${points[0].x} ${points[0].y} ` +
      points.slice(1).map((p, i) => {
        const prev = points[i];
        const cpx = (prev.x + p.x) / 2;
        return `C ${cpx} ${prev.y}, ${cpx} ${p.y}, ${p.x} ${p.y}`;
      }).join(" ")
    : "";
  const areaPath = curvePath
    ? `${curvePath} L ${chartW} ${chartH} L 0 ${chartH} Z`
    : "";

  const pillClass = (active: boolean) =>
    `px-4 py-2.5 text-sm rounded-xl border cursor-pointer transition-all ${
      active
        ? "border-brand bg-brand-dim text-brand font-medium"
        : "border-border bg-bg-card text-text-secondary hover:border-border-hover"
    }`;

  return (
    <div className="space-y-8">
      {/* Sector */}
      <div>
        <p className="text-sm font-semibold text-text mb-3">Votre secteur d&apos;activite</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {SECTORS.map((s) => (
            <button key={s.id} onClick={() => setSector(s.id)} className={pillClass(sector === s.id)}>
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Location */}
      <div>
        <p className="text-sm font-semibold text-text mb-3">Zone geographique ciblee</p>
        <div className="grid grid-cols-3 gap-2">
          {LOCATIONS.map((l) => (
            <button key={l.id} onClick={() => setLocation(l.id)} className={pillClass(location === l.id)}>
              {l.label}
            </button>
          ))}
        </div>
      </div>

      {/* Budget slider */}
      <div className="glass-card p-5">
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm font-semibold text-text">Budget mensuel</p>
          <motion.span
            className="text-xl font-bold text-brand"
            key={budget}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
          >
            {budget.toLocaleString()} EUR<span className="text-xs text-text-muted font-normal">/mois</span>
          </motion.span>
        </div>
        <input
          type="range"
          min={300}
          max={5000}
          step={100}
          value={budget}
          onChange={(e) => setBudget(Number(e.target.value))}
          className="w-full h-2 rounded-full bg-bg-card appearance-none cursor-pointer accent-brand"
        />
        <div className="flex justify-between text-xs text-text-muted mt-2">
          <span>300 EUR</span>
          <span>5.000 EUR</span>
        </div>
      </div>

      {/* Levers */}
      <div>
        <p className="text-sm font-semibold text-text mb-3">Leviers a activer</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {LEVERS.map((l) => (
            <motion.button
              key={l.id}
              onClick={() => toggleLever(l.id)}
              className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                activeLevers.includes(l.id)
                  ? "border-brand bg-brand-dim"
                  : "border-border bg-bg-card hover:border-border-hover"
              }`}
              whileTap={{ scale: 0.97 }}
            >
              <div className="flex items-center gap-2 mb-1">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ background: activeLevers.includes(l.id) ? l.color : "var(--pf-border)" }}
                />
                <span className="text-sm font-medium text-text">{l.label}</span>
              </div>
              <p className="text-xs text-text-muted">
                {l.id === "seo" && "Resultats progressifs, trafic gratuit durable"}
                {l.id === "ads" && "Resultats immediats, cout par clic"}
                {l.id === "social" && "Notoriete et engagement, croissance organique"}
              </p>
            </motion.button>
          ))}
        </div>
        {activeLevers.length > 1 && (
          <motion.div
            className="flex items-center gap-2 mt-3 p-2.5 rounded-lg bg-brand-dim/50 border border-brand/10"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
          >
            <Zap size={14} className="text-brand shrink-0" />
            <p className="text-xs text-text-secondary">
              Bonus synergie +{(activeLevers.length - 1) * 15}% — la combinaison des canaux multiplie l&apos;impact de chaque levier.
            </p>
          </motion.div>
        )}
      </div>

      {/* SVG Curve Chart */}
      <div className="glass-card p-5 md:p-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs text-text-muted uppercase tracking-wider">
            Projection de trafic sur 12 mois
          </p>
          <p className="text-xs text-text-muted">
            Mois 12 : <strong className="text-brand">{month12.traffic.toLocaleString()}</strong> visiteurs
          </p>
        </div>

        <svg viewBox={`0 0 ${chartW} ${chartH + 30}`} className="w-full" preserveAspectRatio="none">
          {/* Grid lines */}
          {[0.25, 0.5, 0.75].map((pct) => (
            <line
              key={pct}
              x1={0}
              y1={chartH - pct * (chartH - 20)}
              x2={chartW}
              y2={chartH - pct * (chartH - 20)}
              stroke="currentColor"
              strokeOpacity={0.05}
              strokeWidth={1}
            />
          ))}

          {/* Area fill */}
          {areaPath && (
            <motion.path
              d={areaPath}
              fill="url(#growthGrad)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ duration: 0.8 }}
            />
          )}

          {/* Curve line */}
          {curvePath && (
            <motion.path
              d={curvePath}
              fill="none"
              stroke="#FF1744"
              strokeWidth={2.5}
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
          )}

          {/* End dot */}
          {points.length > 0 && (
            <motion.circle
              cx={points[points.length - 1].x}
              cy={points[points.length - 1].y}
              r={5}
              fill="#FF1744"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1, type: "spring" }}
            />
          )}

          {/* Month labels */}
          {[0, 2, 5, 8, 11].map((i) => (
            <text
              key={i}
              x={points[i]?.x || 0}
              y={chartH + 20}
              textAnchor="middle"
              fill="currentColor"
              fillOpacity={0.3}
              fontSize={10}
            >
              M{i + 1}
            </text>
          ))}

          <defs>
            <linearGradient id="growthGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FF1744" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#FF1744" stopOpacity={0} />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: TrendingUp, value: month12.traffic.toLocaleString(), label: "Visiteurs/mois (mois 12)", sub: "trafic cumule" },
          { icon: Users, value: month12.leads.toLocaleString(), label: "Leads qualifies/mois", sub: "contacts commerciaux" },
          { icon: Euro, value: `${totalRevenue.toLocaleString()} EUR`, label: "CA genere sur 12 mois", sub: "estimation" },
        ].map((kpi) => {
          const Icon = kpi.icon;
          return (
            <motion.div
              key={kpi.label}
              className="glass-card p-5 text-center"
              animate={{ scale: [1, 1.01, 1] }}
              transition={{ duration: 0.3 }}
            >
              <Icon size={20} className="text-brand mx-auto mb-2" />
              <motion.p
                className="text-2xl font-bold text-brand"
                key={kpi.value}
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
              >
                {kpi.value}
              </motion.p>
              <p className="text-xs text-text-muted mt-1">{kpi.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* ROI */}
      <div className="glass-card p-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand/5 via-transparent to-brand/3" />
        <div className="relative">
          <p className="text-sm text-text-muted mb-1">Retour sur investissement estime</p>
          <motion.p
            className="text-4xl md:text-5xl font-bold text-brand"
            key={roi}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
          >
            {roi}%
          </motion.p>
          <p className="text-xs text-text-muted mt-2">
            Investissement : {totalInvestment.toLocaleString()} EUR → CA estime : {totalRevenue.toLocaleString()} EUR
          </p>
        </div>
      </div>

      {/* Insight */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-brand-dim/30 border border-brand/10">
        <Info size={16} className="text-brand shrink-0 mt-0.5" />
        <p className="text-xs text-text-secondary leading-relaxed">
          Ces estimations sont basees sur des moyennes sectorielles observees en province de Liege.
          Les resultats reels dependent de la concurrence, de la qualite du site et de l&apos;execution.
          Un expert PrismaFlux peut affiner ces projections avec une analyse de votre marche specifique.
        </p>
      </div>

      {/* CTA */}
      <div className="text-center">
        <Button href="/contact" size="lg" className="pulse-glow">
          Valider cette strategie avec un expert
          <ArrowRight size={16} className="ml-2" />
        </Button>
      </div>
    </div>
  );
}

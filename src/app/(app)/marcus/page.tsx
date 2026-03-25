"use client";

import { useState } from "react";

const CONNECTIONS = [
  { name: "Google Analytics", icon: "📈", category: "Trafic" },
  { name: "Google Search Console", icon: "🔍", category: "SEO" },
  { name: "Google My Business", icon: "📍", category: "Local" },
  { name: "Facebook Ads", icon: "📘", category: "Pub" },
  { name: "Mailchimp", icon: "📧", category: "Email" },
  { name: "HubSpot CRM", icon: "🤝", category: "CRM" },
  { name: "AutoScout24 Insights", icon: "🚗", category: "Auto" },
  { name: "Trustpilot", icon: "⭐", category: "Avis" },
  { name: "Hotjar", icon: "🔥", category: "UX" },
  { name: "Semrush", icon: "🎯", category: "SEO" },
  { name: "Google Ads", icon: "💰", category: "Pub" },
  { name: "Zapier", icon: "⚡", category: "Automation" },
  { name: "Calendly", icon: "📅", category: "RDV" },
  { name: "WhatsApp Business", icon: "💬", category: "Contact" },
  { name: "Instagram Business", icon: "📸", category: "Social" },
];

export default function MarcusPage() {
  const [url, setUrl] = useState("");
  const [analyzed, setAnalyzed] = useState(false);

  return (
    <div className="px-4 pt-6 pb-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
          style={{ background: "rgba(21,101,192,0.15)" }}
        >
          🔍
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest mb-0.5" style={{ color: "rgba(100,160,255,0.8)" }}>
            Marcus
          </div>
          <h1 className="text-xl font-bold text-white">Analyse site web</h1>
        </div>
      </div>

      {/* URL Input */}
      <div
        className="rounded-2xl p-4 mb-6"
        style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}
      >
        <label className="text-xs font-semibold mb-2 block" style={{ color: "rgba(255,255,255,0.5)" }}>
          URL de votre site web
        </label>
        <div className="flex gap-2">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://votre-concession.be"
            className="flex-1 rounded-xl px-3 py-2.5 text-sm text-white outline-none"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          />
          <button
            onClick={() => setAnalyzed(true)}
            className="px-4 py-2.5 rounded-xl text-sm font-semibold transition-all active:scale-95"
            style={{ background: "#1565C0", color: "white" }}
          >
            Analyser
          </button>
        </div>
      </div>

      {analyzed && (
        <>
          {/* Audit results */}
          <div className="mb-6">
            <h2 className="text-sm font-semibold text-white mb-3">Résultats de l&apos;audit</h2>
            <div className="grid grid-cols-2 gap-3 mb-3">
              {[
                { label: "Score global", value: "67/100", color: "#FFD600" },
                { label: "SEO local", value: "54/100", color: "#FF6B35" },
                { label: "Performance", value: "72/100", color: "#FFD600" },
                { label: "Mobile", value: "81/100", color: "#00C853" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl p-3"
                  style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}
                >
                  <div className="text-xl font-bold" style={{ color: s.color }}>{s.value}</div>
                  <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.45)" }}>{s.label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-2">
              {[
                { issue: "Pas de schema Local Business", severity: "high" },
                { issue: "Google My Business non optimisé", severity: "high" },
                { issue: "Vitesse de chargement > 4s", severity: "medium" },
                { issue: "7 images sans attribut alt", severity: "low" },
              ].map((i) => (
                <div
                  key={i.issue}
                  className="flex items-center gap-3 rounded-xl px-4 py-3"
                  style={{
                    background: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                  }}
                >
                  <span>
                    {i.severity === "high" ? "🔴" : i.severity === "medium" ? "🟡" : "🟢"}
                  </span>
                  <span className="text-sm text-white">{i.issue}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Marcus Performance+ upsell */}
          <div
            className="rounded-2xl p-5 mb-6"
            style={{
              background: "linear-gradient(135deg, rgba(21,101,192,0.2) 0%, rgba(21,101,192,0.08) 100%)",
              border: "1px solid rgba(21,101,192,0.4)",
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🚀</span>
              <span className="text-sm font-bold text-white">Marcus Performance+</span>
              <span
                className="ml-auto text-xs font-bold px-2 py-0.5 rounded-full"
                style={{ background: "rgba(21,101,192,0.3)", color: "#64B5F6" }}
              >
                299 €/mois
              </span>
            </div>
            <p className="text-xs mb-3" style={{ color: "rgba(255,255,255,0.55)" }}>
              Connectez vos outils pour une analyse approfondie et un suivi mensuel automatique.
            </p>
            <button
              className="w-full py-3 rounded-xl text-sm font-semibold"
              style={{ background: "#1565C0", color: "white" }}
            >
              Activer Marcus Performance+ →
            </button>
          </div>
        </>
      )}

      {/* Connections */}
      <div>
        <h2 className="text-sm font-semibold text-white mb-1">Connexions disponibles</h2>
        <p className="text-xs mb-3" style={{ color: "rgba(255,255,255,0.4)" }}>
          Connectez vos outils pour enrichir l&apos;analyse de Marcus
        </p>
        <div className="grid grid-cols-3 gap-2">
          {CONNECTIONS.map((c) => (
            <button
              key={c.name}
              className="rounded-xl p-3 flex flex-col items-center gap-1.5 transition-all active:scale-95"
              style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
              }}
            >
              <span className="text-xl">{c.icon}</span>
              <span className="text-xs text-center leading-tight" style={{ color: "rgba(255,255,255,0.7)" }}>
                {c.name}
              </span>
              <span
                className="text-xs px-1.5 py-0.5 rounded-full"
                style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.35)" }}
              >
                {c.category}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

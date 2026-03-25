"use client";

import { useState } from "react";

const CONNECTIONS = [
  { name: "Google Analytics",      icon: "📈", category: "Trafic" },
  { name: "Search Console",        icon: "🔍", category: "SEO" },
  { name: "Google My Business",    icon: "📍", category: "Local" },
  { name: "Facebook Ads",          icon: "📘", category: "Pub" },
  { name: "Mailchimp",             icon: "📧", category: "Email" },
  { name: "HubSpot CRM",           icon: "🤝", category: "CRM" },
  { name: "AutoScout24 Insights",  icon: "🚗", category: "Auto" },
  { name: "Trustpilot",            icon: "⭐", category: "Avis" },
  { name: "Hotjar",                icon: "🔥", category: "UX" },
  { name: "Semrush",               icon: "🎯", category: "SEO" },
  { name: "Google Ads",            icon: "💰", category: "Pub" },
  { name: "Zapier",                icon: "⚡", category: "Auto" },
  { name: "Calendly",              icon: "📅", category: "RDV" },
  { name: "WhatsApp Business",     icon: "💬", category: "Contact" },
  { name: "Instagram Business",    icon: "📸", category: "Social" },
];

export default function MarcusPage() {
  const [url, setUrl] = useState("");
  const [analyzed, setAnalyzed] = useState(false);

  return (
    <div className="px-4 pt-6 pb-4 max-w-xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
          style={{ background: "rgba(21,101,192,0.18)", border: "1px solid rgba(21,101,192,0.30)" }}
        >
          🔍
        </div>
        <div>
          <div
            className="text-xs font-bold uppercase tracking-widest mb-0.5"
            style={{ color: "#64B5F6" }}
          >
            Marcus
          </div>
          <h1 className="text-xl font-bold" style={{ color: "#ffffff" }}>
            Analyse site web
          </h1>
        </div>
      </div>

      {/* URL Input */}
      <div
        className="rounded-2xl p-4 mb-6"
        style={{
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        <label
          className="text-xs font-bold mb-2 block"
          style={{ color: "rgba(255,255,255,0.65)" }}
        >
          URL de votre site web
        </label>
        <div className="flex gap-2">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://votre-concession.be"
            className="flex-1 rounded-xl px-3 py-2.5 text-sm outline-none"
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.14)",
              color: "#ffffff",
            }}
          />
          <button
            onClick={() => setAnalyzed(true)}
            className="px-4 py-2.5 rounded-xl text-sm font-bold transition-all active:scale-95"
            style={{ background: "#1565C0", color: "#ffffff" }}
          >
            Analyser
          </button>
        </div>
      </div>

      {analyzed && (
        <>
          {/* Scores */}
          <div className="mb-5">
            <h2 className="text-sm font-bold mb-3" style={{ color: "#ffffff" }}>
              Résultats de l&apos;audit
            </h2>
            <div className="grid grid-cols-2 gap-2 mb-3">
              {[
                { label: "Score global",  value: "67/100", color: "#FFD740" },
                { label: "SEO local",     value: "54/100", color: "#FF8A65" },
                { label: "Performance",   value: "72/100", color: "#FFD740" },
                { label: "Mobile",        value: "81/100", color: "#00E676" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl p-3"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.10)",
                  }}
                >
                  <div className="text-xl font-black" style={{ color: s.color }}>
                    {s.value}
                  </div>
                  <div
                    className="text-xs font-medium mt-0.5"
                    style={{ color: "rgba(255,255,255,0.65)" }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-2">
              {[
                { issue: "Pas de schema Local Business",    severity: "high" },
                { issue: "Google My Business non optimisé", severity: "high" },
                { issue: "Vitesse de chargement > 4s",      severity: "medium" },
                { issue: "7 images sans attribut alt",      severity: "low" },
              ].map((i) => (
                <div
                  key={i.issue}
                  className="flex items-center gap-3 rounded-xl px-4 py-3"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.10)",
                  }}
                >
                  <span className="text-base flex-shrink-0">
                    {i.severity === "high" ? "🔴" : i.severity === "medium" ? "🟡" : "🟢"}
                  </span>
                  <span className="text-sm font-medium" style={{ color: "#ffffff" }}>
                    {i.issue}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Upsell Marcus Performance+ */}
          <div
            className="rounded-2xl p-5 mb-6"
            style={{
              background: "rgba(21,101,192,0.12)",
              border: "1px solid rgba(21,101,192,0.35)",
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">🚀</span>
              <span className="text-sm font-bold" style={{ color: "#ffffff" }}>
                Marcus Performance+
              </span>
              <span
                className="ml-auto text-xs font-black px-2.5 py-1 rounded-full"
                style={{ background: "rgba(21,101,192,0.30)", color: "#82B1FF", border: "1px solid rgba(21,101,192,0.40)" }}
              >
                299 €/mois
              </span>
            </div>
            <p className="text-sm mb-3 leading-relaxed" style={{ color: "rgba(255,255,255,0.72)" }}>
              Connectez vos outils pour une analyse approfondie et un suivi mensuel automatique.
            </p>
            <button
              className="w-full py-3 rounded-xl text-sm font-bold transition-all active:scale-[0.98]"
              style={{ background: "#1565C0", color: "#ffffff" }}
            >
              Activer Marcus Performance+ →
            </button>
          </div>
        </>
      )}

      {/* Connexions */}
      <div>
        <h2 className="text-sm font-bold mb-1" style={{ color: "#ffffff" }}>
          Connexions disponibles
        </h2>
        <p className="text-xs font-medium mb-3" style={{ color: "rgba(255,255,255,0.60)" }}>
          Connectez vos outils pour enrichir l&apos;analyse de Marcus
        </p>
        <div className="grid grid-cols-3 gap-2">
          {CONNECTIONS.map((c) => (
            <button
              key={c.name}
              className="rounded-xl p-3 flex flex-col items-center gap-1.5 transition-all active:scale-95"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.10)",
              }}
            >
              <span className="text-xl">{c.icon}</span>
              <span
                className="text-xs text-center leading-tight font-medium"
                style={{ color: "rgba(255,255,255,0.80)" }}
              >
                {c.name}
              </span>
              <span
                className="text-xs px-1.5 py-0.5 rounded-full font-semibold"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  color: "rgba(255,255,255,0.55)",
                }}
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

"use client";

import { useState } from "react";
import Link from "next/link";
import { BASE_PLAN } from "@/lib/copilots";

export default function TarifsPage() {
  const [annual, setAnnual] = useState(false);

  const basePrice = annual
    ? Math.round(BASE_PLAN.price * (1 - BASE_PLAN.annualDiscount / 100))
    : BASE_PLAN.price;

  return (
    <div className="max-w-2xl mx-auto px-5 py-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-black text-white mb-3">Tarifs simples, sans surprise</h1>
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
          Un plan de base tout inclus, des add-ons au besoin.
        </p>

        {/* Billing toggle */}
        <div className="flex items-center justify-center gap-3 mt-6">
          <span className="text-sm" style={{ color: annual ? "rgba(255,255,255,0.4)" : "white" }}>
            Mensuel
          </span>
          <button
            onClick={() => setAnnual(!annual)}
            className="w-12 h-6 rounded-full relative transition-all"
            style={{ background: annual ? "var(--color-brand)" : "rgba(255,255,255,0.15)" }}
          >
            <div
              className="absolute top-1 w-4 h-4 rounded-full bg-white transition-all"
              style={{ left: annual ? "calc(100% - 20px)" : "4px" }}
            />
          </button>
          <span className="text-sm flex items-center gap-2" style={{ color: annual ? "white" : "rgba(255,255,255,0.4)" }}>
            Annuel
            <span
              className="text-xs font-bold px-2 py-0.5 rounded-full"
              style={{ background: "rgba(0,200,83,0.15)", color: "#00C853" }}
            >
              -{BASE_PLAN.annualDiscount}%
            </span>
          </span>
        </div>
      </div>

      {/* Base plan */}
      <div
        className="rounded-3xl p-6 mb-4"
        style={{
          background: "linear-gradient(135deg, rgba(255,23,68,0.12) 0%, rgba(255,23,68,0.04) 100%)",
          border: "1px solid rgba(255,23,68,0.3)",
        }}
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "var(--color-brand)" }}>
              Plan PrismaFlux
            </div>
            <div className="text-3xl font-black text-white">
              {basePrice} €<span className="text-base font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>/mois</span>
            </div>
            {annual && (
              <div className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>
                Facturé {basePrice * 12} €/an
              </div>
            )}
          </div>
          <div
            className="px-3 py-1 rounded-full text-xs font-bold"
            style={{ background: "rgba(255,23,68,0.15)", color: "var(--color-brand)" }}
          >
            Tout inclus
          </div>
        </div>

        <div className="flex flex-col gap-2 mb-6">
          {[
            "🦅 Robin — Multidiffusion & auto-remplissage IA",
            "📸 Lana Basic — Retouche photo automatique",
            "📊 Pierre — Reporting & réputation Google",
            "🚗 AutoScout24 & 2ememain inclus",
            "✦ Essai gratuit 7 jours",
            "✦ Support belge inclus",
          ].map((f) => (
            <div key={f} className="flex items-start gap-2 text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>
              <span>{f}</span>
            </div>
          ))}
        </div>

        <Link
          href="/essai-gratuit"
          className="block text-center py-3.5 rounded-2xl text-sm font-bold transition-all"
          style={{ background: "var(--color-brand)", color: "white" }}
        >
          Démarrer — 7 jours gratuits →
        </Link>
      </div>

      {/* Add-ons */}
      <h2 className="text-lg font-bold text-white mb-3 mt-8">Add-ons</h2>
      <div className="flex flex-col gap-3">
        {[
          {
            name: "Lana Performance",
            emoji: "🎬",
            price: 449,
            color: "#E91E8C",
            features: ["Posts réseaux sociaux automatiques", "Stories animées par véhicule", "Vidéos Reels courtes", "Calendrier de publication IA"],
          },
          {
            name: "Marcus Performance+",
            emoji: "🚀",
            price: 299,
            color: "#1565C0",
            features: ["Analyse SEO locale approfondie", "Connexion Google Analytics & Search Console", "Suivi concurrents", "Rapport mensuel automatique"],
          },
        ].map((addon) => (
          <div
            key={addon.name}
            className="rounded-2xl p-5"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">{addon.emoji}</span>
                <span className="font-bold text-white text-sm">{addon.name}</span>
              </div>
              <span
                className="text-sm font-bold"
                style={{ color: addon.color }}
              >
                +{annual ? Math.round(addon.price * 0.8) : addon.price} €/mois
              </span>
            </div>
            <div className="flex flex-col gap-1">
              {addon.features.map((f) => (
                <div key={f} className="text-xs flex items-center gap-2" style={{ color: "rgba(255,255,255,0.6)" }}>
                  <span style={{ color: addon.color }}>✦</span> {f}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="text-center text-xs mt-8" style={{ color: "rgba(255,255,255,0.3)" }}>
        Création de site web sur devis — <a href="/contact" className="underline">nous contacter</a>
      </p>
    </div>
  );
}

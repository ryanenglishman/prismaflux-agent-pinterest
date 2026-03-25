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
        <h1 className="text-3xl font-black mb-3" style={{ color: "#ffffff" }}>
          Tarifs simples, sans surprise
        </h1>
        <p className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.65)" }}>
          Un plan de base tout inclus, des add-ons au besoin.
        </p>

        {/* Billing toggle */}
        <div className="flex items-center justify-center gap-3 mt-6">
          <span
            className="text-sm font-medium"
            style={{ color: annual ? "rgba(255,255,255,0.45)" : "#ffffff" }}
          >
            Mensuel
          </span>
          <button
            onClick={() => setAnnual(!annual)}
            className="w-12 h-6 rounded-full relative transition-all"
            style={{ background: annual ? "#FF1744" : "rgba(255,255,255,0.18)" }}
          >
            <div
              className="absolute top-1 w-4 h-4 rounded-full bg-white transition-all"
              style={{ left: annual ? "calc(100% - 20px)" : "4px" }}
            />
          </button>
          <span
            className="text-sm font-medium flex items-center gap-2"
            style={{ color: annual ? "#ffffff" : "rgba(255,255,255,0.45)" }}
          >
            Annuel
            <span
              className="text-xs font-black px-2 py-0.5 rounded-full"
              style={{ background: "rgba(0,230,118,0.16)", color: "#00E676" }}
            >
              -{BASE_PLAN.annualDiscount}%
            </span>
          </span>
        </div>
      </div>

      {/* Plan principal */}
      <div
        className="rounded-3xl p-6 mb-4"
        style={{
          background: "linear-gradient(135deg, rgba(255,23,68,0.14) 0%, rgba(255,23,68,0.05) 100%)",
          border: "1px solid rgba(255,23,68,0.32)",
        }}
      >
        <div className="flex items-start justify-between mb-5">
          <div>
            <div
              className="text-xs font-black uppercase tracking-widest mb-1"
              style={{ color: "#FF5983" }}
            >
              Plan PrismaFlux
            </div>
            <div className="text-4xl font-black" style={{ color: "#ffffff" }}>
              {basePrice} €
              <span className="text-base font-semibold" style={{ color: "rgba(255,255,255,0.55)" }}>
                /mois
              </span>
            </div>
            {annual && (
              <div className="text-xs font-medium mt-1" style={{ color: "rgba(255,255,255,0.55)" }}>
                Facturé {basePrice * 12} €/an
              </div>
            )}
          </div>
          <div
            className="px-3 py-1 rounded-full text-xs font-black"
            style={{ background: "rgba(255,23,68,0.18)", color: "#FF5983", border: "1px solid rgba(255,23,68,0.30)" }}
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
            "✦ Essai gratuit 7 jours sans CB",
            "✦ Support belge inclus",
          ].map((f) => (
            <div key={f} className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.82)" }}>
              {f}
            </div>
          ))}
        </div>

        <Link
          href="/essai-gratuit"
          className="block text-center py-3.5 rounded-2xl text-sm font-bold transition-all active:scale-[0.98]"
          style={{ background: "#FF1744", color: "#ffffff" }}
        >
          Démarrer — 7 jours gratuits →
        </Link>
      </div>

      {/* Add-ons */}
      <h2 className="text-lg font-bold mt-10 mb-3" style={{ color: "#ffffff" }}>
        Add-ons
      </h2>
      <div className="flex flex-col gap-3">
        {[
          {
            name: "Lana Performance",
            emoji: "🎬",
            price: 449,
            color: "#E91E8C",
            features: [
              "Posts réseaux sociaux automatiques",
              "Stories animées par véhicule",
              "Vidéos Reels courtes",
              "Calendrier de publication IA",
            ],
          },
          {
            name: "Marcus Performance+",
            emoji: "🚀",
            price: 299,
            color: "#1565C0",
            features: [
              "Analyse SEO locale approfondie",
              "Connexion Google Analytics & Search Console",
              "Suivi concurrents mensuel",
              "Rapport mensuel automatique",
            ],
          },
        ].map((addon) => (
          <div
            key={addon.name}
            className="rounded-2xl p-5"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.10)",
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">{addon.emoji}</span>
                <span className="font-bold text-sm" style={{ color: "#ffffff" }}>
                  {addon.name}
                </span>
              </div>
              <span className="text-sm font-black" style={{ color: addon.color }}>
                +{annual ? Math.round(addon.price * 0.8) : addon.price} €/mois
              </span>
            </div>
            <div className="flex flex-col gap-1.5">
              {addon.features.map((f) => (
                <div
                  key={f}
                  className="text-sm font-medium flex items-center gap-2"
                  style={{ color: "rgba(255,255,255,0.75)" }}
                >
                  <span style={{ color: addon.color }}>✦</span> {f}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p
        className="text-center text-xs font-medium mt-8"
        style={{ color: "rgba(255,255,255,0.45)" }}
      >
        Création de site web sur devis —{" "}
        <a href="/contact" className="underline" style={{ color: "rgba(255,255,255,0.65)" }}>
          nous contacter
        </a>
      </p>
    </div>
  );
}

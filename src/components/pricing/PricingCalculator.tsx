"use client";

import { useState } from "react";
import { Monitor, ShoppingCart, Megaphone, ArrowRight } from "lucide-react";
import { BASE_PRICES, PRICING_FEATURES, PAGE_RANGES } from "@/lib/constants/pricing";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";

const ICONS: Record<string, typeof Monitor> = {
  vitrine: Monitor,
  ecommerce: ShoppingCart,
  landing: Megaphone,
};

export function PricingCalculator() {
  const [siteType, setSiteType] = useState("vitrine");
  const [features, setFeatures] = useState<string[]>([]);
  const [pageRange, setPageRange] = useState("1-5");

  const toggleFeature = (id: string) => {
    setFeatures((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));
  };

  const base = BASE_PRICES[siteType]?.price || 1500;
  const featCost = features.reduce(
    (sum, f) => sum + (PRICING_FEATURES.find((pf) => pf.id === f)?.cost || 0),
    0
  );
  const multiplier = PAGE_RANGES.find((p) => p.id === pageRange)?.multiplier || 1;
  const total = Math.round((base + featCost) * multiplier);
  const rangeMin = Math.round(total * 0.9);
  const rangeMax = Math.round(total * 1.15);

  const params = new URLSearchParams({
    service: "site-web",
    type: siteType,
    features: features.join(","),
    pages: pageRange,
  });

  return (
    <section className="py-20 md:py-28 bg-bg-surface/30">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <div className="reveal">
          <SectionHeading
            badge="Simulateur"
            title="Estimez votre budget"
            subtitle="Configurez votre projet pour obtenir une estimation indicative."
          />
        </div>

        <div className="reveal reveal-delay-1 glass-card p-6 md:p-8 space-y-8">
          {/* Site type */}
          <div>
            <p className="text-sm font-medium text-text mb-3">Type de site</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {Object.entries(BASE_PRICES).map(([key, val]) => {
                const Icon = ICONS[key] || Monitor;
                return (
                  <button
                    key={key}
                    onClick={() => setSiteType(key)}
                    className={`text-left p-4 rounded-xl border transition-all cursor-pointer ${
                      siteType === key
                        ? "border-brand bg-brand-dim"
                        : "border-border bg-bg-card hover:border-border-hover"
                    }`}
                  >
                    <Icon size={20} className="text-brand mb-2" />
                    <p className="text-sm font-semibold text-text">{val.label}</p>
                    <p className="text-xs text-text-muted mt-0.5">A partir de {val.price.toLocaleString()} EUR</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Features */}
          <div>
            <p className="text-sm font-medium text-text mb-3">Fonctionnalites</p>
            <div className="flex flex-wrap gap-2">
              {PRICING_FEATURES.map((f) => (
                <button
                  key={f.id}
                  onClick={() => toggleFeature(f.id)}
                  className={`px-4 py-2 text-sm rounded-full border cursor-pointer transition-all ${
                    features.includes(f.id)
                      ? "border-brand bg-brand-dim text-brand"
                      : "border-border bg-bg-card text-text-secondary hover:border-border-hover"
                  }`}
                >
                  {features.includes(f.id) ? "✓ " : ""}{f.label}
                  <span className="ml-1 text-text-muted text-xs">+{f.cost} EUR</span>
                </button>
              ))}
            </div>
          </div>

          {/* Pages */}
          <div>
            <p className="text-sm font-medium text-text mb-3">Nombre de pages</p>
            <div className="flex flex-wrap gap-2">
              {PAGE_RANGES.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPageRange(p.id)}
                  className={`px-4 py-2 text-sm rounded-full border cursor-pointer transition-all ${
                    pageRange === p.id
                      ? "border-brand bg-brand-dim text-brand"
                      : "border-border bg-bg-card text-text-secondary hover:border-border-hover"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Result */}
          <div className="pt-6 border-t border-border text-center">
            <p className="text-sm text-text-muted mb-1">Estimation indicative</p>
            <p className="text-4xl md:text-5xl font-bold text-brand">
              {rangeMin.toLocaleString()} - {rangeMax.toLocaleString()} &euro;
            </p>
            <p className="text-xs text-text-muted mt-1">
              HTVA &middot; Devis detaille sur demande
            </p>
            <div className="mt-6">
              <Button href={`/contact?${params.toString()}`}>
                Demander un devis personnalise
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

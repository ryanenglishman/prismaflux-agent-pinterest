"use client";

import { motion } from "framer-motion";
import { ScrollRevealMotion } from "@/components/animations/ScrollRevealMotion";

const TRUST_ITEMS = [
  { name: "Google Partner", abbr: "GP" },
  { name: "Meta Business", abbr: "MB" },
  { name: "pixel-pop.studio", abbr: "PP" },
  { name: "propulse.design", abbr: "PD" },
  { name: "ReferencielWeb", abbr: "RW" },
  { name: "Vercel", abbr: "V" },
  { name: "HubSpot", abbr: "HS" },
  { name: "SEMrush", abbr: "SR" },
  { name: "Brevo", abbr: "BR" },
  { name: "Next.js", abbr: "NJ" },
  { name: "Framer", abbr: "FR" },
];

export function TrustLogos() {
  return (
    <section className="py-12 md:py-16 border-y border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <ScrollRevealMotion>
          <p className="text-center text-xs text-text-muted uppercase tracking-widest mb-8">
            Technologies & partenaires certifies
          </p>
        </ScrollRevealMotion>

        {/* Scrolling marquee */}
        <div className="relative">
          <div className="flex gap-8 animate-marquee">
            {[...TRUST_ITEMS, ...TRUST_ITEMS].map((item, i) => (
              <motion.div
                key={`${item.name}-${i}`}
                className="shrink-0 flex items-center gap-3 px-6 py-3 rounded-xl border border-border bg-bg-card"
                whileHover={{ scale: 1.05, borderColor: "var(--pf-brand)" }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-8 h-8 rounded-lg bg-brand-dim flex items-center justify-center text-xs font-bold text-brand">
                  {item.abbr}
                </div>
                <span className="text-sm font-medium text-text-secondary whitespace-nowrap">
                  {item.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { MapPin } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollRevealMotion } from "@/components/animations/ScrollRevealMotion";
import { motion } from "framer-motion";

const CITIES = [
  { name: "Liege", href: "/" },
  { name: "Huy", href: "/agence-web-huy" },
  { name: "Seraing", href: "/agence-web-seraing" },
  { name: "Sprimont", href: "/agence-web-sprimont" },
  { name: "Herstal", href: "/agence-web-herstal" },
  { name: "Verviers", href: "/agence-web-verviers" },
  { name: "Waremme", href: null },
  { name: "Vise", href: null },
  { name: "Flemalle", href: null },
  { name: "Ans", href: null },
  { name: "Esneux", href: null },
  { name: "Chaudfontaine", href: null },
];

export function LocalSEO() {
  return (
    <section className="py-20 md:py-28 bg-bg-surface/30">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <ScrollRevealMotion>
          <SectionHeading
            badge="Marketing digital local — Province de Liege"
            title="Votre agence web partout en province de Liege"
            subtitle="Du centre-ville de Liege a chaque commune de la province, notre agence de marketing digital deploie des strategies de visibilite sur mesure pour les entreprises locales."
          />
        </ScrollRevealMotion>

        <div className="flex flex-wrap justify-center gap-3 mt-8">
          {CITIES.map((city, i) => {
            const content = (
              <motion.span
                className={`inline-flex items-center gap-1.5 px-4 py-2 text-sm rounded-full bg-bg-card border border-border text-text-secondary ${
                  city.href ? "hover:border-brand hover:text-brand" : ""
                } transition-colors`}
                whileHover={city.href ? { scale: 1.08, y: -2 } : {}}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <MapPin size={14} />
                {city.name}
              </motion.span>
            );

            return (
              <ScrollRevealMotion key={city.name} delay={i * 0.04} direction="up" distance={20}>
                {city.href ? (
                  <Link href={city.href}>{content}</Link>
                ) : (
                  content
                )}
              </ScrollRevealMotion>
            );
          })}
        </div>

        <ScrollRevealMotion delay={0.5}>
          <p className="text-center text-sm text-text-muted mt-6">
            Et toute la Wallonie, de Namur a Mons en passant par le Brabant wallon
          </p>
        </ScrollRevealMotion>
      </div>
    </section>
  );
}

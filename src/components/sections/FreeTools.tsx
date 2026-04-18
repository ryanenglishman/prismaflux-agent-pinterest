"use client";

import Link from "next/link";
import { ClipboardCheck, Search, TrendingUp, ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { ScrollRevealMotion } from "@/components/animations/ScrollRevealMotion";
import { TiltCard } from "@/components/animations/TiltCard";

const TOOLS = [
  {
    icon: ClipboardCheck,
    title: "Quiz Maturite Digitale",
    description:
      "10 questions pour evaluer votre presence en ligne. Score personnalise, radar chart et recommandations par domaine.",
    href: "/outils/audit-digital",
    time: "3 min",
  },
  {
    icon: Search,
    title: "Trouvez les 7 Erreurs SEO",
    description:
      "Un faux site web, 7 erreurs de referencement cachees. Testez votre oeil SEO et apprenez les bonnes pratiques.",
    href: "/outils/jeu-erreurs-seo",
    time: "3-5 min",
  },
  {
    icon: TrendingUp,
    title: "Simulateur de Croissance",
    description:
      "Configurez votre profil business et visualisez une projection de trafic, leads et CA sur 12 mois.",
    href: "/outils/simulateur-croissance",
    time: "2-4 min",
  },
];

export function FreeTools() {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <ScrollRevealMotion>
          <SectionHeading
            badge="Outils gratuits — Testez, jouez, apprenez"
            title="Evaluez votre potentiel digital en quelques minutes"
            subtitle="Trois outils interactifs concus pour vous aider a comprendre ou vous en etes et ce que le marketing digital pourrait apporter a votre entreprise."
          />
        </ScrollRevealMotion>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TOOLS.map((tool, i) => {
            const Icon = tool.icon;
            return (
              <ScrollRevealMotion key={tool.href} delay={i * 0.12}>
                <TiltCard tiltAmount={2}>
                  <Link href={tool.href} className="block group">
                    <Card className="h-full">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-brand-dim flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Icon size={24} className="text-brand" />
                        </div>
                        <span className="text-xs px-2.5 py-1 rounded-full bg-bg-card border border-border text-text-muted">
                          {tool.time}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-text mb-2 group-hover:text-brand transition-colors">
                        {tool.title}
                      </h3>
                      <p className="text-sm text-text-secondary leading-relaxed mb-4">
                        {tool.description}
                      </p>
                      <span className="text-xs font-medium text-brand flex items-center gap-1 group-hover:underline">
                        Commencer gratuitement
                        <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Card>
                  </Link>
                </TiltCard>
              </ScrollRevealMotion>
            );
          })}
        </div>
      </div>
    </section>
  );
}

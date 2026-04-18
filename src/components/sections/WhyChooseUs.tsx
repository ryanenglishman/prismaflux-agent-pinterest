"use client";

import { MapPin, BarChart3, Gauge, Zap } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { ScrollRevealMotion } from "@/components/animations/ScrollRevealMotion";
import { TiltCard } from "@/components/animations/TiltCard";

const USPS = [
  {
    icon: MapPin,
    title: "Ancrage liegeois, ambition nationale",
    description:
      "Installee au coeur de Liege, notre agence de marketing digital connait le tissu economique de la province comme sa poche. De Huy a Verviers, de Seraing a Herstal, nous comprenons les dynamiques locales qui font la difference dans votre strategie d'acquisition.",
  },
  {
    icon: BarChart3,
    title: "Marketing digital data-driven",
    description:
      "Chaque decision est guidee par les donnees. Taux de conversion, cout par acquisition, ROAS, positions SEO : nous pilotons vos campagnes de marketing digital avec des tableaux de bord en temps reel et des rapports mensuels transparents.",
  },
  {
    icon: Gauge,
    title: "Performance et vitesse d'execution",
    description:
      "Comme en sport automobile, la vitesse fait la difference. Sites web ultra-rapides (score Lighthouse 90+), deploiements agiles et time-to-market reduit pour que votre entreprise prenne une longueur d'avance sur la concurrence digitale.",
  },
  {
    icon: Zap,
    title: "Technologies de pointe & IA",
    description:
      "Nous integrons les dernieres innovations du marketing digital : intelligence artificielle, marketing automation, chatbots, analyse predictive. Votre strategie digitale beneficie des outils les plus avances du marche.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <ScrollRevealMotion>
          <SectionHeading
            badge="Votre agence de marketing digital a Liege"
            title="Pourquoi les entreprises liegeoise nous choisissent"
            subtitle="Une agence a taille humaine qui allie expertise marketing digital, ancrage local en province de Liege et obsession du resultat mesurable."
          />
        </ScrollRevealMotion>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {USPS.map((usp, i) => {
            const Icon = usp.icon;
            return (
              <ScrollRevealMotion key={usp.title} delay={i * 0.12}>
                <TiltCard tiltAmount={2}>
                  <Card>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-brand-dim flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                        <Icon size={24} className="text-brand" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-text mb-2">
                          {usp.title}
                        </h3>
                        <p className="text-sm text-text-secondary leading-relaxed">
                          {usp.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                </TiltCard>
              </ScrollRevealMotion>
            );
          })}
        </div>
      </div>
    </section>
  );
}

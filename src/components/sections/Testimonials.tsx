"use client";

import { Star } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { TESTIMONIALS } from "@/lib/constants/testimonials";
import { ScrollRevealMotion } from "@/components/animations/ScrollRevealMotion";
import { TiltCard } from "@/components/animations/TiltCard";

export function Testimonials() {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <ScrollRevealMotion>
          <SectionHeading
            badge="Avis clients — Province de Liege"
            title="Ils ont accelere leur croissance avec PrismaFlux"
            subtitle="PME, commerces et professions liberales de la region liegeoise temoignent de l'impact du marketing digital sur leur activite."
          />
        </ScrollRevealMotion>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <ScrollRevealMotion key={t.name} delay={i * 0.12} direction={i % 2 === 0 ? "left" : "right"}>
              <TiltCard tiltAmount={2}>
                <Card>
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} size={16} className="text-brand fill-brand" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-sm text-text-secondary leading-relaxed mb-6">
                    &ldquo;{t.quote}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div>
                      <p className="text-sm font-semibold text-text">{t.name}</p>
                      <p className="text-xs text-text-muted">
                        {t.role}, {t.company}
                      </p>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-brand-dim text-brand">
                      {t.service}
                    </span>
                  </div>
                </Card>
              </TiltCard>
            </ScrollRevealMotion>
          ))}
        </div>
      </div>
    </section>
  );
}

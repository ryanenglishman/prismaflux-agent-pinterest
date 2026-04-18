"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SERVICES } from "@/lib/constants/services";
import { ScrollRevealMotion } from "@/components/animations/ScrollRevealMotion";
import { TiltCard } from "@/components/animations/TiltCard";

export function ServicesOverview() {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <ScrollRevealMotion>
          <SectionHeading
            badge="Nos expertises en marketing digital"
            title="Tous les leviers du marketing digital, sous un meme toit"
            subtitle="Site web, referencement naturel, publicite en ligne, social media, strategie digitale — notre agence a Liege pilote l'ensemble de votre ecosysteme digital."
          />
        </ScrollRevealMotion>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            return (
              <ScrollRevealMotion
                key={service.id}
                delay={i * 0.1}
                direction={i % 2 === 0 ? "left" : "right"}
              >
                <TiltCard tiltAmount={3}>
                  <Link
                    href={service.href}
                    className="glass-card p-6 md:p-8 group block"
                  >
                    <div className="flex items-start gap-4">
                      <div className="shrink-0 w-12 h-12 rounded-xl bg-brand-dim flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Icon size={24} className="text-brand" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-bold text-text">
                            {service.title}
                          </h3>
                          <ArrowUpRight
                            size={18}
                            className="text-text-muted group-hover:text-brand group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 shrink-0"
                          />
                        </div>
                        <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                          {service.description}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {service.features.slice(0, 3).map((f) => (
                            <span
                              key={f}
                              className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-text-muted"
                            >
                              {f}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
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

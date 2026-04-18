"use client";

import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { ScrollRevealMotion } from "@/components/animations/ScrollRevealMotion";
import { ParallaxSection } from "@/components/animations/ParallaxSection";

const STATS = [
  { end: 50, suffix: "+", label: "Sites web deployes en province de Liege" },
  { end: 92, suffix: "%", label: "De nos clients en premiere page Google" },
  { end: 15, suffix: "+", label: "Communes servies en province de Liege" },
  { end: 4.9, suffix: "/5", label: "Note satisfaction clients (Google)", isDecimal: true },
];

export function Stats() {
  return (
    <ParallaxSection speed={0.15}>
      <section className="py-16 md:py-20 border-y border-border bg-bg-surface/50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {STATS.map((stat, i) => (
              <ScrollRevealMotion key={stat.label} delay={i * 0.1} direction="up">
                <div className="text-center">
                  <div className="text-3xl md:text-5xl font-bold text-brand">
                    {stat.isDecimal ? (
                      <span>
                        4.<AnimatedCounter end={9} />
                        {stat.suffix}
                      </span>
                    ) : (
                      <AnimatedCounter end={stat.end} suffix={stat.suffix} />
                    )}
                  </div>
                  <p className="mt-2 text-sm text-text-secondary">{stat.label}</p>
                </div>
              </ScrollRevealMotion>
            ))}
          </div>
        </div>
      </section>
    </ParallaxSection>
  );
}

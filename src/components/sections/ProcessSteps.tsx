"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { PROCESS_STEPS } from "@/lib/constants/process";
import { ScrollRevealMotion } from "@/components/animations/ScrollRevealMotion";
import { motion } from "framer-motion";

export function ProcessSteps() {
  return (
    <section className="py-20 md:py-28 bg-bg-surface/30">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <ScrollRevealMotion>
          <SectionHeading
            badge="Notre methode"
            title="Un processus eprouve en 4 etapes"
            subtitle="De l'audit initial au suivi continu, chaque etape est optimisee pour maximiser vos resultats."
          />
        </ScrollRevealMotion>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROCESS_STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <ScrollRevealMotion key={step.number} delay={i * 0.15} direction="up">
                <motion.div
                  className="relative glass-card p-6 md:p-8 text-center"
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                >
                  {/* Step number */}
                  <motion.div
                    className="absolute -top-3 left-6 w-7 h-7 rounded-full bg-brand text-white text-xs font-bold flex items-center justify-center"
                    whileHover={{ scale: 1.2 }}
                  >
                    {step.number}
                  </motion.div>

                  <div className="w-12 h-12 rounded-xl bg-brand-dim flex items-center justify-center mx-auto mb-4 mt-2">
                    <Icon size={24} className="text-brand" />
                  </div>
                  <h3 className="text-lg font-bold text-text mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {step.description}
                  </p>

                  {/* Connector line (desktop only) */}
                  {i < PROCESS_STEPS.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-border" />
                  )}
                </motion.div>
              </ScrollRevealMotion>
            );
          })}
        </div>
      </div>
    </section>
  );
}

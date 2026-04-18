"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ScrollRevealMotion } from "@/components/animations/ScrollRevealMotion";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { ParallaxSection } from "@/components/animations/ParallaxSection";

interface FinalCTAProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonHref?: string;
}

export function FinalCTA({
  title = "Pret a mettre le turbo sur votre marketing digital ?",
  subtitle = "Diagnostic digital gratuit de votre presence en ligne. Devis sur mesure sous 24h. Zero engagement, 100% valeur.",
  buttonText = "Demarrer mon audit digital gratuit",
  buttonHref = "/contact",
}: FinalCTAProps) {
  return (
    <ParallaxSection speed={0.1} scale>
      <section className="py-20 md:py-28 relative overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand/10 via-bg to-brand/5" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand/30 to-transparent" />

        <div className="relative max-w-3xl mx-auto px-4 md:px-8 text-center">
          <ScrollRevealMotion>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-text">
              {title}
            </h2>
          </ScrollRevealMotion>
          <ScrollRevealMotion delay={0.1}>
            <p className="mt-4 text-lg text-text-secondary">
              {subtitle}
            </p>
          </ScrollRevealMotion>
          <ScrollRevealMotion delay={0.2}>
            <div className="mt-8 flex justify-center">
              <MagneticButton strength={0.2}>
                <Button href={buttonHref} size="lg" className="pulse-glow">
                  {buttonText}
                  <ArrowRight size={18} className="ml-2" />
                </Button>
              </MagneticButton>
            </div>
          </ScrollRevealMotion>
        </div>
      </section>
    </ParallaxSection>
  );
}

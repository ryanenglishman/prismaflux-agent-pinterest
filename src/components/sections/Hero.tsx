"use client";

import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { ArrowRight, MapPin, Star, Trophy, Gauge } from "lucide-react";

const TITLE_WORDS = [
  { text: "Accelerez", delay: "0s" },
  { text: "votre", delay: "0.08s" },
  { text: "croissance", delay: "0.16s" },
];

const TITLE_LINE2 = [
  { text: "digitale", delay: "0.28s" },
  { text: "a", delay: "0.36s" },
  { text: "Liege", delay: "0.42s", gradient: true },
];

const PARTICLES = [
  { top: "15%", left: "10%", delay: "0s" },
  { top: "25%", left: "85%", delay: "0.5s" },
  { top: "60%", left: "75%", delay: "1s" },
  { top: "70%", left: "20%", delay: "1.5s" },
  { top: "40%", left: "90%", delay: "2s" },
  { top: "80%", left: "50%", delay: "0.8s" },
  { top: "10%", left: "60%", delay: "1.2s" },
  { top: "50%", left: "5%", delay: "1.8s" },
];

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Grid pattern */}
      <div className="absolute inset-0 hero-grid" />

      {/* Animated orbs */}
      <div className="hero-orb hero-orb-1 absolute top-[10%] left-[60%]" />
      <div className="hero-orb hero-orb-2 absolute top-[50%] left-[10%]" />
      <div className="hero-orb hero-orb-3 absolute top-[30%] left-[40%]" />

      {/* Particles */}
      {PARTICLES.map((p, i) => (
        <div
          key={i}
          className="hero-particle"
          style={{ top: p.top, left: p.left, animationDelay: p.delay }}
        />
      ))}

      {/* Speed lines — automotive feel */}
      <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand/20 to-transparent" />
      <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand/10 to-transparent" />

      {/* Gradient overlay bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-24 md:py-32 lg:py-40">
        <div className="max-w-5xl">
          {/* Badge */}
          <div className="mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 text-sm font-medium text-brand bg-brand-dim rounded-full animate-float">
              <MapPin size={14} />
              Agence de marketing digital a Liege, Province de Liege
            </span>
          </div>

          {/* Title with word-by-word reveal */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05]">
            <span className="block">
              {TITLE_WORDS.map((w) => (
                <span
                  key={w.text}
                  className="hero-word mr-[0.25em]"
                  style={{ animationDelay: w.delay }}
                >
                  {w.text}
                </span>
              ))}
            </span>
            <span className="block mt-2">
              {TITLE_LINE2.map((w) => (
                <span
                  key={w.text}
                  className={`hero-word mr-[0.25em] ${w.gradient ? "gradient-text" : ""}`}
                  style={{ animationDelay: w.delay }}
                >
                  {w.text}
                </span>
              ))}
            </span>
          </h1>

          {/* Subtitle — SEO-rich, automotive metaphor, marketing digital lexicon */}
          <p
            className="mt-8 text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed hero-word"
            style={{ animationDelay: "0.55s" }}
          >
            Conception de sites web haute performance, referencement naturel
            sur Google et strategie de marketing digital sur mesure. Votre
            agence web a Liege met le turbo sur votre visibilite en ligne et
            votre generation de leads qualifies en province de Liege.
          </p>

          {/* CTAs */}
          <div
            className="mt-10 flex flex-col sm:flex-row gap-4 hero-word"
            style={{ animationDelay: "0.7s" }}
          >
            <MagneticButton strength={0.25}>
              <Button href="/contact" size="lg" className="pulse-glow">
                Audit digital gratuit
                <ArrowRight size={18} className="ml-2" />
              </Button>
            </MagneticButton>
            <Button href="/services" variant="secondary" size="lg">
              Nos expertises digitales
            </Button>
          </div>

          {/* Trust badges */}
          <div
            className="mt-14 flex flex-wrap gap-6 md:gap-10 hero-word"
            style={{ animationDelay: "0.85s" }}
          >
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <Gauge size={18} className="text-brand" />
              <span>
                <strong className="text-text">50+</strong> sites web deployes
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <Trophy size={18} className="text-brand" />
              <span>
                <strong className="text-text">Top 3</strong> Google garanti
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <Star size={18} className="text-brand" />
              <span>
                <strong className="text-text">4.9/5</strong> satisfaction
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <MapPin size={18} className="text-brand" />
              <span>
                <strong className="text-text">Province de Liege</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

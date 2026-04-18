import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ServiceIllustration } from "@/components/ui/ServiceIllustration";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { SERVICES } from "@/lib/constants/services";

export const metadata: Metadata = {
  title: "Services de Marketing Digital a Liege",
  description:
    "Nos services de marketing digital a Liege : conception de sites web, referencement naturel Google (SEO), social media marketing, publicite digitale, strategie 360° et production video. Province de Liege.",
  alternates: {
    canonical: "/services",
  },
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-20 pb-16 md:pt-28 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="reveal inline-block px-4 py-1.5 text-sm font-medium text-brand bg-brand-dim rounded-full mb-4">
              Services de marketing digital — Province de Liege
            </span>
            <h1 className="reveal reveal-delay-1 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Tous les leviers du{" "}
              <span className="gradient-text">marketing digital</span>,
              {" "}pilotes depuis Liege
            </h1>
            <p className="reveal reveal-delay-2 mt-6 text-lg text-text-secondary">
              Site web haute performance, referencement naturel Google, social media
              marketing, publicite digitale, strategie d&apos;acquisition et production
              video. Notre agence en province de Liege deploie l&apos;arsenal complet
              du marketing digital pour accelerer votre croissance.
            </p>
          </div>
        </div>
      </section>

      {/* Services detail */}
      <section className="pb-20 md:pb-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-16 md:space-y-24">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            const isReversed = i % 2 === 1;
            return (
              <div
                key={service.id}
                className={`reveal flex flex-col ${isReversed ? "lg:flex-row-reverse" : "lg:flex-row"} gap-8 lg:gap-16 items-center`}
              >
                {/* Visual */}
                <div className="flex-1 w-full">
                  <ServiceIllustration serviceId={service.id} className="glass-card" />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl font-bold text-text mb-4">
                    {service.title}
                  </h2>
                  <p className="text-text-secondary leading-relaxed mb-6">
                    {service.longDescription}
                  </p>
                  <ul className="space-y-3 mb-6">
                    {service.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2 text-sm text-text-secondary"
                      >
                        <CheckCircle2
                          size={16}
                          className="text-brand shrink-0 mt-0.5"
                        />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button href={service.href} variant="secondary" size="sm">
                    En savoir plus
                    <ArrowUpRight size={16} className="ml-1" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <FinalCTA
        title="Combinez les canaux pour un impact maximal"
        subtitle="SEO + site web + social media + publicite = un ecosysteme digital qui accelere votre croissance en province de Liege et au-dela."
        buttonText="Planifier ma strategie digitale"
      />
    </>
  );
}

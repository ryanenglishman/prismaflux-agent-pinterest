"use client";

import { Mail, MapPin, Clock } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { QuoteWizard } from "@/components/quote-wizard/QuoteWizard";
import { useScrollReveal } from "@/lib/hooks/useScrollReveal";

const CONTACT_INFO = [
  {
    icon: Mail,
    title: "Email",
    value: "contact@prismaflux.com",
    href: "mailto:contact@prismaflux.com",
  },
  { icon: MapPin, title: "Localisation", value: "Liege, Belgique" },
  { icon: Clock, title: "Disponibilite", value: "Lun-Ven : 9h - 18h" },
];

export function ContactClient() {
  useScrollReveal();

  return (
    <>
      {/* Hero */}
      <section className="pt-20 pb-12 md:pt-28 md:pb-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="reveal inline-block px-4 py-1.5 text-sm font-medium text-brand bg-brand-dim rounded-full mb-4">
              Contact
            </span>
            <h1 className="reveal reveal-delay-1 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Parlons de votre{" "}
              <span className="gradient-text">projet</span>
            </h1>
            <p className="reveal reveal-delay-2 mt-6 text-lg text-text-secondary">
              Configurez votre demande en quelques clics. Devis personnalise
              sous 24h, sans engagement.
            </p>
          </div>
        </div>
      </section>

      {/* Contact info */}
      <section className="pb-8">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {CONTACT_INFO.map((info, i) => {
              const Icon = info.icon;
              return (
                <Card key={info.title} className={`reveal reveal-delay-${i + 1} text-center`}>
                  <Icon size={24} className="text-brand mx-auto mb-3" />
                  <p className="text-sm font-semibold text-text">{info.title}</p>
                  {info.href ? (
                    <a href={info.href} className="text-sm text-text-secondary hover:text-brand transition-colors">
                      {info.value}
                    </a>
                  ) : (
                    <p className="text-sm text-text-secondary">{info.value}</p>
                  )}
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quote Wizard */}
      <section className="py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <QuoteWizard />
        </div>
      </section>

      {/* Google Maps Liege */}
      <section className="pb-20 md:pb-28">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <h2 className="reveal text-xl font-bold text-text mb-4 text-center">Nous trouver</h2>
          <div className="reveal reveal-delay-1 glass-card overflow-hidden rounded-2xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d40698.97562064!2d5.5417!3d50.6326!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c0f9a4d7db24c5%3A0x40099ab2f4d5140!2sLi%C3%A8ge!5e0!3m2!1sfr!2sbe!4v1"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="PrismaFlux - Liege, Belgique"
            />
          </div>
        </div>
      </section>
    </>
  );
}

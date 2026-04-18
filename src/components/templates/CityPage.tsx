import Link from "next/link";
import { MapPin, CheckCircle2 } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { FAQSection } from "@/components/ui/FAQSection";
import { Stats } from "@/components/sections/Stats";
import { SERVICES } from "@/lib/constants/services";
import { CITY_FAQS } from "@/lib/constants/faqs";
import type { CityData } from "@/lib/constants/cities";

const DIGITAL_SERVICES = [
  "Conception de site web professionnel",
  "Referencement naturel Google (SEO)",
  "Social media marketing",
  "Publicite digitale (Google Ads, Facebook Ads)",
  "Strategie de marketing digital",
  "Production de spots publicitaires video",
  "Email marketing et automation",
  "Gestion de la e-reputation",
];

export function CityPage({ city }: { city: CityData }) {
  const faqs = CITY_FAQS[city.slug] || [];

  const citySchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "PrismaFlux",
    description: `Agence de marketing digital pour ${city.name}, province de Liege. ${city.description}`,
    url: `https://prismaflux.com/agence-web-${city.slug}`,
    email: "contact@prismaflux.com",
    areaServed: { "@type": "City", name: city.name },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Liege",
      addressRegion: "Province de Liege",
      addressCountry: "BE",
    },
    serviceType: [
      "Web Design",
      "SEO",
      "Digital Marketing",
      "Social Media Marketing",
      "Video Production",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(citySchema) }}
      />

      {/* Hero */}
      <section className="pt-20 pb-16 md:pt-28 md:pb-20 relative overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-brand/5 blur-[100px]" />
        <div className="speed-line speed-line-2" />
        <div className="relative max-w-7xl mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="reveal inline-flex items-center gap-2 px-4 py-1.5 text-sm font-medium text-brand bg-brand-dim rounded-full mb-4">
              <MapPin size={14} />
              Agence de marketing digital — {city.distance}
            </span>
            <h1 className="reveal reveal-delay-1 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Agence de marketing digital a{" "}
              <span className="gradient-text">{city.name}</span>
            </h1>
            <p className="reveal reveal-delay-2 mt-6 text-lg text-text-secondary max-w-2xl mx-auto">
              {city.description}
            </p>
            <div className="reveal reveal-delay-3 mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/contact" size="lg">
                Audit digital gratuit pour {city.name}
              </Button>
              <Button href="/services" variant="secondary" size="lg">
                Nos services de marketing digital
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Local text + digital services list */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <div className="reveal glass-card p-8 md:p-10">
            <p className="text-text-secondary leading-relaxed text-center mb-8">
              {city.localText}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {DIGITAL_SERVICES.map((s) => (
                <div key={s} className="flex items-center gap-2 text-sm text-text-secondary">
                  <CheckCircle2 size={14} className="text-brand shrink-0" />
                  {s}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 md:py-28 bg-bg-surface/30">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="reveal">
            <SectionHeading
              badge={`Marketing digital a ${city.name}`}
              title={`Nos services de marketing digital pour ${city.name}`}
              subtitle={`Conception web, SEO, social media, publicite digitale : tous nos leviers d'acquisition sont disponibles pour les entreprises de ${city.name} et environs.`}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICES.slice(0, 5).map((service, i) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.id}
                  href={service.href}
                  className={`reveal reveal-delay-${(i % 3) + 1} glass-card p-5 group flex items-start gap-3`}
                >
                  <div className="w-10 h-10 rounded-lg bg-brand-dim flex items-center justify-center shrink-0">
                    <Icon size={20} className="text-brand" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text group-hover:text-brand transition-colors">
                      {service.title}
                    </p>
                    <p className="text-xs text-text-muted mt-1">
                      {service.description.slice(0, 80)}...
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <Stats />

      {/* Why local matters */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="reveal">
            <SectionHeading
              badge="Avantage local"
              title={`Pourquoi choisir une agence de marketing digital proche de ${city.name} ?`}
              subtitle="La proximite geographique est un atout majeur pour le succes de votre strategie digitale."
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="reveal reveal-delay-1">
              <h3 className="text-lg font-bold text-text mb-2">SEO local optimise</h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                Nous optimisons votre referencement naturel pour les recherches
                locales a {city.name} et dans toute la province de Liege. Google
                Business Profile, citations locales, contenu geo-cible : chaque
                levier est active.
              </p>
            </Card>
            <Card className="reveal reveal-delay-2">
              <h3 className="text-lg font-bold text-text mb-2">Connaissance du marche</h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                Notre agence connait le tissu economique de {city.name} et ses
                specificites. Nous adaptons votre strategie de marketing digital
                au comportement de vos clients locaux.
              </p>
            </Card>
            <Card className="reveal reveal-delay-3">
              <h3 className="text-lg font-bold text-text mb-2">Accompagnement de proximite</h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                Basee a Liege ({city.distance}), notre equipe se deplace
                regulierement a {city.name}. Reunions en personne, suivi
                personnalise et reactivite sont nos engagements.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      {faqs.length > 0 && (
        <FAQSection
          faqs={faqs}
          title={`Questions sur le marketing digital a ${city.name}`}
          badge={`FAQ ${city.name}`}
        />
      )}

      <FinalCTA
        title={`Accelerez votre croissance digitale a ${city.name}`}
        subtitle={`Audit gratuit de votre presence en ligne. Strategie de marketing digital sur mesure pour les entreprises de ${city.name} et de la province de Liege.`}
        buttonText={`Mon audit digital gratuit`}
      />
    </>
  );
}

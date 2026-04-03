"use client";

import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { BrowserMockup } from "@/components/ui/BrowserMockup";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { PORTFOLIO_PROJECTS } from "@/lib/constants/portfolio";
import { useScrollReveal } from "@/lib/hooks/useScrollReveal";

const FILTERS = [
  { key: "all", label: "Tous les projets" },
  { key: "site", label: "Conception web" },
  { key: "seo", label: "Referencement SEO" },
  { key: "social", label: "Social media" },
  { key: "strategie", label: "Strategie digitale" },
] as const;

export default function RealisationsPage() {
  const [filter, setFilter] = useState<string>("all");
  useScrollReveal();

  const filtered =
    filter === "all"
      ? PORTFOLIO_PROJECTS
      : PORTFOLIO_PROJECTS.filter((p) => p.category === filter);

  return (
    <>
      {/* Hero */}
      <section className="pt-20 pb-16 md:pt-28 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="reveal inline-block px-4 py-1.5 text-sm font-medium text-brand bg-brand-dim rounded-full mb-4">
              Portfolio marketing digital — Province de Liege
            </span>
            <h1 className="reveal reveal-delay-1 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Nos <span className="gradient-text">realisations</span> en
              marketing digital
            </h1>
            <p className="reveal reveal-delay-2 mt-6 text-lg text-text-secondary">
              Sites web, campagnes SEO, strategies social media et transformations
              digitales. Decouvrez les projets de marketing digital que nous avons
              pilotes pour des entreprises de Liege et de sa province.
            </p>
          </div>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="pb-20 md:pb-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* Filter tabs */}
          <div className="reveal flex flex-wrap justify-center gap-2 mb-12">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-5 py-2 text-sm font-medium rounded-full transition-all ${
                  filter === f.key
                    ? "bg-brand text-white"
                    : "bg-bg-card border border-border text-text-secondary hover:text-text hover:border-border-hover"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project) => (
              <Card key={project.title} className="group">
                {/* Browser mockup */}
                <div className="mb-4">
                  <BrowserMockup
                    category={project.category}
                    clientName={project.client}
                    siteUrl={project.url}
                    ogImage={project.ogImage}
                  />
                </div>

                <h3 className="text-lg font-bold text-text mb-1">
                  {project.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-3">
                  {project.description}
                </p>

                {/* Result */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-sm font-semibold text-brand">
                    {project.result}
                  </span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Link to actual client site */}
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-brand hover:underline"
                  >
                    Voir le site
                    <ExternalLink size={12} />
                  </a>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA
        title="Votre entreprise est la prochaine sur la ligne de depart ?"
        subtitle="Rejoignez les entreprises liegeoise qui ont accelere leur croissance grace au marketing digital. Audit gratuit, devis sous 24h."
        buttonText="Planifier mon projet digital"
      />
    </>
  );
}

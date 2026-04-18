"use client";

import { useState } from "react";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { ScrollRevealMotion } from "@/components/animations/ScrollRevealMotion";
import { useScrollReveal } from "@/lib/hooks/useScrollReveal";
import { BLOG_ARTICLES } from "@/lib/constants/blog-articles";

const CATEGORIES = [
  { key: "all", label: "Tous les articles" },
  { key: "seo", label: "SEO" },
  { key: "marketing-digital", label: "Marketing Digital" },
  { key: "web-design", label: "Web Design" },
  { key: "local", label: "Local" },
  { key: "ia", label: "Intelligence Artificielle" },
] as const;

const CATEGORY_LABELS: Record<string, string> = {
  seo: "SEO",
  "marketing-digital": "Marketing Digital",
  "web-design": "Web Design",
  local: "Local",
  ia: "IA",
};

export function BlogClient() {
  const [filter, setFilter] = useState("all");
  useScrollReveal();

  const filtered =
    filter === "all"
      ? BLOG_ARTICLES
      : BLOG_ARTICLES.filter((a) => a.category === filter);

  return (
    <>
      {/* Hero */}
      <section className="pt-20 pb-16 md:pt-28 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <ScrollRevealMotion>
              <span className="inline-block px-4 py-1.5 text-sm font-medium text-brand bg-brand-dim rounded-full mb-4">
                Blog Marketing Digital — Province de Liege
              </span>
            </ScrollRevealMotion>
            <ScrollRevealMotion delay={0.1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Conseils &{" "}
                <span className="gradient-text">expertise</span> en marketing
                digital
              </h1>
            </ScrollRevealMotion>
            <ScrollRevealMotion delay={0.2}>
              <p className="mt-6 text-lg text-text-secondary">
                Guides pratiques, analyses et conseils d&apos;experts pour
                booster votre presence en ligne. SEO, marketing digital,
                conception web et strategies locales pour les entreprises de
                Liege et de sa province.
              </p>
            </ScrollRevealMotion>
          </div>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="pb-20 md:pb-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {CATEGORIES.map((c) => (
              <button
                key={c.key}
                onClick={() => setFilter(c.key)}
                className={`px-5 py-2 text-sm font-medium rounded-full transition-all cursor-pointer ${
                  filter === c.key
                    ? "bg-brand text-white"
                    : "bg-bg-card border border-border text-text-secondary hover:text-text hover:border-border-hover"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Articles grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((article, i) => (
              <ScrollRevealMotion key={article.slug} delay={i * 0.08}>
                <Link href={`/blog/${article.slug}`} className="block group">
                  <Card className="h-full flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs px-2.5 py-1 rounded-full bg-brand-dim text-brand font-medium">
                        {CATEGORY_LABELS[article.category] || article.category}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-text-muted">
                        <Clock size={12} />
                        {article.readingTime}
                      </span>
                    </div>

                    <h2 className="text-lg font-bold text-text mb-2 group-hover:text-brand transition-colors leading-snug">
                      {article.title}
                    </h2>

                    <p className="text-sm text-text-secondary leading-relaxed mb-4 flex-1">
                      {article.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <span className="text-xs text-text-muted">
                        {new Date(article.publishedAt).toLocaleDateString(
                          "fr-BE",
                          { day: "numeric", month: "long", year: "numeric" }
                        )}
                      </span>
                      <span className="text-xs font-medium text-brand group-hover:underline flex items-center gap-1">
                        Lire l&apos;article
                        <ArrowRight size={12} />
                      </span>
                    </div>
                  </Card>
                </Link>
              </ScrollRevealMotion>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA
        title="Besoin d'un accompagnement concret ?"
        subtitle="Nos articles vous inspirent ? Passez a l'action. Audit digital gratuit de votre presence en ligne sous 24h."
        buttonText="Demander mon audit gratuit"
      />
    </>
  );
}

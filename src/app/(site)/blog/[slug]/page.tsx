import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, ArrowLeft, ArrowRight, Tag } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { LeadMagnet } from "@/components/sections/LeadMagnet";
import { BLOG_ARTICLES } from "@/lib/constants/blog-articles";

const CATEGORY_LABELS: Record<string, string> = {
  seo: "SEO",
  "marketing-digital": "Marketing Digital",
  "web-design": "Web Design",
  local: "Local",
  ia: "IA",
};

export function generateStaticParams() {
  return BLOG_ARTICLES.map((article) => ({ slug: article.slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return params.then(({ slug }) => {
    const article = BLOG_ARTICLES.find((a) => a.slug === slug);
    if (!article) return { title: "Article introuvable" };
    return {
      title: article.metaTitle,
      description: article.metaDescription,
      keywords: article.keywords,
      alternates: {
        canonical: `/blog/${article.slug}`,
      },
      openGraph: {
        title: article.metaTitle,
        description: article.metaDescription,
        type: "article",
        publishedTime: article.publishedAt,
        locale: "fr_BE",
      },
    };
  });
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = BLOG_ARTICLES.find((a) => a.slug === slug);

  if (!article) notFound();

  const relatedArticles = BLOG_ARTICLES.filter(
    (a) => a.slug !== slug && a.category === article.category
  ).slice(0, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.metaDescription,
    datePublished: article.publishedAt,
    author: { "@type": "Organization", name: "PrismaFlux" },
    publisher: {
      "@type": "Organization",
      name: "PrismaFlux",
      url: "https://prismaflux.com",
    },
    mainEntityOfPage: `https://prismaflux.com/blog/${article.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <article className="pt-20 pb-16 md:pt-28 md:pb-20">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-text-muted mb-8">
            <Link href="/" className="hover:text-text transition-colors">
              Accueil
            </Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-text transition-colors">
              Blog
            </Link>
            <span>/</span>
            <span className="text-text-secondary truncate">{article.title}</span>
          </nav>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="text-xs px-2.5 py-1 rounded-full bg-brand-dim text-brand font-medium">
              {CATEGORY_LABELS[article.category] || article.category}
            </span>
            <span className="flex items-center gap-1 text-xs text-text-muted">
              <Clock size={12} />
              {article.readingTime}
            </span>
            <span className="text-xs text-text-muted">
              {new Date(article.publishedAt).toLocaleDateString("fr-BE", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-text leading-tight mb-8">
            {article.title}
          </h1>

          {/* Content */}
          <div
            className="prose-pf"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Keywords */}
          <div className="mt-12 pt-6 border-t border-border">
            <div className="flex flex-wrap gap-2">
              {article.keywords.map((kw) => (
                <span
                  key={kw}
                  className="text-xs px-3 py-1 rounded-full bg-bg-card border border-border text-text-muted"
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>

          {/* Back link */}
          <div className="mt-8">
            <Button href="/blog" variant="secondary" size="sm">
              <ArrowLeft size={14} className="mr-2" />
              Retour au blog
            </Button>
          </div>
        </div>
      </article>

      {/* Lead Magnet */}
      <LeadMagnet />

      {/* Related articles */}
      {relatedArticles.length > 0 && (
        <section className="py-20 md:py-28 bg-bg-surface/30">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <h2 className="text-2xl font-bold text-text mb-8 text-center">
              Articles similaires
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((a) => (
                <Link key={a.slug} href={`/blog/${a.slug}`} className="block group">
                  <Card>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-brand-dim text-brand font-medium">
                      {CATEGORY_LABELS[a.category]}
                    </span>
                    <h3 className="text-base font-bold text-text mt-3 mb-2 group-hover:text-brand transition-colors leading-snug">
                      {a.title}
                    </h3>
                    <p className="text-sm text-text-secondary line-clamp-2">
                      {a.excerpt}
                    </p>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

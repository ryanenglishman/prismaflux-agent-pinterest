import type { MetadataRoute } from "next";
import { BLOG_ARTICLES } from "@/lib/constants/blog-articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://prismaflux.com";
  const now = new Date();

  const blogUrls = BLOG_ARTICLES.map((article) => ({
    url: `${baseUrl}/blog/${article.slug}`,
    lastModified: new Date(article.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    { url: baseUrl, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/services/creation-site-web`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/services/referencement-google`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/services/reseaux-sociaux`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/services/strategie-digitale`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/services/spots-publicitaires`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/realisations`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    ...blogUrls,
    { url: `${baseUrl}/agence`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/agence-web-huy`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/agence-web-seraing`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/agence-web-sprimont`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/agence-web-herstal`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/agence-web-verviers`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/outils/audit-digital`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/outils/jeu-erreurs-seo`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/outils/simulateur-croissance`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/mentions-legales`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];
}

/**
 * Pinterest SEO scoring and keyword analysis.
 */

export const PINTEREST_TARGET_KEYWORDS = [
  "prismaflux", "automobile", "concessionnaire", "ia", "intelligence artificielle",
  "vente auto", "concession", "digital", "performance", "stock",
  "rotation", "marketing auto", "seo", "automatisation", "vehicule",
  "occasion", "multidiffusion", "annonce", "plateforme", "audit",
];

const SEASONAL_KEYWORDS: Record<number, string[]> = {
  0: ["soldes hiver", "reprise janvier", "salon automobile"],
  1: ["saint-valentin auto", "offre fevrier"],
  2: ["printemps auto", "renouvellement parc", "salons auto mars"],
  3: ["vacances paques", "offre printemps"],
  4: ["deconfinement", "route des vacances"],
  5: ["ete automobile", "road trip", "vacances ete"],
  6: ["soldes ete", "depart vacances"],
  7: ["rentree auto", "offre aout"],
  8: ["rentree", "nouveau depart", "salon francfort"],
  9: ["mondial auto", "octobre auto"],
  10: ["black friday auto", "offre novembre"],
  11: ["noel auto", "cadeau automobile", "fin d'annee"],
};

export function getSeasonalKeywords(): string[] {
  return SEASONAL_KEYWORDS[new Date().getMonth()] || [];
}

export function getCurrentSeason(): string {
  const month = new Date().getMonth();
  if (month >= 2 && month <= 4) return "printemps";
  if (month >= 5 && month <= 7) return "ete";
  if (month >= 8 && month <= 10) return "automne";
  return "hiver";
}

export function countKeywords(
  text: string,
  keywords: string[] = PINTEREST_TARGET_KEYWORDS,
): Record<string, number> {
  const lower = text.toLowerCase();
  const counts: Record<string, number> = {};
  for (const kw of keywords) {
    const regex = new RegExp(kw.toLowerCase(), "gi");
    const matches = lower.match(regex);
    if (matches && matches.length > 0) {
      counts[kw] = matches.length;
    }
  }
  return counts;
}

export interface SEOScore {
  score: number;
  keywords: Record<string, number>;
  hashtagCount: number;
  length: number;
  hasCTA: boolean;
  hasLink: boolean;
  tips: string[];
}

export function getSEOScore(description: string, title?: string): SEOScore {
  const fullText = `${title || ""} ${description}`;
  const keywords = countKeywords(fullText);
  const keywordCount = Object.keys(keywords).length;
  const hashtagCount = (description.match(/#\w+/g) || []).length;
  const length = description.length;
  const hasCTA = /decouvr|essaye|rejoign|audit|calculez|prismaflux\.com/i.test(description);
  const hasLink = /prismaflux|auto-prismaflux/i.test(description);

  let score = 0;
  const tips: string[] = [];

  // Keyword density (0-30 pts)
  if (keywordCount >= 4) score += 30;
  else if (keywordCount >= 2) score += 20;
  else if (keywordCount >= 1) score += 10;
  else tips.push("Ajoutez des mots-cles cibles (automobile, IA, concession)");

  // Length (0-20 pts)
  if (length >= 100 && length <= 500) score += 20;
  else if (length >= 50) score += 10;
  else tips.push("Description ideale: 100-500 caracteres");

  // Hashtags (0-20 pts)
  if (hashtagCount >= 4 && hashtagCount <= 6) score += 20;
  else if (hashtagCount >= 2) score += 10;
  else tips.push("Ajoutez 4-5 hashtags pertinents");

  // CTA (0-15 pts)
  if (hasCTA) score += 15;
  else tips.push("Ajoutez un appel a l'action (CTA)");

  // Brand mention (0-15 pts)
  if (hasLink) score += 15;
  else tips.push("Mentionnez PrismaFlux ou auto-prismaflux.com");

  return { score, keywords, hashtagCount, length, hasCTA, hasLink, tips };
}

export function getSEOTips(): string[] {
  const season = getCurrentSeason();
  const month = new Date().toLocaleString("fr-FR", { month: "long" });
  const seasonal = getSeasonalKeywords();

  const tips = [
    `Utilisez des descriptions de 100-500 caracteres pour un engagement optimal`,
    `Incluez 4-5 hashtags pertinents (#PrismaFlux #Automobile #IAAutomobile)`,
    `Ajoutez un lien vers auto-prismaflux.com dans chaque pin`,
    `Publiez entre 20h et 21h pour maximiser l'engagement Pinterest`,
    `Variez les styles de contenu pour toucher differents segments`,
    `En ${month}, misez sur les themes: ${seasonal.slice(0, 2).join(", ")}`,
    `Les pins avec CTA obtiennent 80% plus de clics`,
    `Le format portrait (2:3) performe 60% mieux sur Pinterest`,
  ];

  // Rotate 3 tips per day
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000,
  );
  const startIdx = (dayOfYear * 3) % tips.length;
  return [
    tips[startIdx % tips.length],
    tips[(startIdx + 1) % tips.length],
    tips[(startIdx + 2) % tips.length],
  ];
}

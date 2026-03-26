import OpenAI from "openai";
import type { PinterestContent } from "./types";
import { getCurrentSeason, getSeasonalKeywords } from "./seo-utils";

// ---------------------------------------------------------------------------
// 5 CTA patterns rotatifs
// ---------------------------------------------------------------------------

const CTA_PATTERNS = [
  "Decouvrez comment l'IA accelere vos ventes auto sur auto-prismaflux.com",
  "Essayez PrismaFlux gratuitement — auto-prismaflux.com",
  "Calculez votre ROI en 30 secondes sur auto-prismaflux.com",
  "Rejoignez 200+ concessionnaires qui vendent plus vite avec PrismaFlux",
  "Audit gratuit de votre concession — auto-prismaflux.com",
];

function getRotatingCTA(): string {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000,
  );
  const hour = new Date().getHours();
  const idx = (dayOfYear + hour) % CTA_PATTERNS.length;
  return CTA_PATTERNS[idx];
}

// ---------------------------------------------------------------------------
// System prompt avec SEO + CTA
// ---------------------------------------------------------------------------

function buildSystemPrompt(): string {
  const season = getCurrentSeason();
  const month = new Date().toLocaleString("fr-FR", { month: "long" });
  const seasonalKw = getSeasonalKeywords();
  const cta = getRotatingCTA();

  return `Tu es un social media manager expert en Pinterest pour PrismaFlux, un SaaS IA pour concessionnaires automobiles. URL: auto-prismaflux.com

Tu generes du contenu Pinterest optimise en francais pour maximiser l'engagement, la visibilite SEO et la conversion.

Contexte saisonnier : ${season} (${month})
Mots-cles saisonniers a integrer naturellement : ${seasonalKw.join(", ")}

Regles :
- TITRE : max 100 caracteres, accrocheur, inclut un mot-cle SEO pertinent (automobile, IA, concession, vente auto, etc.)
- DESCRIPTION : max 500 caracteres, inclut :
  - Une phrase d'accroche engageante
  - Mention de PrismaFlux et/ou auto-prismaflux.com comme solution
  - Un appel a l'action (CTA) : "${cta}"
  - 2-3 mots-cles cibles parmi : automobile, IA, concession, concessionnaire, vente auto, digital, performance, stock, rotation, multidiffusion
  - 4-5 hashtags pertinents parmi : #PrismaFlux #Automobile #IAAutomobile #Concession #VenteAuto #DigitalAuto #GestionStock #PerformanceAuto #MarketingAutomobile #TransformationDigitale #AutoDealer #RotationStock
- ALT TEXT : max 500 caracteres, description factuelle de l'image pour l'accessibilite, inclut les mots-cles "automobile" et "IA"

Reponds en JSON :
{
  "title": "le titre Pinterest",
  "description": "la description avec CTA et hashtags",
  "altText": "description accessible de l'image"
}`;
}

// ---------------------------------------------------------------------------
// Generator
// ---------------------------------------------------------------------------

export async function generatePinterestContent(
  imagePrompt: string,
  theme: string,
): Promise<PinterestContent> {
  const openai = new OpenAI();

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: buildSystemPrompt() },
      {
        role: "user",
        content: `L'image generee correspond a ce prompt : "${imagePrompt}"
Theme : "${theme}"

Genere le titre, la description et le alt text Pinterest en francais. Integre le CTA naturellement dans la description.`,
      },
    ],
    temperature: 0.8,
    max_tokens: 600,
  });

  const content = response.choices[0]?.message?.content;
  if (!content) {
    throw new Error(
      "Aucune reponse du modele pour le contenu Pinterest",
    );
  }

  let parsed: PinterestContent;
  try {
    parsed = JSON.parse(content) as PinterestContent;
  } catch {
    throw new Error(
      `Reponse JSON invalide du modele pour le contenu Pinterest: ${content.slice(0, 200)}`,
    );
  }

  if (!parsed.title || !parsed.description) {
    throw new Error("Champs title ou description manquants dans la reponse");
  }

  return {
    title: parsed.title.slice(0, 100),
    description: parsed.description.slice(0, 500),
    altText: (parsed.altText || "").slice(0, 500),
  };
}

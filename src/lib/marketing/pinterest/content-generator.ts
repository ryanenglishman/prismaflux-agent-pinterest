import OpenAI from "openai";
import type { PinterestContent } from "./types";

const SYSTEM_PROMPT = `Tu es un social media manager expert en Pinterest pour PrismaFlux, un SaaS IA pour concessionnaires automobiles.

Tu generes du contenu Pinterest optimise en francais pour maximiser l'engagement et la visibilite.

Regles :
- TITRE : max 100 caracteres, accrocheur, inclut un mot-cle SEO pertinent (automobile, IA, concession, vente auto, etc.)
- DESCRIPTION : max 500 caracteres, inclut :
  - Une phrase d'accroche engageante
  - Mention de PrismaFlux comme solution
  - Un appel a l'action subtil
  - 4-5 hashtags pertinents parmi : #PrismaFlux #Automobile #IAAutomobile #Concession #VenteAuto #DigitalAuto #GestionStock #PerformanceAuto #MarketingAutomobile #TransformationDigitale #AutoDealer #RotationStock
- ALT TEXT : max 500 caracteres, description factuelle de l'image pour l'accessibilite

Reponds en JSON :
{
  "title": "le titre Pinterest",
  "description": "la description avec hashtags",
  "altText": "description accessible de l'image"
}`;

export async function generatePinterestContent(
  imagePrompt: string,
  theme: string,
): Promise<PinterestContent> {
  const openai = new OpenAI();

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      {
        role: "user",
        content: `L'image generee correspond a ce prompt : "${imagePrompt}"
Theme : "${theme}"

Genere le titre, la description et le alt text Pinterest en francais.`,
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

  const parsed = JSON.parse(content) as PinterestContent;
  if (!parsed.title || !parsed.description) {
    throw new Error("Champs title ou description manquants");
  }

  return {
    title: parsed.title.slice(0, 100),
    description: parsed.description.slice(0, 500),
    altText: (parsed.altText || "").slice(0, 500),
  };
}

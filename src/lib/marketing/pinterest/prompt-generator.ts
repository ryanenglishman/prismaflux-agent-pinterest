import OpenAI from "openai";
import type { PromptGenerationResult } from "./types";

const THEMES = [
  "Concession automobile futuriste avec technologie IA",
  "Tableau de bord digital de performance et rotation des stocks",
  "Intelligence artificielle au service des concessionnaires",
  "Vente automobile acceleree par la data et l'automatisation",
  "Transformation digitale du marche automobile",
  "Croissance et scaling d'une concession grace a l'IA",
  "Optimisation du temps pour les professionnels de l'automobile",
  "PrismaFlux - lumiere, prismes et innovation automobile",
] as const;

const SYSTEM_PROMPT = `Tu es un directeur artistique specialise dans l'univers automobile premium et la technologie IA.

Ta mission : generer un prompt detaille pour un modele de generation d'images IA. Le prompt doit produire une image visuellement frappante, professionnelle et moderne.

Contexte de marque :
- PrismaFlux est un SaaS IA pour concessionnaires automobiles
- L'identite visuelle evoque les prismes, la refraction de lumiere, les donnees en mouvement
- Palette : tons sombres (bleu nuit, noir) avec accents lumineux (jaune dore, blanc, cyan)
- Ambiance : futuriste, premium, technologique mais accessible

Regles pour le prompt image :
- NE PAS inclure de texte, mots, lettres ou chiffres dans l'image
- Style photographique hyper-realiste ou 3D render premium
- Format portrait (ratio 2:3) optimise pour Pinterest
- Compositions visuellement riches avec profondeur de champ
- Integrer subtilement des elements automobiles ET technologiques
- Eclairage cinematographique, contraste fort

Reponds en JSON avec cette structure exacte :
{
  "imagePrompt": "le prompt detaille en anglais pour le generateur d'images (200-400 mots)",
  "theme": "le theme choisi en francais",
  "style": "description courte du style visuel"
}`;

export async function generateImagePrompt(): Promise<PromptGenerationResult> {
  const openai = new OpenAI();
  const today = new Date().toISOString().split("T")[0];
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) /
      86400000,
  );
  const themeIndex = dayOfYear % THEMES.length;
  const theme = THEMES[themeIndex];

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      {
        role: "user",
        content: `Date du jour : ${today}
Theme a explorer : "${theme}"
Seed de variete : ${Date.now()}

Genere un prompt d'image unique et creatif autour de ce theme. Le prompt doit etre different de tout ce qui a pu etre genere avant. Sois inventif dans la composition, l'angle, les elements visuels et les metaphores.`,
      },
    ],
    temperature: 0.95,
    max_tokens: 800,
  });

  const content = response.choices[0]?.message?.content;
  if (!content) {
    throw new Error("Aucune reponse du modele pour la generation de prompt");
  }

  try {
    const parsed = JSON.parse(content) as PromptGenerationResult;
    if (!parsed.imagePrompt) {
      throw new Error("Champ imagePrompt manquant dans la reponse");
    }
    return {
      imagePrompt: parsed.imagePrompt,
      theme: parsed.theme || theme,
      style: parsed.style || "premium automotive",
    };
  } catch {
    return {
      imagePrompt: content,
      theme,
      style: "premium automotive",
    };
  }
}

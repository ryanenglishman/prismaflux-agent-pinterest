import OpenAI from "openai";

export interface SocialExport {
  linkedin: string;
  instagram: string;
  facebook: string;
}

/**
 * Génère des posts adaptés à chaque plateforme à partir du contenu Pinterest.
 */
export async function generateSocialExports(
  imagePrompt: string,
  theme: string,
  pinterestTitle: string,
  pinterestDescription: string,
): Promise<SocialExport> {
  const openai = new OpenAI();

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: `Tu es un expert en marketing digital automobile. Tu adaptes un contenu Pinterest pour d'autres plateformes sociales.

Contexte : PrismaFlux est un SaaS IA pour concessionnaires automobiles.

Regles par plateforme :

LINKEDIN :
- Ton professionnel, educatif, B2B
- 150-250 mots
- Commencer par un hook fort (question ou stat)
- Paragraphes courts (2-3 lignes)
- Terminer par un CTA et 3-5 hashtags sectoriels
- Pas d'emojis excessifs (1-2 max)

INSTAGRAM :
- Ton inspirant, accessible, visuel
- 100-150 mots
- Commencer par une phrase accrocheuse
- Utiliser 3-5 emojis pertinents
- Terminer par un CTA engageant
- 20-25 hashtags pertinents (auto, IA, business, concessionnaire)
- Separer les hashtags du texte par des sauts de ligne

FACEBOOK :
- Ton conversationnel, communautaire
- 80-120 mots
- Question ouverte pour generer des commentaires
- 1-2 emojis
- CTA doux (pas agressif)
- 3-5 hashtags max

Reponds en JSON :
{
  "linkedin": "...",
  "instagram": "...",
  "facebook": "..."
}`,
      },
      {
        role: "user",
        content: `Adapte ce contenu Pinterest pour LinkedIn, Instagram et Facebook :

Titre : ${pinterestTitle}
Description : ${pinterestDescription}
Theme : ${theme}
Contexte visuel : ${imagePrompt.slice(0, 300)}`,
      },
    ],
    temperature: 0.8,
    max_tokens: 1200,
  });

  const content = response.choices[0]?.message?.content;
  if (!content) {
    throw new Error("Pas de reponse pour l'export social");
  }

  try {
    const parsed = JSON.parse(content) as SocialExport;
    return {
      linkedin: parsed.linkedin || "",
      instagram: parsed.instagram || "",
      facebook: parsed.facebook || "",
    };
  } catch {
    return {
      linkedin: pinterestDescription,
      instagram: pinterestDescription,
      facebook: pinterestDescription,
    };
  }
}

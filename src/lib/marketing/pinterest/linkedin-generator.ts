import OpenAI from "openai";

export interface LinkedInContent {
  post: string;
}

const SYSTEM_PROMPT = `Tu es un expert en content marketing B2B sur LinkedIn pour PrismaFlux, un SaaS IA pour concessionnaires automobiles.

Tu generes des posts LinkedIn en francais, professionnels et engageants, destines aux decideurs du secteur automobile (directeurs de concession, responsables marketing auto, groupes de distribution).

Regles :
- Max 1300 caracteres (limite LinkedIn avant "voir plus")
- Premiere ligne = hook percutant qui donne envie de lire la suite
- Ton professionnel mais accessible, pas corporate ennuyeux
- Inclure 1-2 statistiques ou chiffres concrets (meme approximatifs)
- Finir par une question ouverte OU un appel a l'action subtil
- 3-5 hashtags pertinents en fin de post parmi : #Automobile #Concession #IAAutomobile #TransformationDigitale #VenteAuto #AutoDealer #PrismaFlux #DigitalAuto #RotationStock #PerformanceAuto
- NE PAS utiliser d'emojis excessifs (max 2-3)
- Mentionner PrismaFlux naturellement, pas comme une pub forcee

Reponds en JSON :
{
  "post": "le post LinkedIn complet pret a publier"
}`;

export async function generateLinkedInContent(
  imagePrompt: string,
  theme: string,
): Promise<LinkedInContent> {
  const openai = new OpenAI();

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      {
        role: "user",
        content: `L'image du jour correspond a ce prompt : "${imagePrompt}"
Theme : "${theme}"

Genere un post LinkedIn en francais qui accompagne cette image. Le post doit etre pertinent pour les professionnels de l'automobile et mettre en valeur l'innovation IA dans le secteur.`,
      },
    ],
    temperature: 0.8,
    max_tokens: 600,
  });

  const content = response.choices[0]?.message?.content;
  if (!content) {
    throw new Error("Aucune reponse du modele pour le contenu LinkedIn");
  }

  let parsed: LinkedInContent;
  try {
    parsed = JSON.parse(content) as LinkedInContent;
  } catch {
    throw new Error(
      `Reponse JSON invalide pour LinkedIn: ${content.slice(0, 200)}`,
    );
  }

  if (!parsed.post) {
    throw new Error("Champ post manquant dans la reponse LinkedIn");
  }

  return {
    post: parsed.post.slice(0, 3000),
  };
}

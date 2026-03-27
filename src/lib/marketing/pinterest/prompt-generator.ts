import OpenAI from "openai";
import type { PromptGenerationResult } from "./types";

// ---------------------------------------------------------------------------
// 14 themes rotatifs
// ---------------------------------------------------------------------------

const THEMES = [
  "Concession automobile futuriste avec technologie IA",
  "Tableau de bord digital de performance et rotation des stocks",
  "Intelligence artificielle au service des concessionnaires",
  "Vente automobile acceleree par la data et l'automatisation",
  "Transformation digitale du marche automobile",
  "Croissance et scaling d'une concession grace a l'IA",
  "Optimisation du temps pour les professionnels de l'automobile",
  "PrismaFlux - lumiere, prismes et innovation automobile",
  "Multidiffusion automatique d'annonces sur toutes les plateformes auto",
  "Retouche photo IA et studio visuel pour vehicules d'occasion",
  "Analyse de performance web et SEO local pour concessions automobiles",
  "Audit gratuit de site web pour professionnels de l'automobile",
  "Reporting dirigeant et reputation en ligne pour concessionnaires",
  "Gestion intelligente du stock et acceleration de la rotation vehicules",
] as const;

// ---------------------------------------------------------------------------
// 8 styles de ton (redaction textuelle + direction artistique)
// ---------------------------------------------------------------------------

export const PROMPT_STYLES = [
  {
    id: "prismaflux",
    name: "PrismaFlux",
    description: "Professionnel et humain, educatif sur l'IA dans l'automobile",
    tone: `Style PrismaFlux : professionnel et humain. Ton educatif qui explique comment l'IA transforme le quotidien des concessionnaires. Approche pedagogique et concrete, pas de jargon technique inaccessible. Le visuel doit inspirer confiance et modernite. Faire le lien entre technologie et resultats business concrets. Ambiance : prismes de lumiere, refraction, donnees en mouvement, palette bleu nuit + jaune dore.`,
  },
  {
    id: "storytelling",
    name: "Storytelling",
    description: "Recit immersif, mise en scene narrative",
    tone: `Style Storytelling : raconter une histoire visuelle. Mettre en scene un moment precis — un concessionnaire qui decouvre ses resultats, un vehicule qui quitte le showroom, un client qui sourit. Le visuel doit capturer un instant narratif avec emotion et profondeur. Composition cinematographique, eclairage dramatique, personnages suggeres ou presents. L'image raconte une transformation.`,
  },
  {
    id: "expert",
    name: "Expert",
    description: "Autorite, donnees, credibilite sectorielle",
    tone: `Style Expert : ton d'autorite et de credibilite. L'image doit evoquer la maitrise, la precision, l'analyse. Tableaux de bord, graphiques holographiques, donnees en 3D, architecture numerique. Ambiance laboratoire de performance ou centre de controle. Palette froide (bleu, blanc, argent) avec accents techniques. Le spectateur doit percevoir la competence et la rigueur.`,
  },
  {
    id: "humour",
    name: "Humour",
    description: "Decale, leger, accrocheur",
    tone: `Style Humour : leger et decale sans etre ridicule. Jouer sur les contrastes — une voiture vintage a cote d'un hologramme IA, un robot qui astique une carrosserie, une situation absurde mais elegante. L'image doit faire sourire et s'arreter dans le scroll. Couleurs vives, compositions inattendues, clins d'oeil visuels. Rester professionnel malgre le ton ludique.`,
  },
  {
    id: "urgence",
    name: "Urgence / FOMO",
    description: "Tension, opportunite, action immediate",
    tone: `Style Urgence/FOMO : creer un sentiment d'opportunite a saisir. Visuels dynamiques avec mouvement — vitesse, lignes directrices, effet blur de motion. Couleurs chaudes (rouge, orange, jaune) contrastant avec du noir. Atmosphere de competition, de course contre la montre. L'image doit pousser a l'action, evoquer que ceux qui n'agissent pas maintenant seront depasses.`,
  },
  {
    id: "inspirant",
    name: "Inspirant",
    description: "Motivationnel, vision, ambition",
    tone: `Style Inspirant : evoquer une vision d'avenir. Grands espaces, perspectives panoramiques, lever de soleil sur une concession moderne. L'image doit donner envie de se projeter, de grandir. Routes infinies, horizons lumineux, architecture futuriste. Palette chaude et lumineuse. Le spectateur doit ressentir de l'ambition et de l'espoir pour son business.`,
  },
  {
    id: "educatif",
    name: "Educatif",
    description: "Pedagogique, infographique, methodique",
    tone: `Style Educatif : illustrer un concept ou un processus. L'image doit ressembler a une infographie premium en 3D — etapes d'un workflow, flux de donnees, schema de fonctionnement. Elements visuels clairs et organises, icones, fleches, blocs. Palette sobre et lisible. Le spectateur doit comprendre visuellement comment quelque chose fonctionne.`,
  },
  {
    id: "provoquant",
    name: "Provoquant / Challenger",
    description: "Bousculer les codes, question, disruption",
    tone: `Style Provoquant/Challenger : bousculer les conventions du secteur automobile. Contraste entre ancien et nouveau monde — concession poussiereuse vs showroom IA ultramoderne. Visuels qui posent une question implicite. Compositions asymetriques, angles inattendus, jeux de miroirs. L'image doit deranger juste assez pour faire reagir et engager.`,
  },
] as const;

export type PromptStyleId = (typeof PROMPT_STYLES)[number]["id"];

// ---------------------------------------------------------------------------
// System prompt de generation
// ---------------------------------------------------------------------------

function buildSystemPrompt(style: (typeof PROMPT_STYLES)[number]): string {
  return `Tu es un directeur artistique specialise dans l'univers automobile premium et la technologie IA.

Ta mission : generer un prompt detaille pour un modele de generation d'images IA. Le prompt doit produire une image visuellement frappante, professionnelle et moderne.

Contexte de marque :
- PrismaFlux est un SaaS IA pour concessionnaires automobiles
- L'identite visuelle evoque les prismes, la refraction de lumiere, les donnees en mouvement
- Palette de base : tons sombres (bleu nuit, noir) avec accents lumineux (jaune dore, blanc, cyan)
- Ambiance : futuriste, premium, technologique mais accessible

Ton et style pour ce post :
${style.tone}

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
  "style": "${style.name}"
}`;
}

// ---------------------------------------------------------------------------
// Generateur de prompt avec style rotatif
// ---------------------------------------------------------------------------

export async function generateImagePrompt(
  themeOverride?: string,
  customInstructions?: string,
  styleOverride?: PromptStyleId,
): Promise<PromptGenerationResult> {
  const openai = new OpenAI();
  const today = new Date().toISOString().split("T")[0];
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) /
      86400000,
  );

  // Theme rotation
  const themeIndex = dayOfYear % THEMES.length;
  const theme = themeOverride || THEMES[themeIndex];

  // Style rotation — uses hour + seed for intra-day variety
  const hour = new Date().getHours();
  const styleIndex = styleOverride
    ? PROMPT_STYLES.findIndex((s) => s.id === styleOverride)
    : (dayOfYear + hour) % PROMPT_STYLES.length;
  const style = PROMPT_STYLES[styleIndex >= 0 ? styleIndex : 0];

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: buildSystemPrompt(style) },
      {
        role: "user",
        content: `Date du jour : ${today}
Theme a explorer : "${theme}"
Style de ton : ${style.name}
Seed de variete : ${Date.now()}

Genere un prompt d'image unique et creatif autour de ce theme avec le ton "${style.name}". Le prompt doit etre different de tout ce qui a pu etre genere avant. Sois inventif dans la composition, l'angle, les elements visuels et les metaphores.${customInstructions ? `\n\nInstructions supplementaires : ${customInstructions}` : ""}`,
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
      style: parsed.style || style.name,
    };
  } catch {
    return {
      imagePrompt: content,
      theme,
      style: style.name,
    };
  }
}

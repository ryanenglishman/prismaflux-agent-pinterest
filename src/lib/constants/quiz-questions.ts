export interface QuizOption {
  text: string;
  emoji: string;
  scores: Record<string, number>; // dimension → points (0-5)
}

export interface QuizQuestion {
  id: number;
  question: string;
  context: string; // pourquoi cette question est importante
  options: QuizOption[];
}

export const DIMENSIONS = ["Site Web", "SEO", "Social Media", "Publicite", "Strategie"] as const;
export type Dimension = (typeof DIMENSIONS)[number];

export const DIMENSION_COLORS: Record<string, string> = {
  "Site Web": "#FF1744",
  SEO: "#6366F1",
  "Social Media": "#FF6B35",
  Publicite: "#00E676",
  Strategie: "#FFD740",
};

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "Votre entreprise possede-t-elle un site web ?",
    context: "Votre site web est le socle de toute strategie digitale. 81% des consommateurs recherchent en ligne avant un achat.",
    options: [
      { text: "Non, pas encore", emoji: "🚫", scores: { "Site Web": 0, SEO: 0 } },
      { text: "Oui, mais il a plus de 3 ans", emoji: "🕐", scores: { "Site Web": 2, SEO: 1 } },
      { text: "Oui, un site moderne et responsive", emoji: "✅", scores: { "Site Web": 4, SEO: 2 } },
      { text: "Oui, optimise SEO avec tunnel de conversion", emoji: "🚀", scores: { "Site Web": 5, SEO: 4 } },
    ],
  },
  {
    id: 2,
    question: "Etes-vous visible sur Google Maps / Google Business Profile ?",
    context: "46% des recherches Google ont une intention locale. Votre fiche Google Business est souvent le premier contact avec un client potentiel.",
    options: [
      { text: "Non, je n'ai pas de fiche", emoji: "❌", scores: { SEO: 0, Strategie: 0 } },
      { text: "J'ai une fiche mais elle n'est pas a jour", emoji: "📋", scores: { SEO: 2, Strategie: 1 } },
      { text: "Ma fiche est complete avec photos et horaires", emoji: "📍", scores: { SEO: 3, Strategie: 2 } },
      { text: "Ma fiche est optimisee et j'ai plus de 20 avis", emoji: "⭐", scores: { SEO: 5, Strategie: 3 } },
    ],
  },
  {
    id: 3,
    question: "Quelle est votre strategie de contenu en ligne ?",
    context: "Le content marketing genere 3x plus de leads que la publicite traditionnelle pour 62% moins cher.",
    options: [
      { text: "Aucune, je ne publie rien", emoji: "😶", scores: { SEO: 0, "Social Media": 0, Strategie: 0 } },
      { text: "Je publie occasionnellement sur les reseaux", emoji: "📱", scores: { SEO: 1, "Social Media": 2, Strategie: 1 } },
      { text: "J'ai un blog et je publie regulierement", emoji: "📝", scores: { SEO: 4, "Social Media": 2, Strategie: 3 } },
      { text: "Strategie editoriale planifiee, multi-canal", emoji: "📊", scores: { SEO: 5, "Social Media": 4, Strategie: 5 } },
    ],
  },
  {
    id: 4,
    question: "Comment gerez-vous votre presence sur les reseaux sociaux ?",
    context: "4,9 milliards de personnes utilisent les reseaux sociaux. Vos clients y sont deja — la question est : vous y etes ?",
    options: [
      { text: "Je ne suis sur aucun reseau", emoji: "🔇", scores: { "Social Media": 0 } },
      { text: "J'ai des comptes mais je poste rarement", emoji: "👻", scores: { "Social Media": 1 } },
      { text: "Je publie 2-3 fois par semaine", emoji: "📅", scores: { "Social Media": 3 } },
      { text: "Calendrier editorial, community management actif", emoji: "🎯", scores: { "Social Media": 5 } },
    ],
  },
  {
    id: 5,
    question: "Investissez-vous en publicite en ligne ?",
    context: "Les entreprises gagnent en moyenne 2 EUR pour chaque 1 EUR investi en Google Ads. Le ROI est mesurable a l'euro pres.",
    options: [
      { text: "Non, jamais", emoji: "🚫", scores: { Publicite: 0, Strategie: 0 } },
      { text: "J'ai teste une fois sans vraiment suivre", emoji: "🎰", scores: { Publicite: 1, Strategie: 1 } },
      { text: "Je fais des campagnes ponctuelles", emoji: "📈", scores: { Publicite: 3, Strategie: 2 } },
      { text: "Budget mensuel avec suivi ROAS et optimisation", emoji: "💰", scores: { Publicite: 5, Strategie: 4 } },
    ],
  },
  {
    id: 6,
    question: "Votre site web est-il optimise pour le mobile ?",
    context: "Plus de 60% du trafic web mondial vient du mobile. Un site non optimise mobile perd la majorite de ses visiteurs.",
    options: [
      { text: "Je ne sais pas", emoji: "🤷", scores: { "Site Web": 0, SEO: 0 } },
      { text: "Pas vraiment, il s'affiche mal sur telephone", emoji: "📱", scores: { "Site Web": 1, SEO: 1 } },
      { text: "Oui, il est responsive", emoji: "✅", scores: { "Site Web": 3, SEO: 3 } },
      { text: "Mobile-first, teste et optimise (Core Web Vitals)", emoji: "⚡", scores: { "Site Web": 5, SEO: 5 } },
    ],
  },
  {
    id: 7,
    question: "Utilisez-vous des outils d'analyse web (Google Analytics, Search Console) ?",
    context: "Sans mesure, pas d'amelioration. Les entreprises data-driven ont 23x plus de chances d'acquerir des clients.",
    options: [
      { text: "Non, aucun outil", emoji: "🙈", scores: { Strategie: 0, SEO: 0 } },
      { text: "Google Analytics est installe mais je ne regarde jamais", emoji: "📊", scores: { Strategie: 1, SEO: 1 } },
      { text: "Je consulte mes stats regulierement", emoji: "👀", scores: { Strategie: 3, SEO: 3 } },
      { text: "Tableau de bord KPIs, attribution, reporting mensuel", emoji: "🎛️", scores: { Strategie: 5, SEO: 4 } },
    ],
  },
  {
    id: 8,
    question: "Recevez-vous des demandes de contact via votre site web ?",
    context: "Un site bien optimise devrait generer au minimum 2-5% de taux de conversion. En dessous, il y a un probleme a resoudre.",
    options: [
      { text: "Jamais ou presque", emoji: "😔", scores: { "Site Web": 0, Strategie: 0 } },
      { text: "Quelques-unes par mois", emoji: "🤏", scores: { "Site Web": 2, Strategie: 2 } },
      { text: "Regulierement (5-15 par mois)", emoji: "👍", scores: { "Site Web": 4, Strategie: 3 } },
      { text: "C'est mon premier canal d'acquisition", emoji: "🏆", scores: { "Site Web": 5, Strategie: 5 } },
    ],
  },
  {
    id: 9,
    question: "Avez-vous une strategie d'email marketing ?",
    context: "L'email marketing a un ROI moyen de 36 EUR pour 1 EUR investi — le plus eleve de tous les canaux de marketing digital.",
    options: [
      { text: "Non, pas du tout", emoji: "❌", scores: { Strategie: 0, Publicite: 0 } },
      { text: "J'envoie des emails ponctuellement", emoji: "✉️", scores: { Strategie: 1, Publicite: 1 } },
      { text: "Newsletter reguliere avec une liste de contacts", emoji: "📧", scores: { Strategie: 3, Publicite: 3 } },
      { text: "Sequences automatisees, segmentation, A/B testing", emoji: "🤖", scores: { Strategie: 5, Publicite: 5 } },
    ],
  },
  {
    id: 10,
    question: "Comment decririez-vous votre strategie digitale globale ?",
    context: "Les entreprises avec une strategie digitale documentee ont 313% plus de chances d'atteindre leurs objectifs marketing.",
    options: [
      { text: "Je n'en ai pas, j'avance au feeling", emoji: "🎲", scores: { Strategie: 0 } },
      { text: "J'ai quelques idees mais rien de structure", emoji: "💭", scores: { Strategie: 1 } },
      { text: "Plan d'action avec objectifs et budget defini", emoji: "📋", scores: { Strategie: 3 } },
      { text: "Strategie multi-canal documentee avec KPIs et ROI mesure", emoji: "🧠", scores: { Strategie: 5 } },
    ],
  },
];

export const RECOMMENDATIONS: Record<string, { low: string; medium: string; high: string }> = {
  "Site Web": {
    low: "Votre site web est votre vitrine digitale. Un site moderne, rapide et optimise SEO est la base de toute strategie digitale. C'est le premier investissement a faire.",
    medium: "Votre site existe mais pourrait etre ameliore. Pensez a une refonte pour optimiser les conversions, la vitesse et le referencement naturel.",
    high: "Excellent ! Votre site est un vrai atout. Continuez a l'optimiser avec du contenu frais et des A/B tests reguliers.",
  },
  SEO: {
    low: "Votre visibilite sur Google est quasi inexistante. Un audit SEO complet et une strategie de referencement naturel pourraient transformer votre acquisition de clients.",
    medium: "Des bases SEO sont en place mais il reste du potentiel. Renforcez votre contenu, votre netlinking et votre SEO local pour grimper dans les positions.",
    high: "Votre SEO est bien gere. Explorez la longue traine et le content marketing pour consolider vos positions et en conquérir de nouvelles.",
  },
  "Social Media": {
    low: "Les reseaux sociaux sont un levier puissant pour la notoriete et la generation de leads. Il est temps de vous y mettre avec une strategie structuree.",
    medium: "Vous etes present mais pas assez regulier. Un calendrier editorial et du contenu de qualite pourraient multiplier votre engagement et votre reach.",
    high: "Belle presence social media ! Pensez a integrer la publicite ciblee et le retargeting pour convertir votre audience en clients.",
  },
  Publicite: {
    low: "La publicite digitale (Google Ads, Facebook Ads) permet de generer des resultats immediats. Meme avec un petit budget, le ROI peut etre significatif.",
    medium: "Vos campagnes publicitaires meritent d'etre optimisees. Un meilleur ciblage et un suivi des conversions pourraient diviser votre cout par acquisition.",
    high: "Vos campagnes sont bien gerees. Explorez de nouveaux canaux et testez le remarketing pour maximiser le retour sur investissement.",
  },
  Strategie: {
    low: "Sans strategie digitale, vos efforts manquent de coherence. Un plan d'action structure avec des objectifs clairs est indispensable pour progresser.",
    medium: "Vous avez des bases strategiques. Structurez davantage avec des KPIs precis, un calendrier et une vision multi-canal pour accelerer.",
    high: "Votre strategie digitale est solide. Continuez a mesurer, tester et optimiser pour maintenir votre avance concurrentielle.",
  },
};

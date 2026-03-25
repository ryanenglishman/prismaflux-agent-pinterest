export type Copilot = {
  id: string;
  name: string;
  role: string;
  description: string;
  color: string;
  price: string | null;
  included: boolean;
  addon: boolean;
  mvp: boolean;
  emoji: string;
};

export const COPILOTS: Copilot[] = [
  {
    id: "robin",
    name: "Robin",
    role: "Multidiffusion & Auto-remplissage",
    description:
      "Robin analyse vos photos et documents pour remplir automatiquement vos fiches véhicules. Il publie ensuite sur toutes vos plateformes en un clic.",
    color: "#FF6B35",
    price: "Inclus",
    included: true,
    addon: false,
    mvp: true,
    emoji: "🦅",
  },
  {
    id: "lana",
    name: "Lana Basic",
    role: "Vehicle Studio",
    description:
      "Lana retouche automatiquement vos photos : suppression de fond, correction de lumière, mise en scène professionnelle.",
    color: "#E91E8C",
    price: "Inclus",
    included: true,
    addon: false,
    mvp: true,
    emoji: "📸",
  },
  {
    id: "lana-performance",
    name: "Lana Performance",
    role: "Studio Pro + Réseaux sociaux",
    description:
      "Toutes les fonctionnalités de Lana Basic, plus la création automatique de posts réseaux sociaux et stories pour vos véhicules.",
    color: "#E91E8C",
    price: "449 €/mois",
    included: false,
    addon: true,
    mvp: true,
    emoji: "🎬",
  },
  {
    id: "marcus",
    name: "Marcus",
    role: "Analyse site web & SEO",
    description:
      "Marcus audite votre site web, analyse vos concurrents et vous donne un plan d'action concret pour dominer votre marché local.",
    color: "#1565C0",
    price: "299 €/mois",
    included: false,
    addon: true,
    mvp: true,
    emoji: "🔍",
  },
  {
    id: "pierre",
    name: "Pierre",
    role: "Reporting & Réputation",
    description:
      "Pierre suit votre réputation Google, compile vos KPIs et génère un rapport mensuel clair pour piloter votre concession.",
    color: "#2E7D32",
    price: "Inclus",
    included: true,
    addon: false,
    mvp: true,
    emoji: "📊",
  },
];

export const BASE_PLAN = {
  name: "Plan PrismaFlux",
  price: 749,
  currency: "EUR",
  period: "mois",
  annualDiscount: 20,
  trialDays: 7,
  includes: ["Robin", "Lana Basic", "Pierre", "AutoScout24", "2ememain"],
};

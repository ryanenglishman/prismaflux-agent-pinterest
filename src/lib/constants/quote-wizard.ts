import { Globe, Search, Share2, TrendingUp, Video, type LucideIcon } from "lucide-react";

export interface WizardService {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const WIZARD_SERVICES: WizardService[] = [
  { id: "site-web", title: "Creation de site web", description: "Site vitrine, e-commerce ou landing page", icon: Globe },
  { id: "seo", title: "Referencement Google", description: "SEO et premiere page Google", icon: Search },
  { id: "social", title: "Reseaux sociaux", description: "Community management et publicite", icon: Share2 },
  { id: "strategie", title: "Strategie digitale", description: "Vision 360° et plan d'action", icon: TrendingUp },
  { id: "video", title: "Spot publicitaire", description: "Production video professionnelle", icon: Video },
];

export const WIZARD_BUDGETS = [
  "Moins de 1.000 EUR",
  "1.000 - 3.000 EUR",
  "3.000 - 5.000 EUR",
  "5.000 - 10.000 EUR",
  "Plus de 10.000 EUR",
];

export const WIZARD_TIMELINES = [
  "Le plus vite possible",
  "1 a 3 mois",
  "3 a 6 mois",
  "Pas de rush, on planifie",
];

export const WIZARD_FEATURES: Record<string, string[]> = {
  "site-web": ["Design sur mesure", "SEO de base", "Blog integre", "Multi-langue", "E-commerce", "Espace membre", "Formulaires avances"],
  "seo": ["Audit technique", "Optimisation on-page", "Strategie de contenu", "Netlinking", "SEO local", "Reporting mensuel"],
  "social": ["Creation de contenu", "Gestion de communaute", "Publicite Facebook", "Publicite Instagram", "Google Ads", "Reporting"],
  "strategie": ["Audit complet", "Plan d'action", "Formation equipe", "Suivi mensuel", "Integration IA", "Multi-canal"],
  "video": ["Spot social media", "Video corporate", "Teaser produit", "Spot TV/Web", "Sous-titrage", "Diffusion multi-plateforme"],
};

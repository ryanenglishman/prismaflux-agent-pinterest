export interface PricingFeature {
  id: string;
  label: string;
  cost: number;
}

export const BASE_PRICES: Record<string, { label: string; price: number; description: string }> = {
  vitrine: { label: "Site vitrine", price: 1500, description: "Presentez votre activite en ligne" },
  ecommerce: { label: "Site e-commerce", price: 3500, description: "Vendez vos produits en ligne" },
  landing: { label: "Landing page", price: 800, description: "Page d'atterrissage conversion" },
};

export const PRICING_FEATURES: PricingFeature[] = [
  { id: "seo", label: "Optimisation SEO avancee", cost: 500 },
  { id: "blog", label: "Blog integre", cost: 400 },
  { id: "multilang", label: "Multi-langue (FR/NL/EN)", cost: 600 },
  { id: "booking", label: "Systeme de reservation", cost: 700 },
  { id: "members", label: "Espace membre", cost: 800 },
  { id: "animations", label: "Animations premium", cost: 300 },
];

export const PAGE_RANGES = [
  { id: "1-5", label: "1 a 5 pages", multiplier: 1 },
  { id: "5-10", label: "5 a 10 pages", multiplier: 1.3 },
  { id: "10-20", label: "10 a 20 pages", multiplier: 1.6 },
  { id: "20+", label: "20+ pages", multiplier: 2 },
];

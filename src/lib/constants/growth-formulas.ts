export const SECTORS = [
  { id: "commerce", label: "Commerce / Retail" },
  { id: "service", label: "Services aux entreprises" },
  { id: "artisanat", label: "Artisanat / BTP" },
  { id: "liberal", label: "Profession liberale" },
  { id: "restauration", label: "Restauration / Horeca" },
  { id: "autre", label: "Autre secteur" },
];

export const LOCATIONS = [
  { id: "liege-centre", label: "Liege centre", multiplier: 1.2 },
  { id: "province-liege", label: "Province de Liege", multiplier: 1.0 },
  { id: "belgique", label: "Belgique entiere", multiplier: 0.8 },
];

export const LEVERS = [
  { id: "seo", label: "Referencement Google (SEO)", color: "#6366F1", budgetShare: 0.4 },
  { id: "ads", label: "Google Ads / Facebook Ads", color: "#00E676", budgetShare: 0.35 },
  { id: "social", label: "Social Media Marketing", color: "#FF6B35", budgetShare: 0.25 },
];

// Simplified growth formulas for simulation
export function calculateGrowth(params: {
  budget: number;
  sector: string;
  location: string;
  levers: string[];
  month: number;
}): { traffic: number; leads: number; revenue: number } {
  const { budget, location, levers, month } = params;

  const locMultiplier = LOCATIONS.find((l) => l.id === location)?.multiplier || 1;
  const leverCount = levers.length;
  if (leverCount === 0) return { traffic: 0, leads: 0, revenue: 0 };

  const synergyBonus = leverCount > 1 ? 1 + (leverCount - 1) * 0.15 : 1;

  let baseTraffic = 0;
  let baseCR = 0.02; // base conversion rate

  if (levers.includes("seo")) {
    // SEO grows exponentially over time
    const seoGrowth = Math.min(month / 6, 1) * Math.pow(1.08, month);
    baseTraffic += (budget * 0.4 * seoGrowth * 0.5) * locMultiplier;
    baseCR += 0.005;
  }

  if (levers.includes("ads")) {
    // Ads are immediate but plateau
    const adsGrowth = 0.8 + 0.2 * Math.min(month / 3, 1);
    baseTraffic += (budget * 0.35 * adsGrowth * 0.3) * locMultiplier;
    baseCR += 0.003;
  }

  if (levers.includes("social")) {
    // Social grows slowly then compounds
    const socialGrowth = Math.pow(month / 12, 0.7) * 1.5;
    baseTraffic += (budget * 0.25 * socialGrowth * 0.2) * locMultiplier;
    baseCR += 0.002;
  }

  const traffic = Math.round(baseTraffic * synergyBonus);
  const leads = Math.round(traffic * baseCR * synergyBonus);
  const avgDealValue = 500;
  const closeRate = 0.2;
  const revenue = Math.round(leads * avgDealValue * closeRate);

  return { traffic, leads, revenue };
}

/**
 * Suggestions IA d'heures optimales de publication.
 * Combine best practices secteur auto + données réelles Pinterest.
 */

import type { PinAnalytics } from "./types";

// Best practices Pinterest secteur automobile (source: études Pinterest Business)
const BEST_PRACTICE_SLOTS = [
  { hour: 8, minute: 0, score: 72, reason: "Debut de journee — scroll matinal" },
  { hour: 10, minute: 30, score: 65, reason: "Pause cafe — engagement modere" },
  { hour: 12, minute: 15, score: 78, reason: "Pause dejeuner — pic d'engagement" },
  { hour: 14, minute: 0, score: 60, reason: "Debut d'apres-midi — engagement stable" },
  { hour: 17, minute: 30, score: 85, reason: "Fin de journee — pic maximal Pinterest" },
  { hour: 19, minute: 0, score: 80, reason: "Soiree — navigation detente" },
  { hour: 20, minute: 30, score: 88, reason: "Prime time — meilleur engagement global" },
  { hour: 21, minute: 45, score: 75, reason: "Soiree tardive — engagement premium" },
];

// Facteurs jour de la semaine (multiplicateur)
const DAY_FACTORS: Record<number, number> = {
  0: 0.9,  // Dimanche — engagement modere
  1: 1.0,  // Lundi — standard
  2: 1.05, // Mardi — leger boost
  3: 1.0,  // Mercredi — standard
  4: 1.1,  // Jeudi — boost pre-weekend
  5: 1.15, // Vendredi — meilleur jour B2B auto
  6: 0.95, // Samedi — engagement weekend
};

export interface TimeSuggestion {
  hour: number;
  minute: number;
  score: number;
  reason: string;
  source: "best_practice" | "analytics" | "combined";
}

/**
 * Génère des suggestions d'heures optimales.
 * Si des analytics sont fournies, combine avec les best practices.
 */
export function getTimeSuggestions(
  dayOfWeek: number,
  historicalAnalytics?: PinAnalytics[],
): TimeSuggestion[] {
  const dayFactor = DAY_FACTORS[dayOfWeek] ?? 1.0;

  // Start with best practices
  const suggestions: TimeSuggestion[] = BEST_PRACTICE_SLOTS.map((slot) => ({
    hour: slot.hour,
    minute: slot.minute,
    score: Math.round(slot.score * dayFactor),
    reason: slot.reason,
    source: "best_practice" as const,
  }));

  // If we have historical analytics, boost/penalize based on real data
  if (historicalAnalytics && historicalAnalytics.length >= 5) {
    // Analyze which hours got the most engagement
    const hourEngagement: Record<number, number> = {};
    for (const pin of historicalAnalytics) {
      const pinDate = new Date(pin.date);
      const hour = pinDate.getHours();
      const engagement = pin.impressions + pin.saves * 5 + pin.clicks * 3;
      hourEngagement[hour] = (hourEngagement[hour] || 0) + engagement;
    }

    // Find best performing hours from real data
    const bestHours = Object.entries(hourEngagement)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3);

    for (const [hour, engagement] of bestHours) {
      const h = parseInt(hour, 10);
      const existing = suggestions.find((s) => Math.abs(s.hour - h) <= 1);
      if (existing) {
        existing.score = Math.min(100, existing.score + 15);
        existing.source = "combined";
        existing.reason += ` + confirme par vos donnees (${engagement} engagements)`;
      } else {
        suggestions.push({
          hour: h,
          minute: 0,
          score: Math.min(95, 60 + Math.round(engagement / 100)),
          reason: `Base sur vos donnees reelles (${engagement} engagements)`,
          source: "analytics",
        });
      }
    }
  }

  return suggestions
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
}

/**
 * Génère une recommandation textuelle pour le dashboard.
 */
export function getPublishRecommendation(
  dayOfWeek: number,
  scheduledHour?: number,
): string {
  const suggestions = getTimeSuggestions(dayOfWeek);
  const best = suggestions[0];

  if (!best) return "Aucune recommandation disponible.";

  const dayNames = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
  const dayName = dayNames[dayOfWeek];

  let msg = `Creneau recommande pour ${dayName} : ${best.hour}h${best.minute.toString().padStart(2, "0")} (score ${best.score}/100). ${best.reason}.`;

  if (scheduledHour !== undefined && Math.abs(scheduledHour - best.hour) > 2) {
    msg += ` Votre post est programme a ${scheduledHour}h — decaler vers ${best.hour}h pourrait augmenter l'engagement de ~${Math.round((best.score - 60) * 0.5)}%.`;
  }

  return msg;
}

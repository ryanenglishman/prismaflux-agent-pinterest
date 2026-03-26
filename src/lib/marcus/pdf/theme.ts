export const PDF_THEME = {
  // Backgrounds
  pageBg: "#FFFFFF",
  sectionBg: "#FAFAFA",
  cardBg: "#F5F5F5",
  dark: "#111111",
  darkMuted: "#1A1A1A",

  // Text
  textPrimary: "#111111",
  textSecondary: "#555555",
  textMuted: "#999999",
  textOnDark: "#FFFFFF",

  // Brand
  brand: "#E31E24",
  brandDim: "#FEF0F0",
  brandDark: "#B91C1C",
  accent: "#E31E24",

  // Status
  green: "#16A34A",
  greenDim: "#F0FDF4",
  yellow: "#CA8A04",
  yellowDim: "#FEFCE8",
  red: "#DC2626",
  redDim: "#FEF2F2",

  // Borders
  border: "#E5E5E5",
  borderLight: "#F0F0F0",

  // Page dimensions (A4 in points)
  pageWidth: 595.28,
  pageHeight: 841.89,
  margin: 40,

  // Font
  fontFamily: "Inter",
} as const;

export function scoreColor(score: number) {
  if (score >= 70) return PDF_THEME.green;
  if (score >= 50) return PDF_THEME.yellow;
  return PDF_THEME.red;
}

export function scoreColorDim(score: number) {
  if (score >= 70) return PDF_THEME.greenDim;
  if (score >= 50) return PDF_THEME.yellowDim;
  return PDF_THEME.redDim;
}

export function statusColor(status: "ok" | "warn" | "error") {
  if (status === "ok") return PDF_THEME.green;
  if (status === "warn") return PDF_THEME.yellow;
  return PDF_THEME.red;
}

export function statusColorDim(status: "ok" | "warn" | "error") {
  if (status === "ok") return PDF_THEME.greenDim;
  if (status === "warn") return PDF_THEME.yellowDim;
  return PDF_THEME.redDim;
}

export function statusLabel(status: "ok" | "warn" | "error") {
  if (status === "ok") return "OK";
  if (status === "warn") return "A ameliorer";
  return "Critique";
}

export function impactLabel(impact: "high" | "medium" | "low") {
  if (impact === "high") return "Eleve";
  if (impact === "medium") return "Moyen";
  return "Faible";
}

export function difficultyLabel(difficulty: "easy" | "medium" | "hard") {
  if (difficulty === "easy") return "Facile";
  if (difficulty === "medium") return "Moyen";
  return "Complexe";
}

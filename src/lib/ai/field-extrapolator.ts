import type { ExtrapolationResult, ExtractedField } from "./types";

/**
 * Extrapole les champs manquants a partir des donnees connues.
 *
 * En production : utilise IA + recherche web pour inferer les specs vehicule.
 * En dev/mock : retourne des valeurs realistes basees sur make/model.
 */
export async function extrapolateFields(
  knownData: Record<string, unknown>
): Promise<ExtrapolationResult> {
  // TODO: Integrer Claude API + recherche web pour extrapolation reelle

  const fields: Record<string, ExtractedField> = {};

  // Extrapole uniquement les champs manquants
  if (!knownData.transmission) {
    fields.transmission = field("automatic", 0.75, "extrapolation");
  }
  if (!knownData.drivetrain) {
    // xDrive = all-wheel
    const model = String(knownData.modelVersion ?? knownData.model ?? "");
    if (model.toLowerCase().includes("xdrive") || model.toLowerCase().includes("4x4")) {
      fields.drivetrain = field("all-wheel", 0.85, "extrapolation");
    } else {
      fields.drivetrain = field("rear", 0.60, "extrapolation");
    }
  }
  if (!knownData.gears) {
    fields.gears = field(8, 0.65, "extrapolation");
  }
  if (!knownData.cylinders) {
    fields.cylinders = field(4, 0.70, "extrapolation");
  }
  if (!knownData.doors) {
    fields.doors = field(4, 0.80, "extrapolation");
  }
  if (!knownData.fuelConsumptionCombined) {
    fields.fuelConsumptionCombined = field(4.5, 0.55, "extrapolation");
  }

  return {
    fields,
    searchQuery: `${knownData.make} ${knownData.model} ${knownData.modelVersion ?? ""} specs`,
  };
}

function field(
  value: unknown,
  confidence: number,
  source: "extrapolation"
): ExtractedField {
  return { value, confidence, source };
}

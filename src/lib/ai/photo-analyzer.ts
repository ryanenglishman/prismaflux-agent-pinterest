import type { PhotoAnalysisResult, ExtractedField } from "./types";

/**
 * Analyse les photos du vehicule pour extraire couleurs, type carrosserie, etc.
 *
 * En production : appelle Claude Vision API avec les images.
 * En dev/mock : retourne des donnees realistes.
 */
export async function analyzePhotos(
  _photoBuffers: Buffer[],
  _mimeTypes: string[]
): Promise<PhotoAnalysisResult> {
  // TODO: Integrer Claude Vision API pour l'analyse photo reelle
  // Pour l'instant, retourne un stub realiste

  const photoCount = _photoBuffers.length || 1;

  return {
    bodyColor: field("Noir", 0.92, "photo"),
    paintType: field("metallic", 0.78, "photo"),
    interiorColor: field("Noir", 0.85, "photo"),
    bodyType: field("Berline", 0.88, "photo"),
    condition: field("Bon etat", 0.70, "photo"),
    photoCount,
  };
}

function field(value: unknown, confidence: number, source: "photo"): ExtractedField {
  return { value, confidence, source };
}

import type { DocumentExtractionResult, ExtractedField } from "./types";

/**
 * Extrait les donnees structurees d'un document technique vehicule.
 *
 * En production : appelle Claude Vision API pour OCR + extraction structuree.
 * En dev/mock : retourne des donnees realistes pour tester le pipeline.
 */
export async function extractFromDocument(
  _fileBuffer: Buffer,
  _mimeType: string
): Promise<DocumentExtractionResult> {
  // TODO: Integrer Claude Vision API pour l'OCR reel
  // Pour l'instant, retourne un stub realiste pour le dev

  return {
    documentType: "carte_grise",
    fields: {
      make: field("BMW", 0.95, "document"),
      model: field("320", 0.95, "document"),
      modelVersion: field("320d xDrive", 0.85, "document"),
      vin: field("WBAPH5C55BA123456", 0.99, "document"),
      firstRegistrationDate: field("2022-06-15", 0.98, "document"),
      fuelType: field("diesel", 0.97, "document"),
      power: field(140, 0.96, "document"),
      powerHp: field(190, 0.90, "document"),
      engineSize: field(1995, 0.93, "document"),
      emissionClass: field("Euro 6d", 0.88, "document"),
      co2Emission: field(119, 0.85, "document"),
      weight: field(1580, 0.80, "document"),
      seats: field(5, 0.92, "document"),
    },
    rawText: "[Stub] Contenu OCR du document",
  };
}

function field(value: unknown, confidence: number, source: "document"): ExtractedField {
  return { value, confidence, source };
}

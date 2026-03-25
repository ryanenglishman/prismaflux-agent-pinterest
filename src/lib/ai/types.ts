export interface ExtractedField {
  value: unknown;
  confidence: number;
  source: "document" | "photo" | "extrapolation" | "user";
}

export interface DocumentExtractionResult {
  fields: Record<string, ExtractedField>;
  rawText?: string;
  documentType?: "carte_grise" | "certificat_conformite" | "facture" | "unknown";
}

export interface PhotoAnalysisResult {
  bodyColor?: ExtractedField;
  paintType?: ExtractedField;
  interiorColor?: ExtractedField;
  bodyType?: ExtractedField;
  condition?: ExtractedField;
  photoCount: number;
}

export interface ExtrapolationResult {
  fields: Record<string, ExtractedField>;
  searchQuery?: string;
}

export interface AutofillResult {
  extractedFields: Record<string, unknown>;
  confidence: Record<string, number>;
  sources: Record<string, string>;
  gapAnalysis: {
    missingRequired: string[];
    missingOptional: string[];
    completenessScore: number;
  };
}

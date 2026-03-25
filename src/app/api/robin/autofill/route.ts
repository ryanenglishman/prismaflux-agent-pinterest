import { NextRequest, NextResponse } from "next/server";
import { extractFromDocument } from "@/lib/ai/document-extractor";
import { analyzePhotos } from "@/lib/ai/photo-analyzer";
import { extrapolateFields } from "@/lib/ai/field-extrapolator";
import type { AutofillResult } from "@/lib/ai/types";

const AS24_REQUIRED = [
  "make", "model", "bodyType", "bodyColor", "vehicleType", "offerType",
  "fuelType", "transmission", "power", "firstRegistrationDate", "mileage", "price",
];

const AS24_OPTIONAL = [
  "vin", "modelVersion", "drivetrain", "engineSize", "gears", "cylinders",
  "co2Emission", "fuelConsumptionCombined", "emissionClass", "seats", "doors",
  "paintType", "interiorColor", "interiorType", "previousOwners", "description",
];

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // 1. Collect existing user data if provided
    const existingDataRaw = formData.get("existingData");
    const existingData: Record<string, unknown> = existingDataRaw
      ? JSON.parse(existingDataRaw as string)
      : {};

    // 2. Extract from documents
    const documents = formData.getAll("documents");
    const docFields: Record<string, unknown> = {};
    const docConfidence: Record<string, number> = {};
    const docSources: Record<string, string> = {};

    for (const doc of documents) {
      if (doc instanceof File) {
        const buffer = Buffer.from(await doc.arrayBuffer());
        const result = await extractFromDocument(buffer, doc.type);

        for (const [key, extracted] of Object.entries(result.fields)) {
          docFields[key] = extracted.value;
          docConfidence[key] = extracted.confidence;
          docSources[key] = extracted.source;
        }
      }
    }

    // 3. Analyze photos
    const photos = formData.getAll("photos");
    const photoBuffers: Buffer[] = [];
    const photoTypes: string[] = [];

    for (const photo of photos) {
      if (photo instanceof File) {
        photoBuffers.push(Buffer.from(await photo.arrayBuffer()));
        photoTypes.push(photo.type);
      }
    }

    const photoAnalysis =
      photoBuffers.length > 0
        ? await analyzePhotos(photoBuffers, photoTypes)
        : null;

    const photoFields: Record<string, unknown> = {};
    const photoConfidence: Record<string, number> = {};
    const photoSources: Record<string, string> = {};

    if (photoAnalysis) {
      if (photoAnalysis.bodyColor) {
        photoFields.bodyColor = photoAnalysis.bodyColor.value;
        photoConfidence.bodyColor = photoAnalysis.bodyColor.confidence;
        photoSources.bodyColor = "photo";
      }
      if (photoAnalysis.paintType) {
        photoFields.paintType = photoAnalysis.paintType.value;
        photoConfidence.paintType = photoAnalysis.paintType.confidence;
        photoSources.paintType = "photo";
      }
      if (photoAnalysis.interiorColor) {
        photoFields.interiorColor = photoAnalysis.interiorColor.value;
        photoConfidence.interiorColor = photoAnalysis.interiorColor.confidence;
        photoSources.interiorColor = "photo";
      }
      if (photoAnalysis.bodyType) {
        photoFields.bodyType = photoAnalysis.bodyType.value;
        photoConfidence.bodyType = photoAnalysis.bodyType.confidence;
        photoSources.bodyType = "photo";
      }
    }

    // 4. Merge: user > document > photo (priority order)
    const merged: Record<string, unknown> = {};
    const confidence: Record<string, number> = {};
    const sources: Record<string, string> = {};

    // Start with photo (lowest priority)
    for (const key of Object.keys(photoFields)) {
      merged[key] = photoFields[key];
      confidence[key] = photoConfidence[key];
      sources[key] = photoSources[key];
    }

    // Override with document data
    for (const key of Object.keys(docFields)) {
      merged[key] = docFields[key];
      confidence[key] = docConfidence[key];
      sources[key] = docSources[key];
    }

    // Override with user data (highest priority)
    for (const [key, value] of Object.entries(existingData)) {
      if (value !== undefined && value !== null && value !== "") {
        merged[key] = value;
        confidence[key] = 1.0;
        sources[key] = "user";
      }
    }

    // 5. Extrapolate missing fields
    const extrapolation = await extrapolateFields(merged);
    for (const [key, extracted] of Object.entries(extrapolation.fields)) {
      if (!(key in merged)) {
        merged[key] = extracted.value;
        confidence[key] = extracted.confidence;
        sources[key] = extracted.source;
      }
    }

    // 6. Gap analysis
    const allFields = [...AS24_REQUIRED, ...AS24_OPTIONAL];
    const missingRequired = AS24_REQUIRED.filter((f) => !(f in merged));
    const missingOptional = AS24_OPTIONAL.filter((f) => !(f in merged));
    const filled = allFields.filter((f) => f in merged).length;
    const completenessScore = Math.round((filled / allFields.length) * 100);

    const result: AutofillResult = {
      extractedFields: merged,
      confidence,
      sources,
      gapAnalysis: {
        missingRequired,
        missingOptional,
        completenessScore,
      },
    };

    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur interne";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

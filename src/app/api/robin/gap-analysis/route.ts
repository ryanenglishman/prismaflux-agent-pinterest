import { NextRequest, NextResponse } from "next/server";
import type { VehicleData } from "@/lib/platforms/types";

// All fields required by AutoScout24
const AS24_REQUIRED_FIELDS = [
  "make",
  "model",
  "bodyType",
  "bodyColor",
  "vehicleType",
  "offerType",
  "fuelType",
  "transmission",
  "power",
  "firstRegistrationDate",
  "mileage",
  "price",
] as const;

// Optional but recommended fields
const AS24_OPTIONAL_FIELDS = [
  "vin",
  "modelVersion",
  "drivetrain",
  "engineSize",
  "gears",
  "cylinders",
  "co2Emission",
  "fuelConsumptionCombined",
  "fuelConsumptionUrban",
  "fuelConsumptionExtraUrban",
  "emissionClass",
  "emissionSticker",
  "bodyColorOriginal",
  "paintType",
  "interiorColor",
  "interiorType",
  "upholstery",
  "seats",
  "doors",
  "weight",
  "previousOwners",
  "description",
  "countryOfSale",
  "locationPostalCode",
  "netPrice",
  "vatRate",
  "dealerPrice",
] as const;

function isFieldPresent(value: unknown): boolean {
  if (value === undefined || value === null || value === "") return false;
  if (Array.isArray(value) && value.length === 0) return false;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { vehicleData } = body as { vehicleData: Partial<VehicleData> };

    if (!vehicleData) {
      return NextResponse.json(
        { error: "vehicleData est requis" },
        { status: 400 }
      );
    }

    const data = vehicleData as Record<string, unknown>;

    const missingRequired: string[] = [];
    const filledRequired: string[] = [];
    for (const field of AS24_REQUIRED_FIELDS) {
      if (isFieldPresent(data[field])) {
        filledRequired.push(field);
      } else {
        missingRequired.push(field);
      }
    }

    const missingOptional: string[] = [];
    const filledOptional: string[] = [];
    for (const field of AS24_OPTIONAL_FIELDS) {
      if (isFieldPresent(data[field])) {
        filledOptional.push(field);
      } else {
        missingOptional.push(field);
      }
    }

    // Equipment and photos are special
    const hasEquipment =
      Array.isArray(vehicleData.equipment) && vehicleData.equipment.length > 0;
    const hasPhotos =
      Array.isArray(vehicleData.photos) && vehicleData.photos.length > 0;

    const totalFields = AS24_REQUIRED_FIELDS.length + AS24_OPTIONAL_FIELDS.length + 2;
    const filledFields =
      filledRequired.length +
      filledOptional.length +
      (hasEquipment ? 1 : 0) +
      (hasPhotos ? 1 : 0);

    const completenessScore = Math.round((filledFields / totalFields) * 100);

    const canPublish = missingRequired.length === 0;

    return NextResponse.json({
      canPublish,
      completenessScore,
      summary: {
        totalRequired: AS24_REQUIRED_FIELDS.length,
        filledRequired: filledRequired.length,
        totalOptional: AS24_OPTIONAL_FIELDS.length,
        filledOptional: filledOptional.length,
        hasEquipment,
        hasPhotos,
      },
      missingRequired,
      missingOptional,
      filledRequired,
      filledOptional,
      recommendations: [
        ...(!hasPhotos
          ? ["Ajoutez des photos — les fiches avec photos ont beaucoup plus de visibilite"]
          : []),
        ...(!hasEquipment
          ? ["Renseignez les equipements pour ameliorer le referencement"]
          : []),
        ...(!isFieldPresent(data.description)
          ? ["Ajoutez une description pour attirer plus d'acheteurs"]
          : []),
        ...(!isFieldPresent(data.vin)
          ? ["Le VIN permet l'auto-completion par AutoScout24"]
          : []),
      ],
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur interne";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

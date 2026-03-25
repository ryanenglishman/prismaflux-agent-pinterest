import type { VehicleData } from "@/lib/platforms/types";
import type { AS24ListingPayload } from "@/lib/platforms/autoscout24/types";
import {
  AS24_MAKES,
  AS24_BODY_COLORS,
  AS24_BODY_TYPES,
  AS24_INTERIOR_COLORS,
  AS24_EQUIPMENTS,
  AS24_FUEL_CATEGORIES,
  AS24_TRANSMISSIONS,
  AS24_DRIVETRAINS,
  AS24_OFFER_TYPES,
  findReferenceByName,
  findMakeByName,
} from "@/lib/platforms/autoscout24/references";

// ── Result types ──

export interface MappingError {
  field: string;
  message: string;
  value?: unknown;
}

export interface MappingWarning {
  field: string;
  message: string;
}

export interface MapperResult {
  payload: AS24ListingPayload | null;
  errors: MappingError[];
  warnings: MappingWarning[];
}

// ── Internal helpers ──

function resolveNumericId(
  collection: { id: number; name: string; aliases?: string[] }[],
  value: string,
  field: string,
  severity: "error" | "warning",
  errors: MappingError[],
  warnings: MappingWarning[],
): number {
  const id = findReferenceByName(collection, value);
  if (id !== null) {
    return id;
  }

  const msg = `Cannot resolve "${value}" to an AS24 ${field} ID`;
  if (severity === "error") {
    errors.push({ field, message: msg, value });
  } else {
    warnings.push({ field, message: msg });
  }
  return 0;
}

function resolveLetterCode(
  mapping: Record<string, string>,
  value: string,
  field: string,
  severity: "error" | "warning",
  errors: MappingError[],
  warnings: MappingWarning[],
): string {
  const normalized = value.toLowerCase();
  for (const [key, code] of Object.entries(mapping)) {
    if (key.toLowerCase() === normalized) {
      return code;
    }
  }

  const msg = `Cannot resolve "${value}" to an AS24 ${field} code`;
  if (severity === "error") {
    errors.push({ field, message: msg, value });
  } else {
    warnings.push({ field, message: msg });
  }
  return "";
}

// ── Main mapper ──

export function mapVehicleToAS24(
  vehicle: VehicleData,
  culture: string = "fr-BE",
): MapperResult {
  const errors: MappingError[] = [];
  const warnings: MappingWarning[] = [];

  // ── Reference resolutions (numeric IDs) ──

  const makeId = resolveNumericId(
    AS24_MAKES, vehicle.make, "make", "error", errors, warnings,
  );

  let modelId = 0;
  if (makeId !== 0) {
    const makeEntry = findMakeByName(vehicle.make);
    if (makeEntry) {
      const modelIdResolved = findReferenceByName(makeEntry.models, vehicle.model);
      if (modelIdResolved !== null) {
        modelId = modelIdResolved;
      } else {
        errors.push({
          field: "model",
          message: `Cannot resolve model "${vehicle.model}" for make "${vehicle.make}"`,
          value: vehicle.model,
        });
      }
    }
  } else {
    errors.push({
      field: "model",
      message: `Cannot resolve model because make "${vehicle.make}" was not found`,
      value: vehicle.model,
    });
  }

  const bodyColorId = resolveNumericId(
    AS24_BODY_COLORS, vehicle.bodyColor, "bodyColor", "error", errors, warnings,
  );

  const bodyTypeId = resolveNumericId(
    AS24_BODY_TYPES, vehicle.bodyType, "bodyType", "error", errors, warnings,
  );

  // ── Optional numeric ID (warning only) ──

  let interiorColorId: number | undefined;
  if (vehicle.interiorColor) {
    const resolved = resolveNumericId(
      AS24_INTERIOR_COLORS, vehicle.interiorColor, "interiorColor", "warning", errors, warnings,
    );
    interiorColorId = resolved !== 0 ? resolved : undefined;
  }

  // ── Equipment (warning for unresolved items) ──

  const equipmentIds: number[] = [];
  for (const item of vehicle.equipment) {
    const eqId = findReferenceByName(AS24_EQUIPMENTS, item);
    if (eqId !== null) {
      equipmentIds.push(eqId);
    } else {
      warnings.push({
        field: "equipment",
        message: `Equipment item "${item}" not found in AS24 references`,
      });
    }
  }

  // ── Letter code resolutions ──

  const fuelCategory = resolveLetterCode(
    AS24_FUEL_CATEGORIES, vehicle.fuelType, "fuelCategory", "error", errors, warnings,
  );

  const transmissionCode = resolveLetterCode(
    AS24_TRANSMISSIONS, vehicle.transmission, "transmission", "error", errors, warnings,
  );

  let drivetrainCode: string | undefined;
  if (vehicle.drivetrain) {
    const resolved = resolveLetterCode(
      AS24_DRIVETRAINS, vehicle.drivetrain, "drivetrain", "warning", errors, warnings,
    );
    drivetrainCode = resolved || undefined;
  }

  const offerTypeCode = resolveLetterCode(
    AS24_OFFER_TYPES, vehicle.offerType, "offerType", "error", errors, warnings,
  );

  // ── Prices ──

  const prices: AS24ListingPayload["prices"] = {
    public: {
      price: vehicle.price,
      currency: vehicle.currency,
      vatRate: vehicle.vatRate,
      netPrice: vehicle.netPrice,
      isNegotiable: vehicle.isNegotiable,
      isTaxDeductible: vehicle.isTaxDeductible,
    },
  };

  if (vehicle.dealerPrice != null) {
    prices.dealer = {
      price: vehicle.dealerPrice,
      currency: vehicle.currency,
    };
  }

  // ── Publication ──

  const publicationStatus: "Active" | "Inactive" =
    vehicle.publicationStatus === "inactive" ? "Inactive" : "Active";

  // ── Images ──

  const images: { id: string }[] = [];
  for (const photo of vehicle.photos) {
    const as24ImageId = photo.platformImageIds?.autoscout24;
    if (as24ImageId) {
      images.push({ id: as24ImageId });
    }
  }

  // ── Marketplace from culture ──

  const marketplace = cultureToMarketplace(culture);

  // ── Assemble payload ──

  const payload: AS24ListingPayload = {
    vehicleType: "C",
    offerType: offerTypeCode || "U",
    make: makeId,
    model: modelId,
    modelVersion: vehicle.modelVersion,
    bodyType: bodyTypeId,
    bodyColor: bodyColorId,
    bodyColorOriginal: vehicle.bodyColorOriginal,
    paintType: vehicle.paintType,
    interiorColor: interiorColorId,
    interiorType: vehicle.interiorType,
    upholstery: vehicle.upholstery,

    fuelCategory: fuelCategory || "B",
    transmission: transmissionCode || "M",
    drivetrain: drivetrainCode,
    power: vehicle.power ?? 0,
    engineSize: vehicle.engineSize,
    gears: vehicle.gears,
    cylinders: vehicle.cylinders,

    firstRegistrationDate: vehicle.firstRegistrationDate ?? "",
    mileage: vehicle.mileage ?? 0,
    previousOwners: vehicle.previousOwners,

    co2Emission: vehicle.co2Emission,
    fuelConsumptionCombined: vehicle.fuelConsumptionCombined,
    fuelConsumptionUrban: vehicle.fuelConsumptionUrban,
    fuelConsumptionExtraUrban: vehicle.fuelConsumptionExtraUrban,
    emissionClass: vehicle.emissionClass,
    emissionSticker: vehicle.emissionSticker,

    seats: vehicle.seats,
    doors: vehicle.doors,

    vin: vehicle.vin,

    equipment: equipmentIds.length > 0 ? equipmentIds : undefined,

    description: vehicle.description,

    prices,

    images: images.length > 0 ? images : undefined,

    publication: {
      status: publicationStatus,
      channels: [{ id: "AS24" }],
    },

    culture,
    marketplace,

    countryOfSale: vehicle.countryOfSale,
  };

  return {
    payload,
    errors,
    warnings,
  };
}

// ── Culture → marketplace mapping ──

function cultureToMarketplace(culture: string): string {
  const map: Record<string, string> = {
    "de-DE": "de",
    "de-AT": "at",
    "nl-BE": "be",
    "fr-BE": "be",
    "fr-FR": "fr",
    "it-IT": "it",
    "es-ES": "es",
    "fr-LU": "lu",
    "en-GB": "gb",
    "nl-NL": "nl",
    "fr-CA": "ca",
    "en-CA": "ca",
  };
  return map[culture] ?? "be";
}

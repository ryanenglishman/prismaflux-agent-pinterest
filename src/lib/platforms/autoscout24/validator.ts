import type { AS24ListingPayload } from "./types";
import type { ValidationResult, ValidationError, ValidationWarning } from "../types";
import {
  AS24_MAKES,
  AS24_BODY_COLORS,
  AS24_BODY_TYPES,
  AS24_INTERIOR_COLORS,
  AS24_EQUIPMENTS,
} from "./references";

const VALID_FUEL_CATEGORIES = ["B", "D", "E", "L", "C", "H", "2"];
const VALID_TRANSMISSIONS = ["M", "A", "S"];
const VALID_DRIVETRAINS = ["F", "R", "A"];
const VALID_OFFER_TYPES = ["U", "N", "D"];
const VALID_VEHICLE_TYPES = ["C"];
const VALID_CULTURES = [
  "de-DE", "de-AT", "nl-BE", "fr-BE", "fr-FR",
  "it-IT", "es-ES", "fr-LU", "en-GB", "nl-NL",
  "fr-CA", "en-CA",
];
const VALID_MARKETPLACES = ["at", "be", "ca", "de", "es", "fr", "it", "lu", "nl"];

function hasReferenceId(
  refs: { id: number }[],
  id: number
): boolean {
  return refs.some((r) => r.id === id);
}

export function validateAS24Payload(payload: AS24ListingPayload): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationWarning[] = [];
  const allOptionalFields: string[] = [];
  let filledOptional = 0;
  let totalOptional = 0;

  // ── Required fields ──

  function requireField(field: string, value: unknown) {
    if (value === undefined || value === null || value === "") {
      errors.push({
        field,
        code: "REQUIRED",
        message: `Ce champ est requis par AutoScout24`,
      });
    }
  }

  function requireEnum(field: string, value: unknown, allowed: string[]) {
    if (value === undefined || value === null || value === "") {
      errors.push({ field, code: "REQUIRED", message: "Ce champ est requis par AutoScout24" });
    } else if (!allowed.includes(value as string)) {
      errors.push({
        field,
        code: "INVALID_ENUM",
        message: `Valeur "${value}" non reconnue. Valeurs acceptees : ${allowed.join(", ")}`,
        value,
      });
    }
  }

  function requirePositiveInt(field: string, value: unknown) {
    if (value === undefined || value === null) {
      errors.push({ field, code: "REQUIRED", message: "Ce champ est requis par AutoScout24" });
    } else if (typeof value !== "number" || !Number.isInteger(value) || value <= 0) {
      errors.push({
        field,
        code: "OUT_OF_RANGE",
        message: `Doit etre un entier positif`,
        value,
      });
    }
  }

  function requireNonNegativeInt(field: string, value: unknown) {
    if (value === undefined || value === null) {
      errors.push({ field, code: "REQUIRED", message: "Ce champ est requis par AutoScout24" });
    } else if (typeof value !== "number" || !Number.isInteger(value) || value < 0) {
      errors.push({
        field,
        code: "OUT_OF_RANGE",
        message: `Doit etre un entier positif ou zero`,
        value,
      });
    }
  }

  function requireReferenceId(
    field: string,
    value: unknown,
    refs: { id: number }[],
    refName: string
  ) {
    if (value === undefined || value === null) {
      errors.push({ field, code: "REQUIRED", message: "Ce champ est requis par AutoScout24" });
    } else if (typeof value !== "number" || !hasReferenceId(refs, value)) {
      errors.push({
        field,
        code: "INVALID_REFERENCE",
        message: `ID ${value} non reconnu dans les references ${refName}`,
        value,
      });
    }
  }

  function optionalField(field: string, value: unknown) {
    totalOptional++;
    if (value !== undefined && value !== null && value !== "") {
      filledOptional++;
    } else {
      allOptionalFields.push(field);
    }
  }

  function optionalPositiveInt(field: string, value: unknown) {
    totalOptional++;
    if (value !== undefined && value !== null) {
      filledOptional++;
      if (typeof value !== "number" || value < 0) {
        warnings.push({ field, message: `Valeur inattendue : ${value}` });
      }
    } else {
      allOptionalFields.push(field);
    }
  }

  function optionalReferenceId(
    field: string,
    value: unknown,
    refs: { id: number }[],
    refName: string
  ) {
    totalOptional++;
    if (value !== undefined && value !== null) {
      filledOptional++;
      if (typeof value !== "number" || !hasReferenceId(refs, value)) {
        warnings.push({
          field,
          message: `ID ${value} non reconnu dans les references ${refName}`,
        });
      }
    } else {
      allOptionalFields.push(field);
    }
  }

  // ── Vehicle identity ──
  requireEnum("vehicleType", payload.vehicleType, VALID_VEHICLE_TYPES);
  requireEnum("offerType", payload.offerType, VALID_OFFER_TYPES);
  requireReferenceId("make", payload.make, AS24_MAKES, "marques");
  // Model validation: check it exists under the resolved make
  if (payload.make && payload.model) {
    const makeEntry = AS24_MAKES.find((m) => m.id === payload.make);
    if (makeEntry) {
      const modelExists = makeEntry.models.some((m) => m.id === payload.model);
      if (!modelExists) {
        errors.push({
          field: "model",
          code: "INVALID_REFERENCE",
          message: `Modele ID ${payload.model} non reconnu pour la marque ${makeEntry.name}`,
          value: payload.model,
        });
      }
    }
  } else if (!payload.model) {
    errors.push({ field: "model", code: "REQUIRED", message: "Ce champ est requis par AutoScout24" });
  }
  requireReferenceId("bodyType", payload.bodyType, AS24_BODY_TYPES, "types de carrosserie");
  requireReferenceId("bodyColor", payload.bodyColor, AS24_BODY_COLORS, "couleurs");

  // ── Engine ──
  requireEnum("fuelCategory", payload.fuelCategory, VALID_FUEL_CATEGORIES);
  requireEnum("transmission", payload.transmission, VALID_TRANSMISSIONS);
  requirePositiveInt("power", payload.power);

  // ── Registration ──
  requireField("firstRegistrationDate", payload.firstRegistrationDate);
  if (payload.firstRegistrationDate) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(payload.firstRegistrationDate)) {
      errors.push({
        field: "firstRegistrationDate",
        code: "INVALID_FORMAT",
        message: "Format attendu : yyyy-MM-dd",
        value: payload.firstRegistrationDate,
      });
    } else {
      const d = new Date(payload.firstRegistrationDate);
      if (isNaN(d.getTime())) {
        errors.push({
          field: "firstRegistrationDate",
          code: "INVALID_FORMAT",
          message: "Date invalide",
          value: payload.firstRegistrationDate,
        });
      } else if (d > new Date()) {
        errors.push({
          field: "firstRegistrationDate",
          code: "OUT_OF_RANGE",
          message: "La date de premiere immatriculation ne peut pas etre dans le futur",
          value: payload.firstRegistrationDate,
        });
      }
    }
  }
  requireNonNegativeInt("mileage", payload.mileage);

  // ── Prices ──
  if (!payload.prices?.public?.price) {
    errors.push({ field: "prices.public.price", code: "REQUIRED", message: "Le prix public est requis" });
  } else if (payload.prices.public.price <= 0) {
    errors.push({
      field: "prices.public.price",
      code: "OUT_OF_RANGE",
      message: "Le prix doit etre superieur a zero",
      value: payload.prices.public.price,
    });
  }
  if (!payload.prices?.public?.currency) {
    errors.push({ field: "prices.public.currency", code: "REQUIRED", message: "La devise est requise" });
  }

  // ── Publication ──
  if (!payload.publication?.status) {
    errors.push({ field: "publication.status", code: "REQUIRED", message: "Le statut de publication est requis" });
  } else if (!["Active", "Inactive"].includes(payload.publication.status)) {
    errors.push({
      field: "publication.status",
      code: "INVALID_ENUM",
      message: "Doit etre Active ou Inactive",
      value: payload.publication.status,
    });
  }
  if (!payload.publication?.channels?.length) {
    errors.push({ field: "publication.channels", code: "REQUIRED", message: "Au moins un canal de publication est requis" });
  }

  // ── Culture & Marketplace ──
  requireEnum("culture", payload.culture, VALID_CULTURES);
  requireEnum("marketplace", payload.marketplace, VALID_MARKETPLACES);

  // ── Optional fields ──
  optionalField("modelVersion", payload.modelVersion);
  optionalField("bodyColorOriginal", payload.bodyColorOriginal);
  optionalField("paintType", payload.paintType);
  optionalReferenceId("interiorColor", payload.interiorColor, AS24_INTERIOR_COLORS, "couleurs interieur");
  optionalField("interiorType", payload.interiorType);
  optionalField("upholstery", payload.upholstery);
  optionalField("primaryFuelType", payload.primaryFuelType);
  if (payload.drivetrain !== undefined) {
    if (!VALID_DRIVETRAINS.includes(payload.drivetrain)) {
      warnings.push({ field: "drivetrain", message: `Valeur "${payload.drivetrain}" non reconnue` });
    }
    filledOptional++;
    totalOptional++;
  } else {
    totalOptional++;
    allOptionalFields.push("drivetrain");
  }
  optionalPositiveInt("engineSize", payload.engineSize);
  optionalPositiveInt("gears", payload.gears);
  optionalPositiveInt("cylinders", payload.cylinders);
  optionalPositiveInt("previousOwners", payload.previousOwners);
  optionalPositiveInt("co2Emission", payload.co2Emission);
  optionalField("fuelConsumptionCombined", payload.fuelConsumptionCombined);
  optionalField("fuelConsumptionUrban", payload.fuelConsumptionUrban);
  optionalField("fuelConsumptionExtraUrban", payload.fuelConsumptionExtraUrban);
  optionalField("emissionClass", payload.emissionClass);
  optionalField("emissionSticker", payload.emissionSticker);
  if (payload.seats !== undefined) {
    if (payload.seats < 1 || payload.seats > 9) {
      warnings.push({ field: "seats", message: "Nombre de sieges inhabituellement hors norme (1-9 attendu)" });
    }
    filledOptional++;
    totalOptional++;
  } else {
    totalOptional++;
    allOptionalFields.push("seats");
  }
  if (payload.doors !== undefined) {
    if (payload.doors < 1 || payload.doors > 6) {
      warnings.push({ field: "doors", message: "Nombre de portes inhabituellement hors norme (1-6 attendu)" });
    }
    filledOptional++;
    totalOptional++;
  } else {
    totalOptional++;
    allOptionalFields.push("doors");
  }
  optionalField("vin", payload.vin);
  optionalField("description", payload.description);
  optionalField("countryOfSale", payload.countryOfSale);

  // ── Equipment ──
  if (payload.equipment?.length) {
    for (const eqId of payload.equipment) {
      if (!hasReferenceId(AS24_EQUIPMENTS, eqId)) {
        warnings.push({
          field: "equipment",
          message: `Equipement ID ${eqId} non reconnu dans les references`,
        });
      }
    }
  } else {
    warnings.push({
      field: "equipment",
      message: "Aucun equipement renseigne — la fiche aura moins de visibilite",
    });
  }

  // ── Images ──
  if (!payload.images?.length) {
    warnings.push({
      field: "images",
      message: "Aucune photo associee — les fiches avec photos ont bien plus de visibilite",
    });
  }

  const completenessScore =
    totalOptional > 0
      ? Math.round((filledOptional / totalOptional) * 100)
      : 100;

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    completenessScore,
    missingOptional: allOptionalFields,
  };
}

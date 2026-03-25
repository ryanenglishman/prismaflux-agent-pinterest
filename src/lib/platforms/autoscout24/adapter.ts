import type {
  PlatformAdapter,
  VehicleData,
  PlatformCredentials,
  PlatformResult,
  ListingRef,
  ValidationResult,
  PlatformReferences,
  HealthCheckResult,
} from "../types";
import type { AS24ClientInterface } from "./types";
import { mapVehicleToAS24 } from "./mapper";
import { validateAS24Payload } from "./validator";
import {
  AS24_MAKES,
  AS24_BODY_COLORS,
  AS24_BODY_TYPES,
  AS24_INTERIOR_COLORS,
  AS24_EQUIPMENTS,
} from "./references";

export class AutoScout24Adapter implements PlatformAdapter {
  readonly platformId = "autoscout24";
  readonly displayName = "AutoScout24";

  constructor(private client: AS24ClientInterface) {}

  async createListing(
    vehicle: VehicleData,
    credentials: PlatformCredentials
  ): Promise<PlatformResult<ListingRef>> {
    // 1. Map
    const mapped = mapVehicleToAS24(vehicle);
    if (!mapped.payload) {
      return {
        success: false,
        error: {
          code: "MAPPING_FAILED",
          message: "Robin n'a pas pu convertir les donnees du vehicule",
          details: Object.fromEntries(
            mapped.errors.map((e) => [e.field, e.message])
          ),
        },
      };
    }

    // 2. Validate
    const validation = validateAS24Payload(mapped.payload);
    if (!validation.valid) {
      return {
        success: false,
        error: {
          code: "VALIDATION_FAILED",
          message: "Certains champs ne respectent pas les exigences d'AutoScout24",
          details: Object.fromEntries(
            validation.errors.map((e) => [e.field, e.message])
          ),
        },
      };
    }

    // 3. Build headers
    const headers: Record<string, string> = {};
    if (credentials.testMode) {
      headers["X-Testmode"] = "true";
    }

    // 4. Submit
    const result = await this.client.createListing(
      credentials.customerId,
      mapped.payload,
      { username: credentials.username, password: credentials.password },
      headers
    );

    if (result.rateLimited) {
      return { success: false, rateLimited: true, retryAfterMs: 2000 };
    }

    if (!result.success || !result.data) {
      return {
        success: false,
        error: {
          code: `AS24_${result.status}`,
          message: result.errors?.[0]?.message ?? "AutoScout24 a refuse la requete",
          details: result.errors
            ? Object.fromEntries(result.errors.map((e) => [e.field, e.message]))
            : undefined,
        },
      };
    }

    return {
      success: true,
      data: {
        platformId: this.platformId,
        platformListingId: result.data.id,
        customerId: credentials.customerId,
      },
    };
  }

  async updateListing(
    listingRef: ListingRef,
    vehicle: VehicleData,
    credentials: PlatformCredentials
  ): Promise<PlatformResult<ListingRef>> {
    const mapped = mapVehicleToAS24(vehicle);
    if (!mapped.payload) {
      return {
        success: false,
        error: {
          code: "MAPPING_FAILED",
          message: "Robin n'a pas pu convertir les donnees du vehicule",
        },
      };
    }

    const validation = validateAS24Payload(mapped.payload);
    if (!validation.valid) {
      return {
        success: false,
        error: {
          code: "VALIDATION_FAILED",
          message: "Certains champs ne respectent pas les exigences d'AutoScout24",
          details: Object.fromEntries(
            validation.errors.map((e) => [e.field, e.message])
          ),
        },
      };
    }

    const headers: Record<string, string> = {};
    if (credentials.testMode) headers["X-Testmode"] = "true";

    const result = await this.client.updateListing(
      credentials.customerId,
      listingRef.platformListingId,
      mapped.payload,
      { username: credentials.username, password: credentials.password },
      headers
    );

    if (result.rateLimited) {
      return { success: false, rateLimited: true, retryAfterMs: 2000 };
    }

    if (!result.success) {
      return {
        success: false,
        error: {
          code: `AS24_${result.status}`,
          message: result.errors?.[0]?.message ?? "Mise a jour refusee",
        },
      };
    }

    return { success: true, data: listingRef };
  }

  async deleteListing(
    listingRef: ListingRef,
    credentials: PlatformCredentials
  ): Promise<PlatformResult<void>> {
    const headers: Record<string, string> = {};
    if (credentials.testMode) headers["X-Testmode"] = "true";

    const result = await this.client.deleteListing(
      credentials.customerId,
      listingRef.platformListingId,
      { username: credentials.username, password: credentials.password },
      headers
    );

    if (!result.success) {
      return {
        success: false,
        error: {
          code: `AS24_${result.status}`,
          message: result.errors?.[0]?.message ?? "Suppression refusee",
        },
      };
    }

    return { success: true };
  }

  async getListing(
    listingRef: ListingRef,
    credentials: PlatformCredentials
  ): Promise<PlatformResult<unknown>> {
    const headers: Record<string, string> = {};
    if (credentials.testMode) headers["X-Testmode"] = "true";

    const result = await this.client.getListing(
      credentials.customerId,
      listingRef.platformListingId,
      { username: credentials.username, password: credentials.password },
      headers
    );

    if (!result.success) {
      return {
        success: false,
        error: {
          code: `AS24_${result.status}`,
          message: result.errors?.[0]?.message ?? "Annonce non trouvee",
        },
      };
    }

    return { success: true, data: result.data };
  }

  async uploadImage(
    image: Buffer,
    contentType: string,
    credentials: PlatformCredentials
  ): Promise<PlatformResult<string>> {
    const result = await this.client.uploadImage(
      credentials.customerId,
      image,
      contentType,
      { username: credentials.username, password: credentials.password }
    );

    if (!result.success || !result.data) {
      return {
        success: false,
        error: {
          code: `AS24_${result.status}`,
          message: "Upload de l'image refuse par AutoScout24",
        },
      };
    }

    return { success: true, data: result.data.id };
  }

  validatePayload(vehicle: VehicleData): ValidationResult {
    const mapped = mapVehicleToAS24(vehicle);
    if (!mapped.payload) {
      return {
        valid: false,
        errors: mapped.errors.map((e) => ({
          field: e.field,
          code: "INVALID_REFERENCE" as const,
          message: e.message,
          value: e.value,
        })),
        warnings: [],
        completenessScore: 0,
        missingOptional: [],
      };
    }
    return validateAS24Payload(mapped.payload);
  }

  getReferences(): PlatformReferences {
    return {
      makes: AS24_MAKES,
      bodyColors: AS24_BODY_COLORS,
      bodyTypes: AS24_BODY_TYPES,
      fuelTypes: [],
      equipments: AS24_EQUIPMENTS,
      transmissions: [
        { id: 1, name: "Manuelle", code: "M" },
        { id: 2, name: "Automatique", code: "A" },
        { id: 3, name: "Semi-automatique", code: "S" },
      ],
      drivetrains: [
        { id: 1, name: "Traction avant", code: "F" },
        { id: 2, name: "Propulsion", code: "R" },
        { id: 3, name: "Integrale", code: "A" },
      ],
    };
  }

  async checkHealth(
    credentials: PlatformCredentials
  ): Promise<HealthCheckResult> {
    const start = Date.now();
    try {
      // Simple health check: try to list listings
      const result = await this.client.getListing(
        credentials.customerId,
        "health-check-probe",
        { username: credentials.username, password: credentials.password }
      );
      const responseTimeMs = Date.now() - start;

      // 404 is expected (listing doesn't exist), means the API is reachable
      if (result.status === 404 || result.success) {
        return { status: "ok", responseTimeMs };
      }
      if (result.status === 401) {
        return {
          status: "down",
          responseTimeMs,
          message: "Identifiants AutoScout24 invalides",
        };
      }
      return {
        status: "degraded",
        responseTimeMs,
        message: `Reponse inattendue (${result.status})`,
      };
    } catch {
      return {
        status: "down",
        responseTimeMs: Date.now() - start,
        message: "AutoScout24 injoignable",
      };
    }
  }
}

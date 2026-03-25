import type {
  AS24ClientInterface,
  AS24ClientResult,
  AS24ListingPayload,
  AS24ListingResponse,
  AS24ImageResponse,
  AS24Auth,
  AS24FieldError,
} from "./types";
import { validateAS24Payload } from "./validator";

function generateId(): string {
  return `mock-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export class MockAS24Client implements AS24ClientInterface {
  private listings = new Map<string, { customerId: string; payload: AS24ListingPayload; createdAt: string; updatedAt: string }>();
  private testListings = new Map<string, { customerId: string; payload: AS24ListingPayload; createdAt: string; updatedAt: string }>();
  private rateLimitCounter = 0;
  private rateLimitThreshold: number;

  constructor(options?: { rateLimitEveryN?: number }) {
    this.rateLimitThreshold = options?.rateLimitEveryN ?? 0; // 0 = disabled
  }

  private getStore(headers?: Record<string, string>) {
    return headers?.["X-Testmode"] === "true" ? this.testListings : this.listings;
  }

  private checkRateLimit(): AS24ClientResult<never> | null {
    if (this.rateLimitThreshold <= 0) return null;
    this.rateLimitCounter++;
    if (this.rateLimitCounter % this.rateLimitThreshold === 0) {
      return { success: false, status: 429, rateLimited: true };
    }
    return null;
  }

  private checkAuth(auth: AS24Auth): AS24ClientResult<never> | null {
    if (!auth.username || !auth.password) {
      return {
        success: false,
        status: 401,
        errors: [{ field: "authorization", message: "Identifiants manquants" }],
      };
    }
    return null;
  }

  async createListing(
    customerId: string,
    payload: AS24ListingPayload,
    auth: AS24Auth,
    headers?: Record<string, string>
  ): Promise<AS24ClientResult<AS24ListingResponse>> {
    const rlError = this.checkRateLimit();
    if (rlError) return rlError as AS24ClientResult<AS24ListingResponse>;

    const authError = this.checkAuth(auth);
    if (authError) return authError as AS24ClientResult<AS24ListingResponse>;

    // Validate payload
    const validation = validateAS24Payload(payload);
    if (!validation.valid) {
      const fieldErrors: AS24FieldError[] = validation.errors.map((e) => ({
        field: e.field,
        message: e.message,
      }));
      return { success: false, status: 400, errors: fieldErrors };
    }

    const id = generateId();
    const now = new Date().toISOString();
    const store = this.getStore(headers);
    store.set(id, { customerId, payload, createdAt: now, updatedAt: now });

    return {
      success: true,
      status: 201,
      data: {
        id,
        vehicleType: payload.vehicleType,
        make: payload.make,
        model: payload.model,
        createdAt: now,
        updatedAt: now,
      },
    };
  }

  async updateListing(
    customerId: string,
    listingId: string,
    payload: AS24ListingPayload,
    auth: AS24Auth,
    headers?: Record<string, string>
  ): Promise<AS24ClientResult<AS24ListingResponse>> {
    const rlError = this.checkRateLimit();
    if (rlError) return rlError as AS24ClientResult<AS24ListingResponse>;

    const authError = this.checkAuth(auth);
    if (authError) return authError as AS24ClientResult<AS24ListingResponse>;

    const store = this.getStore(headers);
    const existing = store.get(listingId);
    if (!existing || existing.customerId !== customerId) {
      return {
        success: false,
        status: 404,
        errors: [{ field: "listingId", message: "Annonce non trouvee" }],
      };
    }

    const validation = validateAS24Payload(payload);
    if (!validation.valid) {
      const fieldErrors: AS24FieldError[] = validation.errors.map((e) => ({
        field: e.field,
        message: e.message,
      }));
      return { success: false, status: 400, errors: fieldErrors };
    }

    const now = new Date().toISOString();
    store.set(listingId, {
      customerId,
      payload,
      createdAt: existing.createdAt,
      updatedAt: now,
    });

    return {
      success: true,
      status: 200,
      data: {
        id: listingId,
        vehicleType: payload.vehicleType,
        make: payload.make,
        model: payload.model,
        createdAt: existing.createdAt,
        updatedAt: now,
      },
    };
  }

  async deleteListing(
    customerId: string,
    listingId: string,
    auth: AS24Auth,
    headers?: Record<string, string>
  ): Promise<AS24ClientResult<void>> {
    const authError = this.checkAuth(auth);
    if (authError) return authError as AS24ClientResult<void>;

    const store = this.getStore(headers);
    const existing = store.get(listingId);
    if (!existing || existing.customerId !== customerId) {
      return {
        success: false,
        status: 404,
        errors: [{ field: "listingId", message: "Annonce non trouvee" }],
      };
    }

    store.delete(listingId);
    return { success: true, status: 204 };
  }

  async getListing(
    customerId: string,
    listingId: string,
    auth: AS24Auth,
    headers?: Record<string, string>
  ): Promise<AS24ClientResult<AS24ListingPayload>> {
    const authError = this.checkAuth(auth);
    if (authError) return authError as AS24ClientResult<AS24ListingPayload>;

    const store = this.getStore(headers);
    const existing = store.get(listingId);
    if (!existing || existing.customerId !== customerId) {
      return {
        success: false,
        status: 404,
        errors: [{ field: "listingId", message: "Annonce non trouvee" }],
      };
    }

    return { success: true, status: 200, data: existing.payload };
  }

  async uploadImage(
    customerId: string,
    _imageBuffer: Buffer,
    _contentType: string,
    auth: AS24Auth
  ): Promise<AS24ClientResult<AS24ImageResponse>> {
    const authError = this.checkAuth(auth);
    if (authError) return authError as AS24ClientResult<AS24ImageResponse>;

    if (!customerId) {
      return {
        success: false,
        status: 400,
        errors: [{ field: "customerId", message: "Customer ID requis" }],
      };
    }

    return {
      success: true,
      status: 201,
      data: { id: generateId() },
    };
  }

  // ── Utilitaires pour les tests ──

  getListingCount(testMode = false): number {
    return testMode ? this.testListings.size : this.listings.size;
  }

  getAllListings(testMode = false): Map<string, { customerId: string; payload: AS24ListingPayload }> {
    return testMode ? this.testListings : this.listings;
  }

  clear(): void {
    this.listings.clear();
    this.testListings.clear();
    this.rateLimitCounter = 0;
  }
}

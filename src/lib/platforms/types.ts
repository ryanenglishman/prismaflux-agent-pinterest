// ── PlatformAdapter: interface universelle pour chaque plateforme ──

export interface PlatformAdapter {
  readonly platformId: string;
  readonly displayName: string;

  createListing(
    vehicle: VehicleData,
    credentials: PlatformCredentials
  ): Promise<PlatformResult<ListingRef>>;

  updateListing(
    listingRef: ListingRef,
    vehicle: VehicleData,
    credentials: PlatformCredentials
  ): Promise<PlatformResult<ListingRef>>;

  deleteListing(
    listingRef: ListingRef,
    credentials: PlatformCredentials
  ): Promise<PlatformResult<void>>;

  getListing(
    listingRef: ListingRef,
    credentials: PlatformCredentials
  ): Promise<PlatformResult<unknown>>;

  uploadImage(
    image: Buffer,
    contentType: string,
    credentials: PlatformCredentials
  ): Promise<PlatformResult<string>>;

  validatePayload(vehicle: VehicleData): ValidationResult;

  getReferences(): PlatformReferences;

  checkHealth(
    credentials: PlatformCredentials
  ): Promise<HealthCheckResult>;
}

// ── VehicleData: type interne PrismaFlux (lisible, pas d'IDs numeriques) ──

export interface VehicleData {
  id: string;
  organizationId: string;
  vin?: string;

  make: string;
  model: string;
  modelVersion?: string;
  bodyType: string;
  vehicleType: string;
  offerType: string;

  firstRegistrationDate?: string;
  mileage?: number;
  previousOwners?: number;

  fuelType: string;
  power?: number;
  powerHp?: number;
  engineSize?: number;
  transmission: string;
  drivetrain?: string;
  gears?: number;
  cylinders?: number;

  co2Emission?: number;
  fuelConsumptionCombined?: number;
  fuelConsumptionUrban?: number;
  fuelConsumptionExtraUrban?: number;
  emissionClass?: string;
  emissionSticker?: string;

  bodyColor: string;
  bodyColorOriginal?: string;
  paintType?: string;
  interiorColor?: string;
  interiorType?: string;
  upholstery?: string;

  seats?: number;
  doors?: number;
  weight?: number;

  equipment: string[];

  price: number;
  currency: string;
  vatRate?: number;
  netPrice?: number;
  isNegotiable?: boolean;
  isTaxDeductible?: boolean;
  dealerPrice?: number;

  description?: string;
  countryOfSale?: string;
  locationPostalCode?: string;

  photos: VehiclePhotoData[];

  publicationStatus?: "active" | "inactive";
  targetChannels?: string[];
}

export interface VehiclePhotoData {
  id: string;
  url: string;
  platformImageIds?: Record<string, string>;
  order: number;
  type: "exterior" | "interior" | "detail" | "document";
}

// ── Credentials dealer stockes dans OrganizationPlatform ──

export interface PlatformCredentials {
  customerId: string;
  username: string;
  password: string;
  testMode: boolean;
}

// ── Resultats ──

export interface PlatformResult<T> {
  success: boolean;
  data?: T;
  error?: PlatformError;
  rateLimited?: boolean;
  retryAfterMs?: number;
}

export interface PlatformError {
  code: string;
  message: string;
  details?: Record<string, string>;
}

export interface ListingRef {
  platformId: string;
  platformListingId: string;
  customerId: string;
}

// ── Validation ──

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
  completenessScore: number;
  missingOptional: string[];
}

export interface ValidationError {
  field: string;
  code: "REQUIRED" | "INVALID_ENUM" | "OUT_OF_RANGE" | "INVALID_FORMAT" | "INVALID_REFERENCE";
  message: string;
  value?: unknown;
}

export interface ValidationWarning {
  field: string;
  message: string;
}

// ── References et Health ──

export interface PlatformReferences {
  makes: MakeEntry[];
  bodyColors: ReferenceEntry[];
  bodyTypes: ReferenceEntry[];
  fuelTypes: ReferenceEntry[];
  equipments: ReferenceEntry[];
  transmissions: ReferenceEntry[];
  drivetrains: ReferenceEntry[];
}

export interface MakeEntry {
  id: number;
  name: string;
  models: ModelEntry[];
}

export interface ModelEntry {
  id: number;
  name: string;
}

export interface ReferenceEntry {
  id: number;
  name: string;
  code?: string;
}

export interface HealthCheckResult {
  status: "ok" | "degraded" | "down";
  responseTimeMs: number;
  message?: string;
}

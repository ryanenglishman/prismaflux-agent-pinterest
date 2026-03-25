// ── Payload exact attendu par l'API AutoScout24 ──

export interface AS24ListingPayload {
  vehicleType: string;
  offerType: string;
  make: number;
  model: number;
  modelVersion?: string;
  bodyType: number;
  bodyColor: number;
  bodyColorOriginal?: string;
  paintType?: string;
  interiorColor?: number;
  interiorType?: string;
  upholstery?: string;

  fuelCategory: string;
  primaryFuelType?: number;
  transmission: string;
  drivetrain?: string;
  power: number;
  engineSize?: number;
  gears?: number;
  cylinders?: number;

  firstRegistrationDate: string;
  mileage: number;
  previousOwners?: number;

  co2Emission?: number;
  fuelConsumptionCombined?: number;
  fuelConsumptionUrban?: number;
  fuelConsumptionExtraUrban?: number;
  emissionClass?: string;
  emissionSticker?: string;

  seats?: number;
  doors?: number;

  vin?: string;

  equipment?: number[];

  description?: string;

  prices: AS24Prices;

  images?: { id: string }[];

  publication: AS24Publication;

  culture: string;
  marketplace: string;

  countryOfSale?: string;
}

export interface AS24Prices {
  public: {
    price: number;
    currency: string;
    vatRate?: number;
    netPrice?: number;
    isNegotiable?: boolean;
    isTaxDeductible?: boolean;
  };
  dealer?: {
    price: number;
    currency: string;
  };
}

export interface AS24Publication {
  status: "Active" | "Inactive";
  channels: { id: string }[];
}

// ── Reponses AS24 ──

export interface AS24ListingResponse {
  id: string;
  vehicleType: string;
  make: number;
  model: number;
  createdAt: string;
  updatedAt: string;
}

export interface AS24ImageResponse {
  id: string;
}

export interface AS24ErrorResponse {
  errors: AS24FieldError[];
}

export interface AS24FieldError {
  field: string;
  message: string;
}

// ── Client interface (mock et real implementent la meme) ──

export interface AS24ClientInterface {
  createListing(
    customerId: string,
    payload: AS24ListingPayload,
    auth: AS24Auth,
    headers?: Record<string, string>
  ): Promise<AS24ClientResult<AS24ListingResponse>>;

  updateListing(
    customerId: string,
    listingId: string,
    payload: AS24ListingPayload,
    auth: AS24Auth,
    headers?: Record<string, string>
  ): Promise<AS24ClientResult<AS24ListingResponse>>;

  deleteListing(
    customerId: string,
    listingId: string,
    auth: AS24Auth,
    headers?: Record<string, string>
  ): Promise<AS24ClientResult<void>>;

  getListing(
    customerId: string,
    listingId: string,
    auth: AS24Auth,
    headers?: Record<string, string>
  ): Promise<AS24ClientResult<AS24ListingPayload>>;

  uploadImage(
    customerId: string,
    imageBuffer: Buffer,
    contentType: string,
    auth: AS24Auth
  ): Promise<AS24ClientResult<AS24ImageResponse>>;
}

export interface AS24Auth {
  username: string;
  password: string;
}

export interface AS24ClientResult<T> {
  success: boolean;
  status: number;
  data?: T;
  errors?: AS24FieldError[];
  rateLimited?: boolean;
}

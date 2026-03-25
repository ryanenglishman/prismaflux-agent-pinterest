import { NextRequest, NextResponse } from "next/server";
import { getAdapter } from "@/lib/platforms/registry";
import type { VehicleData, PlatformCredentials } from "@/lib/platforms/types";

interface PublishRequest {
  vehicleData: VehicleData;
  platformIds?: string[];
  testMode?: boolean;
  credentials?: Record<string, PlatformCredentials>;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as PublishRequest;
    const {
      vehicleData,
      platformIds = ["autoscout24"],
      testMode = true,
      credentials = {},
    } = body;

    if (!vehicleData) {
      return NextResponse.json(
        { error: "vehicleData est requis" },
        { status: 400 }
      );
    }

    const results: Record<
      string,
      {
        success: boolean;
        listingId?: string;
        errors?: { field: string; message: string }[];
        rateLimited?: boolean;
      }
    > = {};

    for (const platformId of platformIds) {
      try {
        const adapter = getAdapter(platformId);

        // Use provided credentials or default mock credentials
        const creds: PlatformCredentials = credentials[platformId] ?? {
          customerId: "mock-customer-001",
          username: "mock-user",
          password: "mock-pass",
          testMode,
        };
        creds.testMode = testMode;

        const result = await adapter.createListing(vehicleData, creds);

        if (result.success && result.data) {
          results[platformId] = {
            success: true,
            listingId: result.data.platformListingId,
          };
        } else if (result.rateLimited) {
          results[platformId] = {
            success: false,
            rateLimited: true,
          };
        } else {
          results[platformId] = {
            success: false,
            errors: result.error?.details
              ? Object.entries(result.error.details).map(([field, message]) => ({
                  field,
                  message,
                }))
              : [{ field: "general", message: result.error?.message ?? "Publication refusee" }],
          };
        }
      } catch (err) {
        results[platformId] = {
          success: false,
          errors: [
            {
              field: "general",
              message: err instanceof Error ? err.message : "Erreur inattendue",
            },
          ],
        };
      }
    }

    const allSuccess = Object.values(results).every((r) => r.success);

    return NextResponse.json({
      success: allSuccess,
      results,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur interne";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

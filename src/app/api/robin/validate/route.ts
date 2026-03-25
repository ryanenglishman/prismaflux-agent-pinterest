import { NextRequest, NextResponse } from "next/server";
import { getAdapter } from "@/lib/platforms/registry";
import type { VehicleData } from "@/lib/platforms/types";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { vehicleData, platformId = "autoscout24" } = body as {
      vehicleData: VehicleData;
      platformId?: string;
    };

    if (!vehicleData) {
      return NextResponse.json(
        { error: "vehicleData est requis" },
        { status: 400 }
      );
    }

    const adapter = getAdapter(platformId);
    const result = adapter.validatePayload(vehicleData);

    return NextResponse.json({
      platformId,
      validation: result,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur interne";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

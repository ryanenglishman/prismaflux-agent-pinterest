import type { PlatformAdapter } from "./types";
import type { AS24ClientInterface } from "./autoscout24/types";
import { MockAS24Client } from "./autoscout24/mock-client";
import { AutoScout24Adapter } from "./autoscout24/adapter";

// ── Factory: cree le bon client selon AS24_MODE ──

function createAS24Client(): AS24ClientInterface {
  const mode = process.env.AS24_MODE ?? "mock";

  if (mode === "live") {
    // Le RealAS24Client sera implemente quand les credentials seront disponibles.
    // Pour l'instant, fallback sur le mock avec un warning.
    console.warn(
      "[PrismaFlux] AS24_MODE=live mais RealAS24Client non implemente — fallback sur mock"
    );
    return new MockAS24Client();
  }

  return new MockAS24Client();
}

// ── Registry: registre centralisé des adapters ──

let as24Adapter: AutoScout24Adapter | null = null;

const adapters: Record<string, () => PlatformAdapter> = {
  autoscout24: () => {
    if (!as24Adapter) {
      as24Adapter = new AutoScout24Adapter(createAS24Client());
    }
    return as24Adapter;
  },
};

export function getAdapter(platformId: string): PlatformAdapter {
  const factory = adapters[platformId];
  if (!factory) {
    throw new Error(`Plateforme "${platformId}" non supportee`);
  }
  return factory();
}

export function getAvailablePlatforms(): string[] {
  return Object.keys(adapters);
}

// ── Acces direct au mock pour les tests et routes mock ──

let sharedMockClient: MockAS24Client | null = null;

export function getMockClient(): MockAS24Client {
  if (!sharedMockClient) {
    sharedMockClient = new MockAS24Client();
  }
  return sharedMockClient;
}

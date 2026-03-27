/**
 * Static map generator using OpenStreetMap Nominatim (geocoding)
 * and a tile-based static map service.
 *
 * Geocodes the prospect and competitors, then generates a static map
 * image URL that can be embedded in the PDF.
 */

export interface GeoPoint {
  name: string;
  lat: number;
  lon: number;
  isProspect: boolean;
}

export interface StaticMapResult {
  /** Map image as base64 data URI */
  dataUri: string | null;
  /** Points plotted on the map */
  points: GeoPoint[];
  /** Center coordinates */
  center: { lat: number; lon: number };
}

const NOMINATIM_UA = "PrismaFluxBot/1.0 (contact@prismaflux.com)";

/**
 * Geocode an address/business name using OSM Nominatim.
 * Free, no API key, rate limit: 1 req/s.
 */
async function geocode(query: string): Promise<{ lat: number; lon: number } | null> {
  try {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1&countrycodes=be`;

    const res = await fetch(url, {
      headers: { "User-Agent": NOMINATIM_UA },
      signal: AbortSignal.timeout(10_000),
    });

    if (!res.ok) return null;

    const data = await res.json() as { lat: string; lon: string }[];
    if (!data || data.length === 0) return null;

    return {
      lat: parseFloat(data[0].lat),
      lon: parseFloat(data[0].lon),
    };
  } catch {
    return null;
  }
}

/**
 * Generate a static map image with prospect and competitors plotted.
 * Uses the free staticmap.geoapify.com service (or falls back to OSM tiles).
 */
export async function generateStaticMap(
  prospectName: string,
  prospectCity: string,
  competitorNames: string[],
): Promise<StaticMapResult> {
  console.log(`[Marcus/Map] Geocodage de ${prospectName} (${prospectCity})...`);

  const points: GeoPoint[] = [];

  // Geocode prospect
  const prospectGeo = await geocode(`${prospectName} ${prospectCity} Belgique`);
  if (prospectGeo) {
    points.push({ name: prospectName, ...prospectGeo, isProspect: true });
    console.log(`[Marcus/Map] Prospect: ${prospectGeo.lat}, ${prospectGeo.lon}`);
  } else {
    // Fallback: geocode just the city
    const cityGeo = await geocode(`${prospectCity} Belgique`);
    if (cityGeo) {
      points.push({ name: prospectName, ...cityGeo, isProspect: true });
      console.log(`[Marcus/Map] Prospect (ville): ${cityGeo.lat}, ${cityGeo.lon}`);
    }
  }

  // Geocode competitors (with 1s delay between each for Nominatim rate limit)
  for (const compName of competitorNames.slice(0, 5)) {
    await new Promise(r => setTimeout(r, 1100));
    const geo = await geocode(`${compName} ${prospectCity} Belgique`);
    if (geo) {
      points.push({ name: compName, ...geo, isProspect: false });
      console.log(`[Marcus/Map] Concurrent ${compName}: ${geo.lat}, ${geo.lon}`);
    }
  }

  if (points.length === 0) {
    console.log(`[Marcus/Map] Aucun point geocode`);
    return { dataUri: null, points: [], center: { lat: 50.85, lon: 4.35 } };
  }

  // Calculate center
  const center = {
    lat: points.reduce((s, p) => s + p.lat, 0) / points.length,
    lon: points.reduce((s, p) => s + p.lon, 0) / points.length,
  };

  // Try multiple static map services in order of reliability
  const zoom = points.length > 1 ? 12 : 14;
  const mapW = 600;
  const mapH = 300;

  // Build marker params for different services
  const services = [
    // Service 1: staticmap.openstreetmap.de
    () => {
      let markers = "";
      for (const p of points) {
        const color = p.isProspect ? "red" : "blue";
        markers += `&markers=${p.lat},${p.lon},${color}`;
      }
      return `https://staticmap.openstreetmap.de/staticmap.php?center=${center.lat},${center.lon}&zoom=${zoom}&size=${mapW}x${mapH}&maptype=mapnik${markers}`;
    },
    // Service 2: OSM tile-based simple map (just center, no markers but works reliably)
    () => {
      const tileZ = zoom;
      const x = Math.floor(((center.lon + 180) / 360) * Math.pow(2, tileZ));
      const y = Math.floor(
        ((1 - Math.log(Math.tan((center.lat * Math.PI) / 180) + 1 / Math.cos((center.lat * Math.PI) / 180)) / Math.PI) / 2) *
          Math.pow(2, tileZ),
      );
      return `https://tile.openstreetmap.org/${tileZ}/${x}/${y}.png`;
    },
  ];

  for (const buildUrl of services) {
    const mapUrl = buildUrl();
    try {
      console.log(`[Marcus/Map] Tentative: ${mapUrl.substring(0, 80)}...`);
      const res = await fetch(mapUrl, {
        headers: { "User-Agent": NOMINATIM_UA },
        signal: AbortSignal.timeout(15_000),
      });

      if (res.ok) {
        const buffer = Buffer.from(await res.arrayBuffer());
        if (buffer.length > 500) { // Ensure we got a real image, not an error page
          const dataUri = `data:image/png;base64,${buffer.toString("base64")}`;
          console.log(`[Marcus/Map] OK — ${(buffer.length / 1024).toFixed(0)} KB`);
          return { dataUri, points, center };
        }
      }
    } catch (err) {
      console.warn(`[Marcus/Map] Service echoue:`, err instanceof Error ? err.message : err);
    }
  }

  console.log(`[Marcus/Map] Tous les services de carte ont echoue`);
  return { dataUri: null, points, center };
}

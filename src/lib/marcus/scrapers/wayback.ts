/**
 * Wayback Machine / Archive.org scraper.
 * Uses the CDX API to determine:
 * - When the domain first appeared (earliest snapshot)
 * - How frequently it was modified (snapshot count by year)
 * - When the last snapshot was taken
 */

export interface WaybackProfile {
  /** Earliest snapshot date (ISO format) */
  firstSeen: string | null;
  /** Years since first seen */
  domainAgeYears: number | null;
  /** Latest snapshot date */
  lastSeen: string | null;
  /** Total snapshots across all years */
  totalSnapshots: number;
  /** Snapshots per year (last 5 years) */
  snapshotsByYear: { year: number; count: number }[];
  /** Average snapshots per year (activity level) */
  avgSnapshotsPerYear: number;
  /** Human-readable narrative */
  narrative: string;
}

/**
 * Fetch domain history from the Wayback Machine CDX API.
 * The CDX API is free and doesn't require authentication.
 */
export async function scrapeWaybackProfile(url: string): Promise<WaybackProfile | null> {
  try {
    // Extract domain from URL
    const domain = new URL(url).hostname.replace(/^www\./, "");

    console.log(`[Marcus/Wayback] Recherche historique Archive.org pour ${domain}...`);

    // Use CDX API to get snapshot summary
    // output=json&fl=timestamp gives us all snapshot timestamps
    // collapse=timestamp:6 gives 1 snapshot per month, limit=200 is enough to cover ~16 years
    const cdxUrl = `https://web.archive.org/cdx/search/cdx?url=${encodeURIComponent(domain)}&matchType=host&output=json&fl=timestamp&collapse=timestamp:6&limit=200`;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 45_000);

    const res = await fetch(cdxUrl, {
      signal: controller.signal,
      headers: { "User-Agent": "PrismaFluxBot/1.0 (+https://prismaflux.com)" },
    });
    clearTimeout(timeout);

    if (!res.ok) {
      console.warn(`[Marcus/Wayback] CDX API returned ${res.status}`);
      return null;
    }

    const data = await res.json() as string[][];

    if (!data || data.length <= 1) {
      console.log(`[Marcus/Wayback] Aucun snapshot trouve pour ${domain}`);
      return buildProfile(domain, []);
    }

    // First row is header ["timestamp"], rest is data
    const timestamps = data.slice(1).map(row => row[0]);

    if (timestamps.length === 0) {
      return buildProfile(domain, []);
    }

    return buildProfile(domain, timestamps);
  } catch (err) {
    console.warn(`[Marcus/Wayback] Erreur:`, err);
    return null;
  }
}

function buildProfile(domain: string, timestamps: string[]): WaybackProfile {
  if (timestamps.length === 0) {
    return {
      firstSeen: null,
      domainAgeYears: null,
      lastSeen: null,
      totalSnapshots: 0,
      snapshotsByYear: [],
      avgSnapshotsPerYear: 0,
      narrative: `Le domaine ${domain} n'a pas ete trouve dans les archives d'Archive.org. Cela peut indiquer un site tres recent ou une configuration bloquant l'archivage.`,
    };
  }

  // Parse timestamps (format: YYYYMMDDHHMMSS or YYYYMM)
  const parseDate = (ts: string) => {
    const y = parseInt(ts.substring(0, 4));
    const m = parseInt(ts.substring(4, 6)) || 1;
    const d = parseInt(ts.substring(6, 8)) || 1;
    return new Date(y, m - 1, d);
  };

  const firstDate = parseDate(timestamps[0]);
  const lastDate = parseDate(timestamps[timestamps.length - 1]);
  const now = new Date();

  const domainAgeYears = Math.round((now.getTime() - firstDate.getTime()) / (365.25 * 24 * 60 * 60 * 1000) * 10) / 10;

  // Count snapshots by year (last 5 years)
  const currentYear = now.getFullYear();
  const yearCounts: Record<number, number> = {};
  for (const ts of timestamps) {
    const year = parseInt(ts.substring(0, 4));
    yearCounts[year] = (yearCounts[year] || 0) + 1;
  }

  const snapshotsByYear: { year: number; count: number }[] = [];
  for (let y = currentYear - 4; y <= currentYear; y++) {
    snapshotsByYear.push({ year: y, count: yearCounts[y] || 0 });
  }

  const totalYears = Math.max(1, Math.ceil(domainAgeYears));
  const avgSnapshotsPerYear = Math.round(timestamps.length / totalYears);

  // Generate narrative
  const narrative = generateWaybackNarrative(domain, domainAgeYears, timestamps.length, avgSnapshotsPerYear, snapshotsByYear, firstDate);

  return {
    firstSeen: firstDate.toISOString().split("T")[0],
    domainAgeYears,
    lastSeen: lastDate.toISOString().split("T")[0],
    totalSnapshots: timestamps.length,
    snapshotsByYear,
    avgSnapshotsPerYear,
    narrative,
  };
}

function generateWaybackNarrative(
  domain: string,
  ageYears: number,
  totalSnapshots: number,
  avgPerYear: number,
  byYear: { year: number; count: number }[],
  firstDate: Date,
): string {
  const parts: string[] = [];

  // Age commentary
  if (ageYears >= 15) {
    parts.push(`Le domaine ${domain} est present sur le web depuis ${Math.round(ageYears)} ans (premiere apparition en ${firstDate.getFullYear()}). C'est une anciennete remarquable qui temoigne d'une presence digitale etablie de longue date — un atout de credibilite aupres des moteurs de recherche et des clients.`);
  } else if (ageYears >= 10) {
    parts.push(`Avec ${Math.round(ageYears)} ans de presence en ligne (depuis ${firstDate.getFullYear()}), ${domain} beneficie d'une anciennete solide. Plus de 10 ans sur le web, c'est un signal de confiance pour Google et pour vos clients — peu de concessions peuvent se prevaloir d'une telle continuite digitale.`);
  } else if (ageYears >= 5) {
    parts.push(`Le domaine ${domain} existe depuis ${Math.round(ageYears)} ans (premiere apparition en ${firstDate.getFullYear()}). C'est une anciennete honorable qui constitue une base solide pour developper votre visibilite en ligne.`);
  } else if (ageYears >= 1) {
    parts.push(`${domain} est present depuis ${Math.round(ageYears)} an(s) seulement. C'est un site relativement recent — il faudra du temps et du contenu de qualite pour que Google lui accorde la meme confiance qu'a des domaines plus anciens.`);
  } else {
    parts.push(`${domain} semble etre apparu tres recemment sur le web. Google accorde progressivement plus de confiance aux domaines au fil du temps — investir dans du contenu regulier des maintenant accelerera ce processus.`);
  }

  // Activity commentary
  const recentYears = byYear.slice(-3);
  const recentAvg = recentYears.reduce((s, y) => s + y.count, 0) / Math.max(1, recentYears.length);

  if (recentAvg >= 20) {
    parts.push(`Avec en moyenne ${Math.round(recentAvg)} modifications detectees par an ces dernieres annees, le site est activement maintenu. C'est un bon signal.`);
  } else if (recentAvg >= 5) {
    parts.push(`Le site montre une activite moderee avec environ ${Math.round(recentAvg)} modifications par an. Des mises a jour plus frequentes (nouveau contenu, vehicules, actualites) amelioreraient le referencement.`);
  } else if (recentAvg > 0) {
    parts.push(`Avec seulement ${Math.round(recentAvg)} modification(s) par an en moyenne, le site semble peu mis a jour. Google favorise les sites qui publient du contenu regulierement — un site statique perd progressivement en visibilite.`);
  } else {
    parts.push(`Aucune activite recente detectee sur le site. Un site qui n'est pas mis a jour envoie un signal negatif a Google et aux visiteurs.`);
  }

  return parts.join(" ");
}

/**
 * Test script to validate Wappalyzer and Wayback scrapers independently.
 * Usage: npx tsx scripts/test-scrapers.ts <url>
 * Example: npx tsx scripts/test-scrapers.ts "https://www.garagedestockel.com"
 */

import { detectTechnologies } from "../src/lib/marcus/scrapers/wappalyzer";
import { scrapeWaybackProfile } from "../src/lib/marcus/scrapers/wayback";

const USER_AGENT = "Mozilla/5.0 (compatible; PrismaFluxBot/1.0; +https://prismaflux.com)";

async function fetchHtml(url: string): Promise<string | null> {
  try {
    let res: Response;
    try {
      res = await fetch(url, {
        headers: { "User-Agent": USER_AGENT },
        redirect: "follow",
        signal: AbortSignal.timeout(15_000),
      });
    } catch {
      if (url.startsWith("https://")) {
        const httpUrl = url.replace("https://", "http://");
        console.log(`  HTTPS failed, trying HTTP: ${httpUrl}`);
        res = await fetch(httpUrl, {
          headers: { "User-Agent": USER_AGENT },
          redirect: "follow",
          signal: AbortSignal.timeout(15_000),
        });
      } else {
        throw new Error("Fetch failed");
      }
    }
    if (!res.ok) {
      console.log(`  HTTP ${res.status}`);
      return null;
    }
    return await res.text();
  } catch (err) {
    console.log(`  Erreur fetch: ${err}`);
    return null;
  }
}

async function main() {
  const url = process.argv[2] || "https://www.garagedestockel.com";
  console.log(`\n========================================`);
  console.log(`  Test des scrapers PrismaFlux`);
  console.log(`  URL: ${url}`);
  console.log(`========================================\n`);

  // 1. Fetch HTML
  console.log("1. Recuperation du HTML...");
  const html = await fetchHtml(url);
  if (!html) {
    console.log("  ECHEC: Impossible de recuperer le HTML\n");
  } else {
    console.log(`  OK: ${html.length} caracteres recuperes\n`);
  }

  // 2. Test Wappalyzer
  console.log("2. Test WAPPALYZER (detection technologies)...");
  if (html) {
    const techProfile = detectTechnologies(html);
    console.log(`  Technologies detectees: ${techProfile.technologies.length}`);
    console.log(`  ---`);
    // Group by category
    const byCategory: Record<string, string[]> = {};
    for (const t of techProfile.technologies) {
      if (!byCategory[t.category]) byCategory[t.category] = [];
      byCategory[t.category].push(`${t.name} (${t.confidence})`);
    }
    for (const [cat, techs] of Object.entries(byCategory)) {
      console.log(`  [${cat}] ${techs.join(", ")}`);
    }
    console.log(`  ---`);
    console.log(`  CMS: ${techProfile.cms ?? "non detecte"}`);
    console.log(`  Analytics: ${techProfile.analytics.length > 0 ? techProfile.analytics.join(", ") : "aucun"}`);
    console.log(`  Frameworks: ${techProfile.frameworks.length > 0 ? techProfile.frameworks.join(", ") : "aucun"}`);
    console.log(`  E-commerce: ${techProfile.ecommerce ?? "non"}`);
    console.log(`  Hosting: ${techProfile.hosting ?? "non detecte"}`);
    console.log(`  ---`);
    console.log(`  Resume: ${techProfile.summary}`);
  } else {
    console.log("  SKIP: pas de HTML disponible");
  }
  console.log();

  // 3. Test Wayback Machine
  console.log("3. Test ARCHIVE.ORG (Wayback Machine)...");
  const wayback = await scrapeWaybackProfile(url);
  if (wayback) {
    console.log(`  Premiere apparition: ${wayback.firstSeen ?? "inconnue"}`);
    console.log(`  Age du domaine: ${wayback.domainAgeYears ?? "?"} ans`);
    console.log(`  Derniere apparition: ${wayback.lastSeen ?? "inconnue"}`);
    console.log(`  Total snapshots: ${wayback.totalSnapshots}`);
    console.log(`  Moyenne/an: ${wayback.avgSnapshotsPerYear}`);
    console.log(`  Par annee (5 dernieres):`);
    for (const y of wayback.snapshotsByYear) {
      const bar = "#".repeat(Math.min(y.count, 50));
      console.log(`    ${y.year}: ${bar} (${y.count})`);
    }
    console.log(`  ---`);
    console.log(`  Narratif: ${wayback.narrative}`);
  } else {
    console.log("  ECHEC: Pas de donnees Wayback");
  }
  console.log();

  console.log("========================================");
  console.log("  Tests termines");
  console.log("========================================\n");
}

main().catch(console.error);

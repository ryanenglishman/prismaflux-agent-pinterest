import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";
import { scanWebsite } from "../src/lib/marcus/scanner";
import { generateAuditPdf } from "../src/lib/marcus/pdf/generate";

async function main() {
  const args = process.argv.slice(2);

  if (args.length < 3) {
    console.log("Usage: npx tsx scripts/scan-and-generate.ts <name> <url> <city> [vehicleCount] [ownerName]");
    console.log('Example: npx tsx scripts/scan-and-generate.ts "Garage Dupont" "https://www.garage-dupont.be" "Namur" 60 "Jean Dupont"');
    process.exit(1);
  }

  const [dealerName, dealerUrl, dealerCity, vehicleCountStr, ownerName] = args;

  console.log(`\n=== Audit Digital PrismaFlux ===`);
  console.log(`Concessionnaire: ${dealerName}`);
  console.log(`URL: ${dealerUrl}`);
  console.log(`Ville: ${dealerCity}`);
  if (vehicleCountStr) console.log(`Vehicules: ${vehicleCountStr}`);
  if (ownerName) console.log(`Gerant: ${ownerName}`);
  console.log("");

  const data = await scanWebsite({
    dealerName,
    dealerUrl,
    dealerCity,
    vehicleCount: vehicleCountStr ? parseInt(vehicleCountStr, 10) : undefined,
    ownerName: ownerName || undefined,
  });

  console.log(`\n=== Resultats ===`);
  console.log(`Score global: ${data.globalScore}/100`);
  console.log(`  Technique: ${data.subScores.technique}`);
  console.log(`  SEO: ${data.subScores.seo}`);
  console.log(`  Local: ${data.subScores.local}`);
  console.log(`  Checks technique: ${data.technicalChecks.length}`);
  console.log(`  Checks SEO: ${data.seoChecks.length}`);
  console.log(`  Mots-cles manquants: ${data.localPresence.missingKeywords.length}`);
  console.log(`  Reseaux sociaux detectes: ${data.socialMedia.filter(s => s.found).length}/3`);
  console.log(`  Marques auto detectees: ${data.carBrands.length > 0 ? data.carBrands.join(", ") : "aucune"}`);
  console.log(`  Cookie banner: ${data.technicalExtras.hasCookieBanner ? "Oui" : "Non"}`);
  console.log(`  Analytics: ${data.technicalExtras.hasGoogleAnalytics || data.technicalExtras.hasGoogleTagManager ? "Oui" : "Non"}`);
  console.log(`  Sitemap: ${data.technicalExtras.hasSitemap ? "Oui" : "Non"}`);
  console.log(`  Vehicules estimes: ${data.vehicleCount}`);
  console.log(`  Temps perdu: ${data.timeLost.totalHoursPerMonth}h/mois (${data.timeLost.totalCostPerYear} EUR/an)`);
  console.log(`  Leads perdus: ~${data.leadsLost.leadsLostPerMonth}/mois (${data.leadsLost.revenueLostPerMonth} EUR/mois)`);
  console.log("");

  console.log("Generation du PDF (8 pages)...");
  const buffer = await generateAuditPdf(data);

  const outDir = join(process.cwd(), "output");
  mkdirSync(outDir, { recursive: true });

  const slug = dealerName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+$/, "");
  const outPath = join(outDir, `audit-${slug}.pdf`);
  writeFileSync(outPath, buffer);

  console.log(`PDF genere: ${outPath}`);
  console.log(`Taille: ${(buffer.length / 1024).toFixed(1)} KB`);
  console.log(`Pages: 8`);
}

main().catch((err) => {
  console.error("Erreur:", err);
  process.exit(1);
});

import "dotenv/config";
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { join } from "path";
import { scanWebsite } from "../src/lib/marcus/scanner";
import { generateAuditPdf } from "../src/lib/marcus/pdf/generate";

interface ProspectRow {
  name: string;
  url: string;
  city: string;
}

function parseCSV(content: string): ProspectRow[] {
  const lines = content.trim().split("\n");
  if (lines.length < 2) return [];

  // Skip header row
  return lines.slice(1).map((line) => {
    // Handle quoted CSV fields
    const fields: string[] = [];
    let current = "";
    let inQuotes = false;
    for (const char of line) {
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if ((char === "," || char === ";") && !inQuotes) {
        fields.push(current.trim());
        current = "";
      } else {
        current += char;
      }
    }
    fields.push(current.trim());

    return {
      name: fields[0] ?? "",
      url: fields[1] ?? "",
      city: fields[2] ?? "",
    };
  }).filter((r) => r.name && r.url && r.city);
}

async function main() {
  const csvPath = process.argv[2];

  if (!csvPath) {
    console.log("Usage: npx tsx scripts/batch-generate.ts <prospects.csv>");
    console.log("");
    console.log("Format CSV (separateur , ou ;) :");
    console.log("  name,url,city");
    console.log('  "Garage Dupont","https://www.garage-dupont.be","Namur"');
    console.log('  "AutoCenter Liege","https://www.autocenter-liege.be","Liege"');
    process.exit(1);
  }

  const content = readFileSync(csvPath, "utf-8");
  const prospects = parseCSV(content);

  if (prospects.length === 0) {
    console.error("Aucun prospect trouve dans le CSV.");
    process.exit(1);
  }

  console.log(`${prospects.length} prospect(s) trouve(s) dans ${csvPath}\n`);

  const outDir = join(process.cwd(), "output");
  mkdirSync(outDir, { recursive: true });

  const results: { name: string; file: string; score: number; error?: string }[] = [];

  for (let i = 0; i < prospects.length; i++) {
    const p = prospects[i];
    console.log(`[${i + 1}/${prospects.length}] ${p.name} (${p.url})`);

    try {
      const data = await scanWebsite({
        dealerName: p.name,
        dealerUrl: p.url,
        dealerCity: p.city,
      });

      const buffer = await generateAuditPdf(data);

      const slug = p.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/-+$/, "");
      const filename = `audit-${slug}.pdf`;
      const outPath = join(outDir, filename);
      writeFileSync(outPath, buffer);

      results.push({ name: p.name, file: filename, score: data.globalScore });
      console.log(`  -> ${filename} (${data.globalScore}/100, ${(buffer.length / 1024).toFixed(0)} KB)\n`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      results.push({ name: p.name, file: "", score: 0, error: msg });
      console.error(`  -> ERREUR: ${msg}\n`);
    }

    // Small delay between scans to be polite to APIs
    if (i < prospects.length - 1) {
      await new Promise((r) => setTimeout(r, 2000));
    }
  }

  // Summary
  console.log("\n=== RESUME ===");
  console.log(`Total: ${results.length} prospects`);
  console.log(`Succes: ${results.filter((r) => !r.error).length}`);
  console.log(`Erreurs: ${results.filter((r) => r.error).length}`);
  console.log("");

  for (const r of results) {
    if (r.error) {
      console.log(`  ERREUR  ${r.name}: ${r.error}`);
    } else {
      console.log(`  OK  ${r.name}: ${r.score}/100 -> ${r.file}`);
    }
  }

  // Write summary CSV
  const summaryPath = join(outDir, "resume-batch.csv");
  const summaryLines = [
    "name,score,file,error",
    ...results.map(
      (r) =>
        `"${r.name}",${r.score},"${r.file}","${r.error ?? ""}"`
    ),
  ];
  writeFileSync(summaryPath, summaryLines.join("\n"), "utf-8");
  console.log(`\nResume CSV: ${summaryPath}`);
}

main().catch((err) => {
  console.error("Erreur fatale:", err);
  process.exit(1);
});

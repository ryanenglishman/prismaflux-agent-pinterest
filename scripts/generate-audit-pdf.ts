import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";
import { generateAuditPdf } from "../src/lib/marcus/pdf/generate";
import { MOCK_AUDIT_DATA } from "../src/lib/marcus/mock-data";

async function main() {
  console.log("Generating audit PDF for:", MOCK_AUDIT_DATA.dealerName);
  console.log("...");

  const buffer = await generateAuditPdf(MOCK_AUDIT_DATA);

  const outDir = join(process.cwd(), "output");
  mkdirSync(outDir, { recursive: true });

  const filename = `audit-${MOCK_AUDIT_DATA.dealerName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+$/, "")}.pdf`;

  const outPath = join(outDir, filename);
  writeFileSync(outPath, buffer);

  console.log(`PDF generated: ${outPath}`);
  console.log(`Size: ${(buffer.length / 1024).toFixed(1)} KB`);
}

main().catch((err) => {
  console.error("Failed to generate PDF:", err);
  process.exit(1);
});

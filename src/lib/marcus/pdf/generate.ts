import React from "react";
import { renderToBuffer } from "@react-pdf/renderer";
import { AuditReport } from "./AuditReport";
import { registerFonts } from "./fonts";
import type { AuditReportData } from "../types";

let fontsRegistered = false;

export async function generateAuditPdf(
  data: AuditReportData
): Promise<Buffer> {
  if (!fontsRegistered) {
    registerFonts();
    fontsRegistered = true;
  }

  const buffer = await renderToBuffer(
    React.createElement(AuditReport, { data })
  );
  return Buffer.from(buffer);
}

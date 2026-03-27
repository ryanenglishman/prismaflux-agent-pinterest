import React from "react";
import { Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import { PDF_THEME, statusColor, statusLabel } from "../theme";
import { PageHeader } from "../components/PageHeader";
import { SectionTitle } from "../components/SectionTitle";
import type { AuditCheckItem, TechnicalExtras, CompetitorData, GoogleProfileData } from "../../types";

const s = StyleSheet.create({
  page: { backgroundColor: PDF_THEME.pageBg, padding: PDF_THEME.margin },
  intro: { fontFamily: PDF_THEME.fontFamily, fontSize: 6.5, color: PDF_THEME.textMuted, lineHeight: 1.5, marginBottom: 8 },
  sLabel: { fontFamily: PDF_THEME.fontFamily, fontSize: 7.5, fontWeight: 600, color: PDF_THEME.textPrimary, marginBottom: 3, marginTop: 6 },
  tblHead: { flexDirection: "row", paddingVertical: 2.5, paddingHorizontal: 5, backgroundColor: PDF_THEME.sectionBg, borderBottomWidth: 0.5, borderBottomColor: PDF_THEME.border },
  tblTh: { fontFamily: PDF_THEME.fontFamily, fontSize: 5.5, fontWeight: 600, color: PDF_THEME.textMuted, textTransform: "uppercase", letterSpacing: 0.3 },
  tblRow: { flexDirection: "row", paddingVertical: 2, paddingHorizontal: 5, borderBottomWidth: 0.5, borderBottomColor: PDF_THEME.borderLight, alignItems: "center" },
  tblCell: { fontFamily: PDF_THEME.fontFamily, fontSize: 6, color: PDF_THEME.textSecondary },
  dot: { width: 4, height: 4, borderRadius: 2 },
  statusBadge: { flexDirection: "row", alignItems: "center", gap: 2, paddingHorizontal: 3, paddingVertical: 1, borderRadius: 2 },
  statusText: { fontFamily: PDF_THEME.fontFamily, fontSize: 5, fontWeight: 600 },
  divider: { height: 0.5, backgroundColor: PDF_THEME.border, marginVertical: 5 },
  // Extras grid
  extrasGrid: { flexDirection: "row", flexWrap: "wrap", gap: 4, marginBottom: 6 },
  extraItem: { flexDirection: "row", alignItems: "center", gap: 3, paddingHorizontal: 5, paddingVertical: 2, borderRadius: 3, borderWidth: 0.5, borderColor: PDF_THEME.borderLight },
  extraText: { fontFamily: PDF_THEME.fontFamily, fontSize: 5.5, color: PDF_THEME.textSecondary },
  // Competitor table
  compRow: { flexDirection: "row", paddingVertical: 2, paddingHorizontal: 5, alignItems: "center", borderBottomWidth: 0.5, borderBottomColor: PDF_THEME.borderLight },
  compCell: { fontFamily: PDF_THEME.fontFamily, fontSize: 6, color: PDF_THEME.textSecondary, textAlign: "center" },
  highlight: { backgroundColor: PDF_THEME.brandDim },
});

function StatusBadge({ status }: { status: AuditCheckItem["status"] }) {
  const bg = status === "ok" ? PDF_THEME.greenDim : status === "warn" ? PDF_THEME.yellowDim : PDF_THEME.redDim;
  return (
    <View style={[s.statusBadge, { backgroundColor: bg }]}>
      <View style={[s.dot, { backgroundColor: statusColor(status) }]} />
      <Text style={[s.statusText, { color: statusColor(status) }]}>{statusLabel(status)}</Text>
    </View>
  );
}

function ExtraChip({ label, ok }: { label: string; ok: boolean }) {
  return (
    <View style={[s.extraItem, { backgroundColor: ok ? PDF_THEME.greenDim : PDF_THEME.redDim }]}>
      <View style={[s.dot, { backgroundColor: ok ? PDF_THEME.green : PDF_THEME.red }]} />
      <Text style={[s.extraText, { color: ok ? PDF_THEME.green : PDF_THEME.red }]}>{label}</Text>
    </View>
  );
}

interface AnnexePageProps {
  technicalChecks: AuditCheckItem[];
  seoChecks: AuditCheckItem[];
  technicalExtras: TechnicalExtras;
  competitors: CompetitorData[];
  dealerName: string;
  googleProfile: GoogleProfileData;
  pageNumber: number;
  totalPages: number;
}

export function AnnexePage({
  technicalChecks,
  seoChecks,
  technicalExtras,
  competitors,
  dealerName,
  googleProfile,
  pageNumber,
  totalPages,
}: AnnexePageProps) {
  return (
    <Page size="A4" style={s.page}>
      <PageHeader pageNumber={pageNumber} totalPages={totalPages} />
      <SectionTitle title="Annexe Technique" subtitle="Donnees detaillees de l'audit" />

      <Text style={s.intro}>
        Cette annexe compile l'ensemble des verifications techniques et SEO realisees sur le site de {dealerName}. Ces donnees servent de base aux scores et recommandations presentes dans les pages precedentes.
      </Text>

      {/* Technical extras */}
      <Text style={s.sLabel}>Infrastructure detectee</Text>
      <View style={s.extrasGrid}>
        <ExtraChip label="HTTPS / SSL" ok={technicalExtras.sslValid} />
        <ExtraChip label="Bandeau cookies RGPD" ok={technicalExtras.hasCookieBanner} />
        <ExtraChip label="Google Analytics" ok={technicalExtras.hasGoogleAnalytics} />
        <ExtraChip label="Google Tag Manager" ok={technicalExtras.hasGoogleTagManager} />
        <ExtraChip label="Sitemap XML" ok={technicalExtras.hasSitemap} />
        <ExtraChip label="Robots.txt" ok={technicalExtras.hasRobotsTxt} />
      </View>

      <View style={s.divider} />

      {/* Technical checks table */}
      <Text style={s.sLabel}>Audit technique ({technicalChecks.length} points)</Text>
      <View style={s.tblHead}>
        <Text style={[s.tblTh, { flex: 2 }]}>Critere</Text>
        <Text style={[s.tblTh, { flex: 4 }]}>Detail</Text>
        <Text style={[s.tblTh, { flex: 1, textAlign: "right" }]}>Statut</Text>
      </View>
      {technicalChecks.map((c, i) => (
        <View key={i} style={[s.tblRow, i % 2 !== 0 ? { backgroundColor: PDF_THEME.sectionBg } : {}]}>
          <Text style={[s.tblCell, { flex: 2, fontWeight: 500, color: PDF_THEME.textPrimary }]}>{c.label}</Text>
          <Text style={[s.tblCell, { flex: 4, fontSize: 5.5 }]}>{c.detail}</Text>
          <View style={{ flex: 1, alignItems: "flex-end" }}><StatusBadge status={c.status} /></View>
        </View>
      ))}

      <View style={s.divider} />

      {/* SEO checks table */}
      <Text style={s.sLabel}>SEO On-Page ({seoChecks.length} points)</Text>
      <View style={s.tblHead}>
        <Text style={[s.tblTh, { flex: 2 }]}>Critere</Text>
        <Text style={[s.tblTh, { flex: 4 }]}>Detail</Text>
        <Text style={[s.tblTh, { flex: 1, textAlign: "right" }]}>Statut</Text>
      </View>
      {seoChecks.map((c, i) => (
        <View key={i} style={[s.tblRow, i % 2 !== 0 ? { backgroundColor: PDF_THEME.sectionBg } : {}]}>
          <Text style={[s.tblCell, { flex: 2, fontWeight: 500, color: PDF_THEME.textPrimary }]}>{c.label}</Text>
          <Text style={[s.tblCell, { flex: 4, fontSize: 5.5 }]}>{c.detail}</Text>
          <View style={{ flex: 1, alignItems: "flex-end" }}><StatusBadge status={c.status} /></View>
        </View>
      ))}

      {/* Competitor raw data */}
      {competitors.length > 0 && (
        <>
          <View style={s.divider} />
          <Text style={s.sLabel}>Donnees concurrentielles brutes ({competitors.length} concurrents)</Text>
          <View style={s.tblHead}>
            <Text style={[s.tblTh, { flex: 3 }]}>Concession</Text>
            <Text style={[s.tblTh, { flex: 1.5, textAlign: "center" }]}>Note Google</Text>
            <Text style={[s.tblTh, { flex: 1.5, textAlign: "center" }]}>Nb avis</Text>
            <Text style={[s.tblTh, { flex: 1.5, textAlign: "center" }]}>PageSpeed</Text>
          </View>
          {/* Prospect row */}
          <View style={[s.compRow, s.highlight]}>
            <Text style={[s.compCell, { flex: 3, textAlign: "left", fontWeight: 600 }]}>{dealerName} (vous)</Text>
            <Text style={[s.compCell, { flex: 1.5 }]}>{googleProfile.rating?.toFixed(1) ?? "\u2014"}</Text>
            <Text style={[s.compCell, { flex: 1.5 }]}>{googleProfile.reviewCount ?? "\u2014"}</Text>
            <Text style={[s.compCell, { flex: 1.5 }]}>{"\u2014"}</Text>
          </View>
          {competitors.map((c, i) => (
            <View key={i} style={s.compRow}>
              <Text style={[s.compCell, { flex: 3, textAlign: "left" }]}>{c.name}</Text>
              <Text style={[s.compCell, { flex: 1.5 }]}>{c.googleRating?.toFixed(1) ?? "\u2014"}</Text>
              <Text style={[s.compCell, { flex: 1.5 }]}>{c.googleReviewCount ?? "\u2014"}</Text>
              <Text style={[s.compCell, { flex: 1.5 }]}>{c.pageSpeedScore !== null ? `${c.pageSpeedScore}` : "\u2014"}</Text>
            </View>
          ))}
        </>
      )}
    </Page>
  );
}

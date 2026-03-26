import React from "react";
import { Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import { PDF_THEME, scoreColor, statusColor, statusLabel } from "../theme";
import { PageHeader } from "../components/PageHeader";
import { SectionTitle } from "../components/SectionTitle";
import { ScoreGauge } from "../components/ScoreGauge";
import { MarcusComment } from "../components/MarcusComment";
import type { AuditCheckItem } from "../../types";

const s = StyleSheet.create({
  page: { backgroundColor: PDF_THEME.pageBg, padding: PDF_THEME.margin },
  scoreRow: { flexDirection: "row", gap: 16, marginBottom: 8, alignItems: "center" },
  summaryText: { fontFamily: PDF_THEME.fontFamily, fontSize: 8, color: PDF_THEME.textSecondary, lineHeight: 1.6, flex: 1 },
  barsContainer: { gap: 5, marginBottom: 8 },
  barRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  barLabel: { fontFamily: PDF_THEME.fontFamily, fontSize: 7, fontWeight: 500, color: PDF_THEME.textPrimary, width: 52 },
  barTrack: { flex: 1, height: 6, backgroundColor: PDF_THEME.borderLight, borderRadius: 3 },
  barFill: { height: 6, borderRadius: 3 },
  barScore: { fontFamily: PDF_THEME.fontFamily, fontSize: 7, fontWeight: 600, width: 28, textAlign: "right" },
  sLabel: { fontFamily: PDF_THEME.fontFamily, fontSize: 8, fontWeight: 600, color: PDF_THEME.textPrimary, marginBottom: 3, marginTop: 4 },
  checkRow: { flexDirection: "row", alignItems: "center", paddingVertical: 2.5, paddingHorizontal: 6, borderBottomWidth: 0.5, borderBottomColor: PDF_THEME.borderLight },
  checkLabel: { flex: 2.5, fontFamily: PDF_THEME.fontFamily, fontSize: 7, color: PDF_THEME.textPrimary },
  checkDetail: { flex: 4, fontFamily: PDF_THEME.fontFamily, fontSize: 6, color: PDF_THEME.textMuted },
  checkStatus: { flex: 1, alignItems: "flex-end" },
  statusDot: { flexDirection: "row", alignItems: "center", gap: 2, paddingHorizontal: 3, paddingVertical: 1, borderRadius: 2 },
  statusText: { fontFamily: PDF_THEME.fontFamily, fontSize: 5.5, fontWeight: 600 },
  dot: { width: 3, height: 3, borderRadius: 1.5 },
  divider: { height: 0.5, backgroundColor: PDF_THEME.border, marginVertical: 4 },
});

interface SynthesePageProps {
  globalScore: number;
  subScores: { technique: number; seo: number; local: number };
  dealerName: string;
  technicalChecks: AuditCheckItem[];
  seoChecks: AuditCheckItem[];
  executiveSummary: string;
  technicalVerdict: string;
  seoVerdict: string;
  pageNumber: number;
  totalPages: number;
}

function StatusBadge({ status }: { status: AuditCheckItem["status"] }) {
  return (
    <View style={[s.statusDot, { backgroundColor: status === "ok" ? PDF_THEME.greenDim : status === "warn" ? PDF_THEME.yellowDim : PDF_THEME.redDim }]}>
      <View style={[s.dot, { backgroundColor: statusColor(status) }]} />
      <Text style={[s.statusText, { color: statusColor(status) }]}>{statusLabel(status)}</Text>
    </View>
  );
}

export function SynthesePage({ globalScore, subScores, dealerName, technicalChecks, seoChecks, executiveSummary, technicalVerdict, seoVerdict, pageNumber, totalPages }: SynthesePageProps) {
  return (
    <Page size="A4" style={s.page}>
      <PageHeader pageNumber={pageNumber} totalPages={totalPages} />

      <SectionTitle title="Synthese Executive" subtitle={dealerName} />

      <View style={s.scoreRow}>
        <ScoreGauge score={globalScore} size={68} />
        <Text style={s.summaryText}>{executiveSummary}</Text>
      </View>

      <View style={s.barsContainer}>
        {[{ label: "Technique", score: subScores.technique }, { label: "SEO", score: subScores.seo }, { label: "Local", score: subScores.local }].map((b, i) => (
          <View key={i} style={s.barRow}>
            <Text style={s.barLabel}>{b.label}</Text>
            <View style={s.barTrack}><View style={[s.barFill, { width: `${Math.min(b.score, 100)}%`, backgroundColor: scoreColor(b.score) }]} /></View>
            <Text style={[s.barScore, { color: scoreColor(b.score) }]}>{b.score}</Text>
          </View>
        ))}
      </View>

      <View style={s.divider} />

      {/* Technical */}
      <Text style={s.sLabel}>{"Audit Technique (" + technicalChecks.length + " points)"}</Text>
      {technicalChecks.map((c, i) => (
        <View key={i} style={[s.checkRow, i % 2 === 0 ? {} : { backgroundColor: PDF_THEME.sectionBg }]}>
          <Text style={s.checkLabel}>{c.label}</Text>
          <Text style={s.checkDetail}>{c.detail}</Text>
          <View style={s.checkStatus}><StatusBadge status={c.status} /></View>
        </View>
      ))}
      <MarcusComment text={technicalVerdict} />

      <View style={s.divider} />

      {/* SEO */}
      <Text style={s.sLabel}>{"SEO On-Page (" + seoChecks.length + " points)"}</Text>
      {seoChecks.map((c, i) => (
        <View key={i} style={[s.checkRow, i % 2 === 0 ? {} : { backgroundColor: PDF_THEME.sectionBg }]}>
          <Text style={s.checkLabel}>{c.label}</Text>
          <Text style={s.checkDetail}>{c.detail}</Text>
          <View style={s.checkStatus}><StatusBadge status={c.status} /></View>
        </View>
      ))}
      <MarcusComment text={seoVerdict} />
    </Page>
  );
}

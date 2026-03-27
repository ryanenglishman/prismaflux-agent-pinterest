import React from "react";
import { Page, View, Text, Image, StyleSheet } from "@react-pdf/renderer";
import { PDF_THEME, scoreColor } from "../theme";
import { PageHeader } from "../components/PageHeader";
import { SectionTitle } from "../components/SectionTitle";
import { ScoreGauge } from "../components/ScoreGauge";
import { MarcusComment } from "../components/MarcusComment";

const s = StyleSheet.create({
  page: { backgroundColor: PDF_THEME.pageBg, padding: PDF_THEME.margin },
  // Score row
  scoreRow: { flexDirection: "row", gap: 14, marginBottom: 8, alignItems: "flex-start" },
  scoreCol: { alignItems: "center" },
  summaryCol: { flex: 1 },
  summaryText: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 7.5,
    color: PDF_THEME.textSecondary,
    lineHeight: 1.65,
  },
  // Sub-scores
  barsContainer: { gap: 5, marginBottom: 8, marginTop: 4 },
  barRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  barLabel: { fontFamily: PDF_THEME.fontFamily, fontSize: 7, fontWeight: 500, color: PDF_THEME.textPrimary, width: 55 },
  barTrack: { flex: 1, height: 6, backgroundColor: PDF_THEME.borderLight, borderRadius: 3 },
  barFill: { height: 6, borderRadius: 3 },
  barScore: { fontFamily: PDF_THEME.fontFamily, fontSize: 7, fontWeight: 600, width: 28, textAlign: "right" },
  divider: { height: 0.5, backgroundColor: PDF_THEME.border, marginVertical: 6 },
  // Key findings
  findingsLabel: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 8,
    fontWeight: 600,
    color: PDF_THEME.textPrimary,
    marginBottom: 5,
  },
  findingItem: {
    flexDirection: "row",
    gap: 6,
    marginBottom: 4,
    alignItems: "flex-start",
  },
  findingNum: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 9,
    fontWeight: 700,
    color: PDF_THEME.brand,
    width: 14,
  },
  findingText: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 7,
    color: PDF_THEME.textSecondary,
    lineHeight: 1.55,
    flex: 1,
  },
  // Transition
  transitionBox: {
    padding: 8,
    backgroundColor: PDF_THEME.sectionBg,
    borderRadius: 4,
    borderLeftWidth: 2,
    borderLeftColor: PDF_THEME.brand,
    marginTop: 6,
  },
  transitionText: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 7,
    color: PDF_THEME.textSecondary,
    lineHeight: 1.55,
    fontWeight: 500,
  },
  // Note referencing annexe
  annexeNote: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 6,
    color: PDF_THEME.textMuted,
    marginTop: 6,
  },
  // Screenshot
  screenshotContainer: {
    marginBottom: 6,
    borderRadius: 4,
    overflow: "hidden",
    borderWidth: 0.5,
    borderColor: PDF_THEME.borderLight,
  },
  screenshotImage: {
    width: "100%",
    height: 120,
  },
  screenshotLabel: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 5.5,
    color: PDF_THEME.textMuted,
    textAlign: "center",
    paddingVertical: 2,
    backgroundColor: PDF_THEME.sectionBg,
  },
  // Indexed pages chip
  indexedChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 3,
    backgroundColor: PDF_THEME.sectionBg,
    marginBottom: 6,
    alignSelf: "flex-start",
  },
  indexedNum: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 9,
    fontWeight: 700,
  },
  indexedLabel: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 6,
    color: PDF_THEME.textMuted,
  },
});

interface SynthesePageProps {
  globalScore: number;
  subScores: { technique: number; seo: number; local: number };
  dealerName: string;
  executiveSummary: string;
  keyFindings: string[];
  syntheseTransition: string;
  screenshotDesktop: string | null;
  indexedPages: number | null;
  pageNumber: number;
  totalPages: number;
}

export function SynthesePage({
  globalScore,
  subScores,
  dealerName,
  executiveSummary,
  keyFindings,
  syntheseTransition,
  screenshotDesktop,
  indexedPages,
  pageNumber,
  totalPages,
}: SynthesePageProps) {
  return (
    <Page size="A4" style={s.page}>
      <PageHeader pageNumber={pageNumber} totalPages={totalPages} />

      <SectionTitle title="Synthese Executive" subtitle={`Evaluation de la presence digitale de ${dealerName}`} />

      {/* Score + summary side by side */}
      <View style={s.scoreRow}>
        <View style={s.scoreCol}>
          <ScoreGauge score={globalScore} size={72} />
        </View>
        <View style={s.summaryCol}>
          <Text style={s.summaryText}>{executiveSummary}</Text>
        </View>
      </View>

      {/* Sub-scores */}
      <View style={s.barsContainer}>
        {[
          { label: "Technique", score: subScores.technique },
          { label: "SEO", score: subScores.seo },
          { label: "Local", score: subScores.local },
        ].map((b, i) => (
          <View key={i} style={s.barRow}>
            <Text style={s.barLabel}>{b.label}</Text>
            <View style={s.barTrack}>
              <View style={[s.barFill, { width: `${Math.min(b.score, 100)}%`, backgroundColor: scoreColor(b.score) }]} />
            </View>
            <Text style={[s.barScore, { color: scoreColor(b.score) }]}>{b.score}</Text>
          </View>
        ))}
      </View>

      <View style={s.divider} />

      {/* Key findings */}
      <Text style={s.findingsLabel}>Constats principaux</Text>
      {keyFindings.map((finding, i) => (
        <View key={i} style={s.findingItem}>
          <Text style={s.findingNum}>{i + 1}</Text>
          <Text style={s.findingText}>{finding}</Text>
        </View>
      ))}

      {/* Screenshot + indexed pages */}
      {(screenshotDesktop || indexedPages !== null) && (
        <View style={{ flexDirection: "row", gap: 8, marginTop: 6 }}>
          {screenshotDesktop && (
            <View style={[s.screenshotContainer, { flex: 2 }]}>
              <Image src={screenshotDesktop} style={s.screenshotImage} />
              <Text style={s.screenshotLabel}>Apercu de votre site web</Text>
            </View>
          )}
          {indexedPages !== null && (
            <View style={[s.indexedChip, { flexDirection: "column", flex: 1, alignSelf: "flex-start" }]}>
              <Text style={[s.indexedNum, { color: indexedPages > 20 ? scoreColor(70) : indexedPages > 5 ? scoreColor(50) : scoreColor(20) }]}>
                {indexedPages}
              </Text>
              <Text style={s.indexedLabel}>pages indexees Google</Text>
            </View>
          )}
        </View>
      )}

      <Text style={s.annexeNote}>
        Les details techniques complets (verifications individuelles, statuts, recommandations) sont disponibles en annexe a la fin de ce rapport.
      </Text>

      <View style={s.divider} />

      {/* Transition to next section */}
      <View style={s.transitionBox}>
        <Text style={s.transitionText}>{syntheseTransition}</Text>
      </View>
    </Page>
  );
}

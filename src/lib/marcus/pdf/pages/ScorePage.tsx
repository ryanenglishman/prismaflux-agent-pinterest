import React from "react";
import { Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import { PDF_THEME, scoreColor } from "../theme";
import { ScoreGauge } from "../components/ScoreGauge";
import { Logo } from "../components/Logo";
import { SectionTitle } from "../components/SectionTitle";

const s = StyleSheet.create({
  page: {
    backgroundColor: PDF_THEME.pageBg,
    padding: PDF_THEME.margin,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  pageNum: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 8,
    color: PDF_THEME.textMuted,
  },
  scoreRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 32,
    marginVertical: 20,
    paddingHorizontal: 16,
  },
  summary: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 10,
    color: PDF_THEME.textSecondary,
    lineHeight: 1.6,
    flex: 1,
  },
  barsContainer: {
    marginTop: 24,
    gap: 10,
  },
  barRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  barLabel: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 9,
    fontWeight: 500,
    color: PDF_THEME.textPrimary,
    width: 70,
  },
  barTrack: {
    flex: 1,
    height: 10,
    backgroundColor: PDF_THEME.borderLight,
    borderRadius: 5,
  },
  barFill: {
    height: 10,
    borderRadius: 5,
  },
  barScore: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 9,
    fontWeight: 600,
    width: 32,
    textAlign: "right",
  },
  detailSection: {
    marginTop: 28,
    padding: 14,
    backgroundColor: PDF_THEME.sectionBg,
    borderRadius: 6,
    borderLeftWidth: 3,
    borderLeftColor: PDF_THEME.marcusBlue,
  },
  detailTitle: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 9,
    fontWeight: 600,
    color: PDF_THEME.textPrimary,
    marginBottom: 6,
  },
  detailText: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 8,
    color: PDF_THEME.textSecondary,
    lineHeight: 1.6,
  },
});

interface ScorePageProps {
  globalScore: number;
  subScores: { technique: number; seo: number; local: number };
  dealerName: string;
  pageNumber?: number;
  totalPages?: number;
}

function ScoreBar({ label, score }: { label: string; score: number }) {
  const color = scoreColor(score);
  return (
    <View style={s.barRow}>
      <Text style={s.barLabel}>{label}</Text>
      <View style={s.barTrack}>
        <View
          style={[s.barFill, { width: `${Math.min(score, 100)}%`, backgroundColor: color }]}
        />
      </View>
      <Text style={[s.barScore, { color }]}>{score}/100</Text>
    </View>
  );
}

export function ScorePage({
  globalScore,
  subScores,
  dealerName,
  pageNumber = 2,
  totalPages = 14,
}: ScorePageProps) {
  return (
    <Page size="A4" style={s.page}>
      <View style={s.header}>
        <Logo size="small" />
        <Text style={s.pageNum}>{pageNumber} / {totalPages}</Text>
      </View>

      <SectionTitle
        title="Score Global"
        subtitle={`Evaluation de la presence digitale de ${dealerName}`}
      />

      <View style={s.scoreRow}>
        <ScoreGauge score={globalScore} size={100} />
        <Text style={s.summary}>
          {globalScore >= 70
            ? `${dealerName} dispose d'une presence en ligne solide. Des optimisations ciblees permettraient d'accroitre davantage la visibilite et de devancer les concurrents locaux.`
            : globalScore >= 50
              ? `Le site de ${dealerName} possede des bases correctes, mais plusieurs points techniques et SEO freinent significativement la visibilite en ligne. Des interventions ciblees sont recommandees.`
              : `La presence digitale de ${dealerName} necessite des ameliorations significatives. L'ecart avec les concurrents se creuse chaque mois sans action corrective.`}
        </Text>
      </View>

      <View style={s.barsContainer}>
        <ScoreBar label="Technique" score={subScores.technique} />
        <ScoreBar label="SEO" score={subScores.seo} />
        <ScoreBar label="Local" score={subScores.local} />
      </View>

      <View style={s.detailSection}>
        <Text style={s.detailTitle}>Comment lire ce rapport</Text>
        <Text style={s.detailText}>
          Ce rapport analyse trois dimensions de votre presence digitale. Le score Technique evalue la performance, la securite et la conformite de votre site. Le score SEO mesure l'optimisation pour les moteurs de recherche. Le score Local evalue votre visibilite dans les recherches geographiques. Chaque section propose des recommandations concretes et hierarchisees.
        </Text>
      </View>
    </Page>
  );
}

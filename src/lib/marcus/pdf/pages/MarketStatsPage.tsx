import React from "react";
import { Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import { PDF_THEME } from "../theme";
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
    marginBottom: 20,
  },
  pageNum: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 8,
    color: PDF_THEME.textMuted,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 14,
  },
  statCard: {
    width: "48%",
    padding: 12,
    borderRadius: 6,
    borderWidth: 0.5,
    borderColor: PDF_THEME.border,
    backgroundColor: PDF_THEME.sectionBg,
  },
  statRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 4,
    marginBottom: 4,
  },
  statNumber: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 20,
    fontWeight: 700,
  },
  statUnit: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 9,
    color: PDF_THEME.textMuted,
  },
  statTitle: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 8,
    fontWeight: 600,
    color: PDF_THEME.textPrimary,
    marginBottom: 3,
  },
  statDescription: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 7,
    color: PDF_THEME.textSecondary,
    lineHeight: 1.5,
  },
  // Accent section
  accentBox: {
    padding: 14,
    borderRadius: 6,
    backgroundColor: PDF_THEME.marcusBlueDim,
    borderLeftWidth: 3,
    borderLeftColor: PDF_THEME.marcusBlue,
    marginBottom: 14,
  },
  accentRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 4,
    marginBottom: 4,
  },
  accentNumber: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 22,
    fontWeight: 700,
    color: PDF_THEME.marcusBlue,
  },
  accentTitle: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 9,
    fontWeight: 600,
    color: PDF_THEME.textPrimary,
    marginBottom: 3,
  },
  accentText: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 8,
    color: PDF_THEME.textSecondary,
    lineHeight: 1.5,
  },
  // Comparison
  compBox: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 14,
  },
  compCard: {
    flex: 1,
    padding: 10,
    borderRadius: 6,
    borderWidth: 0.5,
    borderColor: PDF_THEME.border,
    alignItems: "center",
  },
  compNumber: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 16,
    fontWeight: 700,
    marginBottom: 2,
  },
  compLabel: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 7,
    fontWeight: 600,
    color: PDF_THEME.textPrimary,
    textAlign: "center",
    marginBottom: 2,
  },
  compDesc: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 7,
    color: PDF_THEME.textMuted,
    textAlign: "center",
    lineHeight: 1.4,
  },
  // Source
  sourceText: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 6,
    color: PDF_THEME.textMuted,
    marginTop: 4,
  },
});

interface MarketStatsPageProps {
  pageNumber: number;
  totalPages: number;
}

const STATS = [
  { number: "92", unit: "%", title: "Recherche en ligne avant achat", description: "des acheteurs de voitures effectuent des recherches en ligne avant de se rendre en concession.", color: PDF_THEME.marcusBlue },
  { number: "53", unit: "%", title: "Abandon au-dela de 3 secondes", description: "des visiteurs mobiles quittent un site dont le chargement depasse 3 secondes.", color: PDF_THEME.red },
  { number: "31", unit: "%", title: "Clics sur le 1er resultat", description: "des clics de recherche Google vont au premier resultat organique. Le 2e n'en capte que 15%.", color: PDF_THEME.yellow },
  { number: "4.3", unit: "x", title: "Effet des avis Google", description: "Les garages avec 100+ avis et une note >4.3 recoivent 4.3 fois plus d'appels entrants.", color: PDF_THEME.green },
];

export function MarketStatsPage({ pageNumber, totalPages }: MarketStatsPageProps) {
  return (
    <Page size="A4" style={s.page}>
      <View style={s.header}>
        <Logo size="small" />
        <Text style={s.pageNum}>{pageNumber} / {totalPages}</Text>
      </View>

      <SectionTitle
        title="Contexte Marche"
        subtitle="Chiffres cles du parcours d'achat automobile en ligne"
      />

      {/* Accent */}
      <View style={s.accentBox}>
        <View style={s.accentRow}>
          <Text style={s.accentNumber}>78%</Text>
          <Text style={s.statUnit}>des concessionnaires</Text>
        </View>
        <Text style={s.accentTitle}>n'exploitent pas le digital a son plein potentiel</Text>
        <Text style={s.accentText}>
          La majorite des garages et concessionnaires belges n'ont pas de strategie digitale structuree.
          Ceux qui investissent maintenant prennent une avance decisive et difficilement rattrapable.
        </Text>
      </View>

      {/* Stats grid */}
      <View style={s.grid}>
        {STATS.map((stat, i) => (
          <View key={i} style={s.statCard}>
            <View style={s.statRow}>
              <Text style={[s.statNumber, { color: stat.color }]}>{stat.number}</Text>
              <Text style={s.statUnit}>{stat.unit}</Text>
            </View>
            <Text style={s.statTitle}>{stat.title}</Text>
            <Text style={s.statDescription}>{stat.description}</Text>
          </View>
        ))}
      </View>

      {/* Manual vs automated */}
      <View style={s.compBox}>
        <View style={[s.compCard, { backgroundColor: PDF_THEME.redDim }]}>
          <Text style={[s.compNumber, { color: PDF_THEME.red }]}>25 min</Text>
          <Text style={s.compLabel}>Publication manuelle (AutoScout24)</Text>
          <Text style={s.compDesc}>50-60 champs a remplir, photos a uploader, descriptions a rediger manuellement</Text>
        </View>
        <View style={[s.compCard, { backgroundColor: PDF_THEME.greenDim }]}>
          <Text style={[s.compNumber, { color: PDF_THEME.green }]}>30 sec</Text>
          <Text style={s.compLabel}>Publication avec PrismaFlux</Text>
          <Text style={s.compDesc}>Remplissage automatique, textes optimises par l'IA, diffusion multi-plateforme simultanee</Text>
        </View>
      </View>

      <Text style={s.sourceText}>
        Sources : Google Consumer Insights 2024, BrightLocal 2024, Think with Google, Febiac
      </Text>
    </Page>
  );
}

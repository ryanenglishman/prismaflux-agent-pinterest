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
    marginBottom: 32,
  },
  pageNum: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 9,
    color: PDF_THEME.textMuted,
  },
  statRow: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  statNumber: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 28,
    fontWeight: 700,
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 9,
    color: PDF_THEME.textSecondary,
    textAlign: "center",
  },
  subTitle: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 12,
    fontWeight: 600,
    color: PDF_THEME.textPrimary,
    marginBottom: 10,
    marginTop: 8,
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 20,
  },
  tagFound: {
    backgroundColor: PDF_THEME.greenDim,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
  },
  tagFoundText: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 9,
    fontWeight: 500,
    color: PDF_THEME.green,
  },
  tagMissing: {
    backgroundColor: PDF_THEME.redDim,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
  },
  tagMissingText: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 9,
    fontWeight: 500,
    color: PDF_THEME.red,
  },
  tipBox: {
    backgroundColor: PDF_THEME.marcusBlueDim,
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
  },
  tipTitle: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 10,
    fontWeight: 700,
    color: PDF_THEME.marcusBlue,
    marginBottom: 6,
  },
  tipText: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 9,
    color: PDF_THEME.textPrimary,
    lineHeight: 1.6,
  },
});

interface LocalPresencePageProps {
  cityMentions: number;
  serviceMentions: string[];
  missingKeywords: string[];
  dealerCity: string;
  pageNumber?: number;
  totalPages?: number;
}

export function LocalPresencePage({
  cityMentions,
  serviceMentions,
  missingKeywords,
  dealerCity,
  pageNumber = 5,
  totalPages = 14,
}: LocalPresencePageProps) {
  return (
    <Page size="A4" style={s.page}>
      <View style={s.header}>
        <Logo size="small" />
        <Text style={s.pageNum}>{pageNumber} / {totalPages}</Text>
      </View>

      <SectionTitle
        title="Presence Locale"
        subtitle={`Visibilite dans les recherches locales autour de ${dealerCity}`}
      />

      <View style={s.statRow}>
        <View style={[s.statCard, { backgroundColor: PDF_THEME.sectionBg }]}>
          <Text style={[s.statNumber, { color: cityMentions >= 5 ? PDF_THEME.green : PDF_THEME.red }]}>
            {cityMentions}
          </Text>
          <Text style={s.statLabel}>
            mentions de "{dealerCity}" sur votre site
          </Text>
        </View>
        <View style={[s.statCard, { backgroundColor: PDF_THEME.sectionBg }]}>
          <Text style={[s.statNumber, { color: PDF_THEME.green }]}>
            {serviceMentions.length}
          </Text>
          <Text style={s.statLabel}>services mentionnes</Text>
        </View>
        <View style={[s.statCard, { backgroundColor: PDF_THEME.sectionBg }]}>
          <Text style={[s.statNumber, { color: PDF_THEME.red }]}>
            {missingKeywords.length}
          </Text>
          <Text style={s.statLabel}>mots-cles manquants</Text>
        </View>
      </View>

      <Text style={s.subTitle}>Services trouves sur votre site</Text>
      <View style={s.tagContainer}>
        {serviceMentions.map((kw, i) => (
          <View key={i} style={s.tagFound}>
            <Text style={s.tagFoundText}>{kw}</Text>
          </View>
        ))}
      </View>

      <Text style={s.subTitle}>Mots-cles manquants (opportunites)</Text>
      <View style={s.tagContainer}>
        {missingKeywords.map((kw, i) => (
          <View key={i} style={s.tagMissing}>
            <Text style={s.tagMissingText}>{kw}</Text>
          </View>
        ))}
      </View>

      <View style={s.tipBox}>
        <Text style={s.tipTitle}>Pourquoi c'est important ?</Text>
        <Text style={s.tipText}>
          90% des recherches automobiles commencent en ligne. Un client qui tape
          "garage {dealerCity}" ou "voiture occasion {dealerCity}" doit trouver
          VOTRE site en premier. Chaque mot-cle manquant est un client potentiel
          qui atterrit chez un concurrent.
        </Text>
      </View>
    </Page>
  );
}

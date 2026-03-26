import React from "react";
import { Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import { PDF_THEME } from "../theme";
import { Logo } from "../components/Logo";
import { SectionTitle } from "../components/SectionTitle";
import { CompetitorRow } from "../components/CompetitorRow";
import type { CompetitorData, GoogleProfileData } from "../../types";

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
  // Google profile card
  profileCard: {
    flexDirection: "row",
    gap: 16,
    padding: 16,
    backgroundColor: PDF_THEME.sectionBg,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  profileRating: {
    alignItems: "center",
    padding: 12,
    backgroundColor: PDF_THEME.pageBg,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: PDF_THEME.border,
  },
  profileRatingNumber: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 32,
    fontWeight: 700,
    color: PDF_THEME.yellow,
  },
  profileRatingLabel: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 8,
    color: PDF_THEME.textMuted,
    marginTop: 2,
  },
  profileInfo: {
    flex: 1,
  },
  profileLabel: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 10,
    fontWeight: 600,
    color: PDF_THEME.textPrimary,
    marginBottom: 4,
  },
  profileDetail: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 9,
    color: PDF_THEME.textSecondary,
    lineHeight: 1.5,
  },
  // Table
  table: {
    borderWidth: 1,
    borderColor: PDF_THEME.border,
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 24,
  },
  tableHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: PDF_THEME.sectionBg,
    borderBottomWidth: 1,
    borderBottomColor: PDF_THEME.border,
  },
  thName: {
    flex: 3,
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 8,
    fontWeight: 700,
    color: PDF_THEME.textMuted,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  th: {
    flex: 1.5,
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 8,
    fontWeight: 700,
    color: PDF_THEME.textMuted,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    textAlign: "center",
  },
  insightBox: {
    backgroundColor: PDF_THEME.yellowDim,
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: PDF_THEME.yellow,
  },
  insightTitle: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 11,
    fontWeight: 700,
    color: PDF_THEME.textPrimary,
    marginBottom: 6,
  },
  insightText: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 10,
    color: PDF_THEME.textSecondary,
    lineHeight: 1.6,
  },
});

interface CompetitorPageProps {
  dealerName: string;
  competitors: CompetitorData[];
  googleProfile?: GoogleProfileData;
  pageNumber?: number;
  totalPages?: number;
}

export function CompetitorPage({
  dealerName,
  competitors,
  googleProfile,
  pageNumber = 7,
  totalPages = 14,
}: CompetitorPageProps) {
  const dealerRow: CompetitorData = {
    name: `${dealerName} (vous)`,
    googleRating: googleProfile?.rating ?? null,
    googleReviewCount: googleProfile?.reviewCount ?? null,
    pageSpeedScore: null,
    hasLocalBusiness: false,
  };

  const competitorReviews = competitors
    .map((c) => c.googleReviewCount ?? 0)
    .filter((n) => n > 0);
  const avgReviews = competitorReviews.length > 0
    ? Math.round(competitorReviews.reduce((a, b) => a + b, 0) / competitorReviews.length)
    : 0;

  return (
    <Page size="A4" style={s.page}>
      <View style={s.header}>
        <Logo size="small" />
        <Text style={s.pageNum}>{pageNumber} / {totalPages}</Text>
      </View>

      <SectionTitle
        title="Analyse Concurrentielle"
        subtitle="Comparaison avec vos principaux concurrents locaux"
      />

      {/* Google profile card */}
      {googleProfile && (googleProfile.rating !== null || googleProfile.reviewCount !== null) && (
        <View style={s.profileCard}>
          <View style={s.profileRating}>
            <Text style={s.profileRatingNumber}>
              {googleProfile.rating !== null ? googleProfile.rating.toFixed(1) : "?"}
            </Text>
            <Text style={s.profileRatingLabel}>sur Google</Text>
          </View>
          <View style={s.profileInfo}>
            <Text style={s.profileLabel}>Votre fiche Google Business</Text>
            <Text style={s.profileDetail}>
              {googleProfile.reviewCount !== null
                ? `${googleProfile.reviewCount} avis clients`
                : "Nombre d'avis inconnu"}{" "}
              {googleProfile.rating !== null && googleProfile.rating < 4.3
                ? "— Objectif : atteindre 4.3 pour maximiser la confiance client."
                : googleProfile.rating !== null
                  ? "— Bonne note. Continuez a collecter des avis regulierement."
                  : ""}
            </Text>
          </View>
        </View>
      )}

      {/* Competitor table */}
      <View style={s.table}>
        <View style={s.tableHeaderRow}>
          <Text style={s.thName}>Concession</Text>
          <Text style={s.th}>Note Google</Text>
          <Text style={s.th}>Nb avis</Text>
          <Text style={s.th}>PageSpeed</Text>
          <Text style={s.th}>Schema Local</Text>
        </View>
        <CompetitorRow data={dealerRow} highlight />
        {competitors.map((c, i) => (
          <CompetitorRow key={i} data={c} />
        ))}
      </View>

      <View style={s.insightBox}>
        <Text style={s.insightTitle}>Ce que cela signifie pour vous</Text>
        <Text style={s.insightText}>
          {avgReviews > 0
            ? `Vos concurrents ont en moyenne ${avgReviews} avis Google. Les clients font confiance aux garages avec plus de 100 avis et une note superieure a 4.3. Une strategie de collecte d'avis systematique peut combler cet ecart en 3-6 mois.`
            : `Les avis Google sont un facteur decisif dans le choix d'un concessionnaire. Les garages avec plus de 100 avis et une note superieure a 4.3 recoivent 4.3x plus d'appels. PrismaFlux automatise la sollicitation d'avis apres chaque vente.`
          }
        </Text>
      </View>
    </Page>
  );
}

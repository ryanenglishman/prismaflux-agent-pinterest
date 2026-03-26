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
  // Platforms table
  sectionLabel: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 9,
    fontWeight: 600,
    color: PDF_THEME.textPrimary,
    marginBottom: 8,
  },
  platformsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },
  platformCard: {
    width: "23%",
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderRadius: 6,
    borderWidth: 0.5,
    borderColor: PDF_THEME.border,
    backgroundColor: PDF_THEME.sectionBg,
    alignItems: "center",
    gap: 4,
  },
  platformDot: {
    width: 20,
    height: 20,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  platformInitial: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 10,
    fontWeight: 700,
    color: "#FFFFFF",
  },
  platformName: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 7,
    fontWeight: 500,
    color: PDF_THEME.textPrimary,
    textAlign: "center",
  },
  platformType: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 6,
    color: PDF_THEME.textMuted,
    textAlign: "center",
  },
  // Brands
  brandsContainer: {
    marginBottom: 14,
  },
  brandsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
  },
  brandTag: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    backgroundColor: PDF_THEME.marcusBlueDim,
  },
  brandTagText: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 7,
    fontWeight: 500,
    color: PDF_THEME.marcusBlue,
  },
  // AI badge
  aiBanner: {
    backgroundColor: "#18181B",
    padding: 14,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  aiIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: PDF_THEME.prismaRed,
    justifyContent: "center",
    alignItems: "center",
  },
  aiIconText: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 12,
    fontWeight: 700,
    color: "#FFFFFF",
  },
  aiContent: {
    flex: 1,
  },
  aiTitle: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 10,
    fontWeight: 600,
    color: "#FFFFFF",
    marginBottom: 3,
  },
  aiSubtitle: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 7,
    color: "#9CA3AF",
    lineHeight: 1.5,
  },
});

const PLATFORMS = [
  { name: "AutoScout24", type: "Annonces auto", color: "#FF6600" },
  { name: "GoCar.be", type: "Annonces BE", color: "#00B8D9" },
  { name: "LeBonCoin", type: "Petites annonces", color: "#FF6E14" },
  { name: "2ememain", type: "Annonces BE", color: "#00A8E6" },
  { name: "Facebook", type: "Marketplace", color: "#1877F2" },
  { name: "Instagram", type: "Reseau social", color: "#E4405F" },
  { name: "Google Business", type: "Fiche locale", color: "#4285F4" },
  { name: "Votre site", type: "Vitrine web", color: "#18181B" },
];

interface PlatformsPageProps {
  carBrands: string[];
  pageNumber: number;
  totalPages: number;
}

export function PlatformsPage({ carBrands, pageNumber, totalPages }: PlatformsPageProps) {
  return (
    <Page size="A4" style={s.page}>
      <View style={s.header}>
        <Logo size="small" />
        <Text style={s.pageNum}>{pageNumber} / {totalPages}</Text>
      </View>

      <SectionTitle
        title="Ecosysteme PrismaFlux"
        subtitle="Plateformes connectees et automatisees"
      />

      {/* Platforms */}
      <Text style={s.sectionLabel}>Diffusion automatisee sur 8 plateformes</Text>
      <View style={s.platformsGrid}>
        {PLATFORMS.map((p, i) => (
          <View key={i} style={s.platformCard}>
            <View style={[s.platformDot, { backgroundColor: p.color }]}>
              <Text style={s.platformInitial}>{p.name[0]}</Text>
            </View>
            <Text style={s.platformName}>{p.name}</Text>
            <Text style={s.platformType}>{p.type}</Text>
          </View>
        ))}
      </View>

      {/* Brands */}
      {carBrands.length > 0 && (
        <View style={s.brandsContainer}>
          <Text style={s.sectionLabel}>Marques detectees sur votre site ({carBrands.length})</Text>
          <View style={s.brandsGrid}>
            {carBrands.map((brand, i) => (
              <View key={i} style={s.brandTag}>
                <Text style={s.brandTagText}>{brand}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* AI banner */}
      <View style={s.aiBanner}>
        <View style={s.aiIcon}>
          <Text style={s.aiIconText}>IA</Text>
        </View>
        <View style={s.aiContent}>
          <Text style={s.aiTitle}>Ce rapport a ete genere automatiquement en 30 secondes</Text>
          <Text style={s.aiSubtitle}>
            Marcus, copilote IA PrismaFlux, a analyse votre site web, vos concurrents et le marche local pour produire ce rapport personnalise. Cette capacite d'analyse est disponible en continu pour piloter votre strategie digitale.
          </Text>
        </View>
      </View>
    </Page>
  );
}

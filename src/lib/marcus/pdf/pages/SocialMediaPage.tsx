import React from "react";
import { Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import { PDF_THEME } from "../theme";
import { Logo } from "../components/Logo";
import { SectionTitle } from "../components/SectionTitle";
import type { SocialMediaProfile } from "../../types";

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
  // Social table
  tableContainer: {
    borderWidth: 0.5,
    borderColor: PDF_THEME.border,
    borderRadius: 6,
    overflow: "hidden",
    marginBottom: 16,
  },
  tableHeaderRow: {
    flexDirection: "row",
    paddingVertical: 7,
    paddingHorizontal: 10,
    backgroundColor: PDF_THEME.sectionBg,
    borderBottomWidth: 0.5,
    borderBottomColor: PDF_THEME.border,
  },
  th: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 7,
    fontWeight: 600,
    color: PDF_THEME.textMuted,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 10,
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: PDF_THEME.borderLight,
  },
  platformCell: {
    flex: 1.5,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  platformDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  platformName: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 9,
    fontWeight: 500,
    color: PDF_THEME.textPrimary,
  },
  statusCell: {
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 3,
    alignSelf: "flex-start",
  },
  statusText: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 7,
    fontWeight: 600,
  },
  urlCell: {
    flex: 2,
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 7,
    color: PDF_THEME.textMuted,
  },
  // Why section
  whyContainer: {
    marginBottom: 14,
  },
  whyTitle: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 9,
    fontWeight: 600,
    color: PDF_THEME.textPrimary,
    marginBottom: 8,
  },
  whyGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  whyCard: {
    width: "48%",
    padding: 10,
    backgroundColor: PDF_THEME.sectionBg,
    borderRadius: 6,
  },
  whyCardTitle: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 8,
    fontWeight: 600,
    color: PDF_THEME.textPrimary,
    marginBottom: 3,
  },
  whyCardText: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 7,
    color: PDF_THEME.textSecondary,
    lineHeight: 1.5,
  },
  // Tip
  tipBox: {
    padding: 12,
    backgroundColor: PDF_THEME.marcusBlueDim,
    borderRadius: 6,
    borderLeftWidth: 3,
    borderLeftColor: PDF_THEME.marcusBlue,
  },
  tipTitle: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 8,
    fontWeight: 600,
    color: PDF_THEME.marcusBlue,
    marginBottom: 4,
  },
  tipText: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 7,
    color: PDF_THEME.textPrimary,
    lineHeight: 1.6,
  },
});

const PLATFORM_COLORS: Record<string, string> = {
  facebook: "#1877F2",
  instagram: "#E4405F",
  linkedin: "#0A66C2",
};

const PLATFORM_LABELS: Record<string, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  linkedin: "LinkedIn",
};

interface SocialMediaPageProps {
  socialMedia: SocialMediaProfile[];
  dealerName: string;
  pageNumber: number;
  totalPages: number;
}

export function SocialMediaPage({
  socialMedia,
  dealerName,
  pageNumber,
  totalPages,
}: SocialMediaPageProps) {
  const foundCount = socialMedia.filter((p) => p.found).length;

  return (
    <Page size="A4" style={s.page}>
      <View style={s.header}>
        <Logo size="small" />
        <Text style={s.pageNum}>{pageNumber} / {totalPages}</Text>
      </View>

      <SectionTitle
        title="Presence Reseaux Sociaux"
        subtitle={`${foundCount} sur ${socialMedia.length} plateformes detectees pour ${dealerName}`}
      />

      {/* Table */}
      <View style={s.tableContainer}>
        <View style={s.tableHeaderRow}>
          <Text style={[s.th, { flex: 1.5 }]}>Plateforme</Text>
          <Text style={[s.th, { flex: 1 }]}>Statut</Text>
          <Text style={[s.th, { flex: 2 }]}>Lien detecte</Text>
        </View>
        {socialMedia.map((profile, i) => {
          const color = PLATFORM_COLORS[profile.platform] ?? "#666";
          const label = PLATFORM_LABELS[profile.platform] ?? profile.platform;
          return (
            <View key={i} style={s.tableRow}>
              <View style={s.platformCell}>
                <View style={[s.platformDot, { backgroundColor: color }]} />
                <Text style={s.platformName}>{label}</Text>
              </View>
              <View style={s.statusCell}>
                <View style={[s.statusBadge, { backgroundColor: profile.found ? PDF_THEME.greenDim : PDF_THEME.redDim }]}>
                  <Text style={[s.statusText, { color: profile.found ? PDF_THEME.green : PDF_THEME.red }]}>
                    {profile.found ? "Detecte" : "Absent"}
                  </Text>
                </View>
              </View>
              <Text style={s.urlCell}>
                {profile.url ? profile.url.replace(/https?:\/\/(www\.)?/, "") : "—"}
              </Text>
            </View>
          );
        })}
      </View>

      {/* Why */}
      <View style={s.whyContainer}>
        <Text style={s.whyTitle}>Enjeux des reseaux sociaux pour un concessionnaire</Text>
        <View style={s.whyGrid}>
          <View style={s.whyCard}>
            <Text style={s.whyCardTitle}>Visibilite organique</Text>
            <Text style={s.whyCardText}>Chaque publication est une vitrine gratuite. Un vehicule bien presente sur Instagram ou Facebook peut generer 5 a 10 contacts qualifies.</Text>
          </View>
          <View style={s.whyCard}>
            <Text style={s.whyCardTitle}>Signal de confiance</Text>
            <Text style={s.whyCardText}>Les acheteurs consultent vos reseaux avant de visiter votre concession. Un profil actif rassure, un profil inactif dissuade.</Text>
          </View>
          <View style={s.whyCard}>
            <Text style={s.whyCardTitle}>Referencement indirect</Text>
            <Text style={s.whyCardText}>L'activite sur les reseaux sociaux envoie des signaux positifs aux moteurs de recherche et ameliore votre positionnement.</Text>
          </View>
          <View style={s.whyCard}>
            <Text style={s.whyCardTitle}>Relation client</Text>
            <Text style={s.whyCardText}>Repondre aux commentaires et messages renforce la proximite avec vos clients actuels et futurs.</Text>
          </View>
        </View>
      </View>

      {/* Tip */}
      <View style={s.tipBox}>
        <Text style={s.tipTitle}>Automatisation avec PrismaFlux</Text>
        <Text style={s.tipText}>
          Lana, copilote IA PrismaFlux, genere automatiquement des publications professionnelles pour chaque nouveau vehicule : photos retouchees, descriptions engageantes, et publication programmee. Plus besoin de gerer manuellement vos pages.
        </Text>
      </View>
    </Page>
  );
}

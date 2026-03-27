import React from "react";
import { Page, View, Text, Image, StyleSheet } from "@react-pdf/renderer";
import { PDF_THEME, scoreColor } from "../theme";
import { PageHeader } from "../components/PageHeader";
import { SectionTitle } from "../components/SectionTitle";
import { MarcusComment } from "../components/MarcusComment";
import type { SocialMediaProfile, GoogleProfileData, CompetitorInsightsData } from "../../types";

const s = StyleSheet.create({
  page: { backgroundColor: PDF_THEME.pageBg, padding: PDF_THEME.margin },
  sLabel: { fontFamily: PDF_THEME.fontFamily, fontSize: 8, fontWeight: 600, color: PDF_THEME.textPrimary, marginBottom: 3, marginTop: 6 },
  narrativeText: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 7,
    color: PDF_THEME.textSecondary,
    lineHeight: 1.6,
    marginBottom: 4,
  },
  // Stats row
  statsRow: { flexDirection: "row", gap: 6, marginBottom: 6 },
  statBox: { flex: 1, paddingVertical: 5, paddingHorizontal: 6, borderRadius: 4, backgroundColor: PDF_THEME.sectionBg, borderWidth: 0.5, borderColor: PDF_THEME.borderLight },
  statNum: { fontFamily: PDF_THEME.fontFamily, fontSize: 13, fontWeight: 700, marginBottom: 1 },
  statLbl: { fontFamily: PDF_THEME.fontFamily, fontSize: 6, color: PDF_THEME.textMuted },
  // Tags
  tagRow: { flexDirection: "row", flexWrap: "wrap", gap: 3, marginBottom: 4 },
  tagOk: { paddingHorizontal: 4, paddingVertical: 1.5, borderRadius: 2, backgroundColor: PDF_THEME.greenDim },
  tagOkText: { fontFamily: PDF_THEME.fontFamily, fontSize: 6, color: PDF_THEME.green },
  tagBad: { paddingHorizontal: 4, paddingVertical: 1.5, borderRadius: 2, backgroundColor: PDF_THEME.redDim },
  tagBadText: { fontFamily: PDF_THEME.fontFamily, fontSize: 6, color: PDF_THEME.red },
  divider: { height: 0.5, backgroundColor: PDF_THEME.border, marginVertical: 5 },
  // Social table
  tableRow: { flexDirection: "row", paddingVertical: 3, paddingHorizontal: 6, alignItems: "center", borderBottomWidth: 0.5, borderBottomColor: PDF_THEME.borderLight },
  cellPlatform: { flex: 1.5, flexDirection: "row", alignItems: "center", gap: 4 },
  cellDot: { width: 5, height: 5, borderRadius: 2.5 },
  cellName: { fontFamily: PDF_THEME.fontFamily, fontSize: 7, fontWeight: 500, color: PDF_THEME.textPrimary },
  cellStatus: { flex: 1 },
  badge: { paddingHorizontal: 4, paddingVertical: 1, borderRadius: 2, alignSelf: "flex-start" },
  badgeText: { fontFamily: PDF_THEME.fontFamily, fontSize: 6, fontWeight: 600 },
  cellUrl: { flex: 2, fontFamily: PDF_THEME.fontFamily, fontSize: 6, color: PDF_THEME.textMuted },
  // Competitor insights box
  insightsBox: { padding: 8, backgroundColor: PDF_THEME.sectionBg, borderRadius: 4, marginBottom: 4 },
  insightsRow: { flexDirection: "row", gap: 8, marginBottom: 4 },
  insightItem: { flex: 1, alignItems: "center" },
  insightNum: { fontFamily: PDF_THEME.fontFamily, fontSize: 11, fontWeight: 700, marginBottom: 1 },
  insightLbl: { fontFamily: PDF_THEME.fontFamily, fontSize: 5.5, color: PDF_THEME.textMuted, textAlign: "center" },
  // Transition
  transitionText: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 7,
    color: PDF_THEME.textSecondary,
    lineHeight: 1.55,
    fontWeight: 500,
    marginTop: 4,
  },
});

const PLATFORM_COLORS: Record<string, string> = { facebook: "#1877F2", instagram: "#E4405F", linkedin: "#0A66C2" };
const PLATFORM_LABELS: Record<string, string> = { facebook: "Facebook", instagram: "Instagram", linkedin: "LinkedIn" };

interface PresencePageProps {
  cityMentions: number;
  serviceMentions: string[];
  missingKeywords: string[];
  dealerCity: string;
  socialMedia: SocialMediaProfile[];
  googleProfile: GoogleProfileData;
  dealerName: string;
  localVerdict: string;
  socialVerdict: string;
  competitorVerdict: string;
  presenceTransition: string;
  competitorInsights: CompetitorInsightsData | null;
  mapDataUri: string | null;
  pageNumber: number;
  totalPages: number;
}

export function PresencePage({
  cityMentions,
  serviceMentions,
  missingKeywords,
  dealerCity,
  socialMedia,
  googleProfile,
  dealerName,
  localVerdict,
  socialVerdict,
  competitorVerdict,
  presenceTransition,
  competitorInsights,
  mapDataUri,
  pageNumber,
  totalPages,
}: PresencePageProps) {
  const ci = competitorInsights;

  return (
    <Page size="A4" style={s.page}>
      <PageHeader pageNumber={pageNumber} totalPages={totalPages} />
      <SectionTitle title="Votre Rayonnement Digital" subtitle={`Referencement local, reseaux sociaux et concurrence — ${dealerCity}`} />

      <Text style={s.narrativeText}>{presenceTransition}</Text>

      {/* Local stats */}
      <Text style={s.sLabel}>Ancrage geographique</Text>
      <View style={s.statsRow}>
        <View style={s.statBox}>
          <Text style={[s.statNum, { color: cityMentions >= 5 ? PDF_THEME.green : PDF_THEME.red }]}>{cityMentions}</Text>
          <Text style={s.statLbl}>mentions "{dealerCity}"</Text>
        </View>
        <View style={s.statBox}>
          <Text style={[s.statNum, { color: PDF_THEME.green }]}>{serviceMentions.length}</Text>
          <Text style={s.statLbl}>services detectes</Text>
        </View>
        <View style={s.statBox}>
          <Text style={[s.statNum, { color: PDF_THEME.red }]}>{missingKeywords.length}</Text>
          <Text style={s.statLbl}>mots-cles manquants</Text>
        </View>
        {googleProfile.rating !== null && (
          <View style={s.statBox}>
            <Text style={[s.statNum, { color: PDF_THEME.yellow }]}>{googleProfile.rating.toFixed(1)}</Text>
            <Text style={s.statLbl}>Google ({googleProfile.reviewCount ?? "?"} avis)</Text>
          </View>
        )}
      </View>

      <View style={s.tagRow}>
        {serviceMentions.map((kw, i) => <View key={i} style={s.tagOk}><Text style={s.tagOkText}>{kw}</Text></View>)}
        {missingKeywords.slice(0, 4).map((kw, i) => <View key={`m-${i}`} style={s.tagBad}><Text style={s.tagBadText}>{kw}</Text></View>)}
        {missingKeywords.length > 4 && <View style={s.tagBad}><Text style={s.tagBadText}>+{missingKeywords.length - 4}</Text></View>}
      </View>

      <MarcusComment text={localVerdict} />

      <View style={s.divider} />

      {/* Social media */}
      <Text style={s.sLabel}>Reseaux sociaux</Text>
      {socialMedia.map((p, i) => (
        <View key={i} style={s.tableRow}>
          <View style={s.cellPlatform}>
            <View style={[s.cellDot, { backgroundColor: PLATFORM_COLORS[p.platform] ?? "#666" }]} />
            <Text style={s.cellName}>{PLATFORM_LABELS[p.platform] ?? p.platform}</Text>
          </View>
          <View style={s.cellStatus}>
            <View style={[s.badge, { backgroundColor: p.found ? PDF_THEME.greenDim : PDF_THEME.redDim }]}>
              <Text style={[s.badgeText, { color: p.found ? PDF_THEME.green : PDF_THEME.red }]}>{p.found ? "Detecte" : "Absent"}</Text>
            </View>
          </View>
          <Text style={s.cellUrl}>{p.url ? p.url.replace(/https?:\/\/(www\.)?/, "").slice(0, 40) : "\u2014"}</Text>
        </View>
      ))}
      <MarcusComment text={socialVerdict} />

      <View style={s.divider} />

      {/* Competitor insights */}
      <Text style={s.sLabel}>Positionnement concurrentiel</Text>
      {ci && ci.totalAnalyzed > 0 && (
        <View style={s.insightsBox}>
          <View style={s.insightsRow}>
            <View style={s.insightItem}>
              <Text style={[s.insightNum, { color: PDF_THEME.textPrimary }]}>{ci.totalAnalyzed}</Text>
              <Text style={s.insightLbl}>concurrents analyses</Text>
            </View>
            <View style={s.insightItem}>
              <Text style={[s.insightNum, { color: PDF_THEME.yellow }]}>{ci.avgRating.toFixed(1)}</Text>
              <Text style={s.insightLbl}>note moyenne</Text>
            </View>
            <View style={s.insightItem}>
              <Text style={[s.insightNum, { color: PDF_THEME.textPrimary }]}>{Math.round(ci.avgReviews)}</Text>
              <Text style={s.insightLbl}>avis moyens</Text>
            </View>
            {ci.bestRated && (
              <View style={s.insightItem}>
                <Text style={[s.insightNum, { color: PDF_THEME.green }]}>{ci.bestRated.rating.toFixed(1)}</Text>
                <Text style={s.insightLbl}>meilleure note</Text>
              </View>
            )}
            {ci.prospectRatingRank !== null && (
              <View style={s.insightItem}>
                <Text style={[s.insightNum, { color: ci.prospectRatingRank <= 5 ? PDF_THEME.green : PDF_THEME.red }]}>#{ci.prospectRatingRank}</Text>
                <Text style={s.insightLbl}>votre position</Text>
              </View>
            )}
          </View>
        </View>
      )}
      {/* Map */}
      {mapDataUri && (
        <View style={{ marginTop: 6, borderRadius: 4, overflow: "hidden", borderWidth: 0.5, borderColor: PDF_THEME.borderLight }}>
          <Image src={mapDataUri} style={{ width: "100%", height: 80 }} />
          <Text style={{ fontFamily: PDF_THEME.fontFamily, fontSize: 5.5, color: PDF_THEME.textMuted, textAlign: "center", paddingVertical: 2, backgroundColor: PDF_THEME.sectionBg }}>
            Zone geographique analysee — {dealerCity}
          </Text>
        </View>
      )}

      <MarcusComment text={competitorVerdict} label="Analyse concurrentielle Marcus" />
    </Page>
  );
}

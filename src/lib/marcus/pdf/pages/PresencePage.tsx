import React from "react";
import { Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import { PDF_THEME, scoreColor } from "../theme";
import { PageHeader } from "../components/PageHeader";
import { SectionTitle } from "../components/SectionTitle";
import { MarcusComment } from "../components/MarcusComment";
import type { SocialMediaProfile, CompetitorData, GoogleProfileData } from "../../types";

const s = StyleSheet.create({
  page: { backgroundColor: PDF_THEME.pageBg, padding: PDF_THEME.margin },
  sLabel: { fontFamily: PDF_THEME.fontFamily, fontSize: 8, fontWeight: 600, color: PDF_THEME.textPrimary, marginBottom: 3, marginTop: 6 },
  statsRow: { flexDirection: "row", gap: 6, marginBottom: 6 },
  statBox: { flex: 1, paddingVertical: 5, paddingHorizontal: 6, borderRadius: 4, backgroundColor: PDF_THEME.sectionBg, borderWidth: 0.5, borderColor: PDF_THEME.borderLight },
  statNum: { fontFamily: PDF_THEME.fontFamily, fontSize: 13, fontWeight: 700, marginBottom: 1 },
  statLbl: { fontFamily: PDF_THEME.fontFamily, fontSize: 6, color: PDF_THEME.textMuted },
  tagRow: { flexDirection: "row", flexWrap: "wrap", gap: 3, marginBottom: 4 },
  tagOk: { paddingHorizontal: 4, paddingVertical: 1.5, borderRadius: 2, backgroundColor: PDF_THEME.greenDim },
  tagOkText: { fontFamily: PDF_THEME.fontFamily, fontSize: 6, color: PDF_THEME.green },
  tagBad: { paddingHorizontal: 4, paddingVertical: 1.5, borderRadius: 2, backgroundColor: PDF_THEME.redDim },
  tagBadText: { fontFamily: PDF_THEME.fontFamily, fontSize: 6, color: PDF_THEME.red },
  divider: { height: 0.5, backgroundColor: PDF_THEME.border, marginVertical: 4 },
  tableRow: { flexDirection: "row", paddingVertical: 3, paddingHorizontal: 6, alignItems: "center", borderBottomWidth: 0.5, borderBottomColor: PDF_THEME.borderLight },
  cellPlatform: { flex: 1.5, flexDirection: "row", alignItems: "center", gap: 4 },
  cellDot: { width: 5, height: 5, borderRadius: 2.5 },
  cellName: { fontFamily: PDF_THEME.fontFamily, fontSize: 7, fontWeight: 500, color: PDF_THEME.textPrimary },
  cellStatus: { flex: 1 },
  badge: { paddingHorizontal: 4, paddingVertical: 1, borderRadius: 2, alignSelf: "flex-start" },
  badgeText: { fontFamily: PDF_THEME.fontFamily, fontSize: 6, fontWeight: 600 },
  cellUrl: { flex: 2, fontFamily: PDF_THEME.fontFamily, fontSize: 6, color: PDF_THEME.textMuted },
  compHeader: { flexDirection: "row", paddingVertical: 3, paddingHorizontal: 6, backgroundColor: PDF_THEME.sectionBg, borderBottomWidth: 0.5, borderBottomColor: PDF_THEME.border },
  compTh: { fontFamily: PDF_THEME.fontFamily, fontSize: 6, fontWeight: 600, color: PDF_THEME.textMuted, textTransform: "uppercase", letterSpacing: 0.3 },
  compRow: { flexDirection: "row", paddingVertical: 3, paddingHorizontal: 6, alignItems: "center", borderBottomWidth: 0.5, borderBottomColor: PDF_THEME.borderLight },
  compCell: { fontFamily: PDF_THEME.fontFamily, fontSize: 7, color: PDF_THEME.textSecondary, textAlign: "center" },
  highlight: { backgroundColor: PDF_THEME.brandDim },
});

const PLATFORM_COLORS: Record<string, string> = { facebook: "#1877F2", instagram: "#E4405F", linkedin: "#0A66C2" };
const PLATFORM_LABELS: Record<string, string> = { facebook: "Facebook", instagram: "Instagram", linkedin: "LinkedIn" };

interface PresencePageProps {
  cityMentions: number; serviceMentions: string[]; missingKeywords: string[]; dealerCity: string;
  socialMedia: SocialMediaProfile[]; competitors: CompetitorData[]; googleProfile: GoogleProfileData; dealerName: string;
  localVerdict: string; socialVerdict: string; competitorVerdict: string;
  pageNumber: number; totalPages: number;
}

export function PresencePage({
  cityMentions, serviceMentions, missingKeywords, dealerCity,
  socialMedia, competitors, googleProfile, dealerName,
  localVerdict, socialVerdict, competitorVerdict,
  pageNumber, totalPages,
}: PresencePageProps) {
  return (
    <Page size="A4" style={s.page}>
      <PageHeader pageNumber={pageNumber} totalPages={totalPages} />
      <SectionTitle title="Presence Digitale" subtitle={`Referencement local, reseaux sociaux et positionnement — ${dealerCity}`} />

      {/* Local stats */}
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
        {missingKeywords.slice(0, 5).map((kw, i) => <View key={`m-${i}`} style={s.tagBad}><Text style={s.tagBadText}>{kw}</Text></View>)}
        {missingKeywords.length > 5 && <View style={s.tagBad}><Text style={s.tagBadText}>+{missingKeywords.length - 5}</Text></View>}
      </View>

      <MarcusComment text={localVerdict} />

      <View style={s.divider} />

      {/* Social */}
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
          <Text style={s.cellUrl}>{p.url ? p.url.replace(/https?:\/\/(www\.)?/, "") : "\u2014"}</Text>
        </View>
      ))}
      <MarcusComment text={socialVerdict} />

      <View style={s.divider} />

      {/* Competitors */}
      {competitors.length > 0 && (
        <>
          <Text style={s.sLabel}>Positionnement concurrentiel</Text>
          <View style={s.compHeader}>
            <Text style={[s.compTh, { flex: 3 }]}>Concession</Text>
            <Text style={[s.compTh, { flex: 1.5, textAlign: "center" }]}>Note</Text>
            <Text style={[s.compTh, { flex: 1.5, textAlign: "center" }]}>Avis</Text>
            <Text style={[s.compTh, { flex: 1.5, textAlign: "center" }]}>PageSpeed</Text>
          </View>
          <View style={[s.compRow, s.highlight]}>
            <Text style={[s.compCell, { flex: 3, textAlign: "left", fontWeight: 600 }]}>{dealerName}</Text>
            <Text style={[s.compCell, { flex: 1.5 }]}>{googleProfile.rating?.toFixed(1) ?? "\u2014"}</Text>
            <Text style={[s.compCell, { flex: 1.5 }]}>{googleProfile.reviewCount ?? "\u2014"}</Text>
            <Text style={[s.compCell, { flex: 1.5 }]}>{"\u2014"}</Text>
          </View>
          {competitors.map((c, i) => (
            <View key={i} style={s.compRow}>
              <Text style={[s.compCell, { flex: 3, textAlign: "left" }]}>{c.name}</Text>
              <Text style={[s.compCell, { flex: 1.5 }]}>{c.googleRating?.toFixed(1) ?? "\u2014"}</Text>
              <Text style={[s.compCell, { flex: 1.5 }]}>{c.googleReviewCount ?? "\u2014"}</Text>
              <Text style={[s.compCell, { flex: 1.5 }, c.pageSpeedScore !== null ? { color: scoreColor(c.pageSpeedScore), fontWeight: 600 } : {}]}>
                {c.pageSpeedScore !== null ? `${c.pageSpeedScore}` : "\u2014"}
              </Text>
            </View>
          ))}
          <MarcusComment text={competitorVerdict} />
        </>
      )}
      {competitors.length === 0 && <MarcusComment text={competitorVerdict} />}
    </Page>
  );
}

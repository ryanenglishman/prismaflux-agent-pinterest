import React from "react";
import { Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import { PDF_THEME } from "../theme";
import { PageHeader } from "../components/PageHeader";
import { SectionTitle } from "../components/SectionTitle";
import { MarcusComment } from "../components/MarcusComment";
import type { TimeLostBreakdown, LeadsLostData } from "../../types";

const s = StyleSheet.create({
  page: { backgroundColor: PDF_THEME.pageBg, padding: PDF_THEME.margin },
  narrativeText: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 7,
    color: PDF_THEME.textSecondary,
    lineHeight: 1.65,
    marginBottom: 6,
  },
  sLabel: { fontFamily: PDF_THEME.fontFamily, fontSize: 8, fontWeight: 600, color: PDF_THEME.textPrimary, marginBottom: 3, marginTop: 4 },
  // Key metrics strip
  strip: { flexDirection: "row", gap: 6, marginBottom: 6 },
  stripItem: { flex: 1, paddingVertical: 4, paddingHorizontal: 5, borderRadius: 4, borderWidth: 0.5, borderColor: PDF_THEME.borderLight },
  stripNum: { fontFamily: PDF_THEME.fontFamily, fontSize: 10, fontWeight: 700, marginBottom: 1 },
  stripLbl: { fontFamily: PDF_THEME.fontFamily, fontSize: 5.5, color: PDF_THEME.textMuted },
  // Task table
  tblHead: { flexDirection: "row", paddingVertical: 2.5, paddingHorizontal: 6, backgroundColor: PDF_THEME.sectionBg, borderBottomWidth: 0.5, borderBottomColor: PDF_THEME.border },
  tblTh: { fontFamily: PDF_THEME.fontFamily, fontSize: 5.5, fontWeight: 600, color: PDF_THEME.textMuted, textTransform: "uppercase", letterSpacing: 0.3 },
  tblRow: { flexDirection: "row", paddingVertical: 2.5, paddingHorizontal: 6, borderBottomWidth: 0.5, borderBottomColor: PDF_THEME.borderLight, alignItems: "center" },
  tblCell: { fontFamily: PDF_THEME.fontFamily, fontSize: 6.5, color: PDF_THEME.textSecondary },
  aiBadge: { paddingHorizontal: 3, paddingVertical: 1, borderRadius: 2, backgroundColor: PDF_THEME.greenDim },
  aiBadgeText: { fontFamily: PDF_THEME.fontFamily, fontSize: 5, fontWeight: 600, color: PDF_THEME.green },
  divider: { height: 0.5, backgroundColor: PDF_THEME.border, marginVertical: 5 },
  // Leads section
  funnelRow: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 2 },
  funnelLbl: { fontFamily: PDF_THEME.fontFamily, fontSize: 6, color: PDF_THEME.textMuted, width: 50, textAlign: "right" },
  funnelBar: { height: 14, borderRadius: 3, justifyContent: "center", paddingHorizontal: 5 },
  funnelVal: { fontFamily: PDF_THEME.fontFamily, fontSize: 6.5, fontWeight: 600, color: "#FFFFFF" },
  lossIndicator: { paddingLeft: 56, marginBottom: 1 },
  lossText: { fontFamily: PDF_THEME.fontFamily, fontSize: 6, fontWeight: 600, color: PDF_THEME.red },
  metricsRow: { flexDirection: "row", gap: 6, marginTop: 4, marginBottom: 4 },
  metricBox: { flex: 1, padding: 5, borderRadius: 4, backgroundColor: PDF_THEME.sectionBg, borderWidth: 0.5, borderColor: PDF_THEME.borderLight },
  metricNum: { fontFamily: PDF_THEME.fontFamily, fontSize: 9, fontWeight: 700, marginBottom: 1 },
  metricLbl: { fontFamily: PDF_THEME.fontFamily, fontSize: 5.5, color: PDF_THEME.textMuted },
  // Transition
  transitionBox: {
    padding: 8,
    backgroundColor: PDF_THEME.sectionBg,
    borderRadius: 4,
    borderLeftWidth: 2,
    borderLeftColor: PDF_THEME.brand,
    marginTop: 4,
  },
  transitionText: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 7,
    color: PDF_THEME.textSecondary,
    lineHeight: 1.55,
    fontWeight: 500,
  },
});

interface ImpactPageProps {
  timeLost: TimeLostBreakdown;
  leadsLost: LeadsLostData;
  dealerName: string;
  dailyLifeStory: string;
  timeVerdict: string;
  leadsVerdict: string;
  impactTransition: string;
  pageNumber: number;
  totalPages: number;
}

export function ImpactPage({
  timeLost,
  leadsLost,
  dealerName,
  dailyLifeStory,
  timeVerdict,
  leadsVerdict,
  impactTransition,
  pageNumber,
  totalPages,
}: ImpactPageProps) {
  const automatableH = Math.round(timeLost.tasks.filter(t => t.automatable).reduce((a, t) => a + t.minutesPerMonth, 0) / 60);
  const retained = leadsLost.estimatedMonthlyVisitors - leadsLost.visitorsLostPerMonth;

  // Format large EUR amounts compactly
  const fmtEur = (v: number) => {
    if (v >= 10000) return `${(v / 1000).toFixed(1)}K`;
    return v.toLocaleString("fr-BE");
  };

  return (
    <Page size="A4" style={s.page}>
      <PageHeader pageNumber={pageNumber} totalPages={totalPages} />
      <SectionTitle title="L'Impact sur Votre Quotidien" subtitle={`Temps, leads et cout d'opportunite — ${timeLost.vehicleCount} vehicules en stock`} />

      {/* Daily life storytelling */}
      <Text style={s.narrativeText}>{dailyLifeStory}</Text>

      {/* Key metrics */}
      <View style={s.strip}>
        <View style={[s.stripItem, { backgroundColor: PDF_THEME.redDim }]}>
          <Text style={[s.stripNum, { color: PDF_THEME.red }]}>{timeLost.totalHoursPerMonth}h</Text>
          <Text style={s.stripLbl}>heures/mois investies</Text>
        </View>
        <View style={[s.stripItem, { backgroundColor: PDF_THEME.greenDim }]}>
          <Text style={[s.stripNum, { color: PDF_THEME.green }]}>{automatableH}h</Text>
          <Text style={s.stripLbl}>automatisables par l'IA</Text>
        </View>
        <View style={s.stripItem}>
          <Text style={[s.stripNum, { color: PDF_THEME.textPrimary }]}>{fmtEur(timeLost.totalCostPerMonth)} EUR</Text>
          <Text style={s.stripLbl}>cout mensuel (35 EUR/h)</Text>
        </View>
        <View style={[s.stripItem, { backgroundColor: PDF_THEME.redDim }]}>
          <Text style={[s.stripNum, { color: PDF_THEME.red }]}>{fmtEur(timeLost.totalCostPerYear)} EUR</Text>
          <Text style={s.stripLbl}>projection annuelle</Text>
        </View>
      </View>

      {/* Task breakdown */}
      <View style={s.tblHead}>
        <Text style={[s.tblTh, { flex: 2 }]}>Tache</Text>
        <Text style={[s.tblTh, { flex: 3 }]}>Ce que ca implique</Text>
        <Text style={[s.tblTh, { flex: 0.7, textAlign: "right" }]}>h/mois</Text>
        <Text style={[s.tblTh, { flex: 0.4 }]}> </Text>
      </View>
      {timeLost.tasks.map((t, i) => (
        <View key={i} style={[s.tblRow, i % 2 !== 0 ? { backgroundColor: PDF_THEME.sectionBg } : {}]}>
          <Text style={[s.tblCell, { flex: 2, fontWeight: 500, color: PDF_THEME.textPrimary }]}>{t.label}</Text>
          <Text style={[s.tblCell, { flex: 3, fontSize: 6 }]}>{t.description}</Text>
          <Text style={[s.tblCell, { flex: 0.7, textAlign: "right", fontWeight: 600, color: t.automatable ? PDF_THEME.red : PDF_THEME.textMuted }]}>
            {(t.minutesPerMonth / 60).toFixed(1)}
          </Text>
          <View style={{ flex: 0.4, alignItems: "center" }}>
            {t.automatable && <View style={s.aiBadge}><Text style={s.aiBadgeText}>IA</Text></View>}
          </View>
        </View>
      ))}
      <MarcusComment text={timeVerdict} />

      <View style={s.divider} />

      {/* Leads funnel */}
      <Text style={s.sLabel}>Contacts perdus chaque mois</Text>
      <View style={s.funnelRow}>
        <Text style={s.funnelLbl}>Trafic</Text>
        <View style={[s.funnelBar, { width: 220, backgroundColor: "#3B82F6" }]}>
          <Text style={s.funnelVal}>{leadsLost.estimatedMonthlyVisitors.toLocaleString("fr-BE")} visiteurs/mois</Text>
        </View>
      </View>
      <View style={s.lossIndicator}>
        <Text style={s.lossText}>{"-" + leadsLost.visitorsLostPerMonth + " (rebond " + leadsLost.estimatedBounceRate + "% — chargement " + leadsLost.loadTimeSeconds + "s)"}</Text>
      </View>
      <View style={s.funnelRow}>
        <Text style={s.funnelLbl}>Contacts</Text>
        <View style={[s.funnelBar, { width: 110, backgroundColor: PDF_THEME.green }]}>
          <Text style={s.funnelVal}>{Math.round(retained * 0.025)} leads/mois</Text>
        </View>
      </View>

      <View style={s.metricsRow}>
        <View style={s.metricBox}><Text style={[s.metricNum, { color: PDF_THEME.red }]}>{leadsLost.leadsLostPerMonth}</Text><Text style={s.metricLbl}>contacts perdus/mois</Text></View>
        <View style={s.metricBox}><Text style={[s.metricNum, { color: PDF_THEME.red }]}>{fmtEur(leadsLost.revenueLostPerMonth)} EUR</Text><Text style={s.metricLbl}>manque a gagner/mois</Text></View>
        <View style={s.metricBox}><Text style={[s.metricNum, { color: PDF_THEME.red }]}>{fmtEur(leadsLost.revenueLostPerMonth * 12)} EUR</Text><Text style={s.metricLbl}>projection annuelle</Text></View>
      </View>
      <MarcusComment text={leadsVerdict} />

      <View style={s.transitionBox}>
        <Text style={s.transitionText}>{impactTransition}</Text>
      </View>
    </Page>
  );
}

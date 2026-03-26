import React from "react";
import { Page, View, Text, StyleSheet, Svg, Line, Circle } from "@react-pdf/renderer";
import { PDF_THEME, impactLabel, difficultyLabel } from "../theme";
import { PageHeader } from "../components/PageHeader";
import { SectionTitle } from "../components/SectionTitle";
import { MarcusComment } from "../components/MarcusComment";
import type { PriorityAction } from "../../types";

const s = StyleSheet.create({
  page: { backgroundColor: PDF_THEME.pageBg, padding: PDF_THEME.margin },
  sLabel: { fontFamily: PDF_THEME.fontFamily, fontSize: 8, fontWeight: 600, color: PDF_THEME.textPrimary, marginBottom: 3, marginTop: 2 },
  introText: { fontFamily: PDF_THEME.fontFamily, fontSize: 7, color: PDF_THEME.textSecondary, lineHeight: 1.5, marginBottom: 6 },
  chartBox: { padding: 8, backgroundColor: PDF_THEME.sectionBg, borderRadius: 4, marginBottom: 4 },
  legendRow: { flexDirection: "row", justifyContent: "center", gap: 16, marginBottom: 4 },
  legendItem: { flexDirection: "row", alignItems: "center", gap: 3 },
  legendDot: { width: 8, height: 2, borderRadius: 1 },
  legendText: { fontFamily: PDF_THEME.fontFamily, fontSize: 6, color: PDF_THEME.textSecondary },
  axisRow: { flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 20, marginTop: 2 },
  axisLabel: { fontFamily: PDF_THEME.fontFamily, fontSize: 5, color: PDF_THEME.textMuted },
  compRow: { flexDirection: "row", gap: 8, marginBottom: 4 },
  compCard: { flex: 1, padding: 7, borderRadius: 4, borderWidth: 0.5 },
  compTitle: { fontFamily: PDF_THEME.fontFamily, fontSize: 6.5, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.3, marginBottom: 3 },
  compItem: { flexDirection: "row", alignItems: "flex-start", gap: 3, marginBottom: 2 },
  compDot: { width: 3, height: 3, borderRadius: 1.5, marginTop: 1.5 },
  compText: { fontFamily: PDF_THEME.fontFamily, fontSize: 6, color: PDF_THEME.textSecondary, flex: 1, lineHeight: 1.3 },
  totalBox: { padding: 7, backgroundColor: PDF_THEME.redDim, borderRadius: 4, borderLeftWidth: 2, borderLeftColor: PDF_THEME.red, flexDirection: "row", alignItems: "center", marginBottom: 6 },
  totalLabel: { fontFamily: PDF_THEME.fontFamily, fontSize: 7, fontWeight: 600, color: PDF_THEME.textPrimary, flex: 1 },
  totalAmount: { fontFamily: PDF_THEME.fontFamily, fontSize: 13, fontWeight: 700, color: PDF_THEME.red },
  divider: { height: 0.5, backgroundColor: PDF_THEME.border, marginVertical: 4 },
  actionCard: { padding: 7, backgroundColor: PDF_THEME.sectionBg, borderRadius: 4, marginBottom: 4, borderLeftWidth: 2, flexDirection: "row", gap: 6 },
  actionNum: { fontFamily: PDF_THEME.fontFamily, fontSize: 10, fontWeight: 700, color: PDF_THEME.brand, width: 14 },
  actionContent: { flex: 1 },
  actionTitle: { fontFamily: PDF_THEME.fontFamily, fontSize: 8, fontWeight: 600, color: PDF_THEME.textPrimary, marginBottom: 1 },
  actionDesc: { fontFamily: PDF_THEME.fontFamily, fontSize: 6.5, color: PDF_THEME.textSecondary, lineHeight: 1.4, marginBottom: 2 },
  badgesRow: { flexDirection: "row", gap: 3 },
  badge: { paddingHorizontal: 3, paddingVertical: 1, borderRadius: 2 },
  badgeText: { fontFamily: PDF_THEME.fontFamily, fontSize: 5, fontWeight: 600 },
  statsStrip: { flexDirection: "row", gap: 5, marginTop: 2 },
  statMini: { flex: 1, paddingVertical: 3, paddingHorizontal: 5, borderRadius: 3, backgroundColor: PDF_THEME.sectionBg, borderWidth: 0.5, borderColor: PDF_THEME.borderLight },
  statMiniNum: { fontFamily: PDF_THEME.fontFamily, fontSize: 10, fontWeight: 700, marginBottom: 1 },
  statMiniLbl: { fontFamily: PDF_THEME.fontFamily, fontSize: 5, color: PDF_THEME.textMuted },
});

interface ProjectionPageProps {
  totalCostPerYear: number; leadsLostPerMonth: number; revenueLostPerMonth: number;
  dealerName: string; actions: PriorityAction[];
  projectionIntro: string; actionsIntro: string;
  pageNumber: number; totalPages: number;
}

export function ProjectionPage({
  totalCostPerYear, leadsLostPerMonth, revenueLostPerMonth,
  dealerName, actions, projectionIntro, actionsIntro,
  pageNumber, totalPages,
}: ProjectionPageProps) {
  const chartW = 420; const chartH = 80;
  const padL = 20; const plotW = chartW - padL - 10; const plotH = chartH - 10;
  const months = Array.from({ length: 13 }, (_, i) => i);
  const comp = months.map(i => Math.round(100 * Math.pow(1.04, i)));
  const you = months.map(i => Math.max(100 - i * 2, 72));
  const maxV = Math.max(...comp);
  const xp = (i: number) => padL + (i / 12) * plotW;
  const yp = (v: number) => 5 + plotH - (v / maxV) * plotH;
  const total12 = revenueLostPerMonth * 12 + totalCostPerYear;
  const actionColors = [PDF_THEME.green, PDF_THEME.brand, PDF_THEME.yellow];

  return (
    <Page size="A4" style={s.page}>
      <PageHeader pageNumber={pageNumber} totalPages={totalPages} />
      <SectionTitle title="Projection & Recommandations" subtitle="Evolution a 12 mois et actions prioritaires" />

      <Text style={s.introText}>{projectionIntro}</Text>

      <View style={s.chartBox}>
        <View style={s.legendRow}>
          <View style={s.legendItem}><View style={[s.legendDot, { backgroundColor: PDF_THEME.green }]} /><Text style={s.legendText}>Concurrents</Text></View>
          <View style={s.legendItem}><View style={[s.legendDot, { backgroundColor: PDF_THEME.red }]} /><Text style={s.legendText}>{dealerName}</Text></View>
        </View>
        <Svg width={chartW} height={chartH} viewBox={`0 0 ${chartW} ${chartH}`}>
          {[0, 0.5, 1].map((p, i) => <Line key={i} x1={padL} y1={5 + plotH * (1 - p)} x2={padL + plotW} y2={5 + plotH * (1 - p)} stroke={PDF_THEME.border} strokeWidth={0.3} />)}
          {months.slice(0, -1).map((_, i) => (
            <React.Fragment key={i}>
              <Line x1={xp(i)} y1={yp(comp[i])} x2={xp(i + 1)} y2={yp(comp[i + 1])} stroke={PDF_THEME.green} strokeWidth={1.5} />
              <Line x1={xp(i)} y1={yp(you[i])} x2={xp(i + 1)} y2={yp(you[i + 1])} stroke={PDF_THEME.red} strokeWidth={1.5} />
            </React.Fragment>
          ))}
          {[0, 6, 12].map(i => (
            <React.Fragment key={`p${i}`}>
              <Circle cx={xp(i)} cy={yp(comp[i])} r={2} fill={PDF_THEME.green} />
              <Circle cx={xp(i)} cy={yp(you[i])} r={2} fill={PDF_THEME.red} />
            </React.Fragment>
          ))}
        </Svg>
        <View style={s.axisRow}>
          {["Aujourd'hui", "3 mois", "6 mois", "9 mois", "12 mois"].map(l => <Text key={l} style={s.axisLabel}>{l}</Text>)}
        </View>
      </View>

      <View style={s.compRow}>
        <View style={[s.compCard, { borderColor: PDF_THEME.red, backgroundColor: PDF_THEME.redDim }]}>
          <Text style={[s.compTitle, { color: PDF_THEME.red }]}>Sans action</Text>
          <View style={s.compItem}><View style={[s.compDot, { backgroundColor: PDF_THEME.red }]} /><Text style={s.compText}>{leadsLostPerMonth * 12} leads perdus sur 12 mois</Text></View>
          <View style={s.compItem}><View style={[s.compDot, { backgroundColor: PDF_THEME.red }]} /><Text style={s.compText}>{totalCostPerYear.toLocaleString("fr-BE")} EUR de temps gaspille</Text></View>
          <View style={s.compItem}><View style={[s.compDot, { backgroundColor: PDF_THEME.red }]} /><Text style={s.compText}>Ecart concurrentiel croissant</Text></View>
        </View>
        <View style={[s.compCard, { borderColor: PDF_THEME.green, backgroundColor: PDF_THEME.greenDim }]}>
          <Text style={[s.compTitle, { color: PDF_THEME.green }]}>Avec PrismaFlux</Text>
          <View style={s.compItem}><View style={[s.compDot, { backgroundColor: PDF_THEME.green }]} /><Text style={s.compText}>Diffusion automatisee multi-plateforme</Text></View>
          <View style={s.compItem}><View style={[s.compDot, { backgroundColor: PDF_THEME.green }]} /><Text style={s.compText}>{Math.round(totalCostPerYear * 0.7).toLocaleString("fr-BE")} EUR economises/an</Text></View>
          <View style={s.compItem}><View style={[s.compDot, { backgroundColor: PDF_THEME.green }]} /><Text style={s.compText}>Equipe recentree sur la vente</Text></View>
        </View>
      </View>

      <View style={s.totalBox}>
        <Text style={s.totalLabel}>Cout cumule de l'inaction sur 12 mois</Text>
        <Text style={s.totalAmount}>{total12.toLocaleString("fr-BE")} EUR</Text>
      </View>

      <View style={s.divider} />

      <Text style={s.introText}>{actionsIntro}</Text>
      {actions.map((a, i) => (
        <View key={i} style={[s.actionCard, { borderLeftColor: actionColors[i] ?? PDF_THEME.brand }]}>
          <Text style={s.actionNum}>{i + 1}</Text>
          <View style={s.actionContent}>
            <Text style={s.actionTitle}>{a.title}</Text>
            <Text style={s.actionDesc}>{a.description}</Text>
            <View style={s.badgesRow}>
              <View style={[s.badge, { backgroundColor: a.impact === "high" ? PDF_THEME.greenDim : PDF_THEME.yellowDim }]}><Text style={[s.badgeText, { color: a.impact === "high" ? PDF_THEME.green : PDF_THEME.yellow }]}>{impactLabel(a.impact)}</Text></View>
              <View style={[s.badge, { backgroundColor: PDF_THEME.sectionBg }]}><Text style={[s.badgeText, { color: PDF_THEME.textMuted }]}>{difficultyLabel(a.difficulty)}</Text></View>
            </View>
          </View>
        </View>
      ))}

      <View style={s.statsStrip}>
        <View style={s.statMini}><Text style={[s.statMiniNum, { color: "#3B82F6" }]}>92%</Text><Text style={s.statMiniLbl}>recherchent en ligne avant achat</Text></View>
        <View style={s.statMini}><Text style={[s.statMiniNum, { color: PDF_THEME.red }]}>53%</Text><Text style={s.statMiniLbl}>{"quittent un site lent (>3s)"}</Text></View>
        <View style={s.statMini}><Text style={[s.statMiniNum, { color: PDF_THEME.green }]}>4.3x</Text><Text style={s.statMiniLbl}>plus d'appels avec 100+ avis</Text></View>
        <View style={s.statMini}><Text style={[s.statMiniNum, { color: PDF_THEME.yellow }]}>25 min</Text><Text style={s.statMiniLbl}>par annonce manuelle vs 30s IA</Text></View>
      </View>
    </Page>
  );
}

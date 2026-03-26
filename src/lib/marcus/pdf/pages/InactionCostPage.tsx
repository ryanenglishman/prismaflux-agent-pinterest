import React from "react";
import { Page, View, Text, StyleSheet, Svg, Line, Circle } from "@react-pdf/renderer";
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
  // Chart
  chartBox: {
    padding: 14,
    backgroundColor: PDF_THEME.sectionBg,
    borderRadius: 6,
    marginBottom: 16,
  },
  legendRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginBottom: 8,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  legendDot: {
    width: 8,
    height: 3,
    borderRadius: 1,
  },
  legendText: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 7,
    color: PDF_THEME.textSecondary,
  },
  axisLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    marginTop: 4,
  },
  axisLabel: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 6,
    color: PDF_THEME.textMuted,
  },
  // Comparison columns
  comparisonRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 14,
  },
  compCard: {
    flex: 1,
    padding: 12,
    borderRadius: 6,
    borderWidth: 0.5,
  },
  compTitle: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 8,
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  compItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 5,
    marginBottom: 4,
  },
  compDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginTop: 2,
  },
  compText: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 7,
    color: PDF_THEME.textSecondary,
    flex: 1,
    lineHeight: 1.4,
  },
  // Bottom total
  totalBox: {
    padding: 12,
    backgroundColor: PDF_THEME.redDim,
    borderRadius: 6,
    borderLeftWidth: 3,
    borderLeftColor: PDF_THEME.red,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  totalLabel: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 9,
    fontWeight: 600,
    color: PDF_THEME.textPrimary,
    flex: 1,
  },
  totalAmount: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 16,
    fontWeight: 700,
    color: PDF_THEME.red,
  },
  totalSuffix: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 7,
    color: PDF_THEME.textMuted,
  },
});

interface InactionCostPageProps {
  totalCostPerYear: number;
  leadsLostPerMonth: number;
  revenueLostPerMonth: number;
  dealerName: string;
  pageNumber: number;
  totalPages: number;
}

export function InactionCostPage({
  totalCostPerYear,
  leadsLostPerMonth,
  revenueLostPerMonth,
  dealerName,
  pageNumber,
  totalPages,
}: InactionCostPageProps) {
  const chartW = 440;
  const chartH = 130;
  const padL = 30;
  const padR = 10;
  const padT = 8;
  const padB = 4;
  const plotW = chartW - padL - padR;
  const plotH = chartH - padT - padB;

  const months = Array.from({ length: 13 }, (_, i) => i);
  const competitorGrowth = months.map((i) => Math.round(100 * Math.pow(1.04, i)));
  const yourCurve = months.map((i) => Math.max(100 - i * 2, 72));
  const maxVal = Math.max(...competitorGrowth);

  function x(i: number) { return padL + (i / 12) * plotW; }
  function y(val: number) { return padT + plotH - (val / maxVal) * plotH; }

  const totalLost12 = revenueLostPerMonth * 12 + totalCostPerYear;

  return (
    <Page size="A4" style={s.page}>
      <View style={s.header}>
        <Logo size="small" />
        <Text style={s.pageNum}>{pageNumber} / {totalPages}</Text>
      </View>

      <SectionTitle
        title="Projection a 12 Mois"
        subtitle="Impact cumule de l'inaction sur votre positionnement concurrentiel"
      />

      {/* Chart */}
      <View style={s.chartBox}>
        <View style={s.legendRow}>
          <View style={s.legendItem}>
            <View style={[s.legendDot, { backgroundColor: PDF_THEME.green }]} />
            <Text style={s.legendText}>Concurrents (progression)</Text>
          </View>
          <View style={s.legendItem}>
            <View style={[s.legendDot, { backgroundColor: PDF_THEME.red }]} />
            <Text style={s.legendText}>{dealerName} (stagnation)</Text>
          </View>
        </View>

        <Svg width={chartW} height={chartH} viewBox={`0 0 ${chartW} ${chartH}`}>
          {/* Grid */}
          {[0, 0.5, 1].map((pct, i) => (
            <Line key={`g-${i}`}
              x1={padL} y1={padT + plotH * (1 - pct)}
              x2={padL + plotW} y2={padT + plotH * (1 - pct)}
              stroke={PDF_THEME.border} strokeWidth={0.5}
            />
          ))}
          {/* Lines */}
          {months.slice(0, -1).map((_, i) => (
            <React.Fragment key={`l-${i}`}>
              <Line x1={x(i)} y1={y(competitorGrowth[i])} x2={x(i + 1)} y2={y(competitorGrowth[i + 1])}
                stroke={PDF_THEME.green} strokeWidth={1.5} />
              <Line x1={x(i)} y1={y(yourCurve[i])} x2={x(i + 1)} y2={y(yourCurve[i + 1])}
                stroke={PDF_THEME.red} strokeWidth={1.5} />
            </React.Fragment>
          ))}
          {/* Points */}
          {[0, 6, 12].map((i) => (
            <React.Fragment key={`p-${i}`}>
              <Circle cx={x(i)} cy={y(competitorGrowth[i])} r={2} fill={PDF_THEME.green} />
              <Circle cx={x(i)} cy={y(yourCurve[i])} r={2} fill={PDF_THEME.red} />
            </React.Fragment>
          ))}
        </Svg>

        <View style={s.axisLabels}>
          {["Aujourd'hui", "3 mois", "6 mois", "9 mois", "12 mois"].map((l) => (
            <Text key={l} style={s.axisLabel}>{l}</Text>
          ))}
        </View>
      </View>

      {/* Comparison */}
      <View style={s.comparisonRow}>
        <View style={[s.compCard, { borderColor: PDF_THEME.red, backgroundColor: PDF_THEME.redDim }]}>
          <Text style={[s.compTitle, { color: PDF_THEME.red }]}>Sans action — dans 12 mois</Text>
          <View style={s.compItem}>
            <View style={[s.compDot, { backgroundColor: PDF_THEME.red }]} />
            <Text style={s.compText}>Vos concurrents investissent dans le digital et captent vos clients potentiels</Text>
          </View>
          <View style={s.compItem}>
            <View style={[s.compDot, { backgroundColor: PDF_THEME.red }]} />
            <Text style={s.compText}>{leadsLostPerMonth * 12} leads cumules perdus sur l'annee</Text>
          </View>
          <View style={s.compItem}>
            <View style={[s.compDot, { backgroundColor: PDF_THEME.red }]} />
            <Text style={s.compText}>{totalCostPerYear.toLocaleString("fr-BE")} EUR de temps investi dans des taches repetitives</Text>
          </View>
          <View style={s.compItem}>
            <View style={[s.compDot, { backgroundColor: PDF_THEME.red }]} />
            <Text style={s.compText}>Ecart concurrentiel qui s'accelere trimestre apres trimestre</Text>
          </View>
        </View>

        <View style={[s.compCard, { borderColor: PDF_THEME.green, backgroundColor: PDF_THEME.greenDim }]}>
          <Text style={[s.compTitle, { color: PDF_THEME.green }]}>Avec PrismaFlux — dans 12 mois</Text>
          <View style={s.compItem}>
            <View style={[s.compDot, { backgroundColor: PDF_THEME.green }]} />
            <Text style={s.compText}>Presence digitale optimisee et coherente sur toutes les plateformes</Text>
          </View>
          <View style={s.compItem}>
            <View style={[s.compDot, { backgroundColor: PDF_THEME.green }]} />
            <Text style={s.compText}>Diffusion automatisee — 30 secondes au lieu de 25 minutes par vehicule</Text>
          </View>
          <View style={s.compItem}>
            <View style={[s.compDot, { backgroundColor: PDF_THEME.green }]} />
            <Text style={s.compText}>{Math.round(totalCostPerYear * 0.7).toLocaleString("fr-BE")} EUR economises en temps libere</Text>
          </View>
          <View style={s.compItem}>
            <View style={[s.compDot, { backgroundColor: PDF_THEME.green }]} />
            <Text style={s.compText}>Equipe recentree sur la vente et la relation client</Text>
          </View>
        </View>
      </View>

      {/* Total */}
      <View style={s.totalBox}>
        <View style={{ flex: 1 }}>
          <Text style={s.totalLabel}>Cout cumule de l'inaction sur 12 mois</Text>
          <Text style={s.totalSuffix}>Temps perdu + opportunites manquees</Text>
        </View>
        <Text style={s.totalAmount}>{totalLost12.toLocaleString("fr-BE")} EUR</Text>
      </View>
    </Page>
  );
}

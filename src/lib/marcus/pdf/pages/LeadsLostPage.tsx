import React from "react";
import { Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import { PDF_THEME } from "../theme";
import { Logo } from "../components/Logo";
import { SectionTitle } from "../components/SectionTitle";
import type { LeadsLostData } from "../../types";

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
  // Funnel steps
  funnelContainer: {
    marginBottom: 20,
    gap: 4,
  },
  funnelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  funnelLabel: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 7,
    color: PDF_THEME.textMuted,
    width: 70,
    textAlign: "right",
  },
  funnelBar: {
    height: 24,
    borderRadius: 4,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  funnelValue: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 9,
    fontWeight: 600,
    color: "#FFFFFF",
  },
  funnelDesc: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 7,
    color: PDF_THEME.textMuted,
    flex: 1,
    marginLeft: 6,
  },
  // Loss indicator
  lossRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 4,
    paddingLeft: 78,
  },
  lossArrow: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 8,
    fontWeight: 700,
    color: PDF_THEME.red,
  },
  lossText: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 7,
    color: PDF_THEME.red,
  },
  // Metrics grid
  metricsGrid: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 16,
  },
  metricCard: {
    flex: 1,
    padding: 12,
    borderRadius: 6,
    borderWidth: 0.5,
    borderColor: PDF_THEME.border,
    backgroundColor: PDF_THEME.sectionBg,
  },
  metricNumber: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 18,
    fontWeight: 700,
    marginBottom: 3,
  },
  metricLabel: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 7,
    color: PDF_THEME.textMuted,
    lineHeight: 1.4,
  },
  // Explanation
  explanationBox: {
    padding: 12,
    backgroundColor: PDF_THEME.sectionBg,
    borderRadius: 6,
    borderLeftWidth: 3,
    borderLeftColor: PDF_THEME.yellow,
    marginBottom: 14,
  },
  explanationTitle: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 9,
    fontWeight: 600,
    color: PDF_THEME.textPrimary,
    marginBottom: 4,
  },
  explanationText: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 8,
    color: PDF_THEME.textSecondary,
    lineHeight: 1.6,
  },
  // Table
  tableContainer: {
    marginBottom: 14,
  },
  tableTitle: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 9,
    fontWeight: 600,
    color: PDF_THEME.textPrimary,
    marginBottom: 6,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: PDF_THEME.borderLight,
  },
  tableLabel: {
    flex: 2,
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 8,
    color: PDF_THEME.textSecondary,
  },
  tableValue: {
    flex: 1,
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 8,
    fontWeight: 600,
    color: PDF_THEME.textPrimary,
    textAlign: "right",
  },
});

interface LeadsLostPageProps {
  leadsLost: LeadsLostData;
  dealerName: string;
  pageNumber: number;
  totalPages: number;
}

export function LeadsLostPage({
  leadsLost,
  dealerName,
  pageNumber,
  totalPages,
}: LeadsLostPageProps) {
  const retained = leadsLost.estimatedMonthlyVisitors - leadsLost.visitorsLostPerMonth;
  const retainedLeads = Math.round(retained * 0.025);

  return (
    <Page size="A4" style={s.page}>
      <View style={s.header}>
        <Logo size="small" />
        <Text style={s.pageNum}>{pageNumber} / {totalPages}</Text>
      </View>

      <SectionTitle
        title="Impact sur la Generation de Leads"
        subtitle="Estimation des opportunites commerciales perdues"
      />

      {/* Funnel */}
      <View style={s.funnelContainer}>
        <View style={s.funnelRow}>
          <Text style={s.funnelLabel}>Trafic estime</Text>
          <View style={[s.funnelBar, { width: 300, backgroundColor: PDF_THEME.marcusBlue }]}>
            <Text style={s.funnelValue}>{leadsLost.estimatedMonthlyVisitors.toLocaleString("fr-BE")} visiteurs/mois</Text>
          </View>
          <Text style={s.funnelDesc}> </Text>
        </View>

        <View style={s.lossRow}>
          <Text style={s.lossArrow}>-{leadsLost.visitorsLostPerMonth}</Text>
          <Text style={s.lossText}>
            quittent le site avant chargement (rebond: {leadsLost.estimatedBounceRate}%)
          </Text>
        </View>

        <View style={s.funnelRow}>
          <Text style={s.funnelLabel}>Visiteurs restants</Text>
          <View style={[s.funnelBar, { width: 220, backgroundColor: PDF_THEME.yellow }]}>
            <Text style={s.funnelValue}>{retained.toLocaleString("fr-BE")} visiteurs</Text>
          </View>
          <Text style={s.funnelDesc}>taux de conversion ~2.5%</Text>
        </View>

        <View style={s.funnelRow}>
          <Text style={s.funnelLabel}>Leads generes</Text>
          <View style={[s.funnelBar, { width: 140, backgroundColor: PDF_THEME.green }]}>
            <Text style={s.funnelValue}>{retainedLeads} contacts/mois</Text>
          </View>
          <Text style={s.funnelDesc}> </Text>
        </View>
      </View>

      {/* Key metrics */}
      <View style={s.metricsGrid}>
        <View style={s.metricCard}>
          <Text style={[s.metricNumber, { color: PDF_THEME.red }]}>{leadsLost.loadTimeSeconds}s</Text>
          <Text style={s.metricLabel}>Temps de chargement mobile mesure</Text>
        </View>
        <View style={s.metricCard}>
          <Text style={[s.metricNumber, { color: PDF_THEME.red }]}>{leadsLost.leadsLostPerMonth}</Text>
          <Text style={s.metricLabel}>Contacts perdus chaque mois</Text>
        </View>
        <View style={s.metricCard}>
          <Text style={[s.metricNumber, { color: PDF_THEME.red }]}>{leadsLost.revenueLostPerMonth.toLocaleString("fr-BE")} EUR</Text>
          <Text style={s.metricLabel}>Manque a gagner mensuel estime</Text>
        </View>
      </View>

      {/* Methodology table */}
      <View style={s.tableContainer}>
        <Text style={s.tableTitle}>Hypotheses de calcul</Text>
        <View style={[s.tableRow, { backgroundColor: PDF_THEME.sectionBg }]}>
          <Text style={s.tableLabel}>Trafic mensuel estime (heuristique)</Text>
          <Text style={s.tableValue}>{leadsLost.estimatedMonthlyVisitors.toLocaleString("fr-BE")} visiteurs</Text>
        </View>
        <View style={s.tableRow}>
          <Text style={s.tableLabel}>Taux de rebond lie a la vitesse (source: Google)</Text>
          <Text style={s.tableValue}>{leadsLost.estimatedBounceRate}%</Text>
        </View>
        <View style={[s.tableRow, { backgroundColor: PDF_THEME.sectionBg }]}>
          <Text style={s.tableLabel}>Taux de conversion moyen secteur automobile</Text>
          <Text style={s.tableValue}>2.5%</Text>
        </View>
        <View style={s.tableRow}>
          <Text style={s.tableLabel}>Marge moyenne par vehicule vendu</Text>
          <Text style={s.tableValue}>1 800 EUR</Text>
        </View>
      </View>

      {/* Explanation */}
      <View style={s.explanationBox}>
        <Text style={s.explanationTitle}>Methodologie</Text>
        <Text style={s.explanationText}>
          Ces estimations s'appuient sur les benchmarks Google (53% d'abandon au-dela de 3s sur mobile) et les taux de conversion moyens du secteur automobile en ligne. Le trafic est estime a partir du volume de contenu indexe et de la taille du stock. Les chiffres reels peuvent varier selon votre zone de chalandise.
        </Text>
      </View>
    </Page>
  );
}

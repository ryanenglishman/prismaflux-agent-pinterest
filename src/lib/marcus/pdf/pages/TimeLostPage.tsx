import React from "react";
import { Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import { PDF_THEME } from "../theme";
import { Logo } from "../components/Logo";
import { SectionTitle } from "../components/SectionTitle";
import type { TimeLostBreakdown } from "../../types";

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
  // Summary strip
  summaryStrip: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
  summaryItem: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 6,
    borderWidth: 0.5,
    borderColor: PDF_THEME.border,
  },
  summaryNumber: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 16,
    fontWeight: 700,
    marginBottom: 2,
  },
  summaryLabel: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 7,
    color: PDF_THEME.textMuted,
  },
  // Table
  tableHeader: {
    flexDirection: "row",
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: PDF_THEME.sectionBg,
    borderBottomWidth: 0.5,
    borderBottomColor: PDF_THEME.border,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  tableHeaderText: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 7,
    fontWeight: 600,
    color: PDF_THEME.textMuted,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: PDF_THEME.borderLight,
    alignItems: "center",
  },
  taskName: {
    flex: 2.5,
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 8,
    fontWeight: 500,
    color: PDF_THEME.textPrimary,
  },
  taskDesc: {
    flex: 4,
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 7,
    color: PDF_THEME.textMuted,
  },
  taskHours: {
    flex: 1,
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 8,
    fontWeight: 600,
    textAlign: "right",
  },
  taskBadge: {
    flex: 0.8,
    alignItems: "flex-end",
  },
  aiBadge: {
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 3,
    backgroundColor: PDF_THEME.greenDim,
  },
  aiBadgeText: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 6,
    fontWeight: 600,
    color: PDF_THEME.green,
  },
  // Bottom insight
  insightBox: {
    backgroundColor: PDF_THEME.sectionBg,
    padding: 12,
    borderRadius: 6,
    borderLeftWidth: 3,
    borderLeftColor: PDF_THEME.red,
    marginTop: 14,
  },
  insightTitle: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 9,
    fontWeight: 600,
    color: PDF_THEME.textPrimary,
    marginBottom: 4,
  },
  insightText: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 8,
    color: PDF_THEME.textSecondary,
    lineHeight: 1.6,
  },
});

interface TimeLostPageProps {
  timeLost: TimeLostBreakdown;
  pageNumber: number;
  totalPages: number;
}

export function TimeLostPage({ timeLost, pageNumber, totalPages }: TimeLostPageProps) {
  const automatableHours = Math.round(
    timeLost.tasks.filter(t => t.automatable).reduce((sum, t) => sum + t.minutesPerMonth, 0) / 60
  );

  return (
    <Page size="A4" style={s.page}>
      <View style={s.header}>
        <Logo size="small" />
        <Text style={s.pageNum}>{pageNumber} / {totalPages}</Text>
      </View>

      <SectionTitle
        title="Estimation du Temps Investi"
        subtitle={`Analyse basee sur un stock de ${timeLost.vehicleCount} vehicules`}
      />

      {/* Summary strip */}
      <View style={s.summaryStrip}>
        <View style={[s.summaryItem, { backgroundColor: PDF_THEME.redDim }]}>
          <Text style={[s.summaryNumber, { color: PDF_THEME.red }]}>{timeLost.totalHoursPerMonth}h</Text>
          <Text style={s.summaryLabel}>heures/mois investies</Text>
        </View>
        <View style={[s.summaryItem, { backgroundColor: PDF_THEME.greenDim }]}>
          <Text style={[s.summaryNumber, { color: PDF_THEME.green }]}>{automatableHours}h</Text>
          <Text style={s.summaryLabel}>automatisables par l'IA</Text>
        </View>
        <View style={s.summaryItem}>
          <Text style={[s.summaryNumber, { color: PDF_THEME.textPrimary }]}>{timeLost.totalCostPerMonth.toLocaleString("fr-BE")} EUR</Text>
          <Text style={s.summaryLabel}>cout mensuel estime (a 35 EUR/h)</Text>
        </View>
        <View style={s.summaryItem}>
          <Text style={[s.summaryNumber, { color: PDF_THEME.red }]}>{timeLost.totalCostPerYear.toLocaleString("fr-BE")} EUR</Text>
          <Text style={s.summaryLabel}>projection annuelle</Text>
        </View>
      </View>

      {/* Table header */}
      <View style={s.tableHeader}>
        <Text style={[s.tableHeaderText, { flex: 2.5 }]}>Tache</Text>
        <Text style={[s.tableHeaderText, { flex: 4 }]}>Detail</Text>
        <Text style={[s.tableHeaderText, { flex: 1, textAlign: "right" }]}>Heures/mois</Text>
        <Text style={[s.tableHeaderText, { flex: 0.8, textAlign: "right" }]}> </Text>
      </View>

      {/* Table rows */}
      {timeLost.tasks.map((task, i) => {
        const hours = Math.round(task.minutesPerMonth / 60 * 10) / 10;
        return (
          <View key={i} style={[s.tableRow, i % 2 === 0 ? {} : { backgroundColor: PDF_THEME.sectionBg }]}>
            <Text style={s.taskName}>{task.label}</Text>
            <Text style={s.taskDesc}>{task.description}</Text>
            <Text style={[s.taskHours, { color: task.automatable ? PDF_THEME.red : PDF_THEME.textSecondary }]}>
              {hours}h
            </Text>
            <View style={s.taskBadge}>
              {task.automatable && (
                <View style={s.aiBadge}>
                  <Text style={s.aiBadgeText}>IA</Text>
                </View>
              )}
            </View>
          </View>
        );
      })}

      {/* Bottom insight */}
      <View style={s.insightBox}>
        <Text style={s.insightTitle}>
          {Math.round(timeLost.totalHoursPerMonth / 8)} jours ouvrables par mois consacres a des taches repetitives
        </Text>
        <Text style={s.insightText}>
          Les taches marquees "IA" representent {automatableHours}h mensuelles que PrismaFlux peut prendre en charge integralement : diffusion multi-plateforme, creation de contenu, retouche photo, reponses aux avis et gestion des emails. Votre equipe se recentre sur la vente et la relation client.
        </Text>
      </View>
    </Page>
  );
}

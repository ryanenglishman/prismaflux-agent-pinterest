import React from "react";
import { Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import { PDF_THEME, impactLabel, difficultyLabel } from "../theme";
import { Logo } from "../components/Logo";
import { SectionTitle } from "../components/SectionTitle";
import type { PriorityAction } from "../../types";

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
  card: {
    padding: 20,
    backgroundColor: PDF_THEME.sectionBg,
    borderRadius: 10,
    marginBottom: 16,
    borderLeftWidth: 4,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  number: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: PDF_THEME.marcusBlue,
    justifyContent: "center",
    alignItems: "center",
  },
  numberText: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 13,
    fontWeight: 700,
    color: "#FFFFFF",
  },
  cardTitle: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 14,
    fontWeight: 700,
    color: PDF_THEME.textPrimary,
    flex: 1,
  },
  cardDescription: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 10,
    color: PDF_THEME.textSecondary,
    lineHeight: 1.6,
    marginBottom: 12,
  },
  badgesRow: {
    flexDirection: "row",
    gap: 8,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
  },
  badgeText: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 8,
    fontWeight: 600,
  },
});

function impactColor(impact: PriorityAction["impact"]) {
  if (impact === "high") return { bg: PDF_THEME.greenDim, text: PDF_THEME.green };
  if (impact === "medium") return { bg: PDF_THEME.yellowDim, text: PDF_THEME.yellow };
  return { bg: PDF_THEME.sectionBg, text: PDF_THEME.textMuted };
}

function borderForIndex(i: number) {
  const colors = [PDF_THEME.green, PDF_THEME.marcusBlue, PDF_THEME.yellow];
  return colors[i] ?? PDF_THEME.marcusBlue;
}

interface ActionsPageProps {
  actions: PriorityAction[];
  pageNumber?: number;
  totalPages?: number;
}

export function ActionsPage({
  actions,
  pageNumber = 12,
  totalPages = 14,
}: ActionsPageProps) {
  return (
    <Page size="A4" style={s.page}>
      <View style={s.header}>
        <Logo size="small" />
        <Text style={s.pageNum}>{pageNumber} / {totalPages}</Text>
      </View>

      <SectionTitle
        title="3 Actions Prioritaires"
        subtitle="Les corrections qui auront le plus d'impact sur votre visibilite"
      />

      {actions.map((action, i) => {
        const ic = impactColor(action.impact);
        return (
          <View
            key={i}
            style={[s.card, { borderLeftColor: borderForIndex(i) }]}
          >
            <View style={s.cardHeader}>
              <View style={s.number}>
                <Text style={s.numberText}>{i + 1}</Text>
              </View>
              <Text style={s.cardTitle}>{action.title}</Text>
            </View>
            <Text style={s.cardDescription}>{action.description}</Text>
            <View style={s.badgesRow}>
              <View style={[s.badge, { backgroundColor: ic.bg }]}>
                <Text style={[s.badgeText, { color: ic.text }]}>
                  {impactLabel(action.impact)}
                </Text>
              </View>
              <View
                style={[s.badge, { backgroundColor: PDF_THEME.marcusBlueDim }]}
              >
                <Text
                  style={[s.badgeText, { color: PDF_THEME.marcusBlue }]}
                >
                  {difficultyLabel(action.difficulty)}
                </Text>
              </View>
            </View>
          </View>
        );
      })}
    </Page>
  );
}

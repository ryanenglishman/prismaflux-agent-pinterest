import React from "react";
import { Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import { PDF_THEME } from "../theme";
import { Logo } from "../components/Logo";
import { SectionTitle } from "../components/SectionTitle";
import { StatusBadge } from "../components/StatusBadge";
import type { AuditCheckItem } from "../../types";

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
  item: {
    marginBottom: 14,
    padding: 14,
    backgroundColor: PDF_THEME.sectionBg,
    borderRadius: 8,
    borderLeftWidth: 3,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  itemLabel: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 12,
    fontWeight: 600,
    color: PDF_THEME.textPrimary,
  },
  itemDetail: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 10,
    color: PDF_THEME.textSecondary,
    lineHeight: 1.5,
    marginBottom: 6,
  },
  recBox: {
    backgroundColor: PDF_THEME.marcusBlueDim,
    padding: 10,
    borderRadius: 6,
    marginTop: 4,
  },
  recLabel: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 8,
    fontWeight: 700,
    color: PDF_THEME.marcusBlue,
    marginBottom: 3,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  recText: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 9,
    color: PDF_THEME.textPrimary,
    lineHeight: 1.5,
  },
});

function borderColor(status: AuditCheckItem["status"]) {
  if (status === "ok") return PDF_THEME.green;
  if (status === "warn") return PDF_THEME.yellow;
  return PDF_THEME.red;
}

interface SeoPageProps {
  checks: AuditCheckItem[];
  pageNumber?: number;
  totalPages?: number;
}

export function SeoPage({
  checks,
  pageNumber = 4,
  totalPages = 14,
}: SeoPageProps) {
  return (
    <Page size="A4" style={s.page}>
      <View style={s.header}>
        <Logo size="small" />
        <Text style={s.pageNum}>{pageNumber} / {totalPages}</Text>
      </View>

      <SectionTitle
        title="SEO On-Page"
        subtitle="Optimisation pour les moteurs de recherche"
      />

      {checks.map((item, i) => (
        <View
          key={i}
          style={[s.item, { borderLeftColor: borderColor(item.status) }]}
        >
          <View style={s.itemHeader}>
            <Text style={s.itemLabel}>{item.label}</Text>
            <StatusBadge status={item.status} />
          </View>
          <Text style={s.itemDetail}>{item.detail}</Text>
          {item.recommendation && (
            <View style={s.recBox}>
              <Text style={s.recLabel}>Recommandation Marcus</Text>
              <Text style={s.recText}>{item.recommendation}</Text>
            </View>
          )}
        </View>
      ))}
    </Page>
  );
}

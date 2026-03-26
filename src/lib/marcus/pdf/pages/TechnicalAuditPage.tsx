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
    marginBottom: 12,
    padding: 12,
    backgroundColor: PDF_THEME.sectionBg,
    borderRadius: 8,
    borderLeftWidth: 3,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  itemLabel: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 11,
    fontWeight: 600,
    color: PDF_THEME.textPrimary,
  },
  itemDetail: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 9,
    color: PDF_THEME.textSecondary,
    lineHeight: 1.5,
    marginBottom: 4,
  },
  recBox: {
    backgroundColor: PDF_THEME.marcusBlueDim,
    padding: 8,
    borderRadius: 6,
    marginTop: 4,
  },
  recLabel: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 7,
    fontWeight: 700,
    color: PDF_THEME.marcusBlue,
    marginBottom: 2,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  recText: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 8,
    color: PDF_THEME.textPrimary,
    lineHeight: 1.5,
  },
});

function borderColor(status: AuditCheckItem["status"]) {
  if (status === "ok") return PDF_THEME.green;
  if (status === "warn") return PDF_THEME.yellow;
  return PDF_THEME.red;
}

function CheckItem({ item }: { item: AuditCheckItem }) {
  return (
    <View
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
  );
}

interface TechnicalAuditPageProps {
  checks: AuditCheckItem[];
  pageNumber?: number;
  totalPages?: number;
}

export function TechnicalAuditPage({
  checks,
  pageNumber = 3,
  totalPages = 14,
}: TechnicalAuditPageProps) {
  return (
    <Page size="A4" style={s.page}>
      <View style={s.header}>
        <Logo size="small" />
        <Text style={s.pageNum}>{pageNumber} / {totalPages}</Text>
      </View>

      <SectionTitle
        title="Audit Technique"
        subtitle="Performance, securite et accessibilite de votre site"
      />

      {checks.map((item, i) => (
        <CheckItem key={i} item={item} />
      ))}
    </Page>
  );
}

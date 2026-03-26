import React from "react";
import { Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import { PDF_THEME } from "../theme";
import { Logo } from "../components/Logo";

const s = StyleSheet.create({
  page: {
    backgroundColor: PDF_THEME.dark,
    padding: 0,
  },
  topSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 60,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 3,
    borderWidth: 0.5,
    borderColor: "#333333",
    marginBottom: 24,
  },
  badgeText: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 7,
    fontWeight: 500,
    color: "#666666",
    textTransform: "uppercase",
    letterSpacing: 2,
  },
  title: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 28,
    fontWeight: 700,
    color: PDF_THEME.textOnDark,
    textAlign: "center",
    marginBottom: 4,
  },
  titleAccent: {
    color: PDF_THEME.brand,
  },
  subtitle: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 10,
    color: "#888888",
    textAlign: "center",
    marginBottom: 32,
  },
  divider: {
    width: 30,
    height: 2,
    backgroundColor: PDF_THEME.brand,
    marginBottom: 24,
  },
  ownerGreeting: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 9,
    color: "#888888",
    textAlign: "center",
    marginBottom: 6,
  },
  dealerName: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 18,
    fontWeight: 600,
    color: PDF_THEME.textOnDark,
    textAlign: "center",
    marginBottom: 6,
  },
  dealerUrl: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 8,
    color: PDF_THEME.brand,
    textAlign: "center",
    marginBottom: 3,
  },
  dealerCity: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 8,
    color: "#666666",
    textAlign: "center",
  },
  brandsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 4,
    marginTop: 16,
    maxWidth: 300,
  },
  brandTag: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 3,
    backgroundColor: "#1A1A1A",
    borderWidth: 0.5,
    borderColor: "#333333",
  },
  brandTagText: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 6,
    color: "#888888",
  },
  // Bottom bar
  bottomBar: {
    backgroundColor: "#0A0A0A",
    paddingVertical: 12,
    paddingHorizontal: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  date: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 7,
    color: "#555555",
  },
  footerText: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 7,
    color: "#555555",
  },
});

interface CoverPageProps {
  dealerName: string;
  dealerUrl: string;
  dealerCity: string;
  auditDate: string;
  ownerName?: string | null;
  carBrands?: string[];
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("fr-BE", { day: "numeric", month: "long", year: "numeric" });
}

export function CoverPage({ dealerName, dealerUrl, dealerCity, auditDate, ownerName, carBrands }: CoverPageProps) {
  return (
    <Page size="A4" style={s.page}>
      <View style={s.topSection}>
        <Logo size="large" variant="dark" />

        <View style={{ marginTop: 32 }}>
          <View style={s.badge}>
            <Text style={s.badgeText}>Rapport confidentiel</Text>
          </View>
        </View>

        <Text style={s.title}>
          Audit <Text style={s.titleAccent}>Digital</Text>
        </Text>
        <Text style={s.subtitle}>Analyse de presence en ligne et potentiel d'optimisation</Text>

        <View style={s.divider} />

        {ownerName && <Text style={s.ownerGreeting}>Prepare pour {ownerName}</Text>}
        <Text style={s.dealerName}>{dealerName}</Text>
        <Text style={s.dealerUrl}>{dealerUrl}</Text>
        <Text style={s.dealerCity}>{dealerCity}</Text>

        {carBrands && carBrands.length > 0 && (
          <View style={s.brandsRow}>
            {carBrands.slice(0, 8).map((brand, i) => (
              <View key={i} style={s.brandTag}>
                <Text style={s.brandTagText}>{brand}</Text>
              </View>
            ))}
          </View>
        )}
      </View>

      <View style={s.bottomBar}>
        <Text style={s.date}>{formatDate(auditDate)}</Text>
        <Text style={s.footerText}>Genere par Marcus IA — PrismaFlux Auto</Text>
      </View>
    </Page>
  );
}

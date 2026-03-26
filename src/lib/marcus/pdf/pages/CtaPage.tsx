import React from "react";
import { Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import { PDF_THEME } from "../theme";
import { Logo } from "../components/Logo";

const s = StyleSheet.create({
  page: {
    backgroundColor: PDF_THEME.pageBg,
    padding: PDF_THEME.margin,
    justifyContent: "center",
  },
  topBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 6,
    backgroundColor: PDF_THEME.prismaRed,
  },
  center: {
    alignItems: "center",
    marginBottom: 36,
  },
  headline: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 24,
    fontWeight: 700,
    color: PDF_THEME.textPrimary,
    textAlign: "center",
    marginBottom: 8,
    marginTop: 24,
  },
  subheadline: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 13,
    color: PDF_THEME.textSecondary,
    textAlign: "center",
    lineHeight: 1.6,
    maxWidth: 380,
    marginBottom: 32,
  },
  priceBox: {
    backgroundColor: PDF_THEME.sectionBg,
    borderWidth: 2,
    borderColor: PDF_THEME.prismaRed,
    borderRadius: 12,
    padding: 24,
    alignItems: "center",
    marginBottom: 32,
    width: "100%",
  },
  priceLabel: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 10,
    fontWeight: 600,
    color: PDF_THEME.textMuted,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 8,
  },
  price: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 36,
    fontWeight: 700,
    color: PDF_THEME.prismaRed,
  },
  priceSuffix: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 14,
    color: PDF_THEME.textMuted,
    marginBottom: 16,
  },
  featuresGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    justifyContent: "center",
    width: "100%",
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    width: "46%",
    marginBottom: 4,
  },
  checkmark: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 10,
    color: PDF_THEME.green,
    fontWeight: 700,
  },
  featureText: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 9,
    color: PDF_THEME.textPrimary,
    flex: 1,
  },
  ctaBox: {
    backgroundColor: PDF_THEME.prismaRed,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 24,
  },
  ctaText: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 14,
    fontWeight: 700,
    color: "#FFFFFF",
  },
  contactSection: {
    alignItems: "center",
    gap: 4,
    marginTop: 8,
  },
  contactLabel: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 9,
    fontWeight: 600,
    color: PDF_THEME.textMuted,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  contactText: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 11,
    color: PDF_THEME.marcusBlue,
  },
  footer: {
    position: "absolute",
    bottom: PDF_THEME.margin,
    left: PDF_THEME.margin,
    right: PDF_THEME.margin,
    alignItems: "center",
    gap: 6,
  },
  footerText: {
    fontFamily: PDF_THEME.fontFamily,
    fontSize: 8,
    color: PDF_THEME.textMuted,
    textAlign: "center",
  },
});

const FEATURES = [
  "Multidiffusion automatique (Robin)",
  "Audit & veille SEO (Marcus)",
  "Retouche photo IA (Lana)",
  "Reporting dirigeant (Pierre)",
  "Tableau de bord unifie",
  "Support prioritaire",
];

export function CtaPage() {
  return (
    <Page size="A4" style={s.page}>
      <View style={s.topBar} />

      <View style={s.center}>
        <Logo size="large" />

        <Text style={s.headline}>
          Corrigez tout cela avec PrismaFlux
        </Text>
        <Text style={s.subheadline}>
          Rejoignez les concessionnaires qui automatisent leur presence digitale
          et gagnent du temps chaque jour.
        </Text>

        <View style={s.priceBox}>
          <Text style={s.priceLabel}>A partir de</Text>
          <Text style={s.price}>749 EUR</Text>
          <Text style={s.priceSuffix}>/ mois — tout inclus</Text>
          <View style={s.featuresGrid}>
            {FEATURES.map((f, i) => (
              <View key={i} style={s.featureItem}>
                <Text style={s.checkmark}>+</Text>
                <Text style={s.featureText}>{f}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={s.ctaBox}>
          <Text style={s.ctaText}>Demander une demo gratuite</Text>
        </View>

        <View style={s.contactSection}>
          <Text style={s.contactLabel}>Contactez-nous</Text>
          <Text style={s.contactText}>contact@prismaflux.com</Text>
          <Text style={s.contactText}>www.prismaflux.com</Text>
        </View>
      </View>

      <View style={s.footer}>
        <Text style={s.footerText}>
          Ce rapport a ete genere automatiquement par Marcus, copilote IA
          PrismaFlux Auto.
        </Text>
        <Text style={s.footerText}>
          Les donnees presentees sont basees sur des analyses publiques et
          peuvent varier.
        </Text>
      </View>
    </Page>
  );
}

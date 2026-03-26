import React from "react";
import { Page, View, Text, Image, StyleSheet } from "@react-pdf/renderer";
import { PDF_THEME } from "../theme";
import { Logo } from "../components/Logo";
import { getRobinAvatar, getMarcusAvatar, getLanaAvatar, getPierreAvatar } from "../components/avatars";

const s = StyleSheet.create({
  page: { backgroundColor: PDF_THEME.dark, padding: 0 },
  content: { flex: 1, paddingHorizontal: 36, paddingTop: 28 },
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 },
  pageNum: { fontFamily: PDF_THEME.fontFamily, fontSize: 7, color: "#555555" },
  title: { fontFamily: PDF_THEME.fontFamily, fontSize: 16, fontWeight: 700, color: PDF_THEME.textOnDark, marginBottom: 3 },
  subtitle: { fontFamily: PDF_THEME.fontFamily, fontSize: 8, color: "#888888", marginBottom: 12 },
  accent: { width: 24, height: 2, backgroundColor: PDF_THEME.brand, borderRadius: 1, marginBottom: 12 },
  // Description
  descText: { fontFamily: PDF_THEME.fontFamily, fontSize: 7, color: "#AAAAAA", lineHeight: 1.6, marginBottom: 12 },
  // Copilots showcase
  sLabel: { fontFamily: PDF_THEME.fontFamily, fontSize: 8, fontWeight: 600, color: "#CCCCCC", marginBottom: 6 },
  copilotsRow: { flexDirection: "row", gap: 8, marginBottom: 12 },
  copilotCard: { flex: 1, padding: 8, borderRadius: 6, backgroundColor: "#1A1A1A", borderWidth: 0.5, borderColor: "#333333", alignItems: "center" },
  copilotAvatar: { width: 32, height: 32, borderRadius: 16, marginBottom: 4 },
  copilotName: { fontFamily: PDF_THEME.fontFamily, fontSize: 8, fontWeight: 600, color: PDF_THEME.textOnDark, marginBottom: 2 },
  copilotRole: { fontFamily: PDF_THEME.fontFamily, fontSize: 6, color: PDF_THEME.brand, marginBottom: 3 },
  copilotDesc: { fontFamily: PDF_THEME.fontFamily, fontSize: 6, color: "#888888", textAlign: "center", lineHeight: 1.4 },
  // Platforms
  platformsRow: { flexDirection: "row", flexWrap: "wrap", gap: 4, marginBottom: 10 },
  platformChip: { paddingHorizontal: 7, paddingVertical: 3, borderRadius: 3, backgroundColor: "#1A1A1A", borderWidth: 0.5, borderColor: "#333333" },
  platformText: { fontFamily: PDF_THEME.fontFamily, fontSize: 6.5, color: "#BBBBBB" },
  // Brands
  brandsRow: { flexDirection: "row", flexWrap: "wrap", gap: 3, marginBottom: 10 },
  brandChip: { paddingHorizontal: 5, paddingVertical: 2, borderRadius: 2, backgroundColor: "#1A1A1A", borderWidth: 0.5, borderColor: "#333333" },
  brandText: { fontFamily: PDF_THEME.fontFamily, fontSize: 6, color: "#777777" },
  // CTA
  ctaSection: { padding: 12, backgroundColor: "#1A1A1A", borderRadius: 6, borderWidth: 1, borderColor: PDF_THEME.brand },
  ctaTitle: { fontFamily: PDF_THEME.fontFamily, fontSize: 12, fontWeight: 700, color: PDF_THEME.textOnDark, marginBottom: 3 },
  ctaSubtitle: { fontFamily: PDF_THEME.fontFamily, fontSize: 7, color: "#888888", marginBottom: 8 },
  priceRow: { flexDirection: "row", alignItems: "baseline", gap: 4, marginBottom: 6 },
  priceLabel: { fontFamily: PDF_THEME.fontFamily, fontSize: 6, color: "#666666", textTransform: "uppercase", letterSpacing: 0.5 },
  price: { fontFamily: PDF_THEME.fontFamily, fontSize: 20, fontWeight: 700, color: PDF_THEME.brand },
  priceSuffix: { fontFamily: PDF_THEME.fontFamily, fontSize: 7, color: "#666666" },
  featuresGrid: { flexDirection: "row", flexWrap: "wrap", gap: 3, marginBottom: 8 },
  featureItem: { flexDirection: "row", alignItems: "center", gap: 2, width: "47%" },
  featureCheck: { fontFamily: PDF_THEME.fontFamily, fontSize: 7, color: PDF_THEME.green, fontWeight: 700 },
  featureText: { fontFamily: PDF_THEME.fontFamily, fontSize: 6.5, color: "#CCCCCC" },
  ctaButton: { backgroundColor: PDF_THEME.brand, paddingVertical: 6, paddingHorizontal: 16, borderRadius: 4, alignSelf: "flex-start" },
  ctaButtonText: { fontFamily: PDF_THEME.fontFamily, fontSize: 8, fontWeight: 700, color: "#FFFFFF" },
  contactRow: { flexDirection: "row", gap: 10, marginTop: 6 },
  contactText: { fontFamily: PDF_THEME.fontFamily, fontSize: 7, color: PDF_THEME.brand },
  // Why
  whyBox: { marginTop: 8, padding: 8, backgroundColor: "#0A0A0A", borderRadius: 4, borderLeftWidth: 2, borderLeftColor: PDF_THEME.brand },
  whyText: { fontFamily: PDF_THEME.fontFamily, fontSize: 6.5, color: "#999999", lineHeight: 1.5 },
  // Footer
  footer: { paddingVertical: 8, paddingHorizontal: 36, backgroundColor: "#0A0A0A" },
  footerText: { fontFamily: PDF_THEME.fontFamily, fontSize: 6, color: "#444444", textAlign: "center" },
});

const PLATFORMS = ["AutoScout24", "GoCar.be", "2ememain", "LeBonCoin", "Facebook Marketplace", "Instagram", "Google Business", "Votre site web"];
const FEATURES = ["Multidiffusion automatique", "Retouche photo IA", "Audit SEO continu", "Reporting dirigeant", "Reponses avis automatiques", "Contenu reseaux sociaux"];

interface SolutionPageProps {
  carBrands: string[];
  prismafluxDescription: string;
  whyPrismaflux: string;
  pageNumber: number;
  totalPages: number;
}

export function SolutionPage({ carBrands, prismafluxDescription, whyPrismaflux, pageNumber, totalPages }: SolutionPageProps) {
  const copilots = [
    { name: "Robin", role: "Diffusion", desc: "Publie vos vehicules sur toutes les plateformes en 30 secondes", avatar: getRobinAvatar() },
    { name: "Marcus", role: "Audit & SEO", desc: "Surveille votre referencement et vos concurrents 24h/24", avatar: getMarcusAvatar() },
    { name: "Lana", role: "Photo & Contenu", desc: "Retouche vos photos et cree du contenu engageant", avatar: getLanaAvatar() },
    { name: "Pierre", role: "Reporting", desc: "Genere vos rapports de performance automatiquement", avatar: getPierreAvatar() },
  ];

  return (
    <Page size="A4" style={s.page}>
      <View style={s.content}>
        <View style={s.headerRow}>
          <Logo size="large" variant="dark" />
          <Text style={s.pageNum}>{pageNumber} / {totalPages}</Text>
        </View>

        <Text style={s.title}>La Solution</Text>
        <Text style={s.subtitle}>Automatisez votre quotidien avec les copilotes IA PrismaFlux</Text>
        <View style={s.accent} />

        <Text style={s.descText}>{prismafluxDescription}</Text>

        {/* Copilots */}
        <Text style={s.sLabel}>Vos copilotes IA</Text>
        <View style={s.copilotsRow}>
          {copilots.map((c, i) => (
            <View key={i} style={s.copilotCard}>
              {c.avatar ? <Image src={c.avatar} style={s.copilotAvatar} /> : null}
              <Text style={s.copilotName}>{c.name}</Text>
              <Text style={s.copilotRole}>{c.role}</Text>
              <Text style={s.copilotDesc}>{c.desc}</Text>
            </View>
          ))}
        </View>

        {/* Platforms */}
        <Text style={s.sLabel}>Plateformes connectees</Text>
        <View style={s.platformsRow}>
          {PLATFORMS.map((p, i) => <View key={i} style={s.platformChip}><Text style={s.platformText}>{p}</Text></View>)}
        </View>

        {/* Brands */}
        {carBrands.length > 0 && (
          <>
            <Text style={[s.sLabel, { fontSize: 7 }]}>Marques detectees ({carBrands.length})</Text>
            <View style={s.brandsRow}>
              {carBrands.map((b, i) => <View key={i} style={s.brandChip}><Text style={s.brandText}>{b}</Text></View>)}
            </View>
          </>
        )}

        {/* CTA */}
        <View style={s.ctaSection}>
          <Text style={s.ctaTitle}>Passez a l'action</Text>
          <Text style={s.ctaSubtitle}>Rejoignez les concessionnaires qui automatisent leur quotidien</Text>
          <Text style={s.priceLabel}>A partir de</Text>
          <View style={s.priceRow}>
            <Text style={s.price}>749 EUR</Text>
            <Text style={s.priceSuffix}>/mois — tout inclus</Text>
          </View>
          <View style={s.featuresGrid}>
            {FEATURES.map((f, i) => (
              <View key={i} style={s.featureItem}>
                <Text style={s.featureCheck}>+</Text>
                <Text style={s.featureText}>{f}</Text>
              </View>
            ))}
          </View>
          <View style={s.ctaButton}><Text style={s.ctaButtonText}>Demander une demo gratuite</Text></View>
          <View style={s.contactRow}>
            <Text style={s.contactText}>contact@prismaflux.com</Text>
            <Text style={s.contactText}>www.prismaflux.com</Text>
          </View>
        </View>

        {/* Why */}
        <View style={s.whyBox}>
          <Text style={s.whyText}>{whyPrismaflux}</Text>
        </View>
      </View>

      <View style={s.footer}>
        <Text style={s.footerText}>Ce rapport a ete genere automatiquement en 30 secondes par Marcus IA. PrismaFlux Auto — Belgique</Text>
      </View>
    </Page>
  );
}

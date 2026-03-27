import React from "react";
import { Page, View, Text, Image, StyleSheet } from "@react-pdf/renderer";
import { PDF_THEME } from "../theme";
import { Logo } from "../components/Logo";
import { getRobinAvatar, getMarcusAvatar, getLanaAvatar, getPierreAvatar } from "../components/avatars";

const s = StyleSheet.create({
  page: { backgroundColor: PDF_THEME.dark, padding: 0 },
  content: { flex: 1, paddingHorizontal: 36, paddingTop: 24 },
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  pageNum: { fontFamily: PDF_THEME.fontFamily, fontSize: 7, color: "#555555" },
  title: { fontFamily: PDF_THEME.fontFamily, fontSize: 14, fontWeight: 700, color: PDF_THEME.textOnDark, marginBottom: 2 },
  subtitle: { fontFamily: PDF_THEME.fontFamily, fontSize: 8, color: "#888888", marginBottom: 6 },
  accent: { width: 24, height: 2, backgroundColor: PDF_THEME.brand, borderRadius: 1, marginBottom: 8 },
  introText: { fontFamily: PDF_THEME.fontFamily, fontSize: 7, color: "#AAAAAA", lineHeight: 1.6, marginBottom: 8 },
  // Copilots - compact 2x2
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginBottom: 8 },
  copilotCard: { width: "48%", padding: 8, borderRadius: 5, backgroundColor: "#1A1A1A", borderWidth: 0.5, borderColor: "#333333" },
  copilotHeader: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 4 },
  copilotAvatar: { width: 28, height: 28, borderRadius: 14 },
  copilotName: { fontFamily: PDF_THEME.fontFamily, fontSize: 9, fontWeight: 700, color: PDF_THEME.textOnDark },
  copilotRole: { fontFamily: PDF_THEME.fontFamily, fontSize: 6, color: PDF_THEME.brand },
  copilotDesc: { fontFamily: PDF_THEME.fontFamily, fontSize: 6, color: "#AAAAAA", lineHeight: 1.45, marginBottom: 4 },
  featureRow: { flexDirection: "row", gap: 3, alignItems: "flex-start", marginBottom: 1.5 },
  featureDot: { fontFamily: PDF_THEME.fontFamily, fontSize: 5.5, color: PDF_THEME.brand, fontWeight: 700, marginTop: 0.5 },
  featureText: { fontFamily: PDF_THEME.fontFamily, fontSize: 5.5, color: "#888888", flex: 1, lineHeight: 1.3 },
  // Platforms strip
  platformsLabel: { fontFamily: PDF_THEME.fontFamily, fontSize: 7, fontWeight: 600, color: "#AAAAAA", marginBottom: 4 },
  platformsRow: { flexDirection: "row", flexWrap: "wrap", gap: 3, marginBottom: 8 },
  platformChip: { paddingHorizontal: 5, paddingVertical: 2, borderRadius: 3, backgroundColor: "#1A1A1A", borderWidth: 0.5, borderColor: "#333333" },
  platformText: { fontFamily: PDF_THEME.fontFamily, fontSize: 6, color: "#888888" },
  pfChip: { backgroundColor: "#2A1515", borderColor: PDF_THEME.brand },
  pfText: { color: PDF_THEME.brand, fontWeight: 600 },
  // CTA
  ctaSection: { padding: 10, backgroundColor: "#1A1A1A", borderRadius: 5, borderWidth: 1, borderColor: PDF_THEME.brand, marginBottom: 6 },
  ctaTitle: { fontFamily: PDF_THEME.fontFamily, fontSize: 12, fontWeight: 700, color: PDF_THEME.textOnDark, marginBottom: 2 },
  ctaSubtitle: { fontFamily: PDF_THEME.fontFamily, fontSize: 7, color: "#888888", lineHeight: 1.5, marginBottom: 6 },
  ctaRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  priceCol: {},
  priceLabel: { fontFamily: PDF_THEME.fontFamily, fontSize: 6, color: "#666666", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 1 },
  priceRow: { flexDirection: "row", alignItems: "baseline", gap: 3 },
  price: { fontFamily: PDF_THEME.fontFamily, fontSize: 18, fontWeight: 700, color: PDF_THEME.brand },
  priceSuffix: { fontFamily: PDF_THEME.fontFamily, fontSize: 7, color: "#666666" },
  ctaButton: { backgroundColor: PDF_THEME.brand, paddingVertical: 5, paddingHorizontal: 12, borderRadius: 4 },
  ctaButtonText: { fontFamily: PDF_THEME.fontFamily, fontSize: 8, fontWeight: 700, color: "#FFFFFF" },
  contactRow: { flexDirection: "row", gap: 10, marginTop: 6 },
  contactText: { fontFamily: PDF_THEME.fontFamily, fontSize: 7, color: PDF_THEME.brand },
  // Closing
  closingBox: { padding: 8, backgroundColor: "#1A1A1A", borderRadius: 4, borderLeftWidth: 2, borderLeftColor: PDF_THEME.brand, marginBottom: 6 },
  closingText: { fontFamily: PDF_THEME.fontFamily, fontSize: 7, color: "#AAAAAA", lineHeight: 1.6 },
  // Footer
  footer: { paddingVertical: 5, paddingHorizontal: 36, backgroundColor: "#0A0A0A" },
  footerText: { fontFamily: PDF_THEME.fontFamily, fontSize: 5, color: "#444444", textAlign: "center", lineHeight: 1.4 },
});

const PLATFORMS = ["AutoScout24", "GoCar.be", "2ememain", "LeBonCoin", "Facebook Marketplace", "Instagram", "Google Business", "Votre site web", "auto-prismaflux.com"];

interface SolutionPageProps {
  dealerName: string;
  whyPrismaflux: string;
  solutionTransition: string;
  closingNote: string;
  pageNumber: number;
  totalPages: number;
}

export function SolutionPage({
  dealerName,
  whyPrismaflux,
  solutionTransition,
  closingNote,
  pageNumber,
  totalPages,
}: SolutionPageProps) {
  const copilots = [
    {
      name: "Robin",
      role: "Diffusion Multi-Plateforme",
      avatar: getRobinAvatar(),
      desc: "Publie vos vehicules sur 9 plateformes en 30 secondes. Remplit les 50-60 champs AutoScout24 automatiquement.",
      features: ["Publication instantanee multi-plateforme", "Synchronisation prix et statuts en temps reel", "Descriptions optimisees par l'IA"],
    },
    {
      name: "Marcus",
      role: "Audit & Veille Concurrentielle",
      avatar: getMarcusAvatar(),
      desc: "Surveille votre positionnement et celui de vos concurrents. C'est lui qui a genere ce rapport.",
      features: ["Score digital et alertes automatiques", "Rapport mensuel de performance", "Veille concurrentielle continue"],
    },
    {
      name: "Lana",
      role: "Photo, Contenu & Reseaux",
      avatar: getLanaAvatar(),
      desc: "Retouche vos photos, cree du contenu et alimente vos reseaux sociaux automatiquement.",
      features: ["Retouche photo professionnelle (arriere-plan, lumiere)", "Posts Facebook et Instagram automatiques", "Stories et reels generes pour chaque vehicule"],
    },
    {
      name: "Pierre",
      role: "Reporting & Tableaux de Bord",
      avatar: getPierreAvatar(),
      desc: "Compile vos performances en rapports clairs. Pas de jargon, que des chiffres utiles.",
      features: ["Rapport mensuel pour la direction", "Suivi ventes et contacts par plateforme", "Alertes stock dormant"],
    },
  ];

  return (
    <Page size="A4" style={s.page}>
      <View style={s.content}>
        <View style={s.headerRow}>
          <Logo size="large" variant="dark" />
          <Text style={s.pageNum}>{pageNumber} / {totalPages}</Text>
        </View>

        <Text style={s.title}>La Solution PrismaFlux</Text>
        <Text style={s.subtitle}>Quatre copilotes IA qui travaillent pour {dealerName} 24h/24</Text>
        <View style={s.accent} />

        <Text style={s.introText}>{solutionTransition}</Text>

        {/* Copilots grid */}
        <View style={s.grid}>
          {copilots.map((c, i) => (
            <View key={i} style={s.copilotCard}>
              <View style={s.copilotHeader}>
                {c.avatar ? <Image src={c.avatar} style={s.copilotAvatar} /> : null}
                <View>
                  <Text style={s.copilotName}>{c.name}</Text>
                  <Text style={s.copilotRole}>{c.role}</Text>
                </View>
              </View>
              <Text style={s.copilotDesc}>{c.desc}</Text>
              {c.features.map((f, j) => (
                <View key={j} style={s.featureRow}>
                  <Text style={s.featureDot}>+</Text>
                  <Text style={s.featureText}>{f}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>

        {/* Platforms */}
        <Text style={s.platformsLabel}>Diffusion automatisee sur 9 canaux</Text>
        <View style={s.platformsRow}>
          {PLATFORMS.map((p, i) => (
            <View key={i} style={[s.platformChip, p === "auto-prismaflux.com" ? s.pfChip : {}]}>
              <Text style={[s.platformText, p === "auto-prismaflux.com" ? s.pfText : {}]}>{p}</Text>
            </View>
          ))}
        </View>

        {/* CTA */}
        <View style={s.ctaSection}>
          <Text style={s.ctaTitle}>Essayez gratuitement</Text>
          <Text style={s.ctaSubtitle}>
            Decouvrez comment Robin, Marcus, Lana et Pierre peuvent transformer le quotidien de {dealerName}. Sans engagement, sans carte bancaire.
          </Text>
          <View style={s.ctaRow}>
            <View style={s.priceCol}>
              <Text style={s.priceLabel}>A partir de</Text>
              <View style={s.priceRow}>
                <Text style={s.price}>749 EUR</Text>
                <Text style={s.priceSuffix}>/mois — tout inclus</Text>
              </View>
            </View>
            <View style={s.ctaButton}><Text style={s.ctaButtonText}>Demarrer l'essai gratuit</Text></View>
          </View>
          <View style={s.contactRow}>
            <Text style={s.contactText}>contact@prismaflux.com</Text>
            <Text style={s.contactText}>auto-prismaflux.com</Text>
          </View>
        </View>

        {/* Closing note */}
        <View style={s.closingBox}>
          <Text style={s.closingText}>{closingNote}</Text>
        </View>
      </View>

      <View style={s.footer}>
        <Text style={s.footerText}>
          Ce rapport a ete genere automatiquement en 30 secondes par Marcus, copilote IA PrismaFlux Auto. Les donnees presentees sont basees sur des sources publiques accessibles au {new Date().toLocaleDateString("fr-BE")}. PrismaFlux Auto — Belgique.
        </Text>
      </View>
    </Page>
  );
}

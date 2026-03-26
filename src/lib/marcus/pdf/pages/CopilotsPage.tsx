import React from "react";
import { Page, View, Text, Image, StyleSheet } from "@react-pdf/renderer";
import { PDF_THEME } from "../theme";
import { Logo } from "../components/Logo";
import { getRobinAvatar, getMarcusAvatar, getLanaAvatar, getPierreAvatar } from "../components/avatars";

const s = StyleSheet.create({
  page: { backgroundColor: PDF_THEME.dark, padding: 0 },
  content: { flex: 1, paddingHorizontal: 36, paddingTop: 24 },
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 14 },
  pageNum: { fontFamily: PDF_THEME.fontFamily, fontSize: 7, color: "#555555" },
  title: { fontFamily: PDF_THEME.fontFamily, fontSize: 16, fontWeight: 700, color: PDF_THEME.textOnDark, marginBottom: 3 },
  subtitle: { fontFamily: PDF_THEME.fontFamily, fontSize: 8, color: "#888888", marginBottom: 10 },
  accent: { width: 24, height: 2, backgroundColor: PDF_THEME.brand, borderRadius: 1, marginBottom: 14 },
  introText: { fontFamily: PDF_THEME.fontFamily, fontSize: 7, color: "#AAAAAA", lineHeight: 1.6, marginBottom: 12 },
  // Copilot cards - 2x2 grid
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 12 },
  copilotCard: { width: "48%", padding: 10, borderRadius: 6, backgroundColor: "#1A1A1A", borderWidth: 0.5, borderColor: "#333333" },
  copilotHeader: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 6 },
  copilotAvatar: { width: 36, height: 36, borderRadius: 18 },
  copilotInfo: { flex: 1 },
  copilotName: { fontFamily: PDF_THEME.fontFamily, fontSize: 10, fontWeight: 700, color: PDF_THEME.textOnDark },
  copilotRole: { fontFamily: PDF_THEME.fontFamily, fontSize: 7, color: PDF_THEME.brand },
  copilotDesc: { fontFamily: PDF_THEME.fontFamily, fontSize: 6.5, color: "#AAAAAA", lineHeight: 1.5, marginBottom: 6 },
  copilotFeatures: { gap: 2 },
  copilotFeature: { flexDirection: "row", gap: 3, alignItems: "flex-start" },
  featureDot: { fontFamily: PDF_THEME.fontFamily, fontSize: 6, color: PDF_THEME.brand, fontWeight: 700, marginTop: 0.5 },
  featureText: { fontFamily: PDF_THEME.fontFamily, fontSize: 6, color: "#888888", flex: 1, lineHeight: 1.3 },
  // CTA
  ctaSection: { padding: 14, backgroundColor: "#1A1A1A", borderRadius: 6, borderWidth: 1, borderColor: PDF_THEME.brand, marginBottom: 8 },
  ctaRow: { flexDirection: "row", alignItems: "center", gap: 16 },
  ctaContent: { flex: 1 },
  ctaTitle: { fontFamily: PDF_THEME.fontFamily, fontSize: 14, fontWeight: 700, color: PDF_THEME.textOnDark, marginBottom: 3 },
  ctaSubtitle: { fontFamily: PDF_THEME.fontFamily, fontSize: 7, color: "#888888", lineHeight: 1.5, marginBottom: 8 },
  priceRow: { flexDirection: "row", alignItems: "baseline", gap: 4, marginBottom: 6 },
  priceLabel: { fontFamily: PDF_THEME.fontFamily, fontSize: 6, color: "#666666", textTransform: "uppercase", letterSpacing: 0.5 },
  price: { fontFamily: PDF_THEME.fontFamily, fontSize: 20, fontWeight: 700, color: PDF_THEME.brand },
  priceSuffix: { fontFamily: PDF_THEME.fontFamily, fontSize: 7, color: "#666666" },
  ctaButton: { backgroundColor: PDF_THEME.brand, paddingVertical: 6, paddingHorizontal: 14, borderRadius: 4, alignSelf: "flex-start", marginBottom: 6 },
  ctaButtonText: { fontFamily: PDF_THEME.fontFamily, fontSize: 8, fontWeight: 700, color: "#FFFFFF" },
  contactRow: { flexDirection: "row", gap: 10 },
  contactText: { fontFamily: PDF_THEME.fontFamily, fontSize: 7, color: PDF_THEME.brand },
  // Footer
  footer: { paddingVertical: 6, paddingHorizontal: 36, backgroundColor: "#0A0A0A" },
  footerText: { fontFamily: PDF_THEME.fontFamily, fontSize: 5.5, color: "#444444", textAlign: "center", lineHeight: 1.4 },
});

interface CopilotsPageProps {
  dealerName: string;
  whyPrismaflux: string;
  pageNumber: number;
  totalPages: number;
}

export function CopilotsPage({ dealerName, whyPrismaflux, pageNumber, totalPages }: CopilotsPageProps) {
  const copilots = [
    {
      name: "Robin",
      role: "Diffusion Multi-Plateforme",
      avatar: getRobinAvatar(),
      desc: "Robin prend en charge la publication de vos vehicules sur l'ensemble de vos canaux de vente. Un vehicule ajoute une seule fois apparait simultanement sur 9 plateformes.",
      features: ["Publication en 30 secondes au lieu de 25 minutes", "Remplissage automatique des 50-60 champs AutoScout24", "Synchronisation des statuts et prix en temps reel"],
    },
    {
      name: "Marcus",
      role: "Audit & Veille Concurrentielle",
      avatar: getMarcusAvatar(),
      desc: "Marcus surveille en continu votre positionnement en ligne et celui de vos concurrents. C'est lui qui a genere ce rapport d'analyse.",
      features: ["Suivi de votre score digital et de vos concurrents", "Alertes sur les opportunites d'amelioration", "Rapports mensuels automatiques"],
    },
    {
      name: "Lana",
      role: "Photo, Contenu & Reseaux Sociaux",
      avatar: getLanaAvatar(),
      desc: "Lana transforme vos photos brutes en visuels professionnels et cree du contenu engage pour vos reseaux sociaux automatiquement.",
      features: ["Retouche photo automatique (arriere-plan, luminosite)", "Posts Facebook et Instagram generes pour chaque vehicule", "Descriptions d'annonces optimisees par l'IA"],
    },
    {
      name: "Pierre",
      role: "Reporting & Tableaux de Bord",
      avatar: getPierreAvatar(),
      desc: "Pierre compile les performances de votre concession en rapports clairs destines a la direction. Pas de jargon, que des chiffres actionables.",
      features: ["Rapport mensuel automatique pour le dirigeant", "Suivi des ventes, contacts et performances par plateforme", "Alertes sur les vehicules en stock depuis trop longtemps"],
    },
  ];

  return (
    <Page size="A4" style={s.page}>
      <View style={s.content}>
        <View style={s.headerRow}>
          <Logo size="large" variant="dark" />
          <Text style={s.pageNum}>{pageNumber} / {totalPages}</Text>
        </View>

        <Text style={s.title}>Vos Copilotes IA</Text>
        <Text style={s.subtitle}>Quatre specialistes qui travaillent pour {dealerName} 24h/24</Text>
        <View style={s.accent} />

        <Text style={s.introText}>{whyPrismaflux}</Text>

        {/* Copilots grid */}
        <View style={s.grid}>
          {copilots.map((c, i) => (
            <View key={i} style={s.copilotCard}>
              <View style={s.copilotHeader}>
                {c.avatar ? <Image src={c.avatar} style={s.copilotAvatar} /> : null}
                <View style={s.copilotInfo}>
                  <Text style={s.copilotName}>{c.name}</Text>
                  <Text style={s.copilotRole}>{c.role}</Text>
                </View>
              </View>
              <Text style={s.copilotDesc}>{c.desc}</Text>
              <View style={s.copilotFeatures}>
                {c.features.map((f, j) => (
                  <View key={j} style={s.copilotFeature}>
                    <Text style={s.featureDot}>+</Text>
                    <Text style={s.featureText}>{f}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>

        {/* CTA */}
        <View style={s.ctaSection}>
          <Text style={s.ctaTitle}>Essayez gratuitement</Text>
          <Text style={s.ctaSubtitle}>
            Decouvrez comment Robin, Marcus, Lana et Pierre peuvent transformer le quotidien de {dealerName}. Sans engagement, sans carte bancaire.
          </Text>
          <Text style={s.priceLabel}>A partir de</Text>
          <View style={s.priceRow}>
            <Text style={s.price}>749 EUR</Text>
            <Text style={s.priceSuffix}>/mois — tout inclus</Text>
          </View>
          <View style={s.ctaButton}><Text style={s.ctaButtonText}>Demarrer l'essai gratuit</Text></View>
          <View style={s.contactRow}>
            <Text style={s.contactText}>contact@prismaflux.com</Text>
            <Text style={s.contactText}>auto-prismaflux.com</Text>
          </View>
        </View>
      </View>

      <View style={s.footer}>
        <Text style={s.footerText}>
          Ce rapport a ete genere automatiquement en 30 secondes par Marcus, copilote IA PrismaFlux Auto. Les donnees presentees sont basees sur des sources publiques et peuvent varier. PrismaFlux Auto — Belgique.
        </Text>
      </View>
    </Page>
  );
}

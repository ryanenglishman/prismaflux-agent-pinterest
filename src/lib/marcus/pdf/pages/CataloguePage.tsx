import React from "react";
import { Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import { PDF_THEME } from "../theme";
import { PageHeader } from "../components/PageHeader";
import { SectionTitle } from "../components/SectionTitle";

const s = StyleSheet.create({
  page: { backgroundColor: PDF_THEME.pageBg, padding: PDF_THEME.margin },
  introText: { fontFamily: PDF_THEME.fontFamily, fontSize: 7, color: PDF_THEME.textSecondary, lineHeight: 1.6, marginBottom: 10 },
  // Two columns
  columnsRow: { flexDirection: "row", gap: 10, marginBottom: 12 },
  column: { flex: 1 },
  columnTitle: { fontFamily: PDF_THEME.fontFamily, fontSize: 9, fontWeight: 600, color: PDF_THEME.textPrimary, marginBottom: 6 },
  columnSubtitle: { fontFamily: PDF_THEME.fontFamily, fontSize: 7, color: PDF_THEME.brand, marginBottom: 4 },
  // Feature list
  featureItem: { flexDirection: "row", gap: 4, marginBottom: 4, alignItems: "flex-start" },
  featureBullet: { fontFamily: PDF_THEME.fontFamily, fontSize: 7, color: PDF_THEME.brand, fontWeight: 700, marginTop: 0.5 },
  featureText: { fontFamily: PDF_THEME.fontFamily, fontSize: 7, color: PDF_THEME.textSecondary, lineHeight: 1.5, flex: 1 },
  featureBold: { fontWeight: 600, color: PDF_THEME.textPrimary },
  // Comparison box
  compBox: { flexDirection: "row", gap: 8, marginBottom: 10 },
  compCard: { flex: 1, padding: 10, borderRadius: 6, borderWidth: 0.5 },
  compTitle: { fontFamily: PDF_THEME.fontFamily, fontSize: 8, fontWeight: 600, marginBottom: 6 },
  compItem: { flexDirection: "row", gap: 3, marginBottom: 3 },
  compDot: { width: 3, height: 3, borderRadius: 1.5, marginTop: 3 },
  compText: { fontFamily: PDF_THEME.fontFamily, fontSize: 6.5, color: PDF_THEME.textSecondary, flex: 1, lineHeight: 1.4 },
  // Platforms strip
  sLabel: { fontFamily: PDF_THEME.fontFamily, fontSize: 8, fontWeight: 600, color: PDF_THEME.textPrimary, marginBottom: 4 },
  platformsRow: { flexDirection: "row", flexWrap: "wrap", gap: 4, marginBottom: 10 },
  platformChip: { paddingHorizontal: 6, paddingVertical: 3, borderRadius: 3, backgroundColor: PDF_THEME.sectionBg, borderWidth: 0.5, borderColor: PDF_THEME.borderLight },
  platformText: { fontFamily: PDF_THEME.fontFamily, fontSize: 6.5, color: PDF_THEME.textSecondary },
  // Brands
  brandsRow: { flexDirection: "row", flexWrap: "wrap", gap: 3, marginBottom: 8 },
  brandChip: { paddingHorizontal: 5, paddingVertical: 2, borderRadius: 2, backgroundColor: PDF_THEME.brandDim },
  brandText: { fontFamily: PDF_THEME.fontFamily, fontSize: 6, color: PDF_THEME.brand },
  // Bottom note
  noteBox: { padding: 8, backgroundColor: PDF_THEME.sectionBg, borderRadius: 4, borderLeftWidth: 2, borderLeftColor: PDF_THEME.brand },
  noteText: { fontFamily: PDF_THEME.fontFamily, fontSize: 7, color: PDF_THEME.textSecondary, lineHeight: 1.6 },
});

const CATALOGUE_FEATURES = [
  { bold: "Recherche intelligente", text: "Les acheteurs trouvent vos vehicules grace a des filtres avances (marque, prix, kilometrage, localisation) et des suggestions personnalisees." },
  { bold: "Fiches vehicules enrichies", text: "Chaque annonce est automatiquement optimisee avec des descriptions professionnelles, des photos retouchees et des informations techniques completes." },
  { bold: "Demandes de contact directes", text: "Les acheteurs interessees vous contactent directement depuis la fiche vehicule — pas d'intermediaire, pas de commission sur la vente." },
  { bold: "Visibilite locale", text: "Le catalogue met en avant les concessionnaires proches de l'acheteur. Votre zone de chalandise est respectee." },
];

const INTEGRATION_FEATURES = [
  { bold: "Widget integrable", text: "Affichez votre stock directement sur votre propre site web grace a un widget personnalisable aux couleurs de votre concession." },
  { bold: "Synchronisation automatique", text: "Ajoutez un vehicule une seule fois — il apparait simultanement sur le catalogue PrismaFlux, votre site web, et toutes vos plateformes de diffusion." },
  { bold: "Mise a jour en temps reel", text: "Vendu, reserve, prix modifie — les changements se propagent instantanement partout, sans intervention manuelle." },
  { bold: "Statistiques de performance", text: "Suivez le nombre de vues, de clics et de contacts generes par chaque vehicule sur chaque plateforme." },
];

const PLATFORMS = ["AutoScout24", "GoCar.be", "2ememain", "LeBonCoin", "Facebook Marketplace", "Instagram", "Google Business", "Votre site web", "auto-prismaflux.com"];

interface CataloguePageProps {
  carBrands: string[];
  dealerName: string;
  pageNumber: number;
  totalPages: number;
}

export function CataloguePage({ carBrands, dealerName, pageNumber, totalPages }: CataloguePageProps) {
  return (
    <Page size="A4" style={s.page}>
      <PageHeader pageNumber={pageNumber} totalPages={totalPages} />

      <SectionTitle title="Le Catalogue PrismaFlux" subtitle="auto-prismaflux.com \u2014 Une vitrine supplementaire pour vos vehicules" />

      <Text style={s.introText}>
        En plus de diffuser vos annonces sur les plateformes classiques (AutoScout24, GoCar, LeBonCoin...), PrismaFlux met a votre disposition son propre catalogue en ligne. C'est une vitrine supplementaire, incluse dans votre abonnement, qui vous donne de la visibilite aupres d'acheteurs deja en recherche active — sans cout additionnel et sans commission sur les ventes.
      </Text>

      {/* Two columns: catalogue + integration */}
      <View style={s.columnsRow}>
        <View style={s.column}>
          <Text style={s.columnTitle}>Catalogue public</Text>
          <Text style={s.columnSubtitle}>auto-prismaflux.com</Text>
          {CATALOGUE_FEATURES.map((f, i) => (
            <View key={i} style={s.featureItem}>
              <Text style={s.featureBullet}>+</Text>
              <Text style={s.featureText}>
                <Text style={s.featureBold}>{f.bold}</Text> — {f.text}
              </Text>
            </View>
          ))}
        </View>
        <View style={s.column}>
          <Text style={s.columnTitle}>Integration sur votre site</Text>
          <Text style={s.columnSubtitle}>Widget personnalisable</Text>
          {INTEGRATION_FEATURES.map((f, i) => (
            <View key={i} style={s.featureItem}>
              <Text style={s.featureBullet}>+</Text>
              <Text style={s.featureText}>
                <Text style={s.featureBold}>{f.bold}</Text> — {f.text}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Cost comparison */}
      <View style={s.compBox}>
        <View style={[s.compCard, { borderColor: PDF_THEME.red, backgroundColor: PDF_THEME.redDim }]}>
          <Text style={[s.compTitle, { color: PDF_THEME.red }]}>Plateformes classiques</Text>
          <View style={s.compItem}><View style={[s.compDot, { backgroundColor: PDF_THEME.red }]} /><Text style={s.compText}>Abonnement mensuel par plateforme (50-300 EUR chacune)</Text></View>
          <View style={s.compItem}><View style={[s.compDot, { backgroundColor: PDF_THEME.red }]} /><Text style={s.compText}>Publication manuelle sur chaque site (25 min/vehicule)</Text></View>
          <View style={s.compItem}><View style={[s.compDot, { backgroundColor: PDF_THEME.red }]} /><Text style={s.compText}>Pas de synchronisation entre plateformes</Text></View>
        </View>
        <View style={[s.compCard, { borderColor: PDF_THEME.green, backgroundColor: PDF_THEME.greenDim }]}>
          <Text style={[s.compTitle, { color: PDF_THEME.green }]}>Avec PrismaFlux</Text>
          <View style={s.compItem}><View style={[s.compDot, { backgroundColor: PDF_THEME.green }]} /><Text style={s.compText}>Diffusion unique, publication sur 9 plateformes simultanement</Text></View>
          <View style={s.compItem}><View style={[s.compDot, { backgroundColor: PDF_THEME.green }]} /><Text style={s.compText}>Catalogue PrismaFlux inclus sans cout supplementaire</Text></View>
          <View style={s.compItem}><View style={[s.compDot, { backgroundColor: PDF_THEME.green }]} /><Text style={s.compText}>Synchronisation automatique en temps reel</Text></View>
        </View>
      </View>

      {/* Platforms */}
      <Text style={s.sLabel}>Diffusion automatisee sur 9 canaux</Text>
      <View style={s.platformsRow}>
        {PLATFORMS.map((p, i) => (
          <View key={i} style={[s.platformChip, p === "auto-prismaflux.com" ? { backgroundColor: PDF_THEME.brandDim, borderColor: PDF_THEME.brand } : {}]}>
            <Text style={[s.platformText, p === "auto-prismaflux.com" ? { color: PDF_THEME.brand, fontWeight: 600 } : {}]}>{p}</Text>
          </View>
        ))}
      </View>

      {/* Brands */}
      {carBrands.length > 0 && (
        <>
          <Text style={[s.sLabel, { fontSize: 7 }]}>Marques detectees chez {dealerName} ({carBrands.length})</Text>
          <View style={s.brandsRow}>
            {carBrands.map((b, i) => <View key={i} style={s.brandChip}><Text style={s.brandText}>{b}</Text></View>)}
          </View>
        </>
      )}

      <View style={s.noteBox}>
        <Text style={s.noteText}>
          Le catalogue auto-prismaflux.com est inclus dans tous les abonnements. Vos vehicules y sont publies automatiquement des leur ajout dans le systeme, avec les memes descriptions et photos optimisees que sur les autres plateformes. C'est un canal de visibilite supplementaire sans effort ni investissement additionnel.
        </Text>
      </View>
    </Page>
  );
}

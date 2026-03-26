import React from "react";
import { Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import { PDF_THEME } from "../theme";
import { PageHeader } from "../components/PageHeader";
import { SectionTitle } from "../components/SectionTitle";
import type { CompanyProfileData } from "../../types";

const s = StyleSheet.create({
  page: { backgroundColor: PDF_THEME.pageBg, padding: PDF_THEME.margin },
  introText: { fontFamily: PDF_THEME.fontFamily, fontSize: 7, color: PDF_THEME.textSecondary, lineHeight: 1.6, marginBottom: 10 },
  // Info card
  infoCard: { padding: 12, backgroundColor: PDF_THEME.sectionBg, borderRadius: 6, borderLeftWidth: 3, borderLeftColor: PDF_THEME.brand, marginBottom: 10 },
  infoGrid: { flexDirection: "row", flexWrap: "wrap", gap: 4 },
  infoItem: { width: "48%", flexDirection: "row", gap: 4, marginBottom: 4 },
  infoLabel: { fontFamily: PDF_THEME.fontFamily, fontSize: 6, fontWeight: 600, color: PDF_THEME.textMuted, width: 60 },
  infoValue: { fontFamily: PDF_THEME.fontFamily, fontSize: 7, color: PDF_THEME.textPrimary, flex: 1 },
  // Financials strip
  financialsRow: { flexDirection: "row", gap: 8, marginBottom: 10 },
  finCard: { flex: 1, padding: 8, borderRadius: 4, borderWidth: 0.5, borderColor: PDF_THEME.borderLight, backgroundColor: PDF_THEME.sectionBg, alignItems: "center" },
  finNumber: { fontFamily: PDF_THEME.fontFamily, fontSize: 14, fontWeight: 700, marginBottom: 2 },
  finLabel: { fontFamily: PDF_THEME.fontFamily, fontSize: 6, color: PDF_THEME.textMuted, textAlign: "center" },
  // Admins section
  sLabel: { fontFamily: PDF_THEME.fontFamily, fontSize: 8, fontWeight: 600, color: PDF_THEME.textPrimary, marginBottom: 4, marginTop: 4 },
  adminCard: { padding: 8, backgroundColor: PDF_THEME.sectionBg, borderRadius: 4, marginBottom: 4, flexDirection: "row", gap: 8, alignItems: "flex-start" },
  adminIcon: { width: 28, height: 28, borderRadius: 14, backgroundColor: PDF_THEME.brand, justifyContent: "center", alignItems: "center" },
  adminInitial: { fontFamily: PDF_THEME.fontFamily, fontSize: 11, fontWeight: 700, color: "#FFFFFF" },
  adminContent: { flex: 1 },
  adminName: { fontFamily: PDF_THEME.fontFamily, fontSize: 8, fontWeight: 600, color: PDF_THEME.textPrimary, marginBottom: 1 },
  adminRole: { fontFamily: PDF_THEME.fontFamily, fontSize: 6.5, color: PDF_THEME.brand, marginBottom: 2 },
  adminDetail: { fontFamily: PDF_THEME.fontFamily, fontSize: 6.5, color: PDF_THEME.textSecondary, lineHeight: 1.4 },
  // Narrative
  narrativeBox: { padding: 10, backgroundColor: PDF_THEME.sectionBg, borderRadius: 4, borderLeftWidth: 2, borderLeftColor: PDF_THEME.brand, marginTop: 6 },
  narrativeText: { fontFamily: PDF_THEME.fontFamily, fontSize: 7, color: PDF_THEME.textSecondary, lineHeight: 1.6 },
  // Fallback when no CompanyWeb data
  fallbackBox: { padding: 16, backgroundColor: PDF_THEME.sectionBg, borderRadius: 6, alignItems: "center" },
  fallbackText: { fontFamily: PDF_THEME.fontFamily, fontSize: 8, color: PDF_THEME.textMuted, textAlign: "center", lineHeight: 1.6 },
});

interface CompanyPageProps {
  dealerName: string;
  dealerCity: string;
  companyProfile: CompanyProfileData | null;
  ownerName: string | null;
  pageNumber: number;
  totalPages: number;
}

function formatCurrency(val: number): string {
  if (Math.abs(val) >= 1_000_000) return `${(val / 1_000_000).toFixed(1)}M EUR`;
  return `${Math.round(val).toLocaleString("fr-BE")} EUR`;
}

export function CompanyPage({ dealerName, dealerCity, companyProfile, ownerName, pageNumber, totalPages }: CompanyPageProps) {
  const cp = companyProfile;

  return (
    <Page size="A4" style={s.page}>
      <PageHeader pageNumber={pageNumber} totalPages={totalPages} />

      <SectionTitle title="Votre Entreprise" subtitle={dealerName} />

      <Text style={s.introText}>
        Avant d'analyser votre presence en ligne, nous avons rassemble les informations publiques disponibles sur votre entreprise. Cette section vous permet de verifier que nous nous adressons bien a la bonne structure et de contextualiser les recommandations qui suivent.
      </Text>

      {cp ? (
        <>
          {/* Company info card */}
          <View style={s.infoCard}>
            <View style={s.infoGrid}>
              <View style={s.infoItem}>
                <Text style={s.infoLabel}>Societe</Text>
                <Text style={s.infoValue}>{dealerName}</Text>
              </View>
              {cp.legalForm && (
                <View style={s.infoItem}>
                  <Text style={s.infoLabel}>Forme</Text>
                  <Text style={s.infoValue}>{cp.legalForm}</Text>
                </View>
              )}
              <View style={s.infoItem}>
                <Text style={s.infoLabel}>BCE</Text>
                <Text style={s.infoValue}>{cp.companyNumber}</Text>
              </View>
              {cp.address && (
                <View style={s.infoItem}>
                  <Text style={s.infoLabel}>Siege</Text>
                  <Text style={s.infoValue}>{cp.address}</Text>
                </View>
              )}
              {cp.creationDate && (
                <View style={s.infoItem}>
                  <Text style={s.infoLabel}>Creation</Text>
                  <Text style={s.infoValue}>{cp.creationDate}</Text>
                </View>
              )}
              {cp.employees !== null && (
                <View style={s.infoItem}>
                  <Text style={s.infoLabel}>Personnel</Text>
                  <Text style={s.infoValue}>{cp.employees} personne(s)</Text>
                </View>
              )}
            </View>
          </View>

          {/* Financials */}
          {(cp.revenue !== null || cp.grossMargin !== null) && (
            <View style={s.financialsRow}>
              {cp.revenue !== null && (
                <View style={s.finCard}>
                  <Text style={[s.finNumber, { color: PDF_THEME.textPrimary }]}>{formatCurrency(cp.revenue)}</Text>
                  <Text style={s.finLabel}>Chiffre d'affaires (dernier publie)</Text>
                </View>
              )}
              {cp.grossMargin !== null && (
                <View style={s.finCard}>
                  <Text style={[s.finNumber, { color: cp.grossMargin > 0 ? PDF_THEME.green : PDF_THEME.red }]}>{formatCurrency(cp.grossMargin)}</Text>
                  <Text style={s.finLabel}>Marge brute</Text>
                </View>
              )}
              {cp.employees !== null && (
                <View style={s.finCard}>
                  <Text style={[s.finNumber, { color: PDF_THEME.textPrimary }]}>{cp.employees}</Text>
                  <Text style={s.finLabel}>Collaborateurs</Text>
                </View>
              )}
            </View>
          )}

          {/* Current admins */}
          {cp.currentAdmins.length > 0 && (
            <>
              <Text style={s.sLabel}>Direction actuelle</Text>
              {cp.currentAdmins.map((admin, i) => (
                <View key={i} style={s.adminCard}>
                  <View style={s.adminIcon}>
                    <Text style={s.adminInitial}>{admin.name.charAt(0)}</Text>
                  </View>
                  <View style={s.adminContent}>
                    <Text style={s.adminName}>{admin.name}</Text>
                    {admin.role && <Text style={s.adminRole}>{admin.role}</Text>}
                    {admin.startDate && (
                      <Text style={s.adminDetail}>En fonction depuis le {admin.startDate}</Text>
                    )}
                  </View>
                </View>
              ))}
            </>
          )}

          {/* Historical admins */}
          {cp.historicalAdmins.length > 0 && (
            <>
              <Text style={[s.sLabel, { fontSize: 7, color: PDF_THEME.textMuted }]}>
                Anciens dirigeants : {cp.historicalAdmins.map(a => a.name).join(", ")}
              </Text>
            </>
          )}

          {/* Narrative */}
          <View style={s.narrativeBox}>
            <Text style={s.narrativeText}>{cp.companyNarrative}</Text>
          </View>
        </>
      ) : (
        /* Fallback when no CompanyWeb data */
        <>
          <View style={s.fallbackBox}>
            <Text style={s.fallbackText}>
              Les informations publiques de {dealerName} ({dealerCity}) n'ont pas pu etre retrouvees automatiquement sur les registres belges.
              {ownerName ? `\n\nCe rapport est neanmoins prepare a l'attention de ${ownerName}.` : ""}
              {"\n\n"}Les recommandations qui suivent se basent sur l'analyse directe de votre site web et de votre environnement concurrentiel.
            </Text>
          </View>
        </>
      )}
    </Page>
  );
}

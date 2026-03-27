import React from "react";
import { Page, View, Text, Svg, Rect, StyleSheet } from "@react-pdf/renderer";
import { PDF_THEME } from "../theme";
import { PageHeader } from "../components/PageHeader";
import { SectionTitle } from "../components/SectionTitle";
import { MarcusComment } from "../components/MarcusComment";
import type { CompanyProfileData, TechnologyProfileData, WaybackProfileData } from "../../types";

const s = StyleSheet.create({
  page: { backgroundColor: PDF_THEME.pageBg, padding: PDF_THEME.margin },
  introText: { fontFamily: PDF_THEME.fontFamily, fontSize: 7, color: PDF_THEME.textSecondary, lineHeight: 1.6, marginBottom: 8 },
  // Info card
  infoCard: { padding: 10, backgroundColor: PDF_THEME.sectionBg, borderRadius: 5, borderLeftWidth: 3, borderLeftColor: PDF_THEME.brand, marginBottom: 6 },
  infoGrid: { flexDirection: "row", flexWrap: "wrap", gap: 3 },
  infoItem: { width: "48%", flexDirection: "row", gap: 4, marginBottom: 3 },
  infoLabel: { fontFamily: PDF_THEME.fontFamily, fontSize: 6, fontWeight: 600, color: PDF_THEME.textMuted, width: 55 },
  infoValue: { fontFamily: PDF_THEME.fontFamily, fontSize: 6.5, color: PDF_THEME.textPrimary, flex: 1 },
  // Financials
  financialsRow: { flexDirection: "row", gap: 6, marginBottom: 6 },
  finCard: { flex: 1, padding: 5, borderRadius: 4, borderWidth: 0.5, borderColor: PDF_THEME.borderLight, backgroundColor: PDF_THEME.sectionBg, alignItems: "center" },
  finNumber: { fontFamily: PDF_THEME.fontFamily, fontSize: 11, fontWeight: 700, marginBottom: 1 },
  finLabel: { fontFamily: PDF_THEME.fontFamily, fontSize: 5.5, color: PDF_THEME.textMuted, textAlign: "center" },
  // Admins
  sLabel: { fontFamily: PDF_THEME.fontFamily, fontSize: 7.5, fontWeight: 600, color: PDF_THEME.textPrimary, marginBottom: 3, marginTop: 4 },
  adminRow: { flexDirection: "row", gap: 6, alignItems: "center", padding: 5, backgroundColor: PDF_THEME.sectionBg, borderRadius: 4, marginBottom: 3 },
  adminIcon: { width: 20, height: 20, borderRadius: 10, backgroundColor: PDF_THEME.brand, justifyContent: "center", alignItems: "center" },
  adminInitial: { fontFamily: PDF_THEME.fontFamily, fontSize: 8, fontWeight: 700, color: "#FFFFFF" },
  adminName: { fontFamily: PDF_THEME.fontFamily, fontSize: 7, fontWeight: 600, color: PDF_THEME.textPrimary },
  adminRole: { fontFamily: PDF_THEME.fontFamily, fontSize: 6, color: PDF_THEME.brand },
  adminDate: { fontFamily: PDF_THEME.fontFamily, fontSize: 6, color: PDF_THEME.textMuted },
  divider: { height: 0.5, backgroundColor: PDF_THEME.border, marginVertical: 5 },
  // TECH: grouped by category
  techGroupRow: { flexDirection: "row", gap: 4, marginBottom: 4, alignItems: "flex-start" },
  techGroupLabel: { fontFamily: PDF_THEME.fontFamily, fontSize: 6, fontWeight: 600, color: PDF_THEME.textMuted, width: 65, paddingTop: 2 },
  techGroupChips: { flexDirection: "row", flexWrap: "wrap", gap: 3, flex: 1 },
  techChipOk: { paddingHorizontal: 5, paddingVertical: 2, borderRadius: 3, backgroundColor: PDF_THEME.greenDim },
  techChipOkText: { fontFamily: PDF_THEME.fontFamily, fontSize: 6, color: PDF_THEME.green, fontWeight: 500 },
  techChipWarn: { paddingHorizontal: 5, paddingVertical: 2, borderRadius: 3, backgroundColor: PDF_THEME.redDim },
  techChipWarnText: { fontFamily: PDF_THEME.fontFamily, fontSize: 6, color: PDF_THEME.red, fontWeight: 500 },
  techChipNeutral: { paddingHorizontal: 5, paddingVertical: 2, borderRadius: 3, backgroundColor: PDF_THEME.sectionBg, borderWidth: 0.5, borderColor: PDF_THEME.borderLight },
  techChipNeutralText: { fontFamily: PDF_THEME.fontFamily, fontSize: 6, color: PDF_THEME.textSecondary },
  // WAYBACK: stats + mini bar chart
  waybackRow: { flexDirection: "row", gap: 6, marginBottom: 4 },
  waybackStat: { flex: 1, paddingVertical: 3, paddingHorizontal: 4, borderRadius: 3, backgroundColor: PDF_THEME.sectionBg },
  waybackNum: { fontFamily: PDF_THEME.fontFamily, fontSize: 9, fontWeight: 700, marginBottom: 1 },
  waybackLbl: { fontFamily: PDF_THEME.fontFamily, fontSize: 5, color: PDF_THEME.textMuted },
  // Mini bar chart
  chartContainer: { padding: 6, backgroundColor: PDF_THEME.sectionBg, borderRadius: 4, marginBottom: 4 },
  chartTitle: { fontFamily: PDF_THEME.fontFamily, fontSize: 6, fontWeight: 600, color: PDF_THEME.textMuted, marginBottom: 4 },
  chartLabels: { flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 2, marginTop: 2 },
  chartLabel: { fontFamily: PDF_THEME.fontFamily, fontSize: 5, color: PDF_THEME.textMuted, textAlign: "center" },
  // Narrative
  narrativeBox: { padding: 7, backgroundColor: PDF_THEME.sectionBg, borderRadius: 4, borderLeftWidth: 2, borderLeftColor: PDF_THEME.brand, marginTop: 3 },
  narrativeText: { fontFamily: PDF_THEME.fontFamily, fontSize: 6.5, color: PDF_THEME.textSecondary, lineHeight: 1.55 },
  // Fallback
  fallbackBox: { padding: 12, backgroundColor: PDF_THEME.sectionBg, borderRadius: 5, alignItems: "center" },
  fallbackText: { fontFamily: PDF_THEME.fontFamily, fontSize: 7, color: PDF_THEME.textMuted, textAlign: "center", lineHeight: 1.6 },
});

// Category display config: label, which are "positive" (green chip)
const POSITIVE_CATEGORIES = ["Analytics", "Tag Manager", "Cookie Consent", "Chat", "CRM/Marketing"];
const CATEGORY_ORDER = ["CMS", "CMS/E-commerce", "E-commerce", "CMS/ERP", "Analytics", "Tag Manager", "Cookie Consent", "Framework", "Static Gen", "CSS Framework", "JS Library", "CDN/Hosting", "Hosting", "Chat", "CRM/Marketing", "Marketing"];
const CATEGORY_LABELS: Record<string, string> = {
  "CMS": "CMS", "CMS/E-commerce": "CMS / E-com", "E-commerce": "E-commerce", "CMS/ERP": "CMS / ERP",
  "Analytics": "Analytics", "Tag Manager": "Tag Manager", "Cookie Consent": "Cookies/RGPD",
  "Framework": "Framework", "Static Gen": "Generateur", "CSS Framework": "CSS", "JS Library": "JS",
  "CDN/Hosting": "CDN/Hosting", "Hosting": "Hebergement", "Chat": "Chat", "CRM/Marketing": "CRM/Marketing", "Marketing": "Marketing",
};

interface CompanyPageProps {
  dealerName: string;
  dealerCity: string;
  companyProfile: CompanyProfileData | null;
  ownerName: string | null;
  companyIntro: string;
  technologyProfile: TechnologyProfileData | null;
  waybackProfile: WaybackProfileData | null;
  pageNumber: number;
  totalPages: number;
}

function formatCurrency(val: number): string {
  if (Math.abs(val) >= 1_000_000) return `${(val / 1_000_000).toFixed(1)}M EUR`;
  return `${Math.round(val).toLocaleString("fr-BE")} EUR`;
}

function companyAgeEncouragement(creationDate: string | null | undefined): string {
  if (!creationDate) return "";
  const parts = creationDate.split("/");
  if (parts.length < 3) return "";
  const year = parseInt(parts[2] || parts[0]);
  if (isNaN(year)) return "";
  const age = new Date().getFullYear() - year;
  if (age >= 15) return ` Avec plus de ${age} ans d'activite, c'est une reference etablie dans le paysage automobile local — une longevite qui represente un capital de confiance considerable.`;
  if (age >= 10) return ` Plus de ${age} ans d'activite : la preuve d'un savoir-faire et d'une resilience remarquables. Cette anciennete est un atout que votre presence digitale devrait davantage valoriser.`;
  if (age >= 5) return ` ${age} ans d'activite temoignent d'une entreprise bien implantee — une base solide pour une strategie digitale ambitieuse.`;
  return "";
}

export function CompanyPage({
  dealerName, dealerCity, companyProfile, ownerName, companyIntro,
  technologyProfile, waybackProfile, pageNumber, totalPages,
}: CompanyPageProps) {
  const cp = companyProfile;
  const tp = technologyProfile;
  const wp = waybackProfile;

  // Group technologies by category
  const techByCategory: Record<string, { name: string; category: string }[]> = {};
  if (tp) {
    for (const t of tp.allTechnologies) {
      if (!techByCategory[t.category]) techByCategory[t.category] = [];
      techByCategory[t.category].push(t);
    }
  }
  const sortedCategories = Object.keys(techByCategory).sort((a, b) => {
    const ia = CATEGORY_ORDER.indexOf(a);
    const ib = CATEGORY_ORDER.indexOf(b);
    return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
  });

  // Wayback chart data
  const chartYears = wp?.snapshotsByYear ?? [];
  const maxCount = Math.max(...chartYears.map(y => y.count), 1);
  const chartW = 440;
  const chartH = 30;
  const barW = chartYears.length > 0 ? Math.min(40, (chartW - 10) / chartYears.length - 4) : 20;

  // "Missing" technologies to flag
  const missingTech: string[] = [];
  if (tp) {
    if (tp.analytics.length === 0) missingTech.push("Analytics (GA4/GTM)");
    if (!tp.cookieConsent) missingTech.push("Bandeau cookies RGPD");
  }

  return (
    <Page size="A4" style={s.page}>
      <PageHeader pageNumber={pageNumber} totalPages={totalPages} />
      <SectionTitle title="Votre Entreprise" subtitle={dealerName} />
      <Text style={s.introText}>{companyIntro}</Text>

      {/* ===== SECTION 1: Company Profile ===== */}
      {cp ? (
        <>
          <View style={s.infoCard}>
            <View style={s.infoGrid}>
              <View style={s.infoItem}><Text style={s.infoLabel}>Societe</Text><Text style={s.infoValue}>{dealerName}</Text></View>
              {cp.legalForm && <View style={s.infoItem}><Text style={s.infoLabel}>Forme</Text><Text style={s.infoValue}>{cp.legalForm}</Text></View>}
              <View style={s.infoItem}><Text style={s.infoLabel}>BCE</Text><Text style={s.infoValue}>{cp.companyNumber}</Text></View>
              {cp.address && <View style={s.infoItem}><Text style={s.infoLabel}>Siege</Text><Text style={s.infoValue}>{cp.address}</Text></View>}
              {cp.creationDate && <View style={s.infoItem}><Text style={s.infoLabel}>Creation</Text><Text style={s.infoValue}>{cp.creationDate}</Text></View>}
              {cp.employees !== null && <View style={s.infoItem}><Text style={s.infoLabel}>Personnel</Text><Text style={s.infoValue}>{cp.employees} pers.</Text></View>}
            </View>
          </View>

          {(cp.revenue !== null || cp.grossMargin !== null) && (
            <View style={s.financialsRow}>
              {cp.revenue !== null && <View style={s.finCard}><Text style={[s.finNumber, { color: PDF_THEME.textPrimary }]}>{formatCurrency(cp.revenue)}</Text><Text style={s.finLabel}>Chiffre d'affaires</Text></View>}
              {cp.grossMargin !== null && <View style={s.finCard}><Text style={[s.finNumber, { color: cp.grossMargin > 0 ? PDF_THEME.green : PDF_THEME.red }]}>{formatCurrency(cp.grossMargin)}</Text><Text style={s.finLabel}>Marge brute</Text></View>}
              {cp.employees !== null && <View style={s.finCard}><Text style={[s.finNumber, { color: PDF_THEME.textPrimary }]}>{cp.employees}</Text><Text style={s.finLabel}>Collaborateurs</Text></View>}
            </View>
          )}

          {cp.currentAdmins.length > 0 && (
            <>
              <Text style={s.sLabel}>Direction</Text>
              {cp.currentAdmins.slice(0, 2).map((admin, i) => (
                <View key={i} style={s.adminRow}>
                  <View style={s.adminIcon}><Text style={s.adminInitial}>{admin.name.charAt(0)}</Text></View>
                  <View>
                    <Text style={s.adminName}>{admin.name}{admin.role ? ` — ${admin.role}` : ""}</Text>
                    {admin.startDate && <Text style={s.adminDate}>Depuis le {admin.startDate}</Text>}
                  </View>
                </View>
              ))}
            </>
          )}

          <View style={s.narrativeBox}>
            <Text style={s.narrativeText}>{cp.companyNarrative}{companyAgeEncouragement(cp.creationDate)}</Text>
          </View>
        </>
      ) : (
        <View style={s.fallbackBox}>
          <Text style={s.fallbackText}>
            Les informations de {dealerName} ({dealerCity}) n'ont pas pu etre retrouvees automatiquement.
            {ownerName ? ` Ce rapport est prepare pour ${ownerName}.` : ""}
          </Text>
        </View>
      )}

      <View style={s.divider} />

      {/* ===== SECTION 2: Digital Profile (Technologies) ===== */}
      <Text style={s.sLabel}>Profil technique du site web</Text>

      {tp && sortedCategories.length > 0 ? (
        <>
          {sortedCategories.map((cat, ci) => (
            <View key={ci} style={s.techGroupRow}>
              <Text style={s.techGroupLabel}>{CATEGORY_LABELS[cat] ?? cat}</Text>
              <View style={s.techGroupChips}>
                {techByCategory[cat].map((t, ti) => {
                  const isPositive = POSITIVE_CATEGORIES.includes(cat);
                  return (
                    <View key={ti} style={isPositive ? s.techChipOk : s.techChipNeutral}>
                      <Text style={isPositive ? s.techChipOkText : s.techChipNeutralText}>{t.name}</Text>
                    </View>
                  );
                })}
              </View>
            </View>
          ))}
          {/* Missing technologies flagged in red */}
          {missingTech.length > 0 && (
            <View style={s.techGroupRow}>
              <Text style={s.techGroupLabel}>Absent</Text>
              <View style={s.techGroupChips}>
                {missingTech.map((t, i) => (
                  <View key={i} style={s.techChipWarn}><Text style={s.techChipWarnText}>{t}</Text></View>
                ))}
              </View>
            </View>
          )}
          <MarcusComment text={tp.summary} label="Analyse technique" />
        </>
      ) : (
        <MarcusComment text="Les technologies du site n'ont pas pu etre analysees (page inaccessible ou contenu insuffisant)." label="Analyse technique" />
      )}

      {/* ===== SECTION 3: Domain History (Wayback Machine) ===== */}
      {wp && wp.domainAgeYears !== null && (
        <>
          <Text style={[s.sLabel, { marginTop: 4 }]}>Historique du domaine (Archive.org)</Text>
          <View style={s.waybackRow}>
            <View style={s.waybackStat}>
              <Text style={[s.waybackNum, { color: wp.domainAgeYears >= 10 ? PDF_THEME.green : wp.domainAgeYears >= 5 ? PDF_THEME.yellow : PDF_THEME.textPrimary }]}>
                {Math.round(wp.domainAgeYears)} ans
              </Text>
              <Text style={s.waybackLbl}>anciennete</Text>
            </View>
            <View style={s.waybackStat}>
              <Text style={[s.waybackNum, { color: PDF_THEME.textPrimary }]}>{wp.totalSnapshots}</Text>
              <Text style={s.waybackLbl}>archives totales</Text>
            </View>
            <View style={s.waybackStat}>
              <Text style={[s.waybackNum, { color: wp.avgSnapshotsPerYear >= 10 ? PDF_THEME.green : PDF_THEME.yellow }]}>{wp.avgSnapshotsPerYear}</Text>
              <Text style={s.waybackLbl}>modif. moy./an</Text>
            </View>
            {wp.firstSeen && (
              <View style={s.waybackStat}>
                <Text style={[s.waybackNum, { color: PDF_THEME.textPrimary, fontSize: 7 }]}>{wp.firstSeen.substring(0, 4)}</Text>
                <Text style={s.waybackLbl}>1ere apparition</Text>
              </View>
            )}
          </View>

          {/* Mini bar chart: activity by year */}
          {chartYears.length > 0 && (
            <View style={s.chartContainer}>
              <Text style={s.chartTitle}>Frequence de modification du site (5 dernieres annees)</Text>
              <Svg width={chartW} height={chartH} viewBox={`0 0 ${chartW} ${chartH}`}>
                {chartYears.map((y, i) => {
                  const x = 5 + i * ((chartW - 10) / chartYears.length);
                  const barH = Math.max(2, (y.count / maxCount) * (chartH - 2));
                  const color = y.count >= 15 ? PDF_THEME.green : y.count >= 5 ? PDF_THEME.yellow : PDF_THEME.red;
                  return (
                    <Rect
                      key={i}
                      x={x}
                      y={chartH - barH}
                      width={barW}
                      height={barH}
                      fill={color}
                      rx={2}
                      ry={2}
                    />
                  );
                })}
              </Svg>
              <View style={s.chartLabels}>
                {chartYears.map((y, i) => (
                  <Text key={i} style={[s.chartLabel, { width: barW + 4 }]}>{y.year} ({y.count})</Text>
                ))}
              </View>
            </View>
          )}

          <MarcusComment text={wp.narrative} label="Historique web" />
        </>
      )}
    </Page>
  );
}

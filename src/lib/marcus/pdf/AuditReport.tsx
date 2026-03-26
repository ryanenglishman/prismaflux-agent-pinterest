import React from "react";
import { Document } from "@react-pdf/renderer";
import type { AuditReportData } from "../types";
import { generateNarrative } from "./narrative";
import { CoverPage } from "./pages/CoverPage";
import { CompanyPage } from "./pages/CompanyPage";
import { SynthesePage } from "./pages/SynthesePage";
import { PresencePage } from "./pages/PresencePage";
import { ImpactPage } from "./pages/ImpactPage";
import { ProjectionPage } from "./pages/ProjectionPage";
import { CataloguePage } from "./pages/CataloguePage";
import { CopilotsPage } from "./pages/CopilotsPage";

interface AuditReportProps {
  data: AuditReportData;
}

/**
 * Rapport structure (8 pages) :
 *  1. Couverture (dark)
 *  2. Votre Entreprise (CompanyWeb)
 *  3. Synthese (score + audit technique + SEO)
 *  4. Presence Digitale (local + social + concurrents)
 *  5. Impact Operationnel (temps + leads)
 *  6. Projection & Recommandations (inaction + actions)
 *  7. Le Catalogue PrismaFlux (plateforme + integration)
 *  8. Vos Copilotes IA (Robin/Marcus/Lana/Pierre + CTA)
 */
const TOTAL_PAGES = 8;

export function AuditReport({ data }: AuditReportProps) {
  const n = generateNarrative(data);

  return (
    <Document
      title={`Audit Digital — ${data.dealerName}`}
      author="PrismaFlux Auto — Marcus"
      subject="Audit de presence digitale"
      creator="Marcus, copilote IA PrismaFlux"
    >
      <CoverPage
        dealerName={data.dealerName}
        dealerUrl={data.dealerUrl}
        dealerCity={data.dealerCity}
        auditDate={data.auditDate}
        ownerName={data.ownerName}
        carBrands={data.carBrands}
      />

      <CompanyPage
        dealerName={data.dealerName}
        dealerCity={data.dealerCity}
        companyProfile={data.companyProfile}
        ownerName={data.ownerName}
        pageNumber={2}
        totalPages={TOTAL_PAGES}
      />

      <SynthesePage
        globalScore={data.globalScore}
        subScores={data.subScores}
        dealerName={data.dealerName}
        technicalChecks={data.technicalChecks}
        seoChecks={data.seoChecks}
        executiveSummary={n.executiveSummary}
        technicalVerdict={n.technicalVerdict}
        seoVerdict={n.seoVerdict}
        pageNumber={3}
        totalPages={TOTAL_PAGES}
      />

      <PresencePage
        cityMentions={data.localPresence.cityMentions}
        serviceMentions={data.localPresence.serviceMentions}
        missingKeywords={data.localPresence.missingKeywords}
        dealerCity={data.dealerCity}
        socialMedia={data.socialMedia}
        competitors={data.competitors}
        googleProfile={data.googleProfile}
        dealerName={data.dealerName}
        localVerdict={n.localVerdict}
        socialVerdict={n.socialVerdict}
        competitorVerdict={data.competitorInsights?.competitorNarrative ?? n.competitorVerdict}
        pageNumber={4}
        totalPages={TOTAL_PAGES}
      />

      <ImpactPage
        timeLost={data.timeLost}
        leadsLost={data.leadsLost}
        dealerName={data.dealerName}
        timeIntro={n.timeIntro}
        timeVerdict={n.timeVerdict}
        leadsVerdict={n.leadsVerdict}
        pageNumber={5}
        totalPages={TOTAL_PAGES}
      />

      <ProjectionPage
        totalCostPerYear={data.timeLost.totalCostPerYear}
        leadsLostPerMonth={data.leadsLost.leadsLostPerMonth}
        revenueLostPerMonth={data.leadsLost.revenueLostPerMonth}
        dealerName={data.dealerName}
        actions={data.priorityActions}
        projectionIntro={n.projectionIntro}
        actionsIntro={n.actionsIntro}
        pageNumber={6}
        totalPages={TOTAL_PAGES}
      />

      <CataloguePage
        carBrands={data.carBrands}
        dealerName={data.dealerName}
        pageNumber={7}
        totalPages={TOTAL_PAGES}
      />

      <CopilotsPage
        dealerName={data.dealerName}
        whyPrismaflux={n.whyPrismaflux}
        pageNumber={8}
        totalPages={TOTAL_PAGES}
      />
    </Document>
  );
}

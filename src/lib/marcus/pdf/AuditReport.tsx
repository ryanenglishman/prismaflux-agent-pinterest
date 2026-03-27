import React from "react";
import { Document } from "@react-pdf/renderer";
import type { AuditReportData } from "../types";
import { generateNarrative } from "./narrative";
import { CoverPage } from "./pages/CoverPage";
import { IntroPage } from "./pages/IntroPage";
import { CompanyPage } from "./pages/CompanyPage";
import { SynthesePage } from "./pages/SynthesePage";
import { PresencePage } from "./pages/PresencePage";
import { ImpactPage } from "./pages/ImpactPage";
import { ProjectionPage } from "./pages/ProjectionPage";
import { SolutionPage } from "./pages/SolutionPage";
import { AnnexePage } from "./pages/AnnexePage";

interface AuditReportProps {
  data: AuditReportData;
}

/**
 * Rapport PrismaFlux — Structure 9 pages :
 *  1. Couverture (dark, branded)
 *  2. Introduction (PrismaFlux + Robin + guide de lecture)
 *  3. Votre Entreprise (CompanyWeb data)
 *  4. Synthese Executive (scores + constats + narration)
 *  5. Rayonnement Digital (local + social + concurrents + narration)
 *  6. Impact Operationnel (storytelling + temps + leads)
 *  7. Projection & Actions (graphique + 3 actions + stats marche)
 *  8. La Solution PrismaFlux (copilotes + plateformes + CTA)
 *  9. Annexe Technique (donnees brutes, checks, concurrents)
 */
const TOTAL_PAGES = 9;

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

      <IntroPage
        dealerName={data.dealerName}
        introWelcome={n.introWelcome}
        introWhatIsThis={n.introWhatIsThis}
        introPrismafluxDesc={n.introPrismafluxDesc}
        introRobinDesc={n.introRobinDesc}
        introHowToRead={n.introHowToRead}
        pageNumber={2}
        totalPages={TOTAL_PAGES}
      />

      <CompanyPage
        dealerName={data.dealerName}
        dealerCity={data.dealerCity}
        companyProfile={data.companyProfile}
        ownerName={data.ownerName}
        companyIntro={n.companyIntro}
        technologyProfile={data.technologyProfile}
        waybackProfile={data.waybackProfile}
        pageNumber={3}
        totalPages={TOTAL_PAGES}
      />

      <SynthesePage
        globalScore={data.globalScore}
        subScores={data.subScores}
        dealerName={data.dealerName}
        executiveSummary={n.executiveSummary}
        keyFindings={n.keyFindings}
        syntheseTransition={n.syntheseTransition}
        screenshotDesktop={data.screenshotDesktop}
        indexedPages={data.indexedPages}
        pageNumber={4}
        totalPages={TOTAL_PAGES}
      />

      <PresencePage
        cityMentions={data.localPresence.cityMentions}
        serviceMentions={data.localPresence.serviceMentions}
        missingKeywords={data.localPresence.missingKeywords}
        dealerCity={data.dealerCity}
        socialMedia={data.socialMedia}
        googleProfile={data.googleProfile}
        dealerName={data.dealerName}
        localVerdict={n.localVerdict}
        socialVerdict={n.socialVerdict}
        competitorVerdict={n.competitorVerdict}
        presenceTransition={n.presenceTransition}
        competitorInsights={data.competitorInsights}
        mapDataUri={data.mapDataUri}
        pageNumber={5}
        totalPages={TOTAL_PAGES}
      />

      <ImpactPage
        timeLost={data.timeLost}
        leadsLost={data.leadsLost}
        dealerName={data.dealerName}
        dailyLifeStory={n.dailyLifeStory}
        timeVerdict={n.timeVerdict}
        leadsVerdict={n.leadsVerdict}
        impactTransition={n.impactTransition}
        pageNumber={6}
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
        pageNumber={7}
        totalPages={TOTAL_PAGES}
      />

      <SolutionPage
        dealerName={data.dealerName}
        whyPrismaflux={n.whyPrismaflux}
        solutionTransition={n.solutionTransition}
        closingNote={n.closingNote}
        pageNumber={8}
        totalPages={TOTAL_PAGES}
      />

      <AnnexePage
        technicalChecks={data.technicalChecks}
        seoChecks={data.seoChecks}
        technicalExtras={data.technicalExtras}
        competitors={data.competitors}
        dealerName={data.dealerName}
        googleProfile={data.googleProfile}
        pageNumber={9}
        totalPages={TOTAL_PAGES}
      />
    </Document>
  );
}

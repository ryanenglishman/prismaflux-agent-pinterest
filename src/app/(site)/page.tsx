import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { TrustLogos } from "@/components/sections/TrustLogos";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import { Stats } from "@/components/sections/Stats";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { Testimonials } from "@/components/sections/Testimonials";
import { FreeTools } from "@/components/sections/FreeTools";
import { LeadMagnet } from "@/components/sections/LeadMagnet";
import { LocalSEO } from "@/components/sections/LocalSEO";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustLogos />
      <ServicesOverview />
      <Stats />
      <WhyChooseUs />
      <ProcessSteps />
      <Testimonials />
      <FreeTools />
      <LeadMagnet />
      <LocalSEO />
      <FinalCTA />
    </>
  );
}

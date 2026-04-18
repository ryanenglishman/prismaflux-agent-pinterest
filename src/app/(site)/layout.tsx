import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { StickyCTAMobile } from "@/components/layout/StickyCTAMobile";
import { ScrollRevealWrapper } from "@/components/ui/ScrollRevealWrapper";
import { Preloader } from "@/components/animations/Preloader";
import { CustomCursor } from "@/components/animations/CustomCursor";
import { PageTransition } from "@/components/animations/PageTransition";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ScrollRevealWrapper>
      <Preloader />
      <CustomCursor />
      <Navbar />
      <main className="pt-16">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
      <StickyCTAMobile />
    </ScrollRevealWrapper>
  );
}

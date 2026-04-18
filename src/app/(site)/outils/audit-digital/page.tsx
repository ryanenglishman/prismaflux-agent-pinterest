import type { Metadata } from "next";
import { DigitalMaturityQuiz } from "@/components/games/DigitalMaturityQuiz";

export const metadata: Metadata = {
  title: "Evaluez votre Maturite Digitale — Quiz Gratuit",
  description:
    "Testez la maturite digitale de votre entreprise en 10 questions. Score personnalise, radar chart et recommandations pour ameliorer votre presence en ligne. Gratuit, sans engagement.",
  alternates: {
    canonical: "/outils/audit-digital",
  },
};

export default function AuditDigitalPage() {
  return (
    <section className="pt-20 pb-20 md:pt-28 md:pb-28">
      <div className="max-w-2xl mx-auto px-4 md:px-8">
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-1.5 text-sm font-medium text-brand bg-brand-dim rounded-full mb-4">
            Outil gratuit — 3 minutes
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-text">
            Evaluez votre{" "}
            <span className="gradient-text">maturite digitale</span>
          </h1>
          <p className="mt-4 text-text-secondary leading-relaxed">
            10 questions pour obtenir un diagnostic complet de votre presence en
            ligne. Score, radar chart et recommandations personnalisees.
          </p>
        </div>

        <DigitalMaturityQuiz />
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import { GrowthSimulator } from "@/components/games/GrowthSimulator";

export const metadata: Metadata = {
  title: "Simulateur de Croissance Digitale — Estimez votre Potentiel",
  description:
    "Simulez la croissance de votre entreprise grace au marketing digital. Configurez votre secteur, budget et leviers pour voir une projection de trafic, leads et chiffre d'affaires sur 12 mois.",
  alternates: {
    canonical: "/outils/simulateur-croissance",
  },
};

export default function SimulateurCroissancePage() {
  return (
    <section className="pt-20 pb-20 md:pt-28 md:pb-28">
      <div className="max-w-3xl mx-auto px-4 md:px-8">
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-1.5 text-sm font-medium text-brand bg-brand-dim rounded-full mb-4">
            Simulateur gratuit — Province de Liege
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-text">
            Simulez votre{" "}
            <span className="gradient-text">croissance digitale</span>
          </h1>
          <p className="mt-4 text-text-secondary leading-relaxed">
            Configurez votre profil business et decouvrez une projection de
            croissance sur 12 mois. Trafic, leads et chiffre d&apos;affaires —
            visualisez l&apos;impact du marketing digital sur votre activite.
          </p>
        </div>

        <GrowthSimulator />
      </div>
    </section>
  );
}

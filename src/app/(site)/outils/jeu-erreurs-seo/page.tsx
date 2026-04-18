import type { Metadata } from "next";
import { SEOErrorGame } from "@/components/games/SEOErrorGame";

export const metadata: Metadata = {
  title: "Trouvez les 7 Erreurs SEO — Jeu Interactif",
  description:
    "Testez vos connaissances en SEO avec ce jeu interactif. Trouvez les 7 erreurs de referencement cachees dans ce faux site web. Apprenez les bonnes pratiques SEO en vous amusant.",
  alternates: {
    canonical: "/outils/jeu-erreurs-seo",
  },
};

export default function JeuErreursSEOPage() {
  return (
    <section className="pt-20 pb-20 md:pt-28 md:pb-28">
      <div className="max-w-3xl mx-auto px-4 md:px-8">
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-1.5 text-sm font-medium text-brand bg-brand-dim rounded-full mb-4">
            Jeu interactif — Testez votre oeil SEO
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-text">
            Trouvez les{" "}
            <span className="gradient-text">7 erreurs SEO</span>
          </h1>
          <p className="mt-4 text-text-secondary leading-relaxed">
            Ce faux site web contient 7 erreurs de referencement classiques.
            Cliquez sur les zones ou vous detectez une erreur. Chaque erreur
            trouvee revele une explication et une correction.
          </p>
        </div>

        <SEOErrorGame />
      </div>
    </section>
  );
}

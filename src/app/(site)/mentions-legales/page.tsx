import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions Legales",
  description: "Mentions legales du site prismaflux.com - Agence web a Liege.",
  alternates: {
    canonical: "/mentions-legales",
  },
};

export default function MentionsLegalesPage() {
  return (
    <section className="pt-20 pb-20 md:pt-28 md:pb-28">
      <div className="max-w-3xl mx-auto px-4 md:px-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-text mb-8">
          Mentions legales
        </h1>

        <div className="space-y-8 text-sm text-text-secondary leading-relaxed">
          <div>
            <h2 className="text-lg font-bold text-text mb-3">Editeur du site</h2>
            <p>
              PrismaFlux<br />
              Liege, Belgique<br />
              Email : contact@prismaflux.com<br />
              Site web : https://prismaflux.com
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-text mb-3">Hebergement</h2>
            <p>
              Le site est heberge par Vercel Inc.<br />
              440 N Baxter St, Coppell, TX 75019, USA<br />
              https://vercel.com
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-text mb-3">
              Propriete intellectuelle
            </h2>
            <p>
              L&apos;ensemble du contenu de ce site (textes, images, graphismes,
              logo, icones, etc.) est la propriete exclusive de PrismaFlux, sauf
              mention contraire. Toute reproduction, representation,
              modification ou exploitation totale ou partielle de ce contenu est
              interdite sans autorisation prealable ecrite.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-text mb-3">
              Protection des donnees personnelles
            </h2>
            <p>
              Conformement au Reglement General sur la Protection des Donnees
              (RGPD), les informations collectees via le formulaire de contact
              sont uniquement utilisees pour repondre a vos demandes. Elles ne
              sont ni vendues, ni partagees avec des tiers.
            </p>
            <p className="mt-2">
              Vous disposez d&apos;un droit d&apos;acces, de rectification et de
              suppression de vos donnees. Pour exercer ces droits, contactez-nous
              a l&apos;adresse : contact@prismaflux.com.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-text mb-3">Cookies</h2>
            <p>
              Ce site utilise des cookies strictement necessaires a son
              fonctionnement. Aucun cookie de tracking ou publicitaire n&apos;est
              utilise sans votre consentement prealable.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-text mb-3">
              Limitation de responsabilite
            </h2>
            <p>
              PrismaFlux s&apos;efforce de fournir des informations aussi exactes
              que possible sur ce site. Toutefois, PrismaFlux ne peut etre tenue
              responsable des omissions, inexactitudes ou carences dans la mise a
              jour de ces informations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

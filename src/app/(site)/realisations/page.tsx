import type { Metadata } from "next";
import { RealisationsClient } from "./RealisationsClient";

export const metadata: Metadata = {
  title: "Realisations — Portfolio Marketing Digital & Sites Web Liege",
  description:
    "Decouvrez nos realisations en marketing digital : creation de sites web, campagnes SEO, social media et strategie digitale pour des entreprises de Liege et de la province.",
  keywords: [
    "portfolio agence web liege",
    "realisations marketing digital liege",
    "exemples sites web liege",
    "projets SEO liege",
    "references agence digitale belgique",
    "portfolio web design liege",
  ],
  alternates: {
    canonical: "/realisations",
  },
  openGraph: {
    title: "Realisations — PrismaFlux Agence Marketing Digital Liege",
    description:
      "Sites web, SEO, social media : nos projets realises pour des entreprises de Liege et de la province.",
    type: "website",
    locale: "fr_BE",
  },
};

export default function RealisationsPage() {
  return <RealisationsClient />;
}

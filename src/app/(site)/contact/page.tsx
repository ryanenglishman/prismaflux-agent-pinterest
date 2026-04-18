import type { Metadata } from "next";
import { ContactClient } from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact & Devis Gratuit — Agence Marketing Digital Liege",
  description:
    "Contactez PrismaFlux pour un devis personnalise sous 24h. Creation de site web, SEO, social media et strategie digitale a Liege. Sans engagement.",
  keywords: [
    "contact agence web liege",
    "devis site web liege",
    "devis SEO liege",
    "audit digital gratuit liege",
    "agence marketing digital contact",
    "demande devis marketing digital",
  ],
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact & Devis — PrismaFlux Agence Marketing Liege",
    description:
      "Devis personnalise sous 24h pour votre projet web, SEO ou marketing digital a Liege. Sans engagement.",
    type: "website",
    locale: "fr_BE",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}

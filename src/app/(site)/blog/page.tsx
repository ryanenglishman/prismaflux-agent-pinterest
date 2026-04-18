import type { Metadata } from "next";
import { BlogClient } from "./BlogClient";

export const metadata: Metadata = {
  title: "Blog Marketing Digital Liege — Conseils SEO, Web & Strategie",
  description:
    "Guides pratiques et conseils d'experts en marketing digital, SEO, conception web et strategie locale pour les entreprises de Liege et de la province de Liege.",
  keywords: [
    "blog marketing digital liege",
    "conseils SEO liege",
    "guide referencement google",
    "blog agence web liege",
    "conseils web design",
    "strategie digitale belgique",
    "marketing digital province liege",
  ],
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog Marketing Digital — PrismaFlux Liege",
    description:
      "Guides pratiques et conseils d'experts en SEO, marketing digital et conception web pour les entreprises de Liege.",
    type: "website",
    locale: "fr_BE",
  },
};

export default function BlogPage() {
  return <BlogClient />;
}

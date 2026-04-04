import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Geist } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default:
      "PrismaFlux | Agence de Marketing Digital a Liege — Sites Web, SEO, Social Media",
    template: "%s | PrismaFlux — Agence Marketing Digital Liege",
  },
  description:
    "Agence de marketing digital a Liege, province de Liege. Conception de sites web haute performance, referencement naturel Google (SEO), social media marketing, publicite digitale et strategie de croissance en ligne. Audit digital gratuit.",
  keywords: [
    "agence marketing digital liege",
    "agence web liege",
    "creation site web liege",
    "referencement google liege",
    "SEO liege province",
    "agence SEO belgique",
    "social media marketing liege",
    "publicite digitale liege",
    "strategie digitale liege",
    "site internet professionnel belgique",
    "agence web province de liege",
    "marketing digital belgique",
    "conception site web liege",
    "google ads liege",
    "community management liege",
  ],
  authors: [{ name: "PrismaFlux" }],
  creator: "PrismaFlux",
  metadataBase: new URL("https://prismaflux.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fr_BE",
    url: "https://prismaflux.com",
    siteName: "PrismaFlux",
    title: "PrismaFlux | Agence de Marketing Digital a Liege",
    description:
      "Conception de sites web, referencement Google (SEO), social media marketing et strategie digitale a Liege. Agence web en province de Liege.",
  },
  twitter: {
    card: "summary_large_image",
    title: "PrismaFlux | Agence Marketing Digital Liege",
    description:
      "Sites web, SEO, social media et strategie digitale. Agence de marketing digital en province de Liege.",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "xost9jwYrNo39jHjlYJKaWBr8GMVojoSw8_J9aUVTjk",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://prismaflux.com/#business",
      name: "PrismaFlux",
      description:
        "Agence web specialisee en creation de sites internet professionnels et referencement Google (SEO) a Liege.",
      url: "https://prismaflux.com",
      email: "contact@prismaflux.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Liege",
        addressCountry: "BE",
      },
      areaServed: [
        { "@type": "City", name: "Liege" },
        { "@type": "City", name: "Huy" },
        { "@type": "City", name: "Seraing" },
        { "@type": "City", name: "Sprimont" },
        { "@type": "City", name: "Herstal" },
        { "@type": "City", name: "Verviers" },
      ],
      serviceType: [
        "Web Design",
        "SEO",
        "Digital Marketing",
        "Social Media Management",
        "Video Advertising",
      ],
      priceRange: "$$",
    },
    {
      "@type": "WebSite",
      "@id": "https://prismaflux.com/#website",
      url: "https://prismaflux.com",
      name: "PrismaFlux",
      publisher: { "@id": "https://prismaflux.com/#business" },
      inLanguage: "fr-BE",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${geist.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: '(function(){try{var t=localStorage.getItem("theme");if(t==="light"||(!t&&window.matchMedia("(prefers-color-scheme:light)").matches))document.documentElement.classList.add("light")}catch(e){}})()',
          }}
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen antialiased">{children}</body>
      <GoogleAnalytics gaId="G-XHPGBP78SK" />
    </html>
  );
}

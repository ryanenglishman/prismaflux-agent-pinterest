import type { Metadata, Viewport } from "next";
import { Inter, Merriweather } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Header } from "@/components/ginger/Header";
import { Footer } from "@/components/ginger/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "The Ginger Secret — Institut de Beauté à Seraing | Soins Visage, Hydrafacial & Massages",
    template: "%s | The Ginger Secret — Institut de Beauté Seraing",
  },
  description:
    "Institut de beauté haut de gamme à Seraing. Hydradermabrasion, soins du visage personnalisés, lashlift, Korean lashlift, browlift, massages relaxants, maquillage professionnel, épilation et formations esthétiques. Votre peau mérite l'excellence — réservez votre soin en ligne.",
  keywords: [
    "institut de beauté Seraing",
    "soin visage Seraing",
    "hydrafacial Liège",
    "hydradermabrasion Belgique",
    "lashlift Seraing",
    "Korean lashlift",
    "browlift sourcils",
    "rehaussement de cils",
    "massage relaxant Seraing",
    "massage bien-être Liège",
    "soin anti-âge",
    "lifting japonais Kobido",
    "maquillage mariée Liège",
    "maquillage professionnel",
    "épilation Seraing",
    "formation esthétique Belgique",
    "cours auto-maquillage",
    "soin peau éclat",
    "beauté du regard",
    "Jessica Maita",
    "The Ginger Secret",
    "centre esthétique Seraing",
    "salon de beauté Seraing",
    "soins cosmétiques haut de gamme",
    "beauté naturelle",
    "skin care Liège",
  ],
  openGraph: {
    title: "The Ginger Secret — Institut de Beauté Premium à Seraing",
    description:
      "Soins du visage experts, hydradermabrasion, massages bien-être, beauté du regard et formations esthétiques. Un espace confidentiel dédié à la beauté intelligente.",
    type: "website",
    locale: "fr_BE",
    siteName: "The Ginger Secret",
  },
  alternates: {
    canonical: "https://thegingersecret.be",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F5E9DC",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={cn("h-full", inter.variable, merriweather.variable)}
    >
      <body className="min-h-full bg-bg font-sans antialiased flex flex-col">
        <div className="peach-bar min-h-[3px] shrink-0" />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

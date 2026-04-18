import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { SERVICE_LINKS } from "@/lib/constants/navigation";
import { PrismaFluxLogo } from "@/components/ui/PrismaFluxLogo";

const COMPANY_LINKS = [
  { label: "L'agence", href: "/agence" },
  { label: "Realisations", href: "/realisations" },
  { label: "Blog", href: "/blog" },
  { label: "Contact & Devis", href: "/contact" },
  { label: "Mentions legales", href: "/mentions-legales" },
];

const TOOLS_LINKS = [
  { label: "Quiz Maturite Digitale", href: "/outils/audit-digital" },
  { label: "Jeu Erreurs SEO", href: "/outils/jeu-erreurs-seo" },
  { label: "Simulateur Croissance", href: "/outils/simulateur-croissance" },
];

const CITY_LINKS = [
  { label: "Agence web Huy", href: "/agence-web-huy" },
  { label: "Agence web Seraing", href: "/agence-web-seraing" },
  { label: "Agence web Herstal", href: "/agence-web-herstal" },
  { label: "Agence web Sprimont", href: "/agence-web-sprimont" },
  { label: "Agence web Verviers", href: "/agence-web-verviers" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg-surface">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <PrismaFluxLogo size="sm" showText />
            </Link>
            <p className="text-sm text-text-secondary leading-relaxed mb-4">
              Agence de marketing digital a Liege, province de Liege.
              Conception de sites web, referencement naturel Google (SEO),
              social media marketing, publicite digitale et strategie de
              croissance en ligne pour les entreprises belges.
            </p>
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <Mail size={14} className="text-brand shrink-0" />
              <a
                href="mailto:contact@prismaflux.com"
                className="hover:text-brand transition-colors"
              >
                contact@prismaflux.com
              </a>
            </div>
            <div className="flex items-start gap-2 text-sm text-text-secondary mt-2">
              <MapPin size={14} className="text-brand shrink-0 mt-0.5" />
              <span>Liege, Province de Liege, Belgique</span>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold text-text uppercase tracking-wider mb-4">
              Marketing Digital
            </h3>
            <ul className="space-y-3">
              {SERVICE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-brand transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Province de Liege */}
          <div>
            <h3 className="text-sm font-semibold text-text uppercase tracking-wider mb-4">
              Province de Liege
            </h3>
            <ul className="space-y-3">
              {CITY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-brand transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Entreprise */}
          <div>
            <h3 className="text-sm font-semibold text-text uppercase tracking-wider mb-4">
              Entreprise
            </h3>
            <ul className="space-y-3">
              {COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-brand transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            {/* Outils gratuits */}
            <h3 className="text-sm font-semibold text-text uppercase tracking-wider mb-4 mt-6">
              Outils gratuits
            </h3>
            <ul className="space-y-3">
              {TOOLS_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-brand transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted">
            &copy; {new Date().getFullYear()} PrismaFlux — Agence de marketing
            digital a Liege, Belgique. Tous droits reserves.
          </p>
          <Link
            href="/mentions-legales"
            className="text-xs text-text-muted hover:text-text-secondary transition-colors"
          >
            Mentions legales &middot; Politique de confidentialite
          </Link>
        </div>
      </div>
    </footer>
  );
}

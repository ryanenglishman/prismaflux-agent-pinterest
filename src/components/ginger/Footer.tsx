import Link from "next/link";
import { Phone, MapPin, Clock, Mail, ArrowRight } from "lucide-react";

function FacebookIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function TikTokIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.71a8.28 8.28 0 0 0 3.76.91V6.69z" />
    </svg>
  );
}

const footerLinks = [
  { href: "/", label: "Accueil" },
  { href: "/services", label: "Nos Soins & Tarifs" },
  { href: "/formations", label: "Formations & Ateliers" },
  { href: "/a-propos", label: "Notre Histoire" },
  { href: "/contact", label: "Contact & Accès" },
];

const serviceHighlights = [
  "Hydradermabrasion",
  "Lashlift & Browlift",
  "Massages bien-être",
  "Soins visage experts",
  "Maquillage événementiel",
  "Épilation douce",
];

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-anthracite to-brun-dark text-white/75 relative overflow-hidden">
      {/* Decorative top border */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-cream/20 to-gold/20 flex items-center justify-center border border-gold/30">
                <span className="font-serif text-cream font-bold text-lg leading-none">G</span>
              </div>
              <div>
                <span className="font-serif text-white font-bold text-xl tracking-[0.08em] block leading-tight">
                  GINGER
                </span>
                <span className="text-[9px] text-gold-light tracking-[0.2em] uppercase">
                  Institut de Beauté
                </span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-white/50 mb-6">
              Un espace confidentiel dédié à la beauté intelligente, respectueuse
              et durable. Soins du visage, hydradermabrasion, massages et beauté
              du regard à Seraing.
            </p>
            <div className="flex gap-3">
              {[
                { icon: FacebookIcon, href: "https://www.facebook.com/thegingersecret/", label: "Facebook" },
                { icon: InstagramIcon, href: "https://www.instagram.com/thegingersecret/", label: "Instagram" },
                { icon: TikTokIcon, href: "https://www.tiktok.com/@thegingersecret", label: "TikTok" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/8 flex items-center justify-center hover:bg-gold/25 hover:text-gold-light transition-all duration-300 border border-white/8 hover:border-gold/30"
                  aria-label={s.label}
                >
                  <s.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-serif text-white font-bold text-base mb-5 tracking-wide">
              Navigation
            </h3>
            <nav className="flex flex-col gap-2.5">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm hover:text-gold-light transition-colors duration-300 flex items-center gap-2 group"
                >
                  <ArrowRight size={12} className="text-gold/40 group-hover:text-gold transition-colors" />
                  {link.label}
                </Link>
              ))}
              <a
                href="https://salonkee.be/salon/ginger?lang=fr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gold-light hover:text-gold font-medium transition-colors mt-1 flex items-center gap-2"
              >
                <ArrowRight size={12} />
                Réserver en ligne
              </a>
            </nav>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-serif text-white font-bold text-base mb-5 tracking-wide">
              Nos Expertises
            </h3>
            <div className="flex flex-col gap-2.5">
              {serviceHighlights.map((s) => (
                <span key={s} className="text-sm text-white/50">{s}</span>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif text-white font-bold text-base mb-5 tracking-wide">
              Contact
            </h3>
            <div className="flex flex-col gap-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin size={15} className="mt-0.5 shrink-0 text-gold" />
                <span>
                  Place de la Bergerie 22<br />
                  4100 Seraing, Belgique
                </span>
              </div>
              <a href="tel:+32499295849" className="flex items-center gap-3 hover:text-gold-light transition-colors">
                <Phone size={15} className="shrink-0 text-gold" />
                +32 499 29 58 49
              </a>
              <a href="mailto:info@thegingersecret.be" className="flex items-center gap-3 hover:text-gold-light transition-colors">
                <Mail size={15} className="shrink-0 text-gold" />
                info@thegingersecret.be
              </a>
              <div className="flex items-start gap-3">
                <Clock size={15} className="mt-0.5 shrink-0 text-gold" />
                <div className="text-white/50">
                  <p>Lun – Ven : 09h – 19h</p>
                  <p>Sam : 10h – 17h</p>
                  <p>Dim : Fermé</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} The Ginger Secret &mdash; Institut de Beauté &agrave; Seraing &mdash; TVA&nbsp;: BE&nbsp;1012.394.542
          </p>
          <p className="text-xs text-white/30">
            thegingersecret.be
          </p>
        </div>
      </div>

      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/3 rounded-full blur-3xl pointer-events-none" />
    </footer>
  );
}

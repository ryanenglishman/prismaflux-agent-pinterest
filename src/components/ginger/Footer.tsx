import Link from "next/link";
import { Phone, MapPin, Clock, Mail, ArrowRight, Sparkles } from "lucide-react";

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
  "Korean Lashlift",
  "Browlift & Regard",
  "Soins Visage Experts",
  "Lifting Kobido",
  "Massages Bien-être",
  "Maquillage Mariée",
  "Épilation Douce",
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* Decorative top border */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      {/* Pre-footer CTA band */}
      <div className="bg-gradient-to-r from-cream via-champagne to-cream py-10 relative">
        <div className="absolute inset-0 bg-diamond opacity-40" />
        <div className="relative max-w-5xl mx-auto px-6 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold/20 to-rose/20 flex items-center justify-center border border-gold/30">
              <Sparkles size={20} className="text-gold-dark" />
            </div>
            <div>
              <p className="font-serif text-olive text-lg font-bold">Prête pour votre rituel beauté ?</p>
              <p className="text-text-muted text-sm">Réservation en ligne 24h/24, confirmation immédiate</p>
            </div>
          </div>
          <a
            href="https://salonkee.be/salon/ginger?lang=fr"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold !text-sm"
          >
            <span>Réserver un soin</span>
            <ArrowRight size={15} />
          </a>
        </div>
      </div>

      {/* Main footer */}
      <div className="bg-gradient-to-b from-charcoal to-anthracite text-white/70 relative">
        <div className="absolute inset-0 bg-diamond opacity-10" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-20 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

            {/* Brand Column */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-cream/15 to-gold/20 flex items-center justify-center border border-gold/25">
                  <span className="font-serif text-cream font-bold text-lg leading-none">G</span>
                </div>
                <div>
                  <span className="font-serif text-white font-bold text-lg tracking-[0.12em] block leading-tight">
                    GINGER
                  </span>
                  <span className="text-[8px] text-gold-light tracking-[0.25em] uppercase">
                    Institut de Beauté
                  </span>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-white/40 mb-6">
                Un espace confidentiel dédié à la beauté intelligente, respectueuse
                et durable. Soins du visage premium, hydradermabrasion, massages
                et beauté du regard à Seraing.
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
                    className="w-10 h-10 rounded-full bg-white/[0.06] flex items-center justify-center hover:bg-gold/20 hover:text-gold-light transition-all duration-400 border border-white/[0.06] hover:border-gold/25"
                    aria-label={s.label}
                  >
                    <s.icon size={15} />
                  </a>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h3 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gold-light mb-6">
                Navigation
              </h3>
              <nav className="flex flex-col gap-3">
                {footerLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm hover:text-gold-light transition-colors duration-300 flex items-center gap-2.5 group"
                  >
                    <span className="w-4 h-px bg-white/15 group-hover:bg-gold/50 group-hover:w-6 transition-all duration-300" />
                    {link.label}
                  </Link>
                ))}
                <a
                  href="https://salonkee.be/salon/ginger?lang=fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gold-light hover:text-gold font-medium transition-colors mt-2 flex items-center gap-2.5"
                >
                  <ArrowRight size={12} />
                  Réserver en ligne
                </a>
              </nav>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gold-light mb-6">
                Nos Expertises
              </h3>
              <div className="grid grid-cols-1 gap-2.5">
                {serviceHighlights.map((s) => (
                  <span key={s} className="text-sm text-white/40 flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-gold/40" />
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gold-light mb-6">
                Contact
              </h3>
              <div className="flex flex-col gap-5 text-sm">
                <div className="flex items-start gap-3.5">
                  <MapPin size={15} className="mt-0.5 shrink-0 text-gold/70" />
                  <span>
                    Place de la Bergerie 22<br />
                    4100 Seraing, Belgique
                  </span>
                </div>
                <a href="tel:+32499295849" className="flex items-center gap-3.5 hover:text-gold-light transition-colors duration-300">
                  <Phone size={15} className="shrink-0 text-gold/70" />
                  +32 499 29 58 49
                </a>
                <a href="mailto:info@thegingersecret.be" className="flex items-center gap-3.5 hover:text-gold-light transition-colors duration-300">
                  <Mail size={15} className="shrink-0 text-gold/70" />
                  info@thegingersecret.be
                </a>
                <div className="flex items-start gap-3.5">
                  <Clock size={15} className="mt-0.5 shrink-0 text-gold/70" />
                  <div className="text-white/40">
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
        <div className="border-t border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/25">
              &copy; {new Date().getFullYear()} The Ginger Secret &mdash; Institut de Beauté &agrave; Seraing &mdash; TVA&nbsp;: BE&nbsp;1012.394.542
            </p>
            <p className="text-xs text-white/25">
              thegingersecret.be
            </p>
          </div>
        </div>

        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/[0.02] rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-rose/[0.02] rounded-full blur-[80px] pointer-events-none" />
      </div>
    </footer>
  );
}

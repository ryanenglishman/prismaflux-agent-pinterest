import type { Metadata } from "next";
import {
  MapPin,
  Phone,
  Clock,
  Mail,
  ExternalLink,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

function FacebookIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function TikTokIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.71a8.28 8.28 0 0 0 3.76.91V6.69z" />
    </svg>
  );
}

export const metadata: Metadata = {
  title: "Contact & Accès — Réservation, Adresse, Horaires",
  description:
    "Contactez The Ginger Secret, institut de beauté à Seraing. Adresse : Place de la Bergerie 22, 4100 Seraing. Téléphone : +32 499 29 58 49. Email : info@thegingersecret.be. Réservation en ligne sur Salonkee.",
};

const hours = [
  { day: "Lundi", time: "09:00 – 19:00" },
  { day: "Mardi", time: "09:00 – 19:00" },
  { day: "Mercredi", time: "09:00 – 19:00" },
  { day: "Jeudi", time: "09:00 – 19:00" },
  { day: "Vendredi", time: "09:00 – 19:00" },
  { day: "Samedi", time: "10:00 – 17:00" },
  { day: "Dimanche", time: "Fermé" },
];

const practicalInfo = [
  "Réservation recommandée au minimum 24h à l'avance",
  "Horaires flexibles sur demande pour besoins spécifiques",
  "Parking gratuit à proximité de la Place de la Bergerie",
  "Accessible en bus (lignes TEC desservant Seraing centre)",
];

const socials = [
  { icon: FacebookIcon, label: "Facebook", handle: "@thegingersecret", href: "https://www.facebook.com/thegingersecret/" },
  { icon: InstagramIcon, label: "Instagram", handle: "@thegingersecret", href: "https://www.instagram.com/thegingersecret/" },
  { icon: TikTokIcon, label: "TikTok", handle: "@thegingersecret", href: "https://www.tiktok.com/@thegingersecret" },
];

export default function ContactPage() {
  return (
    <>
      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cream-light via-bg to-ivory" />
        <div className="absolute inset-0 bg-radial-warm" />

        <div className="relative max-w-5xl mx-auto px-6 lg:px-10 py-20 md:py-28 text-center">
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="w-8 h-px bg-gold" />
            <span className="section-label">Nous retrouver</span>
            <span className="w-8 h-px bg-gold" />
          </div>
          <h1 className="section-title text-4xl md:text-6xl mb-6">
            Contact &<br />
            <span className="text-shimmer">Accès</span>
          </h1>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            Une question, une demande particulière ou envie de réserver
            votre prochain soin&nbsp;? Nous sommes à votre écoute.
          </p>
        </div>
      </section>

      {/* ── Content ────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

            {/* Left — Contact Info */}
            <div className="space-y-10">
              {/* Address */}
              <div className="flex gap-5">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cream to-sand flex items-center justify-center shrink-0 border border-gold/20">
                  <MapPin size={20} className="text-gold-dark" />
                </div>
                <div>
                  <h2 className="font-serif text-olive text-lg font-bold mb-1">
                    Adresse
                  </h2>
                  <p className="text-text-muted leading-relaxed">
                    Place de la Bergerie 22<br />
                    4100 Seraing, Belgique
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-5">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cream to-sand flex items-center justify-center shrink-0 border border-gold/20">
                  <Phone size={20} className="text-gold-dark" />
                </div>
                <div>
                  <h2 className="font-serif text-olive text-lg font-bold mb-1">
                    Téléphone
                  </h2>
                  <a
                    href="tel:+32499295849"
                    className="text-text-muted hover:text-olive transition-colors text-lg"
                  >
                    +32 499 29 58 49
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-5">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cream to-sand flex items-center justify-center shrink-0 border border-gold/20">
                  <Mail size={20} className="text-gold-dark" />
                </div>
                <div>
                  <h2 className="font-serif text-olive text-lg font-bold mb-1">
                    Email
                  </h2>
                  <a
                    href="mailto:info@thegingersecret.be"
                    className="text-text-muted hover:text-olive transition-colors"
                  >
                    info@thegingersecret.be
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="flex gap-5">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cream to-sand flex items-center justify-center shrink-0 border border-gold/20">
                  <Clock size={20} className="text-gold-dark" />
                </div>
                <div className="flex-1">
                  <h2 className="font-serif text-olive text-lg font-bold mb-3">
                    Horaires d&apos;ouverture
                  </h2>
                  <div className="space-y-1">
                    {hours.map((h) => (
                      <div
                        key={h.day}
                        className="flex justify-between text-sm py-1.5 px-4 rounded-lg text-text-muted odd:bg-cream-light/50"
                      >
                        <span className="font-medium">{h.day}</span>
                        <span>{h.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Socials */}
              <div>
                <h2 className="font-serif text-olive text-lg font-bold mb-4">
                  Suivez-nous
                </h2>
                <div className="flex flex-wrap gap-3">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 bg-white text-olive px-5 py-3 rounded-xl border border-border-light hover:border-gold/40 hover:bg-cream-light transition-all text-sm font-medium card-lift"
                    >
                      <s.icon size={16} />
                      <span>{s.label}</span>
                      <span className="text-text-dim text-xs">{s.handle}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — Map + Booking + Info */}
            <div className="space-y-8">
              {/* Map */}
              <div className="rounded-2xl overflow-hidden border border-border-light shadow-sm h-80">
                <iframe
                  title="Localisation The Ginger Secret — Institut de beauté Seraing"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2533.5!2d5.5!3d50.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zPlace+de+la+Bergerie+22%2C+4100+Seraing!5e0!3m2!1sfr!2sbe!4v1"
                  className="w-full h-full"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Booking card */}
              <div className="bg-gradient-to-br from-cream via-cream-light to-linen rounded-2xl border border-gold/20 p-8 md:p-10 card-glow text-center">
                <h3 className="font-serif text-olive text-2xl font-bold mb-3">
                  Réservation en ligne
                </h3>
                <p className="text-text-muted text-sm mb-6 leading-relaxed">
                  Réservez votre soin 24h/24 sur nos plateformes de réservation.
                  Confirmation immédiate, rappel automatique et gestion flexible
                  de vos rendez-vous.
                </p>
                <a
                  href="https://salonkee.be/salon/ginger?lang=fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary justify-center w-full sm:w-auto"
                >
                  <span>Réserver sur Salonkee</span>
                  <ExternalLink size={16} />
                </a>
                <p className="text-xs text-text-dim mt-4">
                  Également disponible sur{" "}
                  <a
                    href="https://www.planity.com/fr-BE/the-ginger-secret-4100-seraing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold-dark underline hover:text-olive transition-colors"
                  >
                    Planity
                  </a>
                </p>
              </div>

              {/* Practical info */}
              <div className="bg-white rounded-xl border border-border-light p-6">
                <h3 className="font-serif text-olive font-bold mb-4">
                  Informations pratiques
                </h3>
                <div className="space-y-3">
                  {practicalInfo.map((info) => (
                    <div key={info} className="flex items-start gap-2.5 text-sm text-text-muted">
                      <CheckCircle size={16} className="text-gold shrink-0 mt-0.5" />
                      {info}
                    </div>
                  ))}
                </div>
              </div>

              {/* TVA */}
              <p className="text-xs text-text-dim text-center">
                The Ginger Secret &mdash; TVA&nbsp;: BE&nbsp;1012.394.542
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

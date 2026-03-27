import type { Metadata } from "next";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Clock,
  Mail,
  ExternalLink,
  ArrowRight,
  CheckCircle,
  Sparkles,
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
        <div className="absolute inset-0 bg-gradient-to-b from-cream-light via-ivory to-bg" />
        <div className="absolute inset-0 bg-ambient" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-rose/5 rounded-full blur-[80px]" />

        <div className="relative max-w-5xl mx-auto px-6 lg:px-10 py-24 md:py-32 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-10 h-px bg-gradient-to-r from-transparent to-gold" />
            <span className="section-label">Nous retrouver</span>
            <span className="w-10 h-px bg-gradient-to-r from-gold to-transparent" />
          </div>
          <h1 className="section-title text-4xl md:text-[4rem] mb-7">
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
      <section className="py-20 md:py-28 relative">
        <div className="absolute inset-0 bg-ambient opacity-20" />
        <div className="relative max-w-6xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20">

            {/* Left — Contact Info */}
            <div className="space-y-10">
              {/* Address */}
              <div className="flex gap-6">
                <div className="icon-luxury shrink-0">
                  <MapPin size={20} className="text-gold-dark" />
                </div>
                <div>
                  <h2 className="font-serif text-olive text-lg font-bold mb-1.5">
                    Adresse
                  </h2>
                  <p className="text-text-muted leading-relaxed">
                    Place de la Bergerie 22<br />
                    4100 Seraing, Belgique
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-6">
                <div className="icon-luxury shrink-0">
                  <Phone size={20} className="text-gold-dark" />
                </div>
                <div>
                  <h2 className="font-serif text-olive text-lg font-bold mb-1.5">
                    Téléphone
                  </h2>
                  <a
                    href="tel:+32499295849"
                    className="text-text-muted hover:text-olive transition-colors duration-300 text-lg"
                  >
                    +32 499 29 58 49
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-6">
                <div className="icon-luxury shrink-0">
                  <Mail size={20} className="text-gold-dark" />
                </div>
                <div>
                  <h2 className="font-serif text-olive text-lg font-bold mb-1.5">
                    Email
                  </h2>
                  <a
                    href="mailto:info@thegingersecret.be"
                    className="text-text-muted hover:text-olive transition-colors duration-300"
                  >
                    info@thegingersecret.be
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="flex gap-6">
                <div className="icon-luxury shrink-0">
                  <Clock size={20} className="text-gold-dark" />
                </div>
                <div className="flex-1">
                  <h2 className="font-serif text-olive text-lg font-bold mb-4">
                    Horaires d&apos;ouverture
                  </h2>
                  <div className="bg-white rounded-xl border border-border-light/80 overflow-hidden">
                    {hours.map((h, i) => (
                      <div
                        key={h.day}
                        className={`flex justify-between text-sm py-3 px-5 text-text-muted ${
                          i % 2 === 0 ? "bg-cream-light/30" : ""
                        } ${i < hours.length - 1 ? "border-b border-border-light/40" : ""}`}
                      >
                        <span className="font-medium text-olive">{h.day}</span>
                        <span className={h.time === "Fermé" ? "text-rose" : ""}>{h.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Socials */}
              <div>
                <h2 className="font-serif text-olive text-lg font-bold mb-5">
                  Suivez-nous
                </h2>
                <div className="flex flex-wrap gap-3">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 bg-white text-olive px-5 py-3.5 rounded-xl border border-border-light/80 hover:border-gold/30 hover:bg-cream-light transition-all duration-300 text-sm font-medium service-card"
                    >
                      <s.icon size={15} />
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
              <div className="rounded-[20px] overflow-hidden border border-border-light/80 shadow-[0_4px_24px_-8px_rgba(74,74,58,0.06)] h-80">
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
              <div className="relative bg-gradient-to-br from-cream via-champagne to-linen rounded-[20px] border border-gold/15 p-9 md:p-10 text-center overflow-hidden">
                <div className="absolute inset-0 bg-diamond opacity-20" />
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-gold/8 to-transparent rounded-bl-full" />
                <div className="relative">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gold/20 to-rose/15 flex items-center justify-center mx-auto mb-5 border border-gold/20">
                    <Sparkles size={22} className="text-gold-dark" />
                  </div>
                  <h3 className="font-serif text-olive text-2xl font-bold mb-3">
                    Réservation en ligne
                  </h3>
                  <p className="text-text-muted text-sm mb-7 leading-relaxed max-w-sm mx-auto">
                    Réservez votre soin 24h/24 sur nos plateformes de réservation.
                    Confirmation immédiate et gestion flexible de vos rendez-vous.
                  </p>
                  <a
                    href="https://salonkee.be/salon/ginger?lang=fr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary justify-center w-full sm:w-auto"
                  >
                    <span>Réserver sur Salonkee</span>
                    <ExternalLink size={15} />
                  </a>
                  <p className="text-xs text-text-dim mt-5">
                    Également disponible sur{" "}
                    <a
                      href="https://www.planity.com/fr-BE/the-ginger-secret-4100-seraing"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gold-dark underline hover:text-olive transition-colors duration-300"
                    >
                      Planity
                    </a>
                  </p>
                </div>
              </div>

              {/* Practical info */}
              <div className="bg-white rounded-[20px] border border-border-light/80 p-7">
                <h3 className="font-serif text-olive font-bold mb-5">
                  Informations pratiques
                </h3>
                <div className="space-y-3.5">
                  {practicalInfo.map((info) => (
                    <div key={info} className="flex items-start gap-3 text-sm text-text-muted">
                      <CheckCircle size={15} className="text-gold shrink-0 mt-0.5" />
                      {info}
                    </div>
                  ))}
                </div>
              </div>

              {/* TVA */}
              <p className="text-xs text-text-dim text-center tracking-wider">
                The Ginger Secret &mdash; TVA&nbsp;: BE&nbsp;1012.394.542
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

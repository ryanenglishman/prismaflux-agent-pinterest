import type { Metadata } from "next";
import Link from "next/link";
import {
  GraduationCap,
  Palette,
  Eye,
  Sparkles,
  ArrowRight,
  Clock,
  Users,
  Award,
  CheckCircle,
  Star,
  Heart,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Formations & Ateliers Beauté",
  description:
    "Formations professionnelles et ateliers collaboratifs en esthétique à Seraing. Cours d'auto-maquillage, formation Korean Lashlift, atelier soin visage. Développez vos compétences beauté avec The Ginger Secret.",
};

const formations = [
  {
    icon: Palette,
    title: "Cours d'auto-maquillage",
    subtitle: "Atelier collaboratif",
    duration: "3 heures",
    price: "120 €",
    participants: "1 à 4 personnes",
    description:
      "Apprenez les techniques professionnelles pour sublimer votre teint, sculpter vos traits et mettre en valeur votre regard au quotidien. Un atelier convivial où Jessica partage ses secrets de maquillage dans une ambiance bienveillante.",
    includes: [
      "Analyse de votre morphologie et type de peau",
      "Techniques de teint : fond de teint, correcteur, contouring naturel",
      "Maquillage des yeux adapté à votre forme de regard",
      "Choix des couleurs et produits adaptés à votre carnation",
      "Conseils personnalisés & routine beauté sur mesure",
    ],
    ideal:
      "Pour toutes celles qui souhaitent maîtriser un maquillage naturel et lumineux au quotidien, ou préparer un événement spécial.",
    payment: false,
  },
  {
    icon: Eye,
    title: "Formation Korean Lashlift",
    subtitle: "Formation professionnelle certifiante",
    duration: "Journée complète",
    price: "450 €",
    participants: "1 à 2 personnes",
    description:
      "Une formation intensive destinée aux professionnelles de l'esthétique souhaitant maîtriser la technique du rehaussement de cils coréen. De la théorie à la pratique sur modèle vivant, repartez avec une compétence recherchée et directement exploitable.",
    includes: [
      "Théorie : physiologie du cil, contre-indications, produits",
      "Différences entre lashlift classique et technique coréenne",
      "Pratique supervisée sur modèle vivant",
      "Kit de démarrage professionnel inclus",
      "Attestation de formation",
      "Suivi post-formation pendant 30 jours",
    ],
    ideal:
      "Pour les esthéticiennes, prothésistes ongulaires et professionnelles de la beauté souhaitant élargir leur offre de services.",
    payment: true,
  },
  {
    icon: Sparkles,
    title: "Formation Soin Visage",
    subtitle: "Formation professionnelle",
    duration: "Journée complète",
    price: "250 €",
    participants: "1 à 2 personnes",
    description:
      "Maîtrisez les fondamentaux du soin visage professionnel : diagnostic de peau, protocoles de nettoyage, exfoliation, extraction, masques et massages faciaux. Une formation complète pour offrir des prestations de qualité à votre clientèle.",
    includes: [
      "Diagnostic et analyse des différents types de peau",
      "Protocoles de nettoyage profond et exfoliation enzymatique",
      "Techniques d'extraction douce des comédons",
      "Application de masques et sérums ciblés",
      "Massage facial relaxant et drainant",
      "Conseils pour créer vos propres protocoles de soin",
    ],
    ideal:
      "Pour les esthéticiennes débutantes ou en reconversion professionnelle souhaitant proposer des soins visage de qualité.",
    payment: true,
  },
];

const atelierFeatures = [
  {
    icon: Users,
    title: "Petit comité",
    text: "Des groupes réduits pour un accompagnement personnalisé et une attention maximale à chaque participante.",
  },
  {
    icon: Award,
    title: "Expertise terrain",
    text: "Jessica partage son expérience quotidienne en institut, pas seulement de la théorie mais un vrai savoir-faire.",
  },
  {
    icon: Heart,
    title: "Ambiance conviviale",
    text: "Un cadre chaleureux et bienveillant où apprendre rime avec plaisir, partage et passion de la beauté.",
  },
];

export default function FormationsPage() {
  return (
    <>
      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cream-light via-ivory to-bg" />
        <div className="absolute inset-0 bg-ambient" />
        <div className="absolute top-20 right-20 w-80 h-80 bg-gold/6 rounded-full blur-[80px]" />
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-rose/5 rounded-full blur-[60px]" />

        <div className="relative max-w-5xl mx-auto px-6 lg:px-10 py-24 md:py-32 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-10 h-px bg-gradient-to-r from-transparent to-gold" />
            <span className="section-label">Apprendre & transmettre</span>
            <span className="w-10 h-px bg-gradient-to-r from-gold to-transparent" />
          </div>
          <h1 className="section-title text-4xl md:text-[4rem] mb-7">
            Formations &<br />
            <span className="text-shimmer">Ateliers Beauté</span>
          </h1>
          <p className="text-text-muted text-lg max-w-2xl mx-auto leading-relaxed">
            Développez vos compétences en esthétique et en maquillage professionnel
            avec des formations pratiques, des ateliers collaboratifs et un
            accompagnement personnalisé par Jessica Maita.
          </p>
        </div>
      </section>

      {/* ── Atelier Features ───────────────────────────────────────────── */}
      <section className="py-14 bg-cream-light relative overflow-hidden">
        <div className="absolute inset-0 bg-diamond opacity-20" />
        <div className="relative max-w-5xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {atelierFeatures.map((f) => (
              <div key={f.title} className="flex gap-5 items-start">
                <div className="icon-luxury shrink-0">
                  <f.icon size={20} className="text-gold-dark" />
                </div>
                <div>
                  <h3 className="font-serif text-olive font-bold mb-1.5">{f.title}</h3>
                  <p className="text-text-muted text-sm leading-relaxed">{f.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Formations List ────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 relative">
        <div className="absolute inset-0 bg-ambient opacity-30" />
        <div className="relative max-w-5xl mx-auto px-6 lg:px-10 space-y-14">
          {formations.map((f) => (
            <div
              key={f.title}
              className="bg-white rounded-[24px] border border-border-light/80 overflow-hidden service-card"
            >
              {/* Header band */}
              <div className="relative bg-gradient-to-r from-cream via-champagne to-linen px-8 md:px-10 py-7 border-b border-border-light/60 overflow-hidden">
                <div className="absolute inset-0 bg-diamond opacity-15" />
                <div className="relative flex flex-col md:flex-row md:items-center gap-5 md:gap-7">
                  <div className="icon-luxury shrink-0">
                    <f.icon size={24} className="text-gold-dark" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gold-dark text-[10px] font-semibold tracking-[0.18em] uppercase">
                      {f.subtitle}
                    </p>
                    <h2 className="font-serif text-olive text-2xl font-bold">
                      {f.title}
                    </h2>
                  </div>
                  <div className="flex gap-7 text-sm">
                    <div>
                      <p className="text-text-dim text-[10px] tracking-wider uppercase mb-0.5">Durée</p>
                      <p className="text-olive font-semibold flex items-center gap-1.5">
                        <Clock size={13} className="text-gold" />
                        {f.duration}
                      </p>
                    </div>
                    <div>
                      <p className="text-text-dim text-[10px] tracking-wider uppercase mb-0.5">Groupe</p>
                      <p className="text-olive font-semibold flex items-center gap-1.5">
                        <Users size={13} className="text-gold" />
                        {f.participants}
                      </p>
                    </div>
                    <div>
                      <p className="text-text-dim text-[10px] tracking-wider uppercase mb-0.5">Tarif</p>
                      <p className="font-serif text-olive font-bold text-xl">
                        {f.price}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-8 md:p-10">
                <p className="text-text-muted leading-relaxed mb-7">
                  {f.description}
                </p>

                <div className="mb-7">
                  <h3 className="font-serif text-olive font-bold mb-4 text-base">
                    Ce qui est inclus
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {f.includes.map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-3 text-sm text-text-muted"
                      >
                        <CheckCircle
                          size={15}
                          className="text-gold shrink-0 mt-0.5"
                        />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-cream-light to-champagne/30 rounded-xl p-6 mb-7 border border-border-light/60">
                  <p className="text-sm text-text-muted">
                    <span className="font-semibold text-olive">Idéal pour :</span>{" "}
                    {f.ideal}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <a
                    href="https://salonkee.be/salon/ginger?lang=fr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    <span>Réserver cette formation</span>
                    <ArrowRight size={16} />
                  </a>
                  {f.payment && (
                    <span className="text-[11px] text-text-dim bg-cream/80 rounded-pill px-5 py-2.5 border border-gold/12 tracking-wide">
                      Paiement en ligne requis pour confirmer
                    </span>
                  )}
                  {!f.payment && (
                    <span className="text-[11px] text-text-dim bg-cream/80 rounded-pill px-5 py-2.5 border border-gold/12 tracking-wide">
                      Réservation sans paiement en ligne
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────── */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-anthracite to-brun-dark" />
        <div className="absolute inset-0 bg-diamond opacity-5" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-accent text-white text-3xl md:text-[2.75rem] font-light mb-5 tracking-wide italic">
            Une question sur nos formations&nbsp;?
          </h2>
          <p className="text-white/50 mb-10 leading-relaxed">
            Contactez-nous pour discuter de vos objectifs, planifier une date
            ou obtenir un programme détaillé.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <a href="mailto:info@thegingersecret.be" className="btn-gold">
              <span>info@thegingersecret.be</span>
            </a>
            <Link href="/contact" className="inline-flex items-center gap-2.5 text-white/60 hover:text-white border border-white/15 hover:border-white/30 px-8 py-4 rounded-pill transition-all duration-400 text-sm font-medium tracking-wider">
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

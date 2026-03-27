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
    text: "Des groupes réduits pour un accompagnement personnalisé et une attention maximale.",
  },
  {
    icon: Award,
    title: "Expertise terrain",
    text: "Jessica partage son expérience quotidienne en institut, pas seulement de la théorie.",
  },
  {
    icon: Star,
    title: "Ambiance conviviale",
    text: "Un cadre chaleureux et bienveillant où apprendre rime avec plaisir et partage.",
  },
];

export default function FormationsPage() {
  return (
    <>
      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cream-light via-bg to-ivory" />
        <div className="absolute inset-0 bg-radial-warm" />
        <div className="absolute top-20 right-20 w-80 h-80 bg-gold/8 rounded-full blur-3xl" />

        <div className="relative max-w-5xl mx-auto px-6 lg:px-10 py-20 md:py-28 text-center">
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="w-8 h-px bg-gold" />
            <span className="section-label">Apprendre & transmettre</span>
            <span className="w-8 h-px bg-gold" />
          </div>
          <h1 className="section-title text-4xl md:text-6xl mb-6">
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
      <section className="py-12 bg-cream-light">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {atelierFeatures.map((f) => (
              <div key={f.title} className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cream to-sand flex items-center justify-center shrink-0 border border-gold/20">
                  <f.icon size={20} className="text-gold-dark" />
                </div>
                <div>
                  <h3 className="font-serif text-olive font-bold mb-1">{f.title}</h3>
                  <p className="text-text-muted text-sm leading-relaxed">{f.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Formations List ────────────────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6 lg:px-10 space-y-12">
          {formations.map((f, idx) => (
            <div
              key={f.title}
              className="bg-white rounded-2xl border border-border-light overflow-hidden card-lift"
            >
              {/* Header band */}
              <div className="bg-gradient-to-r from-cream via-cream-light to-linen px-8 py-6 border-b border-border-light">
                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cream-dark to-sand flex items-center justify-center border border-gold/30">
                    <f.icon size={24} className="text-gold-dark" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gold-dark text-[11px] font-semibold tracking-[0.15em] uppercase">
                      {f.subtitle}
                    </p>
                    <h2 className="font-serif text-olive text-2xl font-bold">
                      {f.title}
                    </h2>
                  </div>
                  <div className="flex gap-6 text-sm">
                    <div>
                      <p className="text-text-dim text-xs">Durée</p>
                      <p className="text-olive font-semibold flex items-center gap-1.5">
                        <Clock size={14} className="text-gold" />
                        {f.duration}
                      </p>
                    </div>
                    <div>
                      <p className="text-text-dim text-xs">Participants</p>
                      <p className="text-olive font-semibold flex items-center gap-1.5">
                        <Users size={14} className="text-gold" />
                        {f.participants}
                      </p>
                    </div>
                    <div>
                      <p className="text-text-dim text-xs">Tarif</p>
                      <p className="font-serif text-olive font-bold text-xl">
                        {f.price}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-8">
                <p className="text-text-muted leading-relaxed mb-6">
                  {f.description}
                </p>

                <div className="mb-6">
                  <h3 className="font-serif text-olive font-bold mb-3">
                    Ce qui est inclus
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    {f.includes.map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-2.5 text-sm text-text-muted"
                      >
                        <CheckCircle
                          size={16}
                          className="text-gold shrink-0 mt-0.5"
                        />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-cream-light rounded-xl p-5 mb-6 border border-border-light">
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
                    <span className="text-xs text-text-dim bg-cream rounded-pill px-4 py-2 border border-gold/15">
                      Paiement en ligne requis pour confirmer la réservation
                    </span>
                  )}
                  {!f.payment && (
                    <span className="text-xs text-text-dim bg-cream rounded-pill px-4 py-2 border border-gold/15">
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
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-anthracite via-brun-dark to-olive-warm" />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-serif text-white text-3xl md:text-4xl font-bold mb-4">
            Une question sur nos formations&nbsp;?
          </h2>
          <p className="text-white/60 mb-8 leading-relaxed">
            Contactez-nous pour discuter de vos objectifs, planifier une date
            ou obtenir un programme détaillé.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="mailto:info@thegingersecret.be" className="btn-gold">
              <span>info@thegingersecret.be</span>
            </a>
            <Link href="/contact" className="inline-flex items-center gap-2 text-white/70 hover:text-white border border-white/20 hover:border-white/40 px-8 py-3.5 rounded-pill transition-all text-sm font-medium">
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

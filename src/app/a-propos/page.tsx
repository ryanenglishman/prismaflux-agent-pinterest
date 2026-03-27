import type { Metadata } from "next";
import Link from "next/link";
import {
  Heart,
  Award,
  Leaf,
  Users,
  ArrowRight,
  Sparkles,
  Star,
  CheckCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Notre Histoire — Jessica Maita, esthéticienne passionnée",
  description:
    "Découvrez l'histoire de Jessica Maita et de The Ginger Secret, institut de beauté haut de gamme à Seraing. Une passion pour la beauté intelligente, des soins d'exception et une philosophie skin-first.",
};

const milestones = [
  {
    year: "2018",
    title: "La passion s'éveille",
    description:
      "Jessica découvre sa passion pour l'esthétique et le maquillage professionnel. Elle se forme avec détermination, expérimente les techniques de soin du visage, de maquillage et d'embellissement du regard.",
  },
  {
    year: "2022",
    title: "L'expertise se forge",
    description:
      "Après des années de formation continue — Korean lashlift, techniques de massage facial, hydradermabrasion avancée — Jessica maîtrise un large éventail de compétences esthétiques au service de la beauté naturelle.",
  },
  {
    year: "Déc. 2024",
    title: "The Ginger Secret ouvre ses portes",
    description:
      "Le rêve prend forme. Jessica ouvre son institut de beauté à Seraing : un espace confidentiel, chaleureux et pensé dans les moindres détails pour offrir une expérience de soin d'exception.",
  },
  {
    year: "2025",
    title: "La gamme s'enrichit",
    description:
      "Hydradermabrasion signature, massages bien-être, baby therapy, formations professionnelles — l'institut propose désormais une gamme complète de prestations esthétiques haut de gamme et d'ateliers collaboratifs.",
  },
];

const pillars = [
  {
    icon: Heart,
    title: "Passion & Authenticité",
    text: "Chaque geste est animé par un amour sincère du métier. Jessica ne vend pas un service — elle partage une passion, celle de révéler la beauté unique de chaque personne qui franchit la porte de l'institut.",
  },
  {
    icon: Award,
    title: "Excellence & Innovation",
    text: "Des produits cosmétiques professionnels haute performance, des techniques de pointe comme le Korean lashlift et le lifting Kobido, et une veille constante sur les innovations en esthétique et skincare.",
  },
  {
    icon: Leaf,
    title: "Respect & Durabilité",
    text: "Des soins respectueux de l'intégrité de votre peau, des produits sélectionnés pour leur innocuité et leur efficacité. La beauté intelligente, c'est aussi une beauté durable et responsable.",
  },
  {
    icon: Users,
    title: "Écoute & Confiance",
    text: "Un espace intime où chaque cliente est accueillie avec attention. Jessica prend le temps d'écouter, de comprendre et d'adapter chaque protocole de soin à vos besoins spécifiques.",
  },
];

const certifications = [
  "Korean Lashlift certifié",
  "Hydradermabrasion professionnelle",
  "Lifting facial Kobido",
  "Maquillage artistique & mariée",
  "Massage bien-être & énergétique",
  "Soin visage multi-protocoles",
];

export default function AboutPage() {
  return (
    <>
      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cream-light via-bg to-ivory" />
        <div className="absolute inset-0 bg-radial-warm" />
        <div className="absolute top-10 left-10 w-96 h-96 bg-peach/8 rounded-full blur-3xl" />

        <div className="relative max-w-5xl mx-auto px-6 lg:px-10 py-20 md:py-28 text-center">
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="w-8 h-px bg-gold" />
            <span className="section-label">Notre histoire</span>
            <span className="w-8 h-px bg-gold" />
          </div>
          <h1 className="section-title text-4xl md:text-6xl mb-6">
            The Ginger
            <br />
            <span className="text-shimmer">Secret</span>
          </h1>
          <p className="text-text-muted text-lg max-w-2xl mx-auto leading-relaxed">
            Derrière ce nom se cache une histoire de famille, de passion et
            d&apos;excellence. Bienvenue dans l&apos;univers de Jessica Maita,
            esthéticienne passionnée et fondatrice de votre institut
            de beauté à Seraing.
          </p>
        </div>
      </section>

      {/* ── Story ──────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Photo placeholder */}
            <div className="img-placeholder rounded-2xl aspect-[3/4] flex flex-col items-center justify-center border border-gold/15 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-anthracite/40 to-transparent" />
              <div className="relative text-center px-8">
                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-cream/80 to-gold/30 mx-auto flex items-center justify-center mb-5 border-2 border-gold/40 backdrop-blur-sm">
                  <span className="font-serif text-olive text-4xl font-bold">
                    JM
                  </span>
                </div>
                <p className="font-serif text-white text-2xl font-bold mb-1">
                  Jessica Maita
                </p>
                <p className="text-white/70 text-sm">
                  Fondatrice & Esthéticienne
                </p>
              </div>
            </div>

            {/* Text */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-gold" />
                <span className="section-label">La fondatrice</span>
              </div>
              <h2 className="section-title text-3xl md:text-4xl mb-6">
                Pourquoi &laquo;&nbsp;Ginger&nbsp;&raquo;&nbsp;?
              </h2>
              <div className="space-y-5 text-text-muted leading-relaxed">
                <p>
                  &laquo;&nbsp;Ginger&nbsp;&raquo; est un surnom tendre donné à Jessica
                  par ses sœurs. En créant son institut de beauté, elle a voulu les
                  inclure dans cette aventure &mdash; un clin d&apos;œil affectueux à
                  celles qui l&apos;ont toujours soutenue et encouragée.
                </p>
                <p>
                  Passionnée par l&apos;esthétique et le maquillage depuis 2018, Jessica
                  a consacré des années à se former aux techniques de soin du visage,
                  de rehaussement du regard, de massage bien-être et d&apos;hydradermabrasion.
                  Cette quête d&apos;excellence l&apos;a conduite à ouvrir The Ginger Secret
                  fin 2024 à Seraing.
                </p>
                <p>
                  Sa philosophie&nbsp;? Une approche &laquo;&nbsp;skin-first&nbsp;&raquo;
                  qui cherche à comprendre et rééquilibrer la peau plutôt qu&apos;à
                  la masquer. Chaque protocole est conçu pour révéler la beauté
                  naturelle de chaque cliente, en utilisant des produits cosmétiques
                  haut de gamme et des techniques à la pointe de l&apos;esthétique
                  moderne.
                </p>
                <blockquote className="font-serif text-olive text-xl font-bold italic border-l-2 border-gold pl-5 my-6">
                  &laquo;&nbsp;We don&apos;t conceal. We reveal.&nbsp;&raquo;
                </blockquote>
                <p>
                  Plus qu&apos;un institut, The Ginger Secret est un espace confidentiel
                  où l&apos;on prend le temps de prendre soin de soi. Un cocon de douceur
                  et d&apos;expertise où chaque visite est un rituel de beauté personnalisé.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Certifications ─────────────────────────────────────────────── */}
      <section className="py-16 bg-cream-light">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-10">
            <h2 className="section-title text-2xl md:text-3xl">Expertises & Certifications</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {certifications.map((c) => (
              <div
                key={c}
                className="flex items-center gap-3 bg-white/80 rounded-xl px-5 py-4 border border-border-light text-sm text-olive font-medium"
              >
                <CheckCircle size={16} className="text-gold shrink-0" />
                {c}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pillars ────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-8 h-px bg-gold" />
              <span className="section-label">Nos valeurs</span>
              <span className="w-8 h-px bg-gold" />
            </div>
            <h2 className="section-title text-3xl md:text-4xl">
              Les piliers de notre engagement
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pillars.map((p) => (
              <div key={p.title} className="flex gap-5 p-6 rounded-xl bg-white border border-border-light card-lift">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cream to-sand flex items-center justify-center shrink-0 border border-gold/20">
                  <p.icon size={24} className="text-gold-dark" />
                </div>
                <div>
                  <h3 className="font-serif text-olive font-bold text-lg mb-2">
                    {p.title}
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed">{p.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ───────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-linen-texture relative">
        <div className="bg-radial-warm absolute inset-0" />
        <div className="relative max-w-3xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-8 h-px bg-gold" />
              <span className="section-label">Notre parcours</span>
              <span className="w-8 h-px bg-gold" />
            </div>
            <h2 className="section-title text-3xl md:text-4xl">
              De la passion à l&apos;excellence
            </h2>
          </div>

          <div className="space-y-0">
            {milestones.map((m, i) => (
              <div key={m.year} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-white border-2 border-gold flex items-center justify-center shrink-0 shadow-sm">
                    <span className="font-serif text-olive font-bold text-xs text-center leading-tight">
                      {m.year}
                    </span>
                  </div>
                  {i < milestones.length - 1 && (
                    <div className="w-px flex-1 bg-gradient-to-b from-gold/40 to-gold/10 my-2" />
                  )}
                </div>
                <div className="pb-10">
                  <h3 className="font-serif text-olive font-bold text-lg mb-2">
                    {m.title}
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed">
                    {m.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Rating highlight ───────────────────────────────────────────── */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="bg-gradient-to-br from-cream via-cream-light to-linen rounded-2xl border border-gold/20 p-10 md:p-14 card-glow">
            <div className="flex justify-center gap-1 mb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={24} className="fill-gold text-gold" />
              ))}
            </div>
            <p className="font-serif text-olive text-3xl font-bold mb-2">
              4.9 sur 5
            </p>
            <p className="text-text-muted mb-1">
              100% de recommandation sur l&apos;ensemble de nos avis vérifiés
            </p>
            <p className="text-text-dim text-sm">
              Salonkee &bull; Facebook &bull; Google
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────── */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-anthracite via-brun-dark to-olive-warm" />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-serif text-white text-3xl md:text-4xl font-bold mb-4">
            Envie de découvrir notre univers&nbsp;?
          </h2>
          <p className="text-white/60 mb-8 leading-relaxed">
            Poussez la porte de The Ginger Secret et offrez à votre peau
            l&apos;expertise qu&apos;elle mérite.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://salonkee.be/salon/ginger?lang=fr"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold"
            >
              <span>Prendre rendez-vous</span>
              <ArrowRight size={16} />
            </a>
            <Link href="/contact" className="inline-flex items-center gap-2 text-white/70 hover:text-white border border-white/20 hover:border-white/40 px-8 py-3.5 rounded-pill transition-all text-sm font-medium">
              Nous trouver
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

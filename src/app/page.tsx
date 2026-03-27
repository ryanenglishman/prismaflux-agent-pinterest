import Link from "next/link";
import {
  Sparkles,
  Heart,
  Star,
  ArrowRight,
  Clock,
  Shield,
  Gem,
  Droplets,
  Hand,
  Eye,
  Leaf,
  Award,
  CheckCircle,
} from "lucide-react";

/* ── Data ──────────────────────────────────────────────────────────────── */

const heroStats = [
  { value: "4.9/5", label: "Avis clients" },
  { value: "30+", label: "Soins proposés" },
  { value: "100%", label: "Recommandation" },
];

const expertises = [
  {
    icon: Droplets,
    title: "Hydradermabrasion",
    subtitle: "Technologie Signature",
    description:
      "Notre soin phare allie aspiration, exfoliation et infusion de sérums actifs pour une peau nettoyée en profondeur, décongestionée et intensément hydratée. Un éclat visible dès la première séance.",
    price: "dès 85 €",
  },
  {
    icon: Eye,
    title: "Beauté du Regard",
    subtitle: "Lashlift & Browlift",
    description:
      "Rehaussement de cils classique ou Korean Lashlift, restructuration et teinture des sourcils. Des techniques douces et précises pour un regard ouvert, intense et naturellement sublimé.",
    price: "dès 50 €",
  },
  {
    icon: Sparkles,
    title: "Soins Visage Experts",
    subtitle: "Rituels sur mesure",
    description:
      "Du soin traditionnel au lifting japonais Kobido, chaque protocole est adapté à votre type de peau. Nettoyage, exfoliation, masque, sérum — votre peau retrouve son équilibre naturel.",
    price: "dès 35 €",
  },
  {
    icon: Hand,
    title: "Massages & Bien-être",
    subtitle: "Corps & esprit",
    description:
      "Massage relaxant du corps complet, drainage des jambes, massage crânien ou énergétique. Un moment de détente profonde où tensions et stress se dissolvent.",
    price: "dès 50 €",
  },
  {
    icon: Gem,
    title: "Maquillage Professionnel",
    subtitle: "Événements & mariages",
    description:
      "Sublimez votre beauté naturelle pour vos événements les plus précieux. Maquillage mariée, soirée ou essai complet — un résultat lumineux et longue tenue.",
    price: "dès 50 €",
  },
  {
    icon: Award,
    title: "Formations & Ateliers",
    subtitle: "Transmettez & apprenez",
    description:
      "Cours d'auto-maquillage, formation Korean Lashlift ou soin visage. Développez vos compétences beauté aux côtés d'une professionnelle passionnée et expérimentée.",
    price: "dès 120 €",
  },
];

const whyUs = [
  {
    icon: Heart,
    title: "Approche skin-first",
    text: "Nous analysons et comprenons votre peau avant chaque soin. Pas de solutions standardisées — un protocole personnalisé qui respecte l'équilibre naturel de votre épiderme.",
  },
  {
    icon: Leaf,
    title: "Produits sélectionnés avec soin",
    text: "Des cosmétiques professionnels haute performance, choisis pour leur efficacité et leur respect de la peau. Aucun compromis entre résultat et douceur.",
  },
  {
    icon: Shield,
    title: "Expertise & formation continue",
    text: "Jessica se forme constamment aux dernières techniques : Korean Lashlift, Kobido, hydradermabrasion de nouvelle génération. L'innovation au service de votre beauté.",
  },
  {
    icon: Clock,
    title: "Un cocon hors du temps",
    text: "Plus qu'un institut, un espace intime et chaleureux où chaque visite devient un rituel de bien-être. Prenez le temps de prendre soin de vous.",
  },
];

const testimonials = [
  {
    name: "Sophie L.",
    service: "Hydra GINGER Signature",
    text: "Un accueil chaleureux, des soins professionnels et des résultats visibles dès la première séance. Ma peau n'a jamais été aussi éclatante. Je recommande à 100% !",
    rating: 5,
  },
  {
    name: "Marie D.",
    service: "Korean Lashlift",
    text: "Jessica prend le temps d'expliquer chaque étape du soin. On se sent en confiance et les résultats sont au rendez-vous. Mon regard est transformé, naturellement.",
    rating: 5,
  },
  {
    name: "Nathalie B.",
    service: "Lifting Kobido",
    text: "Le lifting japonais Kobido est une vraie révélation. Mon visage est plus ferme, les traits lissés, et ce moment de détente est un pur bonheur. Un rituel dont je ne peux plus me passer.",
    rating: 5,
  },
  {
    name: "Céline M.",
    service: "Massage complet",
    text: "Un vrai cocon de douceur. Le massage complet du corps m'a permis de relâcher toutes mes tensions. L'ambiance, les produits, les mains expertes — tout est parfait.",
    rating: 5,
  },
];

const skinConcerns = [
  "Peau terne & fatiguée",
  "Rides & ridules",
  "Pores dilatés",
  "Taches pigmentaires",
  "Peau déshydratée",
  "Teint irrégulier",
  "Peau sensible & réactive",
  "Relâchement cutané",
];

/* ── Page ──────────────────────────────────────────────────────────────── */

export default function HomePage() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════════
          HERO — Immersive entry
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">
        {/* Layered background */}
        <div className="absolute inset-0 bg-gradient-to-b from-cream-light via-bg to-ivory" />
        <div className="absolute inset-0 bg-radial-warm" />
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-gradient-to-br from-gold/10 to-peach/10 rounded-full blur-3xl animate-breathe" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[400px] bg-gradient-to-tr from-peach-light/10 to-gold/5 rounded-full blur-3xl" />

        {/* Ornamental circle */}
        <div className="absolute top-1/2 right-[10%] -translate-y-1/2 w-[400px] h-[400px] border border-gold/10 rounded-full hidden xl:block animate-spin-slow" />
        <div className="absolute top-1/2 right-[10%] -translate-y-1/2 w-[340px] h-[340px] border border-gold/8 rounded-full hidden xl:block" style={{ animationDirection: "reverse" }} />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-24 md:py-32 w-full">
          <div className="max-w-3xl">
            {/* Label */}
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-gold" />
              <span className="section-label">Institut de beauté &mdash; Seraing, Belgique</span>
            </div>

            {/* Headline */}
            <h1 className="section-title text-4xl md:text-6xl lg:text-7xl mb-6 leading-[1.08]">
              Votre peau mérite
              <br />
              <span className="text-shimmer">l&apos;excellence</span>
            </h1>

            {/* Subheadline */}
            <p className="text-text-muted text-lg md:text-xl leading-relaxed mb-10 max-w-xl">
              Un espace confidentiel dédié à celles et ceux qui recherchent une
              beauté intelligente. Soins du visage, hydradermabrasion,
              massages relaxants et beauté du regard &mdash; chaque protocole
              est pensé pour révéler l&apos;éclat naturel de votre peau.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-14">
              <a
                href="https://salonkee.be/salon/ginger?lang=fr"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary pulse-glow"
              >
                <span>Réserver un soin</span>
                <ArrowRight size={18} />
              </a>
              <Link href="/services" className="btn-outline">
                <span>Découvrir nos soins</span>
                <ArrowRight size={18} />
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-8 md:gap-12">
              {heroStats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-serif text-olive text-2xl md:text-3xl font-bold">
                    {stat.value}
                  </p>
                  <p className="text-text-dim text-xs mt-1 tracking-wide">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          PROMISE — Brand statement
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-20 bg-cream-light relative">
        <div className="gold-divider mb-16" />
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="ornament-dots mb-6">
            <Sparkles size={16} className="text-gold" />
          </div>
          <blockquote className="font-serif text-olive text-2xl md:text-4xl font-bold leading-snug mb-4 italic">
            &ldquo;We don&apos;t conceal. We reveal.&rdquo;
          </blockquote>
          <p className="text-text-muted max-w-2xl mx-auto leading-relaxed">
            Chez Ginger, nous croyons en une beauté qui respecte, qui comprend
            et qui sublime. Pas de masques, pas de promesses vides &mdash; juste
            des soins d&apos;exception, des produits cosmétiques haut de gamme et un
            savoir-faire passionné au service de votre peau.
          </p>
        </div>
        <div className="gold-divider mt-16" />
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          EXPERTISES — Service categories
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-8 h-px bg-gold" />
              <span className="section-label">Nos expertises</span>
              <span className="w-8 h-px bg-gold" />
            </div>
            <h2 className="section-title text-3xl md:text-5xl mb-4">
              Des soins d&apos;exception pour
              <br className="hidden md:block" />
              chaque besoin de votre peau
            </h2>
            <p className="text-text-muted max-w-2xl mx-auto leading-relaxed">
              De l&apos;hydradermabrasion avancée aux rituels de bien-être japonais,
              découvrez une gamme complète de prestations esthétiques conçues
              pour sublimer votre beauté naturelle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {expertises.map((service) => (
              <div
                key={service.title}
                className="group bg-white rounded-xl border border-border-light p-7 card-lift relative overflow-hidden"
              >
                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-cream to-transparent rounded-bl-3xl" />

                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cream to-sand flex items-center justify-center mb-5 border border-gold/20 group-hover:border-gold/40 transition-colors duration-300">
                    <service.icon size={24} className="text-gold-dark" />
                  </div>

                  <p className="text-gold-dark text-[11px] font-semibold tracking-[0.15em] uppercase mb-1">
                    {service.subtitle}
                  </p>
                  <h3 className="font-serif text-olive text-xl font-bold mb-3">
                    {service.title}
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed mb-5">
                    {service.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-border-light">
                    <span className="text-olive font-bold">{service.price}</span>
                    <a
                      href="https://salonkee.be/salon/ginger?lang=fr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gold-dark text-sm font-medium hover:text-olive transition-colors flex items-center gap-1.5 group/link"
                    >
                      Réserver
                      <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/services" className="btn-outline">
              <span>Voir tous nos soins &amp; tarifs</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SKIN CONCERNS — SEO rich section
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-linen-texture relative">
        <div className="bg-radial-warm absolute inset-0" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left — image placeholder */}
            <div className="img-placeholder rounded-2xl aspect-[4/5] flex items-end p-8 border border-gold/15">
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 w-full border border-gold/20">
                <p className="font-serif text-olive font-bold text-lg mb-1">
                  Diagnostic personnalisé
                </p>
                <p className="text-text-muted text-sm">
                  Chaque soin commence par une analyse de votre type de peau
                  et de vos préoccupations spécifiques.
                </p>
              </div>
            </div>

            {/* Right — content */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-gold" />
                <span className="section-label">Pour chaque préoccupation</span>
              </div>
              <h2 className="section-title text-3xl md:text-4xl mb-6">
                Votre peau a des besoins uniques.
                <br />
                <span className="text-gold-dark">Nous les comprenons.</span>
              </h2>
              <p className="text-text-muted leading-relaxed mb-8">
                Que vous cherchiez à ralentir le vieillissement cutané, retrouver
                un teint lumineux, atténuer les imperfections ou simplement offrir
                à votre épiderme un moment de régénération intense &mdash; nos
                protocoles de soins esthétiques sont conçus pour répondre
                précisément à vos besoins.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-8">
                {skinConcerns.map((concern) => (
                  <div
                    key={concern}
                    className="flex items-center gap-2.5 bg-white/80 rounded-lg px-4 py-3 border border-border-light text-sm text-olive"
                  >
                    <CheckCircle size={16} className="text-gold shrink-0" />
                    {concern}
                  </div>
                ))}
              </div>

              <a
                href="https://salonkee.be/salon/ginger?lang=fr"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <span>Réserver votre diagnostic</span>
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          WHY CHOOSE US
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-8 h-px bg-gold" />
              <span className="section-label">Notre philosophie</span>
              <span className="w-8 h-px bg-gold" />
            </div>
            <h2 className="section-title text-3xl md:text-5xl mb-4">
              Pourquoi choisir Ginger&nbsp;?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {whyUs.map((item, i) => (
              <div
                key={item.title}
                className="flex gap-5 p-6 rounded-xl bg-white border border-border-light card-lift"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cream to-sand flex items-center justify-center shrink-0 border border-gold/20">
                  <item.icon size={24} className="text-gold-dark" />
                </div>
                <div>
                  <h3 className="font-serif text-olive font-bold text-lg mb-2">
                    {item.title}
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          TESTIMONIALS
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-cream-light">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-8 h-px bg-gold" />
              <span className="section-label">Avis vérifiés</span>
              <span className="w-8 h-px bg-gold" />
            </div>
            <h2 className="section-title text-3xl md:text-5xl mb-2">
              4.9 <span className="text-gold">&#9733;</span> sur 5
            </h2>
            <p className="text-text-muted">
              Elles ont confié leur peau à Ginger
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-white rounded-xl border border-border-light p-6 card-lift flex flex-col"
              >
                <div className="flex gap-0.5 mb-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={14} className="fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-[11px] text-gold-dark font-medium tracking-wide uppercase mb-3">
                  {t.service}
                </p>
                <p className="text-text-muted text-sm leading-relaxed mb-4 italic flex-1">
                  &ldquo;{t.text}&rdquo;
                </p>
                <p className="text-olive font-semibold text-sm">{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          FORMATIONS CTA
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="bg-gradient-to-br from-cream via-cream-light to-linen rounded-2xl border border-gold/20 p-10 md:p-16 flex flex-col md:flex-row items-center gap-10 card-glow">
            <div className="flex-1">
              <span className="section-label mb-3 block">Formations & Ateliers</span>
              <h2 className="section-title text-2xl md:text-4xl mb-4">
                Développez vos compétences beauté
              </h2>
              <p className="text-text-muted leading-relaxed mb-6">
                Cours d&apos;auto-maquillage, formation professionnelle Korean Lashlift
                ou atelier soin visage &mdash; apprenez les gestes experts dans un cadre
                bienveillant et passionné. Des ateliers collaboratifs pensés pour
                transmettre un savoir-faire d&apos;excellence.
              </p>
              <Link href="/formations" className="btn-primary">
                <span>Découvrir les formations</span>
                <ArrowRight size={16} />
              </Link>
            </div>
            <div className="w-full md:w-72 h-60 img-placeholder rounded-xl border border-gold/15 flex items-center justify-center shrink-0">
              <div className="text-center">
                <Award size={40} className="text-gold/40 mx-auto mb-3" />
                <p className="font-serif text-olive/60 text-sm">Formation & partage</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          CTA FINAL
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-anthracite via-brun-dark to-olive-warm" />
        <div className="absolute inset-0 bg-radial-warm opacity-30" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <div className="ornament-dots mb-8 [&>*]:text-gold/50 [&::before]:bg-gradient-to-r [&::before]:from-transparent [&::before]:to-gold/30 [&::after]:bg-gradient-to-r [&::after]:from-gold/30 [&::after]:to-transparent">
            <Sparkles size={16} className="text-gold/50" />
          </div>

          <h2 className="font-serif text-white text-3xl md:text-5xl font-bold mb-6 leading-tight">
            Prête à révéler
            <br />
            votre éclat naturel&nbsp;?
          </h2>
          <p className="text-white/60 text-lg mb-10 leading-relaxed">
            Réservez votre soin en quelques clics et offrez à votre peau
            l&apos;attention qu&apos;elle mérite. Diagnostic personnalisé, soins experts
            et résultats visibles.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://salonkee.be/salon/ginger?lang=fr"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold pulse-glow"
            >
              <span>Réserver maintenant</span>
              <ArrowRight size={16} />
            </a>
            <a
              href="tel:+32499295849"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white border border-white/20 hover:border-white/40 px-8 py-3.5 rounded-pill transition-all text-sm font-medium"
            >
              +32 499 29 58 49
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

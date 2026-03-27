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
  Quote,
  Flower2,
  Sun,
} from "lucide-react";

/* ── Data ──────────────────────────────────────────────────────────────── */

const heroStats = [
  { value: "4.9/5", label: "Avis clients", icon: Star },
  { value: "30+", label: "Soins proposés", icon: Sparkles },
  { value: "100%", label: "Recommandation", icon: Heart },
];

const expertises = [
  {
    icon: Droplets,
    title: "Hydradermabrasion",
    subtitle: "Technologie Signature",
    description:
      "Notre soin phare allie aspiration, exfoliation et infusion de sérums actifs pour une peau nettoyée en profondeur, décongestionée et intensément hydratée. Un éclat visible dès la première séance.",
    price: "dès 85 €",
    accent: "from-blue-100/40 to-cyan-50/40",
  },
  {
    icon: Eye,
    title: "Beauté du Regard",
    subtitle: "Lashlift & Browlift",
    description:
      "Rehaussement de cils classique ou Korean Lashlift, restructuration et teinture des sourcils. Des techniques douces et précises pour un regard ouvert, intense et naturellement sublimé.",
    price: "dès 50 €",
    accent: "from-purple-50/40 to-pink-50/40",
  },
  {
    icon: Sparkles,
    title: "Soins Visage Experts",
    subtitle: "Rituels sur mesure",
    description:
      "Du soin traditionnel au lifting japonais Kobido, chaque protocole est adapté à votre type de peau. Nettoyage, exfoliation, masque, sérum — votre peau retrouve son équilibre naturel.",
    price: "dès 35 €",
    accent: "from-amber-50/40 to-yellow-50/40",
  },
  {
    icon: Hand,
    title: "Massages & Bien-être",
    subtitle: "Corps & esprit",
    description:
      "Massage relaxant du corps complet, drainage des jambes, massage crânien ou énergétique. Un moment de détente profonde où tensions et stress se dissolvent.",
    price: "dès 50 €",
    accent: "from-emerald-50/40 to-teal-50/40",
  },
  {
    icon: Gem,
    title: "Maquillage Professionnel",
    subtitle: "Événements & mariages",
    description:
      "Sublimez votre beauté naturelle pour vos événements les plus précieux. Maquillage mariée, soirée ou essai complet — un résultat lumineux et longue tenue.",
    price: "dès 50 €",
    accent: "from-rose-50/40 to-pink-50/40",
  },
  {
    icon: Award,
    title: "Formations & Ateliers",
    subtitle: "Transmettez & apprenez",
    description:
      "Cours d'auto-maquillage, formation Korean Lashlift ou soin visage. Développez vos compétences beauté aux côtés d'une professionnelle passionnée et expérimentée.",
    price: "dès 120 €",
    accent: "from-orange-50/40 to-amber-50/40",
  },
];

const ritualSteps = [
  {
    step: "01",
    title: "Accueil & Diagnostic",
    description:
      "Un moment d'échange pour comprendre votre peau, vos attentes et définir ensemble le protocole idéal. Analyse de votre type de peau, de vos préoccupations cutanées et de votre routine actuelle.",
    icon: Flower2,
  },
  {
    step: "02",
    title: "Rituel de Soin",
    description:
      "Installation dans notre cabine confidentielle, musique apaisante, lumière tamisée. Chaque geste est réalisé avec précision et douceur — nettoyage, exfoliation, soin ciblé, massage.",
    icon: Sparkles,
  },
  {
    step: "03",
    title: "Résultat & Conseils",
    description:
      "Votre peau est transformée, votre teint est lumineux. Jessica vous accompagne avec des conseils personnalisés pour prolonger les bienfaits du soin à la maison.",
    icon: Sun,
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
    title: "Cosmétiques haut de gamme",
    text: "Des produits professionnels haute performance, choisis pour leur efficacité et leur respect de la peau. Aucun compromis entre résultat et douceur.",
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
          HERO — Immersive luxury entry
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden min-h-[92vh] flex items-center">
        {/* Layered backgrounds */}
        <div className="absolute inset-0 bg-gradient-to-b from-cream-light via-ivory to-bg" />
        <div className="absolute inset-0 bg-ambient" />
        <div className="absolute inset-0 bg-silk opacity-40" />

        {/* Decorative blobs */}
        <div className="absolute top-16 right-[5%] w-[500px] h-[500px] bg-gradient-to-br from-gold/8 to-peach/8 rounded-full blur-[80px] animate-breathe" />
        <div className="absolute bottom-10 left-[5%] w-[400px] h-[400px] bg-gradient-to-tr from-rose/6 to-gold/4 rounded-full blur-[60px]" />
        <div className="absolute top-1/3 left-1/2 w-[300px] h-[300px] bg-peach/5 animate-morph blur-[40px]" />

        {/* Ornamental circles */}
        <div className="absolute top-1/2 right-[8%] -translate-y-1/2 w-[420px] h-[420px] border border-gold/[0.06] rounded-full hidden xl:block animate-spin-slow" />
        <div className="absolute top-1/2 right-[8%] -translate-y-1/2 w-[350px] h-[350px] border border-rose/[0.05] rounded-full hidden xl:block" style={{ animationDirection: "reverse", animation: "spinSlow 55s linear infinite reverse" }} />
        <div className="absolute top-1/2 right-[8%] -translate-y-1/2 w-[280px] h-[280px] border border-gold/[0.04] rounded-full hidden xl:block animate-spin-slow" style={{ animationDuration: "70s" }} />

        {/* Decorative sparkles */}
        <div className="absolute top-[20%] right-[15%] hidden lg:block">
          <Sparkles size={14} className="text-gold/20 animate-twinkle" />
        </div>
        <div className="absolute top-[60%] right-[25%] hidden lg:block">
          <Star size={10} className="text-rose/20 animate-twinkle" style={{ animationDelay: "1.5s" }} />
        </div>
        <div className="absolute top-[35%] right-[30%] hidden lg:block">
          <Gem size={12} className="text-gold/15 animate-twinkle" style={{ animationDelay: "0.8s" }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-24 md:py-32 w-full">
          <div className="max-w-3xl">
            {/* Label */}
            <div className="flex items-center gap-3.5 mb-8">
              <span className="w-10 h-px bg-gradient-to-r from-gold to-rose" />
              <span className="section-label">Institut de beauté &mdash; Seraing, Belgique</span>
            </div>

            {/* Headline */}
            <h1 className="section-title text-[2.75rem] md:text-[4rem] lg:text-[5rem] mb-7 leading-[1.05] text-balance">
              Votre peau mérite
              <br />
              <span className="text-shimmer">l&apos;excellence</span>
            </h1>

            {/* Subheadline */}
            <p className="text-text-muted text-lg md:text-xl leading-relaxed mb-12 max-w-xl">
              Un espace confidentiel dédié à celles et ceux qui recherchent une
              beauté intelligente. Soins du visage, hydradermabrasion,
              massages relaxants et beauté du regard &mdash; chaque protocole
              est pensé pour révéler l&apos;éclat naturel de votre peau.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <a
                href="https://salonkee.be/salon/ginger?lang=fr"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold pulse-glow"
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
            <div className="flex gap-10 md:gap-14">
              {heroStats.map((stat) => (
                <div key={stat.label} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cream to-champagne flex items-center justify-center border border-gold/20">
                    <stat.icon size={16} className="text-gold-dark" />
                  </div>
                  <div>
                    <p className="font-serif text-olive text-xl md:text-2xl font-bold leading-none">
                      {stat.value}
                    </p>
                    <p className="text-text-dim text-[11px] mt-0.5 tracking-wider">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          PROMISE — Brand statement
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative py-20 md:py-24 bg-cream-light overflow-hidden">
        <div className="absolute inset-0 bg-diamond opacity-30" />
        <div className="gold-divider mb-16" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <div className="ornament-dots mb-8">
            <Sparkles size={16} className="text-gold" />
          </div>
          <blockquote className="font-accent text-olive text-3xl md:text-5xl font-medium leading-snug mb-6 italic tracking-wide">
            &ldquo;We don&apos;t conceal. We reveal.&rdquo;
          </blockquote>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-rose to-transparent mx-auto mb-6" />
          <p className="text-text-muted max-w-2xl mx-auto leading-relaxed text-[15px]">
            Chez Ginger, nous croyons en une beauté qui respecte, qui comprend
            et qui sublime. Pas de masques, pas de promesses vides &mdash; juste
            des soins d&apos;exception, des cosmétiques haut de gamme et un
            savoir-faire passionné au service de votre peau.
          </p>
        </div>
        <div className="gold-divider mt-16" />
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          EXPERTISES — Service categories
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 relative">
        <div className="absolute inset-0 bg-ambient opacity-50" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-20">
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="w-10 h-px bg-gradient-to-r from-transparent to-gold" />
              <span className="section-label">Nos expertises</span>
              <span className="w-10 h-px bg-gradient-to-r from-gold to-transparent" />
            </div>
            <h2 className="section-title text-3xl md:text-[3.25rem] mb-5 text-balance">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8">
            {expertises.map((service) => (
              <div
                key={service.title}
                className="group service-card p-8 relative"
              >
                {/* Decorative corner gradient */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${service.accent} rounded-bl-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

                <div className="relative">
                  <div className="icon-luxury mb-6">
                    <service.icon size={24} className="text-gold-dark" />
                  </div>

                  <p className="text-gold-dark text-[10px] font-semibold tracking-[0.18em] uppercase mb-1.5">
                    {service.subtitle}
                  </p>
                  <h3 className="font-serif text-olive text-xl font-bold mb-3">
                    {service.title}
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <div className="flex items-center justify-between pt-5 border-t border-border-light/60">
                    <span className="font-serif text-olive font-bold text-lg">{service.price}</span>
                    <a
                      href="https://salonkee.be/salon/ginger?lang=fr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gold-dark text-[12px] font-semibold tracking-wider uppercase hover:text-olive transition-colors flex items-center gap-2 group/link"
                    >
                      Réserver
                      <ArrowRight size={13} className="group-hover/link:translate-x-1 transition-transform duration-300" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-14">
            <Link href="/services" className="btn-outline">
              <span>Voir tous nos soins &amp; tarifs</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          THE RITUAL — Step by step experience
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-cream-light relative overflow-hidden">
        <div className="absolute inset-0 bg-silk opacity-30" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

        <div className="relative max-w-6xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-20">
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="w-10 h-px bg-gradient-to-r from-transparent to-gold" />
              <span className="section-label">L&apos;expérience Ginger</span>
              <span className="w-10 h-px bg-gradient-to-r from-gold to-transparent" />
            </div>
            <h2 className="section-title text-3xl md:text-[3.25rem] mb-5 text-balance">
              Votre rituel beauté,
              <br className="hidden md:block" />
              <span className="text-shimmer-rose">étape par étape</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {ritualSteps.map((r) => (
              <div key={r.step} className="text-center group">
                <div className="relative mx-auto mb-8">
                  {/* Step number ring */}
                  <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-cream to-champagne border-2 border-gold/20 flex items-center justify-center group-hover:border-gold/40 transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(196,169,125,0.15)]">
                    <r.icon size={32} className="text-gold-dark/70 group-hover:text-gold-dark transition-colors duration-400" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-gold to-gold-dark text-white text-xs font-bold flex items-center justify-center shadow-lg">
                    {r.step}
                  </span>
                </div>
                <h3 className="font-serif text-olive text-xl font-bold mb-3">{r.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed max-w-xs mx-auto">{r.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SKIN CONCERNS — SEO rich section
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-linen-texture relative overflow-hidden">
        <div className="bg-ambient absolute inset-0" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24 items-center">
            {/* Left — image placeholder */}
            <div className="img-placeholder rounded-[28px] aspect-[4/5] flex items-end p-8 border border-gold/12 relative group overflow-hidden">
              {/* Floating decorative element */}
              <div className="absolute top-8 right-8 w-20 h-20 border border-gold/15 rounded-full flex items-center justify-center">
                <Sparkles size={20} className="text-gold/30 animate-twinkle" />
              </div>
              <div className="relative bg-white/92 backdrop-blur-md rounded-2xl p-7 w-full border border-gold/15 shadow-lg">
                <p className="font-serif text-olive font-bold text-lg mb-1.5">
                  Diagnostic personnalisé
                </p>
                <p className="text-text-muted text-sm leading-relaxed">
                  Chaque soin commence par une analyse de votre type de peau
                  et de vos préoccupations spécifiques.
                </p>
              </div>
            </div>

            {/* Right — content */}
            <div>
              <div className="flex items-center gap-3.5 mb-5">
                <span className="w-10 h-px bg-gradient-to-r from-gold to-rose" />
                <span className="section-label">Pour chaque préoccupation</span>
              </div>
              <h2 className="section-title text-3xl md:text-[2.75rem] mb-6 leading-tight">
                Votre peau a des besoins uniques.
                <br />
                <span className="text-gradient-gold">Nous les comprenons.</span>
              </h2>
              <p className="text-text-muted leading-relaxed mb-10">
                Que vous cherchiez à ralentir le vieillissement cutané, retrouver
                un teint lumineux, atténuer les imperfections ou simplement offrir
                à votre épiderme un moment de régénération intense &mdash; nos
                protocoles de soins esthétiques sont conçus pour répondre
                précisément à vos besoins.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-10">
                {skinConcerns.map((concern) => (
                  <div
                    key={concern}
                    className="flex items-center gap-3 bg-white/85 backdrop-blur-sm rounded-xl px-4 py-3.5 border border-border-light/80 text-sm text-olive hover:border-gold/30 hover:bg-white transition-all duration-300"
                  >
                    <CheckCircle size={15} className="text-gold shrink-0" />
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
      <section className="py-24 md:py-32 relative">
        <div className="absolute inset-0 bg-ambient opacity-30" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-20">
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="w-10 h-px bg-gradient-to-r from-transparent to-gold" />
              <span className="section-label">Notre philosophie</span>
              <span className="w-10 h-px bg-gradient-to-r from-gold to-transparent" />
            </div>
            <h2 className="section-title text-3xl md:text-[3.25rem] mb-4 text-balance">
              Pourquoi choisir Ginger&nbsp;?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {whyUs.map((item) => (
              <div
                key={item.title}
                className="group flex gap-6 p-8 rounded-2xl bg-white border border-border-light/80 service-card"
              >
                <div className="icon-luxury shrink-0">
                  <item.icon size={24} className="text-gold-dark" />
                </div>
                <div>
                  <h3 className="font-serif text-olive font-bold text-lg mb-2.5">
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
      <section className="py-24 md:py-32 bg-cream-light relative overflow-hidden">
        <div className="absolute inset-0 bg-silk opacity-20" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-20">
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="w-10 h-px bg-gradient-to-r from-transparent to-gold" />
              <span className="section-label">Avis vérifiés</span>
              <span className="w-10 h-px bg-gradient-to-r from-gold to-transparent" />
            </div>
            <h2 className="section-title text-3xl md:text-[3.25rem] mb-3 text-balance">
              4.9 <span className="text-gradient-gold">&#9733;</span> sur 5
            </h2>
            <p className="text-text-muted text-[15px]">
              Elles ont confié leur peau à Ginger
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="testimonial-card p-7 flex flex-col"
              >
                <div className="flex gap-0.5 mb-2">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={13} className="fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-[10px] text-gold-dark font-semibold tracking-[0.15em] uppercase mb-4">
                  {t.service}
                </p>
                <p className="text-text-muted text-sm leading-relaxed mb-5 italic flex-1">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-border-light/60">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cream to-champagne flex items-center justify-center border border-gold/20">
                    <span className="font-serif text-olive text-xs font-bold">{t.name[0]}</span>
                  </div>
                  <span className="text-olive font-semibold text-sm">{t.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          FORMATIONS CTA
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="relative bg-gradient-to-br from-cream via-champagne to-linen rounded-[28px] border border-gold/15 p-10 md:p-16 flex flex-col md:flex-row items-center gap-12 overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-gold/8 to-transparent rounded-bl-full" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-rose/6 to-transparent rounded-tr-full" />
            <div className="absolute inset-0 bg-diamond opacity-20" />

            <div className="flex-1 relative">
              <span className="section-label mb-4 block">Formations & Ateliers</span>
              <h2 className="section-title text-2xl md:text-4xl mb-5">
                Développez vos compétences beauté
              </h2>
              <p className="text-text-muted leading-relaxed mb-8">
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
            <div className="relative w-full md:w-80 h-64 img-placeholder rounded-2xl border border-gold/12 flex items-center justify-center shrink-0 overflow-hidden">
              <div className="text-center relative z-10">
                <div className="w-16 h-16 rounded-full bg-white/60 backdrop-blur-sm flex items-center justify-center mx-auto mb-3 border border-gold/20">
                  <Award size={28} className="text-gold/50" />
                </div>
                <p className="font-serif text-olive/50 text-sm">Formation & partage</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          CTA FINAL
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative py-28 md:py-36 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-anthracite to-brun-dark" />
        <div className="absolute inset-0 bg-diamond opacity-5" />
        <div className="absolute inset-0 bg-ambient opacity-10" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />

        {/* Decorative glows */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[300px] h-[300px] bg-gold/[0.03] rounded-full blur-[80px]" />
        <div className="absolute top-1/3 right-1/4 w-[200px] h-[200px] bg-rose/[0.03] rounded-full blur-[60px]" />

        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <div className="ornament-dots mb-10 [&>*]:text-gold/40 [&::before]:bg-gradient-to-r [&::before]:from-transparent [&::before]:to-gold/25 [&::after]:bg-gradient-to-r [&::after]:from-gold/25 [&::after]:to-transparent">
            <Sparkles size={16} className="text-gold/40" />
          </div>

          <h2 className="font-accent text-white text-4xl md:text-[3.5rem] font-light mb-7 leading-tight tracking-wide italic">
            Prête à révéler
            <br />
            votre éclat naturel&nbsp;?
          </h2>
          <p className="text-white/50 text-lg mb-12 leading-relaxed max-w-lg mx-auto">
            Réservez votre soin en quelques clics et offrez à votre peau
            l&apos;attention qu&apos;elle mérite.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
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
              className="inline-flex items-center gap-2.5 text-white/60 hover:text-white border border-white/15 hover:border-white/30 px-8 py-4 rounded-pill transition-all duration-400 text-sm font-medium tracking-wider"
            >
              +32 499 29 58 49
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

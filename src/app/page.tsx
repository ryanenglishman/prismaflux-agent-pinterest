import Link from "next/link";
import {
  Sparkles, Heart, Star, ArrowRight, Shield, Gem, Droplets,
  Hand, Eye, Leaf, Award, CheckCircle, Flower2, Sun, Clock,
} from "lucide-react";

/* ── SVG Components ────────────────────────────────────────────────── */

function FaceSilhouette({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 500" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M200 40 C120 40 60 110 60 200 C60 240 70 270 80 300 C90 330 100 350 120 380 C140 410 160 430 200 460 C240 430 260 410 280 380 C300 350 310 330 320 300 C330 270 340 240 340 200 C340 110 280 40 200 40Z"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
        className="animate-trace" fill="none" opacity=".3"
      />
      <ellipse cx="155" cy="195" rx="22" ry="12" stroke="currentColor" strokeWidth="1" opacity=".2" className="animate-trace" style={{ animationDelay: "1s" }} />
      <ellipse cx="245" cy="195" rx="22" ry="12" stroke="currentColor" strokeWidth="1" opacity=".2" className="animate-trace" style={{ animationDelay: "1.2s" }} />
      <path d="M185 270 Q200 285 215 270" stroke="currentColor" strokeWidth="1" opacity=".2" className="animate-trace" style={{ animationDelay: "1.5s" }} />
      <path d="M160 320 Q200 345 240 320" stroke="currentColor" strokeWidth="1" opacity=".15" className="animate-trace" style={{ animationDelay: "1.8s" }} />
    </svg>
  );
}

function FluidWave({ className = "", color = "rgba(196,169,125,.08)" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 1280 320" preserveAspectRatio="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path fill={color} className="animate-liquid">
        <animate
          attributeName="d"
          dur="8s"
          repeatCount="indefinite"
          values="
            M0,160 C320,220 480,100 640,160 C800,220 960,100 1280,160 L1280,320 L0,320 Z;
            M0,180 C320,120 480,220 640,140 C800,100 960,220 1280,180 L1280,320 L0,320 Z;
            M0,160 C320,220 480,100 640,160 C800,220 960,100 1280,160 L1280,320 L0,320 Z"
        />
      </path>
    </svg>
  );
}

function SerumDrops() {
  const drops = [
    { left: "15%", delay: "0s", size: 8, color: "gold" },
    { left: "30%", delay: "1.2s", size: 6, color: "rose" },
    { left: "50%", delay: "0.5s", size: 10, color: "gold" },
    { left: "65%", delay: "1.8s", size: 7, color: "peach" },
    { left: "80%", delay: "0.8s", size: 5, color: "rose" },
    { left: "40%", delay: "2.2s", size: 9, color: "gold" },
    { left: "70%", delay: "1.5s", size: 6, color: "peach" },
    { left: "25%", delay: "2.5s", size: 8, color: "rose" },
  ];
  return (
    <>
      {drops.map((d, i) => (
        <div
          key={i}
          className={`absolute rounded-full particle-${d.color} animate-serum-drop`}
          style={{
            left: d.left,
            top: "20%",
            width: d.size,
            height: d.size,
            animationDelay: d.delay,
            animationDuration: `${3 + i * 0.3}s`,
          }}
        />
      ))}
    </>
  );
}

function FloatingParticles() {
  const particles = [
    { left: "10%", top: "20%", size: 80, color: "gold", anim: "1", delay: "0s" },
    { left: "25%", top: "60%", size: 50, color: "rose", anim: "2", delay: "1s" },
    { left: "70%", top: "30%", size: 60, color: "peach", anim: "3", delay: "2s" },
    { left: "85%", top: "65%", size: 40, color: "gold", anim: "1", delay: "3s" },
    { left: "50%", top: "15%", size: 70, color: "cream", anim: "2", delay: "1.5s" },
    { left: "35%", top: "75%", size: 45, color: "rose", anim: "3", delay: "0.5s" },
    { left: "60%", top: "50%", size: 55, color: "peach", anim: "1", delay: "2.5s" },
    { left: "15%", top: "40%", size: 35, color: "gold", anim: "2", delay: "3.5s" },
    { left: "80%", top: "80%", size: 65, color: "cream", anim: "3", delay: "1.2s" },
    { left: "45%", top: "35%", size: 48, color: "rose", anim: "1", delay: "2.8s" },
  ];
  return (
    <>
      {particles.map((p, i) => (
        <div
          key={i}
          className={`particle particle-${p.color} particle-float-${p.anim}`}
          style={{
            left: p.left, top: p.top,
            width: p.size, height: p.size,
            animationDelay: p.delay,
            opacity: .15,
          }}
        />
      ))}
    </>
  );
}

/* ── Data ──────────────────────────────────────────────────────────── */

const heroStats = [
  { value: "4.9/5", label: "Avis clients", icon: Star },
  { value: "30+", label: "Soins proposés", icon: Sparkles },
  { value: "100%", label: "Recommandation", icon: Heart },
];

const expertises = [
  {
    icon: Droplets, title: "Hydradermabrasion", subtitle: "Technologie Signature",
    description: "Notre soin phare combine aspiration, exfoliation mécanique et infusion de sérums actifs concentrés pour désincruster les pores en profondeur, éliminer les cellules mortes de l'épiderme et hydrater intensément le derme. Teint lumineux, pores resserrés, peau visiblement rajeunie.",
    price: "dès 85 €", accent: "from-blue-100/40 to-cyan-50/40",
  },
  {
    icon: Eye, title: "Beauté du Regard", subtitle: "Lashlift & Browlift",
    description: "Rehaussement de cils classique ou Korean Lashlift — technique coréenne qui courbe le cil dès la racine. Restructuration et teinture hybride des sourcils pour un browlift naturel. Un regard ouvert et sublimé pendant 6 à 8 semaines.",
    price: "dès 50 €", accent: "from-purple-50/40 to-pink-50/40",
  },
  {
    icon: Sparkles, title: "Soins Visage Experts", subtitle: "Rituels sur mesure",
    description: "Diagnostic cutané, nettoyage profond, exfoliation enzymatique, extraction douce des comédons, masques ciblés et sérums concentrés. Du soin express au lifting japonais Kobido qui stimule le collagène et redessine l'ovale du visage.",
    price: "dès 35 €", accent: "from-amber-50/40 to-yellow-50/40",
  },
  {
    icon: Hand, title: "Massages & Bien-être", subtitle: "Corps & esprit",
    description: "Massage relaxant du corps complet, drainage des jambes lourdes, massage crânien apaisant ou énergétique revitalisant. Un voyage sensoriel qui libère les tensions musculaires et procure une détente profonde.",
    price: "dès 50 €", accent: "from-emerald-50/40 to-teal-50/40",
  },
  {
    icon: Gem, title: "Maquillage Professionnel", subtitle: "Événements & mariages",
    description: "Analyse de votre morphologie et carnation, sélection des textures adaptées à votre personnalité. Maquillage mariée waterproof longue tenue, essai complet — un résultat photographique et lumineux.",
    price: "dès 50 €", accent: "from-rose-50/40 to-pink-50/40",
  },
  {
    icon: Award, title: "Formations & Ateliers", subtitle: "Transmettez & apprenez",
    description: "Cours d'auto-maquillage en petit comité, formation certifiante Korean Lashlift avec kit professionnel et attestation, atelier soin visage. Développez vos compétences esthétiques dans un cadre bienveillant.",
    price: "dès 120 €", accent: "from-orange-50/40 to-amber-50/40",
  },
];

const ritualSteps = [
  { step: "01", title: "Accueil & Diagnostic", description: "Analyse approfondie de votre type de peau — sèche, grasse, mixte, sensible ou mature. Évaluation de l'hydratation, de l'élasticité et des préoccupations cutanées pour définir le protocole idéal.", icon: Flower2 },
  { step: "02", title: "Rituel de Soin", description: "Cabine confidentielle, lumière tamisée, musique apaisante. Nettoyage en profondeur, exfoliation enzymatique, extraction, infusion de sérums actifs, masques ciblés et massage facial — régénération cellulaire intense.", icon: Sparkles },
  { step: "03", title: "Résultat & Conseils", description: "Teint lumineux, peau nourrie et revitalisée. Conseils personnalisés : routine skincare adaptée, choix de cosmétiques professionnels, fréquence de soin recommandée pour prolonger les bienfaits.", icon: Sun },
];

const ingredients = [
  { name: "Acide hyaluronique", benefit: "Hydratation profonde", color: "gold" },
  { name: "Vitamine C", benefit: "Éclat & anti-taches", color: "peach" },
  { name: "Collagène marin", benefit: "Fermeté & élasticité", color: "rose" },
  { name: "Rétinol doux", benefit: "Anti-âge & renouvellement", color: "gold" },
  { name: "Niacinamide", benefit: "Pores & texture", color: "peach" },
  { name: "Peptides", benefit: "Régénération cellulaire", color: "rose" },
];

const whyUs = [
  { icon: Heart, title: "Approche skin-first", text: "Un protocole personnalisé qui respecte l'équilibre naturel de votre peau, sa barrière hydrolipidique et sa capacité de régénération cellulaire." },
  { icon: Leaf, title: "Cosmétiques haut de gamme", text: "Sérums concentrés en actifs bio-compatibles, masques ciblés, formulations innovantes — aucun compromis entre résultat et douceur." },
  { icon: Shield, title: "Expertise & innovation", text: "Korean Lashlift, lifting Kobido, hydradermabrasion avancée, luminothérapie LED, drainage lymphatique. L'excellence au service de votre beauté." },
  { icon: Clock, title: "Un cocon hors du temps", text: "Un espace intime et chaleureux où chaque visite devient un rituel de bien-être sensoriel. Prenez le temps de prendre soin de vous." },
];

const testimonials = [
  { name: "Sophie L.", service: "Hydra GINGER Signature", text: "Ma peau n'a jamais été aussi éclatante, hydratée et lumineuse. Des résultats visibles dès la première séance. Je recommande à 100% !", rating: 5 },
  { name: "Marie D.", service: "Korean Lashlift", text: "Mon regard est transformé — ouvert, intense et naturel. Jessica explique chaque étape avec pédagogie. Fini le mascara !", rating: 5 },
  { name: "Nathalie B.", service: "Lifting Kobido", text: "Mon visage est plus ferme, les traits lissés, l'ovale redessiné. Ce lifting japonais est une vraie révélation anti-âge.", rating: 5 },
  { name: "Céline M.", service: "Massage complet", text: "Un vrai cocon de douceur. Le massage a libéré toutes mes tensions. L'ambiance, les huiles, les mains expertes — parfait.", rating: 5 },
];

const skinConcerns = [
  "Peau terne & fatiguée", "Rides & ridules", "Pores dilatés", "Taches pigmentaires",
  "Peau déshydratée", "Teint irrégulier", "Peau sensible & réactive", "Relâchement cutané",
];

/* ── Page ──────────────────────────────────────────────────────────── */

export default function HomePage() {
  return (
    <>
      {/* ═══ HERO ════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden min-h-[95vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-b from-cream-light via-ivory to-bg" />
        <div className="absolute inset-0 bg-mesh" />

        {/* Animated orbs */}
        <div className="absolute top-16 right-[5%] w-[500px] h-[500px] gradient-orb bg-gradient-to-br from-gold/10 to-peach/10" />
        <div className="absolute bottom-10 left-[5%] w-[400px] h-[400px] gradient-orb bg-gradient-to-tr from-rose/8 to-gold/6" style={{ animationDelay: "5s", animationDuration: "18s" }} />
        <div className="absolute top-1/3 left-[40%] w-[300px] h-[300px] bg-peach/6 animate-morph blur-[40px]" />

        {/* Floating particles */}
        <FloatingParticles />

        {/* Ornamental circles */}
        <div className="absolute top-1/2 right-[8%] -translate-y-1/2 w-[420px] h-[420px] border border-gold/[.06] rounded-full hidden xl:block animate-spin-slow" />
        <div className="absolute top-1/2 right-[8%] -translate-y-1/2 w-[350px] h-[350px] border border-rose/[.05] rounded-full hidden xl:block" style={{ animation: "spinSlow 55s linear infinite reverse" }} />
        <div className="absolute top-1/2 right-[8%] -translate-y-1/2 w-[280px] h-[280px] border border-gold/[.04] rounded-full hidden xl:block" style={{ animation: "spinSlow 70s linear infinite" }} />

        {/* Face silhouette */}
        <div className="absolute top-1/2 right-[5%] -translate-y-1/2 w-[350px] h-[440px] hidden xl:block text-gold/15 animate-face-glow">
          <FaceSilhouette />
        </div>

        {/* Sparkles */}
        <div className="absolute top-[20%] right-[15%] hidden lg:block"><Sparkles size={14} className="text-gold/25 animate-twinkle" /></div>
        <div className="absolute top-[60%] right-[25%] hidden lg:block"><Star size={10} className="text-rose/25 animate-twinkle" style={{ animationDelay: "1.5s" }} /></div>
        <div className="absolute top-[35%] right-[30%] hidden lg:block"><Gem size={12} className="text-gold/20 animate-twinkle" style={{ animationDelay: ".8s" }} /></div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-24 md:py-32 w-full">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3.5 mb-8">
              <span className="w-12 h-px bg-gradient-to-r from-gold to-rose" />
              <span className="section-label">Institut de beauté &mdash; Seraing, Belgique</span>
            </div>
            <h1 className="section-title text-[2.75rem] md:text-[4rem] lg:text-[5rem] mb-7 leading-[1.05] text-balance">
              Votre peau mérite<br /><span className="text-shimmer">l&apos;excellence</span>
            </h1>
            <p className="text-text-muted text-lg md:text-xl leading-relaxed mb-12 max-w-xl">
              Un espace confidentiel dédié à la beauté intelligente et durable.
              Soins du visage personnalisés, hydradermabrasion avancée, massages
              relaxants, beauté du regard &mdash; chaque protocole est pensé pour
              révéler l&apos;éclat naturel de votre peau.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <a href="https://salonkee.be/salon/ginger?lang=fr" target="_blank" rel="noopener noreferrer" className="btn-gold pulse-glow">
                <span>Réserver un soin</span><ArrowRight size={18} />
              </a>
              <Link href="/services" className="btn-outline">
                <span>Découvrir nos soins</span><ArrowRight size={18} />
              </Link>
            </div>
            <div className="flex gap-10 md:gap-14">
              {heroStats.map((s) => (
                <div key={s.label} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cream to-champagne flex items-center justify-center border border-gold/20">
                    <s.icon size={16} className="text-gold-dark" />
                  </div>
                  <div>
                    <p className="font-serif text-olive text-xl md:text-2xl font-bold leading-none">{s.value}</p>
                    <p className="text-text-dim text-[11px] mt-0.5 tracking-wider">{s.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom wave transition */}
        <div className="absolute bottom-0 left-0 right-0 h-20">
          <FluidWave className="absolute inset-0 w-full h-full" color="rgba(245,233,220,.6)" />
          <FluidWave className="absolute inset-0 w-full h-full" color="rgba(196,169,125,.08)" />
        </div>
      </section>

      {/* ═══ PROMISE ═════════════════════════════════════════════════ */}
      <section className="relative py-20 md:py-28 bg-cream overflow-hidden">
        <div className="absolute inset-0 bg-diamond opacity-30" />
        {/* Glow rings */}
        <div className="absolute top-10 left-[10%] w-40 h-40 glow-ring opacity-20" />
        <div className="absolute bottom-10 right-[10%] w-28 h-28 glow-ring opacity-15" style={{ animationDelay: "2s" }} />

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <div className="ornament-dots mb-8"><Sparkles size={16} className="text-gold" /></div>
          <blockquote className="font-accent text-olive text-3xl md:text-[3.5rem] font-medium leading-snug mb-6 italic tracking-wide">
            &ldquo;We don&apos;t conceal. We reveal.&rdquo;
          </blockquote>
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-rose to-transparent mx-auto mb-6" />
          <p className="text-text-muted max-w-2xl mx-auto leading-relaxed text-[15px]">
            Chez The Ginger Secret, nous croyons en une beauté qui respecte l&apos;intégrité
            de votre épiderme, qui comprend les besoins de chaque type de peau et qui sublime
            sans masquer. Des cosmétiques professionnels haut de gamme, un savoir-faire passionné
            et une approche skin-first au cœur de chaque protocole esthétique.
          </p>
        </div>
      </section>

      {/* ═══ SERUM EXPERIENCE — Animated ingredient section ═══════════ */}
      <section className="relative py-24 md:py-32 bg-gradient-to-b from-cream via-bg to-ivory overflow-hidden">
        <div className="absolute inset-0 bg-mesh opacity-60" />

        {/* Animated serum drops */}
        <div className="absolute inset-0 pointer-events-none">
          <SerumDrops />
        </div>

        {/* Rising bubbles */}
        <div className="absolute inset-0 pointer-events-none">
          {[12, 28, 45, 62, 78, 35, 55, 88].map((l, i) => (
            <div
              key={i}
              className="absolute bottom-0 rounded-full border border-gold/10 bubble-rise"
              style={{ left: `${l}%`, width: 6 + i * 2, height: 6 + i * 2, ["--duration" as string]: `${5 + i * 1.2}s`, animationDelay: `${i * 0.8}s` }}
            />
          ))}
        </div>

        <div className="relative max-w-6xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="w-10 h-px bg-gradient-to-r from-transparent to-gold" />
              <span className="section-label">Actifs premium</span>
              <span className="w-10 h-px bg-gradient-to-r from-gold to-transparent" />
            </div>
            <h2 className="section-title text-3xl md:text-[3rem] mb-5 text-balance">
              La science au service<br className="hidden md:block" />
              <span className="text-shimmer-rose">de votre beauté</span>
            </h2>
            <p className="text-text-muted max-w-xl mx-auto leading-relaxed">
              Nos protocoles de soins utilisent des actifs concentrés de dernière génération,
              sélectionnés pour leur efficacité prouvée sur la régénération cellulaire,
              l&apos;hydratation profonde et la protection de l&apos;épiderme.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 lg:gap-6">
            {ingredients.map((ing, i) => (
              <div key={ing.name} className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-border-light/80 hover:border-gold/30 transition-all duration-500 hover:shadow-[0_16px_40px_-12px_rgba(196,169,125,.15)] hover:-translate-y-1">
                <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-${ing.color}/10 to-transparent rounded-bl-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br from-${ing.color}/20 to-${ing.color}/5 flex items-center justify-center mb-4 border border-${ing.color}/20`}>
                  <Droplets size={16} className="text-gold-dark/60" />
                </div>
                <h3 className="font-serif text-olive font-bold text-base mb-1">{ing.name}</h3>
                <p className="text-text-dim text-sm">{ing.benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ EXPERTISES ══════════════════════════════════════════════ */}
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
              Des soins d&apos;exception pour<br className="hidden md:block" />chaque besoin de votre peau
            </h2>
            <p className="text-text-muted max-w-2xl mx-auto leading-relaxed">
              De l&apos;hydradermabrasion avancée au massage japonais Kobido,
              du Korean Lashlift au maquillage professionnel mariée &mdash;
              une gamme complète de prestations esthétiques premium.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8">
            {expertises.map((e) => (
              <div key={e.title} className="group service-card p-8 relative">
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${e.accent} rounded-bl-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                <div className="relative">
                  <div className="icon-luxury mb-6"><e.icon size={24} className="text-gold-dark" /></div>
                  <p className="text-gold-dark text-[10px] font-semibold tracking-[.18em] uppercase mb-1.5">{e.subtitle}</p>
                  <h3 className="font-serif text-olive text-xl font-bold mb-3">{e.title}</h3>
                  <p className="text-text-muted text-sm leading-relaxed mb-6">{e.description}</p>
                  <div className="flex items-center justify-between pt-5 border-t border-border-light/60">
                    <span className="font-serif text-olive font-bold text-lg">{e.price}</span>
                    <a href="https://salonkee.be/salon/ginger?lang=fr" target="_blank" rel="noopener noreferrer" className="text-gold-dark text-[12px] font-semibold tracking-wider uppercase hover:text-olive transition-colors flex items-center gap-2 group/link">
                      Réserver <ArrowRight size={13} className="group-hover/link:translate-x-1 transition-transform duration-300" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-14">
            <Link href="/services" className="btn-outline"><span>Voir tous nos soins &amp; tarifs</span><ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      {/* ═══ FACE TREATMENT — Immersive visual section ════════════════ */}
      <section className="relative py-28 md:py-36 overflow-hidden bg-gradient-to-b from-charcoal to-anthracite">
        <div className="absolute inset-0 bg-diamond opacity-5" />
        <div className="absolute inset-0 bg-mesh opacity-10" />

        {/* Floating particles on dark */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className={`absolute rounded-full particle-float-${(i % 3) + 1}`}
              style={{
                left: `${5 + (i * 4.7) % 90}%`,
                top: `${5 + (i * 7.3) % 90}%`,
                width: 3 + (i % 4) * 2,
                height: 3 + (i % 4) * 2,
                background: `radial-gradient(circle, ${i % 2 === 0 ? 'rgba(196,169,125,.4)' : 'rgba(212,166,154,.35)'}, transparent 70%)`,
                animationDelay: `${i * 0.5}s`,
              }}
            />
          ))}
        </div>

        {/* Central face silhouette */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[600px] text-gold/10 animate-face-glow pointer-events-none hidden md:block">
          <FaceSilhouette />
        </div>

        {/* Glow rings around face */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] glow-ring opacity-10 hidden md:block" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] glow-ring opacity-[.06] hidden md:block" style={{ animationDelay: "1.5s", animationDuration: "6s" }} />

        <div className="relative max-w-5xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <div className="ornament-dots mb-8 [&::before]:bg-gradient-to-r [&::before]:from-transparent [&::before]:to-gold/25 [&::after]:bg-gradient-to-r [&::after]:from-gold/25 [&::after]:to-transparent">
              <Sparkles size={14} className="text-gold/40" />
            </div>
            <h2 className="font-accent text-white text-3xl md:text-[3.5rem] font-light tracking-wide italic leading-tight mb-6">
              L&apos;art du soin<br /><span className="text-shimmer">sur votre peau</span>
            </h2>
            <p className="text-white/40 max-w-lg mx-auto leading-relaxed mb-12">
              Chaque geste de Jessica est précis, délicat et chargé d&apos;intention.
              Comme une artiste, elle sculpte la lumière sur votre visage
              et réveille l&apos;éclat endormi de votre épiderme.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { label: "Nettoyage", desc: "Élimination des impuretés, excès de sébum et cellules mortes en douceur", icon: Droplets },
              { label: "Infusion", desc: "Pénétration d'actifs concentrés — acide hyaluronique, vitamine C, peptides", icon: Sparkles },
              { label: "Révélation", desc: "Votre peau retrouve luminosité, fermeté et un éclat naturel incomparable", icon: Sun },
            ].map((s) => (
              <div key={s.label} className="text-center group">
                <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-white/[.06] border border-gold/15 flex items-center justify-center group-hover:bg-gold/10 group-hover:border-gold/30 transition-all duration-500">
                  <s.icon size={24} className="text-gold/60 group-hover:text-gold transition-colors duration-400" />
                </div>
                <h3 className="font-serif text-white text-lg font-bold mb-2">{s.label}</h3>
                <p className="text-white/35 text-sm leading-relaxed max-w-[240px] mx-auto">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom wave transition */}
        <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden">
          <FluidWave className="absolute inset-0 w-full h-full" color="rgba(250,247,242,.95)" />
        </div>
      </section>

      {/* ═══ RITUAL ══════════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-ivory relative overflow-hidden">
        <div className="absolute inset-0 bg-silk opacity-30" />
        <div className="relative max-w-6xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-20">
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="w-10 h-px bg-gradient-to-r from-transparent to-gold" />
              <span className="section-label">L&apos;expérience Ginger</span>
              <span className="w-10 h-px bg-gradient-to-r from-gold to-transparent" />
            </div>
            <h2 className="section-title text-3xl md:text-[3.25rem] mb-5 text-balance">
              Votre rituel beauté,<br className="hidden md:block" /><span className="text-shimmer-rose">étape par étape</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {ritualSteps.map((r) => (
              <div key={r.step} className="text-center group">
                <div className="relative mx-auto mb-8">
                  <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-cream to-champagne border-2 border-gold/20 flex items-center justify-center group-hover:border-gold/40 transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(196,169,125,.15)]">
                    <r.icon size={32} className="text-gold-dark/70 group-hover:text-gold-dark transition-colors duration-400" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-gold to-gold-dark text-white text-xs font-bold flex items-center justify-center shadow-lg">{r.step}</span>
                </div>
                <h3 className="font-serif text-olive text-xl font-bold mb-3">{r.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed max-w-xs mx-auto">{r.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SKIN CONCERNS ═══════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-linen-texture relative overflow-hidden">
        <div className="bg-ambient absolute inset-0" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24 items-center">
            <div className="img-placeholder rounded-[28px] aspect-[4/5] flex items-end p-8 border border-gold/12 relative">
              <div className="absolute top-8 right-8 w-20 h-20 border border-gold/15 rounded-full flex items-center justify-center">
                <Sparkles size={20} className="text-gold/30 animate-twinkle" />
              </div>
              <div className="relative bg-white/92 backdrop-blur-md rounded-2xl p-7 w-full border border-gold/15 shadow-lg">
                <p className="font-serif text-olive font-bold text-lg mb-1.5">Diagnostic personnalisé</p>
                <p className="text-text-muted text-sm leading-relaxed">
                  Chaque rituel débute par une analyse approfondie de votre épiderme
                  et de vos préoccupations cutanées spécifiques.
                </p>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-3.5 mb-5">
                <span className="w-10 h-px bg-gradient-to-r from-gold to-rose" />
                <span className="section-label">Pour chaque préoccupation</span>
              </div>
              <h2 className="section-title text-3xl md:text-[2.75rem] mb-6 leading-tight">
                Votre peau a des besoins uniques.<br /><span className="text-gradient-gold">Nous les comprenons.</span>
              </h2>
              <p className="text-text-muted leading-relaxed mb-10">
                Que vous cherchiez à stimuler la production de collagène, retrouver
                un teint lumineux, atténuer les taches pigmentaires ou apaiser une peau
                sensible &mdash; nos protocoles sont conçus pour chaque préoccupation.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-10">
                {skinConcerns.map((c) => (
                  <div key={c} className="flex items-center gap-3 bg-white/85 backdrop-blur-sm rounded-xl px-4 py-3.5 border border-border-light/80 text-sm text-olive hover:border-gold/30 hover:bg-white transition-all duration-300">
                    <CheckCircle size={15} className="text-gold shrink-0" />{c}
                  </div>
                ))}
              </div>
              <a href="https://salonkee.be/salon/ginger?lang=fr" target="_blank" rel="noopener noreferrer" className="btn-primary">
                <span>Réserver votre diagnostic</span><ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ WHY US ══════════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 relative">
        <div className="absolute inset-0 bg-ambient opacity-30" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-20">
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="w-10 h-px bg-gradient-to-r from-transparent to-gold" />
              <span className="section-label">Notre philosophie</span>
              <span className="w-10 h-px bg-gradient-to-r from-gold to-transparent" />
            </div>
            <h2 className="section-title text-3xl md:text-[3.25rem] mb-4 text-balance">Pourquoi choisir Ginger&nbsp;?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {whyUs.map((w) => (
              <div key={w.title} className="group flex gap-6 p-8 rounded-2xl bg-white border border-border-light/80 service-card">
                <div className="icon-luxury shrink-0"><w.icon size={24} className="text-gold-dark" /></div>
                <div>
                  <h3 className="font-serif text-olive font-bold text-lg mb-2.5">{w.title}</h3>
                  <p className="text-text-muted text-sm leading-relaxed">{w.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ════════════════════════════════════════════ */}
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
            <h2 className="section-title text-3xl md:text-[3.25rem] mb-3">
              4.9 <span className="text-gradient-gold">&#9733;</span> sur 5
            </h2>
            <p className="text-text-muted text-[15px]">Elles ont confié leur peau à Ginger</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="testimonial-card p-7 flex flex-col">
                <div className="flex gap-0.5 mb-2">
                  {Array.from({ length: t.rating }).map((_, i) => (<Star key={i} size={13} className="fill-gold text-gold" />))}
                </div>
                <p className="text-[10px] text-gold-dark font-semibold tracking-[.15em] uppercase mb-4">{t.service}</p>
                <p className="text-text-muted text-sm leading-relaxed mb-5 italic flex-1">&ldquo;{t.text}&rdquo;</p>
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

      {/* ═══ FORMATIONS CTA ══════════════════════════════════════════ */}
      <section className="py-24 md:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="relative bg-gradient-to-br from-cream via-champagne to-linen rounded-[28px] border border-gold/15 p-10 md:p-16 flex flex-col md:flex-row items-center gap-12 overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-gold/8 to-transparent rounded-bl-full" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-rose/6 to-transparent rounded-tr-full" />
            <div className="absolute inset-0 bg-diamond opacity-20" />
            <div className="flex-1 relative">
              <span className="section-label mb-4 block">Formations & Ateliers</span>
              <h2 className="section-title text-2xl md:text-4xl mb-5">Développez vos compétences beauté</h2>
              <p className="text-text-muted leading-relaxed mb-8">
                Cours d&apos;auto-maquillage, formation certifiante Korean Lashlift,
                atelier soin visage &mdash; apprenez les gestes experts dans un cadre bienveillant.
              </p>
              <Link href="/formations" className="btn-primary"><span>Découvrir les formations</span><ArrowRight size={16} /></Link>
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

      {/* ═══ CTA FINAL ═══════════════════════════════════════════════ */}
      <section className="relative py-28 md:py-36 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-anthracite to-brun-dark" />
        <div className="absolute inset-0 bg-diamond opacity-5" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[300px] h-[300px] bg-gold/[.03] rounded-full blur-[80px]" />
        <div className="absolute top-1/3 right-1/4 w-[200px] h-[200px] bg-rose/[.03] rounded-full blur-[60px]" />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <div className="ornament-dots mb-10 [&>*]:text-gold/40 [&::before]:bg-gradient-to-r [&::before]:from-transparent [&::before]:to-gold/25 [&::after]:bg-gradient-to-r [&::after]:from-gold/25 [&::after]:to-transparent">
            <Sparkles size={16} className="text-gold/40" />
          </div>
          <h2 className="font-accent text-white text-4xl md:text-[3.5rem] font-light mb-7 leading-tight tracking-wide italic">
            Prête à révéler<br />votre éclat naturel&nbsp;?
          </h2>
          <p className="text-white/50 text-lg mb-12 leading-relaxed max-w-lg mx-auto">
            Réservez votre soin et offrez à votre peau l&apos;attention qu&apos;elle mérite.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <a href="https://salonkee.be/salon/ginger?lang=fr" target="_blank" rel="noopener noreferrer" className="btn-gold pulse-glow">
              <span>Réserver maintenant</span><ArrowRight size={16} />
            </a>
            <a href="tel:+32499295849" className="inline-flex items-center gap-2.5 text-white/60 hover:text-white border border-white/15 hover:border-white/30 px-8 py-4 rounded-pill transition-all duration-400 text-sm font-medium tracking-wider">
              +32 499 29 58 49
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

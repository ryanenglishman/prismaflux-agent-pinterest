import type { Metadata } from "next";
import Link from "next/link";
import {
  Eye,
  Droplets,
  Sparkles,
  Hand,
  Scissors,
  Sun,
  Palette,
  Baby,
  ArrowRight,
  Clock,
  CheckCircle,
  Star,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Nos Soins & Tarifs — Hydradermabrasion, Visage, Massages, Beauté du Regard",
  description:
    "Tous les soins et tarifs de The Ginger Secret : hydradermabrasion, soins visage personnalisés, lashlift, Korean lashlift, browlift, massages relaxants et drainants, maquillage mariée, épilation douce, bronzage naturel. Institut de beauté premium à Seraing.",
};

interface Service {
  name: string;
  price: string;
  duration: string;
  detail?: string;
}

interface ServiceCategory {
  title: string;
  icon: React.ElementType;
  description: string;
  longDescription: string;
  services: Service[];
  badge?: string;
}

const categories: ServiceCategory[] = [
  {
    title: "Hydradermabrasion",
    icon: Droplets,
    badge: "Soin signature",
    description: "Notre technologie phare pour une peau sublimée",
    longDescription:
      "L'hydradermabrasion est une technique de soin non invasive qui combine aspiration, exfoliation mécanique et infusion de sérums actifs pour nettoyer les pores en profondeur, éliminer les cellules mortes et hydrater intensément l'épiderme. Résultat : un teint éclatant, des pores resserrés et une peau visiblement rajeunie dès la première séance. Nos protocoles Hydra GINGER sont personnalisés selon votre type de peau — qu'elle soit sensible, grasse, mixte ou mature.",
    services: [
      { name: "Hydra GINGER Signature", price: "110 €", duration: "90 min", detail: "Protocole complet : nettoyage, exfoliation, extraction, infusion de sérums, masque LED et massage" },
      { name: "Hydra + Massage crânien", price: "85 €", duration: "75 min", detail: "Hydradermabrasion suivie d'un massage crânien relaxant pour une détente totale" },
      { name: "Hydra + Massage Japonais", price: "85 €", duration: "75 min", detail: "Hydradermabrasion combinée aux techniques ancestrales de massage facial japonais" },
    ],
  },
  {
    title: "Beauté du Regard",
    icon: Eye,
    description: "Cils sublimés et sourcils structurés",
    longDescription:
      "Le regard est le premier atout de séduction. Nos prestations de rehaussement de cils (lashlift classique et Korean lashlift) et de restructuration des sourcils (browlift) subliment votre regard de manière naturelle et durable. La technique du Korean lashlift, plus douce et innovante, courbe les cils dès la racine avec des produits respectueux de la fibre capillaire, pour un résultat qui dure 6 à 8 semaines. Complétez avec une teinture hybride pour un effet yeux maquillés sans effort.",
    services: [
      { name: "Lashlift classique", price: "50 €", duration: "45 min", detail: "Rehaussement de cils permanent, regard ouvert et intense" },
      { name: "Korean Lashlift", price: "60 €", duration: "60 min", detail: "Technique coréenne : courbure dès la racine, produits plus doux, 6-8 semaines" },
      { name: "Browlift", price: "50 €", duration: "45 min", detail: "Restructuration et mise en forme des sourcils pour un effet liftant naturel" },
      { name: "Teinture hybride", price: "5 €", duration: "15 min", detail: "Coloration semi-permanente des cils ou sourcils" },
      { name: "Restructuration sourcils", price: "15 €", duration: "15 min", detail: "Épilation précise et mise en forme pour un regard harmonieux" },
    ],
  },
  {
    title: "Soins Visage Experts",
    icon: Sparkles,
    description: "Rituels personnalisés pour chaque type de peau",
    longDescription:
      "Chaque peau est unique et mérite un soin adapté. Nos soins visage professionnels combinent diagnostic cutané, nettoyage en profondeur, exfoliation enzymatique ou mécanique, extraction douce, application de masques ciblés et massage facial. Du soin express pour les emplois du temps chargés au lifting japonais Kobido — une technique ancestrale de pétrissage et de tapotement qui stimule le collagène et redessine l'ovale du visage — trouvez le rituel qui convient à votre peau.",
    services: [
      { name: "Le Traditionnel", price: "50 €", duration: "60 min", detail: "Soin complet : nettoyage, gommage, extraction, masque, hydratation" },
      { name: "L'Express", price: "35 €", duration: "30 min", detail: "Nettoyage ciblé et coup d'éclat pour les emplois du temps serrés" },
      { name: "Luminothérapie LED", price: "25 €", duration: "30 min", detail: "Stimulation cellulaire par la lumière pour accélérer la régénération cutanée" },
      { name: "Lifting Japonais Kobido", price: "50 €", duration: "45 min", detail: "Massage ancestral anti-âge : stimule le collagène, redessine l'ovale" },
    ],
  },
  {
    title: "Massages & Bien-être",
    icon: Hand,
    description: "Détente profonde du corps et de l'esprit",
    longDescription:
      "Nos massages bien-être sont des parenthèses de détente et de régénération. Du massage relaxant du corps complet au drainage des jambes lourdes, en passant par le massage crânien apaisant et le massage énergétique revitalisant — chaque séance est un voyage sensoriel. Offrez-vous aussi le luxe d'un massage en duo, un moment de complicité et de sérénité partagé dans notre cabine double.",
    services: [
      { name: "Massage complet du corps", price: "85 €", duration: "60 min", detail: "Relaxation totale : nuque, dos, jambes, bras et pieds" },
      { name: "Massage du dos", price: "50 €", duration: "45 min", detail: "Soulagement des tensions musculaires et du stress accumulé" },
      { name: "Massage des jambes", price: "50 €", duration: "45 min", detail: "Drainage et légèreté pour les jambes fatiguées" },
      { name: "Massage crânien", price: "50 €", duration: "45 min", detail: "Profonde relaxation, soulage migraines et tensions" },
      { name: "Massage énergétique", price: "65 €", duration: "60 min", detail: "Rééquilibrage des flux d'énergie pour un bien-être global" },
      { name: "Massage en Duo", price: "150 €", duration: "60 min", detail: "Moment de complicité et de détente partagée" },
    ],
  },
  {
    title: "Maquillage Professionnel",
    icon: Palette,
    description: "Sublimez votre beauté pour chaque occasion",
    longDescription:
      "Notre expertise en maquillage professionnel sublime votre beauté naturelle tout en respectant votre personnalité. Que ce soit pour votre mariage, un gala ou une soirée événementielle, Jessica sélectionne les textures et couleurs qui mettent en valeur votre teint, vos yeux et la structure de votre visage. L'essai maquillage permet de tester et ajuster le résultat avant le grand jour.",
    services: [
      { name: "Maquillage fêtes & événements", price: "50 €", duration: "60 min", detail: "Look lumineux et longue tenue pour vos soirées" },
      { name: "Maquillage mariée", price: "85 €", duration: "60 min", detail: "Résultat photographique, produits waterproof et longue tenue" },
      { name: "Essai maquillage complet", price: "55 €", duration: "120 min", detail: "Test et ajustement du maquillage avant l'événement" },
    ],
  },
  {
    title: "Épilation Douce",
    icon: Scissors,
    description: "Précision et douceur pour une peau parfaitement lisse",
    longDescription:
      "Notre technique d'épilation à la cire tiède assure une extraction propre et précise du poil, avec un minimum d'inconfort. Nous utilisons des cires de qualité professionnelle adaptées aux zones sensibles du visage comme aux grandes surfaces du corps. Résultat : une peau douce et lisse, durablement.",
    services: [
      { name: "Visage (lèvre, menton, joues)", price: "dès 10 €", duration: "15 min" },
      { name: "Aisselles", price: "20 €", duration: "15 min" },
      { name: "Bras complets", price: "22 €", duration: "20 min" },
      { name: "Jambes", price: "dès 28 €", duration: "30 min" },
      { name: "Dos", price: "30 €", duration: "30 min" },
    ],
  },
  {
    title: "Bronzage Naturel",
    icon: Sun,
    description: "Un hâle doré, lumineux et sans UV",
    longDescription:
      "Obtenez un teint hâlé et naturel sans exposition aux rayons ultraviolets. Notre technique de bronzage par spray permet un résultat uniforme, personnalisé en intensité et parfaitement adapté à votre carnation. Le bronzage se développe en quelques heures et dure jusqu'à une semaine.",
    services: [
      { name: "Corps complet", price: "25 €", duration: "30 min" },
      { name: "Demi corps", price: "18 €", duration: "20 min" },
      { name: "Visage et cou", price: "10 €", duration: "15 min" },
    ],
  },
  {
    title: "Baby Therapy",
    icon: Baby,
    description: "Un moment de douceur maman & bébé",
    longDescription:
      "Un soin unique pensé pour les jeunes mamans et leur bébé. Ce rituel de bien-être combine un moment de relaxation pour maman avec une initiation tout en douceur au toucher thérapeutique pour bébé. Un instant de complicité et de sérénité pour renforcer le lien mère-enfant tout en prenant soin de soi.",
    services: [
      { name: "Soin Maman & bébé", price: "95 €", duration: "60 min", detail: "Massage maman + éveil sensoriel bébé dans un cadre apaisant" },
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cream-light via-ivory to-bg" />
        <div className="absolute inset-0 bg-ambient" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-[80px]" />
        <div className="absolute top-20 left-20 w-64 h-64 bg-rose/4 rounded-full blur-[60px]" />

        <div className="relative max-w-5xl mx-auto px-6 lg:px-10 py-24 md:py-32 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-10 h-px bg-gradient-to-r from-transparent to-gold" />
            <span className="section-label">Nos prestations esthétiques</span>
            <span className="w-10 h-px bg-gradient-to-r from-gold to-transparent" />
          </div>
          <h1 className="section-title text-4xl md:text-[4rem] mb-7">
            Soins &<br />
            <span className="text-shimmer">Tarifs</span>
          </h1>
          <p className="text-text-muted text-lg max-w-2xl mx-auto leading-relaxed">
            Des soins experts et personnalisés pour chaque type de peau.
            Hydradermabrasion avancée, beauté du regard, massages relaxants,
            rituels anti-âge et maquillage professionnel &mdash; découvrez
            l&apos;ensemble de notre carte de soins.
          </p>
        </div>
      </section>

      {/* ── Quick Nav ──────────────────────────────────────────────────── */}
      <section className="bg-cream-light/80 backdrop-blur-sm py-5 border-y border-gold/10 sticky top-20 md:top-[88px] z-40">
        <div className="max-w-6xl mx-auto px-6 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2.5 min-w-max">
            {categories.map((cat) => (
              <a
                key={cat.title}
                href={`#${cat.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                className="flex items-center gap-2 bg-white/90 text-olive text-[11px] font-medium tracking-wider uppercase px-5 py-2.5 rounded-pill border border-border-light/80 hover:border-gold/40 hover:bg-cream hover:shadow-sm transition-all duration-300 whitespace-nowrap"
              >
                <cat.icon size={13} className="text-gold-dark" />
                {cat.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Service Categories ─────────────────────────────────────────── */}
      <section className="py-20 md:py-28 relative">
        <div className="absolute inset-0 bg-ambient opacity-30" />
        <div className="relative max-w-5xl mx-auto px-6 lg:px-10 space-y-24">
          {categories.map((cat) => (
            <div
              key={cat.title}
              id={cat.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
              className="scroll-mt-44"
            >
              {/* Category header */}
              <div className="flex flex-col md:flex-row md:items-start gap-5 mb-8">
                <div className="icon-luxury shrink-0">
                  <cat.icon size={24} className="text-gold-dark" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1.5">
                    <h2 className="font-serif text-olive text-2xl md:text-3xl font-bold">
                      {cat.title}
                    </h2>
                    {cat.badge && (
                      <span className="text-[9px] font-semibold tracking-[0.15em] uppercase bg-gradient-to-r from-gold/15 to-rose/10 text-gold-dark px-3.5 py-1 rounded-pill border border-gold/15">
                        {cat.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-text-muted text-sm leading-relaxed max-w-2xl">
                    {cat.longDescription}
                  </p>
                </div>
              </div>

              {/* Services list */}
              <div className="bg-white rounded-2xl border border-border-light/80 overflow-hidden shadow-[0_4px_24px_-8px_rgba(74,74,58,0.05)]">
                {cat.services.map((s, i) => (
                  <div
                    key={s.name}
                    className={`group px-7 md:px-9 py-6 ${
                      i < cat.services.length - 1
                        ? "border-b border-border-light/50"
                        : ""
                    } hover:bg-gradient-to-r hover:from-cream-light/40 hover:to-transparent transition-all duration-400`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <p className="text-olive font-semibold group-hover:text-gold-dark transition-colors duration-300">
                          {s.name}
                        </p>
                        <div className="flex items-center gap-3 mt-1.5">
                          <span className="flex items-center gap-1.5 text-text-dim text-xs">
                            <Clock size={11} className="text-gold" />
                            {s.duration}
                          </span>
                          {s.detail && (
                            <span className="text-text-light text-xs hidden md:block">
                              &mdash; {s.detail}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-5 shrink-0">
                        <span className="font-serif text-olive font-bold text-lg whitespace-nowrap">
                          {s.price}
                        </span>
                        <a
                          href="https://salonkee.be/salon/ginger?lang=fr"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hidden sm:inline-flex items-center gap-1.5 text-gold-dark text-[11px] font-semibold tracking-wider uppercase hover:text-olive transition-colors duration-300"
                        >
                          Réserver
                          <ArrowRight size={11} />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Formations teaser ──────────────────────────────────────────── */}
      <section className="py-20 bg-cream-light relative overflow-hidden">
        <div className="absolute inset-0 bg-silk opacity-20" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        <div className="relative max-w-5xl mx-auto px-6 lg:px-10 text-center">
          <h2 className="section-title text-2xl md:text-4xl mb-5">
            Vous êtes professionnelle de la beauté&nbsp;?
          </h2>
          <p className="text-text-muted max-w-xl mx-auto mb-10 leading-relaxed">
            Découvrez nos formations certifiantes en Korean Lashlift, soin visage
            et nos ateliers collaboratifs d&apos;auto-maquillage.
          </p>
          <Link href="/formations" className="btn-primary">
            <span>Voir nos formations</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────── */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-anthracite to-brun-dark" />
        <div className="absolute inset-0 bg-diamond opacity-5" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-accent text-white text-3xl md:text-[2.75rem] font-light mb-5 tracking-wide italic">
            Un soin vous intéresse&nbsp;?
          </h2>
          <p className="text-white/50 mb-10 leading-relaxed">
            Réservation en ligne 24h/24, confirmation immédiate.
            Votre moment de beauté vous attend.
          </p>
          <a
            href="https://salonkee.be/salon/ginger?lang=fr"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold pulse-glow"
          >
            <span>Réserver en ligne</span>
            <ArrowRight size={16} />
          </a>
        </div>
      </section>
    </>
  );
}

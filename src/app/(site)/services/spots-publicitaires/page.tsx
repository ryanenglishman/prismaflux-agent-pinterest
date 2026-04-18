import type { Metadata } from "next";
import {
  Video,
  Film,
  Clapperboard,
  MonitorPlay,
  Megaphone,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Play,
  Palette,
  Scissors,
  Share2,
  Eye,
  Zap,
  TrendingUp,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { ServiceIllustration } from "@/components/ui/ServiceIllustration";
import { LeadMagnet } from "@/components/sections/LeadMagnet";
import { FAQSection } from "@/components/ui/FAQSection";
import { SERVICE_FAQS } from "@/lib/constants/faqs";

export const metadata: Metadata = {
  title: "Spots Publicitaires Video & Video Marketing a Liege — Production Professionnelle",
  description:
    "Production de spots publicitaires video et video marketing a Liege, province de Liege. Spots reseaux sociaux, videos corporate, teasers produit, publicites YouTube et TikTok. Captation HD/4K, motion design, post-production professionnelle. Agence de production audiovisuelle a Liege. Devis gratuit sous 24h.",
  keywords: [
    "spot publicitaire liege",
    "production video liege",
    "video marketing liege",
    "spot publicitaire province de liege",
    "video corporate liege",
    "publicite video belgique",
    "production audiovisuelle liege",
    "spot reseaux sociaux liege",
    "motion design liege",
    "agence video publicitaire province de liege",
  ],
  alternates: {
    canonical: "/services/spots-publicitaires",
  },
};

const VIDEO_TYPES = [
  {
    icon: MonitorPlay,
    title: "Spots reseaux sociaux (Meta, TikTok, YouTube)",
    description:
      "Des videos courtes, percutantes et natives concues pour arreter le scroll sur Facebook, Instagram, TikTok et YouTube. Format vertical 9:16 pour les Stories et Reels, carre 1:1 pour les feeds, paysage 16:9 pour YouTube et le Display. Chaque spot est optimise pour les 3 premieres secondes — le moment critique ou l'attention se gagne ou se perd. Sous-titrage integre, hook visuel immediat et call-to-action final pour maximiser le taux de clic et le ROAS de vos campagnes publicitaires.",
  },
  {
    icon: Film,
    title: "Videos corporate & storytelling de marque",
    description:
      "Presentez votre entreprise, vos valeurs et votre equipe avec une video institutionnelle de qualite cinema. Nous concevons des recits visuels qui humanisent votre marque et creent une connexion emotionnelle avec vos prospects. Interview du fondateur, coulisses de production, temoignages clients, visite des locaux — chaque format est pense pour renforcer la confiance et l'autorite de votre entreprise en province de Liege et au-dela.",
  },
  {
    icon: Clapperboard,
    title: "Teasers produit & demonstrations",
    description:
      "Mettez en valeur vos produits et services avec des teasers dynamiques qui captent l'attention en quelques secondes. Prises de vue macro, animations 3D, motion graphics et montage rythme pour sublimer chaque detail. Ideal pour les lancements de produit, les campagnes saisonnieres et les fiches produit e-commerce. Un teaser produit bien concu peut multiplier par 2 le taux de conversion de votre page de vente.",
  },
  {
    icon: Megaphone,
    title: "Spots TV, pre-roll & display video",
    description:
      "Des spots publicitaires haute qualite conformes aux cahiers des charges des diffuseurs televisuels et des regies publicitaires digitales. Format 15, 30 ou 60 secondes, conformite RTBF et RTL-TVI pour la diffusion en Belgique. Campagnes YouTube pre-roll (skippable et non-skippable), display video et programmatique pour une couverture massive aupres de votre cible en province de Liege et au niveau national.",
  },
];

const PROCESS = [
  {
    step: 1,
    title: "Brief creatif & strategie de diffusion",
    description:
      "Reunion de cadrage approfondie pour definir le message cle, la cible, le ton, le style visuel et la strategie de diffusion de votre spot. Nous analysons votre marche, vos concurrents et les codes de votre secteur en province de Liege pour creer un brief creatif qui oriente chaque decision de production vers un objectif de performance mesurable.",
  },
  {
    step: 2,
    title: "Scripting, storyboard & pre-production",
    description:
      "Notre equipe creative redige le scenario, conçoit le storyboard illustre et prepare la pre-production complete : casting, reperage des lieux de tournage en province de Liege, planning technique, liste de materiel. Chaque plan est pense pour servir le message et maximiser l'impact emotionnel. Validation a chaque etape avant le moindre tournage.",
  },
  {
    step: 3,
    title: "Tournage professionnel HD/4K",
    description:
      "Production avec equipement professionnel : cameras 4K Cinema, eclairage studio et exterieurs, prise de son directe, drone pour les prises de vue aeriennes. Equipe technique dediee (realisateur, cameraman, eclairagiste, ingenieur son). Tournage en studio ou en decor reel selon le projet — de nos locaux a Liege aux sites les plus emblematiques de la province.",
  },
  {
    step: 4,
    title: "Post-production, declinaisons & livraison",
    description:
      "Montage professionnel, etalonnage colorimetrique, sound design, voix off, motion graphics et effets visuels. Chaque spot est decline dans tous les formats necessaires (16:9, 1:1, 9:16, 4:5) et optimise pour chaque plateforme de diffusion. Sous-titrage en francais, neerlandais et anglais disponible. Livraison des fichiers masters et des versions compressees pour le web.",
  },
];

const WHY_VIDEO = [
  { icon: Eye, text: "Les publications video generent 1200% plus de partages que le texte et les images combines sur les reseaux sociaux" },
  { icon: TrendingUp, text: "86% des entreprises utilisent la video comme outil marketing et 92% considerent que c'est un element essentiel de leur strategie" },
  { icon: Zap, text: "Les landing pages avec video augmentent les conversions de 80% en moyenne par rapport aux pages sans contenu video" },
  { icon: Play, text: "Les utilisateurs retiennent 95% d'un message en video contre 10% en format texte — un ecart decisif pour votre notoriete de marque" },
];

export default function SpotsPublicitairesPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-20 pb-16 md:pt-28 md:pb-20 relative overflow-hidden">
        <div className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full bg-brand/5 blur-[100px]" />
        <div className="relative max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="flex-1">
              <span className="reveal inline-flex items-center gap-2 px-4 py-1.5 text-sm font-medium text-brand bg-brand-dim rounded-full mb-4">
                <Video size={14} />
                Production Video & Spots Publicitaires — Liege
              </span>
              <h1 className="reveal reveal-delay-1 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Spots publicitaires &{" "}
                <span className="gradient-text">video marketing</span> qui
                marquent les esprits
              </h1>
              <p className="reveal reveal-delay-2 mt-6 text-lg text-text-secondary max-w-xl leading-relaxed">
                Notre agence de production video a Liege cree des spots
                publicitaires professionnels pour le web, les reseaux sociaux
                et la television. Du brief creatif au montage final et a la
                diffusion multi-plateforme, chaque spot est concu pour captiver
                votre audience et generer des resultats mesurables en province
                de Liege et au-dela.
              </p>
              <div className="reveal reveal-delay-3 mt-8 flex flex-col sm:flex-row gap-4">
                <Button href="/contact" size="lg" className="pulse-glow">
                  Demander un devis video
                  <ArrowRight size={18} className="ml-2" />
                </Button>
                <Button href="/realisations" variant="secondary" size="lg">
                  Voir nos productions
                </Button>
              </div>
            </div>
            <div className="flex-1 w-full reveal reveal-delay-2">
              <ServiceIllustration serviceId="spots-publicitaires" className="glass-card" />
            </div>
          </div>
        </div>
      </section>

      {/* Intro texte dense — pourquoi la video */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <div className="reveal space-y-4 text-text-secondary leading-relaxed">
            <p>
              La video est devenue le format dominant du marketing digital. Sur
              les reseaux sociaux, dans les resultats de recherche Google, dans
              les emails et sur les sites web — le contenu video capte
              l&apos;attention, genere de l&apos;engagement et convertit mieux
              que tout autre format. En province de Liege, les entreprises qui
              investissent dans la video marketing prennent une longueur d&apos;avance
              decisive sur leurs concurrents qui se limitent encore au texte
              et aux images statiques.
            </p>
            <p>
              Chez PrismaFlux, la production video n&apos;est pas une fin en
              soi — c&apos;est un levier strategique au service de vos
              objectifs business. Chaque spot que nous produisons est concu
              avec une strategie de diffusion integree : quel message pour
              quelle audience, sur quelle plateforme, a quel moment du funnel
              d&apos;acquisition. Un spot publicitaire sans strategie de
              distribution, c&apos;est comme un moteur de course sans
              route — puissant mais inutile.
            </p>
            <p>
              Que vous lanciez un nouveau produit a Liege, que vous souhaitiez
              renforcer votre image de marque en province de Liege ou que vous
              cherchiez a booster les performances de vos campagnes
              publicitaires, notre equipe de production audiovisuelle cree des
              spots qui captent, convainquent et convertissent.
            </p>
          </div>
        </div>
      </section>

      {/* Champ lexical production video */}
      <section className="py-16 md:py-20 bg-bg-surface/30">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <div className="reveal space-y-4 text-text-secondary leading-relaxed">
            <h2 className="text-2xl font-bold text-text">
              La production audiovisuelle de A a Z : vocabulaire et processus
            </h2>
            <p>
              Un spot publicitaire professionnel mobilise de nombreuses competences en amont du tournage.
              Le <strong className="text-text">brief creatif</strong> definit le message, la cible, le ton et
              le <strong className="text-text">territoire de marque</strong>. Le{" "}
              <strong className="text-text">script</strong> structure le recit en actes, avec hook d&apos;ouverture,
              developpement et <strong className="text-text">call-to-action</strong> final. Le{" "}
              <strong className="text-text">storyboard</strong> (ou{" "}
              <strong className="text-text">animatique</strong> pour les productions avec motion design) visualise
              chaque plan avant le moindre tournage. Cette phase de{" "}
              <strong className="text-text">pre-production</strong> — souvent negligee par les agences moins rigoureuses —
              est ce qui garantit qu&apos;un spot atteint ses objectifs de communication en province de Liege.
            </p>
            <p>
              En <strong className="text-text">production</strong>, nos equipements incluent des cameras{" "}
              <strong className="text-text">4K Cinema</strong> (Sony FX3, Blackmagic URSA),
              des <strong className="text-text">stabilisateurs Gimbal</strong> pour les travellings fluides,
              du materiel d&apos;<strong className="text-text">eclairage LED professionnel</strong> (Aputure, Nanlite)
              pour les tournages en interieur comme en exterieur, et un{" "}
              <strong className="text-text">drone DJI</strong> pour les prises de vue aeriennes sur la province de Liege.
              Nos prises de <strong className="text-text">son directe</strong> (micro HF, perche) garantissent
              une qualite audio studio meme en decor naturel.
            </p>
            <p>
              La <strong className="text-text">post-production</strong> englobe le{" "}
              <strong className="text-text">montage</strong> (Premiere Pro, DaVinci Resolve),
              l&apos;<strong className="text-text">etalonnage colorimetrique</strong> (color grading) pour une
              coherence visuelle de marque, le <strong className="text-text">sound design</strong> (effets sonores,
              musique libre de droits ou composition originale), la{" "}
              <strong className="text-text">voix off</strong> (choix du talent vocal, enregistrement en studio),
              le <strong className="text-text">motion graphics</strong> et les{" "}
              <strong className="text-text">effets visuels</strong> (VFX). Chaque spot est ensuite decliné
              dans les <strong className="text-text">formats natifs</strong> de chaque plateforme :
              16:9 pour YouTube, 9:16 pour Stories et Reels, 1:1 pour les feeds, 4:5 pour les publicites Facebook.
              Le <strong className="text-text">sous-titrage</strong> (francais, neerlandais, anglais) est inclus
              par defaut, car 85% des videos sont visionnees sans le son sur mobile.
            </p>
          </div>
        </div>
      </section>

      {/* Pourquoi la video — stats */}
      <section className="py-20 md:py-28 bg-bg-surface/30">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="reveal">
            <SectionHeading
              badge="Pourquoi la video est incontournable"
              title="Le format qui domine le marketing digital"
              subtitle="Les chiffres parlent d'eux-memes : la video est le format le plus performant pour capter l'attention, transmettre un message et generer des conversions."
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {WHY_VIDEO.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className={`reveal reveal-delay-${(i % 2) + 1} glass-card p-6 flex items-start gap-4`}>
                  <div className="w-10 h-10 rounded-lg bg-brand-dim flex items-center justify-center shrink-0">
                    <Icon size={20} className="text-brand" />
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Types de videos */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="reveal">
            <SectionHeading
              badge="Nos formats de production video"
              title="Quel type de spot pour votre projet ?"
              subtitle="Du teaser social media au spot TV, nous produisons tous les formats avec une strategie de diffusion integree pour chacun."
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {VIDEO_TYPES.map((type, i) => {
              const Icon = type.icon;
              return (
                <Card key={type.title} className={`reveal reveal-delay-${(i % 2) + 1}`}>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-dim flex items-center justify-center shrink-0">
                      <Icon size={24} className="text-brand" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-text mb-2">
                        {type.title}
                      </h3>
                      <p className="text-sm text-text-secondary leading-relaxed">
                        {type.description}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Processus */}
      <section className="py-20 md:py-28 bg-bg-surface/30">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="reveal">
            <SectionHeading
              badge="Notre processus de production video"
              title="Du concept a l'ecran : 4 etapes pour un spot impactant"
              subtitle="Un processus structure et transparent, avec validation a chaque etape, pour un resultat final qui depasse vos attentes."
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS.map((p, i) => (
              <div key={p.step} className={`reveal reveal-delay-${i + 1} glass-card p-6`}>
                <div className="w-8 h-8 rounded-full bg-brand text-white text-sm font-bold flex items-center justify-center mb-4">
                  {p.step}
                </div>
                <h3 className="text-lg font-bold text-text mb-2">{p.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chiffres cles */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="reveal">
            <SectionHeading
              badge="Chiffres cles"
              title="L'impact de la video sur vos performances marketing"
            />
          </div>
          <div className="reveal reveal-delay-1 grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: "+80%", label: "D'engagement vs contenu image statique" },
              { value: "2x", label: "Taux de clic sur les publicites video" },
              { value: "95%", label: "De retention du message en format video" },
              { value: "50+", label: "Spots produits pour nos clients en Belgique" },
            ].map((stat) => (
              <div key={stat.label} className="glass-card p-5 text-center">
                <p className="text-2xl md:text-3xl font-bold text-brand">{stat.value}</p>
                <p className="text-xs text-text-secondary mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pourquoi PrismaFlux */}
      <section className="py-20 md:py-28 bg-bg-surface/30">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="reveal">
            <SectionHeading
              badge="Pourquoi nous choisir"
              title="Ce qui differencie PrismaFlux en production video a Liege"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Sparkles, title: "Strategie avant production", text: "Chaque spot est precedee d'un brief creatif strategique. Nous definissons le message, la cible, le ton et la strategie de diffusion avant le premier tournage. Un film sans strategie est un investissement sans retour." },
              { icon: Palette, title: "Ecriture, captation, post-production", text: "Scripting, storyboard, tournage HD/4K, etalonnage colorimetrique, sound design, motion graphics, voix off — tout est realise en interne par nos equipes, de A a Z, sans sous-traitance cachee." },
              { icon: TrendingUp, title: "Distribution et performance mesuree", text: "La production est indissociable de la diffusion. Nous gerons la mise en ligne, le ciblage publicitaire et l'optimisation des campagnes video pour maximiser votre ROAS sur chaque plateforme." },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <Card key={item.title} className={`reveal reveal-delay-${i + 1}`}>
                  <div className="w-12 h-12 rounded-xl bg-brand-dim flex items-center justify-center mb-4">
                    <Icon size={24} className="text-brand" />
                  </div>
                  <h3 className="text-lg font-bold text-text mb-2">{item.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{item.text}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection faqs={SERVICE_FAQS["spots-publicitaires"]} />

      <LeadMagnet />

      <FinalCTA
        title="Pret a creer votre spot publicitaire a Liege ?"
        subtitle="Devis gratuit sous 24h pour votre projet video. Discutons de votre brief creatif et de la strategie de diffusion adaptee a votre marche en province de Liege."
        buttonText="Demander mon devis video gratuit"
      />
    </>
  );
}

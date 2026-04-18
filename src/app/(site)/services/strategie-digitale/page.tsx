import type { Metadata } from "next";
import {
  TrendingUp,
  Eye,
  BarChart3,
  Target,
  Layers,
  Brain,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Compass,
  GitBranch,
  Gauge,
  Users,
  Zap,
  Globe,
  Settings,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { LeadMagnet } from "@/components/sections/LeadMagnet";
import { FAQSection } from "@/components/ui/FAQSection";
import { SERVICE_FAQS } from "@/lib/constants/faqs";

export const metadata: Metadata = {
  title: "Strategie Marketing Digital 360° a Liege — Croissance & Acquisition",
  description:
    "Agence de strategie marketing digital a Liege, province de Liege. Audit digital complet, plan d'acquisition multi-canal, funnel AARRR, marketing automation, integration IA, attribution multi-touch. Pilotez votre croissance en ligne avec une strategie data-driven. Devis gratuit sous 24h.",
  keywords: [
    "strategie marketing digital liege",
    "agence marketing digital liege",
    "strategie digitale province de liege",
    "plan marketing digital belgique",
    "audit digital liege",
    "marketing automation liege",
    "acquisition digitale liege",
    "funnel marketing liege",
    "strategie croissance digitale belgique",
    "agence strategie digitale province de liege",
  ],
  alternates: {
    canonical: "/services/strategie-digitale",
  },
};

const APPROACH = [
  {
    icon: Eye,
    title: "Audit digital 360° & diagnostic",
    description:
      "Nous passons au crible chaque dimension de votre presence en ligne : site web (performance, UX, SEO), reseaux sociaux (engagement, reach, croissance), reputation en ligne (avis, mentions, e-reputation), parcours client digital (touchpoints, friction, abandons). L'audit inclut un benchmark concurrentiel complet de vos 5 principaux concurrents en province de Liege pour identifier les gaps et les opportunites inexploitees.",
  },
  {
    icon: Target,
    title: "Objectifs SMART & KPIs d'acquisition",
    description:
      "Nous definissons des objectifs concrets et mesurables alignes sur votre strategie business : CAC (Cout d'Acquisition Client), LTV (Lifetime Value), ROAS, taux de conversion par etape du funnel, nombre de leads qualifies par mois. Chaque KPI est associe a un canal specifique avec des jalons trimestriels pour suivre la progression et ajuster la strategie en temps reel.",
  },
  {
    icon: GitBranch,
    title: "Architecture du funnel AARRR",
    description:
      "Nous concevons votre funnel d'acquisition complet selon le framework AARRR (Acquisition, Activation, Retention, Revenue, Referral). Chaque etape est cartographiee avec ses canaux, ses metriques et ses leviers d'optimisation. Du premier point de contact publicitaire au programme de fidelisation, chaque touchpoint est orchestre pour maximiser la conversion et minimiser le cout par resultat.",
  },
  {
    icon: Layers,
    title: "Plan multi-canal orchestre",
    description:
      "Site web, SEO, reseaux sociaux, email marketing, publicite payante, content marketing : chaque canal est active selon son potentiel pour votre activite et orchestre dans un plan d'action trimestriel detaille. Nous definissons le budget optimal par canal, le calendrier de deploiement et les synergies entre les canaux pour un impact maximal. Comme un chef d'orchestre, nous harmonisons chaque instrument pour une performance globale superieure.",
  },
  {
    icon: Gauge,
    title: "Attribution multi-touch & pilotage",
    description:
      "Nous mettons en place un systeme d'attribution multi-touch (first-click, last-click, lineaire, time-decay) pour comprendre la vraie contribution de chaque canal a vos conversions. Dashboard centralise avec Google Analytics 4, Google Tag Manager, pixels de conversion et UTM tracking systematique. Chaque decision strategique est basee sur les donnees, pas sur l'intuition.",
  },
  {
    icon: Settings,
    title: "Marketing automation & nurturing",
    description:
      "Nous deploions des sequences d'automation qui travaillent pour vous 24h/24 : emails de bienvenue, nurturing de leads, relance d'abandons de panier, upsell post-achat, scoring de leads. Chaque scenario est concu pour faire avancer le prospect dans le funnel avec le bon message, au bon moment, sur le bon canal. Integration CRM pour une vue unifiee de chaque contact.",
  },
];

const AI_FEATURES = [
  {
    icon: Brain,
    title: "Analyse predictive & scoring de leads",
    description: "Nos modeles d'IA analysent le comportement de vos visiteurs et attribuent un score de propension a l'achat a chaque lead. Vous concentrez vos efforts commerciaux sur les prospects les plus susceptibles de convertir, avec un taux de qualification multiplie par 3.",
  },
  {
    icon: Sparkles,
    title: "Optimisation automatique des campagnes",
    description: "L'IA ajuste en continu les encheres, les audiences et les placements de vos campagnes publicitaires pour maximiser le ROAS. Les budgets sont realloues automatiquement vers les combinaisons creatives/audiences les plus performantes.",
  },
  {
    icon: Zap,
    title: "Generation de contenu assistee",
    description: "Production acceleree de variantes de copy publicitaire, d'emails et de contenus sociaux avec l'IA, valides et affines par nos strateges. Un workflow qui multiplie par 5 la vitesse de production tout en maintenant la qualite et la coherence de marque.",
  },
  {
    icon: Compass,
    title: "Veille concurrentielle automatisee",
    description: "Surveillance en temps reel des strategies digitales de vos concurrents en province de Liege : nouvelles campagnes, changements de positionnement, evolution des prix. Vous reagissez avant qu'ils ne captent vos parts de marche.",
  },
];

const CHANNELS = [
  { name: "Site web & SEO", role: "Acquisition organique long terme" },
  { name: "Google Ads (SEA)", role: "Acquisition payante a forte intention" },
  { name: "Facebook & Instagram Ads", role: "Acquisition sociale et retargeting" },
  { name: "LinkedIn Ads", role: "Generation de leads B2B" },
  { name: "Email marketing", role: "Nurturing et fidelisation" },
  { name: "Content marketing", role: "Autorite et trafic longue traine" },
  { name: "Marketing automation", role: "Conversion et scoring de leads" },
  { name: "Analytics & Data", role: "Pilotage et optimisation continue" },
];

export default function StrategieDigitalePage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-20 pb-16 md:pt-28 md:pb-20 relative overflow-hidden">
        <div className="absolute top-1/3 left-0 w-[400px] h-[400px] rounded-full bg-brand/5 blur-[100px]" />
        <div className="relative max-w-7xl mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="reveal inline-block px-4 py-1.5 text-sm font-medium text-brand bg-brand-dim rounded-full mb-4">
              Strategie Marketing Digital 360° — Liege, Province de Liege
            </span>
            <h1 className="reveal reveal-delay-1 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Strategie marketing digital pour{" "}
              <span className="gradient-text">accelerer votre croissance</span>
            </h1>
            <p className="reveal reveal-delay-2 mt-6 text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
              Notre agence de strategie digitale a Liege conçoit des plans
              d&apos;acquisition multi-canaux, data-driven et propulses par
              l&apos;IA. Fini les tactiques isolees — nous orchestrons
              l&apos;ensemble de votre ecosysteme digital pour un ROI maximal
              et une croissance previsible en province de Liege et en Belgique.
            </p>
            <div className="reveal reveal-delay-3 mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/contact" size="lg" className="pulse-glow">
                Planifier ma strategie digitale
                <ArrowRight size={18} className="ml-2" />
              </Button>
              <Button href="/realisations" variant="secondary" size="lg">
                Voir nos resultats
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Intro texte dense */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <div className="reveal space-y-4 text-text-secondary leading-relaxed">
            <p>
              La plupart des entreprises en province de Liege investissent dans
              des tactiques digitales isolees : un site web ici, un peu de
              Facebook la, une campagne Google Ads de temps en temps. Le
              resultat ? Des budgets disperses, des canaux qui ne se parlent
              pas et une absence de vision globale qui empeche toute
              croissance previsible. Une strategie marketing digital, c&apos;est
              le GPS qui transforme des actions disparates en un systeme
              d&apos;acquisition coherent et rentable.
            </p>
            <p>
              Chez PrismaFlux, nous ne vendons pas des outils — nous
              concevons des systemes de croissance. Notre approche part de vos
              objectifs business (chiffre d&apos;affaires, nombre de clients,
              panier moyen) et remonte vers les canaux, les budgets et les
              actions necessaires pour les atteindre. Chaque euro investi est
              trace, chaque canal est optimise et chaque decision est basee
              sur les donnees. Le customer journey de vos prospects est
              cartographie du premier clic au dernier achat, avec une
              attribution precise de la valeur generee par chaque point de
              contact.
            </p>
            <p>
              Que vous soyez une startup a Liege qui cherche son product-market
              fit, une PME a Verviers qui veut scaler son acquisition, ou une
              entreprise etablie a Huy qui vise la transformation digitale,
              notre equipe de strateges elabore la feuille de route adaptee a
              votre stade de maturite, votre marche et vos ambitions de
              croissance.
            </p>
          </div>
        </div>
      </section>

      {/* Champ lexical strategie */}
      <section className="py-16 md:py-20 bg-bg-surface/30">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <div className="reveal space-y-4 text-text-secondary leading-relaxed">
            <h2 className="text-2xl font-bold text-text">
              La strategie digitale : du diagnostic a la feuille de route de croissance
            </h2>
            <p>
              Une <strong className="text-text">strategie marketing digital</strong> commence par un{" "}
              <strong className="text-text">audit digital 360°</strong> : analyse de votre{" "}
              <strong className="text-text">empreinte en ligne</strong> (site, reseaux, reputation),{" "}
              <strong className="text-text">benchmark concurrentiel</strong> sur votre marche en province de Liege,
              cartographie de votre <strong className="text-text">parcours client</strong> (customer journey) avec
              l&apos;identification de chaque{" "}
              <strong className="text-text">point de contact</strong> (touchpoint) et des{" "}
              <strong className="text-text">points de friction</strong> qui freinent la conversion.
              Ce diagnostic permet de definir un{" "}
              <strong className="text-text">plan d&apos;action chiffre</strong> avec des priorites claires
              et un budget alloue canal par canal.
            </p>
            <p>
              Nous structurons votre acquisition autour du cadre{" "}
              <strong className="text-text">AARRR</strong> (Acquisition, Activation, Retention, Revenue, Referral)
              — aussi appele <strong className="text-text">Pirate Metrics</strong> — qui permet de piloter
              chaque etape du funnel avec des{" "}
              <strong className="text-text">KPIs</strong> (Key Performance Indicators) specifiques :
              <strong className="text-text"> CAC</strong> (Cout d&apos;Acquisition Client),{" "}
              <strong className="text-text">LTV</strong> (Lifetime Value),{" "}
              <strong className="text-text">taux de churn</strong>,{" "}
              <strong className="text-text">NPS</strong> (Net Promoter Score),{" "}
              <strong className="text-text">taux de conversion</strong> par etape et{" "}
              <strong className="text-text">ROI</strong> global par canal.
              Chaque decision est prise sur base des donnees, pas de l&apos;intuition.
            </p>
            <p>
              Sur le plan operationnel, nous deployons des{" "}
              <strong className="text-text">sequences d&apos;emailing automatisees</strong> (Brevo, Klaviyo, ActiveCampaign)
              avec <strong className="text-text">lead scoring</strong> pour qualifier les prospects,{" "}
              <strong className="text-text">segmentation comportementale</strong> et{" "}
              <strong className="text-text">personnalisation dynamique</strong> des messages.
              Le <strong className="text-text">CRM</strong> (HubSpot, Pipedrive) est integre pour offrir une
              vue unifiee de chaque contact, depuis la premiere visite du site jusqu&apos;au renouvellement du contrat.
              En province de Liege, cette vision globale est rare — c&apos;est notre avantage concurrentiel.
            </p>
            <p>
              Nous integrons egalement les outils de{" "}
              <strong className="text-text">growth hacking</strong> : A/B testing sur les pages de destination,
              optimisation du <strong className="text-text">taux de conversion</strong> (CRO —
              Conversion Rate Optimization), heatmaps et enregistrements de session (Hotjar),
              experimentation systematique via des{" "}
              <strong className="text-text">OKR</strong> (Objectives & Key Results) trimestriels.
              Chaque hypothese est testee, mesuree et validee ou invalidee — une approche{" "}
              <strong className="text-text">data-driven</strong> qui s&apos;oppose a la vision
              &quot;agence classique&quot; qui vend des prestations sans garantie de resultats.
            </p>
          </div>
        </div>
      </section>

      {/* Notre approche */}
      <section className="py-20 md:py-28 bg-bg-surface/30">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="reveal">
            <SectionHeading
              badge="Notre methode de strategie digitale"
              title="De l'audit a l'execution : une approche data-driven"
              subtitle="Chaque etape de notre methodologie est mesuree, pilotee et optimisee pour garantir des resultats concrets et un retour sur investissement mesurable."
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {APPROACH.map((item, i) => {
              const Icon = item.icon;
              return (
                <Card key={item.title} className={`reveal reveal-delay-${(i % 2) + 1}`}>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-brand-dim flex items-center justify-center shrink-0">
                      <Icon size={20} className="text-brand" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-text mb-1">{item.title}</h3>
                      <p className="text-sm text-text-secondary leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Canaux orchestres */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="reveal">
            <SectionHeading
              badge="Ecosysteme multi-canal"
              title="15+ canaux digitaux orchestres pour votre croissance"
              subtitle="Nous activons et coordonnons les canaux les plus pertinents pour votre activite dans un plan d'action unifie."
            />
          </div>
          <div className="reveal reveal-delay-1 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {CHANNELS.map((c) => (
              <div key={c.name} className="glass-card p-4 text-center">
                <p className="text-sm font-semibold text-text">{c.name}</p>
                <p className="text-xs text-text-muted mt-1">{c.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions IA */}
      <section className="py-20 md:py-28 bg-bg-surface/30">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="reveal">
            <SectionHeading
              badge="Intelligence artificielle integree"
              title="L'IA au service de votre strategie digitale"
              subtitle="Nous integrons les dernieres avancees en intelligence artificielle dans chaque couche de votre strategie pour un avantage competitif decisif."
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {AI_FEATURES.map((item, i) => {
              const Icon = item.icon;
              return (
                <Card key={item.title} className={`reveal reveal-delay-${(i % 2) + 1}`}>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-dim flex items-center justify-center shrink-0">
                      <Icon size={24} className="text-brand" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-text mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-text-secondary leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Chiffres cles */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="reveal">
            <SectionHeading
              badge="Chiffres cles"
              title="Des resultats qui parlent d'eux-memes"
            />
          </div>
          <div className="reveal reveal-delay-1 grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: "ROI x4", label: "Retour sur investissement moyen de nos strategies" },
              { value: "+200%", label: "De leads qualifies generes apres deploiement" },
              { value: "15+", label: "Canaux digitaux orchestres pour chaque client" },
              { value: "50+", label: "Entreprises accompagnees en province de Liege" },
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
              title="Ce qui differencie PrismaFlux des autres agences de strategie digitale"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Globe, title: "Strategie, pas execution aveugle", text: "Trop d'agences executent sans reflechir. Chez PrismaFlux, chaque action est d'abord justifiee par une strategie documentee, validee par les donnees et alignee sur vos objectifs business. Nous pilotons votre croissance avec la precision d'un tableau de bord, pas a l'aveugle." },
              { icon: Users, title: "Un strategiste dedie, pas un commercial", text: "Votre interlocuteur est un strategiste digital senior qui comprend votre business, vos chiffres et votre marche. Pas un commercial qui disparait apres la signature. Reunions de pilotage mensuelles, acces direct et decisions argumentees." },
              { icon: TrendingUp, title: "Data-driven, resultats mesurables", text: "Chaque euro investi est trace, chaque resultat est mesurable. Dashboard en temps reel, reporting mensuel detaille et recommandations basees sur l'analyse des donnees. Votre strategie digitale evolue chaque mois sur base des performances reelles, pas des suppositions." },
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
      <FAQSection faqs={SERVICE_FAQS["strategie-digitale"]} />

      <LeadMagnet />

      <FinalCTA
        title="Pret a definir votre strategie digitale a Liege ?"
        subtitle="Audit digital gratuit de votre presence en ligne. Decouvrez vos leviers de croissance en province de Liege sous 24h, sans engagement."
        buttonText="Demander mon audit strategique gratuit"
      />
    </>
  );
}

import type { Metadata } from "next";
import {
  Monitor,
  ShoppingCart,
  Megaphone,
  Zap,
  Shield,
  Smartphone,
  Code2,
  Paintbrush,
  Rocket,
  Search,
  Gauge,
  Users,
  BarChart3,
  CheckCircle2,
  Globe,
  Layers,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { PricingCalculator } from "@/components/pricing/PricingCalculator";
import { LeadMagnet } from "@/components/sections/LeadMagnet";
import { FAQSection } from "@/components/ui/FAQSection";
import { SERVICE_FAQS } from "@/lib/constants/faqs";

export const metadata: Metadata = {
  title: "Conception de Sites Web a Liege — Design UX/UI, Developpement & SEO",
  description:
    "Agence de conception de sites web a Liege, province de Liege. Sites vitrine, e-commerce et landing pages haute performance. Design UX/UI sur mesure, developpement Next.js/React, optimisation SEO on-page integree, responsive design mobile-first. Devis gratuit sous 24h.",
  keywords: [
    "creation site web liege",
    "conception site internet liege",
    "agence web liege",
    "site vitrine liege",
    "site e-commerce liege",
    "landing page liege",
    "developpeur web liege",
    "design UX UI liege",
    "site web professionnel belgique",
    "agence web province de liege",
  ],
  alternates: {
    canonical: "/services/creation-site-web",
  },
};

const SITE_TYPES = [
  {
    icon: Monitor,
    title: "Site vitrine professionnel",
    description:
      "Votre carte de visite digitale. Un site vitrine concu pour presenter votre activite, inspirer confiance et generer des prises de contact. Architecture claire, design sur mesure, contenu optimise SEO et tunnel de conversion integre pour transformer chaque visiteur en prospect.",
    features: ["Design sur mesure", "SEO on-page", "Formulaire de contact", "Google Analytics"],
  },
  {
    icon: ShoppingCart,
    title: "Site e-commerce",
    description:
      "Votre boutique en ligne, ouverte 24h/24. Catalogue produits, panier d'achat, paiement securise (Bancontact, Visa, Mastercard), gestion des stocks et suivi de commandes. Chaque element est optimise pour maximiser votre taux de conversion et votre panier moyen.",
    features: ["Catalogue produits", "Paiement securise", "Gestion stocks", "Suivi commandes"],
  },
  {
    icon: Megaphone,
    title: "Landing page de conversion",
    description:
      "Une page unique, un objectif unique : convertir. Concue pour vos campagnes Google Ads, Facebook Ads ou emailing, chaque landing page est optimisee pour le taux de conversion avec un message clair, des preuves sociales et un call-to-action irresistible.",
    features: ["Taux de conversion optimise", "A/B testing", "Tracking analytics", "Integrations CRM"],
  },
];

const FEATURES = [
  { icon: Paintbrush, title: "Design UX/UI sur mesure", description: "Chaque site est concu a partir de zero par nos designers. Pas de template, pas de theme preconcu. Votre identite visuelle est respectee et sublimee pour creer une experience utilisateur memorable." },
  { icon: Smartphone, title: "Responsive mobile-first", description: "Plus de 60% du trafic web vient du mobile. Nos sites sont concus mobile-first : chaque element s'adapte parfaitement a tous les ecrans, du smartphone a l'ecran 4K." },
  { icon: Zap, title: "Performance Lighthouse 90+", description: "Temps de chargement inferieur a 2 secondes. Nous optimisons chaque image, chaque script, chaque ressource pour obtenir des scores Google Lighthouse superieurs a 90 sur les 4 criteres." },
  { icon: Shield, title: "Securite SSL & conformite RGPD", description: "Certificat SSL inclus, politique de cookies conforme au RGPD, formulaires securises. Vos visiteurs et leurs donnees sont proteges selon les normes europeennes." },
  { icon: Code2, title: "Technologies modernes (Next.js, React, Framer)", description: "Nous developpons avec les frameworks les plus performants du marche : Next.js, React, Framer. Des technologies utilisees par Vercel, Netflix et Airbnb pour leur fiabilite et leur vitesse." },
  { icon: Search, title: "SEO on-page integre des la conception", description: "Le referencement naturel n'est pas un ajout apres coup. Chaque page est concue avec les bonnes balises HTML, la bonne structure de titres, les meta-descriptions optimisees et un maillage interne strategique." },
  { icon: Gauge, title: "Core Web Vitals optimises", description: "LCP, FID, CLS : les trois metriques que Google utilise pour classer votre site. Nous les optimisons des la phase de developpement pour vous donner un avantage SEO technique." },
  { icon: Layers, title: "Architecture de l'information structuree", description: "Arborescence pensee pour le parcours utilisateur ET pour Google. Chaque page a un objectif, chaque clic rapproche le visiteur de la conversion." },
];

const PROCESS = [
  {
    step: 1,
    title: "Decouverte & Strategie",
    description:
      "Reunion de cadrage pour comprendre votre activite, votre cible, vos concurrents et vos objectifs. Nous analysons votre marche en province de Liege et definissons ensemble l'arborescence, le ton editorial et les fonctionnalites cles de votre futur site.",
  },
  {
    step: 2,
    title: "Maquettes & Design UX/UI",
    description:
      "Nos designers creent les maquettes haute fidelite sur Figma. Vous visualisez chaque page, chaque interaction, chaque element avant le moindre developpement. Revisions illimitees jusqu'a validation complete du design.",
  },
  {
    step: 3,
    title: "Developpement & Integrations",
    description:
      "Notre equipe developpe votre site avec Next.js/React ou Framer selon le projet. Integration des formulaires, du CMS, des outils analytics (GA4, Search Console), du tracking de conversion et de toutes les fonctionnalites metier specifiques.",
  },
  {
    step: 4,
    title: "Tests, Lancement & Formation",
    description:
      "Tests cross-navigateurs, audit Lighthouse, verification SEO technique, test sur mobile et tablette. Mise en production sur un hebergement cloud performant (Vercel). Formation personnalisee a la gestion de votre contenu pour une autonomie complete.",
  },
];

const TECH_STACK = [
  { name: "Next.js", role: "Framework de developpement" },
  { name: "React", role: "Librairie d'interface" },
  { name: "Framer", role: "Design & developpement no-code" },
  { name: "Tailwind CSS", role: "Systeme de style" },
  { name: "TypeScript", role: "Qualite du code" },
  { name: "Vercel", role: "Hebergement & CDN global" },
  { name: "Figma", role: "Maquettes & design" },
  { name: "Google Analytics 4", role: "Suivi des performances" },
];

export default function CreationSiteWebPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-20 pb-16 md:pt-28 md:pb-20 relative overflow-hidden">
        <div className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full bg-brand/5 blur-[100px]" />
        <div className="relative max-w-7xl mx-auto px-4 md:px-8">
          <div className="max-w-3xl">
            <span className="reveal inline-block px-4 py-1.5 text-sm font-medium text-brand bg-brand-dim rounded-full mb-4">
              Conception de sites web — Liege, Province de Liege
            </span>
            <h1 className="reveal reveal-delay-1 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Des sites web haute performance qui{" "}
              <span className="gradient-text">convertissent</span> vos visiteurs
              en clients
            </h1>
            <p className="reveal reveal-delay-2 mt-6 text-lg text-text-secondary max-w-2xl leading-relaxed">
              Notre agence de marketing digital a Liege conçoit des sites internet
              sur mesure — sites vitrine, e-commerce et landing pages — avec un
              design UX/UI premium, un developpement Next.js/React performant et
              une optimisation SEO integree des la premiere ligne de code. Chaque
              projet est un moteur d&apos;acquisition taille pour votre marche.
            </p>
            <div className="reveal reveal-delay-3 mt-8 flex flex-col sm:flex-row gap-4">
              <Button href="/contact" size="lg">
                Demander un devis gratuit
              </Button>
              <Button href="/realisations" variant="secondary" size="lg">
                Voir nos realisations
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
              Un site web n&apos;est pas une simple vitrine en ligne — c&apos;est le
              premier point de contact entre votre entreprise et vos futurs
              clients. En province de Liege, ou la concurrence digitale
              s&apos;intensifie, disposer d&apos;un site professionnel, rapide et
              bien reference sur Google n&apos;est plus un luxe mais une necessite.
            </p>
            <p>
              Chez PrismaFlux, nous ne livrons pas de sites web generiques.
              Chaque projet commence par une analyse strategique de votre marche,
              de votre cible et de vos concurrents. Nous concevons ensuite un
              design sur mesure, developpons avec les technologies les plus
              performantes du marche et optimisons chaque page pour le
              referencement naturel. Le resultat : un site qui non seulement
              impressionne visuellement, mais qui genere concretement du trafic
              qualifie et des conversions mesurables.
            </p>
            <p>
              Que vous soyez un commerce a Liege, un cabinet liberal a Huy, une
              PME a Seraing ou une startup a Verviers, notre approche est la
              meme : comprendre votre metier, concevoir une experience
              utilisateur irresistible et deployer un site qui travaille pour
              vous 24h/24.
            </p>
          </div>
        </div>
      </section>

      {/* Champ lexical / Expertise */}
      <section className="py-16 md:py-20 bg-bg-surface/30">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <div className="reveal space-y-4 text-text-secondary leading-relaxed">
            <h2 className="text-2xl font-bold text-text">
              Tout ce que recouvre la creation d&apos;un site web professionnel
            </h2>
            <p>
              La <strong className="text-text">conception web</strong> est une discipline plurielle qui englobe la{" "}
              <strong className="text-text">recherche UX</strong> (experience utilisateur), la{" "}
              <strong className="text-text">conception UI</strong> (interface graphique), l&apos;
              <strong className="text-text">architecture de l&apos;information</strong>, le{" "}
              <strong className="text-text">wireframing</strong>, la{" "}
              <strong className="text-text">maquette haute fidelite</strong> sur Figma, le{" "}
              <strong className="text-text">prototypage interactif</strong> et enfin le developpement front-end et back-end.
              Chez PrismaFlux, chaque etape est documentee et validee avec vous avant de passer a la suivante.
            </p>
            <p>
              Sur le plan technique, nous travaillons avec{" "}
              <strong className="text-text">Next.js</strong> (rendu serveur et statique),{" "}
              <strong className="text-text">React</strong>,{" "}
              <strong className="text-text">Tailwind CSS</strong>,{" "}
              <strong className="text-text">TypeScript</strong> et{" "}
              <strong className="text-text">Framer</strong> pour le design no-code haute fidelite.
              Nos sites sont deployes sur des infrastructures cloud (<strong className="text-text">Vercel</strong>,{" "}
              <strong className="text-text">CDN mondial</strong>) pour des temps de reponse inferieurs a 200 ms
              depuis n&apos;importe quelle ville de Belgique. Nous integrons systematiquement un{" "}
              <strong className="text-text">CMS headless</strong> (Sanity, Contentful) quand vous avez besoin de gerer
              votre contenu en autonomie — sans toucher au code.
            </p>
            <p>
              L&apos;<strong className="text-text">optimisation SEO on-page</strong> est integree des la phase de conception :
              structure des balises <code className="text-brand text-sm">H1</code> a{" "}
              <code className="text-brand text-sm">H6</code>,{" "}
              <strong className="text-text">meta-descriptions</strong> uniques,{" "}
              <strong className="text-text">balises Open Graph</strong> pour les reseaux sociaux,{" "}
              <strong className="text-text">schema.org</strong> pour les rich snippets Google,{" "}
              <strong className="text-text">sitemap XML</strong>,{" "}
              <strong className="text-text">robots.txt</strong> et redirections 301 si migration depuis un ancien site.
              Chaque image est compressee, au format <strong className="text-text">WebP</strong> ou{" "}
              <strong className="text-text">AVIF</strong>, avec attribut <code className="text-brand text-sm">alt</code> optimise
              pour le referencement image de Google. Le resultat : un{" "}
              <strong className="text-text">score Lighthouse</strong> superieur a 90/100 sur les quatre axes —
              Performance, Accessibilite, Bonnes pratiques et SEO.
            </p>
            <p>
              Cote conformite, nous gerons la{" "}
              <strong className="text-text">mise en conformite RGPD</strong> (banniere cookies Axeptio ou CookieYes,
              politique de confidentialite, formulaires double opt-in),{" "}
              l&apos;<strong className="text-text">accessibilite WCAG 2.1 AA</strong> (contraste, navigation clavier,
              lecteurs d&apos;ecran) et la{" "}
              <strong className="text-text">securite SSL/TLS</strong> avec renouvellement automatique du certificat.
              En province de Liege, une agence web qui respecte ces standards est une garantie de serieux — et un avantage
              SEO direct, puisque Google penalise les sites sans HTTPS et les pages lentes.
            </p>
          </div>
        </div>
      </section>

      {/* Types de sites */}
      <section className="py-20 md:py-28 bg-bg-surface/30">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="reveal">
            <SectionHeading
              badge="Quel type de site web pour votre entreprise ?"
              title="Sites vitrine, e-commerce et landing pages a Liege"
              subtitle="Chaque format repond a un objectif business different. Nous vous guidons vers la solution la plus adaptee a votre activite et a votre marche."
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {SITE_TYPES.map((type, i) => {
              const Icon = type.icon;
              return (
                <Card key={type.title} className={`reveal reveal-delay-${i + 1}`}>
                  <div className="w-14 h-14 rounded-2xl bg-brand-dim flex items-center justify-center mb-5">
                    <Icon size={28} className="text-brand" />
                  </div>
                  <h3 className="text-xl font-bold text-text mb-3">
                    {type.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed mb-4">
                    {type.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {type.features.map((f) => (
                      <span key={f} className="text-xs px-2.5 py-1 rounded-full bg-brand-dim text-brand">
                        {f}
                      </span>
                    ))}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Ce qui est inclus */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="reveal">
            <SectionHeading
              badge="Qualite et standards inclus dans chaque site"
              title="Ce que vous obtenez avec PrismaFlux"
              subtitle="Chaque site web que nous livrons respecte les plus hauts standards du marche en termes de design, performance, securite et referencement naturel."
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FEATURES.map((f, i) => {
              const Icon = f.icon;
              return (
                <Card key={f.title} className={`reveal reveal-delay-${(i % 2) + 1}`}>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-brand-dim flex items-center justify-center shrink-0">
                      <Icon size={20} className="text-brand" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-text mb-1">{f.title}</h3>
                      <p className="text-sm text-text-secondary leading-relaxed">{f.description}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stack technique */}
      <section className="py-16 md:py-20 bg-bg-surface/30">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="reveal">
            <SectionHeading
              badge="Notre stack technique"
              title="Les technologies qui propulsent vos performances"
              subtitle="Nous utilisons les memes technologies que Netflix, Vercel et Airbnb."
            />
          </div>
          <div className="reveal reveal-delay-1 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {TECH_STACK.map((t) => (
              <div key={t.name} className="glass-card p-4 text-center">
                <p className="text-sm font-semibold text-text">{t.name}</p>
                <p className="text-xs text-text-muted mt-1">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Processus */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="reveal">
            <SectionHeading
              badge="Notre processus de conception web"
              title="De la premiere reunion a la mise en ligne"
              subtitle="Un processus structure en 4 etapes, transparent et collaboratif, pour un site web qui depasse vos attentes."
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS.map((p, i) => (
              <div key={p.step} className={`reveal reveal-delay-${i + 1} glass-card p-6`}>
                <div className="w-8 h-8 rounded-full bg-brand text-white text-sm font-bold flex items-center justify-center mb-4">
                  {p.step}
                </div>
                <h3 className="text-lg font-bold text-text mb-2">
                  {p.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pourquoi PrismaFlux pour votre site */}
      <section className="py-20 md:py-28 bg-bg-surface/30">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="reveal">
            <SectionHeading
              badge="Pourquoi nous choisir"
              title="Ce qui differencie PrismaFlux des autres agences web a Liege"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Globe, title: "Ancrage local, vision globale", text: "Basee a Liege, notre agence connait le tissu economique de la province. Nous concevons des sites web adaptes a votre marche local tout en respectant les standards internationaux du web design." },
              { icon: Users, title: "Un interlocuteur dedie, pas un ticket", text: "Chez PrismaFlux, vous echangez directement avec les personnes qui concevoient et developpent votre site. Pas de couche intermediaire, pas de chef de projet relais — de l'humain, du concret." },
              { icon: BarChart3, title: "Resultats mesurables, pas de promesses", text: "Chaque site est connecte a Google Analytics 4 et Search Console. Vous suivez votre trafic, vos conversions et votre ROI en temps reel. Nous ne vendons pas de la beaute — nous vendons de la performance." },
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

      {/* Simulateur de prix */}
      <PricingCalculator />

      {/* FAQ */}
      <FAQSection faqs={SERVICE_FAQS["creation-site-web"]} />

      <LeadMagnet />

      <FinalCTA
        title="Pret a lancer votre site web a Liege ?"
        subtitle="Audit gratuit de votre presence en ligne. Devis sur mesure sous 24h, sans engagement. Contactez notre agence de marketing digital."
        buttonText="Demarrer mon projet web"
      />
    </>
  );
}

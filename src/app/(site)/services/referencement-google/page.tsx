import type { Metadata } from "next";
import {
  Search,
  Target,
  FileText,
  Settings,
  Link2,
  BarChart3,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Clock,
  MapPin,
  Globe,
  Layers,
  Eye,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { LeadMagnet } from "@/components/sections/LeadMagnet";
import { FAQSection } from "@/components/ui/FAQSection";
import { SERVICE_FAQS } from "@/lib/constants/faqs";

export const metadata: Metadata = {
  title: "Referencement Google (SEO) a Liege — Expert SEO Province de Liege",
  description:
    "Expert en referencement naturel Google (SEO) a Liege, province de Liege. Audit SEO technique, optimisation on-page et off-page, strategie de contenu, netlinking, SEO local. Atteignez le top 3 Google pour vos mots-cles strategiques. Agence de marketing digital.",
  keywords: [
    "referencement google liege",
    "SEO liege",
    "agence SEO liege",
    "referencement naturel liege",
    "expert SEO province de liege",
    "optimisation google liege",
    "premiere page google liege",
    "audit SEO liege",
    "referencement local liege",
    "agence referencement belgique",
  ],
  alternates: {
    canonical: "/services/referencement-google",
  },
};

const SEO_PILLARS = [
  {
    icon: Target,
    title: "Recherche semantique de mots-cles",
    description:
      "Nous identifions les requetes que vos clients potentiels tapent reellement sur Google. Analyse du volume de recherche, de l'intention utilisateur (informationnelle, transactionnelle, navigationnelle) et de la difficulte de positionnement. Nous ciblons les mots-cles qui generent du chiffre d'affaires, pas juste du trafic.",
  },
  {
    icon: FileText,
    title: "Optimisation on-page & contenu",
    description:
      "Chaque page de votre site est optimisee : balises title et meta-descriptions, structure de titres (H1-H6), maillage interne strategique, attributs alt sur les images, schema markup. Le contenu est redige pour satisfaire a la fois les utilisateurs et l'algorithme de Google.",
  },
  {
    icon: Settings,
    title: "SEO technique & Core Web Vitals",
    description:
      "Vitesse de chargement, indexation, crawlabilite, structure des URLs, sitemap XML, robots.txt, donnees structurees, canonical tags. Nous auditons et corrigeons chaque parametre technique qui influence votre positionnement dans les resultats de recherche.",
  },
  {
    icon: Link2,
    title: "Netlinking & autorite de domaine",
    description:
      "Construction d'un profil de backlinks qualitatifs et pertinents pour renforcer l'autorite de votre domaine aux yeux de Google. Nous privilegions les liens provenant de sites thematiquement lies a votre activite, avec une approche ethique et durable (white hat SEO).",
  },
  {
    icon: MapPin,
    title: "SEO local — Province de Liege",
    description:
      "Optimisation de votre fiche Google Business Profile, gestion des avis, citations NAP coherentes sur les annuaires locaux, contenu geo-cible. Nous vous positionnons dans le pack local et sur les recherches localisees en province de Liege et en Belgique.",
  },
  {
    icon: Layers,
    title: "Strategie de content marketing SEO",
    description:
      "Creation de contenus a forte valeur ajoutee (articles de blog, guides, etudes de cas) concus pour capturer du trafic organique longue traine et etablir votre expertise sectorielle aux yeux de Google et de vos prospects.",
  },
  {
    icon: Eye,
    title: "Analyse concurrentielle SEO",
    description:
      "Nous etudions la strategie SEO de vos concurrents directs en province de Liege : leurs mots-cles, leurs backlinks, leur contenu. Cette intelligence concurrentielle alimente notre strategie pour vous positionner la ou ils sont — et au-dela.",
  },
  {
    icon: BarChart3,
    title: "Reporting mensuel & pilotage KPIs",
    description:
      "Tableau de bord SEO avec suivi des positions, evolution du trafic organique, taux de clics (CTR), conversions et ROI. Chaque mois, vous recevez un rapport clair avec les actions realisees, les resultats obtenus et les recommandations pour la periode suivante.",
  },
];

const TIMELINE = [
  {
    month: "Mois 1-2",
    title: "Audit & Fondations",
    description:
      "Audit SEO technique complet (crawl, indexation, Core Web Vitals). Correction des erreurs critiques. Recherche de mots-cles et cartographie semantique. Optimisation on-page des pages prioritaires. Soumission sitemap et configuration Search Console.",
  },
  {
    month: "Mois 3-4",
    title: "Contenu & Autorite",
    description:
      "Deploiement de la strategie de contenu SEO : redaction d'articles optimises, creation de pages piliers, maillage interne. Lancement de la strategie de netlinking avec les premiers backlinks qualitatifs. Premiers mouvements de positions observables.",
  },
  {
    month: "Mois 5-6",
    title: "Acceleration & Resultats",
    description:
      "Les premieres positions top 10 apparaissent. Optimisation continue des pages existantes. Expansion de la couverture semantique sur de nouveaux mots-cles. Le trafic organique augmente de maniere significative et les premieres conversions SEO sont mesurables.",
  },
  {
    month: "Mois 6-12",
    title: "Consolidation & Domination",
    description:
      "Maintien et renforcement des positions acquises. Conquete de mots-cles a plus forte concurrence. Optimisation du taux de conversion des pages de destination. Le SEO devient votre premier canal d'acquisition, avec un cout par lead en baisse constante.",
  },
];

export default function ReferencementGooglePage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-20 pb-16 md:pt-28 md:pb-20 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-brand/5 blur-[100px]" />
        <div className="relative max-w-7xl mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="reveal inline-block px-4 py-1.5 text-sm font-medium text-brand bg-brand-dim rounded-full mb-4">
              Expert SEO a Liege — Province de Liege
            </span>
            <h1 className="reveal reveal-delay-1 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Referencement naturel Google :{" "}
              <span className="gradient-text">premiere page</span> pour vos
              mots-cles strategiques
            </h1>
            <p className="reveal reveal-delay-2 mt-6 text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
              Notre agence SEO a Liege deploie une methodologie eprouvee pour
              propulser votre site dans le top 3 de Google. Audit technique,
              optimisation on-page, strategie de contenu et netlinking — chaque
              levier du referencement naturel est active pour generer un trafic
              organique qualifie et durable en province de Liege et en Belgique.
            </p>
            <div className="reveal reveal-delay-3 mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/contact" size="lg" className="pulse-glow">
                Audit SEO gratuit
                <ArrowRight size={18} className="ml-2" />
              </Button>
              <Button href="/realisations" variant="secondary" size="lg">
                Nos resultats SEO
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
              Le referencement naturel (SEO) est le levier d&apos;acquisition le
              plus rentable du marketing digital. Contrairement a la publicite
              payante qui s&apos;arrete des que le budget est coupe, le SEO genere
              un flux de trafic organique gratuit, qualifie et croissant dans le
              temps. C&apos;est un investissement strategique qui prend de la valeur
              chaque mois.
            </p>
            <p>
              En province de Liege, la majorite des entreprises n&apos;exploitent
              pas le potentiel du referencement naturel. Un site web sans SEO,
              c&apos;est comme un magasin sans vitrine : il existe, mais personne
              ne le trouve. Nos experts SEO a Liege analysent votre marche,
              identifient les opportunites de positionnement et deploient une
              strategie sur mesure pour vous placer devant vos concurrents sur
              les requetes qui comptent.
            </p>
            <p>
              Que vous cibliez des recherches locales (&quot;restaurant
              Liege&quot;, &quot;plombier Herstal&quot;, &quot;avocat Huy&quot;)
              ou des requetes nationales a fort volume, notre approche combine
              SEO technique, optimisation de contenu et construction
              d&apos;autorite pour des resultats durables et mesurables.
            </p>
          </div>
        </div>
      </section>

      {/* Champ lexical SEO */}
      <section className="py-16 md:py-20 bg-bg-surface/30">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <div className="reveal space-y-4 text-text-secondary leading-relaxed">
            <h2 className="text-2xl font-bold text-text">
              Le vocabulaire du referencement naturel, demystifie
            </h2>
            <p>
              Le <strong className="text-text">referencement naturel</strong> (ou{" "}
              <strong className="text-text">SEO — Search Engine Optimization</strong>) regroupe l&apos;ensemble des
              techniques qui permettent a votre site d&apos;apparaitre dans les{" "}
              <strong className="text-text">SERP</strong> (Search Engine Results Pages) sans payer Google.
              Il se divise en trois grands axes : le{" "}
              <strong className="text-text">SEO technique</strong> (structure du site, vitesse, indexation),
              le <strong className="text-text">SEO on-page</strong> (contenu, balises, maillage interne) et le{" "}
              <strong className="text-text">SEO off-page</strong> (netlinking, autorite de domaine, signaux sociaux).
            </p>
            <p>
              Parmi les notions cles que nous maitrisons : le{" "}
              <strong className="text-text">crawl budget</strong> (la capacite de Googlebot a explorer votre site),
              les <strong className="text-text">balises canoniques</strong> pour eviter le contenu duplique,
              les <strong className="text-text">donnees structurees JSON-LD</strong> pour obtenir des{" "}
              <strong className="text-text">featured snippets</strong> et des{" "}
              <strong className="text-text">rich results</strong> (etoiles d&apos;avis, FAQ, recettes),
              la gestion du <strong className="text-text">PageRank interne</strong> via le maillage,
              l&apos;optimisation du <strong className="text-text">CTR</strong> (taux de clic) en SERP
              grace aux meta-descriptions percutantes, et l&apos;alignement sur les criteres{" "}
              <strong className="text-text">E-E-A-T</strong> (Experience, Expertise, Autorite, Fiabilite)
              qui conditionnent la confiance que Google accorde a votre domaine.
            </p>
            <p>
              En province de Liege, nous deployon une strategie de{" "}
              <strong className="text-text">SEO local</strong> robuste : optimisation de la{" "}
              <strong className="text-text">fiche Google Business Profile</strong> (anciennement Google My Business),
              coherence des <strong className="text-text">citations NAP</strong> (Nom, Adresse, Telephone) sur les
              annuaires (Pages d&apos;Or, Yelp, Bing Places), creation de{" "}
              <strong className="text-text">landing pages geolocalisees</strong> (Liege, Seraing, Herstal, Huy, Verviers,
              Sprimont), et campagnes de{" "}
              <strong className="text-text">netlinking local</strong> via des partenariats avec des medias et
              associations liegeois. L&apos;objectif : apparaitre dans le{" "}
              <strong className="text-text">pack local Google Maps</strong> pour toutes vos requetes metier.
            </p>
            <p>
              Notre outil de suivi de positions genere des rapports hebdomadaires avec l&apos;evolution de vos{" "}
              <strong className="text-text">mots-cles</strong> sur <strong className="text-text">desktop</strong> et{" "}
              <strong className="text-text">mobile</strong>, la progression du{" "}
              <strong className="text-text">trafic organique</strong> dans Google Search Console,
              le <strong className="text-text">Domain Rating</strong> et le{" "}
              <strong className="text-text">Trust Flow</strong> de votre domaine, ainsi que le profil de{" "}
              <strong className="text-text">backlinks</strong> (domaines referents, ancres, toxicite).
              Vous avez une vision complete, transparente et actionnable de votre progression SEO, semaine apres semaine.
            </p>
          </div>
        </div>
      </section>

      {/* Avant / Apres */}
      <section className="py-20 md:py-28 bg-bg-surface/30">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="reveal">
            <SectionHeading
              badge="L'impact du SEO sur votre business"
              title="Sans referencement vs. avec PrismaFlux SEO"
              subtitle="Le referencement naturel transforme votre site web d'une simple vitrine en un veritable aimant a clients."
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="reveal reveal-delay-1 border-red-500/20">
              <h3 className="text-lg font-bold text-text mb-4 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500" />
                Sans strategie SEO
              </h3>
              <ul className="space-y-3">
                {[
                  "Invisible sur Google pour vos mots-cles commerciaux",
                  "Dependance totale aux publicites payantes (cout par clic croissant)",
                  "Trafic faible, non qualifie et sans croissance organique",
                  "Vos concurrents captent les clients qui vous cherchent",
                  "Aucune autorite de domaine aux yeux de Google",
                  "Pas de donnees exploitables sur le comportement des visiteurs",
                ].map((item) => (
                  <li key={item} className="text-sm text-text-secondary flex items-start gap-2">
                    <span className="text-red-400 mt-0.5 shrink-0">&#10005;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
            <Card className="reveal reveal-delay-2 border-green-500/20">
              <h3 className="text-lg font-bold text-text mb-4 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-green-500" />
                Avec PrismaFlux SEO
              </h3>
              <ul className="space-y-3">
                {[
                  "Top 3 Google pour vos mots-cles strategiques a fort ROI",
                  "Trafic organique gratuit, qualifie et en croissance constante",
                  "Cout par acquisition (CPA) en baisse continue mois apres mois",
                  "Avantage concurrentiel durable et difficilement reproductible",
                  "Autorite de domaine croissante qui renforce toutes vos pages",
                  "Donnees analytics exploitables pour piloter votre strategie digitale",
                ].map((item) => (
                  <li key={item} className="text-sm text-text-secondary flex items-start gap-2">
                    <CheckCircle2 size={14} className="text-green-400 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Les 8 piliers de notre SEO */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="reveal">
            <SectionHeading
              badge="Les 8 piliers de notre strategie SEO"
              title="Un referencement naturel complet et methodique"
              subtitle="Chaque dimension du SEO est couverte : de l'audit technique a la strategie de contenu, en passant par le netlinking et le SEO local en province de Liege."
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SEO_PILLARS.map((item, i) => {
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

      {/* Timeline */}
      <section className="py-20 md:py-28 bg-bg-surface/30">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="reveal">
            <SectionHeading
              badge="Calendrier de resultats SEO"
              title="A quoi s'attendre mois par mois"
              subtitle="Le referencement naturel est un investissement a moyen terme. Voici le parcours typique vers la domination de votre marche sur Google."
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TIMELINE.map((t, i) => (
              <div key={t.month} className={`reveal reveal-delay-${i + 1} glass-card p-6`}>
                <div className="flex items-center gap-2 mb-3">
                  <Clock size={16} className="text-brand" />
                  <span className="text-sm font-bold text-brand">{t.month}</span>
                </div>
                <h3 className="text-lg font-bold text-text mb-2">{t.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{t.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chiffres cles */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="reveal grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: "92%", label: "De nos clients en premiere page Google" },
              { value: "+340%", label: "De trafic organique moyen apres 6 mois" },
              { value: "-55%", label: "De cout par acquisition vs publicite payante" },
              { value: "50+", label: "Sites optimises en province de Liege" },
            ].map((stat) => (
              <div key={stat.label} className="glass-card p-5 text-center">
                <p className="text-2xl md:text-3xl font-bold text-brand">{stat.value}</p>
                <p className="text-xs text-text-secondary mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection faqs={SERVICE_FAQS["referencement-google"]} />

      <LeadMagnet />

      <FinalCTA
        title="Pret a conquérir la premiere page de Google a Liege ?"
        subtitle="Audit SEO gratuit de votre site web. Decouvrez vos opportunites de positionnement en province de Liege sous 24h."
        buttonText="Demander mon audit SEO gratuit"
      />
    </>
  );
}

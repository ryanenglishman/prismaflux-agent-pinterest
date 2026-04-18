import type { Metadata } from "next";
import {
  Globe,
  Image,
  Target,
  TrendingUp,
  MessageCircle,
  Camera,
  BarChart3,
  Users,
  CheckCircle2,
  ArrowRight,
  Megaphone,
  Repeat2,
  Eye,
  Zap,
  Layers,
  Share2,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { LeadMagnet } from "@/components/sections/LeadMagnet";
import { FAQSection } from "@/components/ui/FAQSection";
import { SERVICE_FAQS } from "@/lib/constants/faqs";

export const metadata: Metadata = {
  title: "Social Media Marketing & Publicite Digitale a Liege — Agence Reseaux Sociaux",
  description:
    "Agence de social media marketing a Liege, province de Liege. Community management, publicite Facebook Ads, Instagram Ads, Google Ads, campagnes TikTok. Strategie de contenu, creation visuelle UGC, reporting analytics, optimisation ROAS et retargeting. Generez des leads qualifies et boostez votre notoriete digitale.",
  keywords: [
    "social media marketing liege",
    "agence reseaux sociaux liege",
    "community management liege",
    "publicite facebook ads liege",
    "publicite instagram ads liege",
    "google ads liege",
    "gestion reseaux sociaux province de liege",
    "publicite digitale belgique",
    "agence social media province de liege",
    "campagne publicitaire reseaux sociaux liege",
  ],
  alternates: {
    canonical: "/services/reseaux-sociaux",
  },
};

const PLATFORMS = [
  {
    name: "Facebook & Meta Ads",
    icon: Globe,
    description:
      "La plateforme la plus puissante pour le ciblage publicitaire en Belgique. Nous deploions des campagnes Meta Ads avec des audiences personnalisees, des lookalike audiences basees sur vos meilleurs clients et un retargeting dynamique pour recapturer les visiteurs de votre site. Gestion de page, creation de contenu organique, animation de communaute et moderation proactive — chaque interaction renforce votre image de marque en province de Liege.",
  },
  {
    name: "Instagram & Reels",
    icon: Image,
    description:
      "Le canal roi du contenu visuel et du storytelling de marque. Nous creons des strategies Instagram completes : feed curate avec identite visuelle coherente, stories interactives (sondages, quiz, compte a rebours), Reels a fort potentiel viral et campagnes publicitaires optimisees pour le cout par clic (CPC) et le cout par acquisition (CPA). Format vertical natif, sous-titrage automatique et hashtag strategy pour maximiser votre reach organique.",
  },
  {
    name: "Google Ads (Search, Display, YouTube)",
    icon: Target,
    description:
      "Captez les prospects au moment exact ou ils recherchent vos services. Nous configurons et optimisons vos campagnes Google Search pour les mots-cles a forte intention commerciale, vos campagnes Display pour la notoriete et le remarketing, et vos campagnes YouTube pre-roll pour la visibilite video. Suivi des conversions, optimisation du ROAS et ajustement des encheres en temps reel pour chaque euro investi.",
  },
  {
    name: "LinkedIn Ads & B2B",
    icon: Users,
    description:
      "La plateforme de reference pour la generation de leads B2B en province de Liege. Nous concevons des campagnes LinkedIn Ads avec ciblage par fonction, secteur d'activite et taille d'entreprise. Formats Sponsored Content, InMail sponsorise et Lead Gen Forms integres pour collecter des leads qualifies directement dans la plateforme, sans friction et avec un taux de conversion superieur aux landing pages classiques.",
  },
];

const SERVICES = [
  {
    icon: MessageCircle,
    title: "Community management & engagement",
    description:
      "Gestion quotidienne de vos reseaux sociaux par un community manager dedie. Planification editoriale mensuelle, creation et publication de contenu, reponses aux commentaires et messages prives, moderation proactive et veille concurrentielle. Nous transformons vos abonnes en ambassadeurs de marque avec une strategie d'engagement qui humanise votre presence digitale en province de Liege.",
  },
  {
    icon: Camera,
    title: "Creation de contenu UGC & branding",
    description:
      "Visuels professionnels, videos courtes (Reels, TikToks, Shorts), carrousels educatifs, infographies et stories animees. Chaque piece de contenu est concue pour arreter le scroll et generer de l'engagement. Nous integrons les codes du User Generated Content (UGC) pour une authenticite maximale — le format qui genere 4x plus de clics que le contenu de marque traditionnel.",
  },
  {
    icon: Target,
    title: "Publicite ciblee & performance Ads",
    description:
      "Campagnes publicitaires multi-plateformes optimisees pour vos KPIs business : ROAS (Return On Ad Spend), CPA (Cout Par Acquisition), CTR (Taux de Clic) et taux de conversion. Nous construisons des funnels d'acquisition complets avec des campagnes de notoriete (top of funnel), d'engagement (middle of funnel) et de conversion (bottom of funnel). A/B testing systematique des creatives, audiences et copy pour maximiser chaque euro de budget publicitaire.",
  },
  {
    icon: BarChart3,
    title: "Reporting analytics & optimisation continue",
    description:
      "Tableaux de bord en temps reel avec les metriques qui comptent : reach, impressions, engagement rate, cout par resultat, ROAS, valeur de conversion. Chaque mois, vous recevez un rapport detaille avec les performances de vos campagnes organiques et payantes, les apprentissages cles et les recommandations d'optimisation pour la periode suivante. Tracking pixel, UTM et attribution multi-touch configures pour mesurer chaque point de contact du parcours client.",
  },
  {
    icon: Repeat2,
    title: "Retargeting & remarketing",
    description:
      "Ne laissez plus partir vos visiteurs sans les recapturer. Nous mettons en place des sequences de retargeting intelligentes : audiences de visiteurs du site, d'abandons de panier, d'interactions video et de formulaires non completes. Chaque segment recoit un message adapte a son niveau d'intention, avec des creatives dynamiques qui s'ajustent automatiquement au produit ou service consulte.",
  },
  {
    icon: Share2,
    title: "Strategie d'influence & partenariats locaux",
    description:
      "Identification et activation de micro-influenceurs en province de Liege et en Belgique francophone. Nous selectionnons des createurs de contenu alignes avec votre marque, negocions les partenariats et pilotons les campagnes d'influence de A a Z. Le marketing d'influence local genere un taux d'engagement 3 a 8 fois superieur aux grandes campagnes nationales, avec un cout par impression nettement inferieur.",
  },
];

const PROCESS = [
  {
    step: 1,
    title: "Audit social & benchmark concurrentiel",
    description:
      "Analyse approfondie de votre presence actuelle sur les reseaux sociaux : performances, audience, contenu, frequence. Nous etudions egalement vos concurrents directs en province de Liege pour identifier les opportunites inexploitees et definir les benchmarks a depasser.",
  },
  {
    step: 2,
    title: "Strategie & planning editorial",
    description:
      "Definition des objectifs SMART, choix des plateformes prioritaires, creation des personas d'audience et construction du planning editorial mensuel. Chaque publication est pensee dans un funnel global : awareness, engagement, conversion, fidelisation.",
  },
  {
    step: 3,
    title: "Production & diffusion du contenu",
    description:
      "Notre equipe creative produit l'ensemble des contenus : visuels, videos, textes, stories. Chaque format est optimise pour sa plateforme de diffusion. Les campagnes publicitaires sont lancees avec un targeting precis et un budget alloue selon les objectifs de chaque phase du funnel.",
  },
  {
    step: 4,
    title: "Analyse, optimisation & scaling",
    description:
      "Suivi quotidien des KPIs, A/B testing des creatives et des audiences, optimisation des encheres et du budget. Les campagnes performantes sont scalees progressivement tandis que les sous-performantes sont ajustees ou arretees. Rapport mensuel complet avec ROI detaille et recommandations.",
  },
];

export default function ReseauxSociauxPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-20 pb-16 md:pt-28 md:pb-20 relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-brand/5 blur-[100px]" />
        <div className="relative max-w-7xl mx-auto px-4 md:px-8">
          <div className="max-w-3xl">
            <span className="reveal inline-block px-4 py-1.5 text-sm font-medium text-brand bg-brand-dim rounded-full mb-4">
              Social Media Marketing — Liege, Province de Liege
            </span>
            <h1 className="reveal reveal-delay-1 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Social media marketing &{" "}
              <span className="gradient-text">publicite digitale</span> qui
              generent des resultats
            </h1>
            <p className="reveal reveal-delay-2 mt-6 text-lg text-text-secondary max-w-2xl leading-relaxed">
              Notre agence de social media marketing a Liege deploie des
              strategies multi-plateformes pour developper votre communaute,
              generer des leads qualifies et maximiser votre retour sur
              investissement publicitaire. Facebook Ads, Instagram, Google Ads,
              LinkedIn — chaque canal est orchestre pour transformer votre
              budget en croissance mesurable.
            </p>
            <div className="reveal reveal-delay-3 mt-8 flex flex-col sm:flex-row gap-4">
              <Button href="/contact" size="lg" className="pulse-glow">
                Audit social media gratuit
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
              Les reseaux sociaux ne sont plus un canal optionnel — ils sont
              devenus le premier point de contact entre votre marque et vos
              futurs clients. En province de Liege, plus de 80% de la
              population active utilise quotidiennement au moins une plateforme
              sociale. Facebook, Instagram, LinkedIn, TikTok : chacune offre un
              acces direct a une audience qualifiee, prete a decouvrir,
              interagir et acheter. Ignorer les reseaux sociaux, c&apos;est
              laisser le terrain a vos concurrents.
            </p>
            <p>
              Chez PrismaFlux, le social media marketing n&apos;est pas une
              question de likes et de followers. C&apos;est une strategie
              d&apos;acquisition a part entiere, pilotee par les donnees et
              orientee vers un objectif clair : generer du chiffre d&apos;affaires.
              Nous construisons des funnels complets — de la premiere impression
              publicitaire au retargeting de conversion — avec un suivi
              rigoureux du ROAS, du CPA et du taux de conversion a chaque etape.
              Comme un moteur bien regle, chaque composant de votre strategie
              sociale travaille en synergie pour maximiser la performance globale.
            </p>
            <p>
              Que vous soyez un commerce a Liege qui veut developper sa
              clientele locale, une PME a Seraing qui lance un nouveau produit,
              ou une entreprise B2B a Herstal qui cherche des leads qualifies,
              notre equipe de social media managers et media buyers deploie la
              strategie adaptee a votre marche, votre budget et vos ambitions.
            </p>
          </div>
        </div>
      </section>

      {/* Champ lexical social media */}
      <section className="py-16 md:py-20 bg-bg-surface/30">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <div className="reveal space-y-4 text-text-secondary leading-relaxed">
            <h2 className="text-2xl font-bold text-text">
              Les mecanismes du social media marketing, de la strategie a la conversion
            </h2>
            <p>
              Le <strong className="text-text">social media marketing</strong> repose sur deux moteurs complementaires :
              la <strong className="text-text">portee organique</strong> (reach non paye, conditionne par l&apos;algorithme)
              et la <strong className="text-text">portee payante</strong> (Paid Social via{" "}
              <strong className="text-text">Meta Ads Manager</strong>,{" "}
              <strong className="text-text">TikTok Ads</strong>,{" "}
              <strong className="text-text">LinkedIn Campaign Manager</strong>).
              Nos community managers construisent une presence organique authentique — planning editorial,
              <strong className="text-text"> calendrier de publication</strong>,{" "}
              <strong className="text-text">storytelling de marque</strong>,{" "}
              <strong className="text-text">UGC</strong> (User Generated Content) — pendant que nos media buyers
              optimisent chaque centime de budget publicitaire pour maximiser le{" "}
              <strong className="text-text">ROAS</strong> (Return On Ad Spend).
            </p>
            <p>
              Sur Meta (Facebook & Instagram), nous maitrisonsle <strong className="text-text">Pixel Meta</strong> et
              l&apos;<strong className="text-text">API Conversions</strong> pour un tracking fiable malgre iOS 14+.
              Nous construisons des <strong className="text-text">audiences personnalisees</strong> (custom audiences
              basees sur vos visiteurs web, vos listes clients, vos interactions video) et des{" "}
              <strong className="text-text">audiences similaires</strong> (lookalike 1-3%) pour scaler vos acquisitions
              vers des prospects qui ressemblent a vos meilleurs clients. Nos sequences de{" "}
              <strong className="text-text">retargeting dynamique</strong> — avec des creatives qui s&apos;adaptent
              automatiquement au produit ou service consulte — reduisent le{" "}
              <strong className="text-text">CPA</strong> (Cout Par Acquisition) de 30 a 50% en moyenne.
            </p>
            <p>
              Pour les campagnes <strong className="text-text">Google Ads</strong>, nous gerons les{" "}
              <strong className="text-text">Smart Bidding</strong> (Target CPA, Target ROAS, Maximize Conversions),
              les <strong className="text-text">extensions d&apos;annonces</strong> (sitelinks, callouts, structured snippets,
              call extensions), le <strong className="text-text">Quality Score</strong> et la{" "}
              <strong className="text-text">pertinence semantique</strong> entre mots-cles, annonces et pages de
              destination. Sur YouTube, nous concevons des{" "}
              <strong className="text-text">bumper ads</strong> (6 secondes),{" "}
              <strong className="text-text">TrueView in-stream</strong> (skippable) et{" "}
              <strong className="text-text">Discovery ads</strong> pour toucher votre audience dans ses moments de curiosite.
            </p>
            <p>
              Chaque mois, vous recevez un rapport d&apos;attribution qui reconcilie vos donnees{" "}
              <strong className="text-text">Meta Ads</strong>,{" "}
              <strong className="text-text">Google Ads</strong> et{" "}
              <strong className="text-text">Google Analytics 4</strong> via des{" "}
              <strong className="text-text">UTM parameters</strong> et un modele d&apos;attribution{" "}
              <strong className="text-text">multi-touch</strong>. Vous savez exactement quels canaux generent
              du chiffre d&apos;affaires pour votre entreprise en province de Liege — sans approximation.
            </p>
          </div>
        </div>
      </section>

      {/* Plateformes */}
      <section className="py-20 md:py-28 bg-bg-surface/30">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="reveal">
            <SectionHeading
              badge="Les plateformes ou nous generons vos resultats"
              title="Publicite digitale multi-plateforme en province de Liege"
              subtitle="Chaque plateforme a son audience, ses codes et son algorithme. Nous exploitons le potentiel specifique de chacune pour construire un ecosysteme d'acquisition complet et rentable."
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {PLATFORMS.map((p, i) => {
              const Icon = p.icon;
              return (
                <Card key={p.name} className={`reveal reveal-delay-${(i % 2) + 1}`}>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-dim flex items-center justify-center shrink-0">
                      <Icon size={24} className="text-brand" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-text mb-2">
                        {p.name}
                      </h3>
                      <p className="text-sm text-text-secondary leading-relaxed">
                        {p.description}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Ce que nous faisons */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="reveal">
            <SectionHeading
              badge="Nos services de social media marketing"
              title="Ce que nous deployons pour votre croissance"
              subtitle="Du community management a la publicite ciblee, chaque service est concu pour generer un impact mesurable sur votre chiffre d'affaires."
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SERVICES.map((item, i) => {
              const Icon = item.icon;
              return (
                <Card key={item.title} className={`reveal reveal-delay-${(i % 2) + 1}`}>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-brand-dim flex items-center justify-center shrink-0">
                      <Icon size={20} className="text-brand" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-text mb-1">
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

      {/* Processus */}
      <section className="py-20 md:py-28 bg-bg-surface/30">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="reveal">
            <SectionHeading
              badge="Notre processus social media"
              title="De l'audit au scaling de vos campagnes"
              subtitle="Un processus structure en 4 etapes pour transformer vos reseaux sociaux en machine d'acquisition."
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

      {/* Chiffres cles */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="reveal">
            <SectionHeading
              badge="Chiffres cles"
              title="Des resultats concrets pour nos clients en province de Liege"
            />
          </div>
          <div className="reveal reveal-delay-1 grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: "+250%", label: "D'engagement moyen sur les comptes geres" },
              { value: "-40%", label: "De CPA (cout par acquisition) apres optimisation" },
              { value: "3x", label: "Plus de conversions vs gestion en interne" },
              { value: "+180%", label: "De reach organique et payant combine" },
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
              title="Ce qui differencie PrismaFlux des autres agences social media a Liege"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Zap, title: "Performance avant vanite", text: "Nous ne vendons pas des likes — nous vendons de la croissance. Chaque campagne est pilotee par les KPIs business (ROAS, CPA, leads, ventes) et non par les metriques de vanite. Votre budget publicitaire travaille pour votre chiffre d'affaires." },
              { icon: Eye, title: "Transparence totale & reporting", text: "Acces en temps reel a vos dashboards publicitaires. Rapport mensuel detaille avec chaque euro depense, chaque resultat obtenu et chaque recommandation argumentee. Pas de zone grise, pas de frais caches." },
              { icon: Layers, title: "Expertise locale, vision globale", text: "Basee a Liege, notre equipe connait le tissu economique de la province, les habitudes de consommation locales et les opportunites de ciblage specifiques au marche belge. Nous combinons cette expertise locale avec les best practices internationales du social advertising." },
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
      <FAQSection faqs={SERVICE_FAQS["reseaux-sociaux"]} />

      <LeadMagnet />

      <FinalCTA
        title="Pret a booster vos reseaux sociaux a Liege ?"
        subtitle="Audit social media gratuit de votre presence en ligne. Decouvrez vos opportunites de croissance sur les reseaux sociaux en province de Liege sous 24h."
        buttonText="Demander mon audit social media"
      />
    </>
  );
}

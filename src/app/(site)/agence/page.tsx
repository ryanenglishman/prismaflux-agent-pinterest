import type { Metadata } from "next";
import {
  Heart,
  Award,
  Lightbulb,
  Gauge,
  MapPin,
  Zap,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "L'Agence de Marketing Digital — PrismaFlux Liege",
  description:
    "Decouvrez PrismaFlux, agence de marketing digital a Liege, province de Liege. Notre mission : accelerer la croissance digitale des entreprises belges via le SEO, le social media, la conception web et la strategie marketing.",
  alternates: {
    canonical: "/agence",
  },
};

const VALUES = [
  {
    icon: Heart,
    title: "Proximite & ancrage liegeois",
    description:
      "Notre agence est ancree au coeur de Liege. Nous connaissons le tissu economique de la province, des Guillemins a Outremeuse, de Huy a Verviers. Cette proximite nous permet d'offrir un accompagnement sur mesure, avec un interlocuteur dedie qui comprend vos enjeux locaux.",
  },
  {
    icon: Award,
    title: "Excellence & performance mesurable",
    description:
      "Comme en sport automobile, nous sommes obsedes par la performance. Chaque action de marketing digital est mesuree, chaque KPI est traque, chaque euro investi est optimise. Taux de conversion, cout d'acquisition, ROAS : nous pilotons votre croissance au millimetre.",
  },
  {
    icon: Lightbulb,
    title: "Innovation & technologies de pointe",
    description:
      "Intelligence artificielle, marketing automation, analyse predictive, chatbots : nous integrons les innovations les plus recentes du marketing digital dans votre strategie. Nos sites web sont developpes avec Next.js et React pour des performances Lighthouse 90+.",
  },
  {
    icon: Gauge,
    title: "Vitesse d'execution & agilite",
    description:
      "Le monde digital n'attend pas. Notre methode agile nous permet de deployer rapidement vos campagnes SEO, vos publicites digitales et vos contenus social media. Time-to-market reduit, iterations rapides, resultats acceleres.",
  },
];

const TOOLS = [
  { name: "Next.js", category: "Developpement web" },
  { name: "React", category: "Developpement web" },
  { name: "Tailwind CSS", category: "Developpement web" },
  { name: "TypeScript", category: "Developpement web" },
  { name: "Vercel", category: "Hebergement cloud" },
  { name: "Google Analytics 4", category: "Web analytics" },
  { name: "Google Search Console", category: "SEO" },
  { name: "SEMrush", category: "SEO & SEM" },
  { name: "Ahrefs", category: "SEO & Netlinking" },
  { name: "Meta Business Suite", category: "Social media marketing" },
  { name: "Google Ads", category: "Publicite digitale (SEA)" },
  { name: "Figma", category: "UX/UI Design" },
  { name: "Brevo (Sendinblue)", category: "Email marketing" },
  { name: "HubSpot", category: "CRM & Marketing automation" },
  { name: "Hotjar", category: "UX & Heatmaps" },
  { name: "ChatGPT / Claude IA", category: "Intelligence artificielle" },
];

const EXPERTISE_AREAS = [
  "Conception de sites web",
  "Referencement naturel (SEO)",
  "Social media marketing",
  "Publicite digitale (SEA)",
  "Strategie de contenu",
  "Marketing automation",
  "Email marketing",
  "Branding digital",
  "UX/UI Design",
  "Web analytics",
  "E-commerce",
  "SEO local",
];

export default function AgencePage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-20 pb-16 md:pt-28 md:pb-20 relative overflow-hidden">
        <div className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full bg-brand/5 blur-[100px]" />
        {/* Speed line accent */}
        <div className="speed-line speed-line-1" />
        <div className="relative max-w-7xl mx-auto px-4 md:px-8">
          <div className="max-w-3xl">
            <span className="reveal inline-block px-4 py-1.5 text-sm font-medium text-brand bg-brand-dim rounded-full mb-4">
              Agence de marketing digital — Liege, Belgique
            </span>
            <h1 className="reveal reveal-delay-1 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              <span className="gradient-text">PrismaFlux</span>, le moteur de
              votre croissance digitale en province de Liege
            </h1>
            <p className="reveal reveal-delay-2 mt-6 text-lg text-text-secondary max-w-2xl">
              Nous sommes une agence de marketing digital basee a Liege,
              specialisee dans la conception de sites web haute performance, le
              referencement naturel Google, le social media marketing et la
              publicite digitale. Notre mission : transformer votre presence en
              ligne en un veritable moteur d&apos;acquisition de clients.
            </p>
          </div>
        </div>
      </section>

      {/* Notre histoire */}
      <section className="py-20 md:py-28 bg-bg-surface/30">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="flex-1">
              <div className="reveal">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 text-sm font-medium text-brand bg-brand-dim rounded-full mb-4">
                  <MapPin size={14} />
                  Notre ADN liegeois
                </span>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text mb-6">
                  Nee de la passion du marketing digital, ancree en province de
                  Liege
                </h2>
              </div>
              <div className="reveal reveal-delay-1 space-y-4 text-text-secondary leading-relaxed">
                <p>
                  PrismaFlux est nee d&apos;un constat simple : de nombreuses
                  entreprises en province de Liege ont un savoir-faire
                  remarquable, mais leur presence en ligne ne le reflete pas.
                  Un site vieillissant, un referencement inexistant, une
                  absence sur les reseaux sociaux — et pendant ce temps, la
                  concurrence capte les clients sur Google.
                </p>
                <p>
                  Notre equipe reunit des specialistes du marketing digital, de
                  la conception web et de la strategie d&apos;acquisition. Parmi
                  eux, Mathieu Visiere — fondateur du studio{" "}
                  <a
                    href="https://pixel-pop.studio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand hover:underline"
                  >
                    pixel-pop.studio
                  </a>{" "}
                  — apporte son expertise en design et developpement web avec
                  plus de 50 projets livres pour des SaaS, agences et
                  entreprises en croissance.
                </p>
                <p>
                  Basee a Liege, notre agence intervient dans toute la province
                  — de Huy a Verviers, de Seraing a Herstal. Nous ne vendons pas
                  de templates : chaque projet est concu sur mesure, avec une
                  approche qui combine strategie, design et technologie pour
                  generer des resultats mesurables.
                </p>
              </div>
            </div>
            <div className="flex-1 w-full">
              <div className="reveal glass-card p-8 md:p-12">
                {/* Gauge SVG — automotive accent */}
                <div className="flex justify-center mb-8">
                  <svg width="120" height="70" viewBox="0 0 120 70" fill="none">
                    <path
                      d="M10 65 A50 50 0 0 1 110 65"
                      stroke="currentColor"
                      strokeOpacity="0.1"
                      strokeWidth="6"
                      strokeLinecap="round"
                      fill="none"
                    />
                    <path
                      d="M10 65 A50 50 0 0 1 100 30"
                      stroke="#FF1744"
                      strokeWidth="6"
                      strokeLinecap="round"
                      fill="none"
                      className="gauge-ring"
                      style={{ strokeDasharray: 160, strokeDashoffset: 160 }}
                    />
                    <circle cx="60" cy="65" r="4" fill="#FF1744" />
                    <text x="60" y="55" textAnchor="middle" fill="currentColor" fontSize="10" opacity="0.5">
                      PERFORMANCE
                    </text>
                  </svg>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-brand">50+</p>
                    <p className="text-sm text-text-secondary mt-1">
                      Projets web deployes
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-brand">92%</p>
                    <p className="text-sm text-text-secondary mt-1">
                      Clients en 1ere page Google
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-brand">4.9/5</p>
                    <p className="text-sm text-text-secondary mt-1">
                      Satisfaction client
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-brand">15+</p>
                    <p className="text-sm text-text-secondary mt-1">
                      Communes en province de Liege
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Valeurs */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="reveal">
            <SectionHeading
              badge="Les piliers de notre agence"
              title="Ce qui fait tourner le moteur PrismaFlux"
              subtitle="Quatre valeurs qui guident chacune de nos actions en marketing digital."
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {VALUES.map((v, i) => {
              const Icon = v.icon;
              return (
                <Card key={v.title} className={`reveal reveal-delay-${(i % 2) + 1} tacho-accent`}>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-dim flex items-center justify-center shrink-0">
                      <Icon size={24} className="text-brand" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-text mb-2">
                        {v.title}
                      </h3>
                      <p className="text-sm text-text-secondary leading-relaxed">
                        {v.description}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Equipe */}
      <section className="py-20 md:py-28 bg-bg-surface/30">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="reveal">
            <SectionHeading
              badge="L'equipe"
              title="Les personnes derriere PrismaFlux"
              subtitle="Une equipe de specialistes du marketing digital, chacun expert dans son domaine."
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="reveal reveal-delay-1">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-brand-dim flex items-center justify-center shrink-0 text-xl font-bold text-brand">
                  E
                </div>
                <div>
                  <h3 className="text-lg font-bold text-text">Eric</h3>
                  <p className="text-sm text-brand mb-2">Fondateur & Strategie digitale</p>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    Entrepreneur base a Liege, Eric a fonde PrismaFlux avec la
                    conviction que chaque entreprise locale merite une presence
                    digitale a la hauteur de son savoir-faire. Il pilote la
                    strategie marketing digital, le referencement et la relation
                    client.
                  </p>
                </div>
              </div>
            </Card>
            <Card className="reveal reveal-delay-2">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-brand-dim flex items-center justify-center shrink-0 text-xl font-bold text-brand">
                  M
                </div>
                <div>
                  <h3 className="text-lg font-bold text-text">Mathieu Visiere</h3>
                  <p className="text-sm text-brand mb-2">
                    Design & Developpement web —{" "}
                    <a
                      href="https://pixel-pop.studio"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      pixel-pop.studio
                    </a>
                  </p>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    Fondateur du studio pixel-pop.studio, Mathieu apporte plus de
                    50 projets web livres pour des SaaS, agences et entreprises en
                    croissance. Specialiste Framer, design UX/UI et copywriting
                    oriente conversion.
                  </p>
                </div>
              </div>
            </Card>
            <Card className="reveal reveal-delay-1">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-brand-dim flex items-center justify-center shrink-0 text-xl font-bold text-brand">
                  PA
                </div>
                <div>
                  <h3 className="text-lg font-bold text-text">Paul-Alexandre Prunetti</h3>
                  <p className="text-sm text-brand mb-2">
                    Web Design & Identite visuelle —{" "}
                    <a
                      href="https://propulse.design"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      propulse.design
                    </a>
                  </p>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    Fondateur de l&apos;agence Propulse a Marseille, Paul-Alexandre
                    a realise plus de 100 projets web depuis 2015. Specialiste
                    Framer et identites visuelles pour startups, entrepreneurs et
                    professions liberales.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Partenaire */}
          <div className="mt-8">
            <p className="reveal text-sm text-text-muted text-center mb-4">Partenaire SEO</p>
            <Card className="reveal reveal-delay-1 max-w-lg mx-auto">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-brand-dim flex items-center justify-center shrink-0 text-xl font-bold text-brand">
                  RW
                </div>
                <div>
                  <h3 className="text-lg font-bold text-text">ReferencielWeb</h3>
                  <p className="text-sm text-brand mb-2">
                    Partenaire SEO & Creation WordPress —{" "}
                    <a
                      href="https://referenciel-web.fr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      referenciel-web.fr
                    </a>
                  </p>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    Elise Ringler, specialiste en creation de sites WordPress et
                    referencement naturel basee a Colmar (Alsace). Son expertise
                    SEO complete notre offre pour les projets necessitant un
                    ecosysteme WordPress optimise.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Expertises */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="reveal">
            <SectionHeading
              badge="Nos domaines d'expertise"
              title="Marketing digital : toutes nos competences"
              subtitle="De la conception web a la strategie d'acquisition, chaque discipline du marketing digital est maitrisee en interne."
            />
          </div>
          <div className="reveal reveal-delay-1 flex flex-wrap justify-center gap-3">
            {EXPERTISE_AREAS.map((area) => (
              <span
                key={area}
                className="px-4 py-2 text-sm rounded-full bg-bg-card border border-border text-text-secondary hover:border-brand hover:text-brand transition-colors"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Stack technique */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="reveal">
            <SectionHeading
              badge="Notre arsenal technologique"
              title="Les outils qui propulsent vos performances"
              subtitle="Nous selectionnons les meilleurs outils de marketing digital, de developpement web et d'analyse pour chaque mission."
            />
          </div>
          <div className="reveal reveal-delay-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {TOOLS.map((tool) => (
              <div
                key={tool.name}
                className="glass-card p-3 flex flex-col"
              >
                <span className="text-sm font-medium text-text">
                  {tool.name}
                </span>
                <span className="text-xs text-text-muted mt-0.5">
                  {tool.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA
        title="Demarrez votre transformation digitale"
        subtitle="Diagnostic gratuit de votre presence en ligne en province de Liege. Devis sur mesure sous 24h."
        buttonText="Demander mon audit digital gratuit"
      />
    </>
  );
}

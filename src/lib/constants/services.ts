import {
  Globe,
  Search,
  Share2,
  TrendingUp,
  Video,
  type LucideIcon,
} from "lucide-react";

export interface Service {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  longDescription: string;
  icon: LucideIcon;
  href: string;
  features: string[];
  keywords: string[];
}

export const SERVICES: Service[] = [
  {
    id: "creation-site-web",
    title: "Conception de sites web professionnels",
    shortTitle: "Web Design",
    description:
      "Sites internet haute performance, concus pour convertir et optimises pour le referencement naturel. Votre vitrine digitale a la hauteur de vos ambitions.",
    longDescription:
      "Notre agence de marketing digital a Liege conçoit des sites web sur mesure qui combinent design premium, experience utilisateur fluide et optimisation SEO native. Du site vitrine au e-commerce, chaque projet est developpe avec les technologies web les plus performantes (Next.js, React) pour garantir des temps de chargement record et un taux de conversion maximal. Nous accompagnons les entreprises de la province de Liege — de la Place Saint-Lambert aux Guillemins — dans leur transformation numerique.",
    icon: Globe,
    href: "/services/creation-site-web",
    features: [
      "Design UX/UI sur mesure et responsive design",
      "Optimisation technique SEO on-page integree",
      "Architecture de l'information et tunnel de conversion",
      "Hebergement cloud performant et certificat SSL",
      "Formation a la gestion de contenu (CMS)",
      "Conformite RGPD et accessibilite WCAG",
    ],
    keywords: [
      "creation site web liege",
      "agence web province liege",
      "conception site internet professionnel belgique",
      "developpeur web liege",
      "site web entreprise liege",
    ],
  },
  {
    id: "referencement-google",
    title: "Referencement naturel Google (SEO)",
    shortTitle: "SEO",
    description:
      "Pilotez votre visibilite organique vers le top 3 de Google. Audit SEO, optimisation on-page, strategie de contenu et netlinking pour un trafic qualifie durable.",
    longDescription:
      "Le referencement naturel est le moteur de votre acquisition digitale. Notre equipe d'experts SEO a Liege deploie une methodologie eprouvee : audit technique complet, recherche semantique de mots-cles a fort potentiel, optimisation on-page et off-page, maillage interne strategique et strategie de content marketing. Nous propulsons les entreprises liegeoise en pole position sur les requetes qui generent du chiffre d'affaires — en province de Liege et au-dela.",
    icon: Search,
    href: "/services/referencement-google",
    features: [
      "Audit SEO technique et semantique complet",
      "Recherche de mots-cles et analyse concurrentielle",
      "Optimisation on-page (balises, contenu, maillage interne)",
      "Strategie de content marketing et blog SEO",
      "Netlinking et renforcement de l'autorite de domaine",
      "Tableau de bord SEO et reporting mensuel KPIs",
    ],
    keywords: [
      "referencement google liege",
      "agence SEO province de liege",
      "optimisation referencement naturel belgique",
      "expert SEO liege",
      "premiere page google liege",
    ],
  },
  {
    id: "reseaux-sociaux",
    title: "Social media marketing & Publicite digitale",
    shortTitle: "Social Media",
    description:
      "Embrayez sur les reseaux sociaux pour developper votre notoriete de marque, engager votre communaute et generer des leads via la publicite ciblee.",
    longDescription:
      "Le social media marketing est un levier incontournable de votre strategie de marketing digital. Notre agence a Liege gere votre presence sur Facebook, Instagram, LinkedIn, Google Ads et Pinterest avec une approche data-driven : creation de contenu engageant, community management, campagnes publicitaires a haute conversion et social listening. Chaque euro investi est optimise pour maximiser votre retour sur investissement publicitaire (ROAS) aupres de votre cible en province de Liege et en Belgique.",
    icon: Share2,
    href: "/services/reseaux-sociaux",
    features: [
      "Strategie social media et calendrier editorial",
      "Community management et engagement",
      "Publicite Facebook Ads et Instagram Ads",
      "Campagnes Google Ads (Search, Display, Shopping)",
      "Creation de contenu visuel et video",
      "Reporting analytics et optimisation ROAS",
    ],
    keywords: [
      "agence social media liege",
      "gestion reseaux sociaux province liege",
      "publicite facebook instagram liege",
      "community management belgique",
      "google ads liege",
    ],
  },
  {
    id: "strategie-digitale",
    title: "Strategie de marketing digital 360°",
    shortTitle: "Strategie",
    description:
      "Un plan de route digital complet : de l'audit a l'execution, chaque canal est orchestre pour piloter votre croissance en ligne et votre notoriete de marque.",
    longDescription:
      "Une strategie de marketing digital efficace est la feuille de route de votre reussite en ligne. Notre agence a Liege elabore des plans d'action multi-canaux qui alignent SEO, SEA, social media, email marketing et marketing automation pour creer un ecosysteme digital performant. De l'analyse de marche a la mesure du ROI, en passant par l'integration de solutions d'intelligence artificielle, nous pilotons votre croissance digitale avec precision — comme un bolide parfaitement regle sur le circuit du marketing digital.",
    icon: TrendingUp,
    href: "/services/strategie-digitale",
    features: [
      "Audit 360° de votre presence digitale",
      "Definition de la strategie d'acquisition digitale",
      "Plan d'action multi-canal (SEO, SEA, social, email)",
      "Marketing automation et nurturing de leads",
      "Integration de solutions IA et chatbots",
      "Pilotage KPIs et optimisation continue du ROI",
    ],
    keywords: [
      "strategie marketing digital liege",
      "agence marketing digital province liege",
      "consultant digital belgique",
      "plan marketing digital liege",
      "transformation digitale entreprise liege",
    ],
  },
  {
    id: "spots-publicitaires",
    title: "Production de spots publicitaires video",
    shortTitle: "Spots Video",
    description:
      "Des spots video percutants pour accelerer votre notoriete de marque sur tous les ecrans — du feed Instagram a la television.",
    longDescription:
      "Notre agence produit des spots publicitaires video haut de gamme pour le web, les reseaux sociaux et la television. Du briefing creatif et du storyboard au montage final, a l'etalonnage colorimetrique et au sound design, chaque production est concue pour capter l'attention de votre audience cible en province de Liege et generer un impact mesurable sur vos KPIs marketing.",
    icon: Video,
    href: "/services/spots-publicitaires",
    features: [
      "Spots publicitaires pour social media ads",
      "Films corporate et institutionnels",
      "Teasers produit et lancement de marque",
      "Scripting, storyboard et direction artistique",
      "Tournage HD/4K et post-production professionnelle",
      "Declinaison multi-format et distribution cross-platform",
    ],
    keywords: [
      "spot publicitaire video liege",
      "production video publicitaire belgique",
      "agence video marketing liege",
      "spot pub reseaux sociaux liege",
    ],
  },
];

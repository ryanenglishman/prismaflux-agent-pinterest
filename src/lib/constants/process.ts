import { ClipboardCheck, Lightbulb, Rocket, BarChart3, type LucideIcon } from "lucide-react";

export interface ProcessStep {
  number: number;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: 1,
    title: "Diagnostic digital gratuit",
    description:
      "Comme un check-up complet avant la course : nous auditons votre site web, votre referencement, vos reseaux sociaux et votre positionnement concurrentiel en province de Liege.",
    icon: ClipboardCheck,
  },
  {
    number: 2,
    title: "Feuille de route strategique",
    description:
      "Nous elaborons un plan d'action marketing digital sur mesure : objectifs SMART, canaux d'acquisition prioritaires, budget media et calendrier de deploiement.",
    icon: Lightbulb,
  },
  {
    number: 3,
    title: "Deploiement & Execution",
    description:
      "Notre equipe passe a l'action : conception web, optimisation SEO, lancement des campagnes publicitaires et creation de contenu — tout roule a plein regime.",
    icon: Rocket,
  },
  {
    number: 4,
    title: "Pilotage & Optimisation continue",
    description:
      "Suivi des KPIs en temps reel, A/B testing, ajustements strategiques et reporting mensuel transparent. Votre croissance digitale est pilotee au millimetre.",
    icon: BarChart3,
  },
];

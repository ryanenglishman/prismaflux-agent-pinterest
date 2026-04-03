export interface PortfolioProject {
  title: string;
  client: string;
  category: "site" | "seo" | "social" | "strategie";
  description: string;
  result: string;
  tags: string[];
  url: string;
  ogImage?: string;
}

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    title: "Site multilingue cybersecurite — Rigma",
    client: "Rigma by Mobeta",
    category: "site",
    description:
      "Creation d'un site multilingue pour clarifier l'offre de cybersecurite de Rigma. Proposition de valeur lisible des les premieres secondes, parcours utilisateur structure pour les equipes techniques et les decideurs.",
    result: "2 Cybernight Awards, lancement version SaaS",
    tags: ["Framer", "Multilingue", "SaaS B2B", "Cybersecurite"],
    url: "https://rigma.io",
    ogImage: "https://framerusercontent.com/images/Hmgp30VwnWrTeMYU7mAW3d7A.png",
  },
  {
    title: "Lancement international — Krilup",
    client: "Krilup",
    category: "strategie",
    description:
      "Conception du site web pour structurer l'offre Krilup et lancer son acquisition a l'international. Strategie de positionnement, copywriting oriente conversion et design adapte au marche global.",
    result: "Lancement acquisition internationale",
    tags: ["Strategie", "International", "Acquisition", "LinkedIn"],
    url: "https://krilup.com",
    ogImage: "https://framerusercontent.com/images/evCUh0r6sN5kid4A7TyrBIuep3k.png",
  },
  {
    title: "Refonte multipages — Hubicom",
    client: "Hubicom",
    category: "site",
    description:
      "Refonte du site multipages pour clarifier l'offre d'automatisation et renforcer la credibilite de l'agence. Direction artistique premium, message clarifie, architecture autonome et perenne.",
    result: "Impact renforce, design premium, valeur percue amelioree",
    tags: ["Framer", "Agence", "Automation", "No-code"],
    url: "https://hubicom.fr",
    ogImage: "https://framerusercontent.com/images/IyOmkU7FWSsYYJBexIVjUpfUeKk.png",
  },
  {
    title: "Site vitrine SaaS — MagicPost",
    client: "MagicPost",
    category: "site",
    description:
      "Creation du site vitrine pour la plateforme SaaS MagicPost. Approche centree sur la narration et l'adaptation du design a l'audience cible, au-dela de la simple construction de pages.",
    result: "Site qui pense l'approche et la narration, pas juste le design",
    tags: ["SaaS", "Startup", "Narration", "Branding"],
    url: "https://magicpost.io",
    ogImage: "https://magicpost.io/wp-content/uploads/TU_IMAGEN_PREVIEW.jpg",
  },
  {
    title: "Landing page SaaS — GemFlow",
    client: "GemFlow",
    category: "site",
    description:
      "Conception d'une landing page SaaS orientee conversion pour GemFlow, plateforme de devis pour bijoutiers. Design sur mesure, identite visuelle et copywriting strategique pour maximiser la conversion.",
    result: "Landing page haute conversion deployee",
    tags: ["Framer", "SaaS", "Landing page", "Conversion"],
    url: "https://gemflow.tech",
  },
];

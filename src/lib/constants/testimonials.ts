export interface Testimonial {
  name: string;
  company: string;
  role: string;
  quote: string;
  rating: number;
  service: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Naile Titah",
    company: "MagicPost",
    role: "Fondatrice",
    quote:
      "Il ne se contente pas de construire des sites : il pense l'approche et la narration, en adaptant le design a votre audience. Le resultat va bien au-dela de ce qu'on imaginait.",
    rating: 5,
    service: "Site web + Strategie",
  },
  {
    name: "Fabien Ugo",
    company: "Hubicom",
    role: "Co-fondateur",
    quote:
      "Le parcours utilisateur est devenu clair et rassurant. Message clarifie, impact renforce, design premium et valeur percue amelioree. Exactement ce dont on avait besoin pour credibiliser notre agence.",
    rating: 5,
    service: "Refonte site web",
  },
  {
    name: "Arthur Le Corguille",
    company: "Rigma by Mobeta",
    role: "Co-fondateur",
    quote:
      "Le copywriting est directement extrait de la realite produit, avec un veritable impact sur nos prospects. Les resultats depassent nos attentes.",
    rating: 5,
    service: "Site SaaS multilingue",
  },
  {
    name: "Sebastien Leroy",
    company: "L'Orange Bleue",
    role: "Dirigeant",
    quote:
      "Les resultats ont depasse nos attentes. Un travail serieux, structure et livre dans les temps. On recommande sans hesiter.",
    rating: 5,
    service: "Site web + SEO",
  },
];

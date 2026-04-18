export interface CityData {
  slug: string;
  name: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  localText: string;
  distance: string;
}

export const CITIES_DATA: Record<string, CityData> = {
  huy: {
    slug: "huy",
    name: "Huy",
    description:
      "Situee au confluent de la Meuse et du Hoyoux, Huy est une ville dynamique ou les commerces et PME beneficient d'un bassin de clientele fidele. Notre agence accompagne les entreprises hutoises dans leur transformation digitale.",
    metaTitle: "Agence Web a Huy — Creation de sites & SEO | PrismaFlux",
    metaDescription:
      "Agence web pres de Huy. Creation de sites internet professionnels et referencement Google pour les entreprises de Huy et environs. Devis gratuit.",
    localText:
      "De la Grand-Place au fort de Huy, les entreprises hutoises meritent une visibilite digitale a la hauteur de leur savoir-faire. Nous comprenons les enjeux locaux et adaptons nos strategies.",
    distance: "a 30 min de Liege",
  },
  seraing: {
    slug: "seraing",
    name: "Seraing",
    description:
      "Ville en pleine reconversion economique, Seraing regorge d'entreprises innovantes et de commerces qui ont besoin d'une presence en ligne forte pour se demarquer.",
    metaTitle: "Agence Web a Seraing — Creation de sites & SEO | PrismaFlux",
    metaDescription:
      "Agence web a Seraing. Sites internet sur mesure et referencement Google pour les entreprises seresiennes. A 15 min de Liege. Devis gratuit.",
    localText:
      "Seraing se reinvente, et ses entreprises aussi. Du Val Saint-Lambert a Boncelles, nous aidons les professionnels seresiens a capter une clientele connectee.",
    distance: "a 15 min de Liege",
  },
  sprimont: {
    slug: "sprimont",
    name: "Sprimont",
    description:
      "Commune verte et residentielle, Sprimont abrite de nombreux independants et PME qui servent une clientele locale exigeante. Le digital est leur levier de croissance.",
    metaTitle: "Agence Web a Sprimont — Creation de sites & SEO | PrismaFlux",
    metaDescription:
      "Agence web pres de Sprimont. Sites web professionnels et SEO pour les entreprises de Sprimont et environs. A 20 min de Liege.",
    localText:
      "Les entreprises de Sprimont et des communes voisines (Aywaille, Esneux, Comblain) beneficient d'un marche local en forte demande digitale. Nous les aidons a etre trouvees en ligne.",
    distance: "a 20 min de Liege",
  },
  herstal: {
    slug: "herstal",
    name: "Herstal",
    description:
      "Berceau industriel historique, Herstal est aujourd'hui un pole economique majeur de l'agglomeration liegeoise avec un tissu commercial dense et diversifie.",
    metaTitle: "Agence Web a Herstal — Creation de sites & SEO | PrismaFlux",
    metaDescription:
      "Agence web a Herstal. Creation de sites internet et referencement Google pour les entreprises herstaliennes. A 10 min de Liege.",
    localText:
      "D'Herstal a Vottem, les commerces et entreprises de la rive droite de la Meuse ont tout a gagner d'une presence digitale optimisee. Nous sommes a quelques minutes pour vous accompagner.",
    distance: "a 10 min de Liege",
  },
  verviers: {
    slug: "verviers",
    name: "Verviers",
    description:
      "Deuxieme ville de la province, Verviers est un marche a fort potentiel digital ou la concurrence en ligne reste encore moderee — un avantage strategique pour les entreprises locales.",
    metaTitle: "Agence Web a Verviers — Creation de sites & SEO | PrismaFlux",
    metaDescription:
      "Agence web pour Verviers. Sites internet professionnels et referencement Google pour les entreprises vervietoises. Devis gratuit.",
    localText:
      "Verviers et l'arrondissement offrent un terreau fertile pour le SEO local. Avec une concurrence encore moderee sur Google, c'est le moment ideal pour investir dans votre visibilite.",
    distance: "a 30 min de Liege",
  },
};

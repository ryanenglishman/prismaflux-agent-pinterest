/**
 * Generates personalized narrative texts based on scan data.
 * These texts give the report a consulting-firm feel rather than raw data.
 * Marcus speaks with authority, clarity, and constructive directness.
 */

import type { AuditReportData } from "../types";

export function generateNarrative(data: AuditReportData) {
  const d = data;
  const errorsCount = d.technicalChecks.filter(c => c.status === "error").length + d.seoChecks.filter(c => c.status === "error").length;
  const warningsCount = d.technicalChecks.filter(c => c.status === "warn").length + d.seoChecks.filter(c => c.status === "warn").length;
  const okCount = d.technicalChecks.filter(c => c.status === "ok").length + d.seoChecks.filter(c => c.status === "ok").length;
  const socialFound = d.socialMedia.filter(s => s.found).length;
  const hasAnalytics = d.technicalExtras.hasGoogleAnalytics || d.technicalExtras.hasGoogleTagManager;

  return {
    // --- Cover ---
    coverIntro: `Ce rapport presente une analyse independante et detaillee de la presence digitale de ${d.dealerName}. Il identifie les forces, les faiblesses et les opportunites d'optimisation, avec des recommandations concretes et hierarchisees.`,

    // --- Synthese ---
    executiveSummary: generateExecutiveSummary(d, errorsCount, warningsCount, okCount),
    technicalVerdict: generateTechnicalVerdict(d, hasAnalytics),
    seoVerdict: generateSeoVerdict(d),

    // --- Presence ---
    localVerdict: generateLocalVerdict(d),
    socialVerdict: generateSocialVerdict(d, socialFound),
    competitorVerdict: d.competitors.length > 0
      ? `L'analyse comparative revele que ${d.dealerName} evolue dans un environnement concurrentiel actif. Les concessionnaires qui investissent dans le digital — avis Google, referencement local, contenu regulier — captent une part croissante des recherches en ligne. Chaque mois sans action est un mois ou les concurrents progressent.`
      : `Sans donnees concurrentielles disponibles, il est recommande de surveiller les 3 a 5 concessionnaires principaux de la zone de ${d.dealerCity} pour evaluer l'ecart de visibilite et definir des objectifs de rattrapage.`,

    // --- Impact ---
    timeIntro: `Pour une concession gerant ${d.vehicleCount} vehicules, les taches administratives et digitales representent un investissement en temps considerable. Ce tableau detaille la charge estimee par poste, en distinguant les taches automatisables par l'intelligence artificielle de celles qui necessitent une intervention humaine.`,
    timeVerdict: `A raison de ${d.timeLost.totalHoursPerMonth} heures mensuelles, c'est l'equivalent de ${Math.round(d.timeLost.totalHoursPerMonth / 8)} jours ouvrables complets consacres a des taches repetitives. Pour une equipe de 3 a 5 personnes, cela represente entre 15 et 25% du temps de travail global — du temps qui pourrait etre investi dans la vente, la relation client et le developpement commercial.`,
    leadsVerdict: generateLeadsVerdict(d),

    // --- Projection ---
    projectionIntro: `La projection suivante illustre l'evolution probable de la visibilite digitale de ${d.dealerName} par rapport aux concurrents locaux sur 12 mois, en l'absence d'action corrective. Les concurrents qui investissent dans le digital progressent en moyenne de 4 a 5% par mois en termes de visibilite — un ecart qui se cumule rapidement.`,
    actionsIntro: `Les trois actions suivantes ont ete selectionnees pour leur rapport impact/effort. Elles constituent le point de depart recommande pour ameliorer la presence digitale de ${d.dealerName} dans les 30 prochains jours.`,

    // --- Solution ---
    prismafluxDescription: `PrismaFlux Auto est une plateforme belge concue pour simplifier le quotidien des concessionnaires et garages automobiles. Son principe : vous ajoutez un vehicule une seule fois, et la plateforme s'occupe du reste — publication sur toutes vos plateformes de vente (AutoScout24, GoCar, LeBonCoin, Facebook...), retouche des photos, creation des descriptions, reponses aux avis clients, et bien plus. Tout cela grace a quatre assistants specialises, appeles copilotes, qui travaillent en permanence pour vous. En plus des plateformes classiques, vos vehicules sont automatiquement visibles sur le catalogue auto-prismaflux.com, une vitrine supplementaire incluse dans votre abonnement.`,
    whyPrismaflux: generateWhyPrismaflux(d),
  };
}

function generateExecutiveSummary(d: AuditReportData, errors: number, warnings: number, oks: number): string {
  const brandMention = d.carBrands.length > 0
    ? ` En tant que ${d.carBrands.length > 1 ? "specialiste" : "revendeur"} ${d.carBrands.slice(0, 3).join(", ")}${d.carBrands.length > 3 ? " et d'autres marques" : ""}, un positionnement digital optimise permettrait de capter davantage de recherches liees a ces marques dans la zone de ${d.dealerCity}.`
    : "";

  if (d.globalScore >= 70) {
    return `${d.dealerName} obtient un score de ${d.globalScore}/100 — un resultat au-dessus de la moyenne du secteur, ce qui temoigne d'un investissement digital deja en place. ${oks} points sur ${oks + warnings + errors} sont conformes aux bonnes pratiques. Des opportunites d'optimisation existent neanmoins pour consolider cet avantage et maximiser les retours.${brandMention}`;
  }
  if (d.globalScore >= 50) {
    return `Avec un score de ${d.globalScore}/100, ${d.dealerName} dispose de fondations digitales correctes. ${oks} criteres sont bien en place, ce qui constitue une base solide. Toutefois, ${errors + warnings} opportunites d'amelioration ont ete identifiees — des ajustements qui pourraient significativement renforcer la visibilite en ligne et le volume de contacts.${brandMention}`;
  }
  return `Notre analyse attribue a ${d.dealerName} un score de ${d.globalScore}/100. Sur ${oks + warnings + errors} points evalues, ${errors + warnings} representent des opportunites non exploitees. Dans un secteur ou la grande majorite des acheteurs commencent leur parcours en ligne, ces ajustements pourraient avoir un impact direct sur le nombre de contacts et de visites en concession.${brandMention}`;
}

function generateTechnicalVerdict(d: AuditReportData, hasAnalytics: boolean): string {
  const parts: string[] = [];

  if (d.subScores.technique < 40) {
    parts.push(`Plusieurs opportunites techniques meritent attention pour ameliorer l'experience des visiteurs.`);
  } else if (d.subScores.technique < 70) {
    parts.push(`Les bases techniques sont en place. Quelques ajustements permettraient d'offrir une meilleure experience aux visiteurs.`);
  } else {
    parts.push(`Le site offre une experience technique de bonne qualite aux visiteurs.`);
  }

  if (!d.technicalExtras.hasCookieBanner) {
    parts.push(`Le site ne semble pas disposer de bandeau de consentement pour les cookies (un element obligatoire en Belgique). Sa mise en place protege l'entreprise et renforce la confiance des visiteurs.`);
  }

  if (!hasAnalytics) {
    parts.push(`Nous n'avons pas detecte d'outil de mesure du trafic (comme Google Analytics). Sans cet outil, il est difficile de savoir combien de personnes visitent le site et ce qui les interesse — un peu comme gerer un showroom sans compter les entrees.`);
  }

  if (!d.technicalExtras.hasSitemap) {
    parts.push(`Un petit fichier technique (appele "sitemap") permettrait a Google de mieux connaitre l'ensemble des pages du site et de les afficher plus facilement dans les resultats de recherche.`);
  }

  return parts.join(" ");
}

function generateSeoVerdict(d: AuditReportData): string {
  const seoErrors = d.seoChecks.filter(c => c.status === "error").length;
  const brandSeoHint = d.carBrands.length > 0
    ? ` En integrant les noms des marques que vous commercialisez (${d.carBrands.slice(0, 3).join(", ")}) dans ces elements, vous pourriez capter des recherches comme "concessionnaire ${d.carBrands[0]} ${d.dealerCity}".`
    : "";

  if (seoErrors === 0) {
    return `Les elements qui aident Google a comprendre et classer votre site sont bien en place. C'est un bon point qui merite d'etre maintenu sur l'ensemble des pages.${brandSeoHint}`;
  }

  const issues: string[] = [];
  for (const check of d.seoChecks) {
    if (check.status === "error") {
      if (check.label.includes("title")) issues.push("le titre de la page (ce que les internautes voient dans les resultats Google)");
      if (check.label.includes("description")) issues.push("la description qui apparait sous le titre dans Google");
      if (check.label.includes("H1")) issues.push("le titre principal visible sur la page");
      if (check.label.includes("Schema")) issues.push("les informations structurees (adresse, horaires) que Google affiche directement");
    }
  }

  return `Quelques elements cles pour votre visibilite sur Google ne sont pas encore en place : ${issues.join(", ")}. Ce sont les premieres informations que Google utilise pour decider s'il affiche votre site quand quelqu'un cherche un concessionnaire dans votre zone. La bonne nouvelle : ces ajustements sont realisables rapidement.${brandSeoHint}`;
}

function generateLocalVerdict(d: AuditReportData): string {
  if (d.localPresence.cityMentions === 0) {
    return `Le nom "${d.dealerCity}" n'apparait nulle part sur le site. Pour un concessionnaire dont la zone de chalandise est locale, c'est une opportunite manquee majeure. Un client qui tape "garage ${d.dealerCity}" ou "voiture occasion ${d.dealerCity}" dans Google ne trouvera pas ${d.dealerName} parmi les premiers resultats. Integrer systematiquement la ville dans les contenus, titres et meta-donnees est une action simple a fort impact.`;
  }
  if (d.localPresence.cityMentions < 5) {
    return `Avec seulement ${d.localPresence.cityMentions} mention(s) de "${d.dealerCity}", la presence locale est insuffisante pour un bon positionnement dans les recherches geographiques. Les concessionnaires les mieux classes mentionnent leur ville entre 10 et 20 fois de maniere naturelle dans leur contenu.`;
  }
  return `Avec ${d.localPresence.cityMentions} mentions de "${d.dealerCity}", le site possede un ancrage local correct. Il est recommande de completer cette presence avec des pages dediees aux services specifiques (entretien, occasion, financement) associees a la ville pour capter davantage de recherches longue traine.`;
}

function generateSocialVerdict(d: AuditReportData, found: number): string {
  if (found === 0) {
    return `Aucun lien vers des reseaux sociaux n'a ete detecte sur le site. Dans un secteur ou la confiance visuelle est determinante — l'acheteur veut voir les vehicules, l'atelier, l'equipe — l'absence de reseaux sociaux est un handicap concret. Un profil Facebook et Instagram actifs, alimentes avec des photos de qualite et des stories regulieres, peuvent generer 5 a 15 contacts qualifies par mois sans investissement publicitaire.`;
  }
  if (found < 3) {
    return `${found} reseau(x) social(aux) detecte(s) sur 3 analyses. C'est un debut, mais la presence reste incomplete. Pour maximiser la visibilite, il est recommande d'etre present et actif sur Facebook (audience large, Marketplace), Instagram (impact visuel, stories) et LinkedIn (credibilite B2B, reseau professionnel). La coherence entre ces canaux renforce la marque.`;
  }
  return `Les 3 reseaux sociaux principaux sont lies depuis le site, ce qui est positif. L'etape suivante est d'evaluer la frequence de publication et la qualite de l'engagement. Un profil present mais inactif peut etre contre-productif : il vaut mieux publier regulierement sur 2 plateformes que sporadiquement sur 3.`;
}

function generateLeadsVerdict(d: AuditReportData): string {
  if (d.leadsLost.leadsLostPerMonth <= 1) {
    return `L'impact sur la generation de leads est estime comme modere. Neanmoins, chaque contact perdu represente potentiellement 1 800 EUR de marge. L'optimisation de la vitesse de chargement et de l'experience mobile peut faire basculer plusieurs visiteurs indecis vers une prise de contact.`;
  }
  return `L'estimation de ${d.leadsLost.leadsLostPerMonth} contacts perdus par mois — soit environ ${d.leadsLost.revenueLostPerMonth.toLocaleString("fr-BE")} EUR de manque a gagner — merite attention. Ces visiteurs arrivent sur le site, souvent depuis une recherche Google, mais repartent avant d'avoir explore l'offre en raison d'un temps de chargement de ${d.leadsLost.loadTimeSeconds}s. Ils ne reviennent generalement pas : ils cliquent sur le concurrent suivant. L'optimisation des performances est l'action au meilleur retour sur investissement.`;
}

function generateWhyPrismaflux(d: AuditReportData): string {
  const problems: string[] = [];
  if (d.globalScore < 50) problems.push("un score digital en deca de la moyenne du secteur");
  if (d.timeLost.totalHoursPerMonth > 60) problems.push(`${d.timeLost.totalHoursPerMonth}h de taches repetitives chaque mois`);
  if (d.leadsLost.leadsLostPerMonth > 2) problems.push(`${d.leadsLost.leadsLostPerMonth} leads perdus mensuellement`);
  if (d.socialMedia.filter(s => s.found).length < 2) problems.push("une presence reseaux sociaux inexistante ou incomplete");

  if (problems.length === 0) {
    return `${d.dealerName} dispose deja d'une bonne base. PrismaFlux permettrait de consolider cet avantage en prenant en charge les taches repetitives — pour que votre equipe puisse se concentrer sur ce qui fait vraiment la difference : la relation client et la vente.`;
  }

  return `Au vu des opportunites identifiees — ${problems.join(", ")} — PrismaFlux peut apporter une reponse concrete et rapide. Pas besoin de formation complexe ni de consultant externe : les copilotes s'adaptent a votre concession, apprennent vos vehicules, et travaillent en permanence pour vous. L'objectif : vous permettre de vous concentrer sur ce qui compte vraiment — vendre des vehicules et prendre soin de vos clients.`;
}

/**
 * Generates personalized narrative texts based on scan data.
 * Marcus speaks with authority, warmth, and constructive directness.
 * The tone is that of a seasoned consultant who genuinely wants to help.
 *
 * Every piece of text here is designed to:
 * 1. Show the dealer we understand their daily reality
 * 2. Turn raw data into actionable, human insights
 * 3. Infuse PrismaFlux's personality: pragmatic, Belgian, no-BS, AI-forward
 */

import type { AuditReportData } from "../types";

export interface NarrativeTexts {
  // --- Intro page ---
  introWelcome: string;
  introWhatIsThis: string;
  introPrismafluxDesc: string;
  introRobinDesc: string;
  introHowToRead: string;

  // --- Company page ---
  companyIntro: string;

  // --- Synthese ---
  executiveSummary: string;
  keyFindings: string[];
  syntheseTransition: string;

  // --- Presence ---
  localVerdict: string;
  socialVerdict: string;
  competitorVerdict: string;
  presenceTransition: string;

  // --- Impact ---
  dailyLifeStory: string;
  timeVerdict: string;
  leadsVerdict: string;
  impactTransition: string;

  // --- Projection ---
  projectionIntro: string;
  actionsIntro: string;

  // --- Solution ---
  whyPrismaflux: string;
  solutionTransition: string;
  closingNote: string;
}

export function generateNarrative(data: AuditReportData): NarrativeTexts {
  const d = data;
  const errorsCount = d.technicalChecks.filter(c => c.status === "error").length + d.seoChecks.filter(c => c.status === "error").length;
  const warningsCount = d.technicalChecks.filter(c => c.status === "warn").length + d.seoChecks.filter(c => c.status === "warn").length;
  const okCount = d.technicalChecks.filter(c => c.status === "ok").length + d.seoChecks.filter(c => c.status === "ok").length;
  const socialFound = d.socialMedia.filter(s => s.found).length;
  const hasAnalytics = d.technicalExtras.hasGoogleAnalytics || d.technicalExtras.hasGoogleTagManager;
  const ownerFirst = d.ownerName ? d.ownerName.split(" ")[0] : null;
  const greeting = ownerFirst ? `${ownerFirst}` : "Madame, Monsieur";

  return {
    // =====================================================================
    // INTRO PAGE
    // =====================================================================
    introWelcome: ownerFirst
      ? `${greeting}, ce rapport a ete prepare specialement pour vous et pour ${d.dealerName}. Il ne s'agit pas d'un document generique : chaque donnee, chaque analyse et chaque recommandation sont basees sur votre site web, votre environnement concurrentiel a ${d.dealerCity}, et la realite de votre metier.`
      : `Ce rapport a ete prepare specialement pour ${d.dealerName}. Il ne s'agit pas d'un document generique : chaque donnee, chaque analyse et chaque recommandation sont basees sur votre site web, votre environnement concurrentiel a ${d.dealerCity}, et la realite de votre metier.`,

    introWhatIsThis: `En tant que concessionnaire, vous gerez bien plus que la vente de vehicules. Entre le roulement du stock, les publications sur les plateformes, la gestion des avis clients, les reseaux sociaux, le CRM, les entretiens, les garanties, les assurances et les centaines de taches administratives qui remplissent vos journees — le digital est souvent le dernier de vos soucis. Et c'est normal. Ce rapport est la pour vous montrer, en toute transparence, ou vous en etes — et surtout, ce que ca vous coute de ne pas agir.`,

    introPrismafluxDesc: `PrismaFlux Auto est une plateforme belge concue par et pour les professionnels de l'automobile. Notre mission est simple : vous faire gagner du temps, de l'argent et de la serenite en automatisant tout ce qui peut l'etre dans votre quotidien digital. Pas de jargon, pas de promesses creuses — des outils concrets qui travaillent pendant que vous, vous vendez des voitures et prenez soin de vos clients.`,

    introRobinDesc: `Robin est votre copilote de diffusion. Il publie vos vehicules sur 9 plateformes simultanement en 30 secondes — la ou il vous faut aujourd'hui 25 minutes par vehicule et par plateforme. AutoScout24, GoCar, LeBonCoin, Facebook Marketplace, votre site web... Robin gere tout, y compris le remplissage des 50 a 60 champs techniques exiges par chaque plateforme. C'est lui qui a lance l'analyse que vous tenez entre les mains.`,

    introHowToRead: `Ce rapport se lit en quelques minutes. Vous y trouverez d'abord un apercu de votre entreprise, puis une synthese de votre presence digitale. Ensuite, nous analysons votre positionnement face a vos concurrents locaux, avant de chiffrer l'impact operationnel sur votre quotidien. Les donnees techniques detaillees se trouvent en annexe pour ceux qui souhaitent approfondir.`,

    // =====================================================================
    // COMPANY PAGE
    // =====================================================================
    companyIntro: d.companyProfile
      ? `Avant d'analyser votre vitrine digitale, nous avons rassemble les informations publiques disponibles sur ${d.dealerName}. Cette section vous permet de verifier que nous nous adressons bien a la bonne structure et de contextualiser les recommandations qui suivent dans la realite de votre entreprise.`
      : `Nous n'avons pas pu retrouver automatiquement les informations publiques de ${d.dealerName} dans les registres belges. Les recommandations qui suivent se basent sur l'analyse directe de votre site web et de votre environnement concurrentiel a ${d.dealerCity}.`,

    // =====================================================================
    // SYNTHESE
    // =====================================================================
    executiveSummary: generateExecutiveSummary(d, errorsCount, warningsCount, okCount),

    keyFindings: generateKeyFindings(d, errorsCount, socialFound, hasAnalytics),

    syntheseTransition: d.globalScore < 50
      ? `Ces resultats ne sont pas une fatalite — ils representent des opportunites concretes. Les pages suivantes detaillent votre positionnement face aux concurrents locaux et chiffrent l'impact de ces constats sur votre activite quotidienne.`
      : `Ces fondations sont encourageantes. Les pages suivantes vous montrent comment les consolider face a la concurrence locale et ou se trouvent les dernieres opportunites d'optimisation.`,

    // =====================================================================
    // PRESENCE
    // =====================================================================
    localVerdict: generateLocalVerdict(d),
    socialVerdict: generateSocialVerdict(d, socialFound),
    competitorVerdict: d.competitorInsights?.competitorNarrative ?? generateCompetitorVerdict(d),

    presenceTransition: `Votre presence en ligne est la vitrine permanente de ${d.dealerName}. Contrairement a votre showroom physique qui ferme le soir, votre site et vos profils en ligne accueillent des visiteurs 24h/24. La question n'est plus de savoir si vos clients vous cherchent en ligne — c'est de savoir ce qu'ils trouvent quand ils le font.`,

    // =====================================================================
    // IMPACT
    // =====================================================================
    dailyLifeStory: generateDailyLifeStory(d, greeting),
    timeVerdict: generateTimeVerdict(d),
    leadsVerdict: generateLeadsVerdict(d),

    impactTransition: `Ces chiffres ne sont pas abstraits — ils representent des heures de votre semaine, des clients potentiels qui choisissent un concurrent, et de l'argent qui sort de votre tresorerie sans retour. La bonne nouvelle : la majorite de ces pertes sont evitables.`,

    // =====================================================================
    // PROJECTION
    // =====================================================================
    projectionIntro: `La projection suivante illustre l'evolution probable de la visibilite de ${d.dealerName} par rapport a la moyenne des concurrents locaux sur 12 mois. Sans action corrective, l'ecart se creuse — les concessionnaires qui investissent dans le digital progressent en moyenne de 4 a 5% par mois. Un ecart qui se cumule et qui devient de plus en plus couteux a rattraper.`,

    actionsIntro: `Les trois actions suivantes ont ete selectionnees pour leur rapport impact/effort. Elles constituent le point de depart recommande pour les 30 prochains jours. Chacune est realisable sans budget significatif ni competence technique avancee.`,

    // =====================================================================
    // SOLUTION
    // =====================================================================
    whyPrismaflux: generateWhyPrismaflux(d),

    solutionTransition: `Et si au lieu de courir apres le digital, le digital travaillait pour vous ? C'est exactement ce que font les copilotes PrismaFlux : quatre assistants specialises qui prennent en charge les taches repetitives pendant que vous vous concentrez sur ce qui compte vraiment — la vente, la relation client et le developpement de votre concession.`,

    closingNote: ownerFirst
      ? `${ownerFirst}, ce rapport est un premier pas. Nous serions ravis d'en discuter avec vous autour d'un cafe (ou d'un appel de 15 minutes). Aucun engagement, aucune obligation — juste une conversation entre professionnels de l'automobile pour voir comment PrismaFlux pourrait s'integrer dans votre quotidien.`
      : `Ce rapport est un premier pas. Nous serions ravis d'en discuter avec vous autour d'un cafe (ou d'un appel de 15 minutes). Aucun engagement, aucune obligation — juste une conversation entre professionnels de l'automobile.`,
  };
}

// ==========================================================================
// HELPER GENERATORS
// ==========================================================================

function generateExecutiveSummary(d: AuditReportData, errors: number, warnings: number, oks: number): string {
  const brandMention = d.carBrands.length > 0
    ? ` En tant que ${d.carBrands.length > 1 ? "specialiste" : "revendeur"} ${d.carBrands.slice(0, 3).join(", ")}${d.carBrands.length > 3 ? " et d'autres marques" : ""}, un positionnement digital optimise permettrait de capter davantage de recherches liees a ces marques dans la zone de ${d.dealerCity}.`
    : "";

  if (d.globalScore >= 70) {
    return `${d.dealerName} obtient un score de ${d.globalScore}/100 — un resultat au-dessus de la moyenne du secteur automobile en Belgique, qui temoigne d'un investissement digital deja en place. Sur ${oks + warnings + errors} points evalues, ${oks} sont conformes aux bonnes pratiques. Des opportunites d'optimisation existent neanmoins pour transformer cet avantage en veritable machine a leads.${brandMention}`;
  }
  if (d.globalScore >= 50) {
    return `Avec un score de ${d.globalScore}/100, ${d.dealerName} dispose de fondations digitales correctes mais incompletes. ${oks} criteres sont bien en place — c'est une base solide sur laquelle construire. Toutefois, ${errors + warnings} points meritent attention : ce sont autant d'opportunites d'amelioration qui, une fois adressees, pourraient significativement augmenter votre visibilite et votre volume de contacts entrants.${brandMention}`;
  }
  return `Notre analyse attribue a ${d.dealerName} un score de ${d.globalScore}/100. Ce n'est pas un jugement — c'est un constat. Sur ${oks + warnings + errors} points evalues, ${errors + warnings} representent des leviers d'amelioration concrets. Dans un secteur ou 92% des acheteurs commencent leur recherche en ligne, chaque point gagne est un client potentiel en plus qui frappe a votre porte.${brandMention}`;
}

function generateKeyFindings(d: AuditReportData, errors: number, socialFound: number, hasAnalytics: boolean): string[] {
  const findings: string[] = [];

  // Score-based finding
  if (d.globalScore < 40) {
    findings.push(`Votre score digital de ${d.globalScore}/100 indique un retard significatif par rapport aux standards du secteur. La priorite est de corriger les bases.`);
  } else if (d.globalScore < 60) {
    findings.push(`Un score de ${d.globalScore}/100 place ${d.dealerName} dans la moyenne basse. Quelques ajustements cibles suffiraient a passer au-dessus de la plupart des concurrents.`);
  } else {
    findings.push(`Avec ${d.globalScore}/100, vous disposez d'un avantage digital. L'enjeu est de le maintenir et de l'exploiter pleinement.`);
  }

  // Competitor finding
  if (d.competitorInsights && d.competitorInsights.avgReviews > 50) {
    findings.push(`Vos concurrents locaux cumulent en moyenne ${Math.round(d.competitorInsights.avgReviews)} avis Google, avec une note moyenne de ${d.competitorInsights.avgRating.toFixed(1)}/5. ${d.googleProfile.reviewCount !== null ? `Vous en avez ${d.googleProfile.reviewCount}.` : "Vos avis n'ont pas pu etre mesures."}`);
  }

  // Time finding
  if (d.timeLost.totalHoursPerMonth > 80) {
    findings.push(`Estimation de ${d.timeLost.totalHoursPerMonth} heures/mois consacrees a des taches repetitives — soit ${Math.round(d.timeLost.totalHoursPerMonth / 8)} jours ouvrables complets. ${Math.round(d.timeLost.totalHoursPerMonth * 0.7)}h sont automatisables.`);
  }

  // Social finding
  if (socialFound < 2) {
    findings.push(`Presence reseaux sociaux ${socialFound === 0 ? "inexistante" : "minimale"} : ${socialFound}/3 plateformes detectees. Dans un metier visuel comme l'automobile, c'est un levier de croissance sous-exploite.`);
  }

  // Analytics finding
  if (!hasAnalytics) {
    findings.push(`Aucun outil de mesure du trafic detecte : vous ne savez pas combien de personnes visitent votre site ni ce qui les interesse. C'est comme gerer un showroom sans compter les entrees.`);
  }

  // Local SEO finding
  if (d.localPresence.cityMentions < 3) {
    findings.push(`Le nom "${d.dealerCity}" n'apparait que ${d.localPresence.cityMentions} fois sur votre site. Un client tapant "garage ${d.dealerCity}" ne vous trouvera probablement pas.`);
  }

  return findings.slice(0, 5);
}

function generateLocalVerdict(d: AuditReportData): string {
  if (d.localPresence.cityMentions === 0) {
    return `Constat preoccupant : le nom "${d.dealerCity}" n'apparait nulle part sur le site de ${d.dealerName}. Pour un concessionnaire dont la zone de chalandise est par definition locale, c'est comme avoir un panneau publicitaire sans adresse. Quand un acheteur tape "garage automobile ${d.dealerCity}" ou "voiture occasion ${d.dealerCity}" dans Google, ${d.dealerName} est invisible. Ce n'est pas un detail technique — c'est un manque a gagner direct et mesurable. La correction est simple : integrer naturellement la ville dans les titres, descriptions et contenus du site.`;
  }
  if (d.localPresence.cityMentions < 5) {
    return `Avec seulement ${d.localPresence.cityMentions} mention(s) de "${d.dealerCity}", l'ancrage local du site est insuffisant pour rivaliser dans les recherches geographiques. Les concessionnaires les mieux positionnes dans Google mentionnent leur ville entre 10 et 20 fois de maniere naturelle — dans les titres de pages, les descriptions de services, les temoignages clients. Ce n'est pas du bourrage de mots-cles : c'est simplement dire a Google "oui, nous sommes bien a ${d.dealerCity}, et voici ce que nous y faisons".`;
  }
  return `Avec ${d.localPresence.cityMentions} mentions de "${d.dealerCity}", le site possede un ancrage geographique correct — c'est un bon point. Pour aller plus loin, il serait pertinent de creer des pages dediees a chaque service (entretien, financement, reprise) associees a la ville et aux communes environnantes. C'est ce qu'on appelle le SEO local "longue traine" et c'est redoutablement efficace dans le secteur automobile.`;
}

function generateSocialVerdict(d: AuditReportData, found: number): string {
  if (found === 0) {
    return `Aucun lien vers des reseaux sociaux n'a ete detecte sur le site de ${d.dealerName}. Dans un secteur ou l'acheteur veut voir les vehicules sous tous les angles, decouvrir l'atelier, connaitre l'equipe — l'absence de reseaux sociaux est un handicap concret. Un profil Facebook et Instagram actifs, alimentes regulierement avec des photos de qualite et des stories de la vie en concession, peuvent generer 5 a 15 contacts qualifies par mois sans le moindre investissement publicitaire. C'est du bouche-a-oreille digital.`;
  }
  if (found < 3) {
    const missing = ["facebook", "instagram", "linkedin"].filter(p => !d.socialMedia.find(s => s.platform === p && s.found));
    return `${found} reseau(x) social(aux) detecte(s) — c'est un debut, mais la couverture reste incomplete. ${missing.map(p => p === "facebook" ? "Facebook (audience large, Marketplace)" : p === "instagram" ? "Instagram (impact visuel, stories vehicules)" : "LinkedIn (credibilite, reseau B2B)").join(" et ")} manque${missing.length > 1 ? "nt" : ""} a l'appel. La coherence entre ces canaux renforce la marque : un client qui voit vos vehicules sur Instagram, retrouve vos avis sur Facebook et decouvre votre equipe sur LinkedIn aura bien plus confiance qu'avec un seul canal.`;
  }
  return `Les 3 reseaux sociaux principaux sont lies depuis le site — c'est positif et relativement rare dans le secteur. L'etape suivante est d'evaluer la frequence de publication et l'engagement. Un profil present mais inactif depuis 3 mois envoie un mauvais signal aux visiteurs. La regularite prime sur la quantite : 3 publications soignees par semaine valent mieux que 10 publications bacclees suivies de 2 semaines de silence.`;
}

function generateCompetitorVerdict(d: AuditReportData): string {
  if (d.competitors.length === 0) {
    return `L'analyse concurrentielle n'a pas pu etre realisee faute de donnees. Il est neanmoins fortement recommande de surveiller les 5 a 10 concessionnaires principaux de la zone de ${d.dealerCity}. Connaitre leur note Google, leur nombre d'avis et leur activite en ligne permet de fixer des objectifs realistes et de mesurer les progres.`;
  }
  const avgRating = d.competitors.reduce((s, c) => s + (c.googleRating ?? 0), 0) / d.competitors.filter(c => c.googleRating).length;
  const avgReviews = Math.round(d.competitors.reduce((s, c) => s + (c.googleReviewCount ?? 0), 0) / d.competitors.filter(c => c.googleReviewCount).length);

  return `L'analyse des ${d.competitors.length} concurrents locaux revele un environnement actif : note moyenne de ${avgRating.toFixed(1)}/5 et ${avgReviews} avis Google en moyenne. Les concessionnaires qui investissent dans leur reputation en ligne — reponse systematique aux avis, photos regulieres, contenu de qualite — captent une part croissante des recherches locales. Chaque mois d'inaction est un mois ou l'ecart se creuse.`;
}

function generateDailyLifeStory(d: AuditReportData, greeting: string): string {
  const vc = d.vehicleCount;
  const automatableH = Math.round(d.timeLost.tasks.filter(t => t.automatable).reduce((a, t) => a + t.minutesPerMonth, 0) / 60);

  return `Imaginons votre semaine type chez ${d.dealerName}. Lundi matin, ${vc >= 50 ? "trois" : "deux"} vehicules viennent d'arriver. Il faut les photographier, retoucher les images, rediger les descriptions, puis les publier sur AutoScout24 (50-60 champs a remplir par vehicule), GoCar, LeBonCoin, Facebook Marketplace, votre site web. Comptez 25 minutes par vehicule et par plateforme. Pendant ce temps, un client a laisse un avis Google — il attend une reponse. Votre page Facebook n'a plus ete alimentee depuis 10 jours. Trois demandes par email attendent une reponse. Le telephone sonne. Et il y a encore les entretiens a planifier, les dossiers de garantie a traiter, les prix a mettre a jour sur chaque plateforme quand un vehicule est vendu...

Resultat : ${automatableH} heures par mois de travail repetitif — soit l'equivalent de ${Math.round(automatableH / 8)} jours ouvrables — sont consacrees a des taches que l'intelligence artificielle peut prendre en charge aujourd'hui. Pas demain. Aujourd'hui.`;
}

function generateTimeVerdict(d: AuditReportData): string {
  const automatableH = Math.round(d.timeLost.tasks.filter(t => t.automatable).reduce((a, t) => a + t.minutesPerMonth, 0) / 60);
  const pct = Math.round((automatableH / d.timeLost.totalHoursPerMonth) * 100);

  return `Sur ${d.timeLost.totalHoursPerMonth} heures mensuelles de taches digitales et administratives, ${automatableH} heures (${pct}%) sont automatisables par l'IA. Cela represente ${d.timeLost.totalCostPerMonth.toLocaleString("fr-BE")} EUR/mois en temps de travail — ${d.timeLost.totalCostPerYear.toLocaleString("fr-BE")} EUR sur un an. Ce n'est pas une depense visible sur un releve bancaire, mais c'est un cout bien reel : celui du temps que votre equipe ne consacre pas a la vente et a la relation client.`;
}

function generateLeadsVerdict(d: AuditReportData): string {
  if (d.leadsLost.leadsLostPerMonth <= 1) {
    return `L'impact estime sur la generation de leads reste modere a ce stade. Neanmoins, chaque contact perdu represente potentiellement ${(1800).toLocaleString("fr-BE")} EUR de marge brute. L'optimisation de la vitesse et de l'experience mobile peut faire basculer plusieurs visiteurs hesitants vers une prise de contact — et un seul vehicule vendu en plus par mois rentabilise largement l'investissement.`;
  }
  return `Notre estimation : ${d.leadsLost.leadsLostPerMonth} contacts perdus chaque mois, soit environ ${d.leadsLost.revenueLostPerMonth.toLocaleString("fr-BE")} EUR de manque a gagner. Ces visiteurs arrivent sur votre site — souvent depuis Google, parfois depuis une annonce — mais repartent avant d'avoir explore votre offre. Temps de chargement de ${d.leadsLost.loadTimeSeconds} secondes, experience mobile degradee, informations difficiles a trouver... Ils ne reviennent generalement pas. Ils cliquent sur le resultat suivant. Votre concurrent.`;
}

function generateWhyPrismaflux(d: AuditReportData): string {
  const problems: string[] = [];
  if (d.globalScore < 50) problems.push("un score digital en deca de la moyenne");
  if (d.timeLost.totalHoursPerMonth > 60) problems.push(`${d.timeLost.totalHoursPerMonth}h de taches repetitives chaque mois`);
  if (d.leadsLost.leadsLostPerMonth > 2) problems.push(`${d.leadsLost.leadsLostPerMonth} contacts perdus mensuellement`);
  if (d.socialMedia.filter(s => s.found).length < 2) problems.push("une presence reseaux sociaux a construire");

  if (problems.length === 0) {
    return `${d.dealerName} dispose deja de bonnes bases digitales. PrismaFlux n'est pas la pour tout reinventer — mais pour automatiser ce qui peut l'etre, liberer du temps a votre equipe et vous assurer que chaque vehicule beneficie de la meilleure visibilite possible sur toutes les plateformes. Moins de repetitif, plus de vente.`;
  }

  return `Au vu des constats — ${problems.join(", ")} — PrismaFlux apporte une reponse concrete et immediate. Pas de formation complexe, pas de consultant externe, pas de migration penible. Les copilotes s'adaptent a votre concession, apprennent vos vehicules, comprennent vos marques. L'objectif est limpide : vous rendre du temps pour ce qui compte vraiment — vendre des vehicules, prendre soin de vos clients, et developper votre entreprise sereinement.`;
}

import type { FAQ } from "@/components/ui/FAQSection";

export const SERVICE_FAQS: Record<string, FAQ[]> = {
  "creation-site-web": [
    { question: "Combien de temps faut-il pour creer un site web ?", answer: "En moyenne, comptez 4 a 8 semaines pour un site vitrine et 8 a 12 semaines pour un site e-commerce. Le delai depend de la complexite du projet et de la rapidite des validations." },
    { question: "Est-ce que je pourrai modifier mon site moi-meme ?", answer: "Oui, chaque site est livre avec une interface d'administration intuitive. Nous vous formons a la prise en main pour que vous puissiez gerer vos contenus en toute autonomie." },
    { question: "Mon site sera-t-il optimise pour les mobiles ?", answer: "Absolument. Tous nos sites sont concus en mobile-first et s'adaptent parfaitement a tous les ecrans : smartphones, tablettes et ordinateurs." },
    { question: "L'hebergement est-il inclus ?", answer: "Oui, la premiere annee d'hebergement est incluse dans nos tarifs. Nous utilisons des serveurs performants avec certificat SSL et sauvegardes automatiques." },
    { question: "Proposez-vous la maintenance du site ?", answer: "Oui, nous proposons des contrats de maintenance mensuels qui incluent les mises a jour de securite, les sauvegardes et le support technique." },
  ],
  "referencement-google": [
    { question: "En combien de temps verrai-je des resultats SEO ?", answer: "Les premiers resultats sont generalement visibles apres 3 a 6 mois. Le SEO est un investissement a moyen terme, mais les resultats sont durables et croissants." },
    { question: "Garantissez-vous la premiere page de Google ?", answer: "Aucune agence serieuse ne peut garantir une position specifique. En revanche, 92% de nos clients atteignent la premiere page pour leurs mots-cles principaux sous 6 mois." },
    { question: "Quelle est la difference entre SEO et publicite Google ?", answer: "Le SEO (referencement naturel) genere du trafic gratuit et durable. La publicite Google (SEA) donne des resultats immediats mais coute a chaque clic. Idealement, on combine les deux." },
    { question: "Est-ce que le SEO fonctionne pour les entreprises locales ?", answer: "Absolument. Le SEO local est meme l'un de nos points forts. Nous optimisons votre fiche Google Business et votre presence pour les recherches locales a Liege et en province." },
    { question: "Comment mesurez-vous les resultats ?", answer: "Nous fournissons un rapport mensuel detaille avec l'evolution de vos positions, votre trafic organique, les conversions et les recommandations d'amelioration." },
  ],
  "reseaux-sociaux": [
    { question: "Sur quels reseaux sociaux devrait-on etre present ?", answer: "Ca depend de votre cible. Pour le B2C, Facebook et Instagram sont incontournables. Pour le B2B, LinkedIn est prioritaire. Nous analysons votre secteur pour recommander les plateformes les plus pertinentes." },
    { question: "Combien de publications par semaine recommandez-vous ?", answer: "En general, 3 a 5 publications par semaine sur chaque plateforme est un bon rythme. La regularite est plus importante que la quantite." },
    { question: "Gerez-vous aussi la publicite payante ?", answer: "Oui, nous gerons vos campagnes publicitaires sur Facebook, Instagram, Google Ads et Pinterest. Nous optimisons le budget pour maximiser le retour sur investissement." },
    { question: "Est-ce que vous creez le contenu visuel ?", answer: "Oui, nous realisons les visuels, les textes et les videos pour vos publications. Chaque contenu est adapte au format et au ton de la plateforme." },
  ],
  "strategie-digitale": [
    { question: "Qu'est-ce qu'un audit digital ?", answer: "C'est une analyse complete de votre presence en ligne : site web, SEO, reseaux sociaux, reputation, concurrence. Il identifie les forces, faiblesses et opportunites de croissance." },
    { question: "Avons-nous besoin d'une strategie digitale si on a deja un site ?", answer: "Un site web seul ne suffit pas. Une strategie digitale coordonne tous vos canaux (SEO, social, email, publicite) pour maximiser votre visibilite et vos conversions." },
    { question: "Comment integrez-vous l'IA dans la strategie ?", answer: "Nous utilisons l'IA pour l'analyse de donnees, l'optimisation de contenu, la personnalisation de l'experience client et l'automatisation de certaines taches marketing." },
    { question: "Quel est le budget minimum pour une strategie digitale ?", answer: "Une strategie de base demarre autour de 500 EUR/mois. Le budget optimal depend de vos objectifs, votre secteur et la concurrence. Nous adaptons toujours nos recommandations a votre budget." },
  ],
  "spots-publicitaires": [
    { question: "Combien coute un spot publicitaire ?", answer: "Le prix varie selon la complexite : a partir de 800 EUR pour un spot reseaux sociaux, et a partir de 2.500 EUR pour un spot TV/web. Chaque projet fait l'objet d'un devis detaille." },
    { question: "Quel est le delai de production ?", answer: "Comptez en moyenne 2 a 4 semaines entre le brief et la livraison du spot final. Un teaser social media peut etre produit en 1 semaine." },
    { question: "Fournissez-vous le spot dans tous les formats ?", answer: "Oui, nous livrons le spot dans tous les formats necessaires : 16:9 (YouTube, TV), 1:1 (Instagram feed), 9:16 (Stories, TikTok), et tout format specifique demande." },
    { question: "Peut-on utiliser le spot sur plusieurs plateformes ?", answer: "Bien sur. Nous optimisons chaque spot pour une diffusion multi-plateforme. Un meme concept peut etre decline en plusieurs formats pour maximiser l'impact." },
  ],
};

export const CITY_FAQS: Record<string, FAQ[]> = {
  huy: [
    { question: "Pourquoi choisir une agence web proche de Huy ?", answer: "La proximite permet des echanges plus fluides et une meilleure comprehension de votre marche local. Notre equipe a Liege est a moins de 30 minutes de Huy." },
    { question: "Intervenez-vous directement a Huy ?", answer: "Oui, nous nous deplacons regulierement a Huy pour rencontrer nos clients. Nous privilegions aussi les visioconferences pour plus de flexibilite." },
    { question: "Connaissez-vous le marche local hutois ?", answer: "Absolument. Nous travaillons avec plusieurs entreprises de la region de Huy et connaissons bien le tissu economique local." },
  ],
  seraing: [
    { question: "Travaillez-vous avec des entreprises de Seraing ?", answer: "Oui, nous accompagnons plusieurs entreprises seresiennes dans leur transformation digitale. De la PME au commerce local, nous adaptons nos services." },
    { question: "Combien de temps pour se rendre a votre agence depuis Seraing ?", answer: "Notre agence a Liege est a moins de 15 minutes en voiture depuis Seraing, et facilement accessible en transports en commun." },
    { question: "Proposez-vous des tarifs adaptes aux PME ?", answer: "Oui, nous avons des formules adaptees a tous les budgets. Nous croyons que chaque entreprise, quelle que soit sa taille, merite une presence digitale professionnelle." },
  ],
  sprimont: [
    { question: "Etes-vous disponibles pour des entreprises a Sprimont ?", answer: "Bien sur. Sprimont et ses environs font partie de notre zone d'intervention privilegiee. Nous connaissons bien la region." },
    { question: "Le SEO local fonctionne-t-il pour une entreprise a Sprimont ?", answer: "Absolument. Le SEO local est particulierement efficace pour les entreprises qui servent une clientele de proximite. Nous optimisons votre visibilite pour les recherches locales." },
    { question: "Peut-on se rencontrer en personne ?", answer: "Oui, nous nous deplacons volontiers a Sprimont ou vous pouvez nous rendre visite a notre agence de Liege, a 20 minutes de route." },
  ],
  herstal: [
    { question: "Accompagnez-vous les commerces d'Herstal ?", answer: "Oui, nous accompagnons de nombreux commerces et entreprises d'Herstal dans leur developpement digital, du site web au referencement local." },
    { question: "Le referencement local est-il important pour Herstal ?", answer: "Tres important. Les recherches locales comme 'restaurant Herstal' ou 'plombier Herstal' representent des opportunites majeures pour les commerces locaux." },
    { question: "Quels services proposez-vous aux entreprises d'Herstal ?", answer: "Tous nos services sont disponibles : creation de site web, SEO, gestion reseaux sociaux, strategie digitale et spots publicitaires." },
  ],
  verviers: [
    { question: "Intervenez-vous jusqu'a Verviers ?", answer: "Oui, Verviers fait partie de notre zone d'action. Nous travaillons avec des entreprises de toute la province de Liege, y compris Verviers et ses environs." },
    { question: "Le marche vervietois a-t-il des specificites digitales ?", answer: "Verviers offre de belles opportunites en SEO local avec une concurrence souvent moins intense qu'a Liege. C'est le moment ideal pour se positionner." },
    { question: "Comment se passe la collaboration a distance ?", answer: "Nous utilisons des outils collaboratifs modernes (visioconference, partage d'ecran, plateformes de suivi). La distance n'est jamais un frein a la qualite du travail." },
  ],
};

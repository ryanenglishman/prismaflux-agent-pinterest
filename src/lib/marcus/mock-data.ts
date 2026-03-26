import type { AuditReportData } from "./types";

export const MOCK_AUDIT_DATA: AuditReportData = {
  dealerName: "Garage Dupont & Fils",
  dealerUrl: "https://www.garage-dupont.be",
  dealerCity: "Namur",
  auditDate: "2026-03-25",
  globalScore: 42,
  subScores: {
    technique: 55,
    seo: 35,
    local: 38,
  },
  technicalChecks: [
    {
      label: "Certificat HTTPS",
      status: "ok",
      detail: "Votre site utilise un certificat SSL valide.",
    },
    {
      label: "Vitesse de chargement",
      status: "error",
      detail: "Temps de chargement : 6.2 secondes (recommande : < 3s).",
      recommendation:
        "Compressez vos images, activez la mise en cache navigateur et utilisez un CDN.",
    },
    {
      label: "Compatibilite mobile",
      status: "warn",
      detail:
        "Certains elements ne s'adaptent pas correctement sur mobile (menu, formulaire de contact).",
      recommendation:
        "Adoptez un design responsive et testez sur differents appareils.",
    },
    {
      label: "Erreurs 404",
      status: "error",
      detail: "12 pages retournent une erreur 404.",
      recommendation:
        "Corrigez ou redirigez les liens casses vers des pages existantes.",
    },
    {
      label: "Compression des images",
      status: "error",
      detail:
        "78% des images ne sont pas optimisees (format JPEG non compresse, pas de WebP).",
      recommendation:
        "Convertissez vos images en WebP et utilisez le lazy loading.",
    },
  ],
  seoChecks: [
    {
      label: "Balise Title",
      status: "warn",
      detail:
        'Title actuel : "Garage Dupont" — trop court et non descriptif.',
      recommendation:
        'Utilisez un title de 50-60 caracteres avec vos mots-cles : "Garage Dupont Namur | Vente et reparation automobile".',
    },
    {
      label: "Meta Description",
      status: "error",
      detail: "Aucune meta description definie sur la page d'accueil.",
      recommendation:
        "Ajoutez une meta description de 150-160 caracteres decrivant vos services principaux a Namur.",
    },
    {
      label: "Balise H1",
      status: "warn",
      detail:
        'H1 actuel : "Bienvenue" — ne contient aucun mot-cle pertinent.',
      recommendation:
        'Remplacez par un H1 descriptif : "Votre garage automobile de confiance a Namur".',
    },
    {
      label: "Schema LocalBusiness",
      status: "error",
      detail:
        "Aucun balisage Schema.org LocalBusiness detecte.",
      recommendation:
        "Ajoutez le schema LocalBusiness avec vos horaires, adresse, telephone et services.",
    },
    {
      label: "Balises Alt images",
      status: "error",
      detail: "85% des images n'ont pas de texte alternatif.",
      recommendation:
        'Ajoutez des attributs alt descriptifs : "Volkswagen Golf occasion Namur" plutot que "IMG_2847".',
    },
  ],
  localPresence: {
    cityMentions: 2,
    serviceMentions: ["vente vehicules", "reparation"],
    missingKeywords: [
      "reprise vehicule Namur",
      "voiture occasion Namur",
      "entretien auto Namur",
      "garage automobile Namur",
      "revision voiture Namur",
      "carrosserie Namur",
      "financement auto Namur",
    ],
  },
  competitors: [
    {
      name: "AutoCenter Namur",
      googleRating: 4.6,
      googleReviewCount: 312,
      pageSpeedScore: 78,
      hasLocalBusiness: true,
    },
    {
      name: "CarPoint Wallonie",
      googleRating: 4.3,
      googleReviewCount: 187,
      pageSpeedScore: 65,
      hasLocalBusiness: true,
    },
    {
      name: "Namur Auto Services",
      googleRating: 4.1,
      googleReviewCount: 94,
      pageSpeedScore: 45,
      hasLocalBusiness: false,
    },
  ],
  priorityActions: [
    {
      title: "Optimisez votre fiche Google Business",
      description:
        "Vos concurrents ont en moyenne 198 avis Google. Votre fiche n'est pas completement remplie. Ajoutez des photos recentes, repondez aux avis existants et demandez un avis a chaque client satisfait.",
      impact: "high",
      difficulty: "easy",
    },
    {
      title: "Corrigez les bases SEO de votre site",
      description:
        "Votre title, meta description et H1 ne contiennent aucun mot-cle local. En les corrigeant, vous pourriez apparaitre dans les resultats pour « garage Namur » et « voiture occasion Namur » sous 4-8 semaines.",
      impact: "high",
      difficulty: "medium",
    },
    {
      title: "Ameliorez la vitesse de votre site",
      description:
        "Un temps de chargement de 6.2s fait fuir 53% des visiteurs mobiles. Compressez vos images (gain estime : -70% de poids) et activez la mise en cache pour descendre sous les 3 secondes.",
      impact: "medium",
      difficulty: "medium",
    },
  ],
};

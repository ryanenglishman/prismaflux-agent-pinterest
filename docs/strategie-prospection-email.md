# Strategie de Prospection Email — PrismaFlux Auto

## 1. Vue d'ensemble

**Objectif** : Convertir des concessionnaires (200K-2M marge brute) en clients payants (749 EUR/mois)
**Marche** : Belgique + France
**Volume** : 200+ emails/semaine
**Cadeau** : Audit digital gratuit personnalise (PDF genere par Marcus)
**Budget outils** : 50-150 EUR/mois

---

## 2. Infrastructure email (a mettre en place)

### Domaine dedie
- **Ne PAS envoyer depuis @prismaflux.com** (proteger la reputation du domaine principal)
- Acheter un domaine secondaire : `prismaflux-auto.com` ou `audit-digital-auto.com` (~10 EUR/an)
- Configurer les DNS : SPF, DKIM, DMARC (obligatoire pour eviter les spams)

### Outil recommande : **Instantly.ai** (30 USD/mois)
- Warmup automatique des emails (indispensable avant d'envoyer en volume)
- Sequences automatisees avec follow-ups
- A/B testing des sujets
- Analytics (taux d'ouverture, reponse, bounce)
- **Alternative budget** : Brevo gratuit (300 emails/jour) mais pas de warmup auto

### Plan de warmup (4 semaines)
| Semaine | Volume/jour | Action |
|---------|------------|--------|
| S1 | 5-10 | Warmup auto + quelques envois manuels a des contacts connus |
| S2 | 15-20 | Premiers cold emails personnalises |
| S3 | 25-35 | Montee en charge progressive |
| S4+ | 40-50 | Regime de croisiere (200+/semaine) |

---

## 3. Sourcing des prospects

### Sources gratuites
1. **Google Maps** : chercher "concessionnaire automobile [ville]", "garage auto [ville]"
   - Scraper manuellement ou avec un outil (voir ci-dessous)
   - Recuperer : nom, adresse, telephone, site web, note Google, nb avis
2. **Pages Jaunes / Gouden Gids** : annuaires pro Belgique/France
3. **AutoScout24 / LeBonCoin pro** : identifier les pros qui publient des annonces
4. **LinkedIn** : trouver les gerants/directeurs commerciaux

### Outil de scraping recommande : **Apollo.io** (gratuit jusqu'a 10K leads/mois)
- Base de donnees B2B avec emails verifies
- Filtrage par secteur (automobile), taille entreprise, localisation
- Export CSV direct pour le batch script

### Qualite des leads
- **Priorite 1** : Concessionnaires AVEC site web (on peut generer l'audit)
- **Priorite 2** : Concessionnaires SANS site web (pitch creation de site)
- Verifier que l'email est valide avant envoi (bounces tuent la reputation)

---

## 4. Sequence email (3 touches)

### Email 1 — Le cadeau (J+0)

**Objet** (A/B tester) :
- A : `[Nom], votre site perd des clients — voici pourquoi`
- B : `Audit digital gratuit pour [Nom Concession]`
- C : `[Prenom], 3 corrections qui changeraient tout pour [Concession]`

**Corps** :

```
Bonjour [Prenom],

Je me permets de vous contacter car j'ai analyse le site de [Concession]
a [Ville].

En bref : votre site obtient un score de [XX]/100 sur notre audit digital.
Vos concurrents locaux ([Concurrent 1], [Concurrent 2]) ont une avance
significative, notamment sur les avis Google et le referencement local.

J'ai prepare un rapport complet et gratuit pour vous — 8 pages avec :
- Votre score technique, SEO et presence locale
- La comparaison avec vos 3 principaux concurrents
- 3 actions concretes pour ameliorer votre visibilite

Le rapport est en piece jointe. Aucun engagement, c'est un cadeau.

Si vous souhaitez en discuter ou voir comment PrismaFlux peut automatiser
ces corrections, je suis disponible pour un appel de 15 minutes.

Bonne journee,
[Signature]
```

**Piece jointe** : Le PDF d'audit personnalise

---

### Email 2 — Le relance douce (J+3)

**Objet** : `Re: Audit digital [Concession]`

**Corps** :

```
Bonjour [Prenom],

Je voulais m'assurer que vous aviez bien recu l'audit digital de [Concession].

Un point qui m'a frappe : [Point le plus critique de l'audit — ex: "votre site
met 6.2 secondes a charger, ce qui fait partir plus de la moitie de vos visiteurs
mobiles"].

C'est le genre de probleme que PrismaFlux corrige automatiquement.
Nos concessionnaires gagnent en moyenne 2h/jour sur la gestion de leurs annonces
et leur visibilite en ligne.

15 minutes d'appel suffiront pour vous montrer comment.

[Signature]
```

---

### Email 3 — La derniere chance (J+7)

**Objet** : `Derniere question, [Prenom]`

**Corps** :

```
Bonjour [Prenom],

Dernier message de ma part — je ne veux pas encombrer votre boite.

Une seule question : est-ce que la visibilite en ligne de [Concession]
est un sujet pour vous en ce moment ?

Si oui, je serais ravi d'en discuter.
Si non, aucun souci — je vous souhaite une excellente continuation.

[Signature]
```

---

## 5. Signature email

```
Eric [Nom]
Fondateur — PrismaFlux Auto
Vos copilotes IA pour l'automobile

contact@prismaflux.com
www.prismaflux.com
```

---

## 6. Metriques cibles

| Metrique | Objectif | Bon signe |
|----------|----------|-----------|
| Taux d'ouverture | > 40% | L'objet fonctionne |
| Taux de reponse | > 5% | Le message resonne |
| Taux de booking demo | > 2% | Le CTA est clair |
| Conversion demo -> client | > 20% | Le produit convainc |

Avec 200 emails/semaine :
- ~80 ouverts
- ~10 reponses
- ~4 demos bookees
- ~1 nouveau client/semaine
- **Objectif 1er mois : 3-5 clients payants**

---

## 7. Workflow complet

```
1. Sourcer les prospects (Apollo/Google Maps)
      |
2. Exporter en CSV (name, url, city)
      |
3. Lancer le batch scan
   npx tsx scripts/batch-generate.ts prospects.csv
      |
4. Recuperer les PDFs dans output/
      |
5. Importer dans Instantly.ai
   - Creer la sequence (3 emails)
   - Attacher le PDF personnalise a chaque prospect
   - Programmer l'envoi
      |
6. Suivre les metriques
   - Ouverts, reponses, bounces
   - Relancer manuellement les reponses chaudes
      |
7. Demo call (15 min)
   - Montrer l'app PrismaFlux en live
   - Montrer Marcus en action sur LEUR site
      |
8. Closing
   - Offre : 749 EUR/mois tout inclus
   - Essai gratuit 14 jours
```

---

## 8. Budget mensuel estime

| Poste | Cout/mois |
|-------|----------|
| Instantly.ai (emailing + warmup) | 30 USD |
| Domaine secondaire | ~1 EUR |
| Apollo.io (leads, plan gratuit) | 0 EUR |
| Google PageSpeed API (scan) | 0 EUR |
| **Total** | **~30 EUR/mois** |

Bien en dessous du budget de 50-150 EUR. Le reste peut servir pour :
- Un outil de verification d'emails (Zerobounce, ~15 EUR/mois) si le taux de bounce monte
- Un CRM basique (HubSpot gratuit) pour suivre les demos

---

## 9. Conseils cles

1. **Personnalisation = conversion**. Le PDF personnalise est votre arme principale. Un concessionnaire qui voit SON score, SES concurrents, SES problemes — ca accroche.

2. **Ne pas envoyer d'audit a un site qui score > 80**. Ca ne creera pas de douleur. Concentrez-vous sur les scores < 60.

3. **Le sujet de l'email est tout**. A/B testez systematiquement. Les sujets courts et directs marchent mieux que les sujets marketing.

4. **Repondre dans l'heure** aux reponses chaudes. Un concessionnaire qui repond, c'est rare — ne le laissez pas refroidir.

5. **Ne pas vendre dans le premier email**. Le cadeau d'abord, la demo ensuite. Le closing vient dans l'appel.

6. **Segmenter par taille**. Les petits garages (< 300K marge) ne payeront probablement pas 749 EUR/mois. Ciblez les moyens en priorite.

7. **Respecter le RGPD**. Chaque email doit avoir un lien de desinscription. Base legale : interet legitime (B2B).

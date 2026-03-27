# PrismaFlux — Agent Pinterest

Agent automatise qui publie chaque jour a 18h une image IA + contenu optimise sur Pinterest.

> **Note horaire** : Le cron Vercel est en UTC (`0 16 * * *` = 16h UTC).
> En ete (CEST, UTC+2) = **18h**. En hiver (CET, UTC+1) = **17h**.
> Pour garder 18h toute l'annee, changer en `0 17 * * *` fin octobre et `0 16 * * *` fin mars.

## Pipeline

1. **GPT-4o** genere un prompt image creatif (8 themes rotatifs automobile/IA/concessionnaire)
2. **gpt-image-1** cree une image portrait 1024x1536 (ratio 2:3 Pinterest)
3. **GPT-4o** redige titre + description FR + hashtags SEO
4. **Pinterest API v5** poste le pin sur le tableau cible
5. **Vercel Cron** declenche le pipeline tous les jours a 18h CET

## Setup

### 1. Variables d'environnement

Copier `.env.example` vers `.env` et remplir les valeurs :

```bash
cp .env.example .env
```

### 2. Obtenir le Pinterest Access Token

1. Aller sur https://developers.pinterest.com
2. Ouvrir ton app > onglet "Generate token"
3. Selectionner les scopes : `boards:read`, `pins:read`, `pins:write`
4. Copier le token dans `PINTEREST_ACCESS_TOKEN`

### 3. Trouver le Board ID

Demarrer le serveur et appeler l'endpoint boards :

```bash
npm run dev
curl http://localhost:3000/api/marketing/pinterest/boards
```

Copier l'`id` du tableau cible dans `PINTEREST_BOARD_ID`.

### 4. Generer le CRON_SECRET

```bash
openssl rand -hex 32
```

Copier la valeur dans `CRON_SECRET`.

## Endpoints

| Route | Methode | Usage |
|-------|---------|-------|
| `/api/marketing/pinterest/generate` | `GET` | Cron Vercel (auth Bearer CRON_SECRET) |
| `/api/marketing/pinterest/generate` | `POST` | Declenchement manuel |
| `/api/marketing/pinterest/test` | `POST` | Test complet sans publier sur Pinterest |
| `/api/marketing/pinterest/boards` | `GET` | Lister les boards Pinterest |

## Deploiement Vercel

1. Importer le repo sur Vercel (branche `feat/pinterest-agent`)
2. Ajouter les 4 variables d'environnement dans Settings > Environment Variables
3. Deployer — le cron `vercel.json` est detecte automatiquement
4. Verifier dans Vercel Dashboard > Cron Jobs que le job est actif

## Dev local

```bash
npm install
npm run dev
```

Tester le pipeline sans publier :

```bash
curl -X POST http://localhost:3000/api/marketing/pinterest/test
```

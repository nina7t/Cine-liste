# Cinéma Liste

Une application web pour explorer et choisir un film parmi votre collection Google Sheets. Design inspiré de l'app Sens Critique.

## Fonctionnalités

- 📱 **Mobile-first** - Interface optimisée pour mobile et desktop
- 🔍 **Recherche** - Recherchez par titre, réalisateur ou synopsis
- 🎲 **Sélection aléatoire** - Laissez le hasard choisir votre film
- 🏷️ **Filtres** - Filtrez par genre, plateforme, année
- 📊 **Vues grille/liste** - Deux modes d'affichage
- ⭐ **Notes** - Visualisez les notes des films

## Installation

```bash
npm install
npm run dev
```

## Configuration Google Sheets

1. Créez une feuille Google Sheets avec ces colonnes :
   - Titre | Réalisateur | Année | Genre | Durée | Note | Affiche URL | Synopsis | Plateforme | Vu | Date ajout

2. Créez un projet Google Cloud et activez l'API Google Sheets

3. Créez des credentials API Key

4. Partagez votre sheet en mode "Lien de partage : Tous ceux qui ont le lien"

5. Copiez le Sheet ID (l'ID dans l'URL) et votre API Key dans `.env.local` :

```
NEXT_PUBLIC_GOOGLE_SHEET_ID=votre_sheet_id
NEXT_PUBLIC_GOOGLE_API_KEY=votre_api_key
```

## Stack Technique

- Next.js 14
- React + TypeScript
- TailwindCSS
- Lucide Icons

## Design

Inspiré de l'application Sens Critique avec :
- Thème sombre élégant
- Accents orange/corail
- Cartes de films avec affiches
- Animations fluides

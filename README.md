# Portfolio — Karoui Elyess

Portfolio personnel d'un ingénieur full stack (mobile & backend). Site d'une seule page,
bilingue français / anglais, avec formulaire de contact.

**Stack :** Vite · React 18 · TypeScript · Tailwind CSS · shadcn/ui · Framer Motion

## Démarrer

```sh
npm install
npm run dev      # serveur de développement sur http://localhost:5173
```

| Commande | Effet |
| --- | --- |
| `npm run dev` | Serveur de développement avec rechargement à chaud |
| `npm run build` | Build de production dans `dist/` |
| `npm run preview` | Sert le build de production localement |
| `npm run lint` | ESLint sur l'ensemble du projet |

## Organisation

```
src/
├── components/
│   ├── common/        Reveal (animation d'apparition), SectionHeader
│   ├── ui/            composants shadcn/ui
│   └── *Section.tsx   une section de la page par fichier
├── contexts/          LanguageContext (français / anglais)
├── data/content.ts    contenu structuré et localisé (parcours, projets, formation)
├── i18n/              chaînes d'interface typées
└── index.css          design system : tokens de couleur, composants, utilitaires
```

### Modifier le contenu

- **Textes d'interface** (menus, boutons, titres) → `src/i18n/translations.ts`
- **Parcours, projets, formation** → `src/data/content.ts`
- **Coordonnées, liens, CV, logo** → constante `PROFILE` dans `src/data/content.ts`

Le français fait référence : le type `TranslationKey` en est déduit et la table anglaise
est typée `Record<TranslationKey, string>`. Ajouter une clé d'un seul côté, ou se tromper
dans un appel `t()`, provoque une **erreur de compilation** plutôt qu'un texte manquant
en production.

### Design system

Toutes les couleurs viennent de variables CSS définies dans `src/index.css`. Changer
l'ambiance du site revient à modifier le bloc `:root` — aucun composant ne contient de
couleur en dur.

## Ressources statiques

| Fichier | Rôle |
| --- | --- |
| `public/cv-karoui-elyess.pdf` | CV téléchargeable (boutons « Télécharger le CV ») |
| `public/new_logo.png` | Logo de la barre de navigation |
| `public/favicon.png`, `public/apple-touch-icon.png` | Icônes du site |
| `public/videos/*.mp4` | Démos, encodées en H.264 720p avec `+faststart` |
| `public/posters/*.jpg` | Vignettes affichées avant le chargement des vidéos |

> Les vidéos sont servies en statique et versionnées dans le dépôt. Si de nouvelles
> démos sont ajoutées, les réencoder en 720p avant de les committer — les fichiers bruts
> d'enregistrement d'écran font facilement plusieurs dizaines de mégaoctets chacun.

## Formulaire de contact

L'envoi passe par [EmailJS](https://www.emailjs.com/). Les identifiants sont publics par
conception (ils sont embarqués dans le bundle client) mais restent configurables :

```sh
cp .env.example .env   # puis renseigner les valeurs
```

Sans fichier `.env`, les identifiants par défaut du code sont utilisés.

**À faire côté EmailJS :** restreindre les domaines autorisés dans le tableau de bord.
C'est la seule protection réelle contre l'utilisation du point d'envoi par un tiers.
Un champ piège (honeypot) filtre déjà les robots les plus simples.

## Déploiement

Site statique : `npm run build` produit `dist/`, déployable tel quel sur Vercel, Netlify,
GitHub Pages ou tout hébergeur de fichiers.

Une seule configuration est nécessaire : comme il s'agit d'une application monopage,
toutes les routes doivent être redirigées vers `index.html`, sans quoi un rafraîchissement
sur une URL inconnue renverra une erreur 404 du serveur au lieu de la page 404 du site.

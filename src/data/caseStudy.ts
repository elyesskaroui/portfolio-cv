import type { Language } from '@/i18n/translations';

/* ==========================================================================
   TSE (BVMT) case study.
   Content supplied and checked by Elyess: no invented metrics, clients or
   quotes. Screens are frames taken from the real demo recording
   (public/videos/bvmt.mp4).
   ========================================================================== */

interface Section {
  index: string;
  title: string;
  accent: string;
}

export type DiagramKind = 'bvmt' | 'parking' | 'vibetok' | 'jobtracer' | 'fakenews' | 'crashscan' | 'lareine' | 'marketplace';

/** Hero "ad" stage: cut-out renders (white background) on a studio backdrop.
 *  `tone` is an HSL triplet, `shots` are left, centre, right. */
export type StudioIcon = 'shield' | 'sparkles' | 'radio' | 'chart' | 'bell' | 'calendar';

export interface Studio {
  tone: string;
  word: string;
  shots: { src: string; caption: string }[];
  tags: { label: string; icon: StudioIcon }[];
  /** 'tilted': strongly tilted centre render. 'cutout': transparent PNG phones (no blend). */
  variant?: 'tilted' | 'cutout' | 'phones' | 'layered';
}

export interface CaseStudy {
  slug: string;
  /** Which architecture diagram the page draws. */
  diagram: DiagramKind;
  /** Landscape poster of the demo, used when there are no portrait screens. */
  poster: string;
  /** Shows the green "in production" badge (only when it is true). */
  live?: boolean;
  title: string;
  tagline: string;
  intro: string;
  meta: { role: string; period: string; company: string; stack: string[] };
  figures: { value: string; label: string }[];
  context: Section & { body: string; label?: string; audiences: { name: string; detail: string }[] };
  architecture: Section & { body: string };
  decisions: Section & { items: { need: string; choice: string; detail: string }[] };
  /** `fan`: the three screens shown fanned out in the hero (left, centre, right).
   *  Defaults to the first three gallery items. */
  screens?: Section & { items: { src: string; caption: string }[]; fan?: string[]; landscape?: boolean };
  /** Optional product-ad stage for the hero, used instead of the fan. */
  studio?: Studio;
  result: Section & { body: string; items: string[] };
  /** Demo recording; without one the page hides the "watch" buttons. */
  video?: string;
}

const SCREENS = {
  marche: '/case/bvmt/marche.jpg',
  reporting: '/case/bvmt/reporting.jpg',
  valeur: '/case/bvmt/valeur.jpg',
  accueil: '/case/bvmt/accueil.jpg',
  assistant: '/case/bvmt/assistant.jpg',
  analyse: '/case/bvmt/analyse.jpg',
  alertes: '/case/bvmt/alertes.jpg',
  marketWatch: '/case/bvmt/market-watch.jpg',
  evolution: '/case/bvmt/evolution.jpg',
  iaMarche: '/case/bvmt/ia-marche.jpg',
  iaGraphique: '/case/bvmt/ia-graphique.jpg',
  avis: '/case/bvmt/avis.jpg',
};

const PARKING_SCREENS = {
  accueil: '/case/parking/accueil.jpg',
  places: '/case/parking/places.jpg',
  assistant: '/case/parking/assistant.jpg',
  reservation: '/case/parking/reservation.jpg',
  horaire: '/case/parking/horaire.jpg',
  vehicule: '/case/parking/vehicule.jpg',
  paiement: '/case/parking/paiement.jpg',
  carte: '/case/parking/carte.jpg',
  carteCvv: '/case/parking/carte-cvv.jpg',
  reservations: '/case/parking/reservations.jpg',
  minuteur: '/case/parking/minuteur.jpg',
  annulation: '/case/parking/annulation.jpg',
  assistantChat: '/case/parking/assistant-chat.jpg',
  profil: '/case/parking/profil.jpg',
  agent: '/case/parking/agent.jpg',
  remorquage: '/case/parking/remorquage.jpg',
};

const STACK = [
  'Flutter',
  'BLoC',
  'NestJS',
  'TypeScript',
  'MongoDB',
  'WebSocket',
  'Docker',
  'Claude Sonnet',
  'Llama 3.3 (Groq)',
];

const BVMT: Record<Language, CaseStudy> = {
  fr: {
    slug: 'bvmt',
    diagram: 'bvmt',
    live: true,
    poster: '/posters/bvmt.jpg',
    title: 'Application BVMT',
    tagline: 'Suivi de la Bourse de Tunis, mobile et web',
    intro:
      'Projet de fin d’études réalisé à la Bourse des Valeurs Mobilières de Tunis. TSE est une application mobile et web qui suit le marché boursier tunisien en direct. Elle propose trois espaces : visiteur, pour consulter le marché sans compte ; étudiant, pour les stages, les rendez-vous et la communauté ; administrateur, pour valider les inscriptions et traiter les demandes. Un assistant IA, à l’écrit et à la voix, aide à analyser le marché. L’application est sécurisée (JWT, rôles, mots de passe hachés) et optimisée (cache et compression). Je l’ai conçue et réalisée seul, de l’architecture à la mise en production.',
    meta: {
      role: 'Développeur full stack mobile & web (PFE)',
      period: 'Févr. 2026 — Juil. 2026, puis évolutions jusqu’en sept. 2026',
      company: 'BVMT — Bourse des Valeurs Mobilières de Tunis (Tunis Stock Exchange)',
      stack: STACK,
    },
    figures: [
      { value: '15', label: 'modules métier dans l’API' },
      { value: '3', label: 'publics servis' },
      { value: '3', label: 'langues : FR · EN · AR' },
      { value: '2', label: 'plateformes : Android + Web' },
    ],
    context: {
      index: '01',
      title: 'Le',
      accent: 'contexte.',
      body:
        'La Bourse de Tunis disposait d’une application mobile très basique, adossée à son ancien site. Quand ce site a été remplacé, l’application n’a pas suivi : le nouveau site n’a plus aucune application associée. Pour suivre un marché qui bouge pendant toute la séance, il faut désormais ouvrir un site pensé pour un ordinateur. D’où la question du projet : comment créer une application mobile de suivi du marché tunisien, rapide et fiable, dotée d’un assistant intelligent pour l’analyse, le reporting et l’aide à la décision ?',
      label: 'La problématique',
      audiences: [
        {
          name: 'Plus aucune application',
          detail: 'L’ancienne application n’a pas suivi la migration du site : le peu qui existait a disparu, et rien ne l’a remplacé.',
        },
        {
          name: 'Aucun accès aux données',
          detail: 'Les données existent, mais dispersées et publiées pour être lues par un humain : il fallait construire la couche manquante.',
        },
        {
          name: 'Un site pensé pour ordinateur',
          detail: 'Les cours changent en continu, mais il faut ouvrir un site non adapté au mobile et le rafraîchir à la main.',
        },
        {
          name: 'Des chiffres jamais expliqués',
          detail: 'L’utilisateur voit des chiffres sans savoir ce qu’ils signifient, ni pouvoir poser de question. Étudiants et grand public sont les plus pénalisés.',
        },
        {
          name: 'Aucune synthèse',
          detail: 'Personne ne fait le bilan, ni pendant la séance ni après : aucune synthèse fidèle à l’état du marché à un instant donné.',
        },
      ],
    },
    architecture: {
      index: '02',
      title: 'L’',
      accent: 'architecture.',
      body:
        'L’API privée de la Bourse n’est accessible que depuis son réseau interne : un PC collecteur installé à la Bourse l’interroge toutes les 5 à 10 secondes et écrit dans MongoDB Atlas. L’API NestJS hébergée sur Render lit aussi elle-même le site officiel et Grafana, orchestre les services d’IA et l’envoi d’e-mails, puis sert l’application TSE par rafraîchissement toutes les 10 secondes et WebSocket.',
    },
    decisions: {
      index: '03',
      title: 'Les choix',
      accent: 'techniques.',
      items: [
        {
          need: 'Récupérer les données de la Bourse sans saisie manuelle',
          choice: 'Collecte automatique planifiée',
          detail:
            'Le serveur interroge l’API officielle de la Bourse et ses courbes intraday, et complète avec une extraction web (Axios, Cheerio) pour les publications. Tout est enregistré automatiquement dans la base.',
        },
        {
          need: 'Afficher le marché presque en direct',
          choice: 'Rafraîchissement continu + WebSocket',
          detail:
            'Cours, indices et courbes intraday sont collectés toutes les 5 à 10 secondes et rafraîchis dans l’application toutes les 10 secondes. Les nouvelles publications et actualités sont poussées instantanément par WebSocket.',
        },
        {
          need: 'Trois publics, trois niveaux d’accès',
          choice: 'JWT et habilitations par rôle',
          detail: 'Authentification JWT avec jetons de rafraîchissement révocables, et droits définis par rôle.',
        },
        {
          need: 'Une IA adaptée à chaque usage',
          choice: 'Llama 3.3 et Claude Sonnet',
          detail:
            'Le chat textuel répond avec Llama 3.3 via Groq. Claudy, l’assistant vocal, utilise Claude Sonnet : Whisper transcrit la voix, puis la synthèse vocale lit la réponse. Les rapports automatisés sont rédigés par Claude Sonnet, et Llama 3.3 prend le relais si Claude ne répond pas.',
        },
        {
          need: 'Couvrir mobile et web sans doubler le travail',
          choice: 'Une seule application Flutter',
          detail: 'Même code pour Android et le web, gestion d’état par BLoC, en trois langues.',
        },
        {
          need: 'Organiser une API qui grandit',
          choice: 'Quinze modules métier',
          detail: 'API NestJS / TypeScript sur MongoDB (Mongoose), découpée par domaine fonctionnel.',
        },
      ],
    },
    studio: {
      tone: '217 91% 52%',
      word: 'TSE',
      variant: 'tilted',
      shots: [
        { src: '/case/bvmt/marche-studio.jpg', caption: 'Marché principal : indices, capitalisation, hausses et baisses' },
        { src: '/case/bvmt/accueil-studio.jpg', caption: 'Accueil personnalisé et cours actualisés en continu' },
        { src: '/case/bvmt/valeur-studio.jpg', caption: 'Fiche d’une valeur : dernier cours et graphique intraday' },
      ],
      tags: [
        { label: 'Cours en direct', icon: 'chart' },
        { label: 'Assistant IA', icon: 'sparkles' },
        { label: 'Alertes en temps réel', icon: 'bell' },
      ],
    },
    screens: {
      index: '04',
      title: 'L’application en',
      accent: 'images.',
      items: [
        { src: SCREENS.marche, caption: 'Marché principal : indices, capitalisation, hausses et baisses' },
        { src: SCREENS.accueil, caption: 'Accueil personnalisé et cours actualisés en continu' },
        { src: SCREENS.valeur, caption: 'Fiche d’une valeur : dernier cours et graphique intraday' },
        { src: SCREENS.reporting, caption: 'Reporting : rapports PDF et export de données' },
        { src: SCREENS.assistant, caption: 'Assistant IA : questions sur le marché' },
        { src: SCREENS.analyse, caption: 'Claudy, l’assistant vocal, analyse la séance' },
        { src: SCREENS.marketWatch, caption: 'Live Market Watch : séance du jour et indices en direct' },
        { src: SCREENS.evolution, caption: 'Évolution des indices et statistiques de la séance' },
        { src: SCREENS.alertes, caption: 'Alertes Prime : publications TSE et alertes marché en temps réel' },
        { src: SCREENS.iaMarche, caption: 'IA Advisor : état du marché et meilleures hausses' },
        { src: SCREENS.iaGraphique, caption: 'IA Advisor : graphique du TUNINDEX et questions suggérées' },
        { src: SCREENS.avis, caption: 'Avis des utilisateurs : notes et retours d’expérience' },
      ],
    },
    result: {
      index: '05',
      title: 'Le',
      accent: 'résultat.',
      body: 'TSE a été conteneurisée avec Docker et mise en production :',
      items: [
        'API déployée sur Render',
        'Base de données sur MongoDB Atlas',
        'Interface web publiée sur GitHub Pages',
        'APK Android signé, avec mise à jour automatique',
      ],
    },
    video: '/videos/bvmt.mp4',
  },
  en: {
    slug: 'bvmt',
    diagram: 'bvmt',
    live: true,
    poster: '/posters/bvmt.jpg',
    title: 'BVMT application',
    tagline: 'Tunis Stock Exchange tracking, mobile and web',
    intro:
      'Final-year project carried out at the Tunis Stock Exchange. TSE is a mobile and web application that tracks the Tunisian stock market live. It offers three spaces: visitor, to browse the market without an account; student, for internships, appointments and the community; administrator, to approve registrations and handle requests. An AI assistant, by text and by voice, helps analyse the market. The application is secured (JWT, roles, hashed passwords) and optimised (caching and compression). I designed and built it on my own, from architecture to production.',
    meta: {
      role: 'Full stack mobile & web developer (final-year project)',
      period: 'Feb. 2026 — Jul. 2026, then further work until Sep. 2026',
      company: 'BVMT — Bourse des Valeurs Mobilières de Tunis (Tunis Stock Exchange)',
      stack: STACK,
    },
    figures: [
      { value: '15', label: 'business modules in the API' },
      { value: '3', label: 'audiences served' },
      { value: '3', label: 'languages: FR · EN · AR' },
      { value: '2', label: 'platforms: Android + Web' },
    ],
    context: {
      index: '01',
      title: 'The',
      accent: 'context.',
      body:
        'The Tunis Stock Exchange had a very basic mobile app, tied to its former website. When that site was replaced, the app did not follow: the new site has no app at all. To follow a market that moves throughout the session, people now have to open a desktop-first website. Hence the project question: how to build a fast, reliable mobile app for the Tunisian market, with an intelligent assistant for analysis, reporting and decision support?',
      label: 'The problem',
      audiences: [
        {
          name: 'No app any more',
          detail: 'The old app did not survive the website migration: what little existed disappeared, and nothing replaced it.',
        },
        {
          name: 'No access to the data',
          detail: 'The data exists, but scattered and published for humans to read: the missing layer had to be built first.',
        },
        {
          name: 'A desktop-first website',
          detail: 'Prices change continuously, yet users must open a site not made for mobile and refresh it by hand.',
        },
        {
          name: 'Figures never explained',
          detail: 'Users see numbers without knowing what they mean, and cannot ask questions. Students and the public are hit hardest.',
        },
        {
          name: 'No summary',
          detail: 'Nobody sums up the market, during the session or after: no summary faithful to the market at a given moment.',
        },
      ],
    },
    architecture: {
      index: '02',
      title: 'The',
      accent: 'architecture.',
      body:
        'The exchange’s private API is only reachable from its internal network: a collector PC at the exchange polls it every 5 to 10 seconds and writes to MongoDB Atlas. The NestJS API hosted on Render also reads the official website and Grafana itself, orchestrates the AI services and email delivery, then serves the TSE app with a 10-second refresh and WebSocket.',
    },
    decisions: {
      index: '03',
      title: 'Technical',
      accent: 'choices.',
      items: [
        {
          need: 'Get exchange data without manual entry',
          choice: 'Scheduled automatic collection',
          detail:
            'The server queries the exchange’s official API and its intraday charts, and adds web scraping (Axios, Cheerio) for publications. Everything is stored automatically in the database.',
        },
        {
          need: 'Show the market almost live',
          choice: 'Continuous refresh + WebSocket',
          detail:
            'Prices, indices and intraday charts are collected every 5 to 10 seconds and refreshed in the app every 10 seconds. New publications and news are pushed instantly over WebSocket.',
        },
        {
          need: 'Three audiences, three access levels',
          choice: 'JWT and role-based permissions',
          detail: 'JWT authentication with revocable refresh tokens, and rights defined per role.',
        },
        {
          need: 'The right AI for each use',
          choice: 'Llama 3.3 and Claude Sonnet',
          detail:
            'The text chat answers with Llama 3.3 via Groq. Claudy, the voice assistant, uses Claude Sonnet: Whisper transcribes speech, then speech synthesis reads the answer. Automated reports are written by Claude Sonnet, with Llama 3.3 taking over if Claude does not respond.',
        },
        {
          need: 'Cover mobile and web without doubling the work',
          choice: 'A single Flutter application',
          detail: 'One codebase for Android and the web, state management with BLoC, in three languages.',
        },
        {
          need: 'Keep a growing API organised',
          choice: 'Fifteen business modules',
          detail: 'NestJS / TypeScript API on MongoDB (Mongoose), split by functional domain.',
        },
      ],
    },
    studio: {
      tone: '217 91% 52%',
      word: 'TSE',
      variant: 'tilted',
      shots: [
        { src: '/case/bvmt/marche-studio.jpg', caption: 'Main market: indices, capitalisation, gainers and losers' },
        { src: '/case/bvmt/accueil-studio.jpg', caption: 'Personalised home with continuously updated prices' },
        { src: '/case/bvmt/valeur-studio.jpg', caption: 'Stock page: last price and intraday chart' },
      ],
      tags: [
        { label: 'Live prices', icon: 'chart' },
        { label: 'AI assistant', icon: 'sparkles' },
        { label: 'Real-time alerts', icon: 'bell' },
      ],
    },
    screens: {
      index: '04',
      title: 'The app in',
      accent: 'pictures.',
      items: [
        { src: SCREENS.marche, caption: 'Main market: indices, capitalisation, gainers and losers' },
        { src: SCREENS.accueil, caption: 'Personalised home with continuously updated prices' },
        { src: SCREENS.valeur, caption: 'Stock page: last price and intraday chart' },
        { src: SCREENS.reporting, caption: 'Reporting: PDF reports and data export' },
        { src: SCREENS.assistant, caption: 'AI assistant: questions about the market' },
        { src: SCREENS.analyse, caption: 'Claudy, the voice assistant, analyses the session' },
        { src: SCREENS.marketWatch, caption: 'Live Market Watch: today’s session and live indices' },
        { src: SCREENS.evolution, caption: 'Index trends and session statistics' },
        { src: SCREENS.alertes, caption: 'Prime alerts: TSE publications and real-time market alerts' },
        { src: SCREENS.iaMarche, caption: 'AI Advisor: market status and top gainers' },
        { src: SCREENS.iaGraphique, caption: 'AI Advisor: TUNINDEX chart and suggested questions' },
        { src: SCREENS.avis, caption: 'User reviews: ratings and feedback' },
      ],
    },
    result: {
      index: '05',
      title: 'The',
      accent: 'outcome.',
      body: 'TSE was containerised with Docker and shipped to production:',
      items: [
        'API deployed on Render',
        'Database on MongoDB Atlas',
        'Web interface published on GitHub Pages',
        'Signed Android APK, with automatic updates',
      ],
    },
    video: '/videos/bvmt.mp4',
  },
};

/* ==========================================================================
   Smart parking case study (Innovation & Decision, Jul.–Sep. 2025).
   Built only from facts Elyess supplied (CV + journey entry): no invented
   metrics. No screen gallery yet — the page shows the real demo instead.
   ========================================================================== */

const PARKING_STACK = ['Flutter', 'Clean architecture', 'GetX', 'GetStorage', 'NestJS', 'WebSocket', 'API GPS', 'API IA', 'Paiement', 'Docker', 'Vercel'];
const PARKING_STACK_EN = ['Flutter', 'Clean architecture', 'GetX', 'GetStorage', 'NestJS', 'WebSocket', 'GPS API', 'AI API', 'Payments', 'Docker', 'Vercel'];

const PARKING: Record<Language, CaseStudy> = {
  fr: {
    slug: 'parking',
    diagram: 'parking',
    poster: '/posters/parking.jpg',
    title: 'Parking intelligent',
    tagline: 'Planifier, réserver, payer et être guidé vers sa place',
    intro:
      'Application mobile de stationnement intelligent, conçue et développée du backend (NestJS) au frontend (Flutter). Elle réunit dans une seule interface la réservation à distance, le suivi de la disponibilité en temps réel, le paiement numérique, la carte avec guidage GPS et un assistant IA qui recommande la place la plus adaptée. Réalisée en collaboration étroite avec l’équipe métier pour optimiser l’ergonomie et l’expérience utilisateur.',
    meta: {
      role: 'Développeur mobile full stack',
      period: 'Juil. 2025 — Sept. 2025',
      company: 'Innovation & Decision · Tunis',
      stack: PARKING_STACK,
    },
    figures: [
      { value: '5', label: 'fonctionnalités clés livrées' },
      { value: '5', label: 'problèmes résolus' },
      { value: '2', label: 'couches : API NestJS + app Flutter' },
      { value: '1', label: 'assistant IA de recommandation' },
    ],
    context: {
      index: '01',
      title: 'Le',
      accent: 'contexte.',
      body:
        'En ville, le trafic augmente et les places se raréfient. Chercher un stationnement fait perdre du temps aux automobilistes, aggrave la congestion et complique le travail des gestionnaires de parkings. Le numérique permet aujourd’hui de transformer ce service : informer en temps réel, réserver à l’avance et payer sans contrainte.',
      label: 'La problématique',
      audiences: [
        {
          name: 'Du temps perdu',
          detail: 'Chercher une place peut prendre de longues minutes, source de frustration et de perte de productivité.',
        },
        {
          name: 'Un impact environnemental',
          detail: 'Tourner à vide pour trouver une place augmente les émissions de CO₂ et la pollution urbaine.',
        },
        {
          name: 'Une gestion complexe',
          detail: 'Les gestionnaires peinent à optimiser l’occupation et à informer les usagers en temps réel.',
        },
        {
          name: 'Un paiement dépassé',
          detail: 'Horodateurs et caisses manuelles manquent de flexibilité et dégradent l’expérience.',
        },
        {
          name: 'Aucune aide au choix',
          detail: 'Sans information personnalisée, l’usager ne peut pas choisir le stationnement le plus adapté à son besoin.',
        },
      ],
    },
    architecture: {
      index: '02',
      title: 'L’',
      accent: 'architecture.',
      body:
        'Une application Flutter structurée en clean architecture, avec GetX pour l’état et la navigation, adossée à une API REST NestJS qui gère la réservation, la disponibilité et la facturation. Les changements arrivent en temps réel par WebSocket ; la carte et le guidage s’appuient sur une API GPS, et l’assistant sur une API d’IA.',
    },
    decisions: {
      index: '03',
      title: 'La solution,',
      accent: 'choix par choix.',
      items: [
        {
          need: 'Sécuriser sa place avant de partir',
          choice: 'Réservation à distance',
          detail: 'La réservation anticipée supprime l’incertitude : l’usager sait où il se gare avant même de prendre la route.',
        },
        {
          need: 'Voir une place se libérer sans recharger',
          choice: 'Disponibilité en temps réel · WebSocket',
          detail: 'L’état des places et les notifications sont poussés en direct : l’écran se met à jour dès qu’une place est réservée ou libérée.',
        },
        {
          need: 'Remplacer l’horodateur',
          choice: 'Paiement numérique intégré',
          detail: 'Paiement électronique (cartes bancaires, portefeuilles numériques) directement dans le parcours de réservation, fluide et sécurisé.',
        },
        {
          need: 'Choisir la place la plus adaptée',
          choice: 'Assistant IA de recommandation',
          detail:
            'Un chatbot analyse le besoin de l’usager (véhicule électrique ou thermique, horaires, budget) et recommande : places disponibles selon le type de véhicule, occupation prévue des parkings, meilleur étage et emplacement, estimation des temps de trajet et de stationnement.',
        },
        {
          need: 'Trouver le parking, puis la place',
          choice: 'Carte et guidage · API GPS',
          detail: 'Géolocalisation des parkings sur une carte interactive et guidage jusqu’à la place réservée.',
        },
        {
          need: 'Un code qui reste facile à faire évoluer',
          choice: 'Clean architecture',
          detail: 'Application découpée en couches indépendantes (présentation, domaine, données) : testable, maintenable et prête à grandir.',
        },
        {
          need: 'Une interface fluide et réactive',
          choice: 'GetX + GetStorage',
          detail: 'GetX pour la gestion d’état, l’injection de dépendances et la navigation ; cache local GetStorage pour un usage hors connexion partiel.',
        },
        {
          need: 'Une ergonomie validée par le terrain',
          choice: 'Co-conception avec l’équipe métier',
          detail: 'Collaboration étroite avec l’équipe métier pour optimiser l’ergonomie et l’expérience utilisateur à chaque étape.',
        },
      ],
    },
    studio: {
      tone: '28 100% 52%',
      word: 'ParkEasy',
      shots: [
        { src: '/case/parking/accueil-studio.jpg', caption: 'ParkEasy : écran d’accueil' },
        { src: '/case/parking/vehicule-studio.jpg', caption: 'Ajout d’un véhicule avec sa plaque d’immatriculation' },
        { src: '/case/parking/carte-cvv-studio.jpg', caption: 'Saisie du CVV avec carte animée' },
      ],
      tags: [
        { label: 'Paiement sécurisé', icon: 'shield' },
        { label: 'Assistant IA', icon: 'sparkles' },
        { label: 'Places en temps réel', icon: 'radio' },
      ],
    },
    screens: {
      index: '04',
      title: 'L’application en',
      accent: 'images.',
      items: [
        { src: PARKING_SCREENS.accueil, caption: 'ParkEasy : écran d’accueil' },
        { src: PARKING_SCREENS.places, caption: 'Choix de la place : plan par étage, places libres, occupées et électriques' },
        { src: PARKING_SCREENS.assistant, caption: 'Assistant IA : tableau de bord et recommandation du meilleur étage' },
        { src: PARKING_SCREENS.reservation, caption: 'Réservation : date, durée, heures et prix calculé' },
        { src: PARKING_SCREENS.horaire, caption: 'Sélection de l’heure d’arrivée' },
        { src: PARKING_SCREENS.vehicule, caption: 'Ajout d’un véhicule avec sa plaque d’immatriculation' },
        { src: PARKING_SCREENS.paiement, caption: 'Paiement : Apple Pay, portefeuille numérique ou sur place' },
        { src: PARKING_SCREENS.carte, caption: 'Paiement par carte bancaire sécurisé' },
        { src: PARKING_SCREENS.carteCvv, caption: 'Saisie du CVV avec carte animée' },
        { src: PARKING_SCREENS.reservations, caption: 'Mes réservations : en cours et à venir' },
        { src: PARKING_SCREENS.minuteur, caption: 'Stationnement en cours : minuteur en temps réel' },
        { src: PARKING_SCREENS.annulation, caption: 'Annulation d’une réservation et politique de remboursement' },
        { src: PARKING_SCREENS.assistantChat, caption: 'Assistant IA : réponses sur les places électriques' },
        { src: PARKING_SCREENS.profil, caption: 'Profil, historique d’achats et paramètres' },
        { src: PARKING_SCREENS.agent, caption: 'Espace agent : tableau de bord des remorquages' },
        { src: PARKING_SCREENS.remorquage, caption: 'Espace agent : enregistrement d’un remorquage' },
      ],
    },
    result: {
      index: '05',
      title: 'Le',
      accent: 'résultat.',
      body:
        'Une application unique pour planifier, réserver, payer et être guidé jusqu’à sa place, avec un assistant qui aide à choisir. Pour les gestionnaires, une meilleure occupation des parkings et moins de gestion manuelle. Le projet a été conteneurisé avec Docker, déployé sur Vercel, et l’application est disponible en version APK Android.',
      items: [
        'Réservation à distance',
        'Disponibilité en temps réel',
        'Paiement numérique sécurisé',
        'Carte et guidage GPS',
        'Assistant IA de recommandation',
        'Conteneurisé avec Docker',
        'Déployé sur Vercel',
        'Disponible en APK Android',
      ],
    },
    video: '/videos/parking.mp4',
  },
  en: {
    slug: 'parking',
    diagram: 'parking',
    poster: '/posters/parking.jpg',
    title: 'Smart parking',
    tagline: 'Plan, book, pay and get guided to your space',
    intro:
      'A smart parking mobile application, designed and built from the backend (NestJS) to the frontend (Flutter). A single interface brings together remote booking, real-time availability, digital payment, a map with GPS guidance and an AI assistant that recommends the best-suited space. Built in close collaboration with the business team to optimise ergonomics and user experience.',
    meta: {
      role: 'Full stack mobile developer',
      period: 'Jul. 2025 — Sep. 2025',
      company: 'Innovation & Decision · Tunis',
      stack: PARKING_STACK_EN,
    },
    figures: [
      { value: '5', label: 'key features delivered' },
      { value: '5', label: 'problems addressed' },
      { value: '2', label: 'layers: NestJS API + Flutter app' },
      { value: '1', label: 'AI recommendation assistant' },
    ],
    context: {
      index: '01',
      title: 'The',
      accent: 'context.',
      body:
        'In cities, traffic keeps growing while parking spaces become scarce. Looking for a space wastes drivers’ time, worsens congestion and makes car park operators’ work harder. Digital tools can now transform this service: real-time information, booking ahead and hassle-free payment.',
      label: 'The problem',
      audiences: [
        {
          name: 'Wasted time',
          detail: 'Looking for a space can take many minutes, a source of frustration and lost productivity.',
        },
        {
          name: 'Environmental impact',
          detail: 'Driving around in search of a space increases CO₂ emissions and urban pollution.',
        },
        {
          name: 'Complex operations',
          detail: 'Operators struggle to optimise occupancy and to inform users in real time.',
        },
        {
          name: 'Outdated payment',
          detail: 'Parking meters and manual tills lack flexibility and hurt the experience.',
        },
        {
          name: 'No help to choose',
          detail: 'Without personalised information, users cannot pick the parking that best fits their needs.',
        },
      ],
    },
    architecture: {
      index: '02',
      title: 'The',
      accent: 'architecture.',
      body:
        'A Flutter application built with clean architecture, using GetX for state and navigation, backed by a NestJS REST API handling booking, availability and billing. Changes arrive in real time over WebSocket; the map and guidance rely on a GPS API, and the assistant on an AI API.',
    },
    decisions: {
      index: '03',
      title: 'The solution,',
      accent: 'choice by choice.',
      items: [
        {
          need: 'Secure a space before leaving',
          choice: 'Remote booking',
          detail: 'Booking ahead removes the uncertainty: users know where they will park before they even set off.',
        },
        {
          need: 'See a space free up without refreshing',
          choice: 'Real-time availability · WebSocket',
          detail: 'Space status and notifications are pushed live: the screen updates as soon as a space is booked or freed.',
        },
        {
          need: 'Replace the parking meter',
          choice: 'Integrated digital payment',
          detail: 'Electronic payment (bank cards, digital wallets) right inside the booking journey, smooth and secure.',
        },
        {
          need: 'Pick the best-suited space',
          choice: 'AI recommendation assistant',
          detail:
            'A chatbot analyses the user’s needs (electric or combustion vehicle, timing, budget) and recommends: available spaces by vehicle type, expected car park occupancy, the best floor and spot, and estimated travel and parking times.',
        },
        {
          need: 'Find the car park, then the space',
          choice: 'Map and guidance · GPS API',
          detail: 'Car parks located on an interactive map, with guidance to the booked space.',
        },
        {
          need: 'Code that stays easy to evolve',
          choice: 'Clean architecture',
          detail: 'The app is split into independent layers (presentation, domain, data): testable, maintainable and ready to grow.',
        },
        {
          need: 'A smooth, reactive interface',
          choice: 'GetX + GetStorage',
          detail: 'GetX for state management, dependency injection and navigation; a local GetStorage cache for partial offline use.',
        },
        {
          need: 'Ergonomics validated in the field',
          choice: 'Co-design with the business team',
          detail: 'Close collaboration with the business team to optimise ergonomics and user experience at every step.',
        },
      ],
    },
    studio: {
      tone: '28 100% 52%',
      word: 'ParkEasy',
      shots: [
        { src: '/case/parking/accueil-studio.jpg', caption: 'ParkEasy: welcome screen' },
        { src: '/case/parking/vehicule-studio.jpg', caption: 'Adding a vehicle with its number plate' },
        { src: '/case/parking/carte-cvv-studio.jpg', caption: 'Entering the CVV on an animated card' },
      ],
      tags: [
        { label: 'Secure payment', icon: 'shield' },
        { label: 'AI assistant', icon: 'sparkles' },
        { label: 'Live availability', icon: 'radio' },
      ],
    },
    screens: {
      index: '04',
      title: 'The app in',
      accent: 'pictures.',
      items: [
        { src: PARKING_SCREENS.accueil, caption: 'ParkEasy: welcome screen' },
        { src: PARKING_SCREENS.places, caption: 'Choosing a space: floor plan with free, taken and electric spaces' },
        { src: PARKING_SCREENS.assistant, caption: 'AI assistant: dashboard and best-floor recommendation' },
        { src: PARKING_SCREENS.reservation, caption: 'Booking: date, duration, hours and computed price' },
        { src: PARKING_SCREENS.horaire, caption: 'Picking the arrival time' },
        { src: PARKING_SCREENS.vehicule, caption: 'Adding a vehicle with its number plate' },
        { src: PARKING_SCREENS.paiement, caption: 'Payment: Apple Pay, digital wallet or on arrival' },
        { src: PARKING_SCREENS.carte, caption: 'Secure bank card payment' },
        { src: PARKING_SCREENS.carteCvv, caption: 'Entering the CVV on an animated card' },
        { src: PARKING_SCREENS.reservations, caption: 'My bookings: active and upcoming' },
        { src: PARKING_SCREENS.minuteur, caption: 'Active parking: real-time timer' },
        { src: PARKING_SCREENS.annulation, caption: 'Cancelling a booking and refund policy' },
        { src: PARKING_SCREENS.assistantChat, caption: 'AI assistant: answers about electric spaces' },
        { src: PARKING_SCREENS.profil, caption: 'Profile, purchase history and settings' },
        { src: PARKING_SCREENS.agent, caption: 'Agent area: towing dashboard' },
        { src: PARKING_SCREENS.remorquage, caption: 'Agent area: logging a tow' },
      ],
    },
    result: {
      index: '05',
      title: 'The',
      accent: 'outcome.',
      body:
        'A single application to plan, book, pay and get guided to a space, with an assistant that helps choose. For operators: better car park occupancy and less manual work. The project was containerised with Docker, deployed on Vercel, and the app is available as an Android APK.',
      items: [
        'Remote booking',
        'Real-time availability',
        'Secure digital payment',
        'Map and GPS guidance',
        'AI recommendation assistant',
        'Containerised with Docker',
        'Deployed on Vercel',
        'Available as an Android APK',
      ],
    },
    video: '/videos/parking.mp4',
  },
};

/* ==========================================================================
   Vibe Tok — short-video social app with AI moderation and AI inspiration
   ========================================================================== */

const VIBE_SCREENS = {
  accueil: '/case/vibe-tok/accueil.jpg',
  flux: '/case/vibe-tok/flux.jpg',
  fluxSport: '/case/vibe-tok/flux-sport.jpg',
  lives: '/case/vibe-tok/lives.jpg',
  live: '/case/vibe-tok/live.jpg',
  cadeau: '/case/vibe-tok/cadeau.jpg',
  portefeuille: '/case/vibe-tok/portefeuille.jpg',
  profil: '/case/vibe-tok/profil.jpg',
};

const VIBE_STACK = ['Flutter', 'Dart', 'GetX', 'GetStorage', 'Live streaming', 'IA · modération', 'IA · tendances'];
const VIBE_STACK_EN = ['Flutter', 'Dart', 'GetX', 'GetStorage', 'Live streaming', 'AI · moderation', 'AI · trends'];

const VIBE: Record<Language, CaseStudy> = {
  fr: {
    slug: 'vibe-tok',
    diagram: 'vibetok',
    poster: '/posters/vibe-tok.jpg',
    title: 'Vibe Tok',
    tagline: 'Le réseau de vidéos courtes protégé et boosté par l’IA',
    intro:
      'Application mobile Flutter de partage de vidéos courtes, dans l’esprit de TikTok, livrée en mission freelance. Elle couvre tout le parcours social : publication de vidéos, likes, commentaires, partages et live streaming intégré au flux principal. Deux intelligences artificielles l’accompagnent : la première analyse chaque image et chaque vidéo avant publication et bloque automatiquement tout contenu dangereux ou inapproprié ; la seconde suit les tendances et propose aux créateurs des idées pour gagner en vues et en j’aime.',
    meta: {
      role: 'Développeur mobile · mission freelance',
      period: '2025',
      company: 'Vibe Tok · à distance',
      stack: VIBE_STACK,
    },
    figures: [
      { value: '5', label: 'fonctionnalités sociales livrées' },
      { value: '2', label: 'IA : modération et inspiration' },
      { value: '2', label: 'types de contenus analysés : image et vidéo' },
      { value: '1', label: 'flux unique pour les vidéos et les lives' },
    ],
    context: {
      index: '01',
      title: 'Le',
      accent: 'contexte.',
      body:
        'Les plateformes de vidéos courtes vivent au rythme des publications : des milliers de contenus sont mis en ligne chaque jour et diffusés en quelques secondes. Ce succès pose deux défis : protéger la communauté contre les contenus dangereux, et aider les créateurs à trouver quoi publier pour être vus.',
      label: 'La problématique',
      audiences: [
        {
          name: 'Des contenus dangereux',
          detail: 'Une image ou une vidéo violente, choquante ou inappropriée peut être publiée en quelques secondes et toucher toute la communauté.',
        },
        {
          name: 'Une modération manuelle dépassée',
          detail: 'Vérifier chaque publication à la main ne suit pas le rythme des mises en ligne, et le contenu est déjà vu quand il est retiré.',
        },
        {
          name: 'La page blanche des créateurs',
          detail: 'Les créateurs ne savent pas toujours quoi publier, ni quels sujets et formats sont en tendance.',
        },
        {
          name: 'Une audience difficile à gagner',
          detail: 'Sans repères sur les tendances, les vidéos peinent à gagner des vues et des j’aime.',
        },
        {
          name: 'Une exigence de fluidité',
          detail: 'Vidéos, lives et interactions doivent rester fluides, même sur des téléphones d’entrée de gamme.',
        },
      ],
    },
    architecture: {
      index: '02',
      title: 'L’',
      accent: 'architecture.',
      body:
        'Une application Flutter organisée autour de GetX (état réactif, injection de dépendances, navigation) et de GetStorage (stockage local). Avant toute mise en ligne, l’image ou la vidéo passe par un contrôle IA : si le contenu est sûr, il est publié dans le flux ; s’il est dangereux, la publication est bloquée. Une seconde IA analyse les tendances et propose des idées aux créateurs.',
    },
    decisions: {
      index: '03',
      title: 'La solution,',
      accent: 'choix par choix.',
      items: [
        {
          need: 'Protéger la communauté avant la mise en ligne',
          choice: 'Modération par IA · image et vidéo',
          detail:
            'Chaque publication est analysée par l’IA avant d’être mise en ligne. Si elle détecte un contenu dangereux, violent ou inapproprié, la publication est bloquée : le contenu n’atteint jamais le flux.',
        },
        {
          need: 'Aider les créateurs à percer',
          choice: 'IA d’inspiration · tendances',
          detail:
            'L’IA repère les sujets et formats en tendance et propose des idées et des pistes d’inspiration pour gagner en vues et en j’aime.',
        },
        {
          need: 'Publier en quelques gestes',
          choice: 'Flux de publication vidéo',
          detail: 'Capture ou import de la vidéo, aperçu, description, contrôle IA, puis mise en ligne dans le flux principal.',
        },
        {
          need: 'Faire vivre la communauté',
          choice: 'Likes, commentaires et partages',
          detail: 'Des interactions en un geste, avec des compteurs mis à jour immédiatement à l’écran.',
        },
        {
          need: 'Partager en direct',
          choice: 'Live streaming intégré au flux',
          detail: 'Les lives apparaissent directement dans le flux principal, au même endroit que les vidéos.',
        },
        {
          need: 'Une interface réactive',
          choice: 'GetX',
          detail: 'Gestion d’état réactive, injection de dépendances et navigation : l’écran suit chaque like, commentaire ou nouveau live sans rechargement.',
        },
        {
          need: 'Un démarrage rapide',
          choice: 'Stockage local · GetStorage',
          detail: 'Préférences et données de session conservées sur le téléphone, pour retrouver son flux instantanément.',
        },
        {
          need: 'Fluide sur tous les téléphones',
          choice: 'Optimisation des performances',
          detail: 'Interface optimisée pour rester fluide, même sur des appareils d’entrée de gamme.',
        },
      ],
    },
    studio: {
      tone: '330 90% 56%',
      word: 'Vibe Tok',
      shots: [
        { src: '/case/vibe-tok/accueil-studio.jpg', caption: 'Écran d’accueil Vibe Tok' },
        { src: '/case/vibe-tok/flux-studio.jpg', caption: 'Flux de vidéos : j’aime, commentaires et partages' },
        { src: '/case/vibe-tok/cadeau-studio.jpg', caption: 'Envoi d’un cadeau virtuel pendant un live' },
      ],
      tags: [
        { label: 'Modération IA', icon: 'shield' },
        { label: 'Live streaming', icon: 'radio' },
        { label: 'Tendances IA', icon: 'sparkles' },
      ],
    },
    screens: {
      index: '04',
      title: 'L’application en',
      accent: 'images.',
      items: [
        { src: VIBE_SCREENS.accueil, caption: 'Écran d’accueil Vibe Tok' },
        { src: VIBE_SCREENS.flux, caption: 'Flux de vidéos : j’aime, commentaires et partages' },
        { src: VIBE_SCREENS.fluxSport, caption: 'Flux : vidéo sport et bouton Suivre' },
        { src: VIBE_SCREENS.lives, caption: 'Lives en cours, classés par catégorie' },
        { src: VIBE_SCREENS.live, caption: 'Live : réactions et cadeaux en direct' },
        { src: VIBE_SCREENS.cadeau, caption: 'Envoi d’un cadeau virtuel pendant un live' },
        { src: VIBE_SCREENS.portefeuille, caption: 'Portefeuille : solde, carte et conversion des vues' },
        { src: VIBE_SCREENS.profil, caption: 'Profil créateur : abonnés, vidéos et lives' },
      ],
    },
    result: {
      index: '05',
      title: 'Le',
      accent: 'résultat.',
      body:
        'Une application de vidéos courtes complète, livrée en mission freelance : la communauté publie, réagit et partage en direct dans un flux protégé, car chaque contenu passe par l’IA avant d’être mis en ligne, et les créateurs disposent d’idées inspirées des tendances pour développer leur audience.',
      items: [
        'Publication de vidéos',
        'Likes, commentaires et partages',
        'Live streaming intégré',
        'Modération IA avant publication',
        'Idées de tendances par l’IA',
        'Fluide sur entrée de gamme',
      ],
    },
    video: '/videos/vibe-tok.mp4',
  },
  en: {
    slug: 'vibe-tok',
    diagram: 'vibetok',
    poster: '/posters/vibe-tok.jpg',
    title: 'Vibe Tok',
    tagline: 'The short-video network protected and boosted by AI',
    intro:
      'A TikTok-style Flutter mobile app for sharing short videos, delivered as a freelance project. It covers the whole social journey: video posting, likes, comments, sharing and live streaming built into the main feed. Two AIs support it: the first analyses every image and video before publication and automatically blocks any dangerous or inappropriate content; the second follows trends and gives creators ideas to earn more views and likes.',
    meta: {
      role: 'Mobile developer · freelance',
      period: '2025',
      company: 'Vibe Tok · remote',
      stack: VIBE_STACK_EN,
    },
    figures: [
      { value: '5', label: 'social features delivered' },
      { value: '2', label: 'AIs: moderation and inspiration' },
      { value: '2', label: 'content types analysed: image and video' },
      { value: '1', label: 'single feed for videos and lives' },
    ],
    context: {
      index: '01',
      title: 'The',
      accent: 'context.',
      body:
        'Short-video platforms live at the pace of their uploads: thousands of pieces of content go online every day and spread within seconds. That success brings two challenges: protecting the community from dangerous content, and helping creators find what to post to get seen.',
      label: 'The problem',
      audiences: [
        {
          name: 'Dangerous content',
          detail: 'A violent, shocking or inappropriate image or video can be posted in seconds and reach the whole community.',
        },
        {
          name: 'Manual moderation can’t keep up',
          detail: 'Checking every post by hand can’t match the upload pace, and content has already been seen by the time it is removed.',
        },
        {
          name: 'Creator’s block',
          detail: 'Creators don’t always know what to post, or which topics and formats are trending.',
        },
        {
          name: 'An audience that is hard to win',
          detail: 'Without a sense of the trends, videos struggle to earn views and likes.',
        },
        {
          name: 'A need for fluidity',
          detail: 'Videos, lives and interactions must stay smooth, even on entry-level phones.',
        },
      ],
    },
    architecture: {
      index: '02',
      title: 'The',
      accent: 'architecture.',
      body:
        'A Flutter application built around GetX (reactive state, dependency injection, navigation) and GetStorage (local storage). Before anything goes online, the image or video goes through an AI check: safe content is published to the feed; dangerous content is blocked. A second AI analyses trends and suggests ideas to creators.',
    },
    decisions: {
      index: '03',
      title: 'The solution,',
      accent: 'choice by choice.',
      items: [
        {
          need: 'Protect the community before publication',
          choice: 'AI moderation · image and video',
          detail:
            'Every post is analysed by the AI before it goes online. If it detects dangerous, violent or inappropriate content, the post is blocked: it never reaches the feed.',
        },
        {
          need: 'Help creators break through',
          choice: 'AI inspiration · trends',
          detail: 'The AI spots trending topics and formats and suggests ideas and inspiration to earn more views and likes.',
        },
        {
          need: 'Post in a few taps',
          choice: 'Video publishing flow',
          detail: 'Capture or import the video, preview, caption, AI check, then publish to the main feed.',
        },
        {
          need: 'Bring the community to life',
          choice: 'Likes, comments and shares',
          detail: 'One-tap interactions, with counters updated instantly on screen.',
        },
        {
          need: 'Share live',
          choice: 'Live streaming in the feed',
          detail: 'Lives appear right in the main feed, alongside the videos.',
        },
        {
          need: 'A responsive interface',
          choice: 'GetX',
          detail: 'Reactive state, dependency injection and navigation: the screen follows every like, comment or new live without reloading.',
        },
        {
          need: 'A fast start',
          choice: 'Local storage · GetStorage',
          detail: 'Preferences and session data kept on the phone, so the feed is back instantly.',
        },
        {
          need: 'Smooth on every phone',
          choice: 'Performance tuning',
          detail: 'Interface tuned to stay fluid, even on entry-level devices.',
        },
      ],
    },
    studio: {
      tone: '330 90% 56%',
      word: 'Vibe Tok',
      shots: [
        { src: '/case/vibe-tok/accueil-studio.jpg', caption: 'Vibe Tok welcome screen' },
        { src: '/case/vibe-tok/flux-studio.jpg', caption: 'Video feed: likes, comments and shares' },
        { src: '/case/vibe-tok/cadeau-studio.jpg', caption: 'Sending a virtual gift during a live' },
      ],
      tags: [
        { label: 'AI moderation', icon: 'shield' },
        { label: 'Live streaming', icon: 'radio' },
        { label: 'AI trends', icon: 'sparkles' },
      ],
    },
    screens: {
      index: '04',
      title: 'The app in',
      accent: 'pictures.',
      items: [
        { src: VIBE_SCREENS.accueil, caption: 'Vibe Tok welcome screen' },
        { src: VIBE_SCREENS.flux, caption: 'Video feed: likes, comments and shares' },
        { src: VIBE_SCREENS.fluxSport, caption: 'Feed: sports video and Follow button' },
        { src: VIBE_SCREENS.lives, caption: 'Live streams, sorted by category' },
        { src: VIBE_SCREENS.live, caption: 'Live: real-time reactions and gifts' },
        { src: VIBE_SCREENS.cadeau, caption: 'Sending a virtual gift during a live' },
        { src: VIBE_SCREENS.portefeuille, caption: 'Wallet: balance, card and views conversion' },
        { src: VIBE_SCREENS.profil, caption: 'Creator profile: followers, videos and lives' },
      ],
    },
    result: {
      index: '05',
      title: 'The',
      accent: 'outcome.',
      body:
        'A complete short-video app, delivered as a freelance project: the community posts, reacts and shares live in a protected feed, since every piece of content goes through the AI before going online, and creators get trend-inspired ideas to grow their audience.',
      items: [
        'Video posting',
        'Likes, comments and shares',
        'Built-in live streaming',
        'AI moderation before posting',
        'Trend ideas from the AI',
        'Smooth on entry-level phones',
      ],
    },
    video: '/videos/vibe-tok.mp4',
  },
};

const JOB_SCREENS = {
  lancement: '/case/jobtracer/lancement.jpg',
  connexion: '/case/jobtracer/connexion.jpg',
  motDePasse: '/case/jobtracer/mot-de-passe.jpg',
  candidatures: '/case/jobtracer/candidatures.jpg',
  filtres: '/case/jobtracer/filtres.jpg',
  calendrier: '/case/jobtracer/calendrier.jpg',
  agenda: '/case/jobtracer/agenda.jpg',
  ajout: '/case/jobtracer/ajout.jpg',
  repartition: '/case/jobtracer/repartition.jpg',
  statistiques: '/case/jobtracer/statistiques.jpg',
  parametres: '/case/jobtracer/parametres.jpg',
};

const JOB_STACK = ['Flutter', 'Dart', 'GetX', 'GetStorage', 'Django', 'API REST', 'IA'];
const JOB_STACK_EN = ['Flutter', 'Dart', 'GetX', 'GetStorage', 'Django', 'REST API', 'AI'];

const JOBTRACER: Record<Language, CaseStudy> = {
  fr: {
    slug: 'jobtracer',
    diagram: 'jobtracer',
    poster: '/posters/jobTracer.jpg',
    title: 'JobTracer',
    tagline: 'Suivre ses candidatures, guidé par l’IA',
    intro:
      'Application mobile Flutter de suivi des candidatures, adossée à un backend Django et livrée en mission freelance. Elle centralise toutes les candidatures, les organise par statut (Postulé, Entretien, Accepté…) et affiche les échéances et les entretiens dans un calendrier intégré. Une couche d’IA fait gagner du temps à chaque étape : analyse automatique des offres, score de compatibilité entre le CV et l’offre, rédaction de lettres de motivation et d’e-mails de relance, et un assistant qui répond aux questions sur le suivi et suggère les prochaines actions.',
    meta: {
      role: 'Développeur mobile full stack · mission freelance',
      period: '2024',
      company: 'JobTracer · à distance',
      stack: JOB_STACK,
    },
    figures: [
      { value: '4', label: 'fonctionnalités d’IA intégrées' },
      { value: '1', label: 'calendrier des échéances et entretiens' },
      { value: '2', label: 'couches : app Flutter + backend Django' },
      { value: '0', label: 'saisie manuelle : l’IA remplit la candidature' },
    ],
    context: {
      index: '01',
      title: 'Le',
      accent: 'contexte.',
      body:
        'Une recherche d’emploi, ce sont des dizaines de candidatures en parallèle, chacune avec ses dates, ses entretiens et ses relances. Sans outil dédié, le suivi se disperse entre e-mails, tableurs et notes, et les opportunités se perdent.',
      label: 'La problématique',
      audiences: [
        {
          name: 'Des candidatures éparpillées',
          detail: 'Offres, e-mails, tableurs et notes : le suivi est dispersé et des opportunités se perdent.',
        },
        {
          name: 'Des échéances oubliées',
          detail: 'Dates limites, entretiens et relances se chevauchent, sans vue d’ensemble.',
        },
        {
          name: 'Une saisie fastidieuse',
          detail: 'Recopier chaque offre (poste, entreprise, salaire, compétences) prend du temps et décourage le suivi.',
        },
        {
          name: 'Des candidatures peu ciblées',
          detail: 'Difficile de savoir, avant de postuler, si son profil correspond vraiment à l’offre.',
        },
        {
          name: 'Des relances qui n’arrivent jamais',
          detail: 'Sans rappel ni modèle, on ne relance pas, et les candidatures restent sans réponse.',
        },
      ],
    },
    architecture: {
      index: '02',
      title: 'L’',
      accent: 'architecture.',
      body:
        'Une application Flutter qui gère son état avec GetX et conserve les données sur le téléphone avec GetStorage, synchronisée avec une API Django. C’est le backend qui appelle les services d’IA, côté serveur, sans jamais exposer de clé dans l’application : analyse d’offre, score CV / offre, rédaction et assistant de suivi.',
    },
    decisions: {
      index: '03',
      title: 'La solution,',
      accent: 'choix par choix.',
      items: [
        {
          need: 'Ne plus recopier les offres',
          choice: 'Analyse d’offre par IA',
          detail:
            'L’utilisateur colle le texte ou le lien d’une offre : l’IA en extrait le poste, l’entreprise, le lieu, le salaire, les compétences demandées et la date limite, crée la candidature et ajoute l’échéance au calendrier.',
        },
        {
          need: 'Postuler là où ça compte',
          choice: 'Score de compatibilité CV / offre',
          detail:
            'L’IA compare le CV à l’offre et donne un score (par exemple 78 %), avec les compétences qui correspondent et celles qui manquent : on sait à quelles offres postuler en priorité.',
        },
        {
          need: 'Écrire vite, et bien',
          choice: 'Lettre de motivation et e-mail de relance',
          detail:
            'En un clic, l’IA rédige une lettre adaptée à l’offre et au CV. Sans réponse après quelques jours, elle propose un e-mail de relance, branché sur les statuts et le calendrier.',
        },
        {
          need: 'Savoir quoi faire ensuite',
          choice: 'Assistant de suivi intelligent',
          detail:
            'Un chatbot répond à des questions comme « Quelles candidatures dois-je relancer cette semaine ? » ou « Quel est mon taux de réponse ? », et suggère les prochaines actions.',
        },
        {
          need: 'Voir où en est chaque candidature',
          choice: 'Organisation par statut',
          detail: 'Ajout, modification et suppression des candidatures, classées par statut (Postulé, Entretien, Accepté…), avec recherche et filtres.',
        },
        {
          need: 'Ne rater aucune date',
          choice: 'Calendrier intégré',
          detail: 'Échéances, entretiens et dates clés sur un calendrier, avec les prochaines échéances mises en avant.',
        },
        {
          need: 'Une interface toujours à jour',
          choice: 'GetX',
          detail: 'Gestion d’état réactive : chaque ajout ou changement de statut se répercute immédiatement sur la liste, le calendrier et les statistiques.',
        },
        {
          need: 'Ses données, partout',
          choice: 'GetStorage + backend Django',
          detail: 'Persistance locale rapide avec GetStorage, synchronisation par l’API Django, et export des données depuis les paramètres.',
        },
      ],
    },
    studio: {
      tone: '350 72% 40%',
      word: 'JobTracer',
      shots: [
        { src: '/case/jobtracer/lancement-studio.jpg', caption: 'Écran de lancement' },
        { src: '/case/jobtracer/candidatures-studio.jpg', caption: 'Mes candidatures : liste et statuts' },
        { src: '/case/jobtracer/repartition-studio.jpg', caption: 'Statistiques : répartition par statut' },
      ],
      tags: [
        { label: 'Analyse d’offre par IA', icon: 'sparkles' },
        { label: 'Calendrier intégré', icon: 'calendar' },
        { label: 'Assistant de suivi', icon: 'bell' },
      ],
    },
    screens: {
      index: '04',
      title: 'L’application en',
      accent: 'images.',
      items: [
        { src: JOB_SCREENS.lancement, caption: 'Écran de lancement' },
        { src: JOB_SCREENS.connexion, caption: 'Connexion sécurisée' },
        { src: JOB_SCREENS.motDePasse, caption: 'Réinitialisation du mot de passe' },
        { src: JOB_SCREENS.candidatures, caption: 'Mes candidatures : liste et statuts' },
        { src: JOB_SCREENS.filtres, caption: 'Recherche et filtres par statut' },
        { src: JOB_SCREENS.calendrier, caption: 'Calendrier des échéances et entretiens' },
        { src: JOB_SCREENS.agenda, caption: 'Agenda : candidatures du jour par statut' },
        { src: JOB_SCREENS.ajout, caption: 'Ajout d’une candidature' },
        { src: JOB_SCREENS.repartition, caption: 'Statistiques : répartition par statut' },
        { src: JOB_SCREENS.statistiques, caption: 'Statistiques : vue d’ensemble' },
        { src: JOB_SCREENS.parametres, caption: 'Paramètres : mode sombre et export des données' },
      ],
    },
    result: {
      index: '05',
      title: 'Le',
      accent: 'résultat.',
      body:
        'Une application qui transforme la recherche d’emploi en un processus organisé : chaque candidature est suivie par statut, chaque échéance apparaît dans le calendrier, et l’IA prend en charge la saisie, le ciblage, la rédaction et les rappels.',
      items: [
        'Suivi par statut',
        'Calendrier intégré',
        'Statistiques de suivi',
        'Backend Django',
        'Analyse d’offre par IA',
        'Score CV / offre',
        'Lettres et relances par IA',
        'Assistant de suivi intelligent',
      ],
    },
    video: '/videos/jobTracer.mp4',
  },
  en: {
    slug: 'jobtracer',
    diagram: 'jobtracer',
    poster: '/posters/jobTracer.jpg',
    title: 'JobTracer',
    tagline: 'Track your job applications, guided by AI',
    intro:
      'A Flutter mobile app for tracking job applications, backed by a Django server and delivered as a freelance project. It gathers every application, organises them by status (Applied, Interviewing, Accepted…) and shows deadlines and interviews on a built-in calendar. An AI layer saves time at every step: automatic job-offer analysis, a CV-to-offer match score, cover letters and follow-up emails, and an assistant that answers questions about your search and suggests next actions.',
    meta: {
      role: 'Full stack mobile developer · freelance',
      period: '2024',
      company: 'JobTracer · remote',
      stack: JOB_STACK_EN,
    },
    figures: [
      { value: '4', label: 'built-in AI features' },
      { value: '1', label: 'calendar of deadlines and interviews' },
      { value: '2', label: 'layers: Flutter app + Django backend' },
      { value: '0', label: 'manual typing: the AI fills in the application' },
    ],
    context: {
      index: '01',
      title: 'The',
      accent: 'context.',
      body:
        'A job search means dozens of applications in parallel, each with its own dates, interviews and follow-ups. Without a dedicated tool, tracking gets scattered across emails, spreadsheets and notes, and opportunities slip away.',
      label: 'The problem',
      audiences: [
        {
          name: 'Scattered applications',
          detail: 'Offers, emails, spreadsheets and notes: tracking is scattered and opportunities slip away.',
        },
        {
          name: 'Forgotten deadlines',
          detail: 'Deadlines, interviews and follow-ups overlap, with no overview.',
        },
        {
          name: 'Tedious data entry',
          detail: 'Copying every offer (role, company, salary, skills) takes time and discourages tracking.',
        },
        {
          name: 'Poorly targeted applications',
          detail: 'Hard to know, before applying, whether your profile really matches the offer.',
        },
        {
          name: 'Follow-ups that never happen',
          detail: 'Without reminders or templates, nobody follows up, and applications go unanswered.',
        },
      ],
    },
    architecture: {
      index: '02',
      title: 'The',
      accent: 'architecture.',
      body:
        'A Flutter application that manages its state with GetX and keeps data on the phone with GetStorage, synchronised with a Django API. The backend calls the AI services server-side, never exposing a key in the app: job-offer analysis, CV-to-offer score, writing and the tracking assistant.',
    },
    decisions: {
      index: '03',
      title: 'The solution,',
      accent: 'choice by choice.',
      items: [
        {
          need: 'Stop copying job offers',
          choice: 'AI job-offer analysis',
          detail:
            'The user pastes an offer’s text or link: the AI extracts the role, company, location, salary, required skills and deadline, creates the application and adds the deadline to the calendar.',
        },
        {
          need: 'Apply where it counts',
          choice: 'CV-to-offer match score',
          detail:
            'The AI compares the CV with the offer and gives a score (for example 78%), with matching and missing skills: you know which offers to prioritise.',
        },
        {
          need: 'Write fast, and well',
          choice: 'Cover letter and follow-up email',
          detail:
            'In one click, the AI writes a letter tailored to the offer and the CV. With no reply after a few days, it suggests a follow-up email, wired to the statuses and calendar.',
        },
        {
          need: 'Know what to do next',
          choice: 'Smart tracking assistant',
          detail:
            'A chatbot answers questions such as “Which applications should I follow up this week?” or “What is my response rate?”, and suggests next actions.',
        },
        {
          need: 'See where each application stands',
          choice: 'Status-based organisation',
          detail: 'Add, update and delete applications, sorted by status (Applied, Interviewing, Accepted…), with search and filters.',
        },
        {
          need: 'Never miss a date',
          choice: 'Built-in calendar',
          detail: 'Deadlines, interviews and key dates on a calendar, with upcoming ones highlighted.',
        },
        {
          need: 'An always up-to-date interface',
          choice: 'GetX',
          detail: 'Reactive state: every new application or status change shows up at once in the list, the calendar and the statistics.',
        },
        {
          need: 'Your data, everywhere',
          choice: 'GetStorage + Django backend',
          detail: 'Fast local persistence with GetStorage, synchronisation through the Django API, and data export from the settings.',
        },
      ],
    },
    studio: {
      tone: '350 72% 40%',
      word: 'JobTracer',
      shots: [
        { src: '/case/jobtracer/lancement-studio.jpg', caption: 'Launch screen' },
        { src: '/case/jobtracer/candidatures-studio.jpg', caption: 'My applications: list and statuses' },
        { src: '/case/jobtracer/repartition-studio.jpg', caption: 'Statistics: breakdown by status' },
      ],
      tags: [
        { label: 'AI job-offer analysis', icon: 'sparkles' },
        { label: 'Built-in calendar', icon: 'calendar' },
        { label: 'Tracking assistant', icon: 'bell' },
      ],
    },
    screens: {
      index: '04',
      title: 'The app in',
      accent: 'pictures.',
      items: [
        { src: JOB_SCREENS.lancement, caption: 'Launch screen' },
        { src: JOB_SCREENS.connexion, caption: 'Secure sign-in' },
        { src: JOB_SCREENS.motDePasse, caption: 'Password reset' },
        { src: JOB_SCREENS.candidatures, caption: 'My applications: list and statuses' },
        { src: JOB_SCREENS.filtres, caption: 'Search and status filters' },
        { src: JOB_SCREENS.calendrier, caption: 'Calendar of deadlines and interviews' },
        { src: JOB_SCREENS.agenda, caption: 'Agenda: the day’s applications by status' },
        { src: JOB_SCREENS.ajout, caption: 'Adding an application' },
        { src: JOB_SCREENS.repartition, caption: 'Statistics: breakdown by status' },
        { src: JOB_SCREENS.statistiques, caption: 'Statistics: overview' },
        { src: JOB_SCREENS.parametres, caption: 'Settings: dark mode and data export' },
      ],
    },
    result: {
      index: '05',
      title: 'The',
      accent: 'outcome.',
      body:
        'An app that turns a job search into an organised process: every application is tracked by status, every deadline appears on the calendar, and the AI takes care of data entry, targeting, writing and reminders.',
      items: [
        'Status tracking',
        'Built-in calendar',
        'Tracking statistics',
        'Django backend',
        'AI job-offer analysis',
        'CV-to-offer score',
        'AI letters and follow-ups',
        'Smart tracking assistant',
      ],
    },
    video: '/videos/jobTracer.mp4',
  },
};

const FN_SCREENS = {
  connexion: '/case/fake-news/connexion.jpg',
  espaceSante: '/case/fake-news/espace-sante.jpg',
  verdict: '/case/fake-news/verdict.jpg',
  tableauDeBord: '/case/fake-news/tableau-de-bord.jpg',
  fiabilite: '/case/fake-news/fiabilite.jpg',
  filSocial: '/case/fake-news/fil-social.jpg',
  medecins: '/case/fake-news/medecins.jpg',
  medecin: '/case/fake-news/medecin.jpg',
  assistant: '/case/fake-news/assistant.jpg',
};

const FN_STACK = ['Flutter', 'NestJS', 'Ollama', 'Gemini', 'ChatGPT', 'Whisper', 'RAG', 'Redis · BullMQ', 'PostgreSQL', 'MongoDB', 'Docker'];

const FAKENEWS: Record<Language, CaseStudy> = {
  fr: {
    slug: 'fake-news',
    diagram: 'fakenews',
    poster: '/posters/fake-news-detector.jpg',
    title: 'Détecteur de fake news médicales',
    tagline: 'MedicKeck : vérifier l’information santé, avec l’IA et les médecins',
    intro:
      'Application mobile multiplateforme (Flutter, NestJS) qui détecte les fausses informations médicales grâce à une IA hybride : des modèles locaux via Ollama, complétés par les API Gemini et ChatGPT. La plateforme collecte automatiquement des contenus en ligne, analyse les textes, les images et les vidéos, fait valider les résultats par des médecins et publie des contenus vérifiés. Elle comprend aussi un espace médecin avec prise de rendez-vous, et un chatbot médical qui guide les patients dans les gestes de premiers secours en cas d’urgence.',
    meta: {
      role: 'Développeur full stack mobile',
      period: '2025',
      company: 'MedicKeck · application santé',
      stack: FN_STACK,
    },
    figures: [
      { value: '3', label: 'modèles d’IA combinés : Ollama, Gemini, ChatGPT' },
      { value: '3', label: 'formats analysés : texte, image, vidéo' },
      { value: '3', label: 'acteurs : patient, médecin, administrateur' },
      { value: '4', label: 'verdicts : vrai, faux, trompeur, non vérifiable' },
    ],
    context: {
      index: '01',
      title: 'Le',
      accent: 'contexte.',
      body:
        'Les réseaux sociaux propagent vite des informations médicales fausses ou trompeuses : faux remèdes, rumeurs sur les vaccins, images et vidéos manipulées. Il fallait une solution automatisée, capable d’analyser tous les formats, validée par des experts et accessible au grand public.',
      label: 'La problématique',
      audiences: [
        {
          name: 'Une désinformation virale',
          detail: 'Faux remèdes et rumeurs sur les vaccins se partagent en quelques heures sur les réseaux sociaux.',
        },
        {
          name: 'Un danger pour les patients',
          detail: 'Suivre un faux conseil médical peut retarder un traitement ou mettre la santé en danger.',
        },
        {
          name: 'Une confiance minée',
          detail: 'Ces contenus fragilisent la confiance envers les médecins et les autorités de santé.',
        },
        {
          name: 'Des images et vidéos manipulées',
          detail: 'Montages, images sorties de leur contexte et deepfakes échappent à une simple lecture du texte.',
        },
        {
          name: 'Un fact-checking manuel et lent',
          detail: 'Les outils actuels sont surtout manuels, lents et rarement spécialisés en santé.',
        },
      ],
    },
    architecture: {
      index: '02',
      title: 'L’',
      accent: 'architecture.',
      body:
        'Une application Flutter et un backend NestJS modulaire (API REST et WebSocket pour le chat). Les contenus soumis par les patients ou collectés par le scraping passent dans une file Redis + BullMQ, puis dans le moteur d’IA hybride : Ollama en local, Gemini et ChatGPT en vérification croisée, comparés aux sources médicales de référence par RAG. Les cas sensibles sont validés par un médecin avant publication.',
    },
    decisions: {
      index: '03',
      title: 'La solution,',
      accent: 'choix par choix.',
      items: [
        {
          need: 'Repérer l’intox avant qu’elle se propage',
          choice: 'Collecte automatisée (scraping)',
          detail:
            'Collecte planifiée sur des sites d’actualité, blogs santé, forums et réseaux sociaux publics ; filtrage par mots-clés médicaux (NLP), suppression des doublons et file d’attente asynchrone.',
        },
        {
          need: 'Un verdict fiable, sans dépendre d’un seul modèle',
          choice: 'IA hybride et consensus',
          detail:
            'Ollama (Llama, Mistral) pour une analyse rapide et confidentielle sans coût d’API ; Gemini et ChatGPT pour une vérification croisée. Les verdicts sont comparés pour calculer un score de confiance.',
        },
        {
          need: 'Expliquer et prouver chaque verdict',
          choice: 'Sources de référence · RAG',
          detail:
            'Comparaison avec l’OMS, PubMed et les recommandations officielles. Résultat : verdict (vrai, faux, trompeur, non vérifiable), score de confiance, explication du problème et sources.',
        },
        {
          need: 'Vérifier aussi les images et les vidéos',
          choice: 'Analyse multimodale',
          detail:
            'Images : description par l’IA (vision), texte extrait par OCR, détection de retouche ou d’image générée. Vidéos : images clés, transcription Whisper et indices de deepfake.',
        },
        {
          need: 'Garder l’humain dans la boucle',
          choice: 'Validation médicale',
          detail:
            'Les contenus à faible score ou à fort impact sont confiés à un médecin de la bonne spécialité, qui approuve, corrige ou rejette le verdict. Ses corrections améliorent le modèle ; badge « Vérifié par un médecin ».',
        },
        {
          need: 'Diffuser l’information fiable',
          choice: 'Fil vérifié et alertes intox',
          detail:
            'Fil de contenus classés par catégorie, articles rédigés par des médecins, notifications push « Alerte intox » (Firebase) et partage des démentis.',
        },
        {
          need: 'Passer de l’information au soin',
          choice: 'Espace médecin et rendez-vous',
          detail:
            'Profils médecins vérifiés, recherche par spécialité et localisation, réservation en ligne avec rappels, agenda et historique des consultations.',
        },
        {
          need: 'Savoir quoi faire en urgence',
          choice: 'Chatbot et premiers secours',
          detail:
            'Guides pas à pas (étouffement, brûlure, hémorragie, arrêt cardiaque…), appel direct aux secours (190 en Tunisie, 112 en Europe) et orientation vers un médecin. Le chatbot rappelle qu’il ne remplace pas un avis médical.',
        },
      ],
    },
    studio: {
      tone: '199 89% 48%',
      word: 'MedicKeck',
      variant: 'cutout',
      shots: [
        { src: '/case/fake-news/connexion-studio.png', caption: 'Connexion à MedicKeck' },
        { src: '/case/fake-news/verdict-studio.png', caption: 'Verdict : information vérifiée à 90 %, avec sa description' },
        { src: '/case/fake-news/espace-sante-studio.png', caption: 'Accueil : contrôles médicaux et spécialités' },
      ],
      tags: [
        { label: 'IA hybride', icon: 'sparkles' },
        { label: 'Validé par des médecins', icon: 'shield' },
        { label: 'Alertes intox', icon: 'bell' },
      ],
    },
    screens: {
      index: '04',
      title: 'L’application en',
      accent: 'images.',
      items: [
        { src: FN_SCREENS.connexion, caption: 'Connexion à MedicKeck' },
        { src: FN_SCREENS.espaceSante, caption: 'Accueil : contrôles médicaux et spécialités' },
        { src: FN_SCREENS.verdict, caption: 'Verdict : information vérifiée à 90 %, avec sa description' },
        { src: FN_SCREENS.tableauDeBord, caption: 'Tableau de bord : vérifications et tendances médicales' },
        { src: FN_SCREENS.fiabilite, caption: 'Fiabilité moyenne des contenus analysés' },
        { src: FN_SCREENS.filSocial, caption: 'Fil InfoSanté : publications à vérifier ou incorrectes' },
        { src: FN_SCREENS.medecins, caption: 'Médecins par spécialité, à contacter en un geste' },
        { src: FN_SCREENS.medecin, caption: 'Profil médecin vérifié' },
        { src: FN_SCREENS.assistant, caption: 'Dr. AI Assistant : analyse des symptômes et premiers gestes' },
      ],
    },
    result: {
      index: '05',
      title: 'Le',
      accent: 'résultat.',
      body:
        'Une plateforme qui va de la détection à la diffusion : chaque contenu est collecté, analysé par plusieurs modèles, expliqué avec des sources, validé par un médecin quand c’est nécessaire, puis publié. Les données de santé sont protégées (JWT, rôles, chiffrement, HTTPS) et l’identité des médecins est vérifiée.',
      items: [
        'Collecte automatisée',
        'Analyse texte, image et vidéo',
        'Verdict expliqué et sourcé',
        'Validation par des médecins',
        'Fil vérifié et alertes intox',
        'Prise de rendez-vous',
        'Chatbot de premiers secours',
        'Données de santé sécurisées',
      ],
    },
    video: '/videos/fake-news-detector.mp4',
  },
  en: {
    slug: 'fake-news',
    diagram: 'fakenews',
    poster: '/posters/fake-news-detector.jpg',
    title: 'Medical fake-news detector',
    tagline: 'MedicKeck: checking health information, with AI and doctors',
    intro:
      'A cross-platform mobile app (Flutter, NestJS) that detects medical misinformation with a hybrid AI: local models through Ollama, backed by the Gemini and ChatGPT APIs. The platform automatically collects online content, analyses text, images and videos, has doctors validate the results and publishes verified content. It also includes a doctor area with appointment booking, and a medical chatbot that guides patients through first-aid steps in an emergency.',
    meta: {
      role: 'Full stack mobile developer',
      period: '2025',
      company: 'MedicKeck · health app',
      stack: FN_STACK,
    },
    figures: [
      { value: '3', label: 'AI models combined: Ollama, Gemini, ChatGPT' },
      { value: '3', label: 'formats analysed: text, image, video' },
      { value: '3', label: 'actors: patient, doctor, administrator' },
      { value: '4', label: 'verdicts: true, false, misleading, unverifiable' },
    ],
    context: {
      index: '01',
      title: 'The',
      accent: 'context.',
      body:
        'Social networks spread false or misleading medical information fast: fake cures, vaccine rumours, manipulated images and videos. The need was an automated solution, able to analyse every format, validated by experts and open to the general public.',
      label: 'The problem',
      audiences: [
        {
          name: 'Viral misinformation',
          detail: 'Fake cures and vaccine rumours spread across social networks within hours.',
        },
        {
          name: 'A danger to patients',
          detail: 'Following false medical advice can delay treatment or put health at risk.',
        },
        {
          name: 'Eroded trust',
          detail: 'This content undermines trust in doctors and health authorities.',
        },
        {
          name: 'Manipulated images and videos',
          detail: 'Edits, out-of-context images and deepfakes escape a plain reading of the text.',
        },
        {
          name: 'Slow, manual fact-checking',
          detail: 'Current tools are mostly manual, slow and rarely specialised in health.',
        },
      ],
    },
    architecture: {
      index: '02',
      title: 'The',
      accent: 'architecture.',
      body:
        'A Flutter app and a modular NestJS backend (REST API, plus WebSocket for the chat). Content submitted by patients or collected by scraping goes into a Redis + BullMQ queue, then through the hybrid AI engine: Ollama locally, Gemini and ChatGPT for cross-checking, compared with reference medical sources through RAG. Sensitive cases are validated by a doctor before publication.',
    },
    decisions: {
      index: '03',
      title: 'The solution,',
      accent: 'choice by choice.',
      items: [
        {
          need: 'Catch misinformation before it spreads',
          choice: 'Automated collection (scraping)',
          detail:
            'Scheduled collection from news sites, health blogs, forums and public social networks; medical keyword filtering (NLP), de-duplication and an asynchronous queue.',
        },
        {
          need: 'A reliable verdict, not tied to one model',
          choice: 'Hybrid AI and consensus',
          detail:
            'Ollama (Llama, Mistral) for fast, private analysis with no API cost; Gemini and ChatGPT for cross-checking. Verdicts are compared to compute a confidence score.',
        },
        {
          need: 'Explain and back every verdict',
          choice: 'Reference sources · RAG',
          detail:
            'Compared with the WHO, PubMed and official guidelines. Output: verdict (true, false, misleading, unverifiable), confidence score, explanation of the issue and sources.',
        },
        {
          need: 'Check images and videos too',
          choice: 'Multimodal analysis',
          detail:
            'Images: AI description (vision), OCR text extraction, detection of edits or AI-generated images. Videos: key frames, Whisper transcription and deepfake cues.',
        },
        {
          need: 'Keep a human in the loop',
          choice: 'Medical validation',
          detail:
            'Low-score or high-impact content goes to a doctor of the right specialty, who approves, corrects or rejects the verdict. Corrections improve the model; “Verified by a doctor” badge.',
        },
        {
          need: 'Spread reliable information',
          choice: 'Verified feed and fake-news alerts',
          detail:
            'A feed sorted by category, articles written by doctors, “Fake-news alert” push notifications (Firebase) and shareable debunks.',
        },
        {
          need: 'Go from information to care',
          choice: 'Doctor area and booking',
          detail:
            'Verified doctor profiles, search by specialty and location, online booking with reminders, agenda and consultation history.',
        },
        {
          need: 'Know what to do in an emergency',
          choice: 'Chatbot and first aid',
          detail:
            'Step-by-step guides (choking, burns, bleeding, cardiac arrest…), one-tap emergency call (190 in Tunisia, 112 in Europe) and referral to a doctor. The chatbot states that it does not replace medical advice.',
        },
      ],
    },
    studio: {
      tone: '199 89% 48%',
      word: 'MedicKeck',
      variant: 'cutout',
      shots: [
        { src: '/case/fake-news/connexion-studio.png', caption: 'Signing in to MedicKeck' },
        { src: '/case/fake-news/verdict-studio.png', caption: 'Verdict: information verified at 90%, with its description' },
        { src: '/case/fake-news/espace-sante-studio.png', caption: 'Home: check-ups and specialties' },
      ],
      tags: [
        { label: 'Hybrid AI', icon: 'sparkles' },
        { label: 'Doctor-validated', icon: 'shield' },
        { label: 'Fake-news alerts', icon: 'bell' },
      ],
    },
    screens: {
      index: '04',
      title: 'The app in',
      accent: 'pictures.',
      items: [
        { src: FN_SCREENS.connexion, caption: 'Signing in to MedicKeck' },
        { src: FN_SCREENS.espaceSante, caption: 'Home: check-ups and specialties' },
        { src: FN_SCREENS.verdict, caption: 'Verdict: information verified at 90%, with its description' },
        { src: FN_SCREENS.tableauDeBord, caption: 'Dashboard: checks and medical trends' },
        { src: FN_SCREENS.fiabilite, caption: 'Average reliability of analysed content' },
        { src: FN_SCREENS.filSocial, caption: 'InfoSanté feed: posts to check or flagged as false' },
        { src: FN_SCREENS.medecins, caption: 'Doctors by specialty, one tap to contact' },
        { src: FN_SCREENS.medecin, caption: 'Verified doctor profile' },
        { src: FN_SCREENS.assistant, caption: 'Dr. AI Assistant: symptom analysis and first steps' },
      ],
    },
    result: {
      index: '05',
      title: 'The',
      accent: 'outcome.',
      body:
        'A platform that runs from detection to publication: every piece of content is collected, analysed by several models, explained with sources, validated by a doctor when needed, then published. Health data is protected (JWT, roles, encryption, HTTPS) and doctors’ identities are verified.',
      items: [
        'Automated collection',
        'Text, image and video analysis',
        'Explained, sourced verdict',
        'Doctor validation',
        'Verified feed and alerts',
        'Appointment booking',
        'First-aid chatbot',
        'Secured health data',
      ],
    },
    video: '/videos/fake-news-detector.mp4',
  },
};

const CR_SCREENS = {
  lancement: '/case/crashscan/lancement.jpg',
  garage: '/case/crashscan/garage.jpg',
  accueil: '/case/crashscan/accueil.jpg',
  inscription: '/case/crashscan/inscription.jpg',
  vehicule: '/case/crashscan/vehicule.jpg',
  assurance: '/case/crashscan/assurance.jpg',
  accidentDate: '/case/crashscan/accident-date.jpg',
  accident: '/case/crashscan/accident.jpg',
  scanIa: '/case/crashscan/scan-ia.jpg',
  vehicules: '/case/crashscan/vehicules.jpg',
  accidents: '/case/crashscan/accidents.jpg',
};

const CR_STACK = ['SwiftUI', 'VisionKit', 'NestJS', 'Gemini', 'ChatGPT', 'Google Maps', 'PostgreSQL'];

const CRASHSCAN: Record<Language, CaseStudy> = {
  fr: {
    slug: 'crashscan',
    diagram: 'crashscan',
    poster: '/posters/crash-test.jpg',
    title: 'CrashScan',
    tagline: 'Estimation des dommages et constat amiable automatique par IA',
    intro:
      'Application iOS (SwiftUI) qui accélère tout ce qui suit un accident. Le conducteur photographie son véhicule : l’IA identifie le type d’accident et les dommages, estime le coût des réparations et propose les garages adaptés les plus proches. Il photographie ensuite les documents des deux conducteurs : l’IA remplit le constat amiable, les conducteurs le relisent et le signent à l’écran, puis un PDF conforme est envoyé à l’assureur. Backend NestJS, Google Gemini, ChatGPT et Google Maps.',
    meta: {
      role: 'Développeur iOS et backend',
      period: '2025',
      company: 'CrashScan · application iOS',
      stack: CR_STACK,
    },
    figures: [
      { value: '2', label: 'rôles de l’IA : dommages et constat' },
      { value: '3', label: 'documents lus : permis, carte grise, assurance' },
      { value: '3', label: 'niveaux de gravité estimés' },
      { value: '1', label: 'constat PDF signé, envoyé à l’assureur' },
    ],
    context: {
      index: '01',
      title: 'Le',
      accent: 'contexte.',
      body:
        'Après un accident, tout est lent et manuel : le constat se remplit à la main, le coût des réparations est inconnu et l’expertise peut prendre des semaines. La question du projet : comment utiliser l’IA pour accélérer le constat et la pré-évaluation des dommages, tout en restant fiable et en protégeant les données personnelles ?',
      label: 'La problématique',
      audiences: [
        {
          name: 'Un constat rempli à la main',
          detail: 'Le constat amiable papier contient souvent des erreurs ou des champs manquants.',
        },
        {
          name: 'Un coût inconnu',
          detail: 'Le conducteur ne sait pas combien coûteront les réparations avant de voir un garage.',
        },
        {
          name: 'Des garages introuvables',
          detail: 'Il ne connaît pas les ateliers adaptés à son dommage autour de lui.',
        },
        {
          name: 'Une expertise lente',
          detail: 'L’expertise et le traitement par l’assurance prennent plusieurs jours, voire plusieurs semaines.',
        },
        {
          name: 'Des données sensibles',
          detail: 'Permis, carte grise et attestation d’assurance contiennent des données personnelles à protéger.',
        },
      ],
    },
    architecture: {
      index: '02',
      title: 'L’',
      accent: 'architecture.',
      body:
        'Une application iOS en SwiftUI pour la caméra, la signature et la carte, et un backend NestJS qui gère les dossiers, l’authentification et la génération du PDF. C’est le backend qui appelle l’IA : Google Gemini pour les images et les documents, ChatGPT pour l’estimation et les circonstances, Google Maps pour les garages et l’adresse. Les clés API ne quittent jamais le serveur ; les données sont stockées dans PostgreSQL.',
    },
    decisions: {
      index: '03',
      title: 'La solution,',
      accent: 'choix par choix.',
      items: [
        {
          need: 'Des photos exploitables',
          choice: 'Prise de vue guidée',
          detail: 'L’application guide la prise de vue (vue d’ensemble, puis gros plan de chaque zone), vérifie netteté et luminosité, et redemande une photo si besoin.',
        },
        {
          need: 'Comprendre les dommages',
          choice: 'Analyse d’images · Gemini',
          detail: 'Type d’accident, pièces touchées, type de dommage, gravité et action recommandée, renvoyés en JSON avec un niveau de confiance.',
        },
        {
          need: 'Une estimation crédible',
          choice: 'ChatGPT + grille de prix',
          detail: 'Une grille de référence (pièces, peinture, main-d’œuvre) par marque et modèle, combinée à l’analyse : fourchette de prix et détail par pièce. Si la confiance est faible ou la gravité élevée, une expertise est recommandée.',
        },
        {
          need: 'Trouver le bon garage',
          choice: 'Google Maps Platform',
          detail: 'Garages proches selon la spécialité (carrosserie, vitrage, mécanique), triés par distance et par note, avec itinéraire.',
        },
        {
          need: 'Ne plus remplir le constat à la main',
          choice: 'Lecture des documents · Gemini',
          detail: 'Documents recadrés avec VisionKit, texte lu en français et en arabe : permis, carte grise et attestation remplissent les sections A et B.',
        },
        {
          need: 'Éviter les erreurs',
          choice: 'Vérification automatique',
          detail: 'Format de l’immatriculation, cohérence des dates et validité de l’assurance contrôlés ; les champs douteux sont surlignés.',
        },
        {
          need: 'Un constat valable',
          choice: 'Signature et PDF horodaté',
          detail: 'Les deux conducteurs relisent et signent à l’écran ; un PDF conforme est généré, horodaté et envoyé à l’assureur.',
        },
        {
          need: 'Protéger les conducteurs',
          choice: 'Sécurité et consentement',
          detail: 'Clés API côté serveur, chiffrement, consentement avant lecture des documents, suppression des photos après extraction, loi n° 2004-63.',
        },
      ],
    },
    studio: {
      tone: '0 84% 56%',
      word: 'CrashScan',
      variant: 'phones',
      shots: [
        { src: '/case/crashscan/lancement-studio.png', caption: 'Écran de lancement animé' },
        { src: '/case/crashscan/accueil-studio.png', caption: 'Accueil : profil, véhicules, accidents et assurance' },
        { src: '/case/crashscan/vehicule-studio.png', caption: 'Ajout d’un véhicule : immatriculation, marque, châssis' },
      ],
      tags: [
        { label: 'Analyse des dommages', icon: 'sparkles' },
        { label: 'Constat automatique', icon: 'shield' },
        { label: 'Garages proches', icon: 'radio' },
      ],
    },
    screens: {
      index: '04',
      title: 'L’application en',
      accent: 'images.',
      items: [
        { src: CR_SCREENS.lancement, caption: 'Écran de lancement animé' },
        { src: CR_SCREENS.accueil, caption: 'Accueil : profil, véhicules, accidents et assurance' },
        { src: CR_SCREENS.inscription, caption: 'Inscription avec numéro de permis' },
        { src: CR_SCREENS.vehicule, caption: 'Ajout d’un véhicule : immatriculation, marque, châssis' },
        { src: CR_SCREENS.assurance, caption: 'Ajout de l’assurance : compagnie, police, agence' },
        { src: CR_SCREENS.accidentDate, caption: 'Déclaration d’un accident : choix de la date' },
        { src: CR_SCREENS.accident, caption: 'Déclaration d’un accident : dommages et observations' },
        { src: CR_SCREENS.scanIa, caption: 'Scan IA du véhicule : description des dommages et du lieu' },
        { src: CR_SCREENS.garage, caption: 'Animation d’ouverture du garage' },
        { src: CR_SCREENS.vehicules, caption: 'Mes véhicules' },
        { src: CR_SCREENS.accidents, caption: 'Mes accidents déclarés' },
      ],
    },
    result: {
      index: '05',
      title: 'Le',
      accent: 'résultat.',
      body:
        'Du choc au constat envoyé, en quelques minutes : le conducteur connaît ses dommages, une fourchette de prix et le garage le plus proche, puis signe un constat déjà rempli. L’estimation reste indicative : les dommages internes ne se voient pas sur une photo, et le devis final revient au garage ou à l’expert. L’IA propose, les conducteurs vérifient et signent.',
      items: [
        'Analyse des dommages',
        'Estimation du coût',
        'Garages les plus proches',
        'Lecture des documents',
        'Constat prérempli',
        'Signature à l’écran',
        'PDF envoyé à l’assureur',
        'Données protégées',
      ],
    },
    video: '/videos/crash-test.mp4',
  },
  en: {
    slug: 'crashscan',
    diagram: 'crashscan',
    poster: '/posters/crash-test.jpg',
    title: 'CrashScan',
    tagline: 'AI damage estimation and automatic accident report',
    intro:
      'An iOS app (SwiftUI) that speeds up everything after an accident. The driver photographs the vehicle: the AI identifies the type of accident and the damage, estimates the repair cost and suggests the nearest suitable garages. They then photograph both drivers’ documents: the AI fills in the joint accident report, the drivers review and sign it on screen, and a compliant PDF is sent to the insurer. NestJS backend, Google Gemini, ChatGPT and Google Maps.',
    meta: {
      role: 'iOS and backend developer',
      period: '2025',
      company: 'CrashScan · iOS app',
      stack: CR_STACK,
    },
    figures: [
      { value: '2', label: 'AI roles: damage and report' },
      { value: '3', label: 'documents read: licence, registration, insurance' },
      { value: '3', label: 'severity levels estimated' },
      { value: '1', label: 'signed PDF report, sent to the insurer' },
    ],
    context: {
      index: '01',
      title: 'The',
      accent: 'context.',
      body:
        'After an accident, everything is slow and manual: the report is filled in by hand, the repair cost is unknown and the assessment can take weeks. The project question: how to use AI to speed up the report and the damage pre-assessment, while staying reliable and protecting personal data?',
      label: 'The problem',
      audiences: [
        { name: 'A handwritten report', detail: 'The paper accident report often has mistakes or missing fields.' },
        { name: 'An unknown cost', detail: 'The driver has no idea what repairs will cost before seeing a garage.' },
        { name: 'Garages hard to find', detail: 'They don’t know which nearby workshops suit their damage.' },
        { name: 'A slow assessment', detail: 'The expert assessment and insurer processing take days, sometimes weeks.' },
        { name: 'Sensitive data', detail: 'Licence, registration and insurance certificate hold personal data to protect.' },
      ],
    },
    architecture: {
      index: '02',
      title: 'The',
      accent: 'architecture.',
      body:
        'An iOS app in SwiftUI for the camera, signature and map, and a NestJS backend handling claims, authentication and PDF generation. The backend calls the AI: Google Gemini for images and documents, ChatGPT for the estimate and circumstances, Google Maps for garages and the address. API keys never leave the server; data is stored in PostgreSQL.',
    },
    decisions: {
      index: '03',
      title: 'The solution,',
      accent: 'choice by choice.',
      items: [
        {
          need: 'Usable photos',
          choice: 'Guided capture',
          detail: 'The app guides the shots (overview, then a close-up of each area), checks sharpness and lighting, and asks for a new photo if needed.',
        },
        {
          need: 'Understand the damage',
          choice: 'Image analysis · Gemini',
          detail: 'Accident type, affected parts, damage type, severity and recommended action, returned as JSON with a confidence level.',
        },
        {
          need: 'A credible estimate',
          choice: 'ChatGPT + price grid',
          detail: 'A reference grid (parts, paint, labour) by make and model, combined with the analysis: a price range and a per-part breakdown. Low confidence or high severity triggers an expert recommendation.',
        },
        {
          need: 'Find the right garage',
          choice: 'Google Maps Platform',
          detail: 'Nearby garages by specialty (bodywork, glass, mechanics), sorted by distance and rating, with directions.',
        },
        {
          need: 'No more handwritten reports',
          choice: 'Document reading · Gemini',
          detail: 'Documents cropped with VisionKit, text read in French and Arabic: licence, registration and certificate fill sections A and B.',
        },
        {
          need: 'Avoid mistakes',
          choice: 'Automatic checks',
          detail: 'Plate format, date consistency and insurance validity are checked; doubtful fields are highlighted.',
        },
        {
          need: 'A valid report',
          choice: 'Signature and timestamped PDF',
          detail: 'Both drivers review and sign on screen; a compliant PDF is generated, timestamped and sent to the insurer.',
        },
        {
          need: 'Protect the drivers',
          choice: 'Security and consent',
          detail: 'Server-side API keys, encryption, consent before reading documents, document photos deleted after extraction, Tunisian law 2004-63.',
        },
      ],
    },
    studio: {
      tone: '0 84% 56%',
      word: 'CrashScan',
      variant: 'phones',
      shots: [
        { src: '/case/crashscan/lancement-studio.png', caption: 'Animated launch screen' },
        { src: '/case/crashscan/accueil-studio.png', caption: 'Home: profile, vehicles, accidents and insurance' },
        { src: '/case/crashscan/vehicule-studio.png', caption: 'Adding a vehicle: plate, make, chassis' },
      ],
      tags: [
        { label: 'Damage analysis', icon: 'sparkles' },
        { label: 'Automatic report', icon: 'shield' },
        { label: 'Nearby garages', icon: 'radio' },
      ],
    },
    screens: {
      index: '04',
      title: 'The app in',
      accent: 'pictures.',
      items: [
        { src: CR_SCREENS.lancement, caption: 'Animated launch screen' },
        { src: CR_SCREENS.accueil, caption: 'Home: profile, vehicles, accidents and insurance' },
        { src: CR_SCREENS.inscription, caption: 'Sign-up with driving licence number' },
        { src: CR_SCREENS.vehicule, caption: 'Adding a vehicle: plate, make, chassis' },
        { src: CR_SCREENS.assurance, caption: 'Adding insurance: company, policy, agency' },
        { src: CR_SCREENS.accidentDate, caption: 'Reporting an accident: picking the date' },
        { src: CR_SCREENS.accident, caption: 'Reporting an accident: damage and notes' },
        { src: CR_SCREENS.scanIa, caption: 'AI vehicle scan: description of damage and place' },
        { src: CR_SCREENS.garage, caption: 'Garage opening animation' },
        { src: CR_SCREENS.vehicules, caption: 'My vehicles' },
        { src: CR_SCREENS.accidents, caption: 'My reported accidents' },
      ],
    },
    result: {
      index: '05',
      title: 'The',
      accent: 'outcome.',
      body:
        'From impact to report sent, in minutes: the driver knows the damage, a price range and the nearest garage, then signs a report that is already filled in. The estimate stays indicative: internal damage is not visible on a photo, and the final quote belongs to the garage or the expert. The AI suggests; the drivers check and sign.',
      items: [
        'Damage analysis',
        'Cost estimate',
        'Nearest garages',
        'Document reading',
        'Pre-filled report',
        'On-screen signature',
        'PDF sent to the insurer',
        'Protected data',
      ],
    },
    video: '/videos/crash-test.mp4',
  },
};

/* ==========================================================================
   La Reine by Anwar: freelance e-commerce site (Next.js). No demo recording:
   the hero studio uses renders made from the site screenshots. Payment, back-office,
   filters, accounts and SEO are on the roadmap, not presented as shipped.
   ========================================================================== */

const LR_STACK = ['Next.js 16', 'App Router', 'React', 'TypeScript', 'Tailwind CSS', 'shadcn/ui', 'Serwist · PWA', 'ISR', 'Vercel', 'Cloudflare'];

const LAREINE: Record<Language, CaseStudy> = {
  fr: {
    slug: 'la-reine',
    diagram: 'lareine',
    poster: '/case/lareine/cover.jpg',
    title: 'La Reine by Anwar',
    tagline: 'Boutique en ligne de maroquinerie haut de gamme',
    intro:
      'Une boutique en ligne de sacs à main haut de gamme, réalisée en mission freelance pour une clientèle exigeante qui attache autant d’importance au style qu’à la qualité de l’achat. L’identité reprend les codes des maisons de luxe : palette crème et champagne, typographie éditoriale, grandes photos et animations discrètes. Le parcours va de la découverte du produit à la commande, sans friction, sur ordinateur, tablette et mobile.',
    meta: {
      role: 'Développeur front-end · mission freelance',
      period: '2026',
      company: 'La Reine by Anwar · site e-commerce',
      stack: LR_STACK,
    },
    figures: [
      { value: '3', label: 'niveaux de cache, du téléphone au serveur' },
      { value: '6', label: 'modules : accueil, catalogue, fiche, panier, favoris, infos' },
      { value: '4', label: 'collections : sacs, nouveautés, pochettes, bandoulière' },
      { value: '1', label: 'clic pour ajouter au panier' },
    ],
    context: {
      index: '01',
      title: 'Le',
      accent: 'contexte.',
      body:
        'Une marque de maroquinerie qui vend un style autant qu’un produit. Le site devait donner, en ligne, la même impression qu’une boutique de luxe : une identité forte et cohérente sur chaque page, des produits mis en scène, et un achat simple, y compris sur un téléphone avec une connexion moyenne.',
      label: 'Les enjeux',
      audiences: [
        { name: 'Installer la marque', detail: 'Une identité visuelle forte, la même sur toutes les pages.' },
        { name: 'Montrer le produit', detail: 'Un sac se choisit au détail : grands visuels, galeries et zoom haute définition.' },
        { name: 'Raccourcir l’achat', detail: 'Ajout au panier en un clic et un mode « Achat express ».' },
        { name: 'Rester rapide sur mobile', detail: 'La plupart des clientes achètent sur téléphone, parfois avec un réseau faible.' },
        { name: 'Parler au marché tunisien', detail: 'Une interface entièrement en français et des prix en dinars.' },
      ],
    },
    architecture: {
      index: '02',
      title: 'L’',
      accent: 'architecture.',
      body:
        'Un site Next.js 16 (App Router) en React et TypeScript, avec Tailwind CSS et shadcn/ui. La vitesse repose sur trois niveaux de cache : le téléphone garde le site grâce au Service Worker (PWA), le CDN sert les pages depuis le serveur le plus proche, et Next.js prépare chaque page produit une seule fois (ISR) avant de la mettre à jour automatiquement. Cloudflare filtre les robots et les attaques avant qu’ils n’atteignent le site.',
    },
    decisions: {
      index: '03',
      title: 'La solution,',
      accent: 'choix par choix.',
      items: [
        {
          need: 'Une identité de maison de luxe',
          choice: 'Design system unique',
          detail: 'Palette crème et champagne, Cormorant Garamond pour les titres et animations définies une seule fois, puis réutilisées dans tout le site.',
        },
        {
          need: 'Mettre le produit en scène',
          choice: 'Galerie et zoom plein écran',
          detail: 'Miniatures, zoom haute définition, seconde photo au survol dans le catalogue, choix de la couleur et de la taille sur la fiche produit.',
        },
        {
          need: 'Un achat sans friction',
          choice: 'Panier en un clic et achat express',
          detail: 'Panier et favoris conservés dans le navigateur et synchronisés en temps réel entre les pages, page de commande dédiée.',
        },
        {
          need: 'Ouvrir le site instantanément',
          choice: 'PWA · Serwist',
          detail: 'À la première visite, photos, design et pages sont enregistrés sur le téléphone : ensuite le site s’ouvre sans rien retélécharger, même avec un mauvais réseau, et s’installe comme une application.',
        },
        {
          need: 'Tenir un pic de visites',
          choice: 'Pages préparées à l’avance · ISR',
          detail: 'Les pages produits et catégories sont générées une fois, puis mises à jour à intervalle régulier ou dès qu’un produit change : 1 000 visiteurs en même temps ne chargent pas le serveur.',
        },
        {
          need: 'Servir vite depuis la Tunisie',
          choice: 'CDN · Vercel ou Cloudflare',
          detail: 'Le site est copié sur des serveurs répartis dans le monde : chaque cliente le reçoit depuis le plus proche.',
        },
        {
          need: 'Protéger le site',
          choice: 'Cloudflare, HTTPS et clés hors du code',
          detail: 'Robots et attaques bloqués en amont, site toujours en HTTPS, clés secrètes jamais dans le code.',
        },
        {
          need: 'Évoluer sans tout réécrire',
          choice: 'Composants typés et réutilisables',
          detail: 'Code typé de bout en bout, composants découpés, images chargées à la demande et compilation rapide avec Turbopack.',
        },
      ],
    },
    studio: {
      tone: '38 62% 50%',
      word: 'La Reine',
      variant: 'layered',
      shots: [
        { src: '/case/lareine/studio-produit.webp', caption: 'Fiche produit : galerie, couleur, taille' },
        { src: '/case/lareine/cover-cut.webp', caption: 'La boutique La Reine : accueil, best-sellers, paiement et livraison' },
        { src: '/case/lareine/studio-collections.webp', caption: 'Collections : sacs à main et bandoulière' },
      ],
      tags: [],
    },
    screens: {
      index: '04',
      title: 'Le site en',
      accent: 'images.',
      landscape: true,
      items: [
        { src: '/case/lareine/accueil.jpg', caption: 'Accueil : bannière animée « Le Luxe, Simplement »' },
        { src: '/case/lareine/collections.jpg', caption: 'Collections : sacs à main de luxe et bandoulière' },
        { src: '/case/lareine/best-sellers.jpg', caption: 'Nos best-sellers, avec badges Best-seller et Nouveau' },
        { src: '/case/lareine/produit.jpg', caption: 'Fiche produit : galerie, couleur, taille, achat express' },
        { src: '/case/lareine/avis.jpg', caption: 'Avis clientes en carrousel' },
        { src: '/case/lareine/newsletter.jpg', caption: 'Le Cercle La Reine : inscription à la newsletter et pied de page' },
      ],
    },
    result: {
      index: '05',
      title: 'Le',
      accent: 'résultat.',
      body:
        'Une boutique au style haut de gamme, cohérente sur tous les écrans, qui s’ouvre instantanément aux visites suivantes. Prochaines étapes prévues : un back-office pour gérer produits, stocks et commandes, le paiement en ligne via Konnect ou Flouci (avec vérification des prix côté serveur, les cartes ne transitant jamais par le site), des filtres de catalogue fonctionnels, des comptes clients et le référencement par produit.',
      items: [
        'Identité haut de gamme',
        'Galeries et zoom HD',
        'Achat express',
        'Favoris conservés',
        'Ouverture instantanée',
        'Pages prêtes à l’avance',
        'Expérience mobile soignée',
        'Code modulaire',
      ],
    },
  },
  en: {
    slug: 'la-reine',
    diagram: 'lareine',
    poster: '/case/lareine/cover.jpg',
    title: 'La Reine by Anwar',
    tagline: 'Luxury leather-goods online store',
    intro:
      'An online store for high-end handbags, built as a freelance project for demanding customers who care about style as much as the buying experience. The identity borrows the codes of luxury houses: a cream and champagne palette, editorial typography, large photos and subtle animations. The journey runs from discovering a product to placing the order, without friction, on desktop, tablet and mobile.',
    meta: {
      role: 'Front-end developer · freelance',
      period: '2026',
      company: 'La Reine by Anwar · e-commerce site',
      stack: LR_STACK,
    },
    figures: [
      { value: '3', label: 'cache levels, from the phone to the server' },
      { value: '6', label: 'modules: home, catalogue, product, cart, wishlist, info' },
      { value: '4', label: 'collections: bags, new in, clutches, crossbody' },
      { value: '1', label: 'click to add to cart' },
    ],
    context: {
      index: '01',
      title: 'The',
      accent: 'context.',
      body:
        'A leather-goods brand that sells a style as much as a product. Online, the site had to feel like a luxury boutique: a strong, consistent identity on every page, products shown at their best, and a simple checkout, including on a phone with an average connection.',
      label: 'The challenges',
      audiences: [
        { name: 'Establish the brand', detail: 'A strong visual identity, the same on every page.' },
        { name: 'Show the product', detail: 'A bag is chosen on detail: large visuals, galleries and high-definition zoom.' },
        { name: 'Shorten the purchase', detail: 'One-click add to cart and an “Express checkout” mode.' },
        { name: 'Stay fast on mobile', detail: 'Most customers shop on their phone, sometimes on a weak network.' },
        { name: 'Speak to the Tunisian market', detail: 'A fully French interface and prices in dinars.' },
      ],
    },
    architecture: {
      index: '02',
      title: 'The',
      accent: 'architecture.',
      body:
        'A Next.js 16 site (App Router) in React and TypeScript, with Tailwind CSS and shadcn/ui. Speed rests on three cache levels: the phone keeps the site through the Service Worker (PWA), the CDN serves pages from the nearest server, and Next.js builds each product page once (ISR) before refreshing it automatically. Cloudflare filters bots and attacks before they reach the site.',
    },
    decisions: {
      index: '03',
      title: 'The solution,',
      accent: 'choice by choice.',
      items: [
        {
          need: 'A luxury-house identity',
          choice: 'One design system',
          detail: 'Cream and champagne palette, Cormorant Garamond for headings and animations defined once, then reused across the site.',
        },
        {
          need: 'Show the product at its best',
          choice: 'Gallery and full-screen zoom',
          detail: 'Thumbnails, high-definition zoom, a second photo on hover in the catalogue, colour and size choice on the product page.',
        },
        {
          need: 'A frictionless purchase',
          choice: 'One-click cart and express checkout',
          detail: 'Cart and wishlist kept in the browser and synced live across pages, with a dedicated checkout page.',
        },
        {
          need: 'Open the site instantly',
          choice: 'PWA · Serwist',
          detail: 'On the first visit, photos, design and pages are stored on the phone: after that the site opens without downloading anything again, even on a poor network, and installs like an app.',
        },
        {
          need: 'Handle traffic peaks',
          choice: 'Pre-built pages · ISR',
          detail: 'Product and category pages are generated once, then refreshed every few minutes or as soon as a product changes: 1,000 simultaneous visitors barely touch the server.',
        },
        {
          need: 'Serve fast from Tunisia',
          choice: 'CDN · Vercel or Cloudflare',
          detail: 'The site is copied to servers around the world: each customer gets it from the nearest one.',
        },
        {
          need: 'Protect the site',
          choice: 'Cloudflare, HTTPS and keys out of the code',
          detail: 'Bots and attacks blocked upstream, HTTPS everywhere, secret keys never in the code.',
        },
        {
          need: 'Grow without a rewrite',
          choice: 'Typed, reusable components',
          detail: 'End-to-end typed code, small components, lazy-loaded images and fast builds with Turbopack.',
        },
      ],
    },
    studio: {
      tone: '38 62% 50%',
      word: 'La Reine',
      variant: 'layered',
      shots: [
        { src: '/case/lareine/studio-produit.webp', caption: 'Product page: gallery, colour, size' },
        { src: '/case/lareine/cover-cut.webp', caption: 'The La Reine store: home, best-sellers, payment and delivery' },
        { src: '/case/lareine/studio-collections.webp', caption: 'Collections: handbags and crossbody' },
      ],
      tags: [],
    },
    screens: {
      index: '04',
      title: 'The site in',
      accent: 'pictures.',
      landscape: true,
      items: [
        { src: '/case/lareine/accueil.jpg', caption: 'Home: animated banner “Le Luxe, Simplement”' },
        { src: '/case/lareine/collections.jpg', caption: 'Collections: luxury handbags and crossbody' },
        { src: '/case/lareine/best-sellers.jpg', caption: 'Best-sellers, with Best-seller and New badges' },
        { src: '/case/lareine/produit.jpg', caption: 'Product page: gallery, colour, size, express checkout' },
        { src: '/case/lareine/avis.jpg', caption: 'Customer reviews carousel' },
        { src: '/case/lareine/newsletter.jpg', caption: 'Le Cercle La Reine: newsletter sign-up and footer' },
      ],
    },
    result: {
      index: '05',
      title: 'The',
      accent: 'outcome.',
      body:
        'A store with a high-end style, consistent on every screen, that opens instantly on return visits. Planned next steps: a back-office to manage products, stock and orders, online payment through Konnect or Flouci (with server-side price checks, cards never passing through the site), working catalogue filters, customer accounts and per-product SEO.',
      items: [
        'High-end identity',
        'Galleries and HD zoom',
        'Express checkout',
        'Saved wishlist',
        'Instant opening',
        'Pre-built pages',
        'Polished mobile experience',
        'Modular code',
      ],
    },
  },
};

/* ==========================================================================
   Marketplace Student: e-learning platform (Next.js, MongoDB, Gemini).
   Content from Elyess's technical brief. The dashboard figures are mock data
   for now, and the page says so.
   ========================================================================== */

const MS_SCREENS = {
  accueil: '/case/marketplace/accueil.jpg',
  cours: '/case/marketplace/cours-nodejs.jpg',
  programme: '/case/marketplace/programme-react.jpg',
  dashboard: '/case/marketplace/tableau-de-bord.jpg',
  progression: '/case/marketplace/progression.jpg',
};

const MS_STACK = ['Next.js 13', 'React 18', 'TypeScript', 'Tailwind CSS', 'MongoDB · Mongoose', 'JWT · bcrypt', 'Google Gemini', 'Nodemailer', 'PWA · Web Push', 'Cloudflare'];

const MS_STUDIO_FR = {
  tone: '285 55% 42%',
  word: 'Marketplace',
  variant: 'layered' as const,
  shots: [
    { src: '/case/marketplace/studio-cours.webp', caption: 'Fiche d’un cours : durée, niveau, prix, instructeur' },
    { src: '/case/marketplace/studio-laptop.webp', caption: 'Tableau de bord : étudiants, cours actifs, revenus, satisfaction' },
    { src: '/case/marketplace/studio-accueil.webp', caption: 'Accueil avec l’assistant étudiant IA' },
  ],
  tags: [],
};

const MARKETPLACE: Record<Language, CaseStudy> = {
  fr: {
    slug: 'marketplace-student',
    diagram: 'marketplace',
    poster: MS_SCREENS.dashboard,
    title: 'Marketplace Student',
    tagline: 'Plateforme d’apprentissage en ligne pour les étudiants, assistée par IA',
    intro:
      'Une plateforme web d’apprentissage en ligne conçue pour les étudiants universitaires. Elle réunit un catalogue de cours, un espace personnel, un tableau de bord de suivi et plusieurs services d’intelligence artificielle (Google Gemini) qui accompagnent l’étudiant tout au long de son parcours : assistant disponible sur chaque page, quiz générés, parcours personnalisé et fiches de révision. Installable comme une application, elle fonctionne aussi hors connexion.',
    meta: {
      role: 'Développeur full stack',
      period: '2024',
      company: 'Marketplace Student · plateforme web',
      stack: MS_STACK,
    },
    figures: [
      { value: '8', label: 'services d’IA pour accompagner l’étudiant' },
      { value: '4', label: 'domaines : web, mobile, data, cloud' },
      { value: '3', label: 'langues : français, anglais, arabe' },
      { value: '7', label: 'mesures de sécurité appliquées' },
    ],
    context: {
      index: '01',
      title: 'Le',
      accent: 'contexte.',
      body:
        'Les étudiants trouvent des cours partout, mais rarement un parcours : quoi apprendre, dans quel ordre, comment réviser et à qui poser une question à 23 h. La plateforme devait réunir l’offre de cours et un accompagnement personnalisé, sur ordinateur comme sur mobile, sans compromis sur la sécurité des comptes.',
      label: 'La problématique',
      audiences: [
        { name: 'Trop de cours, pas de parcours', detail: 'L’étudiant ne sait pas par où commencer ni dans quel ordre avancer.' },
        { name: 'Des questions à toute heure', detail: 'Il a besoin d’une réponse claire au moment où il bloque, pas le lendemain.' },
        { name: 'Des révisions longues', detail: 'Transformer un module en fiche ou en quiz prend du temps.' },
        { name: 'Un réseau instable', detail: 'Sur mobile, la connexion coupe souvent : le contenu doit rester accessible.' },
        { name: 'Des comptes à protéger', detail: 'Mots de passe, données personnelles et achats doivent être sécurisés.' },
      ],
    },
    architecture: {
      index: '02',
      title: 'L’',
      accent: 'architecture.',
      body:
        'Une application Next.js 13 (React 18, TypeScript, Tailwind CSS) qui sert à la fois les pages et l’API. Les comptes, profils, paramètres et achats sont stockés dans MongoDB via Mongoose. C’est le serveur qui appelle Google Gemini pour les services d’IA, Nodemailer pour les e-mails et Web Push pour les notifications ; les clés restent dans les variables d’environnement. Cloudflare protège l’ensemble en amont.',
    },
    decisions: {
      index: '03',
      title: 'La solution,',
      accent: 'choix par choix.',
      items: [
        {
          need: 'Des comptes sûrs',
          choice: 'JWT en cookie httpOnly + bcrypt',
          detail: 'Mots de passe hachés, vérification de l’adresse e-mail, réinitialisation par e-mail (Nodemailer) et pages comme API protégées par le jeton.',
        },
        {
          need: 'Une aide à toute heure',
          choice: 'Assistant étudiant · Gemini',
          detail: 'Disponible sur toutes les pages, il répond aux questions et propose des vidéos YouTube adaptées.',
        },
        {
          need: 'Savoir quoi apprendre',
          choice: 'Parcours personnalisé par IA',
          detail: 'À partir du niveau et de l’objectif (« devenir développeur React »), l’IA propose un ordre de cours semaine par semaine.',
        },
        {
          need: 'Réviser plus vite',
          choice: 'Quiz et synthèses générés',
          detail: 'Un QCM de 5 à 10 questions en fin de module, corrigé et expliqué, et des fiches, flashcards ou cartes mentales.',
        },
        {
          need: 'Trouver le bon cours',
          choice: 'Recherche en langage naturel',
          detail: '« Un cours de cloud pour débutant à moins de 50 € » : l’IA filtre le catalogue, recommande des cours et choisit le mentor le plus adapté.',
        },
        {
          need: 'Apprendre partout',
          choice: 'PWA · Service Worker · Web Push',
          detail: 'Installable sur ordinateur ou mobile, utilisable hors connexion, avec des notifications push.',
        },
        {
          need: 'Des pages rapides',
          choice: 'Génération statique et connexion réutilisée',
          detail: 'Accueil généré au build et mis en cache, connexion MongoDB gardée en mémoire, index sur l’e-mail et les jetons (TTL), next/image.',
        },
        {
          need: 'Résister aux abus',
          choice: 'Cloudflare, limitation et validation',
          detail: 'Anti-robots et anti-DDoS, nombre de requêtes limité sur l’IA et la connexion, validation serveur, CSP et X-Frame-Options.',
        },
      ],
    },
    studio: MS_STUDIO_FR,
    screens: {
      index: '04',
      title: 'Le site en',
      accent: 'images.',
      landscape: true,
      items: [
        { src: MS_SCREENS.accueil, caption: 'Accueil avec l’assistant étudiant IA ouvert' },
        { src: MS_SCREENS.cours, caption: 'Fiche d’un cours : instructeur, note, prix et inscription' },
        { src: MS_SCREENS.programme, caption: 'Programme d’un cours, module par module' },
        { src: MS_SCREENS.dashboard, caption: 'Tableau de bord : KPI, objectif du mois, catégories, complétion' },
        { src: MS_SCREENS.progression, caption: 'Cours recommandés, progression, revenus et planning' },
      ],
    },
    result: {
      index: '05',
      title: 'Le',
      accent: 'résultat.',
      body:
        'Une plateforme complète où l’étudiant trouve ses cours, suit sa progression et se fait accompagner par l’IA à chaque étape, sur ordinateur comme sur mobile, même hors connexion. Les indicateurs du tableau de bord reposent pour l’instant sur des données fictives : la prochaine étape est de les brancher sur les vraies données d’usage.',
      items: [
        'Catalogue en 4 domaines',
        'Comptes sécurisés',
        'Assistant IA sur chaque page',
        'Quiz et fiches générés',
        'Parcours personnalisé',
        'Recherche en langage naturel',
        'Application installable',
        'Traduction anglais et arabe',
      ],
    },
  },
  en: {
    slug: 'marketplace-student',
    diagram: 'marketplace',
    poster: MS_SCREENS.dashboard,
    title: 'Marketplace Student',
    tagline: 'AI-assisted online learning platform for students',
    intro:
      'A web learning platform built for university students. It brings together a course catalogue, a personal space, a progress dashboard and several AI services (Google Gemini) that support students throughout their journey: an assistant on every page, generated quizzes, a personalised path and revision sheets. Installable like an app, it also works offline.',
    meta: {
      role: 'Full stack developer',
      period: '2024',
      company: 'Marketplace Student · web platform',
      stack: MS_STACK,
    },
    figures: [
      { value: '8', label: 'AI services supporting the student' },
      { value: '4', label: 'areas: web, mobile, data, cloud' },
      { value: '3', label: 'languages: French, English, Arabic' },
      { value: '7', label: 'security measures in place' },
    ],
    context: {
      index: '01',
      title: 'The',
      accent: 'context.',
      body:
        'Students find courses everywhere but rarely a path: what to learn, in what order, how to revise and who to ask at 11 pm. The platform had to bring the course offer and personalised support together, on desktop and mobile, without compromising account security.',
      label: 'The problem',
      audiences: [
        { name: 'Too many courses, no path', detail: 'Students don’t know where to start or in what order to progress.' },
        { name: 'Questions at any hour', detail: 'They need a clear answer when they get stuck, not the next day.' },
        { name: 'Slow revision', detail: 'Turning a module into a sheet or a quiz takes time.' },
        { name: 'An unstable network', detail: 'On mobile the connection often drops: content must stay available.' },
        { name: 'Accounts to protect', detail: 'Passwords, personal data and purchases must be secured.' },
      ],
    },
    architecture: {
      index: '02',
      title: 'The',
      accent: 'architecture.',
      body:
        'A Next.js 13 application (React 18, TypeScript, Tailwind CSS) serving both the pages and the API. Accounts, profiles, settings and purchases are stored in MongoDB through Mongoose. The server calls Google Gemini for the AI services, Nodemailer for e-mails and Web Push for notifications; keys stay in environment variables. Cloudflare protects everything upstream.',
    },
    decisions: {
      index: '03',
      title: 'The solution,',
      accent: 'choice by choice.',
      items: [
        {
          need: 'Secure accounts',
          choice: 'JWT in an httpOnly cookie + bcrypt',
          detail: 'Hashed passwords, e-mail verification, password reset by e-mail (Nodemailer), and both pages and API protected by the token.',
        },
        {
          need: 'Help at any hour',
          choice: 'Student assistant · Gemini',
          detail: 'Available on every page, it answers questions and suggests relevant YouTube videos.',
        },
        {
          need: 'Know what to learn',
          choice: 'AI-personalised path',
          detail: 'From the student’s level and goal (“become a React developer”), the AI proposes a week-by-week course order.',
        },
        {
          need: 'Revise faster',
          choice: 'Generated quizzes and summaries',
          detail: 'A 5-to-10-question quiz at the end of each module, graded and explained, plus sheets, flashcards or mind maps.',
        },
        {
          need: 'Find the right course',
          choice: 'Natural-language search',
          detail: '“A beginner cloud course under €50”: the AI filters the catalogue, recommends courses and picks the best-suited mentor.',
        },
        {
          need: 'Learn anywhere',
          choice: 'PWA · Service Worker · Web Push',
          detail: 'Installable on desktop or mobile, usable offline, with push notifications.',
        },
        {
          need: 'Fast pages',
          choice: 'Static generation and a reused connection',
          detail: 'Home page built at build time and cached, MongoDB connection kept in memory, indexes on e-mail and tokens (TTL), next/image.',
        },
        {
          need: 'Resist abuse',
          choice: 'Cloudflare, rate limiting and validation',
          detail: 'Bot and DDoS protection, limited requests on AI and login, server-side validation, CSP and X-Frame-Options.',
        },
      ],
    },
    studio: {
      ...MS_STUDIO_FR,
      shots: [
        { src: '/case/marketplace/studio-cours.webp', caption: 'Course page: duration, level, price, instructor' },
        { src: '/case/marketplace/studio-laptop.webp', caption: 'Dashboard: students, active courses, revenue, satisfaction' },
        { src: '/case/marketplace/studio-accueil.webp', caption: 'Home page with the AI student assistant' },
      ],
    },
    screens: {
      index: '04',
      title: 'The site in',
      accent: 'pictures.',
      landscape: true,
      items: [
        { src: MS_SCREENS.accueil, caption: 'Home page with the AI student assistant open' },
        { src: MS_SCREENS.cours, caption: 'Course page: instructor, rating, price and enrolment' },
        { src: MS_SCREENS.programme, caption: 'Course syllabus, module by module' },
        { src: MS_SCREENS.dashboard, caption: 'Dashboard: KPIs, monthly goal, categories, completion' },
        { src: MS_SCREENS.progression, caption: 'Recommended courses, progress, revenue and schedule' },
      ],
    },
    result: {
      index: '05',
      title: 'The',
      accent: 'outcome.',
      body:
        'A complete platform where students find their courses, follow their progress and get AI support at every step, on desktop and mobile, even offline. The dashboard figures are mock data for now: the next step is to wire them to real usage data.',
      items: [
        'Catalogue in 4 areas',
        'Secure accounts',
        'AI assistant on every page',
        'Generated quizzes and sheets',
        'Personalised path',
        'Natural-language search',
        'Installable app',
        'English and Arabic translation',
      ],
    },
  },
};

const CASES: Record<string, Record<Language, CaseStudy>> = {
  crashscan: CRASHSCAN,
  bvmt: BVMT,
  parking: PARKING,
  'vibe-tok': VIBE,
  jobtracer: JOBTRACER,
  'fake-news': FAKENEWS,
  'la-reine': LAREINE,
  'marketplace-student': MARKETPLACE,
};

/** Case study for a slug (`bvmt`, `parking`), or null if there is none. */
/** The three screens of the hero fan, in display order (left, centre, right). */
export const fanScreens = (cs: CaseStudy | null) => {
  const screens = cs?.screens;
  if (!screens) return [];
  if (!screens.fan) return screens.items.slice(0, 3);
  return screens.fan
    .map((src) => screens.items.find((item) => item.src === src))
    .filter((item): item is { src: string; caption: string } => Boolean(item));
};

export const getCaseStudy = (slug: string | undefined, lang: Language): CaseStudy | null =>
  (slug && CASES[slug]?.[lang]) || null;

/** Case study behind a project's `/projets/<slug>` link. */
export const getCaseStudyByPath = (path: string | undefined, lang: Language): CaseStudy | null =>
  getCaseStudy(path?.split('/').pop(), lang);

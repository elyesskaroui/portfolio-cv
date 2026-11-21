import type { Language, TranslationKey } from '@/i18n/translations';

/* ==========================================================================
   Structured content, localised.
   Kept out of the components so copy can be edited without touching layout,
   and out of the flat translation map because these are records, not strings.
   ========================================================================== */

export const PROFILE = {
  name: 'Karoui Elyess',
  firstName: 'Elyess',
  initials: 'KE',
  email: 'karouielyess@gmail.com',
  phone: '+216 55 448 132',
  phoneHref: 'tel:+21655448132',
  github: 'https://github.com/elyesskaroui',
  linkedin: 'https://www.linkedin.com/in/karoui-elyess-49109a223/',
  logo: '/new_logo.png',
  graduation: '2026',
} as const;

/* --- CV ---------------------------------------------------------------------
   One PDF per language. `href` is the served path (no spaces or accents, so
   the URL never breaks); `file` is the name the visitor's browser saves it as.
   ------------------------------------------------------------------------ */

export interface Resume {
  href: string;
  file: string;
  sizeKb: number;
}

export const RESUMES: Record<Language, Resume> = {
  fr: { href: '/cv/elyess-karoui-fr.pdf', file: 'CV_Elyess_Karoui_Ingénieur full stack.pdf', sizeKb: 71 },
  en: { href: '/cv/elyess-karoui-en.pdf', file: 'CV_Elyess_Karoui_Full_Stack_EN.pdf', sizeKb: 69 },
};

/* --- Hero video -------------------------------------------------------------
   The talking intro clip. Until it exists the hero shows the portrait instead.
   To switch it on, drop the files in public/hero/ and fill this in, e.g.
   { mp4: '/hero/hero.mp4', webm: '/hero/hero.webm' }
   ------------------------------------------------------------------------ */

export interface HeroVideo {
  mp4: string;
  webm?: string;
  poster?: string;
}

export const HERO_VIDEO: HeroVideo | null = {
  mp4: '/hero/hero.mp4',
  webm: '/hero/hero.webm',
  poster: '/hero/hero-poster.jpg',
};

/* --- Skills: the periodic table ---------------------------------------------
   A deliberately short list of the tools actually used in the work shown
   below. `match` lists the spellings found in project / experience stacks, so
   the inspector can say where each element was used without a second list
   to keep in sync.
   ------------------------------------------------------------------------ */

export type SkillFamily = 'mobile' | 'backend' | 'languages' | 'data' | 'tools' | 'ai';

export const SKILL_FAMILIES: { id: SkillFamily; titleKey: TranslationKey }[] = [
  { id: 'languages', titleKey: 'skills.category.languages' },
  { id: 'mobile', titleKey: 'skills.category.mobile' },
  { id: 'backend', titleKey: 'skills.category.backend' },
  { id: 'data', titleKey: 'skills.category.data' },
  { id: 'ai', titleKey: 'skills.category.ai' },
  { id: 'tools', titleKey: 'skills.category.tools' },
];

/** Line icons for concepts that have no official brand mark. */
export type ConceptIcon = 'bloc' | 'getx' | 'websocket' | 'scraping' | 'iot' | 'groq' | 'ml' | 'prompt';

export interface SkillElement {
  symbol: string;
  name: string;
  family: SkillFamily;
  /** Spellings to look for in project / experience stacks. */
  match?: string[];
  /** Words to look for in experience achievements and project descriptions,
   *  for tools mentioned in the text but not listed in a stack. */
  mentions?: string[];
  /** Official logo in public/logos (Devicon, MIT · Simple Icons, CC0). */
  logo?: string;
  /** Concept icon, used when there is no brand logo. */
  icon?: ConceptIcon;
  /** Brand colour, used only for the soft glow behind the logo. */
  color: string;
}

/* Four full rows of eight on desktop: mobile & languages · backend ·
   data & tooling · AI. Every element comes from the CV or the projects. */
export const SKILL_ELEMENTS: SkillElement[] = [
  // Mobile & languages
  { symbol: 'Fl', name: 'Flutter', family: 'mobile', logo: '/logos/flutter.svg', color: '#02569B' },
  { symbol: 'Da', name: 'Dart', family: 'languages', logo: '/logos/dart.svg', color: '#0175C2' },
  { symbol: 'Bl', name: 'BLoC', family: 'mobile', icon: 'bloc', color: '#0D0D0D' },
  { symbol: 'Gx', name: 'GetX', family: 'mobile', icon: 'getx', color: '#0D0D0D' },
  { symbol: 'Su', name: 'SwiftUI', family: 'mobile', logo: '/logos/swift.svg', color: '#F05138' },
  { symbol: 'Kt', name: 'Kotlin', family: 'languages', logo: '/logos/kotlin.svg', color: '#7F52FF' },
  { symbol: 'Ts', name: 'TypeScript', family: 'languages', logo: '/logos/typescript.svg', color: '#3178C6' },
  { symbol: 'Py', name: 'Python', family: 'languages', logo: '/logos/python.svg', color: '#3776AB' },
  // Backend
  { symbol: 'Ja', name: 'Java', family: 'languages', logo: '/logos/java.svg', color: '#E76F00' },
  { symbol: 'C', name: 'C / C++', family: 'languages', logo: '/logos/cplusplus.svg', color: '#00599C', match: ['C', 'C++'] },
  { symbol: 'Ne', name: 'NestJS', family: 'backend', logo: '/logos/nestjs.svg', color: '#E0234E' },
  { symbol: 'No', name: 'Node.js', family: 'backend', logo: '/logos/nodejs.svg', color: '#5FA04E' },
  { symbol: 'Dj', name: 'Django', family: 'backend', logo: '/logos/django.svg', color: '#092E20' },
  { symbol: 'Nx', name: 'Next.js', family: 'backend', logo: '/logos/nextjs.svg', color: '#0D0D0D' },
  { symbol: 'Ws', name: 'WebSocket', family: 'backend', icon: 'websocket', color: '#0D0D0D' },
  { symbol: 'Sc', name: 'Web scraping', family: 'backend', icon: 'scraping', color: '#0D0D0D', match: ['Web Scraping', 'Web scraping'] },
  // Data & tooling
  { symbol: 'Mg', name: 'MongoDB', family: 'data', logo: '/logos/mongodb.svg', color: '#47A248' },
  { symbol: 'Pg', name: 'PostgreSQL', family: 'data', logo: '/logos/postgresql.svg', color: '#4169E1' },
  { symbol: 'Sq', name: 'SQLite', family: 'data', logo: '/logos/sqlite.svg', color: '#0F80CC' },
  { symbol: 'Dk', name: 'Docker', family: 'tools', logo: '/logos/docker.svg', color: '#2496ED' },
  { symbol: 'Gt', name: 'Git', family: 'tools', logo: '/logos/git.svg', color: '#F05032' },
  { symbol: 'Pm', name: 'Postman', family: 'tools', logo: '/logos/postman.svg', color: '#FF6C37' },
  { symbol: 'Ji', name: 'Jira', family: 'tools', logo: '/logos/jira.svg', color: '#0052CC' },
  { symbol: 'Fg', name: 'Figma', family: 'tools', logo: '/logos/figma.svg', color: '#F24E1E' },
  // AI
  { symbol: 'Cl', name: 'Claude', family: 'ai', logo: '/logos/si-claude.svg', color: '#D97757', match: ['Claude Sonnet'] },
  { symbol: 'Ll', name: 'Llama 3.3', family: 'ai', logo: '/logos/si-meta.svg', color: '#0467DF', mentions: ['Llama'] },
  { symbol: 'Gq', name: 'Groq', family: 'ai', icon: 'groq', color: '#F55036', mentions: ['Groq'] },
  { symbol: 'Wh', name: 'Whisper', family: 'ai', logo: '/logos/si-openai.svg', color: '#0D0D0D', mentions: ['Whisper'] },
  { symbol: 'Ol', name: 'Ollama', family: 'ai', logo: '/logos/si-ollama.svg', color: '#0D0D0D' },
  { symbol: 'Ml', name: 'Machine Learning', family: 'ai', icon: 'ml', color: '#0D0D0D' },
  { symbol: 'Pd', name: 'Prompt design', family: 'ai', icon: 'prompt', color: '#0D0D0D' },
  { symbol: 'Io', name: 'IoT', family: 'tools', icon: 'iot', color: '#0D0D0D' },
];

/* --- Experience ----------------------------------------------------------- */

export interface Experience {
  id: string;
  /** yyyymm — used to merge experience and education into one timeline. */
  start: number;
  company: string;
  role: string;
  period: string;
  location: string;
  /** Freelance missions get a badge so they read differently from placements. */
  freelance?: boolean;
  /** Demo reel, shown through the same dialog as the projects section. */
  video?: string;
  summary: string;
  achievements: string[];
  stack: string[];
}

const EXPERIENCES: Record<Language, Experience[]> = {
  fr: [
    {
      id: 'bvmt',
      start: 202602,
      company: 'BVMT — Bourse des Valeurs Mobilières de Tunis',
      role: 'Développeur full stack mobile & web (PFE)',
      period: 'Févr. 2026 — Juil. 2026',
      location: 'Tunis, Tunisie',
      summary:
        'Projet de fin d’études : application de suivi de la Bourse de Tunis, mobile et web, servant trois publics — le grand public qui consulte le marché sans compte, un espace dédié aux étudiants et chercheurs, et une administration pour la validation des comptes et le traitement des demandes.',
      achievements: [
        'API REST NestJS / TypeScript sur MongoDB (Mongoose), découpée en quinze modules métier',
        'Authentification JWT à jetons de rafraîchissement révocables et habilitations par rôle',
        'Application Flutter unique déployée sur Android et sur le web, gestion d’état par BLoC',
        'Trois langues prises en charge : français, anglais et arabe',
        'Collecte automatisée des données de la Bourse par extraction web planifiée (Axios, Cheerio)',
        'Diffusion en temps réel par WebSocket : cours, indices, courbes intraday, actualités et notifications',
        'Assistant financier intelligent accessible à la voix — Claude Sonnet avec repli sur Llama 3.3 via Groq, transcription Whisper et synthèse vocale — pour l’analyse du marché et le reporting automatisé',
        'Espace étudiants et chercheurs : publications, sujets et demandes de stage, prise de rendez-vous et communauté',
        'Conteneurisation Docker et mise en production : API sur Render, MongoDB Atlas, interface web sur GitHub Pages et APK Android signé',
      ],
      stack: ['Flutter', 'BLoC', 'NestJS', 'TypeScript', 'MongoDB', 'WebSocket', 'Claude Sonnet', 'Docker'],
    },
    {
      id: 'vibe-tok',
      start: 202501,
      company: 'Vibe Tok',
      role: 'Développeur mobile — mission freelance',
      period: '2025',
      location: 'À distance',
      freelance: true,
      video: '/videos/vibe-tok.mp4',
      summary:
        'Développement d’une application mobile de partage de vidéos courtes de type TikTok, du flux de publication à la diffusion en direct.',
      achievements: [
        'Application Flutter complète : publication de vidéos, likes, commentaires et partages',
        'Diffusion en direct (live streaming) intégrée au flux principal',
        'Stockage local via GetStorage et gestion d’état avec GetX',
        'Interface optimisée pour rester fluide sur des appareils d’entrée de gamme',
      ],
      stack: ['Flutter', 'Dart', 'GetX', 'GetStorage'],
    },
    {
      id: 'innovation-decision',
      start: 202507,
      company: 'Innovation & Decision',
      role: 'Développeur mobile full stack',
      period: 'Juil. 2025 — Sept. 2025',
      location: 'Tunis, Tunisie',
      summary:
        'Développement de bout en bout d’une application de gestion de parkings : réservation de places, disponibilité en temps réel, paiements et carte interactive.',
      achievements: [
        'Application Flutter structurée en clean architecture, testable et maintenable',
        'API REST NestJS couvrant réservation, disponibilité et facturation',
        'Intégration Maps API pour la géolocalisation et le guidage vers la place',
        'Tunnel de paiement sécurisé et notifications temps réel',
        'Collaboration avec l’équipe métier pour améliorer l’ergonomie et l’expérience utilisateur',
      ],
      stack: ['Flutter', 'NestJS', 'Maps API', 'WebSocket', 'Paiement'],
    },
    {
      id: 'job-tracker',
      start: 202401,
      company: 'JobTracer',
      role: 'Développeur mobile full stack — mission freelance',
      period: '2024',
      location: 'À distance',
      freelance: true,
      summary:
        'Conception et développement d’une application mobile de suivi et de gestion de candidatures, avec un backend Django.',
      achievements: [
        'Application Flutter pour le suivi des candidatures de bout en bout',
        'Organisation par statuts, avec calendrier intégré des entretiens et relances',
        'Backend Django exposant une API de synchronisation',
        'Stockage local via GetStorage et gestion d’état avec GetX',
      ],
      stack: ['Flutter', 'Django', 'GetX', 'GetStorage'],
    },
    {
      id: 'oaca',
      start: 202407,
      company: 'OACA',
      role: 'Développeur Python — automatisation',
      period: 'Juil. 2024 — Août 2024',
      location: 'Tunis, Tunisie',
      summary:
        'Automatisation de la génération des certificats fiscaux au format XML, auparavant produits manuellement.',
      achievements: [
        'Génération automatisée de documents XML conformes au format attendu',
        'Interface de saisie et de contrôle en Tkinter pour les équipes métier',
        'Persistance et historisation des données en SQLite',
        'Contrôle de conformité des fichiers par validation XSD',
      ],
      stack: ['Python', 'XML', 'SQLite', 'Tkinter'],
    },
    {
      id: 'sitex',
      start: 202202,
      company: 'SITEX',
      role: 'Développeur systèmes embarqués (PFE de licence)',
      period: 'Févr. 2022 — Juin 2022',
      location: 'Monastir, Tunisie',
      summary:
        'Projet de fin d’études de licence : système embarqué IoT pour la commande et la surveillance de groupes électrogènes industriels.',
      achievements: [
        'Système de commande temps réel développé en C/C++',
        'Remontée des mesures capteurs et détection d’anomalies',
        'Interface de monitoring pour les équipes de maintenance',
        'Mise en œuvre des protocoles de communication IoT',
      ],
      stack: ['C', 'C++', 'IoT', 'Capteurs', 'Temps réel'],
    },
  ],
  en: [
    {
      id: 'bvmt',
      start: 202602,
      company: 'BVMT — Tunis Stock Exchange',
      role: 'Full stack mobile & web developer (final-year project)',
      period: 'Feb. 2026 — Jul. 2026',
      location: 'Tunis, Tunisia',
      summary:
        'Final-year project: a mobile and web application for tracking the Tunis Stock Exchange, serving three audiences — the general public browsing the market without an account, a dedicated space for students and researchers, and an administration area for account approval and request handling.',
      achievements: [
        'NestJS / TypeScript REST API on MongoDB (Mongoose), split across fifteen business modules',
        'JWT authentication with revocable refresh tokens and role-based permissions',
        'Single Flutter codebase shipped to both Android and the web, state management with BLoC',
        'Three supported languages: French, English and Arabic',
        'Automated market data collection through scheduled web scraping (Axios, Cheerio)',
        'Real-time delivery over WebSocket: prices, indices, intraday charts, news and notifications',
        'Voice-enabled intelligent financial assistant — Claude Sonnet with Llama 3.3 fallback via Groq, Whisper transcription and speech synthesis — for market analysis and automated reporting',
        'Student and researcher space: posts, internship topics and requests, appointment booking and community features',
        'Docker containerisation and production release: API on Render, MongoDB Atlas, web interface on GitHub Pages and a signed Android APK',
      ],
      stack: ['Flutter', 'BLoC', 'NestJS', 'TypeScript', 'MongoDB', 'WebSocket', 'Claude Sonnet', 'Docker'],
    },
    {
      id: 'vibe-tok',
      start: 202501,
      company: 'Vibe Tok',
      role: 'Mobile developer — freelance',
      period: '2025',
      location: 'Remote',
      freelance: true,
      video: '/videos/vibe-tok.mp4',
      summary:
        'Built a TikTok-style short-video sharing application, from the publishing flow through to live streaming.',
      achievements: [
        'Complete Flutter application: video posting, likes, comments and sharing',
        'Live streaming integrated into the main feed',
        'Local storage through GetStorage and state management with GetX',
        'Interface tuned to stay fluid on entry-level devices',
      ],
      stack: ['Flutter', 'Dart', 'GetX', 'GetStorage'],
    },
    {
      id: 'innovation-decision',
      start: 202507,
      company: 'Innovation & Decision',
      role: 'Full stack mobile developer',
      period: 'Jul. 2025 — Sep. 2025',
      location: 'Tunis, Tunisia',
      summary:
        'End-to-end development of a parking management app: spot booking, real-time availability, payments and an interactive map.',
      achievements: [
        'Flutter application structured with clean architecture — testable and maintainable',
        'NestJS REST API covering booking, availability and billing',
        'Maps API integration for geolocation and turn-by-turn guidance to the bay',
        'Secure payment flow and real-time notifications',
        'Worked with the business team to improve usability and the user experience',
      ],
      stack: ['Flutter', 'NestJS', 'Maps API', 'WebSocket', 'Payments'],
    },
    {
      id: 'job-tracker',
      start: 202401,
      company: 'JobTracer',
      role: 'Full stack mobile developer — freelance',
      period: '2024',
      location: 'Remote',
      freelance: true,
      summary:
        'Designed and built a mobile application for tracking and managing job applications, backed by a Django server.',
      achievements: [
        'Flutter application covering the application pipeline end to end',
        'Status-based organisation with a built-in calendar for interviews and follow-ups',
        'Django backend exposing a synchronisation API',
        'Local storage through GetStorage and state management with GetX',
      ],
      stack: ['Flutter', 'Django', 'GetX', 'GetStorage'],
    },
    {
      id: 'oaca',
      start: 202407,
      company: 'OACA',
      role: 'Python developer — automation',
      period: 'Jul. 2024 — Aug. 2024',
      location: 'Tunis, Tunisia',
      summary:
        'Automated the generation of XML tax certificates that were previously produced by hand.',
      achievements: [
        'Automated generation of XML documents matching the required schema',
        'Tkinter data-entry and review interface for the business teams',
        'Data persistence and history stored in SQLite',
        'File compliance checks through XSD validation',
      ],
      stack: ['Python', 'XML', 'SQLite', 'Tkinter'],
    },
    {
      id: 'sitex',
      start: 202202,
      company: 'SITEX',
      role: 'Embedded systems developer (bachelor’s final project)',
      period: 'Feb. 2022 — Jun. 2022',
      location: 'Monastir, Tunisia',
      summary:
        'Bachelor’s final-year project: an IoT embedded system for controlling and monitoring industrial generator sets.',
      achievements: [
        'Real-time control system written in C/C++',
        'Sensor telemetry reporting with anomaly detection',
        'Monitoring interface for the maintenance teams',
        'Implementation of the IoT communication protocols',
      ],
      stack: ['C', 'C++', 'IoT', 'Sensors', 'Real-time'],
    },
  ],
};

/* --- Projects ------------------------------------------------------------- */

export type ProjectCategory = 'mobile' | 'backend' | 'ai' | 'other';

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  year: string;
  categories: ProjectCategory[];
  stack: string[];
  featured: boolean;
  github?: string;
  video?: string;
  /** Route of a dedicated case-study page, when there is one. */
  caseStudy?: string;
}

const PROJECTS: Record<Language, Project[]> = {
  fr: [
    {
      id: 'bvmt-app',
      caseStudy: '/projets/bvmt',
      title: 'Application BVMT',
      tagline: 'Suivi de la Bourse de Tunis, mobile et web',
      description:
        'Projet de fin d’études mis en production : suivi du marché financier tunisien pour trois publics. API REST NestJS en quinze modules, collecte automatisée des cours par extraction planifiée, diffusion temps réel par WebSocket et assistant financier intelligent accessible à la voix. Application Flutter unique déployée sur Android et sur le web, en trois langues.',
      year: '2026',
      categories: ['mobile', 'backend', 'ai'],
      stack: ['Flutter', 'NestJS', 'TypeScript', 'MongoDB', 'WebSocket', 'Claude Sonnet'],
      featured: true,
      video: '/videos/bvmt.mp4',
    },
    {
      id: 'fake-news',
      caseStudy: '/projets/fake-news',
      title: 'Détecteur de fake news médicales',
      tagline: 'Vérification de contenus santé assistée par IA',
      description:
        'Application mobile qui détecte les fausses informations médicales grâce à une IA hybride (Ollama en local, Gemini et ChatGPT) : collecte automatique des contenus, analyse des textes, images et vidéos, verdict expliqué avec ses sources et validation par des médecins. Elle propose aussi la prise de rendez-vous et un chatbot de premiers secours.',
      year: '2025',
      categories: ['ai', 'mobile', 'backend'],
      stack: ['Flutter', 'NestJS', 'Ollama', 'Gemini', 'ChatGPT', 'Web scraping'],
      featured: true,
      github: PROFILE.github,
      video: '/videos/fake-news-detector.mp4',
    },
    {
      id: 'vibe-tok',
      caseStudy: '/projets/vibe-tok',
      title: 'Vibe Tok',
      tagline: 'Réseau social de vidéos courtes — mission freelance',
      description:
        'Application mobile Flutter de partage de vidéos courtes, dans l’esprit de TikTok, livrée pour un client en mission freelance. Elle couvre tout le parcours social : publication de vidéos, likes, commentaires, partages et diffusion en direct intégrée au flux principal. Une IA analyse chaque image et vidéo avant publication et bloque les contenus dangereux ; une seconde propose aux créateurs des idées inspirées des tendances. GetX pour l’état, GetStorage pour le stockage local.',
      year: '2025',
      categories: ['mobile'],
      stack: ['Flutter', 'Dart', 'GetX', 'GetStorage', 'Live streaming', 'IA'],
      featured: true,
      video: '/videos/vibe-tok.mp4',
    },
    {
      id: 'job-tracker',
      caseStudy: '/projets/jobtracer',
      title: 'JobTracer',
      tagline: 'Suivi de candidatures — mission freelance',
      description:
        'Application mobile Flutter qui aide les candidats à suivre et gérer leurs candidatures, livrée en mission freelance. On ajoute, modifie et supprime ses candidatures, on les organise par statut (Postulé, Entretien, Accepté…) et un calendrier intégré met en avant les échéances et les entretiens à venir. Une couche d’IA analyse les offres, calcule un score de compatibilité CV / offre, rédige lettres et relances, et un assistant répond aux questions sur le suivi. GetX, GetStorage et un backend Django.',
      year: '2024',
      categories: ['mobile', 'backend'],
      stack: ['Flutter', 'Dart', 'GetX', 'GetStorage', 'Django', 'IA'],
      featured: true,
      video: '/videos/jobTracer.mp4',
    },
    {
      id: 'car-repair-ai',
      caseStudy: '/projets/crashscan',
      title: 'Estimation de réparations automobiles',
      tagline: 'CrashScan : dommages et constat amiable par IA',
      description:
        'Application iOS (SwiftUI) qui analyse les photos d’un véhicule accidenté : type d’accident, dommages, estimation du coût et garages les plus proches. Elle lit aussi les documents des deux conducteurs pour remplir le constat amiable, à signer à l’écran et envoyer à l’assureur. Backend NestJS, Gemini, ChatGPT et Google Maps.',
      year: '2025',
      categories: ['mobile', 'ai'],
      stack: ['SwiftUI', 'NestJS', 'Gemini', 'ChatGPT', 'Google Maps', 'PostgreSQL'],
      featured: true,
      github: PROFILE.github,
      video: '/videos/crash-test.mp4',
    },
    {
      id: 'smart-parking',
      caseStudy: '/projets/parking',
      title: 'Parking intelligent',
      tagline: 'Réservation de place en temps réel',
      description:
        'Application de gestion de parking avec disponibilité en temps réel, réservation, paiement intégré et guidage cartographique jusqu’à la place. Gestion d’état GetX et cache local GetStorage pour un usage hors connexion partiel.',
      year: '2025',
      categories: ['mobile', 'backend'],
      stack: ['Flutter', 'NestJS', 'GetX', 'API GPS', 'IA', 'Docker', 'Vercel'],
      featured: true,
      github: PROFILE.github,
      video: '/videos/parking.mp4',
    },
    {
      id: 'la-reine',
      caseStudy: '/projets/la-reine',
      title: 'La Reine by Anwar',
      tagline: 'Boutique en ligne de maroquinerie haut de gamme — mission freelance',
      description:
        'Site e-commerce de sacs à main haut de gamme, réalisé pour une cliente en mission freelance. Identité visuelle inspirée des maisons de luxe (crème et champagne, typographie éditoriale), catalogue par collection, fiche produit avec zoom plein écran, panier et favoris conservés dans le navigateur, achat express. Pensé pour le marché tunisien (français, prix en dinars) et rapide grâce à un cache à trois niveaux : PWA sur le téléphone, pages préparées à l’avance (ISR) et CDN.',
      year: '2026',
      categories: ['other'],
      stack: ['Next.js 16', 'React', 'TypeScript', 'Tailwind CSS', 'shadcn/ui', 'PWA', 'Vercel'],
      featured: true,
    },
    {
      id: 'student-marketplace',
      caseStudy: '/projets/marketplace-student',
      title: 'Marketplace Student',
      tagline: 'Plateforme d’apprentissage en ligne assistée par IA',
      description:
        'Plateforme web d’apprentissage pour les étudiants universitaires : catalogue de cours en quatre domaines, espace personnel, tableau de bord de suivi et huit services d’IA avec Google Gemini (assistant sur chaque page, quiz générés, parcours personnalisé, fiches de révision, recherche en langage naturel, traduction). Comptes sécurisés par JWT et bcrypt, application installable et utilisable hors connexion.',
      year: '2024',
      categories: ['backend', 'ai'],
      stack: ['Next.js 13', 'React', 'TypeScript', 'MongoDB', 'Gemini', 'PWA'],
      featured: true,
    },
    {
      id: 'smart-surveillance',
      title: 'Surveillance électronique intelligente',
      tagline: 'Système embarqué et IoT',
      description:
        'Système de surveillance électronique intelligent basé sur l’embarqué et l’IoT : des capteurs reliés à une carte embarquée détectent les situations anormales et alertent en temps réel une interface de supervision.',
      year: '2022',
      categories: ['other'],
      stack: ['Systèmes embarqués', 'IoT', 'C / C++', 'Capteurs', 'Temps réel'],
      featured: false,
      github: PROFILE.github,
    },
    {
      id: 'blood-transfusion',
      title: 'Gestion de transfusion sanguine',
      tagline: 'Logiciel hospitalier',
      description:
        'Solution développée en C/C++ sous Linux pour gérer les dons, les stocks et les transfusions au sein d’un établissement hospitalier, avec traçabilité complète des poches.',
      year: '2022',
      categories: ['other'],
      stack: ['C', 'C++', 'Linux'],
      featured: false,
      github: PROFILE.github,
    },
  ],
  en: [
    {
      id: 'bvmt-app',
      caseStudy: '/projets/bvmt',
      title: 'BVMT application',
      tagline: 'Tunis Stock Exchange tracking, mobile and web',
      description:
        'Final-year project shipped to production: Tunisian financial market tracking for three audiences. A fifteen-module NestJS REST API, automated price collection through scheduled scraping, real-time delivery over WebSocket and a voice-enabled intelligent financial assistant. A single Flutter codebase shipped to both Android and the web, in three languages.',
      year: '2026',
      categories: ['mobile', 'backend', 'ai'],
      stack: ['Flutter', 'NestJS', 'TypeScript', 'MongoDB', 'WebSocket', 'Claude Sonnet'],
      featured: true,
      video: '/videos/bvmt.mp4',
    },
    {
      id: 'fake-news',
      caseStudy: '/projets/fake-news',
      title: 'Medical fake-news detector',
      tagline: 'AI-assisted health content verification',
      description:
        'A mobile app that detects medical misinformation with a hybrid AI (local Ollama, Gemini and ChatGPT): automated content collection, analysis of text, images and videos, an explained verdict with sources and validation by doctors. It also offers appointment booking and a first-aid chatbot.',
      year: '2025',
      categories: ['ai', 'mobile', 'backend'],
      stack: ['Flutter', 'NestJS', 'Ollama', 'Gemini', 'ChatGPT', 'Web scraping'],
      featured: true,
      github: PROFILE.github,
      video: '/videos/fake-news-detector.mp4',
    },
    {
      id: 'vibe-tok',
      caseStudy: '/projets/vibe-tok',
      title: 'Vibe Tok',
      tagline: 'Short-video social app — freelance engagement',
      description:
        'A Flutter short-video sharing app in the spirit of TikTok, delivered to a client as a freelance engagement. It covers the full social loop: video posting, likes, comments, shares and live streaming built into the main feed. One AI analyses every image and video before publication and blocks dangerous content; a second gives creators trend-inspired ideas. GetX for state, GetStorage for local storage.',
      year: '2025',
      categories: ['mobile'],
      stack: ['Flutter', 'Dart', 'GetX', 'GetStorage', 'Live streaming', 'AI'],
      featured: true,
      video: '/videos/vibe-tok.mp4',
    },
    {
      id: 'job-tracker',
      caseStudy: '/projets/jobtracer',
      title: 'JobTracer',
      tagline: 'Job application tracking — freelance',
      description:
        'A Flutter mobile app that helps job seekers track and manage their applications, delivered as a freelance project. Users add, update and delete applications, organise them by status (Applied, Interviewing, Accepted…), and a built-in calendar highlights upcoming deadlines and interviews. An AI layer analyses offers, scores CV-to-offer fit, writes letters and follow-ups, and an assistant answers questions about your search. GetX, GetStorage and a Django backend.',
      year: '2024',
      categories: ['mobile', 'backend'],
      stack: ['Flutter', 'Dart', 'GetX', 'GetStorage', 'Django', 'AI'],
      featured: true,
      video: '/videos/jobTracer.mp4',
    },
    {
      id: 'car-repair-ai',
      caseStudy: '/projets/crashscan',
      title: 'Vehicle repair estimation',
      tagline: 'CrashScan: AI damage and accident report',
      description:
        'An iOS app (SwiftUI) that analyses photos of a damaged vehicle: accident type, damage, cost estimate and nearest garages. It also reads both drivers’ documents to fill in the accident report, signed on screen and sent to the insurer. NestJS backend, Gemini, ChatGPT and Google Maps.',
      year: '2025',
      categories: ['mobile', 'ai'],
      stack: ['SwiftUI', 'NestJS', 'Gemini', 'ChatGPT', 'Google Maps', 'PostgreSQL'],
      featured: true,
      github: PROFILE.github,
      video: '/videos/crash-test.mp4',
    },
    {
      id: 'smart-parking',
      caseStudy: '/projets/parking',
      title: 'Smart parking',
      tagline: 'Real-time bay reservation',
      description:
        'A parking management application with live availability, booking, integrated payment and map guidance to the reserved bay. GetX state management and a GetStorage local cache allow partial offline use.',
      year: '2025',
      categories: ['mobile', 'backend'],
      stack: ['Flutter', 'NestJS', 'GetX', 'GPS API', 'AI', 'Docker', 'Vercel'],
      featured: true,
      github: PROFILE.github,
      video: '/videos/parking.mp4',
    },
    {
      id: 'la-reine',
      caseStudy: '/projets/la-reine',
      title: 'La Reine by Anwar',
      tagline: 'Luxury leather-goods online store — freelance',
      description:
        'An e-commerce site for high-end handbags, built for a client as a freelance project. A visual identity borrowed from luxury houses (cream and champagne, editorial typography), a catalogue by collection, product pages with full-screen zoom, a cart and wishlist kept in the browser, and express checkout. Built for the Tunisian market (French, prices in dinars) and fast thanks to a three-level cache: PWA on the phone, pre-built pages (ISR) and a CDN.',
      year: '2026',
      categories: ['other'],
      stack: ['Next.js 16', 'React', 'TypeScript', 'Tailwind CSS', 'shadcn/ui', 'PWA', 'Vercel'],
      featured: true,
    },
    {
      id: 'student-marketplace',
      caseStudy: '/projets/marketplace-student',
      title: 'Marketplace Student',
      tagline: 'AI-assisted online learning platform',
      description:
        'A web learning platform for university students: a course catalogue in four areas, a personal space, a progress dashboard and eight AI services built on Google Gemini (an assistant on every page, generated quizzes, a personalised path, revision sheets, natural-language search, translation). Accounts secured with JWT and bcrypt; the app is installable and works offline.',
      year: '2024',
      categories: ['backend', 'ai'],
      stack: ['Next.js 13', 'React', 'TypeScript', 'MongoDB', 'Gemini', 'PWA'],
      featured: true,
    },
    {
      id: 'smart-surveillance',
      title: 'Smart electronic surveillance',
      tagline: 'Embedded system and IoT',
      description:
        'A smart electronic surveillance system built on embedded hardware and IoT: sensors wired to an embedded board detect abnormal situations and alert a monitoring interface in real time.',
      year: '2022',
      categories: ['other'],
      stack: ['Embedded systems', 'IoT', 'C / C++', 'Sensors', 'Real-time'],
      featured: false,
      github: PROFILE.github,
    },
    {
      id: 'blood-transfusion',
      title: 'Blood transfusion management',
      tagline: 'Hospital software',
      description:
        'A C/C++ solution on Linux for managing donations, stock levels and transfusions within a hospital, with full traceability of every blood bag.',
      year: '2022',
      categories: ['other'],
      stack: ['C', 'C++', 'Linux'],
      featured: false,
      github: PROFILE.github,
    },
  ],
};

/* --- Education & activities ----------------------------------------------- */

export interface EducationEntry {
  id: string;
  start: number;
  degree: string;
  school: string;
  period: string;
  description: string;
  /** Degrees are placed on the timeline at graduation: `year` is shown big,
   *  `sort` (YYYYMM) orders the stop. */
  graduated?: { year: string; sort: number };
}

export interface Activity {
  id: string;
  name: string;
  role: string;
  period: string;
  description: string;
}

const EDUCATION: Record<Language, EducationEntry[]> = {
  fr: [
    {
      id: 'esprit',
      start: 202309,
      graduated: { year: '2026', sort: 202609 },
      degree: 'Diplôme d’ingénieur en informatique — Full stack',
      school: 'ESPRIT — École Supérieure Privée d’Ingénierie et de Technologies',
      period: '2023 — 2026',
      description:
        'Diplômé en 2026, spécialité full stack : génie logiciel, architecture des systèmes, développement web et mobile, gestion de projet agile.',
    },
    {
      id: 'isimm',
      start: 201909,
      degree: 'Licence en systèmes embarqués',
      school: 'ISIMM — Institut Supérieur d’Informatique et de Mathématiques de Monastir',
      period: '2019 — 2022',
      description:
        'Systèmes embarqués, IoT, programmation bas niveau et architecture matérielle.',
    },
    {
      id: 'bac',
      start: 201906,
      degree: 'Baccalauréat technique',
      school: 'Tunisie',
      period: '2019',
      description: 'Sciences techniques et mathématiques.',
    },
  ],
  en: [
    {
      id: 'esprit',
      start: 202309,
      graduated: { year: '2026', sort: 202609 },
      degree: 'Engineering degree in computer science — Full stack',
      school: 'ESPRIT — Private Higher School of Engineering and Technology',
      period: '2023 — 2026',
      description:
        'Graduated in 2026, full stack track: software engineering, systems architecture, web and mobile development, agile project management.',
    },
    {
      id: 'isimm',
      start: 201909,
      degree: 'Bachelor’s degree in embedded systems',
      school: 'ISIMM — Higher Institute of Computer Science and Mathematics, Monastir',
      period: '2019 — 2022',
      description: 'Embedded systems, IoT, low-level programming and hardware architecture.',
    },
    {
      id: 'bac',
      start: 201906,
      degree: 'Technical baccalaureate',
      school: 'Tunisia',
      period: '2019',
      description: 'Technical sciences and mathematics.',
    },
  ],
};

const ACTIVITIES: Record<Language, Activity[]> = {
  fr: [
    {
      id: 'ieee',
      name: 'IEEE ESPRIT Student Branch',
      role: 'Membre du bureau',
      period: '2023 — aujourd’hui',
      description: 'Participation et organisation d’événements tech, hackathons et conférences.',
    },
    {
      id: 'cpu',
      name: 'Club CPU',
      role: 'Membre du bureau',
      period: '2020 — 2022',
      description: 'Club d’informatique et de programmation compétitive.',
    },
{
      id: 'atast',
      name: 'Club ATAST',
      role: 'Membre actif',
      period: '2021 — 2022',
      description:
        'Association tunisienne pour l’avancement de la science et de la technologie.',
    },
  ],
  en: [
    {
      id: 'ieee',
      name: 'IEEE ESPRIT Student Branch',
      role: 'Committee member',
      period: '2023 — present',
      description: 'Taking part in and organising tech events, hackathons and conferences.',
    },
    {
      id: 'cpu',
      name: 'CPU Club',
      role: 'Committee member',
      period: '2020 — 2022',
      description: 'Computing and competitive programming club.',
    },
{
      id: 'atast',
      name: 'ATAST Club',
      role: 'Active member',
      period: '2021 — 2022',
      description: 'Tunisian association for the advancement of science and technology.',
    },
  ],
};

/* --- Helpers -------------------------------------------------------------- */

/**
 * Poster frames are generated alongside each demo reel and mirror its name,
 * so the path is derived rather than stored twice.
 * `/videos/parking.mp4` → `/posters/parking.jpg`
 */
export const posterFor = (video?: string): string | undefined =>
  video ? video.replace('/videos/', '/posters/').replace(/\.mp4$/, '.jpg') : undefined;

/* --- Accessors ------------------------------------------------------------ */

export const getExperiences = (lang: Language): Experience[] => EXPERIENCES[lang];
/** Display order of the work section; projects not listed follow in data order. */
const PROJECT_ORDER = ['bvmt-app', 'smart-parking', 'vibe-tok', 'fake-news', 'job-tracker', 'car-repair-ai', 'la-reine', 'student-marketplace'];
const rank = (id: string) => {
  const index = PROJECT_ORDER.indexOf(id);
  return index === -1 ? PROJECT_ORDER.length : index;
};

export const getProjects = (lang: Language): Project[] =>
  [...PROJECTS[lang]].sort((a, b) => rank(a.id) - rank(b.id));
export const getEducation = (lang: Language): EducationEntry[] => EDUCATION[lang];
export const getActivities = (lang: Language): Activity[] => ACTIVITIES[lang];

/* --- Derived views -------------------------------------------------------- */

/** Where a skill element appears: project titles and experience companies. */
export const usedIn = (element: SkillElement, lang: Language): string[] => {
  const names = (element.match ?? [element.name]).map((name) => name.toLowerCase());
  const has = (stack: string[]) => stack.some((tech) => names.includes(tech.toLowerCase()));
  // Whole words only, so "Llama" does not match inside "Ollama".
  const mentions = (element.mentions ?? []).map((word) => new RegExp(`(^|[^\\p{L}])${word}([^\\p{L}]|$)`, 'iu'));
  const says = (...texts: string[]) => texts.some((text) => mentions.some((pattern) => pattern.test(text)));
  const places = [
    ...PROJECTS[lang]
      .filter((project) => has(project.stack) || says(project.description))
      .map((project) => project.title),
    ...EXPERIENCES[lang]
      .filter((experience) => has(experience.stack) || says(...experience.achievements))
      .map((experience) => experience.company.split(' — ')[0]),
  ];
  return Array.from(new Set(places));
};

export type JourneyStop =
  | { kind: 'work'; start: number; item: Experience }
  | { kind: 'education'; start: number; item: EducationEntry };

/** Education and experience as one path, most recent first. */
export const getJourney = (lang: Language): JourneyStop[] =>
  [
    ...EXPERIENCES[lang].map((item) => ({ kind: 'work' as const, start: item.start, item })),
    ...EDUCATION[lang].map((item) => ({ kind: 'education' as const, start: item.graduated?.sort ?? item.start, item })),
  ].sort((a, b) => b.start - a.start);

/* --- Hero captions ----------------------------------------------------------
   What the avatar says in public/hero/hero.mp4, timed on the clip's own clock
   (seconds). Most visitors watch muted, so the line is also written out.
   ------------------------------------------------------------------------ */

export interface Caption {
  start: number;
  end: number;
  text: Record<Language, string>;
}

export const HERO_CAPTIONS: Caption[] = [
  {
    start: 0.1,
    end: 3.6,
    text: {
      fr: 'Bonjour, je suis Elyess Karoui, ingénieur full stack.',
      en: 'Hi, I’m Elyess Karoui, a full stack engineer.',
    },
  },
  {
    start: 3.7,
    end: 7.7,
    text: {
      fr: 'Je conçois des applications mobiles et web, avec une vraie maîtrise de l’UI/UX.',
      en: 'I build mobile and web apps, with a real command of UI/UX.',
    },
  },
];

/* --- Key figures ------------------------------------------------------------
   Every number is traceable to the CV; experience and project counts are
   derived from the data above so they can never drift.
   ------------------------------------------------------------------------ */

export interface KeyFigure {
  value: number;
  labelKey: TranslationKey;
  noteKey: TranslationKey;
}

export const KEY_FIGURES: KeyFigure[] = [
  { value: 15, labelKey: 'figures.modules', noteKey: 'figures.modules.note' },
  { value: 2, labelKey: 'figures.platforms', noteKey: 'figures.platforms.note' },
  { value: 3, labelKey: 'figures.languages', noteKey: 'figures.languages.note' },
  { value: EXPERIENCES.fr.length, labelKey: 'figures.experiences', noteKey: 'figures.experiences.note' },
  { value: PROJECTS.fr.length, labelKey: 'figures.projects', noteKey: 'figures.projects.note' },
];

/* --- Testimonials -----------------------------------------------------------
   Only real, attributable quotes (e.g. a LinkedIn recommendation, copied with
   the author's permission). The section stays hidden while this list is empty.
   Example entry:
   {
     id: 'bvmt-supervisor',
     quote: { fr: '…', en: '…' },
     name: 'Prénom Nom',
     role: { fr: 'Encadrant PFE', en: 'Internship supervisor' },
     company: 'BVMT',
     link: 'https://www.linkedin.com/in/…',
   },
   ------------------------------------------------------------------------ */

export interface Testimonial {
  id: string;
  quote: Record<Language, string>;
  name: string;
  role: Record<Language, string>;
  company: string;
  link?: string;
}

export const TESTIMONIALS: Testimonial[] = [];

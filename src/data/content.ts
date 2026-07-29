import type { Language } from '@/i18n/translations';

/* ==========================================================================
   Structured content, localised.
   Kept out of the components so copy can be edited without touching layout,
   and out of the flat translation map because these are records, not strings.
   ========================================================================== */

export const PROFILE = {
  name: 'Karoui Elyess',
  initials: 'KE',
  email: 'Karouielyess@gmail.com',
  phone: '+216 55 448 132',
  phoneHref: 'tel:+21655448132',
  github: 'https://github.com/elyesskaroui',
  linkedin: 'https://www.linkedin.com/in/karoui-elyess-49109a223/',
  resume: '/cv-karoui-elyess.pdf',
  logo: '/new_logo.png',
} as const;

export const HERO_STATS = [
  { value: '07', labelKey: 'hero.stat.projects' },
  { value: '06', labelKey: 'hero.stat.experiences' },
  { value: '30+', labelKey: 'hero.stat.technologies' },
] as const;

/** Flat list used by the marquee strip under the hero. */
export const TECH_MARQUEE = [
  'Flutter',
  'Dart',
  'NestJS',
  'Python',
  'SwiftUI',
  'Kotlin',
  'TypeScript',
  'Node.js',
  'Django',
  'PostgreSQL',
  'MongoDB',
  'Docker',
  'BLoC',
  'WebSocket',
  'Git',
  'Figma',
] as const;

/* --- Skills ---------------------------------------------------------------
   Skill names are proper nouns and identical across languages, so only the
   category titles are translated (via `titleKey`).
   ------------------------------------------------------------------------ */

export interface SkillCategory {
  id: string;
  titleKey: string;
  skills: string[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'mobile',
    titleKey: 'skills.category.mobile',
    skills: ['Flutter', 'BLoC', 'GetX', 'Provider', 'Jetpack Compose', 'SwiftUI', 'Android Studio', 'Xcode'],
  },
  {
    id: 'backend',
    titleKey: 'skills.category.backend',
    skills: ['NestJS', 'Node.js', 'Django', 'Spring Boot', '.NET (C#)', 'Next.js', 'REST', 'WebSocket', 'Mongoose', 'Cheerio', 'Swagger'],
  },
  {
    id: 'languages',
    titleKey: 'skills.category.languages',
    skills: ['TypeScript', 'Python', 'Dart', 'Java', 'Kotlin', 'Swift', 'C', 'C++'],
  },
  {
    id: 'data',
    titleKey: 'skills.category.data',
    skills: ['PostgreSQL', 'MongoDB', 'MySQL', 'Oracle', 'PL/SQL', 'SQLite'],
  },
  {
    id: 'tools',
    titleKey: 'skills.category.tools',
    skills: ['Git', 'Docker', 'Postman', 'Jira', 'Figma', 'CI/CD'],
  },
  {
    id: 'ai',
    titleKey: 'skills.category.ai',
    skills: ['Claude Sonnet', 'Llama 3.3', 'Groq', 'Whisper', 'Ollama', 'Machine Learning', 'Web Scraping', 'Prompt Design'],
  },
];

/* --- Experience ----------------------------------------------------------- */

export interface Experience {
  id: string;
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
      company: 'Innovation & Decision',
      role: 'Développeur mobile full stack',
      period: 'Juil. 2025 — Sept. 2025',
      location: 'Tunis, Tunisie',
      summary:
        'Conception et développement d’une application de gestion de parking : réservation en temps réel, paiement intégré et carte interactive.',
      achievements: [
        'Application Flutter structurée en clean architecture, testable et maintenable',
        'API REST NestJS couvrant réservation, disponibilité et facturation',
        'Intégration Maps API pour la géolocalisation et le guidage vers la place',
        'Tunnel de paiement sécurisé et notifications temps réel',
      ],
      stack: ['Flutter', 'NestJS', 'Maps API', 'WebSocket', 'Paiement'],
    },
    {
      id: 'job-tracker',
      company: 'Job Application Tracker',
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
        'Couche de validation éliminant les erreurs de saisie récurrentes',
      ],
      stack: ['Python', 'XML', 'SQLite', 'Tkinter'],
    },
    {
      id: 'sitex',
      company: 'SITEX',
      role: 'Développeur systèmes embarqués (PFE)',
      period: 'Févr. 2022 — Juin 2022',
      location: 'Monastir, Tunisie',
      summary:
        'Projet de fin d’études : système embarqué IoT pour la commande et la surveillance de groupes électrogènes industriels.',
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
      company: 'Innovation & Decision',
      role: 'Full stack mobile developer',
      period: 'Jul. 2025 — Sep. 2025',
      location: 'Tunis, Tunisia',
      summary:
        'Designed and built a parking management application featuring real-time booking, integrated payment and an interactive map.',
      achievements: [
        'Flutter application structured with clean architecture — testable and maintainable',
        'NestJS REST API covering booking, availability and billing',
        'Maps API integration for geolocation and turn-by-turn guidance to the bay',
        'Secure payment flow and real-time notifications',
      ],
      stack: ['Flutter', 'NestJS', 'Maps API', 'WebSocket', 'Payments'],
    },
    {
      id: 'job-tracker',
      company: 'Job Application Tracker',
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
        'Validation layer that eliminated recurring manual entry errors',
      ],
      stack: ['Python', 'XML', 'SQLite', 'Tkinter'],
    },
    {
      id: 'sitex',
      company: 'SITEX',
      role: 'Embedded systems developer (final project)',
      period: 'Feb. 2022 — Jun. 2022',
      location: 'Monastir, Tunisia',
      summary:
        'Final-year project: an IoT embedded system for controlling and monitoring industrial generator sets.',
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
}

const PROJECTS: Record<Language, Project[]> = {
  fr: [
    {
      id: 'bvmt-app',
      title: 'Application BVMT',
      tagline: 'Suivi de la Bourse de Tunis, mobile et web',
      description:
        'Projet de fin d’études mis en production : suivi du marché financier tunisien pour trois publics. API REST NestJS en quinze modules, collecte automatisée des cours par extraction planifiée, diffusion temps réel par WebSocket et assistant financier intelligent accessible à la voix. Application Flutter unique déployée sur Android et sur le web, en trois langues.',
      year: '2026',
      categories: ['mobile', 'backend', 'ai'],
      stack: ['Flutter', 'NestJS', 'TypeScript', 'MongoDB', 'WebSocket', 'Claude Sonnet'],
      featured: true,
    },
    {
      id: 'fake-news',
      title: 'Détecteur de fake news médicales',
      tagline: 'Vérification de contenus santé assistée par IA',
      description:
        'Application qui confronte une information médicale à des sources fiables grâce au modèle Ollama, avec collecte automatisée des articles et validation finale par des experts. Un domaine où une erreur a des conséquences réelles, d’où la boucle de validation humaine.',
      year: '2025',
      categories: ['ai', 'mobile', 'backend'],
      stack: ['Flutter', 'NestJS', 'Ollama', 'Provider', 'Web Scraping'],
      featured: true,
      github: PROFILE.github,
      video: '/videos/fake-news-detector.mp4',
    },
    {
      id: 'car-repair-ai',
      title: 'Estimation de réparations automobiles',
      tagline: 'Analyse des dommages par vision',
      description:
        'Application multiplateforme qui estime le coût de réparation d’un véhicule à partir de photos du sinistre, afin de réduire les délais de constat. Développée en SwiftUI pour iOS et Kotlin pour Android, avec un backend NestJS pour l’analyse.',
      year: '2025',
      categories: ['mobile', 'ai'],
      stack: ['SwiftUI', 'Kotlin', 'NestJS', 'IA', 'Vision'],
      featured: true,
      github: PROFILE.github,
      video: '/videos/crash-test.mp4',
    },
    {
      id: 'smart-parking',
      title: 'Parking intelligent',
      tagline: 'Réservation de place en temps réel',
      description:
        'Application de gestion de parking avec disponibilité en temps réel, réservation, paiement intégré et guidage cartographique jusqu’à la place. Gestion d’état GetX et cache local GetStorage pour un usage hors connexion partiel.',
      year: '2024',
      categories: ['mobile', 'backend'],
      stack: ['Flutter', 'NestJS', 'Maps API', 'GetX'],
      featured: true,
      github: PROFILE.github,
      video: '/videos/parking.mp4',
    },
{
      id: 'student-marketplace',
      title: 'Marketplace étudiante',
      tagline: 'Échange de matériel entre étudiants',
      description:
        'Plateforme web permettant aux étudiants d’acheter, vendre et échanger livres, cours et matériel scolaire, avec messagerie et transactions sécurisées.',
      year: '2024',
      categories: ['backend', 'other'],
      stack: ['Next.js', 'React', 'Node.js', 'MongoDB'],
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
    {
      id: 'iot-monitoring',
      title: 'Supervision IoT de groupes électrogènes',
      tagline: 'Système embarqué industriel',
      description:
        'Système embarqué de surveillance et de commande de groupes électrogènes en temps réel : lecture des capteurs, détection d’anomalies et interface de monitoring pour la maintenance.',
      year: '2022',
      categories: ['other'],
      stack: ['C', 'IoT', 'Capteurs', 'Temps réel'],
      featured: false,
      github: PROFILE.github,
    },
  ],
  en: [
    {
      id: 'bvmt-app',
      title: 'BVMT application',
      tagline: 'Tunis Stock Exchange tracking, mobile and web',
      description:
        'Final-year project shipped to production: Tunisian financial market tracking for three audiences. A fifteen-module NestJS REST API, automated price collection through scheduled scraping, real-time delivery over WebSocket and a voice-enabled intelligent financial assistant. A single Flutter codebase shipped to both Android and the web, in three languages.',
      year: '2026',
      categories: ['mobile', 'backend', 'ai'],
      stack: ['Flutter', 'NestJS', 'TypeScript', 'MongoDB', 'WebSocket', 'Claude Sonnet'],
      featured: true,
    },
    {
      id: 'fake-news',
      title: 'Medical fake-news detector',
      tagline: 'AI-assisted health content verification',
      description:
        'An application that checks a medical claim against trusted sources using the Ollama model, with automated article collection and a final expert review. A domain where a wrong answer has real consequences — hence the human validation loop.',
      year: '2025',
      categories: ['ai', 'mobile', 'backend'],
      stack: ['Flutter', 'NestJS', 'Ollama', 'Provider', 'Web scraping'],
      featured: true,
      github: PROFILE.github,
      video: '/videos/fake-news-detector.mp4',
    },
    {
      id: 'car-repair-ai',
      title: 'Vehicle repair estimation',
      tagline: 'Damage assessment through vision',
      description:
        'A cross-platform application that estimates vehicle repair costs from photographs of the damage, cutting the time needed to file a claim. Built with SwiftUI for iOS and Kotlin for Android, with a NestJS backend handling the analysis.',
      year: '2025',
      categories: ['mobile', 'ai'],
      stack: ['SwiftUI', 'Kotlin', 'NestJS', 'AI', 'Vision'],
      featured: true,
      github: PROFILE.github,
      video: '/videos/crash-test.mp4',
    },
    {
      id: 'smart-parking',
      title: 'Smart parking',
      tagline: 'Real-time bay reservation',
      description:
        'A parking management application with live availability, booking, integrated payment and map guidance to the reserved bay. GetX state management and a GetStorage local cache allow partial offline use.',
      year: '2024',
      categories: ['mobile', 'backend'],
      stack: ['Flutter', 'NestJS', 'Maps API', 'GetX'],
      featured: true,
      github: PROFILE.github,
      video: '/videos/parking.mp4',
    },
{
      id: 'student-marketplace',
      title: 'Student marketplace',
      tagline: 'Peer-to-peer exchange for students',
      description:
        'A web platform where students buy, sell and swap textbooks, course notes and school equipment, with built-in messaging and secure transactions.',
      year: '2024',
      categories: ['backend', 'other'],
      stack: ['Next.js', 'React', 'Node.js', 'MongoDB'],
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
    {
      id: 'iot-monitoring',
      title: 'IoT generator monitoring',
      tagline: 'Industrial embedded system',
      description:
        'An embedded system for real-time monitoring and control of generator sets: sensor readings, anomaly detection and a monitoring interface for maintenance crews.',
      year: '2022',
      categories: ['other'],
      stack: ['C', 'IoT', 'Sensors', 'Real-time'],
      featured: false,
      github: PROFILE.github,
    },
  ],
};

/* --- Education & activities ----------------------------------------------- */

export interface EducationEntry {
  id: string;
  degree: string;
  school: string;
  period: string;
  description: string;
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
      degree: 'Cycle ingénieur en informatique',
      school: 'ESPRIT — École Supérieure Privée d’Ingénierie et de Technologies',
      period: '2023 — 2026',
      description:
        'Génie logiciel, architecture des systèmes, développement web et mobile, gestion de projet agile.',
    },
    {
      id: 'isimm',
      degree: 'Licence en systèmes embarqués',
      school: 'ISIMM — Institut Supérieur d’Informatique et de Mathématiques de Monastir',
      period: '2019 — 2022',
      description:
        'Systèmes embarqués, IoT, programmation bas niveau et architecture matérielle.',
    },
    {
      id: 'bac',
      degree: 'Baccalauréat technique',
      school: 'Tunisie',
      period: '2019',
      description: 'Sciences techniques et mathématiques.',
    },
  ],
  en: [
    {
      id: 'esprit',
      degree: 'Engineering degree in computer science',
      school: 'ESPRIT — Private Higher School of Engineering and Technology',
      period: '2023 — 2026',
      description:
        'Software engineering, systems architecture, web and mobile development, agile project management.',
    },
    {
      id: 'isimm',
      degree: 'Bachelor’s degree in embedded systems',
      school: 'ISIMM — Higher Institute of Computer Science and Mathematics, Monastir',
      period: '2019 — 2022',
      description: 'Embedded systems, IoT, low-level programming and hardware architecture.',
    },
    {
      id: 'bac',
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
export const getProjects = (lang: Language): Project[] => PROJECTS[lang];
export const getEducation = (lang: Language): EducationEntry[] => EDUCATION[lang];
export const getActivities = (lang: Language): Activity[] => ACTIVITIES[lang];

export type Language = 'fr' | 'en';

/**
 * French is the source of truth: `TranslationKey` is derived from it, and the
 * English map is typed as `Record<TranslationKey, string>`. Adding a key to one
 * language without the other is therefore a compile error, and a typo in a
 * `t()` call is caught at build time rather than silently rendering the key.
 */
const fr = {
  // ---- Navigation -------------------------------------------------------
  'nav.home': 'Accueil',
  'nav.about': 'Profil',
  'nav.skills': 'Expertise',
  'nav.experience': 'Parcours',
  'nav.projects': 'Projets',
  'nav.education': 'Formation',
  'nav.contact': 'Contact',
  'nav.menu.open': 'Ouvrir le menu',
  'nav.menu.close': 'Fermer le menu',
  'nav.language': 'Changer de langue',

  // ---- Hero -------------------------------------------------------------
  'hero.status': 'Diplômé 2026 — Disponible immédiatement',
  'hero.role': 'Ingénieur logiciel',
  // Three short lines, each kept whole (`whitespace-nowrap` in the component)
  // so the display size stays large and the right-hand rag stays even.
  // No trailing punctuation — the accent full stop is rendered by the component.
  'hero.headline.1': 'Ingénieur',
  'hero.headline.2': 'Full Stack',
  'hero.headline.3': '& Mobile',
  'hero.description':
    'Je conçois des applications mobiles et des APIs pensées pour durer — de l’architecture au déploiement. Fraîchement diplômé ingénieur d’ESPRIT, je cherche mon premier poste.',
  'hero.cta.primary': 'Voir mes projets',
  'hero.cta.secondary': 'Télécharger le CV',
  'hero.stat.projects': 'Projets réalisés',
  'hero.stat.experiences': 'Expériences professionnelles',
  'hero.stat.technologies': 'Technologies maîtrisées',
  'hero.scroll': 'Défiler',
  'hero.portrait.alt': 'Portrait de Karoui Elyess',

  // ---- About ------------------------------------------------------------
  'about.eyebrow': 'Profil',
  'about.title': 'À propos',
  'about.lead':
    'Ingénieur en informatique spécialisé dans le développement mobile et backend, je transforme des besoins métier en produits fiables et agréables à utiliser.',
  'about.body.1':
    'Diplômé du cycle ingénieur d’ESPRIT, je me suis concentré sur deux domaines complémentaires : le développement d’applications mobiles multiplateformes et la conception d’APIs backend robustes. Cette double compétence me permet de porter un produit de bout en bout, sans zone d’ombre entre le client et le serveur.',
  'about.body.2':
    'Mon terrain de jeu quotidien, c’est Flutter, NestJS et Python, complétés par du natif iOS (SwiftUI) et Android (Kotlin) quand le produit l’exige. J’intègre régulièrement des modèles d’intelligence artificielle dans mes projets, non pas comme un argument marketing, mais pour résoudre des problèmes que le code classique résout mal.',
  'about.body.3':
    'Après un projet de fin d’études mené à la Bourse de Tunis, je recherche aujourd’hui mon premier poste d’ingénieur full stack, dans une équipe qui a des exigences élevées sur la qualité du code et l’expérience utilisateur.',
  'about.values.title': 'Ma façon de travailler',
  'about.value.1.title': 'Comprendre avant de coder',
  'about.value.1.body':
    'Je commence par le problème et les contraintes réelles, pas par la stack. La technologie vient ensuite, choisie pour ce qu’elle résout.',
  'about.value.2.title': 'Livrer, puis itérer',
  'about.value.2.body':
    'Une première version fonctionnelle en production vaut mieux qu’une architecture parfaite jamais terminée. J’améliore ensuite avec du retour réel.',
  'about.value.3.title': 'Écrire pour les autres',
  'about.value.3.body':
    'Du code lisible, des APIs documentées, des conventions tenues. Ce que je livre doit pouvoir être repris sans moi.',
  'about.value.4.title': 'Rester curieux',
  'about.value.4.body':
    'Veille technique constante et projets personnels réguliers, pour tester les outils avant d’en avoir besoin en production.',
  'about.facts.location': 'Localisation',
  'about.facts.location.value': 'Tunis, Tunisie',
  'about.facts.availability': 'Disponibilité',
  'about.facts.availability.value': 'Immédiate',
  'about.facts.languages': 'Langues',
  'about.facts.languages.value': 'Arabe, Français, Anglais',
  'about.facts.focus': 'Spécialité',
  'about.facts.focus.value': 'Full Stack & Développeur Mobile',

  // ---- Skills -----------------------------------------------------------
  'skills.eyebrow': 'Expertise',
  'skills.title': 'Compétences techniques',
  'skills.lead':
    'Une stack resserrée et maîtrisée plutôt qu’un catalogue. Voici les outils avec lesquels je travaille réellement au quotidien.',
  'skills.category.mobile': 'Développement mobile',
  'skills.category.backend': 'Backend & APIs',
  'skills.category.languages': 'Langages',
  'skills.category.data': 'Bases de données',
  'skills.category.tools': 'Outils & DevOps',
  'skills.category.ai': 'Intelligence artificielle',

  // ---- Experience -------------------------------------------------------
  'experience.eyebrow': 'Parcours',
  'experience.title': 'Expériences professionnelles',
  'experience.lead':
    'Six expériences professionnelles, du système embarqué aux missions freelance et à l’application financière mobile et web mise en production.',
  'experience.present': 'Aujourd’hui',
  'experience.achievements': 'Ce que j’ai livré',
  'experience.freelance': 'Freelance',

  // ---- Projects ---------------------------------------------------------
  'projects.eyebrow': 'Réalisations',
  'projects.title': 'Projets sélectionnés',
  'projects.lead':
    'Une sélection de projets personnels et académiques, du prototype à l’application complète.',
  'projects.filter.all': 'Tous',
  'projects.filter.mobile': 'Mobile',
  'projects.filter.backend': 'Backend',
  'projects.filter.ai': 'IA',
  'projects.filter.other': 'Autres',
  'projects.featured': 'Sélection',
  'projects.watch': 'Voir la démo',
  'projects.code': 'Code source',
  'projects.showAll': 'Afficher tous les projets',
  'projects.showLess': 'Réduire',
  'projects.empty': 'Aucun projet dans cette catégorie.',
  'projects.dialog.close': 'Fermer',
  'projects.count': 'projets',

  // ---- Education --------------------------------------------------------
  'education.eyebrow': 'Formation',
  'education.title': 'Formation & engagement',
  'education.lead':
    'Un parcours qui combine systèmes embarqués et ingénierie logicielle, doublé d’un engagement associatif continu.',
  'education.academic': 'Parcours académique',
  'education.activities': 'Vie associative',
  'education.present': 'Aujourd’hui',

  // ---- Contact ----------------------------------------------------------
  'contact.eyebrow': 'Contact',
  'contact.title': 'Travaillons ensemble',
  'contact.lead':
    'Une opportunité de recrutement ou simplement une question technique ? Écrivez-moi, je réponds sous 24 heures.',
  'contact.direct': 'Contact direct',
  'contact.elsewhere': 'Ailleurs sur le web',
  'contact.form.title': 'Envoyer un message',
  'contact.form.name': 'Nom complet',
  'contact.form.name.placeholder': 'Votre nom',
  'contact.form.email': 'Email',
  'contact.form.email.placeholder': 'vous@exemple.com',
  'contact.form.subject': 'Sujet',
  'contact.form.subject.placeholder': 'Objet de votre message',
  'contact.form.message': 'Message',
  'contact.form.message.placeholder': 'Décrivez votre projet ou votre opportunité…',
  'contact.form.send': 'Envoyer le message',
  'contact.form.sending': 'Envoi en cours…',
  'contact.form.success.title': 'Message envoyé',
  'contact.form.success.body': 'Merci — je vous réponds dans les plus brefs délais.',
  'contact.form.error.title': 'L’envoi a échoué',
  'contact.form.error.body':
    'Une erreur s’est produite. Réessayez ou écrivez-moi directement à Karouielyess@gmail.com.',
  'contact.label.email': 'Email',
  'contact.label.phone': 'Téléphone',
  'contact.label.location': 'Localisation',
  'contact.location.value': 'Tunis, Tunisie',

  // ---- Footer -----------------------------------------------------------
  'footer.tagline': 'Ingénieur Full Stack & Développeur Mobile',
  'footer.rights': 'Tous droits réservés.',
  'footer.built': 'Conçu et développé à Tunis',
  'footer.backToTop': 'Haut de page',
  'footer.nav': 'Navigation',
  'footer.elsewhere': 'Liens',

  // ---- 404 --------------------------------------------------------------
  'notFound.title': 'Page introuvable',
  'notFound.body': 'La page que vous cherchez n’existe pas ou a été déplacée.',
  'notFound.cta': 'Retour à l’accueil',
} as const;

export type TranslationKey = keyof typeof fr;

const en: Record<TranslationKey, string> = {
  // ---- Navigation -------------------------------------------------------
  'nav.home': 'Home',
  'nav.about': 'Profile',
  'nav.skills': 'Expertise',
  'nav.experience': 'Experience',
  'nav.projects': 'Work',
  'nav.education': 'Education',
  'nav.contact': 'Contact',
  'nav.menu.open': 'Open menu',
  'nav.menu.close': 'Close menu',
  'nav.language': 'Change language',

  // ---- Hero -------------------------------------------------------------
  'hero.status': '2026 graduate — Available immediately',
  'hero.role': 'Software engineer',
  // Reads as "Full Stack & Mobile Engineer" — the third line carries the noun.
  'hero.headline.1': 'Full Stack',
  'hero.headline.2': '& Mobile',
  'hero.headline.3': 'Engineer',
  'hero.description':
    'I build mobile applications and APIs made to last — from architecture through to deployment. A newly graduated engineer from ESPRIT, looking for my first role.',
  'hero.cta.primary': 'View my work',
  'hero.cta.secondary': 'Download résumé',
  'hero.stat.projects': 'Projects shipped',
  'hero.stat.experiences': 'Professional engagements',
  'hero.stat.technologies': 'Technologies used',
  'hero.scroll': 'Scroll',
  'hero.portrait.alt': 'Portrait of Karoui Elyess',

  // ---- About ------------------------------------------------------------
  'about.eyebrow': 'Profile',
  'about.title': 'About',
  'about.lead':
    'A software engineer focused on mobile and backend development, turning business requirements into products that are reliable and genuinely pleasant to use.',
  'about.body.1':
    'A graduate of the ESPRIT engineering programme, I concentrated on two complementary areas: building cross-platform mobile applications and designing robust backend APIs. That combination lets me carry a product end to end, with no blind spot between client and server.',
  'about.body.2':
    'My daily toolkit is Flutter, NestJS and Python, backed by native iOS (SwiftUI) and Android (Kotlin) when a product calls for it. I regularly integrate AI models into my projects — not as a marketing line, but to solve problems conventional code handles poorly.',
  'about.body.3':
    'Following a final-year project delivered at the Tunis Stock Exchange, I am looking for my first role as a full stack engineer, with a team that sets a high bar for code quality and user experience.',
  'about.values.title': 'How I work',
  'about.value.1.title': 'Understand before coding',
  'about.value.1.body':
    'I start from the problem and its real constraints, not from the stack. Technology comes second, chosen for what it actually solves.',
  'about.value.2.title': 'Ship, then iterate',
  'about.value.2.body':
    'A working first version in production beats a perfect architecture that never ships. I refine afterwards, with real feedback.',
  'about.value.3.title': 'Write for others',
  'about.value.3.body':
    'Readable code, documented APIs, conventions upheld. What I deliver has to be maintainable without me.',
  'about.value.4.title': 'Stay curious',
  'about.value.4.body':
    'Constant technical reading and regular side projects, so I have tried the tools before I need them in production.',
  'about.facts.location': 'Location',
  'about.facts.location.value': 'Tunis, Tunisia',
  'about.facts.availability': 'Availability',
  'about.facts.availability.value': 'Immediate',
  'about.facts.languages': 'Languages',
  'about.facts.languages.value': 'Arabic, French, English',
  'about.facts.focus': 'Focus',
  'about.facts.focus.value': 'Full Stack & Mobile Developer',

  // ---- Skills -----------------------------------------------------------
  'skills.eyebrow': 'Expertise',
  'skills.title': 'Technical skills',
  'skills.lead':
    'A focused, well-practised stack rather than a catalogue. These are the tools I actually work with day to day.',
  'skills.category.mobile': 'Mobile development',
  'skills.category.backend': 'Backend & APIs',
  'skills.category.languages': 'Languages',
  'skills.category.data': 'Databases',
  'skills.category.tools': 'Tooling & DevOps',
  'skills.category.ai': 'Artificial intelligence',

  // ---- Experience -------------------------------------------------------
  'experience.eyebrow': 'Experience',
  'experience.title': 'Professional experience',
  'experience.lead':
    'Six professional engagements, from embedded systems through freelance work to a financial mobile and web application shipped to production.',
  'experience.present': 'Present',
  'experience.achievements': 'What I delivered',
  'experience.freelance': 'Freelance',

  // ---- Projects ---------------------------------------------------------
  'projects.eyebrow': 'Work',
  'projects.title': 'Selected projects',
  'projects.lead':
    'A selection of personal and academic projects, from prototype to complete application.',
  'projects.filter.all': 'All',
  'projects.filter.mobile': 'Mobile',
  'projects.filter.backend': 'Backend',
  'projects.filter.ai': 'AI',
  'projects.filter.other': 'Other',
  'projects.featured': 'Featured',
  'projects.watch': 'Watch demo',
  'projects.code': 'Source code',
  'projects.showAll': 'Show all projects',
  'projects.showLess': 'Show less',
  'projects.empty': 'No projects in this category.',
  'projects.dialog.close': 'Close',
  'projects.count': 'projects',

  // ---- Education --------------------------------------------------------
  'education.eyebrow': 'Education',
  'education.title': 'Education & involvement',
  'education.lead':
    'A path combining embedded systems and software engineering, alongside continuous involvement in student organisations.',
  'education.academic': 'Academic background',
  'education.activities': 'Student organisations',
  'education.present': 'Present',

  // ---- Contact ----------------------------------------------------------
  'contact.eyebrow': 'Contact',
  'contact.title': 'Let’s work together',
  'contact.lead':
    'A hiring opportunity, or simply a technical question? Drop me a line — I reply within 24 hours.',
  'contact.direct': 'Direct contact',
  'contact.elsewhere': 'Elsewhere online',
  'contact.form.title': 'Send a message',
  'contact.form.name': 'Full name',
  'contact.form.name.placeholder': 'Your name',
  'contact.form.email': 'Email',
  'contact.form.email.placeholder': 'you@example.com',
  'contact.form.subject': 'Subject',
  'contact.form.subject.placeholder': 'What is this about?',
  'contact.form.message': 'Message',
  'contact.form.message.placeholder': 'Tell me about your project or opportunity…',
  'contact.form.send': 'Send message',
  'contact.form.sending': 'Sending…',
  'contact.form.success.title': 'Message sent',
  'contact.form.success.body': 'Thank you — I will get back to you shortly.',
  'contact.form.error.title': 'Sending failed',
  'contact.form.error.body':
    'Something went wrong. Please try again, or email me directly at Karouielyess@gmail.com.',
  'contact.label.email': 'Email',
  'contact.label.phone': 'Phone',
  'contact.label.location': 'Location',
  'contact.location.value': 'Tunis, Tunisia',

  // ---- Footer -----------------------------------------------------------
  'footer.tagline': 'Full Stack Engineer & Mobile Developer',
  'footer.rights': 'All rights reserved.',
  'footer.built': 'Designed and built in Tunis',
  'footer.backToTop': 'Back to top',
  'footer.nav': 'Navigation',
  'footer.elsewhere': 'Links',

  // ---- 404 --------------------------------------------------------------
  'notFound.title': 'Page not found',
  'notFound.body': 'The page you are looking for does not exist or has been moved.',
  'notFound.cta': 'Back to home',
};

export const translations: Record<Language, Record<TranslationKey, string>> = { fr, en };

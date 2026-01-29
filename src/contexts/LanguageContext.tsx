import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  fr: {
    // Navbar
    'nav.home': 'Accueil',
    'nav.about': 'À Propos',
    'nav.skills': 'Compétences',
    'nav.experience': 'Expériences',
    'nav.projects': 'Projets',
    'nav.education': 'Formation',
    'nav.contact': 'Contact',
    
    // Hero Section
    'hero.greeting': 'Bonjour, je suis',
    'hero.title': 'Développeur Full Stack',
    'hero.subtitle': 'Mobile & Backend',
    'hero.description': 'Ingénieur Informatique passionné par le développement mobile (Flutter, Kotlin, Swift) et backend (NestJS, Python). En recherche de stage PFE ou alternance.',
    'hero.cta.projects': 'Voir mes projets',
    'hero.cta.contact': 'Me contacter',
    'hero.availability': 'Disponible pour stage PFE/alternance',
    
    // About Section
    'about.title': 'À Propos',
    'about.description': 'Ingénieur Informatique passionné par le développement mobile et backend, je transforme des idées en applications performantes et intuitives.',
    'about.passion.title': 'Ma Passion',
    'about.passion.text': 'Le développement mobile avec Flutter, Kotlin et Swift, combiné à des backends robustes en NestJS et Python.',
    'about.goal.title': 'Mon Objectif',
    'about.goal.text': 'Créer des solutions innovantes qui résolvent de vrais problèmes utilisateurs avec une expérience exceptionnelle.',
    'about.approach.title': 'Mon Approche',
    'about.approach.text': 'Code propre, architecture scalable et apprentissage continu des dernières technologies.',
    
    // Skills Section
    'skills.title': 'Compétences',
    'skills.mobile': 'Développement Mobile',
    'skills.backend': 'Backend & APIs',
    'skills.tools': 'Outils & DevOps',
    'skills.ai': 'Intelligence Artificielle',
    
    // Experience Section
    'experience.title': 'Expériences',
    'experience.present': 'Présent',
    
    // Projects Section
    'projects.title': 'Projets',
    'projects.viewMore': 'Voir plus',
    'projects.viewLess': 'Voir moins',
    'projects.viewProject': 'Voir le projet',
    'projects.viewCode': 'Voir le code',
    
    // Education Section
    'education.title': 'Formation',
    'education.present': 'Présent',
    
    // Contact Section
    'contact.title': 'Contactez-moi',
    'contact.subtitle': 'Une question ou une opportunité ? Je serais ravi d\'échanger avec vous.',
    'contact.form.name': 'Nom complet',
    'contact.form.email': 'Email',
    'contact.form.subject': 'Sujet',
    'contact.form.message': 'Message',
    'contact.form.send': 'Envoyer le message',
    'contact.form.sending': 'Envoi...',
    'contact.form.success': 'Message envoyé avec succès !',
    'contact.form.error': 'Une erreur est survenue. Veuillez réessayer.',
    'contact.email': 'Email',
    'contact.phone': 'Téléphone',
    'contact.location': 'Localisation',
    'contact.social': 'Retrouvez-moi sur',
    'contact.cta.title': 'Prêt à collaborer ?',
    'contact.cta.text': 'Je suis activement à la recherche d\'un stage PFE ou d\'une alternance. Discutons de comment je peux contribuer à votre équipe !',
    'contact.cta.button': 'Envoyez-moi un message',
    
    // Footer
    'footer.rights': 'Tous droits réservés.',
    'footer.made': 'Fait avec',
    'footer.and': 'et',
  },
  en: {
    // Navbar
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.skills': 'Skills',
    'nav.experience': 'Experience',
    'nav.projects': 'Projects',
    'nav.education': 'Education',
    'nav.contact': 'Contact',
    
    // Hero Section
    'hero.greeting': 'Hello, I\'m',
    'hero.title': 'Full Stack Developer',
    'hero.subtitle': 'Mobile & Backend',
    'hero.description': 'Computer Engineer passionate about mobile development (Flutter, Kotlin, Swift) and backend (NestJS, Python). Looking for an internship or work-study position.',
    'hero.cta.projects': 'View my projects',
    'hero.cta.contact': 'Contact me',
    'hero.availability': 'Available for internship/work-study',
    
    // About Section
    'about.title': 'About Me',
    'about.description': 'Computer Engineer passionate about mobile and backend development, I transform ideas into performant and intuitive applications.',
    'about.passion.title': 'My Passion',
    'about.passion.text': 'Mobile development with Flutter, Kotlin and Swift, combined with robust backends in NestJS and Python.',
    'about.goal.title': 'My Goal',
    'about.goal.text': 'Create innovative solutions that solve real user problems with exceptional experience.',
    'about.approach.title': 'My Approach',
    'about.approach.text': 'Clean code, scalable architecture and continuous learning of the latest technologies.',
    
    // Skills Section
    'skills.title': 'Skills',
    'skills.mobile': 'Mobile Development',
    'skills.backend': 'Backend & APIs',
    'skills.tools': 'Tools & DevOps',
    'skills.ai': 'Artificial Intelligence',
    
    // Experience Section
    'experience.title': 'Experience',
    'experience.present': 'Present',
    
    // Projects Section
    'projects.title': 'Projects',
    'projects.viewMore': 'View more',
    'projects.viewLess': 'View less',
    'projects.viewProject': 'View project',
    'projects.viewCode': 'View code',
    
    // Education Section
    'education.title': 'Education',
    'education.present': 'Present',
    
    // Contact Section
    'contact.title': 'Contact Me',
    'contact.subtitle': 'A question or an opportunity? I would be happy to discuss with you.',
    'contact.form.name': 'Full name',
    'contact.form.email': 'Email',
    'contact.form.subject': 'Subject',
    'contact.form.message': 'Message',
    'contact.form.send': 'Send message',
    'contact.form.sending': 'Sending...',
    'contact.form.success': 'Message sent successfully!',
    'contact.form.error': 'An error occurred. Please try again.',
    'contact.email': 'Email',
    'contact.phone': 'Phone',
    'contact.location': 'Location',
    'contact.social': 'Find me on',
    'contact.cta.title': 'Ready to collaborate?',
    'contact.cta.text': 'I am actively looking for an internship or work-study position. Let\'s discuss how I can contribute to your team!',
    'contact.cta.button': 'Send me a message',
    
    // Footer
    'footer.rights': 'All rights reserved.',
    'footer.made': 'Made with',
    'footer.and': 'and',
  },
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('fr');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

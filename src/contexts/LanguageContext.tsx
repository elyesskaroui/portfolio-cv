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
    'hero.description': 'Ingénieur Full Stack spécialisé en développement mobile et backend. Expert en conception d\'API et systèmes intelligents. Disponible pour stage PFE, alternance ou missions freelance.',
    'hero.cta.projects': 'Voir mes projets',
    'hero.cta.contact': 'Me contacter',
    'hero.availability': 'Disponible pour stage PFE/alternance/missions freelance',
    
    // About Section
    'about.title': 'À Propos',
    'about.subtitle': 'Développeur passionné avec une expertise Full Stack',
    'about.description': 'Ingénieur Informatique passionné par le développement mobile et backend, je transforme des idées en applications performantes et intuitives.',
    'about.intro1': 'Étudiant en',
    'about.intro1.bold': 'Ingénierie Informatique',
    'about.intro1.text': 'à ESPRIT, je suis spécialisé dans le développement d\'applications mobiles et backend. Ma passion pour la technologie m\'a conduit à maîtriser une variété d\'outils et de langages.',
    'about.intro2': 'Je suis particulièrement expérimenté en',
    'about.intro2.bold': 'Python, NestJS, Flutter',
    'about.intro2.text': 'ainsi qu\'en développement iOS (Swift) et Android (Kotlin). Mon intérêt pour l\'',
    'about.intro2.bold2': 'Intelligence Artificielle',
    'about.intro2.text2': 'me pousse à explorer constamment de nouvelles solutions innovantes.',
    'about.intro3': 'Actuellement en recherche active d\'un',
    'about.intro3.bold': 'stage PFE ou alternance',
    'about.intro3.text': 'je suis prêt à contribuer à des projets ambitieux et à apprendre auprès d\'équipes talentueuses.',
    'about.quality.curious': 'Curieux',
    'about.quality.curious.desc': 'Toujours à la recherche de nouvelles technologies et méthodologies',
    'about.quality.rigorous': 'Rigoureux',
    'about.quality.rigorous.desc': 'Attention aux détails et code de qualité',
    'about.quality.autonomous': 'Autonome',
    'about.quality.autonomous.desc': 'Capable de gérer des projets de A à Z',
    'about.quality.passionate': 'Passionné',
    'about.quality.passionate.desc': 'L\'innovation tech est ma passion quotidienne',
    
    // Skills Section
    'skills.title': 'Compétences',
    'skills.subtitle': 'Maîtrise technique à 360°',
    'skills.description': 'Stack technologique moderne et polyvalent pour créer des solutions complètes et performantes.',
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
    'hero.description': 'Full Stack Engineer specialized in mobile and backend development. Expert in API design and intelligent systems. Available for internship, work-study, or freelance missions.',
    'hero.cta.projects': 'View my projects',
    'hero.cta.contact': 'Contact me',
    'hero.availability': 'Available for internship/work-study/freelance',
    
    // About Section
    'about.title': 'About Me',
    'about.subtitle': 'Passionate developer with Full Stack expertise',
    'about.description': 'Computer Engineer passionate about mobile and backend development, I transform ideas into performant and intuitive applications.',
    'about.intro1': 'Student in',
    'about.intro1.bold': 'Computer Engineering',
    'about.intro1.text': 'at ESPRIT, I specialize in mobile and backend application development. My passion for technology has led me to master a variety of tools and languages.',
    'about.intro2': 'I am particularly experienced in',
    'about.intro2.bold': 'Python, NestJS, Flutter',
    'about.intro2.text': 'as well as iOS (Swift) and Android (Kotlin) development. My interest in',
    'about.intro2.bold2': 'Artificial Intelligence',
    'about.intro2.text2': 'drives me to constantly explore new innovative solutions.',
    'about.intro3': 'Currently actively looking for a',
    'about.intro3.bold': 'PFE internship or work-study',
    'about.intro3.text': 'I am ready to contribute to ambitious projects and learn from talented teams.',
    'about.quality.curious': 'Curious',
    'about.quality.curious.desc': 'Always looking for new technologies and methodologies',
    'about.quality.rigorous': 'Rigorous',
    'about.quality.rigorous.desc': 'Attention to details and quality code',
    'about.quality.autonomous': 'Autonomous',
    'about.quality.autonomous.desc': 'Able to manage projects from A to Z',
    'about.quality.passionate': 'Passionate',
    'about.quality.passionate.desc': 'Tech innovation is my daily passion',
    
    // Skills Section
    'skills.title': 'Skills',
    'skills.subtitle': '360° Technical Mastery',
    'skills.description': 'Modern and versatile tech stack to build complete and performant solutions.',
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
  // Récupérer la langue depuis localStorage ou utiliser 'fr' par défaut
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    return savedLanguage || 'fr';
  });

  // Sauvegarder la langue dans localStorage quand elle change
  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t }}>
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

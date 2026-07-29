import { createContext, useCallback, useContext, useEffect, useMemo, useState, ReactNode } from 'react';
import { translations, type Language, type TranslationKey } from '@/i18n/translations';

export type { Language, TranslationKey };

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  /** Typed lookup — an unknown key is a compile error, not a silent fallback. */
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const STORAGE_KEY = 'language';

const readInitialLanguage = (): Language => {
  if (typeof window === 'undefined') return 'fr';
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === 'fr' || stored === 'en') return stored;
  // Fall back to the browser preference before defaulting to French.
  return window.navigator.language.toLowerCase().startsWith('en') ? 'en' : 'fr';
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(readInitialLanguage);

  // Keep the document language in sync so screen readers and search engines
  // announce and index the page in the language actually being displayed.
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    window.localStorage.setItem(STORAGE_KEY, lang);
  }, []);

  const t = useCallback((key: TranslationKey) => translations[language][key], [language]);

  const value = useMemo(() => ({ language, setLanguage, t }), [language, setLanguage, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

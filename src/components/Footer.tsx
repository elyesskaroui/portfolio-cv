import { ArrowUp } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { PROFILE } from '@/data/content';

export const Footer = () => {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="wrap flex flex-col items-start justify-between gap-4 py-8 font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground sm:flex-row sm:items-center">
        <p>
          © {year} {PROFILE.name} — {t('footer.rights')}
        </p>
        <p className="hidden md:block">{t('footer.built')}</p>
        <a href="#" className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground">
          {t('footer.backToTop')} <ArrowUp size={12} />
        </a>
      </div>
    </footer>
  );
};

import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const NotFound = () => {
  const { pathname } = useLocation();
  const { t } = useLanguage();

  return (
    <main className="relative flex min-h-screen items-center overflow-hidden">
      <div
        className="bg-grid mask-fade-edges pointer-events-none absolute inset-0 opacity-60"
        aria-hidden="true"
      />

      <div className="container relative">
        <p className="tabular font-mono text-xs uppercase tracking-[0.2em] text-accent">404</p>
        <h1 className="mt-4 text-display-lg font-semibold text-foreground">{t('notFound.title')}</h1>
        <p className="lead mt-4 max-w-md">{t('notFound.body')}</p>
        <p className="mt-2 truncate font-mono text-xs text-muted-foreground">{pathname}</p>

        <Link to="/" className="btn-primary group mt-10">
          <ArrowLeft
            size={16}
            className="transition-transform duration-300 group-hover:-translate-x-0.5"
          />
          {t('notFound.cta')}
        </Link>
      </div>
    </main>
  );
};

export default NotFound;

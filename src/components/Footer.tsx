import { ArrowUp } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import type { TranslationKey } from '@/i18n/translations';
import { PROFILE } from '@/data/content';

const FOOTER_NAV: { id: string; labelKey: TranslationKey }[] = [
  { id: 'profil', labelKey: 'nav.about' },
  { id: 'expertise', labelKey: 'nav.skills' },
  { id: 'parcours', labelKey: 'nav.experience' },
  { id: 'projets', labelKey: 'nav.projects' },
  { id: 'formation', labelKey: 'nav.education' },
  { id: 'contact', labelKey: 'nav.contact' },
];

const EXTERNAL = [
  { label: 'GitHub', href: PROFILE.github },
  { label: 'LinkedIn', href: PROFILE.linkedin },
  { label: 'Email', href: `mailto:${PROFILE.email}` },
];

export const Footer = () => {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="container py-16">
        <div className="grid gap-12 md:grid-cols-12">
          {/* Wordmark */}
          <div className="md:col-span-6">
            <p className="text-display-sm font-semibold tracking-tight text-foreground">
              {PROFILE.name}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{t('footer.tagline')}</p>
            <a
              href={`mailto:${PROFILE.email}`}
              className="link-underline mt-6 inline-flex text-sm text-muted-foreground hover:text-foreground"
            >
              {PROFILE.email}
            </a>
          </div>

          {/* Navigation */}
          <nav className="md:col-span-3" aria-label={t('footer.nav')}>
            <h2 className="eyebrow mb-4">{t('footer.nav')}</h2>
            <ul className="space-y-2.5">
              {FOOTER_NAV.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {t(item.labelKey)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* External links */}
          <div className="md:col-span-3">
            <h2 className="eyebrow mb-4">{t('footer.elsewhere')}</h2>
            <ul className="space-y-2.5">
              {EXTERNAL.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={PROFILE.resume}
                  download
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  CV
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col-reverse items-start justify-between gap-4 border-t border-border pt-6 sm:flex-row sm:items-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            © {year} {PROFILE.name} — {t('footer.rights')}
          </p>
          <div className="flex items-center gap-6">
            <p className="hidden font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground sm:block">
              {t('footer.built')}
            </p>
            <a
              href="#accueil"
              className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground"
            >
              {t('footer.backToTop')}
              <ArrowUp size={13} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

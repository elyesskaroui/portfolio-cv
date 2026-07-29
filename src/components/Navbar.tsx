import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Language, TranslationKey } from '@/i18n/translations';
import { PROFILE } from '@/data/content';

const NAV_ITEMS: { id: string; labelKey: TranslationKey }[] = [
  { id: 'profil', labelKey: 'nav.about' },
  { id: 'expertise', labelKey: 'nav.skills' },
  { id: 'parcours', labelKey: 'nav.experience' },
  { id: 'projets', labelKey: 'nav.projects' },
  { id: 'formation', labelKey: 'nav.education' },
  { id: 'contact', labelKey: 'nav.contact' },
];

const LANGUAGES: Language[] = ['fr', 'en'];

export const Navbar = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Reading-progress bar
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Highlight whichever section currently occupies the middle of the viewport.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] },
    );

    NAV_ITEMS.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // Prevent the page behind the mobile overlay from scrolling.
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // Close the overlay on Escape.
  useEffect(() => {
    if (!isMenuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isMenuOpen]);

  return (
    <>
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-foreground focus:px-4 focus:py-2 focus:text-sm focus:text-background"
      >
        {language === 'fr' ? 'Aller au contenu' : 'Skip to content'}
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ease-editorial ${
          isScrolled || isMenuOpen
            ? 'border-b border-border bg-background/80 backdrop-blur-xl'
            : 'border-b border-transparent'
        }`}
      >
        <div className="container flex h-16 items-center justify-between gap-6 md:h-20">
          {/* Wordmark */}
          <a
            href="#accueil"
            className="group flex items-center gap-2.5 text-sm font-semibold tracking-tight text-foreground"
          >
            <img
              src={PROFILE.logo}
              alt=""
              width={32}
              height={32}
              className="h-8 w-8 rounded-[7px] transition-transform duration-300 ease-editorial group-hover:scale-105"
            />
            {/* Kept in the accessibility tree at every width: hiding it with
                `hidden` left the logo link with no discernible name on mobile. */}
            <span className="sr-only sm:not-sr-only">{PROFILE.name}</span>
          </a>

          {/* Desktop navigation */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Principale">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative rounded px-3 py-2 text-sm transition-colors duration-200 ${
                    isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {t(item.labelKey)}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-3 -bottom-px h-px bg-accent"
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            {/* Language toggle — a segmented control reads cleaner than a dropdown */}
            <div
              className="flex items-center rounded-md border border-border p-0.5"
              role="group"
              aria-label={t('nav.language')}
            >
              {LANGUAGES.map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setLanguage(lang)}
                  aria-pressed={language === lang}
                  className={`rounded px-2 py-1 font-mono text-[11px] uppercase tracking-wider transition-colors duration-200 ${
                    language === lang
                      ? 'bg-foreground text-background'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

            <a
              href={PROFILE.resume}
              download
              className="hidden items-center gap-1.5 rounded-md border border-border px-3 py-2 text-sm text-foreground transition-colors duration-200 hover:border-border-strong hover:bg-surface md:inline-flex"
            >
              CV
              <ArrowUpRight size={14} className="text-muted-foreground" />
            </a>

            <button
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? t('nav.menu.close') : t('nav.menu.open')}
              className="grid h-9 w-9 place-items-center rounded-md border border-border text-foreground transition-colors hover:bg-surface lg:hidden"
            >
              {isMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>

        {/* Reading progress */}
        <motion.div
          style={{ scaleX: progress }}
          className="h-px origin-left bg-accent"
          aria-hidden="true"
        />
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-background pt-16 lg:hidden"
          >
            <nav className="container flex flex-col pt-8" aria-label="Mobile">
              {NAV_ITEMS.map((item, index) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setIsMenuOpen(false)}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + index * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-baseline gap-4 border-b border-border py-5 text-2xl font-semibold tracking-tight text-foreground"
                >
                  <span className="tabular font-mono text-xs text-muted-foreground">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {t(item.labelKey)}
                </motion.a>
              ))}

              <motion.a
                href={PROFILE.resume}
                download
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="btn-primary mt-8 w-full"
              >
                {t('hero.cta.secondary')}
                <ArrowUpRight size={16} />
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

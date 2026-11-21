import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ArrowDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Language, TranslationKey } from '@/i18n/translations';
import { PROFILE } from '@/data/content';
import { ResumeDialog } from '@/components/common/ResumeDialog';
import { ThemeToggle } from '@/components/common/ThemeToggle';

const NAV_ITEMS: { id: string; labelKey: TranslationKey }[] = [
  { id: 'profil', labelKey: 'nav.about' },
  { id: 'expertise', labelKey: 'nav.skills' },
  { id: 'projets', labelKey: 'nav.work' },
  { id: 'parcours', labelKey: 'nav.journey' },
  { id: 'engagement', labelKey: 'nav.engagement' },
  { id: 'contact', labelKey: 'nav.contact' },
];

const LANGUAGES: Language[] = ['fr', 'en'];

const LanguageToggle = () => {
  const { language, setLanguage, t } = useLanguage();
  return (
    <div
      role="group"
      aria-label={t('nav.language')}
      className="flex items-center rounded-full bg-card p-1 shadow-[inset_0_0_0_1px_var(--line-alpha)]"
    >
      {LANGUAGES.map((lang) => (
        <button
          key={lang}
          type="button"
          onClick={() => setLanguage(lang)}
          aria-pressed={language === lang}
          className={`rounded-full px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider transition-colors duration-300 ${
            language === lang ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          {lang}
        </button>
      ))}
    </div>
  );
};

export const Navbar = () => {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [indicator, setIndicator] = useState<{ x: number; w: number } | null>(null);

  const progressRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Scroll state + progress bar (written straight to the DOM, no re-render per frame).
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? window.scrollY / max : 0;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${ratio})`;
      setScrolled(window.scrollY > 40);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // Active section: whichever crosses the band just above the middle of the viewport.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    const hero = document.getElementById('accueil');
    if (hero) observer.observe(hero);
    NAV_ITEMS.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  // Slide the ink pill under the active link.
  const { language } = useLanguage();
  useLayoutEffect(() => {
    const link = linkRefs.current[active];
    const pill = pillRef.current;
    if (!link || !pill) {
      setIndicator(null);
      return;
    }
    setIndicator({ x: link.offsetLeft, w: link.offsetWidth });
  }, [active, language]);

  // Mobile overlay: lock scroll, close on Escape, return focus to the button.
  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = 'hidden';
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  return (
    <>
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-foreground focus:px-4 focus:py-2 focus:text-sm focus:text-background"
      >
        {t('nav.skip')}
      </a>

      <div ref={progressRef} className="nav-progress" aria-hidden="true" />

      <header className="fixed inset-x-0 top-0 z-[60]">
        <div className="wrap flex h-[76px] items-center justify-between gap-4">
          <a href="#accueil" className="nav-home flex items-center gap-3" aria-label={t('nav.home')}>
            <img src="/logo-ke.svg" alt="" width={40} height={40} className="nav-mark" />
            <span
              className={`nav-name hidden text-[15px] font-semibold tracking-tight sm:inline ${
                scrolled && !menuOpen ? 'is-hidden' : ''
              }`}
            >
              {PROFILE.name}
            </span>
          </a>

          <nav aria-label={t('nav.main')} className="hidden lg:block">
            <div ref={pillRef} className={`nav-pill ${scrolled ? 'is-glass' : ''}`}>
              <span
                className="nav-indicator"
                aria-hidden="true"
                style={{
                  width: indicator?.w ?? 0,
                  transform: `translateX(${indicator?.x ?? 0}px)`,
                  opacity: indicator ? 1 : 0,
                }}
              />
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.id}
                  ref={(el) => (linkRefs.current[item.id] = el)}
                  href={`#${item.id}`}
                  aria-current={active === item.id ? 'location' : undefined}
                  className={`nav-link ${active === item.id ? 'is-active' : ''}`}
                >
                  {t(item.labelKey)}
                </a>
              ))}
            </div>
          </nav>

          <div className="flex items-center gap-2.5">
            <ThemeToggle />
            <LanguageToggle />
            <ResumeDialog>
              <button type="button" className="btn-primary hidden !px-4 !py-2.5 md:inline-flex">
                {t('hero.cta.resume')}
                <ArrowDown size={14} />
              </button>
            </ResumeDialog>
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="menu-mobile"
              aria-label={menuOpen ? t('nav.menu.close') : t('nav.menu.open')}
              className="btn-secondary !px-4 !py-2.5 lg:hidden"
            >
              <span aria-hidden="true">{menuOpen ? '✕' : t('nav.menu')}</span>
            </button>
          </div>
        </div>
      </header>

      <div
        id="menu-mobile"
        className={`nav-overlay lg:hidden ${menuOpen ? 'is-open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <nav aria-label={t('nav.main')} className="wrap flex h-full flex-col justify-center pb-10 pt-24">
          {NAV_ITEMS.map((item, index) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              tabIndex={menuOpen ? 0 : -1}
              onClick={() => setMenuOpen(false)}
              className="big flex items-baseline gap-5 border-b border-border py-4 text-[clamp(2rem,9vw,3.5rem)] font-bold leading-none tracking-[-0.045em]"
              style={{ '--i': index } as React.CSSProperties}
            >
              <span className="tabular font-mono text-xs font-normal tracking-normal text-muted-foreground">
                {String(index + 1).padStart(2, '0')}
              </span>
              {t(item.labelKey)}
            </a>
          ))}
          <ResumeDialog>
            <button
              type="button"
              tabIndex={menuOpen ? 0 : -1}
              className="big btn-primary mt-10 self-start"
              style={{ '--i': NAV_ITEMS.length } as React.CSSProperties}
            >
              {t('hero.cta.resume')} <ArrowDown size={15} />
            </button>
          </ResumeDialog>
        </nav>
      </div>
    </>
  );
};

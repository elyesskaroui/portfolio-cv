import { useRef, useState } from 'react';
import {
  ArrowDown,
  Briefcase,
  Check,
  Clock,
  Copy,
  Github,
  Globe,
  GraduationCap,
  Languages,
  Linkedin,
  Mail,
  MapPin,
  type LucideIcon,
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import type { TranslationKey } from '@/i18n/translations';
import { PROFILE } from '@/data/content';
import { ResumeDialog } from '@/components/common/ResumeDialog';
import { IdCard } from '@/components/IdCard';
import { AnimatedLetters } from '@/components/common/AnimatedLetters';

type Fact = {
  labelKey: TranslationKey;
  icon: LucideIcon;
  valueKey?: TranslationKey;
  value?: string;
  href?: string;
  live?: boolean;
};

const FACTS: Fact[] = [
  // What a recruiter checks first: what, where, when.
  { labelKey: 'about.facts.role', icon: Briefcase, valueKey: 'about.facts.role.value' },
  { labelKey: 'about.facts.availability', icon: Clock, valueKey: 'about.facts.availability.value', live: true },
  { labelKey: 'about.facts.mobility', icon: Globe, valueKey: 'about.facts.mobility.value' },
  { labelKey: 'about.facts.location', icon: MapPin, valueKey: 'about.facts.location.value' },
  { labelKey: 'about.facts.education', icon: GraduationCap, valueKey: 'about.facts.education.value' },
  { labelKey: 'about.facts.languages', icon: Languages, valueKey: 'about.facts.languages.value' },
  { labelKey: 'about.facts.email', icon: Mail, value: PROFILE.email, href: `mailto:${PROFILE.email}` },
];

const FOCUS: TranslationKey[] = ['about.focus.mobile', 'about.focus.backend', 'about.focus.ai'];

const delay = (i: number) => ({ '--i': i }) as React.CSSProperties;

/** Email row action: copies the address, confirms for 1.6 s. */
const CopyEmail = () => {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard?.writeText(PROFILE.email).then(
          () => {
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1600);
          },
          () => undefined,
        );
      }}
      aria-label={t('contact.copy.label')}
      title={t('contact.copy.label')}
      className={`facts-copy ${copied ? 'is-done' : ''}`}
    >
      {copied ? <Check size={13} aria-hidden="true" /> : <Copy size={13} aria-hidden="true" />}
      <span className="sr-only" aria-live="polite">
        {copied ? t('contact.copied') : ''}
      </span>
    </button>
  );
};

export const AboutSection = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const role = `${t('hero.title')} ${t('hero.titleAccent')}`.replace(/\.$/, '');

  return (
    <section id="profil" ref={sectionRef} className="section !pt-0">
      <div className="wrap grid gap-14 lg:grid-cols-[minmax(0,1fr)_320px_minmax(0,1fr)] lg:gap-12">
        {/* ---- Left: introduction ---- */}
        <div className="pt-[clamp(96px,14vh,160px)] lg:pt-[clamp(100px,14vh,160px)]">
          <p className="section-tag rv">
            <span className="tabular">01</span> — {t('about.tag')}
          </p>
          <h2 className="title-section mt-6" aria-label={`${t('about.hello')} ${PROFILE.firstName}.`}>
            <span className="rv-mask rv-letters" aria-hidden="true">
              <span><AnimatedLetters text={t('about.hello')} /></span>
            </span>
            <span className="rv-mask rv-letters" aria-hidden="true">
              <span className="serif-accent">
                <AnimatedLetters text={`${PROFILE.firstName}.`} offset={t('about.hello').length + 1} accent />
              </span>
            </span>
          </h2>

          {/* What I focus on, at a glance. */}
          <ul className="rv mt-6 flex flex-wrap gap-2" style={delay(2)} aria-label={t('about.tag')}>
            {FOCUS.map((key, index) => (
              <li key={key} className="focus-chip">
                <span className="tabular font-mono text-[10px] text-muted-foreground">0{index + 1}</span>
                {t(key)}
              </li>
            ))}
          </ul>

          <p className="rv about-lead mt-6" style={delay(3)}>
            {t('about.lead')}
          </p>
          {/* Actions right under the lead, so they are visible without scrolling. */}
          <div className="rv mt-6 flex flex-wrap items-center gap-2.5" style={delay(4)}>
            <ResumeDialog>
              <button type="button" className="btn-primary">
                {t('hero.cta.resume')} <ArrowDown size={15} />
              </button>
            </ResumeDialog>
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn"
              aria-label="GitHub"
              title="GitHub"
            >
              <Github size={17} />
            </a>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <Linkedin size={17} />
            </a>
          </div>

          <p className="rv about-body mt-7" style={delay(5)}>
            {t('about.body')}
          </p>
        </div>

        {/* ---- Centre: the badge, hanging from the top of the section ---- */}
        <div className="order-first flex justify-center lg:order-none">
          <IdCard areaRef={sectionRef} />
        </div>

        {/* ---- Right: quick facts card + quote ---- */}
        <div className="lg:pt-[clamp(100px,14vh,160px)]">
          <div className="facts-card rv">
            <div className="flex items-center justify-between gap-3 px-5 pb-3 pt-5">
              <p className="eyebrow">{t('about.facts')}</p>
              <span className="status-pill">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22c55e] opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#16a34a]" />
                </span>
                {t('about.facts.open')}
              </span>
            </div>

            <dl className="px-2 pb-2">
              {FACTS.map((fact, index) => {
                const Icon = fact.icon;
                const value = fact.value ?? (fact.valueKey ? t(fact.valueKey) : '');
                return (
                  <div key={fact.labelKey} className="fact-row rv" style={delay(index + 1)}>
                    <span className="fact-icon" aria-hidden="true">
                      <Icon size={15} strokeWidth={1.6} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <dt className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-muted-foreground">
                        {t(fact.labelKey)}
                      </dt>
                      <dd className="mt-1 break-words text-[14.5px] font-medium leading-snug">
                        {fact.href ? (
                          <a href={fact.href} className="link-underline">
                            {value}
                          </a>
                        ) : (
                          <span className={fact.live ? 'inline-flex items-center gap-2' : undefined}>
                            {fact.live && <span className="h-1.5 w-1.5 rounded-full bg-[#16a34a]" aria-hidden="true" />}
                            {value}
                          </span>
                        )}
                      </dd>
                    </div>
                    {fact.href && <CopyEmail />}
                  </div>
                );
              })}
            </dl>
          </div>

          <figure className="quote-card rv mt-6" style={delay(4)}>
            <span className="quote-mark" aria-hidden="true">
              “
            </span>
            <blockquote className="relative font-serif text-[clamp(1.35rem,1.1rem+0.8vw,1.65rem)] italic leading-[1.2] tracking-[-0.01em]">
              {t('about.quote')}
            </blockquote>
            <figcaption className="mt-5 flex items-center gap-3">
              <img src="/logo-ke.svg" alt="" width={32} height={32} className="h-8 w-8 rounded-[9px]" />
              <span className="leading-tight">
                <span className="block text-[13.5px] font-semibold">{PROFILE.name}</span>
                <span className="block font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                  {role}
                </span>
              </span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
};

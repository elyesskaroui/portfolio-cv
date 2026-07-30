import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Download } from 'lucide-react';
import profileImage from '@/assets/elyess.webp';
import { useLanguage } from '@/contexts/LanguageContext';
import type { TranslationKey } from '@/i18n/translations';
import { HERO_STATS, PROFILE, TECH_MARQUEE } from '@/data/content';

export const HeroSection = () => {
  const { t } = useLanguage();
  const prefersReducedMotion = useReducedMotion();

  // Headline lines animate in sequence; everything else follows on a shared clock.
  const rise = (delay: number) => ({
    initial: { opacity: 0, y: prefersReducedMotion ? 0 : 28 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: prefersReducedMotion ? 0.2 : 0.8,
      delay: prefersReducedMotion ? 0 : delay,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  });

  return (
    <section id="accueil" className="relative overflow-hidden pt-32 md:pt-40">
      {/* Background: a faint structural grid and a single accent halo, both
          masked so they never hard-stop at the viewport edge. */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="bg-grid mask-fade-edges absolute inset-0 opacity-60" />
        <div className="accent-halo absolute left-1/2 top-0 h-[560px] w-[900px] -translate-x-1/2 -translate-y-1/3" />
      </div>

      <div className="container relative">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* ---- Copy ---- */}
          <div className="lg:col-span-7">
            <motion.div {...rise(0)} className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                  {t('hero.status')}
                </span>
              </span>
            </motion.div>

            <motion.p
              {...rise(0.08)}
              className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground"
            >
              {PROFILE.name}
              <span className="mx-2 text-border-strong">/</span>
              {t('hero.role')}
            </motion.p>

            {/* `whitespace-nowrap` keeps each line whole, so the rag stays even
                and no line ever breaks in an unintended place. */}
            <h1 className="mt-4 text-display-xl font-semibold text-foreground">
              {(
                ['hero.headline.1', 'hero.headline.2', 'hero.headline.3'] as TranslationKey[]
              ).map((key, index) => (
                <motion.span
                  key={key}
                  {...rise(0.14 + index * 0.08)}
                  className="block whitespace-nowrap"
                >
                  {index === 2 ? (
                    <span className="text-muted-foreground">
                      {t(key)}
                      <span className="text-accent">.</span>
                    </span>
                  ) : (
                    t(key)
                  )}
                </motion.span>
              ))}
            </h1>

            <motion.p {...rise(0.42)} className="lead mt-8 max-w-xl">
              {t('hero.description')}
            </motion.p>

            <motion.div {...rise(0.5)} className="mt-10 flex flex-wrap items-center gap-3">
              <a href="#projets" className="btn-primary group">
                {t('hero.cta.primary')}
                <ArrowDown
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-y-0.5"
                />
              </a>
              <a href={PROFILE.resume} download className="btn-secondary group">
                <Download size={16} className="text-muted-foreground" />
                {t('hero.cta.secondary')}
              </a>
            </motion.div>
          </div>

          {/* ---- Portrait ---- */}
          <motion.div
            initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <figure className="group relative mx-auto max-w-sm lg:ml-auto lg:mr-0">
              {/* Offset frame — a printed-plate device rather than a glow */}
              <div className="absolute -bottom-3 -right-3 h-full w-full rounded-lg border border-border-strong transition-transform duration-500 ease-editorial group-hover:translate-x-1 group-hover:translate-y-1" />

              <div className="relative overflow-hidden rounded-lg border border-border bg-surface">
                <img
                  src={profileImage}
                  alt={t('hero.portrait.alt')}
                  width={463}
                  height={572}
                  loading="eager"
                  fetchPriority="high"
                  className="aspect-[4/5] w-full object-cover object-top grayscale transition-[filter,transform] duration-700 ease-editorial group-hover:scale-[1.02] group-hover:grayscale-0"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
              </div>

              <figcaption className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                <span>{PROFILE.name}</span>
                <span>Tunis</span>
              </figcaption>
            </figure>
          </motion.div>
        </div>

        {/* ---- Stats ---- */}
        <motion.dl
          {...rise(0.6)}
          className="mt-20 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-3"
        >
          {HERO_STATS.map((stat) => (
            <div key={stat.labelKey} className="bg-background px-6 py-7">
              <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                {t(stat.labelKey)}
              </dt>
              <dd className="tabular mt-2 text-4xl font-semibold tracking-tight text-foreground">
                {stat.value}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>

      {/* ---- Technology marquee ---- */}
      <motion.div {...rise(0.7)} className="mt-16 border-y border-border py-4">
        <div className="marquee-paused mask-fade-x overflow-hidden" aria-hidden="true">
          <div className="marquee-track gap-10 pr-10">
            {/* Duplicated once so the -50% translation loops seamlessly */}
            {[...TECH_MARQUEE, ...TECH_MARQUEE].map((tech, index) => (
              <span
                key={`${tech}-${index}`}
                className="whitespace-nowrap font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground"
              >
                {tech}
                <span className="ml-10 text-border-strong">◆</span>
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ---- Scroll cue ---- */}
      <motion.div {...rise(0.8)} className="container mt-10 pb-8">
        <a
          href="#profil"
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
        >
          {t('hero.scroll')}
          <motion.span
            animate={prefersReducedMotion ? undefined : { y: [0, 4, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="inline-flex"
          >
            <ArrowUpRight size={13} className="rotate-45" />
          </motion.span>
        </a>
      </motion.div>
    </section>
  );
};

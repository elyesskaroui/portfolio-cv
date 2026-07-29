import { useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Github, Play } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import type { TranslationKey } from '@/i18n/translations';
import { Reveal } from '@/components/common/Reveal';
import { SectionHeader } from '@/components/common/SectionHeader';
import { getProjects, posterFor, type Project, type ProjectCategory } from '@/data/content';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

type Filter = 'all' | ProjectCategory;

const FILTERS: { id: Filter; labelKey: TranslationKey }[] = [
  { id: 'all', labelKey: 'projects.filter.all' },
  { id: 'mobile', labelKey: 'projects.filter.mobile' },
  { id: 'backend', labelKey: 'projects.filter.backend' },
  { id: 'ai', labelKey: 'projects.filter.ai' },
  { id: 'other', labelKey: 'projects.filter.other' },
];

const INITIAL_COUNT = 6;

export const ProjectsSection = () => {
  const { t, language } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const allProjects = getProjects(language);

  const [filter, setFilter] = useState<Filter>('all');
  const [showAll, setShowAll] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const filtered = useMemo(
    () =>
      filter === 'all'
        ? allProjects
        : allProjects.filter((project) => project.categories.includes(filter)),
    [allProjects, filter],
  );

  const visible = showAll ? filtered : filtered.slice(0, INITIAL_COUNT);
  const hasMore = filtered.length > INITIAL_COUNT;

  return (
    <section id="projets" className="section">
      <div className="container">
        <SectionHeader
          index="04"
          eyebrow={t('projects.eyebrow')}
          title={t('projects.title')}
          lead={t('projects.lead')}
        />

        {/* ---- Filters ---- */}
        <Reveal>
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-1" role="tablist" aria-label={t('projects.title')}>
              {FILTERS.map((item) => {
                const isActive = filter === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => {
                      setFilter(item.id);
                      setShowAll(false);
                    }}
                    className={`relative rounded-md px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors duration-200 ${
                      isActive
                        ? 'text-background'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="project-filter"
                        className="absolute inset-0 rounded-md bg-foreground"
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      />
                    )}
                    <span className="relative">{t(item.labelKey)}</span>
                  </button>
                );
              })}
            </div>

            <p className="tabular font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              {String(filtered.length).padStart(2, '0')} {t('projects.count')}
            </p>
          </div>
        </Reveal>

        {/* ---- Grid ---- */}
        {visible.length === 0 ? (
          <p className="border-y border-border py-16 text-center text-sm text-muted-foreground">
            {t('projects.empty')}
          </p>
        ) : (
          <motion.ul layout className="grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2">
            <AnimatePresence mode="popLayout">
              {visible.map((project) => (
                <motion.li
                  key={project.id}
                  layout={!prefersReducedMotion}
                  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -8 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="group flex flex-col bg-background p-7 transition-colors duration-300 hover:bg-surface md:p-9"
                >
                  {/* Meta line */}
                  <div className="flex items-center justify-between gap-4">
                    <span className="tabular font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                      {project.year}
                    </span>
                    {project.featured && (
                      <span className="tag tag-accent">{t('projects.featured')}</span>
                    )}
                  </div>

                  <h3 className="mt-5 text-display-sm font-semibold tracking-tight text-foreground">
                    {project.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-accent-soft">{project.tagline}</p>

                  <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>

                  <ul className="mt-6 flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <li key={tech}>
                        <span className="tag">{tech}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Actions — the bordered row is only drawn when there is at
                      least one link, otherwise it reads as a broken empty area. */}
                  {(project.video || project.github) && (
                  <div className="mt-7 flex items-center gap-5 border-t border-border pt-5">
                    {project.video && (
                      <button
                        type="button"
                        onClick={() => setActiveProject(project)}
                        className="link-underline text-sm font-medium"
                      >
                        <Play size={14} className="text-accent" />
                        {t('projects.watch')}
                      </button>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-underline text-sm text-muted-foreground hover:text-foreground"
                      >
                        <Github size={14} />
                        {t('projects.code')}
                      </a>
                    )}
                  </div>
                  )}
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        )}

        {hasMore && (
          <Reveal>
            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={() => setShowAll((open) => !open)}
                className="btn-secondary group"
              >
                {showAll ? t('projects.showLess') : t('projects.showAll')}
                <ArrowUpRight
                  size={15}
                  className={`text-muted-foreground transition-transform duration-300 ${
                    showAll ? 'rotate-[135deg]' : 'rotate-45'
                  }`}
                />
              </button>
            </div>
          </Reveal>
        )}
      </div>

      {/* ---- Demo dialog ---- */}
      <Dialog open={activeProject !== null} onOpenChange={(open) => !open && setActiveProject(null)}>
        <DialogContent className="max-w-4xl border-border bg-surface p-0">
          {activeProject && (
            <>
              <DialogHeader className="space-y-1 px-6 pt-6 text-left">
                <DialogTitle className="text-xl font-semibold tracking-tight">
                  {activeProject.title}
                </DialogTitle>
                <DialogDescription className="text-sm">{activeProject.tagline}</DialogDescription>
              </DialogHeader>

              <div className="px-6 pb-6">
                {/* Mounted only while open, so a heavy file is never fetched
                    for a dialog the visitor has not asked to see. */}
                <video
                  key={activeProject.id}
                  src={activeProject.video}
                  poster={posterFor(activeProject.video)}
                  controls
                  autoPlay
                  playsInline
                  preload="metadata"
                  className="w-full rounded-md border border-border bg-black"
                >
                  <track kind="captions" />
                </video>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

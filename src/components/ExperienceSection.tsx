import { useState } from 'react';
import { Play } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Reveal } from '@/components/common/Reveal';
import { SectionHeader } from '@/components/common/SectionHeader';
import { getExperiences, posterFor, type Experience } from '@/data/content';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export const ExperienceSection = () => {
  const { t, language } = useLanguage();
  const experiences = getExperiences(language);
  const [activeDemo, setActiveDemo] = useState<Experience | null>(null);

  return (
    <section id="parcours" className="section">
      <div className="container">
        <SectionHeader
          index="03"
          eyebrow={t('experience.eyebrow')}
          title={t('experience.title')}
          lead={t('experience.lead')}
        />

        {/* A single vertical list separated by hairlines — a CV reads better as
            a document than as a decorated zigzag timeline. */}
        <ol className="border-t border-border">
          {experiences.map((experience, index) => (
            <Reveal as="li" key={experience.id} delay={index * 0.06}>
              <article className="group grid gap-6 border-b border-border py-10 md:grid-cols-12 md:gap-10 md:py-12">
                {/* Meta column */}
                <div className="md:col-span-3">
                  <p className="tabular font-mono text-xs uppercase tracking-[0.14em] text-accent">
                    {experience.period}
                  </p>
                  <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                    {experience.location}
                  </p>
                  {experience.freelance && (
                    <span className="tag tag-accent mt-3">{t('experience.freelance')}</span>
                  )}
                </div>

                {/* Content column */}
                <div className="md:col-span-9">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="text-display-sm font-semibold text-foreground">
                      {experience.company}
                    </h3>
                    <span aria-hidden="true" className="text-border-strong">
                      —
                    </span>
                    <p className="text-sm text-muted-foreground">{experience.role}</p>
                  </div>

                  <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
                    {experience.summary}
                  </p>

                  <h4 className="eyebrow mt-8">{t('experience.achievements')}</h4>
                  <ul className="mt-4 grid max-w-3xl gap-2.5 sm:grid-cols-2">
                    {experience.achievements.map((achievement) => (
                      <li
                        key={achievement}
                        className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[0.55rem] h-px w-3 flex-none bg-border-strong"
                        />
                        {achievement}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                    <ul className="flex flex-wrap gap-2">
                      {experience.stack.map((tech) => (
                        <li key={tech}>
                          <span className="tag">{tech}</span>
                        </li>
                      ))}
                    </ul>

                    {experience.video && (
                      <button
                        type="button"
                        onClick={() => setActiveDemo(experience)}
                        className="link-underline text-sm font-medium"
                      >
                        <Play size={14} className="text-accent" />
                        {t('projects.watch')}
                      </button>
                    )}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </ol>
      </div>

      {/* Demo dialog — same behaviour as the projects section: the video is
          only mounted while open, so the file is never fetched otherwise. */}
      <Dialog open={activeDemo !== null} onOpenChange={(open) => !open && setActiveDemo(null)}>
        <DialogContent className="max-w-4xl border-border bg-surface p-0">
          {activeDemo && (
            <>
              <DialogHeader className="space-y-1 px-6 pt-6 text-left">
                <DialogTitle className="text-xl font-semibold tracking-tight">
                  {activeDemo.company}
                </DialogTitle>
                <DialogDescription className="text-sm">{activeDemo.role}</DialogDescription>
              </DialogHeader>

              <div className="px-6 pb-6">
                <video
                  key={activeDemo.id}
                  src={activeDemo.video}
                  poster={posterFor(activeDemo.video)}
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

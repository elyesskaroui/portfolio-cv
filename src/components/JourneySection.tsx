import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, BadgeCheck, GraduationCap, Play, Plus } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { SectionHeader } from '@/components/common/SectionHeader';
import { VideoDialog } from '@/components/common/VideoDialog';
import { getJourney, type Experience } from '@/data/content';
import { prefersReducedMotion } from '@/lib/hooks';

/** First year of a period string ("Févr. 2026 — Juil. 2026" → "2026"). */
const yearOf = (period: string) => period.match(/\d{4}/)?.[0] ?? period;

export const JourneySection = () => {
  const { t, language } = useLanguage();
  const stops = getJourney(language);

  const listRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const [demo, setDemo] = useState<Experience | null>(null);

  // Draw the spine with scroll progress and light each stop as it is reached.
  useEffect(() => {
    const list = listRef.current;
    const fill = fillRef.current;
    if (!list || !fill) return;

    const stopEls = Array.from(list.querySelectorAll<HTMLElement>('.tl-stop'));
    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = list.getBoundingClientRect();
      const reach = prefersReducedMotion()
        ? rect.height
        : Math.max(0, Math.min(rect.height, window.innerHeight * 0.62 - rect.top));
      fill.style.transform = `scaleY(${rect.height ? reach / rect.height : 0})`;
      stopEls.forEach((el) => el.classList.toggle('is-lit', el.offsetTop + 12 <= reach));
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
  }, [language]);

  return (
    <section id="parcours" className="section">
      <div className="wrap">
        <SectionHeader
          index="04"
          tag={t('journey.tag')}
          title={t('journey.title')}
          accent={t('journey.titleAccent')}
          lead={t('journey.lead')}
        />

        <div ref={listRef} className="tl">
          <div className="tl-spine" aria-hidden="true" />
          <div ref={fillRef} className="tl-spine-fill" aria-hidden="true" />
          <ol>
          {/* ---- The open end of the path: what comes next, above the latest stop ---- */}
          <li className="tl-stop md:grid md:grid-cols-[180px_minmax(0,1fr)] md:gap-[60px]">
            <div className="tl-dot" aria-hidden="true" />
            <p className="tl-fade mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground md:mb-0 md:pt-1 md:text-right">
              {t('journey.next.kicker')}
            </p>
            <div className="tl-fade max-w-3xl rounded-[26px] border-[1.5px] border-dashed border-foreground/25 p-7 md:p-9">
              <p className="title-card">{t('journey.next.title')}</p>
              <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-muted-foreground">
                {t('journey.next.body')}
              </p>
              <a href="#contact" className="btn-primary mt-6">
                {t('journey.next.cta')} <ArrowUpRight size={15} />
              </a>
            </div>
          </li>

          {stops.map((stop) => {
            const isWork = stop.kind === 'work';
            const title = isWork ? stop.item.role : stop.item.degree;
            const place = isWork ? `${stop.item.company} · ${stop.item.location}` : stop.item.school;
            const summary = isWork ? stop.item.summary : stop.item.description;

            const bigYear =
              (stop.kind === 'education' && stop.item.graduated?.year) || yearOf(stop.item.period);
            return (
              <li key={`${stop.kind}-${stop.item.id}`} className="tl-stop last:!pb-0 md:grid md:grid-cols-[180px_minmax(0,1fr)] md:gap-[60px]">
                <div className="tl-dot" aria-hidden="true" />

                <div className="tl-fade mb-3 md:mb-0 md:text-right">
                  <p className="tabular text-[clamp(1.6rem,1.2rem+1.4vw,2.6rem)] font-bold leading-none tracking-[-0.05em]">
                    {bigYear}
                  </p>
                  {stop.item.period !== bigYear && (
                    <p className="mt-2 font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted-foreground">
                      {stop.item.period}
                    </p>
                  )}
                </div>

                <div className="tl-fade max-w-3xl">
                  <div className="flex flex-wrap items-center gap-2">
                    {isWork ? (
                      <span className="chip-ink">{t('journey.kind.work')}</span>
                    ) : (
                      <span className="edu-badge">
                        <span className="edu-badge-icon" aria-hidden="true">
                          <GraduationCap size={13} strokeWidth={2.2} />
                        </span>
                        {t('journey.kind.education')}
                      </span>
                    )}
                    {stop.kind === 'education' && stop.item.graduated && (
                      <span className="grad-badge">
                        <BadgeCheck size={13} strokeWidth={2.2} aria-hidden="true" />
                        {t('journey.graduated')} {stop.item.graduated.year}
                      </span>
                    )}
                    {isWork && stop.item.freelance && <span className="chip">{t('journey.freelance')}</span>}
                  </div>
                  <h3 className="mt-4 text-[clamp(1.25rem,1rem+0.9vw,1.75rem)] font-bold leading-tight tracking-[-0.03em]">
                    {title}
                  </h3>
                  <p className="mt-1.5 text-[14px] text-muted-foreground">{place}</p>
                  <p className="mt-4 text-[15px] leading-relaxed text-ink-2">{summary}</p>

                  {isWork && (
                    <>
                      <details className="tl-details mt-5">
                        <summary className="inline-flex items-center gap-2 text-sm font-medium">
                          <span className="tl-caret grid h-6 w-6 place-items-center rounded-full shadow-[inset_0_0_0_1px_hsl(var(--foreground)/0.2)]">
                            <Plus size={12} />
                          </span>
                          {t('journey.details')} ({stop.item.achievements.length})
                        </summary>
                        <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                          {stop.item.achievements.map((achievement) => (
                            <li key={achievement} className="flex gap-3 text-[14px] leading-relaxed text-muted-foreground">
                              <span aria-hidden="true" className="mt-[0.7em] h-px w-3 flex-none bg-foreground/40" />
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </details>

                      <div className="mt-5 flex flex-wrap items-center gap-1.5">
                        {stop.item.stack.map((tech) => (
                          <span key={tech} className="chip">
                            {tech}
                          </span>
                        ))}
                        {stop.item.video && (
                          <button
                            type="button"
                            onClick={() => setDemo(stop.item as Experience)}
                            className="btn-primary ml-2 !px-4 !py-2"
                          >
                            <Play size={13} /> {t('journey.watch')}
                          </button>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </li>
            );
          })}
          </ol>
        </div>
      </div>

      <VideoDialog
        video={
          demo?.video ? { id: demo.id, title: demo.company, subtitle: demo.role, src: demo.video } : null
        }
        onClose={() => setDemo(null)}
      />
    </section>
  );
};

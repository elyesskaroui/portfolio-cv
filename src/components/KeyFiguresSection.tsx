import { useEffect, useRef, useState } from 'react';
import { Briefcase, FolderKanban, Languages, MonitorSmartphone, Server, type LucideIcon } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { KEY_FIGURES } from '@/data/content';
import { prefersReducedMotion, useInView } from '@/lib/hooks';

/** Counts up once, the first time the band is seen (easeOutQuart, 1.4 s). */
const CountUp = ({ to, start }: { to: number; start: boolean }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    if (prefersReducedMotion()) {
      setValue(to);
      return;
    }
    let frame = 0;
    const began = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - began) / 1400);
      setValue(Math.round(to * (1 - Math.pow(1 - progress, 4))));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [start, to]);

  return <>{String(value).padStart(2, '0')}</>;
};

/** Icon per figure, in KEY_FIGURES order. */
const ICONS: LucideIcon[] = [Server, MonitorSmartphone, Languages, Briefcase, FolderKanban];

/** A band right under the hero: the numbers a recruiter reads in seconds. */
export const KeyFiguresSection = () => {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { threshold: 0.4 });

  return (
    <section ref={ref} aria-label={t('figures.label')} className="py-10 lg:py-14">
      <dl className="wrap figures-grid">
        {KEY_FIGURES.map((figure, index) => {
          const Icon = ICONS[index % ICONS.length];
          return (
            <div
              key={figure.labelKey}
              className="rv figure-card"
              style={{ '--i': index } as React.CSSProperties}
            >
              <span className="figure-icon" aria-hidden="true">
                <Icon size={18} strokeWidth={1.8} />
              </span>
              <dd className="figure-value tabular">
                <CountUp to={figure.value} start={inView} />
              </dd>
              <dt className="mt-3">
                <span className="block text-[15px] font-semibold tracking-[-0.01em]">{t(figure.labelKey)}</span>
                <span className="mt-1.5 block font-mono text-[10px] uppercase leading-relaxed tracking-[0.12em] text-muted-foreground">
                  {t(figure.noteKey)}
                </span>
              </dt>
            </div>
          );
        })}
      </dl>
    </section>
  );
};

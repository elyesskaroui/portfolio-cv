import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { AnimatedTitle } from '@/components/common/AnimatedLetters';
import { getActivities } from '@/data/content';

export const EngagementSection = () => {
  const { t, language } = useLanguage();
  const activities = getActivities(language);

  return (
    <section id="engagement" className="section border-y border-border bg-card">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-10">
        {/* ---- Sticky heading ---- */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <p className="section-tag rv">
              <span className="tabular">05</span> — {t('engagement.tag')}
            </p>
            <h2 className="title-section mt-6">
              <AnimatedTitle title={t('engagement.title')} accent={t('engagement.titleAccent')} />
            </h2>
            <p className="rv mt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              <span className="tabular text-foreground">{String(activities.length).padStart(2, '0')}</span>{' '}
              {t('engagement.count')}
            </p>
          </div>
        </div>

        {/* ---- Ink-flood index ---- */}
        <ol className="border-t border-border lg:col-span-7">
          {activities.map((activity, index) => (
            <li
              key={activity.id}
              className="flood-row rv grid grid-cols-[44px_minmax(0,1fr)_auto] items-start gap-4 border-b border-border px-3 py-7 md:px-5"
              style={{ '--i': index } as React.CSSProperties}
            >
              <span className="flood-mute tabular pt-1 font-mono text-[11px] text-muted-foreground">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="min-w-0">
                <h3 className="text-[clamp(1.2rem,1rem+0.8vw,1.65rem)] font-bold leading-tight tracking-[-0.03em]">
                  {activity.name}
                </h3>
                <p className="flood-mute mt-1 text-[14px] text-muted-foreground">
                  {activity.role} · {activity.period}
                </p>
                <p className="flood-mute mt-3 max-w-xl text-[14px] leading-relaxed text-muted-foreground">
                  {activity.description}
                </p>
              </div>
              <ArrowUpRight size={20} className="flood-arrow mt-1" aria-hidden="true" />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

import { useLanguage } from '@/contexts/LanguageContext';
import { Reveal } from '@/components/common/Reveal';
import { SectionHeader } from '@/components/common/SectionHeader';
import { getActivities, getEducation } from '@/data/content';

export const EducationSection = () => {
  const { t, language } = useLanguage();
  const education = getEducation(language);
  const activities = getActivities(language);

  return (
    <section id="formation" className="section">
      <div className="container">
        <SectionHeader
          index="05"
          eyebrow={t('education.eyebrow')}
          title={t('education.title')}
          lead={t('education.lead')}
        />

        <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
          {/* ---- Academic ---- */}
          <div className="lg:col-span-7">
            <Reveal>
              <h3 className="eyebrow mb-8">{t('education.academic')}</h3>
            </Reveal>

            <ol className="border-t border-border">
              {education.map((entry, index) => (
                <Reveal as="li" key={entry.id} delay={index * 0.06}>
                  <article className="grid gap-3 border-b border-border py-7 sm:grid-cols-4 sm:gap-6">
                    <p className="tabular font-mono text-xs uppercase tracking-[0.14em] text-accent-soft">
                      {entry.period}
                    </p>
                    <div className="sm:col-span-3">
                      <h4 className="font-semibold tracking-tight text-foreground">
                        {entry.degree}
                      </h4>
                      <p className="mt-1 text-sm text-muted-foreground">{entry.school}</p>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {entry.description}
                      </p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </ol>
          </div>

          {/* ---- Student organisations ---- */}
          <div className="lg:col-span-5">
            <Reveal>
              <h3 className="eyebrow mb-8">{t('education.activities')}</h3>
            </Reveal>

            <ul className="grid gap-px overflow-hidden rounded-lg border border-border bg-border">
              {activities.map((activity, index) => (
                <Reveal as="li" key={activity.id} delay={index * 0.05}>
                  <div className="bg-background p-6 transition-colors duration-300 hover:bg-surface">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h4 className="font-semibold text-foreground">{activity.name}</h4>
                      <span className="tabular font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                        {activity.period}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-accent-soft">{activity.role}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {activity.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

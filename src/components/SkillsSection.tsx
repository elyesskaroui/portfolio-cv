import { useLanguage } from '@/contexts/LanguageContext';
import type { TranslationKey } from '@/i18n/translations';
import { Reveal } from '@/components/common/Reveal';
import { SectionHeader } from '@/components/common/SectionHeader';
import { SKILL_CATEGORIES } from '@/data/content';

export const SkillsSection = () => {
  const { t } = useLanguage();

  return (
    <section id="expertise" className="section">
      <div className="container">
        <SectionHeader
          index="02"
          eyebrow={t('skills.eyebrow')}
          title={t('skills.title')}
          lead={t('skills.lead')}
        />

        {/* A one-pixel gap over a border-coloured background produces exact
            hairlines between cells without doubling borders. */}
        <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {SKILL_CATEGORIES.map((category, index) => (
            <Reveal key={category.id} delay={(index % 3) * 0.06} className="h-full">
              <article className="group flex h-full flex-col bg-background p-7 transition-colors duration-300 hover:bg-surface">
                <header className="flex items-baseline justify-between gap-4">
                  <h3 className="text-base font-semibold tracking-tight text-foreground">
                    {t(category.titleKey as TranslationKey)}
                  </h3>
                  <span className="tabular font-mono text-[11px] text-muted-foreground transition-colors duration-300 group-hover:text-accent">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </header>

                <div className="mt-5 h-px w-full bg-border transition-colors duration-300 group-hover:bg-border-strong" />

                <ul className="mt-5 flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <li key={skill}>
                      <span className="tag">{skill}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

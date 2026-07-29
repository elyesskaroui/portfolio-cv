import { useLanguage } from '@/contexts/LanguageContext';
import type { TranslationKey } from '@/i18n/translations';
import { Reveal } from '@/components/common/Reveal';
import { SectionHeader } from '@/components/common/SectionHeader';

const VALUES: { titleKey: TranslationKey; bodyKey: TranslationKey }[] = [
  { titleKey: 'about.value.1.title', bodyKey: 'about.value.1.body' },
  { titleKey: 'about.value.2.title', bodyKey: 'about.value.2.body' },
  { titleKey: 'about.value.3.title', bodyKey: 'about.value.3.body' },
  { titleKey: 'about.value.4.title', bodyKey: 'about.value.4.body' },
];

const FACTS: { labelKey: TranslationKey; valueKey: TranslationKey }[] = [
  { labelKey: 'about.facts.location', valueKey: 'about.facts.location.value' },
  { labelKey: 'about.facts.availability', valueKey: 'about.facts.availability.value' },
  { labelKey: 'about.facts.focus', valueKey: 'about.facts.focus.value' },
  { labelKey: 'about.facts.languages', valueKey: 'about.facts.languages.value' },
];

export const AboutSection = () => {
  const { t } = useLanguage();

  return (
    <section id="profil" className="section">
      <div className="container">
        <SectionHeader
          index="01"
          eyebrow={t('about.eyebrow')}
          title={t('about.title')}
          lead={t('about.lead')}
        />

        <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
          {/* ---- Narrative ---- */}
          <div className="lg:col-span-7">
            <div className="space-y-6">
              {(['about.body.1', 'about.body.2', 'about.body.3'] as TranslationKey[]).map(
                (key, index) => (
                  <Reveal key={key} delay={index * 0.08}>
                    <p
                      className={
                        index === 0
                          ? 'text-lead leading-relaxed text-foreground'
                          : 'leading-relaxed text-muted-foreground'
                      }
                    >
                      {t(key)}
                    </p>
                  </Reveal>
                ),
              )}
            </div>

            {/* Facts table — a definition list reads as a document, not a widget */}
            <Reveal delay={0.24}>
              <dl className="mt-12 divide-y divide-border border-y border-border">
                {FACTS.map((fact) => (
                  <div key={fact.labelKey} className="grid grid-cols-3 gap-4 py-4">
                    <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                      {t(fact.labelKey)}
                    </dt>
                    <dd className="col-span-2 text-sm text-foreground">{t(fact.valueKey)}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* ---- Working principles ---- */}
          <div className="lg:col-span-5">
            <Reveal>
              <h3 className="eyebrow mb-8">{t('about.values.title')}</h3>
            </Reveal>

            <ol className="space-y-px overflow-hidden rounded-lg border border-border bg-border">
              {VALUES.map((value, index) => (
                <Reveal as="li" key={value.titleKey} delay={0.06 * index}>
                  <div className="group bg-background p-6 transition-colors duration-300 hover:bg-surface">
                    <div className="flex items-baseline gap-3">
                      <span className="tabular font-mono text-[11px] text-accent">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <h4 className="text-base font-semibold text-foreground">
                        {t(value.titleKey)}
                      </h4>
                    </div>
                    <p className="mt-2 pl-8 text-sm leading-relaxed text-muted-foreground">
                      {t(value.bodyKey)}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

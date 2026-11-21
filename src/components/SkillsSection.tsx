import { useMemo, useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { SectionHeader } from '@/components/common/SectionHeader';
import { SKILL_ELEMENTS, SKILL_FAMILIES, usedIn, type SkillFamily } from '@/data/content';
import { useInView } from '@/lib/hooks';
import { TechLogo } from '@/components/TechLogo';

type Filter = 'all' | SkillFamily;

/** Diagonal wave: each tile waits (row + col) × 40 ms. */
const waveDelay = (index: number, columns: number) =>
  `${(Math.floor(index / columns) + (index % columns)) * 40}ms`;

/** One accent colour per family: filter dots, tile labels, inspector chip. */
const FAMILY_COLOR: Record<SkillFamily, string> = {
  languages: '#7c3aed',
  mobile: '#2563eb',
  backend: '#059669',
  data: '#d97706',
  ai: '#db2777',
  tools: '#475569',
};

export const SkillsSection = () => {
  const { t, language } = useLanguage();
  const gridRef = useRef<HTMLDivElement>(null);
  const gridIn = useInView(gridRef, { threshold: 0.2 });

  const [filter, setFilter] = useState<Filter>('all');
  const [activeIndex, setActiveIndex] = useState(0);

  const active = SKILL_ELEMENTS[activeIndex];
  const familyTitle = (family: SkillFamily) =>
    t(SKILL_FAMILIES.find((f) => f.id === family)!.titleKey);
  const places = useMemo(() => usedIn(active, language), [active, language]);

  return (
    <section id="expertise" className="section">
      <div className="wrap">
        <SectionHeader
          index="02"
          tag={t('skills.tag')}
          title={t('skills.title')}
          accent={t('skills.titleAccent')}
          lead={t('skills.lead')}
        />

        {/* ---- Family chips: colour dot + count ---- */}
        <div role="group" aria-label={t('skills.filters')} className="rv mb-8 flex flex-wrap gap-2">
          {(['all', ...SKILL_FAMILIES.map((f) => f.id)] as Filter[]).map((id) => {
            const count =
              id === 'all' ? SKILL_ELEMENTS.length : SKILL_ELEMENTS.filter((element) => element.family === id).length;
            return (
              <button
                key={id}
                type="button"
                aria-pressed={filter === id}
                onClick={() => setFilter(id)}
                className={`skill-filter ${filter === id ? 'is-on' : ''}`}
                style={{ '--fam': id === 'all' ? 'hsl(var(--foreground))' : FAMILY_COLOR[id] } as React.CSSProperties}
              >
                {id !== 'all' && <span className="skill-filter-dot" aria-hidden="true" />}
                {id === 'all' ? t('skills.filter.all') : familyTitle(id)}
                <span className="skill-filter-count tabular">{count}</span>
              </button>
            );
          })}
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-10">
          {/* ---- Table ---- */}
          <div ref={gridRef} className={`ptable ${gridIn ? 'is-in' : ''}`}>
            {SKILL_ELEMENTS.map((element, index) => {
              const dim = filter !== 'all' && element.family !== filter;
              return (
                <button
                  key={element.symbol}
                  type="button"
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`${element.name} — ${familyTitle(element.family)}`}
                  className={`ptile ${activeIndex === index ? 'is-active' : ''} ${dim ? 'is-dim' : ''}`}
                  style={
                    {
                      '--d-sm': waveDelay(index, 4),
                      '--d-lg': waveDelay(index, 8),
                      '--glow': `${element.color}40`,
                      '--brand': element.color,
                      '--fam': FAMILY_COLOR[element.family],
                    } as React.CSSProperties
                  }
                >
                  <span className="flex items-center justify-between">
                    <span className="ptile-meta tabular">{String(index + 1).padStart(2, '0')}</span>
                    <span className="ptile-meta font-semibold normal-case">{element.symbol}</span>
                  </span>
                  <span className="ptile-logo">
                    <TechLogo element={element} size={26} />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-[12px] font-semibold leading-tight tracking-[-0.01em]">
                      {element.name}
                    </span>
                    <span className="ptile-family mt-1">
                      <span className="ptile-family-dot" aria-hidden="true" />
                      <span className="truncate">{familyTitle(element.family)}</span>
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* ---- Inspector ---- */}
          <aside className="lg:sticky lg:top-28 lg:self-start" aria-label={t('skills.inspector.label')}>
            <div
              className="skill-inspector"
              aria-live="polite"
              style={
                {
                  '--brand': active.color,
                  '--glow': `${active.color}40`,
                  '--fam': FAMILY_COLOR[active.family],
                } as React.CSSProperties
              }
            >
              <div className="skill-inspector-head">
                <span className="skill-inspector-num tabular">
                  {String(activeIndex + 1).padStart(2, '0')} · {active.symbol}
                </span>
                <div key={active.symbol} className="inspector-logo">
                  <TechLogo element={active} size={64} />
                </div>
              </div>
              <div className="p-7 pt-6">
                <p className="text-[26px] font-bold leading-tight tracking-[-0.035em]">{active.name}</p>
                <span className="skill-inspector-fam mt-2.5">
                  <span className="skill-filter-dot" aria-hidden="true" />
                  {familyTitle(active.family)}
                </span>

                <div className="mt-6 border-t border-border pt-5">
                  <p className="eyebrow">{t('skills.inspector.usedIn')}</p>
                  {places.length ? (
                    <ul className="mt-3 flex flex-wrap gap-1.5">
                      {places.map((place) => (
                        <li key={place} className="chip normal-case tracking-normal">
                          {place}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t('skills.inspector.none')}</p>
                  )}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

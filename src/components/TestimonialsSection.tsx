import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { SectionHeader } from '@/components/common/SectionHeader';
import { TESTIMONIALS } from '@/data/content';

/**
 * Real recommendations only. While TESTIMONIALS is empty the section renders
 * nothing at all, so the page never shows an empty or placeholder block.
 */
export const TestimonialsSection = () => {
  const { t, language } = useLanguage();
  if (TESTIMONIALS.length === 0) return null;

  return (
    <section id="recommandations" className="section">
      <div className="wrap">
        <SectionHeader
          index="—"
          tag={t('testimonials.tag')}
          title={t('testimonials.title')}
          accent={t('testimonials.titleAccent')}
        />
        <ul className="grid gap-4 md:grid-cols-2">
          {TESTIMONIALS.map((item, index) => (
            <li key={item.id} className="rv card-p flex flex-col p-8" style={{ '--i': index } as React.CSSProperties}>
              <blockquote className="flex-1 font-serif text-[clamp(1.35rem,1.1rem+0.8vw,1.8rem)] italic leading-[1.25]">
                “{item.quote[language]}”
              </blockquote>
              <div className="mt-8 flex items-center justify-between gap-4 border-t border-border pt-5">
                <div>
                  <p className="text-[15px] font-bold">{item.name}</p>
                  <p className="text-[13.5px] text-muted-foreground">
                    {item.role[language]} · {item.company}
                  </p>
                </div>
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`LinkedIn — ${item.name}`}
                    className="btn-icon !h-10 !w-10"
                  >
                    <ArrowUpRight size={16} />
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

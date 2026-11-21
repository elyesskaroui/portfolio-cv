import { AnimatedTitle } from '@/components/common/AnimatedLetters';

interface SectionHeaderProps {
  /** Two-digit section number, e.g. "03". */
  index: string;
  tag: string;
  title: string;
  /** The single word set in the italic serif. */
  accent: string;
  lead?: string;
  className?: string;
}

/**
 * "03 — Selected work", then a heading whose last word is an italic serif in
 * the muted grey. Identical on every section so the page reads as one surface.
 */
export const SectionHeader = ({ index, tag, title, accent, lead, className = '' }: SectionHeaderProps) => (
  <header className={`mb-14 grid gap-8 md:mb-20 lg:grid-cols-12 lg:items-end ${className}`}>
    <div className="lg:col-span-8">
      <p className="section-tag rv">
        <span className="tabular">{index}</span> — {tag}
      </p>
      <h2 className="title-section mt-6">
        <AnimatedTitle title={title} accent={accent} />
      </h2>
    </div>
    {lead && (
      <p className="rv max-w-md text-[15px] leading-relaxed text-muted-foreground lg:col-span-4 lg:justify-self-end" style={{ '--i': 2 } as React.CSSProperties}>
        {lead}
      </p>
    )}
  </header>
);

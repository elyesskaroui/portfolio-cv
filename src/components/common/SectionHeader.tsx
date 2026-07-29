import { Reveal } from './Reveal';

interface SectionHeaderProps {
  /** Two-digit section number, e.g. "02" — the Swiss numbering device. */
  index: string;
  eyebrow: string;
  title: string;
  lead?: string;
}

/**
 * Editorial section header: a full-bleed rule, a numbered mono eyebrow, then
 * the title on the left with the standfirst set in the right column. Identical
 * on every section so the page reads as one document.
 */
export const SectionHeader = ({ index, eyebrow, title, lead }: SectionHeaderProps) => (
  <header className="mb-16 md:mb-20">
    <Reveal>
      <div className="rule mb-8" />
      <p className="eyebrow">
        <span className="tabular text-accent">{index}</span>
        <span aria-hidden="true" className="text-border-strong">
          /
        </span>
        {eyebrow}
      </p>
    </Reveal>

    <div className="mt-6 grid gap-8 md:grid-cols-12 md:items-end md:gap-12">
      <Reveal delay={0.05} className="md:col-span-7">
        <h2 className="text-display-md font-semibold text-foreground">{title}</h2>
      </Reveal>

      {lead && (
        <Reveal delay={0.12} className="md:col-span-5">
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
            {lead}
          </p>
        </Reveal>
      )}
    </div>
  </header>
);

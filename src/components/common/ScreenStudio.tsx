import { BellRing, CalendarDays, Radio, ShieldCheck, Sparkles, TrendingUp, type LucideIcon } from 'lucide-react';
import type { Studio, StudioIcon } from '@/data/caseStudy';

const TAG_ICONS: Record<StudioIcon, LucideIcon> = {
  shield: ShieldCheck,
  sparkles: Sparkles,
  radio: Radio,
  chart: TrendingUp,
  bell: BellRing,
  calendar: CalendarDays,
};

/**
 * Product "ad" stage: three cut-out phone renders (white background, blended
 * with multiply) on a light studio backdrop with the product's colour glow,
 * its wordmark behind, and floating feature badges. `children` sits at the
 * bottom (the "watch the demo" button).
 */
export const ScreenStudio = ({
  studio,
  eager = false,
  children,
}: {
  studio: Studio;
  eager?: boolean;
  children?: React.ReactNode;
}) => (
  <div
    className="studio"
    data-variant={studio.variant}
    style={{ '--tone': studio.tone } as React.CSSProperties}
  >
    <span className="studio-floor" aria-hidden="true" />

    {studio.shots.map((shot, index) => (
      <figure key={shot.src} className={`studio-shot studio-shot--${index}`}>
        <img
          src={shot.src}
          alt={shot.caption}
          width={332}
          height={592}
          loading={eager && index === 1 ? 'eager' : 'lazy'}
        />
      </figure>
    ))}

    {studio.tags.map((tag, index) => {
      const Icon = TAG_ICONS[tag.icon];
      return (
        <span key={tag.label} className={`studio-tag studio-tag--${index}`}>
          <span className="studio-tag-icon" aria-hidden="true">
            <Icon size={13} strokeWidth={2.4} />
          </span>
          {tag.label}
        </span>
      );
    })}

    {children}
  </div>
);

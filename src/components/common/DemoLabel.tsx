/** YouTube-style play mark (red rounded rectangle, white triangle). */
export const YoutubeMark = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 28 20" className={className} aria-hidden="true" focusable="false">
    <rect width="28" height="20" rx="6" fill="#FF0033" />
    <path d="M11.3 6.1v7.8l6.8-3.9z" fill="#fff" />
  </svg>
);

/**
 * Content of the "watch the demo" pill: YouTube mark, title, and a small
 * "real demo" line with a live dot. Used inside `.case-fan-play` /
 * `.case-demo-play`.
 */
export const DemoLabel = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <>
    <span className="demo-yt" aria-hidden="true">
      <YoutubeMark className="demo-yt-mark" />
    </span>
    <span className="text-left">
      <span className="demo-title">{title}</span>
      <span className="demo-sub">
        <span className="demo-dot" aria-hidden="true" />
        {subtitle}
      </span>
    </span>
    <span className="demo-arrow" aria-hidden="true">
      <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3.5 8h9M8.5 4l4 4-4 4" />
      </svg>
    </span>
  </>
);

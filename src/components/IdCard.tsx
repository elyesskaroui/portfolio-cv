import { useEffect, useRef, useState } from 'react';
import { RotateCw } from 'lucide-react';
import profileImage from '@/assets/elyess.webp';
import { useLanguage } from '@/contexts/LanguageContext';
import type { TranslationKey } from '@/i18n/translations';
import { PROFILE } from '@/data/content';
import { prefersReducedMotion } from '@/lib/hooks';

const BACK_LINES: TranslationKey[] = ['card.back.1', 'card.back.2', 'card.back.3', 'card.back.4', 'card.back.5'];

/**
 * A badge hanging from a lanyard.
 * - Damped pendulum: pointer velocity over the section kicks the angle, a
 *   spring pulls it back, and a faint idle sway keeps it alive when still.
 * - Flips on hover (mouse), on tap (touch) and via the button (keyboard).
 */
export const IdCard = ({ areaRef }: { areaRef: React.RefObject<HTMLElement> }) => {
  const { t } = useLanguage();
  const hangerRef = useRef<HTMLDivElement>(null);
  const [flipped, setFlipped] = useState(false);
  const pointerTypeRef = useRef('');

  useEffect(() => {
    const hanger = hangerRef.current;
    const area = areaRef.current;
    if (!hanger || !area || prefersReducedMotion()) return;

    let angle = 0;
    let velocity = 0;
    let lastX: number | null = null;
    let lastT = 0;
    let lastMove = 0;
    let frame = 0;
    let running = false;

    const onMove = (event: PointerEvent) => {
      const now = performance.now();
      if (lastX !== null && now - lastT < 100) {
        const vx = (event.clientX - lastX) / Math.max(now - lastT, 1); // px per ms
        velocity += Math.max(-1.2, Math.min(1.2, vx * 0.45));
      }
      lastX = event.clientX;
      lastT = now;
      lastMove = now;
    };

    const tick = (now: number) => {
      const idle = now - lastMove > 1500;
      const target = idle ? Math.sin(now / 1100) * 1.6 : 0;
      velocity += -(angle - target) * 0.018; // spring
      velocity *= 0.94; // damping
      angle = Math.max(-16, Math.min(16, angle + velocity));
      hanger.style.transform = `rotate(${angle.toFixed(3)}deg)`;
      frame = requestAnimationFrame(tick);
    };

    // Only animate while the section is on screen.
    const visibility = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !running) {
        running = true;
        frame = requestAnimationFrame(tick);
      } else if (!entry.isIntersecting && running) {
        running = false;
        cancelAnimationFrame(frame);
      }
    });
    visibility.observe(area);
    area.addEventListener('pointermove', onMove);

    return () => {
      visibility.disconnect();
      area.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(frame);
    };
  }, [areaRef]);

  const strapText = `${PROFILE.name} · ${t('card.role')} · `;

  return (
    <div className="flex flex-col items-center">
      <div ref={hangerRef} className="lanyard">
        <div className="lanyard-strap" aria-hidden="true">
          <div className="lanyard-strap-track">
            {[0, 1, 2, 3].map((n) => (
              <span key={n}>{strapText}</span>
            ))}
          </div>
        </div>
        <div className="lanyard-clip" aria-hidden="true" />

        <div
          className="idcard-scene"
          onPointerEnter={(e) => e.pointerType === 'mouse' && setFlipped(true)}
          onPointerLeave={(e) => e.pointerType === 'mouse' && setFlipped(false)}
          onPointerDown={(e) => (pointerTypeRef.current = e.pointerType)}
          onClick={() => {
            // Touch / pen tap toggles; mouse already flips on hover.
            if (pointerTypeRef.current !== 'mouse') setFlipped((f) => !f);
          }}
        >
          <div className={`idcard ${flipped ? 'is-flipped' : ''}`}>
            {/* ---- Front ---- */}
            <div className="idcard-face flex flex-col" aria-hidden={flipped}>
              <div className="idcard-slot" />
              <div className="flex items-center justify-between bg-foreground px-5 pb-3 pt-7 text-background">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em]">{t('card.band')}</span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em]">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  </span>
                  {t('card.available')}
                </span>
              </div>

              <div className="flex flex-1 flex-col items-center px-5 pt-5">
                <div className="idcard-photo">
                  <div className="idcard-photo-inner">
                    <img src={profileImage} alt={t('hero.portrait.alt')} width={463} height={572} loading="lazy" />
                  </div>
                </div>

                <p className="mt-4 text-[19px] font-bold leading-none tracking-[-0.03em]">{PROFILE.name}</p>
                <p className="mt-1.5 text-[12.5px] text-ink-2">{t('card.role')}</p>
                <p className="mt-0.5 font-mono text-[9.5px] uppercase tracking-[0.14em] text-muted-foreground">
                  {t('card.location')}
                </p>

                <dl className="mt-3 w-full space-y-1 font-mono text-[10px] uppercase tracking-[0.1em]">
                  {(
                    [
                      ['card.idNo', `${PROFILE.initials}-${PROFILE.graduation}`],
                      ['card.dept', t('card.dept.value')],
                      ['card.class', PROFILE.graduation],
                    ] as [TranslationKey, string][]
                  ).map(([label, value]) => (
                    <div key={label} className="flex justify-between border-b border-dashed border-border pb-1">
                      <dt className="text-muted-foreground">{t(label)}</dt>
                      <dd>{value}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-auto flex w-full items-end justify-between gap-4 pb-5">
                  <div className="barcode flex-1" />
                  <div className="holo" />
                </div>
              </div>
            </div>

            {/* ---- Back ---- */}
            <div className="idcard-face idcard-back flex flex-col px-6 pb-6 pt-9" aria-hidden={!flipped}>
              <div className="idcard-slot" />
              <p className="eyebrow">{t('card.back.title')}</p>
              <ul className="mt-4 space-y-2.5">
                {BACK_LINES.map((key, index) => (
                  <li key={key} className="flex gap-3 text-[13px] leading-snug">
                    <span className="tabular pt-px font-mono text-[10px] text-muted-foreground">0{index + 1}</span>
                    {t(key)}
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex items-end gap-4">
                <div className="min-w-0 flex-1">
                  <p className="font-serif text-[30px] italic leading-none">{PROFILE.firstName}</p>
                  <div className="mt-2 h-px bg-foreground/80" />
                  <p className="mt-2.5 font-mono text-[8.5px] uppercase leading-relaxed tracking-[0.1em] text-muted-foreground">
                    {t('card.back.found')}
                    <br />
                    <span className="normal-case tracking-normal">{PROFILE.email}</span>
                  </p>
                </div>
                {/* A real, scannable code: opens the LinkedIn profile */}
                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={flipped ? 0 : -1}
                  onClick={(event) => event.stopPropagation()}
                  className="flex-none text-center"
                >
                  {/* White quiet zone around the code (not rounded) so phone
                      cameras can lock on to the three finder squares. */}
                  <span className="block rounded-lg bg-white p-2 shadow-[inset_0_0_0_1px_var(--line-alpha)]">
                    <img
                      src="/qr-linkedin.svg"
                      alt={t('card.qr.alt')}
                      width={66}
                      height={66}
                      className="block h-[66px] w-[66px]"
                    />
                  </span>
                  <span className="mt-1 block font-mono text-[8px] uppercase tracking-[0.1em] text-muted-foreground">
                    {t('card.qr')}
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        aria-pressed={flipped}
        className="mt-10 inline-flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground"
      >
        <RotateCw size={12} aria-hidden="true" />
        <span className="sr-only">{t('card.flip')}</span>
        <span aria-hidden="true">{t('card.hint')}</span>
      </button>
    </div>
  );
};

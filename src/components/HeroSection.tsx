import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import profileImage from '@/assets/elyess.webp';
import { useLanguage } from '@/contexts/LanguageContext';
import { HERO_CAPTIONS, HERO_VIDEO, PROFILE } from '@/data/content';
import { ResumeDialog } from '@/components/common/ResumeDialog';
import { prefersReducedMotion } from '@/lib/hooks';

const stagger = (i: number) => ({ '--i': i }) as React.CSSProperties;

/* Each letter of the big name gets its index (--l), so the CSS can rise them
   in one by one (E → S) and then run a soft light wave across them. */
const ghostLetters = (text: string, offset: number) =>
  [...text].map((char, i) => (
    <span key={i} className="ghost-letter" style={{ '--l': offset + i } as React.CSSProperties}>
      {char}
    </span>
  ));

/* ---------------------------------------------------------------------------
   Live silhouette of the avatar, painted in white between the big name and
   the video. The clip has a pure white background and is blended with
   multiply, so without it the name would show through the white shirt.
   Each frame is sampled on a grid; the background is flood-filled from the
   borders (near-white pixels connected to the edge), everything else is the
   body. Short holes (shirt highlights touching the background) are closed
   along rows and columns. No outward padding, so there is no halo.
   The avatar's horizontal centre (from the head) is published as
   --avatar-x on .hero-media so the name splits exactly behind him.
   ------------------------------------------------------------------------ */
/** Every browser on iPhone / iPad is WebKit (iPadOS reports itself as a Mac). */
const isIOS = () =>
  typeof navigator !== 'undefined' &&
  (/iP(hone|ad|od)/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1));

const OCC_W = 192;
const OCC_H = 240;
const BG_LUMA = 250;
const MAX_GAP = 5;

const useOccluder = (
  videoRef: React.RefObject<HTMLVideoElement>,
  canvasRef: React.RefObject<HTMLCanvasElement>,
) => {
  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    // iOS shows the clip without the blend (see index.css): no silhouette needed.
    if (!video || !canvas || isIOS()) return;
    const sample = document.createElement('canvas');
    sample.width = OCC_W;
    sample.height = OCC_H;
    const sctx = sample.getContext('2d', { willReadFrequently: true });
    const ctx = canvas.getContext('2d');
    if (!sctx || !ctx) return;
    const out = ctx.createImageData(OCC_W, OCC_H);
    const N = OCC_W * OCC_H;
    const light = new Uint8Array(N);
    const body = new Uint8Array(N);
    const queue = new Int32Array(N);
    let centred = false;

    // Fill background runs no longer than MAX_GAP that sit between body cells.
    const closeGaps = (start: number, step: number, count: number) => {
      let last = -1;
      for (let k = 0; k < count; k++) {
        const i = start + k * step;
        if (!body[i]) continue;
        if (last !== -1 && k - last > 1 && k - last - 1 <= MAX_GAP) {
          for (let j = last + 1; j < k; j++) body[start + j * step] = 2;
        }
        last = k;
      }
    };

    const draw = () => {
      if (video.readyState < 2) return;
      sctx.drawImage(video, 0, 0, OCC_W, OCC_H);
      const px = sctx.getImageData(0, 0, OCC_W, OCC_H).data;
      for (let i = 0; i < N; i++) {
        light[i] = px[i * 4] + px[i * 4 + 1] + px[i * 4 + 2] >= BG_LUMA * 3 ? 1 : 0;
        body[i] = 1;
      }
      // Flood the background from the frame border.
      let head = 0;
      let tail = 0;
      const push = (i: number) => {
        if (light[i] && body[i]) {
          body[i] = 0;
          queue[tail++] = i;
        }
      };
      for (let x = 0; x < OCC_W; x++) {
        push(x);
        push(N - OCC_W + x);
      }
      for (let y = 0; y < OCC_H; y++) {
        push(y * OCC_W);
        push(y * OCC_W + OCC_W - 1);
      }
      while (head < tail) {
        const i = queue[head++];
        const x = i % OCC_W;
        if (x > 0) push(i - 1);
        if (x < OCC_W - 1) push(i + 1);
        if (i >= OCC_W) push(i - OCC_W);
        if (i < N - OCC_W) push(i + OCC_W);
      }
      for (let y = 0; y < OCC_H; y++) closeGaps(y * OCC_W, 1, OCC_W);
      for (let x = 0; x < OCC_W; x++) closeGaps(x, OCC_W, OCC_H);

      const d = out.data;
      for (let i = 0; i < N; i++) {
        const a = body[i] ? 255 : 0;
        d[i * 4] = d[i * 4 + 1] = d[i * 4 + 2] = 255;
        d[i * 4 + 3] = a;
      }
      ctx.putImageData(out, 0, 0);


      // Once: centre of the head (first rows of the body) → --avatar-x.
      if (!centred) {
        let sum = 0;
        let rows = 0;
        for (let y = 0; y < OCC_H && rows < 24; y++) {
          let left = -1;
          let right = -1;
          for (let x = 0; x < OCC_W; x++) {
            if (body[y * OCC_W + x]) {
              if (left === -1) left = x;
              right = x;
            }
          }
          if (left === -1) continue;
          sum += (left + right + 1) / 2;
          rows++;
        }
        if (rows) {
          centred = true;
          canvas.parentElement?.style.setProperty('--avatar-x', `${((sum / rows / OCC_W) * 100).toFixed(2)}%`);
        }
      }
    };

    let raf = 0;
    let vfc = 0;
    const rvfc = (video as HTMLVideoElement & {
      requestVideoFrameCallback?: (cb: () => void) => number;
      cancelVideoFrameCallback?: (id: number) => void;
    });
    const loop = () => {
      draw();
      if (rvfc.requestVideoFrameCallback) vfc = rvfc.requestVideoFrameCallback(loop);
      else raf = requestAnimationFrame(loop);
    };
    video.addEventListener('loadeddata', draw);
    video.addEventListener('seeked', draw);
    loop();
    return () => {
      video.removeEventListener('loadeddata', draw);
      video.removeEventListener('seeked', draw);
      cancelAnimationFrame(raf);
      if (vfc) rvfc.cancelVideoFrameCallback?.(vfc);
    };
  }, [videoRef, canvasRef]);
};

/* ---------------------------------------------------------------------------
   Talking intro video.
   - Tries to start WITH sound. Browsers block unmuted autoplay until the
     visitor interacts with the page, so when that happens it plays muted and
     the voice switches on (from the start of the sentence) at the visitor's
     first click, tap or key press anywhere on the page.
   - Pauses as soon as less than 35 % of the hero is visible, resumes on return.
   - One round ink button toggles the sound (▶ off / ❚❚ on); a soft ping ring
     shows while the browser is still holding the sound back.
   ------------------------------------------------------------------------ */
const HeroVideoPlayer = ({ sectionRef }: { sectionRef: React.RefObject<HTMLElement> }) => {
  const { t, language } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [soundOn, setSoundOn] = useState(false);
  const [touched, setTouched] = useState(false);
  const visibleRef = useRef(true);
  const [caption, setCaption] = useState(-1);
  const occluderRef = useRef<HTMLCanvasElement>(null);
  useOccluder(videoRef, occluderRef);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    const unlockEvents = ['pointerdown', 'keydown', 'touchend'] as const;
    const removeUnlock = () => unlockEvents.forEach((type) => window.removeEventListener(type, unlock));

    // First interaction anywhere on the page: turn the voice on and restart
    // the sentence. Clicks on the sound button are left to its own handler.
    function unlock(event: Event) {
      if (!video) return;
      removeUnlock();
      if (buttonRef.current?.contains(event.target as Node)) return;
      video.muted = false;
      video.currentTime = 0;
      if (visibleRef.current) video.play().catch(() => undefined);
      setSoundOn(true);
      setTouched(true);
    }

    if (!prefersReducedMotion() && isIOS()) {
      // iOS in-app browsers (Messenger, Instagram…) may report unmuted
      // autoplay as successful while staying silent. Start muted and let the
      // first tap switch the voice on, which iOS always honours.
      video.muted = true;
      video.play().catch(() => undefined);
      unlockEvents.forEach((type) => window.addEventListener(type, unlock));
    } else if (!prefersReducedMotion()) {
      video.muted = false;
      video
        .play()
        .then(() => {
          setSoundOn(true);
          setTouched(true);
        })
        .catch(() => {
          // Autoplay with sound refused: play muted, wait for an interaction.
          video.muted = true;
          video.play().catch(() => undefined);
          unlockEvents.forEach((type) => window.addEventListener(type, unlock));
        });
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.intersectionRatio >= 0.35;
        if (!visibleRef.current) video.pause();
        else if (!prefersReducedMotion() || !video.muted) video.play().catch(() => undefined);
      },
      { threshold: [0, 0.35, 0.6, 1] },
    );
    observer.observe(section);
    return () => {
      observer.disconnect();
      removeUnlock();
    };
  }, [sectionRef]);

  const toggleSound = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    setTouched(true);
    if (video.muted) {
      video.muted = false;
      video.currentTime = 0;
      video.play().catch(() => {
        video.muted = true;
        setSoundOn(false);
      });
      setSoundOn(true);
    } else {
      video.muted = true;
      setSoundOn(false);
    }
  }, []);

  // ?debug in the URL: live readout of the clip's state, to diagnose phones.
  const [debug, setDebug] = useState('');
  useEffect(() => {
    if (!/[?&]debug/.test(window.location.search)) return;
    const id = window.setInterval(() => {
      const v = videoRef.current;
      if (!v) return;
      const r = v.getBoundingClientRect();
      const cs = getComputedStyle(v);
      const stage = v.parentElement?.getBoundingClientRect();
      setDebug(
        [
          `build ${__BUILD__}`,
          `ios ${isIOS()} · css-ios ${CSS.supports('-webkit-touch-callout', 'none')}`,
          `ready ${v.readyState} · net ${v.networkState} · err ${v.error?.code ?? '-'}`,
          `paused ${v.paused} · muted ${v.muted} · t ${v.currentTime.toFixed(1)}`,
          `src ${v.currentSrc.split('/').pop() || '-'} · ${v.videoWidth}x${v.videoHeight}`,
          `video ${Math.round(r.x)},${Math.round(r.y)} ${Math.round(r.width)}x${Math.round(r.height)}`,
          `stage ${stage ? `${Math.round(stage.width)}x${Math.round(stage.height)}` : '-'}`,
          `opacity ${cs.opacity} · vis ${cs.visibility} · blend ${cs.mixBlendMode} · disp ${cs.display}`,
          navigator.userAgent.slice(0, 120),
        ].join('\n'),
      );
    }, 500);
    return () => window.clearInterval(id);
  }, []);

  if (!HERO_VIDEO) return null;

  return (
    <>
      {debug && (
        <pre className="fixed inset-x-2 bottom-2 z-[200] whitespace-pre-wrap rounded-xl bg-black/85 p-3 font-mono text-[10px] leading-snug text-white">
          {debug}
        </pre>
      )}
      <canvas ref={occluderRef} width={OCC_W} height={OCC_H} className="hero-occluder" aria-hidden="true" />
      {/* Dark theme only: a paper-coloured arch the clip is multiplied onto. */}
      <div className="hero-stage">
      {/* iOS fallback: if WebKit fails to paint the clip, the still frame
          underneath keeps the avatar on screen (hidden elsewhere by CSS). */}
      {HERO_VIDEO.poster && <img src={HERO_VIDEO.poster} alt="" aria-hidden="true" className="hero-still" />}
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="auto"
        poster={HERO_VIDEO.poster}
        aria-label={t('hero.video.label')}
        onTimeUpdate={(event) => {
          const time = event.currentTarget.currentTime;
          setCaption(HERO_CAPTIONS.findIndex((cue) => time >= cue.start && time < cue.end));
        }}
      >
        {/* H.264 MP4 first: every browser plays it. iOS claims WebM support,
            picks the VP9 file, then fails to decode it and never falls back,
            which left the hero blank and silent on iPhones. */}
        <source src={HERO_VIDEO.mp4} type="video/mp4" />
        {HERO_VIDEO.webm && <source src={HERO_VIDEO.webm} type="video/webm" />}
      </video>
      </div>

      {/* Burned-in style captions: most visitors watch muted. The full line is
          also exposed to screen readers once, not cue by cue. */}
      <p className="sr-only">{HERO_CAPTIONS.map((cue) => cue.text[language]).join(' ')}</p>
      {/* One control bar under the feet: sound button + caption pill. The pill
          has a fixed width so the button never moves when the text changes. */}
      <div className="hero-caption-wrap absolute inset-x-0 top-full mt-2 z-[3] flex items-center justify-center gap-2">
      <button
        ref={buttonRef}
        type="button"
        onClick={toggleSound}
        aria-pressed={soundOn}
        aria-label={soundOn ? t('hero.sound.off') : t('hero.sound.on')}
        className={`btn-icon relative shrink-0 ${!touched ? 'sound-ping' : ''}`}
      >
        {soundOn ? (
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
            <rect x="2" y="1" width="3.5" height="12" rx="1" fill="currentColor" />
            <rect x="8.5" y="1" width="3.5" height="12" rx="1" fill="currentColor" />
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
            <path d="M3 1.5v11a.6.6 0 0 0 .9.5l9-5.5a.6.6 0 0 0 0-1l-9-5.5a.6.6 0 0 0-.9.5Z" fill="currentColor" />
          </svg>
        )}
      </button>
        <p aria-hidden="true" className={`hero-caption pointer-events-none ${caption === -1 ? 'is-empty' : ''}`}>
          {caption !== -1 && (
            <span key={caption} className="hero-caption-text">
              {HERO_CAPTIONS[caption].text[language]}
            </span>
          )}
        </p>
      </div>
    </>
  );
};

export const HeroSection = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      id="accueil"
      ref={sectionRef}
      className="relative flex min-h-[100svh] flex-col overflow-hidden pb-10 pt-[96px]"
    >
      <div className="wrap relative flex flex-1 flex-col">
        <div className="grid flex-1 grid-cols-[minmax(0,1fr)] items-end gap-8 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:gap-10">
          {/* ---- Left: status + heading ---- */}
          <div className="order-2 min-w-0 lg:order-1 lg:pb-16">
            <p className="hero-in inline-flex items-center gap-2.5 rounded-full bg-card px-3.5 py-2 shadow-[inset_0_0_0_1px_var(--line-alpha)]" style={stagger(1)}>
              <span className="relative flex h-2 w-2">
                {/* "Online" green dot with a pulsing halo. */}
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22c55e] opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#16a34a] shadow-[0_0_6px_rgba(34,197,94,0.7)]" />
              </span>
              <span className="whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.1em] text-ink-2">
                {t('hero.status')}
              </span>
            </p>

            <h1 className="mt-7 text-[clamp(2.6rem,1.4rem+4.2vw,5.4rem)] font-bold leading-[0.95] tracking-[-0.05em]">
              <span className="hero-in block" style={stagger(2)}>
                {t('hero.title')}{' '}
              </span>
              <span className="hero-in serif-accent block" style={stagger(3)}>
                {t('hero.titleAccent')}
              </span>
            </h1>
          </div>

          {/* ---- Centre: the person ---- */}
          <div className="relative order-1 flex min-w-0 justify-center lg:order-2">
            <div className="hero-in hero-blend relative flex w-full justify-center lg:w-auto" style={stagger(1)}>
            <div className="hero-media">
              {/* Split in two halves so the seam (between Y and E) sits exactly
                  on the avatar's centre, whatever the letter widths. */}
              <span className="hero-ghost" aria-hidden="true">
                {(() => {
                  const name = PROFILE.firstName.toUpperCase();
                  const half = Math.ceil(name.length / 2);
                  return (
                    <>
                      <span className="hero-ghost-l">{ghostLetters(name.slice(0, half), 0)}</span>
                      <span className="hero-ghost-r">{ghostLetters(name.slice(half), half)}</span>
                    </>
                  );
                })()}
              </span>
              {HERO_VIDEO ? (
                <HeroVideoPlayer sectionRef={sectionRef} />
              ) : (
                <figure className="hero-portrait">
                  <img
                    src={profileImage}
                    alt={t('hero.portrait.alt')}
                    width={463}
                    height={572}
                    fetchPriority="high"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/55 to-transparent px-6 pb-5 pt-16 font-mono text-[10.5px] uppercase tracking-[0.16em] text-white/90">
                    <span>{PROFILE.name}</span>
                    <span>{t('hero.location')}</span>
                  </figcaption>
                </figure>
              )}
            </div>
            </div>
          </div>

          {/* ---- Right: pitch + actions ---- */}
          <div className="order-3 min-w-0 max-w-sm lg:ml-auto lg:pb-16">
            <p className="hero-in text-[15.5px] leading-relaxed text-muted-foreground" style={stagger(4)}>
              {t('hero.description')}
            </p>
            <div className="hero-in mt-7 flex flex-wrap gap-2.5" style={stagger(5)}>
              <a href="#projets" className="btn-primary">
                {t('hero.cta.work')}
                <ArrowUpRight size={15} />
              </a>
              <a href="#contact" className="btn-secondary">
                {t('hero.cta.talk')}
              </a>
            </div>
            {/* The CV is a quiet text link under the two buttons, so no button
                is ever left alone on its own line. */}
            <ResumeDialog>
              <button
                type="button"
                className="hero-in link-underline mt-5 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-2 hover:text-foreground"
                style={stagger(6)}
              >
                <ArrowDown size={13} aria-hidden="true" />
                {t('hero.cta.resumeLink')}
              </button>
            </ResumeDialog>
          </div>
        </div>

        {/* Room for the video control bar that hangs under the avatar. */}
        <div className="h-14 lg:h-16" aria-hidden="true" />
      </div>
    </section>
  );
};

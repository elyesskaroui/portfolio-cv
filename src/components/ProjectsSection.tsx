import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Boxes, Cctv, Droplets, Github, type LucideIcon } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { SectionHeader } from '@/components/common/SectionHeader';
import { VideoDialog } from '@/components/common/VideoDialog';
import { ScreenStudio } from '@/components/common/ScreenStudio';
import { DemoLabel, YoutubeMark } from '@/components/common/DemoLabel';
import { getProjects, posterFor, type Project } from '@/data/content';
import { fanScreens, getCaseStudyByPath } from '@/data/caseStudy';

const num = (index: number) => String(index + 1).padStart(2, '0');

/** Icon on the ink header of each "other project" card. */
const OTHER_ICONS: Record<string, LucideIcon> = {
  'smart-surveillance': Cctv,
  'blood-transfusion': Droplets,
};
const delay = (i: number) => ({ '--i': i }) as React.CSSProperties;

/* ---- Shared pieces ------------------------------------------------------- */

const Stack = ({ items, label }: { items: string[]; label: string }) => (
  <ul className="flex flex-wrap gap-1.5" aria-label={label}>
    {items.map((tech) => (
      <li key={tech} className="chip">
        {tech}
      </li>
    ))}
  </ul>
);

const Actions = ({ project, onWatch }: { project: Project; onWatch: () => void }) => {
  const { t } = useLanguage();
  return (
    <div className="flex flex-wrap gap-2.5">
      {project.caseStudy && (
        <Link to={project.caseStudy} className="btn-primary">
          {t('work.caseStudy')} <ArrowRight size={14} />
        </Link>
      )}
      {project.video && (
        <button type="button" onClick={onWatch} className="btn-demo">
          <span className="btn-demo-yt" aria-hidden="true">
            <YoutubeMark className="btn-demo-mark" />
          </span>{' '}
          {t('work.watch')}
        </button>
      )}
      {project.github && (
        <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-secondary">
          <Github size={14} /> {t('work.code')} <ArrowUpRight size={13} />
        </a>
      )}
    </div>
  );
};

/** The visual of one project: BVMT gets its real screens fanned out, the
 *  others their demo poster in a framed "screen". */
const Visual = ({ project, onWatch }: { project: Project; onWatch: () => void }) => {
  const { t, language } = useLanguage();
  const poster = posterFor(project.video);
  const cs = getCaseStudyByPath(project.caseStudy, language);
  const screens = fanScreens(cs);

  const play = project.video && (
    <button type="button" onClick={onWatch} className="case-fan-play showcase-play">
      <DemoLabel title={t('work.watch')} subtitle={t('work.realDemo')} />
    </button>
  );

  if (cs?.studio) {
    return (
      <div className="showcase-visual is-fan">
        <ScreenStudio studio={cs.studio}>{play}</ScreenStudio>
      </div>
    );
  }

  if (screens.length === 3) {
    return (
      <div className="showcase-visual is-fan">
        <div className="case-fan">
          {screens.map((screen, index) => (
            <figure key={screen.src} className={`case-fan-card case-fan-card--${index}`}>
              <img src={screen.src} alt={screen.caption} width={540} height={960} loading="lazy" />
            </figure>
          ))}
          {play}
        </div>
      </div>
    );
  }

  return (
    <div className="showcase-visual">
      <div className="showcase-screen">
        {poster && <img src={poster} alt="" loading="lazy" />}
      </div>
      {play}
    </div>
  );
};

/* ---- Desktop: sticky visual + scrolling chapters ------------------------- */

const Showcase = ({ projects, onWatch }: { projects: Project[]; onWatch: (p: Project) => () => void }) => {
  const { t } = useLanguage();
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.index));
        }),
      { rootMargin: '-45% 0px -45% 0px' },
    );
    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [projects.length]);

  const progress = ((active + 1) / projects.length) * 100;

  return (
    <div className="showcase">
      {/* Left: the sticky stage */}
      <div className="showcase-stage-wrap">
        <div className="showcase-stage">
          <div className="showcase-meta">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              <span key={active} className="showcase-count tabular text-foreground">
                {num(active)}
              </span>{' '}
              / {num(projects.length - 1)}
            </p>
            <span className="showcase-progress" aria-hidden="true">
              <span style={{ width: `${progress}%` }} />
            </span>
            <p key={`t${active}`} className="showcase-current truncate text-[13px] font-semibold">
              {projects[active]?.title}
            </p>
          </div>
          <div className="showcase-frames">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={`showcase-frame ${index === active ? 'is-active' : ''} ${index < active ? 'is-past' : ''}`}
                aria-hidden={index !== active}
              >
                <Visual project={project} onWatch={onWatch(project)} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right: one chapter per project */}
      <ol className="showcase-list">
        {projects.map((project, index) => (
          <li
            key={project.id}
            ref={(el) => (refs.current[index] = el)}
            data-index={index}
            className={`showcase-item ${index === active ? 'is-active' : ''}`}
          >
            <p className="eyebrow flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="tabular text-foreground">{num(index)}</span>
              <span>{project.year}</span>
              {index === 0 && <span className="chip-ink !py-0.5">{t('work.featured')}</span>}
            </p>
            <h3 className="mt-5 text-[clamp(2rem,1.2rem+2.2vw,3.1rem)] font-bold leading-[0.98] tracking-[-0.045em]">
              {project.title}
            </h3>
            <p className="mt-2 font-serif text-[clamp(1.1rem,1rem+0.4vw,1.35rem)] italic text-muted-foreground">{project.tagline}</p>
            <p className="mt-6 text-[15px] leading-relaxed text-ink-2">{project.description}</p>
            <div className="mt-6">
              <Stack items={project.stack} label={t('work.stack')} />
            </div>
            <div className="mt-8">
              <Actions project={project} onWatch={onWatch(project)} />
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

/* ---- Small screens: one card per project --------------------------------- */

const MobileList = ({ projects, onWatch }: { projects: Project[]; onWatch: (p: Project) => () => void }) => {
  const { t } = useLanguage();
  return (
    <ol className="showcase-mobile">
      {projects.map((project, index) => (
        <li key={project.id} className="showcase-card rv" style={delay(0)}>
          <Visual project={project} onWatch={onWatch(project)} />
          <div className="p-6">
            <p className="eyebrow flex flex-wrap items-center gap-x-3">
              <span className="tabular text-foreground">{num(index)}</span>
              <span>{project.year}</span>
              {index === 0 && <span className="chip-ink !py-0.5">{t('work.featured')}</span>}
            </p>
            <h3 className="mt-4 text-[26px] font-bold leading-tight tracking-[-0.035em]">{project.title}</h3>
            <p className="mt-1 font-serif text-[17px] italic text-muted-foreground">{project.tagline}</p>
            <p className="mt-4 text-[14.5px] leading-relaxed text-ink-2">{project.description}</p>
            <div className="mt-5">
              <Stack items={project.stack} label={t('work.stack')} />
            </div>
            <div className="mt-6">
              <Actions project={project} onWatch={onWatch(project)} />
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
};

/* ---- Section ------------------------------------------------------------- */

export const ProjectsSection = () => {
  const { t, language } = useLanguage();
  const all = getProjects(language);
  const featured = all.filter((project) => project.featured);
  const others = all.filter((project) => !project.featured);
  const [demo, setDemo] = useState<Project | null>(null);

  const watch = (project: Project) => () => setDemo(project);

  return (
    <section id="projets" className="section">
      <div className="wrap">
        <SectionHeader
          index="03"
          tag={t('work.tag')}
          title={t('work.title')}
          accent={t('work.titleAccent')}
          lead={t('work.lead')}
        />

        <div className="hidden lg:block">
          <Showcase projects={featured} onWatch={watch} />
        </div>
        <div className="lg:hidden">
          <MobileList projects={featured} onWatch={watch} />
        </div>

        {/* ---- Other projects: compact cards ---- */}
        {others.length > 0 && (
          <div className="mt-24">
            <div className="mb-6 flex items-center gap-4">
              <p className="eyebrow rv">
                {t('work.others')} <span className="tabular text-foreground">· {String(others.length).padStart(2, '0')}</span>
              </p>
              <span className="h-px flex-1 bg-border" aria-hidden="true" />
            </div>
            <ul className={`grid gap-5 md:grid-cols-2 ${others.length % 3 === 0 ? 'lg:grid-cols-3' : ''}`}>
              {others.map((project, index) => {
                const Icon = OTHER_ICONS[project.id] ?? Boxes;
                return (
                  <li key={project.id} className="other-card rv" style={delay(index)}>
                    <div className="other-head">
                      <span className="other-icon" aria-hidden="true">
                        <Icon size={22} strokeWidth={1.6} />
                      </span>
                      <span className="other-year tabular">{project.year}</span>
                      <span className="other-num tabular" aria-hidden="true">
                        {num(index)}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-6 pt-5">
                      <h3 className="text-[19px] font-bold leading-tight tracking-[-0.025em]">{project.title}</h3>
                      <p className="mt-1 font-serif text-[15px] italic text-muted-foreground">{project.tagline}</p>
                      <p className="mt-3 line-clamp-3 text-[14px] leading-relaxed text-ink-2">{project.description}</p>
                      <div className="mb-5 mt-5">
                        <Stack items={project.stack} label={t('work.stack')} />
                      </div>
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="other-link"
                          aria-label={`${t('work.code')} — ${project.title}`}
                        >
                          <Github size={14} aria-hidden="true" />
                          {t('work.code')}
                          <span className="other-link-arrow" aria-hidden="true">
                            <ArrowUpRight size={14} />
                          </span>
                        </a>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>

      <VideoDialog
        video={demo?.video ? { id: demo.id, title: demo.title, subtitle: demo.tagline, src: demo.video } : null}
        onClose={() => setDemo(null)}
      />
    </section>
  );
};

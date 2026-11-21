import { useRef, useState, type ReactNode } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Download, Eye, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from '@/hooks/use-toast';
import { RESUMES } from '@/data/content';
import type { Language } from '@/i18n/translations';

const LANGS: Language[] = ['fr', 'en'];

/** What the miniature page shows, in the language of that CV. */
const SHEET: Record<Language, { role: string; sections: [string, string, string] }> = {
  fr: { role: 'Ingénieur full stack', sections: ['Expérience', 'Projets', 'Formation'] },
  en: { role: 'Full stack engineer', sections: ['Experience', 'Projects', 'Education'] },
};

/**
 * Wraps any CV button: clicking it opens a small chooser with the French and
 * English versions side by side, each with a download and a preview action.
 * The version matching the site language is marked and focused first.
 */
export const ResumeDialog = ({ children }: { children: ReactNode }) => {
  const { language, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const currentRef = useRef<HTMLAnchorElement>(null);

  const onDownload = (lang: Language) => {
    toast({ title: t('cv.toast.title'), description: t(lang === 'fr' ? 'cv.toast.fr' : 'cv.toast.en') });
    // Let the browser register the click on the link before the dialog unmounts.
    window.setTimeout(() => setOpen(false), 150);
  };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Trigger asChild>{children}</DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="video-overlay" />
        <DialogPrimitive.Content
          className="cv-dialog"
          onOpenAutoFocus={(event) => {
            event.preventDefault();
            currentRef.current?.focus();
          }}
        >
          <div className="cv-panel">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="cv-tag">
                  <span className="cv-tag-dot" aria-hidden="true" />
                  {t('cv.dialog.tag')}
                </p>
                <DialogPrimitive.Title className="mt-3 text-[clamp(1.6rem,1.2rem+1.4vw,2.1rem)] font-bold leading-[1.05] tracking-[-0.04em]">
                  {t('cv.dialog.title')}{' '}
                  <span className="font-serif font-normal italic tracking-[-0.02em]">{t('cv.dialog.titleAccent')}</span>
                </DialogPrimitive.Title>
                <DialogPrimitive.Description className="mt-2.5 max-w-md text-[14.5px] leading-relaxed text-muted-foreground">
                  {t('cv.dialog.body')}
                </DialogPrimitive.Description>
              </div>
              <DialogPrimitive.Close className="cv-close" aria-label={t('cv.close')}>
                <X size={17} />
              </DialogPrimitive.Close>
            </div>

            <ul className="mt-7 grid gap-3.5 sm:grid-cols-2">
              {LANGS.map((lang) => {
                const resume = RESUMES[lang];
                const sheet = SHEET[lang];
                const current = lang === language;
                return (
                  <li key={lang} className={`cv-card ${current ? 'is-current' : ''}`}>
                    {/* Miniature of the first page */}
                    <div className="cv-sheet-stage" aria-hidden="true">
                      <div className="cv-sheet">
                        <div className="flex items-center gap-[5px]">
                          <span className="cv-sheet-avatar">KE</span>
                          <div>
                            <p className="cv-sheet-name">ELYESS KAROUI</p>
                            <p className="cv-sheet-role">{sheet.role}</p>
                          </div>
                        </div>
                        {sheet.sections.map((section, index) => (
                          <div key={section} className="mt-[7px]">
                            <p className="cv-sheet-section">{section}</p>
                            <span className="cv-sheet-line w-full" />
                            <span className="cv-sheet-line w-[86%]" />
                            {index < 2 && <span className="cv-sheet-line w-[64%]" />}
                          </div>
                        ))}
                        <span className="cv-sheet-stamp">{lang.toUpperCase()}</span>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between gap-2">
                      <p className="text-[17px] font-bold tracking-[-0.02em]">{t(lang === 'fr' ? 'cv.lang.fr' : 'cv.lang.en')}</p>
                      {current && <span className="cv-current">{t('cv.current')}</span>}
                    </div>
                    <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                      PDF · {resume.sizeKb} {t('cv.size')}
                    </p>

                    <div className="mt-4 flex gap-2">
                      <a
                        ref={current ? currentRef : undefined}
                        href={resume.href}
                        download={resume.file}
                        onClick={() => onDownload(lang)}
                        className="cv-download"
                      >
                        <Download size={15} aria-hidden="true" />
                        {t('cv.download')}
                      </a>
                      <a
                        href={resume.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cv-preview"
                        aria-label={`${t('cv.preview')} — ${t(lang === 'fr' ? 'cv.lang.fr' : 'cv.lang.en')}`}
                        title={t('cv.preview')}
                      >
                        <Eye size={16} aria-hidden="true" />
                      </a>
                    </div>
                  </li>
                );
              })}
            </ul>

            <p className="mt-5 hidden text-center font-mono text-[11px] text-muted-foreground sm:block">
              <kbd className="cv-kbd">Esc</kbd> {t('video.esc')}
            </p>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

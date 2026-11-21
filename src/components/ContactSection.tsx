import { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { ArrowUpRight, AtSign, Check, Copy, Github, Linkedin, Loader2, Mail, MessageSquare, Phone, Send, Tag, User } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from '@/hooks/use-toast';
import { PROFILE } from '@/data/content';

/* EmailJS identifiers are public by design; the env vars allow rotating them
   without a code change, the literals keep a fresh clone working. */
const EMAILJS = {
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? 'TvWFVl1N4quKA7oCg',
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID ?? 'service_smrb9m2',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? 'template_i1zxosh',
};

const EMPTY_FORM = { name: '', email: '', subject: '', message: '' };
const MESSAGE_MAX = 1000;

/** `https://www.linkedin.com/in/x/` → `linkedin.com/in/x` */
const shortUrl = (url: string) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');

/** A heading whose letters hop as the pointer passes over them. */
const HopLine = ({ text, className = '' }: { text: string; className?: string }) => {
  const hop = (event: React.PointerEvent<HTMLSpanElement>) => {
    const el = event.currentTarget;
    if (el.classList.contains('is-hopping')) return;
    el.classList.add('is-hopping');
    el.addEventListener('animationend', () => el.classList.remove('is-hopping'), { once: true });
  };
  return (
    <span className={`block ${className}`} aria-hidden="true">
      {text.split(' ').map((word, w) => (
        <span key={w} className="inline-block whitespace-nowrap">
          {Array.from(word).map((char, c) => (
            <span key={c} className="hop-letter" onPointerEnter={hop}>
              {char}
            </span>
          ))}
          {w < text.split(' ').length - 1 && <span className="inline-block w-[0.25em]" />}
        </span>
      ))}
    </span>
  );
};

/** Slowly spinning circular "say hello" badge. */
const HelloBadge = ({ label }: { label: string }) => (
  <a
    href={`mailto:${PROFILE.email}`}
    className="group relative grid h-[132px] w-[132px] flex-none place-items-center"
    aria-label={`Email — ${PROFILE.email}`}
  >
    <svg viewBox="0 0 132 132" className="badge-spin absolute inset-0 h-full w-full" aria-hidden="true">
      <defs>
        <path id="badge-circle" d="M66,66 m-52,0 a52,52 0 1,1 104,0 a52,52 0 1,1 -104,0" />
      </defs>
      <text className="fill-foreground font-mono text-[10.5px] uppercase tracking-[0.2em]">
        {/* exactly one turn: 2πr with r = 52 */}
        <textPath href="#badge-circle" textLength={326} lengthAdjust="spacing">
          {label}
        </textPath>
      </text>
    </svg>
    <span className="grid h-14 w-14 place-items-center rounded-full bg-foreground text-background transition-transform duration-500 ease-out-expo group-hover:rotate-45 group-hover:scale-110">
      <ArrowUpRight size={20} />
    </span>
  </a>
);

export const ContactSection = () => {
  const { t } = useLanguage();
  const [form, setForm] = useState(EMPTY_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef<number>();

  useEffect(() => {
    emailjs.init(EMAILJS.publicKey);
    return () => window.clearTimeout(copyTimer.current);
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      window.clearTimeout(copyTimer.current);
      copyTimer.current = window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${PROFILE.email}`;
    }
  };

  const update = (field: keyof typeof EMPTY_FORM) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setForm((current) => ({ ...current, [field]: event.target.value }));

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (honeypot) return;
    setIsSubmitting(true);
    try {
      await emailjs.send(EMAILJS.serviceId, EMAILJS.templateId, {
        name: form.name,
        email: form.email,
        title: form.subject,
        message: form.message,
      });
      toast({ title: t('contact.form.success.title'), description: t('contact.form.success.body') });
      setForm(EMPTY_FORM);
    } catch (error) {
      console.error('EmailJS send failed:', error);
      toast({
        title: t('contact.form.error.title'),
        description: t('contact.form.error.body'),
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const heading = `${t('contact.title.1')} ${t('contact.title.2')} ${t('contact.titleAccent')}`;

  return (
    <section id="contact" className="section overflow-hidden">
      <div className="wrap">
        <p className="section-tag rv">
          <span className="tabular">06</span> — {t('contact.tag')}
        </p>

        <h2 className="mt-6 text-[clamp(3rem,1.2rem+8vw,9.5rem)] font-bold leading-[0.92] tracking-[-0.055em]">
          <span className="sr-only">{heading}</span>
          <span className="rv-mask">
            <span>
              <HopLine text={t('contact.title.1')} />
            </span>
          </span>
          <span className="rv-mask" style={{ '--i': 1 } as React.CSSProperties}>
            <span>
              <HopLine text={t('contact.title.2')} />
            </span>
          </span>
          <span className="rv-mask" style={{ '--i': 2 } as React.CSSProperties}>
            <span>
              <HopLine text={t('contact.titleAccent')} className="serif-accent" />
            </span>
          </span>
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-12">
          {/* ---- Direct lines ---- */}
          <div className="lg:col-span-6">
            <p className="rv max-w-md text-[15.5px] leading-relaxed text-muted-foreground">{t('contact.lead')}</p>

            <p className="eyebrow rv mt-10" style={{ '--i': 1 } as React.CSSProperties}>
              {t('contact.direct')}
            </p>

            <ul className="rv mt-6 grid grid-cols-1 gap-3" style={{ '--i': 2 } as React.CSSProperties}>
              <li className="contact-line">
                <a href={`mailto:${PROFILE.email}`} className="contact-line-main">
                  <span className="contact-line-icon" aria-hidden="true">
                    <Mail size={17} />
                  </span>
                  <span className="min-w-0">
                    <span className="contact-line-label">Email</span>
                    <span className="contact-line-value break-all">{PROFILE.email}</span>
                  </span>
                </a>
                <button type="button" onClick={copyEmail} aria-label={t('contact.copy.label')} className="contact-copy">
                  {copied ? <Check size={13} aria-hidden="true" /> : <Copy size={13} aria-hidden="true" />}
                  <span aria-live="polite" className="max-[420px]:sr-only">{copied ? t('contact.copied') : t('contact.copy')}</span>
                </button>
              </li>
              {[
                { href: PROFILE.phoneHref, icon: Phone, label: t('contact.label.phone'), value: PROFILE.phone, external: false },
                { href: PROFILE.linkedin, icon: Linkedin, label: 'LinkedIn', value: shortUrl(PROFILE.linkedin), external: true },
                { href: PROFILE.github, icon: Github, label: 'GitHub', value: shortUrl(PROFILE.github), external: true },
              ].map(({ href, icon: Icon, label, value, external }) => (
                <li key={label} className="contact-line">
                  <a
                    href={href}
                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="contact-line-main"
                  >
                    <span className="contact-line-icon" aria-hidden="true">
                      <Icon size={17} />
                    </span>
                    <span className="min-w-0">
                      <span className="contact-line-label">{label}</span>
                      <span className="contact-line-value truncate">{value}</span>
                    </span>
                    <span className="contact-line-arrow" aria-hidden="true">
                      <ArrowUpRight size={15} />
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="rv mt-12" style={{ '--i': 3 } as React.CSSProperties}>
              <HelloBadge label={t('contact.badge')} />
            </div>
          </div>

          {/* ---- Form ---- */}
          <div className="lg:col-span-6">
            <form onSubmit={handleSubmit} className="card-p rv relative p-7 md:p-9">
              <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
                <p className="text-[22px] font-bold tracking-[-0.03em]">{t('contact.form.title')}</p>
                <span className="contact-reply">
                  <span className="contact-reply-dot" aria-hidden="true" />
                  {t('contact.reply')}
                </span>
              </div>

              {/* Honeypot — off-screen rather than display:none, which some bots skip */}
              <div aria-hidden="true" className="absolute left-[-9999px]">
                <label htmlFor="company">Company</label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(event) => setHoneypot(event.target.value)}
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="field-label">{t('contact.form.name')}</label>
                  <div className="field-wrap">
                  <span className="field-icon" aria-hidden="true">
                    <User size={15} />
                  </span>
                  <input id="name" name="name" type="text" required autoComplete="name" value={form.name} onChange={update('name')} placeholder={t('contact.form.name.placeholder')} className="field field-with-icon" />
                </div>
                </div>
                <div>
                  <label htmlFor="email" className="field-label">{t('contact.form.email')}</label>
                  <div className="field-wrap">
                  <span className="field-icon" aria-hidden="true">
                    <AtSign size={15} />
                  </span>
                  <input id="email" name="email" type="email" required autoComplete="email" value={form.email} onChange={update('email')} placeholder={t('contact.form.email.placeholder')} className="field field-with-icon" />
                </div>
                </div>
              </div>
              <div className="mt-5">
                <label htmlFor="subject" className="field-label">{t('contact.form.subject')}</label>
                <div className="field-wrap">
                  <span className="field-icon" aria-hidden="true">
                    <Tag size={15} />
                  </span>
                  <input id="subject" name="subject" type="text" required value={form.subject} onChange={update('subject')} placeholder={t('contact.form.subject.placeholder')} className="field field-with-icon" />
                </div>
              </div>
              <div className="mt-5">
                <label htmlFor="message" className="field-label">{t('contact.form.message')}</label>
                <div className="field-wrap is-area">
                  <span className="field-icon" aria-hidden="true">
                    <MessageSquare size={15} />
                  </span>
                  <textarea id="message" name="message" rows={5} maxLength={MESSAGE_MAX} required value={form.message} onChange={update('message')} placeholder={t('contact.form.message.placeholder')} className="field field-with-icon field-area resize-none" />
                </div>
                <p className="mt-2 text-right font-mono text-[10.5px] tabular text-muted-foreground">
                  {form.message.length} / {MESSAGE_MAX}
                </p>
              </div>

              <button type="submit" disabled={isSubmitting} className="btn-primary mt-7 w-full !py-3.5">
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> {t('contact.form.sending')}
                  </>
                ) : (
                  <>
                    <Send size={15} /> {t('contact.form.send')}
                  </>
                )}
              </button>
              <p className="mt-4 text-center text-[12px] text-muted-foreground">{t('contact.form.privacy')}</p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

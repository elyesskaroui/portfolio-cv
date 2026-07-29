import { useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';
import { ArrowUpRight, Github, Linkedin, Loader2, Mail, MapPin, Phone, Send } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import type { TranslationKey } from '@/i18n/translations';
import { toast } from '@/hooks/use-toast';
import { Reveal } from '@/components/common/Reveal';
import { SectionHeader } from '@/components/common/SectionHeader';
import { PROFILE } from '@/data/content';

/* EmailJS identifiers are public by design, but reading them from the
   environment means they can be rotated or pointed at another account without
   a code change. The literals are kept as a fallback so a fresh clone works. */
const EMAILJS = {
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? 'TvWFVl1N4quKA7oCg',
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID ?? 'service_smrb9m2',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? 'template_i1zxosh',
};

const CONTACT_LINKS: {
  icon: typeof Mail;
  labelKey: TranslationKey;
  value: string;
  href?: string;
}[] = [
  { icon: Mail, labelKey: 'contact.label.email', value: PROFILE.email, href: `mailto:${PROFILE.email}` },
  { icon: Phone, labelKey: 'contact.label.phone', value: PROFILE.phone, href: PROFILE.phoneHref },
  { icon: MapPin, labelKey: 'contact.label.location', value: '' },
];

const SOCIALS = [
  { icon: Github, label: 'GitHub', href: PROFILE.github },
  { icon: Linkedin, label: 'LinkedIn', href: PROFILE.linkedin },
  { icon: Mail, label: 'Email', href: `mailto:${PROFILE.email}` },
];

const EMPTY_FORM = { name: '', email: '', subject: '', message: '' };

export const ContactSection = () => {
  const { t } = useLanguage();
  const [form, setForm] = useState(EMPTY_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  /* Honeypot: invisible to people, filled in by naive bots. */
  const [honeypot, setHoneypot] = useState('');

  useEffect(() => {
    emailjs.init(EMAILJS.publicKey);
  }, []);

  const update = (field: keyof typeof EMPTY_FORM) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setForm((current) => ({ ...current, [field]: event.target.value }));

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (honeypot) return; // Silently drop bot submissions.

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

  return (
    <section id="contact" className="section">
      <div className="container">
        <SectionHeader
          index="06"
          eyebrow={t('contact.eyebrow')}
          title={t('contact.title')}
          lead={t('contact.lead')}
        />

        <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
          {/* ---- Direct contact ---- */}
          <div className="lg:col-span-5">
            <Reveal>
              <h3 className="eyebrow mb-6">{t('contact.direct')}</h3>
            </Reveal>

            {/* A plain list rather than a <dl>: a definition list may only hold
                dt/dd groups, which leaves nowhere valid for the leading icon. */}
            <Reveal>
              <ul className="border-t border-border">
                {CONTACT_LINKS.map((item) => {
                  const value = item.value || t('contact.location.value');
                  return (
                    <li
                      key={item.labelKey}
                      className="flex items-center gap-4 border-b border-border py-4"
                    >
                      <item.icon
                        size={16}
                        aria-hidden="true"
                        className="flex-none text-muted-foreground"
                      />
                      <div className="min-w-0 flex-1">
                        <span className="block font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                          {t(item.labelKey)}
                        </span>
                        <span className="mt-0.5 block truncate text-sm text-foreground">
                          {item.href ? (
                            <a href={item.href} className="link-underline">
                              {value}
                            </a>
                          ) : (
                            value
                          )}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </Reveal>

            <Reveal delay={0.15}>
              <h3 className="eyebrow mb-4 mt-10">{t('contact.elsewhere')}</h3>
              <ul className="flex flex-wrap gap-2">
                {SOCIALS.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target={social.href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-md border border-border px-3.5 py-2.5 text-sm text-muted-foreground transition-colors duration-200 hover:border-border-strong hover:bg-surface hover:text-foreground"
                    >
                      <social.icon size={15} />
                      {social.label}
                      <ArrowUpRight size={13} className="opacity-50" />
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* ---- Form ---- */}
          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <form onSubmit={handleSubmit} className="rounded-lg border border-border bg-surface p-7 md:p-9">
                <h3 className="eyebrow mb-8">{t('contact.form.title')}</h3>

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
                    <label htmlFor="name" className="field-label">
                      {t('contact.form.name')}
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      value={form.name}
                      onChange={update('name')}
                      placeholder={t('contact.form.name.placeholder')}
                      className="field"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="field-label">
                      {t('contact.form.email')}
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={form.email}
                      onChange={update('email')}
                      placeholder={t('contact.form.email.placeholder')}
                      className="field"
                    />
                  </div>
                </div>

                <div className="mt-5">
                  <label htmlFor="subject" className="field-label">
                    {t('contact.form.subject')}
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={form.subject}
                    onChange={update('subject')}
                    placeholder={t('contact.form.subject.placeholder')}
                    className="field"
                  />
                </div>

                <div className="mt-5">
                  <label htmlFor="message" className="field-label">
                    {t('contact.form.message')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    value={form.message}
                    onChange={update('message')}
                    placeholder={t('contact.form.message.placeholder')}
                    className="field resize-none"
                  />
                </div>

                <button type="submit" disabled={isSubmitting} className="btn-primary mt-7 w-full">
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      {t('contact.form.sending')}
                    </>
                  ) : (
                    <>
                      <Send size={15} />
                      {t('contact.form.send')}
                    </>
                  )}
                </button>
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

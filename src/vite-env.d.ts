/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** EmailJS public key — safe to expose, restrict by domain in the dashboard. */
  readonly VITE_EMAILJS_PUBLIC_KEY?: string;
  readonly VITE_EMAILJS_SERVICE_ID?: string;
  readonly VITE_EMAILJS_TEMPLATE_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

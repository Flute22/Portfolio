/// <reference types="vite/client" />

declare module '*.jpg';
declare module '*.jpeg';
declare module '*.png';
declare module '*.svg';

interface ImportMetaEnv {
  /** Form-submission endpoint (e.g. a FormSubmit / Formspree URL). Never commit a real value. */
  readonly VITE_FORM_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

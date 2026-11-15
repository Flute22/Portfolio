import React, { useCallback, useEffect, useRef, useState } from 'react';
import { CheckCircle2, Loader2, X } from 'lucide-react';
import { CONTACT_EMAIL, SITE_NAME } from '../constants';

/** Set VITE_FORM_ENDPOINT in .env.local (see .env.example). Never hardcode it here. */
const FORM_ENDPOINT = (import.meta.env.VITE_FORM_ENDPOINT ?? '').trim();
const REQUEST_TIMEOUT_MS = 15_000;

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormValues {
  name: string;
  email: string;
  phone: string;
  message: string;
  /** Honeypot: real visitors never see or fill this. */
  website: string;
}

type FieldName = 'name' | 'email' | 'phone' | 'message';
type FormErrors = Partial<Record<FieldName, string>>;

const EMPTY: FormValues = { name: '', email: '', phone: '', message: '', website: '' };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+()\-.\s\d]{7,20}$/;

const validate = (v: FormValues): FormErrors => {
  const errors: FormErrors = {};
  const name = v.name.trim();
  const email = v.email.trim();
  const phone = v.phone.trim();
  const message = v.message.trim();

  if (!name) errors.name = 'Please enter your name.';
  else if (name.length < 2 || name.length > 100) errors.name = 'Name must be 2–100 characters.';

  if (!email) errors.email = 'Please enter your email.';
  else if (!EMAIL_RE.test(email) || email.length > 254) errors.email = 'Please enter a valid email address.';

  if (phone && !PHONE_RE.test(phone)) errors.phone = 'Please enter a valid phone number, or leave it blank.';

  if (!message) errors.message = 'Please enter a message.';
  else if (message.length < 10) errors.message = 'Message must be at least 10 characters.';
  else if (message.length > 2000) errors.message = 'Message must be 2000 characters or fewer.';

  return errors;
};

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

const inputClass = (hasError: boolean) =>
  `w-full rounded-xl border bg-white px-4 text-[15px] text-ink placeholder:text-muted transition-colors ${
    hasError ? 'border-red-700' : 'border-line hover:border-accent/50 focus:border-accent'
  }`;

interface FieldProps {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  children: (props: { id: string; 'aria-invalid': boolean; 'aria-describedby'?: string }) => React.ReactNode;
}

const Field: React.FC<FieldProps> = ({ id, label, optional, error, children }) => {
  const errorId = `${id}-error`;
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-ink">
        {label}
        {optional && <span className="ml-1.5 font-normal text-muted">(optional)</span>}
      </label>
      {children({ id, 'aria-invalid': Boolean(error), 'aria-describedby': error ? errorId : undefined })}
      {error && (
        <p id={errorId} className="mt-1.5 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
};

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [values, setValues] = useState<FormValues>(EMPTY);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  // Lock page scroll, move focus in, and restore it on close.
  useEffect(() => {
    if (!isOpen) return;
    lastFocusedRef.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    firstFieldRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      lastFocusedRef.current?.focus?.();
    };
  }, [isOpen]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !dialogRef.current) return;
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    },
    [onClose],
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (name in errors) setErrors((prev) => ({ ...prev, [name]: undefined }));
    if (status === 'error') setStatus('idle');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === 'submitting') return;

    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const firstInvalid = (Object.keys(found) as FieldName[])[0];
      dialogRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    // Bots fill the honeypot; pretend it worked and send nothing.
    if (values.website) {
      setStatus('success');
      return;
    }

    if (!FORM_ENDPOINT) {
      setErrorMessage(`The contact form isn't set up yet. Please email me directly at ${CONTACT_EMAIL}.`);
      setStatus('error');
      return;
    }

    setStatus('submitting');
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          phone: values.phone.trim() || 'Not provided',
          message: values.message.trim(),
          _subject: `Portfolio message from ${values.name.trim()}`,
          _template: 'table',
          _captcha: 'false',
        }),
      });

      let result: { success?: boolean | string } | null = null;
      try {
        result = (await response.json()) as { success?: boolean | string };
      } catch {
        result = null; // some endpoints reply with an empty body
      }

      const reportedFailure = result?.success === false || result?.success === 'false';
      if (!response.ok || reportedFailure) throw new Error(`Form endpoint responded with ${response.status}`);

      setValues(EMPTY);
      setStatus('success');
    } catch (err) {
      const timedOut = err instanceof DOMException && err.name === 'AbortError';
      setErrorMessage(
        timedOut
          ? `The request timed out. Please try again, or email me at ${CONTACT_EMAIL}.`
          : `Sorry, your message couldn't be sent. Please try again, or email me at ${CONTACT_EMAIL}.`,
      );
      setStatus('error');
    } finally {
      window.clearTimeout(timer);
    }
  };

  if (!isOpen) return null;

  const submitting = status === 'submitting';

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-6" onKeyDown={handleKeyDown}>
      <div className="absolute inset-0 bg-ink/40" aria-hidden="true" onClick={onClose} />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-dialog-title"
        className="relative max-h-[100dvh] w-full max-w-lg overflow-y-auto rounded-t-card border border-line bg-white sm:rounded-card"
      >
        <div className="flex items-start justify-between gap-4 p-6 pb-0 sm:p-8 sm:pb-0">
          <div>
            <h2 id="contact-dialog-title" className="text-2xl font-semibold tracking-tight">
              Send a message
            </h2>
            <p className="mt-1.5 text-[15px] text-muted">Message {SITE_NAME} directly. I usually reply within a day or two.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line text-ink transition-colors hover:border-accent/50"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="p-6 sm:p-8">
          {status === 'success' ? (
            <div role="status" className="py-6 text-center">
              <CheckCircle2 className="mx-auto h-10 w-10 text-accent" aria-hidden="true" />
              <h3 className="mt-4 text-xl font-semibold tracking-tight">Message sent</h3>
              <p className="mx-auto mt-2 max-w-xs text-[15px] text-muted">
                Thanks for reaching out. I'll get back to you soon.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-6 inline-flex h-12 items-center rounded-2xl bg-accent px-6 text-[15px] font-medium text-white transition-colors hover:bg-accent-dark"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <Field id="cf-name" label="Name" error={errors.name}>
                {(a11y) => (
                  <input
                    {...a11y}
                    ref={firstFieldRef}
                    name="name"
                    type="text"
                    autoComplete="name"
                    maxLength={100}
                    value={values.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className={`${inputClass(Boolean(errors.name))} h-12`}
                  />
                )}
              </Field>

              <Field id="cf-email" label="Email" error={errors.email}>
                {(a11y) => (
                  <input
                    {...a11y}
                    name="email"
                    type="email"
                    autoComplete="email"
                    maxLength={254}
                    value={values.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className={`${inputClass(Boolean(errors.email))} h-12`}
                  />
                )}
              </Field>

              <Field id="cf-phone" label="Phone" optional error={errors.phone}>
                {(a11y) => (
                  <input
                    {...a11y}
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    maxLength={20}
                    value={values.phone}
                    onChange={handleChange}
                    className={`${inputClass(Boolean(errors.phone))} h-12`}
                  />
                )}
              </Field>

              <Field id="cf-message" label="Message" error={errors.message}>
                {(a11y) => (
                  <textarea
                    {...a11y}
                    name="message"
                    rows={5}
                    maxLength={2000}
                    value={values.message}
                    onChange={handleChange}
                    placeholder="How can I help?"
                    className={`${inputClass(Boolean(errors.message))} resize-none py-3`}
                  />
                )}
              </Field>

              {/* Honeypot, hidden from people and assistive tech */}
              <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                <label htmlFor="cf-website">Leave this field empty</label>
                <input
                  id="cf-website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={values.website}
                  onChange={handleChange}
                />
              </div>

              {status === 'error' && (
                <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
                  {errorMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-accent px-6 text-[15px] font-medium text-white transition-colors hover:bg-accent-dark disabled:cursor-not-allowed disabled:opacity-70"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin motion-reduce:animate-none" aria-hidden="true" />
                    Sending…
                  </>
                ) : (
                  'Send message'
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

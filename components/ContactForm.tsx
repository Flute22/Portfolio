import React, { useState } from 'react';
import { Check, Send } from 'lucide-react';
import { CONTACT_EMAIL } from '../constants';
import { Card } from './ui/Card';

/** Set VITE_FORM_ENDPOINT in .env.local (see .env.example). Never hardcode it here. */
const FORM_ENDPOINT = (import.meta.env.VITE_FORM_ENDPOINT ?? '').trim();
const REQUEST_TIMEOUT_MS = 15_000;

type FieldName = 'name' | 'email' | 'phone' | 'message';
type FormValues = Record<FieldName, string>;
type FormErrors = Partial<Record<FieldName, string>>;
type Status = 'idle' | 'sending' | 'sent';

const EMPTY: FormValues = { name: '', email: '', phone: '', message: '' };
const FIELD_IDS: Record<FieldName, string> = {
  name: 'f-name',
  email: 'f-email',
  phone: 'f-phone',
  message: 'f-msg',
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+()\d\s-]{7,20}$/;

const validate = (v: FormValues): FormErrors => {
  const errors: FormErrors = {};
  if (!v.name.trim()) errors.name = 'Please enter your name.';
  if (!v.email.trim()) errors.email = 'Please enter your email.';
  else if (!EMAIL_RE.test(v.email.trim())) errors.email = 'That email doesn’t look right.';
  if (v.phone.trim() && !PHONE_RE.test(v.phone.trim())) errors.phone = 'Use digits, spaces, +, - or ( ).';
  if (!v.message.trim()) errors.message = 'Please write a short message.';
  else if (v.message.trim().length < 10) errors.message = 'A little more detail, please (10+ characters).';
  return errors;
};

const fieldClass = (hasError: boolean) =>
  `w-full rounded-xl border bg-page px-4 text-[16px] text-ink ${hasError ? 'border-danger' : 'border-line2'}`;

interface FieldProps {
  name: FieldName;
  label: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  className?: string;
  children: (props: { id: string; name: FieldName; 'aria-invalid': boolean; 'aria-describedby': string }) => React.ReactNode;
}

const Field: React.FC<FieldProps> = ({ name, label, required, optional, error, className = '', children }) => {
  const id = FIELD_IDS[name];
  const errorId = `${id}-err`;
  return (
    <div className={`flex flex-col gap-2 ${className}`.trim()}>
      <label htmlFor={id} className="text-[14px] font-medium">
        {label}{' '}
        {required && (
          <span aria-hidden="true" className="text-danger">
            *
          </span>
        )}
        {optional && <span className="font-normal text-muted">(optional)</span>}
      </label>
      {children({ id, name, 'aria-invalid': Boolean(error), 'aria-describedby': errorId })}
      <span id={errorId} aria-live="polite" className="min-h-[1em] text-[13px] text-danger">
        {error}
      </span>
    </div>
  );
};

export const ContactForm: React.FC = () => {
  const [values, setValues] = useState<FormValues>(EMPTY);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [submitError, setSubmitError] = useState<string | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = e.target.name as FieldName;
    const { value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setSubmitError(null);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === 'sending') return;

    // Bots fill the hidden field; pretend it worked and send nothing.
    const honeypot = (e.currentTarget.elements.namedItem('_gotcha') as HTMLInputElement | null)?.value;
    if (honeypot) return;

    const found = validate(values);
    setErrors(found);
    const firstInvalid = (Object.keys(found) as FieldName[])[0];
    if (firstInvalid) {
      document.getElementById(FIELD_IDS[firstInvalid])?.focus();
      return;
    }

    if (!FORM_ENDPOINT) {
      setSubmitError(`The contact form isn't set up yet. Please email me directly at ${CONTACT_EMAIL}.`);
      return;
    }

    setStatus('sending');
    setSubmitError(null);
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

      setStatus('sent');
    } catch (err) {
      const timedOut = err instanceof DOMException && err.name === 'AbortError';
      setStatus('idle');
      setSubmitError(
        timedOut
          ? `The request timed out. Please try again, or email me at ${CONTACT_EMAIL}.`
          : `The message couldn’t be sent. Please try again or email me directly at ${CONTACT_EMAIL}.`,
      );
    } finally {
      window.clearTimeout(timer);
    }
  };

  const reset = () => {
    setValues(EMPTY);
    setErrors({});
    setSubmitError(null);
    setStatus('idle');
  };

  return (
    <Card delay={80} className="flex-[1.3_1_440px] p-[clamp(24px,4vw,44px)]">
      {status === 'sent' ? (
        <div role="status" className="flex min-h-[420px] flex-col items-start justify-center gap-3.5">
          <span className="grid h-[52px] w-[52px] place-items-center rounded-full border border-line bg-chip text-accent">
            <Check className="h-[22px] w-[22px]" strokeWidth={2.4} aria-hidden="true" />
          </span>
          <h3 className="m-0 text-[26px] font-semibold tracking-[-0.02em]">Message sent!</h3>
          <p className="m-0 text-[16px] text-muted">Thanks for reaching out. I&apos;ll get back to you shortly.</p>
          <button
            type="button"
            onClick={reset}
            className="mt-2 min-h-11 cursor-pointer rounded-xl border border-line2 bg-transparent px-[18px] text-[15px] font-medium text-ink"
          >
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={onSubmit} noValidate className="relative flex flex-col gap-5">
          <h3 className="m-0 text-[22px] font-semibold tracking-[-0.015em]">Send a message</h3>

          <div className="flex flex-wrap gap-5">
            <Field name="name" label="Name" required error={errors.name} className="flex-[1_1_220px]">
              {(a11y) => (
                <input
                  {...a11y}
                  type="text"
                  autoComplete="name"
                  maxLength={80}
                  required
                  value={values.name}
                  onChange={onChange}
                  placeholder="Jane Doe"
                  className={`${fieldClass(Boolean(errors.name))} h-[50px]`}
                />
              )}
            </Field>
            <Field name="email" label="Email" required error={errors.email} className="flex-[1_1_220px]">
              {(a11y) => (
                <input
                  {...a11y}
                  type="email"
                  autoComplete="email"
                  maxLength={120}
                  required
                  value={values.email}
                  onChange={onChange}
                  placeholder="jane@company.com"
                  className={`${fieldClass(Boolean(errors.email))} h-[50px]`}
                />
              )}
            </Field>
          </div>

          <Field name="phone" label="Phone" optional error={errors.phone}>
            {(a11y) => (
              <input
                {...a11y}
                type="tel"
                autoComplete="tel"
                maxLength={20}
                value={values.phone}
                onChange={onChange}
                placeholder="+91 98765 43210"
                className={`${fieldClass(Boolean(errors.phone))} h-[50px]`}
              />
            )}
          </Field>

          <Field name="message" label="Message" required error={errors.message}>
            {(a11y) => (
              <textarea
                {...a11y}
                rows={5}
                maxLength={2000}
                required
                value={values.message}
                onChange={onChange}
                placeholder="What are you hiring for, or what would you like to discuss?"
                className={`${fieldClass(Boolean(errors.message))} resize-y py-3.5 leading-normal`}
              />
            )}
          </Field>

          {/* Honeypot: hidden from people and assistive tech */}
          <input
            type="text"
            name="_gotcha"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute -left-[9999px] h-px w-px"
          />

          {submitError && (
            <div role="alert" className="rounded-xl border border-danger px-3.5 py-3 text-[14px] leading-normal text-danger">
              {submitError}
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="text-[13px] text-muted">
              <span aria-hidden="true" className="text-danger">
                *
              </span>{' '}
              Required
            </span>
            <button
              type="submit"
              disabled={status === 'sending'}
              className={`flex h-[52px] cursor-pointer items-center gap-2.5 rounded-[14px] border-0 bg-accent px-[26px] text-[16px] font-semibold text-accent-on transition-transform hover:-translate-y-0.5 ${
                status === 'sending' ? 'opacity-70' : ''
              }`}
            >
              {status === 'sending' ? 'Sending…' : 'Send message'}
              <Send className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </form>
      )}
    </Card>
  );
};

import React from 'react';
import { Download, Github, Linkedin, Mail } from 'lucide-react';
import {
  CONTACT_DATA,
  CONTACT_EMAIL,
  RESUME_FILE_NAME,
  RESUME_URL,
  SOCIAL_LINKS,
} from '../constants';
import type { SocialKind } from '../types';
import { Card } from './ui/Card';
import { MonoLabel } from './ui/MonoLabel';
import { Section } from './ui/Section';
import { ScrollReveal } from './ui/ScrollReveal';

const ICONS: Record<SocialKind, React.ReactNode> = {
  github: <Github className="h-5 w-5" aria-hidden="true" />,
  linkedin: <Linkedin className="h-5 w-5" aria-hidden="true" />,
};

const iconButton =
  'inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/40 text-white transition-colors hover:border-white hover:bg-white/10 focus-visible:outline-white';

interface ContactProps {
  onOpenContact: () => void;
}

export const Contact: React.FC<ContactProps> = ({ onOpenContact }) => (
  <Section id="contact" labelledBy="contact-title" className="pb-12 md:pb-16">
    <ScrollReveal>
      <Card tone="accent" className="p-6 sm:p-10 lg:p-14">
        <MonoLabel tone="onAccent">06 / Contact</MonoLabel>
        <h2
          id="contact-title"
          className="mt-4 text-[2rem] font-semibold leading-[1.1] tracking-[-0.03em] text-white sm:text-[2.5rem]"
        >
          {CONTACT_DATA.title}
        </h2>
        <p className="mt-4 max-w-md text-base leading-relaxed text-white/90 sm:text-[17px]">
          {CONTACT_DATA.text}
        </p>

        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="mt-8 inline-block rounded-sm text-lg font-medium text-white underline decoration-white/60 decoration-1 underline-offset-[6px] transition-colors hover:decoration-white focus-visible:outline-white sm:text-xl"
        >
          {CONTACT_EMAIL}
        </a>

        <ul className="mt-6 flex gap-3">
          {SOCIAL_LINKS.map((social) => (
            <li key={social.kind}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${social.label} (opens in a new tab)`}
                className={iconButton}
              >
                {ICONS[social.kind]}
              </a>
            </li>
          ))}
          <li>
            <button
              type="button"
              onClick={onOpenContact}
              aria-haspopup="dialog"
              aria-label="Send me a message"
              className={iconButton}
            >
              <Mail className="h-5 w-5" aria-hidden="true" />
            </button>
          </li>
        </ul>

        <a
          href={RESUME_URL}
          download={RESUME_FILE_NAME}
          className="mt-6 inline-flex h-12 items-center gap-2.5 rounded-2xl bg-white px-6 text-[15px] font-semibold text-[#075E48] transition-colors hover:bg-white/90 focus-visible:outline-white"
        >
          <Download className="h-[18px] w-[18px]" aria-hidden="true" />
          Download resume
        </a>
      </Card>
    </ScrollReveal>
  </Section>
);

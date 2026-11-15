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
import { ContactForm } from './ContactForm';
import { Card } from './ui/Card';
import { MonoLabel } from './ui/MonoLabel';
import { Section } from './ui/Section';

const ICONS: Record<SocialKind, React.ReactNode> = {
  github: <Github className="h-5 w-5" aria-hidden="true" />,
  linkedin: <Linkedin className="h-5 w-5" aria-hidden="true" />,
};

const iconButton =
  'grid h-12 w-12 place-items-center rounded-[14px] border border-white/35 text-white no-underline transition-[background-color,transform] hover:-translate-y-0.5 hover:bg-white/15 focus-visible:outline-white';

export const Contact: React.FC = () => (
  <Section id="contact" labelledBy="contact-title">
    <div className="flex flex-wrap gap-3">
      <Card tone="fill" className="flex flex-[1_1_380px] flex-col justify-between gap-10 p-[clamp(24px,4vw,44px)]">
        <div className="flex flex-col gap-4">
          <MonoLabel tone="inherit">06 / Contact</MonoLabel>
          <h2
            id="contact-title"
            className="m-0 text-balance text-[clamp(34px,4.6vw,56px)] font-semibold leading-[1.02] tracking-[-0.035em]"
          >
            {CONTACT_DATA.title}
          </h2>
          <p className="m-0 max-w-[42ch] text-[17px] leading-[1.55]">{CONTACT_DATA.text}</p>
        </div>

        <div className="flex flex-col gap-5">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="break-all text-[clamp(18px,2vw,22px)] font-semibold text-white underline decoration-1 underline-offset-[5px] hover:decoration-2 focus-visible:outline-white"
          >
            {CONTACT_EMAIL}
          </a>

          <ul aria-label="Social links" className="m-0 flex list-none flex-wrap gap-2 p-0">
            {SOCIAL_LINKS.map((social) => (
              <li key={social.kind}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={iconButton}
                >
                  {ICONS[social.kind]}
                </a>
              </li>
            ))}
            <li>
              <a href={`mailto:${CONTACT_EMAIL}`} aria-label="Email" className={iconButton}>
                <Mail className="h-5 w-5" aria-hidden="true" />
              </a>
            </li>
          </ul>

          <a
            href={RESUME_URL}
            download={RESUME_FILE_NAME}
            className="flex h-[52px] items-center gap-2.5 self-start rounded-[14px] bg-white px-[22px] text-[16px] font-semibold text-[#0B3D30] no-underline transition-transform hover:-translate-y-0.5 focus-visible:outline-white"
          >
            <Download className="h-[17px] w-[17px]" aria-hidden="true" />
            Download resume
          </a>
        </div>
      </Card>

      <ContactForm />
    </div>
  </Section>
);

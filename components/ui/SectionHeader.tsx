import React from 'react';
import { AnimatedWords } from './AnimatedWords';
import { MonoLabel } from './MonoLabel';
import { Reveal } from './Reveal';

interface SectionHeaderProps {
  /** e.g. "01" */
  index: string;
  /** e.g. "About" */
  label: string;
  title: string;
  /** id for the <h2>, used by the parent section's aria-labelledby */
  titleId: string;
  /** Optional controls on the right (e.g. the project filter tabs) */
  actions?: React.ReactNode;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ index, label, title, titleId, actions }) => (
  <div className="mb-[clamp(24px,4vw,40px)] flex flex-wrap items-end justify-between gap-5">
    <div className="flex flex-col gap-3">
      <Reveal className="flex">
        <MonoLabel tone="accent">
          {index} / {label}
        </MonoLabel>
      </Reveal>
      <AnimatedWords
        as="h2"
        id={titleId}
        text={title}
        baseDelay={80}
        className="m-0 text-balance text-[clamp(32px,4.4vw,52px)] font-semibold leading-[1.05] tracking-[-0.03em]"
      />
    </div>
    {actions && <Reveal delay={200}>{actions}</Reveal>}
  </div>
);

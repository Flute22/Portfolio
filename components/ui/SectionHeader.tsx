import React from 'react';
import { MonoLabel } from './MonoLabel';

interface SectionHeaderProps {
  /** e.g. "01" */
  index: string;
  /** e.g. "About" */
  label: string;
  title: string;
  /** id for the <h2>, used by the parent section's aria-labelledby */
  titleId: string;
  /** Used inside Section's `aside`: no bottom margin on desktop, where it sits beside the content. */
  split?: boolean;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ index, label, title, titleId, split = false }) => (
  <header className={`mb-8 md:mb-10 ${split ? 'lg:mb-0' : ''}`.trim()}>
    <MonoLabel tone="accent">
      {index} / {label}
    </MonoLabel>
    <h2
      id={titleId}
      className="mt-3 text-[2rem] font-semibold leading-[1.1] tracking-[-0.03em] md:text-[2.5rem]"
    >
      {title}
    </h2>
  </header>
);

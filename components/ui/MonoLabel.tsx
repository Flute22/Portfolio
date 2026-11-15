import React from 'react';

type Tone = 'muted' | 'accent' | 'inherit';

const TONES: Record<Tone, string> = {
  muted: 'text-muted',
  accent: 'text-accent',
  inherit: '',
};

interface MonoLabelProps {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
  as?: 'span' | 'p' | 'h4';
}

/** Uppercase monospace label ("CORE STACK", "1 · PROBLEM"). */
export const MonoLabel: React.FC<MonoLabelProps> = ({ children, tone = 'muted', className = '', as: Tag = 'span' }) => (
  <Tag
    className={`m-0 font-mono text-[12px] font-medium uppercase leading-none tracking-[0.06em] ${TONES[tone]} ${className}`.trim()}
  >
    {children}
  </Tag>
);

import React from 'react';

type Tone = 'muted' | 'accent' | 'onAccent';

const TONES: Record<Tone, string> = {
  muted: 'text-muted',
  accent: 'text-accent',
  onAccent: 'text-white/90',
};

interface MonoLabelProps {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
  as?: 'p' | 'span' | 'h3' | 'h4';
}

/** Uppercase, wide-tracked monospace label ("CORE STACK", "1 · PROBLEM"). */
export const MonoLabel: React.FC<MonoLabelProps> = ({
  children,
  tone = 'muted',
  className = '',
  as = 'p',
}) => {
  const Tag = as;
  return (
    <Tag
      className={`font-mono text-xs uppercase leading-normal tracking-[0.12em] ${TONES[tone]} ${className}`.trim()}
    >
      {children}
    </Tag>
  );
};

import React from 'react';

type CardTone = 'default' | 'accent';

interface CardProps extends React.HTMLAttributes<HTMLElement> {
  as?: 'div' | 'article' | 'section';
  tone?: CardTone;
  /** Subtle border-colour change on hover (default tone only, from md up). */
  hoverable?: boolean;
  /**
   * Minimal on phones: no box, just a hairline above the content.
   * From md up it becomes a normal card. Callers set their own padding
   * (e.g. `px-0 py-5 md:p-8`).
   */
  flat?: boolean;
}

const TONES: Record<CardTone, string> = {
  default: 'bg-surface border border-line',
  accent: 'bg-accent-solid text-white border border-accent-solid',
};

const FLAT =
  'rounded-none border-0 border-t border-line bg-transparent md:rounded-card md:border md:bg-surface';

export const Card: React.FC<CardProps> = ({
  as: Tag = 'div',
  tone = 'default',
  hoverable = true,
  flat = false,
  className = '',
  children,
  ...rest
}) => {
  const hover =
    tone === 'default' && hoverable ? 'transition-colors duration-200 md:hover:border-accent/40' : '';
  const base = flat && tone === 'default' ? FLAT : `rounded-2xl md:rounded-card ${TONES[tone]}`;
  return (
    <Tag className={`${base} ${hover} ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  );
};

import React from 'react';

type CardTone = 'default' | 'accent';

interface CardProps extends React.HTMLAttributes<HTMLElement> {
  as?: 'div' | 'article' | 'section';
  tone?: CardTone;
  /** Subtle border-colour change on hover (default tone only). */
  hoverable?: boolean;
}

const TONES: Record<CardTone, string> = {
  default: 'bg-white border border-line',
  accent: 'bg-accent text-white border border-accent',
};

export const Card: React.FC<CardProps> = ({
  as: Tag = 'div',
  tone = 'default',
  hoverable = true,
  className = '',
  children,
  ...rest
}) => {
  const hover =
    tone === 'default' && hoverable ? 'transition-colors duration-200 hover:border-accent/40' : '';
  return (
    <Tag className={`rounded-card ${TONES[tone]} ${hover} ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  );
};

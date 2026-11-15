import React from 'react';
import { useReveal } from './useReveal';

type Tone = 'tile' | 'fill';

interface CardProps extends React.HTMLAttributes<HTMLElement> {
  as?: 'div' | 'article' | 'li' | 'a';
  /** tile = bordered surface; fill = solid green panel with white text */
  tone?: Tone;
  /** xl = 24px corners (main tiles), lg = 20px (list items) */
  radius?: 'xl' | 'lg';
  /** Lift 3px and strengthen the border on hover */
  lift?: boolean;
  /** Fade up on scroll (default on) */
  reveal?: boolean;
  /** Stagger for the reveal, in ms */
  delay?: number;
  /** Only for as="a" */
  href?: string;
  download?: string;
}

const TONES: Record<Tone, string> = {
  tile: 'border border-line bg-surface',
  fill: 'bg-fill text-white',
};

export const Card: React.FC<CardProps> = ({
  as: Tag = 'div',
  tone = 'tile',
  radius = 'xl',
  lift = false,
  reveal: revealOn = true,
  delay = 0,
  className = '',
  style,
  children,
  ...rest
}) => {
  const reveal = useReveal<HTMLElement>(delay, revealOn);
  const Element = Tag as React.ElementType;
  const rounded = radius === 'xl' ? 'rounded-3xl' : 'rounded-[20px]';
  const liftClasses =
    lift && reveal.settled
      ? 'transition-[transform,border-color] duration-[250ms] hover:-translate-y-[3px] hover:border-line2'
      : '';

  return (
    <Element
      ref={reveal.ref}
      style={{ ...reveal.style, ...style }}
      className={`${rounded} ${TONES[tone]} ${reveal.className} ${liftClasses} ${className}`.replace(/\s+/g, ' ').trim()}
      {...rest}
    >
      {children}
    </Element>
  );
};

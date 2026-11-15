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
  /** Soft glow that follows the pointer (tile cards on hover-capable devices) */
  spotlight?: boolean;
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
  spotlight = true,
  reveal: revealOn = true,
  delay = 0,
  className = '',
  style,
  onPointerMove,
  children,
  ...rest
}) => {
  const reveal = useReveal<HTMLElement>(delay, revealOn);
  const Element = Tag as React.ElementType;
  const rounded = radius === 'xl' ? 'rounded-3xl' : 'rounded-[20px]';
  const glow = spotlight && tone === 'tile';
  const liftClasses =
    lift && reveal.settled
      ? 'transition-[transform,border-color] duration-[250ms] hover:-translate-y-[3px] hover:border-line2'
      : '';

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (glow) {
      const el = e.currentTarget;
      const box = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - box.left}px`);
      el.style.setProperty('--my', `${e.clientY - box.top}px`);
    }
    onPointerMove?.(e);
  };

  return (
    <Element
      ref={reveal.ref}
      style={{ ...reveal.style, ...style }}
      onPointerMove={glow ? handlePointerMove : onPointerMove}
      className={`${rounded} ${TONES[tone]} ${glow ? 'spotlight' : ''} ${reveal.className} ${liftClasses} ${className}`
        .replace(/\s+/g, ' ')
        .trim()}
      {...rest}
    >
      {children}
    </Element>
  );
};

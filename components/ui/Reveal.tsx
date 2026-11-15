import React from 'react';
import { useReveal } from './useReveal';

interface RevealProps {
  as?: 'div' | 'li' | 'header';
  delay?: number;
  className?: string;
  children: React.ReactNode;
}

/** Plain wrapper that fades up on scroll. Use Card for tiles; this is for everything else. */
export const Reveal: React.FC<RevealProps> = ({ as: Tag = 'div', delay = 0, className = '', children }) => {
  const reveal = useReveal<HTMLElement>(delay);
  const Element = Tag as React.ElementType;
  return (
    <Element ref={reveal.ref} style={reveal.style} className={`${reveal.className} ${className}`.trim()}>
      {children}
    </Element>
  );
};

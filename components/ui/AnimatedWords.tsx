import React, { useEffect, useState } from 'react';
import { prefersReducedMotion, useReveal } from './useReveal';

interface AnimatedWordsProps {
  text: string;
  as?: 'h1' | 'h2';
  /** mount: play right away (hero). view: play when scrolled into view. */
  trigger?: 'mount' | 'view';
  /** Delay between words, in ms */
  stagger?: number;
  /** Delay before the first word, in ms */
  baseDelay?: number;
  id?: string;
  className?: string;
}

/** Heading whose words rise and fade in one after another. Plain text for reduced-motion visitors. */
export const AnimatedWords: React.FC<AnimatedWordsProps> = ({
  text,
  as: Tag = 'h2',
  trigger = 'view',
  stagger = 55,
  baseDelay = 0,
  id,
  className = '',
}) => {
  // In "view" mode the reveal hook watches the element; in "mount" mode it is switched off.
  const reveal = useReveal<HTMLElement>(0, trigger === 'view');
  const [armed, setArmed] = useState<boolean>(prefersReducedMotion);

  useEffect(() => {
    if (trigger !== 'mount') return;
    const frame = requestAnimationFrame(() => setArmed(true));
    return () => cancelAnimationFrame(frame);
  }, [trigger]);

  const shown = trigger === 'mount' ? armed : reveal.shown;
  const Element = Tag as React.ElementType;
  const words = text.split(' ');

  return (
    <Element ref={reveal.ref} id={id} className={className}>
      {words.map((word, i) => (
        <React.Fragment key={`${word}-${i}`}>
          <span
            className={`inline-block align-top transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] ${
              shown ? 'translate-y-0 opacity-100' : 'translate-y-[0.45em] opacity-0'
            }`}
            style={{ transitionDelay: shown ? `${baseDelay + i * stagger}ms` : '0ms' }}
          >
            {word}
          </span>
          {i < words.length - 1 ? ' ' : null}
        </React.Fragment>
      ))}
    </Element>
  );
};

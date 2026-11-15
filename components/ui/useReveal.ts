import { useEffect, useRef, useState } from 'react';

export const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Fade-up on first scroll into view (18px, 0.6s), matching the reference design.
 * Spread `ref`, `className` and `style` onto the element that should animate.
 * With `enabled = false`, or for visitors who prefer reduced motion, nothing animates.
 *
 * `settled` turns true once the entrance is over, so the element's own hover
 * transitions (e.g. a card lifting) can take over without the slow 0.6s timing.
 */
export function useReveal<T extends HTMLElement>(delay = 0, enabled = true) {
  const ref = useRef<T>(null);
  const skip = !enabled || prefersReducedMotion();
  const [shown, setShown] = useState<boolean>(skip);
  const [settled, setSettled] = useState<boolean>(skip);

  useEffect(() => {
    const el = ref.current;
    if (!el || shown) return;
    if (typeof IntersectionObserver === 'undefined') {
      setShown(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [shown]);

  useEffect(() => {
    if (!shown || settled) return;
    const timer = window.setTimeout(() => setSettled(true), 600 + delay + 60);
    return () => window.clearTimeout(timer);
  }, [shown, settled, delay]);

  const className = settled
    ? ''
    : `transition-[opacity,transform] duration-[600ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] ${
        shown ? 'translate-y-0 opacity-100' : 'translate-y-[18px] opacity-0'
      }`;
  const style = !settled && delay ? { transitionDelay: `${delay}ms` } : undefined;

  return { ref, className, style, settled, shown };
}

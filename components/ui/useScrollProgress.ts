import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from './useReveal';

/**
 * Scroll-linked progress for one element, with no React re-renders.
 * Writes `--p` (0 to 1: how far a line at 62% of the viewport has travelled through the element)
 * and `data-reached` (true once that line passes `markerOffset` px below the element's top).
 * Reduced-motion visitors get the finished state straight away.
 */
export function useScrollProgress<T extends HTMLElement>(markerOffset = 36) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      el.style.setProperty('--p', '1');
      el.dataset.reached = 'true';
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const line = window.innerHeight * 0.62;
      const travelled = line - rect.top;
      const progress = Math.min(1, Math.max(0, travelled / (rect.height + 12)));
      el.style.setProperty('--p', progress.toFixed(3));
      el.dataset.reached = travelled > markerOffset ? 'true' : 'false';
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
    };
  }, [markerOffset]);

  return ref;
}

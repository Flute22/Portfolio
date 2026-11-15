import React, { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from './useReveal';

/** "$1.20M" -> prefix "$", number "1.20", suffix "M". Values without a number ("Star") stay as they are. */
const PATTERN = /^([^\d]*)(\d+(?:\.\d+)?)(.*)$/;

const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);

interface CountUpProps {
  value: string;
  /** Animation length in ms */
  duration?: number;
}

/**
 * Counts the number inside `value` up from zero when it scrolls into view.
 * The final text reserves the layout space (so nothing jumps) and screen readers
 * get the final value only, never the in-between numbers.
 */
export const CountUp: React.FC<CountUpProps> = ({ value, duration = 1200 }) => {
  const match = PATTERN.exec(value);
  const ref = useRef<HTMLSpanElement>(null);
  const target = match ? parseFloat(match[2]) : 0;
  const decimals = match && match[2].includes('.') ? match[2].split('.')[1].length : 0;
  const [current, setCurrent] = useState<number>(() => (!match || prefersReducedMotion() ? target : 0));

  useEffect(() => {
    const el = ref.current;
    if (!el || !match || prefersReducedMotion() || typeof IntersectionObserver === 'undefined') {
      setCurrent(target);
      return;
    }
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          setCurrent(target * easeOutCubic(t));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
    // match is derived from value; target/duration cover everything else
  }, [value, target, duration]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!match) return <>{value}</>;

  const display = `${match[1]}${current.toFixed(decimals)}${match[3]}`;

  return (
    <span ref={ref} className="relative inline-block">
      <span className="sr-only">{value}</span>
      <span aria-hidden="true" className="invisible whitespace-nowrap">
        {value}
      </span>
      <span aria-hidden="true" className="absolute inset-0 whitespace-nowrap">
        {display}
      </span>
    </span>
  );
};

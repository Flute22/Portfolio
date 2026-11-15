import React from 'react';
import { useReveal } from './useReveal';

type ChipSize = 'md' | 'sm' | 'xs';

/** md: hero + skills · sm: project tools · xs: experience */
const SIZES: Record<ChipSize, string> = {
  md: 'rounded-[10px] px-3 py-2 text-[14px]',
  sm: 'rounded-lg px-2.5 py-1.5 text-[13px]',
  xs: 'rounded-lg px-2.5 py-[5px] text-[12.5px]',
};

const GAPS: Record<ChipSize, string> = { md: 'gap-2', sm: 'gap-1.5', xs: 'gap-1.5' };

const STAGGER_MS = 35;

interface ChipProps {
  children: React.ReactNode;
  size: ChipSize;
  index: number;
  shown: boolean;
  settled: boolean;
}

/** One tag. It pops in on a stagger, then hands over to a small hover lift. */
const Chip: React.FC<ChipProps> = ({ children, size, index, shown, settled }) => (
  <li
    className={`border border-line bg-chip font-mono font-medium text-ink ${SIZES[size]} ${
      settled
        ? 'transition-[transform,border-color] duration-200 hover:-translate-y-0.5 hover:border-line2'
        : `transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)] ${
            shown ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
          }`
    }`}
    style={!settled && shown ? { transitionDelay: `${index * STAGGER_MS}ms` } : undefined}
  >
    {children}
  </li>
);

/** Small monospace tags for tools, skills and the core stack; they appear one after another on scroll. */
export const ChipList: React.FC<{ items: string[]; label?: string; size?: ChipSize; className?: string }> = ({
  items,
  label,
  size = 'md',
  className = '',
}) => {
  // The hook only supplies "in view" + "entrance finished"; each chip animates itself.
  const reveal = useReveal<HTMLUListElement>(items.length * STAGGER_MS);

  return (
    <ul
      ref={reveal.ref}
      aria-label={label}
      className={`m-0 flex list-none flex-wrap p-0 ${GAPS[size]} ${className}`.trim()}
    >
      {items.map((item, i) => (
        <Chip key={item} size={size} index={i} shown={reveal.shown} settled={reveal.settled}>
          {item}
        </Chip>
      ))}
    </ul>
  );
};

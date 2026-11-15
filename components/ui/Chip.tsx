import React from 'react';

type ChipSize = 'md' | 'sm' | 'xs';

/** md: hero + skills · sm: project tools · xs: experience */
const SIZES: Record<ChipSize, string> = {
  md: 'rounded-[10px] px-3 py-2 text-[14px]',
  sm: 'rounded-lg px-2.5 py-1.5 text-[13px]',
  xs: 'rounded-lg px-2.5 py-[5px] text-[12.5px]',
};

const GAPS: Record<ChipSize, string> = { md: 'gap-2', sm: 'gap-1.5', xs: 'gap-1.5' };

/** Small monospace tag for tools, skills and the core stack. */
export const Chip: React.FC<{ children: React.ReactNode; size?: ChipSize }> = ({ children, size = 'md' }) => (
  <li className={`border border-line bg-chip font-mono font-medium text-ink ${SIZES[size]}`}>{children}</li>
);

export const ChipList: React.FC<{ items: string[]; label?: string; size?: ChipSize; className?: string }> = ({
  items,
  label,
  size = 'md',
  className = '',
}) => (
  <ul aria-label={label} className={`m-0 flex list-none flex-wrap p-0 ${GAPS[size]} ${className}`.trim()}>
    {items.map((item) => (
      <Chip key={item} size={size}>
        {item}
      </Chip>
    ))}
  </ul>
);

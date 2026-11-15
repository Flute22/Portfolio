import React from 'react';

interface ChipProps {
  children: React.ReactNode;
  className?: string;
}

/** Small monospace tag used for tools, skills and the core stack. */
export const Chip: React.FC<ChipProps> = ({ children, className = '' }) => (
  <span
    className={`inline-flex items-center rounded-chip border border-tint-line bg-tint px-3 py-1.5 font-mono text-[13px] leading-none text-ink ${className}`.trim()}
  >
    {children}
  </span>
);

export const ChipList: React.FC<{ items: string[]; label?: string; className?: string }> = ({
  items,
  label,
  className = '',
}) => (
  <ul aria-label={label} className={`flex flex-wrap gap-2 ${className}`.trim()}>
    {items.map((item) => (
      <li key={item}>
        <Chip>{item}</Chip>
      </li>
    ))}
  </ul>
);

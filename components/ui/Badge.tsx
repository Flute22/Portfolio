import React from 'react';

/** Green category badge, e.g. "POWER BI". */
export const Badge: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <span
    className={`inline-block rounded-chip border border-tint-line bg-tint px-2.5 py-1 font-mono text-[11px] font-medium uppercase leading-none tracking-[0.12em] text-accent ${className}`.trim()}
  >
    {children}
  </span>
);

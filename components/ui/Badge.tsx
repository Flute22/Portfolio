import React from 'react';

/** Category badge on a project, e.g. "POWER BI". */
export const Badge: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="self-start rounded-lg border border-line bg-chip px-2.5 py-[5px] font-mono text-[12px] font-medium uppercase leading-none tracking-[0.05em] text-accent">
    {children}
  </span>
);

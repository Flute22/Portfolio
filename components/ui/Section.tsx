import React from 'react';

interface SectionProps {
  id: string;
  /** id of the heading inside; gives the <section> an accessible name */
  labelledBy: string;
  children: React.ReactNode;
  className?: string;
}

/** Page-width container with consistent vertical rhythm. */
export const Section: React.FC<SectionProps> = ({ id, labelledBy, children, className = '' }) => (
  <section
    id={id}
    aria-labelledby={labelledBy}
    className={`py-8 md:py-10 ${className}`.trim()}
  >
    <div className="mx-auto w-full max-w-page px-5 sm:px-8">{children}</div>
  </section>
);

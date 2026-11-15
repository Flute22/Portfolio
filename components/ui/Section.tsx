import React from 'react';

interface SectionProps {
  id: string;
  /** id of the heading inside; gives the <section> an accessible name */
  labelledBy: string;
  children: React.ReactNode;
  className?: string;
  /**
   * When set, desktop (>=1024px) becomes a 4 / 8 column split: `aside` (the section
   * header) sticks on the left while `children` scroll on the right. On smaller
   * screens it stacks: header first, then content.
   */
  aside?: React.ReactNode;
}

/** Page-width container (max 1280px, 24px / 48px side padding) with consistent vertical rhythm. */
export const Section: React.FC<SectionProps> = ({ id, labelledBy, children, className = '', aside }) => (
  <section id={id} aria-labelledby={labelledBy} className={`py-8 md:py-10 ${className}`.trim()}>
    <div className="mx-auto w-full max-w-page px-6 lg:px-12">
      {aside ? (
        <div className="lg:grid lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">{aside}</div>
          </div>
          <div className="lg:col-span-8">{children}</div>
        </div>
      ) : (
        children
      )}
    </div>
  </section>
);

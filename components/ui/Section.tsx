import React from 'react';

interface SectionProps {
  id: string;
  /** id of the heading inside; gives the <section> an accessible name */
  labelledBy: string;
  children: React.ReactNode;
}

/** Page container (max 1320px) with the reference's large gap above each section. */
export const Section: React.FC<SectionProps> = ({ id, labelledBy, children }) => (
  <section
    id={id}
    aria-labelledby={labelledBy}
    className="container-page scroll-mt-[68px] pt-[clamp(72px,10vw,128px)]"
  >
    {children}
  </section>
);

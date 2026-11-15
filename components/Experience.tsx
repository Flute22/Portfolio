import React from 'react';
import { EXPERIENCE_DATA, EXPERIENCE_TITLE } from '../constants';
import { Card } from './ui/Card';
import { ChipList } from './ui/Chip';
import { Reveal } from './ui/Reveal';
import { Section } from './ui/Section';
import { SectionHeader } from './ui/SectionHeader';
import { useScrollProgress } from './ui/useScrollProgress';

/**
 * The rail beside one timeline entry. As you scroll, a green line draws down it
 * (driven by --p from useScrollProgress) and the marker fills once you reach the entry.
 */
const TimelineRail: React.FC = () => {
  const ref = useScrollProgress<HTMLDivElement>();
  return (
    <div ref={ref} aria-hidden="true" className="group relative flex justify-center">
      <span className="absolute -bottom-3 top-0 w-px bg-line2" />
      <span className="absolute -bottom-3 top-0 w-px origin-top scale-y-[var(--p,0)] bg-accent" />
      <span className="relative mt-[30px] h-[13px] w-[13px] rounded-full border-2 border-accent bg-page transition-colors duration-300 group-data-[reached=true]:bg-accent" />
    </div>
  );
};

export const Experience: React.FC = () => (
  <Section id="experience" labelledBy="experience-title">
    <SectionHeader index="04" label="Experience" title={EXPERIENCE_TITLE} titleId="experience-title" />

    <ol className="relative m-0 flex list-none flex-col gap-3 p-0">
      {EXPERIENCE_DATA.map((item) => (
        <Reveal
          key={item.id}
          as="li"
          className="relative grid grid-cols-[28px_minmax(0,1fr)] gap-x-[clamp(12px,2vw,24px)]"
        >
          <TimelineRail />

          <Card reveal={false} radius="lg" className="flex flex-col gap-3 p-[clamp(20px,3vw,28px)]">
            <div className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-2">
              <h3 className="m-0 text-[clamp(19px,2vw,22px)] font-semibold tracking-[-0.015em]">{item.role}</h3>
              <span className="whitespace-nowrap font-mono text-[13px] font-medium text-muted">{item.period}</span>
            </div>
            {item.company && <div className="text-[15px] font-medium text-accent">{item.company}</div>}
            <p className="m-0 max-w-[75ch] text-pretty text-[15px] leading-[1.6] text-muted">{item.description}</p>
            <ChipList items={item.skills} label={`${item.role} skills`} size="xs" className="mt-1" />
          </Card>
        </Reveal>
      ))}
    </ol>
  </Section>
);

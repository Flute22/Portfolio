import React from 'react';
import { ABOUT_DATA } from '../constants';
import { Card } from './ui/Card';
import { Section } from './ui/Section';
import { SectionHeader } from './ui/SectionHeader';

export const About: React.FC = () => {
  const [lead, ...rest] = ABOUT_DATA.paragraphs;

  return (
    <Section id="about" labelledBy="about-title">
      <SectionHeader index="01" label="About" title={ABOUT_DATA.title} titleId="about-title" />

      <div className="flex flex-wrap gap-3">
        <Card className="flex flex-[3_1_480px] flex-col gap-5 text-pretty p-[clamp(24px,4vw,44px)] text-[clamp(17px,1.5vw,19px)] leading-[1.6]">
          <p className="m-0">{lead}</p>
          {rest.map((paragraph) => (
            <p key={paragraph} className="m-0 text-muted">
              {paragraph}
            </p>
          ))}
        </Card>

        <ul className="m-0 flex flex-[2_1_340px] list-none flex-col gap-3 p-0">
          {ABOUT_DATA.pillars.map((pillar) => (
            <Card
              key={pillar.number}
              as="li"
              radius="lg"
              className="grid grid-cols-[36px_minmax(0,1fr)] gap-x-3.5 gap-y-1 px-6 py-[22px]"
            >
              <span className="row-span-2 font-mono text-[13px] font-medium leading-[1.6] text-accent">
                {pillar.number}
              </span>
              <h3 className="m-0 text-[18px] font-semibold tracking-[-0.01em]">{pillar.title}</h3>
              <p className="m-0 text-[15px] leading-[1.5] text-muted">{pillar.description}</p>
            </Card>
          ))}
        </ul>
      </div>
    </Section>
  );
};

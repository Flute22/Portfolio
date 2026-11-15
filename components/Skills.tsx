import React from 'react';
import { SKILLS_DATA, SKILLS_TITLE } from '../constants';
import { Card } from './ui/Card';
import { ChipList } from './ui/Chip';
import { Section } from './ui/Section';
import { SectionHeader } from './ui/SectionHeader';

export const Skills: React.FC = () => (
  <Section id="skills" labelledBy="skills-title">
    <SectionHeader index="02" label="Skills" title={SKILLS_TITLE} titleId="skills-title" />

    <div className="flex flex-wrap gap-3">
      {SKILLS_DATA.map((group) => (
        <Card key={group.category} className="flex flex-[1_1_440px] flex-col gap-[18px] p-[clamp(22px,3vw,32px)]">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="m-0 text-[22px] font-semibold tracking-[-0.015em]">{group.category}</h3>
            <span className="font-mono text-[12px] font-medium text-muted">{group.tag}</span>
          </div>
          <p className="m-0 max-w-[52ch] text-[15px] leading-[1.5] text-muted">{group.description}</p>
          <ChipList items={group.items} label={group.category} />
        </Card>
      ))}
    </div>
  </Section>
);

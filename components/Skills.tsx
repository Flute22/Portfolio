import React from 'react';
import { SKILLS_DATA, SKILLS_TITLE } from '../constants';
import { Card } from './ui/Card';
import { ChipList } from './ui/Chip';
import { Section } from './ui/Section';
import { SectionHeader } from './ui/SectionHeader';
import { ScrollReveal } from './ui/ScrollReveal';

export const Skills: React.FC = () => (
  <Section id="skills" labelledBy="skills-title">
    <SectionHeader index="02" label="Skills" title={SKILLS_TITLE} titleId="skills-title" />

    <ul className="grid md:grid-cols-2 md:gap-4">
      {SKILLS_DATA.map((group, i) => (
        <li key={group.category}>
          <ScrollReveal delay={(i % 2) * 60} className="h-full">
            <Card flat className="h-full px-0 py-5 md:p-8">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-xl font-semibold tracking-tight">{group.category}</h3>
                <span className="font-mono text-sm text-muted">{group.tag}</span>
              </div>
              <p className="mt-3 max-w-[30rem] text-[15px] leading-relaxed text-muted">
                {group.description}
              </p>
              <ChipList items={group.items} label={group.category} className="mt-6" />
            </Card>
          </ScrollReveal>
        </li>
      ))}
    </ul>
  </Section>
);

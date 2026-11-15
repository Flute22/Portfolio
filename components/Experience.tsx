import React from 'react';
import { EXPERIENCE_DATA, EXPERIENCE_TITLE } from '../constants';
import { Card } from './ui/Card';
import { ChipList } from './ui/Chip';
import { Section } from './ui/Section';
import { SectionHeader } from './ui/SectionHeader';
import { ScrollReveal } from './ui/ScrollReveal';

export const Experience: React.FC = () => (
  <Section id="experience" labelledBy="experience-title">
    <SectionHeader index="04" label="Experience" title={EXPERIENCE_TITLE} titleId="experience-title" />

    <ol className="relative grid gap-3 pl-8 sm:pl-11 md:gap-4">
      {/* vertical rail */}
      <span aria-hidden="true" className="absolute bottom-0 left-[7px] top-0 w-px bg-line" />

      {EXPERIENCE_DATA.map((item) => (
        <li key={item.id} className="relative">
          {/* hollow marker */}
          <span
            aria-hidden="true"
            className="absolute -left-8 top-7 h-3.5 w-3.5 rounded-full border-2 border-accent bg-page sm:-left-11"
          />
          <ScrollReveal>
            <Card className="p-6 sm:p-7">
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <h3 className="text-lg font-semibold tracking-tight sm:text-xl">{item.role}</h3>
                <p className="font-mono text-sm text-muted">{item.period}</p>
              </div>
              {item.company && <p className="mt-2 text-[15px] font-medium text-accent">{item.company}</p>}
              <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-muted">{item.description}</p>
              <ChipList items={item.skills} label={`${item.role} skills`} className="mt-5" />
            </Card>
          </ScrollReveal>
        </li>
      ))}
    </ol>
  </Section>
);

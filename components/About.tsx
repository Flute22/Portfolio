import React from 'react';
import { ABOUT_DATA } from '../constants';
import { Card } from './ui/Card';
import { Section } from './ui/Section';
import { SectionHeader } from './ui/SectionHeader';
import { ScrollReveal } from './ui/ScrollReveal';

export const About: React.FC = () => {
  const [lead, ...rest] = ABOUT_DATA.paragraphs;

  return (
    <Section id="about" labelledBy="about-title">
      <SectionHeader index="01" label="About" title={ABOUT_DATA.title} titleId="about-title" />

      <div className="grid gap-3 md:gap-4 lg:grid-cols-2">
        <ScrollReveal className="h-full">
          <Card className="h-full p-6 sm:p-8 lg:p-10">
            <p className="text-[17px] leading-[1.65] text-ink sm:text-lg">{lead}</p>
            {rest.map((paragraph) => (
              <p key={paragraph} className="mt-5 text-[17px] leading-[1.65] text-muted sm:text-lg">
                {paragraph}
              </p>
            ))}
          </Card>
        </ScrollReveal>

        <ol className="grid gap-3 md:gap-4">
          {ABOUT_DATA.pillars.map((pillar, i) => (
            <li key={pillar.number}>
              <ScrollReveal delay={i * 60} className="h-full">
                <Card className="flex h-full gap-5 p-5 sm:gap-7 sm:p-6">
                  <span className="w-6 shrink-0 pt-1 font-mono text-sm text-accent">{pillar.number}</span>
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight">{pillar.title}</h3>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{pillar.description}</p>
                  </div>
                </Card>
              </ScrollReveal>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
};

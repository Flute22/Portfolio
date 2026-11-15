import React from 'react';
import { ArrowRight } from 'lucide-react';
import { CASE_STUDIES_DATA, CASE_STUDIES_TITLE } from '../constants';
import { Card } from './ui/Card';
import { MonoLabel } from './ui/MonoLabel';
import { Section } from './ui/Section';
import { SectionHeader } from './ui/SectionHeader';
import { ScrollReveal } from './ui/ScrollReveal';

export const CaseStudies: React.FC = () => (
  <Section id="case-studies" labelledBy="case-studies-title">
    <SectionHeader index="05" label="Case studies" title={CASE_STUDIES_TITLE} titleId="case-studies-title" />

    <ul className="grid gap-3 md:gap-4 lg:grid-cols-2">
      {CASE_STUDIES_DATA.map((study, i) => {
        const titleId = `${study.id}-title`;
        return (
          <li key={study.id}>
            <ScrollReveal delay={i * 60} className="h-full">
              <Card as="article" aria-labelledby={titleId} className="flex h-full flex-col p-6 sm:p-8">
                <MonoLabel tone="accent">CS / {String(i + 1).padStart(2, '0')}</MonoLabel>
                <h3 id={titleId} className="mt-5 text-xl font-semibold leading-snug tracking-tight sm:text-2xl">
                  {study.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{study.description}</p>

                <div className="mt-auto border-t border-line pt-5">
                  <MonoLabel as="h4">Key insights</MonoLabel>
                  <ul className="mt-4 space-y-3">
                    {study.insights.map((insight) => (
                      <li key={insight} className="flex gap-3 text-[15px] leading-relaxed text-ink">
                        <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                        <span>{insight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </ScrollReveal>
          </li>
        );
      })}
    </ul>
  </Section>
);

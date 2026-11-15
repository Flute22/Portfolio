import React from 'react';
import { CASE_STUDIES_DATA, CASE_STUDIES_TITLE } from '../constants';
import { Card } from './ui/Card';
import { MonoLabel } from './ui/MonoLabel';
import { Section } from './ui/Section';
import { SectionHeader } from './ui/SectionHeader';

export const CaseStudies: React.FC = () => (
  <Section id="case-studies" labelledBy="case-studies-title">
    <SectionHeader index="05" label="Case studies" title={CASE_STUDIES_TITLE} titleId="case-studies-title" />

    <div className="flex flex-wrap gap-3">
      {CASE_STUDIES_DATA.map((study, i) => {
        const titleId = `${study.id}-title`;
        return (
          <Card
            key={study.id}
            as="article"
            aria-labelledby={titleId}
            className="flex flex-[1_1_440px] flex-col gap-5 p-[clamp(22px,3vw,36px)]"
          >
            <span className="font-mono text-[13px] font-medium text-accent">CS / {String(i + 1).padStart(2, '0')}</span>
            <h3
              id={titleId}
              className="m-0 text-balance text-[clamp(24px,2.4vw,30px)] font-semibold leading-[1.15] tracking-[-0.02em]"
            >
              {study.title}
            </h3>
            <p className="m-0 text-pretty text-[16px] leading-[1.6] text-muted">{study.description}</p>

            <div className="flex flex-col gap-3.5 border-t border-line pt-[18px]">
              <MonoLabel as="h4">Key insights</MonoLabel>
              <ol className="m-0 flex list-none flex-col gap-3 p-0">
                {study.insights.map((insight) => (
                  <li key={insight} className="grid grid-cols-[24px_minmax(0,1fr)] gap-2.5 text-[15px] leading-[1.55]">
                    <span aria-hidden="true" className="text-[15px] font-semibold leading-[1.55] text-accent">
                      →
                    </span>
                    <span>{insight}</span>
                  </li>
                ))}
              </ol>
            </div>
          </Card>
        );
      })}
    </div>
  </Section>
);

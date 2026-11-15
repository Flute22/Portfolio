import React, { useState } from 'react';
import { ArrowUpRight, Github } from 'lucide-react';
import { PROJECTS_DATA, PROJECTS_TITLE, PROJECT_FILTERS } from '../constants';
import type { Project, ProjectCategory } from '../types';
import { Badge } from './ui/Badge';
import { Card } from './ui/Card';
import { ChipList } from './ui/Chip';
import { CountUp } from './ui/CountUp';
import { MonoLabel } from './ui/MonoLabel';
import { Section } from './ui/Section';
import { SectionHeader } from './ui/SectionHeader';

type Filter = 'All' | ProjectCategory;

/** One of the four cells in a project's detail grid. */
const cell = 'flex flex-[1_1_230px] flex-col bg-surface p-5';
const bodyText = 'm-0 text-pretty text-[15px] leading-[1.55]';

const FilterTabs: React.FC<{ value: Filter; onChange: (next: Filter) => void }> = ({ value, onChange }) => (
  <div
    role="group"
    aria-label="Filter projects"
    className="flex flex-wrap gap-0.5 rounded-full border border-line bg-surface p-1"
  >
    {PROJECT_FILTERS.map((tab) => {
      const on = value === tab.key;
      return (
        <button
          key={tab.key}
          type="button"
          aria-pressed={on}
          onClick={() => onChange(tab.key)}
          className={`min-h-10 cursor-pointer rounded-full border-0 px-4 text-[14px] font-medium transition-colors ${
            on ? 'bg-ink text-page' : 'bg-transparent text-muted hover:text-ink'
          }`}
        >
          {tab.label}
        </button>
      );
    })}
  </div>
);

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const titleId = `${project.id}-title`;

  return (
    <Card
      as="article"
      reveal={false}
      lift
      aria-labelledby={titleId}
      className="flex flex-col gap-7 p-[clamp(22px,3.4vw,40px)] transition-[transform,border-color] duration-[250ms]"
    >
      <header className="flex flex-wrap items-start justify-between gap-5">
        <div className="flex max-w-[720px] flex-col gap-3">
          <Badge>{project.badge}</Badge>
          <h3
            id={titleId}
            className="m-0 text-balance text-[clamp(24px,2.6vw,32px)] font-semibold leading-[1.12] tracking-[-0.02em]"
          >
            {project.title}
          </h3>
        </div>
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View ${project.title} on GitHub (opens in new tab)`}
          className="group flex min-h-11 items-center gap-2 rounded-xl border border-line2 px-4 text-[15px] font-medium text-ink no-underline transition-colors hover:border-accent"
        >
          <Github className="h-[17px] w-[17px]" aria-hidden="true" />
          GitHub
          <ArrowUpRight
            className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </a>
      </header>

      {/* Problem / Approach / Tools / Result: 1px gaps over the line colour draw the dividers */}
      <div className="flex flex-wrap gap-px overflow-hidden rounded-2xl border border-line bg-line">
        <div className={`${cell} gap-2`}>
          <MonoLabel>1 · Problem</MonoLabel>
          <p className={bodyText}>{project.problem}</p>
        </div>
        <div className={`${cell} gap-2`}>
          <MonoLabel>2 · Approach</MonoLabel>
          <p className={bodyText}>{project.approach}</p>
        </div>
        <div className={`${cell} gap-2.5`}>
          <MonoLabel>3 · Tools</MonoLabel>
          <ChipList items={project.tools} label="Tools used" size="sm" />
        </div>
        <div className={`${cell} gap-3`}>
          <MonoLabel tone="accent">4 · Result</MonoLabel>
          <dl className="m-0 flex flex-wrap gap-5">
            {project.metrics.map((metric) => (
              <div key={metric.label} className="flex flex-col-reverse gap-1">
                <dt className="text-[13px] text-muted">{metric.label}</dt>
                <dd className="m-0 text-[28px] font-semibold leading-none tracking-[-0.02em] text-accent">
                  <CountUp value={metric.value} />
                </dd>
              </div>
            ))}
          </dl>
          <p className={bodyText}>{project.outcome}</p>
        </div>
      </div>
    </Card>
  );
};

export const Projects: React.FC = () => {
  const [filter, setFilter] = useState<Filter>('All');
  const visible = PROJECTS_DATA.filter((p) => filter === 'All' || p.category === filter);

  return (
    <Section id="projects" labelledBy="projects-title">
      <SectionHeader
        index="03"
        label="Projects"
        title={PROJECTS_TITLE}
        titleId="projects-title"
        actions={<FilterTabs value={filter} onChange={setFilter} />}
      />

      <div className="flex flex-col gap-3" aria-live="polite">
        {visible.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </Section>
  );
};

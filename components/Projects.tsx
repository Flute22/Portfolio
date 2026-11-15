import React from 'react';
import { ArrowUpRight, Github } from 'lucide-react';
import { PROJECTS_DATA, PROJECTS_TITLE } from '../constants';
import type { Project } from '../types';
import { Badge } from './ui/Badge';
import { Card } from './ui/Card';
import { ChipList } from './ui/Chip';
import { Metric } from './ui/Metric';
import { MonoLabel } from './ui/MonoLabel';
import { Section } from './ui/Section';
import { SectionHeader } from './ui/SectionHeader';
import { ScrollReveal } from './ui/ScrollReveal';

const cell = 'p-5 sm:p-6 lg:p-5 xl:p-6';
const bodyText = 'mt-3 text-[15px] leading-relaxed text-ink sm:text-base';

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const titleId = `${project.id}-title`;

  return (
    <Card as="article" aria-labelledby={titleId} className="p-4 sm:p-6 lg:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4 px-1 sm:px-0">
        <div className="min-w-[14rem] flex-1">
          <Badge>{project.badge}</Badge>
          <h3 id={titleId} className="mt-4 text-xl font-semibold tracking-tight sm:text-2xl">
            {project.title}
          </h3>
        </div>
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} on GitHub (opens in a new tab)`}
          className="inline-flex h-11 items-center gap-2 rounded-xl border border-line bg-surface px-4 text-sm font-medium text-ink transition-colors hover:border-accent/50"
        >
          <Github className="h-4 w-4" aria-hidden="true" />
          GitHub
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>

      {/* 2 x 2 detail grid */}
      <dl className="mt-6 grid grid-cols-1 overflow-hidden rounded-inner border border-line md:grid-cols-2 lg:grid-cols-4">
        <div className={`${cell} border-b border-line md:border-r lg:border-b-0`}>
          <dt>
            <MonoLabel>1 · Problem</MonoLabel>
          </dt>
          <dd className={bodyText}>{project.problem}</dd>
        </div>

        <div className={`${cell} border-b border-line lg:border-b-0 lg:border-r`}>
          <dt>
            <MonoLabel>2 · Approach</MonoLabel>
          </dt>
          <dd className={bodyText}>{project.approach}</dd>
        </div>

        <div className={`${cell} border-b border-line md:border-b-0 md:border-r`}>
          <dt>
            <MonoLabel>3 · Tools</MonoLabel>
          </dt>
          <dd className="mt-3">
            <ChipList items={project.tools} label="Tools used" />
          </dd>
        </div>

        <div className={cell}>
          <dt>
            <MonoLabel tone="accent">4 · Result</MonoLabel>
          </dt>
          <dd className="mt-3">
            <div className="flex flex-wrap gap-x-8 gap-y-4">
              {project.metrics.map((m) => (
                <Metric key={m.label} value={m.value} label={m.label} />
              ))}
            </div>
            <p className="mt-5 text-[15px] leading-relaxed text-ink sm:text-base">{project.outcome}</p>
          </dd>
        </div>
      </dl>
    </Card>
  );
};

export const Projects: React.FC = () => (
  <Section id="projects" labelledBy="projects-title">
    <SectionHeader index="03" label="Projects" title={PROJECTS_TITLE} titleId="projects-title" />

    <div className="grid gap-3 md:gap-4">
      {PROJECTS_DATA.map((project) => (
        <ScrollReveal key={project.id}>
          <ProjectCard project={project} />
        </ScrollReveal>
      ))}
    </div>
  </Section>
);

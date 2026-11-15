export interface HeroHighlight {
  /** Big figure, e.g. "82%" */
  value: string;
  text: string;
}

export interface HeroData {
  name: string;
  eyebrow: string;
  headline: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  current: { title: string; organisation: string; period: string };
  /** Solid green stat card */
  featuredStat: HeroHighlight;
  /** Small stat card next to the core stack */
  secondaryStat: HeroHighlight;
  stack: string[];
}

export interface AboutPillar {
  number: string;
  title: string;
  description: string;
}

export interface AboutData {
  title: string;
  /** First paragraph is emphasised, the rest are muted. */
  paragraphs: string[];
  pillars: AboutPillar[];
}

export interface SkillGroup {
  category: string;
  /** Short mono tag shown on the right of the card title */
  tag: string;
  description: string;
  items: string[];
}

export interface ProjectMetric {
  value: string;
  label: string;
}

export interface Project {
  id: string;
  /** Badge text, e.g. "Power BI" */
  badge: string;
  title: string;
  link: string;
  problem: string;
  approach: string;
  tools: string[];
  metrics: ProjectMetric[];
  outcome: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company?: string;
  period: string;
  description: string;
  skills: string[];
}

export interface CaseStudy {
  id: string;
  title: string;
  description: string;
  insights: string[];
}

export type SocialKind = 'github' | 'linkedin';

export interface SocialLink {
  kind: SocialKind;
  label: string;
  href: string;
}

export interface NavLink {
  label: string;
  /** Section id without the leading # */
  id: string;
}

import React from 'react';

export interface Project {
  id: string;
  title: string;
  category: 'ML' | 'Analytics' | 'Engineering';
  description: string;
  metrics: { label: string; value: string }[];
  tags: string[];
  chartData: { name: string; value: number }[];
  link?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  skills: string[];
}

export interface SkillItem {
  name: string;
  description: string;
}

export interface SkillGroup {
  category: string;
  items: SkillItem[];
  icon: React.ReactNode;
}

export interface InsightType {
  text: string;
  visualType: 'growth' | 'network' | 'reduction' | 'transformation';
}

export interface CaseStudy {
  id: string;
  title: string;
  description: string;
  keyInsights: InsightType[];
  link?: string;
}
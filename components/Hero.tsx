import React from 'react';
import { ArrowRight, Download } from 'lucide-react';
import { HERO_DATA, RESUME_FILE_NAME, RESUME_URL } from '../constants';
import { Card } from './ui/Card';
import { ChipList } from './ui/Chip';
import { MonoLabel } from './ui/MonoLabel';
import { ScrollReveal } from './ui/ScrollReveal';

const Dot: React.FC = () => (
  <span aria-hidden="true" className="inline-block h-2 w-2 shrink-0 rounded-full bg-accent" />
);

export const Hero: React.FC = () => {
  const { eyebrow, headline, description, primaryCta, secondaryCta, current, featuredStat, secondaryStat, stack } =
    HERO_DATA;

  return (
    <section id="top" aria-labelledby="hero-title" className="pb-2 pt-24 md:pt-28">
      <div className="mx-auto w-full max-w-page px-5 sm:px-8">
        {/* Bento: 1 col on phones, 3 on tablets, 4 on desktop */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-4">
          {/* Headline */}
          <ScrollReveal className="sm:col-span-3 lg:col-span-2 lg:row-span-2">
            <Card className="flex h-full flex-col p-6 sm:p-8 lg:p-10">
              <div className="flex items-center gap-2.5">
                <Dot />
                <MonoLabel tone="accent">{eyebrow}</MonoLabel>
              </div>

              <h1
                id="hero-title"
                className="mt-8 max-w-[20ch] text-balance text-[2.25rem] font-semibold leading-[1.02] tracking-[-0.035em] sm:mt-10 sm:text-[2.625rem] lg:mt-14 lg:text-[3rem]"
              >
                {headline}
              </h1>

              <p className="mt-6 max-w-[34rem] text-base leading-relaxed text-body sm:text-[17px]">
                {description}
              </p>

              <div className="mt-auto flex flex-wrap gap-3 pt-8">
                <a
                  href="#projects"
                  className="inline-flex h-12 items-center gap-2 rounded-2xl bg-accent px-6 text-[15px] font-medium text-white transition-colors hover:bg-accent-dark"
                >
                  {primaryCta}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href="#contact"
                  className="inline-flex h-12 items-center rounded-2xl border border-line bg-white px-6 text-[15px] font-medium text-ink transition-colors hover:border-accent/50"
                >
                  {secondaryCta}
                </a>
              </div>
            </Card>
          </ScrollReveal>

          {/* Currently */}
          <ScrollReveal delay={60} className="sm:col-span-3 lg:col-span-2">
            <Card className="flex h-full flex-col justify-center p-6 sm:p-8">
              <div className="flex items-center gap-2.5">
                <Dot />
                <MonoLabel>Currently</MonoLabel>
              </div>
              <p className="mt-4 text-xl font-semibold leading-snug tracking-tight text-ink">
                {current.title}
              </p>
              <p className="mt-2 text-[15px] text-muted">
                {current.organisation} · {current.period}
              </p>
            </Card>
          </ScrollReveal>

          {/* 82% */}
          <ScrollReveal delay={120} className="sm:col-span-3 lg:col-span-2">
            <Card tone="accent" className="flex h-full flex-col justify-center p-6 sm:p-8">
              <p className="text-[3.5rem] font-semibold leading-none tracking-[-0.04em] sm:text-6xl">
                {featuredStat.value}
              </p>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white sm:text-base">
                {featuredStat.text}
              </p>
            </Card>
          </ScrollReveal>

          {/* Core stack */}
          <ScrollReveal delay={60} className="sm:col-span-2 lg:col-span-2">
            <Card className="h-full p-6 sm:p-8">
              <MonoLabel>Core stack</MonoLabel>
              <ChipList items={stack} label="Core stack" className="mt-4" />
            </Card>
          </ScrollReveal>

          {/* $1.20M */}
          <ScrollReveal delay={120} className="sm:col-span-1">
            <Card className="flex h-full flex-col justify-between gap-6 p-6 sm:p-7">
              <p className="text-[2rem] font-semibold leading-none tracking-[-0.03em] text-ink sm:text-4xl">
                {secondaryStat.value}
              </p>
              <p className="text-sm leading-relaxed text-muted">{secondaryStat.text}</p>
            </Card>
          </ScrollReveal>

          {/* Resume */}
          <ScrollReveal delay={180} className="sm:col-span-3 lg:col-span-1">
            <Card className="h-full p-0">
              <a
                href={RESUME_URL}
                download={RESUME_FILE_NAME}
                className="flex h-full flex-col justify-between gap-6 rounded-card p-6 sm:p-7"
              >
                <Download className="h-6 w-6 text-accent" aria-hidden="true" />
                <span>
                  <span className="block text-lg font-semibold tracking-tight text-ink">
                    Download resume
                  </span>
                  <span className="mt-1 block font-mono text-sm text-muted">PDF</span>
                </span>
              </a>
            </Card>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

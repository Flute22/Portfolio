import React from 'react';
import { ArrowRight, Download } from 'lucide-react';
import { HERO_DATA, RESUME_FILE_NAME, RESUME_URL } from '../constants';
import { Card } from './ui/Card';
import { ChipList } from './ui/Chip';
import { MonoLabel } from './ui/MonoLabel';

const Dot: React.FC = () => (
  <span aria-hidden="true" className="inline-block h-2 w-2 shrink-0 rounded-full bg-accent" />
);

export const Hero: React.FC = () => {
  const { eyebrow, headline, description, primaryCta, secondaryCta, current, featuredStat, secondaryStat, stack } =
    HERO_DATA;

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="container-page flex flex-col gap-3 pt-[clamp(16px,2vw,24px)]"
    >
      <div className="flex flex-wrap gap-3">
        {/* Headline */}
        <Card className="flex min-h-[clamp(420px,52vw,540px)] flex-[3_1_560px] flex-col justify-between gap-9 p-[clamp(24px,4.5vw,56px)]">
          <div className="flex items-center gap-2.5">
            <Dot />
            <MonoLabel tone="accent">{eyebrow}</MonoLabel>
          </div>

          <h1
            id="hero-title"
            className="m-0 max-w-[16ch] text-balance text-[clamp(40px,6.4vw,76px)] font-semibold leading-none tracking-[-0.035em]"
          >
            {headline}
          </h1>

          <div className="flex flex-wrap items-end justify-between gap-6">
            <p className="m-0 max-w-[470px] text-pretty text-[clamp(16px,1.5vw,19px)] leading-[1.55] text-muted">
              {description}
            </p>
            <div className="flex flex-wrap gap-2.5">
              <a
                href="#projects"
                className="flex h-[52px] items-center gap-2.5 rounded-[14px] bg-accent px-6 text-[16px] font-semibold text-accent-on no-underline transition-transform hover:-translate-y-0.5"
              >
                {primaryCta}
                <ArrowRight className="h-[17px] w-[17px]" aria-hidden="true" />
              </a>
              <a
                href="#contact"
                className="flex h-[52px] items-center rounded-[14px] border border-line2 px-6 text-[16px] font-medium text-ink no-underline transition-[transform,border-color] hover:-translate-y-0.5 hover:border-muted"
              >
                {secondaryCta}
              </a>
            </div>
          </div>
        </Card>

        {/* Currently + 82% */}
        <div className="flex flex-[1_1_280px] flex-col gap-3">
          <Card delay={80} className="flex flex-1 flex-col gap-3 p-6">
            <div className="flex items-center gap-2 font-mono text-[12px] font-medium uppercase leading-none tracking-[0.06em] text-muted">
              <Dot />
              Currently
            </div>
            <div className="text-[20px] font-semibold leading-tight tracking-[-0.01em]">{current.title}</div>
            <div className="text-[15px] text-muted">
              {current.organisation} · {current.period}
            </div>
          </Card>

          <Card tone="fill" delay={160} className="flex flex-1 flex-col justify-between gap-4 p-6">
            <div className="text-[clamp(56px,6vw,72px)] font-bold leading-[0.9] tracking-[-0.04em]">
              {featuredStat.value}
            </div>
            <div className="text-[16px] leading-[1.4]">{featuredStat.text}</div>
          </Card>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {/* Core stack */}
        <Card delay={200} className="flex flex-[2_1_420px] flex-col gap-3.5 p-6">
          <MonoLabel>Core stack</MonoLabel>
          <ChipList items={stack} label="Core stack" />
        </Card>

        {/* $1.20M */}
        <Card delay={240} className="flex flex-[1_1_220px] flex-col justify-between gap-2.5 p-6">
          <div className="text-[40px] font-semibold leading-none tracking-[-0.03em]">{secondaryStat.value}</div>
          <div className="text-[15px] text-muted">{secondaryStat.text}</div>
        </Card>

        {/* Resume */}
        <Card
          as="a"
          lift
          delay={280}
          href={RESUME_URL}
          download={RESUME_FILE_NAME}
          className="flex flex-[1_1_220px] flex-col justify-between gap-4 p-6 text-ink no-underline"
        >
          <Download className="h-6 w-6 text-accent" aria-hidden="true" />
          <div className="flex flex-col gap-1">
            <span className="text-[18px] font-semibold">Download resume</span>
            <span className="font-mono text-[13px] text-muted">PDF</span>
          </div>
        </Card>
      </div>
    </section>
  );
};

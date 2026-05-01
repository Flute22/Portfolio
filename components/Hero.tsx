import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Download } from 'lucide-react';
import { HERO_DATA } from '../constants';
import { getResumeUrl, getResumeFileName } from './resumeUtils';

const STATS = [
  { label: 'Projects Completed', value: 3, suffix: '' },
  { label: 'Data Points Processed', value: 8500, suffix: '+' },
  { label: 'Sales Tracked', value: 1.2, suffix: 'M+', prefix: '$' },
];

function useCountUp(target: number, duration = 1400, decimals = 0) {
  const [count, setCount] = useState(0);
  const started = useRef(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const step = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(parseFloat((eased * target).toFixed(decimals)));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration, decimals]);

  return { count, ref };
}

const StatCounter: React.FC<{ stat: typeof STATS[number] }> = ({ stat }) => {
  const decimals = stat.value % 1 !== 0 ? 1 : 0;
  const { count, ref } = useCountUp(stat.value, 1400, decimals);
  return (
    <div className="flex flex-col items-start">
      <span ref={ref} className="text-2xl font-bold text-white font-mono tabular-nums">
        {stat.prefix}{decimals > 0 ? count.toFixed(1) : Math.round(count)}{stat.suffix}
      </span>
      <span className="text-xs text-muted mt-0.5">{stat.label}</span>
    </div>
  );
};

export const Hero: React.FC = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative pt-28 md:pt-24 overflow-hidden">

      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10 animate-pulse" style={{ animationDuration: '4s' }} />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px] -z-10" />

      <div className="max-w-6xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 lg:gap-24 items-center">

        {/* Left Column: Text Content */}
        <div className="flex flex-col space-y-8 pt-2 order-2 md:order-1">

          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full bg-surfaceHighlight/50 border border-white/10 text-primary/90 text-xs font-mono tracking-wider uppercase backdrop-blur-md animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Available for opportunities
          </div>

          {/* Identity Block */}
          <div className="space-y-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1]">
              {/* Elegant Gradient Flow Animation on Name */}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-200 via-primary to-slate-200 bg-[length:200%_auto] animate-text-shine">
                {HERO_DATA.name}
              </span>
            </h1>

            <h2 className="text-xl md:text-2xl text-slate-400 font-medium flex items-center gap-3">
              <span className="h-px w-8 bg-slate-700"></span>
              {HERO_DATA.role}
            </h2>
          </div>

          {/* Description */}
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-lg animate-slide-up" style={{ animationDelay: '0.2s', opacity: 0, animationFillMode: 'forwards' }}>
            {HERO_DATA.description}
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 pt-2 animate-slide-up border-t border-white/5" style={{ animationDelay: '0.25s', opacity: 0, animationFillMode: 'forwards' }}>
            {STATS.map((stat) => (
              <StatCounter key={stat.label} stat={stat} />
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 pt-2 animate-slide-up" style={{ animationDelay: '0.3s', opacity: 0, animationFillMode: 'forwards' }}>
            <a
              href="#projects"
              className="px-8 py-3.5 bg-white text-slate-950 font-bold rounded-lg hover:bg-slate-200 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]"
            >
              View Work
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href={getResumeUrl()}
              download={getResumeFileName()}
              className="px-8 py-3.5 bg-transparent border border-white/10 text-white font-medium rounded-lg hover:bg-white/5 transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Resume
            </a>
          </div>
        </div>

        {/* Right Column: Profile Photo (Clean, Professional, Minimalist) */}
        <div className="order-1 md:order-2 flex justify-center md:justify-end relative animate-fade-in" style={{ animationDelay: '0.2s' }}>
          {/* Container with minimal glowing aura */}
          <div className="relative w-56 h-[270px] sm:w-64 sm:h-[310px] md:w-[400px] md:h-[470px]">

            {/* Soft Ambient Shadow/Glow - Minimalist */}
            <div className="absolute inset-4 bg-primary/20 rounded-[2rem] blur-3xl -z-10 opacity-40" />

            {/* Image Container - Soft Rounded Rectangle with Light Border */}
            <div className="w-full h-full rounded-[2rem] overflow-hidden border border-white/10 bg-surfaceHighlight/30 backdrop-blur-sm shadow-xl relative z-10 group">
              <img
                src={HERO_DATA.avatarUrl}
                alt={HERO_DATA.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 brightness-[1] contrast-[1.3] saturate-[1.3]"
                width={400}
                height={400}
                loading="eager"
                fetchPriority="high"
              />

              {/* Darkening Overlay for Tone Match */}
              <div className="absolute inset-0 bg-slate-950/20 mix-blend-multiply pointer-events-none"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-slate-950/20 pointer-events-none"></div>

              {/* Optional: Very subtle inner highlight for dimension */}
              <div className="absolute inset-0 border border-white/5 rounded-[2rem] pointer-events-none mix-blend-overlay"></div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
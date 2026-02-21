import React from 'react';
import { ArrowRight, Lightbulb, FileText, Share2, TrendingUp, Filter, Repeat } from 'lucide-react';
import { CASE_STUDIES_DATA } from '../constants';
import { TiltCard } from './ui/TiltCard';

const InsightVisual: React.FC<{ type: 'growth' | 'network' | 'reduction' | 'transformation' }> = ({ type }) => {
  switch (type) {
    case 'growth':
      return (
        <div className="relative w-8 h-8 flex items-end gap-[2px] p-1 border-b border-secondary/30">
          <div className="w-full bg-secondary/20 animate-[grow_1.5s_ease-out_infinite] h-[30%]" />
          <div className="w-full bg-secondary/40 animate-[grow_1.5s_ease-out_infinite_0.2s] h-[50%]" />
          <div className="w-full bg-secondary animate-[grow_1.5s_ease-out_infinite_0.4s] h-[80%]" />
        </div>
      );
    case 'network':
      return (
        <div className="relative w-8 h-8 flex items-center justify-center">
          <div className="absolute w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
          <div className="absolute top-1 left-1 w-1 h-1 rounded-full bg-secondary/60 animate-bounce" />
          <div className="absolute bottom-1 right-1 w-1 h-1 rounded-full bg-secondary/60 animate-bounce delay-150" />
          <svg className="w-full h-full opacity-40" viewBox="0 0 32 32">
            <line x1="16" y1="16" x2="6" y2="6" stroke="currentColor" strokeWidth="1" className="text-secondary" />
            <line x1="16" y1="16" x2="26" y2="26" stroke="currentColor" strokeWidth="1" className="text-secondary" />
          </svg>
        </div>
      );
    case 'reduction':
      return (
        <div className="relative w-8 h-8 flex items-center justify-center">
          <svg className="w-6 h-6 text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M23 18l-9-9-4 4-7-7" className="animate-[dash_2s_ease-in-out_infinite]" strokeDasharray="50" strokeDashoffset="50" />
            <polyline points="17 18 23 18 23 12" />
          </svg>
        </div>
      );
    case 'transformation':
      return (
        <div className="relative w-8 h-8 flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-secondary rounded animate-[spin_3s_linear_infinite]" />
          <div className="absolute w-2 h-2 bg-secondary rounded-full animate-ping" />
        </div>
      );
    default:
      return <div className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0 mt-2" />;
  }
};

export const CaseStudies: React.FC = () => {
  return (
    <section id="case-studies" className="py-16 md:py-24 relative border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12 md:mb-16 md:text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Deep Dives & Case Studies</h2>
          <p className="text-muted">A closer look at the methodology, experiments, and results behind complex data problems.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {CASE_STUDIES_DATA.map((study) => (
            <TiltCard key={study.id} className="h-full" intensity={10}>
              <div className="h-full bg-surfaceHighlight/30 border border-white/5 p-8 rounded-2xl backdrop-blur-sm flex flex-col hover:border-white/10 transition-colors">
                <div className="flex items-center gap-3 mb-6 text-primary">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <FileText className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-mono tracking-wider uppercase opacity-80">Case Study</span>
                </div>

                <h3 className="text-2xl font-bold mb-4 leading-tight">{study.title}</h3>
                <p className="text-slate-400 mb-8 leading-relaxed">
                  {study.description}
                </p>

                <div className="bg-background/40 rounded-xl p-6 mb-8 border border-white/5">
                  <h4 className="flex items-center gap-2 text-sm font-semibold text-secondary mb-4">
                    <Lightbulb className="w-4 h-4" />
                    Key Insights
                  </h4>
                  <ul className="space-y-4">
                    {study.keyInsights.map((insight, i) => (
                      <li key={i} className="flex items-center gap-4 group/insight">
                        <div className="flex-shrink-0 transition-transform duration-300 group-hover/insight:scale-110">
                          <InsightVisual type={insight.visualType} />
                        </div>
                        <span className="text-sm text-slate-300 leading-relaxed group-hover/insight:text-white transition-colors">
                          {insight.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto pt-4 border-t border-white/5">
                  <a href={study.link} className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-primary transition-colors group">
                    Read full analysis
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
};
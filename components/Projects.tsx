import React from 'react';
import { ExternalLink, TrendingUp, ArrowRight } from 'lucide-react';
import { PROJECTS_DATA } from '../constants';
import { TiltCard } from './ui/TiltCard';
import { ChartPreview } from './visuals/ChartPreview';

export const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-20 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Selected Work</h2>
          <div className="h-1 w-20 bg-primary rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS_DATA.map((project) => (
            <TiltCard key={project.id} className="h-full" intensity={15}>
              <div className="h-full bg-surfaceHighlight/30 border border-white/5 rounded-2xl p-6 backdrop-blur-sm flex flex-col group transition-all duration-300 relative overflow-hidden hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/20 hover:animate-[borderGlowPulse_2s_ease-in-out_infinite]">

                {/* Header */}
                <div className="flex justify-between items-start mb-4 relative z-10">
                  <div className="flex-1">
                    <span className="inline-flex items-center px-2 py-1 rounded text-[10px] font-mono font-medium bg-primary/10 text-primary mb-3 border border-primary/20 tracking-wider uppercase">
                      {project.category}
                    </span>
                    <h3 className="text-2xl font-bold leading-tight text-slate-100 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-400 mb-6 line-clamp-3 leading-relaxed relative z-10">
                  {project.description}
                </p>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-3 mb-6 relative z-10">
                  {project.metrics.map((metric, idx) => (
                    <div key={idx} className="bg-surface/50 rounded-lg p-3 border border-white/5 group-hover:border-white/10 transition-colors">
                      <p className="text-[10px] text-slate-500 font-mono mb-1 uppercase tracking-wider">{metric.label}</p>
                      <p className="text-lg font-bold text-slate-200 group-hover:text-white transition-colors">{metric.value}</p>
                    </div>
                  ))}
                </div>

                {/* Chart */}
                <div className="mt-auto mb-6 relative z-10">
                  <div className="flex items-center gap-2 text-[10px] font-mono text-muted/80 mb-2 uppercase tracking-wider">
                    <TrendingUp className="w-3 h-3" />
                    <span>Performance Trend</span>
                  </div>
                  <ChartPreview data={project.chartData} color={project.category === 'ML' ? '#38bdf8' : project.category === 'Analytics' ? '#2dd4bf' : project.category === 'BI' ? '#f59e0b' : '#818cf8'} />
                </div>

                {/* Tags & Link Container */}
                <div className="pt-5 border-t border-white/5 flex flex-col gap-4 relative z-10">

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 text-[10px] font-medium font-mono rounded bg-white/5 text-slate-400 border border-white/5 hover:bg-white/10 hover:text-slate-200 transition-colors cursor-default">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Enhanced Link Button */}
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-primary hover:border-primary hover:text-surface transition-all duration-300 group/btn"
                    >
                      <span className="text-xs font-bold font-mono uppercase tracking-widest">View Project</span>
                      <ExternalLink className="w-4 h-4 transition-transform group-hover/btn:scale-110" />
                    </a>
                  )}
                </div>

              </div>
            </TiltCard>
          ))}
        </div>

        {PROJECTS_DATA.length > 3 && (
          <div className="mt-12 md:mt-16 flex justify-center animate-fade-in">
            <a
              href="#"
              className="group inline-flex items-center gap-2 px-6 py-3 bg-surfaceHighlight/30 border border-white/10 rounded-full text-sm font-medium hover:bg-surfaceHighlight/80 hover:border-primary/30 hover:text-white transition-all duration-300 backdrop-blur-sm"
            >
              View All Projects
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-primary" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
};
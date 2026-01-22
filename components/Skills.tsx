import React from 'react';
import { SKILLS_DATA } from '../constants';
import { TiltCard } from './ui/TiltCard';

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-16 md:py-24 bg-surface/30 border-y border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Arsenal</h2>
          <p className="text-muted">Specialized capabilities across the entire data lifecycle</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-12">
          {SKILLS_DATA.map((group, idx) => (
            <div key={idx} className="space-y-6">
              <div className="flex items-center gap-4 mb-2 pb-4 border-b border-white/5">
                <div className="p-2 bg-white/5 rounded-lg">
                  {group.icon}
                </div>
                <h3 className="text-xl font-bold font-mono tracking-wide">{group.category}</h3>
              </div>
              
              <div className="grid gap-4">
                {group.items.map((skill, sIdx) => (
                  <TiltCard key={sIdx} intensity={5} glow={false} className="group">
                    {/* Visual Card Content */}
                    <div className="relative px-6 py-4 bg-surfaceHighlight/40 border border-white/5 rounded-xl transition-all duration-500 ease-out hover:bg-surfaceHighlight hover:border-primary/20 hover:shadow-[0_5px_15px_rgba(56,189,248,0.05)] hover:-translate-y-1 flex items-center gap-4 overflow-hidden z-10">
                      
                      {/* Subtle gradient overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out" />
                      
                      {/* Dot indicator with pulse effect */}
                      <div className="w-2 h-2 rounded-full bg-primary/40 group-hover:bg-primary group-hover:scale-125 group-hover:shadow-[0_0_8px_rgba(56,189,248,0.5)] transition-all duration-500 flex-shrink-0 z-10" />
                      
                      {/* Text */}
                      <span className="text-slate-300 group-hover:text-white transition-colors duration-300 text-sm font-medium leading-relaxed z-10">
                        {skill.name}
                      </span>
                    </div>

                    {/* Tooltip - positioned outside the overflow-hidden container but inside the relative TiltCard */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 p-3 bg-slate-900/95 border border-white/10 rounded-lg shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-50 text-center transform translate-y-2 group-hover:translate-y-0 backdrop-blur-md">
                      <p className="text-xs text-slate-300 leading-relaxed font-sans">{skill.description}</p>
                      {/* Arrow */}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-slate-900/95"></div>
                    </div>
                  </TiltCard>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
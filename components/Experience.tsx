import React from 'react';
import { EXPERIENCE_DATA } from '../constants';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-16 md:py-24 bg-surface/30">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Evolution of Expertise</h2>
        <p className="text-muted text-center mb-12 md:mb-16 max-w-xl mx-auto">
          A focused look at my academic foundation, current specialization, and continuous dedication to mastering the field of data science.
        </p>
        
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-white/10 transform md:-translate-x-1/2"></div>
          
          <div className="space-y-12 md:space-y-16">
            {EXPERIENCE_DATA.map((item, idx) => (
              <div key={item.id} className={`relative flex flex-col md:flex-row gap-8 ${idx % 2 === 0 ? 'md:text-right' : 'md:flex-row-reverse md:text-left'}`}>
                <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-surface border-4 border-primary transform -translate-x-[7px] md:-translate-x-1/2 mt-1.5 z-10 shadow-[0_0_15px_rgba(56,189,248,0.5)]"></div>

                {/* Content */}
                <div className={`ml-8 md:ml-0 md:w-1/2 ${idx % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                  <span className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-primary mb-3 uppercase tracking-wider">
                    {item.period}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-1">{item.role}</h3>
                  <h4 className="text-lg text-secondary font-medium mb-4">{item.company}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">
                    {item.description}
                  </p>
                  <div className={`flex flex-wrap gap-2 ${idx % 2 === 0 ? 'md:justify-end justify-start' : 'justify-start'}`}>
                    {item.skills.map(skill => (
                      <span key={skill} className="text-[10px] font-mono text-muted/60 bg-white/5 px-2 py-0.5 rounded border border-white/5 uppercase">#{skill}</span>
                    ))}
                  </div>
                </div>

                {/* Empty Space for alignment */}
                <div className="hidden md:block md:w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
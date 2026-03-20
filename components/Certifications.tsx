import React from 'react';
import { CheckCircle, Clock, Award } from 'lucide-react';
import { CERTIFICATIONS_DATA } from '../constants';
import { ScrollReveal } from './ui/ScrollReveal';

export const Certifications: React.FC = () => {
  return (
    <section id="certifications" className="py-16 md:py-24 bg-surface/20">
      <div className="max-w-5xl mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Education & Certifications</h2>
            <p className="text-muted">Formal training and credentials that shape my analytical foundation</p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8">
          {CERTIFICATIONS_DATA.map((cert, idx) => (
            <ScrollReveal key={cert.id} delay={idx * 120} direction="up">
              <div className="group relative flex flex-col h-full p-6 bg-surfaceHighlight/40 border border-white/5 rounded-2xl hover:border-primary/20 hover:bg-surfaceHighlight/60 transition-all duration-500 hover:shadow-[0_8px_30px_rgba(56,189,248,0.06)]">
                {/* Top row */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="p-2.5 bg-white/5 rounded-xl border border-white/5 group-hover:border-primary/20 transition-colors duration-300">
                    <Award className="w-5 h-5 text-primary" />
                  </div>
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                      cert.status === 'Completed'
                        ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                        : 'bg-primary/10 border-primary/20 text-primary'
                    }`}
                  >
                    {cert.status === 'Completed' ? (
                      <CheckCircle className="w-3 h-3" />
                    ) : (
                      <Clock className="w-3 h-3" />
                    )}
                    {cert.status}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-white mb-1 leading-snug">{cert.title}</h3>
                <p className="text-secondary font-medium text-sm mb-1">{cert.issuer}</p>
                <p className="text-xs font-mono text-muted/70 mb-3 uppercase tracking-wider">{cert.period}</p>
                <p className="text-slate-400 text-sm leading-relaxed mb-5 flex-1">{cert.description}</p>

                {/* Skills */}
                <div className="flex flex-wrap gap-1.5">
                  {cert.skills.map(skill => (
                    <span
                      key={skill}
                      className="text-[10px] font-mono text-muted/60 bg-white/5 px-2 py-0.5 rounded border border-white/5 uppercase tracking-wider"
                    >
                      #{skill}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

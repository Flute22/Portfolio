import React from 'react';
import { Mail, ArrowRight } from 'lucide-react';
import { SOCIAL_LINKS } from '../constants';

interface ContactProps {
  onOpenContact: () => void;
}

export const Contact: React.FC<ContactProps> = ({ onOpenContact }) => {
  return (
    <section id="contact" className="py-20 md:py-32 relative overflow-hidden">
      {/* Footer background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-t from-primary/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">Ready to collaborate?</h2>
          <p className="text-base sm:text-lg text-muted mb-12">
            I'm always open to discussing data strategy, analytical insights, or visualization projects.
          </p>

          <button
            onClick={onOpenContact}
            className="group relative inline-flex items-center gap-3 px-8 py-4 font-bold text-lg rounded-full transition-all duration-300 bg-white text-slate-950 hover:bg-slate-100 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:-translate-y-1 cursor-pointer"
          >
            <Mail className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
            <span>Start a Conversation</span>
            <ArrowRight className="w-5 h-5 transition-all duration-300 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0" />
          </button>

        <div className="flex justify-center gap-8 mt-16">
          {SOCIAL_LINKS.map((social, idx) => (
            <a
              key={idx}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all border border-transparent hover:border-white/10 group"
              aria-label={social.label}
            >
              <div className="transition-transform duration-300 group-hover:scale-110">
                {social.icon}
              </div>
            </a>
          ))}
        </div>

        <footer className="mt-20 md:mt-24 text-sm text-slate-600 font-mono">
          <p>© {new Date().getFullYear()} Khushal Sinhmar. Built with precision and data.</p>
        </footer>
      </div>
    </section>
  );
};
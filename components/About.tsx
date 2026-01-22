import React, { useEffect, useRef, useState } from 'react';
import { Search, Zap, BrainCircuit } from 'lucide-react';
import { TiltCard } from './ui/TiltCard';

export const About: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const cards = [
    {
      icon: <Search className="w-8 h-8 text-primary" />,
      title: "Exploration",
      text: "Mining datasets to find the 'why' behind the numbers. I focus on uncovering hidden truths that drive long-term business growth."
    },
    {
      icon: <BrainCircuit className="w-8 h-8 text-secondary" />,
      title: "Intelligence",
      text: "Deploying machine learning and statistical rigor to build systems that don't just report the past, but predict the future."
    },
    {
      icon: <Zap className="w-8 h-8 text-accent" />,
      title: "Communication",
      text: "Data is useless without clarity. I translate complex technical findings into compelling narratives for non-technical leadership."
    }
  ];

  return (
    <section id="about" className="py-16 md:py-24 relative" ref={sectionRef}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          
          {/* Text Content */}
          <div className={`transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 flex items-center gap-3">
              <span className="w-12 h-1 bg-primary rounded-full"></span>
              The Mission
            </h2>
            <p className="text-lg text-muted leading-relaxed mb-6">
              Modern businesses are drowning in data but starving for insights. I specialize in bridging this gap by building robust analytical foundations that turn noise into high-fidelity signal.
            </p>
            <p className="text-lg text-muted leading-relaxed">
              Whether it's optimizing a supply chain through SQL engineering, predicting churn with Machine Learning, or crafting a Power BI dashboard that tells a story, my goal is always the same: clarity through precision.
            </p>
          </div>

          {/* 3D Cards Grid */}
          <div className="grid gap-6">
            {cards.map((card, idx) => (
              <div 
                key={idx}
                className={`transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}
                style={{ transitionDelay: `${idx * 200 + 300}ms` }}
              >
                <TiltCard className="bg-surfaceHighlight/50 border border-white/5 rounded-xl p-6 backdrop-blur-sm" intensity={10}>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                      {card.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                      <p className="text-slate-400 text-sm">{card.text}</p>
                    </div>
                  </div>
                </TiltCard>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
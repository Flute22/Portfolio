import React from 'react';

export const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none -z-50 overflow-hidden">
      {/* Dark Gradient Base */}
      <div className="absolute inset-0 bg-background" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern bg-[length:40px_40px] opacity-[0.07]" />
      
      {/* Radial Glows */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] transform -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] transform translate-x-1/3 translate-y-1/3" />
      
      {/* Floating Elements (Simulated Particles) */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/20 rounded-full animate-pulse" />
      <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-secondary/20 rounded-full animate-pulse delay-700" />
      <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-accent/20 rounded-full animate-pulse delay-1000" />
    </div>
  );
};
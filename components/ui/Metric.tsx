import React from 'react';

interface MetricProps {
  value: string;
  label: string;
  className?: string;
}

/** Green figure with a small caption underneath. Sized to fit two side by side in a narrow cell. */
export const Metric: React.FC<MetricProps> = ({ value, label, className = '' }) => (
  <div className={`min-w-0 ${className}`.trim()}>
    <p className="text-2xl font-semibold leading-none tracking-tight text-accent lg:text-xl xl:text-2xl">
      {value}
    </p>
    {/* text-body, not text-muted: muted fails AA contrast on the tinted Result panel */}
    <p className="mt-1.5 text-xs leading-snug text-body">{label}</p>
  </div>
);

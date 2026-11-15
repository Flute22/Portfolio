import React from 'react';

interface MetricProps {
  value: string;
  label: string;
}

/** Big green figure with a small caption underneath. */
export const Metric: React.FC<MetricProps> = ({ value, label }) => (
  <div>
    <p className="font-semibold leading-none tracking-tight text-accent text-[1.75rem] md:text-[2rem]">
      {value}
    </p>
    <p className="mt-1.5 text-sm text-muted">{label}</p>
  </div>
);

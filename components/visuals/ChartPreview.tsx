import React from 'react';
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';

interface ChartPreviewProps {
  data: { name: string; value: number }[];
  color?: string;
}

export const ChartPreview: React.FC<ChartPreviewProps> = ({ data, color = "#38bdf8" }) => {
  return (
    <div className="h-16 w-full mt-4 opacity-80 group-hover:opacity-100 transition-opacity">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
              <stop offset="95%" stopColor={color} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <Tooltip 
            cursor={false}
            contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '4px', fontSize: '10px' }}
            itemStyle={{ color: '#e2e8f0' }}
            labelStyle={{ display: 'none' }}
          />
          <Area 
            type="monotone" 
            dataKey="value" 
            stroke={color} 
            strokeWidth={2}
            fillOpacity={1} 
            fill={`url(#gradient-${color})`} 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
import React from 'react';

const Sparkline = ({ data = [50, 80, 30, 90, 60, 75, 40, 85, 70, 95] }) => {
  if (!data || data.length === 0) return null;

  const width = 400;
  const height = 60;
  const padding = 5;
  const graphWidth = width - 2 * padding;
  const graphHeight = height - 2 * padding;

  const minValue = Math.min(...data);
  const maxValue = Math.max(...data);
  const range = maxValue - minValue || 1;

  const points = data.map((value, index) => {
    const x = padding + (index / (data.length - 1)) * graphWidth;
    const y = padding + graphHeight - ((value - minValue) / range) * graphHeight;
    return [x, y];
  });

  const pathData = points.map((point, index) => {
    return `${index === 0 ? 'M' : 'L'} ${point[0]} ${point[1]}`;
  }).join(' ');

  return (
    <div className="sparkline-container">
      <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
        <defs>
          <linearGradient id="sparklineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00f5ff" stopOpacity="0.6"/>
            <stop offset="100%" stopColor="#00f5ff" stopOpacity="0.1"/>
          </linearGradient>
        </defs>
        
        {/* Area under the curve */}
        <path
          d={`${pathData} L ${padding + graphWidth} ${padding + graphHeight} L ${padding} ${padding + graphHeight} Z`}
          fill="url(#sparklineGradient)"
        />
        
        {/* Line */}
        <path
          d={pathData}
          fill="none"
          stroke="#00f5ff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Points */}
        {points.map((point, index) => (
          <circle
            key={index}
            cx={point[0]}
            cy={point[1]}
            r="2"
            fill="#00f5ff"
            opacity={index === points.length - 1 ? 1 : 0.5}
          />
        ))}
      </svg>
    </div>
  );
};

export default Sparkline;

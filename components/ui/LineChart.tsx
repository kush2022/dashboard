import React, { useEffect, useRef } from 'react';

interface DataPoint {
  date: string;
  value: number;
}

interface LineChartProps {
  data: DataPoint[];
  color: string;
  height?: number;
  showAxis?: boolean;
  showLabels?: boolean;
}

const LineChart: React.FC<LineChartProps> = ({ 
  data, 
  color = 'emerald', 
  height = 200, 
  showAxis = true,
  showLabels = true
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));
  const padding = 20;
  const width = 1000; // This will be constrained by parent width

  useEffect(() => {
    if (!svgRef.current) return;
    
    const pathElement = svgRef.current.querySelector('.line-path');
    if (pathElement) {
      const pathLength = (pathElement as SVGPathElement).getTotalLength();
      pathElement.setAttribute('stroke-dasharray', pathLength.toString());
      pathElement.setAttribute('stroke-dashoffset', pathLength.toString());
      
      setTimeout(() => {
        pathElement.setAttribute('stroke-dashoffset', '0');
      }, 100);
    }
    
    const circles = svgRef.current.querySelectorAll('.data-point');
    circles.forEach((circle, i) => {
      setTimeout(() => {
        circle.setAttribute('r', '4');
        circle.setAttribute('opacity', '1');
      }, 800 + i * 50);
    });
  }, [data]);

  // Create the line path
  const createLinePath = () => {
    const getX = (i: number) => padding + (i * ((width - padding * 2) / (data.length - 1)));
    const getY = (val: number) => {
      const range = maxValue - minValue;
      const normalizedValue = range === 0 ? 0.5 : (val - minValue) / range;
      return (height - padding * 2) - normalizedValue * (height - padding * 2) + padding;
    };

    let pathD = '';
    data.forEach((point, i) => {
      const x = getX(i);
      const y = getY(point.value);
      if (i === 0) {
        pathD += `M ${x},${y}`;
      } else {
        pathD += ` L ${x},${y}`;
      }
    });

    return pathD;
  };

  return (
    <div className="w-full overflow-hidden">
      <svg 
        ref={svgRef} 
        viewBox={`0 0 ${width} ${height}`} 
        width="100%" 
        height={height} 
        preserveAspectRatio="none"
        className="overflow-visible"
      >
        {/* Grid lines */}
        {showAxis && Array.from({ length: 5 }).map((_, i) => (
          <line 
            key={i}
            x1={padding}
            y1={padding + i * ((height - padding * 2) / 4)}
            x2={width - padding}
            y2={padding + i * ((height - padding * 2) / 4)}
            stroke="currentColor"
            strokeOpacity="0.1"
            strokeDasharray="4"
          />
        ))}
        
        {/* X axis */}
        {showAxis && (
          <line 
            x1={padding} 
            y1={height - padding} 
            x2={width - padding} 
            y2={height - padding} 
            stroke="currentColor" 
            strokeOpacity="0.2" 
          />
        )}
        
        {/* Line */}
        <path
          d={createLinePath()}
          fill="none"
          stroke={`var(--${color}-500, #10b981)`}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="line-path transition-all duration-1000 ease-out"
        />
        
        {/* Area under the curve with gradient */}
        <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={`var(--${color}-500, #10b981)`} stopOpacity="0.3" />
          <stop offset="100%" stopColor={`var(--${color}-500, #10b981)`} stopOpacity="0.05" />
        </linearGradient>
        <path
          d={`${createLinePath()} L ${width - padding},${height - padding} L ${padding},${height - padding} Z`}
          fill={`url(#gradient-${color})`}
          className="opacity-70"
        />
        
        {/* Data points */}
        {data.map((point, i) => {
          const getX = (i: number) => padding + (i * ((width - padding * 2) / (data.length - 1)));
          const getY = (val: number) => {
            const range = maxValue - minValue;
            const normalizedValue = range === 0 ? 0.5 : (val - minValue) / range;
            return (height - padding * 2) - normalizedValue * (height - padding * 2) + padding;
          };
          
          return (
            <circle
              key={i}
              cx={getX(i)}
              cy={getY(point.value)}
              r="0"
              fill="white"
              stroke={`var(--${color}-500, #10b981)`}
              strokeWidth="2"
              opacity="0"
              className="data-point transition-all duration-300 ease-out"
            />
          );
        })}
        
        {/* X-axis labels */}
        {showLabels && data.length > 0 && (
          <>
            <text
              x={padding}
              y={height - 5}
              fontSize="10"
              textAnchor="middle"
              fill="currentColor"
              opacity="0.7"
            >
              {new Date(data[0].date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
            </text>
            <text
              x={width - padding}
              y={height - 5}
              fontSize="10"
              textAnchor="middle"
              fill="currentColor"
              opacity="0.7"
            >
              {new Date(data[data.length - 1].date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
            </text>
          </>
        )}
      </svg>
    </div>
  );
};

export default LineChart;
import React from 'react';
import { cn } from '@/lib/utils';

interface WaterLilyPatternProps {
  className?: string;
  opacity?: number;
}

export const WaterLilyPattern: React.FC<WaterLilyPatternProps> = ({ 
  className = '',
  opacity = 0.05 
}) => {
  return (
    <svg
      className={cn('absolute pointer-events-none', className)}
      viewBox="0 0 200 200"
      fill="none"
      style={{ opacity }}
    >
      {/* Water Lily (Shapla) - National flower of Bangladesh */}
      <g className="text-primary" fill="currentColor">
        {/* Petals */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((rotation) => (
          <ellipse
            key={rotation}
            cx="100"
            cy="60"
            rx="15"
            ry="35"
            transform={`rotate(${rotation} 100 100)`}
          />
        ))}
        {/* Inner petals */}
        {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((rotation) => (
          <ellipse
            key={`inner-${rotation}`}
            cx="100"
            cy="70"
            rx="10"
            ry="25"
            transform={`rotate(${rotation} 100 100)`}
          />
        ))}
        {/* Center */}
        <circle cx="100" cy="100" r="15" />
      </g>
    </svg>
  );
};

export default WaterLilyPattern;

import React from 'react';
import { cn } from '@/lib/utils';

interface NakshiKanthaBorderProps {
  className?: string;
  variant?: 'top' | 'bottom' | 'full';
}

export const NakshiKanthaBorder: React.FC<NakshiKanthaBorderProps> = ({ 
  className = '',
  variant = 'bottom'
}) => {
  const pattern = (
    <svg width="100%" height="8" className="text-primary/20">
      <pattern id="nakshi-pattern" x="0" y="0" width="24" height="8" patternUnits="userSpaceOnUse">
        <path
          d="M0 4 L6 0 L12 4 L6 8 Z M12 4 L18 0 L24 4 L18 8 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        />
        <circle cx="6" cy="4" r="1.5" fill="currentColor" />
        <circle cx="18" cy="4" r="1.5" fill="currentColor" />
      </pattern>
      <rect width="100%" height="8" fill="url(#nakshi-pattern)" />
    </svg>
  );

  return (
    <div className={cn('pointer-events-none', className)}>
      {(variant === 'top' || variant === 'full') && pattern}
      {(variant === 'bottom' || variant === 'full') && pattern}
    </div>
  );
};

export default NakshiKanthaBorder;

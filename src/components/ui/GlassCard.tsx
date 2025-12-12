import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'flat';
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant = 'default', hover = true, padding = 'md', children, ...props }, ref) => {
    const paddingClasses = {
      none: '',
      sm: 'p-3',
      md: 'p-4',
      lg: 'p-6',
    };

    const variantClasses = {
      default: 'glass-card',
      elevated: 'glass-card shadow-glass-lg',
      flat: 'bg-card border border-border',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-2xl transition-all duration-300',
          variantClasses[variant],
          paddingClasses[padding],
          hover && 'hover:shadow-glass-lg hover:scale-[1.01] cursor-pointer',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassCard.displayName = 'GlassCard';

export { GlassCard };

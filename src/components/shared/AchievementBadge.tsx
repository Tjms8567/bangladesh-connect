import React from 'react';
import { cn } from '@/lib/utils';
import { Lock, Check } from 'lucide-react';

interface AchievementBadgeProps {
  title: string;
  icon: string;
  unlocked: boolean;
  date?: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'w-12 h-12 text-xl',
  md: 'w-16 h-16 text-2xl',
  lg: 'w-20 h-20 text-3xl',
};

export const AchievementBadge: React.FC<AchievementBadgeProps> = ({
  title,
  icon,
  unlocked,
  date,
  description,
  size = 'md',
  className,
}) => {
  return (
    <div className={cn('relative text-center', className)}>
      <div
        className={cn(
          'rounded-full flex items-center justify-center mx-auto mb-2 relative transition-all',
          sizeClasses[size],
          unlocked
            ? 'bg-gradient-to-br from-accent/20 to-accent/10 shadow-lg'
            : 'bg-muted/50 grayscale'
        )}
      >
        <span className={cn(!unlocked && 'opacity-50')}>{icon}</span>
        {unlocked ? (
          <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-success flex items-center justify-center">
            <Check className="w-3 h-3 text-success-foreground" />
          </div>
        ) : (
          <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-muted flex items-center justify-center">
            <Lock className="w-3 h-3 text-muted-foreground" />
          </div>
        )}
      </div>
      <div className={cn(
        'font-medium text-sm',
        unlocked ? 'text-foreground' : 'text-muted-foreground'
      )}>
        {title}
      </div>
      {description && (
        <div className="text-xs text-muted-foreground mt-0.5">{description}</div>
      )}
      {date && unlocked && (
        <div className="text-xs text-muted-foreground mt-1">{date}</div>
      )}
    </div>
  );
};

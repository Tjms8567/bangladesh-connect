import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface ActivityItem {
  id: string;
  title: string;
  description?: string;
  time: string;
  icon: LucideIcon;
  color?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'destructive';
}

interface ActivityTimelineProps {
  items: ActivityItem[];
  className?: string;
}

const colorClasses = {
  primary: 'bg-primary text-primary-foreground',
  secondary: 'bg-secondary text-secondary-foreground',
  accent: 'bg-accent text-accent-foreground',
  success: 'bg-success text-success-foreground',
  warning: 'bg-warning text-warning-foreground',
  destructive: 'bg-destructive text-destructive-foreground',
};

export const ActivityTimeline: React.FC<ActivityTimelineProps> = ({
  items,
  className,
}) => {
  return (
    <div className={cn('space-y-4', className)}>
      {items.map((item, index) => {
        const Icon = item.icon;
        const isLast = index === items.length - 1;
        
        return (
          <div key={item.id} className="flex gap-3">
            <div className="flex flex-col items-center">
              <div className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center shrink-0',
                colorClasses[item.color || 'primary']
              )}>
                <Icon className="w-4 h-4" />
              </div>
              {!isLast && (
                <div className="w-0.5 h-full bg-border mt-2 min-h-[20px]" />
              )}
            </div>
            <div className="flex-1 pb-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-medium text-foreground text-sm">{item.title}</p>
                  {item.description && (
                    <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
                  )}
                </div>
                <span className="text-xs text-muted-foreground shrink-0">{item.time}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

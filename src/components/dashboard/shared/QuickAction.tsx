import React from 'react';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

interface QuickActionProps {
  title: string;
  description?: string;
  icon: React.ReactNode;
  onClick?: () => void;
  gradient?: string;
  badge?: string;
  className?: string;
}

export const QuickAction: React.FC<QuickActionProps> = ({
  title,
  description,
  icon,
  onClick,
  gradient = 'from-primary/10 to-primary/5',
  badge,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full p-4 rounded-2xl text-left transition-all duration-300',
        'bg-gradient-to-r border border-border/50',
        gradient,
        'hover:shadow-md hover:scale-[1.02] hover:border-primary/30',
        'group',
        className
      )}
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-background/80 shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-foreground truncate">{title}</h3>
            {badge && (
              <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-primary text-primary-foreground">
                {badge}
              </span>
            )}
          </div>
          {description && (
            <p className="text-sm text-muted-foreground truncate mt-0.5">
              {description}
            </p>
          )}
        </div>
        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
      </div>
    </button>
  );
};

import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const colorClasses = {
  primary: 'bg-primary/10 text-primary',
  secondary: 'bg-secondary/10 text-secondary',
  accent: 'bg-accent/10 text-accent-foreground',
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/10 text-warning-foreground',
  destructive: 'bg-destructive/10 text-destructive',
};

const sizeClasses = {
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
};

const iconSizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
};

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  color = 'primary',
  size = 'md',
  className,
}) => {
  return (
    <GlassCard className={cn(sizeClasses[size], 'text-center', className)}>
      {Icon && (
        <div className={cn(
          'rounded-xl flex items-center justify-center mx-auto mb-2',
          iconSizeClasses[size],
          colorClasses[color]
        )}>
          <Icon className={cn(
            size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-5 h-5' : 'w-6 h-6'
          )} />
        </div>
      )}
      <div className={cn(
        'font-bold text-foreground',
        size === 'sm' ? 'text-lg' : size === 'md' ? 'text-xl' : 'text-2xl'
      )}>
        {value}
      </div>
      <div className={cn(
        'text-muted-foreground',
        size === 'sm' ? 'text-xs' : 'text-sm'
      )}>
        {title}
      </div>
      {subtitle && (
        <div className="text-xs text-muted-foreground mt-1">{subtitle}</div>
      )}
      {trend && (
        <div className={cn(
          'flex items-center justify-center gap-1 mt-2 text-xs font-medium',
          trend.isPositive ? 'text-success' : 'text-destructive'
        )}>
          {trend.isPositive ? (
            <TrendingUp className="w-3 h-3" />
          ) : (
            <TrendingDown className="w-3 h-3" />
          )}
          <span>{trend.isPositive ? '+' : ''}{trend.value}%</span>
        </div>
      )}
    </GlassCard>
  );
};

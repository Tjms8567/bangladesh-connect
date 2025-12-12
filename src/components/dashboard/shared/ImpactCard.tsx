import React from 'react';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface ImpactCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  gradient?: string;
  className?: string;
}

export const ImpactCard: React.FC<ImpactCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  gradient = 'from-primary to-primary/80',
  className,
}) => {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl p-4',
        'bg-gradient-to-br',
        gradient,
        'text-white shadow-lg',
        className
      )}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/20 -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-white/10 translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            {icon}
          </div>
          {trend && (
            <div
              className={cn(
                'flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full',
                trend.isPositive ? 'bg-green-500/30' : 'bg-red-500/30'
              )}
            >
              {trend.isPositive ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              {Math.abs(trend.value)}%
            </div>
          )}
        </div>

        <div className="space-y-1">
          <p className="text-white/80 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
          {subtitle && (
            <p className="text-white/60 text-xs">{subtitle}</p>
          )}
        </div>
      </div>
    </div>
  );
};

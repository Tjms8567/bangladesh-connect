import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { nationalTransformationData } from '@/data/sectorMockData';
import { TrendingUp, Target, Calendar, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GDPProgressTrackerProps {
  className?: string;
  variant?: 'compact' | 'full';
}

export const GDPProgressTracker: React.FC<GDPProgressTrackerProps> = ({
  className,
  variant = 'full',
}) => {
  const { isBangla } = useLanguage();
  const { gdpProgress, sectorProgress } = nationalTransformationData;
  
  const progressPercentage = (gdpProgress.current / gdpProgress.target) * 100;
  const remainingYears = 2034 - new Date().getFullYear();

  if (variant === 'compact') {
    return (
      <div className={cn('p-4 rounded-2xl bg-gradient-to-r from-primary to-primary/80', className)}>
        <div className="flex items-center justify-between text-primary-foreground">
          <div>
            <p className="text-xs opacity-80">{isBangla ? 'জিডিপি লক্ষ্য' : 'GDP Target'}</p>
            <p className="text-2xl font-bold">${gdpProgress.current}B</p>
          </div>
          <div className="text-right">
            <p className="text-xs opacity-80">/ ${gdpProgress.target}B</p>
            <p className="text-lg font-semibold">{progressPercentage.toFixed(1)}%</p>
          </div>
        </div>
        <div className="mt-3 h-2 bg-white/20 rounded-full overflow-hidden">
          <div 
            className="h-full bg-white rounded-full transition-all duration-1000"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={cn('rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 p-6 border border-border', className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
            💰 {isBangla ? '$১ ট্রিলিয়ন অর্থনীতি' : '$1 Trillion Economy'}
          </h3>
          <p className="text-sm text-muted-foreground">
            {isBangla ? 'বাংলাদেশের অর্থনৈতিক রূপান্তর' : "Bangladesh's Economic Transformation"}
          </p>
        </div>
        <div className="flex items-center gap-2 bg-success/10 text-success px-3 py-1 rounded-full">
          <TrendingUp className="w-4 h-4" />
          <span className="text-sm font-medium">+{gdpProgress.yearlyGrowth}%</span>
        </div>
      </div>

      {/* Main Progress */}
      <div className="text-center mb-6">
        <div className="relative inline-block">
          <span className="text-6xl font-bold text-primary">${gdpProgress.current}</span>
          <span className="text-2xl text-muted-foreground ml-1">B</span>
        </div>
        <div className="flex items-center justify-center gap-2 mt-2">
          <Target className="w-4 h-4 text-muted-foreground" />
          <span className="text-muted-foreground">
            {isBangla ? `লক্ষ্য: $${gdpProgress.target}B` : `Target: $${gdpProgress.target}B`}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative mb-6">
        <div className="h-6 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-1000 flex items-center justify-end pr-2"
            style={{ width: `${progressPercentage}%` }}
          >
            <span className="text-xs font-bold text-white">{progressPercentage.toFixed(1)}%</span>
          </div>
        </div>
        <div className="flex justify-between mt-1 text-xs text-muted-foreground">
          <span>$0</span>
          <span>$500B</span>
          <span>$1T</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-background/50 rounded-xl p-3 text-center">
          <Calendar className="w-5 h-5 mx-auto mb-1 text-primary" />
          <p className="text-2xl font-bold text-foreground">{remainingYears}</p>
          <p className="text-xs text-muted-foreground">{isBangla ? 'বছর বাকি' : 'Years Left'}</p>
        </div>
        <div className="bg-background/50 rounded-xl p-3 text-center">
          <Zap className="w-5 h-5 mx-auto mb-1 text-warning" />
          <p className="text-2xl font-bold text-foreground">${(gdpProgress.target - gdpProgress.current).toFixed(0)}B</p>
          <p className="text-xs text-muted-foreground">{isBangla ? 'আরো প্রয়োজন' : 'More Needed'}</p>
        </div>
      </div>

      {/* Sector Breakdown */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-foreground">
          {isBangla ? 'সেক্টর অবদান' : 'Sector Contributions'}
        </h4>
        {sectorProgress.map(sector => (
          <div key={sector.sector} className="flex items-center gap-3">
            <span className="w-20 text-xs text-muted-foreground truncate">{sector.sector}</span>
            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${sector.progress}%` }}
              />
            </div>
            <span className="text-xs font-medium w-10 text-right">${sector.current}B</span>
          </div>
        ))}
      </div>
    </div>
  );
};

import React from 'react';
import { cn } from '@/lib/utils';
import { Flame, Calendar } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';

interface StreakTrackerProps {
  currentStreak: number;
  longestStreak: number;
  weeklyActivity: boolean[]; // 7 days, true = active
  isBangla: boolean;
  className?: string;
}

const dayLabels = {
  en: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  bn: ['র', 'সো', 'ম', 'বু', 'বৃ', 'শু', 'শ'],
};

export const StreakTracker: React.FC<StreakTrackerProps> = ({
  currentStreak,
  longestStreak,
  weeklyActivity,
  isBangla,
  className,
}) => {
  return (
    <GlassCard className={cn('p-4', className)}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={cn(
            'w-12 h-12 rounded-xl flex items-center justify-center',
            currentStreak > 0 
              ? 'bg-gradient-to-br from-orange-500 to-red-500' 
              : 'bg-muted'
          )}>
            <Flame className={cn(
              'w-6 h-6',
              currentStreak > 0 ? 'text-white' : 'text-muted-foreground'
            )} />
          </div>
          <div>
            <div className="text-2xl font-bold text-foreground">{currentStreak}</div>
            <div className="text-xs text-muted-foreground">
              {isBangla ? 'দিনের স্ট্রিক' : 'Day Streak'}
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm font-medium text-muted-foreground">
            {isBangla ? 'সেরা' : 'Best'}
          </div>
          <div className="text-lg font-bold text-foreground">{longestStreak}</div>
        </div>
      </div>

      <div className="flex justify-between">
        {weeklyActivity.map((active, index) => (
          <div key={index} className="flex flex-col items-center gap-1">
            <div
              className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all',
                active
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              )}
            >
              {isBangla ? dayLabels.bn[index] : dayLabels.en[index]}
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};

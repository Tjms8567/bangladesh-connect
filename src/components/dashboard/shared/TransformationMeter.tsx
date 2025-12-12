import React from 'react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { Sparkles } from 'lucide-react';

interface TransformationMeterProps {
  personalProgress: number;
  communityProgress: number;
  nationalProgress: number;
  className?: string;
}

export const TransformationMeter: React.FC<TransformationMeterProps> = ({
  personalProgress,
  communityProgress,
  nationalProgress,
  className,
}) => {
  const { isBangla } = useLanguage();

  const levels = [
    {
      label: isBangla ? 'ব্যক্তিগত' : 'Personal',
      progress: personalProgress,
      color: 'from-emerald-500 to-green-600',
    },
    {
      label: isBangla ? 'সম্প্রদায়' : 'Community',
      progress: communityProgress,
      color: 'from-blue-500 to-indigo-600',
    },
    {
      label: isBangla ? 'জাতীয়' : 'National',
      progress: nationalProgress,
      color: 'from-amber-500 to-yellow-600',
    },
  ];

  const overallProgress = Math.round(
    (personalProgress + communityProgress + nationalProgress) / 3
  );

  return (
    <div className={cn('glass-card rounded-2xl p-5 space-y-4', className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-accent" />
          <h3 className="font-semibold text-foreground">
            {isBangla ? 'রূপান্তর মিটার' : 'Transformation Meter'}
          </h3>
        </div>
        <div className="text-2xl font-bold text-gradient-bd">
          {overallProgress}%
        </div>
      </div>

      <div className="space-y-3">
        {levels.map((level, index) => (
          <div key={index} className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{level.label}</span>
              <span className="font-medium text-foreground">{level.progress}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className={cn(
                  'h-full rounded-full bg-gradient-to-r transition-all duration-700',
                  level.color
                )}
                style={{ width: `${level.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-center text-muted-foreground pt-2 border-t border-border/50">
        {isBangla
          ? 'আপনার বৃদ্ধি বাংলাদেশের রূপান্তরে অবদান রাখছে'
          : 'Your growth contributes to Bangladesh\'s transformation'}
      </p>
    </div>
  );
};

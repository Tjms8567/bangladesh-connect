import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { TrendingUp, User, Flag } from 'lucide-react';

interface ImpactCalculatorProps {
  personalScore: number;
  nationalScore: number;
  gdpContribution: number; // In USD
  className?: string;
}

export const ImpactCalculator: React.FC<ImpactCalculatorProps> = ({
  personalScore,
  nationalScore,
  gdpContribution,
  className,
}) => {
  const { isBangla } = useLanguage();

  const formatCurrency = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(2)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(1)}K`;
    return `$${value.toFixed(0)}`;
  };

  return (
    <div className={cn('rounded-2xl bg-gradient-to-br from-accent/20 to-primary/20 p-5 border border-border', className)}>
      <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
        📊 {isBangla ? 'প্রভাব ক্যালকুলেটর' : 'Impact Calculator'}
      </h3>

      <div className="grid grid-cols-2 gap-4">
        {/* Personal Score */}
        <div className="bg-background/60 rounded-xl p-4 text-center">
          <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-secondary/20 flex items-center justify-center">
            <User className="w-6 h-6 text-secondary" />
          </div>
          <div className="relative h-16 flex items-center justify-center">
            <svg className="w-16 h-16 -rotate-90">
              <circle
                cx="32"
                cy="32"
                r="28"
                fill="none"
                stroke="hsl(var(--muted))"
                strokeWidth="6"
              />
              <circle
                cx="32"
                cy="32"
                r="28"
                fill="none"
                stroke="hsl(var(--secondary))"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={`${personalScore * 1.76} 176`}
                className="transition-all duration-1000"
              />
            </svg>
            <span className="absolute text-xl font-bold text-foreground">{personalScore}</span>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {isBangla ? 'ব্যক্তিগত বৃদ্ধি' : 'Personal Growth'}
          </p>
        </div>

        {/* National Score */}
        <div className="bg-background/60 rounded-xl p-4 text-center">
          <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-primary/20 flex items-center justify-center">
            <Flag className="w-6 h-6 text-primary" />
          </div>
          <div className="relative h-16 flex items-center justify-center">
            <svg className="w-16 h-16 -rotate-90">
              <circle
                cx="32"
                cy="32"
                r="28"
                fill="none"
                stroke="hsl(var(--muted))"
                strokeWidth="6"
              />
              <circle
                cx="32"
                cy="32"
                r="28"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={`${nationalScore * 1.76} 176`}
                className="transition-all duration-1000"
              />
            </svg>
            <span className="absolute text-xl font-bold text-foreground">{nationalScore}</span>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {isBangla ? 'জাতীয় অবদান' : 'National Contribution'}
          </p>
        </div>
      </div>

      {/* GDP Contribution */}
      <div className="mt-4 bg-gradient-to-r from-success/20 to-success/10 rounded-xl p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-success" />
            <span className="text-sm font-medium text-foreground">
              {isBangla ? 'জিডিপি অবদান' : 'GDP Contribution'}
            </span>
          </div>
          <span className="text-lg font-bold text-success">{formatCurrency(gdpContribution)}</span>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          {isBangla 
            ? `আপনার ক্রিয়াকলাপ বাংলাদেশকে ${formatCurrency(gdpContribution)} $১ ট্রিলিয়ন লক্ষ্যের কাছে নিয়ে যায়`
            : `Your actions move Bangladesh ${formatCurrency(gdpContribution)} closer to $1T goal`
          }
        </p>
      </div>
    </div>
  );
};

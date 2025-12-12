import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { SECTORS } from '@/types/sectors';
import { nationalTransformationData } from '@/data/sectorMockData';
import { cn } from '@/lib/utils';

interface PaddyFieldVisualizationProps {
  className?: string;
  interactive?: boolean;
  onSectorClick?: (sectorId: string) => void;
}

export const PaddyFieldVisualization: React.FC<PaddyFieldVisualizationProps> = ({
  className,
  interactive = true,
  onSectorClick,
}) => {
  const { isBangla } = useLanguage();
  const { gdpProgress, sectorProgress } = nationalTransformationData;

  const overallProgress = (gdpProgress.current / gdpProgress.target) * 100;

  return (
    <div className={cn('relative w-full', className)}>
      {/* Field Background */}
      <div className="relative bg-gradient-to-b from-sky-200 to-sky-100 dark:from-sky-900 dark:to-sky-800 rounded-2xl p-6 overflow-hidden">
        {/* Sun */}
        <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full shadow-lg animate-pulse-gentle" />
        
        {/* Clouds */}
        <div className="absolute top-6 left-10 w-12 h-4 bg-white/60 rounded-full" />
        <div className="absolute top-8 left-6 w-16 h-4 bg-white/50 rounded-full" />
        
        {/* GDP Progress Display */}
        <div className="relative z-10 text-center mb-6">
          <h3 className="text-lg font-bold text-foreground">
            {isBangla ? 'জাতীয় রূপান্তর অগ্রগতি' : 'National Transformation Progress'}
          </h3>
          <div className="flex items-center justify-center gap-2 mt-2">
            <span className="text-4xl font-bold text-primary">${gdpProgress.current}B</span>
            <span className="text-muted-foreground">/ ${gdpProgress.target}B</span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            {isBangla ? `লক্ষ্য: ২০৩৪ সালের মধ্যে $১ ট্রিলিয়ন` : `Target: $1 Trillion by 2034`}
          </p>
        </div>

        {/* Paddy Field */}
        <div className="relative h-48 bg-gradient-to-b from-green-400/30 to-green-600/30 rounded-xl overflow-hidden">
          {/* Ground */}
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-amber-700 to-amber-600" />
          
          {/* Paddy Stalks - One for each sector */}
          <div className="absolute bottom-12 left-0 right-0 flex justify-around px-4">
            {SECTORS.map((sector, index) => {
              const progress = sectorProgress.find(s => s.sector.toLowerCase() === sector.id)?.progress || 0;
              const stalkHeight = 20 + (progress * 1.2); // Height based on progress
              const grainCount = Math.floor(progress / 10); // Number of grains based on progress
              
              return (
                <button
                  key={sector.id}
                  onClick={() => interactive && onSectorClick?.(sector.id)}
                  className={cn(
                    'relative flex flex-col items-center transition-transform',
                    interactive && 'hover:scale-110 cursor-pointer'
                  )}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Stalk */}
                  <div 
                    className="w-1 bg-gradient-to-t from-green-700 to-green-500 rounded-full animate-float"
                    style={{ 
                      height: `${stalkHeight}px`,
                      animationDelay: `${index * 0.2}s` 
                    }}
                  />
                  
                  {/* Grains/Ear */}
                  <div className="absolute -top-2 flex flex-col items-center">
                    {Array.from({ length: Math.min(grainCount, 8) }).map((_, i) => (
                      <div
                        key={i}
                        className="w-2 h-1.5 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full mb-0.5 animate-pulse-gentle"
                        style={{ 
                          transform: `rotate(${(i % 2 === 0 ? 15 : -15)}deg)`,
                          animationDelay: `${i * 0.1}s`
                        }}
                      />
                    ))}
                  </div>
                  
                  {/* Sector Icon */}
                  <div className="mt-2 text-lg">{sector.icon}</div>
                  <span className="text-[10px] font-medium text-foreground mt-0.5">
                    {progress}%
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          {SECTORS.map(sector => (
            <button
              key={sector.id}
              onClick={() => interactive && onSectorClick?.(sector.id)}
              className={cn(
                'flex items-center gap-2 p-2 rounded-lg bg-background/50 backdrop-blur-sm transition-colors',
                interactive && 'hover:bg-background/80 cursor-pointer'
              )}
            >
              <span className="text-sm">{sector.icon}</span>
              <span className="text-xs font-medium truncate">
                {isBangla ? sector.nameBn : sector.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { nationalTransformationData } from '@/data/sectorMockData';
import { cn } from '@/lib/utils';
import { Users, Trophy, Target, CheckCircle, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface NationalQuestsProps {
  className?: string;
  onQuestClick?: (questId: string) => void;
}

export const NationalQuests: React.FC<NationalQuestsProps> = ({
  className,
  onQuestClick,
}) => {
  const { isBangla } = useLanguage();
  const { nationalQuests } = nationalTransformationData;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-success bg-success/10';
      case 'active': return 'text-primary bg-primary/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'active': return <Clock className="w-4 h-4" />;
      default: return <Target className="w-4 h-4" />;
    }
  };

  return (
    <div className={cn('rounded-2xl bg-background/50 backdrop-blur-sm border border-border p-5', className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
          🎯 {isBangla ? 'জাতীয় রূপান্তর কোয়েস্ট' : 'National Transformation Quests'}
        </h3>
        <Button variant="ghost" size="sm" className="text-xs">
          {isBangla ? 'সব দেখুন' : 'View All'}
          <ArrowRight className="w-3 h-3 ml-1" />
        </Button>
      </div>

      <div className="space-y-4">
        {nationalQuests.map(quest => {
          const progressPercentage = typeof quest.progress === 'number' && typeof quest.target === 'number'
            ? Math.min((quest.progress / quest.target) * 100, 100)
            : 0;

          return (
            <button
              key={quest.id}
              onClick={() => onQuestClick?.(quest.id)}
              className="w-full text-left p-4 rounded-xl bg-card border border-border hover:border-primary transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">
                    {isBangla ? quest.nameBn : quest.name}
                  </h4>
                  <div className={cn('inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs mt-1', getStatusColor(quest.status))}>
                    {getStatusIcon(quest.status)}
                    <span className="capitalize">{quest.status}</span>
                  </div>
                </div>
                {quest.status === 'completed' && (
                  <Trophy className="w-6 h-6 text-warning" />
                )}
              </div>

              {/* Progress */}
              <div className="mb-3">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">
                    {isBangla ? 'অগ্রগতি' : 'Progress'}
                  </span>
                  <span className="font-medium">
                    {typeof quest.progress === 'number' 
                      ? quest.progress.toLocaleString() 
                      : `${quest.progress}%`} / {typeof quest.target === 'number' 
                      ? quest.target.toLocaleString() 
                      : `${quest.target}%`}
                  </span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Users className="w-3 h-3" />
                  <span>{quest.participants.toLocaleString()} {isBangla ? 'অংশগ্রহণকারী' : 'participants'}</span>
                </div>
                <span className="text-success font-medium">{quest.impact}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Call to Action */}
      <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
        <p className="text-sm text-center text-foreground">
          {isBangla 
            ? '🌾 প্রতিটি কাজ বাংলাদেশের রূপান্তরে অবদান রাখে!'
            : '🌾 Every action contributes to Bangladesh\'s transformation!'
          }
        </p>
      </div>
    </div>
  );
};

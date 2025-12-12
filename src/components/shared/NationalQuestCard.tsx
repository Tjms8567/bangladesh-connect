import React from 'react';
import { cn } from '@/lib/utils';
import { ChevronRight, Users, Target, Trophy } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

interface NationalQuestCardProps {
  title: string;
  titleBn: string;
  description: string;
  descriptionBn: string;
  progress: number;
  target: number;
  current: number;
  participants: number;
  reward: number;
  deadline: string;
  icon: string;
  isBangla: boolean;
  className?: string;
}

export const NationalQuestCard: React.FC<NationalQuestCardProps> = ({
  title,
  titleBn,
  description,
  descriptionBn,
  progress,
  target,
  current,
  participants,
  reward,
  deadline,
  icon,
  isBangla,
  className,
}) => {
  return (
    <GlassCard className={cn('p-4', className)}>
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center shrink-0 text-2xl">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground truncate">
            {isBangla ? titleBn : title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mt-0.5">
            {isBangla ? descriptionBn : description}
          </p>
          
          <div className="mt-3 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">
                {current.toLocaleString()} / {target.toLocaleString()}
              </span>
              <span className="font-medium text-primary">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              <span>{participants.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Trophy className="w-3 h-3 text-accent" />
              <span className="text-accent-foreground">+{reward} {isBangla ? 'পয়েন্ট' : 'pts'}</span>
            </div>
            <span className="ml-auto">{deadline}</span>
          </div>
        </div>
      </div>
      
      <Button variant="outline" size="sm" className="w-full mt-4 rounded-xl">
        {isBangla ? 'অংশগ্রহণ করুন' : 'Join Quest'}
        <ChevronRight className="w-4 h-4 ml-1" />
      </Button>
    </GlassCard>
  );
};

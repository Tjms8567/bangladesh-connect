import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

interface PaddyLoaderProps {
  onComplete?: () => void;
  duration?: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  message?: string;
  showProgress?: boolean;
}

const phases = [
  {
    progress: 25,
    text: 'Your journey begins with one seed of change...',
    textBn: 'আপনার যাত্রা শুরু হয় পরিবর্তনের একটি বীজ দিয়ে...',
  },
  {
    progress: 50,
    text: 'Nurturing your potential to grow...',
    textBn: 'আপনার সম্ভাবনাকে বেড়ে উঠতে লালন করছি...',
  },
  {
    progress: 75,
    text: 'Your growth ripples through communities...',
    textBn: 'আপনার বৃদ্ধি সম্প্রদায়ে ছড়িয়ে পড়ছে...',
  },
  {
    progress: 100,
    text: 'Together, we change Bangladesh!',
    textBn: 'একসাথে, আমরা বাংলাদেশ বদলাই!',
  },
];

export const PaddyLoader: React.FC<PaddyLoaderProps> = ({
  onComplete,
  duration = 4000,
  className,
  size = 'md',
  message,
  showProgress = true,
}) => {
  const [progress, setProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState(0);
  const { isBangla } = useLanguage();

  const sizeClasses = {
    sm: { container: 'h-24', animation: 'scale-75', text: 'text-xs', progress: 'w-32' },
    md: { container: 'h-40', animation: 'scale-100', text: 'text-sm', progress: 'w-64' },
    lg: { container: 'h-56', animation: 'scale-125', text: 'text-base', progress: 'w-80' },
  };

  useEffect(() => {
    if (!onComplete && !showProgress) return; // Skip auto-progress for simple loader
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 1;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => onComplete?.(), 500);
          return 100;
        }
        return next;
      });
    }, duration / 100);

    return () => clearInterval(interval);
  }, [duration, onComplete, showProgress]);

  useEffect(() => {
    const phase = phases.findIndex((p) => progress <= p.progress);
    setCurrentPhase(phase === -1 ? phases.length - 1 : phase);
  }, [progress]);

  const renderPaddyStage = () => {
    // Simple animated loader for non-progress mode
    if (!showProgress && !onComplete) {
      return (
        <div className="relative flex items-center justify-center">
          {/* Central seed/grain */}
          <div className="relative">
            <div className="w-8 h-10 rounded-full bg-gradient-to-b from-amber-400 to-amber-600 animate-pulse shadow-lg shadow-amber-500/30" />
            {/* Growing stalks */}
            {[0, 60, 120, 180, 240, 300].map((angle, idx) => (
              <div
                key={angle}
                className="absolute top-1/2 left-1/2 origin-center"
                style={{
                  transform: `rotate(${angle}deg) translateX(-50%)`,
                  animation: `paddyGrow 1.5s ease-in-out infinite`,
                  animationDelay: `${idx * 0.1}s`,
                }}
              >
                <div className="w-1 h-6 bg-gradient-to-t from-primary to-emerald-400 rounded-full -mt-8" />
                <div className="w-2 h-3 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-full -mt-1 ml-[-2px]" />
              </div>
            ))}
          </div>
          <style>{`
            @keyframes paddyGrow {
              0%, 100% { transform: rotate(var(--angle)) translateY(-100%) scaleY(0.8); opacity: 0.6; }
              50% { transform: rotate(var(--angle)) translateY(-100%) scaleY(1); opacity: 1; }
            }
          `}</style>
        </div>
      );
    }

    // Original progressive animation
    if (progress <= 25) {
      return (
        <div className="relative flex items-center justify-center">
          <div
            className={cn(
              'w-8 h-12 rounded-full bg-gradient-to-b from-amber-400 to-amber-600',
              'animate-pulse-gentle shadow-lg shadow-amber-500/30'
            )}
            style={{ transform: `scale(${0.8 + (progress / 25) * 0.2})` }}
          />
          <div className="absolute -bottom-2 w-1 h-4 bg-amber-700 rounded-full opacity-50" />
        </div>
      );
    }

    if (progress <= 50) {
      const sproutProgress = (progress - 25) / 25;
      return (
        <div className="relative flex flex-col items-center">
          <div className="relative">
            <div
              className="absolute -left-6 top-4 w-6 h-2 bg-gradient-to-r from-green-500 to-green-400 rounded-full origin-right"
              style={{ transform: `rotate(-30deg) scaleX(${sproutProgress})` }}
            />
            <div
              className="absolute -right-6 top-4 w-6 h-2 bg-gradient-to-l from-green-500 to-green-400 rounded-full origin-left"
              style={{ transform: `rotate(30deg) scaleX(${sproutProgress})` }}
            />
            <div
              className="w-2 bg-gradient-to-t from-green-600 to-green-400 rounded-full mx-auto"
              style={{ height: `${40 + sproutProgress * 40}px` }}
            />
          </div>
          <div className="flex gap-1 -mt-1">
            <div className="w-1 h-6 bg-amber-700/60 rounded-full" style={{ transform: `rotate(-20deg) scaleY(${sproutProgress})` }} />
            <div className="w-1 h-8 bg-amber-700/70 rounded-full" style={{ transform: `scaleY(${sproutProgress})` }} />
            <div className="w-1 h-6 bg-amber-700/60 rounded-full" style={{ transform: `rotate(20deg) scaleY(${sproutProgress})` }} />
          </div>
        </div>
      );
    }

    if (progress <= 75) {
      const matureProgress = (progress - 50) / 25;
      return (
        <div className="relative flex items-end justify-center gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="relative flex flex-col items-center"
              style={{ transform: `rotate(${(i - 1) * 8}deg)`, opacity: 0.7 + matureProgress * 0.3 }}
            >
              <div className="relative mb-1">
                {[...Array(5)].map((_, j) => (
                  <div
                    key={j}
                    className="absolute w-2 h-3 bg-gradient-to-t from-amber-500 to-yellow-400 rounded-full shadow-sm"
                    style={{
                      left: `${(j - 2) * 4}px`,
                      top: `${Math.abs(j - 2) * 2}px`,
                      transform: `rotate(${(j - 2) * 15}deg) scale(${matureProgress})`,
                    }}
                  />
                ))}
              </div>
              <div className="w-1.5 bg-gradient-to-t from-green-700 to-green-500 rounded-full" style={{ height: `${60 + i * 10}px` }} />
            </div>
          ))}
        </div>
      );
    }

    const transformProgress = (progress - 75) / 25;
    return (
      <div className="relative flex items-center justify-center">
        <div className="flex gap-3" style={{ opacity: transformProgress, transform: `scale(${0.8 + transformProgress * 0.2})` }}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-white text-lg shadow-lg animate-float">🎓</div>
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center text-white text-xl shadow-lg animate-float" style={{ animationDelay: '0.2s' }}>🇧🇩</div>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-lg shadow-lg animate-float" style={{ animationDelay: '0.4s' }}>💼</div>
        </div>
      </div>
    );
  };

  const displayMessage = message || (showProgress ? (isBangla ? phases[currentPhase].textBn : phases[currentPhase].text) : undefined);

  return (
    <div className={cn('flex flex-col items-center justify-center gap-6', className)}>
      <div className={cn(sizeClasses[size].container, 'flex items-center justify-center', sizeClasses[size].animation)}>
        {renderPaddyStage()}
      </div>

      {(showProgress || message) && (
        <div className={cn(sizeClasses[size].progress, 'space-y-3')}>
          {showProgress && (
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary via-accent to-bd-green rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
          {displayMessage && (
            <p className={cn('text-center text-muted-foreground animate-fade-in', sizeClasses[size].text)}>
              {displayMessage}
            </p>
          )}
        </div>
      )}

      {showProgress && (
        <div className="text-3xl font-bold text-gradient-bd">{progress}%</div>
      )}
    </div>
  );
};

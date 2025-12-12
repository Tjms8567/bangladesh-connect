import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/ui/Logo';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'logo' | 'text' | 'fade'>('logo');

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase('text'), 800);
    const timer2 = setTimeout(() => setPhase('fade'), 2200);
    const timer3 = setTimeout(() => onComplete(), 2800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <div
      className={cn(
        'fixed inset-0 z-[100] flex flex-col items-center justify-center transition-opacity duration-500',
        'bg-gradient-to-br from-[hsl(160,100%,22%)] via-[hsl(160,80%,25%)] to-[hsl(120,79%,28%)]',
        phase === 'fade' && 'opacity-0 pointer-events-none'
      )}
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-64 h-64 bg-white/5 rounded-full animate-logo-spin" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-white/5 rounded-full animate-logo-spin" style={{ animationDirection: 'reverse' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/5 rounded-full animate-pulse-gentle" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Animated Logo */}
        <div
          className={cn(
            'transition-all duration-700 ease-out',
            phase === 'logo' ? 'scale-100 opacity-100' : 'scale-90 opacity-100'
          )}
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-white/20 blur-2xl animate-glow-pulse" style={{ transform: 'scale(1.5)' }} />
            <Logo 
              size="xl" 
              animation={phase === 'logo' ? 'entrance' : 'pulse'}
              showGlow
              className="relative z-10"
            />
          </div>
        </div>

        {/* Text Content */}
        <div
          className={cn(
            'mt-8 text-center transition-all duration-500',
            phase === 'logo' ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
          )}
        >
          <h1 className="text-3xl font-bold text-white mb-2">
            বাংলাদেশ ২.০
          </h1>
          <p className="text-lg text-white/90 font-medium">
            Bangladesh 2.0
          </p>
          <p className="mt-4 text-sm text-white/70 max-w-xs">
            নিজেকে বদলাও, বাংলাদেশ বদলাবে
          </p>
          <p className="text-xs text-white/50 mt-1">
            Change yourself to change Bangladesh
          </p>
        </div>

        {/* Loading indicator */}
        <div
          className={cn(
            'mt-12 flex items-center gap-2 transition-all duration-500',
            phase === 'logo' ? 'opacity-0' : 'opacity-100'
          )}
        >
          <div className="w-2 h-2 rounded-full bg-white animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 rounded-full bg-white animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 rounded-full bg-white animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>

      {/* Bottom branding */}
      <div className="absolute bottom-8 text-center">
        <p className="text-xs text-white/50">
          গণপ্রজাতন্ত্রী বাংলাদেশ সরকার
        </p>
        <p className="text-xs text-white/40 mt-1">
          Government of Bangladesh
        </p>
      </div>
    </div>
  );
};

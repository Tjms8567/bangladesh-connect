import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import logoImage from '@/assets/logo-bangladesh.png';

type LogoSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
type LogoAnimation = 'none' | 'pulse' | 'spin' | 'float' | 'shimmer' | 'entrance' | 'glow';

interface LogoProps {
  size?: LogoSize;
  animation?: LogoAnimation;
  className?: string;
  showGlow?: boolean;
}

const sizeClasses: Record<LogoSize, string> = {
  xs: 'w-10 h-10',
  sm: 'w-12 h-12',
  md: 'w-16 h-16',
  lg: 'w-24 h-24',
  xl: 'w-32 h-32',
  '2xl': 'w-40 h-40',
};

const animationClasses: Record<LogoAnimation, string> = {
  none: '',
  pulse: 'animate-logo-pulse',
  spin: 'animate-logo-spin-slow',
  float: 'animate-float',
  shimmer: 'animate-shimmer-gold',
  entrance: 'animate-entrance-bounce',
  glow: 'animate-glow-pulse',
};

export const Logo = forwardRef<HTMLDivElement, LogoProps>(({
  size = 'md',
  animation = 'none',
  className,
  showGlow = false,
}, ref) => {
  return (
    <div ref={ref} className={cn('relative inline-flex items-center justify-center', className)}>
      {/* Glow effect behind logo */}
      {showGlow && (
        <div
          className={cn(
            'absolute inset-0 rounded-full blur-xl opacity-50',
            'bg-gradient-to-br from-accent/40 via-primary/30 to-accent/40',
            animation === 'pulse' && 'animate-glow-pulse'
          )}
          style={{ transform: 'scale(1.2)' }}
        />
      )}
      
      {/* Main logo image */}
      <img
        src={logoImage}
        alt="Bangladesh 2.0 - Change Yourself to Change Bangladesh"
        className={cn(
          sizeClasses[size],
          animationClasses[animation],
          'object-contain relative z-10',
          'drop-shadow-lg'
        )}
        style={{
          filter: 'drop-shadow(0 4px 12px rgba(0, 106, 78, 0.3))',
        }}
      />
    </div>
  );
});

Logo.displayName = 'Logo';

export default Logo;

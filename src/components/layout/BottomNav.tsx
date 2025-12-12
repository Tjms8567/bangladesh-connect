import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, GraduationCap, HeartPulse, Wallet, Users } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { PaddyIcon } from '@/components/icons/PaddyIcon';

// Custom icon wrapper for PaddyIcon to match lucide interface
const PaddyIconComponent: React.FC<{ className?: string }> = ({ className }) => (
  <PaddyIcon className={className} size={20} />
);

const navItems = [
  { path: '/', icon: Home, labelKey: 'nav.home' },
  { path: '/education', icon: GraduationCap, labelKey: 'nav.education' },
  { path: '/community', icon: PaddyIconComponent, labelKey: 'nav.community' },
  { path: '/health', icon: HeartPulse, labelKey: 'nav.health' },
  { path: '/finance', icon: Wallet, labelKey: 'nav.finance' },
];

export const BottomNav: React.FC = () => {
  const { t } = useLanguage();
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass-card border-t border-border/50 pb-[env(safe-area-inset-bottom)] bg-background/95 backdrop-blur-xl">
      <div className="flex items-center justify-around px-1 sm:px-2 py-1 sm:py-2 max-w-screen-md mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                'relative flex flex-col items-center justify-center min-w-[56px] sm:min-w-[64px] py-1.5 sm:py-2 px-2 sm:px-3 rounded-xl transition-all duration-300 touch-manipulation',
                isActive
                  ? 'text-primary bg-primary/10'
                  : 'text-muted-foreground hover:text-foreground active:bg-muted/50'
              )}
            >
              <Icon
                className={cn(
                  'w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300',
                  isActive && 'scale-110'
                )}
              />
              <span className={cn(
                'text-[9px] sm:text-[10px] font-medium mt-0.5 truncate max-w-full',
                isActive && 'font-semibold'
              )}>
                {t(item.labelKey)}
              </span>
              {isActive && (
                <span className="absolute -bottom-0.5 w-6 sm:w-8 h-0.5 sm:h-1 bg-primary rounded-full" />
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

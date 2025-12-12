// Visual Role Indicator - Clear display of current role
import React from 'react';
import { useRole } from '@/contexts/RoleContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { Shield, AlertTriangle } from 'lucide-react';

interface RoleIndicatorProps {
  variant?: 'compact' | 'full' | 'badge';
  className?: string;
}

export const RoleIndicator: React.FC<RoleIndicatorProps> = ({ 
  variant = 'compact',
  className 
}) => {
  const { currentRole, roleConfig } = useRole();
  const { isBangla } = useLanguage();

  const isSuperAdmin = currentRole === 'superadmin';
  const isMonitorRole = roleConfig.canMonitor;

  if (variant === 'badge') {
    return (
      <div 
        className={cn(
          'inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium',
          'bg-gradient-to-r text-white',
          roleConfig.gradient,
          className
        )}
      >
        <span>{roleConfig.icon}</span>
        <span className="hidden sm:inline">
          {isBangla ? roleConfig.nameBn : roleConfig.name}
        </span>
        {isMonitorRole && <Shield className="w-3 h-3" />}
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div 
        className={cn(
          'flex items-center gap-2 px-3 py-1.5 rounded-xl',
          'bg-gradient-to-r text-white text-sm font-medium',
          roleConfig.gradient,
          isSuperAdmin && 'ring-2 ring-yellow-400/50 ring-offset-2 ring-offset-background',
          className
        )}
      >
        <span className="text-base">{roleConfig.icon}</span>
        <span className="hidden sm:inline">
          {isBangla ? roleConfig.nameBn : roleConfig.name}
        </span>
        {isSuperAdmin && <Shield className="w-4 h-4 text-yellow-200" />}
      </div>
    );
  }

  // Full variant
  return (
    <div 
      className={cn(
        'flex items-center gap-3 p-3 rounded-2xl',
        'bg-gradient-to-r text-white',
        roleConfig.gradient,
        isSuperAdmin && 'ring-2 ring-yellow-400/50',
        className
      )}
    >
      <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-2xl">
        {roleConfig.icon}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <p className="font-semibold">
            {isBangla ? roleConfig.nameBn : roleConfig.name}
          </p>
          {isMonitorRole && <Shield className="w-4 h-4 text-white/80" />}
        </div>
        <p className="text-sm text-white/80">
          {isBangla ? roleConfig.descriptionBn : roleConfig.description}
        </p>
      </div>
    </div>
  );
};

export default RoleIndicator;

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { useRole } from '@/contexts/RoleContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { UserRole, ROLES } from '@/types/roles';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { Check, ChevronRight } from 'lucide-react';

interface RoleSelectorProps {
  onComplete: (roles: UserRole[]) => void;
  mode?: 'signup' | 'switch';
}

export const RoleSelector: React.FC<RoleSelectorProps> = ({
  onComplete,
  mode = 'signup',
}) => {
  const { availableRoles, setCurrentRole } = useRole();
  const { isBangla } = useLanguage();
  const [selectedRoles, setSelectedRoles] = useState<UserRole[]>(
    mode === 'switch' ? availableRoles : ['citizen']
  );

  const toggleRole = (role: UserRole) => {
    if (role === 'citizen' && mode === 'signup') return; // Citizen is always selected
    
    setSelectedRoles((prev) =>
      prev.includes(role)
        ? prev.filter((r) => r !== role)
        : [...prev, role]
    );
  };

  const handleContinue = () => {
    onComplete(selectedRoles);
  };

  const handleRoleSwitch = (role: UserRole) => {
    if (mode === 'switch') {
      setCurrentRole(role);
      onComplete([role]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">
          {mode === 'signup'
            ? isBangla ? 'আপনার ভূমিকা নির্বাচন করুন' : 'Select Your Roles'
            : isBangla ? 'ভূমিকা পরিবর্তন করুন' : 'Switch Role'}
        </h2>
        <p className="text-muted-foreground text-sm">
          {mode === 'signup'
            ? isBangla
              ? 'আপনি একাধিক ভূমিকা নির্বাচন করতে পারেন'
              : 'You can select multiple roles'
            : isBangla
              ? 'একটি ভূমিকা নির্বাচন করুন'
              : 'Choose a role to switch to'}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 max-h-[60vh] overflow-y-auto pr-2">
        {ROLES.map((role) => {
          const isSelected = selectedRoles.includes(role.id);
          const isAvailable = mode === 'switch' ? availableRoles.includes(role.id) : true;

          if (mode === 'switch' && !isAvailable) return null;

          return (
            <button
              key={role.id}
              onClick={() => mode === 'switch' ? handleRoleSwitch(role.id) : toggleRole(role.id)}
              disabled={role.id === 'citizen' && mode === 'signup'}
              className={cn(
                'relative p-4 rounded-2xl border-2 transition-all duration-300 text-left group',
                'hover:shadow-lg hover:scale-[1.02]',
                isSelected
                  ? 'border-primary bg-primary/5 shadow-md'
                  : 'border-border bg-card hover:border-primary/50',
                role.id === 'citizen' && mode === 'signup' && 'opacity-80 cursor-default'
              )}
            >
              {/* Selected Indicator */}
              {isSelected && (
                <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                  <Check className="w-3 h-3 text-primary-foreground" />
                </div>
              )}

              {/* Role Icon */}
              <div
                className={cn(
                  'w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-3',
                  'bg-gradient-to-br',
                  role.gradient,
                  'shadow-lg group-hover:scale-110 transition-transform'
                )}
              >
                {role.icon}
              </div>

              {/* Role Info */}
              <h3 className="font-semibold text-foreground text-sm">
                {isBangla ? role.nameBn : role.name}
              </h3>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                {isBangla ? role.descriptionBn : role.description}
              </p>

              {/* Impact Metric */}
              {role.impactMetric && (
                <div className="mt-2 text-xs text-primary font-medium">
                  {isBangla ? role.impactMetricBn : role.impactMetric}
                </div>
              )}

              {mode === 'switch' && (
                <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              )}
            </button>
          );
        })}
      </div>

      {mode === 'signup' && (
        <div className="flex flex-col gap-3">
          <div className="text-center text-sm text-muted-foreground">
            {isBangla
              ? `${selectedRoles.length}টি ভূমিকা নির্বাচিত`
              : `${selectedRoles.length} role(s) selected`}
          </div>
          <Button
            onClick={handleContinue}
            className="w-full h-12 rounded-xl text-base"
            disabled={selectedRoles.length === 0}
          >
            {isBangla ? 'চালিয়ে যান' : 'Continue'}
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      )}
    </div>
  );
};

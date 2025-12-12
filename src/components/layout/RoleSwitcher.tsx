import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { useRole } from '@/contexts/RoleContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { getRoleConfig } from '@/types/roles';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ChevronDown, Check, Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { RoleSelector } from '@/components/auth/RoleSelector';

export const RoleSwitcher: React.FC = () => {
  const { currentRole, setCurrentRole, availableRoles, addRole, roleConfig } = useRole();
  const { isBangla } = useLanguage();
  const [showAddRole, setShowAddRole] = useState(false);

  const handleAddRoles = (roles: string[]) => {
    roles.forEach((role) => addRole(role as any));
    setShowAddRole(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className={cn(
              'gap-2 rounded-xl px-3 py-2 h-auto',
              'bg-gradient-to-r',
              roleConfig.gradient,
              'text-white hover:opacity-90 hover:text-white'
            )}
          >
            <span className="text-lg">{roleConfig.icon}</span>
            <span className="text-sm font-medium hidden sm:inline">
              {isBangla ? roleConfig.nameBn : roleConfig.name}
            </span>
            <ChevronDown className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>
            {isBangla ? 'ভূমিকা পরিবর্তন' : 'Switch Role'}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {availableRoles.map((role) => {
            const config = getRoleConfig(role);
            const isActive = currentRole === role;
            return (
              <DropdownMenuItem
                key={role}
                onClick={() => setCurrentRole(role)}
                className={cn(
                  'flex items-center gap-3 cursor-pointer',
                  isActive && 'bg-primary/10'
                )}
              >
                <span
                  className={cn(
                    'w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br text-sm',
                    config.gradient
                  )}
                >
                  {config.icon}
                </span>
                <span className="flex-1 text-sm">
                  {isBangla ? config.nameBn : config.name}
                </span>
                {isActive && <Check className="w-4 h-4 text-primary" />}
              </DropdownMenuItem>
            );
          })}
          <DropdownMenuSeparator />
          <Dialog open={showAddRole} onOpenChange={setShowAddRole}>
            <DialogTrigger asChild>
              <DropdownMenuItem
                onSelect={(e) => e.preventDefault()}
                className="flex items-center gap-3 cursor-pointer text-primary"
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-primary/10">
                  <Plus className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">
                  {isBangla ? 'নতুন ভূমিকা যোগ করুন' : 'Add New Role'}
                </span>
              </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {isBangla ? 'ভূমিকা যোগ করুন' : 'Add Roles'}
                </DialogTitle>
              </DialogHeader>
              <RoleSelector
                mode="signup"
                onComplete={(roles) => {
                  handleAddRoles(roles);
                }}
              />
            </DialogContent>
          </Dialog>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

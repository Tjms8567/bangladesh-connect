import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { UserRole, RoleConfig, getRoleConfig, ROLES } from '@/types/roles';

interface RoleContextType {
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  roleConfig: RoleConfig;
  availableRoles: UserRole[];
  addRole: (role: UserRole) => void;
  removeRole: (role: UserRole) => void;
  hasRole: (role: UserRole) => boolean;
  allRoles: RoleConfig[];
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

const STORAGE_KEY = 'bd2-user-roles';
const CURRENT_ROLE_KEY = 'bd2-current-role';

export const RoleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [availableRoles, setAvailableRoles] = useState<UserRole[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : ['citizen'];
  });

  const [currentRole, setCurrentRoleState] = useState<UserRole>(() => {
    const stored = localStorage.getItem(CURRENT_ROLE_KEY);
    return (stored as UserRole) || 'citizen';
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(availableRoles));
  }, [availableRoles]);

  useEffect(() => {
    localStorage.setItem(CURRENT_ROLE_KEY, currentRole);
  }, [currentRole]);

  const setCurrentRole = (role: UserRole) => {
    if (availableRoles.includes(role) || role === currentRole) {
      setCurrentRoleState(role);
    }
  };

  const addRole = (role: UserRole) => {
    if (!availableRoles.includes(role)) {
      setAvailableRoles([...availableRoles, role]);
    }
  };

  const removeRole = (role: UserRole) => {
    if (role !== 'citizen') {
      setAvailableRoles(availableRoles.filter(r => r !== role));
      if (currentRole === role) {
        setCurrentRoleState('citizen');
      }
    }
  };

  const hasRole = (role: UserRole) => availableRoles.includes(role);

  const roleConfig = getRoleConfig(currentRole);

  return (
    <RoleContext.Provider
      value={{
        currentRole,
        setCurrentRole,
        roleConfig,
        availableRoles,
        addRole,
        removeRole,
        hasRole,
        allRoles: ROLES,
      }}
    >
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = (): RoleContextType => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};

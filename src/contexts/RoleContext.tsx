import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { UserRole, RoleConfig, getRoleConfig, ROLES, isSuperAdmin } from '@/types/roles';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface RoleContextType {
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  roleConfig: RoleConfig;
  availableRoles: UserRole[];
  addRole: (role: UserRole) => void;
  removeRole: (role: UserRole) => void;
  hasRole: (role: UserRole) => boolean;
  allRoles: RoleConfig[];
  dbRole: 'admin' | 'moderator' | 'user' | 'superadmin' | null;
  isSuperAdminUser: boolean;
  isAdmin: boolean;
  isLoading: boolean;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

const STORAGE_KEY = 'bd2-user-roles';
const CURRENT_ROLE_KEY = 'bd2-current-role';

export const RoleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [dbRole, setDbRole] = useState<'admin' | 'moderator' | 'user' | 'superadmin' | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [availableRoles, setAvailableRoles] = useState<UserRole[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : ['citizen'];
  });

  const [currentRole, setCurrentRoleState] = useState<UserRole>(() => {
    const stored = localStorage.getItem(CURRENT_ROLE_KEY);
    return (stored as UserRole) || 'citizen';
  });

  // Fetch the user's database role
  useEffect(() => {
    const fetchDbRole = async () => {
      if (!user) {
        setDbRole(null);
        setIsLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .maybeSingle();

        if (error) {
          console.error('Error fetching user role:', error);
          setDbRole('user');
        } else {
          const role = (data?.role as 'admin' | 'moderator' | 'user' | 'superadmin') || 'user';
          setDbRole(role);
          
          // If user is superadmin, automatically add all roles
          if (role === 'superadmin') {
            const allRoleIds = ROLES.map(r => r.id);
            setAvailableRoles(allRoleIds);
            // Set superadmin as default role for superadmin users
            if (!localStorage.getItem(CURRENT_ROLE_KEY)) {
              setCurrentRoleState('superadmin');
            }
          } else if (role === 'admin') {
            // Admin gets access to admin-level roles
            const adminRoles: UserRole[] = ['citizen', 'admin', 'government', 'business'];
            setAvailableRoles(prev => [...new Set([...prev, ...adminRoles])]);
          }
        }
      } catch (err) {
        console.error('Error fetching user role:', err);
        setDbRole('user');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDbRole();
  }, [user]);

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

  const isSuperAdminUser = dbRole === 'superadmin' || isSuperAdmin(currentRole);
  const isAdmin = dbRole === 'admin' || dbRole === 'superadmin';

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
        dbRole,
        isSuperAdminUser,
        isAdmin,
        isLoading,
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

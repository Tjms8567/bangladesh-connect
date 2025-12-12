import React from 'react';
import { Navigate } from 'react-router-dom';
import { useRole } from '@/contexts/RoleContext';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';
import { UserRole } from '@/types/roles';

interface RoleProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
  fallbackPath?: string;
}

export const RoleProtectedRoute: React.FC<RoleProtectedRouteProps> = ({
  children,
  allowedRoles,
  fallbackPath = '/',
}) => {
  const { isAuthenticated, isLoading: authLoading, demoUser } = useAuth();
  const { currentRole, hasRole } = useRole();

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  // Check if user has any of the allowed roles
  const hasAccess = allowedRoles.some(role => hasRole(role) || currentRole === role);
  
  // Super admin has access to everything
  const isSuperAdmin = currentRole === 'superadmin' || demoUser?.isSuperAdmin;

  if (!hasAccess && !isSuperAdmin) {
    return <Navigate to={fallbackPath} replace />;
  }

  return <>{children}</>;
};

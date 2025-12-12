// Role Container System - Walled Garden Architecture
// Each role operates in complete isolation

import React, { useState, useEffect, useCallback, Suspense, lazy } from 'react';
import { useRole } from '@/contexts/RoleContext';
import { UserRole } from '@/types/roles';
import { PaddyLoader } from '@/components/animations/PaddyLoader';

interface RoleContainerState {
  isTransitioning: boolean;
  previousRole: UserRole | null;
  currentRole: UserRole;
  mountKey: number;
}

// Lazy load all dashboards for better performance
const dashboardComponents: Record<UserRole, React.LazyExoticComponent<React.FC>> = {
  superadmin: lazy(() => import('@/components/dashboard/superadmin/SuperAdminDashboard').then(m => ({ default: m.SuperAdminDashboard }))),
  citizen: lazy(() => import('@/components/dashboard/citizen/CitizenDashboard').then(m => ({ default: m.CitizenDashboard }))),
  student: lazy(() => import('@/components/dashboard/student/StudentDashboard').then(m => ({ default: m.StudentDashboard }))),
  voter: lazy(() => import('@/components/dashboard/voter/VoterDashboard').then(m => ({ default: m.VoterDashboard }))),
  guest: lazy(() => import('@/components/dashboard/guest/GuestDashboard').then(m => ({ default: m.GuestDashboard }))),
  government: lazy(() => import('@/components/dashboard/government/GovernmentDashboard').then(m => ({ default: m.GovernmentDashboard }))),
  admin: lazy(() => import('@/components/dashboard/admin/AdminDashboard').then(m => ({ default: m.AdminDashboard }))),
  medical: lazy(() => import('@/components/dashboard/medical/MedicalDashboard').then(m => ({ default: m.MedicalDashboard }))),
  hospital: lazy(() => import('@/components/dashboard/hospital/HospitalDashboard').then(m => ({ default: m.HospitalDashboard }))),
  university: lazy(() => import('@/components/dashboard/university/UniversityDashboard').then(m => ({ default: m.UniversityDashboard }))),
  business: lazy(() => import('@/components/dashboard/business/BusinessDashboard').then(m => ({ default: m.BusinessDashboard }))),
  marketplace: lazy(() => import('@/components/dashboard/marketplace/MarketplaceDashboard').then(m => ({ default: m.MarketplaceDashboard }))),
  founder: lazy(() => import('@/components/dashboard/founder/FounderDashboard').then(m => ({ default: m.FounderDashboard }))),
  social: lazy(() => import('@/components/dashboard/social/SocialDashboard').then(m => ({ default: m.SocialDashboard }))),
  customer: lazy(() => import('@/components/dashboard/customer/CustomerDashboard').then(m => ({ default: m.CustomerDashboard }))),
  farmer: lazy(() => import('@/components/dashboard/farmer/FarmerDashboard').then(m => ({ default: m.FarmerDashboard }))),
};

// Role-specific storage keys (complete isolation)
export const getRoleStorageKey = (role: UserRole, key: string, userId?: string): string => {
  const userPrefix = userId ? `${userId}:` : '';
  return `bd2:${role}:${userPrefix}${key}`;
};

// Clear role-specific data from memory
const clearRoleState = (role: UserRole) => {
  // Clear only role-specific localStorage items
  const keysToRemove: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith(`bd2:${role}:`)) {
      keysToRemove.push(key);
    }
  }
  keysToRemove.forEach(key => localStorage.removeItem(key));
};

// Role Container Loading Fallback
const RoleLoadingFallback: React.FC = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <PaddyLoader showProgress={false} message="Loading your dashboard..." />
  </div>
);

// Role Container Error Boundary
class RoleErrorBoundary extends React.Component<
  { children: React.ReactNode; role: UserRole; onError: () => void },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(`Role container crash [${this.props.role}]:`, error, errorInfo);
    this.props.onError();
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-foreground mb-2">Dashboard Error</h2>
          <p className="text-muted-foreground mb-4">
            Something went wrong loading this dashboard.
          </p>
          <button
            onClick={() => {
              this.setState({ hasError: false, error: null });
              window.location.reload();
            }}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-xl"
          >
            Reload Dashboard
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Main Role Container System
export const RoleContainerSystem: React.FC = () => {
  const { currentRole } = useRole();
  const [containerState, setContainerState] = useState<RoleContainerState>({
    isTransitioning: false,
    previousRole: null,
    currentRole,
    mountKey: 0,
  });

  // Handle role switch with proper cleanup
  const handleRoleSwitch = useCallback(async (newRole: UserRole) => {
    if (newRole === containerState.currentRole) return;

    // 1. Start transition (show loading)
    setContainerState(prev => ({
      ...prev,
      isTransitioning: true,
      previousRole: prev.currentRole,
    }));

    // 2. Clear previous role state from memory (optional - for complete isolation)
    // clearRoleState(containerState.currentRole);

    // 3. Simulate network/loading delay for smooth UX
    await new Promise(resolve => setTimeout(resolve, 800));

    // 4. Mount new role container with fresh state
    setContainerState(prev => ({
      isTransitioning: false,
      previousRole: prev.currentRole,
      currentRole: newRole,
      mountKey: prev.mountKey + 1,
    }));
  }, [containerState.currentRole]);

  // Watch for role changes
  useEffect(() => {
    if (currentRole !== containerState.currentRole) {
      handleRoleSwitch(currentRole);
    }
  }, [currentRole, containerState.currentRole, handleRoleSwitch]);

  // Handle container crash
  const handleContainerError = useCallback(() => {
    console.log(`Container error in role: ${containerState.currentRole}`);
  }, [containerState.currentRole]);

  // Show transition loading
  if (containerState.isTransitioning) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center animate-fade-in">
        <PaddyLoader showProgress={false} message="Switching to your dashboard..." />
      </div>
    );
  }

  // Get the dashboard component for current role
  const DashboardComponent = dashboardComponents[containerState.currentRole];

  return (
    <div 
      key={`role-container-${containerState.currentRole}-${containerState.mountKey}`}
      className="role-container animate-fade-in"
      data-role={containerState.currentRole}
    >
      <RoleErrorBoundary 
        role={containerState.currentRole} 
        onError={handleContainerError}
      >
        <Suspense fallback={<RoleLoadingFallback />}>
          <DashboardComponent />
        </Suspense>
      </RoleErrorBoundary>
    </div>
  );
};

export default RoleContainerSystem;

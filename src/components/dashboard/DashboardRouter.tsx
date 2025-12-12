import React from 'react';
import { SuperAdminDashboard } from './superadmin/SuperAdminDashboard';
import { useRole } from '@/contexts/RoleContext';
import { CitizenDashboard } from './citizen/CitizenDashboard';
import { StudentDashboard } from './student/StudentDashboard';
import { VoterDashboard } from './voter/VoterDashboard';
import { GuestDashboard } from './guest/GuestDashboard';
import { GovernmentDashboard } from './government/GovernmentDashboard';
import { AdminDashboard } from './admin/AdminDashboard';
import { MedicalDashboard } from './medical/MedicalDashboard';
import { HospitalDashboard } from './hospital/HospitalDashboard';
import { UniversityDashboard } from './university/UniversityDashboard';
import { BusinessDashboard } from './business/BusinessDashboard';
import { MarketplaceDashboard } from './marketplace/MarketplaceDashboard';
import { FounderDashboard } from './founder/FounderDashboard';
import { SocialDashboard } from './social/SocialDashboard';
import { CustomerDashboard } from './customer/CustomerDashboard';
import { FarmerDashboard } from './farmer/FarmerDashboard';

export const DashboardRouter: React.FC = () => {
  const { currentRole } = useRole();

  const dashboards: Record<string, React.ReactNode> = {
    superadmin: <SuperAdminDashboard />,
    citizen: <CitizenDashboard />,
    student: <StudentDashboard />,
    voter: <VoterDashboard />,
    guest: <GuestDashboard />,
    government: <GovernmentDashboard />,
    admin: <AdminDashboard />,
    medical: <MedicalDashboard />,
    hospital: <HospitalDashboard />,
    university: <UniversityDashboard />,
    business: <BusinessDashboard />,
    marketplace: <MarketplaceDashboard />,
    founder: <FounderDashboard />,
    social: <SocialDashboard />,
    customer: <CustomerDashboard />,
    farmer: <FarmerDashboard />,
  };

  return <>{dashboards[currentRole] || <CitizenDashboard />}</>;
};

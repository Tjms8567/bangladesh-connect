import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { RoleContainerSystem } from '@/components/role-containers/RoleContainerSystem';

const Dashboard: React.FC = () => {
  return (
    <AppLayout>
      <div className="px-4 py-4">
        <RoleContainerSystem />
      </div>
    </AppLayout>
  );
};

export default Dashboard;

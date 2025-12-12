import React, { useState } from 'react';
import { Shield, Users, BookOpen } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserManagementPanel } from '@/components/admin/UserManagementPanel';
import { RoleOnboardingGuide } from '@/components/admin/RoleOnboardingGuide';

const Admin: React.FC = () => {
  const { isBangla } = useLanguage();
  const [activeTab, setActiveTab] = useState('users');

  return (
    <AppLayout>
      <div className="space-y-6 pb-24">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-destructive/10 flex items-center justify-center">
            <Shield className="w-6 h-6 text-destructive" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {isBangla ? 'অ্যাডমিন প্যানেল' : 'Admin Panel'}
            </h1>
            <p className="text-sm text-muted-foreground">
              {isBangla ? 'ব্যবহারকারী ও সিস্টেম ব্যবস্থাপনা' : 'User & System Management'}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 h-12">
            <TabsTrigger value="users" className="gap-2 text-sm">
              <Users className="w-4 h-4" />
              {isBangla ? 'ব্যবহারকারী' : 'Users'}
            </TabsTrigger>
            <TabsTrigger value="onboarding" className="gap-2 text-sm">
              <BookOpen className="w-4 h-4" />
              {isBangla ? 'অনবোর্ডিং' : 'Onboarding'}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="mt-6">
            <UserManagementPanel />
          </TabsContent>

          <TabsContent value="onboarding" className="mt-6">
            <GlassCard className="p-6">
              <RoleOnboardingGuide />
            </GlassCard>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Admin;

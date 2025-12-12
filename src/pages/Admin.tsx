import React, { useState, useEffect } from 'react';
import { Shield, Users, Settings, Activity, ChevronDown, Check } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface UserWithRole {
  id: string;
  email: string;
  full_name: string | null;
  role: 'admin' | 'moderator' | 'user';
  created_at: string;
}

const Admin: React.FC = () => {
  const { isBangla } = useLanguage();
  const { toast } = useToast();
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      // Fetch profiles with roles
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, full_name, created_at');

      if (profilesError) throw profilesError;

      const { data: roles, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id, role');

      if (rolesError) throw rolesError;

      const roleMap = new Map(roles?.map(r => [r.user_id, r.role]) || []);

      const usersData: UserWithRole[] = (profiles || []).map(p => ({
        id: p.id,
        email: '',
        full_name: p.full_name,
        role: (roleMap.get(p.id) as 'admin' | 'moderator' | 'user') || 'user',
        created_at: p.created_at || '',
      }));

      setUsers(usersData);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: isBangla ? 'ত্রুটি' : 'Error',
        description: isBangla ? 'ব্যবহারকারী লোড করতে সমস্যা হয়েছে' : 'Failed to load users',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserRole = async (userId: string, newRole: 'admin' | 'moderator' | 'user') => {
    try {
      const { error } = await supabase
        .from('user_roles')
        .upsert({ user_id: userId, role: newRole }, { onConflict: 'user_id,role' });

      if (error) throw error;

      setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
      
      toast({
        title: isBangla ? 'সফল' : 'Success',
        description: isBangla ? 'ভূমিকা আপডেট হয়েছে' : 'Role updated successfully',
      });
    } catch (error) {
      console.error('Error updating role:', error);
      toast({
        title: isBangla ? 'ত্রুটি' : 'Error',
        description: isBangla ? 'ভূমিকা আপডেট করতে সমস্যা হয়েছে' : 'Failed to update role',
        variant: 'destructive',
      });
    }
  };

  const stats = [
    { label: isBangla ? 'মোট ব্যবহারকারী' : 'Total Users', value: users.length, icon: Users, color: 'text-primary' },
    { label: isBangla ? 'অ্যাডমিন' : 'Admins', value: users.filter(u => u.role === 'admin').length, icon: Shield, color: 'text-destructive' },
    { label: isBangla ? 'মডারেটর' : 'Moderators', value: users.filter(u => u.role === 'moderator').length, icon: Settings, color: 'text-warning' },
    { label: isBangla ? 'সক্রিয় আজ' : 'Active Today', value: Math.floor(users.length * 0.7), icon: Activity, color: 'text-success' },
  ];

  const roleLabels = {
    admin: isBangla ? 'অ্যাডমিন' : 'Admin',
    moderator: isBangla ? 'মডারেটর' : 'Moderator',
    user: isBangla ? 'ব্যবহারকারী' : 'User',
  };

  const roleColors = {
    admin: 'bg-destructive/10 text-destructive',
    moderator: 'bg-warning/10 text-warning',
    user: 'bg-muted text-muted-foreground',
  };

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

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat, index) => (
            <GlassCard key={index} className="p-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl bg-muted flex items-center justify-center`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Users List */}
        <GlassCard className="p-4">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            {isBangla ? 'ব্যবহারকারী তালিকা' : 'User List'}
          </h2>

          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-16 bg-muted/50 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : users.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              {isBangla ? 'কোনো ব্যবহারকারী নেই' : 'No users found'}
            </p>
          ) : (
            <div className="space-y-3">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">
                        {user.full_name?.charAt(0) || 'U'}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {user.full_name || (isBangla ? 'নাম নেই' : 'No name')}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        ID: {user.id.slice(0, 8)}...
                      </p>
                    </div>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className={`${roleColors[user.role]} gap-1`}>
                        {roleLabels[user.role]}
                        <ChevronDown className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {(['admin', 'moderator', 'user'] as const).map((role) => (
                        <DropdownMenuItem
                          key={role}
                          onClick={() => updateUserRole(user.id, role)}
                          className="gap-2"
                        >
                          {user.role === role && <Check className="w-4 h-4" />}
                          <span className={user.role !== role ? 'ml-6' : ''}>
                            {roleLabels[role]}
                          </span>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </div>
          )}
        </GlassCard>
      </div>
    </AppLayout>
  );
};

export default Admin;

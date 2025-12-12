import React, { useState, useEffect } from 'react';
import { 
  Shield, Users, Search, ChevronDown, Check, UserPlus, 
  Filter, RefreshCw, MoreVertical, Crown, Star, User
} from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Database } from '@/integrations/supabase/types';

type AppRole = Database['public']['Enums']['app_role'];

interface UserWithRole {
  id: string;
  full_name: string | null;
  full_name_bn: string | null;
  level: string | null;
  points: number | null;
  district: string | null;
  role: AppRole;
  created_at: string;
}

const roleConfig: Record<AppRole, { icon: React.ElementType; color: string; label: string; labelBn: string }> = {
  superadmin: { icon: Crown, color: 'bg-amber-500/10 text-amber-600', label: 'Super Admin', labelBn: 'সুপার অ্যাডমিন' },
  admin: { icon: Shield, color: 'bg-destructive/10 text-destructive', label: 'Admin', labelBn: 'অ্যাডমিন' },
  moderator: { icon: Star, color: 'bg-warning/10 text-warning', label: 'Moderator', labelBn: 'মডারেটর' },
  user: { icon: User, color: 'bg-muted text-muted-foreground', label: 'User', labelBn: 'ব্যবহারকারী' },
};

export const UserManagementPanel: React.FC = () => {
  const { isBangla } = useLanguage();
  const { toast } = useToast();
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserWithRole[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<AppRole | 'all'>('all');
  const [selectedUser, setSelectedUser] = useState<UserWithRole | null>(null);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    let result = users;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(u => 
        u.full_name?.toLowerCase().includes(query) ||
        u.full_name_bn?.includes(searchQuery) ||
        u.district?.toLowerCase().includes(query) ||
        u.id.toLowerCase().includes(query)
      );
    }
    
    if (roleFilter !== 'all') {
      result = result.filter(u => u.role === roleFilter);
    }
    
    setFilteredUsers(result);
  }, [users, searchQuery, roleFilter]);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (profilesError) throw profilesError;

      const { data: roles, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id, role');

      if (rolesError) throw rolesError;

      const roleMap = new Map(roles?.map(r => [r.user_id, r.role]) || []);

      const usersData: UserWithRole[] = (profiles || []).map(p => ({
        id: p.id,
        full_name: p.full_name,
        full_name_bn: p.full_name_bn,
        level: p.level,
        points: p.points,
        district: p.district,
        role: (roleMap.get(p.id) as AppRole) || 'user',
        created_at: p.created_at || '',
      }));

      setUsers(usersData);
      setFilteredUsers(usersData);
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

  const updateUserRole = async (userId: string, newRole: AppRole) => {
    try {
      // First check if user already has a role
      const { data: existingRole } = await supabase
        .from('user_roles')
        .select('id')
        .eq('user_id', userId)
        .maybeSingle();

      if (existingRole) {
        // Update existing role
        const { error } = await supabase
          .from('user_roles')
          .update({ role: newRole })
          .eq('user_id', userId);
        if (error) throw error;
      } else {
        // Insert new role
        const { error } = await supabase
          .from('user_roles')
          .insert({ user_id: userId, role: newRole });
        if (error) throw error;
      }

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
    { 
      label: isBangla ? 'মোট ব্যবহারকারী' : 'Total Users', 
      value: users.length, 
      icon: Users, 
      color: 'text-primary' 
    },
    { 
      label: isBangla ? 'সুপার অ্যাডমিন' : 'Super Admins', 
      value: users.filter(u => u.role === 'superadmin').length, 
      icon: Crown, 
      color: 'text-amber-500' 
    },
    { 
      label: isBangla ? 'অ্যাডমিন' : 'Admins', 
      value: users.filter(u => u.role === 'admin').length, 
      icon: Shield, 
      color: 'text-destructive' 
    },
    { 
      label: isBangla ? 'মডারেটর' : 'Moderators', 
      value: users.filter(u => u.role === 'moderator').length, 
      icon: Star, 
      color: 'text-warning' 
    },
  ];

  const handleStartOnboarding = (user: UserWithRole) => {
    setSelectedUser(user);
    setIsOnboardingOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((stat, index) => (
          <GlassCard key={index} className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
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

      {/* Search and Filter */}
      <GlassCard className="p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder={isBangla ? 'নাম, আইডি বা জেলা দিয়ে খুঁজুন...' : 'Search by name, ID or district...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="w-4 h-4" />
                {roleFilter === 'all' 
                  ? (isBangla ? 'সব ভূমিকা' : 'All Roles')
                  : (isBangla ? roleConfig[roleFilter].labelBn : roleConfig[roleFilter].label)
                }
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setRoleFilter('all')}>
                {roleFilter === 'all' && <Check className="w-4 h-4 mr-2" />}
                <span className={roleFilter !== 'all' ? 'ml-6' : ''}>
                  {isBangla ? 'সব ভূমিকা' : 'All Roles'}
                </span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {(Object.keys(roleConfig) as AppRole[]).map((role) => (
                <DropdownMenuItem key={role} onClick={() => setRoleFilter(role)}>
                  {roleFilter === role && <Check className="w-4 h-4 mr-2" />}
                  <span className={roleFilter !== role ? 'ml-6' : ''}>
                    {isBangla ? roleConfig[role].labelBn : roleConfig[role].label}
                  </span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="outline" onClick={fetchUsers} className="gap-2">
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            {isBangla ? 'রিফ্রেশ' : 'Refresh'}
          </Button>
        </div>
      </GlassCard>

      {/* Users List */}
      <GlassCard className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">
            {isBangla ? 'ব্যবহারকারী তালিকা' : 'User List'}
            <span className="ml-2 text-sm text-muted-foreground">
              ({filteredUsers.length})
            </span>
          </h2>
        </div>

        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="h-20 bg-muted/50 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="text-center py-12">
            <Users className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
            <p className="text-muted-foreground">
              {isBangla ? 'কোনো ব্যবহারকারী পাওয়া যায়নি' : 'No users found'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredUsers.map((user) => {
              const RoleIcon = roleConfig[user.role].icon;
              return (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-lg font-medium text-primary">
                        {user.full_name?.charAt(0) || user.full_name_bn?.charAt(0) || 'U'}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {isBangla && user.full_name_bn ? user.full_name_bn : user.full_name || (isBangla ? 'নাম নেই' : 'No name')}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>ID: {user.id.slice(0, 8)}...</span>
                        {user.district && (
                          <>
                            <span>•</span>
                            <span>{user.district}</span>
                          </>
                        )}
                        {user.level && (
                          <>
                            <span>•</span>
                            <Badge variant="outline" className="text-xs">
                              {user.level}
                            </Badge>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className={`${roleConfig[user.role].color} gap-2`}
                        >
                          <RoleIcon className="w-4 h-4" />
                          {isBangla ? roleConfig[user.role].labelBn : roleConfig[user.role].label}
                          <ChevronDown className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {(Object.keys(roleConfig) as AppRole[]).map((role) => {
                          const Icon = roleConfig[role].icon;
                          return (
                            <DropdownMenuItem
                              key={role}
                              onClick={() => updateUserRole(user.id, role)}
                              className="gap-2"
                            >
                              {user.role === role && <Check className="w-4 h-4" />}
                              <Icon className={`w-4 h-4 ${user.role !== role ? 'ml-6' : ''}`} />
                              {isBangla ? roleConfig[role].labelBn : roleConfig[role].label}
                            </DropdownMenuItem>
                          );
                        })}
                      </DropdownMenuContent>
                    </DropdownMenu>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleStartOnboarding(user)}>
                          <UserPlus className="w-4 h-4 mr-2" />
                          {isBangla ? 'অনবোর্ডিং শুরু' : 'Start Onboarding'}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </GlassCard>

      {/* Role Onboarding Dialog */}
      <Dialog open={isOnboardingOpen} onOpenChange={setIsOnboardingOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {isBangla ? 'ভূমিকা অনবোর্ডিং' : 'Role Onboarding'}
            </DialogTitle>
            <DialogDescription>
              {isBangla 
                ? `${selectedUser?.full_name || selectedUser?.full_name_bn || 'ব্যবহারকারী'} এর জন্য অনবোর্ডিং`
                : `Configure onboarding for ${selectedUser?.full_name || 'user'}`
              }
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-3">
              {(Object.keys(roleConfig) as AppRole[]).map((role) => {
                const Icon = roleConfig[role].icon;
                const isCurrentRole = selectedUser?.role === role;
                return (
                  <div
                    key={role}
                    onClick={() => selectedUser && updateUserRole(selectedUser.id, role)}
                    className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all ${
                      isCurrentRole 
                        ? 'bg-primary/10 ring-2 ring-primary' 
                        : 'bg-muted/30 hover:bg-muted/50'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${roleConfig[role].color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">
                        {isBangla ? roleConfig[role].labelBn : roleConfig[role].label}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {role === 'superadmin' && (isBangla ? 'সম্পূর্ণ সিস্টেম নিয়ন্ত্রণ' : 'Full system control')}
                        {role === 'admin' && (isBangla ? 'ব্যবহারকারী ও কন্টেন্ট ব্যবস্থাপনা' : 'User & content management')}
                        {role === 'moderator' && (isBangla ? 'কন্টেন্ট মডারেশন' : 'Content moderation')}
                        {role === 'user' && (isBangla ? 'সাধারণ ব্যবহারকারী অ্যাক্সেস' : 'Standard user access')}
                      </p>
                    </div>
                    {isCurrentRole && <Check className="w-5 h-5 text-primary" />}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsOnboardingOpen(false)}>
              {isBangla ? 'বন্ধ করুন' : 'Close'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

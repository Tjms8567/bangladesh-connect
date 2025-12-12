import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { GlassCard } from '@/components/ui/GlassCard';
import { GDPProgressTracker } from '@/components/transformation/GDPProgressTracker';
import { PaddyFieldVisualization } from '@/components/transformation/PaddyFieldVisualization';
import { NationalQuests } from '@/components/transformation/NationalQuests';
import { DEMO_USERS } from '@/data/demoUsers';
import { nationalTransformationData } from '@/data/sectorMockData';
import { Shield, Users, AlertTriangle, TrendingUp, Activity, Eye, Flag, Crown } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export const SuperAdminDashboard: React.FC = () => {
  const { isBangla } = useLanguage();
  const { citizenContribution } = nationalTransformationData;

  const flaggedUsers = DEMO_USERS.filter(u => u.nationalScore < 20);
  const topContributors = [...DEMO_USERS].sort((a, b) => b.nationalScore - a.nationalScore).slice(0, 5);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center">
          <Crown className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {isBangla ? 'সুপার অ্যাডমিন ড্যাশবোর্ড' : 'Super Administrator Dashboard'}
          </h1>
          <p className="text-muted-foreground text-sm">
            {isBangla ? 'জাতীয় রূপান্তর তদারকি কেন্দ্র' : 'National Transformation Oversight Center'}
          </p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-3">
        <GlassCard className="p-4 bg-gradient-to-br from-primary/10 to-primary/5">
          <Users className="w-6 h-6 text-primary mb-2" />
          <p className="text-2xl font-bold">{(citizenContribution.totalUsers / 1000000).toFixed(1)}M</p>
          <p className="text-xs text-muted-foreground">{isBangla ? 'মোট ব্যবহারকারী' : 'Total Users'}</p>
        </GlassCard>
        <GlassCard className="p-4 bg-gradient-to-br from-success/10 to-success/5">
          <TrendingUp className="w-6 h-6 text-success mb-2" />
          <p className="text-2xl font-bold">${citizenContribution.gdpImpact}B</p>
          <p className="text-xs text-muted-foreground">{isBangla ? 'জিডিপি প্রভাব' : 'GDP Impact'}</p>
        </GlassCard>
        <GlassCard className="p-4 bg-gradient-to-br from-warning/10 to-warning/5">
          <Activity className="w-6 h-6 text-warning mb-2" />
          <p className="text-2xl font-bold">{(citizenContribution.activeContributors / 1000000).toFixed(1)}M</p>
          <p className="text-xs text-muted-foreground">{isBangla ? 'সক্রিয় অবদানকারী' : 'Active Contributors'}</p>
        </GlassCard>
        <GlassCard className="p-4 bg-gradient-to-br from-destructive/10 to-destructive/5">
          <AlertTriangle className="w-6 h-6 text-destructive mb-2" />
          <p className="text-2xl font-bold">{flaggedUsers.length}</p>
          <p className="text-xs text-muted-foreground">{isBangla ? 'পর্যালোচনা প্রয়োজন' : 'Need Review'}</p>
        </GlassCard>
      </div>

      {/* GDP Tracker */}
      <GDPProgressTracker />

      {/* Paddy Field */}
      <PaddyFieldVisualization />

      {/* Top Contributors */}
      <GlassCard className="p-4">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Flag className="w-5 h-5 text-primary" />
          {isBangla ? 'শীর্ষ জাতীয় অবদানকারী' : 'Top National Contributors'}
        </h3>
        <div className="space-y-3">
          {topContributors.map((user, i) => (
            <div key={user.id} className="flex items-center gap-3 p-2 rounded-lg bg-muted/30">
              <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold">
                {i + 1}
              </span>
              <div className="flex-1">
                <p className="text-sm font-medium">{isBangla ? user.fullNameBn : user.fullName}</p>
                <p className="text-xs text-muted-foreground">{user.district}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-primary">{user.nationalScore}</p>
                <p className="text-xs text-muted-foreground">{isBangla ? 'স্কোর' : 'Score'}</p>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Flagged Users */}
      {flaggedUsers.length > 0 && (
        <GlassCard className="p-4 border-destructive/30">
          <h3 className="font-semibold mb-4 flex items-center gap-2 text-destructive">
            <Eye className="w-5 h-5" />
            {isBangla ? 'পর্যালোচনা প্রয়োজন' : 'Users Requiring Review'}
          </h3>
          <div className="space-y-2">
            {flaggedUsers.map(user => (
              <div key={user.id} className="flex items-center gap-3 p-2 rounded-lg bg-destructive/5">
                <span className="text-lg">{user.role === 'voter' ? '🗳️' : '🇧🇩'}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium">{user.fullName}</p>
                  <p className="text-xs text-muted-foreground">Score: {user.nationalScore}/100</p>
                </div>
                <Progress value={user.nationalScore} className="w-20 h-2" />
              </div>
            ))}
          </div>
        </GlassCard>
      )}

      {/* National Quests */}
      <NationalQuests />
    </div>
  );
};

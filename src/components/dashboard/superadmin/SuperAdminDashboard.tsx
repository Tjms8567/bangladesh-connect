import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useProfile } from '@/hooks/useProfile';
import { GlassCard } from '@/components/ui/GlassCard';
import { GDPProgressTracker } from '@/components/transformation/GDPProgressTracker';
import { PaddyFieldVisualization } from '@/components/transformation/PaddyFieldVisualization';
import { NationalQuests } from '@/components/transformation/NationalQuests';
import { DEMO_USERS } from '@/data/demoUsers';
import { nationalTransformationData } from '@/data/sectorMockData';
import { Shield, Users, AlertTriangle, TrendingUp, Activity, Eye, Flag, Crown, Building2, GraduationCap, Heart, Landmark, Globe, Sprout, Rocket, Target } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import founderProfile from '@/assets/founder-profile.webp';

export const SuperAdminDashboard: React.FC = () => {
  const { isBangla } = useLanguage();
  const { profile } = useProfile();
  const { citizenContribution } = nationalTransformationData;

  const flaggedUsers = DEMO_USERS.filter(u => u.nationalScore < 20);
  const topContributors = [...DEMO_USERS].sort((a, b) => b.nationalScore - a.nationalScore).slice(0, 5);

  const growthSectors = [
    { 
      icon: GraduationCap, 
      name: isBangla ? 'শিক্ষা' : 'Education', 
      progress: 78, 
      target: isBangla ? '১০০% সাক্ষরতা' : '100% Literacy',
      color: 'from-purple-500 to-violet-600' 
    },
    { 
      icon: Heart, 
      name: isBangla ? 'স্বাস্থ্য' : 'Healthcare', 
      progress: 65, 
      target: isBangla ? 'সবার জন্য স্বাস্থ্য' : 'Healthcare for All',
      color: 'from-red-400 to-rose-500' 
    },
    { 
      icon: Building2, 
      name: isBangla ? 'শিল্প' : 'Industry', 
      progress: 72, 
      target: isBangla ? 'উৎপাদন বৃদ্ধি' : 'Manufacturing Growth',
      color: 'from-blue-500 to-indigo-600' 
    },
    { 
      icon: Sprout, 
      name: isBangla ? 'কৃষি' : 'Agriculture', 
      progress: 85, 
      target: isBangla ? 'খাদ্য নিরাপত্তা' : 'Food Security',
      color: 'from-green-500 to-emerald-600' 
    },
    { 
      icon: Globe, 
      name: isBangla ? 'প্রবাসী' : 'Diaspora', 
      progress: 58, 
      target: isBangla ? 'বৈশ্বিক সংযোগ' : 'Global Connect',
      color: 'from-teal-500 to-cyan-600' 
    },
    { 
      icon: Landmark, 
      name: isBangla ? 'গণতন্ত্র' : 'Democracy', 
      progress: 92, 
      target: isBangla ? 'স্বচ্ছ নির্বাচন' : 'Transparent Elections',
      color: 'from-orange-500 to-amber-600' 
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Super Admin Header with Profile */}
      <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border border-yellow-500/30">
        <img 
          src={founderProfile} 
          alt="Founder" 
          className="w-16 h-16 rounded-full object-cover ring-4 ring-yellow-500/50 shadow-lg"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <Crown className="w-5 h-5 text-yellow-500" />
            <h1 className="text-xl font-bold text-foreground">
              {isBangla ? 'স্বাগতম, ' : 'Welcome, '}
              {isBangla ? (profile?.full_name_bn || 'তারিক রহমান') : (profile?.full_name || 'Tarique Rahman')}
            </h1>
          </div>
          <p className="text-muted-foreground text-sm mt-1">
            {isBangla ? 'সুপার অ্যাডমিনিস্ট্রেটর • জাতীয় রূপান্তর তদারকি কেন্দ্র' : 'Super Administrator • National Transformation Oversight Center'}
          </p>
        </div>
      </div>

      {/* Vision Statement */}
      <GlassCard className="p-4 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
        <div className="flex items-start gap-3">
          <Rocket className="w-8 h-8 text-primary flex-shrink-0" />
          <div>
            <h2 className="font-bold text-lg text-foreground">
              {isBangla ? 'বাংলাদেশ ২.০ ভিশন ২০৪১' : 'Bangladesh 2.0 Vision 2041'}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {isBangla 
                ? 'ডিজিটাল রূপান্তরের মাধ্যমে একটি সমৃদ্ধ, ন্যায়সঙ্গত এবং উন্নত বাংলাদেশ গড়ে তোলা।'
                : 'Building a prosperous, equitable, and developed Bangladesh through digital transformation.'}
            </p>
          </div>
        </div>
      </GlassCard>

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

      {/* Growth Sectors Progress */}
      <GlassCard className="p-4">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-primary" />
          {isBangla ? 'জাতীয় উন্নয়ন খাত' : 'National Growth Sectors'}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {growthSectors.map((sector, i) => (
            <div key={i} className="p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-all">
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${sector.color} flex items-center justify-center`}>
                  <sector.icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{sector.name}</p>
                  <p className="text-xs text-muted-foreground">{sector.target}</p>
                </div>
                <span className="text-lg font-bold text-primary">{sector.progress}%</span>
              </div>
              <Progress value={sector.progress} className="h-2" />
            </div>
          ))}
        </div>
      </GlassCard>

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

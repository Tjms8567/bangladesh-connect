import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, HeartPulse, Wallet, Briefcase, Phone, TrendingUp, Users, Activity, Zap } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import { Logo } from '@/components/ui/Logo';
import { useLanguage } from '@/contexts/LanguageContext';
import { useProfile } from '@/hooks/useProfile';
import { nationalStats } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { PaddyIcon } from '@/components/icons/PaddyIcon';

const quickAccess = [
  { id: 'education', icon: GraduationCap, label: { bn: 'শিক্ষা', en: 'Education' }, color: 'bg-emerald-500', path: '/education' },
  { id: 'health', icon: HeartPulse, label: { bn: 'স্বাস্থ্য', en: 'Health' }, color: 'bg-rose-500', path: '/health' },
  { id: 'finance', icon: Wallet, label: { bn: 'অর্থ', en: 'Finance' }, color: 'bg-amber-500', path: '/finance' },
  { id: 'jobs', icon: Briefcase, label: { bn: 'চাকরি', en: 'Jobs' }, color: 'bg-blue-500', path: '/jobs' },
];

export const Home: React.FC = () => {
  const { t, language, isBangla } = useLanguage();
  const { profile } = useProfile();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return t('home.greeting.morning');
    if (hour < 17) return t('home.greeting.afternoon');
    return t('home.greeting.evening');
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num.toString();
  };

  const displayName = isBangla 
    ? (profile?.full_name_bn || profile?.full_name || 'User') 
    : (profile?.full_name || 'User');

  return (
    <AppLayout>
      <div className="px-4 py-4 space-y-6">
        {/* Welcome Section with Logo */}
        <section className="animate-fade-in">
          <div className="flex items-center gap-4 mb-4">
            <Logo size="md" animation="pulse" showGlow />
            <div>
              <h2 className="text-2xl font-semibold text-foreground">
                {getGreeting()}, <span className="text-gradient-bd">{displayName}</span>! 👋
              </h2>
              <p className="text-muted-foreground mt-1">{t('app.tagline')}</p>
            </div>
          </div>
        </section>

        {/* Emergency Button */}
        <GlassCard 
          className="animate-fade-in stagger-1 bg-gradient-to-r from-red-500/10 to-red-600/5 border-red-500/20"
          hover={false}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center animate-pulse-gentle">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{t('home.emergency')}</h3>
                <p className="text-sm text-muted-foreground">999 - {isBangla ? 'জাতীয় জরুরি সেবা' : 'National Emergency'}</p>
              </div>
            </div>
            <Button variant="destructive" size="sm" className="rounded-full">
              {isBangla ? 'কল করুন' : 'Call Now'}
            </Button>
          </div>
        </GlassCard>

        {/* Quick Access Grid */}
        <section className="animate-fade-in stagger-2">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-foreground">{t('home.quickAccess')}</h3>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {quickAccess.map((item, index) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`animate-scale-in stagger-${index + 1}`}
                >
                  <GlassCard className="flex flex-col items-center py-4 px-2">
                    <div className={`w-12 h-12 rounded-2xl ${item.color} flex items-center justify-center mb-2 shadow-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xs font-medium text-foreground text-center">
                      {item.label[language]}
                    </span>
                  </GlassCard>
                </Link>
              );
            })}
          </div>
          {/* Community Banner */}
          <Link to="/community" className="mt-3 block">
            <GlassCard className="flex items-center gap-3 bg-primary/5 border-primary/20">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <PaddyIcon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground text-sm">
                  {isBangla ? 'কমিউনিটিতে যোগ দিন' : 'Join the Community'}
                </p>
                <p className="text-xs text-muted-foreground">
                  {isBangla ? 'একসাথে এগিয়ে যাই' : 'Growing together'}
                </p>
              </div>
            </GlassCard>
          </Link>
        </section>

        {/* National Progress */}
        <section className="animate-fade-in stagger-3">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-foreground">{t('home.nationalProgress')}</h3>
            <Link to="/stats" className="text-sm text-primary font-medium">
              {t('common.seeAll')}
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <GlassCard className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Users className="w-4 h-4 text-primary" />
                </div>
                <span className="text-xs text-muted-foreground">{t('home.digitalCitizens')}</span>
              </div>
              <div className="flex items-end gap-2">
                <span className="text-2xl font-bold text-foreground">
                  {formatNumber(nationalStats.digitalCitizens.value)}
                </span>
                <span className="text-xs text-success flex items-center mb-1">
                  <TrendingUp className="w-3 h-3 mr-0.5" />
                  {nationalStats.digitalCitizens.growth}%
                </span>
              </div>
            </GlassCard>

            <GlassCard className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <Activity className="w-4 h-4 text-secondary" />
                </div>
                <span className="text-xs text-muted-foreground">{t('home.activeUsers')}</span>
              </div>
              <div className="flex items-end gap-2">
                <span className="text-2xl font-bold text-foreground">
                  {formatNumber(nationalStats.activeUsers.value)}
                </span>
                <span className="text-xs text-success flex items-center mb-1">
                  <TrendingUp className="w-3 h-3 mr-0.5" />
                  {nationalStats.activeUsers.growth}%
                </span>
              </div>
            </GlassCard>

            <GlassCard className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-accent" />
                </div>
                <span className="text-xs text-muted-foreground">{t('home.transactionsToday')}</span>
              </div>
              <div className="flex items-end gap-2">
                <span className="text-2xl font-bold text-foreground">
                  {formatNumber(nationalStats.transactionsToday.value)}
                </span>
                <span className="text-xs text-success flex items-center mb-1">
                  <TrendingUp className="w-3 h-3 mr-0.5" />
                  {nationalStats.transactionsToday.growth}%
                </span>
              </div>
            </GlassCard>

            <GlassCard className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
                  <Briefcase className="w-4 h-4 text-success" />
                </div>
                <span className="text-xs text-muted-foreground">{t('home.servicesUsed')}</span>
              </div>
              <div className="flex items-end gap-2">
                <span className="text-2xl font-bold text-foreground">
                  {nationalStats.servicesUsed.value}+
                </span>
                <span className="text-xs text-success flex items-center mb-1">
                  <TrendingUp className="w-3 h-3 mr-0.5" />
                  {nationalStats.servicesUsed.growth}%
                </span>
              </div>
            </GlassCard>
          </div>
        </section>

        {/* My Impact Card */}
        <section className="animate-fade-in stagger-4">
          <GlassCard variant="elevated" className="gradient-bd-solid text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Logo size="sm" animation="none" />
                <div>
                  <h3 className="font-semibold text-lg">{t('home.myImpact')}</h3>
                  <p className="text-white/80 text-sm mt-1">
                    {isBangla ? 'আপনি বাংলাদেশের উন্নয়নে অবদান রাখছেন' : "You're contributing to Bangladesh's progress"}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">{profile?.points || 0}</div>
                <div className="text-xs text-white/80">{isBangla ? 'পয়েন্ট' : 'Points'}</div>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-white rounded-full w-3/4 transition-all duration-500" />
              </div>
              <span className="text-xs text-white/80">{profile?.level || 'Bronze'}</span>
            </div>
          </GlassCard>
        </section>
      </div>
    </AppLayout>
  );
};

export default Home;

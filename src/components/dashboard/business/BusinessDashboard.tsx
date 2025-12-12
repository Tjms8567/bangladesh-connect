import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { ImpactCard } from '../shared/ImpactCard';
import { QuickAction } from '../shared/QuickAction';
import { GlassCard } from '@/components/ui/GlassCard';
import { ProgressRing } from '../shared/ProgressRing';
import { industryData, nationalTransformationData } from '@/data/sectorMockData';
import {
  Briefcase,
  Users,
  TrendingUp,
  DollarSign,
  Factory,
  Globe,
  Target,
  Building2,
  Award,
  FileText,
  BarChart3,
  Zap,
} from 'lucide-react';

export const BusinessDashboard: React.FC = () => {
  const { isBangla } = useLanguage();
  const { demoUser } = useAuth();

  const businessData = demoUser ? {
    employees: 156,
    revenue: demoUser.balance,
    jobsCreated: 45,
    nationalContribution: demoUser.nationalScore,
    sectorContributions: demoUser.sectorContributions,
  } : {
    employees: 156,
    revenue: 12500000,
    jobsCreated: 45,
    nationalContribution: 35,
    sectorContributions: { industry: 45, education: 10, health: 5 },
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) return `৳${(amount / 1000000).toFixed(1)}M`;
    if (amount >= 1000) return `৳${(amount / 1000).toFixed(0)}K`;
    return `৳${amount}`;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          🏢 {isBangla ? 'অর্থনৈতিক অনুঘটক' : 'Economic Catalyst'}
        </h1>
        <p className="text-muted-foreground">
          {isBangla ? 'চাকরি সৃষ্ট → অর্থনীতি শক্তিশালী' : 'Jobs created → Economy strengthened'}
        </p>
      </div>

      {/* National GDP Progress Banner */}
      <div className="bg-gradient-to-r from-amber-500 to-yellow-600 rounded-2xl p-5 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/80 text-sm">
              {isBangla ? 'জাতীয় জিডিপি অগ্রগতি' : 'National GDP Progress'}
            </p>
            <p className="text-3xl font-bold mt-1">
              ${industryData.gdpProgress.current}B / ${industryData.gdpProgress.target}B
            </p>
            <p className="text-white/80 text-sm mt-1">
              {isBangla ? `বার্ষিক বৃদ্ধি: ${industryData.gdpProgress.yearlyGrowth}%` : `Yearly Growth: ${industryData.gdpProgress.yearlyGrowth}%`}
            </p>
          </div>
          <TrendingUp className="w-16 h-16 text-white/30" />
        </div>
        <div className="mt-4 h-2 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-white rounded-full transition-all duration-500"
            style={{ width: `${(industryData.gdpProgress.current / industryData.gdpProgress.target) * 100}%` }}
          />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <ImpactCard
          title={isBangla ? 'কর্মী' : 'Employees'}
          value={businessData.employees.toString()}
          subtitle={isBangla ? 'মোট দল' : 'Total Team'}
          icon={<Users className="w-5 h-5 text-white" />}
          trend={{ value: 12, isPositive: true }}
          gradient="from-blue-500 to-indigo-600"
        />
        <ImpactCard
          title={isBangla ? 'রাজস্ব' : 'Revenue'}
          value={formatCurrency(businessData.revenue)}
          subtitle={isBangla ? 'এই বছর' : 'This Year'}
          icon={<DollarSign className="w-5 h-5 text-white" />}
          trend={{ value: 18, isPositive: true }}
          gradient="from-emerald-500 to-green-600"
        />
      </div>

      {/* Business Impact Ring */}
      <GlassCard variant="elevated" className="p-5">
        <div className="flex items-center gap-6">
          <ProgressRing progress={businessData.nationalContribution} size={100}>
            <div className="text-center">
              <div className="text-xl font-bold text-foreground">
                {businessData.nationalContribution}%
              </div>
              <div className="text-xs text-muted-foreground">
                {isBangla ? 'প্রভাব' : 'Impact'}
              </div>
            </div>
          </ProgressRing>
          <div className="flex-1 space-y-2">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <Award className="w-4 h-4 text-accent" />
              {isBangla ? 'জাতীয় রূপান্তরে অবদান' : 'National Transformation Impact'}
            </h3>
            <p className="text-sm text-muted-foreground">
              {isBangla
                ? `আপনি ${businessData.jobsCreated}টি চাকরি সৃষ্টি করেছেন`
                : `You've created ${businessData.jobsCreated} jobs`}
            </p>
            <div className="flex gap-2">
              <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                {isBangla ? 'শিল্প' : 'Industry'}
              </span>
              <span className="px-2 py-1 text-xs rounded-full bg-accent/10 text-accent-foreground">
                {isBangla ? 'রপ্তানি' : 'Export'}
              </span>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* FDI & Industry Stats */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Globe className="w-5 h-5 text-primary" />
          {isBangla ? 'বিদেশী বিনিয়োগ' : 'Foreign Direct Investment'}
        </h2>
        <GlassCard className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-2xl font-bold text-foreground">${industryData.fdiStats.totalFdi}B</p>
              <p className="text-sm text-success flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                +{industryData.fdiStats.fdiGrowth}% {isBangla ? 'বৃদ্ধি' : 'growth'}
              </p>
            </div>
          </div>
          <div className="space-y-2">
            {industryData.fdiStats.topSectors.slice(0, 3).map((sector, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="flex-1">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-foreground">{sector.name}</span>
                    <span className="text-muted-foreground">{sector.percentage}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                      style={{ width: `${sector.percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Closed Industries Revival */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Factory className="w-5 h-5 text-primary" />
          {isBangla ? 'বন্ধ শিল্প পুনরুজ্জীবন' : 'Closed Industries Revival'}
        </h2>
        <div className="grid grid-cols-3 gap-2">
          <GlassCard className="p-3 text-center">
            <div className="text-2xl font-bold text-foreground">{industryData.closedIndustries.total}</div>
            <div className="text-xs text-muted-foreground">{isBangla ? 'মোট বন্ধ' : 'Total Closed'}</div>
          </GlassCard>
          <GlassCard className="p-3 text-center bg-success/10">
            <div className="text-2xl font-bold text-success">{industryData.closedIndustries.revived}</div>
            <div className="text-xs text-muted-foreground">{isBangla ? 'পুনরুজ্জীবিত' : 'Revived'}</div>
          </GlassCard>
          <GlassCard className="p-3 text-center bg-warning/10">
            <div className="text-2xl font-bold text-warning">{industryData.closedIndustries.inProgress}</div>
            <div className="text-xs text-muted-foreground">{isBangla ? 'চলমান' : 'In Progress'}</div>
          </GlassCard>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground">
          {isBangla ? 'দ্রুত পদক্ষেপ' : 'Quick Actions'}
        </h2>
        <div className="space-y-2">
          <QuickAction
            title={isBangla ? 'নিয়োগ পোস্ট করুন' : 'Post a Job'}
            description={isBangla ? 'নতুন কর্মী নিয়োগ করুন' : 'Hire new employees'}
            icon={<Briefcase className="w-6 h-6 text-blue-500" />}
            gradient="from-blue-50 to-indigo-50"
          />
          <QuickAction
            title={isBangla ? 'বিক্রয় বিশ্লেষণ' : 'Sales Analytics'}
            description={isBangla ? 'ব্যবসার পারফরম্যান্স দেখুন' : 'View business performance'}
            icon={<BarChart3 className="w-6 h-6 text-purple-500" />}
            gradient="from-purple-50 to-violet-50"
          />
          <QuickAction
            title={isBangla ? 'রপ্তানি নিবন্ধন' : 'Export Registration'}
            description={isBangla ? 'আন্তর্জাতিক বাজারে প্রবেশ করুন' : 'Enter international markets'}
            icon={<Globe className="w-6 h-6 text-emerald-500" />}
            gradient="from-emerald-50 to-green-50"
            badge={isBangla ? 'নতুন' : 'New'}
          />
          <QuickAction
            title={isBangla ? 'ট্যাক্স ফাইলিং' : 'Tax Filing'}
            description={isBangla ? 'অনলাইন ট্যাক্স জমা দিন' : 'Submit taxes online'}
            icon={<FileText className="w-6 h-6 text-amber-500" />}
            gradient="from-amber-50 to-yellow-50"
          />
        </div>
      </div>

      {/* Jobs Created Impact */}
      <GlassCard className="p-4 border-l-4 border-l-success">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
            <Zap className="w-6 h-6 text-success" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground">
              {isBangla ? 'এই মাসে চাকরি সৃষ্টি' : 'Jobs Created This Month'}
            </h3>
            <p className="text-sm text-muted-foreground">
              {industryData.jobsCreated.thisMonth.toLocaleString()} {isBangla ? 'জাতীয় পর্যায়ে' : 'nationally'}
            </p>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold text-success">{businessData.jobsCreated}</span>
            <p className="text-xs text-muted-foreground">{isBangla ? 'আপনার' : 'by you'}</p>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

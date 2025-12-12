import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { ImpactCard } from '../shared/ImpactCard';
import { QuickAction } from '../shared/QuickAction';
import { GlassCard } from '@/components/ui/GlassCard';
import { ProgressRing } from '../shared/ProgressRing';
import { lawOrderData, cityData, nationalTransformationData } from '@/data/sectorMockData';
import {
  Building2,
  Users,
  FileText,
  TrendingUp,
  Target,
  BarChart3,
  Bell,
  CheckCircle,
  Clock,
  AlertTriangle,
  Shield,
  Scale,
  MapPin,
  Siren,
} from 'lucide-react';

export const GovernmentDashboard: React.FC = () => {
  const { isBangla } = useLanguage();
  const { demoUser } = useAuth();

  const govData = demoUser ? {
    citizenRequests: 1234,
    resolvedToday: 89,
    pendingApprovals: 45,
    citizenSatisfaction: 87,
    projectsActive: 23,
    nationalImpact: demoUser.nationalScore,
  } : {
    citizenRequests: 1234,
    resolvedToday: 89,
    pendingApprovals: 45,
    citizenSatisfaction: 87,
    projectsActive: 23,
    nationalImpact: 65,
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          🏛️ {isBangla ? 'রূপান্তর ইঞ্জিন' : 'Transformation Engine'}
        </h1>
        <p className="text-muted-foreground">
          {isBangla ? 'জনসেবা উদ্ভাবন ড্যাশবোর্ড' : 'Public Service Innovation Dashboard'}
        </p>
      </div>

      {/* National Transformation Progress */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-5 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/80 text-sm">
              {isBangla ? 'জাতীয় রূপান্তর লক্ষ্য ২০৩৪' : 'National Transformation Target 2034'}
            </p>
            <p className="text-3xl font-bold mt-1">
              ${nationalTransformationData.gdpProgress.current}B → ${nationalTransformationData.gdpProgress.target}B
            </p>
            <p className="text-white/80 text-sm mt-1">
              {nationalTransformationData.gdpProgress.daysRemaining.toLocaleString()} {isBangla ? 'দিন বাকি' : 'days remaining'}
            </p>
          </div>
          <Target className="w-16 h-16 text-white/30" />
        </div>
        <div className="mt-4 h-2 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-white rounded-full transition-all duration-500"
            style={{ width: `${(nationalTransformationData.gdpProgress.current / nationalTransformationData.gdpProgress.target) * 100}%` }}
          />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <ImpactCard
          title={isBangla ? 'নাগরিক অনুরোধ' : 'Citizen Requests'}
          value={govData.citizenRequests.toString()}
          icon={<Users className="w-5 h-5 text-white" />}
          trend={{ value: 12, isPositive: true }}
          gradient="from-blue-500 to-indigo-600"
        />
        <ImpactCard
          title={isBangla ? 'সন্তুষ্টি হার' : 'Satisfaction Rate'}
          value={`${govData.citizenSatisfaction}%`}
          icon={<TrendingUp className="w-5 h-5 text-white" />}
          gradient="from-emerald-500 to-green-600"
        />
      </div>

      {/* Today's Summary */}
      <GlassCard className="p-4">
        <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
          <Target className="w-5 h-5 text-primary" />
          {isBangla ? 'আজকের সারসংক্ষেপ' : 'Today\'s Summary'}
        </h3>
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-3 rounded-xl bg-success/10">
            <CheckCircle className="w-5 h-5 text-success mx-auto mb-1" />
            <div className="text-xl font-bold text-foreground">{govData.resolvedToday}</div>
            <div className="text-xs text-muted-foreground">{isBangla ? 'সমাধান' : 'Resolved'}</div>
          </div>
          <div className="text-center p-3 rounded-xl bg-warning/10">
            <Clock className="w-5 h-5 text-warning mx-auto mb-1" />
            <div className="text-xl font-bold text-foreground">{govData.pendingApprovals}</div>
            <div className="text-xs text-muted-foreground">{isBangla ? 'অপেক্ষমান' : 'Pending'}</div>
          </div>
          <div className="text-center p-3 rounded-xl bg-primary/10">
            <BarChart3 className="w-5 h-5 text-primary mx-auto mb-1" />
            <div className="text-xl font-bold text-foreground">{govData.projectsActive}</div>
            <div className="text-xs text-muted-foreground">{isBangla ? 'প্রকল্প' : 'Projects'}</div>
          </div>
        </div>
      </GlassCard>

      {/* Law & Order Stats */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Scale className="w-5 h-5 text-primary" />
          {isBangla ? 'আইন-শৃঙ্খলা' : 'Law & Order'}
        </h2>
        <GlassCard className="p-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Siren className="w-4 h-4 text-rose-500" />
                <span className="text-sm text-muted-foreground">{isBangla ? 'জরুরি প্রতিক্রিয়া' : 'Emergency Response'}</span>
              </div>
              <div className="text-2xl font-bold text-foreground">{lawOrderData.emergencyResponse.averageResponseTime}</div>
              <div className="text-xs text-success flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3" />
                {isBangla ? '২৫% উন্নতি' : '25% improved'}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-blue-500" />
                <span className="text-sm text-muted-foreground">{isBangla ? 'অপরাধ সমাধান' : 'Crime Solving'}</span>
              </div>
              <div className="text-2xl font-bold text-foreground">{lawOrderData.crimeStats.solvingRate}%</div>
              <div className="text-xs text-success flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3" />
                {isBangla ? `${lawOrderData.crimeStats.reduction}% হ্রাস` : `${lawOrderData.crimeStats.reduction}% reduction`}
              </div>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* City Safety Heatmap */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <MapPin className="w-5 h-5 text-primary" />
          {isBangla ? 'নগর নিরাপত্তা' : 'City Safety'}
        </h2>
        <div className="space-y-2">
          {cityData.safetyHeatmap.slice(0, 4).map((area, i) => (
            <GlassCard key={i} className="p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    area.safetyScore >= 90 ? 'bg-success/10' :
                    area.safetyScore >= 70 ? 'bg-warning/10' : 'bg-destructive/10'
                  }`}>
                    <Shield className={`w-5 h-5 ${
                      area.safetyScore >= 90 ? 'text-success' :
                      area.safetyScore >= 70 ? 'text-warning' : 'text-destructive'
                    }`} />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{area.area}</p>
                    <p className="text-xs text-muted-foreground">
                      {isBangla ? 'আলো' : 'Lighting'}: {area.lighting}% | {isBangla ? 'টহল' : 'Patrol'}: {area.patrol}%
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-lg font-bold ${
                    area.safetyScore >= 90 ? 'text-success' :
                    area.safetyScore >= 70 ? 'text-warning' : 'text-destructive'
                  }`}>
                    {area.safetyScore}%
                  </span>
                  <p className="text-xs text-muted-foreground">{isBangla ? 'নিরাপত্তা' : 'Safety'}</p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Sector Progress */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-primary" />
          {isBangla ? 'সেক্টর অগ্রগতি' : 'Sector Progress'}
        </h2>
        <GlassCard className="p-4">
          <div className="space-y-3">
            {nationalTransformationData.sectorProgress.map((sector, i) => (
              <div key={i}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-foreground">{sector.sector}</span>
                  <span className="text-muted-foreground">{sector.progress}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      sector.progress >= 50 ? 'bg-success' :
                      sector.progress >= 35 ? 'bg-warning' : 'bg-primary'
                    }`}
                    style={{ width: `${sector.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Quick Actions */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground">
          {isBangla ? 'দ্রুত পদক্ষেপ' : 'Quick Actions'}
        </h2>
        <div className="space-y-2">
          <QuickAction
            title={isBangla ? 'নাগরিক অনুরোধ দেখুন' : 'View Citizen Requests'}
            description={isBangla ? 'মুলতুবি অনুরোধ পর্যালোচনা করুন' : 'Review pending requests'}
            icon={<FileText className="w-6 h-6 text-blue-500" />}
            gradient="from-blue-50 to-indigo-50"
            badge={`${govData.pendingApprovals}`}
          />
          <QuickAction
            title={isBangla ? 'প্রকল্প অনুমোদন' : 'Project Approvals'}
            description={isBangla ? 'উন্নয়ন প্রকল্প পরিচালনা' : 'Manage development projects'}
            icon={<Building2 className="w-6 h-6 text-purple-500" />}
            gradient="from-purple-50 to-violet-50"
          />
          <QuickAction
            title={isBangla ? 'প্রতিবেদন তৈরি' : 'Generate Reports'}
            description={isBangla ? 'বিশ্লেষণ ও পরিসংখ্যান' : 'Analytics & statistics'}
            icon={<BarChart3 className="w-6 h-6 text-emerald-500" />}
            gradient="from-emerald-50 to-green-50"
          />
          <QuickAction
            title={isBangla ? 'জরুরি সতর্কতা' : 'Emergency Alerts'}
            description={isBangla ? 'জাতীয় সতর্কতা ব্যবস্থা' : 'National alert system'}
            icon={<Bell className="w-6 h-6 text-amber-500" />}
            gradient="from-amber-50 to-yellow-50"
          />
        </div>
      </div>
    </div>
  );
};

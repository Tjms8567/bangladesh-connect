import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { ImpactCard } from '../shared/ImpactCard';
import { QuickAction } from '../shared/QuickAction';
import { GlassCard } from '@/components/ui/GlassCard';
import { ProgressRing } from '../shared/ProgressRing';
import { expatriateData } from '@/data/sectorMockData';
import {
  Globe,
  Briefcase,
  Building2,
  Plane,
  FileText,
  Users,
  TrendingUp,
  MapPin,
  Heart,
  Handshake,
  DollarSign,
  Send,
  Shield,
  Home,
} from 'lucide-react';

export const GuestDashboard: React.FC = () => {
  const { isBangla } = useLanguage();
  const { demoUser } = useAuth();

  const partnershipData = demoUser ? {
    activePartnerships: 3,
    investmentOpportunities: 45,
    visaStatus: 'Business Visa',
    daysRemaining: 120,
    remittanceSent: demoUser.balance,
    nationalImpact: demoUser.sectorContributions?.expatriate || 55,
  } : {
    activePartnerships: 3,
    investmentOpportunities: 45,
    visaStatus: 'Business Visa',
    daysRemaining: 120,
    remittanceSent: 850000,
    nationalImpact: 55,
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
          🌐 {isBangla ? 'প্রবাসী কল্যাণ' : 'Expatriate Welfare'}
        </h1>
        <p className="text-muted-foreground">
          {isBangla
            ? 'বাংলাদেশের রূপান্তরে যোগ দিন'
            : 'Join Bangladesh\'s transformation'}
        </p>
      </div>

      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-teal-500 to-cyan-600 rounded-2xl p-5 text-white">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold mb-2">
              {isBangla ? 'প্রবাসী বাংলাদেশে স্বাগতম!' : 'Welcome, Probashi!'}
            </h2>
            <p className="text-white/80 text-sm mb-3">
              {isBangla
                ? 'আপনার অবদান দেশকে এগিয়ে নিচ্ছে'
                : 'Your contribution is moving the nation forward'}
            </p>
            <div className="flex items-center gap-2 bg-white/20 rounded-lg px-3 py-2 w-fit">
              <FileText className="w-4 h-4" />
              <span className="text-sm font-medium">
                {partnershipData.visaStatus} - {partnershipData.daysRemaining} {isBangla ? 'দিন বাকি' : 'days remaining'}
              </span>
            </div>
          </div>
          <Globe className="w-16 h-16 text-white/30" />
        </div>
      </div>

      {/* Remittance Stats */}
      <div className="grid grid-cols-2 gap-3">
        <ImpactCard
          title={isBangla ? 'রেমিট্যান্স পাঠিয়েছেন' : 'Remittance Sent'}
          value={formatCurrency(partnershipData.remittanceSent)}
          icon={<Send className="w-5 h-5 text-white" />}
          gradient="from-teal-500 to-cyan-600"
        />
        <ImpactCard
          title={isBangla ? 'জাতীয় অবদান' : 'National Impact'}
          value={`${partnershipData.nationalImpact}%`}
          icon={<TrendingUp className="w-5 h-5 text-white" />}
          gradient="from-amber-500 to-orange-600"
        />
      </div>

      {/* National Remittance Overview */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-primary" />
          {isBangla ? 'জাতীয় রেমিট্যান্স' : 'National Remittance'}
        </h2>
        <GlassCard className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-3xl font-bold text-foreground">${expatriateData.remittance.thisYear}B</p>
              <p className="text-sm text-success flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                +{expatriateData.remittance.yoyGrowth}% {isBangla ? 'এই বছর' : 'this year'}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-primary">${expatriateData.remittance.thisMonth}B</p>
              <p className="text-xs text-muted-foreground">{isBangla ? 'এই মাসে' : 'this month'}</p>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">{isBangla ? 'শীর্ষ উৎস দেশ' : 'Top Source Countries'}</p>
            <div className="flex flex-wrap gap-2">
              {expatriateData.remittance.topCountries.slice(0, 4).map((country, i) => (
                <div key={i} className="flex items-center gap-1 px-2 py-1 rounded-full bg-muted text-sm">
                  <span>{country.flag}</span>
                  <span className="text-foreground">${country.amount}B</span>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Workers Abroad Stats */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" />
          {isBangla ? 'বিদেশে বাংলাদেশী' : 'Bangladeshis Abroad'}
        </h2>
        <div className="grid grid-cols-3 gap-2">
          <GlassCard className="p-3 text-center">
            <div className="text-xl font-bold text-foreground">
              {(expatriateData.workersAbroad.total / 1000000).toFixed(1)}M
            </div>
            <div className="text-xs text-muted-foreground">{isBangla ? 'মোট' : 'Total'}</div>
          </GlassCard>
          <GlassCard className="p-3 text-center bg-success/10">
            <div className="text-xl font-bold text-success">
              {(expatriateData.workersAbroad.newThisYear / 1000).toFixed(0)}K
            </div>
            <div className="text-xs text-muted-foreground">{isBangla ? 'নতুন' : 'New'}</div>
          </GlassCard>
          <GlassCard className="p-3 text-center bg-warning/10">
            <div className="text-xl font-bold text-warning">
              {expatriateData.workersAbroad.inDistress.toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground">{isBangla ? 'সংকটে' : 'In Distress'}</div>
          </GlassCard>
        </div>
      </div>

      {/* Investment Portal */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-primary" />
          {isBangla ? 'বিনিয়োগ সুযোগ' : 'Investment Opportunities'}
        </h2>
        <GlassCard className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-2xl font-bold text-foreground">${expatriateData.investmentPortal.totalInvestments}M</p>
              <p className="text-sm text-muted-foreground">{isBangla ? 'মোট বিনিয়োগ' : 'Total Investment'}</p>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-success">{expatriateData.investmentPortal.averageReturn}%</p>
              <p className="text-xs text-muted-foreground">{isBangla ? 'গড় রিটার্ন' : 'Avg Return'}</p>
            </div>
          </div>
          <div className="space-y-2">
            {expatriateData.investmentPortal.popularSectors.slice(0, 3).map((sector, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="flex-1">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-foreground">{sector.sector}</span>
                    <span className="text-muted-foreground">${sector.amount}M</span>
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

      {/* Consular Services */}
      <GlassCard className="p-4 border-l-4 border-l-primary">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">
                {isBangla ? 'কনস্যুলার সেবা' : 'Consular Services'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {expatriateData.consularServices.documentsProcessed.toLocaleString()} {isBangla ? 'ডকুমেন্ট প্রক্রিয়াকৃত' : 'documents processed'}
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xl font-bold text-primary">{expatriateData.consularServices.averageProcessingDays}</span>
            <p className="text-xs text-muted-foreground">{isBangla ? 'দিনে' : 'days'}</p>
          </div>
        </div>
      </GlassCard>

      {/* Quick Actions */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground">
          {isBangla ? 'দ্রুত পদক্ষেপ' : 'Quick Actions'}
        </h2>
        <div className="space-y-2">
          <QuickAction
            title={isBangla ? 'রেমিট্যান্স পাঠান' : 'Send Remittance'}
            description={isBangla ? 'দ্রুত ও নিরাপদ ট্রান্সফার' : 'Fast & secure transfer'}
            icon={<Send className="w-6 h-6 text-teal-500" />}
            gradient="from-teal-50 to-cyan-50"
            badge={isBangla ? 'জনপ্রিয়' : 'Popular'}
          />
          <QuickAction
            title={isBangla ? 'বাংলাদেশে বিনিয়োগ' : 'Invest in Bangladesh'}
            description={isBangla ? 'প্রকল্প ও সুযোগ দেখুন' : 'View projects & opportunities'}
            icon={<Building2 className="w-6 h-6 text-blue-500" />}
            gradient="from-blue-50 to-indigo-50"
          />
          <QuickAction
            title={isBangla ? 'পরিবারের যত্ন' : 'Family Care'}
            description={isBangla ? 'পরিবারকে সাহায্য করুন' : 'Support your family'}
            icon={<Home className="w-6 h-6 text-rose-500" />}
            gradient="from-rose-50 to-pink-50"
          />
          <QuickAction
            title={isBangla ? 'দূতাবাস সেবা' : 'Embassy Services'}
            description={isBangla ? '২৪/৭ সহায়তা' : '24/7 Support'}
            icon={<MapPin className="w-6 h-6 text-purple-500" />}
            gradient="from-purple-50 to-violet-50"
          />
        </div>
      </div>

      {/* Bangladesh Showcase */}
      <GlassCard className="p-4">
        <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
          <Heart className="w-5 h-5 text-bd-red" />
          {isBangla ? 'বাংলাদেশ আবিষ্কার করুন' : 'Discover Bangladesh'}
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: '🏛️', label: isBangla ? 'ঐতিহ্য' : 'Heritage', count: '52 Sites' },
            { icon: '🏖️', label: isBangla ? 'পর্যটন' : 'Tourism', count: '100+ Spots' },
            { icon: '🎭', label: isBangla ? 'সংস্কৃতি' : 'Culture', count: 'Rich & Diverse' },
            { icon: '🍛', label: isBangla ? 'খাবার' : 'Cuisine', count: 'World Famous' },
          ].map((item, i) => (
            <div key={i} className="p-3 rounded-xl bg-muted/50 text-center">
              <span className="text-2xl">{item.icon}</span>
              <p className="font-medium text-foreground text-sm mt-1">{item.label}</p>
              <p className="text-xs text-muted-foreground">{item.count}</p>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
};

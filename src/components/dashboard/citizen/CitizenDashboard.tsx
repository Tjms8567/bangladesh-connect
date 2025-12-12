import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { ImpactCard } from '../shared/ImpactCard';
import { QuickAction } from '../shared/QuickAction';
import { TransformationMeter } from '../shared/TransformationMeter';
import { ProgressRing } from '../shared/ProgressRing';
import { GlassCard } from '@/components/ui/GlassCard';
import {
  Users,
  Heart,
  BookOpen,
  Wallet,
  FileText,
  MapPin,
  Shield,
  Award,
  Target,
  Sparkles,
} from 'lucide-react';

export const CitizenDashboard: React.FC = () => {
  const { isBangla } = useLanguage();
  const { demoUser } = useAuth();

  // Use demo user data if available, otherwise fallback to mock
  const impactData = demoUser ? {
    personalGrowth: demoUser.personalScore,
    communityContribution: Math.round(demoUser.nationalScore * 0.6),
    nationalImpact: demoUser.nationalScore,
    points: demoUser.points,
    level: demoUser.level,
    servicesUsed: 12,
    goalsCompleted: 8,
  } : {
    personalGrowth: 72,
    communityContribution: 45,
    nationalImpact: 28,
    points: 1250,
    level: 'Silver',
    servicesUsed: 12,
    goalsCompleted: 8,
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Section */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-foreground">
          {isBangla 
            ? `স্বাগতম${demoUser ? `, ${demoUser.fullNameBn.split(' ')[0]}` : ''}!` 
            : `Welcome${demoUser ? `, ${demoUser.fullName.split(' ')[0]}` : ''}!`} 👋
        </h1>
        <p className="text-muted-foreground">
          {isBangla
            ? 'আজ আপনার রূপান্তরের যাত্রা চালিয়ে যান'
            : 'Continue your transformation journey today'}
        </p>
      </div>

      {/* Impact Cards Grid */}
      <div className="grid grid-cols-2 gap-3">
        <ImpactCard
          title={isBangla ? 'ইমপ্যাক্ট পয়েন্ট' : 'Impact Points'}
          value={impactData.points.toLocaleString()}
          subtitle={isBangla ? 'সিলভার সদস্য' : 'Silver Member'}
          icon={<Award className="w-5 h-5 text-white" />}
          trend={{ value: 12, isPositive: true }}
          gradient="from-amber-500 to-yellow-600"
        />
        <ImpactCard
          title={isBangla ? 'সেবা ব্যবহৃত' : 'Services Used'}
          value={impactData.servicesUsed}
          subtitle={isBangla ? 'এই মাসে' : 'This month'}
          icon={<Target className="w-5 h-5 text-white" />}
          trend={{ value: 8, isPositive: true }}
          gradient="from-emerald-500 to-green-600"
        />
      </div>

      {/* Personal Growth Ring */}
      <GlassCard variant="elevated" className="p-5">
        <div className="flex items-center gap-6">
          <ProgressRing progress={impactData.personalGrowth} size={100}>
            <div className="text-center">
              <div className="text-xl font-bold text-foreground">
                {impactData.personalGrowth}%
              </div>
              <div className="text-xs text-muted-foreground">
                {isBangla ? 'বৃদ্ধি' : 'Growth'}
              </div>
            </div>
          </ProgressRing>
          <div className="flex-1 space-y-2">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-accent" />
              {isBangla ? 'ব্যক্তিগত বৃদ্ধি' : 'Personal Growth'}
            </h3>
            <p className="text-sm text-muted-foreground">
              {isBangla
                ? `আপনি ${impactData.goalsCompleted}টি লক্ষ্য অর্জন করেছেন`
                : `You've achieved ${impactData.goalsCompleted} goals`}
            </p>
            <div className="flex gap-2">
              <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                {isBangla ? 'শিক্ষা' : 'Education'}
              </span>
              <span className="px-2 py-1 text-xs rounded-full bg-accent/10 text-accent-foreground">
                {isBangla ? 'স্বাস্থ্য' : 'Health'}
              </span>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Transformation Meter */}
      <TransformationMeter
        personalProgress={impactData.personalGrowth}
        communityProgress={impactData.communityContribution}
        nationalProgress={impactData.nationalImpact}
      />

      {/* Quick Actions */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground">
          {isBangla ? 'দ্রুত পদক্ষেপ' : 'Quick Actions'}
        </h2>
        <div className="space-y-2">
          <QuickAction
            title={isBangla ? 'স্বাস্থ্য সেবা' : 'Health Services'}
            description={isBangla ? 'ডাক্তার অ্যাপয়েন্টমেন্ট বুক করুন' : 'Book doctor appointments'}
            icon={<Heart className="w-6 h-6 text-rose-500" />}
            gradient="from-rose-50 to-pink-50"
          />
          <QuickAction
            title={isBangla ? 'শিক্ষা' : 'Education'}
            description={isBangla ? 'কোর্স ও সার্টিফিকেশন' : 'Courses & Certifications'}
            icon={<BookOpen className="w-6 h-6 text-blue-500" />}
            gradient="from-blue-50 to-indigo-50"
            badge={isBangla ? 'নতুন' : 'New'}
          />
          <QuickAction
            title={isBangla ? 'আর্থিক সেবা' : 'Financial Services'}
            description={isBangla ? 'পেমেন্ট ও ট্রান্সফার' : 'Payments & Transfers'}
            icon={<Wallet className="w-6 h-6 text-emerald-500" />}
            gradient="from-emerald-50 to-green-50"
          />
          <QuickAction
            title={isBangla ? 'সরকারি সেবা' : 'Government Services'}
            description={isBangla ? 'ডকুমেন্ট ও সার্টিফিকেট' : 'Documents & Certificates'}
            icon={<FileText className="w-6 h-6 text-purple-500" />}
            gradient="from-purple-50 to-violet-50"
          />
        </div>
      </div>

      {/* Family & Community Section */}
      <GlassCard className="p-4">
        <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" />
          {isBangla ? 'পরিবার ও সম্প্রদায়' : 'Family & Community'}
        </h3>
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-3 rounded-xl bg-muted/50">
            <div className="text-2xl font-bold text-foreground">4</div>
            <div className="text-xs text-muted-foreground">
              {isBangla ? 'পরিবারের সদস্য' : 'Family Members'}
            </div>
          </div>
          <div className="text-center p-3 rounded-xl bg-muted/50">
            <div className="text-2xl font-bold text-foreground">12</div>
            <div className="text-xs text-muted-foreground">
              {isBangla ? 'সক্রিয় সংযোগ' : 'Active Connections'}
            </div>
          </div>
          <div className="text-center p-3 rounded-xl bg-muted/50">
            <div className="text-2xl font-bold text-foreground">3</div>
            <div className="text-xs text-muted-foreground">
              {isBangla ? 'চ্যালেঞ্জ' : 'Challenges'}
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Local Services */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <MapPin className="w-5 h-5 text-primary" />
          {isBangla ? 'স্থানীয় সেবা' : 'Local Services'}
        </h2>
        <div className="grid grid-cols-4 gap-2">
          {[
            { icon: '🏥', label: isBangla ? 'হাসপাতাল' : 'Hospital' },
            { icon: '🏫', label: isBangla ? 'স্কুল' : 'School' },
            { icon: '🏦', label: isBangla ? 'ব্যাংক' : 'Bank' },
            { icon: '👮', label: isBangla ? 'পুলিশ' : 'Police' },
          ].map((service, i) => (
            <button
              key={i}
              className="flex flex-col items-center gap-2 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
            >
              <span className="text-2xl">{service.icon}</span>
              <span className="text-xs text-muted-foreground">{service.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

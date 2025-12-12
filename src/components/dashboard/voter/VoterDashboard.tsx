import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ImpactCard } from '../shared/ImpactCard';
import { QuickAction } from '../shared/QuickAction';
import { GlassCard } from '@/components/ui/GlassCard';
import {
  Vote,
  Users,
  FileText,
  MapPin,
  Bell,
  CheckCircle,
  Calendar,
  Building2,
  Scale,
  Megaphone,
} from 'lucide-react';

export const VoterDashboard: React.FC = () => {
  const { isBangla } = useLanguage();

  const voterData = {
    voterId: 'BD-2024-1234567',
    constituency: isBangla ? 'ঢাকা-১০' : 'Dhaka-10',
    registrationStatus: 'verified',
    votesParticipated: 3,
    nextElection: '2024-12-25',
  };

  const representatives = [
    { name: 'MP Name', nameBn: 'এমপি নাম', role: 'Member of Parliament', roleBn: 'সংসদ সদস্য', rating: 4.2 },
    { name: 'Councillor Name', nameBn: 'কাউন্সিলর নাম', role: 'City Councillor', roleBn: 'সিটি কাউন্সিলর', rating: 3.8 },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          🗳️ {isBangla ? 'গণতান্ত্রিক অবদান' : 'Democratic Contribution'}
        </h1>
        <p className="text-muted-foreground">
          {isBangla
            ? 'আপনার নাগরিক অংশগ্রহণ ট্র্যাক করুন'
            : 'Track your civic participation'}
        </p>
      </div>

      {/* Voter Card */}
      <GlassCard variant="elevated" className="p-5 bg-gradient-to-br from-cyan-500/10 to-blue-500/10">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm text-muted-foreground">
              {isBangla ? 'ভোটার আইডি' : 'Voter ID'}
            </p>
            <p className="font-mono font-bold text-foreground">{voterData.voterId}</p>
          </div>
          <div className="flex items-center gap-1 px-2 py-1 bg-success/20 text-success rounded-full text-xs font-medium">
            <CheckCircle className="w-3 h-3" />
            {isBangla ? 'যাচাইকৃত' : 'Verified'}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground">
              {isBangla ? 'নির্বাচনী এলাকা' : 'Constituency'}
            </p>
            <p className="font-medium text-foreground">{voterData.constituency}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">
              {isBangla ? 'অংশগ্রহণ' : 'Participation'}
            </p>
            <p className="font-medium text-foreground">
              {voterData.votesParticipated} {isBangla ? 'নির্বাচন' : 'Elections'}
            </p>
          </div>
        </div>
      </GlassCard>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <ImpactCard
          title={isBangla ? 'নির্বাচনী এলাকা' : 'Constituency'}
          value={voterData.constituency}
          icon={<MapPin className="w-5 h-5 text-white" />}
          gradient="from-cyan-500 to-blue-600"
        />
        <ImpactCard
          title={isBangla ? 'ভোট দিয়েছেন' : 'Votes Cast'}
          value={voterData.votesParticipated}
          subtitle={isBangla ? 'মোট' : 'Total'}
          icon={<Vote className="w-5 h-5 text-white" />}
          gradient="from-purple-500 to-indigo-600"
        />
      </div>

      {/* Upcoming Election */}
      <GlassCard className="p-4 border-l-4 border-l-warning">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-warning/20 flex items-center justify-center">
            <Calendar className="w-6 h-6 text-warning" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground">
              {isBangla ? 'আসন্ন নির্বাচন' : 'Upcoming Election'}
            </h3>
            <p className="text-sm text-muted-foreground">
              {isBangla ? 'স্থানীয় সরকার নির্বাচন - ২৫ ডিসেম্বর, ২০২৪' : 'Local Government Election - Dec 25, 2024'}
            </p>
          </div>
          <Bell className="w-5 h-5 text-muted-foreground" />
        </div>
      </GlassCard>

      {/* Representatives */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Building2 className="w-5 h-5 text-primary" />
          {isBangla ? 'আপনার প্রতিনিধি' : 'Your Representatives'}
        </h2>
        <div className="space-y-2">
          {representatives.map((rep, i) => (
            <GlassCard key={i} className="p-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">
                  {(isBangla ? rep.nameBn : rep.name).charAt(0)}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-foreground">
                    {isBangla ? rep.nameBn : rep.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {isBangla ? rep.roleBn : rep.role}
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-amber-500">
                    {'★'.repeat(Math.round(rep.rating))}
                  </div>
                  <p className="text-xs text-muted-foreground">{rep.rating}/5</p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground">
          {isBangla ? 'নাগরিক পদক্ষেপ' : 'Civic Actions'}
        </h2>
        <div className="space-y-2">
          <QuickAction
            title={isBangla ? 'ভোটার তথ্য আপডেট' : 'Update Voter Info'}
            description={isBangla ? 'ঠিকানা ও তথ্য পরিবর্তন' : 'Change address & details'}
            icon={<FileText className="w-6 h-6 text-blue-500" />}
            gradient="from-blue-50 to-indigo-50"
          />
          <QuickAction
            title={isBangla ? 'প্রতিনিধির সাথে যোগাযোগ' : 'Contact Representative'}
            description={isBangla ? 'আপনার মতামত জানান' : 'Share your opinion'}
            icon={<Megaphone className="w-6 h-6 text-purple-500" />}
            gradient="from-purple-50 to-violet-50"
          />
          <QuickAction
            title={isBangla ? 'আইন ও নীতি' : 'Laws & Policies'}
            description={isBangla ? 'সাম্প্রতিক আইন দেখুন' : 'View recent legislation'}
            icon={<Scale className="w-6 h-6 text-emerald-500" />}
            gradient="from-emerald-50 to-green-50"
          />
        </div>
      </div>

      {/* Civic Engagement Stats */}
      <GlassCard className="p-4">
        <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" />
          {isBangla ? 'নাগরিক সম্পৃক্ততা' : 'Civic Engagement'}
        </h3>
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-3 rounded-xl bg-muted/50">
            <div className="text-2xl font-bold text-foreground">5</div>
            <div className="text-xs text-muted-foreground">
              {isBangla ? 'পিটিশন স্বাক্ষর' : 'Petitions Signed'}
            </div>
          </div>
          <div className="text-center p-3 rounded-xl bg-muted/50">
            <div className="text-2xl font-bold text-foreground">2</div>
            <div className="text-xs text-muted-foreground">
              {isBangla ? 'টাউন হল' : 'Town Halls'}
            </div>
          </div>
          <div className="text-center p-3 rounded-xl bg-muted/50">
            <div className="text-2xl font-bold text-foreground">8</div>
            <div className="text-xs text-muted-foreground">
              {isBangla ? 'মতামত দিয়েছেন' : 'Feedback Given'}
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

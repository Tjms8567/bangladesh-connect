import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ImpactCard } from '../shared/ImpactCard';
import { QuickAction } from '../shared/QuickAction';
import { GlassCard } from '@/components/ui/GlassCard';
import { Logo } from '@/components/ui/Logo';
import {
  Lightbulb,
  Users,
  Rocket,
  Award,
  TrendingUp,
  Calendar,
  MessageSquare,
  DollarSign,
  Target,
  Briefcase,
  Star,
  CheckCircle,
} from 'lucide-react';

export const FounderDashboard: React.FC = () => {
  const { isBangla } = useLanguage();

  const founderData = {
    activeProjects: 5,
    totalConnections: 89,
    pitchesSubmitted: 12,
    fundingRaised: '৳2.5M',
    mentorSessions: 8,
    challengesWon: 3,
  };

  const activeProjects = [
    { name: 'AgriTech BD', nameBn: 'অ্যাগ্রিটেক বিডি', stage: 'Seed', stageBn: 'বীজ', progress: 65, funding: '৳500K' },
    { name: 'EduConnect', nameBn: 'এডুকানেক্ট', stage: 'Pre-Seed', stageBn: 'প্রি-সিড', progress: 40, funding: '৳200K' },
    { name: 'HealthLink', nameBn: 'হেলথলিংক', stage: 'Series A', stageBn: 'সিরিজ এ', progress: 85, funding: '৳5M' },
  ];

  const upcomingEvents = [
    { title: 'Startup Dhaka Pitch Night', titleBn: 'স্টার্টআপ ঢাকা পিচ নাইট', date: 'Dec 15', type: 'pitch' },
    { title: 'Mentor Session - Marketing', titleBn: 'মেন্টর সেশন - মার্কেটিং', date: 'Dec 18', type: 'mentor' },
    { title: 'Investor Meeting', titleBn: 'বিনিয়োগকারী মিটিং', date: 'Dec 20', type: 'investor' },
  ];

  const challenges = [
    { name: 'Climate Innovation', nameBn: 'জলবায়ু উদ্ভাবন', prize: '৳1M', deadline: '15 days' },
    { name: 'Digital Health', nameBn: 'ডিজিটাল স্বাস্থ্য', prize: '৳500K', deadline: '30 days' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header with Logo */}
      <div className="flex items-center gap-4">
        <Logo size="md" animation="pulse" showGlow />
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            🤝 {isBangla ? 'উদ্ভাবন সহযোগিতা' : 'Innovation Collaboration'}
          </h1>
          <p className="text-muted-foreground">{isBangla ? 'স্টার্টআপ ও উদ্ভাবকদের জন্য' : 'For Startups & Innovators'}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <ImpactCard
          title={isBangla ? 'সক্রিয় প্রকল্প' : 'Active Projects'}
          value={founderData.activeProjects}
          icon={<Lightbulb className="w-5 h-5 text-white" />}
          gradient="from-violet-500 to-purple-600"
          trend={{ value: 2, isPositive: true }}
        />
        <ImpactCard
          title={isBangla ? 'মোট সংযোগ' : 'Total Connections'}
          value={founderData.totalConnections}
          icon={<Users className="w-5 h-5 text-white" />}
          gradient="from-pink-500 to-rose-600"
          trend={{ value: 15, isPositive: true }}
        />
        <ImpactCard
          title={isBangla ? 'তহবিল সংগৃহীত' : 'Funding Raised'}
          value={founderData.fundingRaised}
          icon={<DollarSign className="w-5 h-5 text-white" />}
          gradient="from-emerald-500 to-green-600"
        />
        <ImpactCard
          title={isBangla ? 'চ্যালেঞ্জ জয়' : 'Challenges Won'}
          value={founderData.challengesWon}
          icon={<Award className="w-5 h-5 text-white" />}
          gradient="from-amber-500 to-yellow-600"
        />
      </div>

      {/* Active Projects */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Rocket className="w-5 h-5 text-primary" />
          {isBangla ? 'আমার প্রকল্পসমূহ' : 'My Projects'}
        </h2>
        <div className="space-y-2">
          {activeProjects.map((project, i) => (
            <GlassCard key={i} className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-medium text-foreground">
                    {isBangla ? project.nameBn : project.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="px-2 py-0.5 text-xs bg-primary/10 text-primary rounded-full">
                      {isBangla ? project.stageBn : project.stage}
                    </span>
                    <span className="text-xs text-muted-foreground">{project.funding}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-foreground">{project.progress}%</span>
                </div>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-violet-500 to-purple-600 transition-all duration-500"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Active Challenges */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Target className="w-5 h-5 text-primary" />
          {isBangla ? 'সক্রিয় চ্যালেঞ্জ' : 'Active Challenges'}
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {challenges.map((challenge, i) => (
            <GlassCard key={i} className="p-4 border-l-4 border-l-accent">
              <h3 className="font-medium text-foreground text-sm">
                {isBangla ? challenge.nameBn : challenge.name}
              </h3>
              <p className="text-lg font-bold text-accent mt-1">{challenge.prize}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {isBangla ? `${challenge.deadline} বাকি` : `${challenge.deadline} left`}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Upcoming Events */}
      <GlassCard className="p-4">
        <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          {isBangla ? 'আসন্ন ইভেন্ট' : 'Upcoming Events'}
        </h3>
        <div className="space-y-3">
          {upcomingEvents.map((event, i) => (
            <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                event.type === 'pitch' ? 'bg-violet-500/10 text-violet-500' :
                event.type === 'mentor' ? 'bg-blue-500/10 text-blue-500' :
                'bg-emerald-500/10 text-emerald-500'
              }`}>
                {event.type === 'pitch' ? <Rocket className="w-5 h-5" /> :
                 event.type === 'mentor' ? <MessageSquare className="w-5 h-5" /> :
                 <Briefcase className="w-5 h-5" />}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">
                  {isBangla ? event.titleBn : event.title}
                </p>
                <p className="text-xs text-muted-foreground">{event.date}</p>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Quick Actions */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground">
          {isBangla ? 'দ্রুত পদক্ষেপ' : 'Quick Actions'}
        </h2>
        <div className="space-y-2">
          <QuickAction
            title={isBangla ? 'মেন্টর খুঁজুন' : 'Find Mentors'}
            description={isBangla ? '৫০+ অভিজ্ঞ মেন্টর' : '50+ experienced mentors'}
            icon={<Users className="w-6 h-6 text-blue-500" />}
            gradient="from-blue-50 to-indigo-50"
          />
          <QuickAction
            title={isBangla ? 'পিচ জমা দিন' : 'Submit Pitch'}
            description={isBangla ? 'বিনিয়োগকারীদের কাছে উপস্থাপন' : 'Present to investors'}
            icon={<Rocket className="w-6 h-6 text-purple-500" />}
            gradient="from-purple-50 to-violet-50"
            badge={isBangla ? 'নতুন' : 'New'}
          />
          <QuickAction
            title={isBangla ? 'স্টার্টআপ রিসোর্স' : 'Startup Resources'}
            description={isBangla ? 'গাইড ও টেমপ্লেট' : 'Guides & templates'}
            icon={<Briefcase className="w-6 h-6 text-emerald-500" />}
            gradient="from-emerald-50 to-green-50"
          />
        </div>
      </div>

      {/* Success Stories */}
      <GlassCard className="p-4 bg-gradient-to-r from-primary/5 to-secondary/5">
        <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
          <Star className="w-5 h-5 text-accent" />
          {isBangla ? 'সাফল্যের গল্প' : 'Success Stories'}
        </h3>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-white text-2xl">
            🎉
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-foreground">GreenBD Farms</h4>
            <p className="text-sm text-muted-foreground">
              {isBangla 
                ? 'সম্প্রতি ৳১০M সিরিজ A রাউন্ড সম্পন্ন করেছে!' 
                : 'Recently closed ৳10M Series A round!'}
            </p>
            <div className="flex items-center gap-1 mt-1 text-success text-xs">
              <CheckCircle className="w-3 h-3" />
              {isBangla ? 'যাচাইকৃত' : 'Verified'}
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

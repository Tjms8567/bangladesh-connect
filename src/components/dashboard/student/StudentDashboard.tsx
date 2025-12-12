import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ImpactCard } from '../shared/ImpactCard';
import { QuickAction } from '../shared/QuickAction';
import { ProgressRing } from '../shared/ProgressRing';
import { GlassCard } from '@/components/ui/GlassCard';
import {
  BookOpen,
  Trophy,
  Clock,
  Target,
  GraduationCap,
  Lightbulb,
  Users,
  Calendar,
  Star,
  TrendingUp,
} from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const { isBangla } = useLanguage();

  const studentData = {
    coursesEnrolled: 5,
    coursesCompleted: 12,
    skillsLearned: 28,
    studyHours: 156,
    currentStreak: 14,
    certificates: 6,
    ranking: 234,
    careerProgress: 65,
  };

  const activeCourses = [
    { name: 'Web Development', nameBn: 'ওয়েব ডেভেলপমেন্ট', progress: 75, color: 'from-blue-500 to-indigo-600' },
    { name: 'Data Science', nameBn: 'ডেটা সায়েন্স', progress: 45, color: 'from-purple-500 to-violet-600' },
    { name: 'English Speaking', nameBn: 'ইংরেজি কথোপকথন', progress: 90, color: 'from-emerald-500 to-green-600' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          🎓 {isBangla ? 'বৃদ্ধি যাত্রা' : 'Growth Journey'}
        </h1>
        <p className="text-muted-foreground">
          {isBangla
            ? 'আপনার দক্ষতা উন্নয়ন ট্র্যাক করুন'
            : 'Track your skill development'}
        </p>
      </div>

      {/* Streak Banner */}
      <div className="bg-gradient-to-r from-amber-500 to-yellow-500 rounded-2xl p-4 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-3xl">🔥</div>
            <div>
              <p className="font-bold text-lg">
                {studentData.currentStreak} {isBangla ? 'দিনের স্ট্রিক!' : 'Day Streak!'}
              </p>
              <p className="text-white/80 text-sm">
                {isBangla ? 'চালিয়ে যান!' : 'Keep it going!'}
              </p>
            </div>
          </div>
          <Trophy className="w-10 h-10 text-white/80" />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <ImpactCard
          title={isBangla ? 'দক্ষতা অর্জিত' : 'Skills Learned'}
          value={studentData.skillsLearned}
          subtitle={isBangla ? 'এই বছর' : 'This year'}
          icon={<Lightbulb className="w-5 h-5 text-white" />}
          trend={{ value: 15, isPositive: true }}
          gradient="from-purple-500 to-violet-600"
        />
        <ImpactCard
          title={isBangla ? 'সার্টিফিকেট' : 'Certificates'}
          value={studentData.certificates}
          subtitle={isBangla ? 'অর্জিত' : 'Earned'}
          icon={<GraduationCap className="w-5 h-5 text-white" />}
          gradient="from-blue-500 to-indigo-600"
        />
      </div>

      {/* Career Progress */}
      <GlassCard variant="elevated" className="p-5">
        <div className="flex items-center gap-6">
          <ProgressRing progress={studentData.careerProgress} size={100}>
            <div className="text-center">
              <div className="text-xl font-bold text-foreground">
                {studentData.careerProgress}%
              </div>
              <div className="text-xs text-muted-foreground">
                {isBangla ? 'ক্যারিয়ার' : 'Career'}
              </div>
            </div>
          </ProgressRing>
          <div className="flex-1 space-y-2">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <Target className="w-4 h-4 text-primary" />
              {isBangla ? 'ক্যারিয়ার পথ অগ্রগতি' : 'Career Path Progress'}
            </h3>
            <p className="text-sm text-muted-foreground">
              {isBangla
                ? 'ফুল-স্ট্যাক ডেভেলপার হওয়ার পথে'
                : 'On track to become a Full-Stack Developer'}
            </p>
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="w-4 h-4 text-success" />
              <span className="text-success font-medium">
                {isBangla ? 'সময়মতো আছেন' : 'On schedule'}
              </span>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Active Courses */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" />
          {isBangla ? 'চলমান কোর্স' : 'Active Courses'}
        </h2>
        <div className="space-y-2">
          {activeCourses.map((course, i) => (
            <div
              key={i}
              className="p-4 rounded-2xl bg-card border border-border/50 space-y-3"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-foreground">
                  {isBangla ? course.nameBn : course.name}
                </h3>
                <span className="text-sm font-bold text-primary">
                  {course.progress}%
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${course.color} transition-all duration-500`}
                  style={{ width: `${course.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground">
          {isBangla ? 'দ্রুত পদক্ষেপ' : 'Quick Actions'}
        </h2>
        <div className="space-y-2">
          <QuickAction
            title={isBangla ? 'নতুন কোর্স খুঁজুন' : 'Explore New Courses'}
            description={isBangla ? '১০০+ কোর্স উপলব্ধ' : '100+ courses available'}
            icon={<BookOpen className="w-6 h-6 text-blue-500" />}
            gradient="from-blue-50 to-indigo-50"
            badge={isBangla ? 'নতুন' : 'New'}
          />
          <QuickAction
            title={isBangla ? 'স্টাডি গ্রুপ' : 'Study Groups'}
            description={isBangla ? 'সহপাঠীদের সাথে পড়ুন' : 'Learn with peers'}
            icon={<Users className="w-6 h-6 text-purple-500" />}
            gradient="from-purple-50 to-violet-50"
          />
          <QuickAction
            title={isBangla ? 'স্কলারশিপ' : 'Scholarships'}
            description={isBangla ? 'বৃত্তির জন্য আবেদন করুন' : 'Apply for scholarships'}
            icon={<Star className="w-6 h-6 text-amber-500" />}
            gradient="from-amber-50 to-yellow-50"
          />
        </div>
      </div>

      {/* Upcoming Schedule */}
      <GlassCard className="p-4">
        <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          {isBangla ? 'আগামী সময়সূচী' : 'Upcoming Schedule'}
        </h3>
        <div className="space-y-3">
          {[
            { time: '10:00 AM', event: isBangla ? 'লাইভ ক্লাস: জাভাস্ক্রিপ্ট' : 'Live Class: JavaScript', type: 'class' },
            { time: '2:00 PM', event: isBangla ? 'অ্যাসাইনমেন্ট ডেডলাইন' : 'Assignment Deadline', type: 'deadline' },
            { time: '4:00 PM', event: isBangla ? 'মেন্টর সেশন' : 'Mentor Session', type: 'mentor' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="w-16 text-sm font-medium text-muted-foreground">
                {item.time}
              </div>
              <div className={`w-1 h-8 rounded-full ${
                item.type === 'class' ? 'bg-blue-500' :
                item.type === 'deadline' ? 'bg-red-500' : 'bg-green-500'
              }`} />
              <div className="flex-1 text-sm text-foreground">{item.event}</div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Study Stats */}
      <div className="grid grid-cols-2 gap-3">
        <GlassCard className="p-4 text-center">
          <Clock className="w-6 h-6 text-primary mx-auto mb-2" />
          <div className="text-2xl font-bold text-foreground">{studentData.studyHours}</div>
          <div className="text-xs text-muted-foreground">
            {isBangla ? 'ঘণ্টা অধ্যয়ন' : 'Study Hours'}
          </div>
        </GlassCard>
        <GlassCard className="p-4 text-center">
          <Trophy className="w-6 h-6 text-accent mx-auto mb-2" />
          <div className="text-2xl font-bold text-foreground">#{studentData.ranking}</div>
          <div className="text-xs text-muted-foreground">
            {isBangla ? 'লিডারবোর্ড' : 'Leaderboard'}
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

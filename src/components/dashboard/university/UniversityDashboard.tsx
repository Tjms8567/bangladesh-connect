import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { ImpactCard } from '../shared/ImpactCard';
import { QuickAction } from '../shared/QuickAction';
import { GlassCard } from '@/components/ui/GlassCard';
import { ProgressRing } from '../shared/ProgressRing';
import { educationData } from '@/data/sectorMockData';
import {
  GraduationCap,
  Users,
  BookOpen,
  Award,
  Calendar,
  FileText,
  TrendingUp,
  Lightbulb,
  Target,
  Briefcase,
  Star,
  PenTool,
} from 'lucide-react';

export const UniversityDashboard: React.FC = () => {
  const { isBangla } = useLanguage();
  const { demoUser } = useAuth();

  const universityData = demoUser ? {
    totalStudents: 12450,
    graduatesThisYear: 2340,
    researchProjects: 45,
    nationalImpact: demoUser.sectorContributions?.education || 65,
    employmentRate: 78,
  } : {
    totalStudents: 12450,
    graduatesThisYear: 2340,
    researchProjects: 45,
    nationalImpact: 65,
    employmentRate: 78,
  };

  const departments = [
    { name: 'Engineering', nameBn: 'প্রকৌশল', students: 3500, faculty: 85, rating: 4.8 },
    { name: 'Business', nameBn: 'ব্যবসা', students: 2800, faculty: 62, rating: 4.6 },
    { name: 'Medicine', nameBn: 'চিকিৎসা', students: 1200, faculty: 95, rating: 4.9 },
    { name: 'Arts & Science', nameBn: 'কলা ও বিজ্ঞান', students: 4950, faculty: 120, rating: 4.5 },
  ];

  const researchHighlights = [
    { title: 'AI in Agriculture', titleBn: 'কৃষিতে এআই', funding: '৳5M', status: 'active' },
    { title: 'Climate Change Study', titleBn: 'জলবায়ু পরিবর্তন গবেষণা', funding: '৳8M', status: 'active' },
    { title: 'Digital Health Platform', titleBn: 'ডিজিটাল স্বাস্থ্য প্ল্যাটফর্ম', funding: '৳3.5M', status: 'completed' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          📚 {isBangla ? 'জ্ঞান নেতৃত্ব' : 'Knowledge Leadership'}
        </h1>
        <p className="text-muted-foreground">
          {isBangla ? 'শিক্ষার্থী শিক্ষিত → জাতি ক্ষমতায়িত' : 'Students educated → Nation empowered'}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <ImpactCard
          title={isBangla ? 'শিক্ষার্থী' : 'Students'}
          value={universityData.totalStudents.toLocaleString()}
          icon={<Users className="w-5 h-5 text-white" />}
          gradient="from-orange-500 to-amber-600"
        />
        <ImpactCard
          title={isBangla ? 'গ্র্যাজুয়েট' : 'Graduates (Year)'}
          value={universityData.graduatesThisYear.toLocaleString()}
          trend={{ value: 8, isPositive: true }}
          icon={<GraduationCap className="w-5 h-5 text-white" />}
          gradient="from-purple-500 to-violet-600"
        />
      </div>

      {/* National Education Impact */}
      <GlassCard variant="elevated" className="p-5">
        <div className="flex items-center gap-6">
          <ProgressRing progress={universityData.nationalImpact} size={100}>
            <div className="text-center">
              <div className="text-xl font-bold text-foreground">
                {universityData.nationalImpact}%
              </div>
              <div className="text-xs text-muted-foreground">
                {isBangla ? 'প্রভাব' : 'Impact'}
              </div>
            </div>
          </ProgressRing>
          <div className="flex-1 space-y-2">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <Target className="w-4 h-4 text-primary" />
              {isBangla ? 'জাতীয় শিক্ষা অবদান' : 'National Education Contribution'}
            </h3>
            <p className="text-sm text-muted-foreground">
              {isBangla
                ? `${universityData.employmentRate}% গ্র্যাজুয়েট কর্মসংস্থান হার`
                : `${universityData.employmentRate}% graduate employment rate`}
            </p>
          </div>
        </div>
      </GlassCard>

      {/* Skill Gap Analysis */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          {isBangla ? 'দক্ষতা ফাঁক বিশ্লেষণ' : 'Skill Gap Analysis'}
        </h2>
        <GlassCard className="p-4">
          <div className="space-y-3">
            {educationData.skillGaps.slice(0, 4).map((skill, i) => (
              <div key={i}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-foreground">{skill.skill}</span>
                  <span className="text-destructive font-medium">Gap: {skill.gap}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden flex">
                  <div
                    className="h-full bg-success rounded-l-full"
                    style={{ width: `${skill.supply}%` }}
                  />
                  <div
                    className="h-full bg-destructive/30"
                    style={{ width: `${skill.gap}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>{isBangla ? 'সরবরাহ' : 'Supply'}: {skill.supply}%</span>
                  <span>{isBangla ? 'চাহিদা' : 'Demand'}: {skill.demand}%</span>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Departments */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" />
          {isBangla ? 'বিভাগসমূহ' : 'Departments'}
        </h2>
        <div className="space-y-2">
          {departments.map((dept, i) => (
            <GlassCard key={i} className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-foreground">
                    {isBangla ? dept.nameBn : dept.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {dept.students.toLocaleString()} {isBangla ? 'শিক্ষার্থী' : 'students'} • {dept.faculty} {isBangla ? 'শিক্ষক' : 'faculty'}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-amber-500 fill-current" />
                  <span className="font-medium text-foreground">{dept.rating}</span>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Research Highlights */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-primary" />
          {isBangla ? 'গবেষণা প্রকল্প' : 'Research Projects'}
        </h2>
        <div className="space-y-2">
          {researchHighlights.map((project, i) => (
            <GlassCard key={i} className="p-3 flex items-center justify-between">
              <div>
                <h4 className="font-medium text-foreground text-sm">
                  {isBangla ? project.titleBn : project.title}
                </h4>
                <p className="text-xs text-muted-foreground">{project.funding}</p>
              </div>
              <span className={`px-2 py-1 text-xs rounded-full ${
                project.status === 'active' ? 'bg-success/20 text-success' : 'bg-primary/20 text-primary'
              }`}>
                {project.status === 'active' ? (isBangla ? 'চলমান' : 'Active') : (isBangla ? 'সম্পন্ন' : 'Done')}
              </span>
            </GlassCard>
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
            title={isBangla ? 'কোর্স ম্যানেজমেন্ট' : 'Course Management'}
            description={isBangla ? 'কোর্স তৈরি ও সম্পাদনা' : 'Create & edit courses'}
            icon={<BookOpen className="w-6 h-6 text-blue-500" />}
            gradient="from-blue-50 to-indigo-50"
          />
          <QuickAction
            title={isBangla ? 'গবেষণা পোর্টাল' : 'Research Portal'}
            description={isBangla ? 'গবেষণা প্রস্তাব জমা দিন' : 'Submit research proposals'}
            icon={<FileText className="w-6 h-6 text-purple-500" />}
            gradient="from-purple-50 to-violet-50"
          />
          <QuickAction
            title={isBangla ? 'পরীক্ষার সময়সূচী' : 'Exam Schedule'}
            description={isBangla ? 'পরীক্ষা পরিচালনা করুন' : 'Manage examinations'}
            icon={<Calendar className="w-6 h-6 text-emerald-500" />}
            gradient="from-emerald-50 to-green-50"
          />
          <QuickAction
            title={isBangla ? 'ইন্ডাস্ট্রি লিংক' : 'Industry Linkage'}
            description={isBangla ? 'চাকরি প্লেসমেন্ট' : 'Job placements'}
            icon={<Briefcase className="w-6 h-6 text-amber-500" />}
            gradient="from-amber-50 to-yellow-50"
            badge={isBangla ? 'নতুন' : 'New'}
          />
        </div>
      </div>

      {/* Entrepreneurship Hub */}
      <GlassCard className="p-4 bg-gradient-to-r from-violet-500/10 to-purple-500/10">
        <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-violet-500" />
          {isBangla ? 'উদ্যোক্তা হাব' : 'Entrepreneurship Hub'}
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">
              {educationData.entrepreneurshipHub.ideasSubmitted.toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground">
              {isBangla ? 'আইডিয়া জমা' : 'Ideas Submitted'}
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-success">
              {educationData.entrepreneurshipHub.successfulStartups}
            </div>
            <div className="text-xs text-muted-foreground">
              {isBangla ? 'সফল স্টার্টআপ' : 'Successful Startups'}
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

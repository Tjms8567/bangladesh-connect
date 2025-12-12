import React, { useState } from 'react';
import { 
  BookOpen, Play, Award, Users, Brain, Clock, Star, ChevronRight, 
  Trophy, Target, Flame, Video, Download, Share2, Bookmark, Filter,
  GraduationCap, Sparkles, TrendingUp, Lightbulb, CheckCircle2
} from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { courses } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { StreakTracker } from '@/components/shared/StreakTracker';
import { StatCard } from '@/components/shared/StatCard';

const categories = [
  { id: 'all', label: { bn: 'সব', en: 'All' } },
  { id: 'Technology', label: { bn: 'প্রযুক্তি', en: 'Technology' } },
  { id: 'Marketing', label: { bn: 'মার্কেটিং', en: 'Marketing' } },
  { id: 'Design', label: { bn: 'ডিজাইন', en: 'Design' } },
  { id: 'Language', label: { bn: 'ভাষা', en: 'Language' } },
];

const learningPaths = [
  {
    id: 'web-dev',
    title: { bn: 'ওয়েব ডেভেলপমেন্ট', en: 'Web Development' },
    courses: 8,
    duration: '3 months',
    level: 'Beginner',
    icon: '💻',
    progress: 45,
  },
  {
    id: 'data-science',
    title: { bn: 'ডাটা সায়েন্স', en: 'Data Science' },
    courses: 12,
    duration: '6 months',
    level: 'Intermediate',
    icon: '📊',
    progress: 0,
  },
  {
    id: 'digital-marketing',
    title: { bn: 'ডিজিটাল মার্কেটিং', en: 'Digital Marketing' },
    courses: 6,
    duration: '2 months',
    level: 'Beginner',
    icon: '📱',
    progress: 78,
  },
];

const scholarships = [
  {
    id: 1,
    title: { bn: 'মেধা বৃত্তি ২০২৪', en: 'Merit Scholarship 2024' },
    provider: { bn: 'শিক্ষা মন্ত্রণালয়', en: 'Ministry of Education' },
    amount: '৳50,000',
    deadline: '15 Feb 2024',
    eligibility: { bn: 'এইচএসসি পাস', en: 'HSC Pass' },
  },
  {
    id: 2,
    title: { bn: 'প্রযুক্তি প্রশিক্ষণ গ্রান্ট', en: 'Tech Training Grant' },
    provider: { bn: 'আইসিটি বিভাগ', en: 'ICT Division' },
    amount: '৳25,000',
    deadline: '28 Feb 2024',
    eligibility: { bn: 'স্নাতক শিক্ষার্থী', en: 'Undergraduate' },
  },
];

const liveClasses = [
  {
    id: 1,
    title: { bn: 'React.js মাস্টারক্লাস', en: 'React.js Masterclass' },
    instructor: { bn: 'মোঃ তানভীর', en: 'Md. Tanvir' },
    time: '10:00 AM',
    participants: 234,
    isLive: true,
  },
  {
    id: 2,
    title: { bn: 'ইংরেজি স্পিকিং', en: 'English Speaking' },
    instructor: { bn: 'সারাহ খান', en: 'Sarah Khan' },
    time: '2:00 PM',
    participants: 156,
    isLive: false,
  },
  {
    id: 3,
    title: { bn: 'গ্রাফিক ডিজাইন বেসিক', en: 'Graphic Design Basics' },
    instructor: { bn: 'রাফি আহমেদ', en: 'Rafi Ahmed' },
    time: '4:30 PM',
    participants: 89,
    isLive: false,
  },
];

export const Education: React.FC = () => {
  const { t, language, isBangla } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeTab, setActiveTab] = useState('courses');

  const filteredCourses = activeCategory === 'all' 
    ? courses 
    : courses.filter(c => c.category === activeCategory);

  const inProgressCourses = courses.filter(c => c.progress > 0 && c.progress < 100);

  return (
    <AppLayout headerTitle={t('education.title')}>
      <div className="px-4 py-4 space-y-6 pb-24">
        {/* Hero Section */}
        <section className="animate-fade-in">
          <GlassCard variant="elevated" className="p-0 overflow-hidden">
            <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-6 text-white relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <GraduationCap className="w-6 h-6" />
                  <span className="text-sm font-medium text-white/80">
                    {isBangla ? 'আপনার শিক্ষা যাত্রা' : 'Your Learning Journey'}
                  </span>
                </div>
                <h1 className="text-2xl font-bold mb-1">
                  {isBangla ? 'শিক্ষা বিপ্লব' : 'Education Revolution'}
                </h1>
                <p className="text-white/80 text-sm mb-4">
                  {isBangla 
                    ? 'AI-চালিত শিক্ষায় আপনার দক্ষতা বাড়ান' 
                    : 'Boost your skills with AI-powered learning'}
                </p>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 bg-white/20 rounded-full px-3 py-1.5">
                    <Flame className="w-4 h-4 text-orange-300" />
                    <span className="text-sm font-medium">12 {isBangla ? 'দিনের স্ট্রিক' : 'day streak'}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/20 rounded-full px-3 py-1.5">
                    <Trophy className="w-4 h-4 text-yellow-300" />
                    <span className="text-sm font-medium">2,450 XP</span>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </section>

        {/* Stats Grid */}
        <section className="animate-fade-in stagger-1">
          <div className="grid grid-cols-4 gap-2">
            <StatCard
              title={isBangla ? 'কোর্স' : 'Courses'}
              value="12"
              icon={BookOpen}
              color="primary"
              size="sm"
            />
            <StatCard
              title={isBangla ? 'সার্টিফিকেট' : 'Certificates'}
              value="3"
              icon={Award}
              color="accent"
              size="sm"
            />
            <StatCard
              title={isBangla ? 'ঘন্টা' : 'Hours'}
              value="48"
              icon={Clock}
              color="secondary"
              size="sm"
            />
            <StatCard
              title={isBangla ? 'দক্ষতা' : 'Skills'}
              value="8"
              icon={Target}
              color="success"
              size="sm"
            />
          </div>
        </section>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="animate-fade-in stagger-2">
          <TabsList className="w-full glass-card p-1">
            <TabsTrigger value="courses" className="flex-1 text-xs sm:text-sm">
              {isBangla ? 'কোর্স' : 'Courses'}
            </TabsTrigger>
            <TabsTrigger value="live" className="flex-1 text-xs sm:text-sm">
              {isBangla ? 'লাইভ' : 'Live'}
            </TabsTrigger>
            <TabsTrigger value="paths" className="flex-1 text-xs sm:text-sm">
              {isBangla ? 'পাথ' : 'Paths'}
            </TabsTrigger>
            <TabsTrigger value="scholarships" className="flex-1 text-xs sm:text-sm">
              {isBangla ? 'বৃত্তি' : 'Aid'}
            </TabsTrigger>
          </TabsList>

          {/* Courses Tab */}
          <TabsContent value="courses" className="mt-4 space-y-4">
            {/* AI Tutor Card */}
            <GlassCard variant="elevated" className="gradient-bd-solid text-white">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
                  <Brain className="w-7 h-7" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{t('education.aiTutor')}</h3>
                  <p className="text-white/80 text-sm">
                    {isBangla ? 'আপনার ব্যক্তিগত শিক্ষা সহকারী' : 'Your personal learning assistant'}
                  </p>
                </div>
                <Button variant="secondary" size="sm" className="rounded-full bg-white text-primary hover:bg-white/90">
                  <Sparkles className="w-4 h-4 mr-1" />
                  {isBangla ? 'শুরু' : 'Start'}
                </Button>
              </div>
            </GlassCard>

            {/* Continue Learning */}
            {inProgressCourses.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-foreground">{t('education.myLearning')}</h3>
                  <span className="text-sm text-primary cursor-pointer">{t('common.seeAll')}</span>
                </div>
                {inProgressCourses.slice(0, 2).map((course) => (
                  <GlassCard key={course.id} className="flex items-center gap-3">
                    <img
                      src={course.thumbnail}
                      alt={course.title[language]}
                      className="w-20 h-16 rounded-xl object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-foreground text-sm truncate">
                        {course.title[language]}
                      </h4>
                      <p className="text-xs text-muted-foreground truncate">
                        {course.instructor[language]}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Progress value={course.progress} className="h-1.5 flex-1" />
                        <span className="text-xs font-medium text-primary">{course.progress}%</span>
                      </div>
                    </div>
                    <Button size="icon" className="rounded-full w-10 h-10 shrink-0">
                      <Play className="w-4 h-4" />
                    </Button>
                  </GlassCard>
                ))}
              </div>
            )}

            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
              {categories.map((cat) => (
                <Button
                  key={cat.id}
                  variant={activeCategory === cat.id ? 'default' : 'outline'}
                  size="sm"
                  className="rounded-full whitespace-nowrap"
                  onClick={() => setActiveCategory(cat.id)}
                >
                  {cat.label[language]}
                </Button>
              ))}
            </div>

            {/* Course List */}
            <div className="space-y-3">
              {filteredCourses.map((course, index) => (
                <GlassCard key={course.id} className={`animate-slide-up stagger-${Math.min(index + 1, 5)}`}>
                  <div className="flex gap-3">
                    <img
                      src={course.thumbnail}
                      alt={course.title[language]}
                      className="w-28 h-20 rounded-xl object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-medium text-foreground line-clamp-2 text-sm">
                          {course.title[language]}
                        </h4>
                        <Button variant="ghost" size="icon" className="shrink-0 -mt-1 -mr-2 h-8 w-8">
                          <Bookmark className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {course.instructor[language]}
                      </p>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                          <span className="text-xs font-medium">{course.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {(course.students / 1000).toFixed(1)}K
                          </span>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {course.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </TabsContent>

          {/* Live Classes Tab */}
          <TabsContent value="live" className="mt-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">
                {isBangla ? 'আজকের লাইভ ক্লাস' : "Today's Live Classes"}
              </h3>
              <Badge variant="destructive" className="animate-pulse">
                <span className="w-2 h-2 rounded-full bg-white mr-1.5" />
                LIVE
              </Badge>
            </div>

            {liveClasses.map((liveClass, index) => (
              <GlassCard 
                key={liveClass.id} 
                className={`${liveClass.isLive ? 'border-destructive/50 bg-destructive/5' : ''}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                    liveClass.isLive ? 'bg-destructive/20' : 'bg-primary/10'
                  }`}>
                    <Video className={`w-6 h-6 ${liveClass.isLive ? 'text-destructive' : 'text-primary'}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-foreground truncate">
                        {liveClass.title[language]}
                      </h4>
                      {liveClass.isLive && (
                        <Badge variant="destructive" className="text-xs">LIVE</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {liveClass.instructor[language]}
                    </p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {liveClass.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {liveClass.participants}
                      </span>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    variant={liveClass.isLive ? 'destructive' : 'outline'}
                    className="rounded-full"
                  >
                    {liveClass.isLive 
                      ? (isBangla ? 'যোগ দিন' : 'Join') 
                      : (isBangla ? 'রিমাইন্ডার' : 'Remind')}
                  </Button>
                </div>
              </GlassCard>
            ))}
          </TabsContent>

          {/* Learning Paths Tab */}
          <TabsContent value="paths" className="mt-4 space-y-4">
            <p className="text-sm text-muted-foreground">
              {isBangla 
                ? 'স্ট্রাকচার্ড কোর্স সিরিজ দিয়ে নতুন ক্যারিয়ার শুরু করুন'
                : 'Start a new career with structured course series'}
            </p>

            {learningPaths.map((path) => (
              <GlassCard key={path.id} className="p-4">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-2xl">
                    {path.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-foreground">
                      {path.title[language]}
                    </h4>
                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                      <span>{path.courses} {isBangla ? 'কোর্স' : 'courses'}</span>
                      <span>•</span>
                      <span>{path.duration}</span>
                      <Badge variant="outline" className="text-xs">{path.level}</Badge>
                    </div>
                    {path.progress > 0 && (
                      <div className="mt-3">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-muted-foreground">
                            {isBangla ? 'অগ্রগতি' : 'Progress'}
                          </span>
                          <span className="font-medium text-primary">{path.progress}%</span>
                        </div>
                        <Progress value={path.progress} className="h-2" />
                      </div>
                    )}
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" />
                </div>
                {path.progress === 0 && (
                  <Button className="w-full mt-4 rounded-xl">
                    {isBangla ? 'শুরু করুন' : 'Start Path'}
                  </Button>
                )}
              </GlassCard>
            ))}
          </TabsContent>

          {/* Scholarships Tab */}
          <TabsContent value="scholarships" className="mt-4 space-y-4">
            <GlassCard className="bg-gradient-to-r from-accent/10 to-accent/5 border-accent/20">
              <div className="flex items-center gap-3">
                <Lightbulb className="w-10 h-10 text-accent p-2 bg-accent/20 rounded-xl" />
                <div>
                  <p className="font-medium text-foreground">
                    {isBangla ? 'আপনার যোগ্যতা অনুযায়ী বৃত্তি' : 'Scholarships matching your profile'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {isBangla ? '৫টি বৃত্তি পাওয়া গেছে' : '5 scholarships found'}
                  </p>
                </div>
              </div>
            </GlassCard>

            {scholarships.map((scholarship) => (
              <GlassCard key={scholarship.id} className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground">
                      {scholarship.title[language]}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {scholarship.provider[language]}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 mt-3">
                      <Badge variant="secondary" className="text-xs">
                        {scholarship.amount}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {scholarship.eligibility[language]}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-xs text-muted-foreground">
                      {isBangla ? 'শেষ তারিখ' : 'Deadline'}
                    </div>
                    <div className="text-sm font-medium text-destructive">
                      {scholarship.deadline}
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4 rounded-xl">
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  {isBangla ? 'আবেদন করুন' : 'Apply Now'}
                </Button>
              </GlassCard>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Education;

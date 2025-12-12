import React, { useState } from 'react';
import { 
  Search, Briefcase, MapPin, Clock, Users, Filter, Bookmark, Building2, 
  Laptop, FileText, ChevronRight, Star, TrendingUp, Zap, Award, Target,
  GraduationCap, Video, MessageSquare, CheckCircle2, XCircle, Calendar,
  DollarSign, Globe, Sparkles
} from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { jobs } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { StatCard } from '@/components/shared/StatCard';

const quickFilters = [
  { id: 'all', label: { bn: 'সব', en: 'All' } },
  { id: 'remote', label: { bn: 'রিমোট', en: 'Remote' } },
  { id: 'fulltime', label: { bn: 'ফুল-টাইম', en: 'Full-time' } },
  { id: 'freelance', label: { bn: 'ফ্রিল্যান্স', en: 'Freelance' } },
];

const applications = [
  {
    id: 1,
    job: { bn: 'সফটওয়্যার ইঞ্জিনিয়ার', en: 'Software Engineer' },
    company: { bn: 'গ্রামীণফোন', en: 'Grameenphone' },
    status: 'interview',
    appliedDate: '10 Jan 2024',
    interviewDate: '20 Jan 2024',
  },
  {
    id: 2,
    job: { bn: 'প্রোডাক্ট ডিজাইনার', en: 'Product Designer' },
    company: { bn: 'পাঠাও', en: 'Pathao' },
    status: 'applied',
    appliedDate: '12 Jan 2024',
  },
  {
    id: 3,
    job: { bn: 'ডাটা অ্যানালিস্ট', en: 'Data Analyst' },
    company: { bn: 'বিকাশ', en: 'bKash' },
    status: 'rejected',
    appliedDate: '5 Jan 2024',
  },
];

const skills = [
  { name: 'React.js', level: 85, verified: true },
  { name: 'JavaScript', level: 90, verified: true },
  { name: 'Python', level: 70, verified: false },
  { name: 'UI/UX Design', level: 75, verified: true },
  { name: 'Node.js', level: 65, verified: false },
];

const freelanceProjects = [
  {
    id: 1,
    title: { bn: 'ই-কমার্স ওয়েবসাইট', en: 'E-commerce Website' },
    budget: '$500-800',
    duration: '2 weeks',
    proposals: 12,
    skills: ['React', 'Node.js'],
  },
  {
    id: 2,
    title: { bn: 'মোবাইল অ্যাপ ডিজাইন', en: 'Mobile App Design' },
    budget: '$300-500',
    duration: '1 week',
    proposals: 8,
    skills: ['Figma', 'UI/UX'],
  },
];

const careerPaths = [
  {
    id: 'frontend',
    title: { bn: 'ফ্রন্টএন্ড ডেভেলপার', en: 'Frontend Developer' },
    avgSalary: '৳60K - 120K',
    growth: '+25%',
    icon: '💻',
  },
  {
    id: 'data',
    title: { bn: 'ডাটা সায়েন্টিস্ট', en: 'Data Scientist' },
    avgSalary: '৳80K - 150K',
    growth: '+35%',
    icon: '📊',
  },
  {
    id: 'product',
    title: { bn: 'প্রোডাক্ট ম্যানেজার', en: 'Product Manager' },
    avgSalary: '৳100K - 200K',
    growth: '+20%',
    icon: '🚀',
  },
];

export const Jobs: React.FC = () => {
  const { t, language, isBangla } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('jobs');

  const filteredJobs = jobs.filter((job) => {
    if (activeFilter === 'remote' && !job.remote) return false;
    if (activeFilter === 'fulltime' && job.type !== 'Full-time') return false;
    if (activeFilter === 'freelance' && job.type !== 'Contract') return false;
    return true;
  });

  const formatSalary = (min: number, max: number) => {
    const formatK = (n: number) => `${(n / 1000).toFixed(0)}K`;
    return `৳${formatK(min)} - ${formatK(max)}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'interview': return 'bg-success/10 text-success border-success/20';
      case 'applied': return 'bg-secondary/10 text-secondary border-secondary/20';
      case 'rejected': return 'bg-destructive/10 text-destructive border-destructive/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'interview': return isBangla ? 'ইন্টারভিউ' : 'Interview';
      case 'applied': return isBangla ? 'আবেদন করা হয়েছে' : 'Applied';
      case 'rejected': return isBangla ? 'প্রত্যাখ্যাত' : 'Rejected';
      default: return status;
    }
  };

  return (
    <AppLayout headerTitle={t('jobs.title')}>
      <div className="px-4 py-4 space-y-6 pb-24">
        {/* Hero Section */}
        <section className="animate-fade-in">
          <GlassCard variant="elevated" className="p-0 overflow-hidden">
            <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 p-6 text-white relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <Briefcase className="w-5 h-5" />
                  <span className="text-sm font-medium text-white/80">
                    {isBangla ? 'চাকরি ও ক্যারিয়ার' : 'Jobs & Career'}
                  </span>
                </div>
                <h1 className="text-2xl font-bold mb-1">
                  {isBangla ? 'আপনার স্বপ্নের চাকরি খুঁজুন' : 'Find Your Dream Job'}
                </h1>
                <p className="text-white/80 text-sm mb-4">
                  {isBangla 
                    ? 'AI ম্যাচিং দিয়ে সেরা সুযোগ পান' 
                    : 'Get the best opportunities with AI matching'}
                </p>

                {/* Search Bar */}
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
                    <Input
                      placeholder={isBangla ? 'চাকরি খুঁজুন...' : 'Search jobs...'}
                      className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-white/60"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button className="bg-white/20 hover:bg-white/30 text-white border-0">
                    <Filter className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </GlassCard>
        </section>

        {/* Stats */}
        <section className="animate-fade-in stagger-1">
          <div className="grid grid-cols-4 gap-2">
            <StatCard
              title={isBangla ? 'আবেদন' : 'Applied'}
              value="12"
              icon={FileText}
              color="primary"
              size="sm"
            />
            <StatCard
              title={isBangla ? 'ইন্টারভিউ' : 'Interview'}
              value="3"
              icon={Video}
              color="success"
              size="sm"
            />
            <StatCard
              title={isBangla ? 'সংরক্ষিত' : 'Saved'}
              value="8"
              icon={Bookmark}
              color="secondary"
              size="sm"
            />
            <StatCard
              title={isBangla ? 'ম্যাচ' : 'Matches'}
              value="5"
              icon={Sparkles}
              color="accent"
              size="sm"
            />
          </div>
        </section>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="animate-fade-in stagger-2">
          <TabsList className="w-full glass-card p-1">
            <TabsTrigger value="jobs" className="flex-1 text-xs sm:text-sm">
              {isBangla ? 'চাকরি' : 'Jobs'}
            </TabsTrigger>
            <TabsTrigger value="applications" className="flex-1 text-xs sm:text-sm">
              {isBangla ? 'আবেদন' : 'Applied'}
            </TabsTrigger>
            <TabsTrigger value="skills" className="flex-1 text-xs sm:text-sm">
              {isBangla ? 'দক্ষতা' : 'Skills'}
            </TabsTrigger>
            <TabsTrigger value="freelance" className="flex-1 text-xs sm:text-sm">
              {isBangla ? 'ফ্রিল্যান্স' : 'Gigs'}
            </TabsTrigger>
          </TabsList>

          {/* Jobs Tab */}
          <TabsContent value="jobs" className="mt-4 space-y-4">
            {/* AI Recommendation */}
            <GlassCard variant="elevated" className="gradient-bd-solid text-white">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
                  <TrendingUp className="w-7 h-7" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{t('jobs.recommended')}</h3>
                  <p className="text-white/80 text-sm">
                    {isBangla ? 'AI আপনার জন্য ৫টি চাকরি খুঁজে পেয়েছে' : 'AI found 5 jobs for you'}
                  </p>
                </div>
                <Button variant="secondary" size="sm" className="rounded-full bg-white text-primary hover:bg-white/90">
                  {isBangla ? 'দেখুন' : 'View'}
                </Button>
              </div>
            </GlassCard>

            {/* Quick Filters */}
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
              {quickFilters.map((filter) => (
                <Button
                  key={filter.id}
                  variant={activeFilter === filter.id ? 'default' : 'outline'}
                  size="sm"
                  className="rounded-full whitespace-nowrap"
                  onClick={() => setActiveFilter(filter.id)}
                >
                  {filter.label[language]}
                </Button>
              ))}
            </div>

            {/* Job Listings */}
            <div className="space-y-3">
              {filteredJobs.map((job, index) => (
                <GlassCard key={job.id} className="p-4">
                  <div className="flex gap-3">
                    <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center shrink-0">
                      <Building2 className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-medium text-foreground">
                            {job.title[language]}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {job.company[language]}
                          </p>
                        </div>
                        <Button variant="ghost" size="icon" className="shrink-0 -mt-1 -mr-2 h-8 w-8">
                          <Bookmark className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-2 mt-2">
                        <Badge variant="secondary" className="text-xs">
                          <MapPin className="w-3 h-3 mr-1" />
                          {job.location[language]}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {job.type}
                        </Badge>
                        {job.remote && (
                          <Badge variant="outline" className="text-xs border-success text-success">
                            <Laptop className="w-3 h-3 mr-1" />
                            Remote
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <span className="font-semibold text-primary text-sm">
                          {formatSalary(job.salary.min, job.salary.max)}
                        </span>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {job.applicants}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {job.posted}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full mt-4 rounded-xl">
                    {isBangla ? 'আবেদন করুন' : 'Apply Now'}
                  </Button>
                </GlassCard>
              ))}
            </div>
          </TabsContent>

          {/* Applications Tab */}
          <TabsContent value="applications" className="mt-4 space-y-4">
            {applications.map((app) => (
              <GlassCard key={app.id} className="p-4">
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    app.status === 'interview' ? 'bg-success/10' : 
                    app.status === 'rejected' ? 'bg-destructive/10' : 'bg-secondary/10'
                  }`}>
                    {app.status === 'interview' ? (
                      <Video className="w-5 h-5 text-success" />
                    ) : app.status === 'rejected' ? (
                      <XCircle className="w-5 h-5 text-destructive" />
                    ) : (
                      <Clock className="w-5 h-5 text-secondary" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-medium text-foreground">
                          {app.job[language]}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {app.company[language]}
                        </p>
                      </div>
                      <Badge className={getStatusColor(app.status)}>
                        {getStatusLabel(app.status)}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                      <span>{isBangla ? 'আবেদন:' : 'Applied:'} {app.appliedDate}</span>
                      {app.interviewDate && (
                        <span className="text-success flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {app.interviewDate}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                {app.status === 'interview' && (
                  <Button className="w-full mt-3 rounded-xl bg-success hover:bg-success/90">
                    <Video className="w-4 h-4 mr-2" />
                    {isBangla ? 'ইন্টারভিউতে যোগ দিন' : 'Join Interview'}
                  </Button>
                )}
              </GlassCard>
            ))}
          </TabsContent>

          {/* Skills Tab */}
          <TabsContent value="skills" className="mt-4 space-y-4">
            <GlassCard className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
              <div className="flex items-center gap-3">
                <Award className="w-10 h-10 text-primary p-2 bg-primary/20 rounded-xl" />
                <div className="flex-1">
                  <p className="font-medium text-foreground">
                    {isBangla ? 'দক্ষতা স্কোর' : 'Skill Score'}
                  </p>
                  <p className="text-2xl font-bold text-primary">78/100</p>
                </div>
                <Button size="sm" className="rounded-full">
                  <GraduationCap className="w-4 h-4 mr-1" />
                  {isBangla ? 'টেস্ট' : 'Test'}
                </Button>
              </div>
            </GlassCard>

            <h3 className="font-semibold text-foreground">
              {isBangla ? 'আপনার দক্ষতা' : 'Your Skills'}
            </h3>

            {skills.map((skill, index) => (
              <GlassCard key={skill.name} className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">{skill.name}</span>
                    {skill.verified && (
                      <CheckCircle2 className="w-4 h-4 text-success" />
                    )}
                  </div>
                  <span className="text-sm font-medium text-primary">{skill.level}%</span>
                </div>
                <Progress value={skill.level} className="h-2" />
                {!skill.verified && (
                  <Button variant="ghost" size="sm" className="mt-2 text-xs text-primary p-0 h-auto">
                    {isBangla ? 'যাচাই করুন' : 'Verify this skill'} →
                  </Button>
                )}
              </GlassCard>
            ))}

            <h3 className="font-semibold text-foreground mt-6">
              {isBangla ? 'ক্যারিয়ার পাথ' : 'Career Paths'}
            </h3>

            <div className="grid gap-3">
              {careerPaths.map((path) => (
                <GlassCard key={path.id} className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-2xl">
                      {path.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground">
                        {path.title[language]}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {path.avgSalary}
                      </p>
                    </div>
                    <Badge variant="secondary" className="text-success">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {path.growth}
                    </Badge>
                  </div>
                </GlassCard>
              ))}
            </div>
          </TabsContent>

          {/* Freelance Tab */}
          <TabsContent value="freelance" className="mt-4 space-y-4">
            <GlassCard className="bg-gradient-to-r from-violet-500/10 to-violet-500/5 border-violet-500/20">
              <div className="flex items-center gap-3">
                <Globe className="w-10 h-10 text-violet-600 p-2 bg-violet-500/20 rounded-xl" />
                <div className="flex-1">
                  <p className="font-medium text-foreground">
                    {isBangla ? 'ফ্রিল্যান্স প্রোফাইল' : 'Freelance Profile'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {isBangla ? '৪.৮ রেটিং • ১২টি প্রজেক্ট সম্পন্ন' : '4.8 rating • 12 projects completed'}
                  </p>
                </div>
                <Button size="sm" variant="outline" className="rounded-full">
                  {isBangla ? 'এডিট' : 'Edit'}
                </Button>
              </div>
            </GlassCard>

            <h3 className="font-semibold text-foreground">
              {isBangla ? 'আপনার জন্য প্রজেক্ট' : 'Projects for You'}
            </h3>

            {freelanceProjects.map((project) => (
              <GlassCard key={project.id} className="p-4">
                <h4 className="font-medium text-foreground mb-2">
                  {project.title[language]}
                </h4>
                <div className="flex flex-wrap gap-1 mb-3">
                  {project.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <DollarSign className="w-3 h-3" />
                      {project.budget}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {project.duration}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {project.proposals} {isBangla ? 'টি প্রস্তাব' : 'proposals'}
                  </span>
                </div>
                <Button className="w-full mt-3 rounded-xl">
                  {isBangla ? 'প্রস্তাব দিন' : 'Submit Proposal'}
                </Button>
              </GlassCard>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Jobs;

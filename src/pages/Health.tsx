import React, { useState } from 'react';
import { 
  Video, FileText, Pill, Siren, Calendar, Activity, Heart, Thermometer, 
  ChevronRight, Star, Clock, Phone, MapPin, Stethoscope, Brain, 
  Shield, Bell, Plus, Droplets, Moon, Footprints, Apple, TrendingUp
} from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { doctors } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StatCard } from '@/components/shared/StatCard';

const healthServices = [
  { id: 'telemedicine', icon: Video, label: { bn: 'টেলিমেডিসিন', en: 'Telemedicine' }, color: 'bg-blue-500' },
  { id: 'records', icon: FileText, label: { bn: 'রেকর্ড', en: 'Records' }, color: 'bg-emerald-500' },
  { id: 'pharmacy', icon: Pill, label: { bn: 'ফার্মেসি', en: 'Pharmacy' }, color: 'bg-purple-500' },
  { id: 'emergency', icon: Siren, label: { bn: 'জরুরি', en: 'Emergency' }, color: 'bg-red-500' },
];

const healthMetrics = [
  { id: 'heart', icon: Heart, label: { bn: 'হার্ট রেট', en: 'Heart Rate' }, value: '72', unit: 'bpm', status: 'normal', target: 80, current: 72 },
  { id: 'steps', icon: Footprints, label: { bn: 'পদক্ষেপ', en: 'Steps' }, value: '6,420', unit: 'steps', status: 'good', target: 10000, current: 6420 },
  { id: 'sleep', icon: Moon, label: { bn: 'ঘুম', en: 'Sleep' }, value: '7.2', unit: 'hrs', status: 'good', target: 8, current: 7.2 },
  { id: 'water', icon: Droplets, label: { bn: 'পানি', en: 'Water' }, value: '5', unit: 'glass', status: 'warning', target: 8, current: 5 },
];

const appointments = [
  {
    id: 1,
    doctor: { bn: 'ডাঃ আব্দুল করিম', en: 'Dr. Abdul Karim' },
    specialty: { bn: 'হৃদরোগ', en: 'Cardiology' },
    date: '15 Jan 2024',
    time: '10:30 AM',
    type: 'In-person',
    status: 'upcoming',
  },
  {
    id: 2,
    doctor: { bn: 'ডাঃ ফারহানা আক্তার', en: 'Dr. Farhana Akter' },
    specialty: { bn: 'চর্মরোগ', en: 'Dermatology' },
    date: '18 Jan 2024',
    time: '3:00 PM',
    type: 'Video',
    status: 'upcoming',
  },
];

const medications = [
  {
    id: 1,
    name: { bn: 'মেটফরমিন', en: 'Metformin' },
    dosage: '500mg',
    frequency: { bn: 'দিনে ২ বার', en: 'Twice daily' },
    remaining: 12,
    nextDose: '8:00 PM',
  },
  {
    id: 2,
    name: { bn: 'আমলোডিপিন', en: 'Amlodipine' },
    dosage: '5mg',
    frequency: { bn: 'দিনে ১ বার', en: 'Once daily' },
    remaining: 25,
    nextDose: 'Tomorrow 8:00 AM',
  },
];

const familyMembers = [
  { id: 1, name: { bn: 'আম্মু', en: 'Mother' }, age: 55, avatar: '👩', lastCheckup: '2 weeks ago' },
  { id: 2, name: { bn: 'আব্বু', en: 'Father' }, age: 60, avatar: '👨', lastCheckup: '1 month ago' },
  { id: 3, name: { bn: 'ভাই', en: 'Brother' }, age: 22, avatar: '👦', lastCheckup: '3 months ago' },
];

export const Health: React.FC = () => {
  const { t, language, isBangla } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <AppLayout headerTitle={t('health.title')}>
      <div className="px-4 py-4 space-y-6 pb-24">
        {/* Hero Section */}
        <section className="animate-fade-in">
          <GlassCard variant="elevated" className="p-0 overflow-hidden">
            <div className="bg-gradient-to-br from-rose-500 via-pink-500 to-red-600 p-6 text-white relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Heart className="w-5 h-5" />
                      <span className="text-sm font-medium text-white/80">
                        {isBangla ? 'স্বাস্থ্য স্কোর' : 'Health Score'}
                      </span>
                    </div>
                    <div className="text-4xl font-bold">85</div>
                    <p className="text-white/80 text-sm mt-1">
                      {isBangla ? 'ভালো অবস্থা' : 'Good condition'}
                    </p>
                  </div>
                  <div className="w-20 h-20 rounded-full border-4 border-white/30 flex items-center justify-center">
                    <div className="text-center">
                      <TrendingUp className="w-6 h-6 mx-auto mb-1" />
                      <span className="text-xs">+5%</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    className="rounded-full bg-white/20 hover:bg-white/30 text-white border-0"
                  >
                    <Stethoscope className="w-4 h-4 mr-1" />
                    {isBangla ? 'চেকআপ বুক করুন' : 'Book Checkup'}
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="rounded-full bg-transparent border-white/30 text-white hover:bg-white/10"
                  >
                    <Shield className="w-4 h-4 mr-1" />
                    {isBangla ? 'বীমা' : 'Insurance'}
                  </Button>
                </div>
              </div>
            </div>
          </GlassCard>
        </section>

        {/* Quick Services */}
        <section className="animate-fade-in stagger-1">
          <div className="grid grid-cols-4 gap-3">
            {healthServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <GlassCard
                  key={service.id}
                  className="flex flex-col items-center py-4 cursor-pointer hover:scale-105 transition-transform"
                >
                  <div className={`w-12 h-12 rounded-2xl ${service.color} flex items-center justify-center mb-2 shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs font-medium text-foreground text-center">
                    {service.label[language]}
                  </span>
                </GlassCard>
              );
            })}
          </div>
        </section>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="animate-fade-in stagger-2">
          <TabsList className="w-full glass-card p-1">
            <TabsTrigger value="overview" className="flex-1 text-xs sm:text-sm">
              {isBangla ? 'সারসংক্ষেপ' : 'Overview'}
            </TabsTrigger>
            <TabsTrigger value="doctors" className="flex-1 text-xs sm:text-sm">
              {isBangla ? 'ডাক্তার' : 'Doctors'}
            </TabsTrigger>
            <TabsTrigger value="medications" className="flex-1 text-xs sm:text-sm">
              {isBangla ? 'ওষুধ' : 'Meds'}
            </TabsTrigger>
            <TabsTrigger value="family" className="flex-1 text-xs sm:text-sm">
              {isBangla ? 'পরিবার' : 'Family'}
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-4 space-y-4">
            {/* AI Symptom Checker */}
            <GlassCard variant="elevated" className="gradient-bd-solid text-white">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
                  <Brain className="w-7 h-7" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{t('health.symptomChecker')}</h3>
                  <p className="text-white/80 text-sm">
                    {isBangla ? 'এআই দিয়ে লক্ষণ পরীক্ষা করুন' : 'Check symptoms with AI'}
                  </p>
                </div>
                <Button variant="secondary" size="sm" className="rounded-full bg-white text-primary hover:bg-white/90">
                  {isBangla ? 'শুরু করুন' : 'Start'}
                </Button>
              </div>
            </GlassCard>

            {/* Health Metrics */}
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">{t('health.myHealth')}</h3>
              <div className="grid grid-cols-2 gap-3">
                {healthMetrics.map((metric) => {
                  const Icon = metric.icon;
                  const progress = (metric.current / metric.target) * 100;
                  return (
                    <GlassCard key={metric.id} className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          metric.status === 'warning' ? 'bg-warning/10' : 'bg-primary/10'
                        }`}>
                          <Icon className={`w-5 h-5 ${
                            metric.status === 'warning' ? 'text-warning-foreground' : 'text-primary'
                          }`} />
                        </div>
                        <div>
                          <div className="text-lg font-bold text-foreground">{metric.value}</div>
                          <div className="text-xs text-muted-foreground">{metric.unit}</div>
                        </div>
                      </div>
                      <Progress 
                        value={Math.min(progress, 100)} 
                        className={`h-2 ${metric.status === 'warning' ? '[&>div]:bg-warning' : ''}`} 
                      />
                      <div className="text-xs text-muted-foreground mt-1 text-right">
                        {isBangla ? 'লক্ষ্য:' : 'Goal:'} {metric.target}
                      </div>
                    </GlassCard>
                  );
                })}
              </div>
            </div>

            {/* Upcoming Appointments */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-foreground">
                  {isBangla ? 'আসন্ন অ্যাপয়েন্টমেন্ট' : 'Upcoming Appointments'}
                </h3>
                <Button variant="ghost" size="sm" className="text-primary">
                  <Plus className="w-4 h-4 mr-1" />
                  {isBangla ? 'নতুন' : 'New'}
                </Button>
              </div>
              {appointments.map((apt) => (
                <GlassCard key={apt.id} className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      apt.type === 'Video' ? 'bg-blue-500' : 'bg-primary'
                    }`}>
                      {apt.type === 'Video' ? (
                        <Video className="w-5 h-5 text-white" />
                      ) : (
                        <Stethoscope className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-foreground truncate">
                        {apt.doctor[language]}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {apt.specialty[language]}
                      </p>
                      <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        <span>{apt.date}</span>
                        <Clock className="w-3 h-3 ml-2" />
                        <span>{apt.time}</span>
                      </div>
                    </div>
                    <Badge variant="outline">{apt.type}</Badge>
                  </div>
                </GlassCard>
              ))}
            </div>
          </TabsContent>

          {/* Doctors Tab */}
          <TabsContent value="doctors" className="mt-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">{t('health.telemedicine')}</h3>
              <Badge variant="secondary" className="text-xs">
                <span className="w-2 h-2 rounded-full bg-success mr-1.5" />
                {doctors.filter(d => d.available).length} {isBangla ? 'অনলাইন' : 'Online'}
              </Badge>
            </div>
            
            {doctors.map((doctor) => (
              <GlassCard key={doctor.id}>
                <div className="flex items-center gap-3">
                  <Avatar className="w-14 h-14">
                    <AvatarImage src={doctor.avatar} alt={doctor.name[language]} />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {doctor.name[language].charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-foreground truncate">
                        {doctor.name[language]}
                      </h4>
                      {doctor.available && (
                        <span className="w-2 h-2 rounded-full bg-success shrink-0" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {doctor.specialty[language]}
                    </p>
                    <div className="flex items-center gap-3 mt-1">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                        <span className="text-xs font-medium">{doctor.rating}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {doctor.experience} {isBangla ? 'বছর' : 'yrs'}
                      </span>
                      <span className="text-xs font-medium text-primary">
                        ৳{doctor.fee}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button 
                      size="sm" 
                      className="rounded-full"
                      disabled={!doctor.available}
                    >
                      <Video className="w-4 h-4 mr-1" />
                      {isBangla ? 'কল' : 'Call'}
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="rounded-full"
                    >
                      <Calendar className="w-4 h-4 mr-1" />
                      {isBangla ? 'বুক' : 'Book'}
                    </Button>
                  </div>
                </div>
              </GlassCard>
            ))}
          </TabsContent>

          {/* Medications Tab */}
          <TabsContent value="medications" className="mt-4 space-y-4">
            <GlassCard className="bg-gradient-to-r from-purple-500/10 to-purple-500/5 border-purple-500/20">
              <div className="flex items-center gap-3">
                <Bell className="w-10 h-10 text-purple-600 p-2 bg-purple-500/20 rounded-xl" />
                <div className="flex-1">
                  <p className="font-medium text-foreground">
                    {isBangla ? 'পরবর্তী ডোজ' : 'Next Dose'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {isBangla ? 'মেটফরমিন ৫০০mg - আজ রাত ৮:০০ টায়' : 'Metformin 500mg - Today 8:00 PM'}
                  </p>
                </div>
                <Button size="sm" className="rounded-full">
                  {isBangla ? 'রিমাইন্ডার' : 'Remind'}
                </Button>
              </div>
            </GlassCard>

            {medications.map((med) => (
              <GlassCard key={med.id} className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-foreground">
                      {med.name[language]}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {med.dosage} • {med.frequency[language]}
                    </p>
                  </div>
                  <Badge variant={med.remaining < 10 ? 'destructive' : 'secondary'}>
                    {med.remaining} {isBangla ? 'বাকি' : 'left'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {isBangla ? 'পরবর্তী:' : 'Next:'} {med.nextDose}
                  </span>
                  <Button variant="outline" size="sm" className="rounded-full">
                    <Pill className="w-4 h-4 mr-1" />
                    {isBangla ? 'অর্ডার' : 'Reorder'}
                  </Button>
                </div>
              </GlassCard>
            ))}
          </TabsContent>

          {/* Family Tab */}
          <TabsContent value="family" className="mt-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">
                {isBangla ? 'পারিবারিক স্বাস্থ্য' : 'Family Health'}
              </h3>
              <Button variant="ghost" size="sm" className="text-primary">
                <Plus className="w-4 h-4 mr-1" />
                {isBangla ? 'যোগ করুন' : 'Add'}
              </Button>
            </div>

            {familyMembers.map((member) => (
              <GlassCard key={member.id} className="p-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center text-2xl">
                    {member.avatar}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">
                      {member.name[language]}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {member.age} {isBangla ? 'বছর' : 'years old'}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {isBangla ? 'শেষ চেকআপ:' : 'Last checkup:'} {member.lastCheckup}
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </div>
              </GlassCard>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Health;

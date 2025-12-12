import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { ImpactCard } from '../shared/ImpactCard';
import { QuickAction } from '../shared/QuickAction';
import { GlassCard } from '@/components/ui/GlassCard';
import { ProgressRing } from '../shared/ProgressRing';
import { healthData } from '@/data/sectorMockData';
import {
  Building2,
  Users,
  Bed,
  Activity,
  Calendar,
  BarChart3,
  Stethoscope,
  Ambulance,
  Heart,
  Pill,
  AlertTriangle,
  TrendingUp,
  Clock,
  Shield,
  Star,
} from 'lucide-react';

export const HospitalDashboard: React.FC = () => {
  const { isBangla } = useLanguage();
  const { demoUser } = useAuth();

  const hospitalData = demoUser ? {
    totalBeds: 450,
    occupiedBeds: 351,
    staffOnDuty: 156,
    nationalImpact: demoUser.sectorContributions?.health || 55,
    patientsToday: 234,
    surgeriesToday: 12,
  } : {
    totalBeds: 450,
    occupiedBeds: 351,
    staffOnDuty: 156,
    nationalImpact: 55,
    patientsToday: 234,
    surgeriesToday: 12,
  };

  const occupancyRate = Math.round((hospitalData.occupiedBeds / hospitalData.totalBeds) * 100);

  const departments = [
    { name: 'Emergency', nameBn: 'জরুরি বিভাগ', status: 'high', patients: 45, capacity: 50 },
    { name: 'ICU', nameBn: 'আইসিইউ', status: 'critical', patients: 28, capacity: 30 },
    { name: 'General Ward', nameBn: 'সাধারণ ওয়ার্ড', status: 'normal', patients: 180, capacity: 250 },
    { name: 'OPD', nameBn: 'ওপিডি', status: 'normal', patients: 98, capacity: 120 },
    { name: 'Maternity', nameBn: 'প্রসূতি বিভাগ', status: 'normal', patients: 42, capacity: 60 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'bg-destructive/20 text-destructive';
      case 'high': return 'bg-warning/20 text-warning';
      default: return 'bg-success/20 text-success';
    }
  };

  const getStatusLabel = (status: string) => {
    if (isBangla) {
      switch (status) {
        case 'critical': return 'জটিল';
        case 'high': return 'উচ্চ';
        default: return 'স্বাভাবিক';
      }
    }
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          🏥 {isBangla ? 'স্বাস্থ্যসেবা বিবর্তন' : 'Healthcare Evolution'}
        </h1>
        <p className="text-muted-foreground">
          {isBangla ? 'হাসপাতাল ম্যানেজমেন্ট ড্যাশবোর্ড' : 'Hospital Management Dashboard'}
        </p>
      </div>

      {/* Bed Occupancy Alert */}
      {occupancyRate > 75 && (
        <GlassCard className={`p-3 border-l-4 ${occupancyRate > 90 ? 'border-l-destructive bg-destructive/5' : 'border-l-warning bg-warning/5'}`}>
          <div className="flex items-center gap-3">
            <AlertTriangle className={`w-5 h-5 ${occupancyRate > 90 ? 'text-destructive' : 'text-warning'}`} />
            <div>
              <p className="font-medium text-foreground text-sm">
                {isBangla ? 'শয্যা সতর্কতা' : 'Bed Capacity Alert'}
              </p>
              <p className="text-xs text-muted-foreground">
                {occupancyRate}% {isBangla ? 'শয্যা ব্যবহৃত' : 'beds occupied'}
              </p>
            </div>
          </div>
        </GlassCard>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <ImpactCard
          title={isBangla ? 'মোট শয্যা' : 'Total Beds'}
          value={hospitalData.totalBeds.toString()}
          subtitle={`${occupancyRate}% ${isBangla ? 'ব্যবহৃত' : 'Occupied'}`}
          icon={<Bed className="w-5 h-5 text-white" />}
          gradient="from-pink-500 to-rose-600"
        />
        <ImpactCard
          title={isBangla ? 'কর্মী' : 'Staff On Duty'}
          value={hospitalData.staffOnDuty.toString()}
          icon={<Users className="w-5 h-5 text-white" />}
          gradient="from-blue-500 to-indigo-600"
        />
      </div>

      {/* National Health Contribution */}
      <GlassCard variant="elevated" className="p-5">
        <div className="flex items-center gap-6">
          <ProgressRing progress={hospitalData.nationalImpact} size={100}>
            <div className="text-center">
              <div className="text-xl font-bold text-foreground">
                {hospitalData.nationalImpact}%
              </div>
              <div className="text-xs text-muted-foreground">
                {isBangla ? 'প্রভাব' : 'Impact'}
              </div>
            </div>
          </ProgressRing>
          <div className="flex-1 space-y-2">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              {isBangla ? 'জাতীয় স্বাস্থ্য অবদান' : 'National Health Contribution'}
            </h3>
            <p className="text-sm text-muted-foreground">
              {isBangla
                ? 'আপনার হাসপাতাল জাতীয় স্বাস্থ্যসেবায় অবদান রাখছে'
                : 'Your hospital contributes to national healthcare'}
            </p>
          </div>
        </div>
      </GlassCard>

      {/* Today's Summary */}
      <div className="grid grid-cols-3 gap-2">
        <GlassCard className="p-3 text-center">
          <Heart className="w-5 h-5 text-rose-500 mx-auto mb-1" />
          <div className="text-xl font-bold text-foreground">{hospitalData.patientsToday}</div>
          <div className="text-xs text-muted-foreground">{isBangla ? 'রোগী আজ' : 'Patients Today'}</div>
        </GlassCard>
        <GlassCard className="p-3 text-center">
          <Stethoscope className="w-5 h-5 text-blue-500 mx-auto mb-1" />
          <div className="text-xl font-bold text-foreground">{hospitalData.surgeriesToday}</div>
          <div className="text-xs text-muted-foreground">{isBangla ? 'সার্জারি' : 'Surgeries'}</div>
        </GlassCard>
        <GlassCard className="p-3 text-center">
          <Ambulance className="w-5 h-5 text-amber-500 mx-auto mb-1" />
          <div className="text-xl font-bold text-foreground">8</div>
          <div className="text-xs text-muted-foreground">{isBangla ? 'অ্যাম্বুলেন্স' : 'Ambulances'}</div>
        </GlassCard>
      </div>

      {/* Department Status */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary" />
          {isBangla ? 'বিভাগ অবস্থা' : 'Department Status'}
        </h2>
        <div className="space-y-2">
          {departments.map((dept, i) => (
            <GlassCard key={i} className="p-3">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="font-medium text-foreground text-sm">
                    {isBangla ? dept.nameBn : dept.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {dept.patients}/{dept.capacity} {isBangla ? 'রোগী' : 'patients'}
                  </p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(dept.status)}`}>
                  {getStatusLabel(dept.status)}
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    dept.status === 'critical' ? 'bg-destructive' :
                    dept.status === 'high' ? 'bg-warning' : 'bg-success'
                  }`}
                  style={{ width: `${(dept.patients / dept.capacity) * 100}%` }}
                />
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Telemedicine Stats */}
      <GlassCard className="p-4 bg-gradient-to-r from-blue-500/10 to-indigo-500/10">
        <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
          <Activity className="w-5 h-5 text-blue-500" />
          {isBangla ? 'টেলিমেডিসিন' : 'Telemedicine'}
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">
              {healthData.telemedicine.activeeDoctors.toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground">
              {isBangla ? 'সক্রিয় ডাক্তার' : 'Active Doctors'}
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground flex items-center justify-center gap-1">
              {healthData.telemedicine.averageRating}
              <Star className="w-4 h-4 text-amber-500 fill-current" />
            </div>
            <div className="text-xs text-muted-foreground">
              {isBangla ? 'গড় রেটিং' : 'Avg Rating'}
            </div>
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
            title={isBangla ? 'রিসোর্স বরাদ্দ' : 'Resource Allocation'}
            description={isBangla ? 'শয্যা ও সরঞ্জাম ব্যবস্থাপনা' : 'Manage beds & equipment'}
            icon={<BarChart3 className="w-6 h-6 text-blue-500" />}
            gradient="from-blue-50 to-indigo-50"
          />
          <QuickAction
            title={isBangla ? 'স্টাফ শিডিউল' : 'Staff Schedule'}
            description={isBangla ? 'কর্মী সময়সূচী পরিচালনা' : 'Manage staff schedules'}
            icon={<Calendar className="w-6 h-6 text-purple-500" />}
            gradient="from-purple-50 to-violet-50"
          />
          <QuickAction
            title={isBangla ? 'ইমার্জেন্সি প্রোটোকল' : 'Emergency Protocol'}
            description={isBangla ? 'জরুরি পরিস্থিতি ম্যানেজমেন্ট' : 'Emergency management'}
            icon={<Ambulance className="w-6 h-6 text-rose-500" />}
            gradient="from-rose-50 to-pink-50"
          />
          <QuickAction
            title={isBangla ? 'ফার্মেসি স্টক' : 'Pharmacy Stock'}
            description={isBangla ? 'ওষুধ ইনভেন্টরি' : 'Medicine inventory'}
            icon={<Pill className="w-6 h-6 text-emerald-500" />}
            gradient="from-emerald-50 to-green-50"
          />
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { ImpactCard } from '../shared/ImpactCard';
import { QuickAction } from '../shared/QuickAction';
import { GlassCard } from '@/components/ui/GlassCard';
import { ProgressRing } from '../shared/ProgressRing';
import { healthData } from '@/data/sectorMockData';
import {
  Stethoscope,
  Users,
  Calendar,
  FileText,
  Heart,
  Activity,
  Droplets,
  Syringe,
  Video,
  AlertTriangle,
  Shield,
  TrendingUp,
} from 'lucide-react';

export const MedicalDashboard: React.FC = () => {
  const { isBangla } = useLanguage();
  const { demoUser } = useAuth();

  const doctorData = demoUser ? {
    patientsToday: 24,
    patientsHealed: 312,
    nationalImpact: demoUser.sectorContributions?.health || 45,
  } : {
    patientsToday: 24,
    patientsHealed: 312,
    nationalImpact: 45,
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          🩺 {isBangla ? 'স্বাস্থ্য রূপান্তর' : 'Health Transformation'}
        </h1>
        <p className="text-muted-foreground">
          {isBangla ? 'রোগী সুস্থ → জাতীয় স্বাস্থ্য উন্নত' : 'Patients healed → National health improved'}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <ImpactCard
          title={isBangla ? 'আজকের রোগী' : 'Patients Today'}
          value={doctorData.patientsToday.toString()}
          icon={<Users className="w-5 h-5 text-white" />}
          gradient="from-rose-500 to-pink-600"
        />
        <ImpactCard
          title={isBangla ? 'সুস্থ করেছেন' : 'Healed (Month)'}
          value={doctorData.patientsHealed.toString()}
          icon={<Heart className="w-5 h-5 text-white" />}
          trend={{ value: 15, isPositive: true }}
          gradient="from-emerald-500 to-green-600"
        />
      </div>

      {/* National Health Impact */}
      <GlassCard variant="elevated" className="p-5">
        <div className="flex items-center gap-6">
          <ProgressRing progress={doctorData.nationalImpact} size={100}>
            <div className="text-center">
              <div className="text-xl font-bold text-foreground">
                {doctorData.nationalImpact}%
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
                ? 'আপনার সেবা জাতীয় স্বাস্থ্য উন্নতিতে অবদান রাখছে'
                : 'Your service contributes to national health improvement'}
            </p>
          </div>
        </div>
      </GlassCard>

      {/* Next Appointment */}
      <GlassCard className="p-4 border-l-4 border-l-primary">
        <div className="flex items-center gap-3">
          <Calendar className="w-6 h-6 text-primary" />
          <div>
            <p className="font-medium text-foreground">{isBangla ? 'পরবর্তী অ্যাপয়েন্টমেন্ট' : 'Next Appointment'}</p>
            <p className="text-sm text-muted-foreground">10:30 AM - Patient: Rahman</p>
          </div>
        </div>
      </GlassCard>

      {/* National Health Stats */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary" />
          {isBangla ? 'জাতীয় স্বাস্থ্য পরিসংখ্যান' : 'National Health Statistics'}
        </h2>
        
        {/* Vaccination Coverage */}
        <GlassCard className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Syringe className="w-5 h-5 text-blue-500" />
              <span className="font-medium text-foreground">{isBangla ? 'টিকা কভারেজ' : 'Vaccination Coverage'}</span>
            </div>
            <span className="text-success font-bold">{healthData.vaccinationCoverage.overall}%</span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2 rounded-lg bg-muted/50">
              <div className="text-lg font-bold text-foreground">{healthData.vaccinationCoverage.children}%</div>
              <div className="text-xs text-muted-foreground">{isBangla ? 'শিশু' : 'Children'}</div>
            </div>
            <div className="p-2 rounded-lg bg-muted/50">
              <div className="text-lg font-bold text-foreground">{healthData.vaccinationCoverage.covid19}%</div>
              <div className="text-xs text-muted-foreground">COVID-19</div>
            </div>
            <div className="p-2 rounded-lg bg-muted/50">
              <div className="text-lg font-bold text-foreground">{healthData.vaccinationCoverage.overall}%</div>
              <div className="text-xs text-muted-foreground">{isBangla ? 'সামগ্রিক' : 'Overall'}</div>
            </div>
          </div>
        </GlassCard>

        {/* Water Quality */}
        <GlassCard className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Droplets className="w-5 h-5 text-cyan-500" />
              <span className="font-medium text-foreground">{isBangla ? 'নিরাপদ পানি' : 'Safe Water Access'}</span>
            </div>
            <span className="text-primary font-bold">{healthData.waterQuality.safeWaterAccess}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
              style={{ width: `${healthData.waterQuality.safeWaterAccess}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {healthData.waterQuality.testedSources.toLocaleString()} {isBangla ? 'উৎস পরীক্ষিত' : 'sources tested'}
          </p>
        </GlassCard>

        {/* Telemedicine Stats */}
        <GlassCard className="p-4 bg-gradient-to-br from-blue-500/10 to-indigo-500/10">
          <div className="flex items-center gap-3 mb-3">
            <Video className="w-5 h-5 text-blue-500" />
            <span className="font-medium text-foreground">{isBangla ? 'টেলিমেডিসিন' : 'Telemedicine'}</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="text-2xl font-bold text-foreground">
                {(healthData.telemedicine.totalConsultations / 1000000).toFixed(1)}M
              </div>
              <div className="text-xs text-muted-foreground">{isBangla ? 'মোট পরামর্শ' : 'Total Consultations'}</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">{healthData.telemedicine.waitTime}</div>
              <div className="text-xs text-muted-foreground">{isBangla ? 'গড় অপেক্ষা' : 'Avg Wait Time'}</div>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Epidemic Alerts */}
      {healthData.epidemicPredictions.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-warning" />
            {isBangla ? 'মহামারী সতর্কতা' : 'Epidemic Alerts'}
          </h2>
          <div className="space-y-2">
            {healthData.epidemicPredictions.map((prediction, i) => (
              <GlassCard key={i} className="p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    prediction.probability > 70 ? 'bg-destructive/10' :
                    prediction.probability > 40 ? 'bg-warning/10' : 'bg-muted'
                  }`}>
                    <AlertTriangle className={`w-5 h-5 ${
                      prediction.probability > 70 ? 'text-destructive' :
                      prediction.probability > 40 ? 'text-warning' : 'text-muted-foreground'
                    }`} />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{prediction.disease}</p>
                    <p className="text-xs text-muted-foreground">
                      {isBangla ? 'শীর্ষ মাস' : 'Peak'}: {prediction.peakMonth}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-lg font-bold ${
                    prediction.probability > 70 ? 'text-destructive' :
                    prediction.probability > 40 ? 'text-warning' : 'text-muted-foreground'
                  }`}>
                    {prediction.probability}%
                  </span>
                  <p className="text-xs text-muted-foreground">{isBangla ? 'ঝুঁকি' : 'Risk'}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground">
          {isBangla ? 'দ্রুত পদক্ষেপ' : 'Quick Actions'}
        </h2>
        <div className="space-y-2">
          <QuickAction
            title={isBangla ? 'রোগীর তালিকা' : 'Patient Queue'}
            description={isBangla ? 'আজকের রোগীদের দেখুন' : 'View today\'s patients'}
            icon={<Users className="w-6 h-6 text-blue-500" />}
            gradient="from-blue-50 to-indigo-50"
            badge="8"
          />
          <QuickAction
            title={isBangla ? 'মেডিকেল রেকর্ড' : 'Medical Records'}
            description={isBangla ? 'রোগীর ইতিহাস দেখুন' : 'View patient history'}
            icon={<FileText className="w-6 h-6 text-purple-500" />}
            gradient="from-purple-50 to-violet-50"
          />
          <QuickAction
            title={isBangla ? 'প্রেসক্রিপশন লিখুন' : 'Write Prescription'}
            description={isBangla ? 'ডিজিটাল প্রেসক্রিপশন' : 'Digital prescription'}
            icon={<Stethoscope className="w-6 h-6 text-emerald-500" />}
            gradient="from-emerald-50 to-green-50"
          />
          <QuickAction
            title={isBangla ? 'টেলিমেডিসিন' : 'Telemedicine'}
            description={isBangla ? 'অনলাইন পরামর্শ দিন' : 'Online consultation'}
            icon={<Video className="w-6 h-6 text-cyan-500" />}
            gradient="from-cyan-50 to-blue-50"
            badge={isBangla ? 'লাইভ' : 'Live'}
          />
        </div>
      </div>
    </div>
  );
};

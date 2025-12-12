import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ImpactCard } from '../shared/ImpactCard';
import { QuickAction } from '../shared/QuickAction';
import { GlassCard } from '@/components/ui/GlassCard';
import {
  Server,
  Users,
  Shield,
  Activity,
  Database,
  Settings,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { isBangla } = useLanguage();

  const systemData = {
    totalUsers: 1250000,
    activeNow: 45678,
    uptime: 99.99,
    securityScore: 98,
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          ⚙️ {isBangla ? 'জাতীয় অবকাঠামো' : 'National Infrastructure'}
        </h1>
        <p className="text-muted-foreground">
          {isBangla ? 'সিস্টেম কন্ট্রোল প্যানেল' : 'System Control Panel'}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <ImpactCard
          title={isBangla ? 'মোট ব্যবহারকারী' : 'Total Users'}
          value={(systemData.totalUsers / 1000000).toFixed(2) + 'M'}
          icon={<Users className="w-5 h-5 text-white" />}
          gradient="from-gray-600 to-slate-700"
        />
        <ImpactCard
          title={isBangla ? 'আপটাইম' : 'Uptime'}
          value={`${systemData.uptime}%`}
          icon={<Activity className="w-5 h-5 text-white" />}
          gradient="from-emerald-500 to-green-600"
        />
      </div>

      <GlassCard className="p-4">
        <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" />
          {isBangla ? 'সিস্টেম স্বাস্থ্য' : 'System Health'}
        </h3>
        <div className="space-y-3">
          {[
            { name: 'Database', status: 'healthy', load: 45 },
            { name: 'API Gateway', status: 'healthy', load: 62 },
            { name: 'Auth Service', status: 'healthy', load: 38 },
          ].map((service, i) => (
            <div key={i} className="flex items-center gap-3">
              <CheckCircle className="w-4 h-4 text-success" />
              <span className="flex-1 text-sm">{service.name}</span>
              <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{ width: `${service.load}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground">{service.load}%</span>
            </div>
          ))}
        </div>
      </GlassCard>

      <div className="space-y-2">
        <QuickAction
          title={isBangla ? 'ব্যবহারকারী ম্যানেজমেন্ট' : 'User Management'}
          icon={<Users className="w-6 h-6 text-blue-500" />}
        />
        <QuickAction
          title={isBangla ? 'সিকিউরিটি সেটিংস' : 'Security Settings'}
          icon={<Shield className="w-6 h-6 text-red-500" />}
        />
        <QuickAction
          title={isBangla ? 'ডেটাবেস ম্যানেজমেন্ট' : 'Database Management'}
          icon={<Database className="w-6 h-6 text-purple-500" />}
        />
      </div>
    </div>
  );
};

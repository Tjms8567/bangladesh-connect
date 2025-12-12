import React, { useState } from 'react';
import { 
  ChevronRight, Check, Users, Shield, Star, Crown, 
  GraduationCap, Briefcase, HeartPulse, Building2,
  Sprout, Vote, ShoppingBag, Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { UserRole, ROLES } from '@/types/roles';

interface RoleOnboardingGuideProps {
  onComplete?: () => void;
}

interface RoleFeature {
  icon: React.ElementType;
  title: { en: string; bn: string };
  description: { en: string; bn: string };
}

const roleFeatures: Record<UserRole, RoleFeature[]> = {
  citizen: [
    { icon: Shield, title: { en: 'Digital Identity', bn: 'ডিজিটাল পরিচয়' }, description: { en: 'Secure national ID access', bn: 'সুরক্ষিত জাতীয় পরিচয়' } },
    { icon: Building2, title: { en: 'Government Services', bn: 'সরকারি সেবা' }, description: { en: 'Access all e-services', bn: 'সব ই-সেবা অ্যাক্সেস' } },
  ],
  student: [
    { icon: GraduationCap, title: { en: 'Learning Hub', bn: 'শিক্ষা কেন্দ্র' }, description: { en: 'Access courses & resources', bn: 'কোর্স ও রিসোর্স অ্যাক্সেস' } },
    { icon: Star, title: { en: 'Scholarships', bn: 'বৃত্তি' }, description: { en: 'Find scholarship opportunities', bn: 'বৃত্তির সুযোগ খুঁজুন' } },
  ],
  farmer: [
    { icon: Sprout, title: { en: 'Crop Management', bn: 'ফসল ব্যবস্থাপনা' }, description: { en: 'Track your farming activities', bn: 'কৃষি কার্যক্রম ট্র্যাক করুন' } },
    { icon: ShoppingBag, title: { en: 'Market Access', bn: 'বাজার অ্যাক্সেস' }, description: { en: 'Connect with buyers directly', bn: 'সরাসরি ক্রেতাদের সাথে যুক্ত হন' } },
  ],
  business: [
    { icon: Briefcase, title: { en: 'Business Tools', bn: 'ব্যবসায়িক টুল' }, description: { en: 'Manage your business', bn: 'আপনার ব্যবসা পরিচালনা করুন' } },
    { icon: Globe, title: { en: 'Market Reach', bn: 'বাজার সম্প্রসারণ' }, description: { en: 'Expand your reach', bn: 'আপনার পরিধি বাড়ান' } },
  ],
  medical: [
    { icon: HeartPulse, title: { en: 'Patient Care', bn: 'রোগী সেবা' }, description: { en: 'Manage patient records', bn: 'রোগীর রেকর্ড পরিচালনা' } },
    { icon: Shield, title: { en: 'Certifications', bn: 'সনদপত্র' }, description: { en: 'Verify credentials', bn: 'যোগ্যতা যাচাই' } },
  ],
  government: [
    { icon: Building2, title: { en: 'Service Delivery', bn: 'সেবা প্রদান' }, description: { en: 'Manage public services', bn: 'জনসেবা পরিচালনা' } },
    { icon: Users, title: { en: 'Citizen Engagement', bn: 'নাগরিক সংযুক্তি' }, description: { en: 'Connect with citizens', bn: 'নাগরিকদের সাথে সংযুক্ত হন' } },
  ],
  voter: [
    { icon: Vote, title: { en: 'Voting Access', bn: 'ভোট অ্যাক্সেস' }, description: { en: 'Participate in elections', bn: 'নির্বাচনে অংশগ্রহণ' } },
    { icon: Shield, title: { en: 'Voter ID', bn: 'ভোটার আইডি' }, description: { en: 'Digital voter identity', bn: 'ডিজিটাল ভোটার পরিচয়' } },
  ],
  guest: [
    { icon: Globe, title: { en: 'Explore', bn: 'অন্বেষণ' }, description: { en: 'Discover Bangladesh 2.0', bn: 'বাংলাদেশ ২.০ আবিষ্কার করুন' } },
    { icon: Users, title: { en: 'Join Community', bn: 'সম্প্রদায়ে যোগ দিন' }, description: { en: 'Become a member', bn: 'সদস্য হন' } },
  ],
  superadmin: [
    { icon: Crown, title: { en: 'Full Control', bn: 'সম্পূর্ণ নিয়ন্ত্রণ' }, description: { en: 'System-wide access', bn: 'সিস্টেম-ব্যাপী অ্যাক্সেস' } },
    { icon: Shield, title: { en: 'Role Management', bn: 'ভূমিকা ব্যবস্থাপনা' }, description: { en: 'Manage all user roles', bn: 'সব ব্যবহারকারীর ভূমিকা পরিচালনা' } },
  ],
  admin: [
    { icon: Shield, title: { en: 'Admin Panel', bn: 'অ্যাডমিন প্যানেল' }, description: { en: 'Access admin controls', bn: 'অ্যাডমিন নিয়ন্ত্রণ অ্যাক্সেস' } },
    { icon: Users, title: { en: 'User Management', bn: 'ব্যবহারকারী ব্যবস্থাপনা' }, description: { en: 'Manage user accounts', bn: 'ব্যবহারকারী অ্যাকাউন্ট পরিচালনা' } },
  ],
  founder: [
    { icon: Crown, title: { en: 'Vision Control', bn: 'ভিশন নিয়ন্ত্রণ' }, description: { en: 'Shape Bangladesh 2.0', bn: 'বাংলাদেশ ২.০ গড়ুন' } },
    { icon: Globe, title: { en: 'National Impact', bn: 'জাতীয় প্রভাব' }, description: { en: 'Track transformation', bn: 'রূপান্তর ট্র্যাক করুন' } },
  ],
  hospital: [
    { icon: HeartPulse, title: { en: 'Hospital Management', bn: 'হাসপাতাল ব্যবস্থাপনা' }, description: { en: 'Manage healthcare', bn: 'স্বাস্থ্যসেবা পরিচালনা' } },
  ],
  university: [
    { icon: GraduationCap, title: { en: 'Education Management', bn: 'শিক্ষা ব্যবস্থাপনা' }, description: { en: 'Manage academic programs', bn: 'একাডেমিক প্রোগ্রাম পরিচালনা' } },
  ],
  marketplace: [
    { icon: ShoppingBag, title: { en: 'Marketplace', bn: 'মার্কেটপ্লেস' }, description: { en: 'Buy and sell products', bn: 'পণ্য কিনুন ও বিক্রি করুন' } },
  ],
  social: [
    { icon: Users, title: { en: 'Community', bn: 'সম্প্রদায়' }, description: { en: 'Connect with others', bn: 'অন্যদের সাথে সংযুক্ত হন' } },
  ],
  customer: [
    { icon: ShoppingBag, title: { en: 'Shopping', bn: 'কেনাকাটা' }, description: { en: 'Shop online', bn: 'অনলাইনে কেনাকাটা' } },
  ],
};

export const RoleOnboardingGuide: React.FC<RoleOnboardingGuideProps> = ({ onComplete }) => {
  const { isBangla } = useLanguage();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [step, setStep] = useState<'select' | 'features'>('select');

  const displayRoles = ROLES.filter(r => 
    ['citizen', 'student', 'farmer', 'business', 'medical', 'government', 'voter', 'guest'].includes(r.id)
  );

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setStep('features');
  };

  const handleComplete = () => {
    if (onComplete) onComplete();
  };

  return (
    <div className="space-y-6">
      {step === 'select' && (
        <>
          <div className="text-center space-y-2 mb-6">
            <h2 className="text-2xl font-bold text-foreground">
              {isBangla ? 'ভূমিকা অনবোর্ডিং গাইড' : 'Role Onboarding Guide'}
            </h2>
            <p className="text-muted-foreground">
              {isBangla 
                ? 'প্রতিটি ভূমিকার বৈশিষ্ট্য দেখুন'
                : 'Explore features for each role'
              }
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {displayRoles.map((role) => (
              <GlassCard
                key={role.id}
                className={cn(
                  'p-4 cursor-pointer transition-all hover:ring-2 hover:ring-primary/50',
                  selectedRole === role.id && 'ring-2 ring-primary bg-primary/5'
                )}
                onClick={() => handleRoleSelect(role.id)}
              >
                <div className="text-center space-y-2">
                  <span className="text-3xl">{role.icon}</span>
                  <p className="font-medium text-foreground text-sm">
                    {isBangla ? role.nameBn : role.name}
                  </p>
                </div>
              </GlassCard>
            ))}
          </div>
        </>
      )}

      {step === 'features' && selectedRole && (
        <>
          <div className="flex items-center gap-3 mb-6">
            <Button variant="ghost" onClick={() => setStep('select')}>
              ← {isBangla ? 'ফিরে যান' : 'Back'}
            </Button>
            <div>
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <span className="text-2xl">{ROLES.find(r => r.id === selectedRole)?.icon}</span>
                {isBangla 
                  ? ROLES.find(r => r.id === selectedRole)?.nameBn
                  : ROLES.find(r => r.id === selectedRole)?.name
                }
              </h2>
              <p className="text-sm text-muted-foreground">
                {isBangla 
                  ? ROLES.find(r => r.id === selectedRole)?.descriptionBn
                  : ROLES.find(r => r.id === selectedRole)?.description
                }
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {roleFeatures[selectedRole]?.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <GlassCard key={index} className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">
                        {isBangla ? feature.title.bn : feature.title.en}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {isBangla ? feature.description.bn : feature.description.en}
                      </p>
                    </div>
                    <Badge variant="outline" className="shrink-0">
                      {isBangla ? 'সক্রিয়' : 'Active'}
                    </Badge>
                  </div>
                </GlassCard>
              );
            })}
          </div>

          <div className="flex justify-end pt-4">
            <Button onClick={handleComplete} className="gap-2">
              {isBangla ? 'সম্পন্ন' : 'Complete'}
              <Check className="w-4 h-4" />
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

// Bangladesh 2.0 Role System - Extended with Super Admin
export type UserRole = 
  | 'citizen'
  | 'government'
  | 'admin'
  | 'superadmin' // NEW: Super Administrator
  | 'student'
  | 'medical'
  | 'hospital'
  | 'university'
  | 'business'
  | 'voter'
  | 'guest'
  | 'marketplace'
  | 'founder'
  | 'social'
  | 'customer'
  | 'farmer'; // NEW: Farmer/Agriculture

export interface RoleConfig {
  id: UserRole;
  name: string;
  nameBn: string;
  icon: string;
  description: string;
  descriptionBn: string;
  color: string;
  gradient: string;
  impactMetric?: string;
  impactMetricBn?: string;
  sectorAccess?: string[]; // Which sectors this role can access
  canMonitor?: boolean; // Can monitor other users
}

export const ROLES: RoleConfig[] = [
  {
    id: 'superadmin',
    name: 'Super Administrator',
    nameBn: 'সুপার অ্যাডমিনিস্ট্রেটর',
    icon: '👑',
    description: 'National Transformation Oversight',
    descriptionBn: 'জাতীয় রূপান্তর তদারকি',
    color: 'hsl(45, 100%, 50%)',
    gradient: 'from-yellow-500 to-amber-600',
    sectorAccess: ['industry', 'education', 'health', 'law', 'city', 'expatriate'],
    canMonitor: true,
  },
  {
    id: 'citizen',
    name: 'Citizen',
    nameBn: 'নাগরিক',
    icon: '🇧🇩',
    description: 'Digital Home for personal growth',
    descriptionBn: 'ব্যক্তিগত উন্নয়নের জন্য ডিজিটাল হোম',
    color: 'hsl(160, 100%, 22%)',
    gradient: 'from-emerald-500 to-green-600',
    sectorAccess: ['education', 'health', 'city'],
  },
  {
    id: 'government',
    name: 'Government Official',
    nameBn: 'সরকারি কর্মকর্তা',
    icon: '🏛️',
    description: 'Transformation Engine for public service',
    descriptionBn: 'জনসেবার জন্য রূপান্তর ইঞ্জিন',
    color: 'hsl(207, 90%, 41%)',
    gradient: 'from-blue-500 to-indigo-600',
    sectorAccess: ['industry', 'education', 'health', 'law', 'city', 'expatriate'],
    canMonitor: true,
  },
  {
    id: 'admin',
    name: 'System Administrator',
    nameBn: 'সিস্টেম অ্যাডমিন',
    icon: '⚙️',
    description: 'National Infrastructure control',
    descriptionBn: 'জাতীয় অবকাঠামো নিয়ন্ত্রণ',
    color: 'hsl(0, 0%, 30%)',
    gradient: 'from-gray-600 to-slate-700',
    sectorAccess: ['industry', 'education', 'health', 'law', 'city', 'expatriate'],
  },
  {
    id: 'student',
    name: 'Student',
    nameBn: 'শিক্ষার্থী',
    icon: '🎓',
    description: 'Growth Journey for skill development',
    descriptionBn: 'দক্ষতা উন্নয়নের জন্য বৃদ্ধি যাত্রা',
    color: 'hsl(280, 70%, 50%)',
    gradient: 'from-purple-500 to-violet-600',
    impactMetric: 'Skills gained → Employment ready',
    impactMetricBn: 'দক্ষতা অর্জিত → কর্মসংস্থান প্রস্তুত',
    sectorAccess: ['education', 'industry'],
  },
  {
    id: 'medical',
    name: 'Medical Professional',
    nameBn: 'চিকিৎসা পেশাজীবী',
    icon: '🩺',
    description: 'Health Transformation interface',
    descriptionBn: 'স্বাস্থ্য রূপান্তর ইন্টারফেস',
    color: 'hsl(355, 91%, 56%)',
    gradient: 'from-red-400 to-rose-500',
    impactMetric: 'Patients healed → National health improved',
    impactMetricBn: 'রোগী সুস্থ → জাতীয় স্বাস্থ্য উন্নত',
    sectorAccess: ['health'],
  },
  {
    id: 'hospital',
    name: 'Hospital Administrator',
    nameBn: 'হাসপাতাল প্রশাসক',
    icon: '🏥',
    description: 'Healthcare Evolution dashboard',
    descriptionBn: 'স্বাস্থ্যসেবা বিবর্তন ড্যাশবোর্ড',
    color: 'hsl(340, 70%, 50%)',
    gradient: 'from-pink-500 to-rose-600',
    sectorAccess: ['health'],
  },
  {
    id: 'university',
    name: 'University Staff',
    nameBn: 'বিশ্ববিদ্যালয় কর্মী',
    icon: '📚',
    description: 'Knowledge Leadership portal',
    descriptionBn: 'জ্ঞান নেতৃত্ব পোর্টাল',
    color: 'hsl(25, 90%, 50%)',
    gradient: 'from-orange-500 to-amber-600',
    impactMetric: 'Students educated → Nation empowered',
    impactMetricBn: 'শিক্ষার্থী শিক্ষিত → জাতি ক্ষমতায়িত',
    sectorAccess: ['education', 'industry'],
  },
  {
    id: 'business',
    name: 'Business Owner',
    nameBn: 'ব্যবসায়ী',
    icon: '🏢',
    description: 'Economic Catalyst suite',
    descriptionBn: 'অর্থনৈতিক অনুঘটক স্যুট',
    color: 'hsl(45, 100%, 51%)',
    gradient: 'from-yellow-400 to-amber-500',
    impactMetric: 'Jobs created → Economy strengthened',
    impactMetricBn: 'চাকরি সৃষ্ট → অর্থনীতি শক্তিশালী',
    sectorAccess: ['industry', 'expatriate'],
  },
  {
    id: 'voter',
    name: 'Voter',
    nameBn: 'ভোটার',
    icon: '🗳️',
    description: 'Democratic Contribution hub',
    descriptionBn: 'গণতান্ত্রিক অবদান হাব',
    color: 'hsl(200, 80%, 50%)',
    gradient: 'from-cyan-500 to-blue-500',
    sectorAccess: ['law'],
  },
  {
    id: 'guest',
    name: 'Guest / Expatriate',
    nameBn: 'অতিথি / প্রবাসী',
    icon: '🌐',
    description: 'Partnership Gateway for collaboration',
    descriptionBn: 'সহযোগিতার জন্য অংশীদারিত্ব গেটওয়ে',
    color: 'hsl(180, 60%, 45%)',
    gradient: 'from-teal-500 to-cyan-600',
    sectorAccess: ['expatriate'],
  },
  {
    id: 'marketplace',
    name: 'e-Marketplace',
    nameBn: 'ই-মার্কেটপ্লেস',
    icon: '🛒',
    description: 'Digital Commerce platform',
    descriptionBn: 'ডিজিটাল কমার্স প্ল্যাটফর্ম',
    color: 'hsl(160, 70%, 40%)',
    gradient: 'from-emerald-400 to-teal-500',
    sectorAccess: ['industry'],
  },
  {
    id: 'founder',
    name: 'Founder / Innovator',
    nameBn: 'প্রতিষ্ঠাতা / উদ্ভাবক',
    icon: '🤝',
    description: 'Innovation Collaboration Hub',
    descriptionBn: 'উদ্ভাবন সহযোগিতা হাব',
    color: 'hsl(270, 70%, 55%)',
    gradient: 'from-violet-500 to-purple-600',
    sectorAccess: ['industry', 'education'],
  },
  {
    id: 'social',
    name: 'Social Connect',
    nameBn: 'সোশ্যাল কানেক্ট',
    icon: '💬',
    description: 'Bangladesh Social Platform',
    descriptionBn: 'বাংলাদেশ সোশ্যাল প্ল্যাটফর্ম',
    color: 'hsl(210, 80%, 55%)',
    gradient: 'from-blue-400 to-indigo-500',
    sectorAccess: ['city'],
  },
  {
    id: 'customer',
    name: 'Customer Dashboard',
    nameBn: 'গ্রাহক ড্যাশবোর্ড',
    icon: '📊',
    description: 'Personal Business Analytics',
    descriptionBn: 'ব্যক্তিগত ব্যবসা বিশ্লেষণ',
    color: 'hsl(220, 70%, 50%)',
    gradient: 'from-indigo-500 to-blue-600',
    sectorAccess: ['industry'],
  },
  {
    id: 'farmer',
    name: 'Farmer / Agriculture',
    nameBn: 'কৃষক / কৃষি',
    icon: '🌾',
    description: 'Agriculture & Rural Development',
    descriptionBn: 'কৃষি ও গ্রামীণ উন্নয়ন',
    color: 'hsl(100, 70%, 40%)',
    gradient: 'from-lime-500 to-green-600',
    impactMetric: 'Crops grown → Nation fed',
    impactMetricBn: 'ফসল উৎপাদিত → জাতি খাদ্য নিরাপত্তা',
    sectorAccess: ['industry', 'health'],
  },
];

export const getRoleConfig = (role: UserRole): RoleConfig => {
  return ROLES.find(r => r.id === role) || ROLES[1]; // Default to citizen
};

export const isSuperAdmin = (role: UserRole): boolean => {
  return role === 'superadmin';
};

export const canAccessSector = (role: UserRole, sectorId: string): boolean => {
  const config = getRoleConfig(role);
  return config.sectorAccess?.includes(sectorId) || role === 'superadmin';
};

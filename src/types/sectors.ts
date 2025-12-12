// Bangladesh 2.0 - Six National Priority Sectors
export type SectorId = 
  | 'industry'
  | 'education' 
  | 'health'
  | 'law'
  | 'city'
  | 'expatriate';

export interface Sector {
  id: SectorId;
  name: string;
  nameBn: string;
  moduleName: string;
  moduleNameBn: string;
  icon: string;
  color: string;
  gradient: string;
  description: string;
  descriptionBn: string;
  gdpContribution: number; // Percentage
  targetGdp: number; // In billions USD
  currentProgress: number; // 0-100
}

export const SECTORS: Sector[] = [
  {
    id: 'industry',
    name: 'Industry',
    nameBn: 'শিল্প খাত',
    moduleName: 'Shilpo Accelerator',
    moduleNameBn: 'শিল্প অ্যাক্সিলেরেটর',
    icon: '🏭',
    color: 'hsl(207, 90%, 41%)',
    gradient: 'from-blue-500 to-indigo-600',
    description: '$1 Trillion GDP by 2034',
    descriptionBn: '২০৩৪ সালের মধ্যে $১ ট্রিলিয়ন জিডিপি',
    gdpContribution: 35,
    targetGdp: 350,
    currentProgress: 42,
  },
  {
    id: 'education',
    name: 'Education',
    nameBn: 'শিক্ষা ব্যবস্থা',
    moduleName: 'Shikkha Revolution',
    moduleNameBn: 'শিক্ষা বিপ্লব',
    icon: '📚',
    color: 'hsl(280, 70%, 50%)',
    gradient: 'from-purple-500 to-violet-600',
    description: 'Teacher Welfare & Curriculum Reform',
    descriptionBn: 'শিক্ষক কল্যাণ ও পাঠ্যক্রম সংস্কার',
    gdpContribution: 15,
    targetGdp: 150,
    currentProgress: 38,
  },
  {
    id: 'health',
    name: 'Health Services',
    nameBn: 'স্বাস্থ্য সেবা',
    moduleName: 'Swasthya Guardian',
    moduleNameBn: 'স্বাস্থ্য অভিভাবক',
    icon: '🏥',
    color: 'hsl(355, 91%, 56%)',
    gradient: 'from-red-400 to-rose-500',
    description: 'Prevention Focus & Safe Water',
    descriptionBn: 'প্রতিরোধ ফোকাস ও নিরাপদ পানি',
    gdpContribution: 12,
    targetGdp: 120,
    currentProgress: 45,
  },
  {
    id: 'law',
    name: 'Law & Order',
    nameBn: 'আইন-শৃঙ্খলা',
    moduleName: 'Niyam-Suraksha',
    moduleNameBn: 'নিয়ম-সুরক্ষা',
    icon: '⚖️',
    color: 'hsl(200, 20%, 45%)',
    gradient: 'from-slate-500 to-gray-600',
    description: 'Zero Tolerance & Police Reform',
    descriptionBn: 'শূন্য সহনশীলতা ও পুলিশ সংস্কার',
    gdpContribution: 8,
    targetGdp: 80,
    currentProgress: 35,
  },
  {
    id: 'city',
    name: 'City Management',
    nameBn: 'নগর ব্যবস্থাপনা',
    moduleName: 'Nagor Smart',
    moduleNameBn: 'নগর স্মার্ট',
    icon: '🏙️',
    color: 'hsl(180, 70%, 45%)',
    gradient: 'from-cyan-500 to-teal-600',
    description: "Women's Transport & Traffic Solutions",
    descriptionBn: 'নারী পরিবহন ও ট্রাফিক সমাধান',
    gdpContribution: 15,
    targetGdp: 150,
    currentProgress: 40,
  },
  {
    id: 'expatriate',
    name: 'Expatriate Welfare',
    nameBn: 'প্রবাসী কল্যাণ',
    moduleName: 'Probashi Bridge',
    moduleNameBn: 'প্রবাসী সেতু',
    icon: '✈️',
    color: 'hsl(30, 90%, 50%)',
    gradient: 'from-orange-500 to-amber-600',
    description: 'Safety & Investment Portal',
    descriptionBn: 'নিরাপত্তা ও বিনিয়োগ পোর্টাল',
    gdpContribution: 15,
    targetGdp: 150,
    currentProgress: 55,
  },
];

export const getSectorById = (id: SectorId): Sector | undefined => {
  return SECTORS.find(s => s.id === id);
};

// National Goals
export interface NationalGoal {
  id: string;
  name: string;
  nameBn: string;
  targetYear: number;
  targetValue: number;
  currentValue: number;
  unit: string;
  icon: string;
}

export const NATIONAL_GOALS: NationalGoal[] = [
  {
    id: 'gdp',
    name: '$1 Trillion Economy',
    nameBn: '$১ ট্রিলিয়ন অর্থনীতি',
    targetYear: 2034,
    targetValue: 1000,
    currentValue: 465,
    unit: 'B USD',
    icon: '💰',
  },
  {
    id: 'employment',
    name: 'Full Employment',
    nameBn: 'সম্পূর্ণ কর্মসংস্থান',
    targetYear: 2030,
    targetValue: 100,
    currentValue: 72,
    unit: '%',
    icon: '👷',
  },
  {
    id: 'literacy',
    name: 'Universal Literacy',
    nameBn: 'সর্বজনীন সাক্ষরতা',
    targetYear: 2030,
    targetValue: 100,
    currentValue: 76,
    unit: '%',
    icon: '📖',
  },
  {
    id: 'digital',
    name: 'Digital Bangladesh',
    nameBn: 'ডিজিটাল বাংলাদেশ',
    targetYear: 2030,
    targetValue: 100,
    currentValue: 68,
    unit: '%',
    icon: '📱',
  },
];

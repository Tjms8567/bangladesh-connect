// Demo Users with National ID Login
import { UserRole } from '@/types/roles';

export interface DemoUser {
  id: string;
  nationalId: string; // 17-digit NID format
  smartCardId: string; // 10-digit Smart Card format
  password: string;
  email: string;
  fullName: string;
  fullNameBn: string;
  phone: string;
  role: UserRole;
  roles: UserRole[]; // Can have multiple roles
  district: string;
  districtBn: string;
  avatar?: string;
  points: number;
  level: string;
  balance: number;
  nationalScore: number; // Contribution to national transformation
  personalScore: number; // Personal growth score
  sectorContributions: Record<string, number>;
  isActive: boolean;
  isSuperAdmin?: boolean;
}

export const DEMO_USERS: DemoUser[] = [
  // Super Administrator
  {
    id: 'super-admin-001',
    nationalId: '19800101000000001',
    smartCardId: '1980000001',
    password: 'superadmin@bd2',
    email: 'superadmin@bd2.gov.bd',
    fullName: 'Dr. Shahid Rahman',
    fullNameBn: 'ড. শহীদ রহমান',
    phone: '+880 1700-000001',
    role: 'superadmin',
    roles: ['superadmin', 'admin', 'government', 'citizen'],
    district: 'Dhaka',
    districtBn: 'ঢাকা',
    points: 999999,
    level: 'Supreme',
    balance: 0,
    nationalScore: 100,
    personalScore: 100,
    sectorContributions: {
      industry: 100,
      education: 100,
      health: 100,
      law: 100,
      city: 100,
      expatriate: 100,
    },
    isActive: true,
    isSuperAdmin: true,
  },
  // Regular Citizen
  {
    id: 'citizen-001',
    nationalId: '19901215123456789',
    smartCardId: '1990123456',
    password: 'citizen@2024',
    email: 'rafi.ahmed@gmail.com',
    fullName: 'Rafi Ahmed',
    fullNameBn: 'রাফি আহমেদ',
    phone: '+880 1712-345678',
    role: 'citizen',
    roles: ['citizen', 'voter'],
    district: 'Dhaka',
    districtBn: 'ঢাকা',
    points: 1250,
    level: 'Gold',
    balance: 45250.50,
    nationalScore: 28,
    personalScore: 65,
    sectorContributions: {
      industry: 15,
      education: 35,
      health: 20,
      law: 10,
      city: 25,
      expatriate: 5,
    },
    isActive: true,
  },
  // Student
  {
    id: 'student-001',
    nationalId: '20030510987654321',
    smartCardId: '2003987654',
    password: 'student@2024',
    email: 'fatema.akter@du.ac.bd',
    fullName: 'Fatema Akter',
    fullNameBn: 'ফাতেমা আক্তার',
    phone: '+880 1612-234567',
    role: 'student',
    roles: ['student', 'citizen'],
    district: 'Rajshahi',
    districtBn: 'রাজশাহী',
    points: 850,
    level: 'Silver',
    balance: 12500,
    nationalScore: 22,
    personalScore: 78,
    sectorContributions: {
      industry: 5,
      education: 65,
      health: 10,
      law: 5,
      city: 10,
      expatriate: 5,
    },
    isActive: true,
  },
  // Medical Professional
  {
    id: 'medical-001',
    nationalId: '19850320456789012',
    smartCardId: '1985456789',
    password: 'doctor@2024',
    email: 'dr.karim@dmch.gov.bd',
    fullName: 'Dr. Abdul Karim',
    fullNameBn: 'ড. আব্দুল করিম',
    phone: '+880 1812-456789',
    role: 'medical',
    roles: ['medical', 'citizen', 'hospital'],
    district: 'Dhaka',
    districtBn: 'ঢাকা',
    points: 3500,
    level: 'Platinum',
    balance: 250000,
    nationalScore: 72,
    personalScore: 88,
    sectorContributions: {
      industry: 10,
      education: 25,
      health: 85,
      law: 5,
      city: 15,
      expatriate: 10,
    },
    isActive: true,
  },
  // Business Owner
  {
    id: 'business-001',
    nationalId: '19780815234567890',
    smartCardId: '1978234567',
    password: 'business@2024',
    email: 'rahim.khan@beximco.com',
    fullName: 'Rahim Khan',
    fullNameBn: 'রহিম খান',
    phone: '+880 1912-567890',
    role: 'business',
    roles: ['business', 'citizen', 'marketplace', 'founder'],
    district: 'Chittagong',
    districtBn: 'চট্টগ্রাম',
    points: 5200,
    level: 'Diamond',
    balance: 5000000,
    nationalScore: 85,
    personalScore: 92,
    sectorContributions: {
      industry: 90,
      education: 30,
      health: 20,
      law: 15,
      city: 40,
      expatriate: 45,
    },
    isActive: true,
  },
  // Government Official
  {
    id: 'government-001',
    nationalId: '19700601345678901',
    smartCardId: '1970345678',
    password: 'govt@2024',
    email: 'secretary@mopa.gov.bd',
    fullName: 'Md. Jahangir Alam',
    fullNameBn: 'মো. জাহাঙ্গীর আলম',
    phone: '+880 1511-678901',
    role: 'government',
    roles: ['government', 'citizen', 'admin'],
    district: 'Dhaka',
    districtBn: 'ঢাকা',
    points: 4800,
    level: 'Platinum',
    balance: 180000,
    nationalScore: 78,
    personalScore: 85,
    sectorContributions: {
      industry: 60,
      education: 55,
      health: 50,
      law: 75,
      city: 65,
      expatriate: 40,
    },
    isActive: true,
  },
  // Expatriate / Probashi
  {
    id: 'expatriate-001',
    nationalId: '19880225456789123',
    smartCardId: '1988456789',
    password: 'probashi@2024',
    email: 'nasir.uddin@ksa.com',
    fullName: 'Nasir Uddin',
    fullNameBn: 'নাসির উদ্দিন',
    phone: '+966 55-1234567',
    role: 'guest',
    roles: ['guest', 'citizen'],
    district: 'Sylhet',
    districtBn: 'সিলেট',
    points: 2100,
    level: 'Gold',
    balance: 850000,
    nationalScore: 45,
    personalScore: 70,
    sectorContributions: {
      industry: 25,
      education: 15,
      health: 10,
      law: 5,
      city: 10,
      expatriate: 95,
    },
    isActive: true,
  },
  // University Staff
  {
    id: 'university-001',
    nationalId: '19750412567890234',
    smartCardId: '1975567890',
    password: 'varsity@2024',
    email: 'prof.hasan@buet.ac.bd',
    fullName: 'Prof. Md. Hasan',
    fullNameBn: 'প্রফেসর মো. হাসান',
    phone: '+880 1711-789012',
    role: 'university',
    roles: ['university', 'citizen', 'founder'],
    district: 'Dhaka',
    districtBn: 'ঢাকা',
    points: 4200,
    level: 'Platinum',
    balance: 320000,
    nationalScore: 68,
    personalScore: 82,
    sectorContributions: {
      industry: 40,
      education: 95,
      health: 15,
      law: 10,
      city: 20,
      expatriate: 25,
    },
    isActive: true,
  },
  // Voter
  {
    id: 'voter-001',
    nationalId: '19650830678901345',
    smartCardId: '1965678901',
    password: 'voter@2024',
    email: 'jamal.hossain@yahoo.com',
    fullName: 'Jamal Hossain',
    fullNameBn: 'জামাল হোসেন',
    phone: '+880 1611-890123',
    role: 'voter',
    roles: ['voter', 'citizen'],
    district: 'Khulna',
    districtBn: 'খুলনা',
    points: 650,
    level: 'Bronze',
    balance: 35000,
    nationalScore: 18,
    personalScore: 45,
    sectorContributions: {
      industry: 5,
      education: 10,
      health: 15,
      law: 35,
      city: 20,
      expatriate: 5,
    },
    isActive: true,
  },
  // Marketplace Seller
  {
    id: 'marketplace-001',
    nationalId: '19920718789012456',
    smartCardId: '1992789012',
    password: 'seller@2024',
    email: 'shakil.shop@daraz.bd',
    fullName: 'Shakil Ahmed',
    fullNameBn: 'শাকিল আহমেদ',
    phone: '+880 1812-901234',
    role: 'marketplace',
    roles: ['marketplace', 'citizen', 'business'],
    district: 'Gazipur',
    districtBn: 'গাজীপুর',
    points: 1800,
    level: 'Gold',
    balance: 125000,
    nationalScore: 35,
    personalScore: 72,
    sectorContributions: {
      industry: 45,
      education: 10,
      health: 5,
      law: 8,
      city: 30,
      expatriate: 15,
    },
    isActive: true,
  },
];

// Validate National ID format (17 digits)
export const validateNationalId = (nid: string): boolean => {
  const cleanNid = nid.replace(/\D/g, '');
  return cleanNid.length === 17 || cleanNid.length === 10; // NID or Smart Card
};

// Find user by National ID or Smart Card
export const findUserByNid = (nid: string): DemoUser | undefined => {
  const cleanNid = nid.replace(/\D/g, '');
  return DEMO_USERS.find(
    user => user.nationalId === cleanNid || user.smartCardId === cleanNid
  );
};

// Authenticate demo user
export const authenticateDemoUser = (
  identifier: string,
  password: string
): { success: boolean; user?: DemoUser; error?: string } => {
  const cleanIdentifier = identifier.replace(/\D/g, '');
  
  // Try NID/Smart Card first
  let user = DEMO_USERS.find(
    u => u.nationalId === cleanIdentifier || u.smartCardId === cleanIdentifier
  );
  
  // Fallback to email
  if (!user) {
    user = DEMO_USERS.find(u => u.email.toLowerCase() === identifier.toLowerCase());
  }
  
  if (!user) {
    return { success: false, error: 'User not found. Check your National ID or email.' };
  }
  
  if (user.password !== password) {
    return { success: false, error: 'Invalid password.' };
  }
  
  if (!user.isActive) {
    return { success: false, error: 'This account has been deactivated.' };
  }
  
  return { success: true, user };
};

// Get all demo credentials for display
export const getDemoCredentials = () => {
  return DEMO_USERS.map(user => ({
    role: user.role,
    name: user.fullName,
    nameBn: user.fullNameBn,
    nid: user.smartCardId, // Show shorter Smart Card ID
    password: user.password,
    isSuperAdmin: user.isSuperAdmin || false,
  }));
};

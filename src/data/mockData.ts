// Mock user data
export const mockUser = {
  id: 'bd-2024-001',
  name: { bn: 'রাফি আহমেদ', en: 'Rafi Ahmed' },
  digitalId: 'NID-1990-XXXX-XXXX',
  phone: '+880 1712-345678',
  email: 'rafi.ahmed@email.com',
  avatar: null,
  district: { bn: 'ঢাকা', en: 'Dhaka' },
  balance: 45250.50,
  points: 1250,
  level: 'Gold',
};

// National statistics
export const nationalStats = {
  digitalCitizens: { value: 45000000, growth: 12.5 },
  activeUsers: { value: 2500000, growth: 8.3 },
  transactionsToday: { value: 1250000, growth: 15.2 },
  servicesUsed: { value: 89, growth: 5.0 },
};

// Quick access items
export const quickAccessItems = [
  { id: 'education', icon: 'GraduationCap', label: { bn: 'শিক্ষা', en: 'Education' }, color: 'bg-emerald-500', path: '/education' },
  { id: 'health', icon: 'HeartPulse', label: { bn: 'স্বাস্থ্য', en: 'Health' }, color: 'bg-rose-500', path: '/health' },
  { id: 'finance', icon: 'Wallet', label: { bn: 'অর্থ', en: 'Finance' }, color: 'bg-amber-500', path: '/finance' },
  { id: 'jobs', icon: 'Briefcase', label: { bn: 'চাকরি', en: 'Jobs' }, color: 'bg-blue-500', path: '/jobs' },
];

// Education courses
export const courses = [
  {
    id: 1,
    title: { bn: 'ওয়েব ডেভেলপমেন্ট বেসিক', en: 'Web Development Basics' },
    instructor: { bn: 'মোঃ করিম উদ্দিন', en: 'Md. Karim Uddin' },
    progress: 65,
    duration: '12 hours',
    students: 15420,
    rating: 4.8,
    category: 'Technology',
    thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400',
  },
  {
    id: 2,
    title: { bn: 'ডিজিটাল মার্কেটিং', en: 'Digital Marketing' },
    instructor: { bn: 'ফাতেমা খান', en: 'Fatema Khan' },
    progress: 30,
    duration: '8 hours',
    students: 8750,
    rating: 4.6,
    category: 'Marketing',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
  },
  {
    id: 3,
    title: { bn: 'গ্রাফিক ডিজাইন মাস্টারি', en: 'Graphic Design Mastery' },
    instructor: { bn: 'সাদিয়া রহমান', en: 'Sadia Rahman' },
    progress: 0,
    duration: '15 hours',
    students: 12300,
    rating: 4.9,
    category: 'Design',
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400',
  },
  {
    id: 4,
    title: { bn: 'ইংরেজি কথোপকথন', en: 'English Conversation' },
    instructor: { bn: 'জাহিদ হাসান', en: 'Zahid Hasan' },
    progress: 85,
    duration: '10 hours',
    students: 25600,
    rating: 4.7,
    category: 'Language',
    thumbnail: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400',
  },
];

// Health doctors
export const doctors = [
  {
    id: 1,
    name: { bn: 'ডাঃ আব্দুল করিম', en: 'Dr. Abdul Karim' },
    specialty: { bn: 'হৃদরোগ বিশেষজ্ঞ', en: 'Cardiologist' },
    hospital: { bn: 'ঢাকা মেডিকেল কলেজ', en: 'Dhaka Medical College' },
    rating: 4.9,
    experience: 15,
    fee: 1000,
    available: true,
    nextSlot: '10:30 AM',
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200',
  },
  {
    id: 2,
    name: { bn: 'ডাঃ ফারহানা আক্তার', en: 'Dr. Farhana Akter' },
    specialty: { bn: 'শিশু বিশেষজ্ঞ', en: 'Pediatrician' },
    hospital: { bn: 'স্কয়ার হাসপাতাল', en: 'Square Hospital' },
    rating: 4.8,
    experience: 10,
    fee: 800,
    available: true,
    nextSlot: '2:00 PM',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200',
  },
  {
    id: 3,
    name: { bn: 'ডাঃ মাহমুদ হোসেন', en: 'Dr. Mahmud Hossain' },
    specialty: { bn: 'চর্ম বিশেষজ্ঞ', en: 'Dermatologist' },
    hospital: { bn: 'ল্যাবএইড হাসপাতাল', en: 'Lab Aid Hospital' },
    rating: 4.7,
    experience: 12,
    fee: 700,
    available: false,
    nextSlot: 'Tomorrow',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=200',
  },
];

// Finance transactions
export const transactions = [
  { id: 1, type: 'received', amount: 5000, from: { bn: 'মা', en: 'Mom' }, date: '2024-01-15', category: 'Family' },
  { id: 2, type: 'sent', amount: 1500, to: { bn: 'বিকাশ মার্চেন্ট', en: 'bKash Merchant' }, date: '2024-01-15', category: 'Shopping' },
  { id: 3, type: 'bill', amount: 2500, to: { bn: 'ডেসকো বিল', en: 'DESCO Bill' }, date: '2024-01-14', category: 'Bills' },
  { id: 4, type: 'received', amount: 35000, from: { bn: 'বেতন', en: 'Salary' }, date: '2024-01-10', category: 'Income' },
  { id: 5, type: 'recharge', amount: 500, to: { bn: 'গ্রামীণফোন', en: 'Grameenphone' }, date: '2024-01-10', category: 'Recharge' },
];

// Jobs listings
export const jobs = [
  {
    id: 1,
    title: { bn: 'সফটওয়্যার ইঞ্জিনিয়ার', en: 'Software Engineer' },
    company: { bn: 'গ্রামীণফোন', en: 'Grameenphone' },
    location: { bn: 'ঢাকা', en: 'Dhaka' },
    type: 'Full-time',
    salary: { min: 80000, max: 120000 },
    posted: '2 days ago',
    applicants: 156,
    remote: false,
    logo: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=100',
  },
  {
    id: 2,
    title: { bn: 'ডিজিটাল মার্কেটার', en: 'Digital Marketer' },
    company: { bn: 'দারাজ', en: 'Daraz' },
    location: { bn: 'ঢাকা', en: 'Dhaka' },
    type: 'Full-time',
    salary: { min: 50000, max: 70000 },
    posted: '1 week ago',
    applicants: 89,
    remote: true,
    logo: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=100',
  },
  {
    id: 3,
    title: { bn: 'গ্রাফিক ডিজাইনার', en: 'Graphic Designer' },
    company: { bn: 'পাঠাও', en: 'Pathao' },
    location: { bn: 'ঢাকা', en: 'Dhaka' },
    type: 'Contract',
    salary: { min: 40000, max: 60000 },
    posted: '3 days ago',
    applicants: 234,
    remote: true,
    logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=100',
  },
  {
    id: 4,
    title: { bn: 'কাস্টমার সাপোর্ট', en: 'Customer Support' },
    company: { bn: 'বিকাশ', en: 'bKash' },
    location: { bn: 'চট্টগ্রাম', en: 'Chittagong' },
    type: 'Full-time',
    salary: { min: 25000, max: 35000 },
    posted: '5 days ago',
    applicants: 412,
    remote: false,
    logo: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100',
  },
];

// User achievements
export const achievements = [
  { id: 1, title: { bn: 'প্রথম পেমেন্ট', en: 'First Payment' }, icon: '🎉', unlocked: true, date: '2024-01-01' },
  { id: 2, title: { bn: 'কোর্স সমাপ্ত', en: 'Course Complete' }, icon: '📚', unlocked: true, date: '2024-01-10' },
  { id: 3, title: { bn: 'স্বাস্থ্য চ্যাম্পিয়ন', en: 'Health Champion' }, icon: '💪', unlocked: true, date: '2024-01-12' },
  { id: 4, title: { bn: 'ট্রেন্ডসেটার', en: 'Trendsetter' }, icon: '⭐', unlocked: false, date: null },
  { id: 5, title: { bn: 'কমিউনিটি লিডার', en: 'Community Leader' }, icon: '👑', unlocked: false, date: null },
];

// Health services
export const healthServices = [
  { id: 'telemedicine', icon: 'Video', label: { bn: 'টেলিমেডিসিন', en: 'Telemedicine' }, color: 'bg-blue-500' },
  { id: 'records', icon: 'FileText', label: { bn: 'স্বাস্থ্য রেকর্ড', en: 'Health Records' }, color: 'bg-emerald-500' },
  { id: 'pharmacy', icon: 'Pill', label: { bn: 'ফার্মেসি', en: 'Pharmacy' }, color: 'bg-rose-500' },
  { id: 'emergency', icon: 'Siren', label: { bn: 'জরুরি সেবা', en: 'Emergency' }, color: 'bg-red-600' },
];

// Finance quick actions
export const financeActions = [
  { id: 'send', icon: 'Send', label: { bn: 'পাঠান', en: 'Send' }, color: 'bg-primary' },
  { id: 'receive', icon: 'QrCode', label: { bn: 'গ্রহণ', en: 'Receive' }, color: 'bg-secondary' },
  { id: 'bills', icon: 'Receipt', label: { bn: 'বিল', en: 'Bills' }, color: 'bg-amber-500' },
  { id: 'recharge', icon: 'Smartphone', label: { bn: 'রিচার্জ', en: 'Recharge' }, color: 'bg-purple-500' },
];

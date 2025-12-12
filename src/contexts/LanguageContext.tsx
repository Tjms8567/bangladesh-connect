import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'bn' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isBangla: boolean;
}

const translations: Record<string, Record<Language, string>> = {
  // Common
  'app.name': { bn: 'বাংলাদেশ ২.০', en: 'Bangladesh 2.0' },
  'app.tagline': { bn: 'নিজেকে বদলাও, বাংলাদেশ বদলাবে', en: 'Change yourself to change Bangladesh' },
  'common.welcome': { bn: 'স্বাগতম', en: 'Welcome' },
  'common.search': { bn: 'অনুসন্ধান করুন', en: 'Search' },
  'common.seeAll': { bn: 'সব দেখুন', en: 'See All' },
  'common.continue': { bn: 'চালিয়ে যান', en: 'Continue' },
  'common.back': { bn: 'পিছনে', en: 'Back' },
  'common.save': { bn: 'সংরক্ষণ করুন', en: 'Save' },
  'common.cancel': { bn: 'বাতিল', en: 'Cancel' },
  'common.loading': { bn: 'লোড হচ্ছে...', en: 'Loading...' },
  'common.taka': { bn: '৳', en: '৳' },
  'common.next': { bn: 'পরবর্তী', en: 'Next' },
  'common.previous': { bn: 'পূর্ববর্তী', en: 'Previous' },
  'common.skip': { bn: 'বাদ দিন', en: 'Skip' },
  'common.getStarted': { bn: 'শুরু করুন', en: 'Get Started' },
  'common.complete': { bn: 'সম্পন্ন', en: 'Complete' },
  'common.points': { bn: 'পয়েন্ট', en: 'Points' },
  'common.level': { bn: 'লেভেল', en: 'Level' },
  'common.today': { bn: 'আজ', en: 'Today' },
  'common.thisWeek': { bn: 'এই সপ্তাহ', en: 'This Week' },
  'common.thisMonth': { bn: 'এই মাস', en: 'This Month' },
  
  // Navigation
  'nav.home': { bn: 'হোম', en: 'Home' },
  'nav.education': { bn: 'শিক্ষা', en: 'Education' },
  'nav.health': { bn: 'স্বাস্থ্য', en: 'Health' },
  'nav.finance': { bn: 'অর্থ', en: 'Finance' },
  'nav.jobs': { bn: 'চাকরি', en: 'Jobs' },
  'nav.profile': { bn: 'প্রোফাইল', en: 'Profile' },
  'nav.community': { bn: 'কমিউনিটি', en: 'Community' },
  'nav.admin': { bn: 'অ্যাডমিন', en: 'Admin' },
  'nav.services': { bn: 'সেবা', en: 'Services' },
  'nav.dashboard': { bn: 'ড্যাশবোর্ড', en: 'Dashboard' },
  
  // Home
  'home.greeting.morning': { bn: 'সুপ্রভাত', en: 'Good Morning' },
  'home.greeting.afternoon': { bn: 'শুভ অপরাহ্ন', en: 'Good Afternoon' },
  'home.greeting.evening': { bn: 'শুভ সন্ধ্যা', en: 'Good Evening' },
  'home.quickAccess': { bn: 'দ্রুত প্রবেশ', en: 'Quick Access' },
  'home.nationalProgress': { bn: 'জাতীয় অগ্রগতি', en: 'National Progress' },
  'home.myImpact': { bn: 'আমার অবদান', en: 'My Impact' },
  'home.emergency': { bn: 'জরুরি সেবা', en: 'Emergency' },
  'home.digitalCitizens': { bn: 'ডিজিটাল নাগরিক', en: 'Digital Citizens' },
  'home.activeUsers': { bn: 'সক্রিয় ব্যবহারকারী', en: 'Active Users' },
  'home.transactionsToday': { bn: 'আজকের লেনদেন', en: "Today's Transactions" },
  'home.servicesUsed': { bn: 'ব্যবহৃত সেবা', en: 'Services Used' },
  
  // Education
  'education.title': { bn: 'শিক্ষা বিপ্লব', en: 'Education Revolution' },
  'education.myLearning': { bn: 'আমার শিক্ষা', en: 'My Learning' },
  'education.courses': { bn: 'কোর্সসমূহ', en: 'Courses' },
  'education.liveCourse': { bn: 'লাইভ ক্লাস', en: 'Live Classes' },
  'education.skills': { bn: 'দক্ষতা', en: 'Skills' },
  'education.certificates': { bn: 'সার্টিফিকেট', en: 'Certificates' },
  'education.progress': { bn: 'অগ্রগতি', en: 'Progress' },
  'education.aiTutor': { bn: 'এআই শিক্ষক', en: 'AI Tutor' },
  'education.studyGroups': { bn: 'স্টাডি গ্রুপ', en: 'Study Groups' },
  'education.scholarships': { bn: 'বৃত্তি', en: 'Scholarships' },
  'education.learningPath': { bn: 'শিক্ষার পথ', en: 'Learning Path' },
  
  // Health
  'health.title': { bn: 'স্বাস্থ্য সেবা', en: 'Health Services' },
  'health.myHealth': { bn: 'আমার স্বাস্থ্য', en: 'My Health' },
  'health.bookAppointment': { bn: 'অ্যাপয়েন্টমেন্ট বুক করুন', en: 'Book Appointment' },
  'health.telemedicine': { bn: 'টেলিমেডিসিন', en: 'Telemedicine' },
  'health.records': { bn: 'স্বাস্থ্য রেকর্ড', en: 'Health Records' },
  'health.medicine': { bn: 'ওষুধ', en: 'Medicine' },
  'health.symptomChecker': { bn: 'রোগ পরীক্ষা', en: 'Symptom Checker' },
  'health.emergency': { bn: 'জরুরি', en: 'Emergency' },
  'health.pharmacy': { bn: 'ফার্মেসি', en: 'Pharmacy' },
  'health.doctorFinder': { bn: 'ডাক্তার খুঁজুন', en: 'Find Doctor' },
  
  // Finance
  'finance.title': { bn: 'বাংলাপে', en: 'BanglaPay' },
  'finance.balance': { bn: 'ব্যালেন্স', en: 'Balance' },
  'finance.send': { bn: 'পাঠান', en: 'Send' },
  'finance.receive': { bn: 'গ্রহণ', en: 'Receive' },
  'finance.pay': { bn: 'পেমেন্ট', en: 'Pay' },
  'finance.history': { bn: 'লেনদেন', en: 'History' },
  'finance.bills': { bn: 'বিল পেমেন্ট', en: 'Pay Bills' },
  'finance.recharge': { bn: 'রিচার্জ', en: 'Recharge' },
  'finance.savings': { bn: 'সঞ্চয়', en: 'Savings' },
  'finance.remittance': { bn: 'রেমিট্যান্স', en: 'Remittance' },
  'finance.loans': { bn: 'ঋণ', en: 'Loans' },
  'finance.investments': { bn: 'বিনিয়োগ', en: 'Investments' },
  
  // Jobs
  'jobs.title': { bn: 'চাকরি ও দক্ষতা', en: 'Jobs & Skills' },
  'jobs.findJobs': { bn: 'চাকরি খুঁজুন', en: 'Find Jobs' },
  'jobs.myApplications': { bn: 'আমার আবেদন', en: 'My Applications' },
  'jobs.freelance': { bn: 'ফ্রিল্যান্স', en: 'Freelance' },
  'jobs.remote': { bn: 'রিমোট জব', en: 'Remote Jobs' },
  'jobs.resume': { bn: 'জীবনবৃত্তান্ত', en: 'Resume' },
  'jobs.skillTest': { bn: 'দক্ষতা পরীক্ষা', en: 'Skill Test' },
  'jobs.recommended': { bn: 'আপনার জন্য', en: 'For You' },
  'jobs.careerPath': { bn: 'কর্মজীবনের পথ', en: 'Career Path' },
  
  // Profile
  'profile.title': { bn: 'প্রোফাইল', en: 'Profile' },
  'profile.digitalId': { bn: 'ডিজিটাল আইডি', en: 'Digital ID' },
  'profile.settings': { bn: 'সেটিংস', en: 'Settings' },
  'profile.language': { bn: 'ভাষা', en: 'Language' },
  'profile.theme': { bn: 'থিম', en: 'Theme' },
  'profile.notifications': { bn: 'বিজ্ঞপ্তি', en: 'Notifications' },
  'profile.privacy': { bn: 'গোপনীয়তা', en: 'Privacy' },
  'profile.help': { bn: 'সাহায্য', en: 'Help' },
  'profile.logout': { bn: 'লগআউট', en: 'Logout' },
  'profile.achievements': { bn: 'অর্জন', en: 'Achievements' },
  'profile.myContribution': { bn: 'আমার অবদান', en: 'My Contribution' },
  
  // Onboarding
  'onboarding.welcome': { bn: 'বাংলাদেশ ২.০ এ স্বাগতম', en: 'Welcome to Bangladesh 2.0' },
  'onboarding.selectLanguage': { bn: 'ভাষা নির্বাচন করুন', en: 'Select Language' },
  'onboarding.selectRole': { bn: 'আপনার ভূমিকা নির্বাচন করুন', en: 'Select Your Role' },
  'onboarding.selectSectors': { bn: 'আগ্রহের খাত নির্বাচন করুন', en: 'Select Your Interests' },
  'onboarding.discoverFeatures': { bn: 'বৈশিষ্ট্যসমূহ জানুন', en: 'Discover Features' },
  'onboarding.setupProfile': { bn: 'প্রোফাইল সেটআপ', en: 'Setup Profile' },
  'onboarding.allSet': { bn: 'সব প্রস্তুত!', en: 'All Set!' },
  
  // Roles
  'role.citizen': { bn: 'নাগরিক', en: 'Citizen' },
  'role.student': { bn: 'শিক্ষার্থী', en: 'Student' },
  'role.business': { bn: 'ব্যবসায়ী', en: 'Business Owner' },
  'role.medical': { bn: 'চিকিৎসা পেশাজীবী', en: 'Medical Professional' },
  'role.government': { bn: 'সরকারি কর্মকর্তা', en: 'Government Official' },
  'role.teacher': { bn: 'শিক্ষক', en: 'Teacher' },
  'role.farmer': { bn: 'কৃষক', en: 'Farmer' },
  'role.entrepreneur': { bn: 'উদ্যোক্তা', en: 'Entrepreneur' },
  
  // Sectors
  'sector.education': { bn: 'শিক্ষা', en: 'Education' },
  'sector.health': { bn: 'স্বাস্থ্য', en: 'Healthcare' },
  'sector.finance': { bn: 'অর্থনীতি', en: 'Finance' },
  'sector.agriculture': { bn: 'কৃষি', en: 'Agriculture' },
  'sector.technology': { bn: 'প্রযুক্তি', en: 'Technology' },
  'sector.government': { bn: 'সরকার', en: 'Government' },
  
  // Dashboard
  'dashboard.impactPoints': { bn: 'ইমপ্যাক্ট পয়েন্ট', en: 'Impact Points' },
  'dashboard.nationalProgress': { bn: 'জাতীয় অগ্রগতি', en: 'National Progress' },
  'dashboard.personalGrowth': { bn: 'ব্যক্তিগত বৃদ্ধি', en: 'Personal Growth' },
  'dashboard.communityImpact': { bn: 'সম্প্রদায়ের প্রভাব', en: 'Community Impact' },
  'dashboard.quickActions': { bn: 'দ্রুত পদক্ষেপ', en: 'Quick Actions' },
  'dashboard.recentActivity': { bn: 'সাম্প্রতিক কার্যকলাপ', en: 'Recent Activity' },
  'dashboard.upcomingTasks': { bn: 'আসন্ন কাজ', en: 'Upcoming Tasks' },
  'dashboard.achievements': { bn: 'অর্জনসমূহ', en: 'Achievements' },
  
  // Gamification
  'gamification.streak': { bn: 'স্ট্রিক', en: 'Streak' },
  'gamification.badges': { bn: 'ব্যাজ', en: 'Badges' },
  'gamification.leaderboard': { bn: 'লিডারবোর্ড', en: 'Leaderboard' },
  'gamification.challenges': { bn: 'চ্যালেঞ্জ', en: 'Challenges' },
  'gamification.rewards': { bn: 'পুরস্কার', en: 'Rewards' },
  'gamification.dailyGoal': { bn: 'দৈনিক লক্ষ্য', en: 'Daily Goal' },
  'gamification.weeklyChallenge': { bn: 'সাপ্তাহিক চ্যালেঞ্জ', en: 'Weekly Challenge' },
  
  // Levels
  'level.bronze': { bn: 'ব্রোঞ্জ', en: 'Bronze' },
  'level.silver': { bn: 'সিলভার', en: 'Silver' },
  'level.gold': { bn: 'গোল্ড', en: 'Gold' },
  'level.platinum': { bn: 'প্লাটিনাম', en: 'Platinum' },
  'level.diamond': { bn: 'ডায়মন্ড', en: 'Diamond' },
  
  // Government Services
  'gov.nid': { bn: 'জাতীয় পরিচয়পত্র', en: 'National ID' },
  'gov.passport': { bn: 'পাসপোর্ট', en: 'Passport' },
  'gov.birthCert': { bn: 'জন্ম সনদ', en: 'Birth Certificate' },
  'gov.taxReturn': { bn: 'আয়কর রিটার্ন', en: 'Tax Return' },
  'gov.landRecords': { bn: 'ভূমি রেকর্ড', en: 'Land Records' },
  'gov.utilities': { bn: 'ইউটিলিটি বিল', en: 'Utility Bills' },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const stored = localStorage.getItem('bd2-language');
    return (stored as Language) || 'bn';
  });

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('bd2-language', lang);
  };

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t, isBangla: language === 'bn' }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

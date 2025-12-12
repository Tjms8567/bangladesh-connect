// Comprehensive Mock Data for Six National Priority Sectors

// ============ INDUSTRY SECTOR (শিল্প খাত) ============
export const industryData = {
  gdpProgress: {
    current: 465, // Billion USD
    target: 1000,
    yearlyGrowth: 7.2,
    projectedCompletion: 2034,
  },
  businessRegistrations: {
    today: 342,
    thisMonth: 8567,
    thisYear: 98432,
    totalActive: 2450000,
    averageTime: '24 hours', // Down from 84 days
  },
  fdiStats: {
    totalFdi: 4.2, // Billion USD
    fdiGrowth: 23.5,
    topSectors: [
      { name: 'Manufacturing', value: 1.8, percentage: 42 },
      { name: 'IT & Software', value: 0.9, percentage: 21 },
      { name: 'Textiles', value: 0.7, percentage: 17 },
      { name: 'Energy', value: 0.5, percentage: 12 },
      { name: 'Others', value: 0.3, percentage: 8 },
    ],
    topCountries: [
      { country: 'China', flag: '🇨🇳', amount: 1.2 },
      { country: 'Singapore', flag: '🇸🇬', amount: 0.8 },
      { country: 'Japan', flag: '🇯🇵', amount: 0.6 },
      { country: 'UAE', flag: '🇦🇪', amount: 0.5 },
      { country: 'USA', flag: '🇺🇸', amount: 0.4 },
    ],
  },
  closedIndustries: {
    total: 523,
    revived: 127,
    inProgress: 89,
    potentialJobs: 45000,
    featuredMills: [
      { name: 'Khulna Jute Mills', status: 'Reviving', progress: 72, jobs: 2500 },
      { name: 'Adamjee Textile', status: 'Planning', progress: 35, jobs: 3200 },
      { name: 'Rajshahi Sugar Mills', status: 'Revived', progress: 100, jobs: 1800 },
    ],
  },
  jobsCreated: {
    thisMonth: 45600,
    thisYear: 567800,
    sectors: [
      { name: 'Manufacturing', count: 180000 },
      { name: 'IT Services', count: 95000 },
      { name: 'Textiles', count: 120000 },
      { name: 'Construction', count: 85000 },
    ],
  },
};

// ============ EDUCATION SECTOR (শিক্ষা ব্যবস্থা) ============
export const educationData = {
  teacherWelfare: {
    totalTeachers: 1250000,
    averageSalary: 42000,
    salaryIncreaseYoY: 15,
    trainedThisYear: 125000,
    certifiedDigital: 450000,
    pendingBenefits: 23500,
  },
  skillGaps: [
    { skill: 'AI & Machine Learning', demand: 95, supply: 25, gap: 70 },
    { skill: 'Digital Marketing', demand: 88, supply: 45, gap: 43 },
    { skill: 'Cloud Computing', demand: 82, supply: 30, gap: 52 },
    { skill: 'Data Analytics', demand: 78, supply: 35, gap: 43 },
    { skill: 'Cybersecurity', demand: 85, supply: 20, gap: 65 },
  ],
  tradeCourses: [
    { name: 'Plumbing & Sanitation', enrolled: 45000, completed: 32000, employed: 28500 },
    { name: 'Electrical Wiring', enrolled: 52000, completed: 41000, employed: 38000 },
    { name: 'Automotive Repair', enrolled: 38000, completed: 28000, employed: 25000 },
    { name: 'Mobile Repair', enrolled: 62000, completed: 55000, employed: 48000 },
    { name: 'Welding & Fabrication', enrolled: 28000, completed: 22000, employed: 20000 },
  ],
  studentStats: {
    totalEnrolled: 42000000,
    primaryCompletion: 98.2,
    secondaryCompletion: 72.5,
    highereducation: 18.5,
    dropoutRate: 8.2,
  },
  entrepreneurshipHub: {
    ideasSubmitted: 12500,
    fundedProjects: 450,
    totalFunding: 125000000, // BDT
    successfulStartups: 85,
  },
};

// ============ HEALTH SECTOR (স্বাস্থ্য সেবা) ============
export const healthData = {
  vaccinationCoverage: {
    overall: 89.5,
    children: 94.2,
    covid19: 78.5,
    upcomingCampaigns: [
      { name: 'Polio Booster', date: '2024-02-15', target: 12000000 },
      { name: 'Measles-Rubella', date: '2024-03-01', target: 8500000 },
    ],
    alertZones: [
      { district: 'Cox\'s Bazar', risk: 'high', issue: 'Dengue outbreak predicted' },
      { district: 'Sylhet', risk: 'medium', issue: 'Cholera risk due to flooding' },
    ],
  },
  waterQuality: {
    safeWaterAccess: 72.5,
    testedSources: 125000,
    contaminatedSources: 8500,
    purificationSystems: 45000,
    arsenicoAffected: 12500,
    regions: [
      { name: 'Dhaka Division', safeWater: 85, sources: 25000 },
      { name: 'Chittagong Division', safeWater: 78, sources: 18000 },
      { name: 'Rajshahi Division', safeWater: 65, sources: 15000 },
      { name: 'Khulna Division', safeWater: 58, sources: 12000 },
      { name: 'Sylhet Division', safeWater: 72, sources: 10000 },
    ],
  },
  telemedicine: {
    totalConsultations: 2500000,
    activeeDoctors: 8500,
    averageRating: 4.7,
    waitTime: '8 minutes',
    specialties: [
      { name: 'General Medicine', consultations: 850000 },
      { name: 'Pediatrics', consultations: 450000 },
      { name: 'Gynecology', consultations: 380000 },
      { name: 'Mental Health', consultations: 220000 },
    ],
  },
  preventiveCare: {
    healthCheckups: 3500000,
    screeningsConducted: 1200000,
    diseasesPrevented: 450000,
    costSaved: 2500000000, // BDT
  },
  epidemicPredictions: [
    { disease: 'Dengue', probability: 78, peakMonth: 'August', affectedDistricts: 25 },
    { disease: 'Malaria', probability: 45, peakMonth: 'September', affectedDistricts: 12 },
    { disease: 'Cholera', probability: 35, peakMonth: 'July', affectedDistricts: 8 },
  ],
};

// ============ LAW & ORDER SECTOR (আইন-শৃঙ্খলা) ============
export const lawOrderData = {
  emergencyResponse: {
    averageResponseTime: '8.5 minutes',
    callsToday: 12500,
    resolvedToday: 11200,
    pendingCases: 1300,
  },
  crimeStats: {
    totalCases: 450000,
    solved: 325000,
    solvingRate: 72.2,
    reduction: 15.5, // YoY
    categories: [
      { type: 'Theft', cases: 125000, solved: 85000 },
      { type: 'Fraud', cases: 85000, solved: 62000 },
      { type: 'Violence', cases: 65000, solved: 52000 },
      { type: 'Cybercrime', cases: 45000, solved: 28000 },
      { type: 'Others', cases: 130000, solved: 98000 },
    ],
  },
  policePerformance: {
    totalOfficers: 210000,
    trainedThisYear: 45000,
    communitySatisfaction: 68.5,
    responseImprovement: 25,
  },
  highRiskZones: [
    { area: 'Old Dhaka', riskLevel: 72, patrolFrequency: 'High' },
    { area: 'Chittagong Port', riskLevel: 65, patrolFrequency: 'High' },
    { area: 'Sylhet Border', riskLevel: 58, patrolFrequency: 'Medium' },
  ],
  digitalJustice: {
    onlineComplaints: 125000,
    resolved: 98000,
    averageResolutionDays: 12,
    satisfactionRate: 75,
  },
};

// ============ CITY MANAGEMENT SECTOR (নগর ব্যবস্থাপনা) ============
export const cityData = {
  womenSafety: {
    safeRoutes: 2500,
    verifiedDrivers: 45000,
    femaleDrivers: 8500,
    emergencyActivations: 1250,
    safetyRating: 4.2,
    escorts: {
      completed: 125000,
      activeNow: 350,
      averageRating: 4.8,
    },
  },
  traffic: {
    congestionIndex: 45, // Lower is better
    averageCommute: '48 minutes',
    smartSignals: 2500,
    violationsToday: 8500,
    finesCollected: 12500000, // BDT
    peakHours: ['8:00-10:00 AM', '5:00-8:00 PM'],
  },
  publicTransport: {
    busesActive: 8500,
    trainsActive: 250,
    metroRidership: 450000,
    busRidership: 2500000,
    onTimePerformance: 78,
  },
  infrastructure: {
    roadsRepaired: 1250, // km
    bridgesInspected: 450,
    maintenancePending: 125,
    budgetUtilized: 85,
  },
  safetyHeatmap: [
    { area: 'Dhanmondi', safetyScore: 92, lighting: 95, patrol: 88 },
    { area: 'Gulshan', safetyScore: 95, lighting: 98, patrol: 92 },
    { area: 'Mirpur', safetyScore: 72, lighting: 65, patrol: 75 },
    { area: 'Old Dhaka', safetyScore: 58, lighting: 45, patrol: 68 },
    { area: 'Uttara', safetyScore: 88, lighting: 92, patrol: 85 },
  ],
};

// ============ EXPATRIATE WELFARE SECTOR (প্রবাসী কল্যাণ) ============
export const expatriateData = {
  remittance: {
    thisMonth: 2.1, // Billion USD
    thisYear: 22.5,
    yoyGrowth: 12.5,
    topChannels: [
      { name: 'Bank Transfer', percentage: 45 },
      { name: 'bKash', percentage: 25 },
      { name: 'Nagad', percentage: 15 },
      { name: 'Others', percentage: 15 },
    ],
    topCountries: [
      { country: 'Saudi Arabia', flag: '🇸🇦', amount: 5.2 },
      { country: 'UAE', flag: '🇦🇪', amount: 4.8 },
      { country: 'USA', flag: '🇺🇸', amount: 3.5 },
      { country: 'UK', flag: '🇬🇧', amount: 2.8 },
      { country: 'Malaysia', flag: '🇲🇾', amount: 2.2 },
    ],
  },
  workersAbroad: {
    total: 12500000,
    newThisYear: 850000,
    returned: 125000,
    inDistress: 2500,
    topDestinations: [
      { country: 'Saudi Arabia', workers: 3500000 },
      { country: 'UAE', workers: 2800000 },
      { country: 'Malaysia', workers: 1500000 },
      { country: 'Kuwait', workers: 850000 },
      { country: 'Qatar', workers: 750000 },
    ],
  },
  investmentPortal: {
    totalInvestments: 1250, // Million USD
    projects: 450,
    averageReturn: 12.5,
    popularSectors: [
      { sector: 'Real Estate', percentage: 35, amount: 437 },
      { sector: 'Manufacturing', percentage: 25, amount: 312 },
      { sector: 'IT & Software', percentage: 20, amount: 250 },
      { sector: 'Agriculture', percentage: 12, amount: 150 },
      { sector: 'Others', percentage: 8, amount: 101 },
    ],
  },
  consularServices: {
    documentsProcessed: 125000,
    emergencyAssistance: 2500,
    legalSupport: 850,
    repatriations: 125,
    averageProcessingDays: 3,
  },
  preDeparture: {
    orientationsCompleted: 450000,
    certificatesIssued: 425000,
    fraudsReported: 1250,
    fraudsPrevented: 1150,
  },
};

// ============ NATIONAL TRANSFORMATION STATS ============
export const nationalTransformationData = {
  gdpProgress: {
    current: 465,
    target: 1000,
    yearlyGrowth: 7.2,
    daysRemaining: 3285, // Until 2034
    dailyRequired: 0.163, // Billion USD per day
  },
  citizenContribution: {
    totalUsers: 45000000,
    activeContributors: 12500000,
    totalActions: 2500000000,
    gdpImpact: 25.5, // Billion USD attributed to platform
  },
  sectorProgress: [
    { sector: 'Industry', progress: 42, target: 350, current: 147 },
    { sector: 'Education', progress: 38, target: 150, current: 57 },
    { sector: 'Health', progress: 45, target: 120, current: 54 },
    { sector: 'Law & Order', progress: 35, target: 80, current: 28 },
    { sector: 'City', progress: 40, target: 150, current: 60 },
    { sector: 'Expatriate', progress: 55, target: 150, current: 82.5 },
  ],
  topContributors: [
    { name: 'Rahim Khan', district: 'Chittagong', contribution: 2500000, role: 'Business' },
    { name: 'Dr. Abdul Karim', district: 'Dhaka', contribution: 1800000, role: 'Medical' },
    { name: 'Prof. Md. Hasan', district: 'Dhaka', contribution: 1200000, role: 'Education' },
  ],
  nationalQuests: [
    {
      id: 'revive-100-industries',
      name: 'Revive 100 Closed Industries',
      nameBn: '১০০টি বন্ধ শিল্প পুনরুজ্জীবিত করুন',
      progress: 127,
      target: 100,
      status: 'completed',
      participants: 45000,
      impact: '45,000 jobs created',
    },
    {
      id: 'train-1m-plumbers',
      name: 'Train 1 Million Plumbers',
      nameBn: '১০ লক্ষ প্লাম্বার প্রশিক্ষণ',
      progress: 450000,
      target: 1000000,
      status: 'active',
      participants: 125000,
      impact: '₿12.5B GDP contribution',
    },
    {
      id: 'safe-water-100',
      name: '100% Safe Water Access',
      nameBn: '১০০% নিরাপদ পানি সরবরাহ',
      progress: 72.5,
      target: 100,
      status: 'active',
      participants: 850000,
      impact: '25M lives improved',
    },
  ],
};

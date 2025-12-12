import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { ImpactCard } from '../shared/ImpactCard';
import { QuickAction } from '../shared/QuickAction';
import { GlassCard } from '@/components/ui/GlassCard';
import { ProgressRing } from '../shared/ProgressRing';
import {
  Wheat,
  CloudRain,
  Sun,
  Thermometer,
  DollarSign,
  TrendingUp,
  Droplets,
  Calendar,
  Truck,
  ShoppingCart,
  Leaf,
  AlertTriangle,
  Sprout,
  Target,
  Banknote,
  FileText,
  Users,
  MapPin,
} from 'lucide-react';

// Agriculture mock data
const agricultureData = {
  nationalStats: {
    totalFarmers: 35000000,
    totalCropland: 8500000, // hectares
    riceProduction: 56000000, // tonnes
    foodSecurity: 92.5,
  },
  cropPrices: [
    { crop: 'Rice (Aman)', cropBn: 'ধান (আমন)', price: 2800, unit: '৳/মণ', change: 5.2, icon: '🌾' },
    { crop: 'Rice (Boro)', cropBn: 'ধান (বোরো)', price: 2650, unit: '৳/মণ', change: -2.1, icon: '🌾' },
    { crop: 'Wheat', cropBn: 'গম', price: 3200, unit: '৳/মণ', change: 8.5, icon: '🌾' },
    { crop: 'Potato', cropBn: 'আলু', price: 1200, unit: '৳/মণ', change: -5.8, icon: '🥔' },
    { crop: 'Onion', cropBn: 'পেঁয়াজ', price: 3500, unit: '৳/মণ', change: 15.2, icon: '🧅' },
    { crop: 'Jute', cropBn: 'পাট', price: 4500, unit: '৳/মণ', change: 3.2, icon: '🌿' },
  ],
  weatherAlerts: [
    { type: 'rain', message: 'Heavy rainfall expected in next 48 hours', messageBn: 'আগামী ৪৮ ঘন্টায় ভারী বৃষ্টির সম্ভাবনা', severity: 'warning', region: 'Sylhet' },
    { type: 'heat', message: 'Heat wave advisory for next week', messageBn: 'আগামী সপ্তাহে তাপপ্রবাহ সতর্কতা', severity: 'caution', region: 'Rajshahi' },
  ],
  farmingTips: [
    { title: 'Optimal Planting Time', titleBn: 'সঠিক রোপণের সময়', description: 'Boro rice should be planted by end of January for best yield', descriptionBn: 'সর্বোত্তম ফলনের জন্য জানুয়ারির শেষে বোরো ধান রোপণ করুন' },
    { title: 'Pest Alert', titleBn: 'কীটপতঙ্গ সতর্কতা', description: 'Brown plant hopper detected in Jessore region. Apply recommended pesticides.', descriptionBn: 'যশোর অঞ্চলে বাদামী গাছ ফড়িং দেখা গেছে। সুপারিশকৃত কীটনাশক প্রয়োগ করুন।' },
    { title: 'Fertilizer Subsidy', titleBn: 'সার ভর্তুকি', description: 'New fertilizer subsidy program available. Apply before Dec 31.', descriptionBn: 'নতুন সার ভর্তুকি কর্মসূচি পাওয়া যাচ্ছে। ৩১ ডিসেম্বরের আগে আবেদন করুন।' },
  ],
  schemes: [
    { name: 'Krishi Karj', nameBn: 'কৃষি কার্ড ঋণ', amount: '৳50,000 - ৳5,00,000', interest: '4%', status: 'active' },
    { name: 'Crop Insurance', nameBn: 'ফসল বীমা', coverage: 'Up to ৳1,00,000', premium: '৳500/season', status: 'active' },
    { name: 'Subsidy Card', nameBn: 'ভর্তুকি কার্ড', benefit: '50% off on seeds & fertilizers', status: 'active' },
  ],
};

export const FarmerDashboard: React.FC = () => {
  const { isBangla } = useLanguage();
  const { demoUser } = useAuth();

  const farmerData = demoUser ? {
    landSize: 5.5, // bigha
    currentCrop: 'Boro Rice',
    currentCropBn: 'বোরো ধান',
    lastHarvest: 85, // moun
    estimatedIncome: 238000,
    loanBalance: 45000,
    subsidyReceived: 12500,
    nationalContribution: demoUser.sectorContributions?.industry || 25,
  } : {
    landSize: 5.5,
    currentCrop: 'Boro Rice',
    currentCropBn: 'বোরো ধান',
    lastHarvest: 85,
    estimatedIncome: 238000,
    loanBalance: 45000,
    subsidyReceived: 12500,
    nationalContribution: 25,
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 100000) return `৳${(amount / 100000).toFixed(1)}L`;
    if (amount >= 1000) return `৳${(amount / 1000).toFixed(0)}K`;
    return `৳${amount}`;
  };

  const currentWeather = {
    temp: 28,
    humidity: 75,
    condition: 'Partly Cloudy',
    conditionBn: 'আংশিক মেঘলা',
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          🌾 {isBangla ? 'কৃষি ড্যাশবোর্ড' : 'Agriculture Dashboard'}
        </h1>
        <p className="text-muted-foreground">
          {isBangla ? 'ফসল উৎপাদিত → জাতি খাদ্য নিরাপত্তা' : 'Crops grown → Nation fed'}
        </p>
      </div>

      {/* Weather Card */}
      <GlassCard className="p-4 bg-gradient-to-r from-sky-500/20 to-blue-500/20 border-sky-500/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center">
              <Sun className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                {isBangla ? 'আজকের আবহাওয়া' : "Today's Weather"}
              </p>
              <p className="text-2xl font-bold text-foreground">{currentWeather.temp}°C</p>
              <p className="text-sm text-muted-foreground">
                {isBangla ? currentWeather.conditionBn : currentWeather.condition}
              </p>
            </div>
          </div>
          <div className="text-right space-y-1">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Droplets className="w-4 h-4" />
              {currentWeather.humidity}%
            </div>
            <p className="text-xs text-muted-foreground">
              {isBangla ? 'আর্দ্রতা' : 'Humidity'}
            </p>
          </div>
        </div>
      </GlassCard>

      {/* Weather Alerts */}
      {agricultureData.weatherAlerts.length > 0 && (
        <div className="space-y-2">
          {agricultureData.weatherAlerts.map((alert, i) => (
            <GlassCard 
              key={i} 
              className={`p-3 border-l-4 ${
                alert.severity === 'warning' ? 'border-l-destructive bg-destructive/5' : 'border-l-warning bg-warning/5'
              }`}
            >
              <div className="flex items-start gap-3">
                <AlertTriangle className={`w-5 h-5 ${
                  alert.severity === 'warning' ? 'text-destructive' : 'text-warning'
                }`} />
                <div>
                  <p className="font-medium text-foreground text-sm">
                    {isBangla ? alert.messageBn : alert.message}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {isBangla ? 'অঞ্চল' : 'Region'}: {alert.region}
                  </p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <ImpactCard
          title={isBangla ? 'জমির পরিমাণ' : 'Land Size'}
          value={`${farmerData.landSize} ${isBangla ? 'বিঘা' : 'Bigha'}`}
          subtitle={isBangla ? farmerData.currentCropBn : farmerData.currentCrop}
          icon={<Sprout className="w-5 h-5 text-white" />}
          gradient="from-lime-500 to-green-600"
        />
        <ImpactCard
          title={isBangla ? 'শেষ ফলন' : 'Last Harvest'}
          value={`${farmerData.lastHarvest} ${isBangla ? 'মণ' : 'Moun'}`}
          subtitle={formatCurrency(farmerData.estimatedIncome)}
          icon={<Wheat className="w-5 h-5 text-white" />}
          trend={{ value: 12, isPositive: true }}
          gradient="from-amber-500 to-yellow-600"
        />
      </div>

      {/* National Contribution */}
      <GlassCard variant="elevated" className="p-5">
        <div className="flex items-center gap-6">
          <ProgressRing progress={farmerData.nationalContribution} size={100}>
            <div className="text-center">
              <div className="text-xl font-bold text-foreground">
                {farmerData.nationalContribution}%
              </div>
              <div className="text-xs text-muted-foreground">
                {isBangla ? 'অবদান' : 'Impact'}
              </div>
            </div>
          </ProgressRing>
          <div className="flex-1 space-y-2">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <Target className="w-4 h-4 text-primary" />
              {isBangla ? 'জাতীয় খাদ্য নিরাপত্তায় অবদান' : 'Food Security Contribution'}
            </h3>
            <p className="text-sm text-muted-foreground">
              {isBangla
                ? `আপনার ফসল ${agricultureData.nationalStats.foodSecurity}% জাতীয় খাদ্য নিরাপত্তায় অবদান রাখছে`
                : `Your crops contribute to ${agricultureData.nationalStats.foodSecurity}% national food security`}
            </p>
          </div>
        </div>
      </GlassCard>

      {/* Market Prices */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          {isBangla ? 'বাজার দর' : 'Market Prices'}
        </h2>
        <div className="space-y-2">
          {agricultureData.cropPrices.slice(0, 4).map((crop, i) => (
            <GlassCard key={i} className="p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{crop.icon}</span>
                  <div>
                    <p className="font-medium text-foreground">
                      {isBangla ? crop.cropBn : crop.crop}
                    </p>
                    <p className="text-xs text-muted-foreground">{crop.unit}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-foreground">৳{crop.price}</p>
                  <p className={`text-xs flex items-center justify-end gap-1 ${
                    crop.change >= 0 ? 'text-success' : 'text-destructive'
                  }`}>
                    <TrendingUp className={`w-3 h-3 ${crop.change < 0 ? 'rotate-180' : ''}`} />
                    {crop.change >= 0 ? '+' : ''}{crop.change}%
                  </p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Government Schemes */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Banknote className="w-5 h-5 text-primary" />
          {isBangla ? 'সরকারি সুবিধা' : 'Government Schemes'}
        </h2>
        <div className="space-y-2">
          {agricultureData.schemes.map((scheme, i) => (
            <GlassCard key={i} className="p-4 bg-gradient-to-r from-emerald-500/10 to-green-500/10">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-foreground">
                    {isBangla ? scheme.nameBn : scheme.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {scheme.amount || scheme.coverage || scheme.benefit}
                  </p>
                </div>
                <span className="px-2 py-1 text-xs rounded-full bg-success/20 text-success">
                  {isBangla ? 'সক্রিয়' : 'Active'}
                </span>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Farming Tips */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Leaf className="w-5 h-5 text-primary" />
          {isBangla ? 'কৃষি পরামর্শ' : 'Farming Tips'}
        </h2>
        <div className="space-y-2">
          {agricultureData.farmingTips.map((tip, i) => (
            <GlassCard key={i} className="p-4">
              <h3 className="font-medium text-foreground text-sm mb-1">
                {isBangla ? tip.titleBn : tip.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {isBangla ? tip.descriptionBn : tip.description}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground">
          {isBangla ? 'দ্রুত পদক্ষেপ' : 'Quick Actions'}
        </h2>
        <div className="space-y-2">
          <QuickAction
            title={isBangla ? 'ফসল বিক্রি করুন' : 'Sell Your Crops'}
            description={isBangla ? 'সরাসরি ক্রেতাদের কাছে বিক্রি' : 'Sell directly to buyers'}
            icon={<ShoppingCart className="w-6 h-6 text-emerald-500" />}
            gradient="from-emerald-50 to-green-50"
            badge={isBangla ? 'জনপ্রিয়' : 'Popular'}
          />
          <QuickAction
            title={isBangla ? 'কৃষি ঋণ আবেদন' : 'Apply for Agri Loan'}
            description={isBangla ? 'সহজ ঋণ প্রক্রিয়া' : 'Easy loan process'}
            icon={<Banknote className="w-6 h-6 text-blue-500" />}
            gradient="from-blue-50 to-indigo-50"
          />
          <QuickAction
            title={isBangla ? 'সার ও বীজ' : 'Seeds & Fertilizers'}
            description={isBangla ? 'ভর্তুকি মূল্যে কিনুন' : 'Buy at subsidized rates'}
            icon={<Sprout className="w-6 h-6 text-lime-500" />}
            gradient="from-lime-50 to-green-50"
          />
          <QuickAction
            title={isBangla ? 'পরিবহন বুক করুন' : 'Book Transport'}
            description={isBangla ? 'ফসল পরিবহনের জন্য' : 'For crop transportation'}
            icon={<Truck className="w-6 h-6 text-amber-500" />}
            gradient="from-amber-50 to-yellow-50"
          />
        </div>
      </div>

      {/* Financial Summary */}
      <GlassCard className="p-4">
        <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-primary" />
          {isBangla ? 'আর্থিক সারসংক্ষেপ' : 'Financial Summary'}
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 rounded-xl bg-success/10">
            <p className="text-sm text-muted-foreground">
              {isBangla ? 'ভর্তুকি পেয়েছেন' : 'Subsidy Received'}
            </p>
            <p className="text-xl font-bold text-success">
              {formatCurrency(farmerData.subsidyReceived)}
            </p>
          </div>
          <div className="p-3 rounded-xl bg-warning/10">
            <p className="text-sm text-muted-foreground">
              {isBangla ? 'ঋণ বাকি' : 'Loan Balance'}
            </p>
            <p className="text-xl font-bold text-warning">
              {formatCurrency(farmerData.loanBalance)}
            </p>
          </div>
        </div>
      </GlassCard>

      {/* Local Resources */}
      <GlassCard className="p-4">
        <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-primary" />
          {isBangla ? 'কাছের সেবা' : 'Nearby Services'}
        </h3>
        <div className="grid grid-cols-4 gap-2">
          {[
            { icon: '🏪', label: isBangla ? 'কৃষি অফিস' : 'Agri Office' },
            { icon: '🏦', label: isBangla ? 'ব্যাংক' : 'Bank' },
            { icon: '🛒', label: isBangla ? 'বাজার' : 'Market' },
            { icon: '🚜', label: isBangla ? 'যন্ত্রপাতি' : 'Equipment' },
          ].map((service, i) => (
            <button
              key={i}
              className="flex flex-col items-center gap-2 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
            >
              <span className="text-2xl">{service.icon}</span>
              <span className="text-xs text-muted-foreground text-center">{service.label}</span>
            </button>
          ))}
        </div>
      </GlassCard>
    </div>
  );
};

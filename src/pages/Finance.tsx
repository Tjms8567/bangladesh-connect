import React, { useState } from 'react';
import { 
  Send, QrCode, Receipt, Smartphone, Eye, EyeOff, ArrowUpRight, ArrowDownLeft, 
  TrendingUp, PiggyBank, Globe, ChevronRight, CreditCard, Building2, Zap,
  Wallet, Target, Gift, Shield, Percent, Clock, Users, Landmark
} from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { mockUser, transactions } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

const quickActions = [
  { id: 'send', icon: Send, label: { bn: 'পাঠান', en: 'Send' }, color: 'bg-primary' },
  { id: 'receive', icon: QrCode, label: { bn: 'গ্রহণ', en: 'Receive' }, color: 'bg-secondary' },
  { id: 'bills', icon: Receipt, label: { bn: 'বিল', en: 'Bills' }, color: 'bg-amber-500' },
  { id: 'recharge', icon: Smartphone, label: { bn: 'রিচার্জ', en: 'Recharge' }, color: 'bg-purple-500' },
];

const additionalServices = [
  { id: 'savings', icon: PiggyBank, label: { bn: 'সঞ্চয়', en: 'Savings' }, desc: { bn: 'লক্ষ্য নির্ধারণ করুন', en: 'Set your goals' } },
  { id: 'remittance', icon: Globe, label: { bn: 'রেমিট্যান্স', en: 'Remittance' }, desc: { bn: 'বিদেশ থেকে টাকা', en: 'Money from abroad' } },
  { id: 'loans', icon: Landmark, label: { bn: 'ঋণ', en: 'Loans' }, desc: { bn: 'মাইক্রো লোন', en: 'Micro loans' } },
  { id: 'invest', icon: TrendingUp, label: { bn: 'বিনিয়োগ', en: 'Invest' }, desc: { bn: 'সঞ্চয়পত্র', en: 'Savings bonds' } },
];

const billCategories = [
  { id: 'electric', icon: Zap, label: { bn: 'বিদ্যুৎ', en: 'Electric' }, color: 'text-yellow-500 bg-yellow-500/10' },
  { id: 'gas', icon: '🔥', label: { bn: 'গ্যাস', en: 'Gas' }, color: 'text-orange-500 bg-orange-500/10' },
  { id: 'water', icon: '💧', label: { bn: 'পানি', en: 'Water' }, color: 'text-blue-500 bg-blue-500/10' },
  { id: 'internet', icon: Globe, label: { bn: 'ইন্টারনেট', en: 'Internet' }, color: 'text-purple-500 bg-purple-500/10' },
];

const savingsGoals = [
  {
    id: 1,
    title: { bn: 'ইমার্জেন্সি ফান্ড', en: 'Emergency Fund' },
    target: 100000,
    current: 45000,
    icon: '🏥',
    color: 'from-rose-500 to-pink-600',
  },
  {
    id: 2,
    title: { bn: 'বাড়ির জন্য', en: 'Home Savings' },
    target: 500000,
    current: 125000,
    icon: '🏠',
    color: 'from-emerald-500 to-green-600',
  },
  {
    id: 3,
    title: { bn: 'শিক্ষা ফান্ড', en: 'Education Fund' },
    target: 200000,
    current: 80000,
    icon: '🎓',
    color: 'from-blue-500 to-indigo-600',
  },
];

const offers = [
  {
    id: 1,
    title: { bn: '২০% ক্যাশব্যাক', en: '20% Cashback' },
    merchant: { bn: 'ফুডপান্ডা', en: 'Foodpanda' },
    expires: '2 days',
    code: 'BD20',
  },
  {
    id: 2,
    title: { bn: 'ফ্রি ডেলিভারি', en: 'Free Delivery' },
    merchant: { bn: 'দারাজ', en: 'Daraz' },
    expires: '5 days',
    code: 'SHIP0',
  },
];

export const Finance: React.FC = () => {
  const { t, language, isBangla } = useLanguage();
  const [showBalance, setShowBalance] = useState(true);
  const [activeTab, setActiveTab] = useState('wallet');

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-BD').format(amount);
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'received':
        return <ArrowDownLeft className="w-4 h-4 text-success" />;
      case 'sent':
      case 'bill':
      case 'recharge':
        return <ArrowUpRight className="w-4 h-4 text-destructive" />;
      default:
        return null;
    }
  };

  return (
    <AppLayout headerTitle={t('finance.title')}>
      <div className="px-4 py-4 space-y-6 pb-24">
        {/* Hero Balance Card */}
        <section className="animate-fade-in">
          <GlassCard variant="elevated" className="p-0 overflow-hidden">
            <div className="bg-gradient-to-br from-emerald-600 via-green-600 to-teal-700 p-6 text-white relative">
              {/* Decorative Pattern */}
              <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <circle cx="5" cy="5" r="1" fill="white" />
                  </pattern>
                  <rect width="100" height="100" fill="url(#grid)" />
                </svg>
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Wallet className="w-5 h-5" />
                    <span className="text-white/80 text-sm">{t('finance.balance')}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20 rounded-full h-8 w-8"
                    onClick={() => setShowBalance(!showBalance)}
                  >
                    {showBalance ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </Button>
                </div>
                
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-xl">৳</span>
                  <span className="text-4xl font-bold tracking-tight">
                    {showBalance ? formatAmount(mockUser.balance) : '••••••'}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-white/90">
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-sm">+৳5,200</span>
                      <span className="text-xs text-white/60">{isBangla ? 'এই মাসে' : 'this month'}</span>
                    </div>
                  </div>
                  <Badge className="bg-white/20 text-white border-0">
                    <Shield className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                </div>

                {/* Linked Cards */}
                <div className="mt-4 pt-4 border-t border-white/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4" />
                      <span className="text-sm">•••• 4532</span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-white/80 hover:text-white hover:bg-white/10 h-7 text-xs"
                    >
                      {isBangla ? 'কার্ড যোগ করুন' : 'Add Card'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </section>

        {/* Quick Actions */}
        <section className="animate-fade-in stagger-1">
          <div className="grid grid-cols-4 gap-3">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <GlassCard
                  key={action.id}
                  className="flex flex-col items-center py-4 cursor-pointer hover:scale-105 transition-transform"
                >
                  <div className={`w-12 h-12 rounded-2xl ${action.color} flex items-center justify-center mb-2 shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs font-medium text-foreground text-center">
                    {action.label[language]}
                  </span>
                </GlassCard>
              );
            })}
          </div>
        </section>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="animate-fade-in stagger-2">
          <TabsList className="w-full glass-card p-1">
            <TabsTrigger value="wallet" className="flex-1 text-xs sm:text-sm">
              {isBangla ? 'ওয়ালেট' : 'Wallet'}
            </TabsTrigger>
            <TabsTrigger value="bills" className="flex-1 text-xs sm:text-sm">
              {isBangla ? 'বিল' : 'Bills'}
            </TabsTrigger>
            <TabsTrigger value="savings" className="flex-1 text-xs sm:text-sm">
              {isBangla ? 'সঞ্চয়' : 'Savings'}
            </TabsTrigger>
            <TabsTrigger value="offers" className="flex-1 text-xs sm:text-sm">
              {isBangla ? 'অফার' : 'Offers'}
            </TabsTrigger>
          </TabsList>

          {/* Wallet Tab */}
          <TabsContent value="wallet" className="mt-4 space-y-4">
            {/* Services Grid */}
            <div className="grid grid-cols-2 gap-3">
              {additionalServices.map((service) => {
                const Icon = service.icon;
                return (
                  <GlassCard key={service.id} className="flex items-center gap-3 cursor-pointer hover:bg-muted/50 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-foreground text-sm">
                        {service.label[language]}
                      </h4>
                      <p className="text-xs text-muted-foreground truncate">
                        {service.desc[language]}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                  </GlassCard>
                );
              })}
            </div>

            {/* Transaction History */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-foreground">{t('finance.history')}</h3>
                <span className="text-sm text-primary cursor-pointer">{t('common.seeAll')}</span>
              </div>
              <GlassCard padding="none" className="divide-y divide-border/50">
                {transactions.map((tx, index) => (
                  <div
                    key={tx.id}
                    className="flex items-center gap-3 p-4"
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      tx.type === 'received' ? 'bg-success/10' : 'bg-destructive/10'
                    }`}>
                      {getTransactionIcon(tx.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-foreground text-sm truncate">
                        {tx.type === 'received' ? tx.from?.[language] : tx.to?.[language]}
                      </h4>
                      <p className="text-xs text-muted-foreground">{tx.category}</p>
                    </div>
                    <div className="text-right">
                      <div className={`font-semibold text-sm ${
                        tx.type === 'received' ? 'text-success' : 'text-foreground'
                      }`}>
                        {tx.type === 'received' ? '+' : '-'}৳{formatAmount(tx.amount)}
                      </div>
                      <div className="text-xs text-muted-foreground">{tx.date}</div>
                    </div>
                  </div>
                ))}
              </GlassCard>
            </div>
          </TabsContent>

          {/* Bills Tab */}
          <TabsContent value="bills" className="mt-4 space-y-4">
            <GlassCard className="bg-gradient-to-r from-amber-500/10 to-amber-500/5 border-amber-500/20">
              <div className="flex items-center gap-3">
                <Receipt className="w-10 h-10 text-amber-600 p-2 bg-amber-500/20 rounded-xl" />
                <div className="flex-1">
                  <p className="font-medium text-foreground">
                    {isBangla ? 'পেন্ডিং বিল' : 'Pending Bills'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    ৳3,450 {isBangla ? 'পেমেন্ট বাকি' : 'payment due'}
                  </p>
                </div>
                <Button size="sm" className="rounded-full">
                  {isBangla ? 'পরিশোধ' : 'Pay All'}
                </Button>
              </div>
            </GlassCard>

            <div className="grid grid-cols-4 gap-3">
              {billCategories.map((cat) => (
                <GlassCard key={cat.id} className="flex flex-col items-center py-4 cursor-pointer">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-2 ${cat.color}`}>
                    {typeof cat.icon === 'string' ? (
                      <span className="text-xl">{cat.icon}</span>
                    ) : (
                      <cat.icon className="w-5 h-5" />
                    )}
                  </div>
                  <span className="text-xs font-medium text-foreground">{cat.label[language]}</span>
                </GlassCard>
              ))}
            </div>

            <GlassCard className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-foreground">
                  {isBangla ? 'সাম্প্রতিক বিল' : 'Recent Bills'}
                </h4>
              </div>
              <div className="space-y-3">
                {[
                  { name: 'DESCO', amount: 1850, due: '20 Jan', paid: false },
                  { name: 'Titas Gas', amount: 850, due: '25 Jan', paid: false },
                  { name: 'WASA', amount: 750, due: '28 Jan', paid: true },
                ].map((bill, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                    <div>
                      <p className="font-medium text-foreground text-sm">{bill.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {isBangla ? 'বাকি:' : 'Due:'} {bill.due}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-foreground">৳{formatAmount(bill.amount)}</p>
                      {bill.paid ? (
                        <Badge variant="secondary" className="text-xs">{isBangla ? 'পরিশোধিত' : 'Paid'}</Badge>
                      ) : (
                        <Button size="sm" variant="outline" className="h-6 text-xs rounded-full">
                          {isBangla ? 'পেমেন্ট' : 'Pay'}
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </TabsContent>

          {/* Savings Tab */}
          <TabsContent value="savings" className="mt-4 space-y-4">
            <GlassCard className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
              <div className="flex items-center gap-3">
                <Target className="w-10 h-10 text-primary p-2 bg-primary/20 rounded-xl" />
                <div className="flex-1">
                  <p className="font-medium text-foreground">
                    {isBangla ? 'মোট সঞ্চয়' : 'Total Savings'}
                  </p>
                  <p className="text-2xl font-bold text-primary">
                    ৳{formatAmount(250000)}
                  </p>
                </div>
                <Button size="sm" className="rounded-full">
                  <PiggyBank className="w-4 h-4 mr-1" />
                  {isBangla ? 'যোগ' : 'Add'}
                </Button>
              </div>
            </GlassCard>

            <h3 className="font-semibold text-foreground">
              {isBangla ? 'সঞ্চয় লক্ষ্য' : 'Savings Goals'}
            </h3>

            {savingsGoals.map((goal) => {
              const progress = (goal.current / goal.target) * 100;
              return (
                <GlassCard key={goal.id} className="p-4">
                  <div className="flex items-center gap-4 mb-3">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${goal.color} flex items-center justify-center text-xl`}>
                      {goal.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground">
                        {goal.title[language]}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        ৳{formatAmount(goal.current)} / ৳{formatAmount(goal.target)}
                      </p>
                    </div>
                    <span className="text-lg font-bold text-primary">{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </GlassCard>
              );
            })}
          </TabsContent>

          {/* Offers Tab */}
          <TabsContent value="offers" className="mt-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">
                {isBangla ? 'আপনার জন্য অফার' : 'Offers for You'}
              </h3>
              <Badge variant="secondary">
                <Gift className="w-3 h-3 mr-1" />
                {offers.length} {isBangla ? 'টি' : ''}
              </Badge>
            </div>

            {offers.map((offer) => (
              <GlassCard key={offer.id} className="p-4 border-l-4 border-l-accent">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-foreground text-lg">
                    {offer.title[language]}
                  </h4>
                  <Badge variant="outline" className="font-mono">
                    {offer.code}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  {isBangla ? 'এ' : 'at'} {offer.merchant[language]}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {isBangla ? 'মেয়াদ:' : 'Expires:'} {offer.expires}
                  </span>
                  <Button size="sm" variant="outline" className="rounded-full">
                    {isBangla ? 'ব্যবহার করুন' : 'Use Now'}
                  </Button>
                </div>
              </GlassCard>
            ))}

            {/* QR Code Promo */}
            <GlassCard className="bg-gradient-to-r from-secondary/10 to-secondary/5 border-secondary/20">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                  <QrCode className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">
                    {isBangla ? 'QR দিয়ে পেমেন্ট করুন' : 'Pay with QR'}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {isBangla ? 'দ্রুত ও নিরাপদ' : 'Fast & Secure'}
                  </p>
                </div>
                <Button size="sm" className="rounded-full">
                  {isBangla ? 'স্ক্যান' : 'Scan'}
                </Button>
              </div>
            </GlassCard>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Finance;

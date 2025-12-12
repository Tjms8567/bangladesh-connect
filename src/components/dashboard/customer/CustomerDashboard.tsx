import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ImpactCard } from '../shared/ImpactCard';
import { QuickAction } from '../shared/QuickAction';
import { GlassCard } from '@/components/ui/GlassCard';
import { Logo } from '@/components/ui/Logo';
import {
  BarChart3,
  ShoppingBag,
  Star,
  History,
  Heart,
  Gift,
  Percent,
  CreditCard,
  Bell,
  TrendingUp,
  Clock,
  Award,
  Sparkles,
} from 'lucide-react';

export const CustomerDashboard: React.FC = () => {
  const { isBangla } = useLanguage();

  const customerData = {
    totalOrders: 45,
    loyaltyPoints: 2340,
    wishlistItems: 8,
    savedAmount: '৳4,560',
    membershipTier: 'Gold',
    activeOffers: 5,
  };

  const recentPurchases = [
    { item: 'Organic Rice', itemBn: 'জৈব চাল', date: 'Dec 8', amount: '৳450', status: 'Delivered' },
    { item: 'Handloom Saree', itemBn: 'হাতে বোনা শাড়ি', date: 'Dec 5', amount: '৳2,800', status: 'Delivered' },
    { item: 'Mango Pickle', itemBn: 'আমের আচার', date: 'Dec 1', amount: '৳180', status: 'Delivered' },
  ];

  const offers = [
    { title: '20% Off Electronics', titleBn: 'ইলেকট্রনিক্সে ২০% ছাড়', code: 'ELEC20', expires: '3 days' },
    { title: 'Free Delivery', titleBn: 'ফ্রি ডেলিভারি', code: 'FREEBD', expires: '5 days' },
    { title: 'Buy 1 Get 1', titleBn: '১টি কিনলে ১টি ফ্রি', code: 'BOGO', expires: '7 days' },
  ];

  const favoriteCategories = [
    { name: 'Fashion', nameBn: 'ফ্যাশন', icon: '👗', purchases: 15 },
    { name: 'Food', nameBn: 'খাবার', icon: '🍚', purchases: 22 },
    { name: 'Electronics', nameBn: 'ইলেকট্রনিক্স', icon: '📱', purchases: 8 },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header with Logo */}
      <div className="flex items-center gap-4">
        <Logo size="md" animation="pulse" showGlow />
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            📊 {isBangla ? 'গ্রাহক ড্যাশবোর্ড' : 'Customer Dashboard'}
          </h1>
          <p className="text-muted-foreground">{isBangla ? 'ব্যক্তিগত শপিং বিশ্লেষণ' : 'Personal Shopping Analytics'}</p>
        </div>
      </div>

      {/* Membership Banner */}
      <GlassCard className="p-4 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border-amber-500/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center">
              <Award className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-foreground flex items-center gap-2">
                {customerData.membershipTier} {isBangla ? 'সদস্য' : 'Member'}
                <Sparkles className="w-4 h-4 text-amber-500" />
              </h3>
              <p className="text-sm text-muted-foreground">
                {isBangla ? `${customerData.loyaltyPoints} পয়েন্ট অর্জিত` : `${customerData.loyaltyPoints} points earned`}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-amber-600">{customerData.loyaltyPoints}</p>
            <p className="text-xs text-muted-foreground">{isBangla ? 'পয়েন্ট' : 'Points'}</p>
          </div>
        </div>
      </GlassCard>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <ImpactCard
          title={isBangla ? 'মোট অর্ডার' : 'Total Orders'}
          value={customerData.totalOrders}
          icon={<ShoppingBag className="w-5 h-5 text-white" />}
          gradient="from-indigo-500 to-blue-600"
          trend={{ value: 8, isPositive: true }}
        />
        <ImpactCard
          title={isBangla ? 'সঞ্চিত টাকা' : 'Saved Amount'}
          value={customerData.savedAmount}
          icon={<Percent className="w-5 h-5 text-white" />}
          gradient="from-emerald-500 to-green-600"
        />
      </div>

      {/* Active Offers */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Gift className="w-5 h-5 text-primary" />
          {isBangla ? 'আপনার অফার' : 'Your Offers'}
        </h2>
        <div className="space-y-2">
          {offers.map((offer, i) => (
            <GlassCard key={i} className="p-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                  <Percent className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground text-sm">
                    {isBangla ? offer.titleBn : offer.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs font-mono bg-muted px-2 py-0.5 rounded">{offer.code}</span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {offer.expires}
                    </span>
                  </div>
                </div>
              </div>
              <button className="text-xs font-medium text-primary hover:underline">
                {isBangla ? 'ব্যবহার করুন' : 'Use'}
              </button>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Favorite Categories */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Heart className="w-5 h-5 text-primary" />
          {isBangla ? 'প্রিয় ক্যাটাগরি' : 'Favorite Categories'}
        </h2>
        <div className="grid grid-cols-3 gap-3">
          {favoriteCategories.map((cat, i) => (
            <GlassCard key={i} className="p-4 text-center">
              <span className="text-3xl">{cat.icon}</span>
              <p className="font-medium text-foreground text-sm mt-2">
                {isBangla ? cat.nameBn : cat.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {cat.purchases} {isBangla ? 'ক্রয়' : 'purchases'}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Recent Purchases */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <History className="w-5 h-5 text-primary" />
          {isBangla ? 'সাম্প্রতিক ক্রয়' : 'Recent Purchases'}
        </h2>
        <div className="space-y-2">
          {recentPurchases.map((purchase, i) => (
            <GlassCard key={i} className="p-3 flex items-center justify-between">
              <div>
                <h4 className="font-medium text-foreground text-sm">
                  {isBangla ? purchase.itemBn : purchase.item}
                </h4>
                <p className="text-xs text-muted-foreground">{purchase.date}</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-foreground">{purchase.amount}</p>
                <span className="text-xs text-success">{purchase.status}</span>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Spending Insights */}
      <GlassCard className="p-4">
        <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-primary" />
          {isBangla ? 'খরচের বিশ্লেষণ' : 'Spending Insights'}
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{isBangla ? 'এই মাস' : 'This Month'}</span>
            <span className="font-bold text-foreground">৳8,450</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full w-3/4 bg-gradient-to-r from-primary to-secondary rounded-full" />
          </div>
          <div className="flex items-center gap-2 text-sm">
            <TrendingUp className="w-4 h-4 text-success" />
            <span className="text-success">{isBangla ? 'গত মাসের চেয়ে ১২% কম' : '12% less than last month'}</span>
          </div>
        </div>
      </GlassCard>

      {/* Quick Actions */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground">
          {isBangla ? 'দ্রুত পদক্ষেপ' : 'Quick Actions'}
        </h2>
        <div className="space-y-2">
          <QuickAction
            title={isBangla ? 'অর্ডার ইতিহাস' : 'Order History'}
            description={isBangla ? 'সব অর্ডার দেখুন' : 'View all orders'}
            icon={<History className="w-6 h-6 text-blue-500" />}
            gradient="from-blue-50 to-indigo-50"
          />
          <QuickAction
            title={isBangla ? 'উইশলিস্ট' : 'Wishlist'}
            description={isBangla ? `${customerData.wishlistItems} আইটেম সংরক্ষিত` : `${customerData.wishlistItems} items saved`}
            icon={<Heart className="w-6 h-6 text-rose-500" />}
            gradient="from-rose-50 to-pink-50"
            badge={customerData.wishlistItems.toString()}
          />
          <QuickAction
            title={isBangla ? 'পেমেন্ট মেথড' : 'Payment Methods'}
            description={isBangla ? 'কার্ড ও ওয়ালেট ম্যানেজ' : 'Manage cards & wallets'}
            icon={<CreditCard className="w-6 h-6 text-emerald-500" />}
            gradient="from-emerald-50 to-green-50"
          />
        </div>
      </div>
    </div>
  );
};

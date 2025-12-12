import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ImpactCard } from '../shared/ImpactCard';
import { QuickAction } from '../shared/QuickAction';
import { GlassCard } from '@/components/ui/GlassCard';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/button';
import {
  ShoppingCart,
  Package,
  Store,
  TrendingUp,
  Search,
  Heart,
  Star,
  Truck,
  CreditCard,
  Tag,
  Filter,
  Grid,
  List,
  MapPin,
  Clock,
  ShoppingBag,
  Plus,
} from 'lucide-react';

export const MarketplaceDashboard: React.FC = () => {
  const { isBangla } = useLanguage();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const marketplaceData = {
    totalOrders: 234,
    totalProducts: 1250,
    pendingDeliveries: 3,
    wishlistItems: 12,
    cartItems: 5,
    savedAmount: '৳2,340',
  };

  const featuredProducts = [
    { name: 'Organic Hilsa Fish', nameBn: 'জৈব ইলিশ মাছ', price: '৳850', originalPrice: '৳1000', rating: 4.8, sold: 234, image: '🐟' },
    { name: 'Handloom Saree', nameBn: 'হাতে বোনা শাড়ি', price: '৳2,500', originalPrice: '৳3000', rating: 4.9, sold: 156, image: '👗' },
    { name: 'Mango Pickle', nameBn: 'আমের আচার', price: '৳180', originalPrice: '৳220', rating: 4.7, sold: 567, image: '🥫' },
    { name: 'Nakshi Kantha', nameBn: 'নকশি কাঁথা', price: '৳1,800', originalPrice: '৳2200', rating: 5.0, sold: 89, image: '🧵' },
  ];

  const categories = [
    { name: 'Food & Grocery', nameBn: 'খাবার ও মুদি', icon: '🍚', count: 450 },
    { name: 'Fashion', nameBn: 'ফ্যাশন', icon: '👕', count: 320 },
    { name: 'Electronics', nameBn: 'ইলেকট্রনিক্স', icon: '📱', count: 180 },
    { name: 'Home & Garden', nameBn: 'ঘর ও বাগান', icon: '🏡', count: 210 },
    { name: 'Health', nameBn: 'স্বাস্থ্য', icon: '💊', count: 150 },
    { name: 'Handicrafts', nameBn: 'হস্তশিল্প', icon: '🎨', count: 95 },
  ];

  const recentOrders = [
    { id: 'ORD-2024-1234', item: 'Organic Rice', itemBn: 'জৈব চাল', status: 'Delivered', statusBn: 'ডেলিভারি হয়েছে', date: 'Dec 8', amount: '৳450' },
    { id: 'ORD-2024-1233', item: 'Cotton T-Shirt', itemBn: 'সুতির টি-শার্ট', status: 'In Transit', statusBn: 'পথে আছে', date: 'Dec 10', amount: '৳650' },
    { id: 'ORD-2024-1232', item: 'Jamdani Saree', itemBn: 'জামদানি শাড়ি', status: 'Processing', statusBn: 'প্রসেসিং', date: 'Dec 11', amount: '৳4,500' },
  ];

  const localSellers = [
    { name: 'Green Farms BD', nameBn: 'গ্রিন ফার্মস বিডি', rating: 4.9, products: 45, location: 'Dhaka' },
    { name: 'Artisan Crafts', nameBn: 'আর্টিসান ক্রাফটস', rating: 4.8, products: 32, location: 'Rajshahi' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header with Logo */}
      <div className="flex items-center gap-4">
        <Logo size="md" animation="pulse" showGlow />
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            🛒 {isBangla ? 'ই-মার্কেটপ্লেস' : 'e-Marketplace'}
          </h1>
          <p className="text-muted-foreground">{isBangla ? 'ডিজিটাল কমার্স প্ল্যাটফর্ম' : 'Digital Commerce Platform'}</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          placeholder={isBangla ? 'পণ্য খুঁজুন...' : 'Search products...'}
          className="w-full pl-12 pr-12 py-3 rounded-2xl bg-muted border border-border focus:border-primary focus:outline-none text-foreground"
        />
        <Button variant="ghost" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2">
          <Filter className="w-5 h-5" />
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <ImpactCard
          title={isBangla ? 'মোট অর্ডার' : 'Total Orders'}
          value={marketplaceData.totalOrders}
          icon={<ShoppingCart className="w-5 h-5 text-white" />}
          gradient="from-emerald-500 to-teal-600"
          trend={{ value: 15, isPositive: true }}
        />
        <ImpactCard
          title={isBangla ? 'কার্টে আইটেম' : 'Cart Items'}
          value={marketplaceData.cartItems}
          icon={<ShoppingBag className="w-5 h-5 text-white" />}
          gradient="from-blue-500 to-indigo-600"
        />
      </div>

      {/* Categories */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground">
          {isBangla ? 'ক্যাটাগরি' : 'Categories'}
        </h2>
        <div className="grid grid-cols-3 gap-2">
          {categories.map((cat, i) => (
            <button
              key={i}
              className="p-3 rounded-2xl bg-card border border-border hover:border-primary transition-colors text-center"
            >
              <span className="text-2xl">{cat.icon}</span>
              <p className="text-xs font-medium text-foreground mt-1">
                {isBangla ? cat.nameBn : cat.name}
              </p>
              <p className="text-[10px] text-muted-foreground">{cat.count}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Tag className="w-5 h-5 text-primary" />
            {isBangla ? 'বিশেষ অফার' : 'Special Offers'}
          </h2>
          <div className="flex items-center gap-1">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="icon"
              className="h-8 w-8"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="icon"
              className="h-8 w-8"
              onClick={() => setViewMode('list')}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div className={viewMode === 'grid' ? 'grid grid-cols-2 gap-3' : 'space-y-3'}>
          {featuredProducts.map((product, i) => (
            <GlassCard key={i} className={`p-3 ${viewMode === 'list' ? 'flex items-center gap-4' : ''}`}>
              <div className={`${viewMode === 'grid' ? 'w-full h-24' : 'w-16 h-16'} rounded-xl bg-muted flex items-center justify-center text-3xl`}>
                {product.image}
              </div>
              <div className={`${viewMode === 'grid' ? 'mt-2' : 'flex-1'}`}>
                <h4 className="font-medium text-foreground text-sm line-clamp-1">
                  {isBangla ? product.nameBn : product.name}
                </h4>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="w-3 h-3 text-amber-500 fill-current" />
                  <span className="text-xs text-muted-foreground">{product.rating}</span>
                  <span className="text-xs text-muted-foreground">• {product.sold} sold</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div>
                    <span className="font-bold text-primary">{product.price}</span>
                    <span className="text-xs text-muted-foreground line-through ml-1">{product.originalPrice}</span>
                  </div>
                  <Button size="icon" variant="ghost" className="h-8 w-8 text-rose-500">
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Recent Orders */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          {isBangla ? 'সাম্প্রতিক অর্ডার' : 'Recent Orders'}
        </h2>
        <div className="space-y-2">
          {recentOrders.map((order, i) => (
            <GlassCard key={i} className="p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Package className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground text-sm">
                      {isBangla ? order.itemBn : order.item}
                    </h4>
                    <p className="text-xs text-muted-foreground">{order.id}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    order.status === 'Delivered' ? 'bg-success/20 text-success' :
                    order.status === 'In Transit' ? 'bg-warning/20 text-warning' :
                    'bg-blue-500/20 text-blue-500'
                  }`}>
                    {isBangla ? order.statusBn : order.status}
                  </span>
                  <p className="text-sm font-medium text-foreground mt-1">{order.amount}</p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Local Sellers */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Store className="w-5 h-5 text-primary" />
          {isBangla ? 'স্থানীয় বিক্রেতা' : 'Local Sellers'}
        </h2>
        <div className="space-y-2">
          {localSellers.map((seller, i) => (
            <GlassCard key={i} className="p-4 flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-xl font-bold">
                {(isBangla ? seller.nameBn : seller.name).charAt(0)}
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-foreground">
                  {isBangla ? seller.nameBn : seller.name}
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-amber-500 fill-current" />
                    <span className="text-xs text-muted-foreground">{seller.rating}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">{seller.products} products</span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    {seller.location}
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm" className="rounded-full">
                {isBangla ? 'দেখুন' : 'View'}
              </Button>
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
            title={isBangla ? 'পণ্য যোগ করুন' : 'Add Product'}
            description={isBangla ? 'আপনার পণ্য বিক্রি করুন' : 'Sell your products'}
            icon={<Plus className="w-6 h-6 text-blue-500" />}
            gradient="from-blue-50 to-indigo-50"
          />
          <QuickAction
            title={isBangla ? 'দোকান দেখুন' : 'View Store'}
            description={isBangla ? 'আপনার দোকান ম্যানেজ করুন' : 'Manage your store'}
            icon={<Store className="w-6 h-6 text-purple-500" />}
            gradient="from-purple-50 to-violet-50"
          />
          <QuickAction
            title={isBangla ? 'ট্র্যাক ডেলিভারি' : 'Track Delivery'}
            description={isBangla ? `${marketplaceData.pendingDeliveries} পেন্ডিং` : `${marketplaceData.pendingDeliveries} pending`}
            icon={<Truck className="w-6 h-6 text-emerald-500" />}
            gradient="from-emerald-50 to-green-50"
            badge={marketplaceData.pendingDeliveries.toString()}
          />
        </div>
      </div>
    </div>
  );
};

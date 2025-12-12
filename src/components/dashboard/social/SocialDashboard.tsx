import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ImpactCard } from '../shared/ImpactCard';
import { QuickAction } from '../shared/QuickAction';
import { GlassCard } from '@/components/ui/GlassCard';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/button';
import {
  MessageCircle,
  Users,
  Heart,
  Image,
  Send,
  Share2,
  Bell,
  Bookmark,
  MoreHorizontal,
  Camera,
  Video,
  MapPin,
  Smile,
  TrendingUp,
  Hash,
} from 'lucide-react';

export const SocialDashboard: React.FC = () => {
  const { isBangla } = useLanguage();
  const [newPost, setNewPost] = useState('');

  const socialData = {
    friends: 234,
    posts: 56,
    likes: 1250,
    groups: 8,
    unreadMessages: 5,
    notifications: 12,
  };

  const posts = [
    {
      id: 1,
      author: 'রহিম আহমেদ',
      authorEn: 'Rahim Ahmed',
      avatar: '👨‍💼',
      time: '2h',
      content: 'আজ আমাদের গ্রামে ডিজিটাল সেবা কেন্দ্র উদ্বোধন হলো! বাংলাদেশ ২.০ এর মাধ্যমে আমরা সবাই এখন সহজে সরকারি সেবা পাচ্ছি। 🇧🇩',
      contentEn: 'Today a digital service center was inaugurated in our village! Through Bangladesh 2.0, we can now easily access government services. 🇧🇩',
      likes: 45,
      comments: 12,
      shares: 5,
      image: true,
    },
    {
      id: 2,
      author: 'ফাতিমা বেগম',
      authorEn: 'Fatima Begum',
      avatar: '👩‍🏫',
      time: '4h',
      content: 'আমার ছেলে অনলাইনে কোর্স শেষ করে সার্টিফিকেট পেয়েছে! শিক্ষা এখন সবার হাতের মুঠোয়। #DigitalBangladesh',
      contentEn: 'My son completed an online course and received a certificate! Education is now accessible to everyone. #DigitalBangladesh',
      likes: 89,
      comments: 24,
      shares: 15,
    },
    {
      id: 3,
      author: 'করিম উদ্দিন',
      authorEn: 'Karim Uddin',
      avatar: '👨‍🌾',
      time: '6h',
      content: 'কৃষি ঋণ অনলাইনে আবেদন করে ৩ দিনেই পেয়ে গেছি! আগে মাসের পর মাস লাগতো। ধন্যবাদ বাংলাদেশ ২.০! 🌾',
      contentEn: 'Applied for agricultural loan online and got it in just 3 days! It used to take months before. Thank you Bangladesh 2.0! 🌾',
      likes: 156,
      comments: 45,
      shares: 32,
    },
  ];

  const trendingTopics = [
    { tag: 'DigitalBangladesh', count: '12.5K' },
    { tag: 'বাংলাদেশ২০', count: '8.2K' },
    { tag: 'SmartVillage', count: '5.1K' },
    { tag: 'YouthEmpowerment', count: '3.8K' },
  ];

  const groups = [
    { name: 'Bangladesh Developers', nameBn: 'বাংলাদেশ ডেভেলপার্স', members: 1250, icon: '💻' },
    { name: 'Farmers Community', nameBn: 'কৃষক সম্প্রদায়', members: 890, icon: '🌾' },
    { name: 'Women Entrepreneurs', nameBn: 'নারী উদ্যোক্তা', members: 567, icon: '💼' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header with Logo */}
      <div className="flex items-center gap-4">
        <Logo size="md" animation="pulse" showGlow />
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            💬 {isBangla ? 'বাংলাদেশ কানেক্ট' : 'Bangladesh Connect'}
          </h1>
          <p className="text-muted-foreground">{isBangla ? 'সামাজিক প্ল্যাটফর্ম' : 'Social Platform'}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <ImpactCard
          title={isBangla ? 'বন্ধু' : 'Friends'}
          value={socialData.friends}
          icon={<Users className="w-5 h-5 text-white" />}
          gradient="from-blue-500 to-indigo-600"
          trend={{ value: 12, isPositive: true }}
        />
        <ImpactCard
          title={isBangla ? 'পোস্ট' : 'Posts'}
          value={socialData.posts}
          icon={<Image className="w-5 h-5 text-white" />}
          gradient="from-pink-500 to-rose-600"
        />
      </div>

      {/* Create Post */}
      <GlassCard className="p-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">
            U
          </div>
          <div className="flex-1">
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder={isBangla ? 'আপনার মনে কী?' : "What's on your mind?"}
              className="w-full bg-transparent border-none resize-none focus:outline-none text-foreground placeholder:text-muted-foreground"
              rows={2}
            />
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  <Camera className="w-4 h-4 mr-1" />
                  {isBangla ? 'ছবি' : 'Photo'}
                </Button>
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  <Video className="w-4 h-4 mr-1" />
                  {isBangla ? 'ভিডিও' : 'Video'}
                </Button>
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  <MapPin className="w-4 h-4 mr-1" />
                  {isBangla ? 'লোকেশন' : 'Location'}
                </Button>
              </div>
              <Button size="sm" className="rounded-full">
                <Send className="w-4 h-4 mr-1" />
                {isBangla ? 'পোস্ট' : 'Post'}
              </Button>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Trending Topics */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          {isBangla ? 'ট্রেন্ডিং' : 'Trending'}
        </h2>
        <div className="flex flex-wrap gap-2">
          {trendingTopics.map((topic, i) => (
            <button
              key={i}
              className="px-3 py-1.5 rounded-full bg-muted hover:bg-muted/80 transition-colors flex items-center gap-1"
            >
              <Hash className="w-3 h-3 text-primary" />
              <span className="text-sm font-medium text-foreground">{topic.tag}</span>
              <span className="text-xs text-muted-foreground">{topic.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Feed */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          {isBangla ? 'নিউজ ফিড' : 'News Feed'}
        </h2>
        {posts.map((post) => (
          <GlassCard key={post.id} className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-xl">
                {post.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-foreground">
                      {isBangla ? post.author : post.authorEn}
                    </h4>
                    <p className="text-xs text-muted-foreground">{post.time} ago</p>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
                <p className="mt-2 text-foreground text-sm leading-relaxed">
                  {isBangla ? post.content : post.contentEn}
                </p>
                {post.image && (
                  <div className="mt-3 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 h-40 flex items-center justify-center">
                    <Camera className="w-8 h-8 text-muted-foreground" />
                  </div>
                )}
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/50">
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-rose-500">
                    <Heart className="w-4 h-4 mr-1" />
                    {post.likes}
                  </Button>
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    {post.comments}
                  </Button>
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    <Share2 className="w-4 h-4 mr-1" />
                    {post.shares}
                  </Button>
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    <Bookmark className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Groups */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" />
          {isBangla ? 'আমার গ্রুপ' : 'My Groups'}
        </h2>
        <div className="space-y-2">
          {groups.map((group, i) => (
            <GlassCard key={i} className="p-3 flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-2xl">
                {group.icon}
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-foreground text-sm">
                  {isBangla ? group.nameBn : group.name}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {group.members.toLocaleString()} {isBangla ? 'সদস্য' : 'members'}
                </p>
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
            title={isBangla ? 'মেসেজ' : 'Messages'}
            description={isBangla ? `${socialData.unreadMessages} অপঠিত` : `${socialData.unreadMessages} unread`}
            icon={<MessageCircle className="w-6 h-6 text-blue-500" />}
            gradient="from-blue-50 to-indigo-50"
            badge={socialData.unreadMessages.toString()}
          />
          <QuickAction
            title={isBangla ? 'নোটিফিকেশন' : 'Notifications'}
            description={isBangla ? `${socialData.notifications} নতুন` : `${socialData.notifications} new`}
            icon={<Bell className="w-6 h-6 text-amber-500" />}
            gradient="from-amber-50 to-yellow-50"
            badge={socialData.notifications.toString()}
          />
          <QuickAction
            title={isBangla ? 'ইভেন্ট' : 'Events'}
            description={isBangla ? 'আসন্ন ইভেন্ট দেখুন' : 'View upcoming events'}
            icon={<Users className="w-6 h-6 text-purple-500" />}
            gradient="from-purple-50 to-violet-50"
          />
        </div>
      </div>
    </div>
  );
};

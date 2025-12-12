import React, { useState } from 'react';
import { 
  Heart, MessageCircle, Share2, Plus, Award, HelpCircle, Sparkles, 
  Users, Trophy, MapPin, Calendar, Bell, Search, TrendingUp,
  ThumbsUp, MessageSquare, Bookmark, MoreHorizontal, Image, Video,
  Megaphone, Flag, Star, ChevronRight
} from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import { PaddyIcon } from '@/components/icons/PaddyIcon';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Post {
  id: string;
  author: {
    name: string;
    nameBn: string;
    avatar: string;
    district: string;
    level: string;
    verified: boolean;
  };
  content: string;
  contentBn: string;
  category: 'achievement' | 'question' | 'showcase' | 'discussion';
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  isBookmarked: boolean;
  createdAt: string;
  media?: string;
}

const mockPosts: Post[] = [
  {
    id: '1',
    author: { name: 'Rahim Ahmed', nameBn: 'রহিম আহমেদ', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100', district: 'Dhaka', level: 'Gold', verified: true },
    content: 'Just completed my AI & Machine Learning course on Bangladesh 2.0! 🎉 Ready for the future! The course was amazing and I learned so much about neural networks and deep learning.',
    contentBn: 'বাংলাদেশ ২.০ তে AI ও মেশিন লার্নিং কোর্স সম্পন্ন করলাম! 🎉 ভবিষ্যতের জন্য প্রস্তুত! কোর্সটি অসাধারণ ছিল এবং নিউরাল নেটওয়ার্ক ও ডিপ লার্নিং সম্পর্কে অনেক কিছু শিখলাম।',
    category: 'achievement',
    likes: 234,
    comments: 45,
    shares: 12,
    isLiked: false,
    isBookmarked: false,
    createdAt: '2h ago',
    media: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400',
  },
  {
    id: '2',
    author: { name: 'Fatima Begum', nameBn: 'ফাতিমা বেগম', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100', district: 'Chittagong', level: 'Silver', verified: false },
    content: 'How do I apply for the digital entrepreneurship loan through BanglaPay? Has anyone tried it?',
    contentBn: 'বাংলাপে এর মাধ্যমে ডিজিটাল উদ্যোক্তা ঋণের জন্য কিভাবে আবেদন করব? কেউ কি চেষ্টা করেছেন?',
    category: 'question',
    likes: 56,
    comments: 23,
    shares: 5,
    isLiked: true,
    isBookmarked: true,
    createdAt: '4h ago',
  },
  {
    id: '3',
    author: { name: 'Karim Mia', nameBn: 'করিম মিয়া', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100', district: 'Sylhet', level: 'Bronze', verified: true },
    content: 'My small tea business got 50 new customers this month through the app marketplace! Thank you BD 2.0! From village to digital success. 🍵',
    contentBn: 'এই মাসে অ্যাপ মার্কেটপ্লেসের মাধ্যমে আমার ছোট চা ব্যবসায় ৫০ জন নতুন গ্রাহক পেয়েছি! ধন্যবাদ BD 2.0! গ্রাম থেকে ডিজিটাল সাফল্য। 🍵',
    category: 'showcase',
    likes: 445,
    comments: 89,
    shares: 34,
    isLiked: false,
    isBookmarked: false,
    createdAt: '1d ago',
    media: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400',
  },
];

const categoryConfig = {
  achievement: { icon: Award, label: { en: 'Achievement', bn: 'অর্জন' }, color: 'text-warning bg-warning/10' },
  question: { icon: HelpCircle, label: { en: 'Question', bn: 'প্রশ্ন' }, color: 'text-secondary bg-secondary/10' },
  showcase: { icon: Sparkles, label: { en: 'Showcase', bn: 'প্রদর্শনী' }, color: 'text-primary bg-primary/10' },
  discussion: { icon: MessageSquare, label: { en: 'Discussion', bn: 'আলোচনা' }, color: 'text-purple-500 bg-purple-500/10' },
};

const events = [
  {
    id: 1,
    title: { bn: 'ডিজিটাল বাংলাদেশ সামিট', en: 'Digital Bangladesh Summit' },
    date: '25 Jan 2024',
    location: { bn: 'ঢাকা', en: 'Dhaka' },
    attendees: 1250,
    type: 'Conference',
  },
  {
    id: 2,
    title: { bn: 'স্টার্টআপ পিচ নাইট', en: 'Startup Pitch Night' },
    date: '28 Jan 2024',
    location: { bn: 'চট্টগ্রাম', en: 'Chittagong' },
    attendees: 350,
    type: 'Meetup',
  },
];

const groups = [
  {
    id: 1,
    name: { bn: 'ওয়েব ডেভেলপার্স বাংলাদেশ', en: 'Web Developers Bangladesh' },
    members: 12500,
    posts: '50+ daily',
    icon: '💻',
  },
  {
    id: 2,
    name: { bn: 'ডিজিটাল মার্কেটার্স', en: 'Digital Marketers BD' },
    members: 8900,
    posts: '30+ daily',
    icon: '📱',
  },
  {
    id: 3,
    name: { bn: 'স্বাস্থ্য সচেতনতা', en: 'Health Awareness' },
    members: 15600,
    posts: '20+ daily',
    icon: '🏥',
  },
];

const topContributors = [
  { rank: 1, name: { bn: 'ঢাকা', en: 'Dhaka' }, points: '125K', avatar: '🏙️' },
  { rank: 2, name: { bn: 'চট্টগ্রাম', en: 'Chittagong' }, points: '98K', avatar: '⚓' },
  { rank: 3, name: { bn: 'সিলেট', en: 'Sylhet' }, points: '76K', avatar: '🍵' },
  { rank: 4, name: { bn: 'রাজশাহী', en: 'Rajshahi' }, points: '65K', avatar: '🥭' },
];

const Community: React.FC = () => {
  const { isBangla, language } = useLanguage();
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [activeTab, setActiveTab] = useState('feed');
  const [activeCategory, setActiveCategory] = useState<'all' | 'achievement' | 'question' | 'showcase' | 'discussion'>('all');

  const toggleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const toggleBookmark = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isBookmarked: !post.isBookmarked }
        : post
    ));
  };

  const filteredPosts = activeCategory === 'all' 
    ? posts 
    : posts.filter(p => p.category === activeCategory);

  const categories = [
    { key: 'all', label: { en: 'All', bn: 'সব' } },
    { key: 'achievement', label: { en: 'Achievements', bn: 'অর্জন' } },
    { key: 'question', label: { en: 'Questions', bn: 'প্রশ্ন' } },
    { key: 'showcase', label: { en: 'Showcase', bn: 'প্রদর্শনী' } },
  ];

  return (
    <AppLayout>
      <div className="px-4 py-4 space-y-6 pb-24">
        {/* Hero Header */}
        <section className="animate-fade-in">
          <GlassCard variant="elevated" className="p-0 overflow-hidden">
            <div className="bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 p-6 text-white relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                      <PaddyIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold">
                        {isBangla ? 'কমিউনিটি' : 'Community'}
                      </h1>
                      <p className="text-sm text-white/80">
                        {isBangla ? 'একসাথে এগিয়ে যাই' : 'Growing together'}
                      </p>
                    </div>
                  </div>
                  <Button size="icon" className="rounded-full bg-white/20 hover:bg-white/30 text-white border-0">
                    <Bell className="w-5 h-5" />
                  </Button>
                </div>

                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
                  <Input
                    placeholder={isBangla ? 'কমিউনিটিতে খুঁজুন...' : 'Search community...'}
                    className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-white/60"
                  />
                </div>
              </div>
            </div>
          </GlassCard>
        </section>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="animate-fade-in stagger-1">
          <TabsList className="w-full glass-card p-1">
            <TabsTrigger value="feed" className="flex-1 text-xs sm:text-sm">
              {isBangla ? 'ফিড' : 'Feed'}
            </TabsTrigger>
            <TabsTrigger value="events" className="flex-1 text-xs sm:text-sm">
              {isBangla ? 'ইভেন্ট' : 'Events'}
            </TabsTrigger>
            <TabsTrigger value="groups" className="flex-1 text-xs sm:text-sm">
              {isBangla ? 'গ্রুপ' : 'Groups'}
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="flex-1 text-xs sm:text-sm">
              {isBangla ? 'র‍্যাংক' : 'Rank'}
            </TabsTrigger>
          </TabsList>

          {/* Feed Tab */}
          <TabsContent value="feed" className="mt-4 space-y-4">
            {/* Create Post */}
            <GlassCard className="p-4">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-primary/10 text-primary">R</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Input
                    placeholder={isBangla ? 'কিছু শেয়ার করুন...' : 'Share something...'}
                    className="bg-muted/50 border-0"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    <Image className="w-4 h-4 mr-1" />
                    {isBangla ? 'ছবি' : 'Photo'}
                  </Button>
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    <Video className="w-4 h-4 mr-1" />
                    {isBangla ? 'ভিডিও' : 'Video'}
                  </Button>
                </div>
                <Button size="sm" className="rounded-full">
                  {isBangla ? 'পোস্ট' : 'Post'}
                </Button>
              </div>
            </GlassCard>

            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
              {categories.map((cat) => (
                <Button
                  key={cat.key}
                  variant={activeCategory === cat.key ? 'default' : 'outline'}
                  size="sm"
                  className="rounded-full whitespace-nowrap"
                  onClick={() => setActiveCategory(cat.key as typeof activeCategory)}
                >
                  {isBangla ? cat.label.bn : cat.label.en}
                </Button>
              ))}
            </div>

            {/* Posts Feed */}
            {filteredPosts.map((post) => {
              const CategoryIcon = categoryConfig[post.category].icon;
              return (
                <GlassCard key={post.id} className="p-4">
                  {/* Post Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={post.author.avatar} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {post.author.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <p className="font-medium text-foreground">
                            {isBangla ? post.author.nameBn : post.author.name}
                          </p>
                          {post.author.verified && (
                            <Badge variant="secondary" className="px-1 py-0 text-[10px]">
                              ✓
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {post.author.district} • {post.author.level} • {post.createdAt}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs flex items-center gap-1 ${categoryConfig[post.category].color}`}>
                        <CategoryIcon className="w-3 h-3" />
                        {isBangla ? categoryConfig[post.category].label.bn : categoryConfig[post.category].label.en}
                      </span>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Post Content */}
                  <p className="text-foreground mb-3 leading-relaxed">
                    {isBangla ? post.contentBn : post.content}
                  </p>

                  {/* Post Media */}
                  {post.media && (
                    <div className="rounded-xl overflow-hidden mb-3 -mx-4">
                      <img 
                        src={post.media} 
                        alt="Post media" 
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  )}

                  {/* Post Stats */}
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                    <span>{post.likes} {isBangla ? 'পছন্দ' : 'likes'}</span>
                    <span>
                      {post.comments} {isBangla ? 'মন্তব্য' : 'comments'} • {post.shares} {isBangla ? 'শেয়ার' : 'shares'}
                    </span>
                  </div>

                  {/* Post Actions */}
                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleLike(post.id)}
                      className={post.isLiked ? 'text-destructive' : 'text-muted-foreground'}
                    >
                      <Heart className={`w-4 h-4 mr-1.5 ${post.isLiked ? 'fill-destructive' : ''}`} />
                      {isBangla ? 'পছন্দ' : 'Like'}
                    </Button>
                    <Button variant="ghost" size="sm" className="text-muted-foreground">
                      <MessageCircle className="w-4 h-4 mr-1.5" />
                      {isBangla ? 'মন্তব্য' : 'Comment'}
                    </Button>
                    <Button variant="ghost" size="sm" className="text-muted-foreground">
                      <Share2 className="w-4 h-4 mr-1.5" />
                      {isBangla ? 'শেয়ার' : 'Share'}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleBookmark(post.id)}
                      className={post.isBookmarked ? 'text-primary' : 'text-muted-foreground'}
                    >
                      <Bookmark className={`w-4 h-4 ${post.isBookmarked ? 'fill-primary' : ''}`} />
                    </Button>
                  </div>
                </GlassCard>
              );
            })}
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events" className="mt-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">
                {isBangla ? 'আসন্ন ইভেন্ট' : 'Upcoming Events'}
              </h3>
              <Button variant="ghost" size="sm" className="text-primary">
                <Plus className="w-4 h-4 mr-1" />
                {isBangla ? 'তৈরি করুন' : 'Create'}
              </Button>
            </div>

            {events.map((event) => (
              <GlassCard key={event.id} className="p-4">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <Badge variant="secondary" className="mb-2 text-xs">
                      {event.type}
                    </Badge>
                    <h4 className="font-semibold text-foreground">
                      {event.title[language]}
                    </h4>
                    <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {event.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {event.location[language]}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {event.attendees.toLocaleString()} {isBangla ? 'অংশগ্রহণকারী' : 'attending'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button className="flex-1 rounded-xl">
                    {isBangla ? 'যোগ দিন' : 'Join'}
                  </Button>
                  <Button variant="outline" className="rounded-xl">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </GlassCard>
            ))}
          </TabsContent>

          {/* Groups Tab */}
          <TabsContent value="groups" className="mt-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">
                {isBangla ? 'জনপ্রিয় গ্রুপ' : 'Popular Groups'}
              </h3>
              <Button variant="ghost" size="sm" className="text-primary">
                {isBangla ? 'সব দেখুন' : 'See All'}
              </Button>
            </div>

            {groups.map((group) => (
              <GlassCard key={group.id} className="p-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-muted flex items-center justify-center text-2xl">
                    {group.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">
                      {group.name[language]}
                    </h4>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                      <span>{group.members.toLocaleString()} {isBangla ? 'সদস্য' : 'members'}</span>
                      <span>•</span>
                      <span>{group.posts} {isBangla ? 'পোস্ট' : 'posts'}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="rounded-full">
                    {isBangla ? 'যোগ দিন' : 'Join'}
                  </Button>
                </div>
              </GlassCard>
            ))}
          </TabsContent>

          {/* Leaderboard Tab */}
          <TabsContent value="leaderboard" className="mt-4 space-y-4">
            <GlassCard className="bg-gradient-to-r from-accent/10 to-accent/5 border-accent/20 p-4">
              <div className="flex items-center gap-3">
                <Trophy className="w-10 h-10 text-accent p-2 bg-accent/20 rounded-xl" />
                <div>
                  <p className="font-medium text-foreground">
                    {isBangla ? 'জেলা লিডারবোর্ড' : 'District Leaderboard'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {isBangla ? 'এই সপ্তাহের র‍্যাংকিং' : "This week's ranking"}
                  </p>
                </div>
              </div>
            </GlassCard>

            {topContributors.map((district, index) => (
              <GlassCard 
                key={district.rank} 
                className={`p-4 ${index === 0 ? 'border-accent/50 bg-accent/5' : ''}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    index === 0 ? 'bg-accent text-accent-foreground' :
                    index === 1 ? 'bg-gray-300 text-gray-700' :
                    index === 2 ? 'bg-amber-600 text-white' :
                    'bg-muted text-muted-foreground'
                  }`}>
                    #{district.rank}
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-2xl">
                    {district.avatar}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">
                      {district.name[language]}
                    </h4>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Star className="w-3 h-3 text-accent fill-accent" />
                      <span>{district.points} {isBangla ? 'পয়েন্ট' : 'points'}</span>
                    </div>
                  </div>
                  {index === 0 && (
                    <Badge className="bg-accent text-accent-foreground">
                      <Trophy className="w-3 h-3 mr-1" />
                      #1
                    </Badge>
                  )}
                </div>
              </GlassCard>
            ))}

            <Button variant="outline" className="w-full rounded-xl">
              {isBangla ? 'সম্পূর্ণ লিডারবোর্ড দেখুন' : 'View Full Leaderboard'}
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Community;

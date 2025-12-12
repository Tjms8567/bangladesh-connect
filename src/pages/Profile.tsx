import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Settings, Globe, Moon, Bell, Shield, HelpCircle, LogOut, ChevronRight, TrendingUp } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/hooks/useProfile';
import { achievements } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

const menuItems = [
  { id: 'digitalId', icon: CreditCard, label: { bn: 'ডিজিটাল আইডি', en: 'Digital ID' } },
  { id: 'settings', icon: Settings, label: { bn: 'সেটিংস', en: 'Settings' } },
  { id: 'privacy', icon: Shield, label: { bn: 'গোপনীয়তা', en: 'Privacy' } },
  { id: 'help', icon: HelpCircle, label: { bn: 'সাহায্য', en: 'Help' } },
];

export const Profile: React.FC = () => {
  const { t, language, setLanguage, isBangla } = useLanguage();
  const { user, signOut } = useAuth();
  const { profile } = useProfile();
  const navigate = useNavigate();
  const { toast } = useToast();

  const unlockedCount = achievements.filter(a => a.unlocked).length;

  const displayName = isBangla 
    ? (profile?.full_name_bn || profile?.full_name || 'User') 
    : (profile?.full_name || 'User');

  const handleLogout = async () => {
    await signOut();
    toast({
      title: isBangla ? 'লগআউট সফল' : 'Logged out',
      description: isBangla ? 'আপনি সফলভাবে লগআউট হয়েছেন' : 'You have been logged out successfully',
    });
    navigate('/auth');
  };

  return (
    <AppLayout headerTitle={t('profile.title')}>
      <div className="px-4 py-4 space-y-6">
        {/* Profile Header */}
        <section className="animate-fade-in">
          <GlassCard variant="elevated" className="text-center">
            <Avatar className="w-20 h-20 mx-auto mb-3 ring-4 ring-primary/20">
              <AvatarImage src={profile?.avatar_url || undefined} alt={displayName} />
              <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-white text-2xl font-bold">
                {displayName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-semibold text-foreground">
              {displayName}
            </h2>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
            <div className="flex items-center justify-center gap-2 mt-2">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                {profile?.level || 'Bronze'} Member
              </span>
            </div>
          </GlassCard>
        </section>

        {/* Contribution Stats */}
        <section className="animate-fade-in stagger-1">
          <GlassCard variant="elevated" className="gradient-bd-solid text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold">{t('profile.myContribution')}</h3>
                  <p className="text-white/80 text-sm">
                    {isBangla ? 'বাংলাদেশের উন্নয়নে' : "To Bangladesh's progress"}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">{profile?.points || 0}</div>
                <div className="text-xs text-white/80">{isBangla ? 'পয়েন্ট' : 'Points'}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Progress value={75} className="h-2 flex-1 bg-white/20 [&>div]:bg-white" />
              <span className="text-xs text-white/80">
                {isBangla ? 'পরবর্তী লেভেল পর্যন্ত ২৫০' : '250 to next level'}
              </span>
            </div>
          </GlassCard>
        </section>

        {/* Achievements */}
        <section className="animate-fade-in stagger-2">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-foreground">{t('profile.achievements')}</h3>
            <span className="text-sm text-primary">
              {unlockedCount}/{achievements.length}
            </span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {achievements.map((achievement, index) => (
              <GlassCard
                key={achievement.id}
                className={`flex-shrink-0 w-24 text-center py-4 ${
                  !achievement.unlocked ? 'opacity-50' : ''
                } animate-scale-in stagger-${index + 1}`}
              >
                <div className="text-3xl mb-2">{achievement.icon}</div>
                <p className="text-xs font-medium text-foreground line-clamp-2">
                  {achievement.title[language]}
                </p>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* Quick Settings */}
        <section className="animate-fade-in stagger-3">
          <GlassCard padding="none" className="divide-y divide-border/50">
            {/* Language Toggle */}
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">{t('profile.language')}</h4>
                  <p className="text-xs text-muted-foreground">
                    {isBangla ? 'বাংলা' : 'English'}
                  </p>
                </div>
              </div>
              <Switch
                checked={language === 'en'}
                onCheckedChange={(checked) => setLanguage(checked ? 'en' : 'bn')}
              />
            </div>

            {/* Theme Toggle */}
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                  <Moon className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">{t('profile.theme')}</h4>
                  <p className="text-xs text-muted-foreground">
                    {isBangla ? 'লাইট মোড' : 'Light Mode'}
                  </p>
                </div>
              </div>
              <Switch />
            </div>

            {/* Notifications */}
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Bell className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">{t('profile.notifications')}</h4>
                  <p className="text-xs text-muted-foreground">
                    {isBangla ? 'চালু' : 'Enabled'}
                  </p>
                </div>
              </div>
              <Switch defaultChecked />
            </div>
          </GlassCard>
        </section>

        {/* Menu Items */}
        <section className="animate-fade-in stagger-4">
          <GlassCard padding="none" className="divide-y divide-border/50">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  className="flex items-center justify-between p-4 w-full hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                      <Icon className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <span className="font-medium text-foreground">
                      {item.label[language]}
                    </span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </button>
              );
            })}
          </GlassCard>
        </section>

        {/* Logout */}
        <section className="animate-fade-in stagger-5">
          <Button 
            variant="outline" 
            className="w-full justify-start gap-3 h-14 text-destructive hover:text-destructive hover:bg-destructive/5"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5" />
            <span>{t('profile.logout')}</span>
          </Button>
        </section>

        {/* Version Info */}
        <div className="text-center py-4">
          <p className="text-xs text-muted-foreground">
            {t('app.name')} v2.0.0
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            © 2024 {isBangla ? 'গণপ্রজাতন্ত্রী বাংলাদেশ সরকার' : 'Government of Bangladesh'}
          </p>
        </div>
      </div>
    </AppLayout>
  );
};

export default Profile;

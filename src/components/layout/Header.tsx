import React from 'react';
import { Bell, Search, Globe, LogOut, Crown, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useRole } from '@/contexts/RoleContext';
import { useProfile } from '@/hooks/useProfile';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/Logo';
import { RoleSwitcher } from './RoleSwitcher';
import founderProfile from '@/assets/founder-profile.webp';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

interface HeaderProps {
  showSearch?: boolean;
  title?: string;
}

export const Header: React.FC<HeaderProps> = ({ showSearch = true, title }) => {
  const { language, setLanguage, t, isBangla } = useLanguage();
  const { signOut, demoUser, user } = useAuth();
  const { isSuperAdminUser, roleConfig } = useRole();
  const { profile } = useProfile();
  const navigate = useNavigate();
  const { toast } = useToast();

  const toggleLanguage = () => {
    setLanguage(language === 'bn' ? 'en' : 'bn');
  };

  const handleLogout = async () => {
    await signOut();
    toast({
      title: isBangla ? 'লগআউট সফল' : 'Logged Out',
      description: isBangla ? 'আবার দেখা হবে!' : 'See you again!',
    });
    navigate('/auth', { replace: true });
  };

  const displayName = profile?.full_name || demoUser?.fullName || user?.email?.split('@')[0] || 'User';
  const displayNameBn = profile?.full_name_bn || demoUser?.fullNameBn || displayName;

  return (
    <header className="sticky top-0 z-40 glass-card border-b border-border/50 px-3 sm:px-4 py-2 sm:py-3 safe-area-inset-top">
      <div className="flex items-center justify-between gap-2">
        {/* Logo & Title - Responsive */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-shrink">
          <Logo size="xs" animation="none" className="flex-shrink-0" />
          <div className="min-w-0">
            <h1 className="font-semibold text-foreground text-sm sm:text-base truncate">
              {title || t('app.name')}
            </h1>
            <p className="text-[10px] sm:text-xs text-muted-foreground truncate hidden xs:block">
              {t('app.tagline')}
            </p>
          </div>
        </div>

        {/* Actions - Responsive */}
        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
          {/* SuperAdmin Badge */}
          {isSuperAdminUser && (
            <Badge variant="outline" className="hidden sm:flex bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border-yellow-500/50 text-yellow-600 dark:text-yellow-400 gap-1">
              <Crown className="w-3 h-3" />
              <span className="text-xs">{isBangla ? 'সুপার অ্যাডমিন' : 'Super Admin'}</span>
            </Badge>
          )}
          
          {/* Role Switcher - Always visible */}
          <RoleSwitcher />
          
          {/* Language Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full h-8 w-8 sm:h-9 sm:w-9"
            onClick={toggleLanguage}
            title={isBangla ? 'Switch to English' : 'বাংলায় পরিবর্তন করুন'}
          >
            <Globe className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
          
          {/* Search - Hidden on mobile */}
          {showSearch && (
            <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 sm:h-9 sm:w-9 hidden sm:flex">
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          )}
          
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 sm:h-9 sm:w-9 relative">
            <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 w-2 h-2 bg-destructive rounded-full" />
          </Button>

          {/* User Menu with Logout */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 sm:h-9 sm:w-9 p-0 overflow-hidden">
                {isSuperAdminUser ? (
                  <img 
                    src={founderProfile} 
                    alt="Profile" 
                    className="w-full h-full object-cover rounded-full ring-2 ring-yellow-500/50"
                  />
                ) : (
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs sm:text-sm font-medium">
                    {displayName.charAt(0).toUpperCase()}
                  </div>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="px-3 py-2">
                <div className="flex items-center gap-3">
                  {isSuperAdminUser ? (
                    <img 
                      src={founderProfile} 
                      alt="Profile" 
                      className="w-10 h-10 object-cover rounded-full ring-2 ring-yellow-500/50"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-sm font-medium">
                      {displayName.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {isBangla ? displayNameBn : displayName}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {user?.email || demoUser?.email}
                    </p>
                    {isSuperAdminUser && (
                      <Badge variant="secondary" className="mt-1 text-[10px] bg-yellow-500/20 text-yellow-600 dark:text-yellow-400">
                        <Crown className="w-2.5 h-2.5 mr-1" />
                        {isBangla ? 'সুপার অ্যাডমিন' : 'Super Admin'}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/profile')} className="cursor-pointer">
                <User className="w-4 h-4 mr-2" />
                {isBangla ? 'প্রোফাইল' : 'Profile'}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-destructive cursor-pointer">
                <LogOut className="w-4 h-4 mr-2" />
                {isBangla ? 'লগআউট' : 'Logout'}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

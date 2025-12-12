import React from 'react';
import { Bell, Search, Globe, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/Logo';
import { RoleSwitcher } from './RoleSwitcher';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';

interface HeaderProps {
  showSearch?: boolean;
  title?: string;
}

export const Header: React.FC<HeaderProps> = ({ showSearch = true, title }) => {
  const { language, setLanguage, t, isBangla } = useLanguage();
  const { signOut, demoUser } = useAuth();
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
              <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 sm:h-9 sm:w-9">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs sm:text-sm font-medium">
                  {demoUser ? demoUser.fullName.charAt(0) : '👤'}
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {demoUser && (
                <>
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium truncate">{isBangla ? demoUser.fullNameBn : demoUser.fullName}</p>
                    <p className="text-xs text-muted-foreground truncate">{demoUser.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                </>
              )}
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

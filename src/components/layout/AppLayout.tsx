import React from 'react';
import { Header } from './Header';
import { BottomNav } from './BottomNav';

interface AppLayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  showNav?: boolean;
  headerTitle?: string;
}

export const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  showHeader = true,
  showNav = true,
  headerTitle,
}) => {
  return (
    <div className="min-h-screen bg-background gradient-bd flex flex-col">
      {showHeader && <Header title={headerTitle} />}
      <main className={`flex-1 ${showNav ? 'pb-20 sm:pb-24' : ''} ${showHeader ? '' : 'pt-0'}`}>
        {children}
      </main>
      {showNav && <BottomNav />}
    </div>
  );
};

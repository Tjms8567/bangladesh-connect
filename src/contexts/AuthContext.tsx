import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { DemoUser } from '@/data/demoUsers';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  demoUser: DemoUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signUp: (email: string, password: string, metadata?: { full_name?: string; full_name_bn?: string }) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  setDemoUser: (user: DemoUser | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USER_KEY = 'bd2-demo-user';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [demoUser, setDemoUserState] = useState<DemoUser | null>(() => {
    const stored = localStorage.getItem(DEMO_USER_KEY);
    return stored ? JSON.parse(stored) : null;
  });
  const [isLoading, setIsLoading] = useState(true);

  // Derived authentication state - user is authenticated if they have Supabase session OR demo user
  const isAuthenticated = !!(user || demoUser);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setIsLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const setDemoUser = (user: DemoUser | null) => {
    setDemoUserState(user);
    if (user) {
      localStorage.setItem(DEMO_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(DEMO_USER_KEY);
    }
  };

  const signUp = async (email: string, password: string, metadata?: { full_name?: string; full_name_bn?: string }) => {
    const redirectUrl = `${window.location.origin}/`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: metadata
      }
    });
    return { error };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setDemoUser(null);
    // Clear role data on logout
    localStorage.removeItem('bd2-user-roles');
    localStorage.removeItem('bd2-current-role');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      session, 
      demoUser,
      isLoading, 
      isAuthenticated,
      signUp, 
      signIn, 
      signOut,
      setDemoUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

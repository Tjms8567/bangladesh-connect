import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, User, Phone, Eye, EyeOff, Loader2, ArrowLeft, CreditCard, Shield, Users } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRole } from '@/contexts/RoleContext';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/ui/Logo';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { z } from 'zod';
import { getDemoCredentials, authenticateDemoUser, validateNationalId } from '@/data/demoUsers';
import { getRoleConfig } from '@/types/roles';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const nidSchema = z.object({
  nid: z.string().min(10, 'National ID must be at least 10 digits'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const signupSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  fullNameBn: z.string().optional(),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  phone: z.string().optional(),
});

export const Auth: React.FC = () => {
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [loginMethod, setLoginMethod] = useState<'email' | 'nid'>('nid');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showDemoUsers, setShowDemoUsers] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nid: '',
    fullName: '',
    fullNameBn: '',
    phone: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { signIn, signUp, user, isAuthenticated, setDemoUser } = useAuth();
  const { t, language, setLanguage, isBangla } = useLanguage();
  const { setCurrentRole, addRole } = useRole();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const demoCredentials = getDemoCredentials();
  const from = (location.state as any)?.from?.pathname || '/';

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleDemoLogin = (nid: string, password: string) => {
    setFormData({ ...formData, nid, password });
    setLoginMethod('nid');
    setShowDemoUsers(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);

    try {
      if (authMode === 'login') {
        if (loginMethod === 'nid') {
          // Demo NID Login
          const validation = nidSchema.safeParse({ nid: formData.nid, password: formData.password });
          if (!validation.success) {
            const fieldErrors: Record<string, string> = {};
            validation.error.errors.forEach((err) => {
              if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
            });
            setErrors(fieldErrors);
            setIsLoading(false);
            return;
          }

          const result = authenticateDemoUser(formData.nid, formData.password);
          if (result.success && result.user) {
            // Set demo user in auth context
            setDemoUser(result.user);
            
            // Set roles from demo user
            result.user.roles.forEach(role => addRole(role));
            setCurrentRole(result.user.role);
            
            toast({
              title: isBangla ? 'স্বাগতম!' : 'Welcome!',
              description: isBangla 
                ? `${result.user.fullNameBn}, সফলভাবে লগইন হয়েছে` 
                : `${result.user.fullName}, successfully logged in`,
            });
            
            navigate(from, { replace: true });
          } else {
            toast({
              title: isBangla ? 'লগইন ব্যর্থ' : 'Login Failed',
              description: result.error || (isBangla ? 'ভুল জাতীয় পরিচয়পত্র বা পাসওয়ার্ড' : 'Invalid National ID or password'),
              variant: 'destructive',
            });
          }
        } else {
          // Email Login (existing flow)
          const validation = loginSchema.safeParse(formData);
          if (!validation.success) {
            const fieldErrors: Record<string, string> = {};
            validation.error.errors.forEach((err) => {
              if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
            });
            setErrors(fieldErrors);
            setIsLoading(false);
            return;
          }

          const { error } = await signIn(formData.email, formData.password);
          if (error) {
            toast({
              title: isBangla ? 'লগইন ব্যর্থ' : 'Login Failed',
              description: error.message === 'Invalid login credentials' 
                ? (isBangla ? 'ভুল ইমেইল বা পাসওয়ার্ড' : 'Invalid email or password')
                : error.message,
              variant: 'destructive',
            });
          } else {
            toast({
              title: isBangla ? 'স্বাগতম!' : 'Welcome!',
              description: isBangla ? 'সফলভাবে লগইন হয়েছে' : 'Successfully logged in',
            });
          }
        }
      } else {
        // Signup flow
        const validation = signupSchema.safeParse(formData);
        if (!validation.success) {
          const fieldErrors: Record<string, string> = {};
          validation.error.errors.forEach((err) => {
            if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
          });
          setErrors(fieldErrors);
          setIsLoading(false);
          return;
        }

        const { error } = await signUp(formData.email, formData.password, {
          full_name: formData.fullName,
          full_name_bn: formData.fullNameBn || formData.fullName,
        });
        
        if (error) {
          toast({
            title: isBangla ? 'নিবন্ধন ব্যর্থ' : 'Signup Failed',
            description: error.message.includes('already registered')
              ? (isBangla ? 'এই ইমেইল দিয়ে আগেই নিবন্ধন করা হয়েছে' : 'This email is already registered')
              : error.message,
            variant: 'destructive',
          });
        } else {
          toast({
            title: isBangla ? 'অভিনন্দন!' : 'Congratulations!',
            description: isBangla ? 'আপনার অ্যাকাউন্ট তৈরি হয়েছে' : 'Your account has been created',
          });
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background gradient-bd flex flex-col">
      {/* Header */}
      <header className="p-4 flex items-center justify-between">
        <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setLanguage(language === 'bn' ? 'en' : 'bn')}
          className="text-sm"
        >
          {isBangla ? 'EN' : 'বাং'}
        </Button>
      </header>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6 animate-fade-in">
          {/* Logo */}
          <div className="text-center mb-6">
            <div className="flex justify-center mb-4">
              <Logo size="lg" animation="float" showGlow />
            </div>
            <h1 className="text-2xl font-bold text-foreground">{t('app.name')}</h1>
            <p className="text-muted-foreground text-sm mt-1">{t('app.tagline')}</p>
          </div>

          {/* Auth Form */}
          <GlassCard variant="elevated" className="p-6">
            {/* Auth Mode Toggle */}
            <div className="flex gap-2 mb-4">
              <Button
                variant={authMode === 'login' ? 'default' : 'ghost'}
                className="flex-1 rounded-xl"
                onClick={() => setAuthMode('login')}
              >
                {isBangla ? 'লগইন' : 'Login'}
              </Button>
              <Button
                variant={authMode === 'signup' ? 'default' : 'ghost'}
                className="flex-1 rounded-xl"
                onClick={() => setAuthMode('signup')}
              >
                {isBangla ? 'নিবন্ধন' : 'Sign Up'}
              </Button>
            </div>

            {authMode === 'login' ? (
              <>
                {/* Login Method Tabs */}
                <Tabs value={loginMethod} onValueChange={(v) => setLoginMethod(v as 'email' | 'nid')} className="mb-4">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="nid" className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4" />
                      {isBangla ? 'জাতীয় পরিচয়পত্র' : 'National ID'}
                    </TabsTrigger>
                    <TabsTrigger value="email" className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      {isBangla ? 'ইমেইল' : 'Email'}
                    </TabsTrigger>
                  </TabsList>

                  <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <TabsContent value="nid" className="space-y-4 mt-0">
                      <div className="space-y-2">
                        <Label htmlFor="nid">{isBangla ? 'জাতীয় পরিচয়পত্র নম্বর' : 'National ID Number'}</Label>
                        <div className="relative">
                          <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="nid"
                            name="nid"
                            placeholder={isBangla ? '১৭ ডিজিট NID বা ১০ ডিজিট স্মার্ট কার্ড' : '17-digit NID or 10-digit Smart Card'}
                            value={formData.nid}
                            onChange={handleChange}
                            className="pl-10"
                          />
                        </div>
                        {errors.nid && <p className="text-destructive text-xs">{errors.nid}</p>}
                      </div>
                    </TabsContent>

                    <TabsContent value="email" className="space-y-4 mt-0">
                      <div className="space-y-2">
                        <Label htmlFor="email">{isBangla ? 'ইমেইল' : 'Email'}</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder={isBangla ? 'আপনার ইমেইল' : 'Your email'}
                            value={formData.email}
                            onChange={handleChange}
                            className="pl-10"
                          />
                        </div>
                        {errors.email && <p className="text-destructive text-xs">{errors.email}</p>}
                      </div>
                    </TabsContent>

                    <div className="space-y-2">
                      <Label htmlFor="password">{isBangla ? 'পাসওয়ার্ড' : 'Password'}</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="password"
                          name="password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          value={formData.password}
                          onChange={handleChange}
                          className="pl-10 pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2"
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4 text-muted-foreground" />
                          ) : (
                            <Eye className="w-4 h-4 text-muted-foreground" />
                          )}
                        </button>
                      </div>
                      {errors.password && <p className="text-destructive text-xs">{errors.password}</p>}
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-12 rounded-xl text-base"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        isBangla ? 'লগইন করুন' : 'Login'
                      )}
                    </Button>
                  </form>
                </Tabs>

                {/* Demo Users Section */}
                <div className="mt-4 pt-4 border-t border-border">
                  <Button
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2"
                    onClick={() => setShowDemoUsers(!showDemoUsers)}
                  >
                    <Users className="w-4 h-4" />
                    {isBangla ? 'ডেমো ব্যবহারকারী দেখুন' : 'View Demo Users'}
                  </Button>

                  {showDemoUsers && (
                    <div className="mt-4 space-y-2 max-h-64 overflow-y-auto">
                      {demoCredentials.map((cred, idx) => {
                        const roleConfig = getRoleConfig(cred.role);
                        return (
                          <button
                            key={idx}
                            onClick={() => handleDemoLogin(cred.nid, cred.password)}
                            className={`w-full p-3 rounded-lg border border-border hover:border-primary transition-colors text-left ${
                              cred.isSuperAdmin ? 'bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border-yellow-500/50' : ''
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">{roleConfig.icon}</span>
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <p className="font-medium text-sm">{isBangla ? cred.nameBn : cred.name}</p>
                                  {cred.isSuperAdmin && (
                                    <Shield className="w-4 h-4 text-yellow-500" />
                                  )}
                                </div>
                                <p className="text-xs text-muted-foreground">
                                  {isBangla ? roleConfig.nameBn : roleConfig.name}
                                </p>
                                <p className="text-xs font-mono text-primary mt-1">
                                  ID: {cred.nid}
                                </p>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </>
            ) : (
              /* Signup Form */
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">{isBangla ? 'পুরো নাম (ইংরেজি)' : 'Full Name (English)'}</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="fullName"
                      name="fullName"
                      placeholder={isBangla ? 'আপনার নাম' : 'Your name'}
                      value={formData.fullName}
                      onChange={handleChange}
                      className="pl-10"
                    />
                  </div>
                  {errors.fullName && <p className="text-destructive text-xs">{errors.fullName}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fullNameBn">{isBangla ? 'পুরো নাম (বাংলা)' : 'Full Name (Bangla)'}</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="fullNameBn"
                      name="fullNameBn"
                      placeholder={isBangla ? 'আপনার নাম বাংলায়' : 'Your name in Bangla'}
                      value={formData.fullNameBn}
                      onChange={handleChange}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">{isBangla ? 'ইমেইল' : 'Email'}</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder={isBangla ? 'আপনার ইমেইল' : 'Your email'}
                      value={formData.email}
                      onChange={handleChange}
                      className="pl-10"
                    />
                  </div>
                  {errors.email && <p className="text-destructive text-xs">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">{isBangla ? 'ফোন নম্বর' : 'Phone Number'}</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+880 1XXX-XXXXXX"
                      value={formData.phone}
                      onChange={handleChange}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">{isBangla ? 'পাসওয়ার্ড' : 'Password'}</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      className="pl-10 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4 text-muted-foreground" />
                      ) : (
                        <Eye className="w-4 h-4 text-muted-foreground" />
                      )}
                    </button>
                  </div>
                  {errors.password && <p className="text-destructive text-xs">{errors.password}</p>}
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 rounded-xl text-base"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    isBangla ? 'অ্যাকাউন্ট তৈরি করুন' : 'Create Account'
                  )}
                </Button>

                <p className="text-center text-xs text-muted-foreground">
                  {isBangla
                    ? '* ভবিষ্যতে জাতীয় পরিচয়পত্র দিয়ে নিবন্ধন বাধ্যতামূলক হবে'
                    : '* National ID registration will be mandatory in future'}
                </p>
              </form>
            )}
          </GlassCard>

          {/* Footer */}
          <p className="text-center text-xs text-muted-foreground">
            {isBangla
              ? 'চালিয়ে যাওয়ার মাধ্যমে আপনি আমাদের শর্তাবলী মেনে নিচ্ছেন'
              : 'By continuing, you agree to our Terms of Service'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;

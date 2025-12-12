import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, HeartPulse, Wallet, Briefcase, ChevronRight, ChevronLeft, 
  Check, Globe, Users, Shield, Sparkles, Target, Award, Building2,
  Stethoscope, ShoppingBag, Vote, Plane
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/ui/Logo';
import { GlassCard } from '@/components/ui/GlassCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRole } from '@/contexts/RoleContext';
import { UserRole, ROLES } from '@/types/roles';

interface GuidedOnboardingProps {
  onComplete: () => void;
}

type OnboardingStep = 'welcome' | 'language' | 'role' | 'sectors' | 'features' | 'complete';

const sectorOptions = [
  { id: 'education', icon: GraduationCap, color: 'from-blue-500 to-indigo-600' },
  { id: 'health', icon: HeartPulse, color: 'from-rose-500 to-pink-600' },
  { id: 'finance', icon: Wallet, color: 'from-amber-500 to-orange-600' },
  { id: 'jobs', icon: Briefcase, color: 'from-emerald-500 to-green-600' },
];

const featureHighlights = [
  {
    id: 'digital-id',
    icon: Shield,
    title: { bn: 'ডিজিটাল পরিচয়', en: 'Digital Identity' },
    description: { bn: 'একটি সুরক্ষিত ডিজিটাল আইডি দিয়ে সব সেবা অ্যাক্সেস করুন', en: 'Access all services with one secure digital ID' },
  },
  {
    id: 'ai-powered',
    icon: Sparkles,
    title: { bn: 'AI সহায়তা', en: 'AI Assistance' },
    description: { bn: 'স্মার্ট সুপারিশ ও ব্যক্তিগত অভিজ্ঞতা', en: 'Smart recommendations & personalized experience' },
  },
  {
    id: 'impact-tracking',
    icon: Target,
    title: { bn: 'প্রভাব ট্র্যাকিং', en: 'Impact Tracking' },
    description: { bn: 'দেশের রূপান্তরে আপনার অবদান দেখুন', en: 'See your contribution to national transformation' },
  },
  {
    id: 'gamification',
    icon: Award,
    title: { bn: 'পুরস্কার ও স্বীকৃতি', en: 'Rewards & Recognition' },
    description: { bn: 'পয়েন্ট অর্জন করুন, ব্যাজ আনলক করুন', en: 'Earn points, unlock badges, climb leaderboards' },
  },
];

const GuidedOnboardingComponent: React.FC<GuidedOnboardingProps> = ({ onComplete }) => {
  const { language, setLanguage, isBangla, t } = useLanguage();
  const { addRole, setCurrentRole } = useRole();
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('welcome');
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  const steps: OnboardingStep[] = ['welcome', 'language', 'role', 'sectors', 'features', 'complete'];
  const currentStepIndex = steps.indexOf(currentStep);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  const handleNext = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < steps.length) {
      setCurrentStep(steps[nextIndex]);
    }
  };

  const handlePrev = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex]);
    }
  };

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    addRole(role);
    setCurrentRole(role);
  };

  const handleSectorToggle = (sectorId: string) => {
    setSelectedSectors(prev => 
      prev.includes(sectorId) 
        ? prev.filter(s => s !== sectorId)
        : [...prev, sectorId]
    );
  };

  const handleComplete = () => {
    setIsExiting(true);
    setTimeout(() => {
      localStorage.setItem('bd2-onboarding-complete', 'true');
      localStorage.setItem('bd2-selected-sectors', JSON.stringify(selectedSectors));
      onComplete();
    }, 400);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 'role': return selectedRole !== null;
      case 'sectors': return selectedSectors.length > 0;
      default: return true;
    }
  };

  // Role options - show the most relevant ones
  const roleOptions = ROLES.filter(r => 
    ['citizen', 'student', 'business', 'medical', 'government', 'voter', 'guest'].includes(r.id)
  );

  return (
    <div
      className={cn(
        'fixed inset-0 z-[90] flex flex-col bg-background transition-opacity duration-400',
        isExiting && 'opacity-0'
      )}
    >
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-muted z-20">
        <div 
          className="h-full bg-primary transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Skip Button */}
      <div className="absolute top-4 right-4 z-20">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleComplete}
          className="text-muted-foreground"
        >
          {isBangla ? 'বাদ দিন' : 'Skip'}
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 overflow-y-auto">
        {/* Welcome Step */}
        {currentStep === 'welcome' && (
          <div className="text-center space-y-6 animate-fade-in max-w-md">
            <Logo size="xl" animation="entrance" showGlow className="mx-auto" />
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-foreground">
                {isBangla ? 'বাংলাদেশ ২.০' : 'Bangladesh 2.0'}
              </h1>
              <p className="text-xl text-muted-foreground">
                {isBangla ? 'নিজেকে বদলাও, বাংলাদেশ বদলাবে' : 'Change yourself to change Bangladesh'}
              </p>
            </div>
            <p className="text-muted-foreground">
              {isBangla 
                ? 'শিক্ষা, স্বাস্থ্য, অর্থ এবং কর্মসংস্থান - সব এক অ্যাপে'
                : 'Education, Health, Finance, and Employment - all in one app'}
            </p>
            <Button 
              size="lg" 
              className="w-full max-w-xs h-14 text-lg rounded-2xl"
              onClick={handleNext}
            >
              {isBangla ? 'শুরু করুন' : 'Get Started'}
              <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        )}

        {/* Language Step */}
        {currentStep === 'language' && (
          <div className="text-center space-y-6 animate-fade-in max-w-md w-full">
            <Globe className="w-16 h-16 mx-auto text-primary" />
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-foreground">
                ভাষা নির্বাচন করুন
              </h2>
              <p className="text-lg text-muted-foreground">
                Select your language
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <GlassCard
                className={cn(
                  'p-6 cursor-pointer transition-all',
                  language === 'bn' && 'ring-2 ring-primary bg-primary/5'
                )}
                onClick={() => setLanguage('bn')}
              >
                <div className="text-4xl mb-2">🇧🇩</div>
                <div className="font-bold text-foreground">বাংলা</div>
                <div className="text-sm text-muted-foreground">Bengali</div>
              </GlassCard>
              <GlassCard
                className={cn(
                  'p-6 cursor-pointer transition-all',
                  language === 'en' && 'ring-2 ring-primary bg-primary/5'
                )}
                onClick={() => setLanguage('en')}
              >
                <div className="text-4xl mb-2">🌐</div>
                <div className="font-bold text-foreground">English</div>
                <div className="text-sm text-muted-foreground">ইংরেজি</div>
              </GlassCard>
            </div>
          </div>
        )}

        {/* Role Selection Step */}
        {currentStep === 'role' && (
          <div className="text-center space-y-6 animate-fade-in max-w-lg w-full">
            <Users className="w-16 h-16 mx-auto text-primary" />
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-foreground">
                {isBangla ? 'আপনার ভূমিকা নির্বাচন করুন' : 'Select Your Role'}
              </h2>
              <p className="text-muted-foreground">
                {isBangla 
                  ? 'আপনার প্রধান পরিচয় কী?' 
                  : 'What best describes you?'}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 max-h-[400px] overflow-y-auto">
              {roleOptions.map((role) => (
                <GlassCard
                  key={role.id}
                  className={cn(
                    'p-4 cursor-pointer transition-all text-left',
                    selectedRole === role.id && 'ring-2 ring-primary bg-primary/5'
                  )}
                  onClick={() => handleRoleSelect(role.id)}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{role.icon}</span>
                    <div>
                      <div className="font-medium text-foreground text-sm">
                        {isBangla ? role.nameBn : role.name}
                      </div>
                      <div className="text-xs text-muted-foreground truncate">
                        {isBangla ? role.descriptionBn : role.description}
                      </div>
                    </div>
                  </div>
                  {selectedRole === role.id && (
                    <Check className="absolute top-2 right-2 w-5 h-5 text-primary" />
                  )}
                </GlassCard>
              ))}
            </div>
          </div>
        )}

        {/* Sectors Step */}
        {currentStep === 'sectors' && (
          <div className="text-center space-y-6 animate-fade-in max-w-md w-full">
            <Target className="w-16 h-16 mx-auto text-primary" />
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-foreground">
                {isBangla ? 'আগ্রহের খাত নির্বাচন করুন' : 'Select Your Interests'}
              </h2>
              <p className="text-muted-foreground">
                {isBangla 
                  ? 'আপনি কোন ক্ষেত্রে সেবা চান?'
                  : 'Which areas interest you most?'}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {sectorOptions.map((sector) => {
                const Icon = sector.icon;
                const isSelected = selectedSectors.includes(sector.id);
                return (
                  <GlassCard
                    key={sector.id}
                    className={cn(
                      'p-6 cursor-pointer transition-all relative',
                      isSelected && 'ring-2 ring-primary'
                    )}
                    onClick={() => handleSectorToggle(sector.id)}
                  >
                    <div className={cn(
                      'w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3 bg-gradient-to-br',
                      sector.color
                    )}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="font-medium text-foreground">
                      {t(`sector.${sector.id}`)}
                    </div>
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                        <Check className="w-4 h-4 text-primary-foreground" />
                      </div>
                    )}
                  </GlassCard>
                );
              })}
            </div>
          </div>
        )}

        {/* Features Step */}
        {currentStep === 'features' && (
          <div className="text-center space-y-6 animate-fade-in max-w-md w-full">
            <Sparkles className="w-16 h-16 mx-auto text-primary" />
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-foreground">
                {isBangla ? 'আমাদের বৈশিষ্ট্যসমূহ' : 'Our Features'}
              </h2>
            </div>
            <div className="space-y-3">
              {featureHighlights.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <GlassCard
                    key={feature.id}
                    className={cn(
                      'p-4 text-left transition-all',
                      index === currentFeature && 'ring-2 ring-primary bg-primary/5'
                    )}
                    onClick={() => setCurrentFeature(index)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium text-foreground">
                          {isBangla ? feature.title.bn : feature.title.en}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {isBangla ? feature.description.bn : feature.description.en}
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                );
              })}
            </div>
          </div>
        )}

        {/* Complete Step */}
        {currentStep === 'complete' && (
          <div className="text-center space-y-6 animate-fade-in max-w-md">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <Check className="w-12 h-12 text-primary" />
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-foreground">
                {isBangla ? 'সব প্রস্তুত!' : 'All Set!'}
              </h2>
              <p className="text-lg text-muted-foreground">
                {isBangla 
                  ? 'আপনি বাংলাদেশ ২.০ এ যাত্রা শুরু করতে প্রস্তুত'
                  : 'You are ready to start your Bangladesh 2.0 journey'}
              </p>
            </div>
            <div className="space-y-3">
              <GlassCard className="p-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{ROLES.find(r => r.id === selectedRole)?.icon || '🇧🇩'}</span>
                  <div className="text-left">
                    <div className="text-sm text-muted-foreground">{isBangla ? 'আপনার ভূমিকা' : 'Your Role'}</div>
                    <div className="font-medium text-foreground">
                      {isBangla 
                        ? ROLES.find(r => r.id === selectedRole)?.nameBn
                        : ROLES.find(r => r.id === selectedRole)?.name}
                    </div>
                  </div>
                </div>
              </GlassCard>
              <GlassCard className="p-4">
                <div className="flex items-center gap-3">
                  <Target className="w-8 h-8 text-primary" />
                  <div className="text-left">
                    <div className="text-sm text-muted-foreground">{isBangla ? 'আগ্রহের খাত' : 'Interests'}</div>
                    <div className="font-medium text-foreground">
                      {selectedSectors.map(s => t(`sector.${s}`)).join(', ') || (isBangla ? 'সব খাত' : 'All sectors')}
                    </div>
                  </div>
                </div>
              </GlassCard>
            </div>
            <Button 
              size="lg" 
              className="w-full h-14 text-lg rounded-2xl"
              onClick={handleComplete}
            >
              {isBangla ? 'ড্যাশবোর্ডে যান' : 'Go to Dashboard'}
              <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      {currentStep !== 'welcome' && currentStep !== 'complete' && (
        <div className="p-6 flex gap-3">
          <Button
            variant="outline"
            size="lg"
            className="flex-1 h-14 rounded-2xl"
            onClick={handlePrev}
          >
            <ChevronLeft className="mr-2 w-5 h-5" />
            {isBangla ? 'পিছনে' : 'Back'}
          </Button>
          <Button
            size="lg"
            className="flex-1 h-14 rounded-2xl"
            onClick={handleNext}
            disabled={!canProceed()}
          >
            {isBangla ? 'পরবর্তী' : 'Next'}
            <ChevronRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      )}

      {/* Step Indicators */}
      <div className="p-4 flex items-center justify-center gap-2">
        {steps.map((step, index) => (
          <div
            key={step}
            className={cn(
              'w-2 h-2 rounded-full transition-all',
              index === currentStepIndex
                ? 'w-8 bg-primary'
                : index < currentStepIndex
                ? 'bg-primary/50'
                : 'bg-muted'
            )}
          />
        ))}
      </div>
    </div>
  );
};

export const GuidedOnboarding = React.forwardRef<HTMLDivElement, GuidedOnboardingProps>((props, ref) => {
  return <GuidedOnboardingComponent {...props} />;
});

GuidedOnboarding.displayName = 'GuidedOnboarding';

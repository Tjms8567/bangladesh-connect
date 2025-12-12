import React, { useState } from 'react';
import { GraduationCap, HeartPulse, Wallet, Briefcase, ChevronRight, ChevronLeft, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface OnboardingProps {
  onComplete: () => void;
}

const slides = [
  {
    id: 1,
    icon: null,
    title: { bn: 'বাংলাদেশ ২.০ এ স্বাগতম', en: 'Welcome to Bangladesh 2.0' },
    subtitle: { bn: 'নিজেকে বদলাও, বাংলাদেশ বদলাবে', en: 'Change yourself to change Bangladesh' },
    description: {
      bn: 'একটি অ্যাপে শিক্ষা, স্বাস্থ্য, অর্থ এবং কর্মসংস্থান - সব কিছু পান।',
      en: 'Access education, healthcare, finance, and employment - all in one app.',
    },
    color: 'from-[hsl(160,100%,22%)] to-[hsl(120,79%,28%)]',
  },
  {
    id: 2,
    icon: GraduationCap,
    title: { bn: 'শিক্ষা বিপ্লব', en: 'Education Revolution' },
    subtitle: { bn: 'AI-চালিত শিক্ষা', en: 'AI-Powered Learning' },
    description: {
      bn: 'বিনামূল্যে কোর্স, লাইভ ক্লাস, এবং সার্টিফিকেট পান। আপনার দক্ষতা বাড়ান।',
      en: 'Free courses, live classes, and certificates. Build your skills for the future.',
    },
    color: 'from-emerald-600 to-emerald-500',
  },
  {
    id: 3,
    icon: HeartPulse,
    title: { bn: 'স্বাস্থ্য সেবা', en: 'Healthcare Services' },
    subtitle: { bn: 'টেলিমেডিসিন ও AI ডাক্তার', en: 'Telemedicine & AI Doctor' },
    description: {
      bn: 'ঘরে বসে ডাক্তারের সাথে কথা বলুন, ওষুধ অর্ডার করুন, স্বাস্থ্য রেকর্ড রাখুন।',
      en: 'Consult doctors from home, order medicine, and maintain health records.',
    },
    color: 'from-rose-600 to-rose-500',
  },
  {
    id: 4,
    icon: Wallet,
    title: { bn: 'বাংলাপে', en: 'BanglaPay' },
    subtitle: { bn: 'ডিজিটাল ওয়ালেট', en: 'Digital Wallet' },
    description: {
      bn: 'টাকা পাঠান, বিল পরিশোধ করুন, মোবাইল রিচার্জ করুন - সব এক জায়গায়।',
      en: 'Send money, pay bills, recharge mobile - everything in one place.',
    },
    color: 'from-amber-600 to-amber-500',
  },
  {
    id: 5,
    icon: Briefcase,
    title: { bn: 'চাকরি ও দক্ষতা', en: 'Jobs & Skills' },
    subtitle: { bn: 'AI চাকরি ম্যাচিং', en: 'AI Job Matching' },
    description: {
      bn: 'আপনার দক্ষতা অনুযায়ী চাকরি খুঁজুন, ফ্রিল্যান্স করুন, রিমোট কাজ করুন।',
      en: 'Find jobs matching your skills, freelance, and work remotely.',
    },
    color: 'from-blue-600 to-blue-500',
  },
];

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleComplete = () => {
    setIsExiting(true);
    setTimeout(() => {
      localStorage.setItem('bd2-onboarding-complete', 'true');
      onComplete();
    }, 400);
  };

  const slide = slides[currentSlide];
  const Icon = slide.icon;
  const isLastSlide = currentSlide === slides.length - 1;

  return (
    <div
      className={cn(
        'fixed inset-0 z-[90] flex flex-col transition-opacity duration-400',
        isExiting && 'opacity-0'
      )}
    >
      {/* Background */}
      <div className={cn('absolute inset-0 bg-gradient-to-br transition-all duration-500', slide.color)} />

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-white/5 rounded-full" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col px-6 pt-12 pb-8">
        {/* Skip button */}
        <div className="flex justify-end">
          <Button
            variant="ghost"
            className="text-white/80 hover:text-white hover:bg-white/10"
            onClick={handleComplete}
          >
            Skip
          </Button>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          {/* Icon */}
          <div
            className={cn(
              'mb-8 transition-all duration-500',
              'animate-fade-in'
            )}
            key={currentSlide}
          >
            {Icon ? (
              <div className="w-28 h-28 rounded-3xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-2xl">
                <Icon className="w-14 h-14 text-white" />
              </div>
            ) : (
              <div className="w-28 h-28 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-2xl">
                <span className="text-5xl font-bold text-white">B</span>
              </div>
            )}
          </div>

          {/* Text */}
          <div className="animate-fade-in" key={`text-${currentSlide}`}>
            <h1 className="text-3xl font-bold text-white mb-2">
              {slide.title.bn}
            </h1>
            <p className="text-lg text-white/90 mb-2">
              {slide.title.en}
            </p>
            <p className="text-sm text-white/70 font-medium mb-6">
              {slide.subtitle.bn} | {slide.subtitle.en}
            </p>
            <p className="text-base text-white/80 max-w-sm leading-relaxed">
              {slide.description.bn}
            </p>
            <p className="text-sm text-white/60 max-w-sm mt-2">
              {slide.description.en}
            </p>
          </div>
        </div>

        {/* Pagination dots */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={cn(
                'w-2 h-2 rounded-full transition-all duration-300',
                index === currentSlide
                  ? 'w-8 bg-white'
                  : 'bg-white/40 hover:bg-white/60'
              )}
            />
          ))}
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center gap-3">
          {currentSlide > 0 && (
            <Button
              variant="outline"
              size="lg"
              className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-xl h-14"
              onClick={handlePrev}
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Previous
            </Button>
          )}
          
          <Button
            size="lg"
            className={cn(
              'flex-1 rounded-xl h-14 font-semibold transition-all',
              isLastSlide
                ? 'bg-white text-primary hover:bg-white/90'
                : 'bg-white/20 text-white hover:bg-white/30'
            )}
            onClick={isLastSlide ? handleComplete : handleNext}
          >
            {isLastSlide ? (
              <>
                <Check className="w-5 h-5 mr-2" />
                শুরু করুন | Get Started
              </>
            ) : (
              <>
                Next
                <ChevronRight className="w-5 h-5 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

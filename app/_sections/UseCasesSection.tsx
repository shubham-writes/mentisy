// app/_sections/UseCasesSection.tsx
"use client";

import { useState, useRef } from "react";
import { SignUpButton } from "@clerk/nextjs";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { GraduationCap, Heart, Dumbbell, Smile, Briefcase, MessageCircle, Users, ChevronRight, ChevronDown, ChevronLeft } from "lucide-react";

const UseCasesSection = () => {
  const [activeUseCase, setActiveUseCase] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { isSignedIn } = useAuth();
  const router = useRouter();

  const handleUseCaseAction = (useCaseTitle: string) => {
    if (isSignedIn) {
      // If user is signed in, redirect to hello page with use case context
      router.push(`/hello?useCase=${encodeURIComponent(useCaseTitle.toLowerCase().replace(/\s+/g, '-'))}`);
    }
    // If not signed in, the SignUpButton will handle the auth flow
  };

  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
      setTimeout(checkScrollButtons, 100);
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
      setTimeout(checkScrollButtons, 100);
    }
  };

  const useCases = [
    {
      id: "student",
      title: "Student Sharing",
      icon: GraduationCap,
      description: "I share my exam admit cards and answer videos with study partners, but don't want them floating around later.",
      popularWith: "College students, exam prep groups",
      color: "blue",
      gradient: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      iconColor: "text-blue-600 dark:text-blue-400",
      borderColor: "border-blue-200 dark:border-blue-700"
    },
    {
      id: "personal",
      title: "Personal Moments",
      icon: Heart,
      description: "Sending special videos to my partner—just once, and then they disappear.",
      popularWith: "Couples, close friends, family",
      color: "pink",
      gradient: "from-pink-500 to-rose-500",
      bgColor: "bg-pink-50 dark:bg-pink-900/20",
      iconColor: "text-pink-600 dark:text-pink-400",
      borderColor: "border-pink-200 dark:border-pink-700"
    },
    {
      id: "fitness",
      title: "Fitness Progress",
      icon: Dumbbell,
      description: "Share my gym transformation videos for motivation, but control who sees my before/after photos.",
      popularWith: "Fitness enthusiasts, trainers",
      color: "green",
      gradient: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      iconColor: "text-green-600 dark:text-green-400",
      borderColor: "border-green-200 dark:border-green-700"
    },
    {
      id: "funny",
      title: "Funny Moments",
      icon: Smile,
      description: "Those embarrassing but hilarious videos I want to share with one friend, not the whole world.",
      popularWith: "Friends, social circles",
      color: "yellow",
      gradient: "from-yellow-500 to-orange-500",
      bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
      iconColor: "text-yellow-600 dark:text-yellow-400",
      borderColor: "border-yellow-200 dark:border-yellow-700"
    },
    {
      id: "professional",
      title: "Professional Use",
      icon: Briefcase,
      description: "Sharing confidential presentation videos or demos with clients, ensuring they can't be redistributed.",
      popularWith: "Freelancers, consultants",
      color: "purple",
      gradient: "from-purple-500 to-indigo-500",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      iconColor: "text-purple-600 dark:text-purple-400",
      borderColor: "border-purple-200 dark:border-purple-700"
    },
    {
      id: "confessions",
      title: "Confessions",
      icon: MessageCircle,
      description: "Opening up to someone special with a personal video message that I know will stay private.",
      popularWith: "Young adults, relationships",
      color: "red",
      gradient: "from-red-500 to-pink-500",
      bgColor: "bg-red-50 dark:bg-red-900/20",
      iconColor: "text-red-600 dark:text-red-400",
      borderColor: "border-red-200 dark:border-red-700"
    }
  ];

  return (
    <div className="px-4 sm:px-6 py-12 sm:py-16 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 px-2">Perfect For Every Private Moment</h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 px-2">See how others are using OnlyForYou to protect their privacy</p>
        </div>
        
        {/* Mobile Layout - Stack vertically */}
        <div className="block lg:hidden space-y-6">
          {/* Mobile: Horizontal scrollable use case tabs with arrow controls */}
          <div className="relative">
            {/* Left Arrow */}
            <button
              onClick={scrollLeft}
              className={`absolute left-0 top-12 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center transition-all duration-200 ${
                canScrollLeft 
                  ? 'opacity-100 hover:scale-125' 
                  : 'opacity-30 cursor-not-allowed'
              }`}
              disabled={!canScrollLeft}
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-7 h-7 text-gray-500 dark:text-gray-300 drop-shadow-lg" />
            </button>

            {/* Right Arrow */}
            <button
              onClick={scrollRight}
              className={`absolute right-0 top-12 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center transition-all duration-200 ${
                canScrollRight 
                  ? 'opacity-100 hover:scale-125' 
                  : 'opacity-30 cursor-not-allowed'
              }`}
              disabled={!canScrollRight}
              aria-label="Scroll right"
            >
              <ChevronRight className="w-7 h-7 text-gray-500 dark:text-gray-300 drop-shadow-lg" />
            </button>

            {/* Scrollable container */}
            <div 
              ref={scrollRef}
              className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide px-12"
              onScroll={checkScrollButtons}
              onLoad={checkScrollButtons}
            >
              {useCases.map((useCase, index) => {
                const IconComponent = useCase.icon;
                return (
                  <button
                    key={useCase.id}
                    className={`flex-shrink-0 flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-300 min-w-[100px] ${
                      activeUseCase === index
                        ? `${useCase.bgColor} ${useCase.borderColor} shadow-lg`
                        : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                    }`}
                    onClick={() => setActiveUseCase(index)}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      activeUseCase === index ? useCase.bgColor : 'bg-gray-100 dark:bg-gray-700'
                    }`}>
                      <IconComponent className={`w-5 h-5 ${
                        activeUseCase === index ? useCase.iconColor : 'text-gray-600 dark:text-gray-400'
                      }`} />
                    </div>
                    <span className={`text-xs font-medium text-center leading-tight ${
                      activeUseCase === index ? useCase.iconColor : 'text-gray-700 dark:text-gray-300'
                    }`}>
                      {useCase.title}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Scroll indicator dots */}
            <div className="flex justify-center gap-1 mt-2">
              {Array.from({ length: Math.ceil(useCases.length / 3) }).map((_, dotIndex) => (
                <div
                  key={dotIndex}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    Math.floor(activeUseCase / 3) === dotIndex
                      ? 'bg-gray-400 dark:bg-gray-500'
                      : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Mobile: Active use case details card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-start gap-4">
                <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br ${useCases[activeUseCase].gradient} flex-shrink-0`}>
                  {(() => {
                    const IconComponent = useCases[activeUseCase].icon;
                    return <IconComponent className="w-7 h-7 sm:w-8 sm:h-8 text-white" />;
                  })()}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                    {useCases[activeUseCase].title}
                  </h3>
                  <div className="flex items-center gap-2 mt-2">
                    <Users className="w-4 h-4 text-gray-500 flex-shrink-0" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {useCases[activeUseCase].popularWith}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quote */}
              <div className={`p-4 sm:p-6 rounded-xl ${useCases[activeUseCase].bgColor} border-l-4 ${useCases[activeUseCase].borderColor.replace('border-', 'border-l-')}`}>
                <blockquote className="text-base sm:text-lg italic text-gray-700 dark:text-gray-300 leading-relaxed">
                  &quot;{useCases[activeUseCase].description}&quot;
                </blockquote>
              </div>

              {/* Benefits - Mobile: 2x2 grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 dark:text-green-400 text-sm font-bold">✓</span>
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">One-time view only</span>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 dark:text-blue-400 text-sm font-bold">🔒</span>
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">Watermark protection</span>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-orange-600 dark:text-orange-400 text-sm font-bold">⏱️</span>
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">Auto-delete timer</span>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-600 dark:text-purple-400 text-sm font-bold">🔔</span>
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">View notifications</span>
                </div>
              </div>

              {/* CTA - Full width on mobile */}
              <div className="pt-2">
                {isSignedIn ? (
                  <button 
                    onClick={() => handleUseCaseAction(useCases[activeUseCase].title)}
                    className={`w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r ${useCases[activeUseCase].gradient} text-white font-medium rounded-xl hover:shadow-lg transition-all duration-200 active:scale-95 touch-manipulation`}
                  >
                    Create for {useCases[activeUseCase].title}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <SignUpButton 
                    mode="modal"
                    signInFallbackRedirectUrl={`/hello?useCase=${encodeURIComponent(useCases[activeUseCase].title.toLowerCase().replace(/\s+/g, '-'))}`}
                  >
                    <button className={`w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r ${useCases[activeUseCase].gradient} text-white font-medium rounded-xl hover:shadow-lg transition-all duration-200 active:scale-95 touch-manipulation`}>
                      Try for {useCases[activeUseCase].title}
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </SignUpButton>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout - Preserve existing design */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-8">
          {/* Use Case Cards - Left Side */}
          <div className="lg:col-span-1 space-y-4">
            {useCases.map((useCase, index) => {
              const IconComponent = useCase.icon;
              return (
                <div
                  key={useCase.id}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                    activeUseCase === index
                      ? `${useCase.bgColor} ${useCase.borderColor} shadow-lg`
                      : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                  onClick={() => setActiveUseCase(index)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      activeUseCase === index ? useCase.bgColor : 'bg-gray-100 dark:bg-gray-700'
                    }`}>
                      <IconComponent className={`w-5 h-5 ${
                        activeUseCase === index ? useCase.iconColor : 'text-gray-600 dark:text-gray-400'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-semibold ${
                        activeUseCase === index ? useCase.iconColor : 'text-gray-900 dark:text-white'
                      }`}>
                        {useCase.title}
                      </h3>
                    </div>
                    <ChevronRight className={`w-4 h-4 transition-transform ${
                      activeUseCase === index ? 'rotate-90' : ''
                    } ${activeUseCase === index ? useCase.iconColor : 'text-gray-400'}`} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Use Case Details - Right Side */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 h-full">
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br ${useCases[activeUseCase].gradient}`}>
                    {(() => {
                      const IconComponent = useCases[activeUseCase].icon;
                      return <IconComponent className="w-8 h-8 text-white" />;
                    })()}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {useCases[activeUseCase].title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Users className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Popular with: {useCases[activeUseCase].popularWith}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quote */}
                <div className={`p-6 rounded-xl ${useCases[activeUseCase].bgColor} border-l-4 ${useCases[activeUseCase].borderColor.replace('border-', 'border-l-')}`}>
                  <blockquote className="text-lg italic text-gray-700 dark:text-gray-300">
                    &quot;{useCases[activeUseCase].description}&quot;
                  </blockquote>
                </div>

                {/* Benefits for this use case */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                      <span className="text-green-600 dark:text-green-400 text-sm font-bold">✓</span>
                    </div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">One-time view only</span>
                  </div>
                  
                  <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600 dark:text-blue-400 text-sm font-bold">🔒</span>
                    </div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Watermark protection</span>
                  </div>
                  
                  <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                      <span className="text-orange-600 dark:text-orange-400 text-sm font-bold">⏱️</span>
                    </div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Auto-delete timer</span>
                  </div>
                  
                  <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                      <span className="text-purple-600 dark:text-purple-400 text-sm font-bold">🔔</span>
                    </div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">View notifications</span>
                  </div>
                </div>

                {/* CTA */}
                <div className="pt-4">
                  {isSignedIn ? (
                    <button 
                      onClick={() => handleUseCaseAction(useCases[activeUseCase].title)}
                      className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${useCases[activeUseCase].gradient} text-white font-medium rounded-xl hover:shadow-lg transition-all duration-200 hover:scale-105`}
                    >
                      Create for {useCases[activeUseCase].title}
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <SignUpButton 
                      mode="modal"
                      signInFallbackRedirectUrl={`/hello?useCase=${encodeURIComponent(useCases[activeUseCase].title.toLowerCase().replace(/\s+/g, '-'))}`}
                    >
                      <button className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${useCases[activeUseCase].gradient} text-white font-medium rounded-xl hover:shadow-lg transition-all duration-200 hover:scale-105`}>
                        Try for {useCases[activeUseCase].title}
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </SignUpButton>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UseCasesSection;
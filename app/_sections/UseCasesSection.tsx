// components/sections/UseCasesSection.tsx
"use client";

import { useState } from "react";
import { SignUpButton } from "@clerk/nextjs";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { GraduationCap, Heart, Dumbbell, Smile, Briefcase, MessageCircle, Users, ChevronRight } from "lucide-react";

export default function UseCasesSection() {
  const [activeUseCase, setActiveUseCase] = useState(0);
  const { isSignedIn } = useAuth();
  const router = useRouter();

  const handleUseCaseAction = (useCaseTitle: string) => {
    if (isSignedIn) {
      // If user is signed in, redirect to hello page with use case context
      router.push(`/hello?useCase=${encodeURIComponent(useCaseTitle.toLowerCase().replace(' ', '-'))}`);
    }
    // If not signed in, the SignUpButton will handle the auth flow
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
      description: "Sharing intimate videos with my partner safely. One view only, then it's gone forever.",
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
    <div className="px-6 py-16 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Perfect For Every Private Moment</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">See how others are using OnlyForYou to protect their privacy</p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
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
                      signInFallbackRedirectUrl={`/hello?useCase=${encodeURIComponent(useCases[activeUseCase].title.toLowerCase().replace(' ', '-'))}`}
                      
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

        {/* Bottom Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">45%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Students</div>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">28%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Couples</div>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">18%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Professionals</div>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">9%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Others</div>
          </div>
        </div>
      </div>
    </div>
  );
}
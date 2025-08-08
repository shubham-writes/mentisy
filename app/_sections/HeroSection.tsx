// components/sections/HeroSection.tsx
"use client";

import { useState, useEffect } from "react";
import { Eye, Shield, Zap, ArrowRight, Upload, Users, Timer, ExternalLink } from "lucide-react";

interface HeroSectionProps {
  userCount: number;
}

export default function HeroSection({ userCount = 2847 }: HeroSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [demoStep, setDemoStep] = useState(0);
  const [isAuthenticated] = useState(false); // Demo purposes

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Demo animation cycle
  useEffect(() => {
    const demoInterval = setInterval(() => {
      setDemoStep(prev => (prev + 1) % 4);
    }, 2000);
    
    return () => clearInterval(demoInterval);
  }, []);

  // Mock components for demo
  const SignUpButton = ({ children, mode }: { children: React.ReactNode; mode: string }) => (
    <div onClick={() => console.log('Sign up clicked')}>{children}</div>
  );

  const Authenticated = ({ children }: { children: React.ReactNode }) => 
    isAuthenticated ? <>{children}</> : null;

  const Unauthenticated = ({ children }: { children: React.ReactNode }) => 
    !isAuthenticated ? <>{children}</> : null;

  return (
    <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <div className="relative pt-8 sm:pt-12 md:pt-16 lg:pt-20 pb-8 sm:pb-12 md:pb-16 overflow-hidden">
        {/* Enhanced Background with Multiple Layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FF75A0]/8 to-[#FFAA70]/8 dark:from-[#FF75A0]/15 dark:to-[#FFAA70]/15" />
        
        {/* Animated Background Orbs */}
        <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-gradient-to-r from-[#FF75A0]/20 to-[#FFAA70]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-40 h-40 sm:w-60 sm:h-60 md:w-72 md:h-72 lg:w-80 lg:h-80 bg-gradient-to-r from-[#FFAA70]/20 to-[#FF75A0]/20 rounded-full blur-3xl animate-pulse delay-700" />
        
        <div className="relative px-4 sm:px-6 mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
            {/* Left Side - Content */}
            <div className="text-center lg:text-left space-y-4 sm:space-y-6 lg:space-y-1 order-2 lg:order-1">
              {/* Premium Badge */}
              <div className="relative inline-block">
                <span className="text-base sm:text-lg md:text-xl font-bold tracking-[0.2em] bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] bg-clip-text text-transparent">
                  FOR REAL MOMENTS
                </span>
              </div>
              
              {/* Main Headline with Enhanced Typography */}
              <div className="space-y-4 sm:space-y-6">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black leading-[0.9] tracking-tight">
                  Not everything needs to
                  <span className="block relative mt-1 sm:mt-2">
                    <span className="bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] bg-clip-text text-transparent">
                      Last forever
                    </span>
                    {/* Subtle underline effect */}
                    <div className="absolute -bottom-1 sm:-bottom-2 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-[#FF75A0]/30 to-[#FFAA70]/30 rounded-full" />
                  </span>
                </h1>
                
                <div className="space-y-3 sm:space-y-4">
                  <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed font-light mx-auto lg:mx-0">
                    <strong className="font-bold text-gray-900 dark:text-white">Say it once.</strong> Feel it fully share your most authentic moments that disappear after one view.
                  </p>
                </div>
              </div>

              {/* Enhanced CTA Buttons */}
              <div className="flex justify-center lg:justify-start pt-4 sm:pt-6">
                <Unauthenticated>
                  <SignUpButton mode="modal">
                    <button className="group relative inline-flex items-center justify-center gap-2 sm:gap-3 bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] text-white font-bold py-3 sm:py-4 lg:py-5 px-8 sm:px-12 lg:px-16 rounded-xl sm:rounded-2xl hover:shadow-2xl hover:shadow-[#FF75A0]/30 transition-all duration-300 hover:scale-105 text-base sm:text-lg overflow-hidden min-w-[280px] sm:min-w-[320px] touch-manipulation">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#e65a85] to-[#e6955a] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <span className="relative z-10">🎁 Try Free (5 Uploads)</span>
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                  </SignUpButton>
                </Unauthenticated>
                <Authenticated>
                  <button className="group relative inline-flex items-center justify-center gap-2 sm:gap-3 bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] text-white font-bold py-3 sm:py-4 lg:py-5 px-8 sm:px-12 lg:px-16 rounded-xl sm:rounded-2xl hover:shadow-2xl hover:shadow-[#FF75A0]/30 transition-all duration-300 hover:scale-105 text-base sm:text-lg overflow-hidden min-w-[280px] sm:min-w-[320px] touch-manipulation">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#e65a85] to-[#e6955a] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="relative z-10">🚀 Create Secret</span>
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </Authenticated>
              </div>

              {/* Enhanced Feature Pills - Single Row */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-3 pt-4 sm:pt-6 max-w-2xl mx-auto lg:mx-0">
                <div className="group flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-emerald-500/30 hover:border-emerald-500/50 transition-all duration-300 hover:scale-105 touch-manipulation">
                  <Eye className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-500 mr-1.5 sm:mr-2 group-hover:animate-pulse" />
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 whitespace-nowrap">One-time view</span>
                </div>
                <div className="group flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-blue-500/30 hover:border-blue-500/50 transition-all duration-300 hover:scale-105 touch-manipulation">
                  <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500 mr-1.5 sm:mr-2 group-hover:animate-pulse" />
                  <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 whitespace-nowrap">Watermark protection</span>
                </div>
                <div className="group flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-[#FFAA70]/30 hover:border-[#FFAA70]/50 transition-all duration-300 hover:scale-105 touch-manipulation">
                  <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-[#FFAA70] mr-1.5 sm:mr-2 group-hover:animate-pulse" />
                  <span className="text-xs font-semibold text-orange-600 dark:text-orange-400 whitespace-nowrap">No app required</span>
                </div>
              </div>

              {/* Mobile Social Proof - Only shown on mobile */}
              <div className="mt-6 text-center lg:hidden">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Trusted by {userCount.toLocaleString()}+ users</p>
                <div className="flex items-center justify-center space-x-1">
                  <div className="flex -space-x-1">
                    {[1,2,3,4,5].map((i) => (
                      <div key={i} className="w-6 h-6 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 border-2 border-white dark:border-gray-900 flex items-center justify-center text-xs font-bold text-white">
                        {String.fromCharCode(65 + i)}
                      </div>
                    ))}
                  </div>
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400 ml-2">
                    4.9⭐ rating
                  </span>
                </div>
              </div>
            </div>

            {/* Right Side - Enhanced Live Demo */}
            <div className="flex justify-center lg:justify-end lg:items-start order-1 lg:order-2">
              <div className="relative mt-0 lg:-mt-8">
                {/* Glowing background effect */}
                <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-[#FF75A0]/30 to-[#FFAA70]/30 rounded-2xl sm:rounded-3xl blur-xl sm:blur-2xl animate-pulse" />
                
                <div className="relative w-72 h-80 sm:w-80 sm:h-96 bg-gradient-to-br from-gray-100/95 to-gray-200/95 dark:from-gray-800/95 dark:to-gray-900/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-2xl border border-white/30 dark:border-gray-700/30">
                  <div className="bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl rounded-xl sm:rounded-2xl h-full p-4 sm:p-6 flex flex-col items-center justify-center border border-gray-200/50 dark:border-gray-700/50">
                    {demoStep === 0 && (
                      <div className="text-center space-y-4 sm:space-y-6 animate-fadeIn">
                        <div className="relative">
                          <Upload className="w-16 h-16 sm:w-20 sm:h-20 text-[#FF75A0] mx-auto animate-bounce" />
                          <div className="absolute -inset-2 bg-[#FF75A0]/20 rounded-full blur-xl" />
                        </div>
                        <h3 className="font-bold text-lg sm:text-xl bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent">1. Upload</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Select your photo or video</p>
                      </div>
                    )}
                    {demoStep === 1 && (
                      <div className="text-center space-y-4 sm:space-y-6 animate-fadeIn">
                        <div className="relative">
                          <Users className="w-16 h-16 sm:w-20 sm:h-20 text-blue-500 mx-auto animate-bounce" />
                          <div className="absolute -inset-2 bg-blue-500/20 rounded-full blur-xl" />
                        </div>
                        <h3 className="font-bold text-lg sm:text-xl bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent">2. Watermark</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Add recipient&apos;s name</p>
                      </div>
                    )}
                    {demoStep === 2 && (
                      <div className="text-center space-y-4 sm:space-y-6 animate-fadeIn">
                        <div className="relative">
                          <ExternalLink className="w-16 h-16 sm:w-20 sm:h-20 text-emerald-500 mx-auto animate-bounce" />
                          <div className="absolute -inset-2 bg-emerald-500/20 rounded-full blur-xl" />
                        </div>
                        <h3 className="font-bold text-lg sm:text-xl bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent">3. Share</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Copy link & send anywhere</p>
                      </div>
                    )}
                    {demoStep === 3 && (
                      <div className="text-center space-y-4 sm:space-y-6 animate-fadeIn">
                        <div className="relative">
                          <Timer className="w-16 h-16 sm:w-20 sm:h-20 text-red-500 mx-auto animate-pulse" />
                          <div className="absolute -inset-2 bg-red-500/20 rounded-full blur-xl animate-ping" />
                        </div>
                        <h3 className="font-bold text-lg sm:text-xl bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent">4. Auto Delete</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Gone after one view</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="absolute -bottom-6 sm:-bottom-8 left-1/2 transform -translate-x-1/2 text-center">
                  <span className="bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-full font-bold text-xs sm:text-sm shadow-lg whitespace-nowrap">
                    ⚡Takes less than 30 seconds
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-in-out;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
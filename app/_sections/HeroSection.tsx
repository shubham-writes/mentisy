// components/sections/HeroSection.tsx
"use client";

import { SignUpButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated } from "convex/react";

import React, { useState, useEffect } from "react";
import { Eye, Shield, Zap, ArrowRight, Upload, Users, Timer, ExternalLink, Gamepad2, Trophy, Sparkles, Target } from "lucide-react";

interface HeroSectionProps {
  userCount?: number;
}

export default function HeroSection({ userCount = 2847 }: HeroSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [demoStep, setDemoStep] = useState(0);
  const [isAuthenticated] = useState(false); // Demo purposes

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Demo animation cycle - extended to 5 steps for more engaging flow
  useEffect(() => {
    const demoInterval = setInterval(() => {
      setDemoStep(prev => (prev + 1) % 5);
    }, 2200);
    
    return () => clearInterval(demoInterval);
  }, []);

  return (
    <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <div className="relative pt-16 sm:pt-20 md:pt-28 pb-20 sm:pb-12 md:pb-16 overflow-hidden">
        {/* Enhanced Background with Multiple Layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FF75A0]/8 to-[#FFAA70]/8 dark:from-[#FF75A0]/15 dark:to-[#FFAA70]/15" />
        
        {/* Animated Background Orbs */}
        <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-gradient-to-r from-[#FF75A0]/20 to-[#FFAA70]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-40 h-40 sm:w-60 sm:h-60 md:w-72 md:h-72 lg:w-80 lg:h-80 bg-gradient-to-r from-[#FFAA70]/20 to-[#FF75A0]/20 rounded-full blur-3xl animate-pulse delay-700" />
        
        <div className="relative px-4 sm:px-6 mx-auto max-w-7xl">
          <div className="grid grid-cols-1  gap-8 sm:gap-12 md:gap-16 items-center">
            {/* Left Side - Content - Always first on mobile, first on desktop */}
            <div className="text-center  space-y-4 sm:space-y-6 lg:space-y-1">
              {/* Premium Badge */}
              <div className="relative mb-6 sm:mb-10 inline-block pt-4 sm:pt-0">
  <span className="text-[10px] sm:text-xs  font-semibold 
    px-4 py-2 rounded-full
    bg-gradient-to-r from-pink-500 via-red-400 to-yellow-400
    text-white shadow-md shadow-pink-200/50
    ring-2 ring-pink-300/50
     hover:scale-105 t">
    ✨ FOR SHARES THAT PLAY
  </span>
</div>

              
              {/* Main Headline with Enhanced Typography */}
              <div className="space-y-6 sm:space-y-8 ">
                <h1 className="text-3xl font-bold sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight tracking-tight">
                  Why only snap it…<br /> when your friends can <br />
                  <span className="bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] bg-clip-text text-transparent">
                    play for it?
                  </span>
                </h1>
                
                <div className="space-y-3 sm:space-y-4">
                  <p className="text-sm sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed font-light mx-auto ">
                    <strong className="font-bold text-gray-900 dark:text-white">Forget plain snaps.</strong> Send dares, challenges, and inside jokes that spark instant fun — then disappear in style.
                  </p>
                </div>
              </div>

              {/* Enhanced CTA Buttons */}
              <div className="flex justify-center  pt-4 sm:pt-6">
                <Unauthenticated>
                  
                    <button className="group relative inline-flex items-center justify-center gap-2 sm:gap-3 bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] text-white font-bold py-3 sm:py-3  px-8 sm:px-7  rounded-xl sm:rounded-2xl hover:shadow-2xl hover:shadow-[#FF75A0]/30 transition-all duration-300 hover:scale-105 text-base sm:text-lg overflow-hidden min-w-[280px]  touch-manipulation">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#e65a85] to-[#e6955a] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <SignUpButton mode="modal">
                      <span className="relative z-10">🎮 Try Free — Get 5 Plays</span>
                      </SignUpButton>
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                  
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
              <div className="flex flex-wrap justify-center  gap-2 sm:gap-3 pt-4 sm:pt-6 max-w-2xl mx-auto">
                <div className="group flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-emerald-500/30 hover:border-emerald-500/50 transition-all duration-300 hover:scale-105 touch-manipulation">
                  <Eye className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-500 mr-1.5 sm:mr-2 group-hover:animate-pulse" />
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 whitespace-nowrap">Fun Dares</span>
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
            </div>

            {/* Right Side - Enhanced Live Demo - Second on mobile, second on desktop */}
            <div className="flex justify-center pt-8 sm:pt-6 lg:pt-0 lg:items-start">
              <div className="relative sm:mt-0 lg:-mt-8">
                {/* Glowing background effect */}
                <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-[#FF75A0]/30 to-[#FFAA70]/30 rounded-2xl sm:rounded-3xl blur-xl sm:blur-2xl animate-pulse" />
                
                <div className="relative w-52 h-56 sm:w-80 sm:h-80 bg-gradient-to-br from-gray-100/95 to-gray-200/95 dark:from-gray-800/95 dark:to-gray-900/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-2xl border border-white/30 dark:border-gray-700/30">
                  <div className="bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl rounded-xl sm:rounded-2xl h-full p-4 sm:p-6 flex flex-col items-center justify-center border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
                    {demoStep === 0 && (
                      <div className="text-center space-y-4 sm:space-y-6 animate-fadeIn">
                        <div className="relative">
                          <Upload className="w-16 h-16 sm:w-20 sm:h-20 text-[#FF75A0] mx-auto animate-bounce" />
                          <div className="absolute -inset-2 bg-[#FF75A0]/20 rounded-full blur-xl" />
                        </div>
                        <h3 className="font-bold text-lg sm:text-xl bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] bg-clip-text text-transparent">1. Upload Fun Content</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Drop your photo or video</p>
                      </div>
                    )}
                    {demoStep === 1 && (
                      <div className="text-center space-y-4 sm:space-y-6 animate-fadeIn">
                        <div className="relative">
                          <Gamepad2 className="w-16 h-16 sm:w-20 sm:h-20 text-purple-500 mx-auto animate-pulse" />
                          <div className="absolute -inset-2 bg-purple-500/20 rounded-full blur-xl" />
                        </div>
                        <h3 className="font-bold text-lg sm:text-xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">2. Pick Your Game</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Scratch & See, Q&A, or Rush!</p>
                      </div>
                    )}
                    {demoStep === 2 && (
                      <div className="text-center space-y-4 sm:space-y-6 animate-fadeIn">
                        <div className="relative">
                          <Target className="w-16 h-16 sm:w-20 sm:h-20 text-emerald-500 mx-auto animate-pulse" />
                          <div className="absolute -inset-2 bg-emerald-500/20 rounded-full blur-xl animate-ping" />
                        </div>
                        <h3 className="font-bold text-lg sm:text-xl bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">3. Add Challenge</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Set dare or question</p>
                      </div>
                    )}
                    {demoStep === 3 && (
                      <div className="text-center space-y-4 sm:space-y-6 animate-fadeIn">
                        <div className="relative">
                          <ExternalLink className="w-16 h-16 sm:w-20 sm:h-20 text-blue-500 mx-auto animate-pulse" />
                          <div className="absolute -inset-2 bg-blue-500/20 rounded-full blur-xl" />
                          {/* Fun sharing particles */}
                          <div className="absolute top-0 left-0 w-2 h-2 bg-pink-400 rounded-full animate-ping" />
                          <div className="absolute top-4 right-2 w-1 h-1 bg-yellow-400 rounded-full animate-ping delay-300" />
                          <div className="absolute bottom-2 left-4 w-1.5 h-1.5 bg-purple-400 rounded-full animate-ping delay-700" />
                        </div>
                        <h3 className="font-bold text-lg sm:text-xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">4. Share & Play</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Friends earn the reveal!</p>
                      </div>
                    )}
                    {demoStep === 4 && (
                      <div className="text-center space-y-4 sm:space-y-6 animate-fadeIn">
                        <div className="relative">
                          <Trophy className="w-16 h-16 sm:w-20 sm:h-20 text-yellow-500 mx-auto animate-bounce" />
                          <div className="absolute -inset-2 bg-yellow-500/20 rounded-full blur-xl" />
                          {/* Celebration particles */}
                          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                            <div className="flex space-x-1">
                              <div className="w-1 h-1 bg-yellow-400 rounded-full animate-bounce" />
                              <div className="w-1 h-1 bg-pink-400 rounded-full animate-bounce delay-100" />
                              <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce delay-200" />
                            </div>
                          </div>
                        </div>
                        <h3 className="font-bold text-lg sm:text-xl bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">5. Auto-Vanish!</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Poof! Gone after the fun</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="absolute mt-2 sm:-bottom-8 left-1/2 transform -translate-x-1/2 text-center mb-8 sm:mb-0">
                  <span className="relative inline-flex items-center gap-1.5 bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-semibold text-xs sm:text-sm shadow-lg whitespace-nowrap hover:scale-105 transition-transform duration-200">
                    <Sparkles className="w-3 h-3" />
                    Pure fun in 30 seconds
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-in-out;
        }
        
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(15px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
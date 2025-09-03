// components/sections/HeroSection.tsx
"use client";

import { SignUpButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated } from "convex/react";


import React, { useState, useEffect } from "react";
import { Zap, ArrowRight, Users, Sparkles, Clock, Gamepad2, Target } from "lucide-react";

interface HeroSectionProps {
  userCount?: number;
}

export default function HeroSection({ userCount = 2847 }: HeroSectionProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <div className="relative pt-16 sm:pt-20 md:pt-28 pb-20 sm:pb-12 md:pb-16 overflow-hidden">
        {/* Simplified Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FF75A0]/8 to-[#FFAA70]/8 dark:from-[#FF75A0]/15 dark:to-[#FFAA70]/15" />
        
        {/* Subtle Background Orbs - Reduced intensity */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-gradient-to-r from-[#FF75A0]/10 to-[#FFAA70]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 md:w-80 md:h-80 bg-gradient-to-r from-[#FFAA70]/10 to-[#FF75A0]/10 rounded-full blur-3xl" />
        
        <div className="relative px-4 sm:px-6 mx-auto max-w-4xl">
          <div className="text-center space-y-6 sm:space-y-8">
            
            {/* Beta Badge - Social Proof */}
            <div className="inline-block mb-4 mt-4 sm:mt-auto">
              <span className="text-[10px] sm:text-xs font-semibold 
                px-4 py-2 rounded-full
                bg-gradient-to-r from-emerald-500 to-blue-500
                text-white shadow-lg
                ring-2 ring-emerald-300/30">
                ✨ BECOME A FOUNDING MEMBER
              </span>
            </div>

            {/* Clear, Benefit-Focused Headline */}
            <div className="space-y-4 sm:space-y-6">
              <h1 className="text-3xl font-bold sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight tracking-tight">
                Turn Your Photos Into <br />
                <span className="bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] bg-clip-text text-transparent">
                  Fun Games
                </span> for Friends
              </h1>
              
              {/* Clear Value Proposition + Exclusive Offer */}
              <div className="space-y-4 max-w-2xl mx-auto">
                <p className="text-sm sm:text-lg md:text-xl text-gray-700 dark:text-gray-200 leading-relaxed">Join our  <strong>free beta</strong> and become a <strong>founding member.</strong> You&apos;ll get<strong className="text-emerald-600 dark:text-emerald-400"> 100% free</strong> access to all features to turn your shares into interactive games.
                </p>
                
                {/* Key Benefits - Fun & Game-focused */}
                <div className="flex flex-wrap justify-center pt-4 sm:pt-6 gap-2">
                  <div className="flex items-center px-2 rounded-lg bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-700">
                    <Sparkles className="w-3 h-3 text-purple-600 mr-2" />
                    <span className="text-xs font-medium text-purple-700 dark:text-purple-300">Scratch & See</span>
                  </div>
                  <div className="flex items-center px-3 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-700">
                    <Zap className="w-3 h-3 text-emerald-600 mr-2" />
                    <span className="text-xs font-medium text-emerald-700 dark:text-emerald-300">Question & Answer</span>
                  </div>
                  <div className="flex items-center px-3 py-1 rounded-lg bg-orange-50 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-700">
                    <Clock className="w-3 h-3 text-orange-600 mr-2" />
                    <span className="text-xs font-medium text-orange-700 dark:text-orange-300">Group Games</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Single, Clear CTA */}
            <div className="pt-6 sm:pt-8">
              <Unauthenticated>
                <button className="group relative inline-flex items-center justify-center gap-2 sm:gap-3 bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] text-white font-bold py-3 sm:py-3  px-8 sm:px-7  rounded-xl sm:rounded-2xl hover:shadow-2xl hover:shadow-[#FF75A0]/30 transition-all duration-300 hover:scale-105 text-base sm:text-lg overflow-hidden min-w-[280px]  touch-manipulation">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#e65a85] to-[#e6955a] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <SignUpButton mode="modal">
                      <span className="relative z-10">Get Your Free Early Access</span>
                      </SignUpButton>
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
              </Unauthenticated>
              
              <Authenticated>
                <button className="group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] text-white font-bold py-4 sm:py-5 px-8 sm:px-12 rounded-2xl hover:shadow-2xl hover:shadow-[#FF75A0]/30 transition-all duration-300 hover:scale-105 text-lg sm:text-xl overflow-hidden min-w-[300px] touch-manipulation">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#e65a85] to-[#e6955a] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10">Create Your First Game</span>
                  <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </Authenticated>
              
              {/* Risk Reversal / Trust Signal */}
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 max-w-md mx-auto">
                No credit card required. Your founding member status is free, forever
              </p>
            </div>

            {/* How it Works - Simple 3-step */}
            <div className="pt-12 sm:pt-16">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-orange-400 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto">
                    <Gamepad2 className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Pick Your Game</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Scratch & See, Q&A, or Rush</p>
                </div>
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto">
                    <Target className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Add Challenge</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Set dare or question for friends</p>
                </div>
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Friends Play & Win</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">They earn the reveal through play</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
       
      </div>
    </div>
  );
}
// components/sections/FinalCta.tsx
"use client";

import { SignUpButton } from "@clerk/nextjs";
import { Gamepad2, ArrowRight, Sparkles, Users, Trophy } from "lucide-react";

interface FinalCtaProps {
  userCount: number;
}

export default function FinalCta({ userCount }: FinalCtaProps) {
  return (
    <div className="px-4  dark:border-b-2 sm:px-6 py-12 sm:py-16 bg-gray-50 dark:bg-gray-900/50 relative">
      {/* Subtle gradient corners */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FF75A0]/10 via-transparent to-[#FFAA70]/10 pointer-events-none"></div>

      <div className="max-w-2xl mx-auto text-center relative z-10">
        <div className="space-y-6 sm:space-y-8">
          {/* Icon cluster */}
          <div className="flex items-center justify-center gap-2">
            
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] rounded-2xl flex items-center justify-center transform scale-110">
              <span className="text-2xl sm:text-3xl">🎮</span>
            </div>
            
          </div>

          <div className="space-y-4">
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-gray-900 dark:text-white">
              Ready to turn photo sharing into{" "}
              <span className=" bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] bg-clip-text text-transparent">
                a game?
              </span>
            </h3>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-xl mx-auto">
              Stop sending boring photos. Start creating moments your friends will actually get excited about! 🚀
            </p>
          </div>

          {/* Game features mini showcase */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 py-2">
            <div className="bg-white dark:bg-gray-800 border border-purple-200 dark:border-purple-700/50 rounded-full px-4 py-2 text-gray-700 dark:text-gray-300 text-sm font-medium hover:border-purple-400 dark:hover:border-purple-500 transition-colors">
              🎨 Scratch & See
            </div>
            <div className="bg-white dark:bg-gray-800 border border-blue-200 dark:border-blue-700/50 rounded-full px-4 py-2 text-gray-700 dark:text-gray-300 text-sm font-medium hover:border-blue-400 dark:hover:border-blue-500 transition-colors">
              🧠 Q&A Challenge
            </div>
            <div className="bg-white dark:bg-gray-800 border border-orange-200 dark:border-orange-700/50 rounded-full px-4 py-2 text-gray-700 dark:text-gray-300 text-sm font-medium hover:border-orange-400 dark:hover:border-orange-500 transition-colors">
              🏆 Reveal Rush
            </div>
            <div className="bg-white dark:bg-gray-800 border border-green-200 dark:border-green-700/50 rounded-full px-4 py-2 text-gray-700 dark:text-gray-300 text-sm font-medium hover:border-green-400 dark:hover:border-green-500 transition-colors">
              ⭐ Rate My...
            </div>
          </div>
          
          <div className="pt-4 sm:pt-6">
            <SignUpButton mode="modal">
              <button className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] text-white font-bold py-4 sm:py-5 px-6 sm:px-10 rounded-2xl hover:shadow-2xl hover:shadow-[#FF75A0]/25 transition-all duration-300 hover:scale-105 text-base sm:text-lg touch-manipulation">
                <span className="text-center flex-1 sm:flex-none">🎉 Start Your First Photo Game</span>
                <div className="flex-shrink-0 w-8 h-8 bg-white/30 rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                  <ArrowRight className="w-4 h-4 text-white" />
                </div>
              </button>
            </SignUpButton>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-gray-600 dark:text-gray-300 text-sm">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>{userCount.toLocaleString()} early gamers</span>
            </div>
            <div className="hidden sm:block w-1 h-1 bg-gray-400 dark:bg-gray-500 rounded-full"></div>
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              <span>Beta access • Free forever</span>
            </div>
          </div>

          {/* Social proof mini testimonial */}
          <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 max-w-md mx-auto">
            <p className="text-gray-700 dark:text-gray-300 text-sm italic">
              &ldquo;My friend group is obsessed! We spend hours trying to guess each other&apos;s ratings&ldquo; 
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-xs mt-2">- Maya, early tester</p>
          </div>
        </div>
      </div>
    </div>
  );
}
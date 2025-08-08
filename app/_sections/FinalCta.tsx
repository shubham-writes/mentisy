// components/sections/FinalCta.tsx
"use client";

import { SignUpButton } from "@clerk/nextjs";
import { Heart, ArrowRight } from "lucide-react";

interface FinalCtaProps {
  userCount: number;
}

export default function FinalCta({ userCount }: FinalCtaProps) {
  return (
    <div className="px-4 sm:px-6 py-12 sm:py-16 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-lg mx-auto text-center">
        <div className="space-y-5 sm:space-y-6">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto">
            <Heart className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold leading-tight">Ready to share authentically?</h3>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 leading-relaxed px-2">
            Some moments are too real for permanence. Share them here.
          </p>
          
          <div className="pt-2 sm:pt-4">
            <SignUpButton mode="modal">
              <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] text-white font-medium py-4 px-6 sm:px-8 rounded-xl hover:shadow-lg hover:shadow-[#FF75A0]/25 transition-all duration-200 hover:scale-105 text-base sm:text-lg touch-manipulation">
                <span className="text-center flex-1 sm:flex-none">🎉 Share Your First #JustOneView Moment</span>
                <ArrowRight className="w-5 h-5 flex-shrink-0" />
              </button>
            </SignUpButton>
          </div>
          
          <p className="text-sm text-gray-500 dark:text-gray-400 pt-1 sm:pt-2">
            Join {userCount.toLocaleString()} others sharing their truth
          </p>
        </div>
      </div>
    </div>
  );
}
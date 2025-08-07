// components/sections/FinalCta.tsx
"use client";

import { SignUpButton } from "@clerk/nextjs";
import { Heart, ArrowRight } from "lucide-react";

interface FinalCtaProps {
  userCount: number;
}

export default function FinalCta({ userCount }: FinalCtaProps) {
  return (
    <div className="px-6 py-16 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-lg mx-auto text-center">
        <div className="space-y-6">
          <div className="w-16 h-16 bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] rounded-2xl flex items-center justify-center mx-auto">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-3xl font-bold">Ready to share authentically?</h3>
          <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
            Some moments are too real for permanence. Share them here.
          </p>
          
          <div className="pt-4">
            <SignUpButton mode="modal">
              <button className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] text-white font-medium py-4 px-8 rounded-xl hover:shadow-lg hover:shadow-[#FF75A0]/25 transition-all duration-200 hover:scale-105 text-lg">
                🎉 Share Your First #JustOneView Moment
                <ArrowRight className="w-5 h-5" />
              </button>
            </SignUpButton>
          </div>
          
          <p className="text-sm text-gray-500 dark:text-gray-400 pt-2">
            Join {userCount.toLocaleString()} others sharing their truth
          </p>
        </div>
      </div>
    </div>
  );
}
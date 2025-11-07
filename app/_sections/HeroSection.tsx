// components/sections/HeroSection.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Upload, Lock, Unlock } from "lucide-react";

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      {/* Expanded Background - covers entire hero section */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FF75A0]/8 to-[#FFAA70]/8 dark:from-[#FF75A0]/15 dark:to-[#FFAA70]/15" />

      {/* Subtle Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-gradient-to-r from-[#FF75A0]/10 to-[#FFAA70]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-1/4 w-48 h-48 md:w-80 md:h-80 bg-gradient-to-r from-[#FFAA70]/10 to-[#FF75A0]/10 rounded-full blur-3xl" />

      <div className="relative pt-16 sm:pt-20 md:pt-28 pb-12 sm:pb-8 md:pb-12 overflow-hidden">
        <div className="relative px-4 sm:px-6 mx-auto max-w-4xl">
          <div className="text-center space-y-4 sm:space-y-6">

            {/* Clear, Powerful Headline */}
            <h1 className="text-4xl font-bold sm:text-4xl md:text-6xl leading-tight tracking-tight">
              <span className="bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] bg-clip-text text-transparent">
                The Fun, Fair Way
              </span>
              <br />
              to Share Photos
            </h1>

            {/* Simple Value Proposition */}
            <p className="text-sm sm:text-lg md:text-lg text-gray-700 dark:text-gray-200 leading-relaxed max-w-3xl mx-auto">
              You only see their photo after you send yours. <br />
              Try it now, no account needed.
            </p>

          </div>
        </div>
      </div>

      {/* PicSwap-Specific How it Works - To be placed BELOW the form */}
      <div className="relative px-4 sm:px-6 mx-auto max-w-4xl pb-16 sm:pb-20">

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div className="text-center space-y-3">
            <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-orange-400 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto">
              <Upload className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white">You Upload</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Share your photo and get a unique link</p>
          </div>

          <div className="text-center space-y-3">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Friend Sees Form</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">They must upload their photo to unlock yours</p>
          </div>

          <div className="text-center space-y-3">
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto">
              <Unlock className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Both Revealed</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Fair exchange—you both see each other&apos;s photos</p>
          </div>
        </div>
      </div>
    </div>
  );
}
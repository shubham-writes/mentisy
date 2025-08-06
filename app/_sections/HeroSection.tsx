// components/sections/HeroSection.tsx
"use client";

import { useState, useEffect } from "react";
import { SignUpButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated } from "convex/react";
import { Eye, Shield, Zap, ArrowRight, Upload, Users, Timer, Link as LinkIcon } from "lucide-react";

interface HeroSectionProps {
  userCount: number;
}

export default function HeroSection({ userCount }: HeroSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [demoStep, setDemoStep] = useState(0);

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

  return (
    <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div className="relative pt-16 pb-12">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FF75A0]/5 via-transparent to-[#FFAA70]/5 dark:from-[#FF75A0]/10 dark:via-transparent dark:to-[#FFAA70]/10" />
        
        <div className="relative px-6 mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Content */}
            <div className="text-center lg:text-left space-y-6">
              {/* Dynamic Counter Badge */}
              <div className="inline-flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 border border-emerald-200 dark:border-emerald-700">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2" />
                <span className="text-sm text-emerald-700 dark:text-emerald-300 font-medium">
                  Join {userCount.toLocaleString()} others sending secrets today!
                </span>
              </div>
              
              {/* Main Headline */}
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  Send your most
                  <span className="block bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] bg-clip-text text-transparent">
                    personal moments
                  </span>
                </h1>
                
                <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed">
                  <strong>Just once.</strong> With no fear of leaks, screenshots, or downloads. Share your truth authentically.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Unauthenticated>
                  <SignUpButton mode="modal">
                    <button className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] text-white font-medium py-4 px-8 rounded-xl hover:shadow-lg hover:shadow-[#FF75A0]/25 transition-all duration-200 hover:scale-105 text-lg">
                      🎁 Try Free (5 Uploads)
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </SignUpButton>
                </Unauthenticated>
                <Authenticated>
                  <button className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] text-white font-medium py-4 px-8 rounded-xl hover:shadow-lg hover:shadow-[#FF75A0]/25 transition-all duration-200 hover:scale-105 text-lg">
                    🚀 Create Secret
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </Authenticated>
                <button className="inline-flex items-center justify-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-medium py-4 px-8 rounded-xl hover:shadow-lg transition-all duration-200 text-lg">
                  👀 Preview a Real Example
                </button>
              </div>

              {/* Feature Pills */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-3 pt-4">
                <div className="flex items-center px-4 py-2 rounded-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-emerald-500/20">
                  <Eye className="w-4 h-4 text-emerald-500 mr-2" />
                  <span className="text-sm text-emerald-600 dark:text-emerald-400">One-time view</span>
                </div>
                <div className="flex items-center px-4 py-2 rounded-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-blue-500/20">
                  <Shield className="w-4 h-4 text-blue-500 mr-2" />
                  <span className="text-sm text-blue-600 dark:text-blue-400">Watermark protection</span>
                </div>
                <div className="flex items-center px-4 py-2 rounded-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-[#FFAA70]/20">
                  <Zap className="w-4 h-4 text-[#FFAA70] mr-2" />
                  <span className="text-sm text-orange-600 dark:text-orange-400">No app required</span>
                </div>
              </div>
            </div>

            {/* Right Side - Live Demo */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="w-80 h-96 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-4 shadow-2xl">
                  <div className="bg-white dark:bg-gray-950 rounded-2xl h-full p-6 flex flex-col items-center justify-center">
                    {demoStep === 0 && (
                      <div className="text-center space-y-4 animate-fadeIn">
                        <Upload className="w-16 h-16 text-[#FF75A0] mx-auto" />
                        <h3 className="font-semibold text-lg">1. Upload</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Select your photo or video</p>
                      </div>
                    )}
                    {demoStep === 1 && (
                      <div className="text-center space-y-4 animate-fadeIn">
                        <Users className="w-16 h-16 text-blue-500 mx-auto" />
                        <h3 className="font-semibold text-lg">2. Watermark</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Add recipient&apos;s name</p>
                      </div>
                    )}
                    {demoStep === 2 && (
                      <div className="text-center space-y-4 animate-fadeIn">
                        <LinkIcon className="w-16 h-16 text-emerald-500 mx-auto" />
                        <h3 className="font-semibold text-lg">3. Share</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Copy link & send anywhere</p>
                      </div>
                    )}
                    {demoStep === 3 && (
                      <div className="text-center space-y-4 animate-fadeIn">
                        <Timer className="w-16 h-16 text-red-500 mx-auto animate-pulse" />
                        <h3 className="font-semibold text-lg">4. Auto Delete</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Gone after one view</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-xs text-center">
                  <span className="bg-[#FF75A0] text-white px-3 py-1 rounded-full">
                    ⚡Takes less than 30 seconds
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
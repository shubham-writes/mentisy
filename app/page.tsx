"use client";

import { useState, useEffect } from "react";
import { Authenticated, Unauthenticated } from "convex/react";
import { SecretForm } from "@/components/secret-form";
import { MySecretsList } from "@/components/my-secrets-list";
import { Heart, Eye, Clock, Zap, Shield, Sparkles } from "lucide-react";
import {  SignUpButton } from "@clerk/nextjs";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Prevent automatic scrolling on authentication
  useEffect(() => {
    // Set scroll behavior to auto to prevent smooth scrolling during auth transitions
    const originalScrollBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = 'auto';
    
    // Scroll to top immediately when component mounts
    window.scrollTo(0, 0);
    
    // Restore scroll behavior after a short delay
    const timer = setTimeout(() => {
      document.documentElement.style.scrollBehavior = originalScrollBehavior || 'smooth';
    }, 100);

    return () => {
      clearTimeout(timer);
      document.documentElement.style.scrollBehavior = originalScrollBehavior;
    };
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0D0D0D] text-gray-900 dark:text-white transition-colors duration-300">
      <Unauthenticated>
        {/* Hero Section */}
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="relative overflow-hidden  pt-16">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF75A0]/5 via-transparent to-[#B388EB]/5 dark:from-[#FF75A0]/10 dark:via-transparent dark:to-[#B388EB]/10" />
            
            {/* Hero Content */}
            <div className="relative px-6 py-16 mx-auto max-w-4xl">
              <div className="text-center space-y-8">
                {/* Main Headline */}
                <div className="space-y-4">
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-100 dark:bg-[#1B1B1B] border border-[#FF75A0]/20">
                    <Sparkles className="w-4 h-4 text-[#FF75A0] mr-2" />
                    <span className="text-sm text-gray-600 dark:text-[#A0A0A0] uppercase tracking-wide">For the real moments</span>
                  </div>
                  
                  <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                    Not everything needs to
                    <span className="block bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] bg-clip-text text-transparent">
                      last forever
                    </span>
                  </h1>
                  
                  <p className="text-xl md:text-2xl text-gray-600 dark:text-[#A0A0A0] max-w-2xl mx-auto leading-relaxed">
                    Say it once. Feel it fully. Share your most authentic moments that disappear after one view.
                  </p>
                </div>

                {/* Feature Pills */}
                <div className="flex flex-wrap justify-center gap-3 py-4">
                  <div className="flex items-center px-4 py-2 rounded-full bg-white/80 dark:bg-[#1B1B1B]/80 backdrop-blur-sm border border-[#3CE2A9]/20">
                    <Eye className="w-4 h-4 text-[#3CE2A9] mr-2" />
                    <span className="text-sm text-[#3CE2A9]">One-time view</span>
                  </div>
                  <div className="flex items-center px-4 py-2 rounded-full bg-white/80 dark:bg-[#1B1B1B]/80 backdrop-blur-sm border border-[#B388EB]/20">
                    <Shield className="w-4 h-4 text-[#B388EB] mr-2" />
                    <span className="text-sm text-[#B388EB]">100% private texts</span>
                  </div>
                  <div className="flex items-center px-4 py-2 rounded-full bg-white/80 dark:bg-[#1B1B1B]/80 backdrop-blur-sm border border-[#FFC857]/20">
                    <Zap className="w-4 h-4 text-[#FFC857] mr-2" />
                    <span className="text-sm text-[#FFC857]">No app required</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="px-6 pb-12">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                Send something <span className="text-[#FF75A0]">real</span> for once
              </h2>
              <p className="text-gray-600 dark:text-[#A0A0A0] text-lg">
                5 seconds of bravery. One moment of truth.
              </p>
            </div>
            
            {/* Secret Form Container */}
            <div className="bg-white/90 dark:bg-[#1B1B1B] rounded-3xl p-8 border border-gray-200 dark:border-[#FF75A0]/10 shadow-2xl backdrop-blur-sm">
              <div className="mb-6 text-center">
                <p className="text-gray-600 dark:text-[#A0A0A0] text-sm mb-2">Try it now - no signup needed</p>
                <div className="w-full h-px bg-gradient-to-r from-transparent via-[#FF75A0]/30 to-transparent" />
              </div>
              
              <SecretForm isLandingPage={true} />
              
              <div className="mt-6 text-center">
                <p className="text-xs text-gray-500 dark:text-[#A0A0A0]">
                  <Shield className="w-3 h-3 inline mr-1" />
                  Your secrets are encrypted and never stored permanently
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Comparison */}
        <div className="px-6 py-16 bg-gray-50/50 dark:bg-[#1B1B1B]/30">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold mb-4">Why OnlyForYou hits different</h3>
              <p className="text-gray-600 dark:text-[#A0A0A0] text-lg">Finally, a platform that gets it</p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full bg-white dark:bg-[#1B1B1B] rounded-2xl overflow-hidden shadow-lg">
                <thead className="bg-gray-100 dark:bg-[#FF75A0]/10">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900 dark:text-white">Feature</th>
                    <th className="px-6 py-4 text-center font-semibold text-[#FF75A0]">OnlyForYou</th>
                    <th className="px-6 py-4 text-center font-semibold text-gray-600 dark:text-[#A0A0A0]">WhatsApp</th>
                    <th className="px-6 py-4 text-center font-semibold text-gray-600 dark:text-[#A0A0A0]">Snapchat</th>
                    <th className="px-6 py-4 text-center font-semibold text-gray-600 dark:text-[#A0A0A0]">Others</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-t border-gray-200 dark:border-[#A0A0A0]/10">
                    <td className="px-6 py-4 text-gray-900 dark:text-white">One-Time View</td>
                    <td className="px-6 py-4 text-center text-[#3CE2A9]">✅</td>
                    <td className="px-6 py-4 text-center text-[#3CE2A9]">✅</td>
                    <td className="px-6 py-4 text-center text-[#3CE2A9]">✅</td>
                    <td className="px-6 py-4 text-center text-gray-500 dark:text-[#A0A0A0]">❌</td>
                  </tr>
                  <tr className="border-t border-gray-200 dark:border-[#A0A0A0]/10">
                    <td className="px-6 py-4 text-gray-900 dark:text-white">Private Text Messages</td>
                    <td className="px-6 py-4 text-center text-[#3CE2A9] font-semibold">✅ 100%</td>
                    <td className="px-6 py-4 text-center text-gray-500 dark:text-[#A0A0A0]">❌</td>
                    <td className="px-6 py-4 text-center text-gray-500 dark:text-[#A0A0A0]">❌</td>
                    <td className="px-6 py-4 text-center text-gray-500 dark:text-[#A0A0A0]">❌</td>
                  </tr>
                  <tr className="border-t border-gray-200 dark:border-[#A0A0A0]/10">
                    <td className="px-6 py-4 text-gray-900 dark:text-white">No App Required</td>
                    <td className="px-6 py-4 text-center text-[#3CE2A9]">✅</td>
                    <td className="px-6 py-4 text-center text-gray-500 dark:text-[#A0A0A0]">❌</td>
                    <td className="px-6 py-4 text-center text-gray-500 dark:text-[#A0A0A0]">❌</td>
                    <td className="px-6 py-4 text-center text-[#3CE2A9]">✅</td>
                  </tr>
                  <tr className="border-t border-gray-200 dark:border-[#A0A0A0]/10">
                    <td className="px-6 py-4 text-gray-900 dark:text-white">View Notifications</td>
                    <td className="px-6 py-4 text-center text-[#3CE2A9]">✅</td>
                    <td className="px-6 py-4 text-center text-[#FFC857]">⚠️ Limited</td>
                    <td className="px-6 py-4 text-center text-[#3CE2A9]">✅</td>
                    <td className="px-6 py-4 text-center text-gray-500 dark:text-[#A0A0A0]">❌</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Emotional CTA */}
        <div className="px-6 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="space-y-6">
              <Heart className="w-12 h-12 text-[#FF75A0] mx-auto" />
              <h3 className="text-3xl font-bold">Ready to be vulnerable?</h3>
              <p className="text-gray-600 dark:text-[#A0A0A0] text-lg leading-relaxed">
                Some things are too real for screenshots. Too personal for permanence. 
                Too honest for your regular feed.
              </p>
               <SignUpButton mode="modal" fallbackRedirectUrl="/hello" forceRedirectUrl="/">
              <button className="w-full max-w-sm mx-auto bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] text-white font-semibold py-4 px-8 rounded-2xl hover:shadow-lg hover:shadow-[#FF75A0]/25 transition-all duration-300 transform hover:scale-105">
                Send Your First Secret ✨
              </button>
             </SignUpButton>
              



              <p className="text-xs text-gray-500 dark:text-[#A0A0A0]">
                Join thousands sharing their truth, one disappearing moment at a time
              </p>
            </div>
          </div>
        </div>
      </Unauthenticated>

      <Authenticated>
        <div className="min-h-screen flex flex-col">
          {/* Scroll to top when authenticated */}
          <div style={{ scrollBehavior: 'smooth' }}>
            {/* Authenticated Header */}
            <div className="px-6 py-8">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Your Secret Space</h1>
                    <p className="text-gray-600 dark:text-[#A0A0A0]">Share what matters, watch it disappear</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-[#3CE2A9] rounded-full animate-pulse" />
                    <span className="text-sm text-[#3CE2A9]">Online</span>
                  </div>
                </div>
                
                {/* Secret Form for Authenticated Users */}
                <div className="bg-white/90 dark:bg-[#1B1B1B] rounded-3xl p-8 border border-gray-200 dark:border-[#FF75A0]/10 mb-8 shadow-lg backdrop-blur-sm">
                  <SecretForm isLandingPage={false} />
                </div>
                
                {/* Secrets List */}
                <div className="bg-white/90 dark:bg-[#1B1B1B] rounded-3xl p-8 border border-gray-200 dark:border-[#B388EB]/10 shadow-lg backdrop-blur-sm">
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Your Sent Secrets</h2>
                    <p className="text-gray-600 dark:text-[#A0A0A0] text-sm">Track your disappearing moments</p>
                  </div>
                  <MySecretsList />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Authenticated>
    </div>
  );
}
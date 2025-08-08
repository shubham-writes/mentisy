// components/sections/PricingSection.tsx
"use client";

import { Check, X } from "lucide-react";

export default function PricingSection() {
  // Mock SignUpButton for demo
  const SignUpButton = ({ children, mode }: { children: React.ReactNode; mode: string }) => (
    <div onClick={() => console.log('Sign up clicked')}>{children}</div>
  );

  return (
    <div className="px-4 sm:px-6 py-8 sm:py-12 md:py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-white">What You Get — Free vs Pro</h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400">Level up your challenge</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Free Plan */}
          <div className="bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8">
            <div className="text-center mb-6">
              <h3 className="text-xl sm:text-2xl font-bold mb-2 text-gray-900 dark:text-white">Free Plan</h3>
              <p className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">₹0</p>
              <p className="text-sm sm:text-base text-gray-500">Perfect to get started</p>
            </div>
            
            <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              <li className="flex items-center gap-2 sm:gap-3">
                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 flex-shrink-0" />
                <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300">5 uploads per month</span>
              </li>
              <li className="flex items-center gap-2 sm:gap-3">
                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 flex-shrink-0" />
                <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300">Basic watermark (Name/IP)</span>
              </li>
              <li className="flex items-center gap-2 sm:gap-3">
                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 flex-shrink-0" />
                <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300">Timer & auto delete</span>
              </li>
              <li className="flex items-center gap-2 sm:gap-3 opacity-50">
                <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                <span className="text-sm sm:text-base text-gray-500">Album creation</span>
              </li>
              <li className="flex items-center gap-2 sm:gap-3 opacity-50">
                <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                <span className="text-sm sm:text-base text-gray-500">Add notes</span>
              </li>
              <li className="flex items-center gap-2 sm:gap-3 opacity-50">
                <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                <span className="text-sm sm:text-base text-gray-500">HD quality</span>
              </li>
            </ul>
            
            <SignUpButton mode="modal">
              <button className="w-full py-3 px-4 sm:px-6 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg sm:rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] touch-manipulation text-sm sm:text-base">
                Get Started Free
              </button>
            </SignUpButton>
          </div>

          {/* Pro Plan */}
          <div className="bg-gradient-to-br from-[#FF75A0]/10 to-[#FFAA70]/10 border-2 border-[#FF75A0] rounded-xl sm:rounded-2xl p-6 sm:p-8 relative">
            <div className="absolute -top-2 sm:-top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] text-white px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-medium shadow-lg">
                Most Popular
              </span>
            </div>
            
            <div className="text-center mb-6">
              <h3 className="text-xl sm:text-2xl font-bold mb-2 text-gray-900 dark:text-white">Pro Plan</h3>
              <p className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] bg-clip-text text-transparent">₹99</p>
              <p className="text-sm sm:text-base text-gray-500">per month</p>
            </div>
            
            <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              <li className="flex items-center gap-2 sm:gap-3">
                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 flex-shrink-0" />
                <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                  <strong>Unlimited</strong> uploads
                </span>
              </li>
              <li className="flex items-center gap-2 sm:gap-3">
                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 flex-shrink-0" />
                <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300">Full watermark + toggle</span>
              </li>
              <li className="flex items-center gap-2 sm:gap-3">
                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 flex-shrink-0" />
                <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300">Timer & auto delete</span>
              </li>
              <li className="flex items-center gap-2 sm:gap-3">
                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 flex-shrink-0" />
                <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300">Create multi-part story raids</span>
              </li>
              <li className="flex items-center gap-2 sm:gap-3">
                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 flex-shrink-0" />
                <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300">Add personal notes</span>
              </li>
              <li className="flex items-center gap-2 sm:gap-3">
                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 flex-shrink-0" />
                <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300">HD quality uploads</span>
              </li>
            </ul>
            
            <button className="w-full py-3 px-4 sm:px-6 bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] text-white rounded-lg sm:rounded-xl font-medium hover:shadow-lg hover:shadow-[#FF75A0]/25 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] touch-manipulation text-sm sm:text-base">
              🚀 Free 7-day Pro Trial
            </button>
          </div>
        </div>

        {/* Mobile-Only Additional Info */}
        <div className="mt-8 text-center md:hidden">
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <h4 className="font-bold text-sm text-gray-900 dark:text-white mb-2">💡 Why upgrade to Pro?</h4>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              Create complete stories with multiple parts, add personal notes, and enjoy unlimited HD uploads. 
              Perfect for deeper connections and premium sharing experiences.
            </p>
            <div className="mt-3 flex items-center justify-center space-x-4 text-xs text-gray-500">
              <span className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-1.5 animate-pulse" />
                Cancel anytime
              </span>
              <span className="flex items-center">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-1.5 animate-pulse" />
                No commitment
              </span>
            </div>
          </div>
        </div>

        {/* Comparison Table for Tablets */}
        <div className="hidden sm:block md:hidden mt-8">
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
              <h4 className="font-bold text-sm text-gray-900 dark:text-white text-center">Quick Comparison</h4>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-3 gap-4 text-xs">
                <div className="font-medium text-gray-600 dark:text-gray-400">Feature</div>
                <div className="font-medium text-center text-gray-600 dark:text-gray-400">Free</div>
                <div className="font-medium text-center text-gray-600 dark:text-gray-400">Pro</div>
                
                <div className="text-gray-700 dark:text-gray-300">Monthly Uploads</div>
                <div className="text-center text-gray-700 dark:text-gray-300">5</div>
                <div className="text-center text-emerald-600 font-medium">Unlimited</div>
                
                <div className="text-gray-700 dark:text-gray-300">Quality</div>
                <div className="text-center text-gray-700 dark:text-gray-300">Standard</div>
                <div className="text-center text-emerald-600 font-medium">HD</div>
                
                <div className="text-gray-700 dark:text-gray-300">Albums</div>
                <div className="text-center text-gray-400">—</div>
                <div className="text-center text-emerald-600 font-medium">✓</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
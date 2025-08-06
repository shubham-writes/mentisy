// components/sections/PricingSection.tsx
"use client";

import { SignUpButton } from "@clerk/nextjs";
import { Check, X } from "lucide-react";

export default function PricingSection() {
  return (
    <div className="px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What You Get — Free vs Pro</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">Level up your challenge</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Free Plan */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-8">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2">Free Plan</h3>
              <p className="text-4xl font-bold text-gray-900 dark:text-white">₹0</p>
              <p className="text-gray-500">Perfect to get started</p>
            </div>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-emerald-500" />
                <span>5 uploads per month</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-emerald-500" />
                <span>Basic watermark (Name/IP)</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-emerald-500" />
                <span>Timer & auto delete</span>
              </li>
              <li className="flex items-center gap-3 opacity-50">
                <X className="w-5 h-5 text-gray-400" />
                <span>Album creation</span>
              </li>
              <li className="flex items-center gap-3 opacity-50">
                <X className="w-5 h-5 text-gray-400" />
                <span>Add notes</span>
              </li>
              <li className="flex items-center gap-3 opacity-50">
                <X className="w-5 h-5 text-gray-400" />
                <span>HD quality</span>
              </li>
            </ul>
            
            <SignUpButton mode="modal">
              <button className="w-full py-3 px-6 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                Get Started Free
              </button>
            </SignUpButton>
          </div>

          {/* Pro Plan */}
          <div className="bg-gradient-to-br from-[#FF75A0]/10 to-[#FFAA70]/10 border-2 border-[#FF75A0] rounded-2xl p-8 relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] text-white px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </span>
            </div>
            
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2">Pro Plan</h3>
              <p className="text-4xl font-bold bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] bg-clip-text text-transparent">₹99</p>
              <p className="text-gray-500">per month</p>
            </div>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-emerald-500" />
                <span><strong>Unlimited</strong> uploads</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-emerald-500" />
                <span>Full watermark + toggle</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-emerald-500" />
                <span>Timer & auto delete</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-emerald-500" />
                <span>Create multi-part story raids</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-emerald-500" />
                <span>Add personal notes</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-emerald-500" />
                <span>HD quality uploads</span>
              </li>
            </ul>
            
            <button className="w-full py-3 px-6 bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] text-white rounded-xl font-medium hover:shadow-lg hover:shadow-[#FF75A0]/25 transition-all duration-200 hover:scale-105">
              🚀 Free 7-day Pro Trial
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
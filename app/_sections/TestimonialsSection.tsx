// components/sections/TestimonialsSection.tsx
"use client";

import { Star, Lock, Shield, Timer, Zap } from "lucide-react";

export default function TestimonialsSection() {
  const testimonials = [
    {
      text: "I sent a breakup confession to my ex — no leaks, no drama.",
      author: "Sarah, 24"
    },
    {
      text: "I shared my transformation video with a friend. Just once.",
      author: "Mike, 19"
    },
    {
      text: "I don't trust WhatsApp for personal stuff — this gave me peace of mind.",
      author: "Priya, 22"
    }
  ];

  return (
    <div className="px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Thousands Are Using OnlyForYou</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">Real stories from real users</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#FF75A0] to-[#FFAA70] rounded-full flex items-center justify-center">
                    <Star className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div>
                  <p className="text-gray-900 dark:text-white italic mb-3">{testimonial.text}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">— {testimonial.author}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Feature Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Lock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h4 className="font-semibold text-sm">🔐 One-Time View</h4>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Shield className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h4 className="font-semibold text-sm">🧊 Watermark Protection</h4>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Timer className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
            <h4 className="font-semibold text-sm">📉 Auto Delete</h4>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Zap className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h4 className="font-semibold text-sm">🌍 Works Anywhere</h4>
          </div>
        </div>
      </div>
    </div>
  );
}
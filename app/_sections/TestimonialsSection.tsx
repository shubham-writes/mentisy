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
    <div className="px-4 sm:px-6 py-12 sm:py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">What Early Users Are Saying</h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400">Real stories from real users</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white dark:bg-gray-900 rounded-xl p-4 sm:p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#FF75A0] to-[#FFAA70] rounded-full flex items-center justify-center">
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-gray-900 dark:text-white italic mb-2 sm:mb-3 text-sm sm:text-base leading-relaxed">{testimonial.text}</p>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">— {testimonial.author}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
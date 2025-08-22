// components/sections/FaqSection.tsx
"use client";

import { useState } from "react";
import { ChevronDown, Gamepad2, Users, Trophy, Sparkles, Smartphone } from "lucide-react";

export default function FaqSection() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqData = [
  {
    question: "What makes Mentisy different from normal sharing apps?",
    answer:
      "Instead of just sending a plain photo or video, Mentisy turns it into a playful game! Scratch to reveal, answer a question, race your friends, or guess a rating — every share becomes an experience, not just a file.",
    icon: Gamepad2,
    color: "from-purple-500 to-pink-500",
  },
  {
    question: "Do I need to install an app?",
    answer:
      "Nope! Mentisy works right in your browser. But since it's a PWA, you can add it to your home screen in just two taps — like having a fun app without the app store hassle!",
    icon: Sparkles,
    color: "from-green-500 to-emerald-500",
  },
  {
  question: "Can I install Mentisy like an app?",
  answer:
    "Yep! Mentisy is a Progressive Web App (PWA). That means you can add it to your home screen in just a couple of taps. No app store, no downloads — and it works just like a real app, lightning fast and always updated!",
  icon: Smartphone,
  color: "from-teal-500 to-green-500",
},

  {
    question: "Can I play these games in groups?",
    answer:
      "Absolutely! Mentisy is designed for friends. Try 'Reveal Rush' in group chats (first to answer wins) or 'Rate My...' where everyone guesses together. It's made to spark laughs and keep group chats alive!",
    icon: Users,
    color: "from-blue-500 to-cyan-500",
  },
  {
    question: "What kind of games can I create?",
    answer:
      "Right now you can play Scratch & See, Q&A Challenge, Reveal Rush, and Rate My... More fun formats are coming soon — like polls, dares, and story-style reveals!",
    icon: Trophy,
    color: "from-orange-500 to-red-500",
  },
  {
    question: "How long does my shared content last?",
    answer:
      "It lasts until the game is completed — once your friends unlock it, it disappears. Mentisy is all about living in the moment, not storing forever!",
    icon: Gamepad2,
    color: "from-indigo-500 to-purple-500",
  },
  {
    question: "Is it safe to use?",
    answer:
      "Yes — Mentisy is built for fun, not for spying or storing private data. Your content disappears after the game ends, and you stay in control. Remember: it's about playful moments, not permanent storage.",
    icon: Sparkles,
    color: "from-pink-500 to-rose-500",
  },
];


  return (
    <div className="px-4 sm:px-6 py-12 sm:py-16 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-900/10 dark:via-purple-900/10 dark:to-pink-900/10">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] rounded-full mb-4">
            <span className="text-2xl">❓</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            Game Questions & Answers
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400">Everything you need to know about photo gaming</p>
        </div>
        
        <div className="space-y-3 sm:space-y-4">
          {faqData.map((faq, index) => {
            const IconComponent = faq.icon;
            return (
              <div key={index} className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-lg transition-all duration-300 group">
                <button
                  className="w-full px-4 sm:px-6 py-4 sm:py-5 text-left flex items-start justify-between hover:bg-white/50 dark:hover:bg-gray-800/50 rounded-xl transition-colors touch-manipulation"
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                >
                  <div className="flex items-center gap-3 sm:gap-4 flex-1">
                    <div className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r ${faq.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <span className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base pr-4 leading-relaxed">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform flex-shrink-0 ${expandedFaq === index ? 'rotate-180' : ''}`} />
                </button>
                {expandedFaq === index && (
                  <div className="px-4 sm:px-6 pb-4 sm:pb-5">
                    <div className="ml-11 sm:ml-14">
                      <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick game overview */}
        <div className="mt-12 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-gray-200/50 dark:border-gray-700/50">
          <div className="text-center mb-6">
            <h3 className="text-xl sm:text-2xl font-bold mb-2">Quick Game Overview</h3>
            <p className="text-gray-600 dark:text-gray-400">Choose your sharing style</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl">
              <div className="text-2xl mb-2">🎨</div>
              <div className="font-semibold text-sm">Scratch & See</div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Interactive reveal</div>
            </div>
            
            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl">
              <div className="text-2xl mb-2">🧠</div>
              <div className="font-semibold text-sm">Q&A Challenge</div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Answer to unlock</div>
            </div>
            
            <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl">
              <div className="text-2xl mb-2">🏃‍♂️</div>
              <div className="font-semibold text-sm">Reveal Rush</div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Group competitions</div>
            </div>
            
            <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl">
              <div className="text-2xl mb-2">⭐</div>
              <div className="font-semibold text-sm">Rate My...</div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Guess the rating</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
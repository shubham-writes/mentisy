// components/sections/FaqSection.tsx
"use client";

import { useState } from "react";
import { ChevronDown, Gamepad2, Users, Trophy, Sparkles } from "lucide-react";

export default function FaqSection() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqData = [
    {
      question: "How do the photo games work?",
      answer: "Choose from 4 fun games: Scratch & See (scratch to reveal), Q&A Challenge (answer correctly to unlock), Reveal Rush group games (first to answer wins), and Rate My... (guess the sender's rating). Each game makes sharing photos way more interactive and entertaining!",
      icon: Gamepad2,
      color: "from-purple-500 to-pink-500"
    },
    {
      question: "Can I play these games with groups?",
      answer: "Absolutely! Reveal Rush is designed for groups - send a Q&A challenge where the first person to answer correctly gets to see your photo, or play Rate My... where everyone tries to guess your rating. Perfect for friend groups and family chats!",
      icon: Users,
      color: "from-blue-500 to-cyan-500"
    },
    {
      question: "What happens if no one gets the answer right?",
      answer: "Don't worry! For Q&A games, you can set multiple attempts or provide hints. For Rate My..., if no one guesses your exact rating, the closest guess wins. You're always in control of when and how your photo gets revealed.",
      icon: Trophy,
      color: "from-orange-500 to-red-500"
    },
    {
      question: "Do I need to download an app?",
      answer: "Nope! Everything works directly in your browser. We've optimized it as a Progressive Web App (PWA), so you can add it to your home screen for quick access - but no app store downloads required!",
      icon: Sparkles,
      color: "from-green-500 to-emerald-500"
    },
    {
      question: "How long do my photo games stay active?",
      answer: "Your games stay active until someone completes them or you decide to delete them. You can manage all your active games from your dashboard and see who's played, who's still trying, and how many attempts everyone has made.",
      icon: Gamepad2,
      color: "from-indigo-500 to-purple-500"
    },
    {
      question: "Can I customize the difficulty of my games?",
      answer: "Yes! For Q&A challenges, you control the question difficulty. For Rate My..., you can give hints like 'between 1-10' or 'higher than 5'. For Scratch & See, you can adjust how much needs to be scratched. Make it as easy or challenging as you want!",
      icon: Sparkles,
      color: "from-pink-500 to-rose-500"
    }
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
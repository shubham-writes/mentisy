// components/sections/FunTestimonialsSection.tsx
"use client";

import { Star, Gamepad2, Trophy, Heart, Sparkles, Laugh } from "lucide-react";

export default function FunTestimonialsSection() {
  const testimonials = [
    {
      text: "Made my friends guess my pizza rating for 20 minutes straight! 😂 They were so invested in getting it right to see my food pic.",
      author: "Alex, 21",
      game: "Rate My...",
      icon: Heart,
      emoji: "🍕",
      rating: 5
    },
    {
      text: "My group chat went CRAZY trying to answer my travel trivia first. Everyone was so competitive to see my vacation photos!",
      author: "Maya, 23", 
      game: "Reveal Rush",
      icon: Trophy,
      emoji: "✈️",
      rating: 5
    },
    {
      text: "The scratch feature is addictive! My boyfriend kept scratching to reveal different parts of my outfit reveal. So much more fun than just sending a boring pic.",
      author: "Zara, 20",
      game: "Scratch & See",
      icon: Sparkles,
      emoji: "👗",
      rating: 4
    },
    {
      text: "Asked my bestie 'What's my biggest fear?' and she had to guess 3 times before seeing my skydiving photo. We were both dying laughing! 🪂",
      author: "Josh, 19",
      game: "Q&A Challenge",
      icon: Laugh,
      emoji: "🪂",
      rating: 5
    },
    {
      text: "My family group is obsessed! Everyone's trying to outdo each other with creative questions and ratings. Photo sharing has never been this entertaining.",
      author: "Ravi, 25",
      game: "All Games",
      icon: Gamepad2,
      emoji: "👨‍👩‍👧‍👦",
      rating: 4
    },
    {
      text: "I rate my coffee shop experiences and my friends have to match my rating to see the pics. They've become coffee experts just to keep up! ☕",
      author: "Emma, 22",
      game: "Rate My...",
      icon: Star,
      emoji: "☕",
      rating: 5
    }
  ];

  const getGameBadgeColor = (game: string) => {
    switch (game) {
      case "Scratch & See": return "from-purple-500 to-pink-500";
      case "Q&A Challenge": return "from-blue-500 to-cyan-500";
      case "Reveal Rush": return "from-orange-500 to-red-500";
      case "Rate My...": return "from-green-500 to-emerald-500";
      default: return "from-[#FF75A0] to-[#FFAA70]";
    }
  };

  return (
    <div className="px-4 sm:px-6 py-12 sm:py-16 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] rounded-full mb-4">
            <span className="text-2xl">🎉</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Early testers are excited!</h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400">Feedback from our beta testing community</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {testimonials.map((testimonial, index) => {
            const IconComponent = testimonial.icon;
            return (
              <div key={index} className="bg-white dark:bg-gray-900 rounded-xl p-4 sm:p-6 shadow-lg border border-gray-200  dark:border-gray-700 hover:shadow-xl hover:scale-105 transition-all duration-300 group">
                {/* Game badge */}
                <div className="flex items-center justify-between mb-3">
                  <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getGameBadgeColor(testimonial.game)}`}>
                    <Gamepad2 className="w-3 h-3" />
                    <span>{testimonial.game}</span>
                  </div>
                  <span className="text-2xl">{testimonial.emoji}</span>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#FF75A0] to-[#FFAA70] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-gray-500 dark:text-white mb-3 text-sm sm:text-base leading-relaxed font-medium">
                      &ldquo;{testimonial.text}&ldquo;
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3 h-3 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-600'}`} />
                        ))}
                      </div>
                      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium">
                        — {testimonial.author}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Features highlight section */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-2">
              <span className="text-xl">🎮</span>
            </div>
            <div className="text-2xl font-bold bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] bg-clip-text text-transparent">4</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Unique Games</div>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mb-2">
              <span className="text-xl">⚡</span>
            </div>
            <div className="text-2xl font-bold bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] bg-clip-text text-transparent">0</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Apps to Install</div>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mb-2">
              <span className="text-xl">🚀</span>
            </div>
            <div className="text-2xl font-bold bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] bg-clip-text text-transparent">Beta</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Early Access</div>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mb-2">
              <span className="text-xl">🎉</span>
            </div>
            <div className="text-2xl font-bold bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] bg-clip-text text-transparent">Free</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">During Beta</div>
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center mt-12">
          
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Be among the first • Shape the future of photo sharing
          </p>
        </div>
      </div>
    </div>
  );
}
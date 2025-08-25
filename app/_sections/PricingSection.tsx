import { Check, X, Gamepad2, Sparkles, Zap, Trophy, Heart, Users, CloudUpload  } from "lucide-react";
import { SignUpButton } from "@clerk/nextjs";

export default function GamingPricingSection() {

  return (
    <div className="px-4 sm:px-6 py-12 sm:py-16 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 dark:from-red-900/20 dark:via-orange-900/20 dark:to-yellow-900/20">
      <div className="max-w-5xl mx-auto">
        {/* Independence Day Celebration Banner */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-green-500 text-white px-4 py-2 rounded-full mb-4 animate-pulse">
            <span className="text-xl">🇮🇳</span>
            <span className="font-bold text-sm">79th Independence Day Special</span>
            <span className="text-xl">🎉</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] bg-clip-text text-transparent">
            Choose Your Gaming Level
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400">Turn every photo into an epic game challenge!</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Free Gaming Plan */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border-2 border-gray-200 dark:border-gray-700 p-6 sm:p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full -translate-y-16 translate-x-16 opacity-50" />
            
            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <Gamepad2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Free Plan</h3>
                  <p className="text-gray-500 dark:text-gray-400">Start sharing with fun</p>
                </div>
              </div>
              
              <div className="text-center mb-8">
                <p className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white">₹0</p>
                <p className="text-gray-500 dark:text-gray-400">Forever free</p>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Share unlimited images & short videos</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">1 fun mode: <strong>Scratch & See</strong></span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Smart overlay</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Auto-delete after viewing</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Seen Tick (basic) — know if your link was opened</span>
                </div>
                <div className="flex items-center gap-3 opacity-50">
                  <X className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  <span className="text-gray-500">Q&A game</span>
                </div>
                <div className="flex items-center gap-3 opacity-50">
                  <X className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  <span className="text-gray-500">Group games</span>
                </div>
                <div className="flex items-center gap-3 opacity-50">
                  <X className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  <span className="text-gray-500">HD quality uploads</span>
                </div>
              </div>
              
              <SignUpButton mode="modal">
                <button className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]">
                  🎮 Start Fun Sharing Free
                </button>
              </SignUpButton>
            </div>
          </div>

          {/* Pro Gaming Plan */}
<div className=" bg-gradient-to-br from-[#FF75A0]/10 to-[#FFAA70]/10 border-3 border-[#FF75A0] rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
  
  <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-[#FF75A0]/20 to-[#FFAA70]/20 rounded-full -translate-y-20 -translate-x-20" />
  
  <div className="mt-0">
    <div className="flex items-center gap-3 mb-6">
      <div className="w-12 h-12 bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] rounded-xl flex items-center justify-center">
        <Trophy  className="w-6 h-6 text-white" />
      </div>
      <div>
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Pro Plan</h3>
        <p className="text-gray-600 dark:text-gray-400">Ultimate fun experience</p>
      </div>
    </div>
    
    <div className="text-center mb-8">
      <div className="flex items-center justify-center gap-2">
        <p className="text-gray-400 line-through text-xl">₹149</p>
        <p className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] bg-clip-text text-transparent">₹99</p>
      </div>
      <p className="text-gray-500 dark:text-gray-400">per month</p>
      <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-green-100 dark:from-orange-900/30 dark:to-green-900/30 px-3 py-1 rounded-full mt-2">
        <span className="text-sm font-semibold text-orange-700 dark:text-orange-300">🎉 FREE for 30 days!</span>
      </div>
    </div>
    
    <div className="space-y-4 mb-8">
      <div className="flex items-start gap-3">
        <div className="w-6 h-6 min-w-[1.5rem] bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] rounded-full flex items-center justify-center flex-shrink-0">
          <Check className="w-4 h-4 text-white" />
        </div>
        <span className="text-gray-700 dark:text-gray-300"><strong>Unlimited</strong> sharing</span>
      </div>
      <div className="flex items-start gap-3">
        <div className="w-6 h-6 min-w-[1.5rem] bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] rounded-full flex items-center justify-center flex-shrink-0">
          <Check className="w-4 h-4 text-white" />
        </div>
        <span className="text-gray-700 dark:text-gray-300">All games: <strong>Scratch & See</strong>, <strong>Q&A</strong>, <strong>Group Q&A</strong>, <strong>Rate My...</strong></span>
      </div>
      <div className="flex items-start gap-3">
        <div className="w-6 h-6 min-w-[1.5rem] bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] rounded-full flex items-center justify-center flex-shrink-0">
          <Check className="w-4 h-4 text-white" />
        </div>
        <span className="text-gray-700 dark:text-gray-300">Expire It button — instantly kill any link, anytime</span>
      </div>
      <div className="flex items-start gap-3">
        <div className="w-6 h-6 min-w-[1.5rem] bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] rounded-full flex items-center justify-center flex-shrink-0">
          <Check className="w-4 h-4 text-white" />
        </div>
        <span className="text-gray-700 dark:text-gray-300">Advanced Seen Tick — track when links are opened & auto-mark expired links</span>
      </div>
       
      <div className="flex items-start gap-3">
        <div className="w-6 h-6 min-w-[1.5rem] bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] rounded-full flex items-center justify-center flex-shrink-0">
          <Check className="w-4 h-4 text-white" />
        </div>
        <span className="text-gray-700 dark:text-gray-300">Custom game settings & timers</span>
      </div>
      <div className="flex items-start gap-3">
        <div className="w-6 h-6 min-w-[1.5rem] bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] rounded-full flex items-center justify-center flex-shrink-0">
          <Check className="w-4 h-4 text-white" />
        </div>
        <span className="text-gray-700 dark:text-gray-300">HD quality uploads</span>
      </div>
    </div>
    
    <SignUpButton mode="modal">
      <button className="w-full py-3 px-4 bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] text-white rounded-xl font-bold text-md hover:shadow-xl hover:shadow-[#FF75A0]/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative flex items-center justify-center gap-2">
          <span>Start FREE 30-Day Trial</span>
        </div>
      </button>
    </SignUpButton>
    
    <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-3">
      🇮🇳 Special Independence Day offer • Cancel anytime • No commitment
    </p>
  </div>
</div>
        </div>

        

        {/* Gaming Stats */}
        <div className="mt-12 sm:mt-16 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="group">
              <div className="text-3xl font-bold bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                4
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Unique Games</div>
              <div className="text-2xl mt-1">🎮</div>
            </div>
            <div className="group">
              <div className="text-3xl font-bold bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                0
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Apps to Download</div>
              <div className="text-2xl mt-1">⚡</div>
            </div>
            <div className="group">
              <div className="text-3xl font-bold bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                15
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Free Trial Days</div>
              <div className="text-2xl mt-1">🇮🇳</div>
            </div>
            <div className="group">
              <div className="text-3xl font-bold bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                ∞
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Fun Potential</div>
              <div className="text-2xl mt-1">🎉</div>
            </div>
          </div>
        </div>

        {/* Pro Gaming Benefits Highlight */}
        <div className="mt-12 sm:mt-16 bg-gradient-to-r from-[#FF75A0]/5 to-[#FFAA70]/5 dark:from-[#FF75A0]/10 dark:to-[#FFAA70]/10 rounded-2xl p-6 sm:p-8 border border-[#FF75A0]/20">
          <div className="text-center mb-6">
            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">🏆 Pro Plan Exclusive Features</h4>
            <p className="text-gray-600 dark:text-gray-400">Why users love Pro</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h5 className="font-bold text-gray-900 dark:text-white mb-2">Group Challenges</h5>
              <p className="text-sm text-gray-600 dark:text-gray-400">Create epic group challenges where friends compete to see your photos first</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h5 className="font-bold text-gray-900 dark:text-white mb-2">Rate My... Games</h5>
              <p className="text-sm text-gray-600 dark:text-gray-400">Rate anything and let friends guess your rating to unlock the photo</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CloudUpload  className="w-8 h-8 text-white" />
              </div>
              <h5 className="font-bold text-gray-900 dark:text-white mb-2">Unlimited Uploads</h5>
              <p className="text-sm text-gray-600 dark:text-gray-400">Share unlimited fun with your friends and family</p>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center mt-12 sm:mt-16">
          <div className="bg-gradient-to-r from-orange-100 via-white to-green-100 dark:from-orange-900/20 dark:via-gray-800 dark:to-green-900/20 rounded-2xl p-6 sm:p-8 border-2 border-dashed border-orange-300 dark:border-orange-600">
            <h4 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">🇮🇳 Independence Day Limited Offer</h4>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Celebrating 79 years of freedom with 30 days of FREE Pro! 
              <br className="hidden sm:block" />
              <span className="font-semibold">Offer valid until September 15th, 2025</span>
            </p>
            <div className="flex items-center justify-center gap-4 text-sm">
              <span className="flex items-center gap-1 text-green-600 dark:text-green-400">
                <Check className="w-4 h-4" />
                No credit card required
              </span>
              <span className="flex items-center gap-1 text-blue-600 dark:text-blue-400">
                <Check className="w-4 h-4" />
                Cancel anytime during trial
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
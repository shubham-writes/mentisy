// components/sections/FunFeaturesComparison.tsx
"use client";

export default function FunFeaturesComparison() {
  const features = [
    {
      name: "Interactive Games",
      onlyForYou: { status: "premium", label: "4 Games" },
      instagram: { status: "cross", label: "" },
      snapchat: { status: "warning", label: "Basic" },
      others: { status: "cross", label: "" }
    },
    {
      name: "Scratch & Reveal",
      onlyForYou: { status: "premium", label: "Unique" },
      instagram: { status: "cross", label: "" },
      snapchat: { status: "cross", label: "" },
      others: { status: "cross", label: "" }
    },
    {
      name: "Q&A Challenge",
      onlyForYou: { status: "check", label: "" },
      instagram: { status: "cross", label: "" },
      snapchat: { status: "cross", label: "" },
      others: { status: "warning", label: "Limited" }
    },
    {
      name: "Group Competitions",
      onlyForYou: { status: "premium", label: "Reveal Rush" },
      instagram: { status: "cross", label: "" },
      snapchat: { status: "cross", label: "" },
      others: { status: "cross", label: "" }
    },
    {
      name: "Rate & Guess Games",
      onlyForYou: { status: "premium", label: "Rate My..." },
      instagram: { status: "cross", label: "" },
      snapchat: { status: "cross", label: "" },
      others: { status: "cross", label: "" }
    },
    {
      name: "First to Answer Wins",
      onlyForYou: { status: "check", label: "" },
      instagram: { status: "cross", label: "" },
      snapchat: { status: "cross", label: "" },
      others: { status: "cross", label: "" }
    },
    {
      name: "No App Download",
      onlyForYou: { status: "check", label: "" },
      instagram: { status: "cross", label: "" },
      snapchat: { status: "cross", label: "" },
      others: { status: "warning", label: "Some" }
    }
  ];

  const renderStatusIcon = (status: string, label: string) => {
    switch (status) {
      case "check":
        return (
          <div className="flex flex-col items-center">
            <span className="inline-flex items-center justify-center w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
            </span>
            {label && <span className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">{label}</span>}
          </div>
        );
      case "premium":
        return (
          <div className="flex flex-col items-center">
            <span className="inline-flex items-center justify-center w-8 h-8 bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] rounded-lg">
              <span className="text-white font-bold text-sm">✓</span>
            </span>
            {label && <span className="text-xs font-semibold bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] bg-clip-text text-transparent mt-1">{label}</span>}
          </div>
        );
      case "warning":
        return (
          <div className="flex flex-col items-center">
            <span className="inline-flex items-center justify-center w-8 h-8 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
              <span className="text-amber-600 dark:text-amber-400 font-bold">⚠</span>
            </span>
            {label && <span className="text-xs text-amber-600 dark:text-amber-400 mt-1">{label}</span>}
          </div>
        );
      case "cross":
      default:
        return (
          <div className="flex flex-col items-center">
            <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <span className="text-gray-400 font-bold">✕</span>
            </span>
            {label && <span className="text-xs text-gray-400 mt-1">{label}</span>}
          </div>
        );
    }
  };

  return (
    <div className="px-4 sm:px-6 py-12 sm:py-16 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-purple-900/20 dark:via-pink-900/20 dark:to-orange-900/20">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] rounded-full mb-4">
            <span className="text-2xl">🎮</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 px-2">Why OnlyForYou is the ultimate fun platform</h3>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 px-2">The only platform that turns photo sharing into epic games</p>
        </div>
        
        {/* Mobile Layout - Card-based comparison */}
        <div className="block md:hidden space-y-4">
          {features.map((feature, index) => (
            <div key={index} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-lg">
              {/* Feature header */}
              <div className="bg-gradient-to-r from-[#FF75A0]/10 to-[#FFAA70]/10 dark:from-[#FF75A0]/20 dark:to-[#FFAA70]/20 px-4 py-3">
                <h4 className="font-semibold text-gray-900 dark:text-white text-base">{feature.name}</h4>
              </div>
              
              {/* Comparison grid */}
              <div className="p-4">
                <div className="grid grid-cols-2 gap-4">
                  {/* OnlyForYou - Highlighted */}
                  <div className="bg-gradient-to-r from-[#FF75A0]/5 to-[#FFAA70]/5 dark:from-[#FF75A0]/10 dark:to-[#FFAA70]/10 rounded-lg p-4 border-2 border-dashed border-gradient-to-r from-[#FF75A0]/30 to-[#FFAA70]/30">
                    <div className="text-center">
                      <div className="font-semibold bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] bg-clip-text text-transparent text-sm mb-2">OnlyForYou</div>
                      {renderStatusIcon(feature.onlyForYou.status, feature.onlyForYou.label)}
                    </div>
                  </div>
                  
                  {/* Instagram */}
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <div className="text-center">
                      <div className="font-medium text-gray-600 dark:text-gray-400 text-sm mb-2">Instagram</div>
                      {renderStatusIcon(feature.instagram.status, feature.instagram.label)}
                    </div>
                  </div>
                  
                  {/* Snapchat */}
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <div className="text-center">
                      <div className="font-medium text-gray-600 dark:text-gray-400 text-sm mb-2">Snapchat</div>
                      {renderStatusIcon(feature.snapchat.status, feature.snapchat.label)}
                    </div>
                  </div>
                  
                  {/* Others */}
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <div className="text-center">
                      <div className="font-medium text-gray-600 dark:text-gray-400 text-sm mb-2">Others</div>
                      {renderStatusIcon(feature.others.status, feature.others.label)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tablet Layout - Simplified table */}
        <div className="hidden md:block lg:hidden">
          <div className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-[#FF75A0]/15 to-[#FFAA70]/15 dark:from-[#FF75A0]/25 dark:to-[#FFAA70]/25">
                  <tr>
                    <th className="px-4 py-4 text-left font-semibold text-gray-900 dark:text-white text-sm">Gaming Feature</th>
                    <th className="px-4 py-4 text-center font-semibold bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] bg-clip-text text-transparent text-sm">OnlyForYou</th>
                    <th className="px-4 py-4 text-center font-medium text-gray-600 dark:text-gray-400 text-sm">Instagram</th>
                    <th className="px-4 py-4 text-center font-medium text-gray-600 dark:text-gray-400 text-sm">Snapchat</th>
                    <th className="px-4 py-4 text-center font-medium text-gray-600 dark:text-gray-400 text-sm">Others</th>
                  </tr>
                </thead>
                <tbody className="text-xs">
                  {features.map((feature, index) => (
                    <tr key={index} className="border-t border-gray-100 dark:border-gray-800 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                      <td className="px-4 py-3 font-medium text-gray-900 dark:text-white text-sm">{feature.name}</td>
                      <td className="px-4 py-3 text-center">
                        {renderStatusIcon(feature.onlyForYou.status, feature.onlyForYou.label)}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {renderStatusIcon(feature.instagram.status, feature.instagram.label)}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {renderStatusIcon(feature.snapchat.status, feature.snapchat.label)}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {renderStatusIcon(feature.others.status, feature.others.label)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        {/* Desktop Layout - Full table with animations */}
        <div className="hidden lg:block">
          <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-[#FF75A0]/15 to-[#FFAA70]/15 dark:from-[#FF75A0]/25 dark:to-[#FFAA70]/25">
                  <tr>
                    <th className="px-8 py-6 text-left font-bold text-gray-900 dark:text-white text-lg">🎮 Gaming Feature</th>
                    <th className="px-8 py-6 text-center font-bold bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] bg-clip-text text-transparent text-lg">OnlyForYou</th>
                    <th className="px-8 py-6 text-center font-semibold text-gray-600 dark:text-gray-400 text-base">Instagram</th>
                    <th className="px-8 py-6 text-center font-semibold text-gray-600 dark:text-gray-400 text-base">Snapchat</th>
                    <th className="px-8 py-6 text-center font-semibold text-gray-600 dark:text-gray-400 text-base">Others</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {features.map((feature, index) => (
                    <tr key={index} className="border-t border-gray-100 dark:border-gray-800 hover:bg-gradient-to-r hover:from-[#FF75A0]/5 hover:to-[#FFAA70]/5 dark:hover:from-[#FF75A0]/10 dark:hover:to-[#FFAA70]/10 transition-all duration-300">
                      <td className="px-8 py-5 font-semibold text-gray-900 dark:text-white text-base">{feature.name}</td>
                      <td className="px-8 py-5 text-center">
                        {renderStatusIcon(feature.onlyForYou.status, feature.onlyForYou.label)}
                      </td>
                      <td className="px-8 py-5 text-center">
                        {renderStatusIcon(feature.instagram.status, feature.instagram.label)}
                      </td>
                      <td className="px-8 py-5 text-center">
                        {renderStatusIcon(feature.snapchat.status, feature.snapchat.label)}
                      </td>
                      <td className="px-8 py-5 text-center">
                        {renderStatusIcon(feature.others.status, feature.others.label)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  );
}
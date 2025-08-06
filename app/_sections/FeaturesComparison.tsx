// components/sections/FeaturesComparison.tsx
"use client";

export default function FeaturesComparison() {
  return (
    <div className="px-6 py-16 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold mb-4">Why OnlyForYou hits different</h3>
          <p className="text-xl text-gray-600 dark:text-gray-400">Finally, a platform that gets it</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700">
            <thead className="bg-gradient-to-r from-[#FF75A0]/10 to-[#FFAA70]/10 dark:from-[#FF75A0]/20 dark:to-[#FFAA70]/20">
              <tr>
                <th className="px-6 py-5 text-left font-semibold text-gray-900 dark:text-white text-base">Feature</th>
                <th className="px-6 py-5 text-center font-semibold bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] bg-clip-text text-transparent text-base">OnlyForYou</th>
                <th className="px-6 py-5 text-center font-medium text-gray-600 dark:text-gray-400">WhatsApp</th>
                <th className="px-6 py-5 text-center font-medium text-gray-600 dark:text-gray-400">Snapchat</th>
                <th className="px-6 py-5 text-center font-medium text-gray-600 dark:text-gray-400">Others</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-t border-gray-100 dark:border-gray-800 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">One-Time View</td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <span className="text-gray-400 font-bold">✕</span>
                  </span>
                </td>
              </tr>
              <tr className="border-t border-gray-100 dark:border-gray-800 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">Private Text Messages</td>
                <td className="px-6 py-4 text-center">
                  <div className="flex flex-col items-center">
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] rounded-lg mb-1">
                      <span className="text-white font-bold text-sm">✓</span>
                    </span>
                    <span className="text-xs font-semibold bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] bg-clip-text text-transparent">100%</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <span className="text-gray-400 font-bold">✕</span>
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <span className="text-gray-400 font-bold">✕</span>
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <span className="text-gray-400 font-bold">✕</span>
                  </span>
                </td>
              </tr>
              <tr className="border-t border-gray-100 dark:border-gray-800 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">No App Required</td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <span className="text-gray-400 font-bold">✕</span>
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <span className="text-gray-400 font-bold">✕</span>
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
                  </span>
                </td>
              </tr>
              <tr className="border-t border-gray-100 dark:border-gray-800 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors rounded-b-xl">
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">View Notifications</td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex flex-col items-center">
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-amber-100 dark:bg-amber-900/30 rounded-lg mb-1">
                      <span className="text-amber-600 dark:text-amber-400 font-bold">⚠</span>
                    </span>
                    <span className="text-xs text-amber-600 dark:text-amber-400">Limited</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <span className="text-gray-400 font-bold">✕</span>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
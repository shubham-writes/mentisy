// components/sections/FeaturesComparison.tsx
"use client";

export default function FeaturesComparison() {
  const features = [
    {
      name: "One-Time View",
      onlyForYou: { status: "check", label: "" },
      whatsapp: { status: "check", label: "" },
      snapchat: { status: "check", label: "" },
      others: { status: "cross", label: "" }
    },
    {
      name: "Private Text Messages",
      onlyForYou: { status: "premium", label: "100%" },
      whatsapp: { status: "cross", label: "" },
      snapchat: { status: "cross", label: "" },
      others: { status: "cross", label: "" }
    },
    {
      name: "No App Required",
      onlyForYou: { status: "check", label: "" },
      whatsapp: { status: "cross", label: "" },
      snapchat: { status: "cross", label: "" },
      others: { status: "check", label: "" }
    },
    {
      name: "View Notifications",
      onlyForYou: { status: "check", label: "" },
      whatsapp: { status: "warning", label: "Limited" },
      snapchat: { status: "check", label: "" },
      others: { status: "cross", label: "" }
    },
    {
      name: "Auto-Delete Timer",
      onlyForYou: { status: "premium", label: "Custom" },
      whatsapp: { status: "cross", label: "" },
      snapchat: { status: "warning", label: "Limited" },
      others: { status: "cross", label: "" }
    },
    {
      name: "Smart Watermarking",
      onlyForYou: { status: "premium", label: "Advanced" },
      whatsapp: { status: "cross", label: "" },
      snapchat: { status: "cross", label: "" },
      others: { status: "cross", label: "" }
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
    <div className="px-4 sm:px-6 py-12 sm:py-16 bg-gray-100 dark:bg-gray-900/50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 px-2">Why OnlyForYou hits different</h3>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 px-2">Finally, a platform that gets it</p>
        </div>
        
        {/* Mobile Layout - Card-based comparison (only for small screens) */}
        <div className="block md:hidden space-y-4">
          {features.map((feature, index) => (
            <div key={index} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              {/* Feature header */}
              <div className="bg-gradient-to-r from-[#FF75A0]/10 to-[#FFAA70]/10 dark:from-[#FF75A0]/20 dark:to-[#FFAA70]/20 px-4 py-3">
                <h4 className="font-semibold text-gray-900 dark:text-white text-base">{feature.name}</h4>
              </div>
              
              {/* Comparison grid */}
              <div className="p-4">
                <div className="grid grid-cols-2 gap-4">
                  {/* OnlyForYou - Highlighted */}
                  <div className="bg-gradient-to-r from-[#FF75A0]/5 to-[#FFAA70]/5 dark:from-[#FF75A0]/10 dark:to-[#FFAA70]/10 rounded-lg p-4 border-2 border-gradient-to-r from-[#FF75A0]/20 to-[#FFAA70]/20">
                    <div className="text-center">
                      <div className="font-semibold bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] bg-clip-text text-transparent text-sm mb-2">OnlyForYou</div>
                      {renderStatusIcon(feature.onlyForYou.status, feature.onlyForYou.label)}
                    </div>
                  </div>
                  
                  {/* WhatsApp */}
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <div className="text-center">
                      <div className="font-medium text-gray-600 dark:text-gray-400 text-sm mb-2">WhatsApp</div>
                      {renderStatusIcon(feature.whatsapp.status, feature.whatsapp.label)}
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

        {/* Tablet Layout - Simplified table (medium screens only) */}
        <div className="hidden md:block lg:hidden">
          <div className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-[#FF75A0]/10 to-[#FFAA70]/10 dark:from-[#FF75A0]/20 dark:to-[#FFAA70]/20">
                  <tr>
                    <th className="px-4 py-4 text-left font-semibold text-gray-900 dark:text-white text-sm">Feature</th>
                    <th className="px-4 py-4 text-center font-semibold bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] bg-clip-text text-transparent text-sm">OnlyForYou</th>
                    <th className="px-4 py-4 text-center font-medium text-gray-600 dark:text-gray-400 text-sm">WhatsApp</th>
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
                        {renderStatusIcon(feature.whatsapp.status, feature.whatsapp.label)}
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
        
        {/* Desktop Layout - Original table preserved (large screens only) */}
        <div className="hidden lg:block">
          <div className="overflow-x-auto">
            <table className="w-full bg-white dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
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
                <tr className="border-t border-gray-100 dark:border-gray-800 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
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
                <tr className="border-t border-gray-100 dark:border-gray-800 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">Auto-Delete Timer</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex flex-col items-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] rounded-lg mb-1">
                        <span className="text-white font-bold text-sm">✓</span>
                      </span>
                      <span className="text-xs font-semibold bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] bg-clip-text text-transparent">Custom</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-lg">
                      <span className="text-gray-400 font-bold">✕</span>
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
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-lg">
                      <span className="text-gray-400 font-bold">✕</span>
                    </span>
                  </td>
                </tr>
                <tr className="border-t border-gray-100 dark:border-gray-800 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white rounded-bl-xl">Smart Watermarking</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex flex-col items-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] rounded-lg mb-1">
                        <span className="text-white font-bold text-sm">✓</span>
                      </span>
                      <span className="text-xs font-semibold bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] bg-clip-text text-transparent">Advanced</span>
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
                  <td className="px-6 py-4 text-center rounded-br-xl">
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
    </div>
  );
}
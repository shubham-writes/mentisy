import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface TimerSettingsProps {
    duration: string;
    onDurationChange: (value: string) => void;
    isTimerDisabled: boolean;
}

export function TimerSettings({ duration, onDurationChange, isTimerDisabled }: TimerSettingsProps) {
    return (
        <div>
            <Label className="text-sm sm:text-base font-semibold mb-3 sm:mb-4 lg:mb-6 block text-gray-800 dark:text-gray-200">
                How long before it disappears forever?
            </Label>
            
            {/* Video Timer Notice - Mobile Optimized */}
            {isTimerDisabled && (
                <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg sm:rounded-xl border border-amber-300 dark:border-amber-700">
                    <div className="flex items-start sm:items-center space-x-2 sm:space-x-3 text-amber-800 dark:text-amber-200">
                        <span className="text-lg sm:text-xl flex-shrink-0 mt-0.5 sm:mt-0">⏱️</span>
                        <span className="font-medium text-xs sm:text-sm leading-relaxed">
                            Video timer will match the video length automatically
                        </span>
                    </div>
                </div>
            )}
            
            {/* Timer Options - Mobile First Grid */}
            <RadioGroup 
                value={duration}
                onValueChange={onDurationChange}
                disabled={isTimerDisabled}
                className="grid grid-cols-3 sm:grid-cols-3 gap-2 sm:gap-3"
            >
                {/* 3 Second Option - Touch Optimized */}
                <div className={`relative ${isTimerDisabled ? 'opacity-50' : ''}`}>
                    <RadioGroupItem value="3" id="r1" className="sr-only" />
                    <Label 
                        htmlFor="r1" 
                        className={`flex flex-col items-center justify-center p-3 sm:p-4 lg:p-5 border-2 rounded-lg sm:rounded-xl cursor-pointer transition-all active:scale-95 sm:hover:scale-105 min-h-[80px] sm:min-h-[100px] lg:min-h-[120px] ${
                            duration === '3' 
                                ? 'border-[#FF75A0] bg-gradient-to-br from-[#FF75A0]/10 to-[#FFAA70]/10 text-[#FF75A0] dark:bg-[#FF75A0]/20 dark:text-[#FF75A0]' 
                                : 'border-gray-200 dark:border-gray-600 hover:border-[#FF75A0]/50'
                        }`}
                    >
                        <span className="text-lg sm:text-2xl lg:text-3xl mb-1 sm:mb-2">⚡</span>
                        <span className="font-semibold text-sm sm:text-base lg:text-lg">3 Sec</span>
                        <span className="text-xs text-gray-500 mt-0.5 sm:mt-1 text-center leading-tight">Quick </span>
                    </Label>
                </div>
                
                {/* 5 Second Option - Touch Optimized */}
                <div className={`relative ${isTimerDisabled ? 'opacity-50' : ''}`}>
                    <RadioGroupItem value="5" id="r2" className="sr-only" />
                    <Label 
                        htmlFor="r2" 
                        className={`flex flex-col items-center justify-center p-3 sm:p-4 lg:p-5 border-2 rounded-lg sm:rounded-xl cursor-pointer transition-all active:scale-95 sm:hover:scale-105 min-h-[80px] sm:min-h-[100px] lg:min-h-[120px] ${
                            duration === '5' 
                                ? 'border-[#FF75A0] bg-gradient-to-br from-[#FF75A0]/10 to-[#FFAA70]/10 text-[#FF75A0] dark:bg-[#FF75A0]/20 dark:text-[#FF75A0]' 
                                : 'border-gray-200 dark:border-gray-600 hover:border-[#FF75A0]/50'
                        }`}
                    >
                        <span className="text-lg sm:text-2xl lg:text-3xl mb-1 sm:mb-2">👀</span>
                        <span className="font-semibold text-sm sm:text-base lg:text-lg">5 Sec</span>
                        <span className="text-xs text-gray-500 mt-0.5 sm:mt-1 text-center leading-tight">Take it in</span>
                    </Label>
                </div>
                
                {/* 10 Second Option - Touch Optimized */}
                <div className={`relative ${isTimerDisabled ? 'opacity-50' : ''}`}>
                    <RadioGroupItem value="10" id="r3" className="sr-only" />
                    <Label 
                        htmlFor="r3" 
                        className={`flex flex-col items-center justify-center p-3 sm:p-4 lg:p-5 border-2 rounded-lg sm:rounded-xl cursor-pointer transition-all active:scale-95 sm:hover:scale-105 min-h-[80px] sm:min-h-[100px] lg:min-h-[120px] ${
                            duration === '10' 
                                ? 'border-[#FF75A0] bg-gradient-to-br from-[#FF75A0]/10 to-[#FFAA70]/10 text-[#FF75A0] dark:bg-[#FF75A0]/20 dark:text-[#FF75A0]' 
                                : 'border-gray-200 dark:border-gray-600 hover:border-[#FF75A0]/50'
                        }`}
                    >
                        <span className="text-lg sm:text-2xl lg:text-3xl mb-1 sm:mb-2">🧠</span>
                        <span className="font-semibold text-sm sm:text-base lg:text-lg">10 Sec</span>
                        <span className="text-xs text-gray-500 mt-0.5 sm:mt-1 text-center leading-tight">Process it</span>
                    </Label>
                </div>
            </RadioGroup>
        </div>
    );
}
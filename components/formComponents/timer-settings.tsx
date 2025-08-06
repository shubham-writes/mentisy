import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface TimerSettingsProps {
    duration: string;
    onDurationChange: (value: string) => void;
    isTimerDisabled: boolean;
}

export function TimerSettings({ duration, onDurationChange, isTimerDisabled }: TimerSettingsProps) {
    return (
        <div className="mt-10 pt-8 border-t border-gray-200 dark:border-gray-700">
            <Label className="text-base font-semibold mb-6 block text-gray-800 dark:text-gray-200">
                How long before it disappears forever?
            </Label>
            {isTimerDisabled && (
                <div className="mb-6 p-5 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-300 dark:border-amber-700">
                    <div className="flex items-center space-x-3 text-amber-800 dark:text-amber-200">
                        <span className="text-xl">⏱️</span>
                        <span className="font-medium">Video timer will match the video length automatically</span>
                    </div>
                </div>
            )}
            <RadioGroup 
                value={duration}
                onValueChange={onDurationChange}
                disabled={isTimerDisabled}
                className="grid grid-cols-3 gap-4"
            >
                <div className={`relative ${isTimerDisabled ? 'opacity-50' : ''}`}>
                    <RadioGroupItem value="3" id="r1" className="sr-only" />
                    <Label 
                        htmlFor="r1" 
                        className={`flex flex-col items-center justify-center p-6 border-2 rounded-xl cursor-pointer transition-all hover:scale-105 ${
                            duration === '3' 
                                ? 'border-[#FF75A0] bg-gradient-to-br from-[#FF75A0]/10 to-[#FFAA70]/10 text-[#FF75A0] dark:bg-[#FF75A0]/20 dark:text-[#FF75A0]' 
                                : 'border-gray-200 dark:border-gray-600 hover:border-[#FF75A0]/50'
                        }`}
                    >
                        <span className="text-3xl mb-2">⚡</span>
                        <span className="font-semibold text-lg">3 Sec</span>
                        <span className="text-xs text-gray-500 mt-1">Quick peek</span>
                    </Label>
                </div>
                <div className={`relative ${isTimerDisabled ? 'opacity-50' : ''}`}>
                    <RadioGroupItem value="5" id="r2" className="sr-only" />
                    <Label 
                        htmlFor="r2" 
                        className={`flex flex-col items-center justify-center p-6 border-2 rounded-xl cursor-pointer transition-all hover:scale-105 ${
                            duration === '5' 
                                ? 'border-[#FF75A0] bg-gradient-to-br from-[#FF75A0]/10 to-[#FFAA70]/10 text-[#FF75A0] dark:bg-[#FF75A0]/20 dark:text-[#FF75A0]' 
                                : 'border-gray-200 dark:border-gray-600 hover:border-[#FF75A0]/50'
                        }`}
                    >
                        <span className="text-3xl mb-2">👀</span>
                        <span className="font-semibold text-lg">5 Sec</span>
                        <span className="text-xs text-gray-500 mt-1">Take it in</span>
                    </Label>
                </div>
                <div className={`relative ${isTimerDisabled ? 'opacity-50' : ''}`}>
                    <RadioGroupItem value="10" id="r3" className="sr-only" />
                    <Label 
                        htmlFor="r3" 
                        className={`flex flex-col items-center justify-center p-6 border-2 rounded-xl cursor-pointer transition-all hover:scale-105 ${
                            duration === '10' 
                                ? 'border-[#FF75A0] bg-gradient-to-br from-[#FF75A0]/10 to-[#FFAA70]/10 text-[#FF75A0] dark:bg-[#FF75A0]/20 dark:text-[#FF75A0]' 
                                : 'border-gray-200 dark:border-gray-600 hover:border-[#FF75A0]/50'
                        }`}
                    >
                        <span className="text-3xl mb-2">🧠</span>
                        <span className="font-semibold text-lg">10 Sec</span>
                        <span className="text-xs text-gray-500 mt-1">Process it</span>
                    </Label>
                </div>
            </RadioGroup>
        </div>
    );
}
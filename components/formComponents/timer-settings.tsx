import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";
import { GameMode } from "@/lib/types"


interface TimerSettingsProps {
    duration: string;
    onDurationChange: (value: string) => void;
    isTimerDisabled: boolean;
    gameMode: GameMode;
}

// Durations for non-competitive modes
const normalDurations = [
    { value: "3", label: "3 Sec", description: "Quick", icon: "⚡️" },
    { value: "5", label: "5 Sec", description: "Take it in", icon: "👀" },
    { value: "10", label: "10 Sec", description: "Process it", icon: "🧠" },
];
const normalDurationValues = normalDurations.map(d => d.value);

// Durations for competitive games that take more time
const gameDurations = [
    { value: "30", label: "30 Sec", description: "Enough to play", icon: "🕹️" },
    { value: "60", label: "1 Min", description: "Take your time", icon: "⏳" },
    { value: "120", label: "2 Mins", description: "No rush please", icon: "🐢" },
];
const gameDurationValues = gameDurations.map(d => d.value);


export function TimerSettings({ duration, onDurationChange, isTimerDisabled, gameMode }: TimerSettingsProps) {
    
    const isCompetitiveGame = gameMode === 'qa_challenge' || gameMode === 'reveal_rush';
    const options = isCompetitiveGame ? gameDurations : normalDurations;

    // ✅ FIX: Add a useEffect to automatically update the duration when the game mode changes.
    useEffect(() => {
        // When the game mode changes, check if the current duration is valid for the new mode.
        if (isCompetitiveGame) {
            // If the current duration is not a valid game duration, set a default.
            if (!gameDurationValues.includes(duration)) {
                onDurationChange('60'); // Default for games is 1 minute
            }
        } else {
            // If the current duration is not a valid normal duration, set a default.
            if (!normalDurationValues.includes(duration)) {
                onDurationChange('10'); // Default for normal modes is 10 seconds
            }
        }
    }, [gameMode, duration, onDurationChange, isCompetitiveGame]);

    return (
        <div>
            <Label className="text-sm sm:text-base font-semibold mb-3 sm:mb-4 lg:mb-6 block text-gray-800 dark:text-gray-200">
                How long do they get to enjoy it?
            </Label>
            
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
            
            <RadioGroup 
                value={duration}
                onValueChange={onDurationChange}
                disabled={isTimerDisabled}
                className="grid grid-cols-3 gap-2 sm:gap-3"
            >
                {options.map((option, index) => (
                    <div key={option.value} className={`relative ${isTimerDisabled ? 'opacity-50' : ''}`}>
                        <RadioGroupItem value={option.value} id={`r${index + 1}`} className="sr-only" />
                        <Label 
                            htmlFor={`r${index + 1}`}
                            className={`flex flex-col items-center justify-center p-3 sm:p-4 lg:p-5 border-2 rounded-lg sm:rounded-xl cursor-pointer transition-all active:scale-95 sm:hover:scale-105 min-h-[80px] sm:min-h-[100px] lg:min-h-[120px] ${
                                duration === option.value 
                                    ? 'border-[#FF75A0] bg-gradient-to-br from-[#FF75A0]/10 to-[#FFAA70]/10 text-[#FF75A0] dark:bg-[#FF75A0]/20 dark:text-[#FF75A0]' 
                                    : 'border-gray-200 dark:border-gray-600 hover:border-[#FF75A0]/50'
                            }`}
                        >
                            <span className="text-lg sm:text-2xl lg:text-3xl mb-1 sm:mb-2">{option.icon}</span>
                            <span className="font-semibold text-sm sm:text-base lg:text-lg">{option.label}</span>
                            <span className="text-xs text-gray-500 mt-0.5 sm:mt-1 text-center leading-tight">{option.description}</span>
                        </Label>
                    </div>
                ))}
            </RadioGroup>
        </div>
    );
}

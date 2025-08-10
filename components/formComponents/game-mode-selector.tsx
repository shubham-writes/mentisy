import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type GameMode = "none" | "scratch_and_see" | "mystery_reveal" | "emoji_curtain";

interface GameModeSelectorProps {
    selectedMode: GameMode;
    onModeChange: (value: GameMode) => void;
    isGameModeDisabled: boolean;
}

const gameOptions = [
    { id: "none", icon: "✨", title: "Classic", description: "The original one-time view" },
    { id: "scratch_and_see", icon: "🐾", title: "Scratch & See", description: "Make them work for it" },
    { id: "mystery_reveal", icon: "❓", title: "Mystery Reveal", description: "A slow, blurry reveal" },
    { id: "emoji_curtain", icon: "🎉", title: "Emoji Curtain", description: "Hype it up with emojis" },
] as const;


export function GameModeSelector({ selectedMode, onModeChange, isGameModeDisabled }: GameModeSelectorProps) {
    return (
        <div>
            <Label className="text-sm sm:text-base font-semibold mb-3 sm:mb-4 lg:mb-6 block text-gray-800 dark:text-gray-200">
                Choose a Reveal Game
            </Label>

            {isGameModeDisabled && (
                <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg sm:rounded-xl border border-blue-300 dark:border-blue-700">
                    <div className="flex items-start sm:items-center space-x-2 sm:space-x-3 text-blue-800 dark:text-blue-200">
                        <span className="text-lg sm:text-xl flex-shrink-0 mt-0.5 sm:mt-0">🎮</span>
                        <span className="font-medium text-xs sm:text-sm leading-relaxed">
                            Games are only available for photos right now.
                        </span>
                    </div>
                </div>
            )}

            <RadioGroup
                value={selectedMode}
                onValueChange={(value) => onModeChange(value as GameMode)}
                disabled={isGameModeDisabled}
                className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3"
            >
                {gameOptions.map((option) => (
                    <div key={option.id} className={`relative ${isGameModeDisabled ? 'opacity-50' : ''}`}>
                        <RadioGroupItem value={option.id} id={option.id} className="sr-only" />
                        <Label
                            htmlFor={option.id}
                            className={`flex flex-col items-center justify-center p-3 sm:p-4 border-2 rounded-lg sm:rounded-xl cursor-pointer transition-all active:scale-95 sm:hover:scale-105 min-h-[100px] sm:min-h-[120px] ${
                                selectedMode === option.id
                                    ? 'border-[#8A2BE2] bg-gradient-to-br from-[#8A2BE2]/10 to-[#FFAA70]/10 text-[#8A2BE2] dark:bg-[#8A2BE2]/20 dark:text-[#8A2BE2]'
                                    : 'border-gray-200 dark:border-gray-600 hover:border-[#8A2BE2]/50'
                            }`}
                        >
                            <span className="text-2xl sm:text-3xl lg:text-4xl mb-1 sm:mb-2">{option.icon}</span>
                            <span className="font-semibold text-xs sm:text-sm text-center leading-tight">{option.title}</span>
                        </Label>
                    </div>
                ))}
            </RadioGroup>
        </div>
    );
}
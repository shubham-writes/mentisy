// game-mode-selector.tsx
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type GameMode = "none" | "scratch_and_see" | "qa_challenge" | "reveal_rush" | "yes_or_no" | "pic_swap";

interface GameModeSelectorProps {
    selectedMode: GameMode;
    onModeChange: (value: GameMode) => void;
    isGameModeDisabled: boolean;
    uploadedFile?: { url: string; type: "image" | "video" } | null;
    onFeedbackClick?: () => void;
}

const gameOptions = [
    { id: "scratch_and_see", icon: "/game-icons/scratch_and_see.png", title: "Scratch&See", description: "Make them work for it" },
    { id: "qa_challenge", icon: "/game-icons/qa_challenge.png", title: "Q & A", description: "Quiz them to unlock" },
    { id: "yes_or_no", icon: "/game-icons/yes_or_no.png", title: "Yes or No", description: "Two choices, two reveals" },
    { id: "reveal_rush", icon: "/game-icons/reveal_rush.png", title: "RevealRush", description: "Group challenge mode" },
] as const;

export function GameModeSelector({ selectedMode, onModeChange, isGameModeDisabled, uploadedFile, onFeedbackClick }: GameModeSelectorProps) {
    const [areOtherModesVisible, setAreOtherModesVisible] = useState(false);

    return (
        <div>
            <RadioGroup
                value={selectedMode}
                onValueChange={(value) => onModeChange(value as GameMode)}
                disabled={isGameModeDisabled}
                className="space-y-4"
            >
                {/* --- COLLAPSIBLE OTHER GAMES SECTION --- */}
                <div>
                    {/* Toggle Button */}
                    <button
                        type="button"
                        onClick={() => setAreOtherModesVisible(!areOtherModesVisible)}
                        className="w-full flex items-center justify-between p-3 sm:p-4 rounded-xl bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-700 hover:from-gray-200 hover:to-gray-100 dark:hover:from-gray-700 dark:hover:to-gray-600 border border-gray-200 dark:border-gray-600 transition-all duration-200 active:scale-98"
                    >
                        <div className="flex items-center space-x-3">
                            <span className="text-lg">🎮</span>
                            <span className="font-semibold text-sm sm:text-base text-gray-800 dark:text-gray-200">
                                Try Other Fun Modes
                            </span>
                        </div>
                        <div className={`transition-transform duration-200 ${areOtherModesVisible ? 'rotate-180' : 'rotate-0'}`}>
                            <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </button>

                    {/* PicSwap - Default Mode (Always Visible) */}
                    <div className="mt-3">
                        <div className={`relative ${isGameModeDisabled ? 'opacity-50' : ''}`}>
                            <RadioGroupItem value="pic_swap" id="pic_swap" className="sr-only" />
                            <Label
                                htmlFor="pic_swap"
                                className={`group flex items-center p-3 sm:p-4 rounded-xl cursor-pointer transition-all duration-300 active:scale-95 sm:hover:scale-[1.01] border-2 ${selectedMode === 'pic_swap'
                                        ? 'bg-gradient-to-br from-pink-500/20 via-pink-500/15 to-pink-500/20 border-pink-400 dark:border-pink-500 shadow-lg'
                                        : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-pink-300 dark:hover:border-pink-600'
                                    }`}
                            >
                                <img
                                    src="/game-icons/pic_swap.png"
                                    alt="PicSwap icon"
                                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg object-cover transition-all duration-300 group-hover:scale-105"
                                />
                                <div className="ml-4 flex-1">
                                    <span className={`font-bold text-sm sm:text-base block transition-colors duration-300 ${selectedMode === 'pic_swap'
                                            ? 'text-gray-800 dark:text-gray-200'
                                            : 'text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200'
                                        }`}>
                                        PicSwap
                                    </span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                        Instant reveal (Default)
                                    </span>
                                </div>
                                {selectedMode === 'pic_swap' && (
                                    <div className="ml-2">
                                        <svg className="w-5 h-5 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                )}
                            </Label>
                        </div>
                    </div>

                    {/* Collapsible Grid */}
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${areOtherModesVisible ? 'max-h-[500px] opacity-100 mt-3' : 'max-h-0 opacity-0'
                        }`}>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                            {gameOptions.map((option) => (
                                <div key={option.id} className={`relative ${isGameModeDisabled ? 'opacity-50' : ''}`}>
                                    <RadioGroupItem value={option.id} id={option.id} className="sr-only" />
                                    <Label
                                        htmlFor={option.id}
                                        className={`group flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl sm:rounded-2xl cursor-pointer transition-all duration-300 active:scale-95 sm:hover:scale-[1.02] min-h-[110px] sm:min-h-[120px] border-2 ${selectedMode === option.id
                                            ? 'bg-gradient-to-br from-gray-500/20 via-gray-500/15 to-gray-500/20 border-gray-400 dark:border-gray-500 shadow-lg'
                                            : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600'
                                            }`}
                                    >
                                        <img
                                            src={option.icon}
                                            alt={`${option.title} icon`}
                                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover transition-all duration-300 group-hover:scale-110"
                                        />
                                        <span className={`font-bold text-xs sm:text-sm text-center mt-2 sm:mt-3 transition-colors duration-300 ${selectedMode === option.id
                                            ? 'text-gray-800 dark:text-gray-200'
                                            : 'text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200'
                                            }`}>
                                            {option.title}
                                        </span>
                                    </Label>
                                    {option.id === "reveal_rush" && (
                                        <div className="absolute flex items-center justify-center -top-1 -right-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-2 py-1 rounded-full shadow-lg border-2 border-white dark:border-gray-800">
                                            <span className="text-[9px] sm:text-[10px] font-bold tracking-wide">Group</span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </RadioGroup>
        </div>
    );
}
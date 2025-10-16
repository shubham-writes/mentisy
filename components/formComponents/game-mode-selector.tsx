// game-mode-selector.tsx

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";

type GameMode = "none" | "scratch_and_see" | "qa_challenge" | "reveal_rush" | "yes_or_no";

interface GameModeSelectorProps {
    selectedMode: GameMode;
    onModeChange: (value: GameMode) => void;
    isGameModeDisabled: boolean;
    uploadedFile?: { url: string; type: "image" | "video" } | null;
    onFeedbackClick?: () => void;
}

const gameOptions = [
    { id: "none", icon: "/game-icons/classic.png", title: "Classic", description: "The original one-time view" },
    { id: "scratch_and_see", icon: "/game-icons/scratch_and_see.png", title: "Scratch&See", description: "Make them work for it" },
    { id: "qa_challenge", icon: "/game-icons/qa_challenge.png", title: "Q & A", description: "Quiz them to unlock" },
    { id: "yes_or_no", icon: "/game-icons/yes_or_no.png", title: "Yes or No", description: "Two choices, two reveals" },
    { id: "reveal_rush", icon: "/game-icons/reveal_rush.png", title: "Reveal Rush", description: "Group challenge mode" },
] as const;

export function GameModeSelector({ selectedMode, onModeChange, isGameModeDisabled, uploadedFile, onFeedbackClick }: GameModeSelectorProps) {
    const handleFeedbackClick = (e: React.MouseEvent) => {
        e.preventDefault();
        onFeedbackClick?.();
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-3 sm:mb-4 lg:mb-6">
                <Label className="text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-200">
                    Choose a Reveal Game
                </Label>

                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleFeedbackClick}
                    className="flex items-center gap-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-2 h-auto"
                    title="Suggest new games or report issues"
                >
                    <HelpCircle className="w-4 h-4" />
                    <span className="text-xs font-medium">Feedback</span>
                </Button>
            </div>

            {isGameModeDisabled && (
                <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg sm:rounded-xl border border-blue-300 dark:border-blue-700">
                    <div className="flex items-start sm:items-center space-x-2 sm:space-x-3 text-blue-800 dark:text-blue-200">
                        <span className="text-lg sm:text-xl flex-shrink-0 mt-0.5 sm:mt-0">🎮</span>
                        <span className="font-medium text-xs sm:text-sm leading-relaxed">
                            {!uploadedFile
                                ? "Upload an image first to unlock reveal games!"
                                : "Games are only available for photos right now."}
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
                            className={`group flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl sm:rounded-2xl cursor-pointer transition-all duration-300 active:scale-95 sm:hover:scale-[1.02] min-h-[120px] sm:min-h-[140px] border-2 ${selectedMode === option.id
                                    ? 'bg-gradient-to-br from-violet-500/20 via-purple-500/15 to-fuchsia-500/20 border-violet-400 dark:border-violet-500 shadow-lg shadow-violet-500/30 dark:shadow-violet-500/20'
                                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-violet-300 dark:hover:border-violet-600 hover:shadow-xl hover:shadow-violet-500/10 dark:hover:shadow-violet-500/5'
                                }`}
                        >
                            <div className={`relative transition-transform duration-300 ${selectedMode === option.id ? 'scale-110' : 'group-hover:scale-110'}`}>
                                <img
                                    src={option.icon}
                                    alt={`${option.title} icon`}
                                    className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-lg object-cover transition-all duration-300"
                                />
                                {selectedMode === option.id && (
                                    <div className="absolute inset-0 bg-gradient-to-br from-violet-400/20 to-fuchsia-400/20 rounded-lg"></div>
                                )}
                            </div>

                            <span className={`font-bold text-xs sm:text-sm text-center mt-2 sm:mt-3 transition-colors duration-300 ${selectedMode === option.id
                                    ? 'text-violet-700 dark:text-violet-300'
                                    : 'text-gray-700 dark:text-gray-300 group-hover:text-violet-600 dark:group-hover:text-violet-400'
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
            </RadioGroup>
        </div>
    );
}
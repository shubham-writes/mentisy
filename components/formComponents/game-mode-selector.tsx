// Replace the entire game-mode-selector.tsx file with this:

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";
import { useState } from "react";
import {FeedbackModal} from '@/components/feedback/FeedbackModal';

// --- CHANGE 1: ADD "reveal_rush" TO THE GAMEMODE TYPE ---
type GameMode = "none" | "scratch_and_see" | "qa_challenge" | "reveal_rush";

// UPDATED INTERFACE - ADD uploadedFile prop
interface GameModeSelectorProps {
    selectedMode: GameMode;
    onModeChange: (value: GameMode) => void;
    isGameModeDisabled: boolean;
    uploadedFile?: { url: string; type: "image" | "video" } | null;
}

// --- CHANGE 2: ADD THE NEW reveal-rush OBJECT TO THE ARRAY ---
const gameOptions = [
    { id: "none", icon: "✨", title: "Classic", description: "The original one-time view" },
    { id: "scratch_and_see", icon: "🐾", title: "Scratch & See", description: "Make them work for it" },
    { id: "qa_challenge", icon: "🤔", title: "Q & A", description: "Quiz them to unlock" },
    { id: "reveal_rush", icon: "🏆", title: "Reveal Rush", description: "Group challenge mode" },
] as const;

// UPDATED FUNCTION SIGNATURE - ADD uploadedFile parameter
export function GameModeSelector({ selectedMode, onModeChange, isGameModeDisabled, uploadedFile }: GameModeSelectorProps) {
    const [showFeedback, setShowFeedback] = useState(false);

    return (
        <>
            <div>
                <div className="flex items-center justify-between mb-3 sm:mb-4 lg:mb-6">
                    <Label className="text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-200">
                        Choose a Reveal Game
                    </Label>
                    
                    {/* Feedback Button */}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowFeedback(true)}
                        className="flex items-center gap-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-2 h-auto"
                        title="Suggest new games or report issues"
                    >
                        <HelpCircle className="w-4 h-4" />
                        <span className="text-xs font-medium">Feedback</span>
                    </Button>
                </div>

                {/* UPDATED DISABLED MESSAGE */}
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
                                className={`flex flex-col items-center justify-center p-3 sm:p-4 border-2 rounded-lg sm:rounded-xl cursor-pointer transition-all active:scale-95 sm:hover:scale-105 min-h-[100px] sm:min-h-[120px] ${
                                    selectedMode === option.id
                                        ? 'border-[#8A2BE2] bg-gradient-to-br from-[#8A2BE2]/10 to-[#FFAA70]/10 text-[#8A2BE2] dark:bg-[#8A2BE2]/20 dark:text-[#8A2BE2]'
                                        : 'border-gray-200 dark:border-gray-600 hover:border-[#8A2BE2]/50'
                                }`}
                            >
                                <span className="text-2xl sm:text-3xl lg:text-4xl mb-1 sm:mb-2">{option.icon}</span>
                                <span className="font-semibold text-xs sm:text-sm text-center leading-tight">{option.title}</span>
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

            {/* Feedback Modal */}
            <FeedbackModal
                isOpen={showFeedback}
                onClose={() => setShowFeedback(false)}
                defaultTab="game"
            />
        </>
    );
}
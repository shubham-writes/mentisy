"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FeedbackModal } from '@/components/feedback/FeedbackModal';
import { useState } from "react";

type MicroQuestType = "group_qa" | "rate_my";

interface MicroQuestFormFieldsProps {
    microQuestType: MicroQuestType;
    onTypeChange: (type: MicroQuestType) => void;

    // Group Q&A fields
    mqGroupQuestion: string;
    mqGroupAnswer: string;
    onGroupQuestionChange: (value: string) => void;
    onGroupAnswerChange: (value: string) => void;

    // Rate My fields
    mqRateCategory: string;
    mqExpectedRating: number;
    onRateCategoryChange: (value: string) => void;
    onExpectedRatingChange: (value: number) => void;
}

export function MicroQuestFormFields({
    microQuestType,
    onTypeChange,
    mqGroupQuestion,
    mqGroupAnswer,
    onGroupQuestionChange,
    onGroupAnswerChange,
    mqRateCategory,
    mqExpectedRating,
    onRateCategoryChange,
    onExpectedRatingChange,
}: MicroQuestFormFieldsProps) {
    const [showFeedback, setShowFeedback] = useState(false);

    const questTypes = [
        {
            id: "group_qa",
            icon: "🧠",
            title: "Group Q&A",
            description: "First correct answer wins"
        },
        {
            id: "rate_my",
            icon: "⭐",
            title: "Rate My...",
            description: "Guess my self-rating"
        },
    ];

    return (
        <div className="space-y-4 sm:space-y-6 lg:space-y-8">
            {/* Header */}
            <div className="text-center p-3 sm:p-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl border border-orange-200/50 dark:border-orange-700/50">
                <span className="text-xl sm:text-2xl mb-2 block">🏆</span>
                <h3 className="font-semibold text-orange-800 dark:text-orange-200 mb-1">reveal-rush Setup</h3>
                <p className="text-sm text-orange-600 dark:text-orange-300">
                    Create a challenge for your group. First to win sees the secret!
                </p>
            </div>

            {/* Quest Type Selector */}
            <div>
                <Label className="text-sm sm:text-base font-semibold mb-3 sm:mb-4 block text-gray-800 dark:text-gray-200">
                    Choose Your Challenge Type
                </Label>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <RadioGroup
                        value={microQuestType}
                        onValueChange={(value) => onTypeChange(value as MicroQuestType)}
                        className="contents"
                    >
                        {questTypes.map((option) => (
                            <div key={option.id} className="relative">
                                <RadioGroupItem value={option.id} id={option.id} className="sr-only" />
                                <Label
                                    htmlFor={option.id}
                                    className={`flex flex-col items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all hover:scale-105 min-h-[120px] ${
                                        microQuestType === option.id
                                            ? 'border-orange-500 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/30 dark:to-red-900/30 text-orange-700 dark:text-orange-300'
                                            : 'border-gray-200 dark:border-gray-600 hover:border-orange-300'
                                    }`}
                                >
                                    <span className="text-2xl mb-2">{option.icon}</span>
                                    <span className="font-semibold text-sm text-center mb-1">{option.title}</span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400 text-center">{option.description}</span>
                                </Label>
                            </div>
                        ))}
                    </RadioGroup>

                    {/* Locked Game Suggestion Option */}
                    <div 
                        className="relative cursor-pointer"
                        onClick={() => setShowFeedback(true)}
                        title="Click to request this feature"
                    >
                        <div className="flex flex-col items-center justify-center p-4 border-2 border-gray-300 dark:border-gray-600 rounded-xl min-h-[120px] bg-gray-200 dark:bg-gray-700 transition-all hover:bg-gray-300 dark:hover:bg-gray-600">
                            <div className="relative">
                                <span className="text-2xl mb-2 block opacity-30">💡</span>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-lg opacity-60">🔒</span>
                                </div>
                            </div>
                            <span className="font-semibold text-sm text-center mb-1 text-gray-400 dark:text-gray-500">Suggest a Game</span>
                            <span className="text-xs text-gray-400 dark:text-gray-500 text-center">Coming Soon</span>
                        </div>
                        
                        {/* Subtle overlay pattern for disabled look */}
                        <div className="absolute inset-0 bg-gray-400/10 dark:bg-gray-600/10 rounded-xl pointer-events-none" 
                             style={{
                                 backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,.1) 2px, rgba(255,255,255,.1) 4px)'
                             }}>
                        </div>
                    </div>
                </div>
            </div>

            {/* Conditional Form Fields Based on Selected Type */}
            {microQuestType === "group_qa" && (
                <div className="space-y-4 p-4 sm:p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200/50 dark:border-blue-700/50">
                    <h4 className="font-semibold text-blue-800 dark:text-blue-200 flex items-center">
                        <span className="mr-2">🧠</span>
                        Setup: Group Q&A
                    </h4>
                    <div>
                        <Label htmlFor="mq-group-question" className="text-sm font-medium mb-2 block text-gray-700 dark:text-gray-300">
                            Question for the Group <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="mq-group-question"
                            placeholder="e.g., What's my biggest fear?"
                            value={mqGroupQuestion}
                            onChange={(e) => onGroupQuestionChange(e.target.value)}
                            className="h-12 rounded-lg border-2 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <Label htmlFor="mq-group-answer" className="text-sm font-medium mb-2 block text-gray-700 dark:text-gray-300">
                            Correct Answer <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="mq-group-answer"
                            placeholder="e.g., Heights"
                            value={mqGroupAnswer}
                            onChange={(e) => onGroupAnswerChange(e.target.value)}
                            className="h-12 rounded-lg border-2 focus:border-blue-500"
                        />
                    </div>
                </div>
            )}

            {microQuestType === "rate_my" && (
                <div className="space-y-4 p-4 sm:p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200/50 dark:border-yellow-700/50">
                    <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 flex items-center">
                        <span className="mr-2">⭐</span>
                        Setup: Rate My...
                    </h4>
                    <div>
                        <Label htmlFor="mq-rate-category" className="text-sm font-medium mb-2 block text-gray-700 dark:text-gray-300">
                            What should they rate? <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="mq-rate-category"
                            placeholder="e.g., my new haircut, my fashion sense"
                            value={mqRateCategory}
                            onChange={(e) => onRateCategoryChange(e.target.value)}
                            className="h-12 rounded-lg border-2 focus:border-yellow-500"
                        />
                    </div>
                    <div>
                        <Label className="text-sm font-medium mb-3 block text-gray-700 dark:text-gray-300">
                            How would you rate yourself? (1-10) <span className="text-red-500">*</span>
                        </Label>
                        <div className="flex gap-2 flex-wrap">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
                                <button
                                    key={rating}
                                    type="button"
                                    onClick={() => onExpectedRatingChange(rating)}
                                    className={`w-10 h-10 rounded-lg border-2 font-medium text-sm transition-all duration-200 ${
                                        mqExpectedRating === rating
                                            ? 'border-yellow-500 bg-yellow-500 text-white'
                                            : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:border-yellow-400'
                                    }`}
                                >
                                    {rating}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            
            {/* Feedback Modal */}
            <FeedbackModal
                isOpen={showFeedback}
                onClose={() => setShowFeedback(false)}
                defaultTab="game"
            />
        </div>
    );
}
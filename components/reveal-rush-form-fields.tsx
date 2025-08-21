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
    mqGroupQuestion: string;
    mqGroupAnswer: string;
    onGroupQuestionChange: (value: string) => void;
    onGroupAnswerChange: (value: string) => void;
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
        <div className="space-y-4">
            {/* Compact Header */}
            <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg border border-orange-200/50 dark:border-orange-700/50">
                <span className="text-lg">🏆</span>
                <div className="flex-1">
                    <h4 className="font-semibold text-orange-800 dark:text-orange-200 text-sm">Reveal Rush</h4>
                    <p className="text-xs text-orange-600 dark:text-orange-300">First to complete the challenge wins</p>
                </div>
            </div>

            {/* Challenge Type Selector - Compact */}
            <div>
                <Label className="text-sm font-medium mb-2 block text-gray-800 dark:text-gray-200">
                    Challenge Type
                </Label>
                
                <RadioGroup
                    value={microQuestType}
                    onValueChange={(value) => onTypeChange(value as MicroQuestType)}
                    className="grid grid-cols-2 gap-2"
                >
                    {questTypes.map((option) => (
                        <div key={option.id} className="relative">
                            <RadioGroupItem value={option.id} id={option.id} className="sr-only" />
                            <Label
                                htmlFor={option.id}
                                className={`flex items-center space-x-2 p-3 border-2 rounded-lg cursor-pointer transition-all min-h-[60px] ${
                                    microQuestType === option.id
                                        ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300'
                                        : 'border-gray-200 dark:border-gray-600 hover:border-orange-300'
                                }`}
                            >
                                <span className="text-lg">{option.icon}</span>
                                <div className="flex-1 min-w-0">
                                    <div className="font-medium text-sm">{option.title}</div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">{option.description}</div>
                                </div>
                            </Label>
                        </div>
                    ))}
                </RadioGroup>

                {/* Coming Soon Option - Subtle */}
                <button
                    onClick={() => setShowFeedback(true)}
                    className="w-full mt-2 p-2 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-400 transition-all"
                >
                    + Suggest a new challenge type
                </button>
            </div>

            {/* Dynamic Content Based on Selection */}
            <div className="space-y-3">
                {microQuestType === "group_qa" && (
                    <>
                        <div>
                            <Label htmlFor="mq-group-question" className="text-sm font-medium mb-2 block text-gray-700 dark:text-gray-300">
                                Question for the Group <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="mq-group-question"
                                placeholder="What's my biggest fear?"
                                value={mqGroupQuestion}
                                onChange={(e) => onGroupQuestionChange(e.target.value)}
                                className="h-11 text-sm rounded-lg border-2 border-gray-200 dark:border-gray-600 focus:border-orange-500 dark:focus:border-orange-500 focus:ring-0 px-3"
                            />
                        </div>
                        <div>
                            <Label htmlFor="mq-group-answer" className="text-sm font-medium mb-2 block text-gray-700 dark:text-gray-300">
                                Correct Answer <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="mq-group-answer"
                                placeholder="Heights"
                                value={mqGroupAnswer}
                                onChange={(e) => onGroupAnswerChange(e.target.value)}
                                className="h-11 text-sm rounded-lg border-2 border-gray-200 dark:border-gray-600 focus:border-orange-500 dark:focus:border-orange-500 focus:ring-0 px-3"
                            />
                        </div>
                    </>
                )}

                {microQuestType === "rate_my" && (
                    <>
                        <div>
                            <Label htmlFor="mq-rate-category" className="text-sm font-medium mb-2 block text-gray-700 dark:text-gray-300">
                                What should they rate? <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="mq-rate-category"
                                placeholder="my new haircut"
                                value={mqRateCategory}
                                onChange={(e) => onRateCategoryChange(e.target.value)}
                                className="h-11 text-sm rounded-lg border-2 border-gray-200 dark:border-gray-600 focus:border-yellow-500 dark:focus:border-yellow-500 focus:ring-0 px-3"
                            />
                        </div>
                        <div>
                            <Label className="text-sm font-medium mb-2 block text-gray-700 dark:text-gray-300">
                                Your self-rating (1-10) <span className="text-red-500">*</span>
                            </Label>
                            <div className="flex gap-1 flex-wrap">
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
                                    <button
                                        key={rating}
                                        type="button"
                                        onClick={() => onExpectedRatingChange(rating)}
                                        className={`w-7 h-7 rounded-md text-xs font-medium transition-all ${
                                            mqExpectedRating === rating
                                                ? 'bg-yellow-500 text-white'
                                                : 'bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-yellow-400'
                                        }`}
                                    >
                                        {rating}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* Status Indicator */}
            {((microQuestType === "group_qa" && mqGroupQuestion && mqGroupAnswer) ||
              (microQuestType === "rate_my" && mqRateCategory && mqExpectedRating)) && (
                <div className="flex items-center space-x-2 p-2 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200/50 dark:border-green-700/50">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <p className="text-sm text-green-700 dark:text-green-300">
                        {microQuestType === "group_qa" ? "Group Q&A" : "Rate My"} challenge ready
                    </p>
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
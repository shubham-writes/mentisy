"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { ChevronDown, ChevronUp, Settings, HelpCircle } from "lucide-react";

interface QAFormFieldsProps {
    qaQuestion: string;
    qaAnswer: string;
    qaMaxAttempts: number;
    qaCaseSensitive: boolean;
    qaShowHints: boolean;
    timerDuration?: string; // Add this prop
    onQuestionChange: (value: string) => void;
    onAnswerChange: (value: string) => void;
    onMaxAttemptsChange: (value: number) => void;
    onCaseSensitiveChange: (value: boolean) => void;
    onShowHintsChange: (value: boolean) => void;
}

export function QAFormFields({
    qaQuestion,
    qaAnswer,
    qaMaxAttempts,
    qaCaseSensitive,
    qaShowHints,
    timerDuration,
    onQuestionChange,
    onAnswerChange,
    onMaxAttemptsChange,
    onCaseSensitiveChange,
    onShowHintsChange,
}: QAFormFieldsProps) {
    const [showAdvanced, setShowAdvanced] = useState(false);

    // Auto-expand advanced settings if user has customized them
    const hasCustomSettings = qaMaxAttempts !== 3 || qaCaseSensitive || !qaShowHints;

    // Helper function to format timer duration
    const formatTimerDuration = (duration: string) => {
        const seconds = parseInt(duration);
        if (seconds >= 60) {
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = seconds % 60;
            if (remainingSeconds === 0) {
                return `${minutes} min${minutes > 1 ? 's' : ''}`;
            } else {
                return `${minutes}m ${remainingSeconds}s`;
            }
        }
        return `${seconds} sec${seconds > 1 ? 's' : ''}`;
    };

    return (
        <div className="space-y-4">
            {/* Compact Header */}
            <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg border border-purple-200/50 dark:border-purple-700/50">
                <span className="text-lg">🤔</span>
                <div className="flex-1">
                    <h4 className="font-semibold text-purple-800 dark:text-purple-200 text-sm">Q&A Challenge</h4>
                    <p className="text-xs text-purple-600 dark:text-purple-300">Answer correctly to reveal the image</p>
                </div>
            </div>

            {/* Essential Fields Only */}
            <div className="space-y-3">
                {/* Question Input - Simplified */}
                <div>
                    <Label htmlFor="qa-question" className="text-sm font-medium mb-2 block text-gray-800 dark:text-gray-200">
                        Your Question <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="qa-question"
                        placeholder="What's my favorite color?"
                        value={qaQuestion}
                        onChange={(e) => onQuestionChange(e.target.value)}
                        className="h-11 text-sm rounded-lg border-2 border-gray-200 dark:border-gray-600 focus:border-[#FF75A0] dark:focus:border-[#FF75A0] focus:ring-0 focus:outline-none px-3 transition-colors duration-200"
                        maxLength={150}
                    />
                </div>

                {/* Answer Input - Simplified */}
                <div>
                    <Label htmlFor="qa-answer" className="text-sm font-medium mb-2 block text-gray-800 dark:text-gray-200">
                        Correct Answer <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="qa-answer"
                        placeholder="Blue"
                        value={qaAnswer}
                        onChange={(e) => onAnswerChange(e.target.value)}
                        className="h-11 text-sm rounded-lg border-2 border-gray-200 dark:border-gray-600 focus:border-[#FF75A0] dark:focus:border-[#FF75A0] focus:ring-0 focus:outline-none px-3 transition-colors duration-200"
                        maxLength={80}
                    />
                </div>
            </div>

            {/* Advanced Settings - Collapsible */}
            <div className="border-t border-gray-200 dark:border-gray-600 pt-3">
                <button
                    type="button"
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className="flex items-center justify-between w-full p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                    <div className="flex items-center space-x-2">
                        <Settings className="h-4 w-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Game Settings
                        </span>
                        {hasCustomSettings && (
                            <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs rounded-full">
                                Customized
                            </span>
                        )}
                    </div>
                    {showAdvanced ? (
                        <ChevronUp className="h-4 w-4 text-gray-500" />
                    ) : (
                        <ChevronDown className="h-4 w-4 text-gray-500" />
                    )}
                </button>

                {/* Expandable Advanced Settings */}
                {showAdvanced && (
                    <div className="mt-3 space-y-4 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                        {/* Max Attempts - Compact */}
                        <div>
                            <Label className="text-sm text-gray-700 dark:text-gray-300 block mb-2">
                                Max Attempts: {qaMaxAttempts}
                            </Label>
                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((num) => (
                                    <button
                                        key={num}
                                        type="button"
                                        onClick={() => onMaxAttemptsChange(num)}
                                        className={`w-8 h-8 rounded-md text-xs font-medium transition-all ${qaMaxAttempts === num
                                                ? 'bg-[#FF75A0] text-white'
                                                : 'bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-[#FF75A0]/50'
                                            }`}
                                    >
                                        {num}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Toggles - Inline */}
                        <div className="flex flex-col space-y-2">
                            <label className="flex items-center justify-between cursor-pointer">
                                <span className="text-sm text-gray-700 dark:text-gray-300">Case sensitive</span>
                                <div
                                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${qaCaseSensitive ? 'bg-[#FF75A0]' : 'bg-gray-200 dark:bg-gray-600'
                                        }`}
                                    onClick={() => onCaseSensitiveChange(!qaCaseSensitive)}
                                >
                                    <span
                                        className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${qaCaseSensitive ? 'translate-x-5' : 'translate-x-1'
                                            }`}
                                    />
                                </div>
                            </label>

                            <label className="flex items-center justify-between cursor-pointer">
                                <span className="text-sm text-gray-700 dark:text-gray-300">Show hints</span>
                                <div
                                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${qaShowHints ? 'bg-[#FF75A0]' : 'bg-gray-200 dark:bg-gray-600'
                                        }`}
                                    onClick={() => onShowHintsChange(!qaShowHints)}
                                >
                                    <span
                                        className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${qaShowHints ? 'translate-x-5' : 'translate-x-1'
                                            }`}
                                    />
                                </div>
                            </label>
                        </div>
                    </div>
                )}
            </div>

            {/* Status Indicator - With Timer */}
            {qaQuestion && qaAnswer && (
                <div className="flex items-center space-x-2 p-2 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200/50 dark:border-green-700/50">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <p className="text-sm text-green-700 dark:text-green-300">
                        Fun ready • {qaMaxAttempts} attempt{qaMaxAttempts > 1 ? 's' : ''}
                        {timerDuration && ` • ${formatTimerDuration(timerDuration)} timer`}
                    </p>
                </div>
            )}
        </div>
    );
}
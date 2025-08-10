"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface QAFormFieldsProps {
    qaQuestion: string;
    qaAnswer: string;
    qaMaxAttempts: number;
    qaCaseSensitive: boolean;
    qaShowHints: boolean;
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
    onQuestionChange,
    onAnswerChange,
    onMaxAttemptsChange,
    onCaseSensitiveChange,
    onShowHintsChange,
}: QAFormFieldsProps) {
    return (
        <div className="space-y-4 sm:space-y-6 lg:space-y-8">
            {/* Header */}
            <div className="text-center p-3 sm:p-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl border border-purple-200/50 dark:border-purple-700/50">
                <span className="text-xl sm:text-2xl mb-2 block">🤔</span>
                <h3 className="font-semibold text-purple-800 dark:text-purple-200 mb-1">Q&A Challenge Setup</h3>
                <p className="text-sm text-purple-600 dark:text-purple-300">
                    They'll need to answer correctly to reveal your secret!
                </p>
            </div>

            {/* Question Input - Using your style */}
            <div>
                <Label 
                    htmlFor="qa-question" 
                    className="text-sm sm:text-base font-semibold mb-2 sm:mb-3 lg:mb-4 block text-left text-gray-800 dark:text-gray-200"
                >
                    Your Question <span className="text-red-500">*</span>
                </Label>
                <Input
                    id="qa-question"
                    placeholder="e.g., What's my favorite color? or Where did we first meet?"
                    value={qaQuestion}
                    onChange={(e) => onQuestionChange(e.target.value)}
                    className="h-12 sm:h-13 lg:h-14 text-sm sm:text-base rounded-lg sm:rounded-xl border-2 border-gray-200 dark:border-gray-600 focus:border-[#FF75A0] dark:focus:border-[#FF75A0] focus:ring-[#FF75A0] focus:outline-none px-3 sm:px-4 transition-colors duration-200 placeholder:text-gray-200 dark:placeholder:text-gray-700 placeholder:font-light placeholder:opacity-50"
                    maxLength={200}
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-right">
                    {qaQuestion.length}/200 characters
                </p>
            </div>

            {/* Answer Input - Using your style */}
            <div>
                <Label 
                    htmlFor="qa-answer" 
                    className="text-sm sm:text-base font-semibold mb-2 sm:mb-3 lg:mb-4 block text-left text-gray-800 dark:text-gray-200"
                >
                    Correct Answer <span className="text-red-500">*</span>
                </Label>
                <Input
                    id="qa-answer"
                    placeholder="e.g., Blue or Central Park"
                    value={qaAnswer}
                    onChange={(e) => onAnswerChange(e.target.value)}
                    className="h-12 sm:h-13 lg:h-14 text-sm sm:text-base rounded-lg sm:rounded-xl border-2 border-gray-200 dark:border-gray-600 focus:border-[#FF75A0] dark:focus:border-[#FF75A0] focus:ring-[#FF75A0] focus:outline-none px-3 sm:px-4 transition-colors duration-200 placeholder:text-gray-200 dark:placeholder:text-gray-700 placeholder:font-light placeholder:opacity-50"
                    maxLength={100}
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-right">
                    {qaAnswer.length}/100 characters
                </p>
            </div>

            {/* Game Settings */}
            <div className="space-y-4 p-4 sm:p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200/50 dark:border-gray-600/50">
                <h4 className="font-semibold text-gray-800 dark:text-gray-200 text-sm sm:text-base">Game Settings</h4>
                
                {/* Max Attempts - Using buttons instead of slider */}
                <div className="space-y-3">
                    <Label className="text-sm sm:text-base text-gray-700 dark:text-gray-300 block">
                        Max Attempts
                    </Label>
                    <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((num) => (
                            <button
                                key={num}
                                type="button"
                                onClick={() => onMaxAttemptsChange(num)}
                                className={`w-10 h-10 rounded-lg border-2 font-medium text-sm transition-all duration-200 ${
                                    qaMaxAttempts === num
                                        ? 'border-[#FF75A0] bg-[#FF75A0] text-white'
                                        : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:border-[#FF75A0]/50'
                                }`}
                            >
                                {num}
                            </button>
                        ))}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        Number of attempts they get to answer correctly
                    </p>
                </div>

                {/* Case Sensitive Toggle - Using button instead of switch */}
                <div className="flex items-center justify-between">
                    <div>
                        <Label className="text-sm sm:text-base text-gray-700 dark:text-gray-300 block">
                            Case Sensitive
                        </Label>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            "Blue" ≠ "blue"
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={() => onCaseSensitiveChange(!qaCaseSensitive)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            qaCaseSensitive 
                                ? 'bg-[#FF75A0]' 
                                : 'bg-gray-200 dark:bg-gray-600'
                        }`}
                    >
                        <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                qaCaseSensitive ? 'translate-x-6' : 'translate-x-1'
                            }`}
                        />
                    </button>
                </div>

                {/* Show Hints Toggle - Using button instead of switch */}
                <div className="flex items-center justify-between">
                    <div>
                        <Label className="text-sm sm:text-base text-gray-700 dark:text-gray-300 block">
                            Show Hints
                        </Label>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            First & last letters after wrong attempts
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={() => onShowHintsChange(!qaShowHints)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            qaShowHints 
                                ? 'bg-[#FF75A0]' 
                                : 'bg-gray-200 dark:bg-gray-600'
                        }`}
                    >
                        <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                qaShowHints ? 'translate-x-6' : 'translate-x-1'
                            }`}
                        />
                    </button>
                </div>
            </div>

            {/* Validation and Preview */}
            {qaQuestion && qaAnswer ? (
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200/50 dark:border-green-700/50">
                    <div className="flex items-start space-x-2">
                        <span className="text-green-600 dark:text-green-400 text-lg flex-shrink-0">✅</span>
                        <div>
                            <p className="font-semibold text-green-800 dark:text-green-200 text-sm sm:text-base">
                                Q&A Challenge Ready!
                            </p>
                            <p className="text-xs sm:text-sm text-green-600 dark:text-green-400 mt-1">
                                They'll get {qaMaxAttempts} attempt{qaMaxAttempts > 1 ? 's' : ''} to answer: "{qaQuestion.length > 50 ? qaQuestion.substring(0, 50) + '...' : qaQuestion}"
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200/50 dark:border-yellow-700/50">
                    <div className="flex items-start space-x-2">
                        <span className="text-yellow-600 dark:text-yellow-400 text-lg flex-shrink-0">⚠️</span>
                        <div>
                            <p className="font-semibold text-yellow-800 dark:text-yellow-200 text-sm sm:text-base">
                                Question & Answer Required
                            </p>
                            <p className="text-xs sm:text-sm text-yellow-600 dark:text-yellow-400 mt-1">
                                Please fill in both the question and correct answer to enable Q&A mode.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
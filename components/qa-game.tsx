"use client";

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Watermark } from '@/components/watermark';
import { CheckCircle, XCircle, Eye, EyeOff, HelpCircle } from 'lucide-react';

interface QAGameProps {
    imageUrl: string;
    question: string;
    correctAnswer: string;
    onImageReady: () => void;
    onAnswerCorrect: () => void;
    // Existing props for consistency
    recipientName?: string | undefined;
    receiverIp?: string | null | undefined;
    withWatermark?: boolean | undefined;
    message?: string | undefined;
    expandedMessages?: {[key: string]: boolean};
    onToggleMessage?: (messageId: string) => void;
    // Game settings
    maxAttempts?: number; // Default 3
    caseSensitive?: boolean; // Default false
    showHints?: boolean; // Default true
    timerComponent?: React.ReactNode;
}

// Helper function to truncate message
const truncateMessage = (message: string, maxLength: number = 100) => {
    if (message.length <= maxLength) return message;
    return message.substring(0, maxLength) + '...';
};

// Helper function to normalize answers for comparison
const normalizeAnswer = (answer: string, caseSensitive: boolean = false) => {
    let normalized = answer.trim();
    if (!caseSensitive) {
        normalized = normalized.toLowerCase();
    }
    return normalized;
};

export function QAGame({
    imageUrl,
    question,
    correctAnswer,
    onImageReady,
    onAnswerCorrect,
    recipientName,
    receiverIp,
    withWatermark,
    message,
    expandedMessages = {},
    onToggleMessage,
    maxAttempts = 3,
    caseSensitive = false,
    showHints = true,
    timerComponent
}: QAGameProps) {
    const [userAnswer, setUserAnswer] = useState('');
    const [attempts, setAttempts] = useState(0);
    const [isCorrect, setIsCorrect] = useState(false);
    const [showAnswer, setShowAnswer] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [showHint, setShowHint] = useState(false);
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
    const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    // Handle image load
    const handleImageLoad = () => {
        setIsImageLoaded(true);
        onImageReady();
    };

    // Generate hint (first and last letter + length)
    const generateHint = (answer: string) => {
        if (answer.length <= 2) return `${answer.length} letter${answer.length > 1 ? 's' : ''}`;
        const first = answer[0];
        const last = answer[answer.length - 1];
        const middle = '_'.repeat(answer.length - 2);
        return `${first}${middle}${last} (${answer.length} letters)`;
    };

    // Handle answer submission
    const handleSubmitAnswer = () => {
        if (!userAnswer.trim()) return;

        const normalizedUserAnswer = normalizeAnswer(userAnswer, caseSensitive);
        const normalizedCorrectAnswer = normalizeAnswer(correctAnswer, caseSensitive);

        if (normalizedUserAnswer === normalizedCorrectAnswer) {
            setIsCorrect(true);
            setFeedback('correct');
            setShowSuccessOverlay(true);
            onAnswerCorrect();
            
            // Hide success overlay after 1 second
            setTimeout(() => setShowSuccessOverlay(false), 1000);
            setTimeout(() => setFeedback(null), 2000);
        } else {
            const newAttempts = attempts + 1;
            setAttempts(newAttempts);
            setFeedback('incorrect');
            
            if (newAttempts >= maxAttempts) {
                setGameOver(true);
                setShowAnswer(true);
            }
            
            setTimeout(() => setFeedback(null), 2000);
        }
        
        setUserAnswer('');
    };

    // Handle Enter key
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSubmitAnswer();
        }
    };

    // Auto-focus input
    useEffect(() => {
        if (inputRef.current && !isCorrect && !gameOver) {
            inputRef.current.focus();
        }
    }, [isCorrect, gameOver]);

    return (
        <div className="relative w-full max-w-full sm:max-w-lg mx-auto">
            {/* Game Status Bar - Slimmer */}
            <div className="mb-3 px-3 py-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <HelpCircle className="w-3.5 h-3.5 text-blue-500" />
                        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Q&A Challenge</span>
                    </div>
                    <div className="flex items-center space-x-3">
                        {/* Status Message */}
                        {isCorrect && (
                            <div className="flex items-center space-x-1.5 text-green-600 dark:text-green-400">
                                <CheckCircle className="w-3.5 h-3.5" />
                                <span className="text-xs font-medium">Correct!</span>
                            </div>
                        )}
                        {gameOver && !isCorrect && (
                            <div className="flex items-center space-x-1.5 text-red-600 dark:text-red-400">
                                <XCircle className="w-3.5 h-3.5" />
                                <span className="text-xs font-medium">Game Over</span>
                            </div>
                        )}
                        
                        {/* Attempts Counter */}
                        <div className="flex items-center space-x-1.5 text-xs text-gray-500 dark:text-gray-400">
                            <span>{attempts}/{maxAttempts}</span>
                            {!isCorrect && (
                                <div className="flex space-x-0.5">
                                    {Array.from({ length: maxAttempts - attempts }).map((_, i) => (
                                        <div key={i} className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                                    ))}
                                    {Array.from({ length: attempts }).map((_, i) => (
                                        <div key={i} className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Question and Answer Section - Slimmer */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg px-4 py-3 border border-purple-200/50 dark:border-purple-700/50 shadow-lg mb-3">
                {/* Question - More compact */}
                <div className="mb-3">
                    <div className="flex items-center mb-1.5">
                        <span className="text-base mr-1.5">🤔</span>
                        <h3 className="font-semibold text-sm text-gray-800 dark:text-gray-200">Question:</h3>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 bg-white/50 dark:bg-gray-800/50 px-3 py-2 rounded-md border border-gray-200/50 dark:border-gray-600/50">
                        {question}
                    </p>
                </div>

                {/* Answer Input Section - Compact */}
                {!isCorrect && !gameOver && (
                    <div className="space-y-2">
                        <div className="flex space-x-2">
                            <Input
                                ref={inputRef}
                                type="text"
                                placeholder="Type your answer..."
                                value={userAnswer}
                                onChange={(e) => setUserAnswer(e.target.value)}
                                onKeyPress={handleKeyPress}
                                className={`flex-1 h-9 text-sm ${
                                    feedback === 'incorrect' 
                                        ? 'border-red-500 ring-red-200' 
                                        : feedback === 'correct'
                                        ? 'border-green-500 ring-green-200'
                                        : ''
                                }`}
                                disabled={isCorrect || gameOver}
                            />
                            <Button 
                                onClick={handleSubmitAnswer}
                                disabled={!userAnswer.trim() || isCorrect || gameOver}
                                size="sm"
                                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 h-9 px-4 text-sm"
                            >
                                Submit
                            </Button>
                        </div>

                        {/* Hint and Feedback in one row */}
                        <div className="flex items-center justify-between">
                            {/* Hint Section */}
                            {showHints && attempts > 0 && (
                                <div className="flex items-center space-x-2">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setShowHint(!showHint)}
                                        className="text-purple-600 hover:text-purple-700 dark:text-purple-400 h-6 px-2 text-xs"
                                    >
                                        💡 {showHint ? 'Hide' : 'Hint'}
                                    </Button>
                                    {showHint && (
                                        <span className="text-xs text-gray-600 dark:text-gray-400 font-mono bg-yellow-100 dark:bg-yellow-900/30 px-1.5 py-0.5 rounded">
                                            {generateHint(correctAnswer)}
                                        </span>
                                    )}
                                </div>
                            )}

                            {/* Feedback Messages */}
                            {feedback === 'incorrect' && (
                                <div className="flex items-center space-x-1.5 text-red-600 dark:text-red-400 text-xs">
                                    <XCircle className="w-3.5 h-3.5" />
                                    <span>
                                        {maxAttempts - attempts} left
                                    </span>
                                </div>
                            )}
                            {feedback === 'correct' && (
                                <div className="flex items-center space-x-1.5 text-green-600 dark:text-green-400 text-xs">
                                    <CheckCircle className="w-3.5 h-3.5" />
                                    <span>Perfect! 🎉</span>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Show Answer - Compact */}
                {(gameOver || isCorrect) && (
                    <div className="mt-2 px-3 py-2 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-md border border-green-200/50 dark:border-green-700/50">
                        <div className="flex items-center space-x-2">
                            <span className="text-xs font-medium text-green-800 dark:text-green-300">
                                {isCorrect ? '✅' : '💡'}
                            </span>
                            <span className="font-semibold text-sm text-green-900 dark:text-green-200">{correctAnswer}</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Image Container */}
            <div className="relative w-full h-[80vh] sm:max-h-96 rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-700 shadow-xl mb-4">
                <Image
                    src={imageUrl}
                    alt="Secret Image"
                    fill
                    style={{ objectFit: 'contain' }}
                    onLoad={handleImageLoad}
                    priority
                    className={`rounded-xl transition-all duration-1000 ${
                        isCorrect
                            ? 'blur-0 brightness-100' 
                            : 'blur-md brightness-75 grayscale'
                    }`}
                />
                
                {/* Watermark */}
                {withWatermark &&  (
                    <div className={`absolute inset-0 pointer-events-none overflow-hidden rounded-xl z-10 transition-all duration-1000 ${
                        isCorrect 
                            ? 'blur-0' 
                            : 'blur-md'
                    }`}>
                        <Watermark
                            name={recipientName}
                            ip={receiverIp || undefined}
                            mode="image"
                        />
                    </div>
                )}

                {/* Timer Component - HIGHEST Z-INDEX to ensure it and its overlays are always visible */}
                {timerComponent && (
                    <div className="absolute top-2 right-2 z-[100]">
                        {timerComponent}
                    </div>
                )}

                {/* Critical Time Warning Overlay - covers entire image when timer is critical */}
                {timerComponent && (
                    <div className="absolute inset-0 pointer-events-none z-[90] rounded-xl overflow-hidden">
                        <div id="critical-time-overlay" className="absolute inset-0 bg-red-500/10 opacity-0 transition-opacity duration-300" />
                    </div>
                )}

                {/* Overlay for locked state */}
                {!isCorrect && !gameOver && (
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-20 rounded-xl">
                        <div className="text-center text-white p-4">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <EyeOff className="w-8 h-8" />
                            </div>
                            {gameOver ? (
                                <>
                                    <h3 className="font-bold text-lg mb-2">Better Luck Next Time! 😔</h3>
                                    <p className="text-sm opacity-90">You&apos;ve used all your attempts. The image remains hidden.</p>
                                </>
                            ) : (
                                <>
                                    <h3 className="font-bold text-lg mb-2">Answer to Reveal!</h3>
                                    <p className="text-sm opacity-90">Get the answer right to see the secret image</p>
                                </>
                            )}
                        </div>
                    </div>
                )}

                {/* Success overlay - LOWER Z-INDEX so timer overlays are still visible */}
                {showSuccessOverlay && (
                    <div className="absolute inset-0 bg-green-500/20 backdrop-blur-sm flex items-center justify-center z-25 rounded-xl animate-pulse">
                        <div className="text-center text-white p-4">
                            <div className="w-16 h-16 bg-green-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Eye className="w-8 h-8" />
                            </div>
                            <h3 className="font-bold text-lg mb-2">Revealed! 🎉</h3>
                        </div>
                    </div>
                )}
            </div>

            {/* Message Section */}
            {message && isCorrect && (
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-4 sm:p-6 border border-blue-200/50 dark:border-blue-700/50 shadow-lg">
                    <blockquote className="text-sm sm:text-base font-medium text-gray-800 dark:text-gray-200 text-center leading-relaxed">
                        &ldquo;{expandedMessages['qa'] || message.length <= 100
                            ? message
                            : truncateMessage(message)
                        }&rdquo;
                    </blockquote>
                    {message.length > 100 && onToggleMessage && (
                        <button
                            onClick={() => onToggleMessage('qa')}
                            className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 text-xs sm:text-sm font-medium mt-3 block mx-auto transition-colors"
                        >
                            {expandedMessages['qa'] ? 'Read less' : 'Read more'}
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
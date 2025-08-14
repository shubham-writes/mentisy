// reveal-rush-game.tsx - Updated with compact design and question section above image

"use client";

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Watermark } from '@/components/watermark';
import { Trophy, Users, Eye, EyeOff, AlertCircle, Clock, XCircle, Zap } from 'lucide-react';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Doc } from '@/convex/_generated/dataModel';

interface MicroQuestGameProps {
    secret: Doc<"secrets">;
    onImageReady: () => void;
    receiverIp?: string | null;
    timerComponent?: React.ReactNode;
}

export function MicroQuestGame({ 
    secret: initialSecret, 
    onImageReady, 
    receiverIp,
    timerComponent
}: MicroQuestGameProps) {
    const liveSecret = useQuery(api.secrets.getLiveSecret, { id: initialSecret._id });
    const secret = liveSecret || initialSecret;

    const {
        _id,
        fileUrl,
        microQuestType,
        mqGroupQuestion,
        mqRateCategory,
        mqIsCompleted,
        mqWinnerId,
        mqParticipants,
        withWatermark,
        recipientName,
        message,
    } = secret;

    const [userInput, setUserInput] = useState('');
    const [selectedRating, setSelectedRating] = useState<number | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [localError, setLocalError] = useState<string | null>(null);
    const [hasSubmittedLocally, setHasSubmittedLocally] = useState(false);
    const [isLocalWinner, setIsLocalWinner] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const submitAttempt = useMutation(api.secrets.submitMicroQuestAttempt);
    const identity = useQuery(api.users.getMyIdentity);
    
    const currentQuestState = {
        isCompleted: mqIsCompleted || false,
        winnerId: mqWinnerId,
        participants: mqParticipants || [],
    };
    
    const hasUserSubmitted = !!identity && currentQuestState.participants.some(p => p.userId === identity?._id);
    const isLoggedInWinner = !!identity && currentQuestState.winnerId === identity?._id;
    const isWinner = isLoggedInWinner || isLocalWinner;
    
    const handleImageLoad = () => onImageReady();

    const handleSubmit = async () => {
        if (isSubmitting || hasSubmittedLocally || hasUserSubmitted) return;

        let attempt: string | number = '';
        if (microQuestType === 'group_qa') {
            if (!userInput.trim()) { setLocalError("Answer cannot be empty."); return; }
            attempt = userInput.trim();
        } else if (microQuestType === 'rate_my') {
            if (selectedRating === null) { setLocalError("Please select a rating."); return; }
            attempt = selectedRating;
        }

        setIsSubmitting(true);
        setLocalError(null);
        
        try {
            const result = await submitAttempt({ secretId: _id, attempt });
            
            if (result.success) {
                setHasSubmittedLocally(true);
                if (result.isWinner) {
                    setIsLocalWinner(true);
                }
                setUserInput('');
                setSelectedRating(null);
            } else {
                setLocalError(result.reason || "Submission failed.");
            }
        } catch (error) {
            console.error("Failed to submit quest attempt:", error);
            setLocalError("An error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !isSubmitting) {
            e.preventDefault();
            handleSubmit();
        }
    };
    
    const getQuestInfo = () => {
        switch (microQuestType) {
            case 'group_qa': return { 
                title: 'Group Q&A', 
                prompt: mqGroupQuestion,
                icon: '🤔'
            };
            case 'rate_my': return { 
                title: 'Rate My...', 
                prompt: `Rate my ${mqRateCategory || 'vibe'}`,
                icon: '⭐'
            };
            default: return { 
                title: 'Challenge', 
                prompt: 'Complete the challenge!',
                icon: '🎯'
            };
        }
    };
    const { title, prompt, icon } = getQuestInfo();

    const isGameOver = currentQuestState.isCompleted;
    const isRevealed = isWinner;

    useEffect(() => {
        if (currentQuestState.isCompleted) {
            setLocalError(null);
        }
    }, [currentQuestState.isCompleted]);

    return (
        <div className="relative w-full max-w-full sm:max-w-lg mx-auto">
            {/* Game Status Bar - Compact */}
            <div className="mb-3 px-3 py-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Zap className="w-3.5 h-3.5 text-orange-500" />
                        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Reveal Rush</span>
                    </div>
                    <div className="flex items-center space-x-3">
                        {/* Status Message */}
                        {isWinner && (
                            <div className="flex items-center space-x-1.5 text-green-600 dark:text-green-400">
                                <Trophy className="w-3.5 h-3.5" />
                                <span className="text-xs font-medium">Winner!</span>
                            </div>
                        )}
                        {isGameOver && !isWinner && (
                            <div className="flex items-center space-x-1.5 text-red-600 dark:text-red-400">
                                <XCircle className="w-3.5 h-3.5" />
                                <span className="text-xs font-medium">Game Over</span>
                            </div>
                        )}
                        {(hasSubmittedLocally || hasUserSubmitted) && !isGameOver && (
                            <div className="flex items-center space-x-1.5 text-blue-600 dark:text-blue-400">
                                <Clock className="w-3.5 h-3.5" />
                                <span className="text-xs font-medium">Submitted</span>
                            </div>
                        )}
                        
                        {/* Participants Counter */}
                        <div className="flex items-center space-x-1.5 text-xs text-gray-500 dark:text-gray-400">
                            <Users className="w-3 h-3" />
                            <span>{currentQuestState.participants.length}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Question and Input Section - Compact and Above Image */}
            <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg px-4 py-3 border border-orange-200/50 dark:border-orange-700/50 shadow-lg mb-3">
                {/* Question - Compact */}
                <div className="mb-3">
                    <div className="flex items-center mb-1.5">
                        <span className="text-base mr-1.5">{icon}</span>
                        <h3 className="font-semibold text-sm text-gray-800 dark:text-gray-200">{title}:</h3>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 bg-white/50 dark:bg-gray-800/50 px-3 py-2 rounded-md border border-gray-200/50 dark:border-gray-600/50">
                        {prompt}
                    </p>
                </div>

                {/* Input Section - Only show if game is active and user hasn't won */}
                {!isGameOver && !isWinner && (
                    <div className="space-y-2">
                        {/* Text Input for Q&A */}
                        {microQuestType === 'group_qa' && (
                            <div className="flex space-x-2">
                                <Input
                                    ref={inputRef}
                                    type="text"
                                    placeholder="Your answer..."
                                    value={userInput}
                                    onChange={(e) => setUserInput(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    className="flex-1 h-9 text-sm"
                                    disabled={isSubmitting || hasUserSubmitted}
                                />
                                <Button 
                                    onClick={handleSubmit}
                                    disabled={isSubmitting || hasUserSubmitted || !userInput.trim()}
                                    size="sm"
                                    className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 h-9 px-4 text-sm"
                                >
                                    {isSubmitting ? (
                                        <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    ) : (
                                        'Submit'
                                    )}
                                </Button>
                            </div>
                        )}

                        {/* Rating Input */}
                        {microQuestType === 'rate_my' && (
                            <>
                                <div className="flex items-center justify-center gap-1 mb-2">
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(r => (
                                            <button 
                                                key={r}
                                                onClick={() => setSelectedRating(r)}
                                                onMouseEnter={() => !isSubmitting && !hasUserSubmitted && setSelectedRating(r)}
                                                className={`w-6 h-6 text-lg transition-all duration-200 hover:scale-110 ${
                                                    selectedRating && r <= selectedRating
                                                        ? 'text-yellow-400' 
                                                        : 'text-gray-300 dark:text-gray-600 hover:text-yellow-300'
                                                }`}
                                                disabled={isSubmitting || hasUserSubmitted}
                                                title={`Rate ${r}/10`}
                                            >
                                                ⭐
                                            </button>
                                        ))}
                                    </div>
                                    {selectedRating && (
                                        <div className="ml-3 flex items-center">
                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 bg-white/50 dark:bg-gray-800/50 px-2 py-1 rounded-md border">
                                                {selectedRating}/10
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <Button 
                                    onClick={handleSubmit}
                                    disabled={isSubmitting || hasUserSubmitted || selectedRating === null}
                                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 h-9 text-sm"
                                >
                                    {isSubmitting ? (
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            Submitting...
                                        </div>
                                    ) : (
                                        '🚀 Submit Rating'
                                    )}
                                </Button>
                            </>
                        )}

                        {/* Error Message */}
                        {localError && (
                            <div className="flex items-center space-x-1.5 text-red-600 dark:text-red-400 text-xs">
                                <AlertCircle className="w-3.5 h-3.5" />
                                <span>{localError}</span>
                            </div>
                        )}
                    </div>
                )}

                {/* Status Messages for completed states */}
                {(isGameOver || isWinner || hasSubmittedLocally || hasUserSubmitted) && (
                    <div className="mt-2 px-3 py-2 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-md border border-green-200/50 dark:border-green-700/50">
                        <div className="flex items-center space-x-2">
                            <span className="text-xs font-medium text-green-800 dark:text-green-300">
                                {isWinner ? '🏆' : isGameOver ? '⌛' : '⳰'}
                            </span>
                            <span className="font-semibold text-sm text-green-900 dark:text-green-200">
                                {isWinner ? 'You won! 🎉' : 
                                 isGameOver ? 'Someone else won this round' : 
                                 'Your attempt is submitted! Waiting for results...'}
                            </span>
                        </div>
                    </div>
                )}
            </div>

            {/* Image Container */}
            <div className="relative w-full h-[80vh] sm:max-h-96 rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-700 shadow-xl mb-4">
                <Image 
                    src={fileUrl!} 
                    alt="Secret Image" 
                    fill 
                    style={{ objectFit: 'contain' }} 
                    onLoad={handleImageLoad} 
                    priority 
                    className={`rounded-xl transition-all duration-1000 ${
                        isRevealed ? 'blur-0 brightness-100' : 'blur-md brightness-75 grayscale'
                    }`} 
                />
                
                {/* Watermark */}
                {withWatermark && isRevealed && (
                    <div className={`absolute inset-0 pointer-events-none overflow-hidden rounded-xl z-10 transition-all duration-1000 ${
                        isRevealed ? 'blur-0' : 'blur-md'
                    }`}>
                        <Watermark 
                        name={recipientName} 
                        ip={receiverIp || undefined} 
                        mode="image"
                        />
                    </div>
                )}
                
                {/* Timer Component - HIGHEST Z-INDEX */}
                {timerComponent && (
                    <div className="absolute top-2 right-2 z-[100]">
                        {timerComponent}
                    </div>
                )}

                {/* Critical Time Warning Overlay */}
                {timerComponent && (
                    <div className="absolute inset-0 pointer-events-none z-[90] rounded-xl overflow-hidden">
                        <div id="critical-time-overlay" className="absolute inset-0 bg-red-500/10 opacity-0 transition-opacity duration-300" />
                    </div>
                )}
                
                {/* Overlay for locked state */}
                {!isRevealed && (
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-20 rounded-xl">
                        <div className="text-center text-white p-4">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <EyeOff className="w-8 h-8" />
                            </div>
                            {isGameOver ? (
                                <>
                                    <h3 className="font-bold text-lg mb-2">Better Luck Next Time! 😔</h3>
                                    <p className="text-sm opacity-90">Someone else won this round. The image remains hidden.</p>
                                </>
                            ) : (
                                <>
                                    <h3 className="font-bold text-lg mb-2">Complete the Quest!</h3>
                                    <p className="text-sm opacity-90">First correct answer wins and reveals the image</p>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Message Section - Only show when revealed */}
            {message && isRevealed && (
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-4 sm:p-6 border border-blue-200/50 dark:border-blue-700/50 shadow-lg">
                    <blockquote className="text-sm sm:text-base font-medium text-gray-800 dark:text-gray-200 text-center leading-relaxed">
                        &ldquo;{message}&rdquo;
                    </blockquote>
                </div>
            )}
        </div>
    );
}
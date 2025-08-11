// reveal-rush-game.tsx

"use client";

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Watermark } from '@/components/watermark';
import { Trophy, Users, Eye, EyeOff, AlertCircle, Clock, XCircle } from 'lucide-react';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Doc } from '@/convex/_generated/dataModel';

interface MicroQuestGameProps {
    secret: Doc<"secrets">;
    onImageReady: () => void;
    receiverIp?: string | null;
}

export function MicroQuestGame({ secret: initialSecret, onImageReady, receiverIp }: MicroQuestGameProps) {
    const liveSecret = useQuery(api.secrets.getLiveSecret, { id: initialSecret._id });
    const secret = liveSecret || initialSecret;

    const {
        _id,
        fileUrl,
        microQuestType,
        mqGroupQuestion,
        mqRateCategory,
        mqSuggestionPrompt,
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
    // ✅ FIX 1: Add local state to immediately identify the winner in the current session.
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
    
    // ✅ FIX 2: A user is the winner if the DB says so OR if they just won in this session.
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
        } else if (microQuestType === 'game_suggestion') {
            if (userInput.trim().length < 5) { setLocalError("Suggestion must be at least 5 characters."); return; }
            attempt = userInput.trim();
        }

        setIsSubmitting(true);
        setLocalError(null);
        
        try {
            const result = await submitAttempt({ secretId: _id, attempt });
            
            if (result.success) {
                setHasSubmittedLocally(true);
                // ✅ FIX 3: If the mutation result says we won, set local state immediately.
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
            case 'group_qa': return { title: 'Group Q&A', prompt: mqGroupQuestion };
            case 'rate_my': return { title: 'Rate My...', prompt: `Rate my ${mqRateCategory || 'vibe'}` };
            case 'game_suggestion': return { title: 'Suggest a Game', prompt: mqSuggestionPrompt };
            default: return { title: 'Challenge', prompt: 'Complete the challenge!' };
        }
    };
    const { title, prompt } = getQuestInfo();

    const isGameOver = currentQuestState.isCompleted;
    // The image is revealed if the user is the winner.
    const isRevealed = isWinner;

    useEffect(() => {
        if (currentQuestState.isCompleted) {
            setLocalError(null);
        }
    }, [currentQuestState.isCompleted]);

    return (
        <div className="w-full max-w-full sm:max-w-lg mx-auto">
            {/* This status bar will now show the correct message */}
            <div className="mb-4 p-3 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl border border-orange-200/50 dark:border-orange-700/50">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Trophy className="w-4 h-4 text-orange-500" />
                        <span className="text-sm font-medium text-orange-700 dark:text-orange-300">{title}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-orange-600 dark:text-orange-400">
                        <Users className="w-3 h-3" />
                        <span>{currentQuestState.participants.length} logged-in participant{currentQuestState.participants.length !== 1 ? 's' : ''}</span>
                    </div>
                </div>
                <div className={`mt-2 flex items-center space-x-2 text-sm font-medium ${
                    isWinner ? 'text-green-600' : isGameOver ? 'text-red-600' : 'text-blue-600'
                }`}>
                    {isWinner ? (
                        <>
                            <Trophy className="w-4 h-4" />
                            <span>🎉 You won! Image revealed!</span>
                        </>
                    ) : isGameOver ? (
                        <>
                            <XCircle className="w-4 h-4" />
                            <span>Someone has won! Better luck next time.</span>
                        </>
                    ) : hasSubmittedLocally || hasUserSubmitted ? (
                        <>
                            <Clock className="w-4 h-4" />
                            <span>✅ Your attempt is in! Waiting for results...</span>
                        </>
                    ) : (
                        <>
                            <Eye className="w-4 h-4" />
                            <span>🏃‍♀️ First to win sees the secret!</span>
                        </>
                    )}
                </div>
            </div>

            {/* This image will now unblur correctly for the winner */}
            <div className="relative w-full h-[80vh] sm:max-h-96 rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-700 shadow-xl mb-4">
                <Image 
                    src={fileUrl!} 
                    alt="Secret Image" 
                    fill 
                    style={{ objectFit: 'contain' }} 
                    onLoad={handleImageLoad} 
                    priority 
                    className={`rounded-xl transition-all duration-700 ${
                        isRevealed ? 'blur-0' : 'blur-lg brightness-75'
                    }`} 
                />
                {withWatermark && isRevealed && <Watermark name={recipientName} ip={receiverIp || undefined} />}
                {!isRevealed && (
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-10">
                        <div className="text-center text-white p-4">
                            <EyeOff className="w-8 h-8 mx-auto mb-2" />
                            <h3 className="font-bold text-lg">Complete the Quest</h3>
                            <p className="text-sm opacity-90">First correct answer wins!</p>
                        </div>
                    </div>
                )}
            </div>
            
            {/* Hide the input form if the game is over OR if this user has won */}
            {!isGameOver && !isWinner && (
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl p-4 sm:p-6 border border-purple-200/50 dark:border-purple-700/50">
                    <p className="font-semibold text-gray-800 dark:text-gray-200 mb-3">{prompt}</p>
                    
                    <div className="space-y-3">
                        {microQuestType === 'group_qa' && (
                            <Input 
                                ref={inputRef}
                                type="text" 
                                placeholder="Your answer..." 
                                value={userInput} 
                                onChange={(e) => setUserInput(e.target.value)} 
                                onKeyPress={handleKeyPress} 
                                disabled={isSubmitting}
                                className="h-12 rounded-lg border-2 focus:border-purple-500"
                            />
                        )}
                        
                        {microQuestType === 'game_suggestion' && (
                            <textarea 
                                placeholder="Your brilliant idea..." 
                                value={userInput} 
                                onChange={(e) => setUserInput(e.target.value)} 
                                disabled={isSubmitting} 
                                className="w-full p-3 h-24 rounded-lg border-2 focus:border-purple-500 bg-white/50 dark:bg-gray-800/50 resize-none"
                            />
                        )}
                        
                        {microQuestType === 'rate_my' && (
                            <div className="flex justify-center gap-2 flex-wrap">
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(r => (
                                    <button 
                                        key={r}
                                        onClick={() => setSelectedRating(r)}
                                        className={`w-10 h-10 rounded-lg border-2 font-medium transition-all duration-200 ${
                                            selectedRating === r 
                                                ? 'border-purple-500 bg-purple-500 text-white shadow-lg' 
                                                : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:border-purple-400'
                                        }`}
                                        disabled={isSubmitting}
                                    >
                                        {r}
                                    </button>
                                ))}
                            </div>
                        )}
                        
                        <Button 
                            onClick={handleSubmit} 
                            disabled={isSubmitting || hasUserSubmitted} 
                            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 h-12 rounded-lg font-medium"
                        >
                            {isSubmitting ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Submitting...
                                </div>
                            ) : (
                                '🚀 Submit Attempt'
                            )}
                        </Button>
                        
                        {localError && (
                            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                                <p className="text-red-600 dark:text-red-400 text-sm flex items-center gap-2">
                                    <AlertCircle className="w-4 h-4 flex-shrink-0"/>
                                    {localError}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {message && isRevealed && (
                <div className="mt-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-4 sm:p-6 border border-blue-200/50 dark:border-blue-700/50">
                    <div className="text-center mb-3">
                        <span className="text-xl sm:text-2xl">💌</span>
                    </div>
                    <blockquote className="text-center font-medium text-gray-800 dark:text-gray-200">
                        &ldquo;{message}&rdquo;
                    </blockquote>
                </div>
            )}
        </div>
    );
}
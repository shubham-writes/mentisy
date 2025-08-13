"use client";

import { useState, useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useSignIn, useSignUp } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { FilePreview } from "./file-preview";

// Import our new components
import { PersonalizedHeader } from "./personalized-header";
import { UseCaseTips } from "./use-case-tips";
import { useCaseTemplates } from "./use-case-templates";

import { SignupModal } from "./formComponents/signup-modal";
import { FileUploadArea } from "./formComponents/file-upload-area";
import { FormFields } from "./formComponents/form-fields";
import { TimerSettings } from "./formComponents/timer-settings";
import { WatermarkSettings } from "./formComponents/watermark-settings";
import { LandingPageNotice } from "./formComponents/landing-page-notice";
import { GeneratedLinkDisplay } from "./formComponents/generated-link-display";
import { GameModeSelector } from "./formComponents/game-mode-selector";
import { QAFormFields } from "./qa-form-fields";
import { MicroQuestFormFields } from "./reveal-rush-form-fields";

// Updated GameMode type to match backend expectations
type GameMode = "none" | "scratch_and_see" | "qa_challenge" | "reveal_rush";
type MicroQuestType = "group_qa" | "rate_my" | "game_suggestion";

interface SecretFormProps {
    isLandingPage?: boolean;
    useCase?: string;
}

export function SecretForm({ isLandingPage = false, useCase }: SecretFormProps) {
    console.log("SecretForm rendered with:", { isLandingPage, useCase });
    
    const [message, setMessage] = useState("");
    const [recipientName, setRecipientName] = useState("");
    const [publicNote, setPublicNote] = useState("");
    const [generatedLink, setGeneratedLink] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [uploadedFile, setUploadedFile] = useState<{ url: string; type: "image" | "video" } | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [addWatermark, setAddWatermark] = useState(true);
    const [duration, setDuration] = useState("10");
    const [showSignupPrompt, setShowSignupPrompt] = useState(false);
    const [showTips, setShowTips] = useState(false);
    const [templateApplied, setTemplateApplied] = useState(false);
    
    // Game mode state
    const [gameMode, setGameMode] = useState<GameMode>("none");
    
    // QA Game state
    const [qaQuestion, setQaQuestion] = useState("");
    const [qaAnswer, setQaAnswer] = useState("");
    const [qaMaxAttempts, setQaMaxAttempts] = useState(3);
    const [qaCaseSensitive, setQaCaseSensitive] = useState(false);
    const [qaShowHints, setQaShowHints] = useState(true);
    
    const [microQuestType, setMicroQuestType] = useState<MicroQuestType>("group_qa");
    const [mqGroupQuestion, setMqGroupQuestion] = useState("");
    const [mqGroupAnswer, setMqGroupAnswer] = useState("");
    const [mqRateCategory, setMqRateCategory] = useState("");
    const [mqExpectedRating, setMqExpectedRating] = useState(0); // Use 0 as initial state for "not set"
    const [mqSuggestionPrompt, setMqSuggestionPrompt] = useState("");

    const createSecret = useMutation(api.secrets.create);
    const { signIn } = useSignIn();
    const { signUp } = useSignUp();

    // Clear generated link when user starts creating a new secret
    const clearGeneratedLink = () => {
        if (generatedLink) {
            setGeneratedLink("");
        }
    };

    // Pre-fill form with use case template - FIRST PRIORITY
    useEffect(() => {
        console.log("Template useEffect triggered with useCase:", useCase);
        
        if (useCase && useCaseTemplates[useCase as keyof typeof useCaseTemplates] && !templateApplied) {
            const template = useCaseTemplates[useCase as keyof typeof useCaseTemplates];
            
            console.log("Applying template:", template);
            
            // Clear any existing generated link when applying template
            clearGeneratedLink();
            
            // Always apply template when use case is provided
            setRecipientName(template.recipientName);
            setPublicNote(template.publicNote);
            setMessage(template.message);
            setDuration(template.duration);
            setAddWatermark(template.addWatermark);
            setTemplateApplied(true);
            
            // Show tips for the use case
            setShowTips(true);
            
            console.log("Template applied successfully");
        }
    }, [useCase, templateApplied, generatedLink]);

    // Restore form data from localStorage ONLY if no use case
    useEffect(() => {
        console.log("LocalStorage useEffect triggered:", { isLandingPage, useCase, templateApplied });
        
        if (!isLandingPage && !useCase && !templateApplied) {
            const savedData = localStorage.getItem('secretFormData');
            if (savedData) {
                console.log("Restoring from localStorage:", savedData);
                
                // Clear any existing generated link when restoring form data
                clearGeneratedLink();
                
                const data = JSON.parse(savedData);
                setMessage(data.message || "");
                setRecipientName(data.recipientName || "");
                setPublicNote(data.publicNote || "");
                setAddWatermark(data.addWatermark ?? true);
                setDuration(data.duration || "10");
                setUploadedFile(data.uploadedFile || null);
                setGameMode(data.gameMode || "none");
                
                // Restore QA fields
                setQaQuestion(data.qaQuestion || "");
                setQaAnswer(data.qaAnswer || "");
                setQaMaxAttempts(data.qaMaxAttempts || 3);
                setQaCaseSensitive(data.qaCaseSensitive || false);
                setQaShowHints(data.qaShowHints ?? true);
                
                // Clear the saved data after restoring
                localStorage.removeItem('secretFormData');
            }
        }
        // If there's a use case, clear any saved data without restoring it
        else if (!isLandingPage && useCase) {
            console.log("Clearing localStorage due to useCase");
            localStorage.removeItem('secretFormData');
        }
    }, [isLandingPage, useCase, templateApplied, generatedLink]);

    const saveFormData = () => {
        const formData = {
            message,
            recipientName,
            publicNote,
            addWatermark,
            duration,
            uploadedFile,
            gameMode,
            // Save QA fields
            qaQuestion,
            qaAnswer,
            qaMaxAttempts,
            qaCaseSensitive,
            qaShowHints,
        };
        localStorage.setItem('secretFormData', JSON.stringify(formData));
    };

    const handleGenerate = async (e?: React.MouseEvent) => {
    // Prevent any default behavior that might cause scrolling
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }

    if (!message && !uploadedFile) {
        alert("Please provide a message or upload a file.");
        return;
    }

    // Validate QA fields if QA mode is selected
    if (gameMode === 'qa_challenge' && uploadedFile?.type === 'image') {
        if (!qaQuestion.trim() || !qaAnswer.trim()) {
            alert("Please provide both a question and answer for the Q&A challenge.");
            return;
        }
    }

    // --- FIX 1: VALIDATE MICRO QUEST FIELDS ---
    if (gameMode === 'reveal_rush' && uploadedFile?.type === 'image') {
        if (microQuestType === 'group_qa' && (!mqGroupQuestion.trim() || !mqGroupAnswer.trim())) {
            alert("Please provide a question and answer for the Group Q&A quest.");
            return;
        }
        if (microQuestType === 'rate_my' && (!mqRateCategory.trim() || !mqExpectedRating)) {
            alert("Please provide a category and select your rating for the Rate My... quest.");
            return;
        }
        if (microQuestType === 'game_suggestion' && !mqSuggestionPrompt.trim()) {
            alert("Please provide a prompt for the Game Suggestion quest.");
            return;
        }
    }

    if (isLandingPage) {
        // Save form data and show signup prompt
        saveFormData();
        setShowSignupPrompt(true);
        return;
    }

    setIsLoading(true);
    try {
        // Prepare the mutation parameters
        const mutationParams: any = {
            message: message || undefined,
            recipientName,
            publicNote,
            fileUrl: uploadedFile?.url,
            fileType: uploadedFile?.type,
            withWatermark: addWatermark,
            duration: uploadedFile?.type === 'video' ? undefined : parseInt(duration),
        };

        // Only add game mode and related fields for images
        if (uploadedFile?.type === 'image') {
            mutationParams.gameMode = gameMode;
            
            // Add QA fields only if QA mode is selected
            if (gameMode === 'qa_challenge') {
                mutationParams.qaQuestion = qaQuestion;
                mutationParams.qaAnswer = qaAnswer;
                mutationParams.qaMaxAttempts = qaMaxAttempts;
                mutationParams.qaCaseSensitive = qaCaseSensitive;
                mutationParams.qaShowHints = qaShowHints;
            }
            
            // --- FIX 2: ADD MICRO QUEST FIELDS ONLY IF MICRO QUEST MODE IS SELECTED ---
            if (gameMode === 'reveal_rush') {
                mutationParams.microQuestType = microQuestType;
                mutationParams.mqGroupQuestion = mqGroupQuestion;
                mutationParams.mqGroupAnswer = mqGroupAnswer;
                mutationParams.mqRateCategory = mqRateCategory;
                mutationParams.mqExpectedRating = mqExpectedRating;
                mutationParams.mqSuggestionPrompt = mqSuggestionPrompt;
            }
        } else {
            // For videos or no file, always use "none"
            mutationParams.gameMode = "none";
        }

        const publicId = await createSecret(mutationParams);

        if (publicId) {
            const link = `${window.location.origin}/redirect/${publicId}`;
            setGeneratedLink(link);
        }

        // Clear the form for next secret
        setMessage("");
        setUploadedFile(null);
        setGameMode("none");
        setMicroQuestType("group_qa");
        setMqGroupQuestion("");
        setMqGroupAnswer("");
        setMqRateCategory("");
        setMqExpectedRating(0);
        setMqSuggestionPrompt("");
        setQaQuestion("");
        setQaAnswer("");
        setQaMaxAttempts(3);
        setQaCaseSensitive(false);
        setQaShowHints(true);
    } catch (error) {
        console.error(error);
        alert("Failed to create secret message.");
    } finally {
        setIsLoading(false);
    }
};

    // Enhanced form field handlers that clear generated link
    const handleMessageChange = (value: string) => {
        if (value !== message && generatedLink) {
            clearGeneratedLink();
        }
        setMessage(value);
    };

    const handleRecipientNameChange = (value: string) => {
        if (value !== recipientName && generatedLink) {
            clearGeneratedLink();
        }
        setRecipientName(value);
    };

    const handlePublicNoteChange = (value: string) => {
        if (value !== publicNote && generatedLink) {
            clearGeneratedLink();
        }
        setPublicNote(value);
    };

    const handleFileUpload = (file: { url: string; type: "image" | "video" }) => {
        clearGeneratedLink(); // Clear link when new file is uploaded
        setUploadedFile(file);
        setIsUploading(false);
        // Reset game mode if a video is uploaded
        if (file.type === 'video') {
            setGameMode('none');
        }
    };

    const handleFileRemove = () => {
        clearGeneratedLink(); // Clear link when file is removed
        setUploadedFile(null);
        setGameMode('none'); // Reset game mode when file is removed
    };

    // Game mode change handler
    const handleGameModeChange = (newMode: GameMode) => {
        if (generatedLink) {
            clearGeneratedLink();
        }
        setGameMode(newMode);
        
        // Clear QA fields when switching away from QA mode
        if (newMode !== 'qa_challenge') {
            setQaQuestion("");
            setQaAnswer("");
            setQaMaxAttempts(3);
            setQaCaseSensitive(false);
            setQaShowHints(true);
        }
    };

    // QA field change handlers
    const handleQaQuestionChange = (value: string) => {
        if (generatedLink) clearGeneratedLink();
        setQaQuestion(value);
    };

    const handleQaAnswerChange = (value: string) => {
        if (generatedLink) clearGeneratedLink();
        setQaAnswer(value);
    };

    const handleQaMaxAttemptsChange = (value: number) => {
        if (generatedLink) clearGeneratedLink();
        setQaMaxAttempts(value);
    };

    const handleQaCaseSensitiveChange = (value: boolean) => {
        if (generatedLink) clearGeneratedLink();
        setQaCaseSensitive(value);
    };

    const handleQaShowHintsChange = (value: boolean) => {
        if (generatedLink) clearGeneratedLink();
        setQaShowHints(value);
    };


    

    // Upload handlers
    const handleImageUploadComplete = (res: any) => {
        if (res) {
            handleFileUpload({ url: res[0].url, type: "image" });
        }
    };

    const handleVideoUploadComplete = (res: any) => {
        if (res) {
            handleFileUpload({ url: res[0].url, type: "video" });
        }
    };

    const handleUploadError = (error: Error) => {
        alert(`ERROR! ${error.message}`);
        setIsUploading(false);
    };

 const handleMicroQuestTypeChange = (type: MicroQuestType) => {
        setMicroQuestType(type);
    };
    const handleMqGroupQuestionChange = (value: string) => setMqGroupQuestion(value);
    const handleMqGroupAnswerChange = (value: string) => setMqGroupAnswer(value);
    const handleMqRateCategoryChange = (value: string) => setMqRateCategory(value);
    const handleMqExpectedRatingChange = (value: number) => setMqExpectedRating(value);
    const handleMqSuggestionPromptChange = (value: string) => setMqSuggestionPrompt(value);

    

    const isTimerDisabled = uploadedFile?.type === 'video';
    const isGameModeDisabled = uploadedFile?.type === 'video';

    const formData = {
        recipientName,
        publicNote,
        message,
        uploadedFile,
        duration,
        addWatermark,
        gameMode,
        // Include QA fields in form data for signup
        qaQuestion,
        qaAnswer,
        qaMaxAttempts,
        qaCaseSensitive,
        qaShowHints,
    };

    console.log("Current form state:", { recipientName, publicNote, message, useCase, templateApplied, gameMode });

    return (
        <div className="w-full max-w-7xl mx-auto px-2 sm:px-2 md:px-6 lg:px-8">
            <PersonalizedHeader useCase={useCase} isLandingPage={isLandingPage} />

            {/* Use Case Tips - Mobile Optimized */}
            <UseCaseTips 
                useCase={useCase}
                isVisible={showTips}
                onClose={() => setShowTips(false)}
            />

            {/* Main Form Container - Mobile First Responsive */}
            <div className="bg-white/80 dark:bg-gray-900/50 dark:border mb-20 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl border border-white/20 dark:border-gray-800 overflow-hidden">
                <div className="p-2 sm:p-2 md:p-8 lg:p-10">
                    
                    {/* Landing Page Notice */}
                    {isLandingPage && <LandingPageNotice />}

                    {/* Mobile: Single Column Layout, Desktop: Two Column Layout */}
                    <div className="space-y-6 sm:space-y-8 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-12">
                        
                        {/* Mobile: File Upload First (Most Important Action), Desktop: Left Column */}
                        <div className="space-y-4 sm:space-y-6 lg:space-y-8 order-1 lg:order-1">
                            
                            {/* File Upload Area or Preview */}
                            {uploadedFile ? (
                                <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl sm:rounded-2xl p-1 sm:p-6 border border-[#FF75A0]/20 dark:border-[#FF75A0]/30 shadow-lg">
                                    <FilePreview 
                                        file={uploadedFile} 
                                        onRemove={handleFileRemove}
                                        recipientName={recipientName}
                                        showWatermark={addWatermark}
                                    />
                                </div>
                            ) : (
                                <FileUploadArea
                                    isLandingPage={isLandingPage}
                                    isUploading={isUploading}
                                    onSaveFormData={saveFormData}
                                    onShowSignupPrompt={() => setShowSignupPrompt(true)}
                                    onImageUploadBegin={() => setIsUploading(true)}
                                    onImageUploadComplete={handleImageUploadComplete}
                                    onImageUploadError={handleUploadError}
                                    onVideoUploadBegin={() => setIsUploading(true)}
                                    onVideoUploadComplete={handleVideoUploadComplete}
                                    onVideoUploadError={handleUploadError}
                                />
                            )}
                            
                            {/* Game Mode Selector */}
                            <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
                                <GameModeSelector
                                    selectedMode={gameMode}
                                    onModeChange={handleGameModeChange}
                                    isGameModeDisabled={isGameModeDisabled}
                                />
                            </div>

                            {/* QA Form Fields (Conditional) */}
                            {gameMode === 'qa_challenge' && uploadedFile?.type === 'image' && (
                                <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
                                    <QAFormFields
                                        qaQuestion={qaQuestion}
                                        qaAnswer={qaAnswer}
                                        qaMaxAttempts={qaMaxAttempts}
                                        qaCaseSensitive={qaCaseSensitive}
                                        qaShowHints={qaShowHints}
                                        onQuestionChange={handleQaQuestionChange}
                                        onAnswerChange={handleQaAnswerChange}
                                        onMaxAttemptsChange={handleQaMaxAttemptsChange}
                                        onCaseSensitiveChange={handleQaCaseSensitiveChange}
                                        onShowHintsChange={handleQaShowHintsChange}
                                    />
                                </div>
                            )}

                             {gameMode === 'reveal_rush' && uploadedFile?.type === 'image' && (
        <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
            <MicroQuestFormFields
                microQuestType={microQuestType}
                onTypeChange={handleMicroQuestTypeChange}
                mqGroupQuestion={mqGroupQuestion}
                onGroupQuestionChange={handleMqGroupQuestionChange}
                mqGroupAnswer={mqGroupAnswer}
                onGroupAnswerChange={handleMqGroupAnswerChange}
                mqRateCategory={mqRateCategory}
                onRateCategoryChange={handleMqRateCategoryChange}
                mqExpectedRating={mqExpectedRating}
                onExpectedRatingChange={handleMqExpectedRatingChange}
                mqSuggestionPrompt={mqSuggestionPrompt}
                onSuggestionPromptChange={handleMqSuggestionPromptChange}
            />
        </div>
    )}
                        </div>


                        

                        {/* Mobile: Form Fields Second, Desktop: Right Column */}
                        <div className="space-y-4 sm:space-y-6 lg:space-y-8 order-2 lg:order-2">
                            
                            {/* Form Fields - Mobile: Optimized Input Sizes */}
                            <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
                                <FormFields
                                    recipientName={recipientName}
                                    publicNote={publicNote}
                                    message={message}
                                    onRecipientNameChange={handleRecipientNameChange}
                                    onPublicNoteChange={handlePublicNoteChange}
                                    onMessageChange={handleMessageChange}
                                    useCase={useCase}
                                />
                            </div>

                            {/* Timer Settings - Mobile: Touch Optimized */}
                            <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
                                <TimerSettings
                                    duration={duration}
                                    onDurationChange={setDuration}
                                    isTimerDisabled={isTimerDisabled}
                                    gameMode={gameMode}
                                />
                            </div>
                            
                            {/* Watermark Settings */}
                            <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
                                <WatermarkSettings
                                    addWatermark={addWatermark}
                                    onWatermarkChange={setAddWatermark}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Generate Button - Mobile: Fixed Bottom Area, Desktop: Center */}
                    <div className="mt-6 sm:mt-8 lg:mt-12">
                        {/* Mobile: Full width bottom button */}
                        <div className="sm:hidden">
                            <Button 
                                onClick={handleGenerate} 
                                disabled={isLoading || isUploading} 
                                className="w-full h-14 text-base font-bold rounded-xl bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] hover:from-[#e65a85] hover:to-[#e6955a] border-0 shadow-xl transform active:scale-98 transition-all duration-150"
                                size="lg"
                                type="button"
                            >
                                {isUploading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                        Uploading...
                                    </>
                                ) : isLoading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                        Creating...
                                    </>
                                ) : isLandingPage ? (
                                    "🚀 Create Account & Send"
                                ) : (
                                    "✨ Generate Secret Link"
                                )}
                            </Button>
                        </div>
                        
                        {/* Tablet and Desktop: Centered button */}
                        <div className="hidden sm:flex sm:justify-center">
                            <Button 
                                onClick={handleGenerate} 
                                disabled={isLoading || isUploading} 
                                className="w-full max-w-md h-14 sm:h-16 text-base sm:text-lg font-bold rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] hover:from-[#e65a85] hover:to-[#e6955a] border-0 shadow-xl sm:shadow-2xl transform hover:scale-105 active:scale-98 transition-all duration-200"
                                size="lg"
                                type="button"
                            >
                                {isUploading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 sm:h-6 sm:w-6 border-b-2 border-white mr-2 sm:mr-3"></div>
                                        Your moment is uploading...
                                    </>
                                ) : isLoading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 sm:h-6 sm:w-6 border-b-2 border-white mr-2 sm:mr-3"></div>
                                        Creating your secret link...
                                    </>
                                ) : isLandingPage ? (
                                    "🚀 Create Account & Send This Secret"
                                ) : (
                                    "✨ Generate Secret Link"
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Generated Link Section - Mobile: Full Width Card, Desktop: Below Main Container */}
            {!isLandingPage && generatedLink && (
                <div className="mt-4 sm:mt-6 lg:mt-8">
                    <GeneratedLinkDisplay
                        generatedLink={generatedLink}
                        publicNote={publicNote}
                    />
                </div>
            )}

            {/* Signup Modal */}
            <SignupModal
                isVisible={showSignupPrompt}
                onClose={() => setShowSignupPrompt(false)}
                formData={formData}
            />
        </div>
    );
}
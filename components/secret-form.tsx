"use client";

import { useState, useEffect, useCallback } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

import { Button } from "@/components/ui/button";
import { FilePreview } from "./file-preview";

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
import { SmartVideo } from "@/components/smart-video";


import { GameMode, MicroQuestType } from "@/lib/types";

import { useSearchParams, useRouter } from 'next/navigation';
import { uploadFiles } from "./uploadthing"; // <-- Correct import for uploadFiles
import { FeedbackModal } from "@/components/feedback/FeedbackModal";
import { YesNoImageUploaders } from "./formComponents/yes-no-image-uploaders"; // ✅ Import new component
import { YesNoSettings } from "./formComponents/yes-no-settings";

import { track } from '@vercel/analytics/react';
import { useAuth } from "@clerk/nextjs";

import InteractiveGameCard from "./formComponents/InteractiveGameCard";




interface SecretFormProps {
    isLandingPage?: boolean;
    useCase?: string;
}



export function SecretForm({ isLandingPage = false, useCase }: SecretFormProps) {
    // ... (Your existing state declarations are all fine)
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
    const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
    const [gameMode, setGameMode] = useState<GameMode>("pic_swap");
    const [qaQuestion, setQaQuestion] = useState("");
    const [qaAnswer, setQaAnswer] = useState("");
    const [qaMaxAttempts, setQaMaxAttempts] = useState(3);
    const [qaCaseSensitive, setQaCaseSensitive] = useState(false);
    const [qaShowHints, setQaShowHints] = useState(true);
    const [microQuestType, setMicroQuestType] = useState<MicroQuestType>("group_qa");
    const [mqGroupQuestion, setMqGroupQuestion] = useState("");
    const [mqGroupAnswer, setMqGroupAnswer] = useState("");
    const [mqRateCategory, setMqRateCategory] = useState("");
    const [mqExpectedRating, setMqExpectedRating] = useState(0);
    const [mqSuggestionPrompt, setMqSuggestionPrompt] = useState("");
    const [isHydrated, setIsHydrated] = useState(false);
    const [isInstructionsExpanded, setIsInstructionsExpanded] = useState(false);
    const [isMoreSettingsExpanded, setIsMoreSettingsExpanded] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);


    // ✅ Define a type for the image file object
    type ImageFile = { url: string; type: "image" };

    const [yesNoQuestion, setYesNoQuestion] = useState("");
    const [yesFile, setYesFile] = useState<ImageFile | null>(null); // Changed from yesImageUrl
    const [noFile, setNoFile] = useState<ImageFile | null>(null);   // Changed from noImageUrl
    const [hasUserClearedYesFile, setHasUserClearedYesFile] = useState(false);

    const [yesCaption, setYesCaption] = useState("");
    const [noCaption, setNoCaption] = useState("");

    const createSecret = useMutation(api.secrets.create);

    const { isSignedIn } = useAuth();
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        setIsHydrated(true);
    }, []);

    // Auto-collapse More Settings when file is uploaded
    useEffect(() => {
        if (uploadedFile) {
            setIsMoreSettingsExpanded(false);
        }
    }, [uploadedFile]);

    useEffect(() => {
        // When user selects the 'Yes or No' game and the primary file is an image...
        if (gameMode === 'yes_or_no' && uploadedFile && uploadedFile.type === 'image') {
            // ...and if the 'Yes' slot is empty AND the user hasn't manually cleared it...
            if (!yesFile && !hasUserClearedYesFile) { // ✅ UPDATE THIS LINE
                // ...then it's safe to assign the image file to the 'Yes' slot.
                setYesFile(uploadedFile as ImageFile);
            }
        }
    }, [gameMode, uploadedFile, yesFile, hasUserClearedYesFile]);

    // --- FIXED: WRAPPED IN useCallback ---
    const clearGeneratedLink = useCallback(() => {
        if (generatedLink) {
            setGeneratedLink("");
        }
    }, [generatedLink]);



    const handleFileUpload = useCallback((file: { url: string; type: "image" | "video" }) => {
        clearGeneratedLink();
        setUploadedFile(file);
        setHasUserClearedYesFile(false);
        setIsUploading(false);
        if (file.type === 'video') {
            setGameMode('none');
        }
    }, [clearGeneratedLink]);

    //This useEffect handles the PWA (Progressive Web App) Share Target API
    useEffect(() => {
        const handleSharedFile = async () => {
            if (searchParams.get("shared") === "true") {
                console.log("📂 Page loaded from share, handling file...");

                // 🔒 Immediately clean the URL to prevent loops
                const newUrl = new URL(window.location.href);
                newUrl.searchParams.delete("shared");
                router.replace(newUrl.pathname + newUrl.search, { scroll: false });

                const DB_NAME = "MentisyShareDB";
                const STORE_NAME = "shared-files";
                const request = indexedDB.open(DB_NAME, 1);

                request.onsuccess = (event) => {
                    const db = (event.target as IDBOpenDBRequest).result;
                    if (!db.objectStoreNames.contains(STORE_NAME)) return;

                    const tx = db.transaction(STORE_NAME, "readonly");
                    const store = tx.objectStore(STORE_NAME);
                    const getRequest = store.get("shared-file");

                    getRequest.onsuccess = async () => {
                        const sharedItem = getRequest.result;
                        if (sharedItem && sharedItem.file) {
                            setIsUploading(true);

                            let fileForUpload: File;
                            let fileSizeBytes = 0;

                            // Prepare file and get size
                            if (sharedItem.file.data) {
                                const blob = new Blob([sharedItem.file.data], { type: sharedItem.file.type });
                                fileForUpload = new File([blob], sharedItem.file.name || "shared", {
                                    type: sharedItem.file.type,
                                });
                                fileSizeBytes = blob.size;
                            } else if (sharedItem.file instanceof Blob) {
                                const blob = sharedItem.file;
                                fileForUpload = new File([blob], sharedItem.file.name || "shared", { type: blob.type });
                                fileSizeBytes = blob.size;
                            } else {
                                throw new Error("No file bytes found in IndexedDB");
                            }

                            // 🆕 Updated Size-aware progress simulation
                            const simulateProgressBasedOnFileSize = (sizeBytes: number, fileType: string) => {
                                let estimatedUploadTimeMs;
                                let maxProgress;

                                // Check if it's an image type
                                if (fileType === "image") {
                                    estimatedUploadTimeMs = 8000; // Fixed 6 seconds for images
                                    maxProgress = 99; // Reach 99% for images
                                } else {
                                    // For videos or other files, use 7 seconds
                                    estimatedUploadTimeMs = 12000; // Fixed 7 seconds for other files
                                    maxProgress = 98; // Keep 90% for other files
                                }

                                const updateIntervalMs = Math.min(300, estimatedUploadTimeMs / 30);
                                const totalUpdates = Math.floor(estimatedUploadTimeMs / updateIntervalMs);
                                const incrementPerUpdate = maxProgress / totalUpdates;

                                console.log(`📊 File size: ${(sizeBytes / (1024 * 1024)).toFixed(1)}MB`);
                                console.log(`📁 File type: ${fileType}`);
                                console.log(`⏱️ Estimated upload: ${(estimatedUploadTimeMs / 1000).toFixed(1)}s`);
                                console.log(`🎯 Target progress: ${maxProgress}%`);

                                let progress = 0;
                                const interval = setInterval(() => {
                                    progress += incrementPerUpdate + (Math.random() * 2 - 1); // ±1% variation
                                    progress = Math.max(0, Math.min(maxProgress, progress)); // Keep between 0-maxProgress%
                                    setUploadProgress(Math.round(progress));
                                }, updateIntervalMs);

                                return interval;
                            };

                            const progressInterval = simulateProgressBasedOnFileSize(fileSizeBytes, sharedItem.type);

                            try {
                                const endpoint = sharedItem.type === "image" ? "imageUploader" : "videoUploader";
                                const res = await uploadFiles(endpoint, { files: [fileForUpload] });

                                // Complete progress animation
                                clearInterval(progressInterval);
                                setUploadProgress(100);

                                setTimeout(() => {
                                    setUploadProgress(0);
                                }, 1000);

                                if (res && res.length > 0) {
                                    const uploaded = res[0];
                                    const fileUrl = (uploaded as any).ufsUrl || uploaded.url;
                                    handleFileUpload({ url: fileUrl, type: sharedItem.type });
                                } else {
                                    throw new Error("Upload failed to return a valid response.");
                                }
                            } catch (error) {
                                console.error("❌ Upload failed:", error);
                                clearInterval(progressInterval);
                                setUploadProgress(0);
                                alert(`ERROR! ${(error as Error).message}`);
                            } finally {
                                setIsUploading(false);
                            }
                        }
                    };
                };
            }
        };
        handleSharedFile();
    }, [searchParams, router, handleFileUpload]);


    const handleGameFeedbackClick = () => {
        setIsFeedbackModalOpen(true);
    };

    useEffect(() => {
        if (useCase && useCaseTemplates[useCase as keyof typeof useCaseTemplates] && !templateApplied) {
            const template = useCaseTemplates[useCase as keyof typeof useCaseTemplates];
            clearGeneratedLink();
            setRecipientName(template.recipientName);
            setPublicNote(template.publicNote);
            setMessage(template.message);
            setDuration(template.duration);
            setAddWatermark(template.addWatermark);
            setTemplateApplied(true);
            setShowTips(true);
        }
    }, [useCase, templateApplied, clearGeneratedLink]);

    useEffect(() => {
        // Only run this logic if the component has been hydrated on the client
        if (isHydrated && !isLandingPage && !useCase && !templateApplied) {
            const savedData = localStorage.getItem('secretFormData');
            if (savedData) {
                clearGeneratedLink();
                const data = JSON.parse(savedData);
                setMessage(data.message || "");
                setRecipientName(data.recipientName || "");
                setPublicNote(data.publicNote || "");
                setAddWatermark(data.addWatermark ?? true);
                setDuration(data.duration || "10");
                setUploadedFile(data.uploadedFile || null);
                setGameMode(data.gameMode || "none");
                setQaQuestion(data.qaQuestion || "");
                setQaAnswer(data.qaAnswer || "");
                setQaMaxAttempts(data.qaMaxAttempts || 3);
                setQaCaseSensitive(data.qaCaseSensitive || false);
                setQaShowHints(data.qaShowHints ?? true);
                localStorage.removeItem('secretFormData');
            }
        }
        else if (isHydrated && !isLandingPage && useCase) {
            localStorage.removeItem('secretFormData');
        }
    }, [isHydrated, isLandingPage, useCase, templateApplied, clearGeneratedLink]);

    const saveFormData = () => {
        const formData = {
            message, recipientName, publicNote, addWatermark, duration, uploadedFile, gameMode,
            qaQuestion, qaAnswer, qaMaxAttempts, qaCaseSensitive, qaShowHints,
        };
        localStorage.setItem('secretFormData', JSON.stringify(formData));
    };

    const handleGenerate = async (e?: React.MouseEvent) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }

        // --- VALIDATION LOGIC ---
        if (gameMode === 'yes_or_no') {
            // Use yesFile and noFile for validation
            if (!yesNoQuestion.trim() || !yesFile || !noFile) {
                alert("Please provide a question and both a 'Yes' and 'No' image for the game.");
                return;
            }
        } else if (gameMode === 'qa_challenge') {
            if (!uploadedFile || !qaQuestion.trim() || !qaAnswer.trim()) {
                alert("Please upload an image and provide a question and answer for the Q&A challenge.");
                return;
            }
        } else if (gameMode === 'reveal_rush') {
            if (!uploadedFile || (microQuestType === 'group_qa' && (!mqGroupQuestion.trim() || !mqGroupAnswer.trim())) || (microQuestType === 'rate_my' && (!mqRateCategory.trim() || !mqExpectedRating))) {
                alert("Please upload an image and complete the Reveal Rush challenge fields.");
                return;
            }

        } else if (gameMode === 'pic_swap') {
            if (!uploadedFile || uploadedFile.type === 'video') {
                alert("PicSwap requires an image to be uploaded.");
                return;
            }

        } else if (!message && !uploadedFile) {
            alert("Please provide a message or upload a file.");
            return;
        }

        // --- END VALIDATION ---

        setIsLoading(true);
        try {
            const baseParams = {
                message: message || undefined,
                recipientName,
                publicNote,
                withWatermark: addWatermark,
                duration: uploadedFile?.type === "video" ? undefined : parseInt(duration),
            };

            let mutationParams: any;

            if (gameMode === 'yes_or_no') {
                mutationParams = {
                    ...baseParams,
                    gameMode: 'yes_or_no',
                    fileType: 'image',
                    yesNoQuestion: yesNoQuestion,
                    yesImageUrl: yesFile?.url, // Use the url from the yesFile object
                    noImageUrl: noFile?.url,   // Use the url from the noFile object
                    yesCaption: yesCaption,
                    noCaption: noCaption,
                };
            } else {
                mutationParams = {
                    ...baseParams,
                    fileUrl: uploadedFile?.url,
                    fileType: uploadedFile?.type,
                    gameMode: uploadedFile?.type === 'video' ? 'none' : gameMode,
                };
                if (gameMode === 'qa_challenge') {
                    mutationParams.qaQuestion = qaQuestion;
                    mutationParams.qaAnswer = qaAnswer;
                    mutationParams.qaMaxAttempts = qaMaxAttempts;
                    mutationParams.qaCaseSensitive = qaCaseSensitive;
                    mutationParams.qaShowHints = qaShowHints;
                }
                if (gameMode === 'reveal_rush') {
                    mutationParams.microQuestType = microQuestType;
                    mutationParams.mqGroupQuestion = mqGroupQuestion;
                    mutationParams.mqGroupAnswer = mqGroupAnswer;
                    mutationParams.mqRateCategory = mqRateCategory;
                    mutationParams.mqExpectedRating = mqExpectedRating;
                    mutationParams.mqSuggestionPrompt = mqSuggestionPrompt;
                }
            }

            const publicId = await createSecret(mutationParams);

            if (publicId) {
                // Fire the Vercel Analytics event first
                track('Create Fun Link', {
                    gameMode: gameMode,
                    fileType: uploadedFile?.type ?? 'none',
                    isGuest: !isSignedIn
                });

                // NEW: PicSwap logic for guests
                if (gameMode === 'pic_swap' && !isSignedIn) {
                    // 1. Save to localStorage for recovery
                    const history = JSON.parse(localStorage.getItem('mentisyGuestHistory') || '[]');
                    history.push({
                        publicId: publicId,
                        gameMode: 'pic_swap',
                        createdAt: new Date().toISOString()
                    });
                    localStorage.setItem('mentisyGuestHistory', JSON.stringify(history));

                    // 2. Redirect to the new result page
                    router.push(`/swap/result/${publicId}`);
                    setGeneratedLink(""); // Ensure no link is shown on the form

                } else {
                    // EXISTING LOGIC: For logged-in users or other game modes
                    const link = `${window.location.origin}/redirect/${publicId}`;
                    setGeneratedLink(link);
                }
            }

            // Reset all form fields after successful creation
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
            setYesNoQuestion("");
            setYesFile(null);
            setNoFile(null);

        } catch (error) {
            console.error(error);
            alert("Failed to create the fun link.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleMessageChange = (value: string) => {
        if (value !== message) clearGeneratedLink();
        setMessage(value);
    };

    const handleRecipientNameChange = (value: string) => {
        if (value !== recipientName) clearGeneratedLink();
        setRecipientName(value);
    };

    const handlePublicNoteChange = (value: string) => {
        if (value !== publicNote) clearGeneratedLink();
        setPublicNote(value);
    };

    const handleFileRemove = () => {
        clearGeneratedLink();
        setUploadedFile(null);
        setGameMode('none');
    };

    const handleGameModeChange = (newMode: GameMode) => {
        clearGeneratedLink();
        setGameMode(newMode);
        setHasUserClearedYesFile(false);

        if (newMode === 'qa_challenge' || newMode === 'reveal_rush') {
            setDuration("60");
        } else {
            setDuration("10");
        }



        if (newMode !== 'qa_challenge') {
            setQaQuestion(""); setQaAnswer(""); setQaMaxAttempts(3);
            setQaCaseSensitive(false); setQaShowHints(true);
        }
    };

    const handleQaQuestionChange = (value: string) => { clearGeneratedLink(); setQaQuestion(value); };
    const handleQaAnswerChange = (value: string) => { clearGeneratedLink(); setQaAnswer(value); };
    const handleQaMaxAttemptsChange = (value: number) => { clearGeneratedLink(); setQaMaxAttempts(value); };
    const handleQaCaseSensitiveChange = (value: boolean) => { clearGeneratedLink(); setQaCaseSensitive(value); };
    const handleQaShowHintsChange = (value: boolean) => { clearGeneratedLink(); setQaShowHints(value); };

    const handleImageUploadComplete = (res: any) => {
        if (res && res.length > 0) {
            const uploaded = res[0];
            const fileUrl = (uploaded as any).ufsUrl || uploaded.url;
            handleFileUpload({ url: fileUrl, type: "image" });
        }
    };

    const handleVideoUploadComplete = (res: any) => {
        if (res && res.length > 0) {
            const uploaded = res[0];
            const fileUrl = (uploaded as any).ufsUrl || uploaded.url;
            handleFileUpload({ url: fileUrl, type: "video" });
        }
    };

    const handleUploadError = (error: Error) => {
        alert(`ERROR! ${error.message}`);
        setIsUploading(false);
    };

    const handleMicroQuestTypeChange = (type: MicroQuestType) => setMicroQuestType(type);
    const handleMqGroupQuestionChange = (value: string) => setMqGroupQuestion(value);
    const handleMqGroupAnswerChange = (value: string) => setMqGroupAnswer(value);
    const handleMqRateCategoryChange = (value: string) => setMqRateCategory(value);
    const handleMqExpectedRatingChange = (value: number) => setMqExpectedRating(value);
    const handleMqSuggestionPromptChange = (value: string) => setMqSuggestionPrompt(value);

    const isTimerDisabled = uploadedFile?.type === 'video';
    const isGameModeDisabled = gameMode !== 'yes_or_no' && (!uploadedFile || uploadedFile.type === 'video');

    const disableGameModes = gameMode === 'yes_or_no' ? false : !uploadedFile || uploadedFile.type === 'video';


    const formData = {
        recipientName, publicNote, message, uploadedFile, duration, addWatermark, gameMode,
        qaQuestion, qaAnswer, qaMaxAttempts, qaCaseSensitive, qaShowHints,
    };

    return (
        <div className="w-full max-w-7xl mx-auto px-2 sm:px-2 md:px-6 lg:px-8">
            <UseCaseTips
                useCase={useCase}
                isVisible={showTips}
                onClose={() => setShowTips(false)}
            />

            {/* Main Form Container - Mobile First Responsive */}
            <div className="bg-white/80 dark:bg-gray-900/50 dark:border mb-10 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl border border-white/20 dark:border-gray-800 overflow-hidden">
                <div className="p-2 sm:p-2 md:p-8 lg:p-10">

                    {/* Landing Page Notice */}
                    {isLandingPage && <LandingPageNotice />}

                    {/* Mobile: Single Column, Desktop: Balanced Two Columns */}
                    <div className="space-y-6 sm:space-y-8 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-12">

                        {/* LEFT COLUMN - Content & Media Flow */}
                        {/* LEFT COLUMN - Content & Controls */}
                        <div className="space-y-4 sm:space-y-6 order-1">
                            {/* 1. File Upload / Preview Area */}
                            {gameMode !== 'yes_or_no' ? (
                                <>
                                    {uploadedFile ? (
                                        <div className="space-y-3">
                                            <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-[#FF75A0]/20 dark:border-[#FF75A0]/30 shadow-lg">
                                                <FilePreview file={uploadedFile} onRemove={handleFileRemove} recipientName={recipientName} showWatermark={addWatermark} />
                                            </div>
                                            <WatermarkSettings addWatermark={addWatermark} onWatermarkChange={setAddWatermark} />
                                        </div>
                                    ) : (
                                        <FileUploadArea
                                            isLandingPage={isLandingPage}
                                            isUploading={isUploading}
                                            uploadProgress={uploadProgress}
                                            onSaveFormData={saveFormData}
                                            onShowSignupPrompt={() => setShowSignupPrompt(true)}
                                            onImageUploadBegin={() => setIsUploading(true)}
                                            onImageUploadComplete={handleImageUploadComplete}
                                            onImageUploadError={handleUploadError}
                                        />
                                    )}
                                </>
                            ) : (
                                <>
                                    <YesNoImageUploaders
                                        yesFile={yesFile}
                                        noFile={noFile}
                                        onYesImageUpload={(url) => setYesFile({ url, type: 'image' })}
                                        onNoImageUpload={(url) => setNoFile({ url, type: 'image' })}
                                        onYesImageRemove={() => { setYesFile(null); setHasUserClearedYesFile(true); }}
                                        onNoImageRemove={() => setNoFile(null)}
                                        addWatermark={addWatermark}
                                    />
                                    <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
                                        <WatermarkSettings addWatermark={addWatermark} onWatermarkChange={setAddWatermark} />
                                    </div>
                                </>
                            )}

                            {/* 2. Game Mode Specific Settings */}
                            {gameMode === 'yes_or_no' && (
                                <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
                                    <YesNoSettings question={yesNoQuestion} onQuestionChange={setYesNoQuestion} />
                                </div>
                            )}

                            {gameMode === 'qa_challenge' && uploadedFile?.type === 'image' && (
                                <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
                                    <QAFormFields
                                        qaQuestion={qaQuestion}
                                        qaAnswer={qaAnswer}
                                        qaMaxAttempts={qaMaxAttempts}
                                        qaCaseSensitive={qaCaseSensitive}
                                        qaShowHints={qaShowHints}
                                        timerDuration={duration}
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
                                        timerDuration={duration}
                                    />
                                </div>
                            )}

                            {/* 3. More Settings Accordion */}
                            <div className={`rounded-xl sm:rounded-2xl border shadow-lg transition-all duration-150 ${'bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 border-gray-200/50 dark:border-gray-700/50'}`}>
                                {/* Header - Always Visible */}
                                <div
                                    className="p-4 sm:p-5 cursor-pointer flex items-center justify-between gap-3 hover:bg-white/30 dark:hover:bg-black/10 transition-colors duration-100"
                                    onClick={() => setIsMoreSettingsExpanded(!isMoreSettingsExpanded)}
                                >
                                    {/* Left side: Icon + Text */}
                                    <div className="flex items-center gap-3 flex-1 min-w-0">
                                        <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-white/50 dark:bg-black/20">
                                            <span className="text-lg">⚙️</span>
                                        </div>

                                        <div className="flex-1 min-w-0"> {/* Ensure this shrinks if needed */}
                                            <h3 className="font-semibold text-sm sm:text-base text-gray-800 dark:text-gray-200 truncate">
                                                Customize & Other Games
                                            </h3>
                                            <p className="text-xs opacity-70 truncate text-gray-600 dark:text-gray-300">
                                                Set a timer, add a caption, or try other fun modes
                                            </p>
                                        </div>
                                    </div>

                                    {/* Right side: Arrow (Fixed width, never shrinks) */}
                                    <div className={`flex-shrink-0 w-6 h-6 flex items-center justify-center transition-transform duration-150 ${isMoreSettingsExpanded ? 'rotate-180' : 'rotate-0'}`}>
                                        <svg className="w-4 h-4 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Expandable Content */}
                                <div className={`overflow-hidden transition-all duration-150 ease-in-out ${isMoreSettingsExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <div className="px-4 sm:px-5 pb-4 sm:pb-5 border-t border-gray-200/30 dark:border-gray-700/30">
                                        <div className="pt-4 space-y-6">
                                            <FormFields
                                                recipientName={recipientName}
                                                publicNote={publicNote}
                                                message={message}
                                                onRecipientNameChange={handleRecipientNameChange}
                                                onPublicNoteChange={handlePublicNoteChange}
                                                onMessageChange={handleMessageChange}
                                                useCase={useCase}
                                                gameMode={gameMode}
                                                uploadedFile={uploadedFile}
                                                yesCaption={yesCaption}
                                                onYesCaptionChange={setYesCaption}
                                                noCaption={noCaption}
                                                onNoCaptionChange={setNoCaption}
                                            />
                                            <TimerSettings
                                                duration={duration}
                                                onDurationChange={setDuration}
                                                isTimerDisabled={isTimerDisabled}
                                                gameMode={gameMode}
                                            />
                                            <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
                                                <GameModeSelector
                                                    selectedMode={gameMode}
                                                    onModeChange={handleGameModeChange}
                                                    isGameModeDisabled={isGameModeDisabled}
                                                    uploadedFile={uploadedFile}
                                                    onFeedbackClick={handleGameFeedbackClick}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        {/* RIGHT COLUMN - Interactive Card or Demo Video */}
                        <div className="hidden lg:block space-y-4 sm:space-y-6 order-2">
                            <div className="sticky top-8">
                                {isSignedIn ? (
                                    // ✅ OPTION A: Logged In View (Welcome Card)
                                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                        <InteractiveGameCard />
                                    </div>
                                ) : (
                                    // ✅ OPTION B: Guest View (Demo Video)
                                    <div className="w-80 mx-auto bg-white/40 dark:bg-black/20 p-2 rounded-2xl border border-white/20 shadow-sm backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
                                        <p className="text-center text-xs text-gray-500 mb-2 font-medium uppercase tracking-wider opacity-70">
                                            ✨ See how it works
                                        </p>
                                        <div className="relative w-full aspect-[9/16] overflow-hidden rounded-xl shadow-2xl">
                                            <SmartVideo
                                                posterSrc="/assets/video-poster.webp"
                                                videoSrc="/assets/demo-reel.webm"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>




                    {/* Generate Button - Centered, Full Width */}
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
                                    "Create & Share"
                                )}
                            </Button>
                        </div>

                        {/* Desktop: Centered button */}
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
                                        Your photo is uploading...
                                    </>
                                ) : isLoading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 sm:h-6 sm:w-6 border-b-2 border-white mr-2 sm:mr-3"></div>
                                        Creating your link...
                                    </>
                                ) : isLandingPage ? (
                                    "🚀 Create Account & Send some fun"
                                ) : (
                                    "Create & Share"
                                )}
                            </Button>
                        </div>
                    </div>

                </div>
            </div>



            {/* Generated Link Display */}
            {!isLandingPage && generatedLink && (
                <div className="mt-4 sm:mt-6 lg:mt-8">
                    <GeneratedLinkDisplay
                        generatedLink={generatedLink}
                        publicNote={publicNote}
                        gameMode={gameMode}
                        selectedType={microQuestType}
                    />
                </div>
            )}

            {/* MOBILE VIDEO - Shown ONLY on mobile, below the button */}
            {!isSignedIn && (
                <div className="lg:hidden mt-8 mb-4">
                    <div className="w-full max-w-xs mx-auto bg-white/40 dark:bg-black/20 p-2 rounded-2xl border border-white/20 shadow-sm backdrop-blur-sm">
                        <p className="text-center text-xs text-gray-500 mb-2 font-medium uppercase tracking-wider opacity-70">
                            See how it works
                        </p>
                        <div className="relative w-full aspect-[9/16] overflow-hidden rounded-xl shadow-2xl">
                            <SmartVideo
                                posterSrc="/assets/video-poster.jpg"
                                videoSrc="/assets/demo-reel.mp4"
                            />
                        </div>
                    </div>
                </div>
            )}





            {/* Signup Modal */}
            <SignupModal
                isVisible={showSignupPrompt}
                onClose={() => setShowSignupPrompt(false)}
                formData={formData}
            />
            <FeedbackModal
                isOpen={isFeedbackModalOpen}
                onClose={() => setIsFeedbackModalOpen(false)}
                defaultTab="game"
            />
        </div>
    );
}
// secret-form.tsx (Complete and Corrected)

"use client";

import { useState, useEffect, useCallback } from "react"; // <-- useCallback is imported
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useSignIn, useSignUp } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { FilePreview } from "./file-preview";

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

import { useSearchParams, useRouter } from 'next/navigation';
import { uploadFiles } from "./uploadthing"; // <-- Correct import for uploadFiles
import { FeedbackModal } from "@/components/feedback/FeedbackModal";

type GameMode = "none" | "scratch_and_see" | "qa_challenge" | "reveal_rush";
type MicroQuestType = "group_qa" | "rate_my";

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
    const [gameMode, setGameMode] = useState<GameMode>("none");
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

    const createSecret = useMutation(api.secrets.create);
    const { signIn } = useSignIn();
    const { signUp } = useSignUp();
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        setIsHydrated(true);
    }, []);

    // Auto-collapse More Settings when file is uploaded
useEffect(() => {
    if (uploadedFile && isMoreSettingsExpanded) {
        setIsMoreSettingsExpanded(false);
    }
}, [uploadedFile, isMoreSettingsExpanded]);

    // --- FIXED: WRAPPED IN useCallback ---
    const clearGeneratedLink = useCallback(() => {
        if (generatedLink) {
            setGeneratedLink("");
        }
    }, [generatedLink]);

    

    const handleFileUpload = useCallback((file: { url: string; type: "image" | "video" }) => {
        clearGeneratedLink();
        setUploadedFile(file);
        setIsUploading(false);
        if (file.type === 'video') {
            setGameMode('none');
        }
    }, [clearGeneratedLink]);

    // --- FIXED: THE useEffect HOOK WITH UPLOAD LOGIC ---
 useEffect(() => {
  const handleSharedFile = async () => {
    if (searchParams.get("shared") === "true") {
      console.log("📂 Page loaded from share, handling file...");

      // 🔑 Immediately clean the URL to prevent loops
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
            try {
              let fileForUpload: File;

              if (sharedItem.file.data) {
                const blob = new Blob([sharedItem.file.data], { type: sharedItem.file.type });
                fileForUpload = new File([blob], sharedItem.file.name || "shared", {
                  type: sharedItem.file.type,
                });
              } else if (sharedItem.file instanceof Blob) {
                const blob = sharedItem.file;
                fileForUpload = new File([blob], sharedItem.file.name || "shared", { type: blob.type });
              } else {
                throw new Error("No file bytes found in IndexedDB");
              }

              const endpoint =
                sharedItem.type === "image" ? "imageUploader" : "videoUploader";
              const res = await uploadFiles(endpoint, { files: [fileForUpload] });

              if (res && res.length > 0) {
  const uploaded = res[0];
  const fileUrl = (uploaded as any).ufsUrl || uploaded.url; // handle v8 + v9
  handleFileUpload({ url: fileUrl, type: sharedItem.type });
}
else {
                throw new Error("Upload failed to return a valid response.");
              }
            } catch (error) {
              console.error("❌ Upload failed:", error);
              alert(`ERROR! ${(error as Error).message}`);
            } finally {
              setIsUploading(false);
              // ❌ no store.clear()
            }
          }
        };
      };
    }
  };
  handleSharedFile();
}, [searchParams, router, handleFileUpload]);



    // ... (The rest of your file is fine, no changes needed below this line)
    // All your other useEffects, handlers, and the return statement can remain exactly as they are in the file you sent.
    // I am including the rest of the file here for completeness.

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

        if (!message && !uploadedFile) {
            alert("Please provide a message or upload a file.");
            return;
        }

        if (gameMode === 'qa_challenge' && uploadedFile?.type === 'image') {
            if (!qaQuestion.trim() || !qaAnswer.trim()) {
                alert("Please provide both a question and answer for the Q&A challenge.");
                return;
            }
        }
        
        if (gameMode === 'reveal_rush' && uploadedFile?.type === 'image') {
            if (microQuestType === 'group_qa' && (!mqGroupQuestion.trim() || !mqGroupAnswer.trim())) {
                alert("Please provide a question and answer for the Group Q&A quest.");
                return;
            }
            if (microQuestType === 'rate_my' && (!mqRateCategory.trim() || !mqExpectedRating)) {
                alert("Please provide a category and select your rating for the Rate My... quest.");
                return;
            }
        }

        if (isLandingPage) {
            saveFormData();
            setShowSignupPrompt(true);
            return;
        }

        setIsLoading(true);
        try {
            const mutationParams: any = {
  message: message || undefined,
  recipientName,
  publicNote,
  fileUrl: uploadedFile?.url,  // ✅ always normalized here
  fileType: uploadedFile?.type,
  withWatermark: addWatermark,
  duration: uploadedFile?.type === "video" ? undefined : parseInt(duration),
};

            if (uploadedFile?.type === 'image') {
                mutationParams.gameMode = gameMode;
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
            } else {
                mutationParams.gameMode = "none";
            }

            const publicId = await createSecret(mutationParams);

            if (publicId) {
                const link = `${window.location.origin}/redirect/${publicId}`;
                setGeneratedLink(link);
            }

            setMessage(""); setUploadedFile(null); setGameMode("none"); setMicroQuestType("group_qa");
            setMqGroupQuestion(""); setMqGroupAnswer(""); setMqRateCategory(""); setMqExpectedRating(0);
            setMqSuggestionPrompt(""); setQaQuestion(""); setQaAnswer(""); setQaMaxAttempts(3);
            setQaCaseSensitive(false); setQaShowHints(true);
        } catch (error) {
            console.error(error);
            alert("Failed to create  message.");
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
    const isGameModeDisabled = !uploadedFile || uploadedFile?.type === 'video';

    const formData = {
        recipientName, publicNote, message, uploadedFile, duration, addWatermark, gameMode,
        qaQuestion, qaAnswer, qaMaxAttempts, qaCaseSensitive, qaShowHints,
    };

    return (
        <div className="w-full max-w-7xl mx-auto px-2 sm:px-2 md:px-6 lg:px-8">
            {/* The rest of your JSX return statement is correct and does not need changes */}
            {/* ... */}
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

                    {/* Mobile: Single Column, Desktop: Balanced Two Columns */}
                    <div className="space-y-6 sm:space-y-8 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-12">
                        
                        {/* LEFT COLUMN - Content & Media Flow */}
                        <div className="space-y-4 sm:space-y-6 order-1">
                            
                            {/* 1. File Upload/Preview - Primary Visual Content */}
                            {uploadedFile ? (
                                <div className="space-y-3">
                                    {/* File Preview */}
                                    <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-[#FF75A0]/20 dark:border-[#FF75A0]/30 shadow-lg">
                                        <FilePreview 
                                            file={uploadedFile} 
                                            onRemove={handleFileRemove}
                                            recipientName={recipientName}
                                            showWatermark={addWatermark}
                                        />
                                    </div>
                                    
                                    {/* Compact Watermark Settings - Right next to file preview */}
                                    <WatermarkSettings
                                        addWatermark={addWatermark}
                                        onWatermarkChange={setAddWatermark}
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

                            
                        </div>

                        {/* RIGHT COLUMN - Game Features & Settings (Better organized hierarchy) */}
                        <div className="space-y-4 sm:space-y-6 order-2">
                            
                            {/* 1. Game Mode Selector - Top Priority (Interactive Features) */}
                            <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
                                <GameModeSelector
                                    selectedMode={gameMode}
                                    onModeChange={handleGameModeChange}
                                    isGameModeDisabled={isGameModeDisabled}
                                    uploadedFile={uploadedFile}
                                    onFeedbackClick={handleGameFeedbackClick}
                                />
                            </div>

                            {/* 2. Dynamic Instructions Panel - Visual Guide (Right after game selection) */}
                            {/* 2. Elegant Game Mode Instructions - Collapsible */}
<div className={`rounded-xl sm:rounded-2xl border shadow-lg transition-all duration-150 ${
    gameMode === 'none' ? 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200/50 dark:border-blue-700/50' :
    gameMode === 'scratch_and_see' ? 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200/50 dark:border-green-700/50' :
    gameMode === 'qa_challenge' ? 'bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 border-purple-200/50 dark:border-purple-700/50' :
    'bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-orange-200/50 dark:border-orange-700/50'
}`}>
    {/* Compact Header - Always Visible */}
    <div 
        className="p-4 sm:p-5 cursor-pointer flex items-center justify-between hover:bg-white/30 dark:hover:bg-black/10 transition-colors duration-100"
        onClick={() => setIsInstructionsExpanded(!isInstructionsExpanded)}
    >
        <div className="flex items-center space-x-3">
            {/* Mode Icon */}
            <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-white/50 dark:bg-black/20">
                <span className="text-lg">
                    {gameMode === 'none' && 'ⓘ'}
                    {gameMode === 'scratch_and_see' && '🐾'}
                    {gameMode === 'qa_challenge' && '🤔'}
                    {gameMode === 'reveal_rush' && '🏆'}
                </span>
            </div>
            
            {/* Mode Title & Quick Description */}
            <div className="flex-1 min-w-0">
                <h3 className={`font-semibold text-sm sm:text-base ${
                    gameMode === 'none' ? 'text-blue-800 dark:text-blue-200' :
                    gameMode === 'scratch_and_see' ? 'text-green-800 dark:text-green-200' :
                    gameMode === 'qa_challenge' ? 'text-purple-800 dark:text-purple-200' :
                    'text-orange-800 dark:text-orange-200'
                }`}>
                    {gameMode === 'none' && 'Add Some Fun?'}
                    {gameMode === 'scratch_and_see' && 'Scratch & Reveal Magic'}
                    {gameMode === 'qa_challenge' && 'Brain Teaser Mode'}
                    {gameMode === 'reveal_rush' && 'Competition Mode'}
                </h3>
                <p className={`text-xs opacity-70 truncate ${
                    gameMode === 'none' ? 'text-blue-600 dark:text-blue-300' :
                    gameMode === 'scratch_and_see' ? 'text-green-600 dark:text-green-300' :
                    gameMode === 'qa_challenge' ? 'text-purple-600 dark:text-purple-300' :
                    'text-orange-600 dark:text-orange-300'
                }`}>
                    {gameMode === 'none' && 'Upload an image to unlock interactive modes'}
                    {gameMode === 'scratch_and_see' && 'Interactive scratching experience'}
                    {gameMode === 'qa_challenge' && 'Answer correctly to unlock content'}
                    {gameMode === 'reveal_rush' && 'Multi-player competition mode'}
                </p>
            </div>
        </div>

        {/* Expand/Collapse Icon */}
        <div className={`flex-shrink-0 w-6 h-6 flex items-center justify-center transition-transform duration-150 ${
            isInstructionsExpanded ? 'rotate-180' : 'rotate-0'
        }`}>
            <svg className="w-4 h-4 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
        </div>
    </div>

    {/* Expandable Content */}
    <div className={`overflow-hidden transition-all duration-150 ease-in-out ${
        isInstructionsExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
    }`}>
        <div className="px-4 sm:px-5 pb-4 sm:pb-5 border-t border-current/10">
            <div className="pt-4">
                {/* Detailed Description */}
                <p className={`text-sm mb-4 ${
                    gameMode === 'none' ? 'text-blue-600 dark:text-blue-300' :
                    gameMode === 'scratch_and_see' ? 'text-green-600 dark:text-green-300' :
                    gameMode === 'qa_challenge' ? 'text-purple-600 dark:text-purple-300' :
                    'text-orange-600 dark:text-orange-300'
                }`}>
                    {gameMode === 'none' && 'Upload an image to unlock interactive game modes and challenges that make your moments more engaging!'}
                    {gameMode === 'scratch_and_see' && 'Recipients will see a blurred version first, then scratch to gradually reveal your image with smooth interactive animations.'}
                    {gameMode === 'qa_challenge' && 'Recipients must answer your custom question correctly to unlock the moment. Perfect for personal security or fun challenges.'}
                    {gameMode === 'reveal_rush' && 'Multiple people compete to solve your challenge! The first correct answer wins access to your moment.'}
                </p>

                {/* Feature List */}
                <div className="space-y-2 mb-4">
                    {gameMode === 'none' && (
                        <>
                            <div className="flex items-center space-x-2 text-xs text-blue-500 dark:text-blue-400">
                                <span>🤔</span>
                                <span>Q&A Challenges</span>
                            </div>
                            <div className="flex items-center space-x-2 text-xs text-blue-500 dark:text-blue-400">
                                <span>🏆</span>
                                <span>Group Competitions</span>
                            </div>
                            <div className="flex items-center space-x-2 text-xs text-blue-500 dark:text-blue-400">
                                <span>🐾</span>
                                <span>Scratch & Reveal</span>
                            </div>
                        </>
                    )}

                    {gameMode === 'scratch_and_see' && (
                        <>
                            <div className="flex items-center space-x-2 text-xs text-green-500 dark:text-green-400">
                                <span>👆</span>
                                <span>Interactive scratching experience</span>
                            </div>
                            <div className="flex items-center space-x-2 text-xs text-green-500 dark:text-green-400">
                                <span>🎨</span>
                                <span>Gradual image reveal</span>
                            </div>
                            <div className="flex items-center space-x-2 text-xs text-green-500 dark:text-green-400">
                                <span>📱</span>
                                <span>Perfect for mobile & desktop</span>
                            </div>
                        </>
                    )}

                    {gameMode === 'qa_challenge' && (
                        <>
                            <div className="flex items-center space-x-2 text-xs text-purple-500 dark:text-purple-400">
                                <span>❓</span>
                                <span>Custom question & answer</span>
                            </div>
                            <div className="flex items-center space-x-2 text-xs text-purple-500 dark:text-purple-400">
                                <span>🎯</span>
                                <span>Multiple attempts allowed</span>
                            </div>
                            <div className="flex items-center space-x-2 text-xs text-purple-500 dark:text-purple-400">
                                <span>💡</span>
                                <span>Optional hints system</span>
                            </div>
                        </>
                    )}

                    {gameMode === 'reveal_rush' && (
                        <>
                            <div className="flex items-center space-x-2 text-xs text-orange-500 dark:text-orange-400">
                                <span>👥</span>
                                <span>Multi-player competition</span>
                            </div>
                            <div className="flex items-center space-x-2 text-xs text-orange-500 dark:text-orange-400">
                                <span>⚡</span>
                                <span>First correct answer wins</span>
                            </div>
                            <div className="flex items-center space-x-2 text-xs text-orange-500 dark:text-orange-400">
                                <span>🎉</span>
                                <span>Great for group chats</span>
                            </div>
                        </>
                    )}
                </div>

                {/* Pro Tip */}
                <div className="pt-3 border-t border-current/10">
                    <div className="flex items-start space-x-2">
                        <span className="text-sm flex-shrink-0">💡</span>
                        <p className="text-xs opacity-80 leading-relaxed">
                            {gameMode === 'none' && "Pro tip: Games make your moments more engaging and memorable! Perfect for special occasions."}
                            {gameMode === 'scratch_and_see' && "Pro tip: Works best with photos, artwork, or visual surprises that benefit from gradual reveal."}
                            {gameMode === 'qa_challenge' && "Pro tip: Use inside jokes or personal questions for better security and more fun interactions."}
                            {gameMode === 'reveal_rush' && "Pro tip: Perfect for friend groups, teams, or family challenges. Great conversation starter!"}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

                            {/* 4. Game-Specific Forms (Conditional - After more settings) */}
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
            />
        </div>
    )}

                            
                        </div>
                    </div>

                    {/* Mobile-Only Message Details - Positioned before Timer Settings in mobile flow */}
                   {uploadedFile && (
        <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl sm:rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg transition-all duration-150">
            {/* More Settings Header - Always Visible when file uploaded */}
            <div 
                className="p-4 sm:p-5 cursor-pointer flex items-center justify-between hover:bg-white/30 dark:hover:bg-black/10 transition-colors duration-100"
                onClick={() => setIsMoreSettingsExpanded(!isMoreSettingsExpanded)}
            >
                <div className="flex items-center space-x-3">
                    {/* Settings Icon */}
                    <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-white/50 dark:bg-black/20">
                        <span className="text-lg">⚙️</span>
                    </div>
                    
                    {/* Settings Title & Description */}
                    <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm sm:text-base text-gray-800 dark:text-gray-200">
                            More Settings
                        </h3>
                        <p className="text-xs opacity-70 truncate text-gray-600 dark:text-gray-300">
                            Message details, timer & advanced options
                        </p>
                    </div>
                </div>

                {/* Expand/Collapse Icon */}
                <div className={`flex-shrink-0 w-6 h-6 flex items-center justify-center transition-transform duration-150 ${
                    isMoreSettingsExpanded ? 'rotate-180' : 'rotate-0'
                }`}>
                    <svg className="w-4 h-4 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>

            {/* Expandable More Settings Content */}
            <div className={`overflow-hidden transition-all duration-150 ease-in-out ${
                isMoreSettingsExpanded ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
            }`}>
                <div className="px-4 sm:px-5 pb-4 sm:pb-5 border-t border-gray-200/30 dark:border-gray-700/30">
                    <div className="pt-4 space-y-6">
                        {/* Message Details */}
                        <div>
                            <h4 className="font-medium text-sm text-gray-800 dark:text-gray-200 mb-3">Message Details</h4>
                            {!uploadedFile && (
    <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg lg:block hidden">
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
        />
    </div>
)}
                        </div>
                        
                        {/* Timer Settings */}
                        <div>
                            <h4 className="font-medium text-sm text-gray-800 dark:text-gray-200 mb-3">Timer Settings</h4>
                           {!uploadedFile && (
        <div className="hidden lg:block bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
            <TimerSettings
                duration={duration}
                onDurationChange={setDuration}
                isTimerDisabled={isTimerDisabled}
                gameMode={gameMode}
            />
        </div>
    )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )}

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
                                    "✨ Generate Fun Link"
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
                                        Your moment is uploading...
                                    </>
                                ) : isLoading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 sm:h-6 sm:w-6 border-b-2 border-white mr-2 sm:mr-3"></div>
                                        Creating your fun link...
                                    </>
                                ) : isLandingPage ? (
                                    "🚀 Create Account & Send some fun"
                                ) : (
                                    "✨ Generate Fun Link"
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
                        gameMode={gameMode as GameMode}
    selectedType={microQuestType as MicroQuestType}
                    />
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
                defaultTab="game" // This will open with game suggestion tab
            />
        </div>
    );
}
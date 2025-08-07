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
            uploadedFile
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

        if (isLandingPage) {
            // Save form data and show signup prompt
            saveFormData();
            setShowSignupPrompt(true);
            return;
        }

        setIsLoading(true);
        try {
            const publicId = await createSecret({
                message: message || undefined,
                recipientName,
                publicNote,
                fileUrl: uploadedFile?.url,
                fileType: uploadedFile?.type,
                withWatermark: addWatermark,
                duration: uploadedFile?.type === 'video' ? undefined : parseInt(duration),
            });

            if (publicId) {
                const link = `${window.location.origin}/redirect/${publicId}`;
                setGeneratedLink(link);
            }

            // Clear the form for next secret
            setMessage("");
            setUploadedFile(null);
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
    };

    const handleFileRemove = () => {
        clearGeneratedLink(); // Clear link when file is removed
        setUploadedFile(null);
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

    const isTimerDisabled = uploadedFile?.type === 'video';

    const formData = {
        recipientName,
        publicNote,
        message,
        uploadedFile,
        duration,
        addWatermark
    };

    console.log("Current form state:", { recipientName, publicNote, message, useCase, templateApplied });

    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <PersonalizedHeader useCase={useCase} isLandingPage={isLandingPage} />

            {/* Use Case Tips */}
            <UseCaseTips 
                useCase={useCase}
                isVisible={showTips}
                onClose={() => setShowTips(false)}
            />

            {/* Main Form Container */}
            <div className="bg-white/80 dark:bg-gray-900/50 dark:border backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 dark:border-gray-800 overflow-hidden">
                <div className="p-6 sm:p-8 lg:p-10">
                    
                    {/* Landing Page Notice */}
                    {isLandingPage && <LandingPageNotice />}

                    {/* Two Column Layout - Desktop */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                        
                        {/* Left Column - File Upload & Watermark */}
                        <div className="space-y-8">
                            {/* File Upload Area or Preview */}
                            {uploadedFile ? (
                                <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 border border-[#FF75A0]/20 dark:border-[#FF75A0]/30 shadow-lg">
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

                            {/* Watermark Settings */}
                            <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
                                <WatermarkSettings
                                    addWatermark={addWatermark}
                                    onWatermarkChange={setAddWatermark}
                                />
                            </div>
                        </div>

                        {/* Right Column - Form Fields & Timer */}
                        <div className="space-y-8">
                            {/* Form Fields */}
                            <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
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

                            {/* Timer Settings */}
                            <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
                                <TimerSettings
                                    duration={duration}
                                    onDurationChange={setDuration}
                                    isTimerDisabled={isTimerDisabled}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Generate Button - Full Width Center */}
                    <div className="mt-12 flex justify-center">
                        <Button 
                            onClick={handleGenerate} 
                            disabled={isLoading || isUploading} 
                            className="w-full max-w-md h-16 text-lg font-bold rounded-2xl bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] hover:from-[#e65a85] hover:to-[#e6955a] border-0 shadow-2xl transform hover:scale-105 transition-all duration-200"
                            size="lg"
                            type="button"
                        >
                            {isUploading ? (
                                <>
                                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                                    Your moment is uploading...
                                </>
                            ) : isLoading ? (
                                <>
                                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
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

            {/* Generated Link Section - Below Main Container */}
            {!isLandingPage && generatedLink && (
                <div className="mt-8">
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
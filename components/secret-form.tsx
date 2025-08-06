"use client";

import { useState, useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useSignIn, useSignUp } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { FilePreview } from "./file-preview";

// Import our new components
import { SignupModal } from "./formComponents/signup-modal";
import { FileUploadArea } from "./formComponents/file-upload-area";
import { FormFields } from "./formComponents/form-fields";
import { TimerSettings } from "./formComponents/timer-settings";
import { WatermarkSettings } from "./formComponents/watermark-settings";
import { LandingPageNotice } from "./formComponents/landing-page-notice";
import { GeneratedLinkDisplay } from "./formComponents/generated-link-display";

interface SecretFormProps {
    isLandingPage?: boolean;
}

export function SecretForm({ isLandingPage = false }: SecretFormProps) {
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
    
    const createSecret = useMutation(api.secrets.create);
    const { signIn } = useSignIn();
    const { signUp } = useSignUp();

    // Restore form data from localStorage on authenticated page
    useEffect(() => {
        if (!isLandingPage) {
            const savedData = localStorage.getItem('secretFormData');
            if (savedData) {
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
    }, [isLandingPage]);

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

            setMessage("");
            setUploadedFile(null);
        } catch (error) {
            console.error(error);
            alert("Failed to create secret message.");
        } finally {
            setIsLoading(false);
        }
    };

    // Upload handlers
    const handleImageUploadComplete = (res: any) => {
        if (res) {
            setUploadedFile({ url: res[0].url, type: "image" });
            setIsUploading(false);
        }
    };

    const handleVideoUploadComplete = (res: any) => {
        if (res) {
            setUploadedFile({ url: res[0].url, type: "video" });
            setIsUploading(false);
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

    return (
        <div className="w-full max-w-6xl mx-auto">
            <div className="mb-8 text-center">
                <h3 className="text-3xl font-bold mb-3 bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] bg-clip-text text-transparent">
                    Share Your Moment
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    {isLandingPage 
                        ? "Configure your secret below — then create an account to actually send it!" 
                        : "Upload something real, write something honest, set it free"
                    }
                </p>
            </div>

            {/* Responsive Layout */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                
                {/* File Preview Section */}
                <div className={`${uploadedFile ? 'xl:order-1' : 'xl:col-span-2'} space-y-6`}>
                    {uploadedFile ? (
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-[#FF75A0]/20 dark:border-[#FF75A0]/30 shadow-xl">
                            <FilePreview 
                                file={uploadedFile} 
                                onRemove={() => setUploadedFile(null)}
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
                </div>

                {/* Form Section */}
                <div className={`${uploadedFile ? 'xl:order-2' : 'xl:col-span-2 max-w-2xl mx-auto'} space-y-8`}>
                    <div className="bg-white dark:bg-gray-800 border-0 rounded-xl p-8 shadow-xl">
                        
                        {/* Landing Page Notice */}
                        {isLandingPage && <LandingPageNotice />}
                        
                        {/* Form Fields */}
                        <FormFields
                            recipientName={recipientName}
                            publicNote={publicNote}
                            message={message}
                            onRecipientNameChange={setRecipientName}
                            onPublicNoteChange={setPublicNote}
                            onMessageChange={setMessage}
                        />

                        {/* Timer Settings */}
                        <TimerSettings
                            duration={duration}
                            onDurationChange={setDuration}
                            isTimerDisabled={isTimerDisabled}
                        />

                        {/* Watermark Settings */}
                        <WatermarkSettings
                            addWatermark={addWatermark}
                            onWatermarkChange={setAddWatermark}
                        />

                        {/* Generate Button */}
                        <Button 
                            onClick={handleGenerate} 
                            disabled={isLoading || isUploading} 
                            className="w-full mt-10 h-16 text-lg font-semibold rounded-xl bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] hover:from-[#e65a85] hover:to-[#e6955a] border-0 shadow-xl transform hover:scale-105 transition-all"
                            size="lg"
                            type="button"
                        >
                            {isUploading ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                                    Your moment is uploading...
                                </>
                            ) : isLoading ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                                    Creating your secret link...
                                </>
                            ) : isLandingPage ? (
                                "🚀 Create Account & Send This Secret"
                            ) : (
                                "✨ Generate Secret Link"
                            )}
                        </Button>
                    </div>

                    {/* Generated Link Section */}
                    {!isLandingPage && generatedLink && (
                        <GeneratedLinkDisplay
                            generatedLink={generatedLink}
                            publicNote={publicNote}
                        />
                    )}
                </div>
            </div>

            {/* Signup Modal */}
            <SignupModal
                isVisible={showSignupPrompt}
                onClose={() => setShowSignupPrompt(false)}
                formData={formData}
            />
        </div>
    );
}
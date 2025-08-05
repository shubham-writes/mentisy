"use client";

import { useState, useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useSignIn, useSignUp } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShareButton } from "./share-button";
import { UploadButton } from "./uploadthing";
import { FilePreview } from "./file-preview";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

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

    const isTimerDisabled = uploadedFile?.type === 'video';

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
                        <div className="border-2 border-dashed border-[#FF75A0]/40 dark:border-[#FFAA70]/50 rounded-xl p-12 text-center bg-gradient-to-br from-[#FF75A0]/5 to-[#FFAA70]/5 dark:from-[#FF75A0]/10 dark:to-[#FFAA70]/10 hover:border-[#FF75A0]/60 dark:hover:border-[#FFAA70]/70 transition-all duration-300">
                            <div className="max-w-md mx-auto">
                                <div className="mb-6">
                                    <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[#FF75A0] to-[#FFAA70] rounded-xl flex items-center justify-center shadow-xl">
                                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                        </svg>
                                    </div>
                                    <h4 className="text-2xl font-bold mb-3 text-gray-800 dark:text-gray-200">Drop Your Moment Here</h4>
                                    <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                                        {isLandingPage 
                                            ? "Upload that photo or video you've been too scared to share anywhere else" 
                                            : "Share your realest self — photos, videos, whatever needs to disappear after one view"
                                        }
                                    </p>
                                </div>
                                
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    {isLandingPage ? (
                                        <>
                                            <Button 
                                                variant="outline" 
                                                size="lg"
                                                className="border-2 border-[#FF75A0] text-[#FF75A0] hover:bg-[#FF75A0]/10 dark:border-[#FF75A0] dark:text-[#FF75A0] dark:hover:bg-[#FF75A0]/20 rounded-xl px-6 py-3 h-12 font-medium"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    saveFormData();
                                                    setShowSignupPrompt(true);
                                                }}
                                            >
                                                📷 Upload Photo
                                            </Button>
                                            <Button 
                                                variant="outline" 
                                                size="lg"
                                                className="border-2 border-[#FFAA70] text-[#FFAA70] hover:bg-[#FFAA70]/10 dark:border-[#FFAA70] dark:text-[#FFAA70] dark:hover:bg-[#FFAA70]/20 rounded-xl px-6 py-3 h-12 font-medium"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    saveFormData();
                                                    setShowSignupPrompt(true);
                                                }}
                                            >
                                                🎥 Upload Video
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <UploadButton
                                                endpoint="imageUploader"
                                                onUploadBegin={() => setIsUploading(true)}
                                                onClientUploadComplete={(res) => {
                                                    if (res) {
                                                        setUploadedFile({ url: res[0].url, type: "image" });
                                                        setIsUploading(false);
                                                    }
                                                }}
                                                onUploadError={(error: Error) => {
                                                    alert(`ERROR! ${error.message}`);
                                                    setIsUploading(false);
                                                }}
                                            />
                                            <UploadButton
                                                endpoint="videoUploader"
                                                onUploadBegin={() => setIsUploading(true)}
                                                onClientUploadComplete={(res) => {
                                                    if (res) {
                                                        setUploadedFile({ url: res[0].url, type: "video" });
                                                        setIsUploading(false);
                                                    }
                                                }}
                                                onUploadError={(error: Error) => {
                                                    alert(`ERROR! ${error.message}`);
                                                    setIsUploading(false);
                                                }}
                                            />
                                        </>
                                    )}
                                </div>
                                
                                {!isLandingPage && isUploading && (
                                    <div className="mt-6 flex items-center justify-center text-[#FF75A0] dark:text-[#FF75A0]">
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#FF75A0] mr-3"></div>
                                        <span className="font-medium">Your moment is uploading...</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Form Section */}
                <div className={`${uploadedFile ? 'xl:order-2' : 'xl:col-span-2 max-w-2xl mx-auto'} space-y-8`}>
                    <div className="bg-white dark:bg-gray-800 border-0 rounded-xl p-8 shadow-xl">
                        
                        {/* Landing Page Notice */}
                        {isLandingPage && (
                            <div className="mb-8 p-6 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800 rounded-xl">
                                <div className="flex items-start space-x-4">
                                    <span className="text-2xl">🔒</span>
                                    <div>
                                        <p className="font-semibold text-amber-800 dark:text-amber-200 mb-2">
                                            Preview Mode Active
                                        </p>
                                        <p className="text-sm text-amber-700 dark:text-amber-300 leading-relaxed">
                                            You&apos;re just testing the waters right now. Create an account to actually send your secrets into the void.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        {/* Form Fields */}
                        <div className="space-y-8">
                            <div>
                                <Label htmlFor="recipient" className="text-base font-semibold mb-4 block text-gray-800 dark:text-gray-200">
                                    Who&apos;s this for? (Optional)
                                </Label>
                                <Input
                                    id="recipient"
                                    placeholder="Their name, their vibe, whatever..."
                                    value={recipientName}
                                    onChange={(e) => setRecipientName(e.target.value)}
                                    className="h-14 text-base rounded-xl border-2 border-gray-200 dark:border-gray-600 focus:border-[#FF75A0] dark:focus:border-[#FF75A0] focus:ring-[#FF75A0] px-4"
                                />
                            </div>

                            <div>
                                <Label htmlFor="public-note" className="text-base font-semibold mb-4 block text-gray-800 dark:text-gray-200">
                                    Teaser message (What they&apos;ll see first)
                                </Label>
                                <Input
                                    id="public-note"
                                    placeholder="'you're not ready for this...' or whatever fits the vibe"
                                    value={publicNote}
                                    onChange={(e) => setPublicNote(e.target.value)}
                                    className="h-14 text-base rounded-xl border-2 border-gray-200 dark:border-gray-600 focus:border-[#FF75A0] dark:focus:border-[#FF75A0] focus:ring-[#FF75A0] px-4"
                                />
                            </div>

                            <div>
                                <Label htmlFor="secret-message" className="text-base font-semibold mb-4 block text-gray-800 dark:text-gray-200">
                                    Your secret message (Optional)
                                </Label>
                                <Input
                                    id="secret-message"
                                    placeholder="That thing you've been wanting to say..."
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    className="h-14 text-base rounded-xl border-2 border-gray-200 dark:border-gray-600 focus:border-[#FF75A0] dark:focus:border-[#FF75A0] focus:ring-[#FF75A0] px-4"
                                />
                            </div>
                        </div>

                        {/* Timer Settings */}
                        <div className="mt-10 pt-8 border-t border-gray-200 dark:border-gray-700">
                            <Label className="text-base font-semibold mb-6 block text-gray-800 dark:text-gray-200">
                                How long before it disappears forever?
                            </Label>
                            {isTimerDisabled && (
                                <div className="mb-6 p-5 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-300 dark:border-amber-700">
                                    <div className="flex items-center space-x-3 text-amber-800 dark:text-amber-200">
                                        <span className="text-xl">⏱️</span>
                                        <span className="font-medium">Video timer will match the video length automatically</span>
                                    </div>
                                </div>
                            )}
                            <RadioGroup 
                                value={duration}
                                onValueChange={setDuration}
                                disabled={isTimerDisabled}
                                className="grid grid-cols-3 gap-4"
                            >
                                <div className={`relative ${isTimerDisabled ? 'opacity-50' : ''}`}>
                                    <RadioGroupItem value="3" id="r1" className="sr-only" />
                                    <Label 
                                        htmlFor="r1" 
                                        className={`flex flex-col items-center justify-center p-6 border-2 rounded-xl cursor-pointer transition-all hover:scale-105 ${
                                            duration === '3' 
                                                ? 'border-[#FF75A0] bg-gradient-to-br from-[#FF75A0]/10 to-[#FFAA70]/10 text-[#FF75A0] dark:bg-[#FF75A0]/20 dark:text-[#FF75A0]' 
                                                : 'border-gray-200 dark:border-gray-600 hover:border-[#FF75A0]/50'
                                        }`}
                                    >
                                        <span className="text-3xl mb-2">⚡</span>
                                        <span className="font-semibold text-lg">3 Sec</span>
                                        <span className="text-xs text-gray-500 mt-1">Quick peek</span>
                                    </Label>
                                </div>
                                <div className={`relative ${isTimerDisabled ? 'opacity-50' : ''}`}>
                                    <RadioGroupItem value="5" id="r2" className="sr-only" />
                                    <Label 
                                        htmlFor="r2" 
                                        className={`flex flex-col items-center justify-center p-6 border-2 rounded-xl cursor-pointer transition-all hover:scale-105 ${
                                            duration === '5' 
                                                ? 'border-[#FF75A0] bg-gradient-to-br from-[#FF75A0]/10 to-[#FFAA70]/10 text-[#FF75A0] dark:bg-[#FF75A0]/20 dark:text-[#FF75A0]' 
                                                : 'border-gray-200 dark:border-gray-600 hover:border-[#FF75A0]/50'
                                        }`}
                                    >
                                        <span className="text-3xl mb-2">👀</span>
                                        <span className="font-semibold text-lg">5 Sec</span>
                                        <span className="text-xs text-gray-500 mt-1">Take it in</span>
                                    </Label>
                                </div>
                                <div className={`relative ${isTimerDisabled ? 'opacity-50' : ''}`}>
                                    <RadioGroupItem value="10" id="r3" className="sr-only" />
                                    <Label 
                                        htmlFor="r3" 
                                        className={`flex flex-col items-center justify-center p-6 border-2 rounded-xl cursor-pointer transition-all hover:scale-105 ${
                                            duration === '10' 
                                                ? 'border-[#FF75A0] bg-gradient-to-br from-[#FF75A0]/10 to-[#FFAA70]/10 text-[#FF75A0] dark:bg-[#FF75A0]/20 dark:text-[#FF75A0]' 
                                                : 'border-gray-200 dark:border-gray-600 hover:border-[#FF75A0]/50'
                                        }`}
                                    >
                                        <span className="text-3xl mb-2">🧠</span>
                                        <span className="font-semibold text-lg">10 Sec</span>
                                        <span className="text-xs text-gray-500 mt-1">Process it</span>
                                    </Label>
                                </div>
                            </RadioGroup>
                        </div>

                        {/* Watermark Settings */}
                        <div className="mt-10 pt-8 border-t border-gray-200 dark:border-gray-700">
                            <div className="p-6 bg-gradient-to-r from-gray-50 to-[#FF75A0]/5 dark:from-gray-800 dark:to-[#FF75A0]/10 rounded-xl border border-gray-200 dark:border-gray-700">
                                <div className="flex items-start space-x-5">
                                    <Switch 
                                        id="watermark-toggle" 
                                        checked={addWatermark}
                                        onCheckedChange={setAddWatermark}
                                        className="mt-1"
                                    />
                                    <div className="flex-1">
                                        <Label htmlFor="watermark-toggle" className="text-base font-semibold cursor-pointer text-gray-800 dark:text-gray-200 block mb-3">
                                            Add security watermark
                                        </Label>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                                            Adds their name and some security info as an overlay. It&apos;s like a &quot;this is for your eyes only&quot; reminder.
                                        </p>
                                        {!addWatermark && (
                                            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                                                <p className="text-sm text-red-700 dark:text-red-300 flex items-center space-x-2">
                                                    <span>⚠️</span>
                                                    <span>Real talk: Without this, they could probably screen record it</span>
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

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
                        <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-8 shadow-xl">
                            <div className="text-center mb-6">
                                <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-green-500 rounded-xl flex items-center justify-center text-2xl mx-auto mb-4">
                                    🎉
                                </div>
                                <h4 className="text-2xl font-bold text-emerald-800 dark:text-emerald-200 mb-3">
                                    Your secret is ready to fly!
                                </h4>
                                <p className="text-emerald-700 dark:text-emerald-300 leading-relaxed">
                                    Send this link, then watch it disappear forever
                                </p>
                            </div>
                            
                            <div className="bg-white/80 dark:bg-gray-900/60 backdrop-blur-sm rounded-xl p-6 mb-6 border border-emerald-200 dark:border-emerald-800">
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 font-medium">Copy this message and send it:</p>
                                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 text-sm">
                                    <span className="font-medium text-gray-800 dark:text-gray-200">{publicNote || "Someone sent you a secret message!"} </span>
                                    <a 
                                        href={generatedLink} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="text-[#FF75A0] hover:text-[#FFAA70] dark:text-[#FF75A0] dark:hover:text-[#FFAA70] underline transition-colors break-all"
                                    >
                                        {generatedLink}
                                    </a>
                                </div>
                            </div>
                            
                            <ShareButton
                                title="A Secret Message"
                                text={publicNote || "Someone sent you a secret message!"}
                                url={generatedLink}
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Modal Overlay for Signup Prompt */}
            {isLandingPage && showSignupPrompt && (
                <div className="fixed inset-0 z-50 flex items-end justify-center pb-2 bg-white/30 backdrop-blur-md">
                    <div className="w-full max-w-xl mx-4">
                        <Card className="border-0 bg-gradient-to-br from-[#FF75A0]/5 to-[#FFAA70]/5 dark:from-[#FF75A0]/10 dark:to-[#FFAA70]/10 shadow-2xl">
                            <CardHeader className="text-center pb-4">
                                <div className="w-16 h-16 bg-gradient-to-br from-[#FF75A0] to-[#FFAA70] rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                                    🎉
                                </div>
                                <CardTitle className="text-2xl bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] bg-clip-text text-transparent mb-2">
                                    You&apos;re almost done!
                                </CardTitle>
                                <CardDescription className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                                    Create your account to get 5 free secret shares and join thousands sharing their truth
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6 pb-6">
                                <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm p-6 rounded-xl border border-[#FF75A0]/20 dark:border-[#FF75A0]/30">
                                    <h4 className="font-semibold mb-3 text-[#FF75A0] dark:text-[#FF75A0] text-base">Your moment is ready:</h4>
                                    <div className="space-y-2 text-sm">
                                        {recipientName && (
                                            <div className="flex items-center space-x-2">
                                                <span className="text-[#FF75A0] text-base">👤</span>
                                                <span className="text-gray-700 dark:text-gray-300">For: {recipientName}</span>
                                            </div>
                                        )}
                                        {publicNote && (
                                            <div className="flex items-center space-x-2">
                                                <span className="text-[#FF75A0] text-base">💭</span>
                                                <span className="text-gray-700 dark:text-gray-300">Note: {publicNote}</span>
                                            </div>
                                        )}
                                        {message && (
                                            <div className="flex items-center space-x-2">
                                                <span className="text-[#FF75A0] text-base">✍️</span>
                                                <span className="text-gray-700 dark:text-gray-300">Secret message ready</span>
                                            </div>
                                        )}
                                        {uploadedFile && (
                                            <div className="flex items-center space-x-2">
                                                <span className="text-[#FF75A0] text-base">{uploadedFile.type === 'video' ? '🎥' : '📸'}</span>
                                                <span className="text-gray-700 dark:text-gray-300">{uploadedFile.type} uploaded</span>
                                            </div>
                                        )}
                                        <div className="flex items-center space-x-2">
                                            <span className="text-[#FF75A0] text-base">⏱️</span>
                                            <span className="text-gray-700 dark:text-gray-300">Timer: {duration} seconds</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span className="text-[#FF75A0] text-base">🔒</span>
                                            <span className="text-gray-700 dark:text-gray-300">Watermark: {addWatermark ? 'Protected' : 'Off'}</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="space-y-3">
                                    <SignUpButton mode="modal" fallbackRedirectUrl="/hello" forceRedirectUrl="/">
                                        <Button   
                                            size="lg" 
                                            className="w-full h-12 text-base font-semibold bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] hover:from-[#e65a85] hover:to-[#e6955a] border-0 shadow-lg transform hover:scale-105 transition-all"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                            }}
                                        >
                                            🚀 Get 5 Free Secret Shares
                                        </Button>
                                    </SignUpButton>

                                    <SignInButton mode="modal" fallbackRedirectUrl="/hello" forceRedirectUrl="/hello">
                                        <Button 
                                            size="lg"  
                                            variant="outline"
                                            className="w-full h-10 text-sm border-2 border-[#FF75A0]/30 dark:border-[#FF75A0]/50 hover:bg-[#FF75A0]/5 dark:hover:bg-[#FF75A0]/10 hover:border-[#FF75A0] text-[#FF75A0]"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                            }}
                                        >
                                            Already vibing with us? Sign In
                                        </Button>
                                    </SignInButton>
                                    
                                    <Button 
                                        variant="ghost" 
                                        size="sm"
                                        className="w-full h-8 text-xs text-gray-500 hover:text-[#FF75A0] dark:text-gray-400 dark:hover:text-[#FF75A0]"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            setShowSignupPrompt(false);
                                            localStorage.removeItem('secretFormData');
                                        }}
                                    >
                                        ← Go back and change something
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            )}
        </div>
    );
}
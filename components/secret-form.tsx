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

    const handleGenerate = async () => {
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

    // Show signup prompt for landing page users
    if (isLandingPage && showSignupPrompt) {
        return (
            <div className="w-full max-w-lg mx-auto">
                <Card className="border-0 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 shadow-2xl">
                    <CardHeader className="text-center pb-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                            🎉
                        </div>
                        <CardTitle className="text-3xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            Youre almost done!
                        </CardTitle>
                        <CardDescription className="text-lg text-gray-600 dark:text-gray-300">
                            Create your account to get 5 free secret shares
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm p-6 rounded-2xl border border-purple-200 dark:border-purple-800">
                            <h4 className="font-semibold mb-3 text-purple-800 dark:text-purple-200">Your moment is ready:</h4>
                            <div className="space-y-2 text-sm">
                                {recipientName && (
                                    <div className="flex items-center space-x-2">
                                        <span className="text-purple-500">👤</span>
                                        <span className="text-gray-700 dark:text-gray-300">For: {recipientName}</span>
                                    </div>
                                )}
                                {publicNote && (
                                    <div className="flex items-center space-x-2">
                                        <span className="text-purple-500">💭</span>
                                        <span className="text-gray-700 dark:text-gray-300">Note: {publicNote}</span>
                                    </div>
                                )}
                                {message && (
                                    <div className="flex items-center space-x-2">
                                        <span className="text-purple-500">✍️</span>
                                        <span className="text-gray-700 dark:text-gray-300">Secret message ready</span>
                                    </div>
                                )}
                                {uploadedFile && (
                                    <div className="flex items-center space-x-2">
                                        <span className="text-purple-500">{uploadedFile.type === 'video' ? '🎥' : '📸'}</span>
                                        <span className="text-gray-700 dark:text-gray-300">{uploadedFile.type} uploaded</span>
                                    </div>
                                )}
                                <div className="flex items-center space-x-2">
                                    <span className="text-purple-500">⏱️</span>
                                    <span className="text-gray-700 dark:text-gray-300">Timer: {duration} seconds</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-purple-500">🔒</span>
                                    <span className="text-gray-700 dark:text-gray-300">Watermark: {addWatermark ? 'Protected' : 'Off'}</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="space-y-3">
                            <SignUpButton mode="modal" >
                                <Button   
                                    size="lg" 
                                    className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 border-0 shadow-lg transform hover:scale-105 transition-all">
                                    🚀 Get 5 Free Secret Shares
                                </Button>
                            </SignUpButton>

                            <SignInButton mode="modal" >
                                <Button 
                                    size="lg"  
                                    variant="outline"
                                    className="w-full h-12 border-2 border-purple-200 dark:border-purple-800 hover:bg-purple-50 dark:hover:bg-purple-900/20">
                                    Already vibing with us? Sign In
                                </Button>
                            </SignInButton>
                            
                            <Button 
                                variant="ghost" 
                                size="sm"
                                className="w-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                onClick={() => {
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
        );
    }

    return (
        <div className="w-full max-w-7xl mx-auto">
            <div className="mb-8 text-center">
                <h3 className="text-4xl font-bold mb-3 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Share Your Moment
                </h3>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                    {isLandingPage 
                        ? "Configure your secret below — then create an account to actually send it!" 
                        : "Upload something real, write something honest, set it free"
                    }
                </p>
            </div>

            {/* Responsive Layout */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                
                {/* File Preview Section */}
                <div className={`${uploadedFile ? 'xl:order-1' : 'xl:col-span-2'} space-y-4`}>
                    {uploadedFile ? (
                        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg">
                            <FilePreview 
                                file={uploadedFile} 
                                onRemove={() => setUploadedFile(null)}
                                recipientName={recipientName}
                                showWatermark={addWatermark}
                            />
                        </div>
                    ) : (
                        <div className="border-2 border-dashed border-purple-300 dark:border-purple-700 rounded-3xl p-12 text-center bg-gradient-to-br from-purple-50/50 to-pink-50/50 dark:from-purple-900/10 dark:to-pink-900/10">
                            <div className="max-w-md mx-auto">
                                <div className="mb-6">
                                    <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
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
                                                className="border-2 border-purple-300 text-purple-600 hover:bg-purple-50 dark:border-purple-600 dark:text-purple-400 dark:hover:bg-purple-900/20 rounded-2xl"
                                                onClick={() => {
                                                    saveFormData();
                                                    setShowSignupPrompt(true);
                                                }}
                                            >
                                                📷 Upload Photo
                                            </Button>
                                            <Button 
                                                variant="outline" 
                                                size="lg"
                                                className="border-2 border-pink-300 text-pink-600 hover:bg-pink-50 dark:border-pink-600 dark:text-pink-400 dark:hover:bg-pink-900/20 rounded-2xl"
                                                onClick={() => {
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
                                    <div className="mt-6 flex items-center justify-center text-purple-600 dark:text-purple-400">
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-500 mr-3"></div>
                                        <span className="font-medium">Your moment is uploading...</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Form Section */}
                <div className={`${uploadedFile ? 'xl:order-2' : 'xl:col-span-2 max-w-2xl mx-auto'} space-y-6`}>
                    <div className="bg-white dark:bg-gray-800 border-0 rounded-3xl p-8 shadow-xl">
                        
                        {/* Landing Page Notice */}
                        {isLandingPage && (
                            <div className="mb-8 p-6 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl">
                                <div className="flex items-start space-x-3">
                                    <span className="text-2xl">🔒</span>
                                    <div>
                                        <p className="font-semibold text-amber-800 dark:text-amber-200 mb-1">
                                            Preview Mode Active
                                        </p>
                                        <p className="text-sm text-amber-700 dark:text-amber-300">
                                            Youre just testing the waters right now. Create an account to actually send your secrets into the void.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        {/* Form Fields */}
                        <div className="space-y-6">
                            <div>
                                <Label htmlFor="recipient" className="text-base font-semibold mb-3 block text-gray-800 dark:text-gray-200">
                                    Whos this for? (Optional)
                                </Label>
                                <Input
                                    id="recipient"
                                    placeholder="Their name, their vibe, whatever..."
                                    value={recipientName}
                                    onChange={(e) => setRecipientName(e.target.value)}
                                    className="h-12 text-base rounded-2xl border-2 border-gray-200 dark:border-gray-600 focus:border-purple-400 dark:focus:border-purple-500"
                                />
                            </div>

                            <div>
                                <Label htmlFor="public-note" className="text-base font-semibold mb-3 block text-gray-800 dark:text-gray-200">
                                    Teaser message (What theyll see first)
                                </Label>
                                <Input
                                    id="public-note"
                                    placeholder="'you're not ready for this...' or whatever fits the vibe"
                                    value={publicNote}
                                    onChange={(e) => setPublicNote(e.target.value)}
                                    className="h-12 text-base rounded-2xl border-2 border-gray-200 dark:border-gray-600 focus:border-purple-400 dark:focus:border-purple-500"
                                />
                            </div>

                            <div>
                                <Label htmlFor="secret-message" className="text-base font-semibold mb-3 block text-gray-800 dark:text-gray-200">
                                    Your secret message (Optional)
                                </Label>
                                <Input
                                    id="secret-message"
                                    placeholder="That thing you've been wanting to say..."
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    className="h-12 text-base rounded-2xl border-2 border-gray-200 dark:border-gray-600 focus:border-purple-400 dark:focus:border-purple-500"
                                />
                            </div>
                        </div>

                        {/* Timer Settings */}
                        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                            <Label className="text-base font-semibold mb-4 block text-gray-800 dark:text-gray-200">
                                How long before it disappears forever?
                            </Label>
                            {isTimerDisabled && (
                                <div className="mb-4 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-2xl border border-amber-300 dark:border-amber-700">
                                    <div className="flex items-center space-x-2 text-amber-800 dark:text-amber-200">
                                        <span className="text-lg">⏱️</span>
                                        <span className="text-sm font-medium">Video timer will match the video length automatically</span>
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
                                        className={`flex flex-col items-center justify-center p-4 border-2 rounded-2xl cursor-pointer transition-all hover:scale-105 ${
                                            duration === '3' 
                                                ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300' 
                                                : 'border-gray-200 dark:border-gray-600 hover:border-purple-300'
                                        }`}
                                    >
                                        <span className="text-2xl mb-1">⚡</span>
                                        <span className="font-semibold">3 Sec</span>
                                        <span className="text-xs text-gray-500">Quick peek</span>
                                    </Label>
                                </div>
                                <div className={`relative ${isTimerDisabled ? 'opacity-50' : ''}`}>
                                    <RadioGroupItem value="5" id="r2" className="sr-only" />
                                    <Label 
                                        htmlFor="r2" 
                                        className={`flex flex-col items-center justify-center p-4 border-2 rounded-2xl cursor-pointer transition-all hover:scale-105 ${
                                            duration === '5' 
                                                ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300' 
                                                : 'border-gray-200 dark:border-gray-600 hover:border-purple-300'
                                        }`}
                                    >
                                        <span className="text-2xl mb-1">👀</span>
                                        <span className="font-semibold">5 Sec</span>
                                        <span className="text-xs text-gray-500">Take it in</span>
                                    </Label>
                                </div>
                                <div className={`relative ${isTimerDisabled ? 'opacity-50' : ''}`}>
                                    <RadioGroupItem value="10" id="r3" className="sr-only" />
                                    <Label 
                                        htmlFor="r3" 
                                        className={`flex flex-col items-center justify-center p-4 border-2 rounded-2xl cursor-pointer transition-all hover:scale-105 ${
                                            duration === '10' 
                                                ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300' 
                                                : 'border-gray-200 dark:border-gray-600 hover:border-purple-300'
                                        }`}
                                    >
                                        <span className="text-2xl mb-1">🧠</span>
                                        <span className="font-semibold">10 Sec</span>
                                        <span className="text-xs text-gray-500">Process it</span>
                                    </Label>
                                </div>
                            </RadioGroup>
                        </div>

                        {/* Watermark Settings */}
                        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                            <div className="p-6 bg-gradient-to-r from-gray-50 to-purple-50 dark:from-gray-800 dark:to-purple-900/20 rounded-2xl border border-gray-200 dark:border-gray-700">
                                <div className="flex items-start space-x-4">
                                    <Switch 
                                        id="watermark-toggle" 
                                        checked={addWatermark}
                                        onCheckedChange={setAddWatermark}
                                        className="mt-1"
                                    />
                                    <div className="flex-1">
                                        <Label htmlFor="watermark-toggle" className="text-base font-semibold cursor-pointer text-gray-800 dark:text-gray-200">
                                            Add security watermark
                                        </Label>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">
                                            Adds their name and some security info as an overlay. Its like a this is for your eyes only reminder.
                                        </p>
                                        {!addWatermark && (
                                            <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
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
                            className="w-full mt-8 h-16 text-lg font-semibold rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 border-0 shadow-lg transform hover:scale-105 transition-all"
                            size="lg"
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
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-3xl p-8 shadow-lg">
                            <div className="text-center mb-6">
                                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                                    🎉
                                </div>
                                <h4 className="text-2xl font-bold text-green-800 dark:text-green-200 mb-2">
                                    Your secret is ready to fly!
                                </h4>
                                <p className="text-green-700 dark:text-green-300">
                                    Send this link, then watch it disappear forever
                                </p>
                            </div>
                            
                            <div className="bg-white/80 dark:bg-gray-900/60 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-green-200 dark:border-green-800">
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Copy this message and send it:</p>
                                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 text-sm">
                                    <span className="font-medium text-gray-800 dark:text-gray-200">{publicNote || "Someone sent you a secret message!"} </span>
                                    <a 
                                        href={generatedLink} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 underline transition-colors break-all"
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
        </div>
    );
}
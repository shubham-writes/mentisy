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
            <div className="w-full max-w-md mx-auto">
                <Card className="border-2 border-blue-200 dark:border-blue-800">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl text-blue-600 dark:text-blue-400">
                            🎉 Ready to Create Your Secret!
                        </CardTitle>
                        <CardDescription className="text-base">
                            Create an account to get 5 free secret message trials
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                            <h4 className="font-semibold mb-2">Your settings are saved:</h4>
                            <ul className="text-sm space-y-1 text-muted-foreground">
                                {recipientName && <li>• Recipient: {recipientName}</li>}
                                {publicNote && <li>• Note: {publicNote}</li>}
                                {message && <li>• Message: Ready to send</li>}
                                {uploadedFile && <li>• File: {uploadedFile.type} uploaded</li>}
                                <li>• Timer: {duration} seconds</li>
                                <li>• Watermark: {addWatermark ? 'Enabled' : 'Disabled'}</li>
                            </ul>
                        </div>
                        
                        <div className="flex flex-col gap-3">
















                            <SignUpButton mode="modal" fallbackRedirectUrl="/hello" forceRedirectUrl="/">
                        <Button   
                            size="lg" 
                                className="w-full">
                                
                                     🚀 Sign Up for 5 Free Trials
                            </Button>
                        </SignUpButton>



                        <SignInButton mode="modal" fallbackRedirectUrl="/hello" forceRedirectUrl="/hello">
                            <Button size="lg"  variant="outline"
    className="w-full h-12">
                            Already have an account? Sign In
                            </Button>
                        </SignInButton>
                            
                            <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => {
                                    setShowSignupPrompt(false);
                                    // Clear saved data if user goes back
                                    localStorage.removeItem('secretFormData');
                                }}
                            >
                                ← Go Back to Edit
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="w-full max-w-6xl mx-auto">
            <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">Create a Secret Message</h3>
                <p className="text-muted-foreground">
                    {isLandingPage 
                        ? "Try our secret message creator - sign up to actually send them!" 
                        : "Upload files or write messages that self-destruct after viewing"
                    }
                </p>
            </div>

            {/* Responsive Layout: Side by side on desktop, stacked on mobile */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* File Preview Section - Takes full width when no file, or left side when file exists */}
                <div className={`${uploadedFile ? 'lg:order-1' : 'lg:col-span-2'} space-y-4`}>
                    {uploadedFile ? (
                        <FilePreview 
                            file={uploadedFile} 
                            onRemove={() => setUploadedFile(null)}
                            recipientName={recipientName}
                            showWatermark={addWatermark}
                        />
                    ) : (
                        <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-8 text-center bg-gray-50 dark:bg-gray-900/50">
                            <div className="max-w-md mx-auto">
                                <div className="mb-4">
                                    <div className="w-12 h-12 mx-auto mb-4 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                                        <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                        </svg>
                                    </div>
                                    <h4 className="text-lg font-semibold mb-2">Upload a Secret File</h4>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        {isLandingPage 
                                            ? "Sign up to upload and share images or videos securely" 
                                            : "Choose an image or video to share securely (optional)"
                                        }
                                    </p>
                                </div>
                                
                                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                    {isLandingPage ? (
                                        // Show placeholder buttons for landing page
                                        <>
                                            <Button 
                                                variant="outline" 
                                                disabled 
                                                className="opacity-60"
                                                onClick={() => {
                                                    saveFormData();
                                                    setShowSignupPrompt(true);
                                                }}
                                            >
                                                📷 Upload Image
                                            </Button>
                                            <Button 
                                                variant="outline" 
                                                disabled 
                                                className="opacity-60"
                                                onClick={() => {
                                                    saveFormData();
                                                    setShowSignupPrompt(true);
                                                }}
                                            >
                                                🎥 Upload Video
                                            </Button>
                                        </>
                                    ) : (
                                        // Show real upload buttons for authenticated users
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
                                    <div className="mt-4 flex items-center justify-center text-sm text-muted-foreground">
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500 mr-2"></div>
                                        Uploading file...
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Form Section - Right side on desktop, below file on mobile */}
                <div className={`${uploadedFile ? 'lg:order-2' : 'lg:col-span-2 max-w-md mx-auto'} space-y-6`}>
                    <div className="bg-card border rounded-xl p-6 shadow-sm">
                        
                        {/* Landing Page Notice */}
                        {isLandingPage && (
                            <div className="mb-6 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                                <p className="text-sm text-amber-800 dark:text-amber-200">
                                    🔒 <strong>Preview Mode:</strong> Configure your secret message below. 
                                    You&apos;ll need to create an account to actually generate and send it.
                                </p>
                            </div>
                        )}
                        
                        {/* Form Fields */}
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="recipient" className="text-sm font-medium mb-2 block">
                                    Recipient&apos;s Name (Optional)
                                </Label>
                                <Input
                                    id="recipient"
                                    placeholder="Who is this for?"
                                    value={recipientName}
                                    onChange={(e) => setRecipientName(e.target.value)}
                                />
                            </div>

                            <div>
                                <Label htmlFor="public-note" className="text-sm font-medium mb-2 block">
                                    Public Note (Optional)
                                </Label>
                                <Input
                                    id="public-note"
                                    placeholder="A teaser message visible before opening"
                                    value={publicNote}
                                    onChange={(e) => setPublicNote(e.target.value)}
                                />
                            </div>

                            <div>
                                <Label htmlFor="secret-message" className="text-sm font-medium mb-2 block">
                                    Secret Message (Optional)
                                </Label>
                                <Input
                                    id="secret-message"
                                    placeholder="Your confidential message"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Timer Settings */}
                        <div className="mt-6 pt-6 border-t">
                            <Label className="text-sm font-medium mb-3 block">Self-Destruct Timer</Label>
                            {isTimerDisabled && (
                                <p className="text-xs text-amber-600 dark:text-amber-400 mb-3 bg-amber-50 dark:bg-amber-900/20 p-2 rounded">
                                    ⏱️ Timer will match the video&apos;s duration automatically
                                </p>
                            )}
                            <RadioGroup 
                                value={duration}
                                onValueChange={setDuration}
                                disabled={isTimerDisabled}
                                className="grid grid-cols-3 gap-3"
                            >
                                <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-muted/50 transition-colors">
                                    <RadioGroupItem value="3" id="r1" />
                                    <Label htmlFor="r1" className="text-sm cursor-pointer">3 Sec</Label>
                                </div>
                                <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-muted/50 transition-colors">
                                    <RadioGroupItem value="5" id="r2" />
                                    <Label htmlFor="r2" className="text-sm cursor-pointer">5 Sec</Label>
                                </div>
                                <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-muted/50 transition-colors">
                                    <RadioGroupItem value="10" id="r3" />
                                    <Label htmlFor="r3" className="text-sm cursor-pointer">10 Sec</Label>
                                </div>
                            </RadioGroup>
                        </div>

                        {/* Watermark Settings */}
                        <div className="mt-6 pt-6 border-t">
                            <div className="flex items-start space-x-3 p-4 bg-muted/50 rounded-lg">
                                <Switch 
                                    id="watermark-toggle" 
                                    checked={addWatermark}
                                    onCheckedChange={setAddWatermark}
                                    className="mt-0.5"
                                />
                                <div className="flex-1">
                                    <Label htmlFor="watermark-toggle" className="text-sm font-medium cursor-pointer">
                                        Add Security Watermark
                                    </Label>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        Adds recipient name and IP address overlay for security
                                    </p>
                                    {!addWatermark && (
                                        <p className="text-xs text-red-600 dark:text-red-400 mt-2">
                                            ⚠️ Warning: Disabling this makes screen recording easier
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Generate Button */}
                        <Button 
                            onClick={handleGenerate} 
                            disabled={isLoading || isUploading} 
                            className="w-full mt-6 h-12 text-base font-medium"
                            size="lg"
                        >
                            {isUploading ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    Uploading file...
                                </>
                            ) : isLoading ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    Generating link...
                                </>
                            ) : isLandingPage ? (
                                "🔐 Create Account for 5 Free Trials"
                            ) : (
                                "🔗 Generate Shareable Link"
                            )}
                        </Button>
                    </div>

                    {/* Generated Link Section - Only show for authenticated users */}
                    {!isLandingPage && generatedLink && (
                        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6">
                            <h4 className="font-semibold text-green-800 dark:text-green-200 mb-3">
                                🎉 Your Secret Link is Ready!
                            </h4>
                            <div className="bg-white dark:bg-gray-900 rounded-lg p-4 mb-4 border">
                                <p className="text-sm text-muted-foreground mb-2">Share this message:</p>
                                <div className="text-sm break-all">
                                    <span className="font-medium">{publicNote} </span>
                                    <a 
                                        href={generatedLink} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline transition-colors"
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
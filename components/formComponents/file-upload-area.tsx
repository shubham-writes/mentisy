import { Button } from "@/components/ui/button";
import { UploadButton } from "../uploadthing";
import { useState } from "react";

interface FileUploadAreaProps {
    isLandingPage: boolean;
    isUploading: boolean;
    onSaveFormData: () => void;
    onShowSignupPrompt: () => void;
    onImageUploadBegin: () => void;
    onImageUploadComplete: (res: any) => void;
    onImageUploadError: (error: Error) => void;
    onVideoUploadBegin: () => void;
    onVideoUploadComplete: (res: any) => void;
    onVideoUploadError: (error: Error) => void;
}

export function FileUploadArea({ 
    isLandingPage, 
    isUploading, 
    onSaveFormData, 
    onShowSignupPrompt,
    onImageUploadBegin,
    onImageUploadComplete,
    onImageUploadError,
    onVideoUploadBegin,
    onVideoUploadComplete,
    onVideoUploadError
}: FileUploadAreaProps) {
    const [uploadProgress, setUploadProgress] = useState(0);

    const handleLandingPageUpload = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onSaveFormData();
        onShowSignupPrompt();
    };

    const handleImageUploadBegin = () => {
        setUploadProgress(0);
        onImageUploadBegin();
    };

    const handleVideoUploadBegin = () => {
        setUploadProgress(0);
        onVideoUploadBegin();
    };

    const handleImageUploadComplete = (res: any) => {
        setUploadProgress(100);
        setTimeout(() => setUploadProgress(0), 1000);
        onImageUploadComplete(res);
    };

    const handleVideoUploadComplete = (res: any) => {
        setUploadProgress(100);
        setTimeout(() => setUploadProgress(0), 1000);
        onVideoUploadComplete(res);
    };

    return (
        <div className="border-2 border-dashed border-[#FF75A0]/40 dark:border-[#FFAA70]/50 rounded-xl p-8 sm:p-12 lg:p-16 text-center bg-gradient-to-br from-[#FF75A0]/5 to-[#FFAA70]/5 dark:from-[#FF75A0]/10 dark:to-[#FFAA70]/10 hover:border-[#FF75A0]/60 dark:hover:border-[#FFAA70]/70 transition-all duration-300 min-h-[400px] flex items-center justify-center">
            <div className="w-full max-w-lg mx-auto space-y-8">
                {/* Icon and Header */}
                <div className="flex flex-col items-center">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 mb-6 bg-gradient-to-br from-[#FF75A0] to-[#FFAA70] rounded-2xl flex items-center justify-center shadow-2xl">
                        <svg className="w-10 h-10 sm:w-12 sm:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                    </div>
                    <h4 className="text-xl sm:text-2xl font-bold mb-3 text-gray-800 dark:text-gray-200">Drop Your Moment Here</h4>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-base sm:text-lg px-4">
                        {isLandingPage 
                            ? "Upload that photo or video you've been too scared to share anywhere else" 
                            : "Share your realest self — photos, videos, whatever needs to disappear after one view"
                        }
                    </p>
                </div>
                
                {/* Upload Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center w-full">
                    {isLandingPage ? (
                        <>
                            <Button 
                                variant="outline" 
                                size="lg"
                                className="w-full sm:w-auto border-2 border-[#FF75A0] text-[#FF75A0] hover:bg-[#FF75A0]/10 dark:border-[#FF75A0] dark:text-[#FF75A0] dark:hover:bg-[#FF75A0]/20 rounded-xl px-6 sm:px-8 py-3 h-12 sm:h-14 font-medium text-sm sm:text-base"
                                onClick={handleLandingPageUpload}
                            >
                                📷 Upload Photo
                            </Button>
                            <Button 
                                variant="outline" 
                                size="lg"
                                className="w-full sm:w-auto border-2 border-[#FFAA70] text-[#FFAA70] hover:bg-[#FFAA70]/10 dark:border-[#FFAA70] dark:text-[#FFAA70] dark:hover:bg-[#FFAA70]/20 rounded-xl px-6 sm:px-8 py-3 h-12 sm:h-14 font-medium text-sm sm:text-base"
                                onClick={handleLandingPageUpload}
                            >
                                🎥 Upload Video
                            </Button>
                        </>
                    ) : (
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full items-center justify-center">
                            {/* Custom styled upload buttons for authenticated users */}
                            <div className="w-full sm:w-auto flex justify-center">
                                <div className="relative">
                                    <UploadButton
                                        endpoint="imageUploader"
                                        onUploadBegin={handleImageUploadBegin}
                                        onClientUploadComplete={handleImageUploadComplete}
                                        onUploadError={onImageUploadError}
                                        onUploadProgress={(progress) => setUploadProgress(progress)}
                                        appearance={{
                                            button: "bg-gradient-to-r from-[#FF75A0] to-[#e65a85] border-0 rounded-xl px-6 py-3 h-12 font-medium text-white shadow-lg hover:shadow-xl transition-all duration-200",
                                            allowedContent: "hidden",
                                            container: "w-full flex justify-center"
                                        }}
                                        content={{
                                            button: "📸 Choose Your Photo",
                                            allowedContent: ""
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="w-full sm:w-auto flex justify-center">
                                <div className="relative">
                                    <UploadButton
                                        endpoint="videoUploader"
                                        onUploadBegin={handleVideoUploadBegin}
                                        onClientUploadComplete={handleVideoUploadComplete}
                                        onUploadError={onVideoUploadError}
                                        onUploadProgress={(progress) => setUploadProgress(progress)}
                                        appearance={{
                                            button: "bg-gradient-to-r from-[#FFAA70] to-[#e6955a] border-0 rounded-xl px-6 py-3 h-12 font-medium text-white shadow-lg hover:shadow-xl transition-all duration-200",
                                            allowedContent: "hidden",
                                            container: "w-full flex justify-center"
                                        }}
                                        content={{
                                            button: "🎬 Choose Your Video",
                                            allowedContent: ""
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                
                {/* Loading State with Progress */}
                {!isLandingPage && isUploading && (
                    <div className="space-y-4">
                        {/* Progress Bar */}
                        <div className="w-full max-w-md mx-auto">
                            <div className="flex items-center justify-between text-sm text-[#FF75A0] dark:text-[#FF75A0] mb-2">
                                <span className="font-medium">
                                    {uploadProgress < 100 ? 'Your moment is uploading...' : 'Almost done!'}
                                </span>
                                <span className="font-bold">{Math.round(uploadProgress)}%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                                <div 
                                    className="h-full bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] rounded-full transition-all duration-300 ease-out"
                                    style={{ width: `${uploadProgress}%` }}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
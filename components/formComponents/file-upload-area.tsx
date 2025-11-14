
import { Button } from "@/components/ui/button";
import { UploadButton } from "../uploadthing";
import { useState } from "react";

interface FileUploadAreaProps {
    isLandingPage: boolean;
    isUploading: boolean;
    uploadProgress?: number;
    onSaveFormData: () => void;
    onShowSignupPrompt: () => void;
    onImageUploadBegin: () => void;
    onImageUploadComplete: (res: any) => void;
    onImageUploadError: (error: Error) => void;
}

export function FileUploadArea({
    isLandingPage,
    isUploading,
    uploadProgress = 0, // 🆕 Accept external progress with default 0
    onSaveFormData,
    onShowSignupPrompt,
    onImageUploadBegin,
    onImageUploadComplete,
    onImageUploadError
}: FileUploadAreaProps) {
    const [internalProgress, setInternalProgress] = useState(0);

    // 🆕 Use external progress if it's > 0 (from share uploads), otherwise use internal progress (from button uploads)
    const displayProgress = uploadProgress > 0 ? uploadProgress : internalProgress;

    const handleLandingPageUpload = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onSaveFormData();
        onShowSignupPrompt();
    };

    const handleImageUploadBegin = () => {
        setInternalProgress(0);
        onImageUploadBegin();
    };



    const handleImageUploadComplete = (res: any) => {
        setInternalProgress(100);
        setTimeout(() => setInternalProgress(0), 1000);
        onImageUploadComplete(res);
    };



    return (
        <div className="border-2 border-dashed border-[#FF75A0]/40 dark:border-[#FFAA70]/50 rounded-xl sm:rounded-xl p-4 sm:p-8 md:p-12 lg:p-16 text-center bg-gradient-to-br from-[#FF75A0]/5 to-[#FFAA70]/5 dark:from-[#FF75A0]/10 dark:to-[#FFAA70]/10 hover:border-[#FF75A0]/60 dark:hover:border-[#FFAA70]/70 transition-all duration-300 min-h-[280px] sm:min-h-[320px] lg:min-h-[400px] flex items-center justify-center">
            <div className="w-full max-w-lg mx-auto space-y-4 sm:space-y-6 lg:space-y-8">
                {/* Icon and Header - Mobile Optimized */}
                <div className="flex flex-col items-center">
                    <div className="w-14 h-14 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mb-3 sm:mb-4 lg:mb-6 bg-gradient-to-br from-[#FF75A0] to-[#FFAA70] rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg sm:shadow-2xl">
                        <svg className="w-7 h-7 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                    </div>
                    <h4 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 text-gray-800 dark:text-gray-200">
                        Start the Swap
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm sm:text-base lg:text-lg px-2 sm:px-4">
                        {isLandingPage
                            ? "Your photo will stay hidden until your friend sends one back. It's the ultimate fair trade."
                            : "Your photo will stay hidden until your friend sends one back. It's the ultimate fair trade."
                        }
                    </p>
                </div>

                {/* Upload Buttons - Mobile First Design */}
                <div className="space-y-3 sm:space-y-0 sm:flex sm:flex-row sm:gap-3 lg:gap-4 items-center justify-center w-full">
                    {isLandingPage ? (
                        <>
                            {/* Mobile: Full width stacked buttons */}
                            <Button
                                variant="outline"
                                size="lg"
                                className="w-full sm:w-auto border-2 border-[#FF75A0] text-[#FF75A0] hover:bg-[#FF75A0]/10 active:bg-[#FF75A0]/20 dark:border-[#FF75A0] dark:text-[#FF75A0] dark:hover:bg-[#FF75A0]/20 rounded-lg sm:rounded-xl px-4 sm:px-6 lg:px-8 py-3 h-12 sm:h-12 lg:h-14 font-medium text-sm sm:text-base active:scale-98 transition-all duration-150"
                                onClick={handleLandingPageUpload}
                            >
                                📷 Upload Photo
                            </Button>

                        </>
                    ) : (
                        <div className="space-y-3 sm:space-y-0 sm:flex sm:flex-row sm:gap-3 lg:gap-4 w-full items-center justify-center">
                            {/* Custom styled upload buttons for authenticated users - Mobile Optimized */}
                            <div className="w-full sm:w-auto flex justify-center">
                                <div className="relative w-auto">
                                    <UploadButton
                                        endpoint="imageUploader"
                                        onUploadBegin={handleImageUploadBegin}
                                        onClientUploadComplete={handleImageUploadComplete}
                                        onUploadError={onImageUploadError}
                                        onUploadProgress={(progress) => setInternalProgress(progress)}
                                        appearance={{
                                            button: "relative overflow-hidden bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750 border-2 border-[#FF75A0]/30 dark:border-[#FFAA70]/40 rounded-xl px-6 py-4 h-14 font-semibold text-gray-800 dark:text-white shadow-lg hover:shadow-xl hover:scale-105 hover:border-[#FF75A0]/50 dark:hover:border-[#FFAA70]/60 active:scale-100 transition-all duration-300 w-full sm:w-auto text-sm sm:text-base group whitespace-nowrap",
                                            allowedContent: "hidden",
                                            container: "w-full flex justify-center"
                                        }}
                                        content={{
                                            button: ({ ready, isUploading }) => {
                                                if (isUploading) return (
                                                    <span className="flex items-center gap-2">
                                                        <svg className="animate-spin h-5 w-5 text-[#FF75A0]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg>
                                                        <span className="text-[#FF75A0] ">Uploading...</span>
                                                    </span>
                                                );
                                                return (
                                                    <span className="flex items-center gap-2 text-gray-800 dark:text-white">
                                                        <svg className="w-5 h-5 text-[#FF75A0] group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                        Upload Photo to Start
                                                        <svg className="w-4 h-4 text-[#FF75A0] group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                                        </svg>
                                                    </span>
                                                );
                                            },
                                            allowedContent: ""
                                        }}
                                    />
                                </div>
                            </div>

                        </div>
                    )}
                </div>

                {/* Loading State with Progress - Mobile Optimized */}
                {!isLandingPage && isUploading && (
                    <div className="space-y-3 sm:space-y-4">
                        {/* Progress Bar - Mobile First */}
                        <div className="w-full max-w-xs sm:max-w-md mx-auto">
                            <div className="flex items-center justify-between text-xs sm:text-sm text-[#FF75A0] dark:text-[#FF75A0] mb-2">
                                <span className="font-medium">
                                    {displayProgress < 100 ? 'Uploading...' : 'Almost done!'}
                                </span>
                                <span className="font-bold">{Math.round(displayProgress)}%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 sm:h-3 overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] rounded-full transition-all duration-300 ease-out"
                                    style={{ width: `${displayProgress}%` }}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
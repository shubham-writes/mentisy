import { Button } from "@/components/ui/button";
import { UploadButton } from "../uploadthing";

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
    const handleLandingPageUpload = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onSaveFormData();
        onShowSignupPrompt();
    };

    return (
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
                                onClick={handleLandingPageUpload}
                            >
                                📷 Upload Photo
                            </Button>
                            <Button 
                                variant="outline" 
                                size="lg"
                                className="border-2 border-[#FFAA70] text-[#FFAA70] hover:bg-[#FFAA70]/10 dark:border-[#FFAA70] dark:text-[#FFAA70] dark:hover:bg-[#FFAA70]/20 rounded-xl px-6 py-3 h-12 font-medium"
                                onClick={handleLandingPageUpload}
                            >
                                🎥 Upload Video
                            </Button>
                        </>
                    ) : (
                        <>
                            <UploadButton
                                endpoint="imageUploader"
                                onUploadBegin={onImageUploadBegin}
                                onClientUploadComplete={onImageUploadComplete}
                                onUploadError={onImageUploadError}
                            />
                            <UploadButton
                                endpoint="videoUploader"
                                onUploadBegin={onVideoUploadBegin}
                                onClientUploadComplete={onVideoUploadComplete}
                                onUploadError={onVideoUploadError}
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
    );
}
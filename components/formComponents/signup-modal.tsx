import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SignInButton, SignUpButton } from "@clerk/nextjs";

interface SignupModalProps {
    isVisible: boolean;
    onClose: () => void;
    formData: {
        recipientName: string;
        publicNote: string;
        message: string;
        uploadedFile: { url: string; type: "image" | "video" } | null;
        duration: string;
        addWatermark: boolean;
    };
}

export function SignupModal({ isVisible, onClose, formData }: SignupModalProps) {
    if (!isVisible) return null;

    const handleClose = () => {
        localStorage.removeItem('secretFormData');
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center pb-2 bg-white/10 backdrop-blur-lg">
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
                                {formData.recipientName && (
                                    <div className="flex items-center space-x-2">
                                        <span className="text-[#FF75A0] text-base">👤</span>
                                        <span className="text-gray-700 dark:text-gray-300">For: {formData.recipientName}</span>
                                    </div>
                                )}
                                {formData.publicNote && (
                                    <div className="flex items-center space-x-2">
                                        <span className="text-[#FF75A0] text-base">💭</span>
                                        <span className="text-gray-700 dark:text-gray-300">Note: {formData.publicNote}</span>
                                    </div>
                                )}
                                {formData.message && (
                                    <div className="flex items-center space-x-2">
                                        <span className="text-[#FF75A0] text-base">✍️</span>
                                        <span className="text-gray-700 dark:text-gray-300">Secret message ready</span>
                                    </div>
                                )}
                                {formData.uploadedFile && (
                                    <div className="flex items-center space-x-2">
                                        <span className="text-[#FF75A0] text-base">{formData.uploadedFile.type === 'video' ? '🎥' : '📸'}</span>
                                        <span className="text-gray-700 dark:text-gray-300">{formData.uploadedFile.type} uploaded</span>
                                    </div>
                                )}
                                <div className="flex items-center space-x-2">
                                    <span className="text-[#FF75A0] text-base">⏱️</span>
                                    <span className="text-gray-700 dark:text-gray-300">Timer: {formData.duration} seconds</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-[#FF75A0] text-base">🔒</span>
                                    <span className="text-gray-700 dark:text-gray-300">Watermark: {formData.addWatermark ? 'Protected' : 'Off'}</span>
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
                                    handleClose();
                                }}
                            >
                                ← Go back and change something
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
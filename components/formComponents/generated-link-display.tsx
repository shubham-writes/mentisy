import { ShareButton, SocialShareButtons } from "../share-button";
import { useState } from "react";
import { Copy, Check } from "lucide-react";

type GameMode = "none" | "scratch_and_see" | "qa_challenge" | "reveal_rush";
type MicroQuestType = "group_qa" | "rate_my";

interface GeneratedLinkDisplayProps {
    generatedLink: string;
    publicNote: string;
    gameMode?: GameMode;
    selectedType?: MicroQuestType; // For reveal_rush sub-types
}

export function GeneratedLinkDisplay({ 
    generatedLink, 
    publicNote, 
    gameMode = "none",
    selectedType 
}: GeneratedLinkDisplayProps) {
    const [copied, setCopied] = useState(false);

    // Function to get the appropriate text based on game mode
    const getShareText = () => {
    console.log('🛠 DEBUG - gameMode:', gameMode);
    console.log('🛠 DEBUG - selectedType:', selectedType);
    
    switch (gameMode) {
        case "qa_challenge":
            console.log('🛠 Returning: can you answer this question');
            return "can you answer this question";
        case "reveal_rush":
            const text = selectedType === "rate_my" ? "can you guess my ratings" : "can you answer this question";
            console.log('🛠 Returning:', text);
            return text;
        case "scratch_and_see":
            console.log('🛠 Returning: scratch it fast');
            return "scratch it fast";
        default:
            console.log('');
            return "";
    }
};

    const shareText = getShareText();

    const copyToClipboard = async () => {
        try {
            const textToCopy = `${shareText} ${generatedLink}`;
            await navigator.clipboard.writeText(textToCopy);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    return (
        <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-4 sm:p-6 shadow-lg max-w-full">
            <div className="text-center mb-4 sm:mb-5">
                <h4 className="text-lg sm:text-xl font-bold text-emerald-800 dark:text-emerald-200 mb-2">
                    Your fun link is ready!
                </h4>
                <p className="text-xs sm:text-sm text-emerald-700 dark:text-emerald-300 px-2">
                    Send this link - it will disappear after viewing
                </p>
            </div>
            
            <div className="bg-white/80 dark:bg-gray-900/60 backdrop-blur-sm rounded-lg p-3 sm:p-4 mb-4 border border-emerald-200 dark:border-emerald-800">
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 font-medium uppercase tracking-wide"> Copy & paste where you want:</p>
                
                {/* Message container with copy button */}
                <div className="relative bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <div className="flex items-center">
                        {/* Text content - scrollable on mobile */}
                        <div className="flex-1 p-3 pr-12 overflow-hidden">
                            <div className="text-sm">
                                <span className="font-medium text-gray-800 dark:text-gray-200">
                                    {shareText && `${shareText} : `}
                                </span>
                                <span className="text-[#FF75A0] dark:text-[#FF75A0] font-mono break-all sm:break-normal whitespace-nowrap sm:whitespace-normal overflow-hidden text-ellipsis">
                                    {generatedLink}
                                </span>
                            </div>
                        </div>
                        
                        {/* Copy button */}
                        <button
                            onClick={copyToClipboard}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-200 group"
                            title={copied ? "Copied!" : "Copy message"}
                        >
                            {copied ? (
                                <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                            ) : (
                                <Copy className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300" />
                            )}
                        </button>
                    </div>
                </div>
                
                {/* Copy feedback */}
                {copied && (
                    <p className="text-xs text-green-600 dark:text-green-400 mt-2 text-center font-medium">
                        ✅ Copied to clipboard!
                    </p>
                )}
            </div>
            
            {/* Share buttons section */}
            <div className="space-y-3">
                {/* Social Media Share Buttons */}
                <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 font-medium uppercase tracking-wide text-center">
                        Share directly to:
                    </p>
                    <div className="flex flex-row gap-2 sm:gap-3 w-full">
                        {/* WhatsApp and Telegram buttons */}
                        <SocialShareButtons
                            title=""
                            text={shareText}
                            url={generatedLink}
                        />
                        
                        {/* Others button (replacing Instagram) - styled to match other buttons */}
                        <div className="flex-1">
                            <div className="h-11">
                                <ShareButton
                                    title=""
                                    text={shareText}
                                    url={generatedLink}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
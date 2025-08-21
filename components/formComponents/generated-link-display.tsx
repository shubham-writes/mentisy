import { ShareButton, SocialShareButtons } from "../share-button";
import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface GeneratedLinkDisplayProps {
    generatedLink: string;
    publicNote: string;
}

export function GeneratedLinkDisplay({ generatedLink, publicNote }: GeneratedLinkDisplayProps) {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = async () => {
        try {
            const textToCopy = `${publicNote} ${generatedLink}`;
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
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center text-base sm:text-lg mx-auto mb-3">
                    🎉
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-emerald-800 dark:text-emerald-200 mb-2">
                    Your secret is ready!
                </h4>
                <p className="text-xs sm:text-sm text-emerald-700 dark:text-emerald-300 px-2">
                    Send this link - it will disappear after viewing
                </p>
            </div>
            
            <div className="bg-white/80 dark:bg-gray-900/60 backdrop-blur-sm rounded-lg p-3 sm:p-4 mb-4 border border-emerald-200 dark:border-emerald-800">
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 font-medium uppercase tracking-wide">Message to copy & send:</p>
                
                {/* Message container with copy button */}
                <div className="relative bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <div className="flex items-center">
                        {/* Text content - scrollable on mobile */}
                        <div className="flex-1 p-3 pr-12 overflow-hidden">
                            <div className="text-sm">
                                <span className="font-medium text-gray-800 dark:text-gray-200">
                                    {publicNote && `${publicNote} : `}
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
                    <SocialShareButtons
                        title="A Secret Message"
                        text={publicNote}
                        url={generatedLink}
                    />
                </div>
                
                {/* Divider */}
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 px-2 text-gray-500 dark:text-gray-400">
                            or
                        </span>
                    </div>
                </div>
                
                {/* General Share Button */}
                <div className="flex justify-center">
                    <div className="w-full sm:w-fit">
                        <ShareButton
                            title="A Secret Message"
                            text={publicNote}
                            url={generatedLink}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
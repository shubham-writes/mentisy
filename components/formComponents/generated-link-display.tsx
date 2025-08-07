import { ShareButton } from "../share-button";

interface GeneratedLinkDisplayProps {
    generatedLink: string;
    publicNote: string;
}

export function GeneratedLinkDisplay({ generatedLink, publicNote }: GeneratedLinkDisplayProps) {
    return (
        <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-6 shadow-lg">
            <div className="text-center mb-5">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center text-lg mx-auto mb-3">
                    🎉
                </div>
                <h4 className="text-xl font-bold text-emerald-800 dark:text-emerald-200 mb-2">
                    Your secret is ready!
                </h4>
                <p className="text-sm text-emerald-700 dark:text-emerald-300">
                    Send this link - it will disappear after viewing
                </p>
            </div>
            
            <div className="bg-white/80 dark:bg-gray-900/60 backdrop-blur-sm rounded-lg p-4 mb-4 border border-emerald-200 dark:border-emerald-800">
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 font-medium uppercase tracking-wide">Message to copy & send:</p>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 text-sm">
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
            
            <div className="flex justify-center">
                <div className="w-fit">
                    <ShareButton
                        title="A Secret Message"
                        text={publicNote || "Someone sent you a secret message!"}
                        url={generatedLink}
                    />
                </div>
            </div>
        </div>
    );
}
import { ShareButton } from "../share-button";

interface GeneratedLinkDisplayProps {
    generatedLink: string;
    publicNote: string;
}

export function GeneratedLinkDisplay({ generatedLink, publicNote }: GeneratedLinkDisplayProps) {
    return (
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
    );
}
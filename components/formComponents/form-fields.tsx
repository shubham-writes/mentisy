import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCaseTemplates } from '../use-case-templates';

type GameMode = "none" | "scratch_and_see" | "qa_challenge" | "reveal_rush";

interface FormFieldsProps {
    recipientName: string;
    publicNote: string;
    message: string;
    onRecipientNameChange: (value: string) => void;
    onPublicNoteChange: (value: string) => void;
    onMessageChange: (value: string) => void;
    useCase?: string;
    gameMode?: GameMode;
    uploadedFile?: { url: string; type: "image" | "video" } | null;
}

export function FormFields({ 
    recipientName, 
    publicNote, 
    message, 
    onRecipientNameChange, 
    onPublicNoteChange, 
    onMessageChange,
    useCase,
    gameMode = "none",
    uploadedFile
}: FormFieldsProps) {
    const template = useCase ? useCaseTemplates[useCase as keyof typeof useCaseTemplates] : null;
    
    // Determine what fields to show based on context
    const isGroupGame = gameMode === "reveal_rush";
    const isSinglePlayerGame = gameMode === "qa_challenge";
    const isSimpleMode = gameMode === "none" || gameMode === "scratch_and_see";
    
    // Show recipient field only for non-group games
    const showRecipientField = !isGroupGame;
    
    // Adapt messaging based on context
    const getPublicNoteLabel = () => {
        if (isGroupGame) return "Challenge description";
        if (isSinglePlayerGame) return "Teaser message";
        return "Teaser message";
    };
    
    const getPublicNotePlaceholder = () => {
        if (isGroupGame) return "Challenge your group to solve this...";
        if (isSinglePlayerGame) return "Think you can answer this? 🤔";
        return template?.placeholder.publicNote || "you're not ready for this... or whatever fits the vibe";
    };
    
    const getMessageLabel = () => {
        if (isGroupGame) return "Winner's reward message";
        if (isSinglePlayerGame) return "Reveal Message / Caption";
        return "Reveal Message / Caption";
    };
    
    const getMessagePlaceholder = () => {
        if (isGroupGame) return "Congrats! You solved it first 🏆";
        if (isSinglePlayerGame) return "You got it right! Here's what I wanted to tell you...";
        return template?.placeholder.message || "A hidden note, roast, or caption that unlocks with the photo/video";
    };

    return (
        <div className="space-y-4">
            {/* Compact Header - Similar to game headers */}
            <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800/50 dark:to-blue-900/20 rounded-lg border border-gray-200/50 dark:border-gray-700/50">
                <span className="text-lg">✍️</span>
                <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 text-sm">Message Details</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                        {isGroupGame ? "Set up your group challenge" : 
                         isSinglePlayerGame ? "Configure your puzzle message" : 
                         "Customize your secret message"}
                    </p>
                </div>
            </div>

            {/* Compact form fields */}
            <div className="space-y-3">
                {/* Recipient Name Field - Only for non-group games */}
                {showRecipientField && (
                    <div>
                        <Label htmlFor="recipient" className="text-sm font-medium mb-2 block text-gray-800 dark:text-gray-200">
                            Who&apos;s this for? <span className="text-xs text-gray-500 dark:text-gray-400">(Optional)</span>
                        </Label>
                        <Input
                            id="recipient"
                            placeholder={template?.placeholder.recipient || "Their name, their vibe, whatever..."}
                            value={recipientName}
                            onChange={(e) => onRecipientNameChange(e.target.value)}
                            className="h-11 text-sm rounded-lg border-2 border-gray-200 dark:border-gray-600 focus:border-[#FF75A0] dark:focus:border-[#FF75A0] focus:ring-0 focus:outline-none px-3 transition-colors duration-200"
                        />
                    </div>
                )}

                {/* Public Note Field - Contextual labeling */}
                <div>
                    <Label htmlFor="public-note" className="text-sm font-medium mb-2 block text-gray-800 dark:text-gray-200">
                        {getPublicNoteLabel()} <span className="text-xs text-gray-500 dark:text-gray-400">
                            {isGroupGame ? "(What participants see)" : "(What they'll see first)"}
                        </span>
                    </Label>
                    <Input
                        id="public-note"
                        placeholder={getPublicNotePlaceholder()}
                        value={publicNote}
                        onChange={(e) => onPublicNoteChange(e.target.value)}
                        className="h-11 text-sm rounded-lg border-2 border-gray-200 dark:border-gray-600 focus:border-[#FF75A0] dark:focus:border-[#FF75A0] focus:ring-0 focus:outline-none px-3 transition-colors duration-200"
                    />
                </div>

                {/* Secret Message Field - Contextual labeling */}
                <div>
                    <Label htmlFor="secret-message" className="text-sm font-medium mb-2 block text-gray-800 dark:text-gray-200">
                        {getMessageLabel()} <span className="text-xs text-gray-500 dark:text-gray-400">(Optional)</span>
                    </Label>
                    <Input
                        id="secret-message"
                        placeholder={getMessagePlaceholder()}
                        value={message}
                        onChange={(e) => onMessageChange(e.target.value)}
                        className="h-11 text-sm rounded-lg border-2 border-gray-200 dark:border-gray-600 focus:border-[#FF75A0] dark:focus:border-[#FF75A0] focus:ring-0 focus:outline-none px-3 transition-colors duration-200"
                    />
                </div>
            </div>

            {/* Context-specific status indicator */}
            {(publicNote || message) && (
                <div className="flex items-center space-x-2 p-2 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200/50 dark:border-green-700/50">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <p className="text-sm text-green-700 dark:text-green-300">
                        {isGroupGame ? "Challenge configured" : 
                         isSinglePlayerGame ? "Puzzle message ready" : 
                         "Message details set"}
                    </p>
                </div>
            )}
        </div>
    );
}
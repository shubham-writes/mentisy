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
    
    // NEW: Determine if file is uploaded
    const hasUploadedFile = !!uploadedFile;
    
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
    
    // NEW: Dynamic label and placeholder based on file upload status
    const getMessageLabel = () => {
        return hasUploadedFile ? "Caption" : "Message";
    };
    
    const getMessagePlaceholder = () => {
        if (hasUploadedFile) {
            // When file is uploaded, show caption-specific placeholders
            if (isGroupGame) return "Congrats! You solved it first 🏆";
            if (isSinglePlayerGame) return "You got it right! Here's what I wanted to tell you...";
            return "Add a caption to your photo/video...";
        } else {
            // When no file is uploaded, show message-specific placeholders
            return template?.placeholder.message || "Your message that will disappear after being read...";
        }
    };

    // NEW: Dynamic validation message
    const getValidationMessage = () => {
        return hasUploadedFile ? "Caption added" : "Message added";
    };

    return (
        <div className="space-y-4">
            {/* Compact form fields */}
            <div className="space-y-3">
                {/* COMMENTED OUT - Recipient Name Field - Only for non-group games */}
                {/* {showRecipientField && (
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
                )} */}

                {/* COMMENTED OUT - Public Note Field - Contextual labeling */}
                {/* <div>
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
                </div> */}

                {/* UPDATED: Caption/Message Field - Dynamic based on file upload status */}
                <div>
                    <Label htmlFor="message" className="text-sm font-medium mb-2 block text-gray-800 dark:text-gray-200">
                        {getMessageLabel()} <span className="text-xs text-gray-500 dark:text-gray-400">(Optional)</span>
                    </Label>
                    <Input
                        id="message"
                        placeholder={getMessagePlaceholder()}
                        value={message}
                        onChange={(e) => onMessageChange(e.target.value)}
                        className="h-11 text-sm rounded-lg border-2 border-gray-200 dark:border-gray-600 focus:border-[#FF75A0] dark:focus:border-[#FF75A0] focus:ring-0 focus:outline-none px-3 transition-colors duration-200"
                    />
                </div>
            </div>

            {/* UPDATED: Context-specific status indicator - Dynamic validation message */}
            {message && (
                <div className="flex items-center space-x-2 p-2 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200/50 dark:border-green-700/50">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <p className="text-sm text-green-700 dark:text-green-300">
                        {getValidationMessage()}
                    </p>
                </div>
            )}
        </div>
    );
}
// components/form-fields.tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCaseTemplates } from '../use-case-templates';
import { GameMode } from "@/lib/types";

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
    
    // ✅ Add props for the Yes/No captions
    yesCaption?: string;
    onYesCaptionChange?: (value: string) => void;
    noCaption?: string;
    onNoCaptionChange?: (value: string) => void;
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
    uploadedFile,
    yesCaption,
    onYesCaptionChange,
    noCaption,
    onNoCaptionChange
}: FormFieldsProps) {
    const template = useCase ? useCaseTemplates[useCase as keyof typeof useCaseTemplates] : null;
    const hasUploadedFile = !!uploadedFile || gameMode === 'yes_or_no';

    const getMessageLabel = () => hasUploadedFile ? "Caption" : "Message";
    const getMessagePlaceholder = () => {
        if (hasUploadedFile) return "Add a caption to your moment...";
        return template?.placeholder.message || "Your message that will disappear after being read...";
    };

    return (
        <div className="space-y-4">
            {/* ✅ Main conditional logic for captions */}
            {gameMode === 'yes_or_no' ? (
                // Show two separate caption inputs for the Yes/No game
                <div className="space-y-3">
                    <div>
                        <Label htmlFor="yes-caption" className="text-sm font-medium mb-2 block text-gray-800 dark:text-gray-200">
                            Caption for &ldquo;Yes&ldquo; Image <span className="text-xs text-gray-500 dark:text-gray-400">(Optional)</span>
                        </Label>
                        <Input
                            id="yes-caption"
                            placeholder="e.g., You got it right! 🎉"
                            value={yesCaption}
                            onChange={(e) => onYesCaptionChange?.(e.target.value)}
                            className="h-11 text-sm rounded-lg"
                        />
                    </div>
                    <div>
                        <Label htmlFor="no-caption" className="text-sm font-medium mb-2 block text-gray-800 dark:text-gray-200">
                            Caption for &ldquo;No&ldquo; Image <span className="text-xs text-gray-500 dark:text-gray-400">(Optional)</span>
                        </Label>
                        <Input
                            id="no-caption"
                            placeholder="e.g., So close! Better luck next time."
                            value={noCaption}
                            onChange={(e) => onNoCaptionChange?.(e.target.value)}
                            className="h-11 text-sm rounded-lg"
                        />
                    </div>
                </div>
            ) : (
                // Show the original single caption/message input for all other cases
                <div>
                    <Label htmlFor="message" className="text-sm font-medium mb-2 block text-gray-800 dark:text-gray-200">
                        {getMessageLabel()} <span className="text-xs text-gray-500 dark:text-gray-400">(Optional)</span>
                    </Label>
                    <Input
                        id="message"
                        placeholder={getMessagePlaceholder()}
                        value={message}
                        onChange={(e) => onMessageChange(e.target.value)}
                        className="h-11 text-sm rounded-lg"
                    />
                </div>
            )}
        </div>
    );
}
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCaseTemplates } from '../use-case-templates';

interface FormFieldsProps {
    recipientName: string;
    publicNote: string;
    message: string;
    onRecipientNameChange: (value: string) => void;
    onPublicNoteChange: (value: string) => void;
    onMessageChange: (value: string) => void;
    useCase?: string;
}

export function FormFields({ 
    recipientName, 
    publicNote, 
    message, 
    onRecipientNameChange, 
    onPublicNoteChange, 
    onMessageChange,
    useCase 
}: FormFieldsProps) {
    const template = useCase ? useCaseTemplates[useCase as keyof typeof useCaseTemplates] : null;
    
    return (
        <div className="space-y-4 sm:space-y-6 lg:space-y-8">
            {/* Recipient Name Field - Mobile Optimized */}
            <div>
                <Label 
                    htmlFor="recipient" 
                    className="text-sm sm:text-base font-semibold mb-2 sm:mb-3 lg:mb-4 block text-gray-800 dark:text-gray-200"
                >
                    Who&apos;s this for? (Optional)
                </Label>
                <Input
                    id="recipient"
                    placeholder={template?.placeholder.recipient || "Their name, their vibe, whatever..."}
                    value={recipientName}
                    onChange={(e) => onRecipientNameChange(e.target.value)}
                    className="h-12 sm:h-13 lg:h-14 text-sm sm:text-base rounded-lg sm:rounded-xl border-2 border-gray-200 dark:border-gray-600 focus:border-[#FF75A0] dark:focus:border-[#FF75A0] focus:ring-[#FF75A0] focus:outline-none px-3 sm:px-4 transition-colors duration-200"
                />
            </div>

            {/* Public Note Field - Mobile Optimized */}
            <div>
                <Label 
                    htmlFor="public-note" 
                    className="text-sm sm:text-base font-semibold mb-2 sm:mb-3 lg:mb-4 block text-gray-800 dark:text-gray-200"
                >
                    Teaser message <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">(What they&apos;ll see first)</span>
                </Label>
                <Input
                    id="public-note"
                    placeholder={template?.placeholder.publicNote || "'you're not ready for this...' or whatever fits the vibe"}
                    value={publicNote}
                    onChange={(e) => onPublicNoteChange(e.target.value)}
                    className="h-12 sm:h-13 lg:h-14 text-sm sm:text-base rounded-lg sm:rounded-xl border-2 border-gray-200 dark:border-gray-600 focus:border-[#FF75A0] dark:focus:border-[#FF75A0] focus:ring-[#FF75A0] focus:outline-none px-3 sm:px-4 transition-colors duration-200"
                />
            </div>

            {/* Secret Message Field - Mobile Optimized */}
            <div>
                <Label 
                    htmlFor="secret-message" 
                    className="text-sm sm:text-base font-semibold mb-2 sm:mb-3 lg:mb-4 block text-gray-800 dark:text-gray-200"
                >
                    Your secret message <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">(Optional)</span>
                </Label>
                <Input
                    id="secret-message"
                    placeholder={template?.placeholder.message || "That thing you've been wanting to say..."}
                    value={message}
                    onChange={(e) => onMessageChange(e.target.value)}
                    className="h-12 sm:h-13 lg:h-14 text-sm sm:text-base rounded-lg sm:rounded-xl border-2 border-gray-200 dark:border-gray-600 focus:border-[#FF75A0] dark:focus:border-[#FF75A0] focus:ring-[#FF75A0] focus:outline-none px-3 sm:px-4 transition-colors duration-200"
                />
            </div>
        </div>
    );
}
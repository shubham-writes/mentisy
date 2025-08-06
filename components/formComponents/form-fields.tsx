import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormFieldsProps {
    recipientName: string;
    publicNote: string;
    message: string;
    onRecipientNameChange: (value: string) => void;
    onPublicNoteChange: (value: string) => void;
    onMessageChange: (value: string) => void;
}

export function FormFields({ 
    recipientName, 
    publicNote, 
    message, 
    onRecipientNameChange, 
    onPublicNoteChange, 
    onMessageChange 
}: FormFieldsProps) {
    return (
        <div className="space-y-8">
            <div>
                <Label htmlFor="recipient" className="text-base font-semibold mb-4 block text-gray-800 dark:text-gray-200">
                    Who&apos;s this for? (Optional)
                </Label>
                <Input
                    id="recipient"
                    placeholder="Their name, their vibe, whatever..."
                    value={recipientName}
                    onChange={(e) => onRecipientNameChange(e.target.value)}
                    className="h-14 text-base rounded-xl border-2 border-gray-200 dark:border-gray-600 focus:border-[#FF75A0] dark:focus:border-[#FF75A0] focus:ring-[#FF75A0] px-4"
                />
            </div>

            <div>
                <Label htmlFor="public-note" className="text-base font-semibold mb-4 block text-gray-800 dark:text-gray-200">
                    Teaser message (What they&apos;ll see first)
                </Label>
                <Input
                    id="public-note"
                    placeholder="'you're not ready for this...' or whatever fits the vibe"
                    value={publicNote}
                    onChange={(e) => onPublicNoteChange(e.target.value)}
                    className="h-14 text-base rounded-xl border-2 border-gray-200 dark:border-gray-600 focus:border-[#FF75A0] dark:focus:border-[#FF75A0] focus:ring-[#FF75A0] px-4"
                />
            </div>

            <div>
                <Label htmlFor="secret-message" className="text-base font-semibold mb-4 block text-gray-800 dark:text-gray-200">
                    Your secret message (Optional)
                </Label>
                <Input
                    id="secret-message"
                    placeholder="That thing you've been wanting to say..."
                    value={message}
                    onChange={(e) => onMessageChange(e.target.value)}
                    className="h-14 text-base rounded-xl border-2 border-gray-200 dark:border-gray-600 focus:border-[#FF75A0] dark:focus:border-[#FF75A0] focus:ring-[#FF75A0] px-4"
                />
            </div>
        </div>
    );
}
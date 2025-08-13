// components/secret-page/StandaloneMessage.tsx
import { Doc } from "@/convex/_generated/dataModel";
import { CountdownTimer } from "@/components/countdown-timer";
import { MessageDisplay } from "@/components/secret-page/MessageDisplay";

interface StandaloneMessageProps {
  secret: Doc<"secrets">;
  isMediaLoading: boolean;
  expandedMessages: { [key: string]: boolean };
  onTimerComplete: () => Promise<void>;
  onToggleMessage: (messageId: string) => void;
}

export function StandaloneMessage({
  secret,
  isMediaLoading,
  expandedMessages,
  onTimerComplete,
  onToggleMessage
}: StandaloneMessageProps) {
  if (!secret.message || secret.fileUrl) {
    return null;
  }

  return (
    <div className="relative max-w-sm sm:max-w-xl mx-auto mb-6 sm:mb-8 p-6 sm:p-8 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl">
      {!isMediaLoading && (
        <CountdownTimer 
          initialSeconds={secret.duration || 10} 
          onComplete={onTimerComplete} 
        />
      )}
      
      <div className="text-center mb-4">
        <span className="text-2xl sm:text-3xl">📧</span>
      </div>
      
      <MessageDisplay
        message={secret.message}
        messageId="standalone"
        expandedMessages={expandedMessages}
        onToggleExpansion={onToggleMessage}
        className="text-base sm:text-lg md:text-xl font-medium text-gray-800 dark:text-gray-200 text-center leading-relaxed px-2"
      />
    </div>
  );
}
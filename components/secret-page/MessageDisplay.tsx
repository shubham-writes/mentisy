// components/secret-page/MessageDisplay.tsx
import { truncateMessage } from "@/lib/messageUtils";

interface MessageDisplayProps {
  message: string;
  messageId: string;
  expandedMessages: { [key: string]: boolean };
  onToggleExpansion: (messageId: string) => void;
  className?: string;
  maxLength?: number;
  showReadMore?: boolean;
}

export function MessageDisplay({
  message,
  messageId,
  expandedMessages,
  onToggleExpansion,
  className = "",
  maxLength = 100,
  showReadMore = true
}: MessageDisplayProps) {
  const isExpanded = expandedMessages[messageId];
  const needsTruncation = message.length > maxLength;
  
  return (
    <div className={className}>
      <blockquote className="text-sm sm:text-base font-medium text-gray-800 dark:text-gray-200 text-center leading-relaxed">
        &ldquo;{isExpanded || !needsTruncation
          ? message
          : truncateMessage(message, maxLength)
        }&rdquo;
      </blockquote>
      {needsTruncation && showReadMore && (
        <button
          onClick={() => onToggleExpansion(messageId)}
          className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 text-xs sm:text-sm font-medium mt-3 block mx-auto transition-colors"
        >
          {isExpanded ? 'Read less' : 'Read more'}
        </button>
      )}
    </div>
  );
}
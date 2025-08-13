// lib/utils/messageUtils.ts

export const truncateMessage = (message: string, maxLength: number = 100) => {
  if (message.length <= maxLength) return message;
  return message.substring(0, maxLength) + '...';
};

export const toggleMessageExpansion = (
  messageId: string,
  expandedMessages: { [key: string]: boolean },
  setExpandedMessages: (updater: (prev: { [key: string]: boolean }) => { [key: string]: boolean }) => void
) => {
  setExpandedMessages(prev => ({
    ...prev,
    [messageId]: !prev[messageId]
  }));
};
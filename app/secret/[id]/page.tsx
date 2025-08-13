// app/secret/[id]/page.tsx (Refactored)
"use client";

import { useSecretPage } from "@/hooks/useSecretPage";
import { LoadingComponent } from "@/components/secret-page/LoadingComponent";
import { ErrorStates } from "@/components/secret-page/ErrorStates";
import { ImageContent } from "@/components/secret-page/ImageContent";
import { VideoContent } from "@/components/secret-page/VideoContent";
import { StandaloneMessage } from "@/components/secret-page/StandaloneMessage";

export default function SecretPage({ params }: { params: { id: string } }) {
  const {
    secret,
    isMediaLoading,
    duration,
    hasStarted,
    bufferedPercent,
    showVideo,
    receiverIp,
    hasExpiredDuringViewing,
    expandedMessages,
    videoRef,
    handleTimerComplete,
    handleMediaLoad,
    handleUserPlay,
    toggleMessageExpansion,
    isSecretExpiredOrAlreadyViewed,
    setBufferedPercent,
    setDuration
  } = useSecretPage(params.id);

  const renderContent = () => {
    // Loading state
    if (secret === undefined) {
      return <LoadingComponent type="revealing" />;
    }

    // Error states
    if (secret === null || isSecretExpiredOrAlreadyViewed(secret)) {
      return <ErrorStates type="not-found" />;
    }

    if (hasExpiredDuringViewing) {
      return <ErrorStates type="expired" />;
    }

    const showLoadingIndicator = secret.fileUrl && isMediaLoading;
    const secureFileUrl = secret.fileUrl || "";

    return (
      <>
        {showLoadingIndicator && (
          <LoadingComponent type="unwrapping" progress={bufferedPercent} />
        )}

        <div style={{ visibility: showLoadingIndicator ? "hidden" : "visible" }}>
          {/* Image Content */}
          {secret.fileType === "image" && secret.fileUrl && (
            <ImageContent
              secret={secret}
              secureFileUrl={secureFileUrl}
              receiverIp={receiverIp}
              isMediaLoading={isMediaLoading}
              expandedMessages={expandedMessages}
              onMediaLoad={handleMediaLoad}
              onTimerComplete={handleTimerComplete}
              onToggleMessage={toggleMessageExpansion}
            />
          )}

          {/* Video Content */}
          {secret.fileType === "video" && secret.fileUrl && (
            <VideoContent
              secret={secret}
              secureFileUrl={secureFileUrl}
              receiverIp={receiverIp}
              showVideo={showVideo}
              hasStarted={hasStarted}
              isMediaLoading={isMediaLoading}
              duration={duration}
              bufferedPercent={bufferedPercent}
              expandedMessages={expandedMessages}
              onMediaLoad={handleMediaLoad}
              onTimerComplete={handleTimerComplete}
              onToggleMessage={toggleMessageExpansion}
              onUserPlay={handleUserPlay}
              setBufferedPercent={setBufferedPercent}
              setDuration={setDuration}
              videoRef={videoRef}
            />
          )}

          {/* Standalone Message */}
          <StandaloneMessage
            secret={secret}
            isMediaLoading={isMediaLoading}
            expandedMessages={expandedMessages}
            onTimerComplete={handleTimerComplete}
            onToggleMessage={toggleMessageExpansion}
          />
        </div>
      </>
    );
  };

  const getHeading = () => {
    if (secret === null ||
        secret === undefined ||
        hasExpiredDuringViewing ||
        isSecretExpiredOrAlreadyViewed(secret)) {
      return "Secret Message";
    }

    if (secret && secret.recipientName) {
      return `A Secret Message For ${secret.recipientName}`;
    }
    return "A Secret Message For You";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FF75A0]/5 via-white to-[#FFAA70]/5 dark:from-[#FF75A0]/10 dark:via-gray-950 dark:to-[#FFAA70]/10 flex flex-col items-center justify-center sm:py-8 px-2 sm:px-4">
      <div className="w-full max-w-full mt-16 sm:max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] rounded-full flex items-center justify-center text-xl sm:text-2xl mx-auto mb-4 sm:mb-6 shadow-lg">
            🎁
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] bg-clip-text text-transparent leading-tight px-2">
            {getHeading()}
          </h1>
        </div>

        {/* Content */}
        {renderContent()}

        {/* Actions (if needed) */}
        {secret && !isSecretExpiredOrAlreadyViewed(secret) && !hasExpiredDuringViewing && (
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-full sm:max-w-2xl mx-auto px-2">
            {/* Action buttons can be added here if needed */}
          </div>
        )}
      </div>
    </div>
  );
}
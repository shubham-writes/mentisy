// components/secret-page/ImageContent.tsx
import Image from "next/image";
import { Doc } from "@/convex/_generated/dataModel";
import { Watermark } from "@/components/watermark";
import { CountdownTimer } from "@/components/countdown-timer";
import { ScratchGame } from "@/components/scratch-game";
import { QAGame } from "@/components/qa-game";
import { MicroQuestGame } from "@/components/reveal-rush-game";
import { MessageDisplay } from "@/components/secret-page/MessageDisplay";
import { YesNoGame } from "@/components/yes-no-game";

interface ImageContentProps {
  secret: Doc<"secrets">;
  secureFileUrl: string;
  receiverIp: string | null;
  isMediaLoading: boolean;
  expandedMessages: { [key: string]: boolean };
  onMediaLoad: () => void;
  onTimerComplete: () => Promise<void>;
  onToggleMessage: (messageId: string) => void;
}

export function ImageContent({
  secret,
  secureFileUrl,
  receiverIp,
  isMediaLoading,
  expandedMessages,
  onMediaLoad,
  onTimerComplete,
  onToggleMessage
}: ImageContentProps) {
  // ... (Other game modes like 'scratch_and_see', 'qa_challenge', etc. are unchanged)
  if (secret.gameMode === 'scratch_and_see') {
    return (
      <>
        <div className="relative w-full max-w-full sm:max-w-lg mx-auto mb-4 rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-2 sm:p-4">
          <div className="relative">
            <ScratchGame
              imageUrl={secureFileUrl}
              onImageReady={onMediaLoad}
              onScratchComplete={() => console.log("Game completed!")}
              recipientName={secret.recipientName}
              receiverIp={receiverIp}
              withWatermark={secret.withWatermark}
            />
            {!isMediaLoading && (
              <CountdownTimer 
                initialSeconds={secret.duration || 10} 
                onComplete={onTimerComplete} 
              />
            )}
          </div>
        </div>
        
        {secret.message && (
          <div className="max-w-full sm:max-w-lg mx-auto mb-6 sm:mb-8 p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-200/50 dark:border-blue-700/50 shadow-lg">
            <MessageDisplay
              message={secret.message}
              messageId="scratch"
              expandedMessages={expandedMessages}
              onToggleExpansion={onToggleMessage}
            />
          </div>
        )}
      </>
    );
  }

  if (secret.gameMode === 'qa_challenge') {
    return (
      <div className="relative w-full max-w-full sm:max-w-lg mx-auto mb-4 rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-2 sm:p-4">
        <QAGame
          imageUrl={secureFileUrl}
          question={secret.qaQuestion || "What's the answer?"}
          correctAnswer={secret.qaAnswer || "answer"}
          onImageReady={onMediaLoad}
          onAnswerCorrect={() => {
            console.log("Q&A Challenge completed!");
          }}
          recipientName={secret.recipientName}
          receiverIp={receiverIp}
          withWatermark={secret.withWatermark}
          message={secret.message}
          expandedMessages={expandedMessages}
          onToggleMessage={onToggleMessage}
          maxAttempts={secret.qaMaxAttempts || 3}
          caseSensitive={secret.qaCaseSensitive || false}
          showHints={secret.qaShowHints ?? true}
          timerComponent={!isMediaLoading ? (
            <CountdownTimer 
              initialSeconds={secret.duration || 10} 
              onComplete={onTimerComplete} 
            />
          ) : null}
        />
      </div>
    );
  }

  if (secret.gameMode === 'reveal_rush') {
    return (
      <MicroQuestGame
        secret={secret}
        onImageReady={onMediaLoad}
        receiverIp={receiverIp}
        timerComponent={!isMediaLoading ? (
          <CountdownTimer 
            initialSeconds={secret.duration || 10} 
            onComplete={onTimerComplete} 
          />
        ) : null}
      />
    );
  }

  // ✅ THIS IS THE SECTION TO UPDATE
   if (secret.gameMode === 'yes_or_no') {
    return (
       <div className="relative w-full max-w-full sm:max-w-lg mx-auto mb-4 p-2 sm:p-4">
        <YesNoGame
            question={secret.yesNoQuestion || "Yes or No?"}
            yesImageUrl={secret.yesImageUrl ?? ''}
            noImageUrl={secret.noImageUrl ?? ''}
            onImageReady={onMediaLoad}
            recipientName={secret.recipientName}
            receiverIp={receiverIp ?? undefined} 
            withWatermark={secret.withWatermark}
            
            // ✅ PASS the caption props from the secret object down to the game
            yesCaption={secret.yesCaption}
            noCaption={secret.noCaption}

            timerComponent={!isMediaLoading ? (
              <CountdownTimer 
                initialSeconds={secret.duration || 10} 
                onComplete={onTimerComplete} 
              />
            ) : null}
        />
       </div>
    );
  }

  // Default/No Game Mode - Regular Image
  return (
    <div className="relative w-full max-w-full sm:max-w-lg mx-auto mb-6 sm:mb-8 rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-2 sm:p-4">
      <div className="relative w-full h-[80vh] sm:max-h-96 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700">
        <Image
          src={secureFileUrl}
          alt="Secret Image"
          fill
          style={{ objectFit: "contain" }}
          onLoad={onMediaLoad}
          onError={() => {
            console.error("Failed to load image");
          }}
          priority
          className="rounded-xl"
        />
        
        {secret.withWatermark && (
          <Watermark name={secret.recipientName} ip={receiverIp ?? undefined} />
        )}

        {!isMediaLoading && (
          <CountdownTimer 
            initialSeconds={secret.duration || 10} 
            onComplete={onTimerComplete} 
          />
        )}

        {secret.message && (
          <div className="absolute bottom-0 left-0 right-0 bg-black/40 backdrop-blur-sm text-white p-3 sm:p-4">
            <MessageDisplay
              message={secret.message}
              messageId="image"
              expandedMessages={expandedMessages}
              onToggleExpansion={onToggleMessage}
              className=""
            />
          </div>
        )}
      </div>
    </div>
  );
}
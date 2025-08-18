// components/secret-page/VideoContent.tsx
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Doc } from "@/convex/_generated/dataModel";
import { Watermark } from "@/components/watermark";
import { CountdownTimer } from "@/components/countdown-timer";
import { MessageDisplay } from "@/components/secret-page/MessageDisplay";

interface VideoContentProps {
  secret: Doc<"secrets">;
  secureFileUrl: string;
  receiverIp: string | null;
  showVideo: boolean;
  hasStarted: boolean;
  isMediaLoading: boolean;
  duration: number | null;
  bufferedPercent: number;
  expandedMessages: { [key: string]: boolean };
  onMediaLoad: () => void;
  onTimerComplete: () => Promise<void>;
  onToggleMessage: (messageId: string) => void;
  onUserPlay: () => void;
  setBufferedPercent: (percent: number) => void;
  setDuration: (duration: number) => void;
  videoRef: React.RefObject<HTMLVideoElement>;
}

export function VideoContent({
  secret,
  secureFileUrl,
  receiverIp,
  showVideo,
  hasStarted,
  isMediaLoading,
  duration,
  bufferedPercent,
  expandedMessages,
  onMediaLoad,
  onTimerComplete,
  onToggleMessage,
  onUserPlay,
  setBufferedPercent,
  setDuration,
  videoRef
}: VideoContentProps) {
  return (
    <div className="w-full max-w-full sm:max-w-2xl mx-auto mb-6 sm:mb-8">
      {/* Warning banner */}
      <div className="mb-3 sm:mb-4 p-3 sm:p-4 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border border-red-200/50 dark:border-red-700/50 rounded-xl flex items-center space-x-2">
  <span className="text-xl sm:text-2xl flex-shrink-0">🎉</span>
  <span className="font-semibold text-red-800 dark:text-red-300 text-sm sm:text-base">Live the Moment!</span>
  <span className="text-red-700 dark:text-red-400 text-s sm:text-base">- See it once, feel it forever!</span>
</div>


      {/* Video container */}
      <div className="relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl sm:rounded-2xl p-2 sm:p-4 shadow-xl">
        <div className="relative w-full rounded-lg sm:rounded-xl overflow-hidden">
          {showVideo && (
            <video
              ref={videoRef}
              src={secureFileUrl}
              playsInline
              preload="auto"
              className="w-full h-[80vh] sm:max-h-96 rounded-lg sm:rounded-xl pointer-events-none shadow-lg bg-black block"
              style={{ objectFit: "contain" }}
              onContextMenu={(e) => e.preventDefault()}
              onLoadedMetadata={(e) => {
                const video = e.currentTarget;
                const handleFullyBuffered = () => {
                  onMediaLoad();
                  setDuration(Math.ceil(video.duration));
                  video.removeEventListener("canplaythrough", handleFullyBuffered);
                };
                video.addEventListener("canplaythrough", handleFullyBuffered);
              }}
              onProgress={(e) => {
                const video = e.currentTarget;
                if (video.buffered.length > 0) {
                  const bufferedEnd = video.buffered.end(video.buffered.length - 1);
                  const duration = video.duration;
                  if (duration > 0) {
                    const percent = Math.min((bufferedEnd / duration) * 100, 100);
                    setBufferedPercent(percent);
                  }
                }
              }}
              onEnded={onTimerComplete}
            />
          )}

          {/* Watermark overlay */}
          {secret.withWatermark && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg sm:rounded-xl">
              <Watermark
                name={secret.recipientName}
                ip={receiverIp ?? undefined}
                animated={true}
                mode="video"
              />
            </div>
          )}

          {/* Timer */}
          {secret.fileType === "video" && hasStarted && !isMediaLoading && (
            <CountdownTimer
              initialSeconds={duration || 10}
              onComplete={onTimerComplete}
            />
          )}

          {/* Message overlay */}
          {secret.message && (
            <div className="absolute bottom-0 left-0 right-0 bg-black/40 backdrop-blur-sm text-white p-3 sm:p-4 z-10 pointer-events-none">
              <MessageDisplay
                message={secret.message}
                messageId="video"
                expandedMessages={expandedMessages}
                onToggleExpansion={onToggleMessage}
                className="pointer-events-none"
              />
            </div>
          )}
        </div>

        {/* Controls panel */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 mt-3 sm:mt-4 p-3 sm:p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg sm:rounded-xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
          {!hasStarted && (
            <Button
              onClick={onUserPlay}
              size="lg"
              className="w-full sm:w-auto h-11 sm:h-12 px-6 sm:px-8 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 border-0 shadow-lg transform hover:scale-105 transition-all rounded-xl text-white font-medium text-sm sm:text-base"
            >
              ▶️ Start Watching
            </Button>
          )}
          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-center sm:justify-start">
            <label htmlFor="volume" className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 flex-shrink-0">
              🔊 Volume
            </label>
            <input
              id="volume"
              type="range"
              min="0"
              max="1"
              step="0.05"
              defaultValue="1"
              onChange={(e) => {
                if (videoRef.current) {
                  videoRef.current.volume = parseFloat(e.target.value);
                }
              }}
              className="w-24 sm:w-32 h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
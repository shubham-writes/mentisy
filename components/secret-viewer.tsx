"use client";

import { Doc } from "@/convex/_generated/dataModel";
import Image from "next/image";
import { Watermark } from "./watermark";
import { CountdownTimer } from "./countdown-timer";
import { LoaderCircle } from "lucide-react";
import { useState, useRef } from "react";

interface SecretViewerProps {
  secret: Doc<"secrets"> | null;
  ip: string | null;
  onTimerComplete: () => void;
  onMediaLoad: () => void;
  onVideoMetadata: (event: React.SyntheticEvent<HTMLVideoElement, Event>) => void;
}

export function SecretViewer({ secret, ip, onTimerComplete, onMediaLoad, onVideoMetadata }: SecretViewerProps) {
  const [hasStarted, setHasStarted] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  if (!secret) return null;

  const secureFileUrl = secret.fileUrl ? `/api/stream/${secret._id}` : "";

  const handleUserPlay = () => {
    if (hasStarted || !videoRef.current) return;
    const video = videoRef.current;
    setHasStarted(true);
    video.play();
  };

  return (
    // This is the fullscreen overlay
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm p-4 text-white">
      <div className="relative w-full h-full max-w-4xl max-h-full flex flex-col items-center justify-center text-center">
        
        {/* The media content will be rendered here */}
        <div className="relative w-full flex-1">
          {secret.fileType === "image" && secureFileUrl && (
            <>
              <Image
                src={secureFileUrl}
                alt="Secret Image"
                fill
                style={{ objectFit: "contain" }}
                onLoad={onMediaLoad}
                priority
              />
              {secret.withWatermark && <Watermark name={secret.recipientName} ip={ip ?? undefined} animated={true} />}
            </>
          )}
          {secret.fileType === "video" && secureFileUrl && (
            <>
              <video
                ref={videoRef}
                src={secureFileUrl}
                playsInline
                className="w-full h-full object-contain"
                onLoadedMetadata={onVideoMetadata}
                onContextMenu={(e) => e.preventDefault()}
              />
              {secret.withWatermark && <Watermark name={secret.recipientName} ip={ip ?? undefined} animated={true}/>}
            </>
          )}
        </div>

        <div className="mt-4 flex flex-col items-center gap-y-4">
            {secret.message && (
              <p className="text-lg sm:text-xl p-4 bg-black bg-opacity-50 rounded-md">
                &ldquo;{secret.message}&rdquo;
              </p>
            )}

            {/* Video controls appear here */}
            {secret.fileType === "video" && (
                <div className="flex items-center justify-between gap-4">
                    {!hasStarted && (
                        <button onClick={handleUserPlay} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                            ▶️ Play
                        </button>
                    )}
                    <div className="flex items-center gap-2">
                        <label htmlFor="volume" className="text-sm font-medium">🔊 Volume</label>
                        <input id="volume" type="range" min="0" max="1" step="0.05" defaultValue="1"
                            onChange={(e) => {
                                if (videoRef.current) {
                                    videoRef.current.volume = parseFloat(e.target.value);
                                }
                            }}
                            className="w-32"
                        />
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}
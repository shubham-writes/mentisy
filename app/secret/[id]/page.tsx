"use client";

import { useEffect, useState, useRef } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id, Doc } from "@/convex/_generated/dataModel";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CountdownTimer } from "@/components/countdown-timer";
import { ShareButton } from "@/components/share-button";
import Image from "next/image";
import { LoaderCircle } from "lucide-react";

export default function SecretPage({ params }: { params: { id: string } }) {
  const [secret, setSecret] = useState<Doc<"secrets"> | null | undefined>(undefined);
  const [isMediaLoading, setIsMediaLoading] = useState(true);
  const [duration, setDuration] = useState<number | null>(null);
  const [hasStarted, setHasStarted] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hasRevealedRef = useRef(false);
  const revealSecret = useMutation(api.secrets.readAndReveal);

  useEffect(() => {
    if (hasRevealedRef.current) return;
    hasRevealedRef.current = true;

    const reveal = async () => {
      try {
        const revealedSecret = await revealSecret({ secretId: params.id as Id<"secrets"> });
        setSecret(revealedSecret);
        if (revealedSecret && !revealedSecret.fileUrl) {
          setIsMediaLoading(false);
        }
      } catch (error) {
        console.error("Failed to reveal secret:", error);
        setSecret(null);
      }
    };

    reveal();
  }, [params.id, revealSecret]);

  const handleTimerComplete = () => {
  videoRef.current?.pause();
  if (videoRef.current) {
    videoRef.current.src = "";
    videoRef.current.load();
  }
  setSecret(null);
};

  const handleMediaLoad = () => {
    setIsMediaLoading(false);
  };

  // Prevent tab switch — delete immediately
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setSecret(null);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  // Prevent pause using keyboard
  useEffect(() => {
    const preventKey = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", preventKey);
    return () => window.removeEventListener("keydown", preventKey);
  }, []);

  // Auto-resume if user pauses manually
  useEffect(() => {
    if (!videoRef.current) return;
    const video = videoRef.current;

    const handlePause = () => {
      if (hasStarted) {
        video.play();
      }
    };

    video.addEventListener("pause", handlePause);
    return () => video.removeEventListener("pause", handlePause);
  }, [hasStarted]);

  const handleUserPlay = () => {
    if (hasStarted || !videoRef.current) return;

    const video = videoRef.current;
    setHasStarted(true);
    video.play();
  };

  const renderContent = () => {
    if (secret === undefined) return <p>Revealing your secret...</p>;
    if (secret === null) return <p>This secret could not be found. It may have already been read or deleted.</p>;

    const showLoadingIndicator = secret.fileUrl && isMediaLoading;

    return (
      <>
        {showLoadingIndicator && (
          <div className="flex flex-col items-center justify-center h-64">
            <LoaderCircle className="h-8 w-8 animate-spin text-muted-foreground" />
            <p className="text-sm text-muted-foreground mt-2">Loading secret media...</p>
          </div>
        )}

        <div style={{ visibility: showLoadingIndicator ? "hidden" : "visible" }}>
          {secret.fileType === "image" && secret.fileUrl && (
            <div className="relative w-full h-64 mb-4 rounded-lg overflow-hidden">
              <Image
                src={secret.fileUrl}
                alt="Secret Image"
                fill
                style={{ objectFit: "contain" }}
                onLoad={handleMediaLoad}
                priority
              />
            </div>
          )}

          {secret.fileType === "video" && secret.fileUrl && (
  <>
    <p className="text-sm text-red-600 font-medium mb-2">
      ⚠️ One-time view: You cannot pause, replay, or download. Stay focused!
    </p>

    <div className="relative w-full">
      <video
        ref={videoRef}
        src={secret.fileUrl}
        playsInline
        preload="auto"
        className="w-full rounded-lg mb-2 pointer-events-none"
        onContextMenu={(e) => e.preventDefault()}
        onLoadedMetadata={(e) => {
          handleMediaLoad();
          setDuration(Math.ceil(e.currentTarget.duration));
        }}
        onEnded={handleTimerComplete}
      />
      <div className="flex items-center justify-between gap-4 mt-2">
        {!hasStarted && (
          <button
            onClick={handleUserPlay}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            ▶️ Play
          </button>
        )}
        <div className="flex items-center gap-2">
          <label htmlFor="volume" className="text-sm font-medium">
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
            className="w-32"
          />
        </div>
      </div>
    </div>
  </>
)}


          {secret.message && (
            <p className="text-lg sm:text-xl p-4 bg-muted rounded-md">
              &ldquo;{secret.message}&rdquo;
            </p>
          )}

          {/* Show timer only after user starts playing */}
          {hasStarted && duration && (
            <CountdownTimer initialSeconds={duration} onComplete={handleTimerComplete} />
          )}
        </div>
      </>
    );
  };

  const getHeading = () => {
    if (secret && secret.recipientName) {
      return `A Secret Message For ${secret.recipientName}`;
    }
    return "A Secret Message For You";
  };

  return (
    <div className="flex flex-col items-center justify-center text-center gap-y-8 flex-1">
      <div className="max-w-xl p-8 border rounded-lg bg-card shadow-lg">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4">{getHeading()}</h1>
        {renderContent()}
        <div className="flex items-center justify-center gap-x-4 mt-8">
          {secret && (
            <ShareButton
              title="A Secret Message"
              text={secret.publicNote || "Someone sent you a secret message!"}
              url={window.location.href}
            />
          )}
          <Button asChild>
            <Link href="/">Create your own secret message</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

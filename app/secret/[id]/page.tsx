"use client";

import { useEffect, useState, useRef } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id, Doc } from "@/convex/_generated/dataModel";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CountdownTimer } from "@/components/countdown-timer";
import { ShareButton } from "@/components/share-button";
import Image from "next/image";
import { LoaderCircle } from "lucide-react";
import { Watermark } from "@/components/watermark";

export default function SecretPage({ params }: { params: { id: string } }) {
    const [secret, setSecret] = useState<Doc<"secrets"> | null | undefined>(undefined);
    const [isMediaLoading, setIsMediaLoading] = useState(true);
    const [duration, setDuration] = useState<number | null>(null);
    const [hasStarted, setHasStarted] = useState(false);
    const [bufferedPercent, setBufferedPercent] = useState(0);
    const [showVideo, setShowVideo] = useState(true);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [receiverIp, setReceiverIp] = useState<string | null>(null);
    const [hasExpiredDuringViewing, setHasExpiredDuringViewing] = useState(false);
    const [videoRenderedSize, setVideoRenderedSize] = useState({ width: 0, height: 0 });
    const [isVideoSized, setIsVideoSized] = useState(false);

    const videoRef = useRef<HTMLVideoElement | null>(null);
    const hasRevealedRef = useRef(false);

    const revealSecret = useMutation(api.secrets.readAndReveal);
    const expireSecret = useMutation(api.secrets.expireSecret);

    const [videoBox, setVideoBox] = useState({ width: 0, height: 0, top: 0, left: 0 });

const updateVideoBox = () => {
  if (videoRef.current) {
    const rect = videoRef.current.getBoundingClientRect();
    // position relative to the wrapper
    const wrapperRect = videoRef.current.parentElement?.getBoundingClientRect();
    if (wrapperRect) {
      setVideoBox({
        width: rect.width,
        height: rect.height,
        top: rect.top - wrapperRect.top,
        left: rect.left - wrapperRect.left
      });
    }
  }
};


    useEffect(() => {
        if (hasRevealedRef.current) return;
        hasRevealedRef.current = true;

        const fetchIp = async () => {
            try {
                const res = await fetch("https://api64.ipify.org?format=json");
                const data = await res.json();
                setReceiverIp(data.ip);
            } catch (error) {
                console.error("Failed to fetch IP address:", error);
            }
        };

        const reveal = async () => {
            try {
                // Get user agent for basic analytics (no location tracking)
                const userAgent = navigator.userAgent;

                const revealedSecret = await revealSecret({ 
                    secretId: params.id as Id<"secrets">,
                   
                });

                setSecret(revealedSecret);
                
                if (revealedSecret) {
                    fetchIp(); // Still needed for watermark display
                    if (!revealedSecret.fileUrl) {
                        setIsMediaLoading(false);
                    }
                }
            } catch (error) {
                console.error("Failed to reveal secret:", error);
                setSecret(null);
            }
        };

        reveal();
    }, [params.id, revealSecret]);

    useEffect(() => {
        if (secret?.fileType === "image" && secret.fileUrl && !imageLoaded) {
            let progress = 0;
            const interval = setInterval(() => {
                progress += Math.random() * 15 + 5;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                }
                setBufferedPercent(Math.floor(progress));
            }, 100);
            return () => clearInterval(interval);
        }
    }, [secret?.fileType, secret?.fileUrl, imageLoaded]);

    const handleTimerComplete = async () => {
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.src = "";
            videoRef.current.load();
        }
        setShowVideo(false);
        setHasExpiredDuringViewing(true); // Mark as expired during viewing

        // Call backend to mark it as expired
        try {
            await expireSecret({ secretId: params.id as Id<"secrets"> });
        } catch (err) {
            console.error("Failed to mark secret as expired", err);
        }
    };

    const handleMediaLoad = () => {
        setIsMediaLoading(false);
        if (secret?.fileType === "image") {
            setImageLoaded(true);
            setBufferedPercent(100);
        }
    };

    const handleVideoSizeCalculation = (video: HTMLVideoElement) => {
        // Use a small delay to ensure the video is fully rendered
        setTimeout(() => {
            const rect = video.getBoundingClientRect();
            setVideoRenderedSize({ width: rect.width, height: rect.height });
            setIsVideoSized(true);
        }, 100);
    };

    useEffect(() => {
        const handleVisibilityChange = async () => {
            if (document.visibilityState === "hidden") {
                if (videoRef.current) {
                    videoRef.current.pause();
                    videoRef.current.src = "";
                    videoRef.current.load();
                }
                setShowVideo(false);
                setHasExpiredDuringViewing(true); // Mark as expired during viewing

                // Call backend to mark it as expired
                try {
                    await expireSecret({ secretId: params.id as Id<"secrets"> });
                } catch (err) {
                    console.error("Failed to mark secret as expired", err);
                }
            }
        };
        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, [expireSecret, params.id]);

    useEffect(() => {
        const preventKey = (e: KeyboardEvent) => {
            if (e.code === "Space") {
                e.preventDefault();
            }
        };
        window.addEventListener("keydown", preventKey);
        return () => window.removeEventListener("keydown", preventKey);
    }, []);

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

    const isSecretExpiredOrAlreadyViewed = (secret: Doc<"secrets"> | null) => {
        if (!secret) return true;
        
        // Check if it's explicitly expired
        if (secret.expired) return true;
        
        // Check if it's been read and has no content (already consumed)
        if (secret.isRead && !secret.message && !secret.fileUrl) return true;
        
        // For videos specifically, if it's been read, it should be expired
        if (secret.fileType === "video" && secret.isRead) return true;
        
        return false;
    };

    const renderContent = () => {
        if (secret === undefined) {
            return (
                <div className="flex flex-col items-center justify-center py-16">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#FF75A0] to-[#FFAA70] rounded-full flex items-center justify-center text-2xl mb-6 animate-pulse shadow-lg">
                        🔍
                    </div>
                    <p className="text-xl text-gray-700 dark:text-gray-200 font-medium mb-2">Revealing your secret...</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Almost there...</p>
                    <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-[#FF75A0] border-t-transparent"></div>
                        <span className="text-sm text-gray-500">Loading...</span>
                    </div>
                </div>
            );
        }

        // Check if the secret is expired or already viewed (this should show "Secret Not Found")
        if (secret === null || isSecretExpiredOrAlreadyViewed(secret)) {
            return (
                <div className="text-center py-16">
                    <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/30 rounded-full flex items-center justify-center text-2xl mx-auto mb-6 shadow-lg">
                        ❌
                    </div>
                    <p className="text-xl text-red-600 dark:text-red-400 font-medium mb-2">Secret Not Found</p>
                    <p className="text-gray-600 dark:text-gray-400 mb-8">This secret message could not be found or may have already been viewed.</p>
                    
                    <Button 
                        asChild
                        size="lg"
                        className="bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] hover:from-[#FF75A0]/90 hover:to-[#FFAA70]/90 text-white font-medium px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 border-0"
                    >
                        <Link href="/">✨ Create Your Own Secret</Link>
                    </Button>
                </div>
            );
        }

        // This shows "Vanished Into Thin Air" ONLY when secret expired during viewing
        if (hasExpiredDuringViewing) {
            return (
                <div className="text-center py-16">
                    <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-6 shadow-lg">
                        💨
                    </div>
                    <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-200 mb-3">Vanished Into Thin Air</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-lg mb-2">This secret message has expired and is no longer available.</p>
                    <p className="text-sm text-gray-400 dark:text-gray-500 mb-8">Some secrets are meant to disappear forever ✨</p>
                    
                    <Button 
                        asChild
                        size="lg"
                        className="bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] hover:from-[#FF75A0]/90 hover:to-[#FFAA70]/90 text-white font-medium px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 border-0"
                    >
                        <Link href="/">✨ Create Your Own Secret</Link>
                    </Button>
                </div>
            );
        }

        const showLoadingIndicator = secret.fileUrl && isMediaLoading;
        const secureFileUrl = secret.fileUrl || "";

        return (
            <>
                {showLoadingIndicator && (
                    <div className="flex flex-col items-center justify-center py-16">
                        <div className="w-20 h-20 bg-gradient-to-br from-[#FF75A0] to-[#FFAA70] rounded-full flex items-center justify-center text-3xl mb-6 animate-bounce shadow-lg">
                            📦
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                            Unwrapping Your Secret...
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            {Math.floor(bufferedPercent)}% loaded
                        </p>
                        <div className="w-64 bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden shadow-inner">
                            <div
                                className="bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] h-3 rounded-full transition-all duration-300 ease-out shadow-sm"
                                style={{ width: `${bufferedPercent}%` }}
                            ></div>
                        </div>
                    </div>
                )}

                <div style={{ visibility: showLoadingIndicator ? "hidden" : "visible" }}>
                    {secret.fileType === "image" && secret.fileUrl && (
                        <div className="relative w-full max-w-lg mx-auto mb-8 rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-4">
                            <div className="relative w-full h-80 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700">
                                <Image
                                    src={secureFileUrl}
                                    alt="Secret Image"
                                    fill
                                    style={{ objectFit: "contain" }}
                                    onLoad={handleMediaLoad}
                                    onError={() => {
                                        console.error("Failed to load image");
                                        setIsMediaLoading(false);
                                    }}
                                    priority
                                    className="rounded-xl"
                                />
                                {secret.withWatermark && (
                                    <Watermark name={secret.recipientName} ip={receiverIp ?? undefined} />
                                )}
                            </div>
                        </div>
                    )}

                    {secret.fileType === "video" && secret.fileUrl && (
                        <div className="w-full max-w-2xl mx-auto mb-8">
                            <div className="mb-4 p-4 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border border-red-200/50 dark:border-red-700/50 rounded-xl">
                                <div className="flex items-center space-x-3">
                                    <span className="text-2xl">⚠️</span>
                                    <div>
                                        <p className="font-semibold text-red-800 dark:text-red-300 mb-1">
                                            One-Time View Only
                                        </p>
                                        <p className="text-sm text-red-700 dark:text-red-400">
                                            You cannot pause, replay, or download. Stay focused and watch carefully!
                                        </p>
                                    </div>
                                </div>
                            </div>
                            
                            {/* --- video area (replace the old block) --- */}
<div className="relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-4 shadow-xl">
  {/* inner wrapper: no extra padding, this will be the reference for the watermark */}
  <div className="relative w-full max-w-full rounded-xl overflow-hidden">
    {/* video centered inside the wrapper — the wrapper itself clips overflow */}
    {showVideo && (
      <video
        ref={videoRef}
        src={secureFileUrl}
        playsInline
        preload="auto"
        className="w-full max-h-96 rounded-xl pointer-events-none shadow-lg bg-black block"
        style={{ objectFit: "contain" }}
        onContextMenu={(e) => e.preventDefault()}
        onLoadedMetadata={(e) => {
          const video = e.currentTarget;
          const handleFullyBuffered = () => {
            handleMediaLoad();
            setDuration(Math.ceil(video.duration));
            video.removeEventListener("canplaythrough", handleFullyBuffered);
          };
          video.addEventListener("canplaythrough", handleFullyBuffered);
          // (removed handleVideoSizeCalculation — not needed with this wrapper)
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
        onEnded={handleTimerComplete}
      />
    )}

    {/* watermark overlay — now inset-0 inside the exact same wrapper as the video */}
    {secret.withWatermark && (
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
        <Watermark
          name={secret.recipientName}
          ip={receiverIp ?? undefined}
          animated={true}
          mode="video"
        />
      </div>
    )}
  </div>

  {/* controls panel (unchanged) */}
  <div className="flex items-center justify-between gap-4 mt-4 p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
    {!hasStarted && (
      <Button
        onClick={handleUserPlay}
        size="lg"
        className="h-12 px-8 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 border-0 shadow-lg transform hover:scale-105 transition-all rounded-xl text-white font-medium"
      >
        ▶️ Start Watching
      </Button>
    )}
    <div className="flex items-center gap-3">
      <label htmlFor="volume" className="text-sm font-medium text-gray-700 dark:text-gray-300">
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
        className="w-32 h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
      />
    </div>
  </div>
</div>

                        </div>
                    )}

                    {secret.message && (
                        <div className="max-w-xl mx-auto mb-8 p-8 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl">
                            <div className="text-center mb-4">
                                <span className="text-3xl">💌</span>
                            </div>
                            <blockquote className="text-lg sm:text-xl font-medium text-gray-800 dark:text-gray-200 text-center leading-relaxed">
                                &ldquo;{secret.message}&rdquo;
                            </blockquote>
                        </div>
                    )}

                    {!isMediaLoading && (
                        <div className="mt-8">
                            {(!secret.fileType || secret.fileType === "image") && (
                                <CountdownTimer initialSeconds={secret.duration || 10} onComplete={handleTimerComplete} />
                            )}
                            {secret.fileType === "video" && hasStarted && (
                                <CountdownTimer 
                                    initialSeconds={duration || 10}
                                    onComplete={handleTimerComplete} 
                                />
                            )}
                        </div>
                    )}
                </div>
            </>
        );
    };

    const getHeading = () => {
    // Don't show name if secret is expired, not found, or expired during viewing
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
        <div className="min-h-screen bg-gradient-to-br from-[#FF75A0]/5 via-white to-[#FFAA70]/5 dark:from-[#FF75A0]/10 dark:via-gray-950 dark:to-[#FFAA70]/10 flex flex-col items-center justify-center py-8 px-4">
            <div className="w-full max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] rounded-full flex items-center justify-center text-2xl mx-auto mb-6 shadow-lg">
                        🎁
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] bg-clip-text text-transparent">
                        {getHeading()}
                    </h1>
                   
                </div>

                {/* Content */}
                <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 dark:border-gray-800/20 overflow-hidden">
                    <div className="p-6 sm:p-8">
                        {renderContent()}
                    </div>
                </div>

                {/* Actions */}
                {secret && !isSecretExpiredOrAlreadyViewed(secret) && !hasExpiredDuringViewing && (
                    <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto">
                        
                        
                    </div>
                )}
            </div>
        </div>
    );
}
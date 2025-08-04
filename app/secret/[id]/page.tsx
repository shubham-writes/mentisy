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

    const videoRef = useRef<HTMLVideoElement | null>(null);
    const hasRevealedRef = useRef(false);

    const revealSecret = useMutation(api.secrets.readAndReveal);
    const expireSecret = useMutation(api.secrets.expireSecret);

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
        setSecret(null);

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

    useEffect(() => {
        const handleVisibilityChange = async () => {
            if (document.visibilityState === "hidden") {
                if (videoRef.current) {
                    videoRef.current.pause();
                    videoRef.current.src = "";
                    videoRef.current.load();
                }
                setShowVideo(false);
                setSecret(null);

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

    const renderContent = () => {
        if (secret === undefined) {
            return (
                <div className="flex flex-col items-center justify-center py-12">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-2xl mb-6 animate-pulse">
                        🔍
                    </div>
                    <p className="text-xl text-gray-600 dark:text-gray-300 font-medium">Revealing your secret...</p>
                    <div className="mt-4 flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-500"></div>
                        <span className="text-sm text-gray-500">Almost there...</span>
                    </div>
                </div>
            );
        }

        if (secret === null) {
            return (
                
                <div className="text-center py-12">
                    <div className="w-20 h-20 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-6 animate-pulse">
                        💨
                    </div>
                    <h3 className="text-2xl font-bold text-gray-600 dark:text-gray-400 mb-3">Vanished Into Thin Air</h3>
                    <p className="text-gray-500 dark:text-gray-500 text-lg">This secret message has expired and is no longer available.</p>
                    <p className="text-sm text-gray-400 dark:text-gray-600 mt-2">Some secrets are meant to disappear forever ✨</p>
                </div>
            );
        }

        // Check if the secret is expired (read but no content)
        const isExpired = secret.expired || (secret.isRead && !secret.message && !secret.fileUrl);

        if (isExpired) {
            return (
                <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center text-2xl mx-auto mb-6">
                        ❌
                    </div>
                    <p className="text-xl text-red-600 dark:text-red-400 font-medium mb-2">Secret Not Found</p>
                    <p className="text-gray-600 dark:text-gray-400">This secret message could not be found or may have already been viewed.</p>
                </div>
            );
        }

        const showLoadingIndicator = secret.fileUrl && isMediaLoading;
        const secureFileUrl = secret.fileUrl || "";

        return (
            <>
                {showLoadingIndicator && (
                    <div className="flex flex-col items-center justify-center py-16">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-3xl mb-6 animate-bounce">
                            📦
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                            Unwrapping Your Secret...
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            {Math.floor(bufferedPercent)}% loaded
                        </p>
                        <div className="w-64 bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                            <div
                                className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-300 ease-out"
                                style={{ width: `${bufferedPercent}%` }}
                            ></div>
                        </div>
                    </div>
                )}

                <div style={{ visibility: showLoadingIndicator ? "hidden" : "visible" }}>
                    {secret.fileType === "image" && secret.fileUrl && (
                        <div className="relative w-full max-w-2xl mx-auto mb-8 rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6">
                            <div className="relative w-full h-96 rounded-2xl overflow-hidden">
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
                                    className="rounded-2xl"
                                />
                                {secret.withWatermark && (
                                    <Watermark name={secret.recipientName} ip={receiverIp ?? undefined} />
                                )}
                            </div>
                        </div>
                    )}

                    {secret.fileType === "video" && secret.fileUrl && (
                        <div className="w-full max-w-3xl mx-auto mb-8">
                            <div className="mb-4 p-4 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border border-red-200 dark:border-red-800 rounded-2xl">
                                <div className="flex items-center space-x-3">
                                    <span className="text-2xl">⚠️</span>
                                    <div>
                                        <p className="font-semibold text-red-800 dark:text-red-200 mb-1">
                                            One-Time View Only
                                        </p>
                                        <p className="text-sm text-red-700 dark:text-red-300">
                                            You cannot pause, replay, or download. Stay focused and watch carefully!
                                        </p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="relative bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-3xl p-6 shadow-2xl">
                                {showVideo && (
                                    <video
                                        ref={videoRef}
                                        src={secureFileUrl}
                                        playsInline
                                        preload="auto"
                                        className="w-full rounded-2xl pointer-events-none shadow-lg"
                                        onContextMenu={(e) => e.preventDefault()}
                                        onLoadedMetadata={(e) => {
                                            const video = e.currentTarget;
                                            const handleFullyBuffered = () => {
                                                handleMediaLoad();
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
                                        onEnded={handleTimerComplete}
                                    />
                                )}
                                {secret.withWatermark && (
                                    <Watermark name={secret.recipientName} ip={receiverIp ?? undefined} animated={true} />
                                )}

                                <div className="flex items-center justify-between gap-4 mt-6 p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-purple-200 dark:border-purple-800">
                                    {!hasStarted && (
                                        <Button
                                            onClick={handleUserPlay}
                                            size="lg"
                                            className="h-12 px-8 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 border-0 shadow-lg transform hover:scale-105 transition-all rounded-2xl"
                                        >
                                            ▶️ Start Watching
                                        </Button>
                                    )}
                                    <div className="flex items-center gap-3">
                                        <label htmlFor="volume" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
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
                                            className="w-32 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {secret.message && (
                        <div className="max-w-2xl mx-auto mb-8 p-8 bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-800 dark:to-purple-900/20 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-xl">
                            <div className="text-center mb-4">
                                <span className="text-3xl">💌</span>
                            </div>
                            <blockquote className="text-xl sm:text-2xl font-medium text-gray-800 dark:text-gray-200 text-center leading-relaxed">
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
        if (secret && secret.recipientName) {
            return `A Secret Message For ${secret.recipientName}`;
        }
        return "A Secret Message For You";
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-purple-900/10 dark:via-pink-900/10 dark:to-orange-900/10 flex flex-col items-center justify-center py-8 px-4">
            <div className="w-full max-w-5xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-3xl mx-auto mb-6 shadow-lg">
                        🎁
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        {getHeading()}
                    </h1>
                    {secret?.publicNote && (
                        <p className="text-xl text-gray-600 dark:text-gray-300 font-medium">
                            {secret.publicNote}
                        </p>
                    )}
                </div>

                {/* Content */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border-0 overflow-hidden">
                    <div className="p-8 sm:p-12">
                        {renderContent()}
                    </div>
                </div>

                {/* Actions */}
                {secret && !secret.expired && (
                    <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto">
                        <ShareButton
                            title="A Secret Message"
                            text={secret.publicNote || "Someone sent you a secret message!"}
                            url={window.location.href}
                        />
                        <Button 
                            asChild
                            size="lg"
                            variant="outline"
                            className="h-14 px-8 border-2 border-purple-200 dark:border-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-2xl transition-all hover:scale-105"
                        >
                            <Link href="/">✨ Create Your Own Secret</Link>
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
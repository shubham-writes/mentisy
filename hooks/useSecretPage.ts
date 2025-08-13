// hooks/useSecretPage.ts
import { useEffect, useState, useRef } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id, Doc } from "@/convex/_generated/dataModel";

export function useSecretPage(secretId: string) {
  const [secret, setSecret] = useState<Doc<"secrets"> | null | undefined>(undefined);
  const [isMediaLoading, setIsMediaLoading] = useState(true);
  const [duration, setDuration] = useState<number | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [bufferedPercent, setBufferedPercent] = useState(0);
  const [showVideo, setShowVideo] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [receiverIp, setReceiverIp] = useState<string | null>(null);
  const [hasExpiredDuringViewing, setHasExpiredDuringViewing] = useState(false);
  const [expandedMessages, setExpandedMessages] = useState<{[key: string]: boolean}>({});

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hasRevealedRef = useRef(false);

  const revealSecret = useMutation(api.secrets.readAndReveal);
  const expireSecret = useMutation(api.secrets.expireSecret);

  const handleTimerComplete = async () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.src = "";
      videoRef.current.load();
    }
    setShowVideo(false);
    setHasExpiredDuringViewing(true);

    try {
      await expireSecret({ secretId: secretId as Id<"secrets"> });
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

  const handleUserPlay = () => {
    if (hasStarted || !videoRef.current) return;
    const video = videoRef.current;
    setHasStarted(true);
    video.play();
  };

  const toggleMessageExpansion = (messageId: string) => {
    setExpandedMessages(prev => ({
      ...prev,
      [messageId]: !prev[messageId]
    }));
  };

  const isSecretExpiredOrAlreadyViewed = (secret: Doc<"secrets"> | null) => {
    if (!secret) return true;
    if (secret.expired) return true;
    if (secret.isRead && !secret.message && !secret.fileUrl) return true;
    if (secret.fileType === "video" && secret.isRead) return true;
    return false;
  };

  // Initial secret reveal effect
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
        const userAgent = navigator.userAgent;
        const revealedSecret = await revealSecret({
          secretId: secretId as Id<"secrets">,
        });

        setSecret(revealedSecret);

        if (revealedSecret) {
          fetchIp();
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
  }, [secretId, revealSecret]);

  // Image loading progress effect
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

  // Visibility change effect
  useEffect(() => {
    const handleVisibilityChange = async () => {
      if (document.visibilityState === "hidden") {
        if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.src = "";
          videoRef.current.load();
        }
        setShowVideo(false);
        setHasExpiredDuringViewing(true);

        try {
          await expireSecret({ secretId: secretId as Id<"secrets"> });
        } catch (err) {
          console.error("Failed to mark secret as expired", err);
        }
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [expireSecret, secretId]);

  // Prevent spacebar effect
  useEffect(() => {
    const preventKey = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", preventKey);
    return () => window.removeEventListener("keydown", preventKey);
  }, []);

  // Video pause prevention effect
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

  return {
    secret,
    isMediaLoading,
    duration,
    hasStarted,
    bufferedPercent,
    showVideo,
    imageLoaded,
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
  };
}
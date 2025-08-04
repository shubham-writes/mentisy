"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Share2, Copy, Check } from "lucide-react";

interface ShareButtonProps {
  title: string;
  text: string;
  url: string;
}

export function ShareButton({ title, text, url }: ShareButtonProps) {
  const [buttonText, setButtonText] = useState("Copy & Share");
  const [isSuccess, setIsSuccess] = useState(false);

  const fullMessage = `${text ? text + "\n\n" : ""}${url}`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: fullMessage,
        });
        setIsSuccess(true);
        setButtonText("Shared! ✨");
        setTimeout(() => {
          setIsSuccess(false);
          setButtonText("Copy & Share");
        }, 3000);
      } catch (error) {
        console.error("Error using Web Share API:", error);
        // Fallback to clipboard
        fallbackToCopy();
      }
    } else {
      fallbackToCopy();
    }
  };

  const fallbackToCopy = () => {
    navigator.clipboard.writeText(fullMessage).then(() => {
      setIsSuccess(true);
      setButtonText("Copied to clipboard! 📋");
      setTimeout(() => {
        setIsSuccess(false);
        setButtonText("Copy & Share");
      }, 3000);
    }).catch(() => {
      setButtonText("Failed to copy");
      setTimeout(() => setButtonText("Copy & Share"), 2000);
    });
  };

  const isWebShareSupported =
    typeof navigator !== "undefined" && !!navigator.share;

  return (
    <Button 
      onClick={handleShare}
      disabled={isSuccess}
      className={`w-full h-14 text-base font-semibold rounded-2xl border-0 shadow-lg transform hover:scale-105 transition-all ${
        isSuccess 
          ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600' 
          : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
      }`}
      size="lg"
    >
      {isSuccess ? (
        <>
          <Check className="mr-3 h-5 w-5" />
          {buttonText}
        </>
      ) : (
        <>
          {isWebShareSupported ? (
            <>
              <Share2 className="mr-3 h-5 w-5" />
              Share This Secret
            </>
          ) : (
            <>
              <Copy className="mr-3 h-5 w-5" />
              {buttonText}
            </>
          )}
        </>
      )}
    </Button>
  );
}
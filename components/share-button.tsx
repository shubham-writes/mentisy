// Enhanced share-button.tsx with Instagram functionality removed
"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Share2, Copy, Check, MessageCircle, Send } from "lucide-react";

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
      className={`w-full h-11 text-sm font-medium rounded-lg border-0 shadow-sm hover:shadow-md transition-all duration-200 ${
        isSuccess 
          ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700' 
          : 'bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] hover:from-[#FF75A0]/90 hover:to-[#FFAA70]/90'
      }`}
      size="sm"
    >
      {isSuccess ? (
        <>
          <Check className="mr-2 h-4 w-4" />
          {buttonText}
        </>
      ) : (
        <>
          {isWebShareSupported ? (
            <>
              <Share2 className="mr-2 h-4 w-4" />
              Others
            </>
          ) : (
            <>
              <Copy className="mr-2 h-4 w-4" />
              {buttonText}
            </>
          )}
        </>
      )}
    </Button>
  );
}

// Social Media Share Buttons Component (Instagram removed)
interface SocialShareButtonsProps {
  title: string;
  text: string;
  url: string;
}

export function SocialShareButtons({ title, text, url }: SocialShareButtonsProps) {
  const fullMessage = `${text ? text + " " : ""}${url}`;
  
  const shareToWhatsApp = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(fullMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  const shareToTelegram = () => {
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text || title)}`;
    window.open(telegramUrl, '_blank');
  };

  return (
    <div className="flex flex-row gap-2 sm:gap-3 w-full">
      {/* WhatsApp */}
      <Button
        onClick={shareToWhatsApp}
        className="flex-1 h-11 bg-[#25D366] hover:bg-[#20BA5A] text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
        size="sm"
      >
        <MessageCircle className="h-4 w-4 sm:mr-2" />
        <span className="hidden sm:inline">WhatsApp</span>
      </Button>

      {/* Telegram */}
      <Button
        onClick={shareToTelegram}
        className="flex-1 h-11 bg-[#0088CC] hover:bg-[#0077B5] text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
        size="sm"
      >
        <Send className="h-4 w-4 sm:mr-2" />
        <span className="hidden sm:inline">Telegram</span>
      </Button>
    </div>
  );
}
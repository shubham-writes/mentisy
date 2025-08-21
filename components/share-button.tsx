"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Share2, Copy, Check, MessageCircle, Instagram, Send } from "lucide-react";

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
      className={`w-full h-12 text-sm font-medium rounded-lg border-0 shadow-sm hover:shadow-md transition-all duration-200 ${
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
              Share This Secret
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

// New Social Media Share Buttons Component
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

  const shareToInstagram = () => {
    // Instagram doesn't have direct URL sharing, so we copy to clipboard and guide user
    navigator.clipboard.writeText(fullMessage).then(() => {
      alert("Link copied! Open Instagram and paste it in your story or message.");
    }).catch(() => {
      alert("Please copy this link manually and share it on Instagram: " + fullMessage);
    });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full">
      {/* WhatsApp */}
      <Button
        onClick={shareToWhatsApp}
        className="flex-1 h-11 bg-[#25D366] hover:bg-[#20BA5A] text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
        size="sm"
      >
        <MessageCircle className="mr-2 h-4 w-4" />
        <span className="hidden sm:inline">WhatsApp</span>
        <span className="sm:hidden">WhatsApp</span>
      </Button>

      {/* Telegram */}
      <Button
        onClick={shareToTelegram}
        className="flex-1 h-11 bg-[#0088CC] hover:bg-[#0077B5] text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
        size="sm"
      >
        <Send className="mr-2 h-4 w-4" />
        <span className="hidden sm:inline">Telegram</span>
        <span className="sm:hidden">Telegram</span>
      </Button>

      {/* Instagram */}
      <Button
        onClick={shareToInstagram}
        className="flex-1 h-11 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCB045] hover:opacity-90 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
        size="sm"
      >
        <Instagram className="mr-2 h-4 w-4" />
        <span className="hidden sm:inline">Instagram</span>
        <span className="sm:hidden">Instagram</span>
      </Button>
    </div>
  );
}
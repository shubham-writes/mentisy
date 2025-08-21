// Enhanced share-button.tsx with improved Instagram direct messaging
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

// Enhanced Social Media Share Buttons Component
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

  const shareToInstagram = async () => {
    try {
      // First, copy the content to clipboard
      await navigator.clipboard.writeText(fullMessage);
      
      // Detect platform and device
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/.test(userAgent);
      const isAndroid = /android/.test(userAgent);
      const isIOS = /iphone|ipad|ipod/.test(userAgent);
      
      let instagramOpened = false;

      if (isMobile) {
        if (isAndroid) {
          // Try multiple Android Instagram approaches
          try {
            // Method 1: Try Instagram Direct intent (most specific)
            const directIntent = 'intent://instagram.com/direct/inbox/#Intent;package=com.instagram.android;scheme=https;end';
            window.location.href = directIntent;
            instagramOpened = true;
            
            // Fallback after short delay if direct doesn't work
            setTimeout(() => {
              if (!instagramOpened) {
                // Method 2: Try general Instagram app
                window.location.href = 'intent://instagram.com/#Intent;package=com.instagram.android;scheme=https;end';
              }
            }, 1000);
            
          } catch (e) {
            // Method 3: Try direct Instagram URL schemes
            try {
              window.location.href = 'instagram://direct-inbox';
              instagramOpened = true;
            } catch (e2) {
              // Method 4: Try general Instagram scheme
              window.location.href = 'instagram://camera';
              instagramOpened = true;
            }
          }
          
          // Ultimate fallback for Android
          setTimeout(() => {
            if (!instagramOpened) {
              window.open('https://play.google.com/store/apps/details?id=com.instagram.android', '_blank');
            }
          }, 2500);
          
        } else if (isIOS) {
          // iOS Instagram handling
          try {
            // Method 1: Try Instagram Direct Messages
            window.location.href = 'instagram://direct-inbox';
            instagramOpened = true;
          } catch (e) {
            // Method 2: Try general Instagram
            try {
              window.location.href = 'instagram://camera';
              instagramOpened = true;
            } catch (e2) {
              // Method 3: Try Instagram main
              window.location.href = 'instagram://user';
              instagramOpened = true;
            }
          }
          
          // iOS fallback
          setTimeout(() => {
            if (!instagramOpened) {
              window.open('https://apps.apple.com/app/instagram/id389801252', '_blank');
            }
          }, 2000);
        }
      } else {
        // Desktop: Open Instagram Direct Messages
        window.open('https://www.instagram.com/direct/inbox/', '_blank');
        instagramOpened = true;
      }
      
      // Show enhanced success notification
      showInstagramNotification(isMobile);
      
    } catch (err) {
      console.error('Instagram share error:', err);
      // If clipboard fails, show manual copy message
      showManualCopyNotification(fullMessage);
    }
  };

  const showInstagramNotification = (isMobile: boolean) => {
    // Remove any existing notifications
    const existingNotifications = document.querySelectorAll('[data-instagram-notification]');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.setAttribute('data-instagram-notification', 'true');
    
    const mobileInstructions = isMobile 
      ? "Instagram is opening! Tap the message icon or create a story, then paste your link."
      : "Instagram Direct Messages is opening! Click on a conversation or start a new message, then paste your link.";
    
    notification.innerHTML = `
      <div style="
        position: fixed;
        top: 20px;
        right: 20px;
        left: 20px;
        background: linear-gradient(135deg, #833AB4, #FD1D1D, #FCB045);
        color: white;
        padding: 16px 20px;
        border-radius: 16px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        z-index: 10000;
        max-width: 400px;
        margin: 0 auto;
        font-family: system-ui, -apple-system, sans-serif;
        font-size: 14px;
        line-height: 1.5;
        animation: slideInDown 0.5s ease-out;
      ">
        <div style="display: flex; align-items: center; margin-bottom: 8px;">
          <div style="font-size: 18px; margin-right: 8px;">📋</div>
          <div style="font-weight: 600;">Link copied successfully!</div>
        </div>
        <div style="opacity: 0.9; font-size: 13px;">
          ${mobileInstructions}
        </div>
        ${isMobile ? `
          <div style="margin-top: 8px; font-size: 12px; opacity: 0.8;">
            💡 Tip: Look for the message/DM icon in Instagram or swipe right from the main feed
          </div>
        ` : ''}
        <div onclick="this.parentElement.remove()" style="
          position: absolute;
          top: 8px;
          right: 12px;
          cursor: pointer;
          opacity: 0.7;
          font-size: 18px;
          font-weight: bold;
        ">×</div>
      </div>
      <style>
        @keyframes slideInDown {
          from { transform: translateY(-100px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      </style>
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 7 seconds (longer for better UX)
    setTimeout(() => {
      if (notification.parentNode) {
        notification.style.animation = 'slideInDown 0.3s ease-in reverse';
        setTimeout(() => notification.remove(), 300);
      }
    }, 7000);
  };

  const showManualCopyNotification = (message: string) => {
    const notification = document.createElement('div');
    notification.innerHTML = `
      <div style="
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0,0,0,0.9);
        color: white;
        padding: 24px;
        border-radius: 12px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        z-index: 10001;
        max-width: 90%;
        text-align: center;
        font-family: system-ui, -apple-system, sans-serif;
      ">
        <div style="font-weight: 600; margin-bottom: 12px;">Manual Copy Required</div>
        <div style="font-size: 14px; margin-bottom: 16px; opacity: 0.9;">
          Please copy this message and share it on Instagram:
        </div>
        <div style="
          background: rgba(255,255,255,0.1);
          padding: 12px;
          border-radius: 8px;
          font-family: monospace;
          font-size: 12px;
          word-break: break-all;
          margin-bottom: 16px;
          user-select: all;
        " onclick="
          const range = document.createRange();
          range.selectNode(this);
          window.getSelection().removeAllRanges();
          window.getSelection().addRange(range);
        ">${message}</div>
        <button onclick="this.closest('div').closest('div').remove()" style="
          background: #FF75A0;
          border: none;
          color: white;
          padding: 8px 16px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
        ">Close</button>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 15 seconds (longer for manual copy)
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 15000);
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

      {/* Instagram */}
      <Button
        onClick={shareToInstagram}
        className="flex-1 h-11 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCB045] hover:opacity-90 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
        size="sm"
        title="Copy link & open Instagram Direct Messages"
      >
        <Instagram className="h-4 w-4 sm:mr-2" />
        <span className="hidden sm:inline">Instagram</span>
      </Button>
    </div>
  );
}
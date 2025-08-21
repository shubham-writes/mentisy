// Enhanced share-button.tsx with improved Instagram handling
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
      
      // Detect if user is on mobile
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/.test(userAgent);
      const isAndroid = /android/.test(userAgent);
      const isIOS = /iphone|ipad|ipod/.test(userAgent);

      if (isMobile) {
        if (isAndroid) {
          // Try Android Instagram app first
          try {
            // Create a hidden link to test if Instagram app opens
            const testLink = document.createElement('a');
            testLink.href = 'intent://instagram.com/#Intent;package=com.instagram.android;scheme=https;end';
            testLink.style.display = 'none';
            document.body.appendChild(testLink);
            
            // Set up fallback timer
            const fallbackTimer = setTimeout(() => {
              // If app doesn't open, go to Play Store or web
              window.open('https://play.google.com/store/apps/details?id=com.instagram.android', '_blank');
            }, 2500);
            
            // Try to open the app
            testLink.click();
            
            // Clean up
            document.body.removeChild(testLink);
            
            // Clear fallback if app opened successfully
            setTimeout(() => {
              clearTimeout(fallbackTimer);
            }, 1000);
            
          } catch (e) {
            // If intent fails, try direct app link
            window.open('instagram://camera', '_blank');
            setTimeout(() => {
              window.open('https://www.instagram.com/', '_blank');
            }, 1500);
          }
        } else if (isIOS) {
          // For iOS, try the Instagram URL scheme
          const instagramURL = 'instagram://camera';
          const fallbackURL = 'https://apps.apple.com/app/instagram/id389801252';
          
          // Create a hidden iframe to test if app opens
          const iframe = document.createElement('iframe');
          iframe.style.display = 'none';
          iframe.src = instagramURL;
          document.body.appendChild(iframe);
          
          // Set up fallback
          setTimeout(() => {
            document.body.removeChild(iframe);
            window.open(fallbackURL, '_blank');
          }, 2000);
        }
      } else {
        // Desktop: Open Instagram web
        window.open('https://www.instagram.com/', '_blank');
      }
      
      // Show success notification
      showInstagramNotification();
      
    } catch (err) {
      // If clipboard fails, show manual copy message
      showManualCopyNotification(fullMessage);
    }
  };

  const showInstagramNotification = () => {
    // Remove any existing notifications
    const existingNotifications = document.querySelectorAll('[data-instagram-notification]');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.setAttribute('data-instagram-notification', 'true');
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
          Instagram is opening. Paste your message in a story, post, or DM to share your secret link!
        </div>
      </div>
      <style>
        @keyframes slideInDown {
          from { transform: translateY(-100px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      </style>
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.style.animation = 'slideInDown 0.3s ease-in reverse';
        setTimeout(() => notification.remove(), 300);
      }
    }, 5000);
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
    
    // Auto-remove after 10 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 10000);
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
        title="Copy link & open Instagram"
      >
        <Instagram className="h-4 w-4 sm:mr-2" />
        <span className="hidden sm:inline">Instagram</span>
      </Button>
    </div>
  );
}
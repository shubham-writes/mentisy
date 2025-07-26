"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Share2, Copy } from "lucide-react";

interface ShareButtonProps {
  title: string;
  text: string;
  url: string;
}

export function ShareButton({ title, text, url }: ShareButtonProps) {
  const [buttonText, setButtonText] = useState("Copy Link");

  const fullMessage = `${text ? text + "\n\n" : ""}${url}`; // ✅ Combine public text + link

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: fullMessage,
        });
      } catch (error) {
        console.error("Error using Web Share API:", error);
      }
    } else {
      navigator.clipboard.writeText(fullMessage).then(() => {
        setButtonText("Copied!");
        setTimeout(() => setButtonText("Copy Link"), 2000);
      });
    }
  };

  const isWebShareSupported =
    typeof navigator !== "undefined" && !!navigator.share;

  return (
    <Button variant="outline" onClick={handleShare}>
      {isWebShareSupported ? (
        <>
          Share <Share2 className="ml-2 h-4 w-4" />
        </>
      ) : (
        <>
          {buttonText} <Copy className="ml-2 h-4 w-4" />
        </>
      )}
    </Button>
  );
}

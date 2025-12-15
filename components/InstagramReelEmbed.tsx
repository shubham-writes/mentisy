// components/InstagramReelEmbed.tsx
"use client";

import { cn } from "@/lib/utils";

interface InstagramReelEmbedProps {
    className?: string;
    reelId: string; // The short ID from the URL (e.g., DQ4D3BfgR3-)
}


export function InstagramReelEmbed({ className, reelId }: InstagramReelEmbedProps) {
    // Construct the full embed URL
    const embedUrl = `https://www.instagram.com/reel/${reelId}/embed`;

    return (
        <div className={cn("relative w-full aspect-[9/16] overflow-hidden rounded-xl shadow-2xl transition-opacity duration-300", className)}>
            <iframe
                src={embedUrl}
                width="100%"
                height="100%"
                scrolling="no"
                frameBorder="0"
                allowFullScreen={true}
                className="absolute top-0 left-0"
                style={{ minWidth: "100%", minHeight: "100%" }}
            />
        </div>
    );
}
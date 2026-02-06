"use client";

import { useState, useRef } from "react";
import { Play } from "lucide-react";
import Image from "next/image";

interface SmartVideoProps {
    posterSrc: string;
    videoSrc: string;
}

export function SmartVideo({ posterSrc, videoSrc }: SmartVideoProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);


    if (!isPlaying) {
        return (
            <div
                className="relative w-full h-full cursor-pointer group"
                onClick={() => setIsPlaying(true)}
            >
                {/* LCP Optimized Image */}
                <Image
                    src={posterSrc}
                    alt="Video preview"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority={false} // Change to false for mobile if it's below the fold
                    sizes="(max-width: 768px) 100vw, 33vw"
                />

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-all">
                    <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 text-[#FF75A0] fill-current ml-1" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <video
            ref={videoRef}
            src={videoSrc}
            className="w-full h-full object-cover animate-in fade-in duration-500"
            autoPlay
            loop
            muted
            playsInline
            controls
        />
    );
}
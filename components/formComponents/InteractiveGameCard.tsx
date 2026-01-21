"use client";

import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Crown } from "lucide-react";

interface ClerkPublicMetadata {
    isFoundingMember?: boolean;
}

const gameOptionsForCard = [
    {
        id: "scratch_and_see",
        icon: "/game-icons/scratch_and_see.png",
        title: "Scratch & See",
        description: "A slow reveal that builds curiosity with every swipe"
    },
    {
        id: "qa_challenge",
        icon: "/game-icons/qa_challenge.png",
        title: "Q & A",
        description: "Only those who truly know you can unlock it"
    },
    {
        id: "yes_or_no",
        icon: "/game-icons/yes_or_no.png",
        title: "Yes or No",
        description: "Two choices. One truth revealed"
    },
    {
        id: "reveal_rush",
        icon: "/game-icons/reveal_rush.png",
        title: "Reveal Rush",
        description: "A group challenge where timing matters"
    }
] as const;

export default function InteractiveGameCard() {
    const { user } = useUser();
    const publicMetadata = user?.publicMetadata as ClerkPublicMetadata | undefined;
    const isFounder = publicMetadata?.isFoundingMember;

    const [current, setCurrent] = useState(0);
    const [paused, setPaused] = useState(false);

    useEffect(() => {
        if (paused) return;
        const timer = setInterval(() => {
            setCurrent((i) => (i + 1) % gameOptionsForCard.length);
        }, 3000);
        return () => clearInterval(timer);
    }, [paused]);

    const game = gameOptionsForCard[current];

    return (
        <div
            className="relative max-w-md mx-auto"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            {/* Back card for depth */}
            <div className="absolute inset-0 translate-y-3 scale-[0.96] rounded-[28px] bg-white/50 dark:bg-gray-900/50 border border-white/20 dark:border-gray-700/30" />

            {/* Main card */}
            <div className="relative min-h-[520px] rounded-[28px] bg-gradient-to-br from-white/85 to-white/55 dark:from-gray-900/85 dark:to-gray-900/55 border border-white/30 dark:border-gray-700/40 backdrop-blur-xl shadow-[0_24px_64px_-24px_rgba(0,0,0,0.35)] overflow-hidden">
                {/* Brand wash */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#FF75A0]/10 to-[#FFAA70]/10" />

                <div className="relative p-8 h-full flex flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-full overflow-hidden border border-[#FF75A0]/60">
                                <Image
                                    src={user?.imageUrl || "/placeholder-avatar.png"}
                                    alt="Avatar"
                                    width={44}
                                    height={44}
                                    className="object-cover"
                                />
                            </div>

                        </div>

                        {isFounder && (
                            <div className="flex items-center gap-1 px-2 py-1 text-[10px] rounded-full bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] text-white">
                                <Crown className="w-3 h-3" /> Founder
                            </div>
                        )}
                    </div>

                    <div className="mt-5 mb-5 border-t border-gray-400/40 dark:border-gray-400/20 pt-4">
                        <p className="text-[11px] uppercase tracking-wider text-gray-500">Featured Games</p>

                    </div>

                    {/* Center content */}
                    <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
                        <div className="mb-6">
                            <div className="w-24 h-24 rounded-2xl bg-white/70 dark:bg-gray-900/60 backdrop-blur-md border border-white/30 shadow-sm flex items-center justify-center">
                                <Image
                                    key={game.id}
                                    src={game.icon}
                                    alt={game.title}
                                    width={80}
                                    height={80}
                                    className="object-contain rounded-lg"
                                />
                            </div>
                        </div>

                        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white tracking-tight">
                            {game.title}
                        </h3>

                        <p className="mt-3 h-10 text-sm text-gray-600 dark:text-gray-300 max-w-xs">
                            {game.description}
                        </p>

                        {/* Carousel indicators */}
                        <div className="flex items-center gap-2 mt-8">
                            {gameOptionsForCard.map((g, i) => (
                                <button
                                    key={g.id}
                                    onClick={() => setCurrent(i)}
                                    className={`h-2 rounded-full transition-all duration-300 ${i === current
                                        ? "w-6 bg-gradient-to-r from-[#FF75A0] to-[#FFAA70]"
                                        : "w-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400"
                                        }`}
                                    aria-label={`Show ${g.title}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-6 border-t border-gray-400/40 dark:border-gray-400/20 text-center">
                        <p className="text-[11px] text-gray-500 mt-6">
                            More interactive formats coming soon
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
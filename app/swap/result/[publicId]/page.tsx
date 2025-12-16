// app/swap/result/[publicId]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
    LoaderCircle,
    ShieldAlert,
    CheckCircle,
    Copy,
    Check,
    Share2,
    UserPlus,
    WandSparkles
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";
import { GeneratedLinkDisplay } from "@/components/formComponents/generated-link-display";

// --- Helper Components ---
// (We define these here for a self-contained file, but you can move them)

function LoadingOverlay({ text }: { text: string }) {
    return (
        <div className="absolute inset-0 bg-white dark:bg-gray-900 flex flex-col items-center justify-center z-50">
            <LoaderCircle className="w-12 h-12 animate-spin text-[#FF75A0]" />
            <p className="mt-4 text-lg font-semibold text-gray-700 dark:text-gray-300">
                {text}
            </p>
        </div>
    );
}

function StatusCard({
    icon: Icon,
    title,
    message,
}: {
    icon: React.ElementType;
    title: string;
    message: string;
}) {
    return (
        <div className="flex flex-col items-center justify-center text-center p-8">
            <Icon className="w-16 h-16 text-red-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">{message}</p>
        </div>
    );
}

// --- Main Page Component ---

export default function SwapResultPage() {
    const router = useRouter();
    const params = useParams();
    const publicId = params.publicId as string;

    const [copied, setCopied] = useState(false);
    const [shareLink, setShareLink] = useState("");

    // Set the share link only on the client
    useEffect(() => {
        if (publicId && typeof window !== "undefined") {
            setShareLink(`${window.location.origin}/redirect/${publicId}`);
        }
    }, [publicId]);

    // This is the core magic:
    // useQuery subscribes to the data. When `swapFileUrl` changes in the
    // database, this component will automatically re-render.
    const secret = useQuery(
        api.secrets.getSecretByPublicId,
        publicId ? { publicId } : "skip" // "skip" prevents query until publicId is ready
    );

    const handleCopy = () => {
        if (!shareLink) return;
        navigator.clipboard.writeText(shareLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // 1. Loading State (Waiting for data)
    if (secret === undefined) {
        return <LoadingOverlay text="Loading your swap..." />;
    }

    // 2. Error State (Link is invalid)
    if (secret === null) {
        return (
            <StatusCard
                icon={ShieldAlert}
                title="Swap Not Found"
                message="This PicSwap link is invalid or has expired."
            />
        );
    }

    // 3. Main Content
    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] mt-20  p-4">
            <div className="w-full max-w-md bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-xl shadow-xl p-8 sm:p-3">

                {/* Check if the swap is complete.
                  This will automatically update when the database changes!
                */}
                {secret.swapFileUrl ? (

                    // --- VIEW 1: SWAP COMPLETED ---

                    <div className="text-center">
                        {/* ✅ 1. Reduced gap between CheckCircle and heading */}
                        <div className="relative flex flex-col justify-center items-center mb-2">
                            <div className="flex items-center justify-center space-x-2">
                                <CheckCircle className="w-6 h-6 text-green-500" />
                                <h1 className="text-md sm:text-xl font-semibold text-gray-900 dark:text-white">
                                    It&apos;s a Swap!
                                </h1>
                            </div>
                        </div>

                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                            Your friend sent their photo. Here it is!
                        </p>

                        {/* ✅ 2. Show full image (no crop) */}
                        <div className="relative w-full rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 mb-4 shadow-md bg-gray-50 dark:bg-black/20">
                            <Image
                                src={secret.swapFileUrl}
                                alt="Swapped Photo"
                                width={0}
                                height={0}
                                sizes="100vw"
                                style={{ width: '100%', height: 'auto' }} // 👈 This is the magic: auto-height based on aspect ratio
                                priority
                            />
                        </div>

                        <div className="space-y-3">
                            <SignInButton mode="modal">
                                <Button
                                    size="sm"
                                    className="w-full font-semibold bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] hover:from-[#e65a85] hover:to-[#e6955a] transition-transform transform hover:scale-105"
                                >
                                    <UserPlus className="w-5 h-5 mr-2" />
                                    Sign Up to Save History
                                </Button>
                            </SignInButton>

                            <Button
                                size="sm"
                                variant="outline"
                                className="w-full"
                                onClick={() => router.push('/')}
                            >
                                <WandSparkles className="w-5 h-5 mr-2" />
                                Create Another Swap
                            </Button>
                        </div>
                    </div>

                ) : (

                    // --- VIEW 2: WAITING FOR SWAP ---

                    <div className="text-center">
                        <div className="relative flex justify-center items-center mb-6">
                            <LoaderCircle className="w-16 h-16 text-[#FF75A0] animate-spin" />
                            <Share2 className="w-8 h-8 text-[#FF75A0] absolute pr-1" />
                        </div>

                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                            Waiting for the Swap...
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                            Share this link with your friend. This page will
                            update automatically when they send their photo.
                        </p>

                        {/* Share Link Input */}
                        <div className="mb-6 text-left">
                            <GeneratedLinkDisplay
                                generatedLink={shareLink}
                                publicNote="" // Optional: PicSwap usually doesn't show the note here
                                gameMode="pic_swap" // Pass this so we can add a custom message inside GeneratedLinkDisplay if needed
                            />
                        </div>

                        <p className="text-xs text-gray-500 dark:text-gray-500">
                            Don&apos;t worry, we saved this link in your browser.
                            You can find it again from the &quot;My Swaps&quot;
                            button on the navbar if you refresh the page.
                        </p>
                    </div>
                )}

            </div>
        </div>
    );
}
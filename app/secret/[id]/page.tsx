"use client";

import { useEffect, useState, useRef } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id, Doc } from "@/convex/_generated/dataModel";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CountdownTimer } from "@/components/countdown-timer";
import { ShareButton } from "@/components/share-button";
import Image from "next/image";
import { LoaderCircle } from "lucide-react";

export default function SecretPage({ params }: { params: { id: string } }) {
    const [secret, setSecret] = useState<Doc<"secrets"> | null | undefined>(undefined);
    const [isMediaLoading, setIsMediaLoading] = useState(true);
    const revealSecret = useMutation(api.secrets.readAndReveal);
    const hasRevealedRef = useRef(false);

    useEffect(() => {
        if (hasRevealedRef.current) return;
        hasRevealedRef.current = true;
        const reveal = async () => {
            try {
                const revealedSecret = await revealSecret({ secretId: params.id as Id<"secrets"> });
                setSecret(revealedSecret);
                if (revealedSecret && !revealedSecret.fileUrl) {
                    setIsMediaLoading(false);
                }
            } catch (error) {
                console.error("Failed to reveal secret:", error);
                setSecret(null);
            }
        };
        reveal();
    }, [params.id, revealSecret]);

    const handleTimerComplete = () => {
        setSecret(null);
    };

    const handleMediaLoad = () => {
        setIsMediaLoading(false);
    };

    const renderContent = () => {
        if (secret === undefined) return <p>Revealing your secret...</p>;
        if (secret === null) return <p>This secret message could not be found. It may have already been read or deleted.</p>;

        const showLoadingIndicator = secret.fileUrl && isMediaLoading;

        return (
            <>
                {showLoadingIndicator && (
                    <div className="flex flex-col items-center justify-center h-64">
                        <LoaderCircle className="h-8 w-8 animate-spin text-muted-foreground" />
                        <p className="text-sm text-muted-foreground mt-2">Loading secret media...</p>
                    </div>
                )}

                <div style={{ visibility: showLoadingIndicator ? 'hidden' : 'visible' }}>
                    {secret.fileType === "image" && secret.fileUrl && (
                        <div className="relative w-full h-64 mb-4 rounded-lg overflow-hidden">
                            <Image
                                src={secret.fileUrl}
                                alt="Secret Image"
                                layout="fill"
                                objectFit="contain"
                                onLoad={handleMediaLoad}
                                priority // Prioritize loading the secret image
                            />
                        </div>
                    )}
                    {secret.fileType === "video" && secret.fileUrl && (
                        <video
                            src={secret.fileUrl}
                            controls
                            className="w-full rounded-lg mb-4"
                            onLoadedData={handleMediaLoad}
                        />
                    )}
                    {secret.message && (
                        <p className="text-lg sm:text-xl p-4 bg-muted rounded-md">
                            &ldquo;{secret.message}&rdquo;
                        </p>
                    )}
                    
                    {/* This is the key change: Only render the timer when media is NOT loading */}
                    {!isMediaLoading && (
                        <CountdownTimer initialSeconds={10} onComplete={handleTimerComplete} />
                    )}
                </div>
            </>
        );
    };

    const getHeading = () => {
        if (secret && secret.recipientName) {
            return `A Secret Message For ${secret.recipientName}`;
        }
        return "A Secret Message For You";
    };

    return (
        <div className="flex flex-col items-center justify-center text-center gap-y-8 flex-1">
            <div className="max-w-xl p-8 border rounded-lg bg-card shadow-lg">
                <h1 className="text-2xl sm:text-3xl font-bold mb-4">{getHeading()}</h1>
                {renderContent()}
                <div className="flex items-center justify-center gap-x-4 mt-8">
                    {secret && (
                        <ShareButton
                            title="A Secret Message"
                            text={secret.publicNote || "Someone sent you a secret message!"}
                            url={window.location.href}
                        />
                    )}
                    <Button asChild>
                        <Link href="/">Create your own secret message</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
// app/secret/[id]/page.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id, Doc } from "@/convex/_generated/dataModel";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CountdownTimer } from "@/components/countdown-timer";
import { ShareButton } from "@/components/share-button";

export default function SecretPage({ params }: { params: { id: string } }) {
    const [secret, setSecret] = useState<Doc<"secrets"> | null | undefined>(undefined);
    const revealSecret = useMutation(api.secrets.readAndReveal);
    const hasRevealedRef = useRef(false);

    useEffect(() => {
        if (hasRevealedRef.current) return;
        hasRevealedRef.current = true;
        const reveal = async () => {
            try {
                const revealedSecret = await revealSecret({ secretId: params.id as Id<"secrets"> });
                setSecret(revealedSecret);
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

    const renderContent = () => {
        if (secret === undefined) return <p>Revealing your secret...</p>;
        if (secret === null) return <p>This secret message could not be found. It may have already been read or deleted.</p>;

        return (
            <>
                <p className="text-lg sm:text-xl p-4 bg-muted rounded-md">
                    &ldquo;{secret.message}&rdquo;
                </p>
                <CountdownTimer initialSeconds={10} onComplete={handleTimerComplete} />
            </>
        );
    };

    // Personalize the heading based on the recipient's name
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

                {/* 2. Add the ShareButton and the "Create New" button */}
                <div className="flex items-center justify-center gap-x-4 mt-8">
                    {/* The ShareButton is only shown if the secret is visible */}
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
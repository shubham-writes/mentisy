"use client";

import { useEffect, useState, useRef } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id, Doc } from "@/convex/_generated/dataModel";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CountdownTimer } from "@/components/countdown-timer"; // Import the new component

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

    // This function will be passed to the timer and called when it finishes.
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
                {/* Use the new, clean component here */}
                <CountdownTimer initialSeconds={10} onComplete={handleTimerComplete} />
            </>
        );
    };

    return (
        <div className="flex flex-col items-center justify-center text-center gap-y-8 flex-1">
            <div className="max-w-xl p-8 border rounded-lg bg-card shadow-lg">
                <h1 className="text-2xl sm:text-3xl font-bold mb-4">A Secret Message For You</h1>
                {renderContent()}
                <Button asChild className="mt-8">
                    <Link href="/">Create your own secret message</Link>
                </Button>
            </div>
        </div>
    );
}
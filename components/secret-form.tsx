"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShareButton } from "./share-button";

export function SecretForm() {
    const [message, setMessage] = useState("");
    const [recipientName, setRecipientName] = useState("");
    const [publicNote, setPublicNote] = useState("");
    const [generatedLink, setGeneratedLink] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const createSecret = useMutation(api.secrets.create);

    const handleGenerate = async () => {
        if (!message) return;
        setIsLoading(true);
        try {
            const secretId: Id<"secrets"> = await createSecret({ message, recipientName, publicNote });
            const link = `${window.location.origin}/secret/${secretId}`;
            setGeneratedLink(link);
        } catch (error) {
            console.error(error);
            alert("Failed to create secret message.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md p-6 border rounded-lg bg-card">
            <h3 className="text-lg font-semibold mb-4">Create a Secret Message</h3>
            <Input
                placeholder="Recipient's name (optional)"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                className="mb-4"
            />
            <Input
                placeholder="Add a public note (optional)"
                value={publicNote}
                onChange={(e) => setPublicNote(e.target.value)}
                className="mb-4"
            />
            <Input
                placeholder="Your secret message please..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="mb-4"
            />
            <Button onClick={handleGenerate} disabled={isLoading} className="w-full">
                {isLoading ? "Generating..." : "Generate Shareable Link"}
            </Button>
            
            {generatedLink && (
                <div className="mt-4 p-2 border rounded bg-muted text-left">
                    <p className="text-sm text-muted-foreground">Share your message:</p>
                    <div className="text-sm break-all mt-2">
                        <span>{publicNote} </span>
                        <a href={generatedLink} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                            {generatedLink}
                        </a>
                    </div>
                    <div className="mt-4">
                        {/* This is the corrected ShareButton call */}
                        <ShareButton
                            title="A Secret Message"
                            text={publicNote || "Someone sent you a secret message!"}
                            url={generatedLink}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShareButton } from "./share-button";
import { UploadButton } from "./uploadthing";
import { FilePreview } from "./file-preview";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export function SecretForm() {
    const [message, setMessage] = useState("");
    const [recipientName, setRecipientName] = useState("");
    const [publicNote, setPublicNote] = useState("");
    const [generatedLink, setGeneratedLink] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [uploadedFile, setUploadedFile] = useState<{ url: string; type: "image" | "video" } | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [addWatermark, setAddWatermark] = useState(true);
    const createSecret = useMutation(api.secrets.create);

    const handleGenerate = async () => {
        if (!message && !uploadedFile) {
            alert("Please provide a message or upload a file.");
            return;
        }
        setIsLoading(true);
        try {
            const publicId = await createSecret({
                message: message || undefined,
                recipientName,
                publicNote,
                fileUrl: uploadedFile?.url,
                fileType: uploadedFile?.type,
                withWatermark: addWatermark,
            });

            if (publicId) {
                const link = `${window.location.origin}/redirect/${publicId}`;
                setGeneratedLink(link);
            }

            setMessage("");
            setUploadedFile(null);
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

            {uploadedFile ? (
                <FilePreview file={uploadedFile} onRemove={() => setUploadedFile(null)} />
            ) : (
                <div className="mb-4 p-4 border-dashed border-2 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-2">Upload a secret file (optional):</p>
                    <div className="flex justify-center gap-x-4">
                        <UploadButton
                            endpoint="imageUploader"
                            onUploadBegin={() => setIsUploading(true)}
                            onClientUploadComplete={(res) => {
                                if (res) {
                                    setUploadedFile({ url: res[0].url, type: "image" });
                                    setIsUploading(false);
                                }
                            }}
                            onUploadError={(error: Error) => {
                                alert(`ERROR! ${error.message}`);
                                setIsUploading(false);
                            }}
                        />
                        <UploadButton
                            endpoint="videoUploader"
                            onUploadBegin={() => setIsUploading(true)}
                            onClientUploadComplete={(res) => {
                                if (res) {
                                    setUploadedFile({ url: res[0].url, type: "video" });
                                    setIsUploading(false);
                                }
                            }}
                            onUploadError={(error: Error) => {
                                alert(`ERROR! ${error.message}`);
                                setIsUploading(false);
                            }}
                        />
                    </div>
                </div>
            )}

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
                placeholder="Your secret message (optional)"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="mb-4"
            />
            
            <div className="flex items-center space-x-2 mb-4 p-3 bg-muted rounded-md">
                <Switch 
                    id="watermark-toggle" 
                    checked={addWatermark}
                    onCheckedChange={setAddWatermark}
                />
                <Label htmlFor="watermark-toggle" className="flex flex-col">
                    <span>Add Security Watermark</span>
                    {!addWatermark && (
                        <span className="text-xs text-red-500">Warning: Disabling this makes screen recording easier.</span>
                    )}
                </Label>
            </div>

            <Button onClick={handleGenerate} disabled={isLoading || isUploading} className="w-full">
                {isUploading ? "Uploading file..." : (isLoading ? "Generating link..." : "Generate Shareable Link")}
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
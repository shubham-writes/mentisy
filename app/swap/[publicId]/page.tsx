// app/swap/[publicId]/page.tsx
"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
// Note: Removed unused UploadButton import
import { LoaderCircle, ShieldAlert, CheckCircle, Camera } from "lucide-react";
// Note: Removed LoadingOverlayWithProgress import
import { uploadFiles } from "@/components/uploadthing";
// A simple loading overlay component
function LoadingOverlay({ text }: { text: string }) {
    return (
        <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm flex flex-col items-center justify-center z-50">
            <LoaderCircle className="w-12 h-12 animate-spin text-[#FF75A0]" />
            <p className="mt-4 text-lg font-semibold text-gray-700 dark:text-gray-300">
                {text}
            </p>
        </div>
    );
}

// A component to show error or status messages
function StatusCard({
    icon: Icon,
    title,
    message,
    isError = false,
}: {
    icon: React.ElementType;
    title: string;
    message: string;
    isError?: boolean;
}) {
    const colorClass = isError
        ? "text-red-500"
        : "text-green-500";

    return (
        <div className="flex flex-col items-center justify-center text-center p-8 mt-24">
            <Icon className={`w-16 h-16 ${colorClass} mb-10`} />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 mt-24">
                {title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">{message}</p>
        </div>
    );
}


export default function SwapPage() {
    const [isUploading, setIsUploading] = useState(false);
    const [isCompleting, setIsCompleting] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    // Note: Removed handleUploadStart and handleUploadProgress as they
    // are handled inline in handleManualUpload

    const router = useRouter();
    const params = useParams();
    const publicId = params.publicId as string;

    // 1. Get the secret's data in real-time
    const secret = useQuery(api.secrets.getSecretByPublicId, { publicId });
    // 2. Prepare the mutation to complete the swap
    const completeSwap = useMutation(api.secrets.completePicSwap);

    const handleUploadComplete = async (res: any) => {
        setIsUploading(false); // Upload is done
        setIsCompleting(true); // Now we're updating the database

        try {
            const uploadedUrl = res?.[0]?.url;
            if (!uploadedUrl) {
                throw new Error("Upload failed, no URL returned.");
            }

            // 3. Call the mutation with the publicId and new photo URL
            const internalId = await completeSwap({
                publicId: publicId,
                swapFileUrl: uploadedUrl,
            });

            // 4. On success, redirect to the reveal page (instant reveal)
            if (internalId) {
                router.push(`/secret/${internalId}`);
            } else {
                throw new Error("Failed to complete swap. Invalid ID returned.");
            }
        } catch (error) {
            console.error("Failed to complete swap:", error);
            alert("An error occurred while completing the swap. Please try again.");
            setIsCompleting(false);
        }
    };

    // Show a loading spinner while the secret is being fetched
    if (secret === undefined) {
        return <LoadingOverlay text="Loading..." />;
    }

    // Show an error if the secret doesn't exist
    if (secret === null) {
        return (
            <StatusCard
                icon={ShieldAlert}
                title="Link Not Found"
                message="This PicSwap link is invalid or has been deleted."
                isError
            />
        );
    }

    // Show a message if the swap was already completed
    if (secret.swapFileUrl) {
        return (
            <StatusCard
                icon={CheckCircle}
                title="Swap Already Completed"
                message="This photo swap has already been completed. Redirecting you..."
            />
        );
        // We could even add: router.push(`/secret/${secret._id}`);
    }

    // ✅ Manual upload handler with live progress tracking
    const handleManualUpload = async (files: FileList | null) => {
        if (!files || files.length === 0) return;

        setIsUploading(true);
        setUploadProgress(0);

        try {
            // --- This is the corrected call ---
            const res = await uploadFiles("imageUploader", {
                files: Array.from(files),
                onUploadProgress: (opts) => {
                    setUploadProgress(opts.totalProgress);
                },
            });
            setUploadProgress(100);
            setTimeout(() => {
                handleUploadComplete(res);
            }, 1000);

        } catch (err: any) {
            alert(`Upload failed: ${err.message}`);
            setIsUploading(false);
        }
    };


    // The main "Upload Gate" UI
    return (
        <div className="relative flex flex-col items-center justify-center min-h-[calc(100vh-200px)] mt-20 p-4">

            {/* ===== CHANGED ===== */}
            {/* Now shows "Completing..." overlay AFTER upload */}
            {isCompleting && <LoadingOverlay text="Completing swap..." />}

            {/* ===== REMOVED ===== */}
            {/* Removed the full-screen LoadingOverlayWithProgress */}

            <div className="w-full max-w-md text-center bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-xl shadow-xl p-8 sm:p-12">
                <div className="w-20 h-20 mb-6 bg-gradient-to-br from-[#FF75A0] to-[#FFAA70] rounded-xl flex items-center justify-center shadow-lg mx-auto">
                    <Camera className="w-10 h-10 text-white" />
                </div>

                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                    It's a PicSwap!
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                    To see their photo, you must upload one of your own in return.
                </p>

                {/* Custom Upload Input with Progress */}
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleManualUpload(e.target.files)}
                    className="hidden"
                    id="photo-upload"
                />

                <label
                    htmlFor="photo-upload"
                    className="w-full cursor-pointer text-base font-semibold bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] hover:from-[#e65a85] hover:to-[#e6955a] h-14 rounded-lg shadow-lg transition-all flex items-center justify-center"
                >
                    Upload & Reveal Photo
                </label>

                {/* ===== ADDED ===== */}
                {/* This is the new inline progress bar */}
                {isUploading && (
                    <div className="w-full max-w-xs mx-auto mt-8">
                        <div className="flex items-center justify-between text-sm text-[#FF75A0] mb-2">
                            <span className="font-medium">
                                {uploadProgress < 100 ? 'Uploading...' : 'Almost done!'}
                            </span>
                            <span className="font-bold">{Math.round(uploadProgress)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] rounded-full transition-all duration-300 ease-out"
                                style={{ width: `${uploadProgress}%` }}
                            />
                        </div>
                    </div>
                )}
                {/* =================== */}

                <p className="text-xs text-gray-500 dark:text-gray-500 mt-6">
                    Your photo will be sent to the original sender.
                </p>
            </div>
        </div>
    );
}
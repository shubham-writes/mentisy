"use client";

import React from "react";

interface LoadingOverlayWithProgressProps {
    /** The main loading message to show */
    text?: string;

    /** The numeric progress percentage (0–100) */
    progress?: number;

    /** Whether the overlay is visible */
    isVisible: boolean;
}

/**
 * A full-screen loading overlay with a progress bar and percentage.
 * Reusable anywhere for uploads, downloads, or async operations.
 */
export default function LoadingOverlayWithProgress({
    text = "Loading...",
    progress = 0,
    isVisible,
}: LoadingOverlayWithProgressProps) {
    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm p-6">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 max-w-sm w-full text-center">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                    {text}
                </h3>

                <div className="w-full max-w-xs mx-auto">
                    <div className="flex items-center justify-between text-sm text-[#FF75A0] mb-2">
                        <span className="font-medium">
                            {progress < 100 ? "Please wait..." : "Almost done!"}
                        </span>
                        <span className="font-bold">{Math.round(progress)}%</span>
                    </div>

                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] rounded-full transition-all duration-300 ease-out"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

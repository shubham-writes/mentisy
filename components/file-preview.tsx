"use client";
import Image from "next/image";
import { Button } from "./ui/button";
import { X } from "lucide-react";

interface FilePreviewProps {
  file: {
    url: string;
    type: "image" | "video";
  };
  onRemove: () => void;
}

export function FilePreview({ file, onRemove }: FilePreviewProps) {
  return (
    <div className="mb-4">
      <p className="text-sm text-muted-foreground mb-2">Your uploaded file:</p>
      <div className="relative w-full h-48 border rounded-lg overflow-hidden group">
        {file.type === "image" ? (
          <Image
            src={file.url}
            alt="Uploaded preview"
            fill
            style={{ objectFit: "contain" }}
          />
        ) : (
          <div className="relative w-full h-full">
            <video
              src={file.url}
              controls
              playsInline
              preload="metadata"
              muted // Start muted by default
              className="w-full h-full object-contain bg-black"
              onLoadedMetadata={(e) => {
                // Ensure volume controls are available but keep muted initially
                e.currentTarget.volume = 0.5;
                // Keep muted = true for initial state
              }}
            >
              Your browser does not support the video tag.
            </video>
          </div>
        )}
        <Button
          variant="destructive"
          size="icon"
          className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity z-10"
          onClick={onRemove}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
"use client";
import Image from "next/image";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { Watermark } from "./watermark";
import { useState } from "react";

interface FilePreviewProps {
  file: {
    url: string;
    type: "image" | "video";
  };
  onRemove: () => void;
  recipientName?: string;
  showWatermark?: boolean;
}

export function FilePreview({ file, onRemove, recipientName, showWatermark = false }: FilePreviewProps) {
  const [isFileLoaded, setIsFileLoaded] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    setDimensions({ width: img.naturalWidth, height: img.naturalHeight });
    setIsFileLoaded(true);
  };

  const handleVideoLoad = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    setDimensions({ width: video.videoWidth, height: video.videoHeight });
    setIsFileLoaded(true);
  };

  // Determine if image/video is portrait or landscape
  const isPortrait = dimensions.height > dimensions.width;
  const aspectRatio = dimensions.width / dimensions.height;

  // Dynamic container sizing with proper constraints
  const getContainerStyle = () => {
    if (!isFileLoaded) return { 
      height: '300px',
      maxWidth: '100%'
    };
    
    const maxWidth = 800;  // Maximum container width
    const maxHeight = 500; // Maximum container height
    const minWidth = 300;  // Minimum container width
    const minHeight = 200; // Minimum container height
    
    if (dimensions.width === 0 || dimensions.height === 0) {
      return { height: '300px', maxWidth: '100%' };
    }
    
    // Calculate the display size maintaining aspect ratio
    let displayWidth = dimensions.width;
    let displayHeight = dimensions.height;
    
    // Scale down if too large
    if (displayWidth > maxWidth) {
      displayHeight = (displayHeight * maxWidth) / displayWidth;
      displayWidth = maxWidth;
    }
    
    if (displayHeight > maxHeight) {
      displayWidth = (displayWidth * maxHeight) / displayHeight;
      displayHeight = maxHeight;
    }
    
    // Scale up if too small (but maintain aspect ratio)
    if (displayWidth < minWidth && displayHeight < minHeight) {
      const scale = Math.min(minWidth / displayWidth, minHeight / displayHeight);
      displayWidth *= scale;
      displayHeight *= scale;
    }
    
    return {
      width: `${Math.round(displayWidth)}px`,
      height: `${Math.round(displayHeight)}px`,
      maxWidth: '100%', // Responsive on mobile
      margin: '0 auto'   // Center the container
    };
  };

  return (
    <div className="w-full">
      <p className="text-sm text-muted-foreground mb-3">Your uploaded file:</p>
      <div 
        className="relative w-full border rounded-xl overflow-hidden group bg-gray-50 dark:bg-gray-900"
        style={getContainerStyle()}
      >
        {file.type === "image" ? (
          <div className="relative w-full h-full">
            <Image
              src={file.url}
              alt="Uploaded preview"
              fill
              style={{ 
                objectFit: "contain",
                objectPosition: "center"
              }}
              onLoad={handleImageLoad}
              className="transition-opacity duration-300"
              priority
            />
            {/* Watermark overlay - only over the image */}
            {showWatermark && isFileLoaded && (
              <div className="absolute inset-0">
                <Watermark 
                  name={recipientName || 'Preview User'} 
                  ip="123.456.789.011" 
                  animated={false} 
                />
              </div>
            )}
          </div>
        ) : (
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="relative max-w-full max-h-full">
              <video
                src={file.url}
                controls
                playsInline
                preload="metadata"
                muted
                className="block max-w-full max-h-full"
                onLoadedMetadata={(e) => {
                  e.currentTarget.volume = 0.5;
                  handleVideoLoad(e);
                }}
                style={{
                  width: 'auto',
                  height: 'auto'
                }}
              >
                Your browser does not support the video tag.
              </video>
              {/* Watermark overlay - positioned absolutely over the video */}
              {showWatermark && isFileLoaded && (
                <div className="absolute inset-0 pointer-events-none">
                  <Watermark 
                    name={recipientName || 'Preview User'} 
                    ip="123.456.789.011" 
                    animated={true} 
                  />
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Remove button */}
        <Button
          variant="destructive"
          size="icon"
          className="absolute top-3 right-3 h-8 w-8 opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg z-20"
          onClick={onRemove}
        >
          <X className="h-4 w-4" />
        </Button>

        {/* Loading indicator */}
        {!isFileLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
              <p className="text-sm text-muted-foreground">Loading preview...</p>
            </div>
          </div>
        )}
      </div>
      
      {/* File info and watermark note */}
      <div className="mt-3 space-y-1">
        {isFileLoaded && (
          <p className="text-xs text-muted-foreground">
            {dimensions.width} × {dimensions.height} • {file.type === "image" ? "Image" : "Video"}
          </p>
        )}
        {showWatermark && (
          <p className="text-xs text-muted-foreground">
            Preview with watermark (actual recipient IP will be shown)
          </p>
        )}
      </div>
    </div>
  );
}
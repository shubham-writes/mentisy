"use client";
import Image from "next/image";
import { Button } from "./ui/button";
import { X, FileImage, Play } from "lucide-react";
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

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="w-full space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#FF75A0]/20 to-[#FFAA70]/20 rounded-xl flex items-center justify-center">
            {file.type === "image" ? (
              <FileImage className="w-5 h-5   text-[#FF75A0]" />
            ) : (
              <Play className="w-5 h-5 text-[#FFAA70]" />
            )}
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 dark:text-gray-200">
              Your {file.type === "image" ? "Photo" : "Video"}
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Ready to share
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
          onClick={onRemove}
        >
          <X className="w-4 h-4 mr-1" />
          Remove
        </Button>
      </div>

      {/* Fixed Size Preview Container */}
      <div className="relative w-full aspect-video bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm">
        
        {/* Content Container */}
        <div className="absolute inset-0 flex items-center justify-center p-4">
          {file.type === "image" ? (
            <div className="relative w-full h-full">
              <Image
                src={file.url}
                alt="Uploaded preview"
                fill
                style={{ 
                  objectFit: "contain"
                }}
                onLoad={handleImageLoad}
                className={`transition-all duration-500 ${
                  isFileLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                priority
              />
              {/* Watermark overlay - only on the image */}
              {showWatermark && isFileLoaded && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
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
              <video
                src={file.url}
                controls
                playsInline
                preload="metadata"
                muted
                style={{ 
                  maxWidth: "100%",
                  maxHeight: "100%",
                  width: "auto",
                  height: "auto"
                }}
                className={`rounded-xl shadow-lg transition-all duration-500 ${
                  isFileLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoadedMetadata={(e) => {
                  e.currentTarget.volume = 0.5;
                  handleVideoLoad(e);
                }}
              >
                Your browser does not support the video tag.
              </video>
              {/* Watermark overlay - only on the video */}
              {showWatermark && isFileLoaded && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
                  <Watermark 
                    name={recipientName || 'Preview User'} 
                    ip="123.456.789.011" 
                    animated={true} 
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Professional Loading State */}
        {!isFileLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
            <div className="relative">
              <div className="w-12 h-12 border-4 border-gray-200 dark:border-gray-700 rounded-full"></div>
              <div className="absolute top-0 left-0 w-12 h-12 border-4 border-[#FF75A0] border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p className="mt-4 text-sm font-medium text-gray-600 dark:text-gray-400">
              Processing your {file.type}...
            </p>
          </div>
        )}

        {/* Subtle Corner Badge */}
        {isFileLoaded && (
          <div className="absolute top-4 left-4">
            <div className="px-3 py-1 bg-black/10 dark:bg-white/10 backdrop-blur-sm rounded-full">
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                {file.type}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Professional File Info Panel */}
      {isFileLoaded && (
        <div className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl p-4 border border-gray-100 dark:border-gray-800">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                Dimensions
              </p>
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                {dimensions.width} × {dimensions.height}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                Security
              </p>
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                {showWatermark ? (
                  <span className="text-green-600 dark:text-green-400">Protected</span>
                ) : (
                  <span className="text-amber-600 dark:text-amber-400">Basic</span>
                )}
              </p>
            </div>
          </div>
          
          {showWatermark && (
            <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Watermark will show recipient&apos;s actual details
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
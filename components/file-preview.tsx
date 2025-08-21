"use client";
import Image from "next/image";
import { Button } from "./ui/button";
import { X, FileImage, Play } from "lucide-react";
import { Watermark } from "./watermark";
import { useState, useRef } from "react";

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
  const [renderedSize, setRenderedSize] = useState({ width: 0, height: 0 });

  const imageRef = useRef<HTMLImageElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    setDimensions({ width: img.naturalWidth, height: img.naturalHeight });
    const rect = img.getBoundingClientRect();
    setRenderedSize({ width: rect.width, height: rect.height });
    setIsFileLoaded(true);
  };

  const handleVideoLoad = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    setDimensions({ width: video.videoWidth, height: video.videoHeight });
    const rect = video.getBoundingClientRect();
    setRenderedSize({ width: rect.width, height: rect.height });
    setIsFileLoaded(true);
  };

  return (
    <div className="w-full space-y-3 sm:space-y-4">
      {/* Header - Mobile Optimized */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#FF75A0]/20 to-[#FFAA70]/20 rounded-lg sm:rounded-xl flex items-center justify-center">
            {file.type === "image" ? (
              <FileImage className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF75A0]" />
            ) : (
              <Play className="w-4 h-4 sm:w-5 sm:h-5 text-[#FFAA70]" />
            )}
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-200">
              Your {file.type === "image" ? "Photo" : "Video"}
            </h4>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              Ready to share
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors text-xs sm:text-sm px-2 sm:px-3 h-8 sm:h-9"
          onClick={onRemove}
        >
          <X className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
          Remove
        </Button>
      </div>

      {/* Preview Container - Responsive to container context */}
      <div className="relative h-[65vh] w-full aspect-[4/3] sm:aspect-[5/4] md:aspect-[4/3] lg:aspect-[5/4] xl:aspect-video bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl sm:rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="absolute inset-0 flex items-center justify-center p-2 sm:p-4">
          {file.type === "image" ? (
            <div className="relative w-full h-full">
              <Image
                ref={imageRef}
                src={file.url}
                alt="Uploaded preview"
                fill
                style={{ objectFit: "contain" }}
                onLoad={handleImageLoad}
                className={`transition-all duration-500 ${
                  isFileLoaded ? "opacity-100" : "opacity-0"
                }`}
                priority
              />
              {showWatermark && isFileLoaded && (
                <div
                  className="absolute pointer-events-none overflow-hidden"
                  style={{
                    width: renderedSize.width,
                    height: renderedSize.height,
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <Watermark
                    name={recipientName || "Preview User"}
                    ip="123.456.789.011"
                    animated={false}
                    mode="image"
                  />
                </div>
              )}
            </div>
          ) : (
            <div className="relative w-full h-full flex items-center justify-center">
              <video
                ref={videoRef}
                src={file.url}
                controls
                playsInline
                preload="metadata"
                muted
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  width: "auto",
                  height: "auto",
                }}
                className={`rounded-lg sm:rounded-xl shadow-lg transition-all duration-500 ${
                  isFileLoaded ? "opacity-100" : "opacity-0"
                }`}
                onLoadedMetadata={(e) => {
                  e.currentTarget.volume = 0.5;
                  handleVideoLoad(e);
                }}
              >
                Your browser does not support the video tag.
              </video>
              {showWatermark && isFileLoaded && (
                <div
                  className="absolute pointer-events-none overflow-hidden"
                  style={{
                    width: renderedSize.width,
                    height: renderedSize.height,
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <Watermark
                    name={recipientName || "Preview User"}
                    ip="123.456.789.011"
                    animated={true}
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Loading State - Mobile Optimized */}
        {!isFileLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
            <div className="relative">
              <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-gray-200 dark:border-gray-700 rounded-full"></div>
              <div className="absolute top-0 left-0 w-10 h-10 sm:w-12 sm:h-12 border-4 border-[#FF75A0] border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p className="mt-3 sm:mt-4 text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
              Processing your {file.type}...
            </p>
          </div>
        )}

        {/* File Type Badge - Mobile Positioned */}
        {isFileLoaded && (
          <div className="absolute top-2 left-2 sm:top-4 sm:left-4">
            <div className="px-2 py-1 sm:px-3 sm:py-1 bg-black/10 dark:bg-white/10 backdrop-blur-sm rounded-full">
              <span className="text-[10px] sm:text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                {file.type}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Info Panel - Mobile Compact, Desktop Same */}
      {isFileLoaded && (
        <div className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-gray-100 dark:border-gray-800">
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div>
              <p className="text-[10px] sm:text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                Dimensions
              </p>
              <p className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-200">
                {dimensions.width} × {dimensions.height}
              </p>
            </div>
            <div>
              <p className="text-[10px] sm:text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                Security
              </p>
              <p className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-200">
                {showWatermark ? (
                  <span className="text-green-600 dark:text-green-400">Protected</span>
                ) : (
                  <span className="text-amber-600 dark:text-amber-400">Basic</span>
                )}
              </p>
            </div>
          </div>

          {showWatermark && (
            <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <p className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400">
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
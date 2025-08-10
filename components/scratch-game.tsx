"use client";

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { Watermark } from '@/components/watermark'; // Import your watermark component

interface ScratchGameProps {
    imageUrl: string;
    onImageReady: () => void;
    onScratchComplete: () => void;
    overlayColor?: string;
    scratchSize?: number;
    // New props for watermark and message
    recipientName?: string | undefined;
    receiverIp?: string | null | undefined;
    withWatermark?: boolean | undefined;
    message?: string | undefined;
    expandedMessages?: {[key: string]: boolean};
    onToggleMessage?: (messageId: string) => void;
    // Auto-completion settings
    autoCompleteThreshold?: number; // Default 90%
    autoCompleteDelay?: number; // Default 300ms
}

// Helper function to truncate message
const truncateMessage = (message: string, maxLength: number = 100) => {
    if (message.length <= maxLength) return message;
    return message.substring(0, maxLength) + '...';
};

export function ScratchGame({
    imageUrl,
    onImageReady,
    onScratchComplete,
    overlayColor = '#d1d5db',
    scratchSize = 40,
    recipientName,
    receiverIp,
    withWatermark,
    message,
    expandedMessages = {},
    onToggleMessage,
    autoCompleteThreshold = 70,
    autoCompleteDelay = 300,
}: ScratchGameProps) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const autoCompleteTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [isScratching, setIsScratching] = useState(false);
    const [hasStartedScratching, setHasStartedScratching] = useState(false);
    const [isGameComplete, setIsGameComplete] = useState(false);
    const [isAutoCompleting, setIsAutoCompleting] = useState(false);
    const [scratchProgress, setScratchProgress] = useState(0);
    const isReadyFired = useRef(false);
    
    const handleImageLoad = () => {
        setIsImageLoaded(true);
        if (!isReadyFired.current) {
            onImageReady();
            isReadyFired.current = true;
        }
    };

    const initCanvas = () => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const rect = container.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Fill canvas with overlay color
        ctx.fillStyle = overlayColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        return ctx;
    };

    const getCanvasPosition = (e: MouseEvent | TouchEvent, canvas: HTMLCanvasElement) => {
        const rect = canvas.getBoundingClientRect();
        const clientX = e instanceof MouseEvent ? e.clientX : e.touches[0]?.clientX || 0;
        const clientY = e instanceof MouseEvent ? e.clientY : e.touches[0]?.clientY || 0;
        
        return {
            x: clientX - rect.left,
            y: clientY - rect.top
        };
    };

    const scratch = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(x, y, scratchSize / 2, 0, 2 * Math.PI);
        ctx.fill();
    };

    // Simple auto-completion without animation
    const autoCompleteReveal = () => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!ctx || !canvas || isAutoCompleting || isGameComplete) return;

        setIsAutoCompleting(true);
        
        // Clear the scratch overlay completely
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Set completion state first
        setIsGameComplete(true);
        
        // Reset auto-completing state after a brief moment
        setTimeout(() => {
            setIsAutoCompleting(false);
            onScratchComplete();
        }, 100);
    };

    const checkScratchProgress = () => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!ctx || !canvas || isGameComplete || isAutoCompleting) return;

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;
        let transparentPixels = 0;

        for (let i = 3; i < pixels.length; i += 4) {
            if (pixels[i] < 128) { // Check alpha channel
                transparentPixels++;
            }
        }

        const scratchedPercent = (transparentPixels / (canvas.width * canvas.height)) * 100;
        setScratchProgress(Math.round(scratchedPercent));
        
        // Clear any existing auto-complete timeout
        if (autoCompleteTimeoutRef.current) {
            clearTimeout(autoCompleteTimeoutRef.current);
        }

        // Check if we've reached the auto-completion threshold
        if (scratchedPercent >= autoCompleteThreshold) {
            // Add a small delay before auto-completing for better UX
            autoCompleteTimeoutRef.current = setTimeout(() => {
                autoCompleteReveal();
            }, autoCompleteDelay);
        }
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        // Don't initialize canvas if game is already complete
        if (!canvas || !isImageLoaded || isGameComplete) return;

        const ctx = initCanvas();
        if (!ctx) return;

        let isDrawing = false;
        let lastPoint: { x: number; y: number } | null = null;

        const handleStart = (e: MouseEvent | TouchEvent) => {
            if (isAutoCompleting || isGameComplete) return;
            e.preventDefault();
            const pos = getCanvasPosition(e, canvas);
            isDrawing = true;
            lastPoint = pos;
            setIsScratching(true);
            setHasStartedScratching(true);
            scratch(ctx, pos.x, pos.y);
        };

        const handleMove = (e: MouseEvent | TouchEvent) => {
            if (!isDrawing || isAutoCompleting || isGameComplete) return;
            e.preventDefault();
            
            const pos = getCanvasPosition(e, canvas);
            
            // Only scratch if the position is within canvas bounds
            if (pos.x >= 0 && pos.x <= canvas.width && pos.y >= 0 && pos.y <= canvas.height) {
                // Draw line from last point to current point for smooth scratching
                if (lastPoint && lastPoint.x >= 0 && lastPoint.x <= canvas.width && 
                    lastPoint.y >= 0 && lastPoint.y <= canvas.height) {
                    ctx.globalCompositeOperation = 'destination-out';
                    ctx.lineWidth = scratchSize;
                    ctx.lineCap = 'round';
                    ctx.lineJoin = 'round';
                    ctx.beginPath();
                    ctx.moveTo(lastPoint.x, lastPoint.y);
                    ctx.lineTo(pos.x, pos.y);
                    ctx.stroke();
                }
                lastPoint = pos;
            }
        };

        const handleEnd = () => {
            if (!isDrawing || isAutoCompleting || isGameComplete) return;
            isDrawing = false;
            lastPoint = null;
            setIsScratching(false);
            setTimeout(checkScratchProgress, 100);
        };

        // Canvas events for starting
        canvas.addEventListener('mousedown', handleStart);
        canvas.addEventListener('touchstart', handleStart, { passive: false });

        // Document events for continuing scratch even outside canvas
        const handleDocumentMove = (e: MouseEvent | TouchEvent) => {
            if (isDrawing) {
                handleMove(e);
            }
        };

        const handleDocumentEnd = (e: MouseEvent | TouchEvent) => {
            if (isDrawing) {
                handleEnd();
            }
        };

        // Add document-level listeners for move and end events
        document.addEventListener('mousemove', handleDocumentMove);
        document.addEventListener('mouseup', handleDocumentEnd);
        document.addEventListener('touchmove', handleDocumentMove, { passive: false });
        document.addEventListener('touchend', handleDocumentEnd);
        document.addEventListener('touchcancel', handleDocumentEnd);

        // Canvas-specific move event (for better performance when inside canvas)
        canvas.addEventListener('mousemove', handleMove);
        canvas.addEventListener('touchmove', handleMove, { passive: false });

        // Prevent context menu
        canvas.addEventListener('contextmenu', (e) => e.preventDefault());

        return () => {
            // Clear any pending auto-complete timeout
            if (autoCompleteTimeoutRef.current) {
                clearTimeout(autoCompleteTimeoutRef.current);
            }

            // Remove canvas listeners
            canvas.removeEventListener('mousedown', handleStart);
            canvas.removeEventListener('mousemove', handleMove);
            canvas.removeEventListener('touchstart', handleStart);
            canvas.removeEventListener('touchmove', handleMove);
            canvas.removeEventListener('contextmenu', (e) => e.preventDefault());

            // Remove document listeners
            document.removeEventListener('mousemove', handleDocumentMove);
            document.removeEventListener('mouseup', handleDocumentEnd);
            document.removeEventListener('touchmove', handleDocumentMove);
            document.removeEventListener('touchend', handleDocumentEnd);
            document.removeEventListener('touchcancel', handleDocumentEnd);
        };
    }, [isImageLoaded, overlayColor, scratchSize, autoCompleteThreshold, autoCompleteDelay, isAutoCompleting, isGameComplete]);

    // Handle window resize
    useEffect(() => {
        const handleResize = () => {
            // Don't reinitialize canvas if game is complete
            if (isImageLoaded && !isGameComplete && !isAutoCompleting) {
                initCanvas();
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isImageLoaded, overlayColor, isGameComplete, isAutoCompleting]);

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (autoCompleteTimeoutRef.current) {
                clearTimeout(autoCompleteTimeoutRef.current);
            }
        };
    }, []);

    return (
        <div 
            ref={containerRef} 
            className="relative w-full h-[80vh] sm:max-h-96 rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-700"
        >
            {/* Base Image */}
            <Image
                src={imageUrl}
                alt="Secret Image"
                fill
                style={{ objectFit: 'contain' }}
                onLoad={handleImageLoad}
                priority
                className="rounded-xl"
            />
            
            {/* Watermark - Always visible when enabled */}
            {withWatermark && recipientName && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl z-10">
                    <Watermark
                        name={recipientName}
                        ip={receiverIp || undefined}
                    />
                </div>
            )}
            
            {/* Scratch Canvas - Hide completely when game is complete */}
            <canvas
                ref={canvasRef}
                className={`absolute top-0 left-0 w-full h-full touch-none z-20 ${
                    isGameComplete ? 'hidden' : isAutoCompleting ? 'cursor-wait' : 'cursor-crosshair'
                }`}
                style={{ 
                    touchAction: 'none',
                    userSelect: 'none',
                    WebkitUserSelect: 'none'
                }}
            />
            
            {/* Progress Indicator - Shows during scratching */}
            {hasStartedScratching && !isGameComplete && (
                <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium z-30">
                    {scratchProgress}%
                    {scratchProgress >= autoCompleteThreshold && isAutoCompleting && (
                        <span className="ml-1 animate-pulse">✨</span>
                    )}
                </div>
            )}
            
            {/* Instructions Overlay - Only shown before scratching starts */}
            {isImageLoaded && !hasStartedScratching && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 pointer-events-none z-30">
                    <div className="text-white text-center p-4">
                        <p className="text-3xl mb-2">🐾</p>
                        <h3 className="font-bold text-xl drop-shadow-lg">Scratch to Reveal!</h3>
                        <p className="text-sm drop-shadow-md">Click and drag to scratch off the coating</p>
                        <p className="text-xs drop-shadow-md mt-1 opacity-75">Auto-completes at {autoCompleteThreshold}%</p>
                    </div>
                </div>
            )}

            {/* Auto-completion notification - smaller and less intrusive */}
            {isAutoCompleting && (
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 pointer-events-none z-40">
                    <div className="bg-green-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full shadow-lg">
                        <p className="text-xs font-medium flex items-center">
                            <span className="mr-1">✨</span>
                            Auto-completing...
                        </p>
                    </div>
                </div>
            )}
            

        </div>
    );
}
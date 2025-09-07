// components/yes-no-game.tsx
"use client";

import { useState, ReactNode } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Watermark } from '@/components/watermark';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

interface YesNoGameProps {
  question: string;
  yesImageUrl: string;
  noImageUrl: string;
  onImageReady: () => void;
  recipientName?: string;
  receiverIp?: string;
  withWatermark?: boolean;
  timerComponent?: ReactNode; // ✅ ADD: Prop for the timer
}

export function YesNoGame({
  question,
  yesImageUrl,
  noImageUrl,
  onImageReady,
  recipientName,
  receiverIp,
  withWatermark,
  timerComponent, // ✅ ADD: Get the timer prop
}: YesNoGameProps) {
  const [revealed, setRevealed] = useState<'yes' | 'no' | null>(null);

  // Render nothing if image URLs are missing to prevent errors
  if (!yesImageUrl || !noImageUrl) {
    return (
        <div className="text-center p-8 bg-red-50 rounded-lg">
            <p className="text-red-600 font-semibold">Error: Game images are missing.</p>
        </div>
    );
  }

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Question Box */}
      <div className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 rounded-lg px-4 py-3 border border-teal-200/50 dark:border-teal-700/50 shadow-lg mb-3 text-center">
        <h3 className="font-semibold text-sm text-gray-800 dark:text-gray-200 mb-1">The question is...</h3>
        <p className="text-lg font-bold text-teal-800 dark:text-teal-200">{question}</p>
      </div>

      {/* Image Container */}
      <div className="relative w-full h-[80vh] sm:max-h-96 rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-700 shadow-xl mb-4">
        {revealed && (
          <>
            <Image
              src={revealed === 'yes' ? yesImageUrl : noImageUrl}
              alt="Revealed Image"
              fill
              style={{ objectFit: 'contain' }}
              onLoad={onImageReady}
              priority
              className="rounded-xl animate-in fade-in duration-500"
            />
             {withWatermark && (
                <Watermark name={recipientName} ip={receiverIp || undefined} mode="image" />
             )}
             {/* ✅ ADD: Display the timer once an image is revealed */}
             {timerComponent}
          </>
        )}
        
        {/* Overlay with Buttons */}
        {!revealed && (
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex flex-col items-center justify-center z-20 rounded-xl p-4">
                <div className="text-center text-white space-y-4">
                    <h3 className="font-bold text-2xl">What&apos;s your answer?</h3>
                    <div className="flex gap-4">
                         <Button onClick={() => setRevealed('yes')} size="lg" className="bg-green-500 hover:bg-green-600 h-14 text-lg px-8">
                             <ThumbsUp className="w-6 h-6 mr-2" /> Yes
                         </Button>
                         <Button onClick={() => setRevealed('no')} size="lg" className="bg-red-500 hover:bg-red-600 h-14 text-lg px-8">
                            <ThumbsDown className="w-6 h-6 mr-2" /> No
                         </Button>
                    </div>
                </div>
            </div>
        )}
      </div>
    </div>
  );
}
// components/secret-page/ErrorStates.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GameMode } from "@/lib/types";


interface ErrorStatesProps {
  type: 'not-found' | 'expired';
  gameMode?: GameMode | string;
}

export function ErrorStates({ type, gameMode = "none" }: ErrorStatesProps) {
  if (type === 'not-found') {
    return (
      <div className="text-center py-8 sm:py-16">
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/30 rounded-full flex items-center justify-center text-xl sm:text-2xl mx-auto mb-4 sm:mb-6 shadow-lg">
          ❌
        </div>
        <p className="text-lg sm:text-xl text-red-600 dark:text-red-400 font-medium mb-2">
          Oops! Link Not Found
        </p>
        <p className="text-gray-600 dark:text-gray-400 mb-6 sm:mb-8 px-2 text-sm sm:text-base">
          This link has either vanished or was already used.
        </p>
        <Button
          asChild
          size="lg"
          className="bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] hover:from-[#FF75A0]/90 hover:to-[#FFAA70]/90 text-white font-medium px-6 py-3 sm:px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 border-0 text-sm sm:text-base"
        >
          <Link href="/">✨ Start a PicSwap</Link>
        </Button>
      </div>
    );
  }

  let ctaText = "✨ Start a New Challenge";
  const ctaLink = "/"; // All links go to the home page

  switch (gameMode) {
    case "pic_swap":
      ctaText = "✨ Start Your Own PicSwap";
      break;
    case "qa_challenge":
      ctaText = "✨ Start a Q&A Challenge";
      break;
    case "reveal_rush":
      ctaText = "✨ Start a Reveal Rush";
      break;
    case "scratch_and_see":
      ctaText = "✨ Make a Scratch Card";
      break;
    case "yes_or_no":
      ctaText = "✨ Make a Yes/No Game";
      break;
    default:
      ctaText = "✨ Create a Fun Link";
  }

  return (
    <div className="text-center py-8 sm:py-16">
      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-full flex items-center justify-center text-2xl sm:text-3xl mx-auto mb-4 sm:mb-6 shadow-lg">
        💨
      </div>
      <h3 className="text-xl sm:text-2xl font-bold text-gray-700 dark:text-gray-200 mb-3">
        Vanished Into Thin Air
      </h3>
      <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg mb-2 px-2">
        This link has already been used – it’s gone!
      </p>
      <p className="text-sm text-gray-400 dark:text-gray-500 mb-6 sm:mb-8 px-2">
        Some moments are meant to be fleeting ✨
      </p>
      <Button
        asChild
        size="lg"
        className="bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] hover:from-[#FF75A0]/90 hover:to-[#FFAA70]/90 text-white font-medium px-6 py-3 sm:px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 border-0 text-sm sm:text-base"
      >
        <Link href={ctaLink}>{ctaText}</Link>
      </Button>
    </div>
  );
}
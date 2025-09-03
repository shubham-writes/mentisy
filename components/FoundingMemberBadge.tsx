// components/FoundingMemberBadge.tsx
"use client";

import { useUser } from "@clerk/nextjs";
import { Crown, Sparkles } from "lucide-react";

export default function FoundingMemberBadge() {
  const { user, isLoaded } = useUser();

  // Don't render anything until user is loaded
  if (!isLoaded) {
    return (
      <div className="w-20 h-6 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-full" />
    );
  }

  if (!user) return null;
  
  // Check if user has founding member status
  const isFoundingMember = user?.publicMetadata?.isFoundingMember === true;
  
  if (!isFoundingMember) {
    return null;
  }

  return (
    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] text-white shadow-lg ring-2 ring-[#FF75A0]/20">
      <Crown className="w-3 h-3" />
      <span className="text-xs font-bold tracking-wide">FOUNDER</span>
      
    </div>
  );
}
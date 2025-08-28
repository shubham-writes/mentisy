// components/FoundingMemberBadge.tsx
"use client";

import { useUser } from "@clerk/nextjs";
import { Crown, Sparkles } from "lucide-react";

export default function FoundingMemberBadge() {
  const { user } = useUser();
  
  // Check if user has founding member status
  const isFoundingMember = user?.publicMetadata?.isFoundingMember === true;
  
  if (!isFoundingMember) return null;

  return (
    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] text-white shadow-lg ring-2 ring-[#FF75A0]/20 animate-pulse">
      <Crown className="w-3 h-3" />
      <span className="text-xs font-bold tracking-wide">FOUNDER</span>
      <Sparkles className="w-3 h-3" />
    </div>
  );
}
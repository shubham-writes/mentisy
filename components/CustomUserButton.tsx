// components/CustomUserButton.tsx
"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import { type Appearance } from "@clerk/types";
import FoundingMemberBadge from "./FoundingMemberBadge";
import { clerkAppearance } from "../lib/clerkAppearance";

interface CustomUserButtonProps {
  afterSignOutUrl?: string;
  userProfileUrl?: string;
  appearance?: Appearance;
}

export default function CustomUserButton({ 
  afterSignOutUrl = "/",
  userProfileUrl = "/user-profile",
  appearance
}: CustomUserButtonProps) {
  const { user } = useUser();
  
  // Check if user is a founding member
  const isFoundingMember = user?.publicMetadata?.isFoundingMember === true;
  
  // Merge the default appearance with any custom appearance passed in
  const finalAppearance = appearance ? { ...clerkAppearance, ...appearance } : clerkAppearance;

  return (
    <div className={`flex items-center gap-3 ${isFoundingMember ? 'pr-1' : ''}`}>
      <UserButton 
        appearance={finalAppearance}
        afterSignOutUrl={afterSignOutUrl}
        userProfileUrl={userProfileUrl}
      />
      <FoundingMemberBadge />
    </div>
  );
}
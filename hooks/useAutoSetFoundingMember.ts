// hooks/useAutoSetFoundingMember.ts
"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useEffect, useState, useRef } from "react";

// Configuration - Change this number to increase the founding member limit
const FOUNDING_MEMBER_LIMIT = 100;

export function useAutoSetFoundingMember() {
  const { user, isLoaded, isSignedIn } = useUser();
  const [isProcessing, setIsProcessing] = useState(false);
  const hasRunRef = useRef(false);
  
  // Get total user count from Convex
  const userCount = useQuery(api.users.getTotalUserCount);

  useEffect(() => {
    const setFoundingMember = async () => {
      // Comprehensive checks
      if (!isLoaded || !isSignedIn || !user || isProcessing || hasRunRef.current) {
        return;
      }
      
      // Check if user already has founding member status
      if (user.publicMetadata?.isFoundingMember === true) {
        return;
      }
      
      // Check if we haven't exceeded the founding member limit
      if (userCount === undefined || userCount >= FOUNDING_MEMBER_LIMIT) {
        console.log(`Founding member limit reached (${FOUNDING_MEMBER_LIMIT} users)`);
        return;
      }
      
      hasRunRef.current = true;
      setIsProcessing(true);
      
      try {
        const response = await fetch('/api/set-founding-member', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: user.id }),
        });
        
        if (response.ok) {
          const result = await response.json();
          console.log('✅ Founding member status set successfully:', result);
          
          // Force a user refresh to get updated metadata
          setTimeout(() => {
            user.reload();
          }, 1000);
        } else {
          const errorData = await response.json();
          console.error('❌ Failed to set founding member status:', errorData);
        }
      } catch (error) {
        console.error('❌ Error setting founding member status:', error);
        // Reset hasRunRef so it can try again
        hasRunRef.current = false;
      } finally {
        setIsProcessing(false);
      }
    };

    // Only run if we have userCount data
    if (userCount !== undefined) {
      const timer = setTimeout(() => {
        setFoundingMember();
      }, 2000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [user, isLoaded, isSignedIn, isProcessing, userCount]);

  return { 
    isProcessing,
    userCount,
    foundingMemberLimit: FOUNDING_MEMBER_LIMIT
  };
}
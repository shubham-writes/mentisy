// hooks/useAutoSetFoundingMember.ts
"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

export function useAutoSetFoundingMember() {
  const { user, isLoaded } = useUser();

  useEffect(() => {
    const setFoundingMember = async () => {
      if (!isLoaded || !user) return;
      
      // Check if user already has founding member status
      if (user.publicMetadata?.isFoundingMember === true) return;
      
      // Check if this is a new signup (you can adjust this logic)
      const isNewUser = user.createdAt && 
        (Date.now() - new Date(user.createdAt).getTime()) < 60000; // Within 1 minute of creation
      
      if (isNewUser) {
        try {
          const response = await fetch('/api/set-founding-member', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: user.id }),
          });
          
          if (response.ok) {
            console.log('Founding member status set successfully');
            // Optionally reload the user data
            window.location.reload();
          }
        } catch (error) {
          console.error('Failed to set founding member status:', error);
        }
      }
    };

    setFoundingMember();
  }, [user, isLoaded]);
}
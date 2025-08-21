"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function ServiceWorkerProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then(() => console.log("✅ Service Worker Registered"))
        .catch((err) => console.log("❌ SW registration failed:", err));
      
      // Listen for messages from service worker
      const handleMessage = (event: MessageEvent) => {
        if (event.data.type === "SHARE_TARGET" && event.data.data.ufsUrl) {
          console.log("📩 Received shared data from SW:", event.data);
          
          // Store file data in sessionStorage to survive the redirect
          sessionStorage.setItem("sharedFile", JSON.stringify(event.data.data));

          // Redirect to the main page to use the file
          // The SW already redirects, but this is a good fallback
          if (!window.location.pathname.includes("/hello")) {
            router.push("/hello?shared=true");
          }
        }
      };

      navigator.serviceWorker.addEventListener("message", handleMessage);

      // Cleanup listener on component unmount
      return () => {
        navigator.serviceWorker.removeEventListener("message", handleMessage);
      };
    }
  }, [router]);

  return <>{children}</>;
}
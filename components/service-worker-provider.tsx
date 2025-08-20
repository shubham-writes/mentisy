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
      navigator.serviceWorker.addEventListener("message", (event) => {
        if (event.data.type === "SHARE_TARGET") {
          console.log("📩 Received shared data:", event.data);
          // Redirect to your main page or share handling page
          router.push("/hello?shared=true");
        }
      });
    }
  }, [router]);

  return <>{children}</>;
}

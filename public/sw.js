// Basic install + activate
self.addEventListener("install", (event) => {
  console.log("✅ Service Worker: Installed");
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("✅ Service Worker: Activated");
  event.waitUntil(self.clients.claim());
});

// Simple caching strategy
const CACHE_NAME = "mentisy-cache-v1";

// Handle fetch events
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // --- START OF NEW, SAFER LOGIC ---

  // 1. Immediately handle the Share Target POST request and exit.
  if (url.pathname === "/share" && event.request.method === "POST") {
    event.respondWith(handleShareTarget(event));
    return;
  }

  // 2. Ignore all other non-GET requests (like POSTs for file uploads or API calls).
  //    This is the most important fix. It lets them pass through to the network untouched.
  if (event.request.method !== "GET") {
    return;
  }

  // 3. Ignore requests to third-party domains to avoid interfering with auth, APIs, etc.
  if (url.origin !== self.location.origin) {
    return;
  }
  
  // --- END OF NEW LOGIC ---

  // 4. For all remaining same-origin GET requests, apply the caching strategy.
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response; // Serve from cache if found
      }
      
      return fetch(event.request)
        .then((networkResponse) => {
          // Cache successful responses
          if (networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          // On network failure, return the offline page if you have one.
          // Make sure "/offline.html" is cached during the 'install' event if you use this.
          return caches.match("/offline.html");
        });
    })
  );
});

// The handleShareTarget function remains the same as before
async function handleShareTarget(event) {
  try {
    const formData = await event.request.formData();
    const file = formData.get("file");

    if (!file) {
      console.log("📩 Share Target received: No file found.");
      return Response.redirect("/", 303);
    }

    console.log("📩 Share Target received file:", file.name, file.type);

    const client = await self.clients.get(event.resultingClientId || event.clientId);
    
    if (client) {
      const blobUrl = URL.createObjectURL(file);
      
      client.postMessage({
        type: "SHARE_TARGET",
        data: {
          url: blobUrl,
          type: file.type.startsWith("image/") ? "image" : "video",
        }
      });
    }

    return Response.redirect("/hello?shared=true", 303);
  } catch (error) {
    console.error("❌ Error handling share target:", error);
    return Response.redirect("/", 303);
  }
}
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
const URLS_TO_CACHE = ["/", "/hello", "/offline.html"];

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Handle Share Target POST requests
  if (url.pathname === "/share" && event.request.method === "POST") {
    event.respondWith(handleShareTarget(event)); // Pass the whole event
    return;
  }

  // Handle regular GET requests with caching
  if (event.request.method === "GET") {
    event.respondWith(
      caches.match(event.request).then((response) => {
        if (response) {
          return response;
        }
        
        return fetch(event.request)
          .then((response) => {
            // Cache successful responses
            if (response.status === 200) {
              const responseClone = response.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, responseClone);
              });
            }
            return response;
          })
          .catch(() => {
            // Return offline page if available
            return caches.match("/offline.html");
          });
      })
    );
  }
});

// Handle Share Target POST requests
async function handleShareTarget(event) {
  try {
    const formData = await event.request.formData();
    const file = formData.get("file");

    if (!file) {
      console.log("📩 Share Target received: No file found.");
      return Response.redirect("/", 303);
    }

    console.log("📩 Share Target received file:", file.name, file.type);

    // Get the client that initiated the share
    const client = await self.clients.get(event.resultingClientId || event.clientId);
    
    if (client) {
      // Create a Blob URL to pass the file to the page
      const blobUrl = URL.createObjectURL(file);
      
      client.postMessage({
        type: "SHARE_TARGET",
        data: {
          url: blobUrl,
          type: file.type.startsWith("image/") ? "image" : "video",
        }
      });
    }

    // Redirect to the appropriate page
    return Response.redirect("/hello?shared=true", 303);
  } catch (error) {
    console.error("❌ Error handling share target:", error);
    return Response.redirect("/", 303);
  }
}
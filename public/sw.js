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
    event.respondWith(handleShareTarget(event.request));
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
async function handleShareTarget(request) {
  try {
    const formData = await request.formData();
    const title = formData.get("title");
    const text = formData.get("text");
    const url = formData.get("url");
    const file = formData.get("file");

    console.log("📩 Share Target received:", { title, text, url, file: file?.name });

    // Send message to all open clients
    const allClients = await self.clients.matchAll({ 
      type: "window",
      includeUncontrolled: true 
    });
    
    for (const client of allClients) {
      client.postMessage({
        type: "SHARE_TARGET",
        data: {
          title: title || "",
          text: text || "",
          url: url || "",
          fileName: file?.name || null,
          fileSize: file?.size || null,
          fileType: file?.type || null
        }
      });
    }

    // Redirect to main app
    return Response.redirect("/", 303);
  } catch (error) {
    console.error("❌ Error handling share target:", error);
    return Response.redirect("/", 303);
  }
}
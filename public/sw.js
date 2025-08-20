// sw.js

const CACHE_NAME = "mentisy-cache-v1";
const DB_NAME = "MentisyShareDB";
const STORE_NAME = "shared-files";

self.addEventListener("install", (event) => {
  console.log("✅ Service Worker: Installed");
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("✅ Service Worker: Activated");
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  if (url.pathname === "/share" && event.request.method === "POST") {
    event.respondWith(handleShareTarget(event));
    return;
  }

  if (event.request.method !== "GET" || url.origin !== self.location.origin) {
    return; // Ignore non-GET requests and third-party requests
  }

  // Apply caching strategy for same-origin GET requests
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) return response;
      return fetch(event.request).then((networkResponse) => {
        if (networkResponse.status === 200) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return networkResponse;
      });
    })
  );
});

async function handleShareTarget(event) {
  try {
    const formData = await event.request.formData();
    const file = formData.get("file");
    if (!file) return Response.redirect("/", 303);

    console.log("📩 Share Target received file, saving to IndexedDB...");

    // --- Save file to IndexedDB ---
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    // Clear any old files first
    await store.clear(); 
    // Add the new file
    await store.add({
      id: "shared-file", // Use a fixed key
      file: file,
      type: file.type.startsWith("image/") ? "image" : "video",
    });
    await tx.done;

    console.log("✅ File saved to IndexedDB.");
    return Response.redirect("/hello?shared=true", 303);
  } catch (error) {
    console.error("❌ Error handling share target:", error);
    return Response.redirect("/", 303);
  }
}

function openDB() {
  return new Promise((resolve, reject) => {
    const request = self.indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    };
    request.onsuccess = (event) => resolve(event.target.result);
    request.onerror = (event) => reject(event.target.error);
  });
}
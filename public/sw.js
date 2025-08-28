// sw.js

const CACHE_NAME = "mentisy-cache-v7"; // bump version
const DB_NAME = "MentisyShareDB";
const STORE_NAME = "shared-files";

self.addEventListener("install", (event) => {
  console.log("✅ Service Worker: Installed");
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("✅ Service Worker: Activated");
  event.waitUntil(
    (async () => {
      // Delete old caches
      const keys = await caches.keys();
      await Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log("🗑️ Deleting old cache:", key);
            return caches.delete(key);
          }
        })
      );
      await self.clients.claim();
    })()
  );
});

self.addEventListener("fetch", (event) => {
  try {
    const url = new URL(event.request.url);

    // Intercept Web Share Target POST
    if (url.pathname === "/share" && event.request.method === "POST") {
      event.respondWith(handleShareTarget(event.request));
      return;
    }

    if (event.request.method !== "GET" || url.origin !== self.location.origin) {
      return;
    }

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
  } catch (err) {
    console.error("SW fetch handler failed:", err, event.request);
  }
});

// ---- IndexedDB helpers ----
function idbRequestToPromise(req) {
  return new Promise((resolve, reject) => {
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}
function idbTxDone(tx) {
  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onabort = () => reject(tx.error || new Error("IDB transaction aborted"));
    tx.onerror = () => reject(tx.error || new Error("IDB transaction error"));
  });
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

async function handleShareTarget(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    if (!file) return Response.redirect("/", 303);

    console.log("📩 Share Target received file, saving to IndexedDB...");

    const arrayBuffer = await file.arrayBuffer();
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);

    await idbRequestToPromise(
      store.put({
        id: "shared-file",
        file: {
          name: file.name || "shared",
          type: file.type || "application/octet-stream",
          data: arrayBuffer,
        },
        type: (file.type || "").startsWith("image/") ? "image" : "video",
      })
    );
    await idbTxDone(tx);

    console.log("✅ File saved to IndexedDB.");
    return Response.redirect("/hello?shared=true", 303);
  } catch (error) {
    console.error("❌ Error handling share target:", error);
    return Response.redirect("/", 303);
  }
}

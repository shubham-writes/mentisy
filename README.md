# 🔄 Mentisy: The "Zero-Trust" Photo Swap Protocol

![Next.js](https://img.shields.io/badge/Next.js-14-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue) ![Convex](https://img.shields.io/badge/Backend-Convex-orange) ![PWA](https://img.shields.io/badge/Native-PWA-purple)

👉 **Live Demo:** [mentisy.com](https://www.mentisy.com)

### 🚨 The Problem
Social messaging has a "freeloader" problem: You send a photo, they view it, but never reply. The exchange is fundamentally unfair.

### ✅ The Solution
Mentisy is a secure, ephemeral messaging platform that enforces a **Cryptographic Fair Trade**. It uses a "Reply-to-Reveal" protocol where the recipient cannot view your message until their own reply is cryptographically verified by the server.

---

## 🏗️ System Design & Architecture

I built Mentisy to solve three specific engineering challenges in real-time web apps: **Trust, Latency, and Concurrency.**

### 1. 🛡️ Zero-Trust Security Architecture
Most "blur" apps just hide the image with CSS, which is easily bypassed via "Inspect Element."
* **My Solution:** I implemented a **Server-Side Field Selection** pattern. The sensitive image URL is strictly excluded from the API response payload by default.
* **The Protocol:** The server only releases the specific file URL to the client *after* the `completeSwap` ACID transaction is successfully committed. Even if a user intercepts the network traffic, the data literally does not exist on their device until they pay the "price" (uploading a photo).

### 2. 📱 Native-Grade PWA (Web Share Target)
To compete with native apps, Mentisy needed to live in the OS Share Sheet.
* **Implementation:** Leveraged the **Web Share Target API Level 2** and a custom **Service Worker**.
* **Flow:** Users can share a photo directly from their Android/iOS Gallery -> Mentisy. The Service Worker intercepts the `POST` request, parks the binary stream in **IndexedDB**, and hydrates the React state seamlessly on launch.

### 3. ⏳ The "Preload-Then-Reveal" Pattern
Network latency often ruins ephemeral "10-second" timers. If an image takes 8 seconds to load, the user only sees it for 2 seconds.
* **Solution:** I decoupled the "Network Time" from the "Viewing Time."
* **Logic:** The app invisibly preloads the heavy media assets into the browser cache. The countdown timer (and visibility) is only triggered *after* the `onLoad` event confirms the asset is fully rendered in the DOM.

---

## ✨ Key Features

### 🔄 PicSwap (The Hero Mechanic)
* **Atomic Transactions:** Uses Convex's ACID guarantees to handle the swap state. If a user tries to "double spend" (swap one photo for two secrets), the transaction rolls back.
* **Real-time Reveal:** No polling. Uses WebSocket subscriptions to unlock both screens instantly the moment the trade is complete.

### 🚀 Frictionless Guest Mode
* **Anonymous Auth:** Custom implementation of persistent guest sessions using LocalStorage and Fingerprinting, allowing users to track their swap history without an account.

### 🧹 Server-Side Auto-Expiry
* **Cron Architecture:** Unlike client-side timers (which stop if you close the tab), Mentisy uses **Convex Schedulers**. A background job runs on the server to physically delete the asset from storage (UploadThing) and the database 10 seconds after viewing.

---

## 🛠️ Tech Stack

* **Frontend:** Next.js 14 (App Router), TypeScript, Tailwind CSS
* **Backend:** Convex (Real-time DB, Serverless Functions, Schedulers)
* **Storage:** UploadThing (Object Storage with Cron cleanup)
* **Auth:** Clerk (Metadata-based Role Management)
* **State:** Zustand (Client), TanStack Query (Server State)

---

## 📸 Screenshots

| Landing Page | The Swap Flow |
|:---:|:---:|
| ![Landing Page](./screenshots/landing_mentisy.png) | ![Swap Flow](./screenshots/swap_form.png) |

---

## ⚡ Getting Started Locally

1. **Clone the repo**
   ```bash
   git clone [https://github.com/shubham-builds/mentisy.git](https://github.com/shubham-builds/mentisy.git)
   cd mentisy

2. Install dependencies
   ```bash
   npm install

3. Create your environment file
   ```bash
   cp .env.example .env.local
   ```
   Then open .env.local and fill in the required values:
   NEXT_PUBLIC_CONVEX_URL
   CLERK_PUBLISHABLE_KEY
   CLERK_SECRET_KEY
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
   Any other project-specific environment variables

4. Start the Convex backend
   ```bash
   npx convex dev
   ```
   This will generate your Convex URL — paste it into:
   ```bash
   NEXT_PUBLIC_CONVEX_URL=
   ```
5. Start the Next.js development server
   ```bash
   npm run dev
   ```
6. Open Mentisy locally
   visit:
   ```bash
   http://localhost:3000
   ```

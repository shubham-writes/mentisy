import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

// --- NEW: Import ClerkProvider ---
import { ClerkProvider } from '@clerk/nextjs'

import { ThemeProvider } from "@/components/theme-provider";
import { ConvexClientProvider } from "@/components/convex-provider";
import { ServiceWorkerProvider } from "@/components/service-worker-provider";
import { Navbar } from "./_home/navbar";

const inter = Inter({ subsets: ["latin"] });
const jakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  variable: '--font-jakarta' 
});

// Your metadata and viewport exports remain the same...
export const metadata: Metadata = {
  // ... (no changes here)
  title: "Mentisy - Fun Sharing Platform 🎉",
  description: "Share fun links, play with friends, and spark joy ✨",
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL!),
  manifest: "/manifest.json",
  applicationName: "Mentisy",
  openGraph: {
    title: "Mentisy - Fun Sharing Platform 🎉",
    description: "Share fun links, play with friends, and spark joy ✨",
    url: process.env.NEXT_PUBLIC_URL,
    siteName: "Mentisy",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Mentisy - Fun Sharing Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mentisy - Fun Sharing Platform 🎉",
    description: "Share fun links, play with friends, and spark joy ✨",
    images: ["/og-image.png"],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Mentisy",
  },
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/mentisyLogo-light.png",
        href: "/mentisyLogo-light.png",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/mentisyLogo-dark.png",
        href: "/mentisyLogo-dark.png",
      }
    ],
    apple: [
      { url: "/icon-152x152.png", sizes: "152x152", type: "image/png" },
      { url: "/icon-180x180.png", sizes: "180x180", type: "image/png" },
    ],
  },
  other: {
    "mobile-web-app-capable": "yes",
  }
};

export const viewport: Viewport = {
  // ... (no changes here)
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#111827F2" },
    { media: "(prefers-color-scheme: dark)", color: "#111827F2" }   
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // --- NEW: Wrap the <html> tag with ClerkProvider ---
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY} afterSignOutUrl="/">
      <html lang="en" suppressHydrationWarning className="no-scrollbar">
        <head>
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="mobile-web-app-capable" content="yes" />
        </head>
        <body className={`${jakarta.variable} no-scrollbar`}>
          {/* ConvexClientProvider no longer contains ClerkProvider */}
          <ConvexClientProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <ServiceWorkerProvider>
                <div className="min-h-full flex flex-col justify-between no-scrollbar">
                  <Navbar />
                  <main className="flex-1 no-scrollbar">{children}</main>
                </div>
              </ServiceWorkerProvider>
            </ThemeProvider>
          </ConvexClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
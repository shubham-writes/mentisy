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

// Global Clerk Appearance Configuration
const clerkAppearance = {
  elements: {
    // Form styling to match your brand
    formButtonPrimary: 
      "bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] hover:from-purple-600 hover:to-pink-600 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105",
    formFieldInput: 
      "border-gray-300 dark:border-gray-600 rounded-lg focus:border-[#FF75A0] focus:ring-[#FF75A0]/20 bg-white dark:bg-gray-800",
    formFieldLabel: 
      "text-gray-700 dark:text-gray-300 font-medium",
    card: 
      "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-2xl",
    headerTitle: 
      "text-gray-900 dark:text-gray-100 font-bold text-xl",
    headerSubtitle: 
      "text-gray-600 dark:text-gray-400",
    footerActionText: 
      "text-gray-600 dark:text-gray-400",
    footerActionLink: 
      "text-[#FF75A0] hover:text-[#FFAA70] font-medium",
    
    // Custom footer styling for privacy and terms
    footer: 
      "mt-6 pt-4 border-t border-gray-200 dark:border-gray-700",
    formFooter: 
      "text-center text-sm text-gray-600 dark:text-gray-400",
    
    // Social buttons styling
    socialButtonsBlockButton: 
      "border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg",
    
    // Divider styling
    dividerLine: "bg-gray-200 dark:bg-gray-700",
    dividerText: "text-gray-500 dark:text-gray-400",
  },
  
  layout: {
    // Add privacy policy and terms links - updated to match your folder structure
    privacyPageUrl: "/privacy",
    termsPageUrl: "/terms",
    // Show terms and privacy policy links
    showTerms: true,
  },
  
  // Custom localization
  localization: {
    signUp: {
      start: {
        title: "Join Mentisy",
        subtitle: "Create your account to start sharing moments",
        actionText: "Already have an account?",
        actionLink: "Sign in instead",
      }
    },
    signIn: {
      start: {
        title: "Welcome back",
        subtitle: "Sign in to your Mentisy account",
        actionText: "Don't have an account?",
        actionLink: "Sign up for free",
      }
    }
  }
};

// Your metadata and viewport exports remain the same...
export const metadata: Metadata = {
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
    // Updated ClerkProvider with global appearance configuration
    <ClerkProvider 
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY} 
      afterSignOutUrl="/"
      appearance={clerkAppearance}
    >
      <html lang="en" suppressHydrationWarning className="no-scrollbar">
        <head>
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="mobile-web-app-capable" content="yes" />
        </head>
        <body className={`${jakarta.variable} no-scrollbar`}>
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
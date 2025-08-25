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
      "bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] hover:from-[#FF75A0] hover:to-[#FFAA70] text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105",
    
    // Fixed input field styling for better visibility in dark mode
    formFieldInput: 
      "border-gray-300 dark:border-gray-600 rounded-lg focus:border-[#FF75A0] focus:ring-[#FF75A0]/20 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400",
    
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
    
    // Fixed social buttons styling for better visibility
    socialButtonsBlockButton: 
      "border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100",
    
    socialButtonsBlockButtonText: 
      "text-gray-700 dark:text-gray-300 font-medium",
    
    // Divider styling
    dividerLine: "bg-gray-200 dark:bg-gray-700",
    dividerText: "text-gray-500 dark:text-gray-400",
    
    // Additional text elements for better visibility
    formFieldAction: "text-[#FF75A0] hover:text-[#FFAA70]",
    identityPreviewText: "text-gray-700 dark:text-gray-300",
    formFieldSuccessText: "text-green-600 dark:text-green-400",
    formFieldErrorText: "text-red-600 dark:text-red-400",
    
    // Modal overlay
    modalBackdrop: "bg-black/50",
    modalContent: "bg-white dark:bg-gray-900",
  },
  
  layout: {
    // Add privacy policy and terms links - updated to match your folder structure
    privacyPageUrl: "/privacy",
    termsPageUrl: "/terms",
    // Show terms and privacy policy links
    showTerms: true,
  },
  
  // Custom localization with terms agreement
  localization: {
    signUp: {
      start: {
        title: "Join Mentisy",
        subtitle: "Create your account to start sharing moments",
        actionText: "Already have an account?",
        actionLink: "Sign in instead",
      },
      emailLink: {
        formTitle: "Check your email",
        formSubtitle: "We sent a verification link to your email",
        resendButton: "Resend email",
      },
      emailCode: {
        formTitle: "Check your email",
        formSubtitle: "Enter the verification code sent to your email",
        resendButton: "Resend code",
      }
    },
    signIn: {
      start: {
        title: "Welcome back",
        subtitle: "Sign in to your Mentisy account",
        actionText: "Don't have an account?",
        actionLink: "Sign up for free",
      }
    },
    // Custom footer text for terms agreement
    footerText: "By signing up, you agree to our {{termsLink}} and {{privacyPolicyLink}}",
    termsOfService: "Terms of Service",
    privacyPolicy: "Privacy Policy",
  }
};

// Your metadata and viewport exports with enhanced favicon configuration
export const metadata: Metadata = {
  title: "Mentisy - Fun Sharing Platform ðŸŽ‰",
  description: "Share fun links, play with friends, and spark joy âœ¨",
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL!),
  manifest: "/manifest.json",
  applicationName: "Mentisy",
  openGraph: {
    title: "Mentisy - Fun Sharing Platform ðŸŽ‰",
    description: "Share fun links, play with friends, and spark joy âœ¨",
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
    title: "Mentisy - Fun Sharing Platform ðŸŽ‰",
    description: "Share fun links, play with friends, and spark joy âœ¨",
    images: ["/og-image.png"],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Mentisy",
  },
  icons: {
    // Standard favicon (fallback)
    icon: [
      {
        url: "/favicon.ico",
        sizes: "any",
      },
      {
        url: "/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/favicon-48x48.png",
        sizes: "48x48",
        type: "image/png",
      },
      // Theme-based icons (keeping your existing ones)
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
    // Apple touch icons
    apple: [
      { url: "/icon-152x152.png", sizes: "152x152", type: "image/png" },
      { url: "/favicon-192x192.png", sizes: "180x180", type: "image/png" },
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
// app/(landing)/page.tsx
"use client";

import { useEffect } from "react";
import { Authenticated, Unauthenticated } from "convex/react";
import { SecretForm } from "@/components/secret-form";


import Footer from "./_sections/Footer";


import HeroSection from "./_sections/HeroSection";

import AuthenticatedDashboard from "./_sections/AuthenticatedDashboard";

export default function Home() {


  useEffect(() => {
    const originalScrollBehavior = document.documentElement.style.scrollBehavior;

    const timer = setTimeout(() => {
      document.documentElement.style.scrollBehavior = originalScrollBehavior || 'smooth';
    }, 100);

    return () => {
      clearTimeout(timer);
      document.documentElement.style.scrollBehavior = originalScrollBehavior;
    };
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white">
      <Unauthenticated>

        <HeroSection />

        {/* Streamlined Form Section */}
        <div className="pt-12 sm:pt-16 md:pt-20 pb-16">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white dark:bg-black  shadow-sm">

              <SecretForm isLandingPage={false} />
            </div>
          </div>
        </div>


        <Footer />
      </Unauthenticated>

      <Authenticated>

        <AuthenticatedDashboard />

      </Authenticated>
    </div>
  );
}
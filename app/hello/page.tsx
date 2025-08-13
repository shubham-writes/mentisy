// app/hello/page.tsx
"use client"
import { SecretForm } from "@/components/secret-form";
import { MySecretsList } from "@/components/my-secrets-list";
import { Authenticated, Unauthenticated } from "convex/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";
import { useAuth } from "@clerk/nextjs";

function HelloPageContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const useCase = searchParams.get('useCase');
    const scrollTo = searchParams.get('scrollTo');
    const { isSignedIn, isLoaded } = useAuth();

    // Handle scrolling based on URL parameter
    useEffect(() => {
        if (scrollTo && isSignedIn) {
            const timer = setTimeout(() => {
                let elementId = '';
                let scrollOptions = {
                    behavior: 'smooth' as ScrollBehavior,
                    block: 'start' as ScrollLogicalPosition
                };
                
                if (scrollTo === 'form') {
                    elementId = 'secret-form';
                    // For form, scroll to center to avoid awkward top positioning
                    scrollOptions.block = 'center';
                } else if (scrollTo === 'secrets') {
                    elementId = 'my-secrets-list';
                    scrollOptions.block = 'start';
                }
                
                if (elementId) {
                    const element = document.getElementById(elementId);
                    if (element) {
                        // Check if element is already in view to avoid unnecessary scrolling
                        const rect = element.getBoundingClientRect();
                        const isInView = rect.top >= 0 && rect.top <= window.innerHeight;
                        
                        if (!isInView || scrollTo === 'form') {
                            element.scrollIntoView(scrollOptions);
                        }
                        
                        // Clean up the URL after a short delay
                        setTimeout(() => {
                            const newUrl = new URL(window.location.href);
                            newUrl.searchParams.delete('scrollTo');
                            router.replace(newUrl.pathname + newUrl.search);
                        }, 1000);
                    }
                }
            }, 800); // Reduced timeout for better UX
            
            return () => clearTimeout(timer);
        }
    }, [scrollTo, isSignedIn, router]);

    // Only redirect unauthenticated users after auth has loaded
    useEffect(() => {
        if (!isLoaded) return; // Wait for auth to load
        
        if (!isSignedIn) {
            const timer = setTimeout(() => {
                router.push('/');
            }, 2000);
            
            return () => clearTimeout(timer);
        }
    }, [router, isSignedIn, isLoaded]);

    return (
        <div className="flex flex-col items-center justify-start text-center gap-y-8 flex-1">
            <Authenticated>
                <div data-authenticated="true" className="w-full">
                    {/* Secret Form Section with better scroll positioning */}
                    <section id="secret-form" data-secret-form className="w-full scroll-mt-24 py-4">
                        <SecretForm useCase={useCase || undefined} />
                    </section>
                    
                    {/* My Secrets List Section */}
                    <section id="my-secrets-list" data-secrets-list className="w-full mt-12 scroll-mt-20 py-4 ">
                        <MySecretsList />
                    </section>
                </div>
            </Authenticated>
            
            <Unauthenticated>
                <div className="flex flex-col items-center justify-center gap-y-4 mb-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    <h2 className="text-xl font-semibold">Authentication Required</h2>
                    <p className="text-muted-foreground">
                        Redirecting you to sign in...
                    </p>
                    <button 
                        onClick={() => router.push('/')}
                        className="mt-4 px-4 py-2 text-blue-600 hover:text-blue-800 underline"
                    >
                        Go to Home Page Now
                    </button>
                </div>
            </Unauthenticated>
        </div>
    );
}

export default function HelloPage() {
    return (
        <Suspense fallback={
            <div className="flex flex-col items-center justify-center gap-y-4 mb-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                <p>Loading...</p>
            </div>
        }>
            <HelloPageContent />
        </Suspense>
    );
}
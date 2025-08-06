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
    const { isSignedIn, isLoaded } = useAuth();

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
                <div data-authenticated="true">
                    <SecretForm useCase={useCase || undefined} />
                    <MySecretsList />
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
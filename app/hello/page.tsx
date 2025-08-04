// app/hello/page.tsx
"use client"
import { SecretForm } from "@/components/secret-form";
import { MySecretsList } from "@/components/my-secrets-list";
import { Authenticated, Unauthenticated } from "convex/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HelloPage() {
    const router = useRouter();

    // Auto-redirect unauthenticated users after a short delay
    useEffect(() => {
        const timer = setTimeout(() => {
            // This will only run if the user is still on this page after 2 seconds
            // and is unauthenticated (meaning the Authenticated component didn't render)
            const isAuthenticated = document.querySelector('[data-authenticated]');
            if (!isAuthenticated) {
                router.push('/');
            }
        }, 2000);

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <div className="flex flex-col items-center justify-start text-center gap-y-8 flex-1">
            <Authenticated>
                <div data-authenticated="true">
                    <SecretForm />
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
// app/hello/page.tsx
"use client"
import { SecretForm } from "@/components/secret-form";
import { MySecretsList } from "@/components/my-secrets-list";
import { Authenticated, Unauthenticated } from "convex/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";
import { useAuth } from "@clerk/nextjs";
import { SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

function HelloPageContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const useCase = searchParams.get('useCase');
    const scrollTo = searchParams.get('scrollTo');
    const { isSignedIn } = useAuth();

    // Handle scrolling for signed-in users
    useEffect(() => {
        if (scrollTo && isSignedIn) {
            const timer = setTimeout(() => {
                const element = document.getElementById('my-secrets-list');
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    const newUrl = new URL(window.location.href);
                    newUrl.searchParams.delete('scrollTo');
                    router.replace(newUrl.pathname + newUrl.search);
                }
            }, 800);

            return () => clearTimeout(timer);
        }
    }, [scrollTo, isSignedIn, router]);

    return (
        <div className="flex flex-col items-center justify-start text-center gap-y-8 flex-1 mt-16">

            {/* The SecretForm is now visible to EVERYONE */}
            <section id="secret-form" className="w-full scroll-mt-24 py-4">
                <SecretForm useCase={useCase || undefined} />
            </section>

            {/* Authenticated users see their list of secrets */}
            <Authenticated>
                <section id="my-secrets-list" className="w-full mt-12 scroll-mt-20 py-4">
                    <MySecretsList />
                </section>
            </Authenticated>

            {/* Unauthenticated users see a prompt to sign up */}
            <Unauthenticated>
                <div className="w-full max-w-2xl text-center my-12 p-8 bg-white/50 dark:bg-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg">
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Unlock More Features!</h3>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Create a free account to track your shared moments, see view status, and expire links at any time.
                    </p>
                    <div className="mt-6">
                        <SignInButton mode="modal">
                            <Button
                                size="lg"
                                className="font-semibold bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] hover:from-[#e65a85] hover:to-[#e6955a] transition-transform transform hover:scale-105"
                            >
                                ✨ Sign Up for Free
                            </Button>
                        </SignInButton>
                    </div>
                </div>
            </Unauthenticated>
        </div>
    );
}

export default function HelloPage() {
    return (
        <Suspense fallback={
            <div className="flex flex-col items-center mt-28 justify-center gap-y-4 mb-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                <p>Loading...</p>
            </div>
        }>
            <HelloPageContent />
        </Suspense>
    );
}
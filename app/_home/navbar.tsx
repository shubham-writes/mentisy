"use client";

import { useState, useEffect } from "react";
import { clerkAppearance } from "@/lib/clerkAppearance";

import { useTheme } from "next-themes";
import { useConvexAuth } from "convex/react";
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import CustomUserButton from '@/components/CustomUserButton';
import { useAutoSetFoundingMember } from "@/hooks/useAutoSetFoundingMember";
import {
    LoaderCircle,
    WandSparkles,
    Sparkles,
    NotepadText,
    LogIn,
    Menu,
    X,
    Sun,
    Moon,
    Monitor
} from "lucide-react";

import { useRouter } from "next/navigation";
import Image from "next/image";

import useStoreUserEffect from "@/hooks/useStoreUserEffect";
import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Logo } from "./logo";

// Enhanced Theme Toggle Component
const EnhancedModeToggle = () => {
    const { theme, setTheme, systemTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Handle hydration
    useEffect(() => {
        setMounted(true);
    }, []);

    const themes = [
        { key: "light", icon: Sun, label: "Light" },
        { key: "dark", icon: Moon, label: "Dark" },
        { key: "system", icon: Monitor, label: "System" }
    ];

    if (!mounted) {
        return (
            <div className="w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-800 animate-pulse" />
        );
    }

    const currentTheme = theme || "system";

    return (
        <div className="relative">
            <button
                className="w-9 h-9 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 hover:from-[#FF75A0]/20 hover:to-[#FFAA70]/20 dark:hover:from-[#FF75A0]/20 dark:hover:to-[#FFAA70]/20 transition-all duration-300 flex items-center justify-center shadow-sm hover:shadow-md border border-gray-200 dark:border-gray-600 group"
                onClick={() => {
                    const currentIndex = themes.findIndex(t => t.key === currentTheme);
                    const nextTheme = themes[(currentIndex + 1) % themes.length];
                    setTheme(nextTheme.key);
                }}
            >
                {currentTheme === "light" && <Sun className="w-4 h-4 text-amber-500 group-hover:text-amber-600 transition-colors" />}
                {currentTheme === "dark" && <Moon className="w-4 h-4 text-blue-400 group-hover:text-blue-500 transition-colors" />}
                {currentTheme === "system" && <Monitor className="w-4 h-4 text-gray-600 dark:text-gray-300 group-hover:text-[#FF75A0] transition-colors" />}
            </button>
        </div>
    );
};

export const Navbar = () => {
    const userId = useStoreUserEffect();
    const { isAuthenticated, isLoading } = useConvexAuth();
    const scrolled = useScrollTop();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const router = useRouter();

    const [guestHistory, setGuestHistory] = useState<any[]>([]);

    useEffect(() => {
        // Only run this on the client and for guests
        if (typeof window !== "undefined" && !isLoading && !isAuthenticated) {
            const history = JSON.parse(localStorage.getItem('mentisyGuestHistory') || '[]');
            setGuestHistory(history);
        }
    }, [isLoading, isAuthenticated]);

    // ADD THIS LINE - Initialize founding member detection
    useAutoSetFoundingMember();

    // Handle hydration
    useEffect(() => {
        setMounted(true);
    }, []);

    // Function to handle navigation and close mobile menu
    const handleNavigation = (path: string) => {
        setIsMobileMenuOpen(false);
        router.push(path);
    };

    // Function to scroll to a specific section on the current page
    const scrollToSection = (sectionId: string) => {
        setIsMobileMenuOpen(false);
        // Add a small delay to ensure menu closes before scrolling
        setTimeout(() => {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                // If element not found, navigate to /hello page first
                router.push('/hello');
            }
        }, 300);
    };

    return (
        <>
            <nav className={cn(
                "z-[100] fixed top-0 w-full transition-all duration-300 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 shadow-lg"
            )}>
                <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
                    <div className="flex items-center justify-between h-14 sm:h-16">
                        {/* Logo Section - Always visible */}
                        <div className="flex items-center space-x-4">
                            <Logo />
                        </div>

                        {/* Desktop Right Side - Auth & Settings */}
                        <div className="hidden md:flex items-center space-x-4">
                            {/* Loading State */}
                            {isLoading && (
                                <div className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full">
                                    <LoaderCircle className="w-4 h-4 animate-spin text-purple-500" />
                                    <span className="text-sm text-gray-600 dark:text-gray-300">Loading...</span>
                                </div>
                            )}

                            {/* Unauthenticated State */}
                            {!isAuthenticated && !isLoading && (
                                <div className="flex items-center space-x-3">
                                    {guestHistory.length > 0 && (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="rounded-full border border-[#FF75A0]/50 text-[#FF75A0] hover:bg-[#FF75A0]/10 hover:text-[#FF75A0] dark:border-[#FF75A0]/60 dark:text-[#FF75A0]/90 dark:hover:bg-[#FF75A0]/20 dark:hover:text-[#FF75A0] transition-all duration-200 px-6"
                                            onClick={() => router.push(`/swap/result/${guestHistory[guestHistory.length - 1].publicId}`)}
                                        >
                                            <NotepadText className="w-4 h-4 mr-2" />
                                            My Swaps
                                        </Button>
                                    )}
                                    <SignInButton mode="modal" fallbackRedirectUrl="/hello" forceRedirectUrl="/hello">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 px-6"
                                        >
                                            <LogIn className="w-4 h-4 mr-2" />
                                            Sign In
                                        </Button>
                                    </SignInButton>

                                    <SignUpButton
                                        mode="modal"
                                        appearance={clerkAppearance}
                                        fallbackRedirectUrl="/hello"
                                        forceRedirectUrl="/hello"
                                    >
                                        <Button
                                            size="sm"
                                            className="rounded-full bg-gradient-to-r from-[#FF75A0] to-[#FFAA70]  border-0 shadow-lg transform hover:scale-105 transition-all duration-200 px-6"
                                        >
                                            <Sparkles className="w-4 h-4 mr-2" />
                                            Get Started
                                        </Button>
                                    </SignUpButton>


                                </div>
                            )}

                            {/* Authenticated State */}
                            {isAuthenticated && !isLoading && (
                                <div className="flex items-center space-x-4">
                                    {/* User Profile Section */}
                                    <div className="flex items-center space-x-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-full p-1 border border-purple-200 dark:border-purple-800">

                                        <CustomUserButton
                                            afterSignOutUrl="/"
                                            appearance={{
                                                elements: {
                                                    avatarBox: "w-8 h-8 rounded-full ring-2 ring-purple-300 dark:ring-purple-600"
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Enhanced Theme Toggle */}
                            <div className="border-l border-gray-200 dark:border-gray-700 pl-4 ml-4">
                                <EnhancedModeToggle />
                            </div>
                        </div>

                        {/* Mobile Right Side - Compact */}
                        <div className="md:hidden flex items-center space-x-2">
                            {/* Loading State Mobile */}
                            {isLoading && (
                                <LoaderCircle className="w-5 h-5 animate-spin text-[#FF75A0]" />
                            )}

                            {/* Authenticated State Mobile - Compact */}
                            {isAuthenticated && !isLoading && (
                                <div className="flex items-center space-x-2">

                                    <CustomUserButton
                                        afterSignOutUrl="/"
                                        appearance={{
                                            elements: {
                                                avatarBox: "w-6 h-6 rounded-full ring-2 ring-[#FF75A0]"
                                            }
                                        }}
                                    />
                                </div>
                            )}

                            {/* Mobile Menu Toggle */}
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                aria-label="Toggle menu"
                            >
                                {isMobileMenuOpen ? (
                                    <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                                ) : (
                                    <Menu className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="md:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
                    onClick={() => setIsMobileMenuOpen(false)} />
            )}

            {/* Mobile Menu Slide-out */}
            <div className={cn(
                "md:hidden fixed top-0 right-0 h-full w-72 max-w-[80vw] bg-white dark:bg-gray-900 z-50 transform transition-transform duration-300 ease-in-out border-l border-gray-200 dark:border-gray-800 shadow-2xl",
                isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
            )}>
                <div className="flex flex-col h-full">
                    {/* Mobile Menu Header */}
                    <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-gray-50/50 to-white dark:from-gray-800/50 dark:to-gray-900">
                        <div className="flex items-center space-x-2">
                            {/* Updated mobile menu logo - smaller size with Next.js Image */}
                            <div className="w-5 h-5 relative">
                                <Image
                                    src="/mentisyLogo85.svg"
                                    alt="Mentisy Logo"
                                    width={20}
                                    height={20}
                                    className="rounded-full"
                                    priority
                                />

                            </div>
                            <span className="font-medium text-base">Menu</span>
                        </div>
                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                            <X className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                        </button>
                    </div>

                    {/* Mobile Menu Content */}
                    <div className="flex-1 p-3 space-y-4 overflow-y-auto">
                        {/* Authentication Section */}
                        {!isAuthenticated && !isLoading && (
                            <div className="space-y-2">
                                <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide px-2">
                                    Account
                                </h3>
                                <div className="space-y-2">
                                    {guestHistory.length > 0 && (
                                        <Button
                                            variant="ghost"
                                            className="w-full justify-start rounded-lg border border-[#FF75A0]/30 bg-gradient-to-r from-[#FF75A0]/5 to-white dark:from-[#FF75A0]/10 dark:to-gray-900 hover:bg-[#FF75A0]/10 dark:hover:bg-[#FF75A0]/20 h-10 text-sm text-[#FF75A0]"
                                            onClick={() => {
                                                setIsMobileMenuOpen(false);
                                                router.push(`/swap/result/${guestHistory[guestHistory.length - 1].publicId}`);
                                            }}
                                        >
                                            <NotepadText className="w-4 h-4 mr-2" />
                                            My Guest Swaps
                                        </Button>
                                    )}
                                    <SignInButton mode="modal" fallbackRedirectUrl="/hello" forceRedirectUrl="/hello">
                                        <Button
                                            variant="ghost"
                                            className="w-full justify-start rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 h-10 text-sm"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            <LogIn className="w-4 h-4 mr-2" />
                                            Sign In
                                        </Button>
                                    </SignInButton>

                                    <SignUpButton
                                        mode="modal"
                                        appearance={clerkAppearance}
                                        fallbackRedirectUrl="/hello"
                                        forceRedirectUrl="/hello"
                                    >
                                        <Button
                                            className="w-full justify-start rounded-lg bg-gradient-to-r from-[#FF75A0] to-[#FFAA70]  border-0 shadow-md h-10 text-sm"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            <Sparkles className="w-4 h-4 mr-2" />
                                            Get Started
                                        </Button>
                                    </SignUpButton>

                                </div>
                            </div>
                        )}

                        {/* Settings Section */}
                        <div className="space-y-2">
                            <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide px-2">
                                Settings
                            </h3>
                            <div className="flex items-center justify-between p-2.5 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-750 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-[#FF75A0]/30 transition-all duration-200">
                                <div className="flex items-center space-x-2.5">
                                    <div className="w-6 h-6 bg-gradient-to-br from-[#FF75A0]/20 to-[#FFAA70]/20 rounded-md flex items-center justify-center border border-[#FF75A0]/20">
                                        {mounted && theme === "light" && <Sun className="w-3 h-3 text-amber-500" />}
                                        {mounted && theme === "dark" && <Moon className="w-3 h-3 text-blue-400" />}
                                        {mounted && (theme === "system" || !theme) && <Monitor className="w-3 h-3 text-gray-600 dark:text-gray-300" />}
                                        {!mounted && <div className="w-3 h-3 bg-gray-300 dark:bg-gray-600 rounded animate-pulse" />}
                                    </div>
                                    <div>
                                        <span className="text-xs font-medium">Theme</span>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                                            {mounted ? (theme || "system") : "Loading..."}
                                        </p>
                                    </div>
                                </div>
                                <div className="scale-75">
                                    <EnhancedModeToggle />
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions (when authenticated) */}
                        {isAuthenticated && (
                            <div className="space-y-2">
                                <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide px-2">
                                    Quick Actions
                                </h3>
                                <div className="space-y-1.5">
                                    <Button
                                        variant="ghost"
                                        className="w-full justify-start rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 h-10 text-sm"
                                        onClick={() => {
                                            setIsMobileMenuOpen(false);
                                            // Navigate to hello page and scroll to form
                                            router.push('/hello');
                                            setTimeout(() => {
                                                const element = document.querySelector('[data-secret-form]') || document.getElementById('secret-form');
                                                if (element) {
                                                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                                }
                                            }, 500);
                                        }}
                                    >
                                        <WandSparkles className="w-4 h-4 mr-2 text-[#FF75A0]" />
                                        Create a Moment
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        className="w-full justify-start rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 h-10 text-sm"
                                        onClick={() => {
                                            setIsMobileMenuOpen(false);
                                            // Navigate to hello page and scroll to secrets list
                                            router.push('/hello');
                                            setTimeout(() => {
                                                const element = document.querySelector('[data-secrets-list]') || document.getElementById('my-secrets-list');
                                                if (element) {
                                                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                                }
                                            }, 500);
                                        }}
                                    >
                                        <NotepadText className="w-4 h-4 mr-2 text-purple-500" />
                                        My Moments
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Footer */}
                    <div className="p-3 border-t border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
                        <div className="text-center">
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                Mentisy • Privacy First
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
"use client";

import { useConvexAuth } from "convex/react";
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { GithubIcon, LoaderCircle, Zap, Sparkles, User, LogIn } from "lucide-react";
import Link from "next/link";

import useStoreUserEffect from "@/hooks/useStoreUserEffect";
import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Button } from "@/components/ui/button";
import { Logo } from "./logo";

export const Navbar = () => {
    const userId = useStoreUserEffect();
    const { isAuthenticated, isLoading } = useConvexAuth();
    const scrolled = useScrollTop();

    return (
        <nav className={cn(
            "z-50 fixed top-0 w-full transition-all duration-300",
            scrolled 
                ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 shadow-lg" 
                : "bg-transparent"
        )}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo Section */}
                    <div className="flex items-center space-x-4">
                        <div className="hidden sm:block">
                            <Logo />
                        </div>
                    </div>

                    {/* Right Side - Auth & Settings */}
                    <div className="flex items-center space-x-4">
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
                                
                                <SignUpButton mode="modal" fallbackRedirectUrl="/hello" forceRedirectUrl="/hello">
                                    <Button 
                                        size="sm"
                                        className="rounded-full bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] hover:from-purple-600 hover:to-pink-600 border-0 shadow-lg transform hover:scale-105 transition-all duration-200 px-6"
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
                                <div className="flex items-center space-x-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-full p-2 border border-purple-200 dark:border-purple-800">
                                    <div className="flex items-center space-x-2 px-3">
                                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Online</span>
                                    </div>
                                    <UserButton 
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

                        {/* Mode Toggle */}
                        <div className="border-l border-gray-200 dark:border-gray-700 pl-4 ml-4">
                            <ModeToggle />
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Logo (when main logo is hidden) */}
            <div className="sm:hidden absolute left-4 top-1/2 transform -translate-y-1/2">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <Zap className="w-5 h-5 text-white" />
                </div>
            </div>
        </nav>
    )
}
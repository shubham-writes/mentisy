"use client";


import { useConvexAuth } from "convex/react";




export const Footer = () => {
    const { isAuthenticated, isLoading } = useConvexAuth();

    return (
        <footer className="flex items-center w-full p-6 bg-background z-50">
           Made with ❤️ by OnlyForYou.
        </footer>
    )
}
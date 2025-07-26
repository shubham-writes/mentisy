// app/secret/[id]/page.tsx
"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Add this line to force dynamic rendering for this page
export const dynamic = "force-dynamic";

export default function SecretPage({ params }: { params: { id: string } }) {
    // Fetch the secret message using the ID from the URL
    const secret = useQuery(api.secrets.get, {
        secretId: params.id as Id<"secrets">,
    });

    return (
        <div className="flex flex-col items-center justify-center text-center gap-y-8 flex-1">
            <div className="max-w-xl p-8 border rounded-lg bg-card shadow-lg">
                <h1 className="text-2xl sm:text-3xl font-bold mb-4">A Secret Message For You</h1>
                {secret === undefined && <p>Loading...</p>}
                {secret === null && <p>This secret message could not be found. It may have been deleted.</p>}
                {secret && (
                    <p className="text-lg sm:text-xl p-4 bg-muted rounded-md">
                        &ldquo;{secret.message}&rdquo;
                    </p>
                )}
                <Button asChild className="mt-8">
                    <Link href="/">Create your own secret message</Link>
                </Button>
            </div>
        </div>
    );
}
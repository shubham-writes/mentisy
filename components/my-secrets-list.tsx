"use client";

import { usePaginatedQuery, useMutation, useAction } from "convex/react"; // 1. Import usePaginatedQuery
import { api } from "@/convex/_generated/api";
import { Check, CheckCheck, Trash2, ShieldX } from "lucide-react";
import { ShareButton } from "./share-button";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useEffect, useMemo, useRef } from "react";
import { Button } from "./ui/button";
import { Id } from "@/convex/_generated/dataModel";
import { DialogDeleteAll } from "./dialog-delete-all";

dayjs.extend(relativeTime);

export function MySecretsList() {
    // 2. Use the correct usePaginatedQuery hook for your list
    const { results, status, loadMore } = usePaginatedQuery(
        api.secrets.getMySecrets, 
        {}, // No filter arguments are needed here
        { initialNumItems: 10 } // Load 10 items initially
    );
    const hideSecret = useMutation(api.secrets.hideSecretForSender);
    const expireSecret = useAction(api.secrets.expireSecretNow);

    const scrollContainerRef = useRef<HTMLDivElement>(null);
    
    const visibleSecrets = useMemo(() => {
        return results.filter(secret => !secret.hiddenForSender);
    }, [results]);

    // 3. This infinite scroll logic now works correctly
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;
        const handleScroll = () => {
            const closeToBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 100;
            if (closeToBottom && status === "CanLoadMore") {
                loadMore(10);
            }
        };
        container.addEventListener("scroll", handleScroll);
        return () => container.removeEventListener("scroll", handleScroll);
    }, [status, loadMore]);

    return (
        <div className="w-full max-w-md p-4 border rounded-lg bg-card mt-8">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Your Generated Links</h3>
                {visibleSecrets.length > 0 && <DialogDeleteAll />}
            </div>
      
            {status === "LoadingFirstPage" && (
                <p className="text-sm text-muted-foreground text-center">Loading your links...</p>
            )}
            
            <div ref={scrollContainerRef} className="space-y-3 max-h-72 overflow-y-auto pr-2">
                {visibleSecrets.length === 0 && status !== "LoadingFirstPage" && (
                    <p className="text-sm text-muted-foreground text-center">You havent created any secrets yet.</p>
                )}
                {visibleSecrets.map((secret) => {
                    const link = `${window.location.origin}/redirect/${secret.publicId}`;
                    const isExpired = secret.expired === true || (secret.isRead && !secret.message && !secret.fileUrl);


                    return (
                        <div key={secret._id} className="p-3 bg-muted rounded-md text-left">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-sm font-medium">To: {secret.recipientName || "Anyone"}</p>
                                    <p className="text-xs text-muted-foreground italic">Note: {secret.publicNote || "No note"}</p>
                                    <p className="text-xs text-muted-foreground">Created {dayjs(secret._creationTime).fromNow()}</p>
                                </div>
                                <div className="flex items-center gap-x-2">
                                    {isExpired ? ( <span className="text-xs font-semibold text-red-500">EXPIRED</span> )
                                    : ( secret.isRead ? ( <CheckCheck className="h-5 w-5 text-blue-500" /> )
                                    : ( <Check className="h-5 w-5 text-gray-400" /> ))}
                                    
                                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => hideSecret({ secretId: secret._id as Id<"secrets"> })}>
                                        <Trash2 className="h-4 w-4 text-muted-foreground" />
                                    </Button>
                                </div>
                            </div>
                            {!isExpired && (
                                <div className="mt-2 flex items-center justify-between">
                                    <ShareButton title="A Secret Message" text={`${secret.publicNote || ""} ${link}`} url={link} />
                                    
                                    {!secret.isRead && (
                                        <Button variant="destructive" size="sm" onClick={() => expireSecret({ secretId: secret._id as Id<"secrets"> })}>
                                            <ShieldX className="h-4 w-4 mr-2" /> Expire It!
                                        </Button>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
                {status === "LoadingMore" && <p className="text-sm text-muted-foreground text-center mt-4">Loading more...</p>}
            </div>
        </div>
    );
}
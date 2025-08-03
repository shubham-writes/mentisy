"use client";

import { usePaginatedQuery, useMutation, useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Check, CheckCheck, Trash2, ShieldX, Clock, Monitor } from "lucide-react";
import { ShareButton } from "./share-button";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Id } from "@/convex/_generated/dataModel";
import { DialogDeleteAll } from "./dialog-delete-all";
import { 
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "./ui/tooltip";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "./ui/collapsible";

dayjs.extend(relativeTime);

export function MySecretsList() {
    const { results, status, loadMore } = usePaginatedQuery(
        api.secrets.getMySecrets, 
        {}, 
        { initialNumItems: 10 }
    );
    const hideSecret = useMutation(api.secrets.hideSecretForSender);
    const expireSecret = useAction(api.secrets.expireSecretNow);
    const [expandedSecrets, setExpandedSecrets] = useState<Set<string>>(new Set());

    const scrollContainerRef = useRef<HTMLDivElement>(null);
    
    const visibleSecrets = useMemo(() => {
        return results.filter(secret => !secret.hiddenForSender);
    }, [results]);

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

    const toggleExpanded = (secretId: string) => {
        const newExpanded = new Set(expandedSecrets);
        if (newExpanded.has(secretId)) {
            newExpanded.delete(secretId);
        } else {
            newExpanded.add(secretId);
        }
        setExpandedSecrets(newExpanded);
    };

    const formatUserAgent = (userAgent?: string) => {
        if (!userAgent) return "Unknown Device";
        
        // Basic parsing for common browsers and devices
        if (userAgent.includes("Mobile") || userAgent.includes("Android")) {
            if (userAgent.includes("Chrome")) return "📱 Mobile Chrome";
            if (userAgent.includes("Safari")) return "📱 Mobile Safari";
            return "📱 Mobile Device";
        }
        
        if (userAgent.includes("Chrome")) return "💻 Desktop Chrome";
        if (userAgent.includes("Firefox")) return "🦊 Firefox";
        if (userAgent.includes("Safari")) return "🌐 Safari";
        if (userAgent.includes("Edge")) return "🔷 Edge";
        
        return "💻 Desktop Browser";
    };

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
                    <p className="text-sm text-muted-foreground text-center">You haven&apos;t created any secrets yet.</p>
                )}
                {visibleSecrets.map((secret) => {
                    const link = `${window.location.origin}/redirect/${secret.publicId}`;
                    const isExpired = secret.expired === true || (secret.isRead && !secret.message && !secret.fileUrl);
                    const isExpanded = expandedSecrets.has(secret._id);
                    const hasAnalytics = secret.isRead && secret.viewedAt;

                    return (
                        <div key={secret._id} className="p-3 bg-muted rounded-md text-left">
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <p className="text-sm font-medium">To: {secret.recipientName || "Anyone"}</p>
                                    <p className="text-xs text-muted-foreground italic">Note: {secret.publicNote || "No note"}</p>
                                    <p className="text-xs text-muted-foreground">Created {dayjs(secret._creationTime).fromNow()}</p>
                                    
                                    {/* Analytics preview - Only shows time and device */}
                                    {hasAnalytics && (
                                        <div className="flex items-center gap-2 mt-1">
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger>
                                                        <div className="flex items-center gap-1 text-xs text-green-600">
                                                            <Clock className="h-3 w-3" />
                                                            {dayjs(secret.viewedAt).format("MMM D, h:mm A")}
                                                        </div>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>Viewed on {dayjs(secret.viewedAt).format("MMMM D, YYYY [at] h:mm A")}</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                            
                                           
                                        </div>
                                    )}
                                </div>
                                
                                <div className="flex items-center gap-x-2">
                                    {isExpired ? ( 
                                        <span className="text-xs font-semibold text-red-500">EXPIRED</span> 
                                    ) : ( 
                                        secret.isRead ? ( 
                                            <CheckCheck className="h-5 w-5 text-blue-500" /> 
                                        ) : ( 
                                            <Check className="h-5 w-5 text-gray-400" /> 
                                        )
                                    )}
                                    
                                    <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        className="h-6 w-6" 
                                        onClick={() => hideSecret({ secretId: secret._id as Id<"secrets"> })}
                                    >
                                        <Trash2 className="h-4 w-4 text-muted-foreground" />
                                    </Button>
                                </div>
                            </div>

                            {/* Analytics Details - Collapsible (Privacy Compliant) */}
                            {hasAnalytics && (
                                <Collapsible open={isExpanded} onOpenChange={() => toggleExpanded(secret._id)}>
                                    <CollapsibleTrigger asChild>
                                        <Button variant="ghost" size="sm" className="h-6 p-0 text-xs text-muted-foreground hover:text-foreground mt-2">
                                            {isExpanded ? "Hide" : "Show"} Analytics Details
                                        </Button>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent className="mt-2 p-2 bg-background rounded border text-xs space-y-2">
                                        <div className="grid grid-cols-1 gap-2">
                                            {secret.viewedAt && (
                                                <div className="flex items-center gap-2">
                                                    <Clock className="h-3 w-3 text-muted-foreground" />
                                                    <span className="font-medium">Viewed:</span>
                                                   <span>{dayjs(secret.viewedAt).format("MMMM D, YYYY")} at {dayjs(secret.viewedAt).format("h:mm:ss A")}</span>

                                                </div>
                                            )}
                                        </div>
                                    </CollapsibleContent>
                                </Collapsible>
                            )}
                            
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
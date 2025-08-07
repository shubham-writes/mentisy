"use client";

import { usePaginatedQuery, useMutation, useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Check, CheckCheck, Trash2, ShieldX, Clock, Monitor, ChevronDown, ChevronUp } from "lucide-react";
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
        <div className="w-full max-w-4xl mx-auto">
            {/* Header Section */}
            <div className="mb-8 text-center">
                <h3 className="text-4xl font-bold mb-3 bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] bg-clip-text text-transparent">
                    Your Secret Links
                </h3>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                    Track your moments in the void
                </p>
            </div>

            <div className="bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-xl p-8 shadow-sm">
                {/* Header with delete all button */}
                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#FF75A0] to-[#FFAA70] rounded-lg flex items-center justify-center">
                            <span className="text-xl">🔗</span>
                        </div>
                        <div>
                            <h4 className="text-2xl font-bold text-gray-900 dark:text-white">Your Links</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                {visibleSecrets.length} {visibleSecrets.length === 1 ? 'secret' : 'secrets'} in the wild
                            </p>
                        </div>
                    </div>
                    {visibleSecrets.length > 0 && <DialogDeleteAll />}
                </div>

                {/* Loading State */}
                {status === "LoadingFirstPage" && (
                    <div className="text-center py-16">
                        <div className="w-16 h-16 bg-gradient-to-br from-[#FF75A0] to-[#FFAA70] rounded-xl flex items-center justify-center mx-auto mb-4">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                        </div>
                        <p className="text-lg text-gray-600 dark:text-gray-400">Loading your secrets...</p>
                    </div>
                )}
                
                {/* Scrollable Secrets List */}
                <div ref={scrollContainerRef} className="space-y-4 max-h-96 overflow-y-auto pr-2">
                    {/* Empty State */}
                    {visibleSecrets.length === 0 && status !== "LoadingFirstPage" && (
                        <div className="text-center py-16">
                            <div className="w-24 h-24 bg-gray-50 dark:bg-gray-800 rounded-xl flex items-center justify-center mx-auto mb-6">
                                <span className="text-3xl">🤷‍♀️</span>
                            </div>
                            <h5 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                No secrets yet
                            </h5>
                            <p className="text-gray-500 dark:text-gray-400">
                                Create your first secret above to get started!
                            </p>
                        </div>
                    )}

                    {/* Secret Items */}
                    {visibleSecrets.map((secret) => {
                        const link = `${window.location.origin}/redirect/${secret.publicId}`;
                        const isExpired = secret.expired === true || (secret.isRead && !secret.message && !secret.fileUrl);
                        const isExpanded = expandedSecrets.has(secret._id);
                        const hasAnalytics = secret.isRead && secret.viewedAt;

                        return (
                            <div key={secret._id} className="group">
                                <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg p-6  hover:border-[#FF75A0]/20 dark:hover:border-[#FF75A0]/20 transition-all duration-200">
                                    {/* Main Content Row */}
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex-1 space-y-2">
                                            {/* Recipient */}
                                            <div className="flex items-center space-x-2">
                                                <span className="text-[#FF75A0]">👤</span>
                                                <span className="font-semibold text-gray-900 dark:text-white">
                                                    To: {secret.recipientName || "Anyone"}
                                                </span>
                                            </div>
                                            
                                            {/* Public Note */}
                                            <div className="flex items-center space-x-2">
                                                <span className="text-[#FFAA70]">💭</span>
                                                <span className="text-sm text-gray-600 dark:text-gray-400 italic">
                                                    {secret.publicNote || "No teaser message"}
                                                </span>
                                            </div>
                                            
                                            {/* Creation Time */}
                                            <div className="flex items-center space-x-2">
                                                <span className="text-gray-400">📅</span>
                                                <span className="text-xs text-gray-500 dark:text-gray-500">
                                                    Created {dayjs(secret._creationTime).fromNow()}
                                                </span>
                                            </div>
                                            
                                            {/* Analytics Preview */}
                                            {hasAnalytics && (
                                                <div className="flex items-center space-x-2">
                                                    <TooltipProvider>
                                                        <Tooltip>
                                                            <TooltipTrigger>
                                                                <div className="flex items-center space-x-2 px-3 py-1 bg-emerald-50 dark:bg-emerald-900/20 rounded-md border border-emerald-200 dark:border-emerald-800">
                                                                    <Clock className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                                                                    <span className="text-xs font-medium text-emerald-700 dark:text-emerald-300">
                                                                        Viewed {dayjs(secret.viewedAt).format("MMM D, h:mm A")}
                                                                    </span>
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
                                        
                                        {/* Status Icons */}
                                        <div className="flex items-center space-x-3">
                                            {isExpired ? (
                                                <div className="px-3 py-1 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
                                                    <span className="text-xs font-semibold text-red-600 dark:text-red-400">EXPIRED</span>
                                                </div>
                                            ) : secret.isRead ? (
                                                <div className="p-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md">
                                                    <CheckCheck className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                                </div>
                                            ) : (
                                                <div className="p-2 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md">
                                                    <Check className="h-5 w-5 text-gray-400" />
                                                </div>
                                            )}
                                            
                                            <Button 
                                                variant="ghost" 
                                                size="icon" 
                                                className="h-9 w-9 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-200 dark:hover:border-red-800 opacity-0 group-hover:opacity-100 transition-all duration-200" 
                                                onClick={() => hideSecret({ secretId: secret._id as Id<"secrets"> })}
                                            >
                                                <Trash2 className="h-4 w-4 text-red-500 dark:text-red-400" />
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Analytics Details - Collapsible */}
                                    {hasAnalytics && (
                                        <Collapsible open={isExpanded} onOpenChange={() => toggleExpanded(secret._id)}>
                                            <CollapsibleTrigger asChild>
                                                <Button 
                                                    variant="ghost" 
                                                    size="sm" 
                                                    className="w-full justify-between p-3 h-auto bg-white dark:bg-gray-700/30 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600 mb-4 transition-colors"
                                                >
                                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                        View Analytics Details
                                                    </span>
                                                    {isExpanded ? (
                                                        <ChevronUp className="h-4 w-4 text-gray-500" />
                                                    ) : (
                                                        <ChevronDown className="h-4 w-4 text-gray-500" />
                                                    )}
                                                </Button>
                                            </CollapsibleTrigger>
                                            <CollapsibleContent className="mb-4">
                                                <div className="bg-white dark:bg-gray-900/80 rounded-lg p-4 border border-gray-200 dark:border-gray-600 shadow-sm">
                                                    <h6 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center space-x-2">
                                                        <span>📊</span>
                                                        <span>Viewing Details</span>
                                                    </h6>
                                                    <div className="space-y-3">
                                                        {secret.viewedAt && (
                                                            <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                                                                <Clock className="h-4 w-4 text-[#FF75A0] flex-shrink-0" />
                                                                <div>
                                                                    <span className="font-medium text-gray-700 dark:text-gray-300">Viewed on:</span>
                                                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                                                        {dayjs(secret.viewedAt).format("MMMM D, YYYY")} at {dayjs(secret.viewedAt).format("h:mm:ss A")}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </CollapsibleContent>
                                        </Collapsible>
                                    )}
                                    
                                    {/* Action Buttons */}
                                    {!isExpired && (
                                        <div className="flex items-center gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                                            <div className="flex-1">
                                                <ShareButton 
                                                    title="A Secret Message" 
                                                    text={`${secret.publicNote || ""} ${link}`} 
                                                    url={link} 
                                                />
                                            </div>
                                            
                                            {!secret.isRead && (
                                                <Button 
                                                    variant="destructive" 
                                                    size="sm" 
                                                    onClick={() => expireSecret({ secretId: secret._id as Id<"secrets"> })}
                                                    className="rounded-lg bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 border-0 shadow-sm hover:shadow-md transition-all duration-200 flex-shrink-0"
                                                >
                                                    <ShieldX className="h-4 w-4 mr-2" /> 
                                                    Expire Now
                                                </Button>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}

                    {/* Loading More Indicator */}
                    {status === "LoadingMore" && (
                        <div className="text-center py-8">
                            <div className="flex items-center justify-center space-x-3 text-[#FF75A0]">
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#FF75A0]"></div>
                                <span className="font-medium">Loading more secrets...</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
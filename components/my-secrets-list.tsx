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
                <h3 className="text-4xl font-bold mb-3 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Your Secret Links
                </h3>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                    Track your moments in the void
                </p>
            </div>

            <div className="bg-white dark:bg-gray-800 border-0 rounded-3xl p-8 shadow-xl">
                {/* Header with delete all button */}
                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                            <span className="text-xl">🔗</span>
                        </div>
                        <div>
                            <h4 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Your Links</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                {visibleSecrets.length} {visibleSecrets.length === 1 ? 'secret' : 'secrets'} in the wild
                            </p>
                        </div>
                    </div>
                    {visibleSecrets.length > 0 && <DialogDeleteAll />}
                </div>

                {/* Loading State */}
                {status === "LoadingFirstPage" && (
                    <div className="text-center py-16">
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
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
                            <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                                <span className="text-3xl">🤷‍♀️</span>
                            </div>
                            <h5 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                                No secrets yet
                            </h5>
                            <p className="text-gray-600 dark:text-gray-400">
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
                                <div className="bg-gradient-to-br from-gray-50 to-purple-50/30 dark:from-gray-800 dark:to-purple-900/10 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 hover:shadow-lg transition-all duration-200">
                                    {/* Main Content Row */}
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex-1 space-y-2">
                                            {/* Recipient */}
                                            <div className="flex items-center space-x-2">
                                                <span className="text-purple-500">👤</span>
                                                <span className="font-semibold text-gray-800 dark:text-gray-200">
                                                    To: {secret.recipientName || "Anyone"}
                                                </span>
                                            </div>
                                            
                                            {/* Public Note */}
                                            <div className="flex items-center space-x-2">
                                                <span className="text-purple-500">💭</span>
                                                <span className="text-sm text-gray-600 dark:text-gray-400 italic">
                                                    {secret.publicNote || "No teaser message"}
                                                </span>
                                            </div>
                                            
                                            {/* Creation Time */}
                                            <div className="flex items-center space-x-2">
                                                <span className="text-purple-500">📅</span>
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
                                                                <div className="flex items-center space-x-2 px-3 py-1 bg-green-100 dark:bg-green-900/30 rounded-full">
                                                                    <Clock className="h-3 w-3 text-green-600 dark:text-green-400" />
                                                                    <span className="text-xs font-medium text-green-700 dark:text-green-300">
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
                                                <div className="px-3 py-1 bg-red-100 dark:bg-red-900/30 rounded-full">
                                                    <span className="text-xs font-bold text-red-600 dark:text-red-400">EXPIRED</span>
                                                </div>
                                            ) : secret.isRead ? (
                                                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                                                    <CheckCheck className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                                </div>
                                            ) : (
                                                <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full">
                                                    <Check className="h-5 w-5 text-gray-400" />
                                                </div>
                                            )}
                                            
                                            <Button 
                                                variant="ghost" 
                                                size="icon" 
                                                className="h-9 w-9 rounded-full hover:bg-red-100 dark:hover:bg-red-900/30 opacity-0 group-hover:opacity-100 transition-opacity" 
                                                onClick={() => hideSecret({ secretId: secret._id as Id<"secrets"> })}
                                            >
                                                <Trash2 className="h-4 w-4 text-red-500" />
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
                                                    className="w-full justify-between p-3 h-auto bg-white/50 dark:bg-gray-700/30 hover:bg-white/80 dark:hover:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600 mb-4"
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
                                                <div className="bg-white/80 dark:bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-gray-600">
                                                    <h6 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center space-x-2">
                                                        <span>📊</span>
                                                        <span>Viewing Details</span>
                                                    </h6>
                                                    <div className="space-y-3">
                                                        {secret.viewedAt && (
                                                            <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                                                <Clock className="h-4 w-4 text-purple-500 flex-shrink-0" />
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
                                        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                                            <ShareButton 
                                                title="A Secret Message" 
                                                text={`${secret.publicNote || ""} ${link}`} 
                                                url={link} 
                                            />
                                            
                                            {!secret.isRead && (
                                                <Button 
                                                    variant="destructive" 
                                                    size="sm" 
                                                    onClick={() => expireSecret({ secretId: secret._id as Id<"secrets"> })}
                                                    className="rounded-xl bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 border-0"
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
                            <div className="flex items-center justify-center space-x-3 text-purple-600 dark:text-purple-400">
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-500"></div>
                                <span className="font-medium">Loading more secrets...</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
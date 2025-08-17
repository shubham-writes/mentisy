"use client";

import { usePaginatedQuery, useMutation, useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Check, CheckCheck, Trash2, ShieldX, Clock, Monitor, ChevronDown, ChevronUp, Copy, Eye, EyeOff } from "lucide-react";
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
    const [copiedSecrets, setCopiedSecrets] = useState<Set<string>>(new Set());

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

    const copyToClipboard = async (secret: any) => {
        try {
            const link = `${window.location.origin}/redirect/${secret.publicId}`;
            const textToCopy = `${secret.publicNote || ""} ${link}`;
            await navigator.clipboard.writeText(textToCopy);
            setCopiedSecrets(prev => new Set(prev).add(secret._id));
            setTimeout(() => {
                setCopiedSecrets(prev => {
                    const newSet = new Set(prev);
                    newSet.delete(secret._id);
                    return newSet;
                });
            }, 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
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
        if (userAgent.includes("Safari")) return "🌍 Safari";
        if (userAgent.includes("Edge")) return "🔷 Edge";
        
        return "💻 Desktop Browser";
    };

    return (
        <div className="w-full flex flex-col items-center justify-center p-1 sm:p-3">
            {/* Header Section */}
            <div className="mb-6 sm:mb-8 w-full text-center px-2">
                <h3 className="text-2xl sm:text-4xl font-bold mb-3 bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] bg-clip-text text-transparent">
                    Your Secret Links
                </h3>
                <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300">
                    Track your moments in the void
                </p>
            </div>

            <div className="w-full sm:w-lg bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-xl sm:p-6 lg:p-8 p-2 sm:mx-0 shadow-sm">
                {/* Header with delete all button */}
                <div className="mb-6 sm:mb-8">
                    {/* Main header */}
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center p-2 space-x-3">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#FF75A0] to-[#FFAA70] rounded-lg flex items-center justify-center">
                                <span className="text-lg sm:text-xl">🔗</span>
                            </div>
                            <div>
                                <h4 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Your Links</h4>
                                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                                    {visibleSecrets.length} {visibleSecrets.length === 1 ? 'secret' : 'secrets'} in the wild
                                </p>
                            </div>
                        </div>
                        
                        {/* Desktop delete all button */}
                        {visibleSecrets.length > 0 && (
                            <div className="hidden sm:block">
                                <DialogDeleteAll />
                            </div>
                        )}
                    </div>
                    
                    {/* Mobile delete all button - full width below header */}
                    {visibleSecrets.length > 0 && (
                        <div className="sm:hidden px-2">
                            <DialogDeleteAll />
                        </div>
                    )}
                </div>

                {/* Loading State */}
                {status === "LoadingFirstPage" && (
                    <div className="text-center py-12 sm:py-16">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#FF75A0] to-[#FFAA70] rounded-xl flex items-center justify-center mx-auto mb-4">
                            <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-white"></div>
                        </div>
                        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">Loading your secrets...</p>
                    </div>
                )}
                
                {/* Scrollable Secrets List */}
                <div ref={scrollContainerRef} className="space-y-3 max-h-96 overflow-y-auto">
                    {/* Empty State */}
                    {visibleSecrets.length === 0 && status !== "LoadingFirstPage" && (
                        <div className="text-center py-12 sm:py-16 px-4">
                            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-50 dark:bg-gray-800 rounded-xl flex items-center justify-center mx-auto mb-6">
                                <span className="text-2xl sm:text-3xl">🤷‍♀️</span>
                            </div>
                            <h5 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                No secrets yet
                            </h5>
                            <p className="text-gray-500 dark:text-gray-400">
                                Create your first secret above to get started!
                            </p>
                        </div>
                    )}

                    {/* Secret Items - Collapsed by default */}
                    {visibleSecrets.map((secret) => {
                        const link = `${window.location.origin}/redirect/${secret.publicId}`;
                        const isExpired = secret.expired === true || (secret.isRead && !secret.message && !secret.fileUrl);
                        const isExpanded = expandedSecrets.has(secret._id);
                        const hasAnalytics = secret.isRead && secret.viewedAt;
                        const isCopied = copiedSecrets.has(secret._id);

                        return (
                            <div key={secret._id} className="group">
                                {/* Collapsed State - Clean and Minimal */}
                                <div 
                                    className={`
                                        bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 
                                        rounded-lg p-4 hover:border-[#FF75A0]/30 dark:hover:border-[#FF75A0]/30 
                                        transition-all duration-200 cursor-pointer
                                        ${isExpanded ? 'border-[#FF75A0]/40 bg-gradient-to-r from-gray-50 to-pink-50/30 dark:from-gray-800/50 dark:to-pink-900/10' : ''}
                                    `}
                                    onClick={() => !isExpanded && toggleExpanded(secret._id)}
                                >
                                    {!isExpanded ? (
                                        // COLLAPSED VIEW - Minimal Info
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center space-x-3">
                                                    {/* Status Icon */}
                                                    <div className="flex-shrink-0">
                                                        {isExpired ? (
                                                            <div className="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                                                                <span className="text-red-600 dark:text-red-400 text-xs font-bold">❌</span>
                                                            </div>
                                                        ) : secret.isRead ? (
                                                            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                                                                <CheckCheck className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                                            </div>
                                                        ) : (
                                                            <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                                                                <Check className="h-4 w-4 text-gray-400" />
                                                            </div>
                                                        )}
                                                    </div>
                                                    
                                                    {/* Main Info */}
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center space-x-2 mb-1">
                                                            <span className="font-medium text-gray-900 dark:text-white text-sm truncate">
                                                                To: {secret.recipientName || "Anyone"}
                                                            </span>
                                                            {hasAnalytics && (
                                                                <span className="text-xs text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded-full">
                                                                    Viewed
                                                                </span>
                                                            )}
                                                        </div>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                                            {secret.publicNote || "No teaser message"} • {dayjs(secret._creationTime).fromNow()}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            {/* Expand Button */}
                                            <div className="flex items-center space-x-2 flex-shrink-0">
                                                <Button 
                                                    variant="ghost" 
                                                    size="sm"
                                                    className="h-8 w-8 p-0 rounded-full hover:bg-[#FF75A0]/10"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        toggleExpanded(secret._id);
                                                    }}
                                                >
                                                    <Eye className="h-4 w-4 text-gray-400" />
                                                </Button>
                                            </div>
                                        </div>
                                    ) : (
                                        // EXPANDED VIEW - Full Details
                                        <div className="space-y-4">
                                            {/* Header with collapse button */}
                                            <div className="flex justify-between items-start">
                                                <div className="flex-1 min-w-0">
                                                    {/* Recipient */}
                                                    <div className="flex items-center space-x-2 mb-2">
                                                        <span className="text-[#FF75A0] text-sm sm:text-base">👤</span>
                                                        <span className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                                                            To: {secret.recipientName || "Anyone"}
                                                        </span>
                                                    </div>
                                                    
                                                    {/* Public Note */}
                                                    <div className="flex items-start space-x-2 mb-2">
                                                        <span className="text-[#FFAA70] text-sm sm:text-base flex-shrink-0 mt-0.5">💭</span>
                                                        <span className="text-sm text-gray-600 dark:text-gray-400 italic break-words">
                                                            {secret.publicNote || "No teaser message"}
                                                        </span>
                                                    </div>
                                                    
                                                    {/* Creation Time */}
                                                    <div className="flex items-center space-x-2">
                                                        <span className="text-gray-400 text-sm">📅</span>
                                                        <span className="text-xs text-gray-500 dark:text-gray-500">
                                                            Created {dayjs(secret._creationTime).fromNow()}
                                                        </span>
                                                    </div>
                                                </div>
                                                
                                                {/* Status and Actions */}
                                                <div className="flex items-center space-x-2 flex-shrink-0">
                                                    {isExpired ? (
                                                        <div className="px-2 sm:px-3 py-1 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
                                                            <span className="text-xs font-semibold text-red-600 dark:text-red-400">EXPIRED</span>
                                                        </div>
                                                    ) : secret.isRead ? (
                                                        <div className="p-1.5 sm:p-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md">
                                                            <CheckCheck className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 dark:text-blue-400" />
                                                        </div>
                                                    ) : (
                                                        <div className="p-1.5 sm:p-2 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md">
                                                            <Check className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                                                        </div>
                                                    )}
                                                    
                                                    <Button 
                                                        variant="ghost" 
                                                        size="icon" 
                                                        className="h-8 w-8 sm:h-9 sm:w-9 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            toggleExpanded(secret._id);
                                                        }}
                                                    >
                                                        <EyeOff className="h-4 w-4 text-gray-500" />
                                                    </Button>
                                                    
                                                    <Button 
                                                        variant="ghost" 
                                                        size="icon" 
                                                        className="h-8 w-8 sm:h-9 sm:w-9 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-200 dark:hover:border-red-800" 
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            hideSecret({ secretId: secret._id as Id<"secrets"> });
                                                        }}
                                                    >
                                                        <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 text-red-500 dark:text-red-400" />
                                                    </Button>
                                                </div>
                                            </div>
                                            
                                            {/* Analytics Preview */}
                                            {hasAnalytics && (
                                                <div className="flex items-center space-x-2">
                                                    <TooltipProvider>
                                                        <Tooltip>
                                                            <TooltipTrigger>
                                                                <div className="flex items-center space-x-2 px-2 sm:px-3 py-1 bg-emerald-50 dark:bg-emerald-900/20 rounded-md border border-emerald-200 dark:border-emerald-800">
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
                                            
                                            {/* Action Buttons */}
                                            {!isExpired && (
                                                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                                                    {/* Copy Button */}
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            copyToClipboard(secret);
                                                        }}
                                                        className="flex items-center justify-center space-x-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 text-sm font-medium text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600"
                                                        title={isCopied ? "Copied!" : "Copy message"}
                                                    >
                                                        {isCopied ? (
                                                            <>
                                                                <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                                                                <span className="text-green-600 dark:text-green-400">Copied!</span>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Copy className="h-4 w-4" />
                                                                <span>Copy Link</span>
                                                            </>
                                                        )}
                                                    </button>
                                                    
                                                    <div className="flex-1" onClick={(e) => e.stopPropagation()}>
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
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                expireSecret({ secretId: secret._id as Id<"secrets"> });
                                                            }}
                                                            className="rounded-lg bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 border-0 shadow-sm hover:shadow-md transition-all duration-200 flex-shrink-0 text-xs sm:text-sm px-3 py-2"
                                                        >
                                                            <ShieldX className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" /> 
                                                            <span className="hidden sm:inline">Expire Now</span>
                                                            <span className="sm:hidden">Expire</span>
                                                        </Button>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}

                    {/* Loading More Indicator */}
                    {status === "LoadingMore" && (
                        <div className="text-center py-6 sm:py-8">
                            <div className="flex items-center justify-center space-x-3 text-[#FF75A0]">
                                <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-[#FF75A0]"></div>
                                <span className="font-medium text-sm sm:text-base">Loading more secrets...</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
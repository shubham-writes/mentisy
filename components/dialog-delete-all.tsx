"use client";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

export function DialogDeleteAll() {
    const deleteAll = useMutation(api.secrets.deleteAllMySecrets);

    return (
        <Dialog >
            <DialogTrigger asChild>
                {/* Mobile: Full width button with icon */}
                <Button 
                    variant="destructive" 
                    className="sm:hidden w-full h-12 text-sm  font-medium rounded-lg bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 border-0 shadow-sm"
                >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete All
                </Button>
            </DialogTrigger>
            
            <DialogTrigger asChild>
                {/* Desktop: Compact button */}
                <Button 
                    variant="destructive" 
                    size="sm"
                    className="hidden sm:flex items-center space-x-2 rounded-lg bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 border-0 shadow-sm transition-all duration-200"
                >
                    <Trash2 className="h-4 w-4" />
                    <span>Delete All</span>
                </Button>
            </DialogTrigger>
            
            <DialogContent className="sm:max-w-[425px] mx-4 rounded-xl">
                <DialogHeader className="text-center sm:text-left">
                    <DialogTitle className="text-lg sm:text-xl font-bold">Delete All Your Secrets</DialogTitle>
                    <DialogDescription className="text-sm sm:text-base mt-2">
                        Are you sure you want to delete all of your generated links? This action cannot be undone and will permanently remove all your secrets.
                    </DialogDescription>
                </DialogHeader>
                
                <DialogFooter className="flex flex-col sm:flex-row gap-3 sm:gap-2 mt-6">
                    {/* Mobile: Stack buttons vertically */}
                    <div className="flex flex-col sm:hidden space-y-3">
                        <Button
                            variant="destructive"
                            onClick={() => deleteAll()}
                            className="w-full h-12 text-base font-semibold rounded-lg bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                        >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Yes, Delete All Secrets
                        </Button>
                        <Button
                            variant="outline"
                            className="w-full h-12 text-base font-medium rounded-lg border-2"
                            onClick={(e) => {
                                // Close dialog by clicking outside or escape
                                const dialog = e.currentTarget.closest('[role="dialog"]');
                                if (dialog) {
                                    const backdrop = document.querySelector('[data-state="open"]');
                                    if (backdrop) {
                                        (backdrop as HTMLElement).click();
                                    }
                                }
                            }}
                        >
                            Cancel
                        </Button>
                    </div>
                    
                    {/* Desktop: Horizontal layout */}
                    <div className="hidden sm:flex sm:space-x-2 sm:justify-end">
                        <Button
                            variant="outline"
                            className="px-4 py-2"
                            onClick={(e) => {
                                const dialog = e.currentTarget.closest('[role="dialog"]');
                                if (dialog) {
                                    const backdrop = document.querySelector('[data-state="open"]');
                                    if (backdrop) {
                                        (backdrop as HTMLElement).click();
                                    }
                                }
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={() => deleteAll()}
                            className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                        >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete All
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
"use client";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
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
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="destructive" size="sm">Delete All</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Delete All Your Secrets</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete all of your generated links? This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        variant="destructive"
                        onClick={() => deleteAll()}
                    >
                        Confirm Delete All
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
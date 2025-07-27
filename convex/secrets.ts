// convex/secrets.ts
import { v } from "convex/values";
import { mutation, internalMutation, internalAction, internalQuery } from "./_generated/server";
import { internal } from "./_generated/api";

export const create = mutation({
    args: {
        message: v.optional(v.string()),
        recipientName: v.optional(v.string()),
        publicNote: v.optional(v.string()),
        fileUrl: v.optional(v.string()),
        fileType: v.optional(v.union(v.literal("image"), v.literal("video"))),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Unauthorized");
        const user = await ctx.db.query("users").withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier)).unique();
        if (!user) throw new Error("User not found.");

        const secretId = await ctx.db.insert("secrets", {
            authorId: user._id,
            message: args.message,
            recipientName: args.recipientName,
            publicNote: args.publicNote,
            fileUrl: args.fileUrl,
            fileType: args.fileType,
            isRead: false,
        });
        return secretId;
    },
});

export const readAndReveal = mutation({
    args: { secretId: v.id("secrets") },
    handler: async (ctx, args) => {
        const secret = await ctx.db.get(args.secretId);
        if (!secret || secret.isRead) return null;
        await ctx.db.patch(secret._id, { isRead: true });
        // Changed this line to call the action instead
        ctx.scheduler.runAfter(10000, internal.secrets.destroyAction, { secretId: secret._id });
        return secret;
    },
});

// NEW: Action to handle the file deletion (can use fetch)
export const destroyAction = internalAction({
    args: { secretId: v.id("secrets") },
    handler: async (ctx, args) => {
        console.log("🚀 destroyAction started for secretId:", args.secretId);
        
        // First get the secret data
        const secret = await ctx.runQuery(internal.secrets.getSecret, { secretId: args.secretId });
        console.log("📄 Secret found:", !!secret);
        console.log("🔗 File URL:", secret?.fileUrl);
        
        if (secret?.fileUrl) {
            // Extract file key from URL like: https://utfs.io/f/K3rKu8TZjrBDK3IN7RIZjrBDHxNSkOcTzXL7Z6Jwb31i594P
            const fileKey = secret.fileUrl.substring(secret.fileUrl.lastIndexOf("/") + 1);
            console.log("🔑 Extracted file key:", fileKey);
            
            const vercelUrl = process.env.NEXT_PUBLIC_URL; 
            const internalSecret = process.env.INTERNAL_API_SECRET;
            
            console.log("🌐 Vercel URL:", vercelUrl);
            console.log("🔐 Has internal secret:", !!internalSecret);
            if (internalSecret) {
                console.log("🔐 Internal secret (first 4 chars):", internalSecret.substring(0, 4));
            }
            console.log("📍 Full API URL:", `${vercelUrl}/api/deleteFile`);

            if (!vercelUrl) {
                console.error("❌ NEXT_PUBLIC_URL is not set!");
                return;
            }
            if (!internalSecret) {
                console.error("❌ INTERNAL_API_SECRET is not set!");
                return;
            }

            if (vercelUrl && internalSecret) {
                try {
                    console.log("📤 Making fetch request...");
                    
                    const response = await fetch(`${vercelUrl}/api/deleteFile`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "x-internal-secret": internalSecret,
                        },
                        body: JSON.stringify({ fileKey }),
                    });
                    
                    console.log("📥 Response status:", response.status);
                    console.log("📥 Response ok:", response.ok);
                    
                    if (!response.ok) {
                        const errorBody = await response.text(); // Use text() first, then try JSON
                        console.error("❌ Failed to delete file from Vercel API:", errorBody);
                        console.error("❌ Response status:", response.status);
                        console.error("❌ Response statusText:", response.statusText);
                        try {
                            const jsonError = JSON.parse(errorBody);
                            console.error("❌ Parsed error:", jsonError);
                        } catch (e) {
                            console.error("❌ Could not parse error as JSON");
                        }
                    } else {
                        // Handle successful response
                        const responseText = await response.text();
                        console.log("✅ Response text:", responseText);
                        try {
                            const successBody = JSON.parse(responseText);
                            console.log("✅ Successfully deleted file from uploadthing via Vercel API:", successBody);
                        } catch (e) {
                            console.log("✅ Success but could not parse response as JSON:", responseText);
                        }
                    }
                } catch (error) {
                    console.error("💥 Error calling Vercel delete API:", error);
                    if (error instanceof Error) {
                        console.error("💥 Error message:", error.message);
                        console.error("💥 Error stack:", error.stack);
                    }
                }
            } else {
                console.error("❌ Missing environment variables:");
                console.error("   NEXT_PUBLIC_URL:", !!vercelUrl);
                console.error("   INTERNAL_API_SECRET:", !!internalSecret);
            }
        } else {
            console.log("ℹ️ No file URL found, skipping file deletion");
        }

        // Finally delete the secret record
        console.log("🗑️ Deleting secret record...");
        await ctx.runMutation(internal.secrets.deleteSecret, { secretId: args.secretId });
        console.log("✅ Secret record deleted");
    },
});

// Helper query to get secret data (used by the action)
export const getSecret = internalQuery({
    args: { secretId: v.id("secrets") },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.secretId);
    },
});

// Helper mutation to delete the secret (used by the action)
export const deleteSecret = internalMutation({
    args: { secretId: v.id("secrets") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.secretId);
    },
});

// You can remove the old destroy function as it's replaced by destroyAction
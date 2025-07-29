// convex/secrets.ts
import { v } from "convex/values";
// 1. Add 'query' and 'internalQuery' to this import statement
import { mutation, internalMutation, internalAction, query, internalQuery } from "./_generated/server";
import { api, internal } from "./_generated/api";

// Helper function to generate a short random ID
function generatePublicId(length = 8) {
    return Math.random().toString(36).substring(2, 2 + length);
}

export const create = mutation({
    // ... (This function remains the same)
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
            publicId: generatePublicId(),
            message: args.message,
            recipientName: args.recipientName,
            publicNote: args.publicNote,
            fileUrl: args.fileUrl,
            fileType: args.fileType,
            isRead: false,
        });
        
        const newSecret = await ctx.db.get(secretId);
        return newSecret?.publicId;
    },
});

// This function now has the correct import for 'query'
export const getSecretIdFromPublicId = query({
    args: { publicId: v.string() },
    handler: async (ctx, args) => {
        const secret = await ctx.db
            .query("secrets")
            .withIndex("by_publicId", (q) => q.eq("publicId", args.publicId))
            .unique();
        
        return secret?._id;
    },
});

export const readAndReveal = mutation({
    args: { secretId: v.id("secrets") },
    handler: async (ctx, args) => {
        const secret = await ctx.db.get(args.secretId);
        if (!secret || secret.isRead) return null;
        await ctx.db.patch(secret._id, { isRead: true });
        
        ctx.scheduler.runAfter(10000, internal.secrets.destroy, { secretId: secret._id });
        
        return secret;
    },
});

export const destroy = internalAction({
    args: { secretId: v.id("secrets") },
    handler: async (ctx, args) => {
        const secret = await ctx.runQuery(internal.secrets.getSecretForDeletion, { secretId: args.secretId });

        if (secret?.fileUrl) {
            const fileKey = secret.fileUrl.substring(secret.fileUrl.lastIndexOf("/") + 1);
            const vercelUrl = process.env.NEXT_PUBLIC_URL;
            const internalSecret = process.env.INTERNAL_API_SECRET;

            if (vercelUrl && internalSecret) {
                await fetch(`${vercelUrl}/api/deleteFile`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json", "x-internal-secret": internalSecret },
                    body: JSON.stringify({ fileKey }),
                });
            }
        }

        await ctx.runMutation(internal.secrets.deleteSecretRecord, { secretId: args.secretId });
    },
});

export const getSecretForDeletion = internalQuery({
    args: { secretId: v.id("secrets") },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.secretId);
    },
});

export const deleteSecretRecord = internalMutation({
    args: { secretId: v.id("secrets") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.secretId);
    },
});
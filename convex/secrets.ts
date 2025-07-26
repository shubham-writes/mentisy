// convex/secrets.ts
import { v } from "convex/values";
import { mutation, internalMutation } from "./_generated/server";
import { internal } from "./_generated/api";

// Update the 'create' mutation to accept a recipientName
export const create = mutation({
    args: {
        message: v.string(),
        recipientName: v.optional(v.string()), 
        publicNote: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("You must be logged in to create a secret message.");
        }
        const user = await ctx.db
            .query("users")
            .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
            .unique();
        if (!user) {
            throw new Error("User not found.");
        }
        const secretId = await ctx.db.insert("secrets", {
            authorId: user._id,
            message: args.message,
            recipientName: args.recipientName, // Store the recipient's name
            isRead: false,
        });
        return secretId;
    },
});

// (The rest of your 'readAndReveal' and 'destroy' functions remain the same)
export const readAndReveal = mutation({
    args: { secretId: v.id("secrets") },
    handler: async (ctx, args) => {
        const secret = await ctx.db.get(args.secretId);
        if (!secret || secret.isRead) {
            return null;
        }
        await ctx.db.patch(secret._id, { isRead: true });
        ctx.scheduler.runAfter(10000, internal.secrets.destroy, {
            secretId: secret._id,
        });
        return secret;
    },
});

export const destroy = internalMutation({
    args: { secretId: v.id("secrets") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.secretId);
    },
});
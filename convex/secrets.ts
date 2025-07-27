// convex/secrets.ts
import { v } from "convex/values";
import { mutation, internalMutation } from "./_generated/server";
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
        ctx.scheduler.runAfter(10000, internal.secrets.destroy, { secretId: secret._id });
        return secret;
    },
});

export const destroy = internalMutation({
    args: { secretId: v.id("secrets") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.secretId);
    },
});
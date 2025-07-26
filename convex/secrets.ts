// convex/secrets.ts
import { v } from "convex/values";
// 1. Import internalMutation and internal
import { mutation, internalMutation } from "./_generated/server";
import { internal } from "./_generated/api";

export const create = mutation({
    args: { message: v.string() },
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
            isRead: false,
        });
        return secretId;
    },
});

export const readAndReveal = mutation({
    args: { secretId: v.id("secrets") },
    handler: async (ctx, args) => {
        const secret = await ctx.db.get(args.secretId);

        if (!secret || secret.isRead) {
            return null;
        }

        await ctx.db.patch(secret._id, { isRead: true });

        // 2. Schedule the deletion to run in 10 seconds
        ctx.scheduler.runAfter(10000, internal.secrets.destroy, {
            secretId: secret._id,
        });

        return secret;
    },
});

// 3. Create a new internal mutation to delete the secret
export const destroy = internalMutation({
    args: { secretId: v.id("secrets") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.secretId);
    },
});
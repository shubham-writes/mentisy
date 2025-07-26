// convex/secrets.ts
import { v } from "convex/values";
import { mutation } from "./_generated/server";

// Update the 'create' mutation to set 'isRead' to false initially
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
            isRead: false, // Set the flag to false on creation
        });

        return secretId;
    },
});

// Replace the old 'get' query with this new 'readAndReveal' mutation
export const readAndReveal = mutation({
    args: { secretId: v.id("secrets") },
    handler: async (ctx, args) => {
        const secret = await ctx.db.get(args.secretId);

        // If the secret doesn't exist or is already read, do nothing.
        if (!secret || secret.isRead) {
            return null;
        }

        // Otherwise, mark it as read...
        await ctx.db.patch(secret._id, { isRead: true });

        // ...and then return the message.
        return secret;
    },
});
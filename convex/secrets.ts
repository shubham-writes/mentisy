// convex/secrets.ts
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";

// Function to create a new secret message (requires login)
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
        });

        return secretId;
    },
});

// Function to get a secret message by its ID (public, no login required)
export const get = query({
    args: { secretId: v.id("secrets") },
    handler: async (ctx, args) => {
        const secret = await ctx.db.get(args.secretId);
        return secret;
    },
});
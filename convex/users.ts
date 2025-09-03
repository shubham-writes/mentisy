// convex/users.ts
import { v } from "convex/values";
import { QueryCtx, mutation, query } from "./_generated/server";

export const store = mutation({
    args: { wallet: v.string() },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Called storeUser without authentication present");
        }

        const user = await ctx.db
            .query("users")
            .withIndex("by_token", (q) =>
                q.eq("tokenIdentifier", identity.tokenIdentifier),
            )
            .unique();

        const username = identity.nickname || identity.email?.split('@')[0];

        if (!username) {
            throw new Error("Cannot create user without a nickname or email.");
        }

        if (user !== null) {
            if (
                user.imageUrl !== identity.pictureUrl ||
                user.email !== identity.email ||
                user.username !== username ||
                user.wallet !== args.wallet
            ) {
                await ctx.db.patch(user._id, {
                    imageUrl: identity.pictureUrl,
                    email: identity.email,
                    username: username,
                    wallet: args.wallet,
                });
            }
            return user._id;
        }

        return await ctx.db.insert("users", {
            tokenIdentifier: identity.tokenIdentifier,
            clerkUserId: identity.subject,
            imageUrl: identity.pictureUrl!,
            email: identity.email!,
            username: username,
            wallet: args.wallet || "",
        });
    },
});

export const get = query({
    args: {
        username: v.string(),
    },
    handler: async (ctx, args) => {
        return await getUser(ctx, args.username);
    },
});

export async function getUser(ctx: QueryCtx, username: string) {
    return await ctx.db
        .query("users")
        .withIndex("username", (q) => q.eq("username", username))
        .unique();
}

// Get the current user's identity from their auth token
export const getMyIdentity = query({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            return null;
        }

        const user = await ctx.db
            .query("users")
            .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
            .unique();
        
        return user;
    },
});

// NEW: Get total user count for founding member limit
export const getTotalUserCount = query({
    args: {},
    handler: async (ctx) => {
        // This query doesn't need authentication to count users
        // Remove any auth checks that might be causing issues
        try {
            const users = await ctx.db.query("users").collect();
            return users.length;
        } catch (error) {
            console.error("Error counting users:", error);
            // Return 0 as fallback to prevent breaking the app
            return 0;
        }
    },
});
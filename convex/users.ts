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

        // Generate a username from the email if a nickname isn't available
        const username = identity.nickname || identity.email?.split('@')[0];

        // Throw an error if a username can't be generated
        if (!username) {
            throw new Error("Cannot create user without a nickname or email.");
        }

        if (user !== null) {
            // If we've seen this identity before but the data has changed, patch the user.
            if (
                user.imageUrl !== identity.pictureUrl ||
                user.email !== identity.email ||
                user.username !== username ||
                user.wallet !== args.wallet
            ) {
                await ctx.db.patch(user._id, {
                    imageUrl: identity.pictureUrl,
                    email: identity.email,
                    username: username, // Use the generated username
                    wallet: args.wallet,
                });
            }
            return user._id;
        }

        // If it's a new identity, create a new `User`.
        return await ctx.db.insert("users", {
            tokenIdentifier: identity.tokenIdentifier,
            clerkUserId: identity.subject,
            imageUrl: identity.pictureUrl!,
            email: identity.email!,
            username: username, // Use the generated username
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
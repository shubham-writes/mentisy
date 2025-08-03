// convex/secrets.ts
import { v } from "convex/values";
import { mutation, internalMutation, internalAction, query, internalQuery, action } from "./_generated/server";
import { api, internal } from "./_generated/api";
import { paginationOptsValidator } from "convex/server";

function generatePublicId(length = 8) {
    return Math.random().toString(36).substring(2, 2 + length);
}

export const create = mutation({
    args: { 
        message: v.optional(v.string()), 
        recipientName: v.optional(v.string()), 
        publicNote: v.optional(v.string()), 
        fileUrl: v.optional(v.string()), 
        fileType: v.optional(v.union(v.literal("image"), v.literal("video"))), 
        withWatermark: v.optional(v.boolean()),
        duration: v.optional(v.number()),
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
            withWatermark: args.withWatermark, 
            isRead: false, 
            hiddenForSender: false,
            duration: args.duration,
         });
        
        const newSecret = await ctx.db.get(secretId);
        return newSecret?.publicId;
    },
});

export const getMySecrets = query({
  args: { paginationOpts: paginationOptsValidator },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return { page: [], isDone: true, continueCursor: "" };
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();

    if (!user) {
      return { page: [], isDone: true, continueCursor: "" };
    }

    const { page, isDone, continueCursor } = await ctx.db
      .query("secrets")
      .withIndex("by_author", (q) => q.eq("authorId", user._id))
      .order("desc")
      .paginate(args.paginationOpts);

    // Ensure `expired` is always present on the frontend
    return {
      page: page.map((secret) => ({
        ...secret,
        expired: secret.expired ?? false,
      })),
      isDone,
      continueCursor,
    };
  },
});

export const hideSecretForSender = mutation({
    args: { secretId: v.id("secrets") },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Unauthorized");
        
        const secret = await ctx.db.get(args.secretId);
        const user = await ctx.db.query("users").withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier)).unique();

        if (secret && user && secret.authorId === user._id) {
            await ctx.db.patch(args.secretId, { hiddenForSender: true });
        } else {
            throw new Error("You can only hide your own secrets.");
        }
    },
});

export const expireSecretNow = action({
    args: { secretId: v.id("secrets") },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Unauthorized");

        const secret = await ctx.runQuery(internal.secrets.getSecretForDeletion, { secretId: args.secretId });
        const user = await ctx.runQuery(internal.secrets.getUser, { tokenIdentifier: identity.tokenIdentifier });

        if (secret && user && secret.authorId === user._id) {
            if (secret.fileUrl) {
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
            await ctx.runMutation(internal.secrets.clearSecretContent, { secretId: args.secretId });
        } else {
            throw new Error("You can only expire your own secrets.");
        }
    },
});

export const deleteAllMySecrets = mutation({
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Unauthorized");
        
        const user = await ctx.db.query("users").withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier)).unique();
        if (!user) return;

        const secrets = await ctx.db.query("secrets").withIndex("by_author", (q) => q.eq("authorId", user._id)).collect();
        
        for (const secret of secrets) {
            await ctx.db.delete(secret._id);
        }
    },
});

export const getSecretIdFromPublicId = query({ 
    args: { publicId: v.string() }, 
    handler: async (ctx, args) => { 
        const secret = await ctx.db.query("secrets").withIndex("by_publicId", (q) => q.eq("publicId", args.publicId)).unique(); 
        return secret?._id; 
    }, 
});

export const readAndReveal = mutation({ 
    args: { 
        secretId: v.id("secrets"),
        // REMOVED: viewerUserAgent parameter - no device tracking
    }, 
    handler: async (ctx, args) => { 
        const secret = await ctx.db.get(args.secretId); 
        if (!secret) return null;
        
        // If the secret is already read and has no content (expired), return it
        // so the frontend can show it as expired
        if (secret.isRead && !secret.message && !secret.fileUrl) {
            return secret;
        }
        
        // If the secret is already read but still has content, return null
        // (this shouldn't happen in normal flow)
        if (secret.isRead) return null;
        
        // Mark as read and store only timestamp
        await ctx.db.patch(secret._id, { 
            isRead: true,
            viewedAt: Date.now(),
            // REMOVED: viewerUserAgent storage
        }); 
        
        // Use the stored duration for images/text, or a longer default for videos
        const deletionDelay = secret.duration ? secret.duration * 1000 : 300000; // Default to 5 minutes for videos
        
        ctx.scheduler.runAfter(deletionDelay, internal.secrets.destroy, { secretId: secret._id }); 
        
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
        await ctx.runMutation(internal.secrets.clearSecretContent, { secretId: args.secretId }); 
    }, 
});

export const getSecretForDeletion = internalQuery({ 
    args: { secretId: v.id("secrets") }, 
    handler: async (ctx, args) => { 
        return await ctx.db.get(args.secretId); 
    }, 
});

export const clearSecretContent = internalMutation({ 
    args: { secretId: v.id("secrets") }, 
    handler: async (ctx, args) => { 
        await ctx.db.patch(args.secretId, { 
            message: undefined, 
            fileUrl: undefined, 
            fileType: undefined,
            isRead: true,
            expired: true,
        }); 
    }, 
});

export const expireSecret = mutation({
  args: { secretId: v.id("secrets") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.secretId, {
      expired: true,
    });
  },
});

export const getUser = internalQuery({ 
    args: { tokenIdentifier: v.string() }, 
    handler: async (ctx, args) => { 
        return await ctx.db.query("users").withIndex("by_token", (q) => q.eq("tokenIdentifier", args.tokenIdentifier)).unique(); 
    }, 
});

export const deleteSecretRecord = internalMutation({ 
    args: { secretId: v.id("secrets") }, 
    handler: async (ctx, args) => { 
        await ctx.db.delete(args.secretId); 
    }, 
});
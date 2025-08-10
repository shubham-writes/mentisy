// convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users: defineTable({
        tokenIdentifier: v.string(), 
        clerkUserId: v.string(), 
        imageUrl: v.string(),
        email: v.string(), 
        username: v.string(), 
        wallet: v.optional(v.string()),
    }).index("by_token", ["tokenIdentifier"]).index("username", ["username"]),

    secrets: defineTable({
        authorId: v.id("users"),
        publicId: v.string(),
        message: v.optional(v.string()),
        recipientName: v.optional(v.string()),
        publicNote: v.optional(v.string()),
        isRead: v.optional(v.boolean()),
        fileUrl: v.optional(v.string()),
        fileType: v.optional(v.union(v.literal("image"), v.literal("video"))),
        withWatermark: v.optional(v.boolean()),
        hiddenForSender: v.optional(v.boolean()), 
        duration: v.optional(v.number()),
        expired: v.optional(v.boolean()),
        // New analytics fields
        viewedAt: v.optional(v.number()),
        
        // --- NEW FIELD FOR MICRO-GAMES ---
        gameMode: v.optional(v.union(
            v.literal("none"),
            v.literal("scratch_and_see"),
            v.literal("mystery_reveal"),
            v.literal("emoji_curtain")
        )),
        
    })
        .index("by_author", ["authorId"])
        .index("by_publicId", ["publicId"]),

    test_table: defineTable({
        message: v.string(),
        timestamp: v.number(),
        createdAt: v.number(),
    }),
});
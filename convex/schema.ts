// convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users: defineTable({
        tokenIdentifier: v.string(), clerkUserId: v.string(), imageUrl: v.string(),
        email: v.string(), username: v.string(), wallet: v.optional(v.string()),
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
        withWatermark: v.optional(v.boolean()), // <-- Add this line
    })
        .index("by_author", ["authorId"])
        .index("by_publicId", ["publicId"]),

    test_table: defineTable({
        message: v.string(),
        timestamp: v.number(),
        createdAt: v.number(),
    }),
});
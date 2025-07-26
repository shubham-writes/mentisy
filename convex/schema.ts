// convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    // ... users and test_table definitions
    users: defineTable({
        tokenIdentifier: v.string(),
        clerkUserId: v.string(),
        imageUrl: v.string(),
        email: v.string(),
        username: v.string(),
        wallet: v.optional(v.string()),
    })
        .index("by_token", ["tokenIdentifier"])
        .index("username", ["username"]),

    secrets: defineTable({
        authorId: v.id("users"),
        message: v.string(),
        isRead: v.optional(v.boolean()), // <-- Add this line
    }).index("by_author", ["authorId"]),

    test_table: defineTable({
        message: v.string(),
        timestamp: v.number(),
        createdAt: v.number(),
    }),
});
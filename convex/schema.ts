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
    })
        .index("by_token", ["tokenIdentifier"])
        .index("username", ["username"]),

    // This test table is for database testing
    test_table: defineTable({
        message: v.string(),
        timestamp: v.number(),
        createdAt: v.number(),
    }),
    
// This secrets table is for storing user massages
    secrets: defineTable({
        authorId: v.id("users"),
        message: v.string(),
    }).index("by_author", ["authorId"]),
});
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
        viewedAt: v.optional(v.number()),

        // --- CHANGE 1: ADD "reveal_rush" TO THE GAMEMODE UNION ---
        gameMode: v.optional(v.union(
            v.literal("none"),
            v.literal("scratch_and_see"),
            v.literal("qa_challenge"),
            v.literal("mystery_reveal"),
            v.literal("emoji_curtain"),
            v.literal("reveal_rush") // New game mode
        )),

        // Q&A Game specific fields (existing)
        qaQuestion: v.optional(v.string()),
        qaAnswer: v.optional(v.string()),
        qaMaxAttempts: v.optional(v.number()),
        qaCaseSensitive: v.optional(v.boolean()),
        qaShowHints: v.optional(v.boolean()),
        gameStats: v.optional(v.object({ /* ... */ })),

        // --- CHANGE 2: ADD ALL NEW reveal-rush FIELDS ---

        // Defines which reveal-rush is being played
        microQuestType: v.optional(v.union(
            v.literal("group_qa"),
            v.literal("rate_my"),
            v.literal("game_suggestion")
        )),

        // Fields for the "Group Q&A" sub-game
        mqGroupQuestion: v.optional(v.string()),
        mqGroupAnswer: v.optional(v.string()),

        // Fields for the "Rate My..." sub-game
        mqRateCategory: v.optional(v.string()),
        mqExpectedRating: v.optional(v.number()),

        // Field for the "Game Suggestion" sub-game
        mqSuggestionPrompt: v.optional(v.string()),
        
        // --- CHANGE 3: ADD FIELDS TO TRACK QUEST STATE ---

        // Stores an array of participants who have tried the quest
        mqParticipants: v.optional(v.array(v.object({
            userId: v.id("users"),
            attempt: v.union(v.string(), v.number()),
            isCorrect: v.boolean(),
            timestamp: v.number()
        }))),

        // Stores the ID of the winning user
        mqWinnerId: v.optional(v.id("users")),
        mqWinnerName: v.optional(v.string()),   // ✅ New
    mqWinnerAt: v.optional(v.number()),  

        // A flag to lock the quest once someone has won
        mqIsCompleted: v.optional(v.boolean()),

    })
        .index("by_author", ["authorId"])
        .index("by_publicId", ["publicId"]),

    test_table: defineTable({
        message: v.string(),
        timestamp: v.number(),
        createdAt: v.number(),
    }),
});
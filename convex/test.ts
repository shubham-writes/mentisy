// Create this file: convex/test.ts
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Query to get test data from database
export const getTestData = query({
  args: {},
  handler: async (ctx) => {
    try {
      const testData = await ctx.db
        .query("test_table")
        .order("desc")
        .collect();
      return testData;
    } catch (error) {
      // If table doesn't exist, return empty array
      return [];
    }
  },
});

// Mutation to add test data to database
export const addTestData = mutation({
  args: {
    message: v.string(),
    timestamp: v.number(),
  },
  handler: async (ctx, args) => {
    const testId = await ctx.db.insert("test_table", {
      message: args.message,
      timestamp: args.timestamp,
      createdAt: Date.now(),
    });
    return testId;
  },
});
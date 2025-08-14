// convex/feedback.ts
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { paginationOptsValidator } from "convex/server";

// Submit new feedback
export const submitFeedback = mutation({
  args: {
    type: v.union(
      v.literal("game_suggestion"), 
      v.literal("bug_report"), 
      v.literal("general_feedback"),
      v.literal("feature_request")
    ),
    title: v.string(),
    description: v.string(),
    rating: v.optional(v.number()),
    gameIdea: v.optional(v.string()),
    userEmail: v.optional(v.string()), // For anonymous users
  },
  handler: async (ctx, args) => {
    // Get user if authenticated
    const identity = await ctx.auth.getUserIdentity();
    let user = null;
    
    if (identity) {
      user = await ctx.db.query("users")
        .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
        .unique();
    }

    // Validate required fields based on type
    if (args.type === "game_suggestion" && !args.gameIdea) {
      throw new Error("Game idea is required for game suggestions");
    }

    if (args.title.trim().length < 3) {
      throw new Error("Title must be at least 3 characters long");
    }

    if (args.description.trim().length < 10) {
      throw new Error("Description must be at least 10 characters long");
    }

    if (args.rating && (args.rating < 1 || args.rating > 5)) {
      throw new Error("Rating must be between 1 and 5");
    }

    // Create feedback entry
    const feedbackId = await ctx.db.insert("feedback", {
      userId: user?._id,
      userEmail: args.userEmail,
      type: args.type,
      title: args.title.trim(),
      description: args.description.trim(),
      rating: args.rating,
      gameIdea: args.gameIdea?.trim(),
      status: "pending",
      createdAt: Date.now(),
    });

    return feedbackId;
  },
});

// Get all feedback (admin use)
export const getAllFeedback = query({
  args: { 
    paginationOpts: paginationOptsValidator,
    type: v.optional(v.union(
      v.literal("game_suggestion"), 
      v.literal("bug_report"), 
      v.literal("general_feedback"),
      v.literal("feature_request")
    )),
    status: v.optional(v.union(
      v.literal("pending"), 
      v.literal("reviewing"), 
      v.literal("in_progress"),
      v.literal("completed"),
      v.literal("rejected")
    )),
  },
  handler: async (ctx, args) => {
    // Start with base query
    let query = ctx.db.query("feedback");

    // Filter by type if specified - FIXED: Handle optional properly
    if (args.type) {
      query = query.filter((q) => q.eq(q.field("type"), args.type));
    }
    
    // Filter by status if specified - FIXED: Handle optional properly
    if (args.status) {
      query = query.filter((q) => q.eq(q.field("status"), args.status));
    }

    const result = await query.order("desc").paginate(args.paginationOpts);
    
    return result;
  },
});

// Get user's own feedback
export const getMyFeedback = query({
  args: { paginationOpts: paginationOptsValidator },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return { page: [], isDone: true, continueCursor: "" };
    }

    const user = await ctx.db.query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .unique();

    if (!user) {
      return { page: [], isDone: true, continueCursor: "" };
    }

    const result = await ctx.db.query("feedback")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .order("desc")
      .paginate(args.paginationOpts);

    return result;
  },
});

// Update feedback status (admin use)
export const updateFeedbackStatus = mutation({
  args: {
    feedbackId: v.id("feedback"),
    status: v.union(
      v.literal("pending"), 
      v.literal("reviewing"), 
      v.literal("in_progress"),
      v.literal("completed"),
      v.literal("rejected")
    ),
    adminNotes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // TODO: Add admin authentication check here
    // For now, anyone can update (you might want to add admin role checking)
    
    await ctx.db.patch(args.feedbackId, {
      status: args.status,
      adminNotes: args.adminNotes,
      updatedAt: Date.now(),
    });

    return { success: true };
  },
});

// Get feedback statistics
export const getFeedbackStats = query({
  handler: async (ctx) => {
    const all = await ctx.db.query("feedback").collect();
    
    const stats = {
      total: all.length,
      byType: {
        game_suggestion: all.filter(f => f.type === "game_suggestion").length,
        bug_report: all.filter(f => f.type === "bug_report").length,
        general_feedback: all.filter(f => f.type === "general_feedback").length,
        feature_request: all.filter(f => f.type === "feature_request").length,
      },
      byStatus: {
        pending: all.filter(f => f.status === "pending").length,
        reviewing: all.filter(f => f.status === "reviewing").length,
        in_progress: all.filter(f => f.status === "in_progress").length,
        completed: all.filter(f => f.status === "completed").length,
        rejected: all.filter(f => f.status === "rejected").length,
      },
      averageRating: all.filter(f => f.rating).length > 0 
        ? all.filter(f => f.rating).reduce((sum, f) => sum + (f.rating || 0), 0) / all.filter(f => f.rating).length
        : 0,
      recentCount: all.filter(f => Date.now() - f.createdAt < 7 * 24 * 60 * 60 * 1000).length, // Last 7 days
    };

    return stats;
  },
});

// Delete feedback (user can delete their own)
export const deleteFeedback = mutation({
  args: { feedbackId: v.id("feedback") },
  handler: async (ctx, args) => {
    const feedback = await ctx.db.get(args.feedbackId);
    if (!feedback) throw new Error("Feedback not found");

    const identity = await ctx.auth.getUserIdentity();
    if (identity) {
      const user = await ctx.db.query("users")
        .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
        .unique();

      // Only allow users to delete their own feedback
      if (feedback.userId === user?._id) {
        await ctx.db.delete(args.feedbackId);
        return { success: true };
      }
    }

    throw new Error("You can only delete your own feedback");
  },
});
// convex/secrets.ts
import { v } from "convex/values";
import { mutation, internalMutation, internalAction, query, internalQuery, action } from "./_generated/server";
import { api, internal } from "./_generated/api";
import { paginationOptsValidator } from "convex/server";
import { Id } from "./_generated/dataModel";

function generatePublicId(length = 8) {
  return Math.random().toString(36).substring(2, 2 + length);
}

export const create = mutation({
  args: {
    // ... (args are unchanged)
    message: v.optional(v.string()),
    recipientName: v.optional(v.string()),
    publicNote: v.optional(v.string()),
    fileUrl: v.optional(v.string()),
    fileType: v.optional(v.union(v.literal("image"), v.literal("video"))),
    withWatermark: v.optional(v.boolean()),
    duration: v.optional(v.number()),
    gameMode: v.optional(v.union(
      v.literal("none"), v.literal("scratch_and_see"), v.literal("qa_challenge"),
      v.literal("mystery_reveal"), v.literal("emoji_curtain"), v.literal("reveal_rush"),
      v.literal("yes_or_no")
    )),
    qaQuestion: v.optional(v.string()),
    qaAnswer: v.optional(v.string()),
    qaMaxAttempts: v.optional(v.number()),
    qaCaseSensitive: v.optional(v.boolean()),
    qaShowHints: v.optional(v.boolean()),
    microQuestType: v.optional(v.union(
      v.literal("group_qa"), v.literal("rate_my"), v.literal("game_suggestion")
    )),
    mqGroupQuestion: v.optional(v.string()),
    mqGroupAnswer: v.optional(v.string()),
    mqRateCategory: v.optional(v.string()),
    mqExpectedRating: v.optional(v.number()),
    mqSuggestionPrompt: v.optional(v.string()),
    yesNoQuestion: v.optional(v.string()),
    yesImageUrl: v.optional(v.string()),
    noImageUrl: v.optional(v.string()),
    yesCaption: v.optional(v.string()),
    noCaption: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    let authorId: Id<"users"> | undefined = undefined;

    // If an identity exists, find the corresponding user in our database
    if (identity) {
      const user = await ctx.db.query("users")
        .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
        .unique();

      if (user) {
        authorId = user._id;
      }
    }

    // Now, insert the secret. `authorId` will be the user's ID or undefined for guests.
    const secretId = await ctx.db.insert("secrets", {
      authorId: authorId, // <-- This is the key change
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
      gameMode: args.gameMode,
      qaQuestion: args.qaQuestion,
      qaAnswer: args.qaAnswer,
      qaMaxAttempts: args.qaMaxAttempts,
      qaCaseSensitive: args.qaCaseSensitive,
      qaShowHints: args.qaShowHints,
      microQuestType: args.microQuestType,
      mqGroupQuestion: args.mqGroupQuestion,
      mqGroupAnswer: args.mqGroupAnswer,
      mqRateCategory: args.mqRateCategory,
      mqExpectedRating: args.mqExpectedRating,
      mqSuggestionPrompt: args.mqSuggestionPrompt,
      yesNoQuestion: args.yesNoQuestion,
      yesImageUrl: args.yesImageUrl,
      noImageUrl: args.noImageUrl,
      yesCaption: args.yesCaption,
      noCaption: args.noCaption,
      mqIsCompleted: false,
      mqParticipants: [],
      mqWinnerId: undefined,
      mqWinnerName: undefined,
      mqWinnerAt: undefined,
    });

    const newSecret = await ctx.db.get(secretId);
    return newSecret?.publicId;
  },
});

// Handle reveal-rush attempts
// convex/secrets.ts

// ... (previous code is unchanged)

// Handle reveal-rush attempts
export const submitMicroQuestAttempt = mutation({
  args: {
    secretId: v.id("secrets"),
    attempt: v.union(v.string(), v.number()),
  },
  handler: async (ctx, args) => {
    const secret = await ctx.db.get(args.secretId);
    if (!secret) throw new Error("Secret not found.");

    if (secret.mqIsCompleted) {
      return { success: false, isWinner: false, reason: `Game Over — Someone has already won!` };
    }

    const identity = await ctx.auth.getUserIdentity();
    const user = identity
      ? await ctx.db.query("users")
        .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
        .unique()
      : null;

    // Only check for previous attempts if the user is logged in
    if (user) {
      const alreadyTried = secret.mqParticipants?.find(p => p.userId === user._id);
      if (alreadyTried) {
        return { success: false, isWinner: false, reason: "You have already participated." };
      }
    }

    let isCorrect = false;
    let feedback = "";

    switch (secret.microQuestType) {
      case 'group_qa':
        if (typeof args.attempt === 'string' && secret.mqGroupAnswer) {
          isCorrect = args.attempt.trim().toLowerCase() === secret.mqGroupAnswer.trim().toLowerCase();
          feedback = isCorrect ? "Correct answer!" : "Incorrect answer.";
        }
        break;

      case 'rate_my':
        if (typeof args.attempt === 'number' && secret.mqExpectedRating !== undefined) {
          isCorrect = args.attempt === secret.mqExpectedRating;
          feedback = isCorrect ? "Perfect guess!" : `The answer was ${secret.mqExpectedRating}`;
        }
        break;

      case 'game_suggestion':
        if (typeof args.attempt === 'string' && args.attempt.length >= 3) {
          isCorrect = true; // For suggestions, any valid input is "correct"
          feedback = "Nice idea!";
        }
        break;
    }

    // Only add participant to the list if they are logged in
    const updatedParticipants = user ? [...(secret.mqParticipants || []), {
      userId: user._id,
      attempt: args.attempt,
      isCorrect,
      timestamp: Date.now(),
    }] : secret.mqParticipants; // Keep participants the same if user is anonymous

    if (isCorrect) {
      await ctx.db.patch(secret._id, {
        mqIsCompleted: true,
        mqWinnerId: user?._id, // Store ID only if user is logged in
        mqWinnerName: "Someone", // Generic winner name
        mqWinnerAt: Date.now(),
        mqParticipants: updatedParticipants,
        expired: true,
      });

      const delay = (secret.duration || 10) * 1000 + 60000;
      ctx.scheduler.runAfter(delay, internal.secrets.destroy, { secretId: secret._id });

      return { success: true, isWinner: true, message: `🎉 You won! ${feedback}` };
    } else {
      // Only update participants if a logged-in user made an incorrect attempt
      if (user) {
        await ctx.db.patch(secret._id, { mqParticipants: updatedParticipants });
      }
      return { success: true, isWinner: false, message: feedback };
    }
  },
});

// Read & Reveal
export const readAndReveal = mutation({
  args: { secretId: v.id("secrets") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    const secret = await ctx.db.get(args.secretId);
    if (!secret) return null;

    if (secret.gameMode === "reveal_rush") {
      const user = identity
        ? await ctx.db.query("users").withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier)).unique()
        : null;

      if (secret.mqIsCompleted) {
        // Allow the winner to view, even if anonymous
        if (user && user._id === secret.mqWinnerId) {
          const elapsed = Date.now() - (secret.mqWinnerAt || 0);
          const allowedDuration = (secret.duration || 10) * 1000;

          if (elapsed > allowedDuration) {
            return { ...secret, expired: true, message: "Your viewing time has expired." };
          }
          return secret;
        } else {
          // Generic message for everyone else
          return { ...secret, expired: true, message: "Game Over — Someone has won!" };
        }
      }
      return secret;
    }

    // --- Original Logic for other game modes ---
    if (secret.isRead) {
      return null;
    }

    await ctx.db.patch(secret._id, { isRead: true, viewedAt: Date.now() });
    const delay = secret.duration ? secret.duration * 1000 : 300000;
    ctx.scheduler.runAfter(delay, internal.secrets.destroy, { secretId: secret._id });

    return secret;
  },
});

// ... (the rest of the file remains the same)

// Rest of your functions (unchanged) ...



// ... (the rest of the file remains the same)

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

export const getLiveSecret = query({
  args: { id: v.id("secrets") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});
export const useCaseTemplates = {
  "student-sharing": {
    recipientName: "Study group",
    publicNote: "📚 Study materials inside - exam prep content!",
    message: "Here are the study notes we discussed. Good luck with your exam! 📖",
    duration: "10",
    addWatermark: true,
    tips: [
      "Perfect for sharing study materials safely",
      "Watermark prevents unauthorized sharing",
      "Use longer timers for study content"
    ],
    placeholder: {
      recipient: "Your study buddy, class group, etc.",
      publicNote: "'Study notes for tomorrow's exam' or similar",
      message: "Any additional context about the study materials..."
    }
  },
  "personal-moments": {
    recipientName: "",
    publicNote: "💕 Something special just for you...",
    message: "This moment is just between us. You mean everything to me ❤️",
    duration: "10",
    addWatermark: true,
    tips: [
      "Always use watermarks for intimate content",
      "Longer timers let them savor the moment",
      "Perfect for sharing personal photos/videos"
    ],
    placeholder: {
      recipient: "Their name, pet name, or 'my love'",
      publicNote: "'Something beautiful for you' or similar sweet message",
      message: "Your heartfelt message to accompany the moment..."
    }
  },
  "fitness-progress": {
    recipientName: "Workout buddy",
    publicNote: "💪 Check out this transformation!",
    message: "The grind is paying off! What do you think of the progress? 🔥",
    duration: "10",
    addWatermark: false,
    tips: [
      "10 second timer perfect for progress photos",
      "Share with gym buddies or accountability partners",
      "Watermark optional for fitness content"
    ],
    placeholder: {
      recipient: "Gym buddy, trainer, or accountability partner",
      publicNote: "'Progress update!' or motivational message",
      message: "Share your fitness journey thoughts..."
    }
  },
  "funny-moments": {
    recipientName: "The crew",
    publicNote: "😂 You're not ready for this...",
    message: "I'm still laughing about this! Had to share it with you 🤣",
    duration: "5",
    addWatermark: false,
    tips: [
      "Shorter timers work great for funny content",
      "Perfect for those 'you had to be there' moments",
      "Keep it light and fun"
    ],
    placeholder: {
      recipient: "Friend group name or 'my bestie'",
      publicNote: "'This is hilarious' or funny teaser",
      message: "Context about why this is so funny..."
    }
  },
  "professional-use": {
    recipientName: "Client",
    publicNote: "📋 Professional content - confidential material inside",
    message: "Please review this confidential material. Let me know your thoughts.",
    duration: "10",
    addWatermark: true,
    tips: [
      "Always watermark professional content",
      "Longer timers allow proper review",
      "Perfect for client presentations"
    ],
    placeholder: {
      recipient: "Client name, team, or department",
      publicNote: "'Confidential presentation' or professional teaser",
      message: "Professional context or instructions..."
    }
  },
  "confessions": {
    recipientName: "",
    publicNote: "🤐 I need to tell you something...",
    message: "This has been on my mind and I trust you with this truth.",
    duration: "5",
    addWatermark: true,
    tips: [
      "Shorter timers feel more intimate",
      "Watermarks add security for vulnerable content",
      "Perfect for sharing personal truths"
    ],
    placeholder: {
      recipient: "The person you trust with this",
      publicNote: "'Something I need to share' or similar",
      message: "Your honest thoughts or confession..."
    }
  }
};

export const useCaseLabels = {
  "student-sharing": "Student Sharing",
  "personal-moments": "Personal Moments", 
  "fitness-progress": "Fitness Progress",
  "funny-moments": "Funny Moments",
  "professional-use": "Professional Use",
  "confessions": "Confessions",
};

export const useCaseEmojis = {
  "student-sharing": "📚",
  "personal-moments": "💕",
  "fitness-progress": "💪",
  "funny-moments": "😂", 
  "professional-use": "📋",
  "confessions": "🤐",
};
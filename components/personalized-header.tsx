import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useCaseLabels, useCaseEmojis } from './use-case-templates';

interface PersonalizedHeaderProps {
    useCase?: string;
    isLandingPage: boolean;
}

export function PersonalizedHeader({ useCase, isLandingPage }: PersonalizedHeaderProps) {
    const { user } = useUser();
    const [isNewUser, setIsNewUser] = useState(false);
    console.log("PersonalizedHeader rendered with:", { useCase, isLandingPage });

    useEffect(() => {
        if (!user) return;

        const userId = user.id;
        const userCreatedAt = new Date(user.createdAt!).getTime();
        const now = Date.now();
        const accountAge = now - userCreatedAt;
        
        // Consider user as new if:
        // 1. Account created within last 30 minutes, OR
        // 2. This is their first time visiting the hello page (no localStorage entry)
        const isRecentAccount = accountAge < 30 * 60 * 1000; // 30 minutes
        const hasVisitedBefore = localStorage.getItem(`user_visited_${userId}`);
        
        const shouldShowWelcome = isRecentAccount || !hasVisitedBefore;
        setIsNewUser(shouldShowWelcome);
        
        // Mark that user has visited
        if (!hasVisitedBefore) {
            localStorage.setItem(`user_visited_${userId}`, 'true');
        }
    }, [user]);
    
    if (isLandingPage) {
        return (
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
                    Make Your First Fun Link
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                    Share it once — let your friends scratch, guess, or race to unlock.
                </p>
            </div>
        );
    }

    if (useCase && useCaseLabels[useCase as keyof typeof useCaseLabels]) {
        const label = useCaseLabels[useCase as keyof typeof useCaseLabels];
        const emoji = useCaseEmojis[useCase as keyof typeof useCaseEmojis];

        const personalizedContent = {
    "before-&-after-reveals": {
        title: "Create Your Transformation Game",
        subtitle: "Let friends guess your rating or scratch to reveal your glow-up moment",
        bgClass: "from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20",
        textClass: "text-green-700 dark:text-green-300"
    },
    "achievement-celebrations": {
        title: "Make Your Achievement Interactive",
        subtitle: "Turn your big moment into an exciting scratch reveal or guessing game",
        bgClass: "from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20",
        textClass: "text-yellow-700 dark:text-yellow-300"
    },
    "creative-projects": {
        title: "Gamify Your Creative Reveal",
        subtitle: "Challenge friends to rate your art or guess your project satisfaction",
        bgClass: "from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20",
        textClass: "text-purple-700 dark:text-purple-300"
    },
    "travel-adventures": {
        title: "Create Your Travel Challenge",
        subtitle: "Let friends race to guess your location or rate your adventure",
        bgClass: "from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20",
        textClass: "text-blue-700 dark:text-blue-300"
    },
    "daily-life-highlights": {
        title: "Turn Daily Moments Into Games",
        subtitle: "Challenge friends to match your ratings for coffee, outfits, or experiences",
        bgClass: "from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20",
        textClass: "text-pink-700 dark:text-pink-300"
    },
    "special-announcements": {
        title: "Make Your Big News Interactive",
        subtitle: "Create suspense with Q&A games or scratch reveals for life updates",
        bgClass: "from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20",
        textClass: "text-red-700 dark:text-red-300"
    }
};

        const content = personalizedContent[useCase as keyof typeof personalizedContent];

        if (content) {
            return (
                <div className={`text-center mt-16 mb-8 p-6 rounded-2xl bg-gradient-to-r ${content.bgClass} border border-opacity-20`}>
                    <div className="flex items-center justify-center gap-3 mb-3">
                        <span className="text-3xl">{emoji}</span>
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                            {content.title}
                        </h2>
                    </div>
                    <p className={`text-lg ${content.textClass}`}>
                        {content.subtitle}
                    </p>
                    <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                        Personalized for {label} • Form pre-filled with smart defaults
                    </div>
                </div>
            );
        }
    }

    // Default header for authenticated users without specific use case
    return (
        <div className="text-center mt-16 mb-8">
            <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
                {isNewUser ? "Welcome! 👋" : "Welcome Back! 👋"}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
                {isNewUser 
                    ? "Let's create your first secret link"
                    : "Create a new fun link or check out your previous ones below"
                }
            </p>
            {isNewUser && user && (Date.now() - new Date(user.createdAt!).getTime()) < 30 * 60 * 1000 && (
                <div className="mt-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <p className="text-sm text-green-700 dark:text-green-300">
                        🎉 Account created successfully! Your secret links will be completely private and secure.
                    </p>
                </div>
            )}
        </div>
    );
}
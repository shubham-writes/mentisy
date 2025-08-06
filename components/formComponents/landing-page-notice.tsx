export function LandingPageNotice() {
    return (
        <div className="mb-8 p-6 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800 rounded-xl">
            <div className="flex items-start space-x-4">
                <span className="text-2xl">🔒</span>
                <div>
                    <p className="font-semibold text-amber-800 dark:text-amber-200 mb-2">
                        Preview Mode Active
                    </p>
                    <p className="text-sm text-amber-700 dark:text-amber-300 leading-relaxed">
                        You&apos;re just testing the waters right now. Create an account to actually send your secrets into the void.
                    </p>
                </div>
            </div>
        </div>
    );
}
import { useCaseTemplates, useCaseLabels, useCaseEmojis } from './use-case-templates';

interface UseCaseTipsProps {
    useCase?: string;
    isVisible: boolean;
    onClose: () => void;
}

export function UseCaseTips({ useCase, isVisible, onClose }: UseCaseTipsProps) {
    if (!useCase || !isVisible) return null;

    const template = useCaseTemplates[useCase as keyof typeof useCaseTemplates];
    const label = useCaseLabels[useCase as keyof typeof useCaseLabels];
    const emoji = useCaseEmojis[useCase as keyof typeof useCaseEmojis];

    if (!template) return null;

    return (
        <div className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 animate-in slide-in-from-top duration-300">
            <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                    <span className="text-2xl">{emoji}</span>
                    <div>
                        <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                            Tips for {label}
                        </h4>
                        <ul className="space-y-2">
                            {template.tips.map((tip, index) => (
                                <li key={index} className="text-sm text-blue-700 dark:text-blue-300 flex items-start space-x-2">
                                    <span className="text-blue-500 mt-1">•</span>
                                    <span>{tip}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 transition-colors"
                >
                    ✕
                </button>
            </div>
        </div>
    );
}
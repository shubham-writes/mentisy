import { Button } from "@/components/ui/button";
import { useCaseTemplates, useCaseLabels, useCaseEmojis } from './use-case-templates';

interface TemplateSuggestionProps {
    useCase?: string;
    onApplyTemplate: (template: any) => void;
    hasContent: boolean;
}

export function TemplateSuggestion({ useCase, onApplyTemplate, hasContent }: TemplateSuggestionProps) {
    if (!useCase || !hasContent) return null;

    const template = useCaseTemplates[useCase as keyof typeof useCaseTemplates];
    const label = useCaseLabels[useCase as keyof typeof useCaseLabels];
    const emoji = useCaseEmojis[useCase as keyof typeof useCaseEmojis];

    if (!template) return null;

    return (
        <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800 rounded-xl">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <span className="text-xl">{emoji}</span>
                    <div>
                        <p className="font-semibold text-purple-800 dark:text-purple-200 text-sm">
                            Make it interactive!
                        </p>
                        <p className="text-xs text-purple-700 dark:text-purple-300">
                            Use our {label} template to create engaging games
                        </p>
                    </div>
                </div>
                <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onApplyTemplate(template)}
                    className="border-purple-300 text-purple-700 hover:bg-purple-100 dark:border-purple-600 dark:text-purple-300 dark:hover:bg-purple-900/30 text-xs"
                >
                    Use Template
                </Button>
            </div>
        </div>
    );
}
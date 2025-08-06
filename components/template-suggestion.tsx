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
        <div className="mb-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800 rounded-xl">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <span className="text-xl">{emoji}</span>
                    <div>
                        <p className="font-semibold text-amber-800 dark:text-amber-200 text-sm">
                            Want a head start?
                        </p>
                        <p className="text-xs text-amber-700 dark:text-amber-300">
                            Use our {label} template to get started quickly
                        </p>
                    </div>
                </div>
                <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onApplyTemplate(template)}
                    className="border-amber-300 text-amber-700 hover:bg-amber-100 dark:border-amber-600 dark:text-amber-300 dark:hover:bg-amber-900/30 text-xs"
                >
                    Apply Template
                </Button>
            </div>
        </div>
    );
}
// components/formComponents/yes-no-settings.tsx
"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface YesNoSettingsProps {
  question: string;
  onQuestionChange: (value: string) => void;
  // Removed: watermarkSettingsComponent: ReactNode;
}

export function YesNoSettings({
  question,
  onQuestionChange,
  // Removed: watermarkSettingsComponent,
}: YesNoSettingsProps) {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 rounded-lg border border-teal-200/50 dark:border-teal-700/50">
          <span className="text-lg">⚙️</span>
          <div>
            <h4 className="font-semibold text-teal-800 dark:text-teal-200 text-sm">Yes or No Settings</h4>
            <p className="text-xs text-teal-600 dark:text-teal-300">Configure your question.</p>
          </div>
        </div>

        {/* Question Input */}
        <div>
          <Label htmlFor="yes-no-question" className="text-sm font-medium mb-2 block text-gray-800 dark:text-gray-200">
            The Question <span className="text-red-500">*</span>
          </Label>
          <Input
            id="yes-no-question"
            placeholder="e.g., Should I get a haircut?"
            value={question}
            onChange={(e) => onQuestionChange(e.target.value)}
            className="h-11 text-sm rounded-lg"
          />
        </div>

        {/* Removed: {watermarkSettingsComponent} */}
      </div>
    </div>
  );
}
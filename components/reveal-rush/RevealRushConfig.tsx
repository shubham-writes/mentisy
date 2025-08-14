import { useState } from 'react';
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Lock } from "lucide-react";
import { FeedbackModal } from '@/components/feedback/FeedbackModal';

type MicroQuestType = "group_qa" | "rate_my";

interface RevealRushConfigProps {
  selectedType: MicroQuestType;
  onTypeChange: (type: MicroQuestType) => void;
  groupQuestion: string;
  onGroupQuestionChange: (value: string) => void;
  rateCategory: string;
  onRateCategoryChange: (value: string) => void;
}

const microQuestOptions = [
  { id: "group_qa", icon: "🤔", title: "Group Q&A", description: "First correct answer wins" },
  { id: "rate_my", icon: "⭐", title: "Rate My...", description: "Closest rating wins" }
] as const;

export function RevealRushConfig({
  selectedType,
  onTypeChange,
  groupQuestion,
  onGroupQuestionChange,
  rateCategory,
  onRateCategoryChange
}: RevealRushConfigProps) {
  const [showFeedback, setShowFeedback] = useState(false);

  return (
    <>
      <div className="space-y-6">
        <div>
          <Label className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-4 block">
            Choose Challenge Type
          </Label>

          <RadioGroup
            value={selectedType}
            onValueChange={(value) => onTypeChange(value as MicroQuestType)}
            className="grid grid-cols-1 sm:grid-cols-3 gap-3"
          >
            {microQuestOptions.map(option => (
              <div key={option.id} className="relative">
                <RadioGroupItem value={option.id} id={option.id} className="sr-only" />
                <Label
                  htmlFor={option.id}
                  className={`flex flex-col items-center justify-center p-4 border-2 rounded-xl transition-all min-h-[120px] cursor-pointer hover:scale-105 active:scale-95 ${
                    selectedType === option.id
                      ? 'border-orange-500 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 text-orange-600'
                      : 'border-gray-200 dark:border-gray-600 hover:border-orange-300'
                  }`}
                >
                  <span className="text-3xl mb-2">{option.icon}</span>
                  <span className="font-semibold text-sm text-center">{option.title}</span>
                  <span className="text-xs text-center mt-1 text-gray-500">
                    {option.description}
                  </span>
                </Label>
              </div>
            ))}

            {/* Locked placeholder */}
            <div
              className="flex flex-col items-center justify-center p-4 border-2 rounded-xl min-h-[120px] bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 hover:scale-105 active:scale-95 transition"
              onClick={() => setShowFeedback(true)}
            >
              <Lock className="w-6 h-6 mb-2" />
              <span className="font-semibold text-sm text-center">Locked</span>
              <span className="text-xs text-center mt-1">Click to give feedback</span>
            </div>
          </RadioGroup>
        </div>

        {/* Group Q&A setup */}
        {selectedType === "group_qa" && (
          <div className="space-y-4 p-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-200/50 dark:border-blue-700/50">
            <Label htmlFor="group-question" className="font-semibold">Your Question *</Label>
            <Input
              id="group-question"
              placeholder="e.g., What's the capital of Japan?"
              value={groupQuestion}
              onChange={(e) => onGroupQuestionChange(e.target.value)}
            />
          </div>
        )}

        {/* Rate My setup */}
        {selectedType === "rate_my" && (
          <div className="space-y-4 p-4 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl border border-yellow-200/50 dark:border-yellow-700/50">
            <Label htmlFor="rate-category" className="font-semibold">What should they rate? *</Label>
            <Input
              id="rate-category"
              placeholder="e.g., outfit, cooking..."
              value={rateCategory}
              onChange={(e) => onRateCategoryChange(e.target.value)}
            />
          </div>
        )}
      </div>

      <FeedbackModal
        isOpen={showFeedback}
        onClose={() => setShowFeedback(false)}
        defaultTab="game"
      />
    </>
  );
}

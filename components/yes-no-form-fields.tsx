// components/yes-no-form-fields.tsx
"use client";

import { ReactNode } from "react"; // ✅ Import ReactNode
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { UploadButton } from "@/components/uploadthing";
import { Image as ImageIcon } from "lucide-react";
import { FilePreview } from "./file-preview";

type ImageFile = {
  url: string;
  type: "image";
};

interface YesNoFormFieldsProps {
  question: string;
  onQuestionChange: (value: string) => void;
  yesFile: ImageFile | null;
  onYesImageUpload: (url: string) => void;
  noFile: ImageFile | null;
  onNoImageUpload: (url: string) => void;
  onYesImageRemove: () => void;
  onNoImageRemove: () => void;
  watermarkSettingsComponent: ReactNode; // ✅ Add prop to receive the component
  addWatermark: boolean;
}

export function YesNoFormFields({
  question,
  onQuestionChange,
  yesFile,
  onYesImageUpload,
  noFile,
  onNoImageUpload,
  onYesImageRemove,
  onNoImageRemove,
  watermarkSettingsComponent,
  addWatermark, 
}: YesNoFormFieldsProps) {
  return (
    <div className="space-y-4">
      {/* ... (Header and Question Input remain the same) ... */}
      <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 rounded-lg border border-teal-200/50 dark:border-teal-700/50">
        <span className="text-lg">👍👎</span>
        <div>
          <h4 className="font-semibold text-teal-800 dark:text-teal-200 text-sm">Yes or No Game</h4>
          <p className="text-xs text-teal-600 dark:text-teal-300">Let them choose their reveal.</p>
        </div>
      </div>
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

      <div className="space-y-6 pt-4">
        {/* YES Image Section */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-800 dark:text-gray-200">
            Yes Image <span className="text-red-500">*</span>
          </Label>
          {yesFile ? (
             <FilePreview file={yesFile} onRemove={onYesImageRemove} showWatermark={addWatermark} />
          ) : (
            <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                    if (res && res.length > 0) onYesImageUpload(res[0].url);
                }}
                onUploadError={(error: Error) => alert(`ERROR! ${error.message}`)}
                appearance={{ button: "w-full text-sm h-10", container: "w-full" }}
                content={{ button: <><ImageIcon className="w-4 h-4 mr-2" /> Upload Yes Image</> }}
            />
          )}
        </div>
        
        {/* NO Image Section */}
        <div className="space-y-2">
           <Label className="text-sm font-medium text-gray-800 dark:text-gray-200">
            No Image <span className="text-red-500">*</span>
          </Label>
          {noFile ? (
             <FilePreview file={noFile} onRemove={onNoImageRemove} showWatermark={addWatermark}/>
          ) : (
            <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                    if (res && res.length > 0) onNoImageUpload(res[0].url);
                }}
                onUploadError={(error: Error) => alert(`ERROR! ${error.message}`)}
                appearance={{ button: "w-full text-sm h-10", container: "w-full" }}
                content={{ button: <><ImageIcon className="w-4 h-4 mr-2" /> Upload No Image</> }}
            />
          )}
        </div>

        {/* ✅ Render the watermark settings component here */}
        {watermarkSettingsComponent}

      </div>
    </div>
  );
}
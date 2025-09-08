// components/formComponents/yes-no-image-uploaders.tsx
"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { UploadButton } from "@/components/uploadthing";
import { Image as ImageIcon, Upload, Sparkles, Loader2 } from "lucide-react";
import { FilePreview } from "../file-preview";

type ImageFile = {
  url: string;
  type: "image";
};

interface YesNoImageUploadersProps {
  yesFile: ImageFile | null;
  onYesImageUpload: (url: string) => void;
  noFile: ImageFile | null;
  onNoImageUpload: (url: string) => void;
  onYesImageRemove: () => void;
  onNoImageRemove: () => void;
  addWatermark: boolean;
}

export function YesNoImageUploaders({
  yesFile,
  onYesImageUpload,
  noFile,
  onNoImageUpload,
  onYesImageRemove,
  onNoImageRemove,
  addWatermark,
}: YesNoImageUploadersProps) {
  const [uploadState, setUploadState] = useState<{
    isUploading: 'yes' | 'no' | null;
    progress: number;
  }>({ isUploading: null, progress: 0 });

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg space-y-6">
      {/* YES Image Section */}
      <div className="space-y-3">
          <Label className="text-sm font-medium text-gray-800 dark:text-gray-200">
            Yes Image <span className="text-red-500">*</span>
          </Label>
          {yesFile ? (
            <FilePreview file={yesFile} onRemove={onYesImageRemove} showWatermark={addWatermark} />
          ) : (
            <div className="relative group">
              <div className="relative overflow-hidden rounded-2xl border-2 border-dashed border-emerald-200 dark:border-emerald-700/50 bg-gradient-to-br from-emerald-50/50 via-white to-teal-50/30 dark:from-emerald-900/20 dark:via-gray-950 dark:to-teal-900/20 hover:border-emerald-300 dark:hover:border-emerald-600 transition-all duration-300 min-h-[150px] flex items-center justify-center p-6 text-center">
                {uploadState.isUploading === 'yes' ? (
                  <div className="w-full max-w-xs">
                    <div className="flex items-center justify-between text-xs sm:text-sm text-emerald-800 dark:text-emerald-200 mb-2">
                        <span className="font-medium">
                            {uploadState.progress < 100 ? 'Uploading...' : 'Processing...'}
                        </span>
                        <span className="font-bold">{Math.round(uploadState.progress)}%</span>
                    </div>
                    <div className="w-full bg-emerald-200/50 dark:bg-emerald-900/50 rounded-full h-2 sm:h-2.5 overflow-hidden">
                        <div 
                            className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full transition-all duration-300 ease-out"
                            style={{ width: `${uploadState.progress}%` }}
                        />
                    </div>
                  </div>
                ) : (
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="mb-4 relative">
                      <div className="w-14 h-14 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
                        <ImageIcon className="w-7 h-7 text-white" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-emerald-800 dark:text-emerald-200 text-sm group-hover:text-emerald-900 dark:group-hover:text-emerald-100 transition-colors">
                        Upload “Yes” Image
                      </h4>
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 z-20">
                  <UploadButton
                    endpoint="imageUploader"
                    onUploadBegin={() => setUploadState({ isUploading: 'yes', progress: 0 })}
                    onUploadProgress={(progress) => setUploadState(prev => ({ ...prev, progress: progress }))}
                    onClientUploadComplete={(res) => {
                      setUploadState({ isUploading: null, progress: 0 });
                      if (res && res.length > 0) onYesImageUpload(res[0].url);
                    }}
                    onUploadError={(error: Error) => {
                      setUploadState({ isUploading: null, progress: 0 });
                      alert(`ERROR! ${error.message}`);
                    }}
                    appearance={{
                      button: "w-full h-full opacity-0 cursor-pointer absolute inset-0",
                      container: "w-full h-full",
                      allowedContent: "hidden"
                    }}
                    content={{ button: "" }}
                  />
                </div>
              </div>
            </div>
          )}
      </div>
      
      {/* NO Image Section */}
      <div className="space-y-3">
          <Label className="text-sm font-medium text-gray-800 dark:text-gray-200">
            No Image <span className="text-red-500">*</span>
          </Label>
          {noFile ? (
            <FilePreview file={noFile} onRemove={onNoImageRemove} showWatermark={addWatermark}/>
          ) : (
            <div className="relative group">
              <div className="relative overflow-hidden rounded-2xl border-2 border-dashed border-orange-200 dark:border-orange-700/50 bg-gradient-to-br from-orange-50/50 via-white to-pink-50/30 dark:from-orange-900/20 dark:via-gray-950 dark:to-pink-900/20 hover:border-orange-300 dark:hover:border-orange-600 transition-all duration-300 min-h-[150px] flex items-center justify-center p-6 text-center">
                {uploadState.isUploading === 'no' ? (
                   <div className="w-full max-w-xs">
                    <div className="flex items-center justify-between text-xs sm:text-sm text-orange-800 dark:text-orange-200 mb-2">
                        <span className="font-medium">
                             {uploadState.progress < 100 ? 'Uploading...' : 'Processing...'}
                        </span>
                        <span className="font-bold">{Math.round(uploadState.progress)}%</span>
                    </div>
                    <div className="w-full bg-orange-200/50 dark:bg-orange-900/50 rounded-full h-2 sm:h-2.5 overflow-hidden">
                        <div 
                            className="h-full bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] rounded-full transition-all duration-300 ease-out"
                            style={{ width: `${uploadState.progress}%` }}
                        />
                    </div>
                  </div>
                ) : (
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="mb-4 relative">
                      <div className="w-14 h-14 bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
                        <ImageIcon className="w-7 h-7 text-white" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-orange-800 dark:text-orange-200 text-sm group-hover:text-orange-900 dark:group-hover:text-orange-100 transition-colors">
                        Upload “No” Image  
                      </h4>
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 z-20">
                  <UploadButton
                    endpoint="imageUploader"
                    onUploadBegin={() => setUploadState({ isUploading: 'no', progress: 0 })}
                    onUploadProgress={(progress) => setUploadState(prev => ({ ...prev, progress: progress }))}
                    onClientUploadComplete={(res) => {
                      setUploadState({ isUploading: null, progress: 0 });
                      if (res && res.length > 0) onNoImageUpload(res[0].url);
                    }}
                    onUploadError={(error: Error) => {
                      setUploadState({ isUploading: null, progress: 0 });
                      alert(`ERROR! ${error.message}`);
                    }}
                    appearance={{ button: "w-full h-full opacity-0 cursor-pointer absolute inset-0", container: "w-full h-full", allowedContent: "hidden" }}
                    content={{ button: "" }}
                  />
                </div>
              </div>
            </div>
          )}
      </div>
    </div>
  );
}
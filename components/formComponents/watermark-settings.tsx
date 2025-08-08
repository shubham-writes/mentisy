import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface WatermarkSettingsProps {
    addWatermark: boolean;
    onWatermarkChange: (checked: boolean) => void;
}

export function WatermarkSettings({ addWatermark, onWatermarkChange }: WatermarkSettingsProps) {
    return (
        <div>
            <div className="flex items-start space-x-3 sm:space-x-4 md:space-x-5">
                <Switch 
                    id="watermark-toggle" 
                    checked={addWatermark}
                    onCheckedChange={onWatermarkChange}
                    className="mt-0.5 sm:mt-1 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                    <Label htmlFor="watermark-toggle" className="text-sm sm:text-base font-semibold cursor-pointer text-gray-800 dark:text-gray-200 block mb-2 sm:mb-3 leading-tight">
                        Add security watermark
                    </Label>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-2 sm:mb-3 pr-1">
                        Adds their name and some security info as an overlay. It&apos;s like a &quot;this is for your eyes only&quot; reminder.
                    </p>
                    {!addWatermark && (
                        <div className="p-3 sm:p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg sm:rounded-xl">
                            <p className="text-xs sm:text-sm text-red-700 dark:text-red-300 flex items-start sm:items-center space-x-2">
                                <span className="flex-shrink-0 mt-0.5 sm:mt-0">⚠️</span>
                                <span className="leading-tight">Real talk: Without this, they could probably screen record it</span>
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
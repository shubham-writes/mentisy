import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Shield, ShieldAlert } from "lucide-react";

interface WatermarkSettingsProps {
    addWatermark: boolean;
    onWatermarkChange: (checked: boolean) => void;
}

export function WatermarkSettings({ addWatermark, onWatermarkChange }: WatermarkSettingsProps) {
    return (
        <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg border border-gray-200/50 dark:border-gray-700/50 p-3 shadow-sm">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 flex-1 min-w-0">
                    {addWatermark ? (
                        <Shield className="h-4 w-4 text-green-600 dark:text-green-400 flex-shrink-0" />
                    ) : (
                        <ShieldAlert className="h-4 w-4 text-red-500 dark:text-red-400 flex-shrink-0" />
                    )}
                    <div className="min-w-0 flex-1">
                        <Label 
                            htmlFor="watermark-toggle" 
                            className="text-sm font-medium cursor-pointer text-gray-700 dark:text-gray-300 block leading-tight"
                        >
                            Security watermark
                        </Label>
                        <p className="text-xs text-gray-500 dark:text-gray-400 leading-tight">
                            {addWatermark ? "Protected with overlay" : "Unprotected - can be recorded"}
                        </p>
                    </div>
                </div>
                <Switch 
                    id="watermark-toggle" 
                    checked={addWatermark}
                    onCheckedChange={onWatermarkChange}
                    className="flex-shrink-0 ml-2"
                />
            </div>
            
            {!addWatermark && (
                <div className="mt-2 p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
                    <p className="text-xs text-red-700 dark:text-red-300 flex items-center space-x-1">
                        <span>⚠️</span>
                        <span>Without watermark, content can be screen recorded</span>
                    </p>
                </div>
            )}
        </div>
    );
}
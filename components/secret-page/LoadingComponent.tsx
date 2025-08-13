// components/secret-page/LoadingComponent.tsx
import { LoaderCircle } from "lucide-react";

interface LoadingComponentProps {
  type?: 'revealing' | 'unwrapping';
  progress?: number;
}

export function LoadingComponent({ type = 'revealing', progress }: LoadingComponentProps) {
  if (type === 'revealing') {
    return (
      <div className="flex flex-col items-center justify-center py-8 sm:py-16">
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#FF75A0] to-[#FFAA70] rounded-full flex items-center justify-center text-xl sm:text-2xl mb-4 sm:mb-6 animate-pulse shadow-lg">
          🔐
        </div>
        <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-200 font-medium mb-2 text-center">
          Revealing your secret...
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 text-center">
          Almost there...
        </p>
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-[#FF75A0] border-t-transparent"></div>
          <span className="text-sm text-gray-500">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-8 sm:py-16">
      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#FF75A0] to-[#FFAA70] rounded-full flex items-center justify-center text-2xl sm:text-3xl mb-4 sm:mb-6 animate-bounce shadow-lg">
        📦
      </div>
      <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-200 mb-2 text-center">
        Unwrapping Your Secret...
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4 sm:mb-6 text-center">
        {Math.floor(progress || 0)}% loaded
      </p>
      <div className="w-48 sm:w-64 bg-gray-200 dark:bg-gray-700 rounded-full h-2 sm:h-3 overflow-hidden shadow-inner">
        <div
          className="bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] h-2 sm:h-3 rounded-full transition-all duration-300 ease-out shadow-sm"
          style={{ width: `${progress || 0}%` }}
        ></div>
      </div>
    </div>
  );
}
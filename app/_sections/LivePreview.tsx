// components/sections/LivePreview.tsx
"use client";

import { SignUpButton } from "@clerk/nextjs";
import { Eye, Timer, ArrowRight } from "lucide-react";

export default function LivePreview() {
  return (
    <div className="px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">See It in Your Feed</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">Experience the one-time view magic</p>
        </div>
        
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 max-w-sm mx-auto">
          <div className="bg-white rounded-xl p-6 text-center space-y-4">
            <div className="w-16 h-16 bg-gradient-to-br from-[#FF75A0] to-[#FFAA70] rounded-xl flex items-center justify-center mx-auto">
              <Eye className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-bold text-lg text-gray-900">Secret from Sarah</h3>
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">⚠️ This link can only be viewed once</p>
              <div className="w-full h-32 bg-gradient-to-br from-pink-200 to-purple-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-600 font-medium">Preview Content</span>
              </div>
              <div className="mt-3 flex items-center justify-center space-x-2">
                <Timer className="w-4 h-4 text-red-500" />
                <span className="text-red-500 font-mono text-sm">30s remaining</span>
              </div>
            </div>
            <button className="w-full bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] text-white py-3 rounded-lg font-medium">
              View Secret
            </button>
          </div>
        </div>
        
        <div className="text-center mt-8">
          <p className="text-gray-600 dark:text-gray-400 mb-4">Want to send your own?</p>
          <SignUpButton mode="modal">
            <button className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FF75A0] to-[#FFAA70] text-white font-medium py-3 px-8 rounded-xl hover:shadow-lg hover:shadow-[#FF75A0]/25 transition-all duration-200 hover:scale-105">
              Start Free
              <ArrowRight className="w-4 h-4" />
            </button>
          </SignUpButton>
        </div>
      </div>
    </div>
  );
}
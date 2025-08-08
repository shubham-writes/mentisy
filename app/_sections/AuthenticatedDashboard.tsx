// components/sections/AuthenticatedDashboard.tsx
"use client";

import { SecretForm } from "@/components/secret-form";
import { MySecretsList } from "@/components/my-secrets-list";

export default function AuthenticatedDashboard() {
  return (
    <div className="min-h-screen">
      {/* Clean authenticated header */}
      <div className="px-6 py-6">
        <div className="max-w-7xl mx-auto"> {/* Changed from max-w-4xl to max-w-7xl */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Your secrets</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Share what matters</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-green-500">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              Online
            </div>
          </div>
          
          {/* Compact form for authenticated users - removed constraining wrapper */}
          <div className="mb-6"> {/* Removed the bg-white container that was constraining width */}
            <SecretForm isLandingPage={false} />
          </div>
          
          {/* Secrets list */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
            <div className="mb-4">
              <h2 className="text-lg font-medium mb-1 text-gray-900 dark:text-white">Sent secrets</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Track your ephemeral moments</p>
            </div>
            <MySecretsList />
          </div>
        </div>
      </div>
    </div>
  );
}
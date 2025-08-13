// components/sections/AuthenticatedDashboard.tsx
"use client";

import { SecretForm } from "@/components/secret-form";
import { MySecretsList } from "@/components/my-secrets-list";

export default function AuthenticatedDashboard() {
  return (
    <div className="min-h-screen">
      {/* Clean authenticated header */}
      <div className=" py-6">
        <div className="max-w-7xl mx-auto"> {/* Changed from max-w-4xl to max-w-7xl */}
          <div className="flex items-center justify-between mb-6">
            <div>
              
              
            </div>
            
          </div>
          
          {/* Compact form for authenticated users - removed constraining wrapper */}
          <div className="mb-6"> {/* Removed the bg-white container that was constraining width */}
            <SecretForm isLandingPage={false} />
          </div>
          
          {/* Secrets list */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 m-2 sm:m-2 md:m-6 lg:m-8  shadow-sm">
            <div className="mb-4">
              <h2 className="text-lg font-medium mb-1 text-gray-900 dark:text-white"></h2>
              <p className="text-sm text-gray-500 dark:text-gray-400"></p>
            </div>
            <MySecretsList />
          </div>
        </div>
      </div>
    </div>
  );
}
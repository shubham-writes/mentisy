// Create this file: components/database-test.tsx
"use client";

import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export function DatabaseTest() {
  const [testMessage, setTestMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Query to test database read
  const testData = useQuery((api as any).test?.getTestData);
  
  // Mutation to test database write
  const addTestData = useMutation((api as any).test?.addTestData);

  const handleTest = async () => {
    setIsLoading(true);
    try {
      await addTestData({ 
        message: `Test at ${new Date().toISOString()}`,
        timestamp: Date.now()
      });
      setTestMessage("✅ Database write successful!");
    } catch (error) {
      setTestMessage("❌ Database write failed: " + (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 border rounded-lg bg-card">
      <h3 className="text-lg font-semibold mb-4">Convex Database Test</h3>
      
      {/* Connection Status */}
      <div className="mb-4">
        <p className="text-sm text-muted-foreground">Connection Status:</p>
        <p className={testData === undefined ? "text-yellow-600" : "text-green-600"}>
          {testData === undefined ? "🔄 Loading..." : "✅ Connected"}
        </p>
      </div>

      {/* Read Test */}
      <div className="mb-4">
        <p className="text-sm text-muted-foreground">Recent Test Data:</p>
        <p className="text-sm">
          {testData === undefined 
            ? "Loading..." 
            : testData.length > 0 
              ? `Found ${testData.length} test records` 
              : "No test data found"
          }
        </p>
      </div>

      {/* Write Test */}
      <button
        onClick={handleTest}
        disabled={isLoading}
        className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50"
      >
        {isLoading ? "Testing..." : "Test Database Write"}
      </button>

      {testMessage && (
        <p className="mt-2 text-sm">{testMessage}</p>
      )}
    </div>
  );
}
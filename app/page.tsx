"use client";

import { Authenticated, Unauthenticated } from "convex/react";
import { SecretForm } from "@/components/secret-form";
import { MySecretsList } from "@/components/my-secrets-list";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-start text-center gap-y-8 flex-1">
      
      <Unauthenticated>
        <div className="flex flex-col items-center justify-center gap-y-4 mb-8">
          <h1 className="text-2xl font-bold">Welcome to Onlyforyou</h1>
          <p className="text-muted-foreground">Create secret messages that self-destruct after viewing</p>
        </div>
        {/* Show SecretForm for unauthenticated users but with limited functionality */}
        <SecretForm isLandingPage={true} />
      </Unauthenticated>

      <Authenticated>
        <SecretForm isLandingPage={false} />
        <MySecretsList />
      </Authenticated>
      
    </div>
  );
}
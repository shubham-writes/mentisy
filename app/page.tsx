"use client";

import { Authenticated, Unauthenticated } from "convex/react";




import { SecretForm } from "@/components/secret-form";
import { Hello } from "@/components/hello";
import { MySecretsList } from "@/components/my-secrets-list";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-start text-center gap-y-8 flex-1">
      
      <Unauthenticated>
    
        <div className="flex flex-col items-center justify-center gap-y-4">
          <h1 className="text-2xl font-bold">Welcome to Onlyforyou</h1>
          <p className="text-muted-foreground">This is the landing page</p>
        </div>
      </Unauthenticated>

      <Authenticated>
        
        <SecretForm />
        <MySecretsList />
      </Authenticated>
      
    </div>
  );
}
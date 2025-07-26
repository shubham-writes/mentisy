"use client";

import { Authenticated, Unauthenticated } from "convex/react";

import { Heading } from "./_home/heading";

import Partners from "./_home/partners";
import { SecretForm } from "@/components/secret-form";
import { Hello } from "@/components/hello";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-start text-center gap-y-8 flex-1">
      <Unauthenticated>
        <Heading />
        <Partners />
  
        
        
    
      </Unauthenticated>
      <Authenticated>
        <Hello />
        <SecretForm />
      </Authenticated>
      
    </div>
  );
}
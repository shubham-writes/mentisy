// app/hello/page.tsx
import { Hello } from "@/components/hello";
import { SecretForm } from "@/components/secret-form";
 // 1. Import the new component

export default function HelloPage() {
    return (
        <div className="flex flex-col items-center justify-start text-center gap-y-8 flex-1">
            <Hello />
            <SecretForm />
          
        </div>
    );
}
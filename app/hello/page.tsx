// app/hello/page.tsx

import { Hello } from "@/components/hello";
import { SecretForm } from "@/components/secret-form"; // Make sure this import is present

export default function HelloPage() {
    return (
        <div className="flex flex-col items-center justify-start text-center gap-y-8 flex-1">
            <Hello />
            <SecretForm /> {/* This is the line that was missing */}
        </div>
    );
}
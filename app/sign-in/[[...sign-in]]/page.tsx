// app/sign-in/[[...sign-in]]/page.tsx
import { SignIn } from '@clerk/nextjs'
import { clerkAppearance } from '@/lib/clerkAppearance'

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-md p-8">
        <SignIn 
          appearance={clerkAppearance}
          redirectUrl="/hello"
          signUpUrl="/sign-up"
        />
      </div>
    </div>
  )
}
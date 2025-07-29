// app/redirect/[publicId]/page.tsx
import { redirect } from "next/navigation";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

export default async function RedirectPage({ params }: { params: { publicId: string } }) {
  const { publicId } = params;

  // Create a server-side client to talk to Convex
  const client = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

  // Fetch the internal secret ID using the public ID
  const secretId = await client.query(api.secrets.getSecretIdFromPublicId, { publicId });

  if (!secretId) {
    return (
        <div className="flex flex-col items-center justify-center text-center gap-y-4 flex-1">
            <h1 className="text-2xl font-bold">Link Not Found</h1>
            <p className="text-muted-foreground">This secret link is invalid or has expired.</p>
        </div>
    );
  }

  // Immediately redirect the user to the real secret page
  redirect(`/secret/${secretId}`);
}
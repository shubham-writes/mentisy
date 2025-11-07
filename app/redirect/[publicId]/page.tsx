// app/redirect/[publicId]/page.tsx
import { redirect } from "next/navigation";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

export default async function RedirectPage({ params }: { params: { publicId: string } }) {
  const { publicId } = params;

  // Create a server-side client to talk to Convex
  const client = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

  // ▼▼▼ MODIFICATION 1: Use getSecretByPublicId to get more details ▼▼▼
  // We need to know the gameMode and if the swap is complete.
  const secret = await client.query(api.secrets.getSecretByPublicId, { publicId });

  if (!secret) {
    return (
      <div className="flex flex-col items-center justify-center text-center gap-y-4 flex-1">
        <h1 className="text-2xl font-bold">Link Not Found</h1>
        <p className="text-muted-foreground">This secret link is invalid or has expired.</p>
      </div>
    );
  }

  // ▼▼▼ MODIFICATION 2: Add the PicSwap routing logic ▼▼▼

  // If it's a PicSwap AND the receiver's photo is NOT uploaded yet...
  if (secret.gameMode === "pic_swap" && !secret.swapFileUrl) {
    // ...redirect the receiver to the "upload gate" page.
    redirect(`/swap/${publicId}`);
  }

  // For ALL other cases (e.g., a normal link, a 'qa_challenge', OR a completed PicSwap):
  // Immediately redirect the user to the real secret page.
  redirect(`/secret/${secret._id}`);
}
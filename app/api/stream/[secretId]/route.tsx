// app/api/stream/[secretId]/route.ts
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest, { params }: { params: { secretId: string } }) {
  try {
    const { secretId } = params;
    const client = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

    const secret = await client.query(api.secrets.getSecretForViewing, {
      secretId: secretId as Id<"secrets">,
    });

    if (!secret || secret.isRead) {
      return new NextResponse("File not found or has been viewed.", { status: 404 });
    }
    
    if (!secret.fileUrl) {
        return new NextResponse("No file associated with this secret.", { status: 400 });
    }

    const fileResponse = await fetch(secret.fileUrl, { cache: 'no-store' });

    if (!fileResponse.ok || !fileResponse.body) {
      return new NextResponse("Failed to fetch the file.", { status: 500 });
    }

    const headers = new Headers();
    headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    headers.set('Pragma', 'no-cache');
    headers.set('Expires', '0');
    if(fileResponse.headers.get('Content-Type')) {
        headers.set('Content-Type', fileResponse.headers.get('Content-Type')!);
    }
    
    return new NextResponse(fileResponse.body, { status: 200, headers });

  } catch (error) {
    console.error("Error streaming file:", error);
    return new NextResponse("An internal error occurred.", { status: 500 });
  }
}
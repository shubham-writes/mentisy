// app/api/deleteFile/route.ts
import { UTApi } from "uploadthing/server";
import { NextResponse } from "next/server";

const utapi = new UTApi();

export async function POST(req: Request) {
  console.log("🚀 deleteFile API called");
  
  // 1. Check for the secret header to secure the endpoint
  const secret = req.headers.get("x-internal-secret");
  console.log("🔐 Secret header present:", !!secret);
  console.log("🔐 Expected secret present:", !!process.env.INTERNAL_API_SECRET);
  
  if (secret !== process.env.INTERNAL_API_SECRET) {
    console.log("❌ Unauthorized - secret mismatch");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 2. Parse the request body to get the file key
  let body;
  try {
    body = await req.json();
    console.log("📄 Request body:", body);
  } catch (error) {
    console.error("❌ Failed to parse request body:", error);
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { fileKey } = body;
  console.log("🔑 File key to delete:", fileKey);
  
  if (!fileKey) {
    console.log("❌ No fileKey provided");
    return NextResponse.json({ error: "fileKey is required" }, { status: 400 });
  }

  try {
    // 3. Delete the file from uploadthing
    console.log("🗑️ Attempting to delete file from UploadThing...");
    const result = await utapi.deleteFiles(fileKey);
    console.log("✅ UploadThing delete result:", result);
    
    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("💥 Failed to delete file from uploadthing:", error);
    if (error instanceof Error) {
      console.error("💥 Error message:", error.message);
    }
    
    return NextResponse.json({ 
      error: "Failed to delete file", 
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}
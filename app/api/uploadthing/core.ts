// app/api/uploadthing/core.ts
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { auth } from "@clerk/nextjs/server";

const f = createUploadthing();

// 1. Make the handleAuth function 'async'
const handleAuth = async () => {
  // 2. Add 'await' before the auth() call
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");
  return { userId };
}

// Define your FileRouter: which files can be uploaded and by whom
export const ourFileRouter = {
  // Define an uploader for images
  imageUploader: f({ image: { maxFileSize: "16MB" } })
    .middleware(() => handleAuth()) // Run this middleware on every upload
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.ufsUrl);
      return { uploadedBy: metadata.userId };
    }),

  // Define an uploader for videos
  videoUploader: f({ video: { maxFileSize: "32MB" } })
    .middleware(() => handleAuth())
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.ufsUrl);
      return { uploadedBy: metadata.userId };
    }),

} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
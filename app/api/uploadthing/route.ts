// app/api/uploadthing/route.ts
import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core";

// Expose our FileRouter as a POST endpoint
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
});
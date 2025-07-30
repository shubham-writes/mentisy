"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Check, CheckCheck } from "lucide-react";
import { ShareButton } from "./share-button";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export function MySecretsList() {
  // This hook automatically fetches the data and updates in real-time
  const mySecrets = useQuery(api.secrets.getMySecrets);

  return (
    <div className="w-full max-w-md p-4 border rounded-lg bg-card mt-8">
      <h3 className="text-lg font-semibold mb-4 text-center">Your Generated Links</h3>
      {mySecrets === undefined && (
        <p className="text-sm text-muted-foreground text-center">Loading your links...</p>
      )}
      {mySecrets && mySecrets.length === 0 && (
        <p className="text-sm text-muted-foreground text-center">You havent created any secrets yet.</p>
      )}
      <div className="space-y-3">
        {mySecrets?.map((secret) => {
          const link = `${window.location.origin}/redirect/${secret.publicId}`;
          return (
            <div key={secret._id} className="p-3 bg-muted rounded-md text-left">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium">
                    To: {secret.recipientName || "Anyone"}
                  </p>
                  <p className="text-xs text-muted-foreground italic">
                    Note: {secret.publicNote || "No note"}
                  </p>
                   <p className="text-xs text-muted-foreground">
                    Created {dayjs(secret._creationTime).fromNow()}
                  </p>
                </div>
                <div className="flex items-center gap-x-1">
                  {secret.isRead ? (
                    <CheckCheck className="h-5 w-5 text-blue-500" />
                  ) : (
                    <Check className="h-5 w-5 text-gray-400" />
                  )}
                </div>
              </div>
              <div className="mt-2">
                 <ShareButton title="A Secret Message" text={`${secret.publicNote || ""} ${link}`} url={link} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
import { serve } from "inngest/next";
import { inngest } from "@/modules/inngest/client";
import { processTask } from "@/modules/inngest/functions";
import { reviewPullRequest } from "@/modules/review/server/review-pr-function";
import { syncRepoCodebaseFunction } from "@/modules/repo-sync/server/repo-sync-function";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [processTask, reviewPullRequest, syncRepoCodebaseFunction],
});

import { serve } from "inngest/next";
import { inngest } from "@/modules/inngest/client";
import { processTask } from "@/modules/inngest/functions";
import { reviewPullRequest } from "@/modules/review/server/review-pr-function";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [processTask, reviewPullRequest],
});

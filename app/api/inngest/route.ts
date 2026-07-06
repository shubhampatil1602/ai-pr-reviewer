import { serve } from "inngest/next";
import { inngest } from "@/modules/inngest/client";
import { processTask } from "@/modules/inngest/functions";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [processTask],
});

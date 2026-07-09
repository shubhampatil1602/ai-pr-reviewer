import { prisma } from "@/lib/db";
import { inngest } from "@/modules/inngest/client";
import { formatPrFilesForReview, getPullRequestFiles } from "./pr-files";
import { generateReview } from "./generate-review";
import { postPrComment } from "./post-pr-comment";

export const reviewPullRequest = inngest.createFunction(
  { id: "review-pull-request", triggers: { event: "github/pr.received" } },
  async ({ event, step }) => {
    const pullRequestId = event.data.pullRequestId;

    const pullRequest = await step.run("mark-processing", async () => {
      return prisma.pullRequest.update({
        where: {
          id: pullRequestId,
        },
        data: {
          status: "processing",
        },
      });
    });

    const diff = await step.run("fetch-pr-diff", async () => {
      if (!pullRequest.installationId || !pullRequest.prNumber) {
        throw new Error("Pull request is missing installationId or prNumber");
      }
      const files = await getPullRequestFiles(
        pullRequest.installationId,
        pullRequest.repoFullName,
        pullRequest.prNumber,
      );

      return formatPrFilesForReview(files);
    });

    if (!diff.trim()) {
      await step.run("mark-reviewed-no-code", async () => {
        await prisma.pullRequest.update({
          where: { id: pullRequestId },
          data: { status: "reviewed" },
        });
      });

      return { pullRequestId, status: "reviewed", reason: "no code to review" };
    }

    const review = await step.run("generate-ai-review", async () => {
      return generateReview({
        repoFullName: pullRequest.repoFullName,
        title: pullRequest.title,
        diff,
      });
    });

    await step.run("post-pr-comment", async () => {
      if (!pullRequest.installationId || !pullRequest.prNumber) {
        throw new Error("Pull request is missing installationId or prNumber");
      }
      await postPrComment(
        pullRequest.installationId,
        pullRequest.repoFullName,
        pullRequest.prNumber,
        review,
      );
    });

    await step.run("mark-reviewed", async () => {
      await prisma.pullRequest.update({
        where: { id: pullRequestId },
        data: {
          status: "reviewed",
          reviewComment: review,
          reviewedAt: new Date(),
        },
      });
    });

    return { pullRequestId, status: "reviewed" };
  },
);

// export const reviewPullRequest = inngest.createFunction(
//   {
//     id: "review-pull-request",
//     triggers: { event: "github/pr.received" },
//   },

//   async ({ event, step }) => {
//     const pullRequestId = event.data.pullRequestId;

//     const pullRequest = await step.run("mark-processing", async () => {
//       return prisma.pullRequest.update({
//         where: { id: pullRequestId },
//         data: { status: "processing" },
//       });
//     });

//     const chunks = await step.run("breakdown-code", async () => {
//       if (!pullRequest.installationId || !pullRequest.prNumber) {
//         throw new Error("Pull request is missing installationId or prNumber");
//       }

//       const files = await getPullRequestFiles(
//         pullRequest.installationId,
//         pullRequest.repoFullName,
//         pullRequest.prNumber,
//       );

//       // Turn unified diffs into fixed-size chunks for embedding
//       return chunkPrFiles(pullRequest.prNumber, files);
//     });

//     if (chunks.length === 0) {
//       await step.run("mark-reviewed-no-code", async () => {
//         await prisma.pullRequest.update({
//           where: { id: pullRequestId },
//           data: { status: "reviewed" },
//         });
//       });

//       return { pullRequestId, status: "reviewed", reason: "no code to review" };
//     }

//     await step.sleep("wait-for-vector-to-index", "10s");

//     const review = await step.run("generate-ai-review", async () => {
//       // Search within this PR's namespace for chunks related to the PR title
//       const contextSnippets = await searchPrContext(
//         namespace,
//         pullRequest.title,
//       );

//       return generateReview({
//         repoFullName: pullRequest.repoFullName,
//         title: pullRequest.title,
//         contextSnippets,
//         repoContextSnippets,
//       });
//     });

//     await step.run("post-pr-comment", async () => {
//       if (!pullRequest.installationId || !pullRequest.prNumber) {
//         throw new Error("Pull request is missing installationId or prNumber");
//       }
//       await postPrComment(
//         pullRequest.installationId,
//         pullRequest.repoFullName,
//         pullRequest.prNumber,
//         review,
//       );
//     });
//   },
// );

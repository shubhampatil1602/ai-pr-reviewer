export const REVIEWABLE_ACTIONS = ["opened", "synchronize", "reopened"];

export type PullRequestWebhookPayload = {
  /** Webhook action, e.g. `opened`, `synchronize`, `reopened` */
  action: string;
  /** GitHub App installation that received the event */
  installation: { id: number };
  repository: { full_name: string };
  pull_request: {
    number: number;
    title: string;
    user: { login: string } | null;
    head: { sha: string };
    base: { ref: string };
  };
};

export type GithubRepo = {
  /** GitHub's numeric repo id, stored as a string for consistency with other ids. */
  id: string;
  /** Short repo name without owner, e.g. `my-app`. */
  name: string;
  /** Full name with owner, e.g. `acme/my-app`. */
  fullName: string;
  /** Whether the repo is public or private on GitHub. */
  visibility: "public" | "private";
  /** Default branch GitHub reports (usually `main` or `master`). */
  defaultBranch: string;
  /** ISO timestamp of last activity on the repo. */
  updatedAt: string;
  /** Primary language from GitHub, or null if unknown. */
  language: string | null;
  /** Star count from GitHub's `stargazers_count`. */
  stars: number;
};

/** One page of repos plus pagination metadata for infinite scroll UI. */
export type InstallationReposPage = {
  repos: GithubRepo[];
  totalCount: number;
  page: number;
  hasMore: boolean;
};

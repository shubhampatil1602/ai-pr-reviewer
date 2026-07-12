export type RepoFile = {
  filePath: string;
  content: string;
};

export type RepoSyncStatus = "pending" | "syncing" | "synced" | "failed";

export type TreeEntry = {
  path?: string;
  type?: string;
  sha?: string;
  size?: number;
};

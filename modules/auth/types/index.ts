// Sign In
export type SignInPageProps = {
  searchParams: Promise<{ callbackUrl?: string }>;
};

export type GithubSignInFormProps = {
  /* Optional post-login redirect path (e.g. Github install callback) */
  callbackUrl?: string;
};

// User menu
export type UserMenuUser = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

export type UserMenuTriggerVariant = "compact" | "profile";

export type UserMenuProps = {
  user: UserMenuUser;
  /** `compact` — avatar-only trigger; `profile` — avatar + name in the trigger. */
  variant?: UserMenuTriggerVariant;
  plan?: string;
  className?: string;
};

export type UserMenuWithSessionProps = Omit<UserMenuProps, "user">;

// lib
export { auth } from "./lib/auth";
export { authClient } from "./lib/auth-client";

// types
export type { GithubSignInFormProps, SignInPageProps } from "./types";

// utils
export { handleAuthProxy } from "./utils/auth-proxy";
export {
  DEFAULT_AUTH_CALLBACK,
  SIGN_IN_PATH,
  getSafeCallbackPath,
} from "./utils";

// actions
export {
  requireAuth,
  requireUnAuth,
  getServerSession,
  signInWithGithub,
  signOut,
} from "./actions";

// components
export { SignInForm } from "./components/sign-in-form";
export { AuthLayoutWrapper } from "./components/auth-layout-wrapper";
export { GithubSignInForm } from "./components/github-sign-in-form";
export { UserMenu, UserMenuWithSession } from "./components/user-menu";

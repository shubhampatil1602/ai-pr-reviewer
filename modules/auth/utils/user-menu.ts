import { UserMenuUser } from "../types";

export function getDisplayName(user: UserMenuUser) {
  return user.name?.trim() || user.email?.split("@")[0] || "User";
}

export function getInitials(user: UserMenuUser) {
  const source = user.name?.trim() || user.email || "U";
  const parts = source.split(/\s+/).filter(Boolean);

  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }

  return source.slice(0, 2).toUpperCase();
}

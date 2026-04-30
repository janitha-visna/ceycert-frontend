import { UserRole } from "../types/admin.types";

export function getRoleBadgeColor(role: UserRole) {
  switch (role) {
    case UserRole.ADMIN:
      return "bg-purple-100 text-purple-700 border-purple-200";
    case UserRole.MANAGER:
      return "bg-blue-100 text-blue-700 border-blue-200";
    case UserRole.CLIENT:
      return "bg-emerald-100 text-emerald-700 border-emerald-200";
    default:
      return "bg-slate-100 text-slate-700 border-slate-200";
  }
}

export function getRoleDescription(role: UserRole) {
  switch (role) {
    case UserRole.ADMIN:
      return "Full system access & destructive actions";
    case UserRole.MANAGER:
      return "Manage entities & assigned user groups";
    case UserRole.CLIENT:
      return "Access to specific client-facing portals";
    default:
      return "";
  }
}

export function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

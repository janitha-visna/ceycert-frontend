import { Settings, Shield, Users } from "lucide-react";
import { UserRole } from "../types/admin.types";

export default function RoleIcon({ role }: { role: UserRole }) {
  switch (role) {
    case UserRole.ADMIN:
      return <Shield size={16} />;
    case UserRole.MANAGER:
      return <Settings size={16} />;
    case UserRole.CLIENT:
      return <Users size={16} />;
    default:
      return <Users size={16} />;
  }
}

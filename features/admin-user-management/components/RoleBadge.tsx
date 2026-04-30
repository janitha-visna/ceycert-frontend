import { Badge } from "@/components/ui/badge";

import { UserRole } from "../types/admin.types";
import { getRoleBadgeColor } from "../utils/adminHelpers";

interface RoleBadgeProps {
  role: UserRole;
}

export default function RoleBadge({ role }: RoleBadgeProps) {
  return (
    <Badge
      variant="secondary"
      className={`capitalize ${getRoleBadgeColor(role)}`}
    >
      {role}
    </Badge>
  );
}

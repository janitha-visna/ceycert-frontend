import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Eye, UserPlus, UserMinus } from "lucide-react";
import { ClientAssignment } from "../types/clientAssignment.types";

interface AssignmentActionsProps {
  client: ClientAssignment;
  onViewFiles: (client: ClientAssignment) => void;
  onReassign: (client: ClientAssignment) => void;
  onRemoveUser: (client: ClientAssignment) => void;
}

export function AssignmentActions({
  client,
  onViewFiles,
  onReassign,
  onRemoveUser,
}: AssignmentActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuItem onClick={() => onViewFiles(client)}>
          <Eye className="mr-2 h-4 w-4" />
          View Files
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => onReassign(client)}>
          <UserPlus className="mr-2 h-4 w-4" />
          Reassign
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => onRemoveUser(client)}
          className="text-red-600 focus:text-red-600"
        >
          <UserMinus className="mr-2 h-4 w-4" />
          Remove User
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

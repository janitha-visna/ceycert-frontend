import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
        <button className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[160px] rounded-xl shadow-xl border-slate-200 dark:border-slate-800"
      >
        <DropdownMenuItem
          onClick={() => onViewFiles(client)}
          className="flex items-center gap-2 py-2 px-3 focus:bg-slate-50 dark:focus:bg-slate-900 rounded-lg cursor-pointer"
        >
          <Eye className="h-4 w-4" />
          <span className="text-sm font-medium">View Files</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onReassign(client)}
          className="flex items-center gap-2 py-2 px-3 focus:bg-slate-50 dark:focus:bg-slate-900 rounded-lg cursor-pointer"
        >
          <UserPlus className="h-4 w-4" />
          <span className="text-sm font-medium">Reassign</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center gap-2 py-2 px-3 text-red-600 focus:text-red-700 focus:bg-red-50 dark:text-red-400 dark:focus:bg-red-950/30 rounded-lg cursor-pointer"
          onClick={() => onRemoveUser(client)}
        >
          <UserMinus className="h-4 w-4" />
          <span className="text-sm font-medium">Remove User</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

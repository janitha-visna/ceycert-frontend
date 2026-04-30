import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { AuthUser } from "../types/admin.types";
import { getInitials, getRoleBadgeColor } from "../utils/adminHelpers";

interface Props {
  users: AuthUser[];
  allUsersCount: number;
  onEditUser: (user: AuthUser) => void;
}

export default function UsersTable({
  users,
  allUsersCount,
  onEditUser,
}: Props) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
        <div>
          <h2 className="text-base font-semibold tracking-tight text-slate-950">
            Users
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Showing {users.length} of {allUsersCount} users
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50/80 hover:bg-slate-50/80">
              <TableHead className="h-11 px-6 text-xs font-semibold uppercase tracking-wide text-slate-500">
                User
              </TableHead>
              <TableHead className="h-11 px-6 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Roles
              </TableHead>
              <TableHead className="h-11 w-[110px] px-6 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="h-32 text-center text-sm text-slate-500"
                >
                  No users found.
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow
                  key={user.id}
                  className="border-slate-100 hover:bg-slate-50/70"
                >
                  <TableCell className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600 ring-1 ring-slate-200">
                        {getInitials(user.name)}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-950">
                          {user.name}
                        </p>
                        <p className="mt-0.5 truncate text-xs text-slate-500">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      {user.roles.map((role) => (
                        <Badge
                          key={role}
                          variant="outline"
                          className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${getRoleBadgeColor(
                            role,
                          )}`}
                        >
                          {role}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>

                  <TableCell className="px-6 py-4 text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEditUser(user)}
                      className="gap-2 rounded-full px-3"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

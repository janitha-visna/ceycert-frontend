"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { AuthUser, UserRole } from "../types/admin.types";
import RoleIcon from "./RoleIcon";
import { getRoleDescription } from "../utils/adminHelpers";

interface Props {
  user: AuthUser | null;
  onOpenChange: () => void;
  onUpdateRoles: (user: AuthUser) => void;
}

export default function EditUserRolesDialog({
  user,
  onOpenChange,
  onUpdateRoles,
}: Props) {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  // sync when dialog opens
  useEffect(() => {
    if (user) {
      setSelectedRole(user.roles[0]);
    }
  }, [user]);

  if (!user) return null;

  const handleSave = () => {
    if (!selectedRole) return;

    onUpdateRoles({
      ...user,
      roles: [selectedRole],
    });

    onOpenChange(); // close only after save
  };

  return (
    <Dialog open={!!user} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[560px]">
        <DialogHeader>
          <DialogTitle>Edit Roles</DialogTitle>
          <DialogDescription>
            Update access role for {user.name}.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-3 py-4 sm:grid-cols-3">
          {Object.values(UserRole).map((role) => {
            const isSelected = selectedRole === role;

            return (
              <button
                key={role}
                type="button"
                onClick={() => setSelectedRole(role)}
                className={`relative rounded-lg border p-4 text-left transition hover:bg-muted ${
                  isSelected
                    ? "border-primary bg-muted"
                    : "border-border bg-background"
                }`}
              >
                {isSelected && (
                  <div className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Check className="h-3 w-3" />
                  </div>
                )}

                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-md bg-muted">
                  <RoleIcon role={role} />
                </div>

                <p className="text-sm font-medium capitalize">{role}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {getRoleDescription(role)}
                </p>
              </button>
            );
          })}
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>

          <Button type="button" onClick={handleSave} disabled={!selectedRole}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

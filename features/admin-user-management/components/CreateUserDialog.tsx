"use client";

import { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { UserRole } from "../types/admin.types";
import RoleIcon from "./RoleIcon";
import { getRoleDescription } from "../utils/adminHelpers";

interface CreateUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateUser: (data: {
    name: string;
    email: string;
    roles: UserRole[];
  }) => void;
}

export default function CreateUserDialog({
  open,
  onOpenChange,
  onCreateUser,
}: CreateUserDialogProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "" as UserRole | "",
  });

  const resetForm = () => {
    setForm({ name: "", email: "", role: "" });
  };

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.role) return;

    onCreateUser({
      name: form.name.trim(),
      email: form.email.trim(),
      roles: [form.role],
    });

    resetForm();
    onOpenChange(false);
  };

  const handleCancel = () => {
    resetForm();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[560px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create User</DialogTitle>
            <DialogDescription>
              Create a new account and assign one access role.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full name</Label>
              <Input
                id="name"
                value={form.name}
                placeholder="Enter user name"
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                value={form.email}
                placeholder="name@example.com"
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, email: e.target.value }))
                }
              />
            </div>

            <div className="grid gap-2">
              <Label>User role</Label>

              <div className="grid gap-3 sm:grid-cols-3">
                {Object.values(UserRole).map((role) => {
                  const isSelected = form.role === role;

                  return (
                    <button
                      key={role}
                      type="button"
                      onClick={() =>
                        setForm((prev) => ({
                          ...prev,
                          role,
                        }))
                      }
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
            </div>
          </div>

          <DialogFooter>
            
            <Button
              type="submit"
              disabled={!form.name.trim() || !form.email.trim() || !form.role}
            >
              Create user
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

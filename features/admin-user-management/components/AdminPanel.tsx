"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

import { AuthUser, Client, UserRole } from "../types/admin.types";
import { MOCK_CLIENTS, MOCK_USERS } from "../data/constants";
import AdminHeader from "./AdminHeader";
import UsersTable from "./UsersTable";
import CreateUserDialog from "./CreateUserDialog";
import EditUserRolesDialog from "./EditUserRolesDialog";

export default function AdminPanel() {
  const [users, setUsers] = useState<AuthUser[]>(MOCK_USERS);
  const [clients] = useState<Client[]>(MOCK_CLIENTS);

  const [isNewUserDialogOpen, setIsNewUserDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<AuthUser | null>(null);

  const filteredUsers = useMemo(() => {
    return users;
  }, [users]);

  const handleCreateUser = (newUser: {
    name: string;
    email: string;
    roles: UserRole[];
    clientId?: string;
  }) => {
    const user: AuthUser = {
      id: crypto.randomUUID(),
      name: newUser.name,
      email: newUser.email,
      roles: newUser.roles,
      status: "active",
      createdAt: new Date().toISOString().split("T")[0],
      clientId: newUser.clientId || undefined,
    };

    setUsers((prev) => [...prev, user]);
    setIsNewUserDialogOpen(false);
  };

  const handleUpdateRoles = (updatedUser: AuthUser) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === updatedUser.id ? updatedUser : user)),
    );
    setEditingUser(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="mx-auto w-full max-w-6xl px-6 py-6">
        <AdminHeader onCreateUser={() => setIsNewUserDialogOpen(true)} />

        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6"
        >
          <Card className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <UsersTable
              users={filteredUsers}
              allUsersCount={users.length}
              onEditUser={setEditingUser}
            />
          </Card>
        </motion.section>
      </main>

      <CreateUserDialog
        open={isNewUserDialogOpen}
        onOpenChange={setIsNewUserDialogOpen}
        onCreateUser={handleCreateUser}
      />

      <EditUserRolesDialog
        user={editingUser}
        onOpenChange={() => setEditingUser(null)}
        onUpdateRoles={handleUpdateRoles}
      />
    </div>
  );
}

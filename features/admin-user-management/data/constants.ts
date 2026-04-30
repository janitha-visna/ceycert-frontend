import { AuthUser, Client, UserRole } from "../types/admin.types";

export const MOCK_USERS: AuthUser[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    roles: [UserRole.ADMIN],
    status: "active",
    createdAt: "2024-01-01",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    roles: [UserRole.MANAGER],
    status: "pending",
    createdAt: "2024-01-02",
  },
];

export const MOCK_CLIENTS: Client[] = [
  { id: "c1", name: "ABC Company" },
  { id: "c2", name: "XYZ Pvt Ltd" },
];

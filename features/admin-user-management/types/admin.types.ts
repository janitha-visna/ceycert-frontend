export enum UserRole {
  ADMIN = "admin",
  MANAGER = "manager",
  CLIENT = "client",
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  roles: UserRole[];
  status: "active" | "inactive" | "pending";
  createdAt: string;
  clientId?: string;
}

export interface Client {
  id: string;
  name: string;
}

export type ISOStandard =
  | "ISO 9001"
  | "ISO 14001"
  | "ISO 22000"
  | "ISO 27001"
  | "ISO 45001";

export type AssignmentStatus =
  | "Assigned"
  | "Unassigned"
  | "Pending Review"
  | "Completed"
  | "Active"
  | "Review"
  | "Pending";

export type FileStatus = "Draft" | "Final" | "Reviewed" | "Verified";

export interface AssignedFile {
  id: string;
  name: string;
  type: string;
  status: FileStatus;
  assignedDate: string;
  isoStandard: ISOStandard;
}

export interface UnassignedFile {
  id: string;
  name: string;
  clientName: string;
  isoStandard: ISOStandard;
  uploadedDate: string;
  fileType: string;
}

export interface AssignmentHistory {
  person: string;
  type: "Assigned" | "Reassigned" | "Removed";
  date: string;
  status: string;
}

export interface AuthorizedPerson {
  id: string;
  name: string;
  expertise: ISOStandard[];
  activeAssignments: number;
  initials?: string;
}

export interface ClientAssignment {
  id: string;
  name: string;
  isoStandards: ISOStandard[];
  assignedPerson?: string;
  status: AssignmentStatus;
  fileCount: number;
  lastUpdated: string;
}

export interface IsoCategory {
  name: ISOStandard;
  clients: number;
  assigned: number;
  total: number;
  color: string;
  bar: string;
}

/**
 * Optional aliases if your old code already uses these names.
 */
export type Client = ClientAssignment;
export type Auditor = AuthorizedPerson;
export type File = AssignedFile;

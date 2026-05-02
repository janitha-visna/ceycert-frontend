export type Scheme =
  | "FSMS"
  | "QMS"
  | "EMS"
  | "OH&SMS"
  | "ENMS"
  | "EOMS"
  | "ISMS"
  | "BCMS"
  | "PIMS"
  | "ITSMS"
  | "ESMS";

export type ClientStatus = "Active" | "Inactive";

export interface ClientFile {
  id: string;
  organizationName: string;
  uniqueFolderName: string;
  scheme: Scheme;
  status: ClientStatus;
  nextAuditDate: string;
  assignedUserId: string;
}

export interface StatusSummary {
  total: number;
  active: number;
  inactive: number;
  byScheme: Record<Scheme, number>;
}

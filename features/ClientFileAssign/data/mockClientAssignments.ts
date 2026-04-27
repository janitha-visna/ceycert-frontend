import {
  AssignedFile,
  AuthorizedPerson,
  ClientAssignment,
  AssignmentHistory,
} from "../types/clientAssignment.types";

export const auditors: AuthorizedPerson[] = [
  {
    id: "auditor-1",
    name: "Janitha Perera",
    expertise: ["ISO 27001", "ISO 9001"],
    activeAssignments: 3,
  },
  {
    id: "auditor-2",
    name: "Sanjiv Fernando",
    expertise: ["ISO 14001", "ISO 45001"],
    activeAssignments: 2,
  },
  {
    id: "auditor-3",
    name: "Muktesh Murthy",
    expertise: ["ISO 27001", "ISO 22000"],
    activeAssignments: 4,
  },
];

export const initialClients: ClientAssignment[] = [
  {
    id: "client-1",
    name: "Precision Management Solutions",
    isoStandards: ["ISO 27001"],
    assignedPerson: "Janitha Perera",
    status: "Assigned",
    fileCount: 3,
    lastUpdated: "2026-04-25",
  },
  {
    id: "client-2",
    name: "IXD Labs Private Limited",
    isoStandards: ["ISO 27001", "ISO 9001"],
    assignedPerson: "Muktesh Murthy",
    status: "Assigned",
    fileCount: 4,
    lastUpdated: "2026-04-24",
  },
  {
    id: "client-3",
    name: "Swyftflo AI",
    isoStandards: ["ISO 9001"],
    status: "Unassigned",
    fileCount: 0,
    lastUpdated: "2026-04-22",
  },
];

export const clientFiles: Record<string, AssignedFile[]> = {
  "client-1": [
    {
      id: "file-1",
      name: "Stage 1 Audit Plan.pdf",
      type: "PDF",
      status: "Final",
      assignedDate: "2026-04-20",
      isoStandard: "ISO 27001",
    },
    {
      id: "file-2",
      name: "Statement of Applicability.xlsx",
      type: "XLSX",
      status: "Reviewed",
      assignedDate: "2026-04-21",
      isoStandard: "ISO 27001",
    },
  ],
  "client-2": [
    {
      id: "file-3",
      name: "ISMS Scope.docx",
      type: "DOCX",
      status: "Draft",
      assignedDate: "2026-04-22",
      isoStandard: "ISO 27001",
    },
  ],
};

export const defaultHistory: AssignmentHistory[] = [
  {
    person: "Janitha Perera",
    type: "Assigned",
    date: "2026-04-20",
    status: "Verified",
  },
  {
    person: "Sanjiv Fernando",
    type: "Reassigned",
    date: "2026-04-22",
    status: "Verified",
  },
];
